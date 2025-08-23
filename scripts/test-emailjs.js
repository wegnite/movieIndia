#!/usr/bin/env node

/**
 * EmailJS Integration Test Script
 * 
 * This script tests the EmailJS integration by making HTTP requests
 * to the local development server API endpoints.
 * 
 * Usage:
 *   node scripts/test-emailjs.js [test-type]
 * 
 * Test Types:
 *   - config: Test configuration only
 *   - primary: Test primary email template
 *   - fallback: Test fallback email template  
 *   - both: Test both email templates
 *   - payment-intent: Test payment intent API with email
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const TEST_TYPE = process.argv[2] || 'config';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const isHttps = url.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = client.request(requestOptions, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            status: res.statusCode,
            data: jsonData,
            headers: res.headers
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            data: { raw: data },
            headers: res.headers
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

async function testConfiguration() {
  log('🔧 Testing EmailJS Configuration...', 'cyan');
  
  try {
    const response = await makeRequest('/api/test-email');
    
    if (response.status === 200) {
      log('✅ Configuration test successful', 'green');
      
      const config = response.data.configuration;
      if (config) {
        log('\n📋 Configuration Status:', 'blue');
        Object.entries(config).forEach(([key, status]) => {
          const color = status.includes('✅') ? 'green' : 'red';
          log(`  ${key}: ${status}`, color);
        });
      }
      
      if (response.data.success) {
        log(`\n💬 ${response.data.message}`, 'green');
      } else {
        log(`\n⚠️ ${response.data.message}`, 'yellow');
      }
      
    } else {
      log(`❌ Configuration test failed (Status: ${response.status})`, 'red');
      log(`Error: ${response.data.message || 'Unknown error'}`, 'red');
    }
    
  } catch (error) {
    log(`❌ Request failed: ${error.message}`, 'red');
  }
}

async function testEmail(testType = 'primary') {
  log(`📧 Testing EmailJS ${testType} template...`, 'cyan');
  
  const testData = {
    testType: testType,
    userEmail: 'test-user@example.com',
    planName: 'Test Premium Plan',
    amount: '$99.99 (TEST)',
    userAgent: 'EmailJS Test Script v1.0',
    timestamp: new Date().toISOString()
  };
  
  try {
    const response = await makeRequest('/api/test-email', {
      method: 'POST',
      body: testData
    });
    
    if (response.status === 200) {
      if (response.data.success) {
        log(`✅ ${testType} email test successful`, 'green');
        log(`💬 ${response.data.message}`, 'green');
      } else {
        log(`⚠️ ${testType} email test partially failed`, 'yellow');
        log(`💬 ${response.data.message}`, 'yellow');
      }
      
      if (response.data.result) {
        log('\n📊 Detailed Result:', 'blue');
        console.log(JSON.stringify(response.data.result, null, 2));
      }
      
    } else {
      log(`❌ Email test failed (Status: ${response.status})`, 'red');
      log(`Error: ${response.data.message || 'Unknown error'}`, 'red');
    }
    
  } catch (error) {
    log(`❌ Request failed: ${error.message}`, 'red');
  }
}

async function testPaymentIntent() {
  log('💳 Testing Payment Intent API with Email...', 'cyan');
  
  const testData = {
    userEmail: 'payment-test@example.com',
    planName: 'Premium Plan (API Test)',
    amount: '$299.99',
    userAgent: 'Mozilla/5.0 (Test) EmailJS Script Test Agent',
    timestamp: new Date().toISOString()
  };
  
  try {
    const response = await makeRequest('/api/payment-intent', {
      method: 'POST',
      body: testData
    });
    
    if (response.status === 200) {
      log('✅ Payment intent API test successful', 'green');
      
      const data = response.data.data;
      if (data) {
        log('\n📊 Response Data:', 'blue');
        log(`  Tracked: ${data.tracked}`, 'white');
        log(`  Timestamp: ${data.timestamp}`, 'white');
        log(`  Feedback Email: ${data.feedbackEmail}`, 'white');
        
        const emailColor = data.emailSent ? 'green' : 'red';
        const emailIcon = data.emailSent ? '✅' : '❌';
        log(`  Email Sent: ${emailIcon} ${data.emailSent}`, emailColor);
        log(`  Email Message: ${data.emailMessage}`, emailColor);
      }
      
    } else {
      log(`❌ Payment intent test failed (Status: ${response.status})`, 'red');
      log(`Error: ${response.data.message || 'Unknown error'}`, 'red');
    }
    
  } catch (error) {
    log(`❌ Request failed: ${error.message}`, 'red');
  }
}

async function runTest() {
  log('🚀 EmailJS Integration Test Suite', 'magenta');
  log('=====================================', 'magenta');
  log(`Base URL: ${BASE_URL}`, 'white');
  log(`Test Type: ${TEST_TYPE}`, 'white');
  log(`Timestamp: ${new Date().toISOString()}`, 'white');
  log('', 'white');
  
  switch (TEST_TYPE) {
    case 'config':
      await testConfiguration();
      break;
    
    case 'primary':
      await testEmail('primary');
      break;
    
    case 'fallback':
      await testEmail('fallback');
      break;
    
    case 'both':
      await testEmail('both');
      break;
    
    case 'payment-intent':
      await testPaymentIntent();
      break;
    
    case 'all':
      log('🔍 Running all tests...', 'cyan');
      await testConfiguration();
      log('', 'white');
      await testEmail('primary');
      log('', 'white');
      await testEmail('fallback');
      log('', 'white');
      await testPaymentIntent();
      break;
    
    default:
      log(`❌ Unknown test type: ${TEST_TYPE}`, 'red');
      log('Available test types: config, primary, fallback, both, payment-intent, all', 'yellow');
      process.exit(1);
  }
  
  log('', 'white');
  log('=====================================', 'magenta');
  log('📝 Test completed!', 'magenta');
  
  // Show usage examples
  if (TEST_TYPE === 'config') {
    log('', 'white');
    log('💡 Next steps:', 'cyan');
    log('  1. Configure EmailJS environment variables', 'white');
    log('  2. Run: node scripts/test-emailjs.js primary', 'white');
    log('  3. Check your email at 310842705@qq.com', 'white');
  }
}

// Show help if requested
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
EmailJS Integration Test Script

Usage:
  node scripts/test-emailjs.js [test-type]

Test Types:
  config         - Test EmailJS configuration only (default)
  primary        - Test primary email template
  fallback       - Test fallback email template
  both           - Test both email templates
  payment-intent - Test payment intent API with email notifications
  all            - Run all tests

Environment Variables:
  TEST_URL       - Base URL for testing (default: http://localhost:3000)

Examples:
  node scripts/test-emailjs.js config
  node scripts/test-emailjs.js primary
  TEST_URL=https://your-domain.com node scripts/test-emailjs.js all

Note: Make sure your development server is running before executing tests.
  `);
  process.exit(0);
}

// Run the test
runTest().catch(error => {
  log(`💥 Unexpected error: ${error.message}`, 'red');
  process.exit(1);
});