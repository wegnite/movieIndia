'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import CountdownTimer from './CountdownTimer';
import { generateCountdownConfig, calculateTimeLeft } from './utils';
import { TimerType } from './types';
import { cn } from '@/lib/utils';

interface VideoPlayerOverlayProps {
  isVideoPaused?: boolean;
  isVideoPlaying?: boolean;
  onResumeVideo?: () => void;
  onSubscribeClick?: () => void;
  showOnPause?: boolean;
  showOnPlay?: boolean;
  timerType?: TimerType;
  overlayDelay?: number; // seconds to wait before showing overlay
  className?: string;
}

export default function VideoPlayerOverlay({
  isVideoPaused = false,
  isVideoPlaying = false,
  onResumeVideo,
  onSubscribeClick,
  showOnPause = true,
  showOnPlay = false,
  timerType = 'flash-sale',
  overlayDelay = 5,
  className
}: VideoPlayerOverlayProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [config, setConfig] = useState(generateCountdownConfig(timerType));
  const [watchTime, setWatchTime] = useState(0);

  // Show overlay based on video state
  useEffect(() => {
    if (showOnPause && isVideoPaused) {
      const timer = setTimeout(() => {
        setShowOverlay(true);
      }, 1000); // Show after 1 second of pause
      
      return () => clearTimeout(timer);
    } else if (showOnPlay && isVideoPlaying) {
      const timer = setTimeout(() => {
        setShowOverlay(true);
      }, overlayDelay * 1000);
      
      return () => clearTimeout(timer);
    } else {
      setShowOverlay(false);
    }
  }, [isVideoPaused, isVideoPlaying, showOnPause, showOnPlay, overlayDelay]);

  // Track watch time
  useEffect(() => {
    if (isVideoPlaying) {
      const interval = setInterval(() => {
        setWatchTime(prev => prev + 1);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isVideoPlaying]);

  const handleClose = () => {
    setShowOverlay(false);
  };

  const handleResumeVideo = () => {
    setShowOverlay(false);
    if (onResumeVideo) {
      onResumeVideo();
    }
  };

  const handleSubscribe = () => {
    if (onSubscribeClick) {
      onSubscribeClick();
    }
  };

  if (!showOverlay) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm',
          className
        )}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Main overlay content */}
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          className="w-full max-w-lg mx-4"
        >
          <Card className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white border-red-500 shadow-2xl overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
            </div>

            <div className="relative z-10 p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="inline-block mb-3"
                >
                  <Zap className="w-12 h-12 text-yellow-300 mx-auto" />
                </motion.div>
                
                <h2 className="text-2xl font-bold mb-2">
                  🎬 Enjoying the Preview?
                </h2>
                <p className="text-red-100 mb-1">
                  Get full access to premium content
                </p>
                {watchTime > 0 && (
                  <p className="text-red-200 text-sm">
                    You've watched {Math.floor(watchTime / 60)}:{(watchTime % 60).toString().padStart(2, '0')} so far
                  </p>
                )}
              </div>

              {/* Countdown Timer - Compact Version */}
              <div className="mb-6">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                  <p className="text-sm font-medium text-red-100 mb-2">
                    ⚡ Limited Time Offer Ends In:
                  </p>
                  
                  <CountdownTimer
                    config={{
                      ...config,
                      title: '',
                      subtitle: ''
                    }}
                    variant="inline"
                    size="sm"
                    className="bg-transparent"
                  />
                </div>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full flex-shrink-0" />
                  <span>Watch complete Mahavatar Narsimha movie</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full flex-shrink-0" />
                  <span>4K Ultra HD quality with Dolby Atmos</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full flex-shrink-0" />
                  <span>Behind-the-scenes exclusive content</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-yellow-300 rounded-full flex-shrink-0" />
                  <span>Download for offline viewing</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white/10 rounded-lg p-4 mb-6 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-lg line-through text-red-200">₹299</span>
                  <span className="text-3xl font-bold text-yellow-300">₹99</span>
                  <span className="bg-yellow-400 text-red-900 px-2 py-1 rounded text-xs font-bold">
                    67% OFF
                  </span>
                </div>
                <p className="text-red-100 text-sm">
                  Special launch price • Save ₹200
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={handleSubscribe}
                  className="w-full bg-yellow-400 text-red-900 hover:bg-yellow-300 font-semibold text-lg py-6 relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}
                  />
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <Zap className="w-5 h-5" />
                    <span>Get Instant Access - ₹99</span>
                  </span>
                </Button>

                {isVideoPaused && (
                  <Button 
                    variant="outline"
                    onClick={handleResumeVideo}
                    className="w-full border-red-300 text-red-100 hover:bg-red-700/50"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Continue Watching Preview
                  </Button>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-4 text-xs text-red-200">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>1,247 watching now</span>
                  </div>
                  <div>•</div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>Sold 89 in last hour</span>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center justify-center space-x-1 text-xs text-red-200">
                  <span>⭐⭐⭐⭐⭐</span>
                  <span>4.8/5 from 2,341 reviews</span>
                </div>

                <p className="text-xs text-red-300 mt-3">
                  30-day money-back guarantee • Cancel anytime
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}