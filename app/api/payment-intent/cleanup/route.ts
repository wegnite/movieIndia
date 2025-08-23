import { NextRequest } from 'next/server';
import { paymentIntentCleanup } from '@/lib/payment-intent-cleanup';
import { paymentIntentStorage } from '@/lib/payment-intent-storage';
import { respData, respErr } from '@/lib/resp';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'recommendations';

    if (action === 'recommendations') {
      // Get cleanup recommendations
      const recommendations = await paymentIntentCleanup.getCleanupRecommendations();
      const healthInfo = await paymentIntentStorage.getStorageHealth();

      return respData({
        ...recommendations,
        healthInfo,
        timestamp: new Date().toISOString(),
      });

    } else if (action === 'health') {
      // Get storage health information
      const healthInfo = await paymentIntentStorage.getStorageHealth();
      
      return respData({
        ...healthInfo,
        status: healthInfo.needsCleanup ? 'needs_cleanup' : 'healthy',
        timestamp: new Date().toISOString(),
      });

    } else {
      return respErr('Invalid action. Use "recommendations" or "health"');
    }

  } catch (error) {
    console.error('Error getting cleanup information:', error);
    return respErr(`Failed to get cleanup information: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      dryRun = true,
      retentionDays = 365,
      archiveBeforeDelete = true,
      compressOldFiles = false,
      maxFileSize = 50 * 1024 * 1024, // 50MB
      action = 'cleanup'
    } = body;

    if (action === 'cleanup') {
      console.log(`🧹 Starting cleanup operation (dryRun: ${dryRun})`);
      
      const result = await paymentIntentCleanup.performCleanup({
        dryRun,
        retentionDays,
        archiveBeforeDelete,
        compressOldFiles,
        maxFileSize,
      });

      return respData({
        ...result,
        operation: dryRun ? 'dry_run' : 'cleanup_executed',
        settings: {
          dryRun,
          retentionDays,
          archiveBeforeDelete,
          compressOldFiles,
          maxFileSize,
        },
        executedAt: new Date().toISOString(),
      });

    } else if (action === 'schedule') {
      // Execute scheduled cleanup (for cron jobs)
      console.log('⏰ Executing scheduled cleanup');
      
      const result = await paymentIntentCleanup.scheduleCleanup({
        retentionDays,
        archiveBeforeDelete,
        compressOldFiles,
        maxFileSize,
      });

      return respData({
        ...result,
        operation: 'scheduled_cleanup',
        executedAt: new Date().toISOString(),
      });

    } else {
      return respErr('Invalid action. Use "cleanup" or "schedule"');
    }

  } catch (error) {
    console.error('Error performing cleanup:', error);
    return respErr(`Cleanup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const confirm = searchParams.get('confirm');
    
    if (confirm !== 'yes') {
      return respErr('This operation requires confirmation. Add ?confirm=yes to proceed.');
    }

    console.log('🗑️ Emergency cleanup requested - deleting old files immediately');
    
    const result = await paymentIntentCleanup.performCleanup({
      dryRun: false,
      retentionDays: 30, // Aggressive cleanup - keep only 30 days
      archiveBeforeDelete: false, // Skip archiving for emergency cleanup
      compressOldFiles: false,
    });

    return respData({
      ...result,
      operation: 'emergency_cleanup',
      warning: 'Files were permanently deleted without archiving',
      executedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error performing emergency cleanup:', error);
    return respErr(`Emergency cleanup failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}