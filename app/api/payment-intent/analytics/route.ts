import { NextRequest } from 'next/server';
import { generateAnalyticsReport } from '@/lib/payment-intent-analytics';
import { respData, respErr } from '@/lib/resp';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse date filters
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');
    const daysBack = parseInt(searchParams.get('daysBack') || '30');

    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (startDateParam) {
      startDate = new Date(startDateParam);
    } else if (daysBack) {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - daysBack);
    }

    if (endDateParam) {
      endDate = new Date(endDateParam);
    }

    console.log(`📊 Generating analytics report for period: ${startDate?.toISOString()} to ${endDate?.toISOString() || 'now'}`);

    const report = await generateAnalyticsReport(startDate, endDate);

    return respData({
      ...report,
      generatedAt: new Date().toISOString(),
      filters: {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        daysBack: startDate && !startDateParam ? daysBack : undefined,
      },
    });

  } catch (error) {
    console.error('Error generating analytics report:', error);
    return respErr(`Failed to generate analytics: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      startDate: startDateStr, 
      endDate: endDateStr,
      format = 'json',
      includeRawData = false 
    } = body;

    const startDate = startDateStr ? new Date(startDateStr) : undefined;
    const endDate = endDateStr ? new Date(endDateStr) : undefined;

    const report = await generateAnalyticsReport(startDate, endDate);

    if (format === 'csv') {
      // Convert to CSV format for download
      const csvData = convertReportToCSV(report);
      
      return new Response(csvData, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="payment-intent-analytics-${new Date().toISOString().split('T')[0]}.csv"`
        }
      });
    }

    return respData({
      ...report,
      generatedAt: new Date().toISOString(),
      exportFormat: format,
    });

  } catch (error) {
    console.error('Error generating custom analytics report:', error);
    return respErr(`Failed to generate custom analytics: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Convert analytics report to CSV format
 */
function convertReportToCSV(report: any): string {
  const csvLines: string[] = [];
  
  // Basic stats header
  csvLines.push('Payment Intent Analytics Report');
  csvLines.push(`Generated: ${new Date().toISOString()}`);
  csvLines.push(`Period: ${report.period.start} to ${report.period.end}`);
  csvLines.push('');
  
  // Basic statistics
  csvLines.push('Basic Statistics');
  csvLines.push('Metric,Value');
  csvLines.push(`Total Intents,${report.basicStats.totalIntents}`);
  csvLines.push(`Unique Sessions,${report.basicStats.uniqueSessions}`);
  csvLines.push(`Total Revenue,${report.basicStats.amountStatistics.total}`);
  csvLines.push(`Average Amount,${report.basicStats.amountStatistics.average}`);
  csvLines.push('');

  // Plan distribution
  csvLines.push('Plan Distribution');
  csvLines.push('Plan,Count');
  for (const [plan, count] of Object.entries(report.basicStats.planDistribution)) {
    csvLines.push(`${plan},${count}`);
  }
  csvLines.push('');

  // Day of week distribution
  csvLines.push('Day of Week Distribution');
  csvLines.push('Day,Count');
  for (const [day, count] of Object.entries(report.timeAnalysis.dayOfWeek)) {
    csvLines.push(`${day},${count}`);
  }
  csvLines.push('');

  // Top user agents
  csvLines.push('Top User Agents');
  csvLines.push('User Agent,Count');
  report.userAnalysis.topUserAgents.forEach((ua: any) => {
    csvLines.push(`"${ua.userAgent}",${ua.count}`);
  });

  return csvLines.join('\n');
}