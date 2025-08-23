import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { createHash, randomUUID } from 'crypto';
import {
  PaymentIntentData,
  PaymentIntentRecord,
  PaymentIntentStats,
  PaymentIntentQueryOptions,
  PaymentIntentFileInfo,
  PaymentIntentStorageOptions
} from '@/types/payment-intent';
import { getIsoTimestr } from '@/lib/time';

export class PaymentIntentStorage {
  private readonly dataDir: string;
  private readonly lockDir: string;
  private readonly options: Required<PaymentIntentStorageOptions>;
  private readonly fileVersion = '1.0.0';

  constructor(
    baseDir: string = join(process.cwd(), 'data', 'payment-intents'),
    options: PaymentIntentStorageOptions = {}
  ) {
    this.dataDir = baseDir;
    this.lockDir = join(baseDir, '.locks');
    this.options = {
      maxFileSize: options.maxFileSize || 10 * 1024 * 1024, // 10MB
      maxRecordsPerFile: options.maxRecordsPerFile || 10000,
      retentionDays: options.retentionDays || 365,
      enableCompression: options.enableCompression || false,
    };
  }

  /**
   * Initialize storage directories
   */
  async initialize(): Promise<void> {
    try {
      await fs.mkdir(this.dataDir, { recursive: true });
      await fs.mkdir(this.lockDir, { recursive: true });
      
      // Create .gitignore for locks directory
      const gitignorePath = join(this.lockDir, '.gitignore');
      await fs.writeFile(gitignorePath, '*\n', 'utf8').catch(() => {});
      
      console.log(`Payment intent storage initialized at: ${this.dataDir}`);
    } catch (error) {
      throw new Error(`Failed to initialize payment intent storage: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Generate a unique session ID for tracking users
   */
  generateSessionId(userAgent: string, ipAddress: string): string {
    const data = `${userAgent}-${ipAddress}-${Date.now()}`;
    return createHash('sha256').update(data).digest('hex').substring(0, 16);
  }

  /**
   * Get filename for today's data
   */
  private getTodayFilename(): string {
    const today = new Date().toISOString().split('T')[0];
    return `payment-intents-${today}.json`;
  }

  /**
   * Get filename for a specific date
   */
  private getDateFilename(date: Date): string {
    const dateStr = date.toISOString().split('T')[0];
    return `payment-intents-${dateStr}.json`;
  }

  /**
   * Get full file path
   */
  private getFilePath(filename: string): string {
    return join(this.dataDir, filename);
  }

  /**
   * Get lock file path
   */
  private getLockPath(filename: string): string {
    return join(this.lockDir, `${filename}.lock`);
  }

  /**
   * Acquire file lock with timeout
   */
  private async acquireLock(filename: string, timeout: number = 5000): Promise<void> {
    const lockPath = this.getLockPath(filename);
    const lockId = randomUUID();
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      try {
        await fs.writeFile(lockPath, lockId, { flag: 'wx' });
        return; // Lock acquired
      } catch (error) {
        // Lock exists, wait and retry
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    throw new Error(`Failed to acquire lock for ${filename} within ${timeout}ms`);
  }

  /**
   * Release file lock
   */
  private async releaseLock(filename: string): Promise<void> {
    const lockPath = this.getLockPath(filename);
    try {
      await fs.unlink(lockPath);
    } catch (error) {
      // Lock file may not exist, which is fine
    }
  }

  /**
   * Read data file with error handling
   */
  private async readDataFile(filePath: string): Promise<PaymentIntentRecord[]> {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      const data = JSON.parse(content);
      
      // Ensure data is an array
      return Array.isArray(data) ? data : [];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return []; // File doesn't exist yet
      }
      console.error(`Error reading payment intent file ${filePath}:`, error);
      return [];
    }
  }

  /**
   * Write data file with atomic operation
   */
  private async writeDataFile(filePath: string, data: PaymentIntentRecord[]): Promise<void> {
    const tempPath = `${filePath}.tmp`;
    
    try {
      await fs.writeFile(tempPath, JSON.stringify(data, null, 2), 'utf8');
      await fs.rename(tempPath, filePath);
    } catch (error) {
      // Clean up temp file on error
      try {
        await fs.unlink(tempPath);
      } catch {}
      throw error;
    }
  }

  /**
   * Save payment intent data
   */
  async savePaymentIntent(data: Omit<PaymentIntentData, 'id' | 'createdAt' | 'sessionId'>): Promise<string> {
    await this.initialize();
    
    const filename = this.getTodayFilename();
    const filePath = this.getFilePath(filename);
    
    // Generate unique ID and session ID if not provided
    const paymentIntent: PaymentIntentData = {
      ...data,
      id: randomUUID(),
      createdAt: new Date(),
      sessionId: this.generateSessionId(data.userAgent, data.ipAddress),
    };

    const record: PaymentIntentRecord = {
      data: paymentIntent,
      metadata: {
        fileVersion: this.fileVersion,
        savedAt: getIsoTimestr(),
      },
    };

    try {
      await this.acquireLock(filename);
      
      // Read existing data
      const existingData = await this.readDataFile(filePath);
      
      // Add new record
      existingData.push(record);
      
      // Check if file rotation is needed
      const shouldRotate = existingData.length >= this.options.maxRecordsPerFile;
      
      if (shouldRotate) {
        // Create a new file with timestamp
        const rotatedFilename = `${filename.replace('.json', '')}-${Date.now()}.json`;
        const rotatedPath = this.getFilePath(rotatedFilename);
        await this.writeDataFile(rotatedPath, existingData);
        
        // Start new file with current record
        await this.writeDataFile(filePath, [record]);
      } else {
        // Write to existing file
        await this.writeDataFile(filePath, existingData);
      }

      console.log(`✅ Payment intent saved: ${paymentIntent.id}`);
      return paymentIntent.id;
      
    } finally {
      await this.releaseLock(filename);
    }
  }

  /**
   * Get all payment intent files
   */
  async getDataFiles(): Promise<PaymentIntentFileInfo[]> {
    await this.initialize();
    
    try {
      const files = await fs.readdir(this.dataDir);
      const dataFiles = files.filter(file => 
        file.startsWith('payment-intents-') && file.endsWith('.json')
      );

      const fileInfos: PaymentIntentFileInfo[] = [];

      for (const filename of dataFiles) {
        const filePath = this.getFilePath(filename);
        try {
          const stats = await fs.stat(filePath);
          const data = await this.readDataFile(filePath);
          
          // Extract date from filename
          const dateMatch = filename.match(/payment-intents-(\d{4}-\d{2}-\d{2})/);
          const date = dateMatch ? dateMatch[1] : 'unknown';

          fileInfos.push({
            filename,
            path: filePath,
            date,
            size: stats.size,
            recordCount: data.length,
          });
        } catch (error) {
          console.warn(`Error reading file info for ${filename}:`, error);
        }
      }

      return fileInfos.sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      console.error('Error getting data files:', error);
      return [];
    }
  }

  /**
   * Query payment intents with filtering options
   */
  async queryPaymentIntents(options: PaymentIntentQueryOptions = {}): Promise<PaymentIntentData[]> {
    const fileInfos = await this.getDataFiles();
    const results: PaymentIntentData[] = [];

    for (const fileInfo of fileInfos) {
      try {
        const data = await this.readDataFile(fileInfo.path);
        
        for (const record of data) {
          const intent = record.data;
          
          // Apply filters
          if (options.startDate && new Date(intent.timestamp) < options.startDate) continue;
          if (options.endDate && new Date(intent.timestamp) > options.endDate) continue;
          if (options.planName && intent.planName !== options.planName) continue;
          if (options.userEmail && intent.userEmail !== options.userEmail) continue;
          if (options.sessionId && intent.sessionId !== options.sessionId) continue;

          results.push(intent);
        }
      } catch (error) {
        console.warn(`Error reading file ${fileInfo.filename}:`, error);
      }
    }

    // Sort by timestamp descending
    results.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Apply pagination
    const start = options.offset || 0;
    const end = options.limit ? start + options.limit : undefined;
    
    return results.slice(start, end);
  }

  /**
   * Generate statistics from stored payment intents
   */
  async generateStatistics(): Promise<PaymentIntentStats> {
    const allIntents = await this.queryPaymentIntents();

    if (allIntents.length === 0) {
      return {
        totalIntents: 0,
        uniqueSessions: 0,
        planDistribution: {},
        dateRange: { earliest: '', latest: '' },
        amountStatistics: { total: 0, average: 0, min: 0, max: 0 },
        dailyBreakdown: {},
      };
    }

    const uniqueSessions = new Set(allIntents.map(intent => intent.sessionId));
    const planDistribution: Record<string, number> = {};
    const dailyBreakdown: Record<string, number> = {};
    const amounts: number[] = [];
    const emails = new Set<string>();

    let earliest = allIntents[0].timestamp;
    let latest = allIntents[0].timestamp;

    for (const intent of allIntents) {
      // Plan distribution
      planDistribution[intent.planName] = (planDistribution[intent.planName] || 0) + 1;

      // Daily breakdown
      const date = new Date(intent.timestamp).toISOString().split('T')[0];
      dailyBreakdown[date] = (dailyBreakdown[date] || 0) + 1;

      // Amount statistics
      const amount = typeof intent.amount === 'string' ? parseFloat(intent.amount) : intent.amount;
      if (!isNaN(amount)) {
        amounts.push(amount);
      }

      // Date range
      if (intent.timestamp < earliest) earliest = intent.timestamp;
      if (intent.timestamp > latest) latest = intent.timestamp;

      // Email collection
      if (intent.userEmail) {
        emails.add(intent.userEmail);
      }
    }

    const totalAmount = amounts.reduce((sum, amount) => sum + amount, 0);

    return {
      totalIntents: allIntents.length,
      uniqueSessions: uniqueSessions.size,
      planDistribution,
      dateRange: { earliest, latest },
      amountStatistics: {
        total: totalAmount,
        average: amounts.length > 0 ? totalAmount / amounts.length : 0,
        min: amounts.length > 0 ? Math.min(...amounts) : 0,
        max: amounts.length > 0 ? Math.max(...amounts) : 0,
      },
      topEmails: Array.from(emails).slice(0, 10),
      dailyBreakdown,
    };
  }

  /**
   * Clean up old files based on retention policy
   */
  async cleanupOldFiles(): Promise<{ deletedFiles: string[]; totalSize: number }> {
    await this.initialize();
    
    const fileInfos = await this.getDataFiles();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.options.retentionDays);

    const deletedFiles: string[] = [];
    let totalSize = 0;

    for (const fileInfo of fileInfos) {
      const fileDate = new Date(fileInfo.date);
      
      if (fileDate < cutoffDate) {
        try {
          await fs.unlink(fileInfo.path);
          deletedFiles.push(fileInfo.filename);
          totalSize += fileInfo.size;
          console.log(`🗑️ Deleted old payment intent file: ${fileInfo.filename}`);
        } catch (error) {
          console.warn(`Failed to delete file ${fileInfo.filename}:`, error);
        }
      }
    }

    return { deletedFiles, totalSize };
  }

  /**
   * Get storage health information
   */
  async getStorageHealth(): Promise<{
    totalFiles: number;
    totalRecords: number;
    totalSize: number;
    oldestFile: string;
    newestFile: string;
    needsCleanup: boolean;
  }> {
    const fileInfos = await this.getDataFiles();
    
    const totalFiles = fileInfos.length;
    const totalRecords = fileInfos.reduce((sum, file) => sum + file.recordCount, 0);
    const totalSize = fileInfos.reduce((sum, file) => sum + file.size, 0);
    const oldestFile = fileInfos.length > 0 ? fileInfos[0].date : '';
    const newestFile = fileInfos.length > 0 ? fileInfos[fileInfos.length - 1].date : '';

    // Check if cleanup is needed
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - this.options.retentionDays);
    const needsCleanup = fileInfos.some(file => new Date(file.date) < cutoffDate);

    return {
      totalFiles,
      totalRecords,
      totalSize,
      oldestFile,
      newestFile,
      needsCleanup,
    };
  }
}

// Export singleton instance
export const paymentIntentStorage = new PaymentIntentStorage();