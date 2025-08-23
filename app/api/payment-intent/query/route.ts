import { NextRequest } from 'next/server';
import { paymentIntentStorage } from '@/lib/payment-intent-storage';
import { PaymentIntentQueryOptions } from '@/types/payment-intent';
import { respData, respErr } from '@/lib/resp';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Build query options from search parameters
    const queryOptions: PaymentIntentQueryOptions = {};

    // Date filters
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    const daysBack = parseInt(searchParams.get('daysBack') || '');

    if (startDateParam) {
      queryOptions.startDate = new Date(startDateParam);
    } else if (!isNaN(daysBack) && daysBack > 0) {
      queryOptions.startDate = new Date();
      queryOptions.startDate.setDate(queryOptions.startDate.getDate() - daysBack);
    }

    if (endDateParam) {
      queryOptions.endDate = new Date(endDateParam);
    }

    // Other filters
    const planName = searchParams.get('planName');
    const userEmail = searchParams.get('userEmail');
    const sessionId = searchParams.get('sessionId');

    if (planName) queryOptions.planName = planName;
    if (userEmail) queryOptions.userEmail = userEmail;
    if (sessionId) queryOptions.sessionId = sessionId;

    // Pagination
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    queryOptions.limit = Math.min(limit, 1000); // Max 1000 records
    queryOptions.offset = Math.max(offset, 0);

    console.log('🔍 Querying payment intents with options:', queryOptions);

    // Execute query
    const results = await paymentIntentStorage.queryPaymentIntents(queryOptions);
    
    // Get statistics for the same period
    const stats = await paymentIntentStorage.generateStatistics();

    return respData({
      results,
      pagination: {
        limit: queryOptions.limit,
        offset: queryOptions.offset,
        total: results.length,
        hasMore: results.length === queryOptions.limit,
      },
      filters: {
        startDate: queryOptions.startDate?.toISOString(),
        endDate: queryOptions.endDate?.toISOString(),
        planName: queryOptions.planName,
        userEmail: queryOptions.userEmail,
        sessionId: queryOptions.sessionId,
      },
      summary: {
        totalRecords: stats.totalIntents,
        uniqueSessions: stats.uniqueSessions,
        dateRange: stats.dateRange,
      },
      queriedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error querying payment intents:', error);
    return respErr(`Query failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      filters = {},
      pagination = {},
      includeStats = true,
      format = 'json',
    } = body;

    // Build query options
    const queryOptions: PaymentIntentQueryOptions = {
      ...filters,
      limit: Math.min(pagination.limit || 100, 1000),
      offset: Math.max(pagination.offset || 0, 0),
    };

    // Parse date strings
    if (filters.startDate) {
      queryOptions.startDate = new Date(filters.startDate);
    }
    if (filters.endDate) {
      queryOptions.endDate = new Date(filters.endDate);
    }

    console.log('🔍 Advanced query with options:', queryOptions);

    // Execute query
    const results = await paymentIntentStorage.queryPaymentIntents(queryOptions);
    
    let stats = null;
    if (includeStats) {
      stats = await paymentIntentStorage.generateStatistics();
    }

    const response = {
      results,
      pagination: {
        limit: queryOptions.limit,
        offset: queryOptions.offset,
        total: results.length,
        hasMore: results.length === queryOptions.limit,
      },
      filters: queryOptions,
      stats: stats,
      queriedAt: new Date().toISOString(),
    };

    // Handle different export formats
    if (format === 'csv') {
      const csvData = convertToCSV(results);
      return new Response(csvData, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="payment-intents-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    } else if (format === 'excel') {
      // For Excel format, return JSON with Excel MIME type
      // Frontend can handle the actual Excel conversion
      return new Response(JSON.stringify(response), {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename="payment-intents-${new Date().toISOString().split('T')[0]}.xlsx"`
        }
      });
    }

    return respData(response);

  } catch (error) {
    console.error('Error executing advanced query:', error);
    return respErr(`Advanced query failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Convert payment intent data to CSV format
 */
function convertToCSV(data: any[]): string {
  if (data.length === 0) {
    return 'No data available';
  }

  const headers = [
    'ID',
    'Timestamp',
    'Plan Name',
    'Amount',
    'User Email',
    'User Agent',
    'IP Address',
    'Session ID',
    'Feedback',
    'Created At'
  ];

  const csvRows = [headers.join(',')];

  data.forEach(item => {
    const row = [
      item.id || '',
      item.timestamp || '',
      item.planName || '',
      item.amount || '',
      item.userEmail || '',
      `"${(item.userAgent || '').replace(/"/g, '""')}"`, // Escape quotes
      item.ipAddress || '',
      item.sessionId || '',
      `"${(item.feedback || '').replace(/"/g, '""')}"`, // Escape quotes
      item.createdAt || ''
    ];
    csvRows.push(row.join(','));
  });

  return csvRows.join('\n');
}