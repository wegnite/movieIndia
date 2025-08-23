// Countdown timer types and configurations
export type TimerType = 'flash-sale' | 'daily-deal' | 'limited-slots' | 'festival' | 'weekend' | 'early-bird';

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownConfig {
  type: TimerType;
  endTime: Date | string;
  title: string;
  subtitle?: string;
  urgencyText?: string;
  showProgress?: boolean;
  autoExtend?: boolean;
  extendMinutes?: number;
  timezone?: string;
}

export interface UrgencyIndicators {
  stockRemaining?: number;
  totalStock?: number;
  viewersCount?: number;
  lastPurchased?: string;
  priceIncreaseAt?: Date;
}

export interface FestivalConfig {
  name: string;
  date: Date;
  discount: number;
  theme: 'diwali' | 'holi' | 'eid' | 'christmas' | 'durga-puja' | 'ganesh-chaturthi';
}

export interface CountdownProps {
  config: CountdownConfig;
  urgency?: UrgencyIndicators;
  onExpire?: () => void;
  onUserEngagement?: () => void;
  className?: string;
  variant?: 'banner' | 'card' | 'popup' | 'overlay' | 'inline';
  size?: 'sm' | 'md' | 'lg';
}

// Indian festivals for 2025
export const INDIAN_FESTIVALS_2025: FestivalConfig[] = [
  {
    name: 'Republic Day Sale',
    date: new Date('2025-01-26'),
    discount: 26,
    theme: 'christmas'
  },
  {
    name: 'Holi Celebration',
    date: new Date('2025-03-14'),
    discount: 40,
    theme: 'holi'
  },
  {
    name: 'Ram Navami Special',
    date: new Date('2025-04-06'),
    discount: 35,
    theme: 'durga-puja'
  },
  {
    name: 'Eid ul-Fitr Offer',
    date: new Date('2025-03-30'),
    discount: 30,
    theme: 'eid'
  },
  {
    name: 'Independence Day Sale',
    date: new Date('2025-08-15'),
    discount: 75,
    theme: 'christmas'
  },
  {
    name: 'Ganesh Chaturthi',
    date: new Date('2025-08-27'),
    discount: 45,
    theme: 'ganesh-chaturthi'
  },
  {
    name: 'Durga Puja Special',
    date: new Date('2025-09-30'),
    discount: 50,
    theme: 'durga-puja'
  },
  {
    name: 'Diwali Mega Sale',
    date: new Date('2025-10-20'),
    discount: 60,
    theme: 'diwali'
  },
  {
    name: 'Christmas Special',
    date: new Date('2025-12-25'),
    discount: 40,
    theme: 'christmas'
  }
];

// Cricket match specials (IPL 2025 tentative dates)
export const CRICKET_SPECIALS_2025 = [
  {
    name: 'IPL Opening Week',
    startDate: new Date('2025-03-22'),
    endDate: new Date('2025-03-29'),
    discount: 30
  },
  {
    name: 'IPL Finals Week',
    startDate: new Date('2025-05-24'),
    endDate: new Date('2025-05-31'),
    discount: 50
  }
];