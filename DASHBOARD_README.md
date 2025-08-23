# Payment Intent Analytics Dashboard

## Overview

A comprehensive admin dashboard for monitoring payment intent statistics and analytics, built with Next.js, React, and Recharts.

## Features

### 📊 Key Metrics
- **Total Payment Intents**: Number of Stripe checkout sessions created
- **Conversion Rate**: Percentage of intents that result in successful payments
- **Total Revenue**: Sum of all successful payments
- **Revenue per Intent**: Average revenue generated per payment intent
- **Average Time to Conversion**: Time from intent creation to payment completion

### 📈 Interactive Charts
1. **Trends Chart**: Line chart showing payment intents, conversions, and revenue over time
2. **Plan Distribution**: Pie chart of popular subscription plans
3. **Currency Breakdown**: Revenue distribution by currency
4. **Hourly Activity**: Bar chart of payment activity by hour of day
5. **Conversion Funnel**: User journey from intent creation to payment completion
6. **Top Products**: Revenue ranking by product

### 🔍 Data Table
- Searchable and sortable payment intent records
- Filter by status (created, paid, failed, cancelled)
- Pagination with 20 records per page
- Export functionality (CSV format)

### 📅 Date Range Controls
- Preset ranges: Last 7/30/90 days, Last 24 hours
- Custom date range picker
- Hourly or daily granularity
- Real-time data updates

## Access

Navigate to `/admin/payment-intents` (requires admin privileges)

## Technical Details

### API Endpoints
- `GET /api/admin/payment-statistics` - Aggregated analytics data
- `GET /api/admin/orders` - Detailed payment intent records

### Components
- `PaymentStatisticsDashboard` - Main dashboard container
- `DateRangePicker` - Date/time filtering controls
- `PaymentIntentsTable` - Data table with search and sort
- `payment-intents/page.tsx` - Admin page layout

### Data Sources
- Supabase `orders` table
- Stripe session data
- Real-time calculations

## Usage

1. **View Overview**: Check key metrics at the top of dashboard
2. **Analyze Trends**: Use the line chart to identify patterns
3. **Export Data**: Download CSV/JSON reports for external analysis
4. **Filter Results**: Use date ranges and status filters
5. **Drill Down**: Switch between chart views and detailed table

## Performance Considerations

- Data is cached for 15 minutes to reduce database load
- Pagination limits table rendering to 20 records
- Charts use responsive containers for mobile compatibility
- Background processing for large date ranges

## Security

- Admin email verification required
- Session-based authentication
- API rate limiting
- Input validation and sanitization

## Future Enhancements

- Real-time updates via WebSocket
- Advanced filtering options
- Cohort analysis
- Revenue forecasting
- A/B testing insights
- Mobile-optimized views