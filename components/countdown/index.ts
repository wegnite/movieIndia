// Countdown Timer System - Main exports

export { default as CountdownTimer } from './CountdownTimer';
export { default as CountdownManager } from './CountdownManager';
export { default as HeaderCountdownBanner } from './HeaderCountdownBanner';
export { default as PricingUrgencyTimer } from './PricingUrgencyTimer';
export { default as VideoPlayerOverlay } from './VideoPlayerOverlay';
export { default as FestivalCountdown } from './FestivalCountdown';

// Types
export type {
  TimerType,
  TimeLeft,
  CountdownConfig,
  UrgencyIndicators,
  FestivalConfig,
  CountdownProps
} from './types';

// Utilities
export {
  calculateTimeLeft,
  isExpired,
  formatTimeUnit,
  getISTTime,
  getNextMidnightIST,
  getWeekendEndIST,
  isWeekend,
  getNextFestival,
  getCurrentCricketSpecial,
  generateCountdownConfig,
  getTimerTheme,
  saveTimerState,
  loadTimerState,
  trackUserEngagement,
  getUserEngagementCount,
  generateViewersCount,
  generateLastPurchased
} from './utils';

// Constants
export {
  INDIAN_FESTIVALS_2025,
  CRICKET_SPECIALS_2025
} from './types';