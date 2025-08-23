#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const logsDir = path.join(process.cwd(), 'payment-intents');

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

console.log(`
=================================================
   PAYMENT INTENT MONITORING SYSTEM
=================================================
Contact Email: 310842705@qq.com
Logs Directory: ${logsDir}
=================================================

Monitoring for payment intents...
Press Ctrl+C to stop.

`);

const logIntent = (data) => {
  const timestamp = new Date().toISOString();
  const filename = `payment-intent-${timestamp.split('T')[0]}.log`;
  const filepath = path.join(logsDir, filename);
  
  const logEntry = `
[${timestamp}]
Plan: ${data.planName}
Amount: ${data.amount}
User Email: ${data.userEmail || 'Not provided'}
User Agent: ${data.userAgent}
---
`;
  
  fs.appendFileSync(filepath, logEntry);
  
  console.log(`
🎯 NEW PAYMENT INTENT DETECTED!
================================
Time: ${new Date(timestamp).toLocaleString()}
Plan: ${data.planName}
Amount: ${data.amount}
User Email: ${data.userEmail || 'Not provided'}
================================
`);
  
  if (data.userEmail) {
    console.log(`📧 User provided email: ${data.userEmail}`);
  }
  
  console.log(`📝 Logged to: ${filepath}\n`);
};

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.on('SIGINT', () => {
  console.log('\n\nMonitoring stopped. Goodbye!');
  process.exit(0);
});