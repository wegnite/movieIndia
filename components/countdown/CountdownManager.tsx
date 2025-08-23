'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import HeaderCountdownBanner from './HeaderCountdownBanner';
import PricingUrgencyTimer from './PricingUrgencyTimer';
import VideoPlayerOverlay from './VideoPlayerOverlay';
import FestivalCountdown from './FestivalCountdown';
import CountdownTimer from './CountdownTimer';
import { TimerType, CountdownConfig } from './types';
import { 
  generateCountdownConfig, 
  getISTTime, 
  isWeekend,
  getNextFestival,
  getCurrentCricketSpecial,
  getUserEngagementCount,
  trackUserEngagement
} from './utils';

interface CountdownManagerProps {
  // Display options
  showHeaderBanner?: boolean;
  showPricingUrgency?: boolean;
  showVideoOverlay?: boolean;
  showFestivalCountdown?: boolean;
  
  // Video player integration
  isVideoPaused?: boolean;
  isVideoPlaying?: boolean;
  onResumeVideo?: () => void;
  
  // Pricing information
  originalPrice?: number;
  currentPrice?: number;
  currency?: string;
  
  // Event handlers
  onSubscribeClick?: () => void;
  onTimerExpire?: (timerType: TimerType) => void;
  
  // Configuration
  className?: string;
  priorityTimer?: TimerType;
}

export default function CountdownManager({
  showHeaderBanner = true,
  showPricingUrgency = true,
  showVideoOverlay = false,
  showFestivalCountdown = true,
  isVideoPaused = false,
  isVideoPlaying = false,
  onResumeVideo,
  originalPrice,
  currentPrice,
  currency = '₹',
  onSubscribeClick,
  onTimerExpire,
  className,
  priorityTimer
}: CountdownManagerProps) {
  const [activeTimers, setActiveTimers] = useState<TimerType[]>([]);
  const [currentSegment, setCurrentSegment] = useState<'new' | 'returning' | 'engaged'>('new');
  const [showBannerTimer, setShowBannerTimer] = useState(showHeaderBanner);

  // Determine user segment and appropriate timers
  useEffect(() => {
    const engagementCount = getUserEngagementCount();
    const now = getISTTime();
    const hour = now.getHours();
    const isWeekendNow = isWeekend();
    const nextFestival = getNextFestival();
    const cricketSpecial = getCurrentCricketSpecial();

    // Determine user segment
    if (engagementCount === 0) {
      setCurrentSegment('new');
    } else if (engagementCount < 5) {
      setCurrentSegment('returning');
    } else {
      setCurrentSegment('engaged');
    }

    // Smart timer selection based on context
    const timers: TimerType[] = [];

    // Priority timer override
    if (priorityTimer) {
      timers.push(priorityTimer);
    } else {
      // Cricket special takes highest priority
      if (cricketSpecial) {
        timers.push('festival');
      }
      // Festival countdown for upcoming festivals (within 7 days)
      else if (nextFestival && new Date(nextFestival.date).getTime() - now.getTime() < 7 * 24 * 60 * 60 * 1000) {
        timers.push('festival');
      }
      // Weekend special (Friday evening to Sunday)
      else if (isWeekendNow || (hour >= 18 && now.getDay() === 4)) { // Thursday evening
        timers.push('weekend');
      }
      // Early bird for early hours (5 AM - 9 AM)
      else if (hour >= 5 && hour <= 9) {
        timers.push('early-bird');
      }
      // Flash sale for peak hours (7 PM - 11 PM)
      else if (hour >= 19 && hour <= 23) {
        timers.push('flash-sale');
      }
      // Daily deal as fallback
      else {
        timers.push('daily-deal');
      }
    }

    // Add secondary timers based on user segment
    if (currentSegment === 'new') {
      // New users get more aggressive urgency
      if (!timers.includes('flash-sale')) timers.push('flash-sale');
      if (!timers.includes('limited-slots')) timers.push('limited-slots');
    } else if (currentSegment === 'returning') {
      // Returning users get targeted offers
      if (!timers.includes('weekend')) timers.push('weekend');
      if (!timers.includes('early-bird')) timers.push('early-bird');
    }

    setActiveTimers(timers.slice(0, 2)); // Limit to 2 active timers
  }, [priorityTimer, currentSegment]);

  const handleTimerExpire = (timerType: TimerType) => {
    // Remove expired timer from active list
    setActiveTimers(prev => prev.filter(t => t !== timerType));
    
    // Notify parent component
    if (onTimerExpire) {
      onTimerExpire(timerType);
    }
  };

  const handleUserEngagement = () => {
    trackUserEngagement();
  };

  const handleCloseBanner = () => {
    setShowBannerTimer(false);
  };

  return (
    <div className={className}>
      {/* Header Banner Timer */}
      <AnimatePresence>
        {showBannerTimer && activeTimers.length > 0 && (
          <HeaderCountdownBanner
            defaultType={activeTimers[0]}
            onClose={handleCloseBanner}
            showCloseButton={true}
          />
        )}
      </AnimatePresence>

      {/* Festival Countdown */}
      <AnimatePresence>
        {showFestivalCountdown && (getCurrentCricketSpecial() || getNextFestival()) && (
          <div className="mb-6">
            <FestivalCountdown
              variant="card"
              showCricketSpecials={true}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Pricing Urgency Timer */}
      <AnimatePresence>
        {showPricingUrgency && activeTimers.length > 0 && (
          <div className="mb-6">
            <PricingUrgencyTimer
              timerType={activeTimers[0]}
              originalPrice={originalPrice}
              currentPrice={currentPrice}
              currency={currency}
              nextPriceIncrease={currentPrice ? currentPrice * 1.5 : undefined}
              stockRemaining={Math.floor(Math.random() * 30) + 5} // 5-34 remaining
              totalStock={100}
              showStockCounter={currentSegment === 'new'}
              showViewersCount={true}
              showLastPurchased={currentSegment !== 'new'}
            />
          </div>
        )}
      </AnimatePresence>

      {/* Video Player Overlay */}
      <AnimatePresence>
        {showVideoOverlay && activeTimers.length > 0 && (
          <VideoPlayerOverlay
            isVideoPaused={isVideoPaused}
            isVideoPlaying={isVideoPlaying}
            onResumeVideo={onResumeVideo}
            onSubscribeClick={onSubscribeClick}
            showOnPause={true}
            showOnPlay={false}
            timerType={activeTimers[0]}
            overlayDelay={currentSegment === 'new' ? 10 : 30} // Show sooner for new users
          />
        )}
      </AnimatePresence>

      {/* Secondary Timers */}
      <AnimatePresence>
        {activeTimers.slice(1).map((timerType, index) => (
          <div key={`${timerType}-${index}`} className="mb-4">
            <CountdownTimer
              config={generateCountdownConfig(timerType)}
              variant="card"
              size="sm"
              onExpire={() => handleTimerExpire(timerType)}
              onUserEngagement={handleUserEngagement}
              urgency={{
                stockRemaining: Math.floor(Math.random() * 20) + 10,
                viewersCount: Math.floor(Math.random() * 50) + 15,
                lastPurchased: `${Math.floor(Math.random() * 30) + 1} minutes ago`
              }}
            />
          </div>
        ))}
      </AnimatePresence>

      {/* Debug Info (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm">
          <h3 className="font-semibold mb-2">Countdown Manager Debug:</h3>
          <p>User Segment: <span className="font-mono">{currentSegment}</span></p>
          <p>Active Timers: <span className="font-mono">{activeTimers.join(', ')}</span></p>
          <p>Engagement Count: <span className="font-mono">{getUserEngagementCount()}</span></p>
          <p>Weekend: <span className="font-mono">{isWeekend() ? 'Yes' : 'No'}</span></p>
          <p>Next Festival: <span className="font-mono">{getNextFestival()?.name || 'None'}</span></p>
          <p>Cricket Special: <span className="font-mono">{getCurrentCricketSpecial()?.name || 'None'}</span></p>
        </div>
      )}
    </div>
  );
}