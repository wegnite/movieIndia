import { TimeLeft, TimerType, CountdownConfig, FestivalConfig, INDIAN_FESTIVALS_2025, CRICKET_SPECIALS_2025 } from './types';

// Calculate time left until target date
export function calculateTimeLeft(targetDate: Date | string): TimeLeft {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
}

// Check if countdown has expired
export function isExpired(timeLeft: TimeLeft): boolean {
  return timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;
}

// Format time unit with leading zero
export function formatTimeUnit(value: number): string {
  return value.toString().padStart(2, '0');
}

// Get IST time (使用本地时间，不做错误的时区转换)
export function getISTTime(): Date {
  // 直接返回当前时间，让浏览器处理时区
  return new Date();
}

// Get next midnight IST
export function getNextMidnightIST(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow;
}

// Get weekend end time (Sunday 11:59 PM IST)
export function getWeekendEndIST(): Date {
  const now = new Date();
  const daysUntilSunday = 7 - now.getDay(); // 0 = Sunday, 6 = Saturday
  const sundayEnd = new Date(now);
  sundayEnd.setDate(now.getDate() + (daysUntilSunday === 7 ? 0 : daysUntilSunday));
  sundayEnd.setHours(23, 59, 59, 999);
  return sundayEnd;
}

// Check if current time is weekend (Friday to Sunday)
export function isWeekend(): boolean {
  const now = new Date();
  const day = now.getDay();
  return day === 5 || day === 6 || day === 0; // Friday, Saturday, Sunday
}

// Get next festival
export function getNextFestival(): FestivalConfig | null {
  const now = getISTTime();
  const upcoming = INDIAN_FESTIVALS_2025
    .filter(festival => new Date(festival.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return upcoming.length > 0 ? upcoming[0] : null;
}

// Get current cricket special if active
export function getCurrentCricketSpecial() {
  const now = getISTTime();
  return CRICKET_SPECIALS_2025.find(special => 
    now >= new Date(special.startDate) && now <= new Date(special.endDate)
  );
}

// Generate countdown config based on type
export function generateCountdownConfig(type: TimerType): CountdownConfig {
  const now = new Date(); // 直接使用当前时间
  
  switch (type) {
    case 'flash-sale':
      const flashEndTime = new Date(now.getTime() + (2 * 60 * 60 * 1000)); // 2 hours from now
      return {
        type: 'flash-sale',
        endTime: flashEndTime,
        title: '⚡ Flash Sale Ending Soon!',
        subtitle: 'Get 70% OFF on all premium content',
        urgencyText: 'Offer expires in:',
        showProgress: true,
        autoExtend: true,
        extendMinutes: 30
      };
    
    case 'daily-deal':
      return {
        type: 'daily-deal',
        endTime: getNextMidnightIST(),
        title: '🌟 Daily Deal',
        subtitle: 'Special price valid until midnight',
        urgencyText: 'Deal ends in:',
        showProgress: true
      };
    
    case 'limited-slots':
      const slotsEndTime = new Date(now.getTime() + (6 * 60 * 60 * 1000)); // 6 hours
      return {
        type: 'limited-slots',
        endTime: slotsEndTime,
        title: '🔥 Limited Slots Available',
        subtitle: 'Only few premium memberships left',
        urgencyText: 'Slots close in:',
        showProgress: true
      };
    
    case 'festival':
      const nextFestival = getNextFestival();
      if (nextFestival) {
        return {
          type: 'festival',
          endTime: nextFestival.date,
          title: `🎉 ${nextFestival.name}`,
          subtitle: `Special ${nextFestival.discount}% discount`,
          urgencyText: 'Festival offer ends in:',
          showProgress: true
        };
      }
      // Fallback to generic festival
      const genericFestival = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
      return {
        type: 'festival',
        endTime: genericFestival,
        title: '🎊 Festival Special',
        subtitle: 'Celebrate with exclusive discounts',
        urgencyText: 'Offer ends in:',
        showProgress: true
      };
    
    case 'weekend':
      return {
        type: 'weekend',
        endTime: getWeekendEndIST(),
        title: '🎬 Weekend Family Special',
        subtitle: 'Perfect for family movie time',
        urgencyText: 'Weekend offer ends in:',
        showProgress: true
      };
    
    case 'early-bird':
      const earlyBirdEnd = new Date(now.getTime() + (12 * 60 * 60 * 1000)); // 12 hours
      return {
        type: 'early-bird',
        endTime: earlyBirdEnd,
        title: '🐦 Early Bird Special',
        subtitle: 'Get the best price before others wake up',
        urgencyText: 'Early bird ends in:',
        showProgress: true
      };
    
    default:
      return generateCountdownConfig('flash-sale');
  }
}

// Get theme colors based on timer type
export function getTimerTheme(type: TimerType) {
  const themes = {
    'flash-sale': {
      background: 'bg-gradient-to-r from-red-500 via-red-600 to-red-700',
      text: 'text-white',
      accent: 'bg-yellow-400 text-red-900',
      border: 'border-red-400',
      glow: 'shadow-red-500/25'
    },
    'daily-deal': {
      background: 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700',
      text: 'text-white',
      accent: 'bg-blue-200 text-blue-900',
      border: 'border-blue-400',
      glow: 'shadow-blue-500/25'
    },
    'limited-slots': {
      background: 'bg-gradient-to-r from-orange-500 via-orange-600 to-red-600',
      text: 'text-white',
      accent: 'bg-orange-200 text-orange-900',
      border: 'border-orange-400',
      glow: 'shadow-orange-500/25'
    },
    'festival': {
      background: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500',
      text: 'text-white',
      accent: 'bg-pink-200 text-purple-900',
      border: 'border-pink-400',
      glow: 'shadow-pink-500/25'
    },
    'weekend': {
      background: 'bg-gradient-to-r from-green-500 via-teal-500 to-blue-500',
      text: 'text-white',
      accent: 'bg-green-200 text-green-900',
      border: 'border-green-400',
      glow: 'shadow-green-500/25'
    },
    'early-bird': {
      background: 'bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500',
      text: 'text-white',
      accent: 'bg-yellow-200 text-yellow-900',
      border: 'border-yellow-400',
      glow: 'shadow-yellow-500/25'
    }
  };
  
  return themes[type] || themes['flash-sale'];
}

// Storage keys for persistence
export const STORAGE_KEYS = {
  TIMER_STATE: 'countdown_timer_state',
  USER_ENGAGEMENT: 'user_engagement_count',
  LAST_VISIT: 'last_visit_timestamp',
  EXTENDED_TIMERS: 'extended_timers'
};

// Save timer state to localStorage
export function saveTimerState(type: TimerType, endTime: Date | string) {
  if (typeof window !== 'undefined') {
    const state = {
      type,
      endTime: new Date(endTime).toISOString(),
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.TIMER_STATE, JSON.stringify(state));
  }
}

// Load timer state from localStorage
export function loadTimerState(): { type: TimerType; endTime: string; savedAt: string } | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEYS.TIMER_STATE);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse saved timer state');
      }
    }
  }
  return null;
}

// Track user engagement
export function trackUserEngagement() {
  if (typeof window !== 'undefined') {
    const current = parseInt(localStorage.getItem(STORAGE_KEYS.USER_ENGAGEMENT) || '0');
    localStorage.setItem(STORAGE_KEYS.USER_ENGAGEMENT, (current + 1).toString());
  }
}

// Get user engagement count
export function getUserEngagementCount(): number {
  if (typeof window !== 'undefined') {
    return parseInt(localStorage.getItem(STORAGE_KEYS.USER_ENGAGEMENT) || '0');
  }
  return 0;
}

// Generate random viewers count (for demo purposes)
export function generateViewersCount(): number {
  return Math.floor(Math.random() * 50) + 10; // 10-59 viewers
}

// Generate last purchased time (for demo purposes)
export function generateLastPurchased(): string {
  const minutes = Math.floor(Math.random() * 60) + 1; // 1-60 minutes ago
  return `${minutes} minutes ago`;
}