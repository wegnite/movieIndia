# A/B Testing System Documentation

## Overview

This comprehensive A/B testing system allows you to test different pricing strategies and measure their impact on conversion rates, revenue, and user behavior. The system is built with statistical rigor and provides real-time monitoring capabilities.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                Frontend Layer                           │
│  - ABTestPricing Component                             │
│  - Admin Dashboard                                      │
│  - React Hooks (useABTestSession)                      │
└─────────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────────┐
│                 API Layer                               │
│  - /api/ab-test/assign                                 │
│  - /api/ab-test/track                                  │
│  - /api/ab-test/experiments                            │
│  - /api/ab-test/user-experiments                       │
└─────────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────────┐
│              Service Layer                              │
│  - A/B Test Management                                 │
│  - User Assignment Logic                               │
│  - Statistical Calculations                           │
│  - Event Tracking                                     │
└─────────────────────────────────────────────────────────┘
                        ↕
┌─────────────────────────────────────────────────────────┐
│               Data Layer                                │
│  - Experiments & Variants                              │
│  - User Assignments                                    │
│  - Event Tracking                                     │
│  - Feature Flags                                      │
└─────────────────────────────────────────────────────────┘
```

## Database Schema

### Tables

1. **ab_experiments** - Store experiment configurations
2. **ab_variants** - Different versions being tested
3. **ab_assignments** - User-to-variant mappings
4. **ab_events** - Track user interactions and conversions
5. **feature_flags** - Control system features

### Setup

```sql
-- Run the provided schema
mysql < data/ab-test-schema.sql
```

## Pre-configured Pricing Experiments

### Experiment: pricing_strategy_2025

The system comes with 4 pre-configured pricing variants:

#### Variant A: Original Pricing (Control)
- Standard: ₹120 (was ₹150)
- Premium 3D: ₹250 (was ₹300)  
- IMAX: ₹450 (was ₹500)
- **Use case**: Baseline for comparison

#### Variant B: Lower Pricing
- Standard: ₹99 (was ₹150)
- Premium 3D: ₹199 (was ₹300)
- IMAX: ₹349 (was �500)
- **Use case**: Test price sensitivity

#### Variant C: Bundle Focus
- All formats: ₹199 (save up to 70%)
- **Use case**: Simplify choice, maximize perceived value

#### Variant D: Time-Limited Offers
- Standard: ₹99 (was ₹150)
- Premium 3D: ₹179 (was ₹300)
- IMAX: ₹299 (was ₹500)
- **Features**: Countdown timer, urgency messaging
- **Use case**: Test urgency-driven conversions

## Usage

### 1. Basic Integration

The pricing page automatically uses A/B testing when enabled:

```tsx
// The system automatically detects A/B test status
// and serves appropriate variants based on user assignment
```

### 2. Manual Integration

```tsx
import { usePricingExperiment } from "@/hooks/useABTestSession";

function MyComponent() {
  const { 
    assignment, 
    config, 
    trackEvent, 
    isLowerPricing 
  } = usePricingExperiment();

  const handleClick = async () => {
    await trackEvent("click", { button: "cta" });
  };

  return (
    <div>
      {isLowerPricing && <Badge>Special Discount!</Badge>}
      <Button onClick={handleClick}>
        {config?.type === "time_limited" ? "Buy Now!" : "Purchase"}
      </Button>
    </div>
  );
}
```

### 3. Server-Side Usage

```tsx
import { assignUserToExperiment } from "@/services/ab-test";
import { getSessionIdFromHeaders } from "@/lib/ab-test-middleware";

export default async function Page() {
  const sessionId = getSessionIdFromHeaders(headers());
  
  const assignment = await assignUserToExperiment(
    "pricing_strategy_2025",
    sessionId
  );

  return <PricingComponent assignment={assignment} />;
}
```

## API Endpoints

### POST /api/ab-test/assign
Assign user to experiment variant.

```json
{
  "experiment_name": "pricing_strategy_2025",
  "session_id": "uuid-here",
  "user_id": 123
}
```

### POST /api/ab-test/track
Track user events.

```json
{
  "assignment_id": 456,
  "event_type": "conversion",
  "event_data": {"product": "premium3d"},
  "value": 250
}
```

### GET /api/ab-test/experiments
Get experiment results (admin only).

### POST /api/ab-test/user-experiments
Get all user assignments.

## Event Tracking

### Event Types

1. **view** - User sees the pricing page
2. **click** - User clicks a purchase button
3. **conversion** - User completes checkout process
4. **purchase** - Payment is confirmed

### Automatic Tracking

- **Views**: Tracked automatically when pricing component loads
- **Clicks**: Tracked when user clicks purchase buttons
- **Conversions**: Tracked during checkout process
- **Purchases**: Tracked via Stripe webhook

## Admin Dashboard

Access: `/admin/ab-tests`

### Features

- **Real-time Metrics**: Views, clicks, conversions, revenue
- **Statistical Analysis**: Confidence levels, significance testing
- **Experiment Control**: Start, pause, stop experiments
- **Visual Charts**: Performance comparison charts
- **Detailed Reports**: Variant-by-variant breakdown

### Key Metrics

- **Conversion Rate**: Conversions ÷ Views × 100
- **Click-Through Rate**: Clicks ÷ Views × 100
- **Average Order Value**: Revenue ÷ Conversions
- **Statistical Significance**: Z-test with 95% confidence threshold

## Statistical Methods

### User Assignment

- **Consistent Hashing**: Same user always gets same variant
- **Traffic Splitting**: Configurable percentage splits
- **Exclusion Rules**: Bot detection, invalid sessions

### Significance Testing

- **Z-Test**: For conversion rate comparisons
- **Confidence Levels**: 90%, 95%, 99% thresholds
- **Sample Size**: Minimum 30 users per variant
- **P-Value**: Two-tailed test for significance

### Formula Example

```javascript
// Conversion rate difference significance
const pooledRate = (controlConversions + variantConversions) / 
                   (controlViews + variantViews);

const standardError = Math.sqrt(
  pooledRate * (1 - pooledRate) * 
  (1/controlViews + 1/variantViews)
);

const zScore = Math.abs(variantRate - controlRate) / standardError;
const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));
const confidence = (1 - pValue) * 100;
```

## Configuration

### Environment Variables

```env
# Feature Flags
FEATURE_AB_TESTING_ENABLED=true
FEATURE_PRICING_EXPERIMENT_ENABLED=true
FEATURE_SHOW_EXPERIMENT_DEBUG=false

# A/B Test Settings
AB_TEST_SALT=your-secret-salt
AB_TEST_MIN_SAMPLE_SIZE=30
AB_TEST_SIGNIFICANCE_THRESHOLD=0.05
```

### Feature Flags

Control features via database:

```sql
UPDATE feature_flags 
SET enabled = true 
WHERE name = 'pricing_experiment_enabled';
```

## Creating New Experiments

### 1. Via API

```javascript
const response = await fetch("/api/ab-test/experiments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "new_experiment",
    description: "Test description",
    variants: [
      {
        name: "control",
        traffic_split: 50,
        config: { /* variant config */ },
        is_control: true
      },
      {
        name: "variant_a",
        traffic_split: 50,
        config: { /* variant config */ }
      }
    ],
    traffic_percentage: 100
  })
});
```

### 2. Via Service Layer

```javascript
import { createABTestExperiment } from "@/services/ab-test";

const experimentId = await createABTestExperiment({
  name: "button_color_test",
  description: "Test different button colors",
  variants: [
    { name: "blue", trafficSplit: 33.33, config: { color: "blue" } },
    { name: "green", trafficSplit: 33.33, config: { color: "green" } },
    { name: "red", trafficSplit: 33.34, config: { color: "red" } }
  ]
});
```

## Best Practices

### 1. Experiment Design

- **Single Variable**: Test one thing at a time
- **Statistical Power**: Ensure sufficient sample size
- **Duration**: Run for full business cycles
- **Exclusion Criteria**: Define what users to exclude

### 2. Implementation

- **Consistent Assignment**: Same user = same variant
- **Fallback Handling**: Graceful degradation if A/B test fails
- **Performance**: Minimal impact on page load
- **Privacy**: Hash sensitive user data

### 3. Analysis

- **Wait for Significance**: Don't stop tests early
- **Segment Analysis**: Look at different user groups
- **Business Context**: Consider external factors
- **Practical Significance**: Statistical ≠ business significance

## Monitoring & Debugging

### Client-Side Debugging

```javascript
// Enable debug mode for admins
const debugInfo = {
  sessionId,
  assignment,
  variantConfig: config,
  isSignificant: results.statistical_significance.significant
};
console.log("A/B Test Debug:", debugInfo);
```

### Server Logs

Key events are logged:
- User assignments
- Event tracking
- Experiment status changes
- Error conditions

### Health Checks

Monitor these metrics:
- Assignment success rate
- Event tracking success rate
- Database performance
- Statistical power

## Troubleshooting

### Common Issues

1. **Users not assigned**
   - Check experiment status (must be "running")
   - Verify traffic percentage > 0
   - Check for bot detection exclusion

2. **Events not tracking**
   - Verify assignment_id is valid
   - Check API endpoint responses
   - Review browser console for errors

3. **Inconsistent results**
   - Ensure session consistency
   - Check for caching issues
   - Verify database data integrity

### Debug Tools

- **Admin Dashboard**: Real-time experiment status
- **Browser DevTools**: Network requests and console logs
- **Database Queries**: Direct data inspection
- **Feature Flags**: Toggle features on/off

## Security Considerations

- **Session Management**: Secure cookie handling
- **Bot Detection**: Pattern-based exclusion
- **Data Privacy**: Hash sensitive information
- **Access Control**: Admin-only experiment management
- **Input Validation**: Sanitize all inputs
- **Rate Limiting**: Prevent abuse of tracking endpoints

## Performance Optimization

- **Caching**: Cache experiment configurations
- **Database Indexes**: Optimize query performance
- **Async Processing**: Non-blocking event tracking
- **Batch Operations**: Group database writes
- **CDN Integration**: Serve static variants from CDN

## Migration & Rollback

### Gradual Rollout
```sql
-- Start with 10% traffic
UPDATE ab_experiments 
SET traffic_percentage = 10 
WHERE name = 'pricing_strategy_2025';

-- Gradually increase
UPDATE ab_experiments 
SET traffic_percentage = 50 
WHERE name = 'pricing_strategy_2025';
```

### Emergency Rollback
```sql
-- Stop experiment immediately
UPDATE ab_experiments 
SET status = 'paused' 
WHERE name = 'pricing_strategy_2025';

-- Or disable feature flag
UPDATE feature_flags 
SET enabled = false 
WHERE name = 'pricing_experiment_enabled';
```

This A/B testing system provides a robust foundation for data-driven decision making while maintaining high performance and statistical accuracy.