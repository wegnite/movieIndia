#!/usr/bin/env node

/**
 * Test script for Payment Intent Storage System
 * 
 * This script demonstrates and tests the file-based payment intent persistence system
 * including data storage, querying, analytics, and cleanup functionality.
 */

const fs = require('fs');
const path = require('path');

// Mock data for testing
const mockPaymentIntents = [
  {
    planName: 'Premium Plan',
    amount: '29.99',
    userEmail: 'user1@example.com',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    feedback: 'Interested in premium features',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    planName: 'Basic Plan',
    amount: '9.99',
    userEmail: 'user2@example.com',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    feedback: 'Looking for basic features',
    timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  },
  {
    planName: 'Pro Plan',
    amount: '49.99',
    userEmail: 'user3@example.com',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
    feedback: '',
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
  },
  {
    planName: 'Premium Plan',
    amount: '29.99',
    userEmail: 'user4@example.com',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
    feedback: 'Second attempt at premium',
    timestamp: new Date().toISOString(), // now
  }
];

/**
 * Test payment intent creation via API
 */
async function testPaymentIntentCreation() {
  console.log('🧪 Testing Payment Intent Creation...');
  
  for (const [index, intent] of mockPaymentIntents.entries()) {
    try {
      const response = await fetch('http://localhost:3000/api/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(intent),
      });

      const result = await response.json();
      
      if (response.ok && result.code === 0) {
        console.log(`✅ Intent ${index + 1} created:`, result.data.paymentIntentId);
      } else {
        console.error(`❌ Intent ${index + 1} failed:`, result.message);
      }
      
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Intent ${index + 1} error:`, error.message);
    }
  }
}

/**
 * Test analytics endpoint
 */
async function testAnalytics() {
  console.log('📊 Testing Analytics...');
  
  try {
    const response = await fetch('http://localhost:3000/api/payment-intent/analytics?daysBack=7');
    const result = await response.json();
    
    if (response.ok && result.code === 0) {
      console.log('✅ Analytics generated successfully');
      console.log('📈 Basic Stats:');
      console.log(`  - Total Intents: ${result.data.basicStats.totalIntents}`);
      console.log(`  - Unique Sessions: ${result.data.basicStats.uniqueSessions}`);
      console.log(`  - Total Revenue: $${result.data.basicStats.amountStatistics.total}`);
      console.log(`  - Average Amount: $${result.data.basicStats.amountStatistics.average.toFixed(2)}`);
      
      console.log('📋 Plan Distribution:');
      Object.entries(result.data.basicStats.planDistribution).forEach(([plan, count]) => {
        console.log(`  - ${plan}: ${count}`);
      });
    } else {
      console.error('❌ Analytics failed:', result.message);
    }
  } catch (error) {
    console.error('❌ Analytics error:', error.message);
  }
}

/**
 * Test query endpoint
 */
async function testQuery() {
  console.log('🔍 Testing Query...');
  
  try {
    const response = await fetch('http://localhost:3000/api/payment-intent/query?limit=5');
    const result = await response.json();
    
    if (response.ok && result.code === 0) {
      console.log('✅ Query executed successfully');
      console.log(`📋 Found ${result.data.results.length} records`);
      
      result.data.results.forEach((intent, index) => {
        console.log(`  ${index + 1}. ${intent.planName} - $${intent.amount} (${intent.userEmail})`);
      });
    } else {
      console.error('❌ Query failed:', result.message);
    }
  } catch (error) {
    console.error('❌ Query error:', error.message);
  }
}

/**
 * Test cleanup recommendations
 */
async function testCleanupRecommendations() {
  console.log('🧹 Testing Cleanup Recommendations...');
  
  try {
    const response = await fetch('http://localhost:3000/api/payment-intent/cleanup?action=recommendations');
    const result = await response.json();
    
    if (response.ok && result.code === 0) {
      console.log('✅ Cleanup recommendations generated');
      console.log(`📊 Storage Info:`);
      console.log(`  - Total Files: ${result.data.totalFiles}`);
      console.log(`  - Total Records: ${result.data.totalRecords}`);
      console.log(`  - Total Size: ${formatBytes(result.data.totalSize)}`);
      
      console.log('💡 Recommendations:');
      result.data.recommendations.forEach(rec => {
        console.log(`  ${rec}`);
      });
    } else {
      console.error('❌ Cleanup recommendations failed:', result.message);
    }
  } catch (error) {
    console.error('❌ Cleanup recommendations error:', error.message);
  }
}

/**
 * Test storage health check
 */
async function testStorageHealth() {
  console.log('🏥 Testing Storage Health...');
  
  try {
    const response = await fetch('http://localhost:3000/api/payment-intent/cleanup?action=health');
    const result = await response.json();
    
    if (response.ok && result.code === 0) {
      const health = result.data;
      console.log('✅ Storage health check completed');
      console.log(`📊 Health Status: ${health.status}`);
      console.log(`📁 Files: ${health.totalFiles}`);
      console.log(`📄 Records: ${health.totalRecords}`);
      console.log(`💾 Size: ${formatBytes(health.totalSize)}`);
      console.log(`📅 Date Range: ${health.oldestFile} to ${health.newestFile}`);
      console.log(`🧹 Needs Cleanup: ${health.needsCleanup ? 'Yes' : 'No'}`);
    } else {
      console.error('❌ Storage health check failed:', result.message);
    }
  } catch (error) {
    console.error('❌ Storage health check error:', error.message);
  }
}

/**
 * Test CSV export
 */
async function testCSVExport() {
  console.log('📄 Testing CSV Export...');
  
  try {
    const response = await fetch('http://localhost:3000/api/payment-intent/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filters: {},
        pagination: { limit: 10 },
        format: 'csv',
      }),
    });
    
    if (response.ok && response.headers.get('content-type')?.includes('text/csv')) {
      const csvContent = await response.text();
      const lines = csvContent.split('\n');
      
      console.log('✅ CSV export successful');
      console.log(`📊 Generated ${lines.length} lines`);
      console.log('📄 Preview (first 3 lines):');
      lines.slice(0, 3).forEach((line, index) => {
        console.log(`  ${index + 1}: ${line.substring(0, 80)}${line.length > 80 ? '...' : ''}`);
      });
    } else {
      console.error('❌ CSV export failed');
    }
  } catch (error) {
    console.error('❌ CSV export error:', error.message);
  }
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
    const response = await fetch('http://localhost:3000/api/ping');
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('🚀 Payment Intent Storage System Test Suite');
  console.log('=' .repeat(50));

  // Check if server is running
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.error('❌ Server is not running on http://localhost:3000');
    console.log('💡 Please start the development server with: pnpm dev');
    process.exit(1);
  }
  
  console.log('✅ Server is running\n');

  // Run test suite
  const tests = [
    { name: 'Payment Intent Creation', fn: testPaymentIntentCreation },
    { name: 'Analytics', fn: testAnalytics },
    { name: 'Query', fn: testQuery },
    { name: 'Cleanup Recommendations', fn: testCleanupRecommendations },
    { name: 'Storage Health', fn: testStorageHealth },
    { name: 'CSV Export', fn: testCSVExport },
  ];

  for (const test of tests) {
    try {
      await test.fn();
      console.log(`✅ ${test.name} test completed\n`);
    } catch (error) {
      console.error(`❌ ${test.name} test failed:`, error.message);
      console.log('');
    }
  }

  console.log('🏁 All tests completed!');
  console.log('=' .repeat(50));
  console.log('💡 Check the data/payment-intents/ directory to see generated files');
  console.log('🔧 Use the API endpoints for production integration');
}

// Run tests if called directly
if (require.main === module) {
  runTests().catch(error => {
    console.error('💥 Test suite crashed:', error);
    process.exit(1);
  });
}

module.exports = { runTests };