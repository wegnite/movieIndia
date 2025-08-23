export interface PaymentIntentData {
  id: string;
  timestamp: string;
  planName: string;
  amount: string | number;
  userEmail?: string;
  userAgent: string;
  ipAddress: string;
  feedback?: string;
  sessionId: string;
  createdAt: Date;
}

export interface PaymentIntentRecord {
  data: PaymentIntentData;
  metadata: {
    fileVersion: string;
    savedAt: string;
  };
}

export interface PaymentIntentStats {
  totalIntents: number;
  uniqueSessions: number;
  planDistribution: Record<string, number>;
  dateRange: {
    earliest: string;
    latest: string;
  };
  amountStatistics: {
    total: number;
    average: number;
    min: number;
    max: number;
  };
  topEmails?: string[];
  dailyBreakdown: Record<string, number>;
}

export interface PaymentIntentQueryOptions {
  startDate?: Date;
  endDate?: Date;
  planName?: string;
  userEmail?: string;
  sessionId?: string;
  limit?: number;
  offset?: number;
}

export interface PaymentIntentFileInfo {
  filename: string;
  path: string;
  date: string;
  size: number;
  recordCount: number;
}

export interface PaymentIntentStorageOptions {
  maxFileSize?: number; // in bytes
  maxRecordsPerFile?: number;
  retentionDays?: number;
  enableCompression?: boolean;
}