'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flame, TrendingUp, Users, ShoppingCart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  CountdownProps, 
  TimeLeft, 
  UrgencyIndicators 
} from './types';
import { 
  calculateTimeLeft, 
  isExpired, 
  formatTimeUnit, 
  getTimerTheme, 
  saveTimerState, 
  trackUserEngagement,
  generateViewersCount,
  generateLastPurchased
} from './utils';

export default function CountdownTimer({
  config,
  urgency,
  onExpire,
  onUserEngagement,
  className,
  variant = 'card',
  size = 'md'
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(true);
  const [progress, setProgress] = useState(100);
  const [viewersCount, setViewersCount] = useState(urgency?.viewersCount || generateViewersCount());
  const [lastPurchased, setLastPurchased] = useState(urgency?.lastPurchased || generateLastPurchased());
  const [hasExpired, setHasExpired] = useState(false);

  const theme = getTimerTheme(config.type);

  // Auto-extend timer functionality
  const handleAutoExtend = useCallback(() => {
    if (config.autoExtend && config.extendMinutes) {
      const newEndTime = new Date(new Date(config.endTime).getTime() + (config.extendMinutes * 60 * 1000));
      saveTimerState(config.type, newEndTime);
      setIsActive(true);
      setHasExpired(false);
      if (onUserEngagement) {
        onUserEngagement();
      }
      trackUserEngagement();
    }
  }, [config.autoExtend, config.extendMinutes, config.endTime, config.type, onUserEngagement]);

  // Update countdown every second
  useEffect(() => {
    if (!isActive || hasExpired) return;

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(config.endTime);
      setTimeLeft(newTimeLeft);

      // Calculate progress (assuming original duration of 24 hours for daily deals, 2 hours for flash sales, etc.)
      const originalDuration = config.type === 'flash-sale' ? 2 * 60 * 60 * 1000 : 
                               config.type === 'daily-deal' ? 24 * 60 * 60 * 1000 :
                               6 * 60 * 60 * 1000; // default 6 hours
      
      const elapsed = originalDuration - ((newTimeLeft.days * 24 * 60 + newTimeLeft.hours * 60 + newTimeLeft.minutes) * 60 + newTimeLeft.seconds) * 1000;
      const progressPercent = Math.max(0, Math.min(100, (elapsed / originalDuration) * 100));
      setProgress(progressPercent);

      if (isExpired(newTimeLeft)) {
        setHasExpired(true);
        if (config.autoExtend) {
          // Try to auto-extend once
          setTimeout(() => {
            handleAutoExtend();
          }, 2000);
        } else if (onExpire) {
          onExpire();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [config.endTime, config.autoExtend, config.type, isActive, hasExpired, onExpire, handleAutoExtend]);

  // Update dynamic values periodically
  useEffect(() => {
    const updateTimer = setInterval(() => {
      setViewersCount(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2 change
        return Math.max(5, Math.min(100, prev + change));
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(updateTimer);
  }, []);

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'p-3 text-sm',
      title: 'text-base font-semibold',
      timer: 'text-lg font-bold',
      badge: 'text-xs px-1',
      icon: 'w-3 h-3'
    },
    md: {
      container: 'p-4 text-base',
      title: 'text-lg font-semibold',
      timer: 'text-2xl font-bold',
      badge: 'text-xs px-2',
      icon: 'w-4 h-4'
    },
    lg: {
      container: 'p-6 text-lg',
      title: 'text-xl font-bold',
      timer: 'text-3xl font-bold',
      badge: 'text-sm px-3',
      icon: 'w-5 h-5'
    }
  };

  const currentSize = sizeConfig[size];

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  };

  const timeUnitVariants = {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.1, 1],
      transition: { duration: 0.3 }
    }
  };

  if (!isActive || hasExpired) {
    return null;
  }

  const renderBanner = () => (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        theme.background,
        theme.text,
        'relative overflow-hidden',
        currentSize.container,
        className
      )}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 animate-pulse" />
      </div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div variants={pulseVariants} animate="animate">
            <Flame className={cn(currentSize.icon, 'text-yellow-300')} />
          </motion.div>
          <div>
            <h3 className={currentSize.title}>{config.title}</h3>
            {config.subtitle && (
              <p className="text-white/80 text-sm">{config.subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Urgency indicators */}
          {urgency?.viewersCount && (
            <div className="flex items-center space-x-1 text-white/90">
              <Users className="w-3 h-3" />
              <span className="text-xs">{viewersCount} watching</span>
            </div>
          )}

          {/* Countdown */}
          <div className="flex items-center space-x-2">
            <Clock className={cn(currentSize.icon)} />
            <div className="flex space-x-1">
              {timeLeft.days > 0 && (
                <motion.span 
                  key={timeLeft.days}
                  variants={timeUnitVariants}
                  animate="animate"
                  className={cn(currentSize.timer, theme.accent, 'px-2 py-1 rounded')}
                >
                  {formatTimeUnit(timeLeft.days)}d
                </motion.span>
              )}
              <motion.span 
                key={timeLeft.hours}
                variants={timeUnitVariants}
                animate="animate"
                className={cn(currentSize.timer, theme.accent, 'px-2 py-1 rounded')}
              >
                {formatTimeUnit(timeLeft.hours)}h
              </motion.span>
              <motion.span 
                key={timeLeft.minutes}
                variants={timeUnitVariants}
                animate="animate"
                className={cn(currentSize.timer, theme.accent, 'px-2 py-1 rounded')}
              >
                {formatTimeUnit(timeLeft.minutes)}m
              </motion.span>
              <motion.span 
                key={timeLeft.seconds}
                variants={timeUnitVariants}
                animate="animate"
                className={cn(currentSize.timer, theme.accent, 'px-2 py-1 rounded')}
              >
                {formatTimeUnit(timeLeft.seconds)}s
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderCard = () => (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Card className={cn(
        'relative overflow-hidden border-2',
        theme.border,
        theme.glow,
        'shadow-lg',
        className
      )}>
        {/* Gradient background */}
        <div className={cn('absolute inset-0', theme.background, 'opacity-90')} />
        
        {/* Content */}
        <div className={cn('relative z-10', theme.text, currentSize.container)}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <motion.div variants={pulseVariants} animate="animate">
                <Flame className={cn(currentSize.icon, 'text-yellow-300')} />
              </motion.div>
              <div>
                <h3 className={currentSize.title}>{config.title}</h3>
                {config.subtitle && (
                  <p className="text-white/80 text-sm mt-1">{config.subtitle}</p>
                )}
              </div>
            </div>
            
            {urgency?.stockRemaining && (
              <Badge variant="destructive" className="animate-pulse">
                Only {urgency.stockRemaining} left!
              </Badge>
            )}
          </div>

          {/* Countdown Display */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((unit) => (
              <motion.div
                key={unit.label}
                variants={timeUnitVariants}
                animate="animate"
                className="text-center"
              >
                <motion.div
                  key={unit.value}
                  initial={{ scale: 1.2, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-1',
                    currentSize.timer
                  )}
                >
                  {formatTimeUnit(unit.value)}
                </motion.div>
                <p className="text-xs text-white/70">{unit.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          {config.showProgress && (
            <div className="mb-4">
              <Progress 
                value={progress} 
                className="h-2 bg-white/20"
              />
              <p className="text-xs text-white/70 mt-1 text-center">
                {config.urgencyText || 'Time remaining'}
              </p>
            </div>
          )}

          {/* Urgency Indicators */}
          <div className="flex justify-between text-xs text-white/80">
            {urgency?.viewersCount && (
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{viewersCount} people viewing</span>
              </div>
            )}
            
            {urgency?.lastPurchased && (
              <div className="flex items-center space-x-1">
                <ShoppingCart className="w-3 h-3" />
                <span>Last bought {lastPurchased}</span>
              </div>
            )}

            {urgency?.priceIncreaseAt && (
              <div className="flex items-center space-x-1 text-yellow-300">
                <TrendingUp className="w-3 h-3" />
                <span>Price increases soon!</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const renderPopup = () => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        {/* Popup content */}
        <Card className={cn(
          'relative z-10 w-full max-w-md border-2 shadow-2xl',
          theme.border,
          theme.glow
        )}>
          <div className={cn('absolute inset-0', theme.background, 'opacity-95 rounded-lg')} />
          
          <div className={cn('relative z-10', theme.text, 'p-6 text-center')}>
            <motion.div 
              variants={pulseVariants} 
              animate="animate"
              className="mb-4"
            >
              <Flame className="w-16 h-16 mx-auto text-yellow-300" />
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-2">{config.title}</h2>
            {config.subtitle && (
              <p className="text-white/80 mb-4">{config.subtitle}</p>
            )}

            {/* Large countdown */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((unit) => (
                <motion.div
                  key={unit.label}
                  variants={timeUnitVariants}
                  animate="animate"
                  className="text-center"
                >
                  <motion.div
                    key={unit.value}
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    className="bg-white/20 rounded-lg p-3 mb-2"
                  >
                    <div className="text-3xl font-bold">
                      {formatTimeUnit(unit.value)}
                    </div>
                  </motion.div>
                  <p className="text-xs text-white/70">{unit.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Urgency message */}
            {urgency?.stockRemaining && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 mb-4">
                <p className="text-red-200 font-semibold">
                  ⚠️ Only {urgency.stockRemaining} out of {urgency.totalStock || 100} left!
                </p>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );

  const renderInline = () => (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        'flex items-center space-x-4 p-3 rounded-lg',
        theme.background,
        theme.text,
        className
      )}
    >
      <Flame className={cn(currentSize.icon, 'text-yellow-300')} />
      
      <div className="flex-1">
        <span className="font-semibold">{config.title}</span>
        {config.subtitle && (
          <span className="text-white/80 ml-2 text-sm">- {config.subtitle}</span>
        )}
      </div>

      <div className="flex items-center space-x-1">
        {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((value, index) => (
          <motion.span
            key={index}
            variants={timeUnitVariants}
            animate="animate"
            className={cn(
              'bg-white/20 px-2 py-1 rounded text-sm font-bold min-w-[2.5rem] text-center'
            )}
          >
            {formatTimeUnit(value)}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );

  switch (variant) {
    case 'banner':
      return renderBanner();
    case 'popup':
      return renderPopup();
    case 'inline':
      return renderInline();
    case 'overlay':
      return renderPopup(); // Similar to popup but different positioning
    default:
      return renderCard();
  }
}