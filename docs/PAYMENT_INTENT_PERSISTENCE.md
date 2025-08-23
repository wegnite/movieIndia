# Payment Intent Data Persistence System

This document describes the comprehensive file-based data persistence system for tracking and analyzing payment intents in the Movie India application.

## Overview

The Payment Intent Persistence System provides:

- **File-based Storage**: Secure, scalable JSON file storage with atomic operations
- **Session Tracking**: Unique session IDs for user journey analysis
- **Analytics Engine**: Comprehensive business intelligence and user behavior insights
- **Data Management**: Automated cleanup, archiving, and rotation
- **Query Interface**: Flexible API for data retrieval and export
- **Monitoring Tools**: Real-time monitoring and health checks

## Architecture

### Core Components

1. **Storage Layer** (`/lib/payment-intent-storage.ts`)
   - File-based JSON storage with atomic writes
   - File locking to prevent corruption
   - Daily file rotation and size management
   - Automatic session ID generation

2. **Analytics Engine** (`/lib/payment-intent-analytics.ts`)
   - Time-based analysis (hourly, daily, weekly trends)
   - User behavior tracking (user agents, sessions)
   - Business intelligence (conversion funnels, plan performance)
   - Comprehensive reporting

3. **Data Management** (`/lib/payment-intent-cleanup.ts`)
   - Automated file cleanup and archiving
   - Retention policy enforcement
   - Storage health monitoring
   - Compression and space optimization

4. **API Endpoints**
   - `/api/payment-intent` - Create payment intents
   - `/api/payment-intent/query` - Query stored data
   - `/api/payment-intent/analytics` - Generate analytics reports
   - `/api/payment-intent/cleanup` - Manage data lifecycle

### Data Structure

Each payment intent is stored with the following structure:

```typescript
interface PaymentIntentData {
  id: string;                 // Unique identifier
  timestamp: string;          // ISO timestamp
  planName: string;          // Subscription plan name
  amount: string | number;   // Payment amount
  userEmail?: string;        // User email (optional)
  userAgent: string;         // Browser/device information
  ipAddress: string;         // Client IP address
  feedback?: string;         // User feedback (optional)
  sessionId: string;         // Unique session identifier
  createdAt: Date;          // Storage timestamp
}
```

## API Reference

### 1. Create Payment Intent

**Endpoint:** `POST /api/payment-intent`

**Request Body:**
```json
{
  "planName": "Premium Plan",
  "amount": "29.99",
  "userEmail": "user@example.com",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2023-12-01T10:30:00Z",
  "feedback": "Interested in premium features"
}
```

**Response:**
```json
{
  "code": 0,
  "message": "ok",
  "data": {
    "tracked": true,
    "paymentIntentId": "uuid-here",
    "timestamp": "2023-12-01T10:30:00Z",
    "persisted": true,
    "emailSent": true,
    "emailMessage": "Email sent successfully"
  }
}
```

### 2. Query Payment Intents

**Endpoint:** `GET /api/payment-intent/query`

**Query Parameters:**
- `startDate` - Filter from date (ISO string)
- `endDate` - Filter to date (ISO string)
- `daysBack` - Number of days to look back (default: 30)
- `planName` - Filter by plan name
- `userEmail` - Filter by user email
- `sessionId` - Filter by session ID
- `limit` - Number of records to return (max: 1000)
- `offset` - Pagination offset

**Example:** `GET /api/payment-intent/query?daysBack=7&limit=100`

**Advanced Query (POST):**
```json
{
  "filters": {
    "startDate": "2023-11-01",
    "endDate": "2023-12-01",
    "planName": "Premium Plan"
  },
  "pagination": {
    "limit": 100,
    "offset": 0
  },
  "format": "json",
  "includeStats": true
}
```

### 3. Analytics Reports

**Endpoint:** `GET /api/payment-intent/analytics`

**Query Parameters:**
- `daysBack` - Analysis period in days (default: 30)
- `startDate` - Custom start date
- `endDate` - Custom end date

**Response includes:**
- Basic statistics (totals, averages, distributions)
- Time analysis (hourly, daily, monthly trends)
- User analysis (top user agents, session behavior)
- Business intelligence (conversion rates, plan performance)

### 4. Data Management

**Health Check:** `GET /api/payment-intent/cleanup?action=health`

**Cleanup Recommendations:** `GET /api/payment-intent/cleanup?action=recommendations`

**Execute Cleanup:** `POST /api/payment-intent/cleanup`
```json
{
  "dryRun": false,
  "retentionDays": 365,
  "archiveBeforeDelete": true,
  "compressOldFiles": false
}
```

## Data Export

### CSV Export

Export payment intent data in CSV format:

```bash
# Via API
POST /api/payment-intent/query
{
  "format": "csv",
  "filters": { "daysBack": 30 }
}

# Via monitoring script
node scripts/payment-intent-monitor.js export --format=csv --output=data.csv
```

### JSON Export

Export complete dataset with metadata:

```bash
# Via monitoring script
node scripts/payment-intent-monitor.js export --format=json --output=data.json
```

## Monitoring and Management

### Real-time Monitoring

Monitor payment intents in real-time:

```bash
# Start monitoring with 30-second intervals
node scripts/payment-intent-monitor.js watch --interval=30

# Example output:
# [10:30:00] 🆕 3 new intent(s) | Total: 1,245 | Sessions: 892
# [10:30:30] ⏸️  No new intents | Total: 1,245 | Sessions: 892
```

### Health Checks

Monitor system health:

```bash
# Check storage health
node scripts/payment-intent-monitor.js health

# Example output:
# ✅ Storage Status: HEALTHY
# 📁 Total Files: 45
# 📄 Total Records: 2,340
# 💾 Total Size: 1.2 MB
# 📅 Date Range: 2023-10-01 → 2023-12-01
# 🧹 Needs Cleanup: No
```

### Statistics Dashboard

View comprehensive statistics:

```bash
# Show 7-day statistics
node scripts/payment-intent-monitor.js stats --days=7

# Example output:
# 📈 Overview:
#   Total Intents: 1,245
#   Unique Sessions: 892
#   Total Revenue: $25,670.55
#   Average Amount: $20.62
```

### Data Cleanup

Manage data lifecycle:

```bash
# Dry run cleanup (safe preview)
node scripts/payment-intent-monitor.js cleanup

# Execute actual cleanup
node scripts/payment-intent-monitor.js cleanup --live

# Emergency cleanup (keeps only 30 days)
curl -X DELETE "http://localhost:3000/api/payment-intent/cleanup?confirm=yes"
```

## File Structure

### Data Storage

```
data/payment-intents/
├── .gitignore                          # Excludes data files from git
├── .gitkeep                            # Ensures directory is tracked
├── README.md                           # Documentation
├── .locks/                             # File locking directory
├── payment-intents-2023-12-01.json    # Daily data files
├── payment-intents-2023-12-02.json
└── archive/                            # Archived old files
    └── payment-intents-2023-10-01-archived-*.json
```

### Daily File Format

```json
[
  {
    "data": {
      "id": "uuid-123",
      "timestamp": "2023-12-01T10:30:00Z",
      "planName": "Premium Plan",
      "amount": "29.99",
      "userEmail": "user@example.com",
      "userAgent": "Mozilla/5.0...",
      "ipAddress": "192.168.1.1",
      "feedback": "Interested in premium",
      "sessionId": "abc123def456",
      "createdAt": "2023-12-01T10:30:01Z"
    },
    "metadata": {
      "fileVersion": "1.0.0",
      "savedAt": "2023-12-01T10:30:01Z"
    }
  }
]
```

## Configuration

### Storage Options

Default configuration in `PaymentIntentStorage`:

```typescript
{
  maxFileSize: 10 * 1024 * 1024,     // 10MB per file
  maxRecordsPerFile: 10000,          // Max records per file
  retentionDays: 365,                // Keep data for 1 year
  enableCompression: false           // Compression disabled by default
}
```

### Cleanup Policy

Default cleanup settings:

- **Retention**: 365 days
- **Archive before delete**: Enabled
- **Compression**: Disabled (can be enabled for large files)
- **Lock timeout**: 5 seconds
- **File rotation**: When exceeding 10MB or 10,000 records

## Testing

### Automated Testing

Run comprehensive test suite:

```bash
# Start development server
pnpm dev

# Run test suite in another terminal
node scripts/test-payment-intent-storage.js

# Test output:
# 🧪 Testing Payment Intent Creation...
# ✅ Intent 1 created: uuid-123
# ✅ Intent 2 created: uuid-456
# 📊 Testing Analytics...
# ✅ Analytics generated successfully
# ...
```

### Manual Testing

Test individual endpoints:

```bash
# Create test payment intent
curl -X POST http://localhost:3000/api/payment-intent \
  -H "Content-Type: application/json" \
  -d '{"planName":"Premium Plan","amount":"29.99","userEmail":"test@example.com","userAgent":"Test Browser"}'

# Query recent intents
curl "http://localhost:3000/api/payment-intent/query?limit=5"

# Get analytics
curl "http://localhost:3000/api/payment-intent/analytics?daysBack=7"
```

## Security and Privacy

### Data Protection

- **IP Address Hashing**: IP addresses can be hashed for privacy
- **Session ID Security**: Session IDs are generated using crypto-secure methods
- **File Permissions**: Data files are created with restricted permissions
- **Git Exclusion**: All data files are excluded from version control

### Access Control

- **API Authentication**: Implement authentication middleware as needed
- **File System Isolation**: Data stored in dedicated directory structure
- **Lock File Security**: Prevents concurrent access corruption

### GDPR Compliance

The system supports GDPR compliance through:

- **Data Minimization**: Only necessary fields are stored
- **Right to Deletion**: Individual records can be removed
- **Data Export**: Users can request their data in CSV/JSON format
- **Retention Limits**: Automatic cleanup after specified periods

## Performance Optimization

### File Management

- **Atomic Writes**: Prevents data corruption during writes
- **File Locking**: Prevents concurrent access issues
- **Size Limits**: Automatic file rotation prevents large files
- **Indexing**: Session IDs enable efficient user lookup

### Query Performance

- **Date Filtering**: Efficient date-based queries
- **Pagination**: Limits result set sizes
- **Caching**: Consider implementing query result caching
- **Compression**: Optional compression for archived files

### Monitoring Metrics

Track these key metrics:

- **Storage Growth**: Monitor file sizes and record counts
- **Query Performance**: Track API response times
- **Error Rates**: Monitor storage and retrieval failures
- **Cleanup Effectiveness**: Track space savings from cleanup

## Troubleshooting

### Common Issues

1. **File Lock Timeout**
   - Cause: High concurrent write load
   - Solution: Increase lock timeout or reduce write frequency

2. **Large File Sizes**
   - Cause: File rotation not triggered
   - Solution: Reduce `maxRecordsPerFile` or enable compression

3. **Storage Full**
   - Cause: Retention policy too long
   - Solution: Reduce `retentionDays` or run cleanup more frequently

4. **Query Timeout**
   - Cause: Large dataset or missing date filters
   - Solution: Add date filters and pagination

### Monitoring Alerts

Set up alerts for:

- Storage usage > 80% of available space
- File count > 1000 files
- Query response time > 5 seconds
- Error rate > 1%

### Recovery Procedures

1. **Corrupted Files**
   - Check `.tmp` files for recovery
   - Restore from archive if available
   - Regenerate from logs if necessary

2. **Missing Data**
   - Check archive directory
   - Review cleanup logs
   - Verify retention policy settings

3. **Performance Degradation**
   - Run cleanup to reduce file count
   - Check for large files needing rotation
   - Optimize query filters

## Future Enhancements

### Planned Features

1. **Database Migration**: Option to migrate to PostgreSQL/MongoDB
2. **Real-time Webhooks**: Stream data changes to external systems
3. **Advanced Analytics**: Machine learning insights and predictions
4. **Multi-tenant Support**: Separate data by tenant/organization
5. **Encryption**: At-rest encryption for sensitive data
6. **Replication**: Multi-node data replication for reliability

### Integration Options

1. **Business Intelligence**: Connect to Tableau, PowerBI, or similar
2. **Data Warehousing**: Export to BigQuery, Snowflake, or Redshift
3. **CRM Systems**: Sync with Salesforce, HubSpot, or similar
4. **Email Marketing**: Integration with Mailchimp, SendGrid, etc.

---

This payment intent persistence system provides a robust, scalable foundation for tracking user engagement and business analytics while maintaining data privacy and system reliability.