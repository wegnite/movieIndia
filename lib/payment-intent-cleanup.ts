import { promises as fs } from 'fs';
import { join } from 'path';
import { paymentIntentStorage } from './payment-intent-storage';
import { getIsoTimestr } from './time';

export interface CleanupResult {
  deletedFiles: string[];
  archivedFiles: string[];
  compressedFiles: string[];
  totalSpaceSaved: number;
  errors: string[];
}

export interface CleanupOptions {
  dryRun?: boolean;
  retentionDays?: number;
  archiveBeforeDelete?: boolean;
  compressOldFiles?: boolean;
  maxFileSize?: number;
}

export class PaymentIntentCleanupService {
  private readonly storage = paymentIntentStorage;

  /**
   * Perform comprehensive cleanup of payment intent data
   */
  async performCleanup(options: CleanupOptions = {}): Promise<CleanupResult> {
    const {
      dryRun = false,
      retentionDays = 365,
      archiveBeforeDelete = true,
      compressOldFiles = false,
      maxFileSize = 50 * 1024 * 1024 // 50MB
    } = options;

    const result: CleanupResult = {
      deletedFiles: [],
      archivedFiles: [],
      compressedFiles: [],
      totalSpaceSaved: 0,
      errors: []
    };

    console.log(`🧹 Starting payment intent cleanup (${dryRun ? 'DRY RUN' : 'LIVE'})`);

    try {
      // Step 1: Get all data files
      const dataFiles = await this.storage.getDataFiles();
      console.log(`📊 Found ${dataFiles.length} data files`);

      // Step 2: Identify files for cleanup
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

      const filesToDelete: typeof dataFiles = [];
      const filesToCompress: typeof dataFiles = [];
      const filesToArchive: typeof dataFiles = [];

      for (const file of dataFiles) {
        const fileDate = new Date(file.date);
        
        if (fileDate < cutoffDate) {
          if (archiveBeforeDelete) {
            filesToArchive.push(file);
          } else {
            filesToDelete.push(file);
          }
        } else if (compressOldFiles && file.size > maxFileSize) {
          filesToCompress.push(file);
        }
      }

      // Step 3: Archive files if requested
      if (archiveBeforeDelete && filesToArchive.length > 0) {
        console.log(`📦 Archiving ${filesToArchive.length} files`);
        
        for (const file of filesToArchive) {
          try {
            if (!dryRun) {
              await this.archiveFile(file);
            }
            result.archivedFiles.push(file.filename);
            result.totalSpaceSaved += file.size;
          } catch (error) {
            const errorMsg = `Failed to archive ${file.filename}: ${error instanceof Error ? error.message : 'Unknown error'}`;
            result.errors.push(errorMsg);
            console.error(errorMsg);
          }
        }

        // After archiving, add to delete list
        filesToDelete.push(...filesToArchive);
      }

      // Step 4: Delete old files
      if (filesToDelete.length > 0) {
        console.log(`🗑️ Deleting ${filesToDelete.length} old files`);
        
        for (const file of filesToDelete) {
          try {
            if (!dryRun) {
              await fs.unlink(file.path);
            }
            result.deletedFiles.push(file.filename);
            if (!archiveBeforeDelete) {
              result.totalSpaceSaved += file.size;
            }
          } catch (error) {
            const errorMsg = `Failed to delete ${file.filename}: ${error instanceof Error ? error.message : 'Unknown error'}`;
            result.errors.push(errorMsg);
            console.error(errorMsg);
          }
        }
      }

      // Step 5: Compress large files if requested
      if (compressOldFiles && filesToCompress.length > 0) {
        console.log(`🗜️ Compressing ${filesToCompress.length} large files`);
        
        for (const file of filesToCompress) {
          try {
            if (!dryRun) {
              const spaceSaved = await this.compressFile(file);
              result.totalSpaceSaved += spaceSaved;
            }
            result.compressedFiles.push(file.filename);
          } catch (error) {
            const errorMsg = `Failed to compress ${file.filename}: ${error instanceof Error ? error.message : 'Unknown error'}`;
            result.errors.push(errorMsg);
            console.error(errorMsg);
          }
        }
      }

      // Step 6: Clean up lock files
      if (!dryRun) {
        await this.cleanupLockFiles();
      }

      console.log(`✅ Cleanup completed. Space saved: ${this.formatBytes(result.totalSpaceSaved)}`);

    } catch (error) {
      const errorMsg = `Cleanup failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      result.errors.push(errorMsg);
      console.error(errorMsg);
    }

    return result;
  }

  /**
   * Archive a file by moving it to archive directory
   */
  private async archiveFile(fileInfo: { filename: string; path: string; date: string }): Promise<void> {
    const archiveDir = join(fileInfo.path, '..', 'archive');
    
    // Ensure archive directory exists
    await fs.mkdir(archiveDir, { recursive: true });
    
    // Create archive filename with timestamp
    const timestamp = getIsoTimestr().replace(/[:.]/g, '-');
    const archiveFilename = `${fileInfo.filename.replace('.json', '')}-archived-${timestamp}.json`;
    const archivePath = join(archiveDir, archiveFilename);
    
    // Move file to archive
    await fs.rename(fileInfo.path, archivePath);
    
    console.log(`📦 Archived: ${fileInfo.filename} → ${archiveFilename}`);
  }

  /**
   * Compress a file using gzip (placeholder implementation)
   */
  private async compressFile(fileInfo: { filename: string; path: string; size: number }): Promise<number> {
    // This is a placeholder for file compression
    // In a real implementation, you would use zlib or similar
    
    console.log(`🗜️ Compressing: ${fileInfo.filename} (${this.formatBytes(fileInfo.size)})`);
    
    // Simulate compression savings (typically 60-80% for JSON files)
    const compressionRatio = 0.7;
    const spaceSaved = Math.floor(fileInfo.size * compressionRatio);
    
    // TODO: Implement actual compression using zlib
    // const compressed = await gzip(await fs.readFile(fileInfo.path));
    // await fs.writeFile(fileInfo.path + '.gz', compressed);
    // await fs.unlink(fileInfo.path);
    
    return spaceSaved;
  }

  /**
   * Clean up stale lock files
   */
  private async cleanupLockFiles(): Promise<void> {
    try {
      const lockDir = join(await this.storage.getDataFiles().then(files => 
        files[0]?.path || join(process.cwd(), 'data', 'payment-intents')
      ), '..', '.locks');
      
      const lockFiles = await fs.readdir(lockDir).catch(() => []);
      
      for (const lockFile of lockFiles) {
        if (lockFile.endsWith('.lock')) {
          const lockPath = join(lockDir, lockFile);
          
          try {
            const stats = await fs.stat(lockPath);
            const ageMinutes = (Date.now() - stats.mtime.getTime()) / (1000 * 60);
            
            // Remove lock files older than 10 minutes (assume stale)
            if (ageMinutes > 10) {
              await fs.unlink(lockPath);
              console.log(`🔓 Removed stale lock: ${lockFile}`);
            }
          } catch (error) {
            // Lock file may have been removed by another process
          }
        }
      }
    } catch (error) {
      console.warn('Failed to clean up lock files:', error);
    }
  }

  /**
   * Get cleanup recommendations
   */
  async getCleanupRecommendations(): Promise<{
    totalFiles: number;
    totalSize: number;
    oldFiles: number;
    oldFilesSize: number;
    largeFiles: number;
    largeFilesSize: number;
    recommendations: string[];
  }> {
    const dataFiles = await this.storage.getDataFiles();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 365); // Default retention
    
    const totalFiles = dataFiles.length;
    const totalSize = dataFiles.reduce((sum, file) => sum + file.size, 0);
    
    const oldFiles = dataFiles.filter(file => new Date(file.date) < cutoffDate);
    const oldFilesSize = oldFiles.reduce((sum, file) => sum + file.size, 0);
    
    const largeFiles = dataFiles.filter(file => file.size > 10 * 1024 * 1024); // >10MB
    const largeFilesSize = largeFiles.reduce((sum, file) => sum + file.size, 0);
    
    const recommendations: string[] = [];
    
    if (oldFiles.length > 0) {
      recommendations.push(`🗑️ Delete ${oldFiles.length} old files to save ${this.formatBytes(oldFilesSize)}`);
    }
    
    if (largeFiles.length > 0) {
      recommendations.push(`🗜️ Compress ${largeFiles.length} large files (potential ${this.formatBytes(largeFilesSize * 0.7)} savings)`);
    }
    
    if (totalSize > 100 * 1024 * 1024) { // >100MB
      recommendations.push(`💾 Consider implementing automated cleanup - total size is ${this.formatBytes(totalSize)}`);
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ No cleanup needed at this time');
    }
    
    return {
      totalFiles,
      totalSize,
      oldFiles: oldFiles.length,
      oldFilesSize,
      largeFiles: largeFiles.length,
      largeFilesSize,
      recommendations
    };
  }

  /**
   * Schedule automatic cleanup (for cron jobs)
   */
  async scheduleCleanup(options: CleanupOptions = {}): Promise<CleanupResult> {
    console.log('⏰ Running scheduled payment intent cleanup...');
    
    const result = await this.performCleanup({
      ...options,
      dryRun: false,
      archiveBeforeDelete: true,
      retentionDays: options.retentionDays || 365
    });
    
    // Log summary
    console.log('📊 Cleanup Summary:');
    console.log(`  - Deleted files: ${result.deletedFiles.length}`);
    console.log(`  - Archived files: ${result.archivedFiles.length}`);
    console.log(`  - Compressed files: ${result.compressedFiles.length}`);
    console.log(`  - Space saved: ${this.formatBytes(result.totalSpaceSaved)}`);
    console.log(`  - Errors: ${result.errors.length}`);
    
    if (result.errors.length > 0) {
      console.error('❌ Errors during cleanup:', result.errors);
    }
    
    return result;
  }

  /**
   * Format bytes as human readable string
   */
  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Export singleton instance
export const paymentIntentCleanup = new PaymentIntentCleanupService();