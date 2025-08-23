'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Zap, Clock, TrendingUp, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import CountdownTimer from './CountdownTimer';
import { 
  generateCountdownConfig, 
  calculateTimeLeft, 
  formatTimeUnit,
  generateViewersCount,
  generateLastPurchased
} from './utils';
import { TimerType, CountdownConfig } from './types';
import { cn } from '@/lib/utils';

interface PricingUrgencyTimerProps {
  timerType?: TimerType;
  originalPrice?: number;
  currentPrice?: number;
  currency?: string;
  nextPriceIncrease?: number;
  className?: string;
  showStockCounter?: boolean;
  showViewersCount?: boolean;
  showLastPurchased?: boolean;
  stockRemaining?: number;
  totalStock?: number;
}

export default function PricingUrgencyTimer({
  timerType = 'flash-sale',
  originalPrice,
  currentPrice,
  currency = '₹',
  nextPriceIncrease,
  className,
  showStockCounter = true,
  showViewersCount = true,
  showLastPurchased = true,
  stockRemaining = 23,
  totalStock = 100
}: PricingUrgencyTimerProps) {
  const [config, setConfig] = useState<CountdownConfig>(generateCountdownConfig(timerType));
  const [viewersCount, setViewersCount] = useState(generateViewersCount());
  const [lastPurchased, setLastPurchased] = useState(generateLastPurchased());
  const [priceIncreaseWarning, setPriceIncreaseWarning] = useState(false);

  // Update viewers count periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setViewersCount(prev => {
        const change = Math.floor(Math.random() * 6) - 2; // -2 to +3
        return Math.max(8, Math.min(85, prev + change));
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Update last purchased periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setLastPurchased(generateLastPurchased());
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  // Check for price increase warning
  useEffect(() => {
    const timeLeft = calculateTimeLeft(config.endTime);
    const totalMinutesLeft = timeLeft.days * 24 * 60 + timeLeft.hours * 60 + timeLeft.minutes;
    
    // Show warning if less than 30 minutes left
    setPriceIncreaseWarning(totalMinutesLeft < 30);
  }, [config.endTime]);

  const stockPercentage = ((totalStock - stockRemaining) / totalStock) * 100;

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Countdown Timer */}
      <CountdownTimer
        config={{
          ...config,
          title: `🔥 ${config.title}`,
          subtitle: originalPrice && currentPrice 
            ? `Save ${currency}${(originalPrice - currentPrice).toLocaleString()}`
            : config.subtitle
        }}
        urgency={{
          stockRemaining,
          totalStock,
          viewersCount,
          lastPurchased
        }}
        variant="card"
        size="md"
      />

      {/* Price Increase Warning */}
      <AnimatePresence>
        {priceIncreaseWarning && nextPriceIncrease && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-red-400">
              <div className="p-4 flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <AlertTriangle className="w-6 h-6 text-yellow-300" />
                </motion.div>
                <div className="flex-1">
                  <h4 className="font-semibold">⚠️ Price Will Increase Soon!</h4>
                  <p className="text-red-100 text-sm">
                    Next price: {currency}{nextPriceIncrease.toLocaleString()} 
                    (+{currency}{((nextPriceIncrease - (currentPrice || 0))).toLocaleString()})
                  </p>
                </div>
                <TrendingUp className="w-5 h-5 text-red-200" />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Urgency Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Stock Counter */}
        {showStockCounter && (
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-gradient-to-br from-orange-100 to-red-100 border border-orange-200 rounded-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold text-gray-700">Limited Slots</span>
              </div>
              <Badge variant="destructive" className="animate-pulse">
                {stockRemaining} left
              </Badge>
            </div>
            
            <Progress 
              value={stockPercentage} 
              className="h-2 mb-2"
            />
            
            <p className="text-xs text-gray-600">
              {Math.round(stockPercentage)}% claimed • {totalStock - stockRemaining} people joined
            </p>
          </motion.div>
        )}

        {/* Live Activity */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-gradient-to-br from-blue-100 to-green-100 border border-blue-200 rounded-lg"
        >
          <div className="space-y-2">
            {showViewersCount && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {viewersCount} people viewing now
                </span>
              </div>
            )}
            
            {showLastPurchased && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="text-xs text-gray-600">
                  Last purchased {lastPurchased}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Additional Urgency Messages */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="text-center space-y-2"
      >
        <p className="text-sm text-gray-600 font-medium">
          🎯 {stockRemaining < 10 ? 'Almost sold out!' : 
               stockRemaining < 30 ? 'Selling fast!' : 
               'Limited time offer!'}
        </p>
        
        {timerType === 'weekend' && (
          <p className="text-xs text-gray-500">
            ⚡ Perfect for weekend binge-watching with family
          </p>
        )}
        
        {timerType === 'festival' && (
          <p className="text-xs text-gray-500">
            🎊 Celebrate festivals with unlimited entertainment
          </p>
        )}
      </motion.div>

      {/* Social Proof */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3 }}
        className="text-center p-3 bg-green-50 border border-green-200 rounded-lg"
      >
        <p className="text-sm text-green-700 font-medium">
          ✅ Join {(totalStock - stockRemaining).toLocaleString()}+ happy customers
        </p>
        <p className="text-xs text-green-600 mt-1">
          Rated 4.8/5 stars • 30-day money-back guarantee
        </p>
      </motion.div>
    </div>
  );
}