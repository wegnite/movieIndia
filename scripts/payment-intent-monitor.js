#!/usr/bin/env node

/**
 * Payment Intent Storage Monitoring Script
 * 
 * This script monitors the payment intent storage system and provides
 * real-time insights, health checks, and automated cleanup capabilities.
 * 
 * Usage:
 *   node payment-intent-monitor.js [command] [options]
 * 
 * Commands:
 *   health      - Check storage health
 *   stats       - Show statistics
 *   cleanup     - Run cleanup (dry-run by default)
 *   watch       - Monitor in real-time
 *   export      - Export data
 */

const fs = require('fs');
const path = require('path');

// Command line argument parsing
const args = process.argv.slice(2);
const command = args[0] || 'help';
const flags = {};

// Parse flags
args.slice(1).forEach(arg => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.substring(2).split('=');
    flags[key] = value || true;
  }
});

/**
 * Display help information
 */
function showHelp() {
  console.log(`
Payment Intent Storage Monitor

USAGE:
  node payment-intent-monitor.js <command> [options]

COMMANDS:
  health                     Check storage health and recommendations
  stats [--days=N]          Show statistics for last N days (default: 30)
  cleanup [--live]          Run cleanup (use --live for actual cleanup)
  watch [--interval=N]      Monitor in real-time (default interval: 30s)
  export [--format=csv|json] Export data to file
  help                      Show this help message

OPTIONS:
  --days=N                  Number of days to look back
  --live                    Execute live operations (not dry-run)
  --interval=N              Monitoring interval in seconds
  --format=FORMAT           Export format (csv, json)
  --output=FILE             Output file path

EXAMPLES:
  node payment-intent-monitor.js health
  node payment-intent-monitor.js stats --days=7
  node payment-intent-monitor.js cleanup --live
  node payment-intent-monitor.js watch --interval=60
  node payment-intent-monitor.js export --format=csv --output=./data.csv
`);
}

/**
 * Check storage health
 */
async function checkHealth() {
  console.log('🏥 Checking Payment Intent Storage Health...\n');
  
  try {
    const response = await fetch('http://localhost:3000/api/payment-intent/cleanup?action=health');
    const result = await response.json();
    
    if (!response.ok || result.code !== 0) {
      console.error('❌ Failed to get health information:', result.message);
      return;
    }
    
    const health = result.data;
    const statusIcon = health.status === 'healthy' ? '✅' : '⚠️';
    
    console.log(`${statusIcon} Storage Status: ${health.status.toUpperCase()}`);
    console.log(`📁 Total Files: ${health.totalFiles}`);
    console.log(`📄 Total Records: ${health.totalRecords.toLocaleString()}`);
    console.log(`💾 Total Size: ${formatBytes(health.totalSize)}`);
    console.log(`📅 Date Range: ${health.oldestFile} → ${health.newestFile}`);
    console.log(`🧹 Needs Cleanup: ${health.needsCleanup ? 'Yes' : 'No'}\n`);
    
    // Get recommendations
    const recResponse = await fetch('http://localhost:3000/api/payment-intent/cleanup?action=recommendations');
    const recResult = await recResponse.json();
    
    if (recResponse.ok && recResult.code === 0) {
      console.log('💡 Recommendations:');
      recResult.data.recommendations.forEach(rec => {
        console.log(`  ${rec}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
  }
}

/**
 * Show statistics
 */
async function showStats() {
  const days = parseInt(flags.days) || 30;
  console.log(`📊 Payment Intent Statistics (Last ${days} days)...\n`);
  
  try {
    const response = await fetch(`http://localhost:3000/api/payment-intent/analytics?daysBack=${days}`);
    const result = await response.json();
    
    if (!response.ok || result.code !== 0) {
      console.error('❌ Failed to get statistics:', result.message);
      return;
    }
    
    const stats = result.data;
    
    console.log('📈 Overview:');
    console.log(`  Total Intents: ${stats.basicStats.totalIntents.toLocaleString()}`);
    console.log(`  Unique Sessions: ${stats.basicStats.uniqueSessions.toLocaleString()}`);
    console.log(`  Total Revenue: $${stats.basicStats.amountStatistics.total.toLocaleString()}`);
    console.log(`  Average Amount: $${stats.basicStats.amountStatistics.average.toFixed(2)}\n`);
    
    console.log('📋 Plan Performance:');
    Object.entries(stats.basicStats.planDistribution)
      .sort(([,a], [,b]) => b - a)
      .forEach(([plan, count]) => {
        console.log(`  ${plan}: ${count} (${((count / stats.basicStats.totalIntents) * 100).toFixed(1)}%)`);
      });
    
    console.log('\n📅 Day of Week Distribution:');
    Object.entries(stats.timeAnalysis.dayOfWeek)
      .forEach(([day, count]) => {
        const bar = '█'.repeat(Math.ceil(count / Math.max(...Object.values(stats.timeAnalysis.dayOfWeek)) * 20));
        console.log(`  ${day.padEnd(9)}: ${count.toString().padStart(3)} ${bar}`);
      });
    
    console.log('\n🌐 Top User Agents:');
    stats.userAnalysis.topUserAgents.slice(0, 5).forEach((ua, index) => {
      console.log(`  ${index + 1}. ${ua.userAgent.substring(0, 60)}... (${ua.count})`);
    });
    
    console.log('\n🔄 Conversion Analysis:');
    const conversion = stats.businessIntelligence.conversionFunnel;
    console.log(`  Total Intents: ${conversion.totalIntents}`);
    console.log(`  With Email: ${conversion.withEmail} (${conversion.conversionRate.toFixed(1)}%)`);
    console.log(`  With Feedback: ${conversion.withFeedback} (${((conversion.withFeedback / conversion.totalIntents) * 100).toFixed(1)}%)`);
    
  } catch (error) {
    console.error('❌ Statistics failed:', error.message);
  }
}

/**
 * Run cleanup
 */
async function runCleanup() {
  const isLive = flags.live === true;
  console.log(`🧹 Running Cleanup ${isLive ? '(LIVE)' : '(DRY RUN)'}...\n`);
  
  try {
    const response = await fetch('http://localhost:3000/api/payment-intent/cleanup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dryRun: !isLive,
        retentionDays: 365,
        archiveBeforeDelete: true,
        compressOldFiles: false,
      }),
    });
    
    const result = await response.json();
    
    if (!response.ok || result.code !== 0) {
      console.error('❌ Cleanup failed:', result.message);
      return;
    }
    
    const cleanup = result.data;
    
    console.log('📊 Cleanup Results:');
    console.log(`  Operation: ${cleanup.operation}`);
    console.log(`  Files Deleted: ${cleanup.deletedFiles.length}`);
    console.log(`  Files Archived: ${cleanup.archivedFiles.length}`);
    console.log(`  Files Compressed: ${cleanup.compressedFiles.length}`);
    console.log(`  Space Saved: ${formatBytes(cleanup.totalSpaceSaved)}`);
    
    if (cleanup.errors.length > 0) {
      console.log('\n❌ Errors:');
      cleanup.errors.forEach(error => console.log(`  ${error}`));
    }
    
    if (!isLive) {
      console.log('\n💡 This was a dry run. Use --live flag to execute actual cleanup.');
    }
    
  } catch (error) {
    console.error('❌ Cleanup error:', error.message);
  }
}

/**
 * Export data
 */
async function exportData() {
  const format = flags.format || 'json';
  const output = flags.output || `payment-intents-export-${new Date().toISOString().split('T')[0]}.${format}`;
  
  console.log(`📤 Exporting data in ${format.toUpperCase()} format...\n`);
  
  try {
    const response = await fetch('http://localhost:3000/api/payment-intent/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filters: {},
        pagination: { limit: 10000 },
        format: format,
        includeStats: true,
      }),
    });
    
    if (!response.ok) {
      console.error('❌ Export failed');
      return;
    }
    
    const content = format === 'csv' ? await response.text() : JSON.stringify(await response.json(), null, 2);
    
    fs.writeFileSync(output, content);
    console.log(`✅ Data exported to: ${output}`);
    console.log(`📊 File size: ${formatBytes(fs.statSync(output).size)}`);
    
  } catch (error) {
    console.error('❌ Export error:', error.message);
  }
}

/**
 * Watch mode for real-time monitoring
 */
async function watchMode() {
  const interval = parseInt(flags.interval) || 30;
  console.log(`👁️  Starting real-time monitoring (${interval}s intervals)...\n`);
  console.log('Press Ctrl+C to stop\n');
  
  let lastStats = null;
  
  const monitor = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/payment-intent/analytics?daysBack=1');
      const result = await response.json();
      
      if (response.ok && result.code === 0) {
        const stats = result.data.basicStats;
        const now = new Date().toISOString().substring(11, 19);
        
        if (lastStats) {
          const newIntents = stats.totalIntents - lastStats.totalIntents;
          if (newIntents > 0) {
            console.log(`[${now}] 🆕 ${newIntents} new intent(s) | Total: ${stats.totalIntents} | Sessions: ${stats.uniqueSessions}`);
          } else {
            console.log(`[${now}] ⏸️  No new intents | Total: ${stats.totalIntents} | Sessions: ${stats.uniqueSessions}`);
          }
        } else {
          console.log(`[${now}] 📊 Current: ${stats.totalIntents} intents, ${stats.uniqueSessions} sessions`);
        }
        
        lastStats = stats;
      } else {
        console.log(`[${now}] ❌ Failed to fetch stats`);
      }
    } catch (error) {
      const now = new Date().toISOString().substring(11, 19);
      console.log(`[${now}] ❌ Monitor error: ${error.message}`);
    }
  };
  
  // Initial run
  await monitor();
  
  // Set up interval
  const intervalId = setInterval(monitor, interval * 1000);
  
  // Handle Ctrl+C
  process.on('SIGINT', () => {
    console.log('\n👋 Stopping monitor...');
    clearInterval(intervalId);
    process.exit(0);
  });
}

/**
 * Format bytes as human readable string
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Check if server is running
 */
async function checkServer() {
  try {
    const response = await fetch('http://localhost:3000/api/ping', { 
      timeout: 5000 
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Main command handler
 */
async function main() {
  // Check server connection first
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.error('❌ Cannot connect to server at http://localhost:3000');
    console.log('💡 Please ensure the development server is running: pnpm dev');
    process.exit(1);
  }
  
  switch (command) {
    case 'health':
      await checkHealth();
      break;
    case 'stats':
      await showStats();
      break;
    case 'cleanup':
      await runCleanup();
      break;
    case 'export':
      await exportData();
      break;
    case 'watch':
      await watchMode();
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Monitor crashed:', error);
    process.exit(1);
  });
}

module.exports = { main };