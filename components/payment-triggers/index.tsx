// Export all payment trigger components
export { default as PaymentTriggersManager } from './PaymentTriggersManager'
export { default as FloatingActionButton } from './FloatingActionButton'
export { default as ExitIntentPopup } from './ExitIntentPopup'
export { default as VideoPauseOverlay } from './VideoPauseOverlay'
export { default as StickyBottomBanner } from './StickyBottomBanner'
export { default as TimedPopup } from './TimedPopup'
export { default as ContentSectionCTA } from './ContentSectionCTA'
export { usePaymentTriggerTracking } from './usePaymentTriggerTracking'

// Types
export interface PaymentTriggerProps {
  onPaymentClick: () => void
}

export interface PaymentTriggersConfig {
  showFloatingButton?: boolean
  showExitIntent?: boolean
  showVideoPauseOverlay?: boolean
  showStickyBanner?: boolean
  showTimedPopup?: boolean
  showContentCTAs?: boolean
  videoElement?: HTMLVideoElement | null
  page?: 'home' | 'movie' | 'pricing' | 'watch'
}