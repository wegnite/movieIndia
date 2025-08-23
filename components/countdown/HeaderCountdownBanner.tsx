'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CountdownTimer from './CountdownTimer';
import { generateCountdownConfig, loadTimerState, saveTimerState } from './utils';
import { TimerType } from './types';

interface HeaderCountdownBannerProps {
  defaultType?: TimerType;
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export default function HeaderCountdownBanner({ 
  defaultType = 'flash-sale',
  className,
  showCloseButton = true,
  onClose
}: HeaderCountdownBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [config, setConfig] = useState(generateCountdownConfig(defaultType));

  // Load saved state on mount
  useEffect(() => {
    const savedState = loadTimerState();
    if (savedState && savedState.type === defaultType) {
      const savedEndTime = new Date(savedState.endTime);
      const now = new Date();
      
      // Check if saved timer is still valid
      if (savedEndTime > now) {
        setConfig({
          ...generateCountdownConfig(savedState.type),
          endTime: savedState.endTime
        });
      } else {
        // Generate new timer if expired
        const newConfig = generateCountdownConfig(defaultType);
        setConfig(newConfig);
        saveTimerState(newConfig.type, newConfig.endTime);
      }
    } else {
      // Save initial state
      saveTimerState(config.type, config.endTime);
    }
  }, [defaultType, config.type, config.endTime]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  const handleTimerExpire = () => {
    // Auto-hide banner when timer expires (unless it auto-extends)
    if (!config.autoExtend) {
      setIsVisible(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="relative">
      <CountdownTimer
        config={config}
        variant="banner"
        size="sm"
        urgency={{
          viewersCount: 42,
          stockRemaining: 27,
          totalStock: 100,
          lastPurchased: '3 minutes ago'
        }}
        onExpire={handleTimerExpire}
        className={className}
      />
      
      {showCloseButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="absolute top-2 right-2 z-20 text-white/70 hover:text-white hover:bg-white/10 h-6 w-6 p-0"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}