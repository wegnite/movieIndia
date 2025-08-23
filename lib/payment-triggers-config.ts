// Configuration for Payment Triggers
// Customize behavior, timing, and appearance of payment triggers

export const PAYMENT_TRIGGERS_CONFIG = {
  // Global settings
  enabled: true,
  trackingEnabled: true,
  debugMode: process.env.NODE_ENV === 'development',

  // Pricing configuration
  pricing: {
    regularPrice: 99,
    discountPrice: 49,
    specialOfferPrice: 29, // For time-limited offers
    currency: '₹',
    discountPercentage: 50,
    specialDiscountPercentage: 70,
  },

  // Social proof numbers (update these regularly)
  socialProof: {
    totalViewers: '2.1M+',
    dailyUpgrades: '8,234',
    userRating: '4.9/5',
    imdbRating: '9.4/10',
    satisfactionScore: '4.9/5',
  },

  // Timing configuration (in milliseconds)
  timing: {
    floatingButtonDelay: 3000, // Show after 3 seconds of scrolling
    floatingButtonAutoExpand: 3000, // Auto-expand after 3 seconds
    floatingButtonAutoCollapse: 10000, // Auto-collapse after 10 seconds
    timedPopupDelay: 30000, // Show after 30 seconds
    videoPauseOverlayDelay: 0, // Show immediately on pause (2nd+ time)
    stickyBannerScrollThreshold: 50, // Show after 50% scroll
    exitIntentSensitivity: 10, // Pixels from top to trigger exit intent
  },

  // Dismissal persistence (in milliseconds)
  dismissalPersistence: {
    floatingButton: 24 * 60 * 60 * 1000, // 24 hours
    exitIntent: 2 * 60 * 60 * 1000, // 2 hours
    videoPauseOverlay: 30 * 60 * 1000, // 30 minutes
    stickyBanner: 60 * 60 * 1000, // 1 hour
    timedPopup: 4 * 60 * 60 * 1000, // 4 hours
    contentCTA: 60 * 60 * 1000, // 1 hour per variant
  },

  // Trigger-specific configurations
  triggers: {
    floatingButton: {
      enabled: true,
      showOnPages: ['movie', 'watch', 'home'],
      position: 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
      size: 'large', // 'small', 'medium', 'large'
      pulseAnimation: true,
      expandOnHover: false,
      showViewerCount: true,
      showPrice: true,
    },

    exitIntent: {
      enabled: true,
      showOnPages: ['movie', 'watch', 'pricing'],
      mobileBackButtonDetection: true,
      offerType: 'exit-special', // 'standard', 'exit-special'
      urgencyTimer: 300, // 5 minutes in seconds
      showSocialProof: true,
      preventActualExit: true, // Temporarily prevent navigation
    },

    videoPauseOverlay: {
      enabled: true,
      showOnPages: ['movie', 'watch'],
      triggerOnPauseNumber: 2, // Show on 2nd pause
      repeatInterval: 3, // Show every 3rd pause after initial
      autoHideDelay: 8000, // Auto-hide after 8 seconds
      showBenefitsComparison: true,
      allowContinueWatching: true,
    },

    stickyBanner: {
      enabled: true,
      showOnPages: ['movie', 'home', 'cast', 'reviews'],
      position: 'bottom', // 'top', 'bottom'
      allowMinimize: true,
      urgencyTimer: 1800, // 30 minutes in seconds
      showOnMobile: true,
      animationType: 'slide-up', // 'slide-up', 'fade-in', 'none'
    },

    timedPopup: {
      enabled: true,
      showOnPages: ['movie', 'home'],
      delay: 30000, // 30 seconds
      offerType: 'time-limited', // 'standard', 'time-limited'
      urgencyTimer: 600, // 10 minutes in seconds
      showProgressBar: true,
      specialDiscount: true, // Use special offer pricing
    },

    contentCTAs: {
      enabled: true,
      showOnPages: ['movie', 'home'],
      variants: {
        'after-cast': { enabled: true, priority: 1 },
        'after-reviews': { enabled: true, priority: 2 },
        'after-news': { enabled: true, priority: 3 },
        'after-videos': { enabled: true, priority: 4 },
        'mid-content': { enabled: true, priority: 5 },
      },
      maxPerPage: 3, // Maximum CTAs per page
      spacing: 'auto', // 'auto', 'fixed', 'dynamic'
    },
  },

  // A/B Testing configurations
  abTesting: {
    enabled: false, // Enable when ready for testing
    variants: {
      pricing: ['standard', 'discount', 'special'],
      messaging: ['urgency', 'value', 'social'],
      timing: ['normal', 'aggressive', 'conservative'],
    },
    splitRatio: [33, 33, 34], // Percentage split for variants
  },

  // Regional customizations for Indian market
  regional: {
    currency: '₹',
    paymentMethods: ['UPI', 'Cards', 'Net Banking', 'Wallets'],
    languages: ['Hindi', 'English', 'Tamil', 'Telugu', 'Kannada'],
    culturalElements: {
      showFestivalOffers: true,
      useLocalTestimonials: true,
      emphasizeValueForMoney: true,
      showFamilyFriendlyBadges: true,
    },
  },

  // Performance settings
  performance: {
    lazyLoadTriggers: true,
    preloadCriticalTriggers: ['floatingButton', 'exitIntent'],
    optimizeAnimations: true,
    respectReducedMotion: true,
    cacheTriggerStates: true,
  },

  // Analytics settings
  analytics: {
    trackViews: true,
    trackClicks: true,
    trackDismissals: true,
    trackConversions: true,
    batchAnalytics: true,
    retryFailedEvents: true,
    anonymizeData: true,
  },

  // Accessibility settings
  accessibility: {
    highContrastSupport: true,
    screenReaderAnnouncements: true,
    keyboardNavigation: true,
    focusManagement: true,
    colorBlindFriendly: true,
  },

  // Development settings
  development: {
    showDebugInfo: process.env.NODE_ENV === 'development',
    logTriggerEvents: process.env.NODE_ENV === 'development',
    bypassDismissalPersistence: false,
    testMode: false, // Shows all triggers immediately
  },
}

// Helper function to get configuration for a specific page
export function getPageTriggerConfig(page: string) {
  return Object.fromEntries(
    Object.entries(PAYMENT_TRIGGERS_CONFIG.triggers).filter(
      ([_, config]) => config.showOnPages.includes(page)
    )
  )
}

// Helper function to check if a trigger is enabled for a specific page
export function isTriggerEnabledForPage(triggerName: string, page: string): boolean {
  const trigger = PAYMENT_TRIGGERS_CONFIG.triggers[triggerName as keyof typeof PAYMENT_TRIGGERS_CONFIG.triggers]
  return trigger?.enabled && trigger?.showOnPages.includes(page)
}

// Helper function to get pricing for a specific trigger
export function getTriggerPricing(triggerType: 'standard' | 'special' | 'exit') {
  const { pricing } = PAYMENT_TRIGGERS_CONFIG
  
  switch (triggerType) {
    case 'special':
      return {
        original: pricing.regularPrice,
        discounted: pricing.specialOfferPrice,
        discount: pricing.specialDiscountPercentage,
        savings: pricing.regularPrice - pricing.specialOfferPrice,
      }
    case 'exit':
      return {
        original: pricing.regularPrice,
        discounted: pricing.specialOfferPrice,
        discount: pricing.specialDiscountPercentage,
        savings: pricing.regularPrice - pricing.specialOfferPrice,
      }
    default:
      return {
        original: pricing.regularPrice,
        discounted: pricing.discountPrice,
        discount: pricing.discountPercentage,
        savings: pricing.regularPrice - pricing.discountPrice,
      }
  }
}