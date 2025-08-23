# Payment Triggers System - Complete Guide

A comprehensive multi-trigger payment system designed to increase conversion opportunities specifically for the Indian market.

## Overview

The Payment Triggers System implements 6 different trigger points to maximize conversion opportunities while maintaining a non-intrusive user experience. Each trigger is strategically designed with Indian market preferences in mind.

## Components

### 1. PaymentTriggersManager
**File:** `/components/payment-triggers/PaymentTriggersManager.tsx`

Central manager that coordinates all payment triggers on a page.

```tsx
<PaymentTriggersManager
  showFloatingButton={true}
  showExitIntent={true}
  showVideoPauseOverlay={true}
  showStickyBanner={true}
  showTimedPopup={true}
  showContentCTAs={true}
  videoElement={videoElement}
  page="movie"
/>
```

### 2. Floating Action Button (FAB)
**File:** `/components/payment-triggers/FloatingActionButton.tsx`

- **Trigger:** Appears after user scrolls past 200px
- **Behavior:** Auto-expands after 3 seconds, auto-collapses after 10 seconds
- **Features:**
  - Pulse animation for attention
  - Price badge (₹49)
  - Viewer count badge (2.1M+)
  - 50% discount highlight
  - HD quality emphasis
- **Dismissal:** 24-hour persistence after dismissal

### 3. Exit Intent Popup
**File:** `/components/payment-triggers/ExitIntentPopup.tsx`

- **Trigger:** Mouse leaves browser window or back button on mobile
- **Features:**
  - Special 60% OFF exit offer (₹39)
  - 5-minute countdown timer
  - Social proof (2.1M+ viewers)
  - Trust indicators (secure payment, UPI/cards)
  - Mobile back-button detection
- **Dismissal:** 2-hour persistence after dismissal

### 4. Video Pause Overlay
**File:** `/components/payment-triggers/VideoPauseOverlay.tsx`

- **Trigger:** Shows on 2nd video pause, then every 3rd pause
- **Features:**
  - Premium benefits comparison
  - 50% discount offer
  - Continue watching option
  - Auto-hide after 8 seconds
  - User satisfaction rating display
- **Dismissal:** 30-minute persistence after dismissal

### 5. Sticky Bottom Banner
**File:** `/components/payment-triggers/StickyBottomBanner.tsx`

- **Trigger:** Shows after 50% page scroll
- **Features:**
  - Minimizable design
  - 30-minute countdown timer
  - Feature highlights (HD, No Ads, 5 Languages)
  - Trust indicators row
  - Responsive mobile design
- **Dismissal:** 1-hour persistence after dismissal

### 6. Timed Popup
**File:** `/components/payment-triggers/TimedPopup.tsx`

- **Trigger:** Shows after 30 seconds on page
- **Features:**
  - Special 70% OFF time-limited offer (₹29)
  - 10-minute countdown with progress bar
  - Premium benefits breakdown
  - Social proof (8,234 daily upgrades)
  - Savings calculation display
- **Dismissal:** 4-hour persistence after dismissal

### 7. Content Section CTAs
**File:** `/components/payment-triggers/ContentSectionCTA.tsx`

Strategic CTAs placed after content sections:

- **after-cast:** Appears after cast section
- **after-reviews:** Appears after reviews section  
- **after-news:** Appears after news section
- **after-videos:** Appears after videos section
- **mid-content:** General mid-page placement

Each variant has:
- Contextual messaging
- Different visual themes
- Relevant feature highlights
- User testimonials
- 1-hour dismissal persistence

## Indian Market Optimizations

### Cultural Preferences
- **Urgency with Discounts:** Heavy emphasis on limited-time offers
- **Value Propositions:** Clear savings calculations (₹60-70 saved)
- **Social Proof:** High viewer counts (2.1M+) and ratings (4.9/5)
- **Regional Language:** Hindi script in language selection
- **Family-Friendly:** Emphasis on clean, safe content

### Payment Methods
- **UPI Integration:** Prominent UPI payment option
- **Multiple Cards:** All major cards accepted
- **Trust Indicators:** SSL secure, instant access messaging
- **Regional Currency:** ₹ (Indian Rupee) throughout

### Pricing Strategy
- **Regular Price:** ₹99
- **Standard Discount:** ₹49 (50% off)
- **Special Offers:** ₹29-39 (60-70% off)
- **Value Messaging:** "Just ₹49" instead of "Only $0.60"

## Configuration

### Main Config File
**File:** `/lib/payment-triggers-config.ts`

Centralized configuration for all triggers:

```typescript
export const PAYMENT_TRIGGERS_CONFIG = {
  pricing: {
    regularPrice: 99,
    discountPrice: 49,
    specialOfferPrice: 29,
    currency: '₹'
  },
  timing: {
    floatingButtonDelay: 3000,
    timedPopupDelay: 30000,
    // ... more timing configs
  },
  // ... more configurations
}
```

### Per-Page Configuration
```typescript
// Enable specific triggers for different page types
const config = getPageTriggerConfig('movie') // 'home', 'watch', 'pricing'
```

## Analytics & Tracking

### Tracking Hook
**File:** `/components/payment-triggers/usePaymentTriggerTracking.tsx`

Tracks all trigger interactions:

```typescript
const { trackTriggerView, trackTriggerClick } = usePaymentTriggerTracking()

// Track when trigger is shown
trackTriggerView('floating-button', { page: 'movie' })

// Track when user clicks
trackTriggerClick('exit-intent', { page: 'movie' })
```

### Data Storage
- **Local Storage:** Client-side tracking for immediate analytics
- **API Integration:** Sends to `/api/payment-intent/analytics`
- **Payment Intent API:** Links to existing payment system

### Tracked Events
1. **Trigger Views:** When each trigger is displayed
2. **Trigger Clicks:** When user interacts with triggers  
3. **Dismissals:** When user dismisses triggers
4. **Conversions:** When triggers lead to payments

## Implementation Guide

### Basic Setup

1. **Install Dependencies**
```bash
# Ensure these packages are available
npm install @radix-ui/react-progress
npm install lucide-react
```

2. **Import Styles**
Add to your main CSS file:
```css
@import "../styles/payment-triggers.css";
```

3. **Add to Page**
```tsx
import { PaymentTriggersManager } from '@/components/payment-triggers'

export default function MoviePage() {
  return (
    <>
      <PaymentTriggersManager
        showFloatingButton={true}
        showExitIntent={true}
        showStickyBanner={true}
        showTimedPopup={true}
        showContentCTAs={true}
        page="movie"
      />
      {/* Your page content */}
    </>
  )
}
```

### Advanced Integration

1. **Video Integration**
```tsx
const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null)

useEffect(() => {
  const video = document.querySelector('video')
  setVideoElement(video)
}, [])

<PaymentTriggersManager
  showVideoPauseOverlay={true}
  videoElement={videoElement}
  page="watch"
/>
```

2. **Content Section CTAs**
```tsx
// Place strategically throughout content
<ContentSectionCTA variant="after-cast" />
<ContentSectionCTA variant="after-reviews" />
<ContentSectionCTA variant="mid-content" />
```

## Customization

### Styling
Custom CSS classes in `/styles/payment-triggers.css`:
- `.animate-slide-up` - Slide up animation
- `.animate-scale-up` - Scale up animation  
- `.animate-gradient` - Gradient animation
- `.payment-trigger-*` - Various utility classes

### Timing Adjustments
Modify timing in config file:
```typescript
timing: {
  floatingButtonDelay: 5000, // Show after 5 seconds instead of 3
  timedPopupDelay: 60000,    // Show after 1 minute instead of 30 seconds
}
```

### Pricing Adjustments
```typescript
pricing: {
  regularPrice: 149,      // Change base price
  discountPrice: 79,      // Adjust discount price
  specialOfferPrice: 49,  // Special offer price
}
```

## Best Practices

### User Experience
1. **Non-Intrusive:** All triggers can be dismissed
2. **Persistent but Reasonable:** Dismissals respected for appropriate time periods
3. **Mobile Optimized:** All triggers work on mobile devices
4. **Accessibility:** Keyboard navigation and screen reader support

### Performance
1. **Lazy Loading:** Triggers load only when needed
2. **Optimized Animations:** Respect `prefers-reduced-motion`
3. **Minimal Bundle Impact:** Import only needed components

### Conversion Optimization
1. **Multiple Touchpoints:** 6 different trigger opportunities
2. **Contextual Messaging:** Different messages for different contexts
3. **Progressive Offers:** Standard → Special → Exit offers
4. **Social Proof:** Consistent viewer counts and ratings

## Troubleshooting

### Common Issues

1. **Triggers Not Showing**
   - Check page configuration in `PAYMENT_TRIGGERS_CONFIG`
   - Verify trigger is enabled for current page type
   - Check dismissal persistence in localStorage

2. **Video Pause Overlay Not Working**
   - Ensure `videoElement` is properly passed
   - Check if video element exists in DOM
   - Verify video events are being fired

3. **Styling Issues**
   - Ensure payment-triggers.css is imported
   - Check for CSS conflicts with existing styles
   - Verify Tailwind classes are available

### Debug Mode
Enable debug mode in development:
```typescript
development: {
  showDebugInfo: true,
  logTriggerEvents: true,
  testMode: true, // Shows all triggers immediately
}
```

## Performance Metrics

Track these KPIs to measure success:

### Conversion Metrics
- **Trigger CTR:** Click-through rate for each trigger type
- **Conversion Rate:** Percentage of trigger clicks that result in payments
- **Revenue per Trigger:** Average revenue generated per trigger view

### User Experience Metrics  
- **Dismissal Rate:** Percentage of users who dismiss each trigger
- **Time to Conversion:** How quickly users convert after trigger interaction
- **Bounce Rate Impact:** Effect of triggers on overall site bounce rate

### A/B Testing Opportunities
- **Pricing Variations:** Test different discount levels
- **Messaging:** Test urgency vs. value vs. social proof messaging
- **Timing:** Test different delay periods for triggers
- **Visual Design:** Test different color schemes and layouts

## Future Enhancements

### Planned Features
1. **Machine Learning:** Dynamic trigger timing based on user behavior
2. **Personalization:** Customized offers based on user history
3. **Geographic Targeting:** Different offers for different regions
4. **Seasonal Campaigns:** Festival-specific offers and messaging
5. **Advanced Analytics:** Detailed funnel analysis and cohort tracking

### Integration Possibilities
1. **Email Integration:** Capture emails from non-converting users
2. **WhatsApp Integration:** Send offers via WhatsApp
3. **Push Notifications:** Browser push for return visitors
4. **Social Media:** Share triggers for referral bonuses