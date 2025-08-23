'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Gift, Star, Sparkles, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CountdownTimer from './CountdownTimer';
import { 
  getNextFestival, 
  getCurrentCricketSpecial, 
  generateCountdownConfig,
  getISTTime
} from './utils';
import { FestivalConfig } from './types';
import { cn } from '@/lib/utils';

interface FestivalCountdownProps {
  className?: string;
  variant?: 'card' | 'banner' | 'minimal';
  showCricketSpecials?: boolean;
}

// Festival theme configurations
const FESTIVAL_THEMES = {
  'diwali': {
    colors: 'from-orange-500 via-yellow-500 to-red-500',
    icon: '🪔',
    bgPattern: '✨🎆🪔✨',
    greeting: 'Happy Diwali'
  },
  'holi': {
    colors: 'from-pink-500 via-purple-500 to-blue-500',
    icon: '🎨',
    bgPattern: '🌈🎨💜🎨',
    greeting: 'Happy Holi'
  },
  'eid': {
    colors: 'from-green-500 via-teal-500 to-blue-500',
    icon: '🌙',
    bgPattern: '🌙⭐🕌⭐',
    greeting: 'Eid Mubarak'
  },
  'christmas': {
    colors: 'from-red-500 via-green-500 to-red-500',
    icon: '🎄',
    bgPattern: '🎄⭐🎁⭐',
    greeting: 'Merry Christmas'
  },
  'durga-puja': {
    colors: 'from-red-500 via-orange-500 to-yellow-500',
    icon: '🙏',
    bgPattern: '🙏🌺🪔🌺',
    greeting: 'Happy Durga Puja'
  },
  'ganesh-chaturthi': {
    colors: 'from-orange-500 via-red-500 to-pink-500',
    icon: '🐘',
    bgPattern: '🐘🌺🙏🌺',
    greeting: 'Ganesh Chaturthi'
  }
};

export default function FestivalCountdown({
  className,
  variant = 'card',
  showCricketSpecials = true
}: FestivalCountdownProps) {
  const [currentFestival, setCurrentFestival] = useState<FestivalConfig | null>(null);
  const [cricketSpecial, setCricketSpecial] = useState<any>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Get next festival
    const nextFestival = getNextFestival();
    setCurrentFestival(nextFestival);

    // Get current cricket special if enabled
    if (showCricketSpecials) {
      const currentCricket = getCurrentCricketSpecial();
      setCricketSpecial(currentCricket);
    }

    // Trigger animation
    setShowAnimation(true);
  }, [showCricketSpecials]);

  if (!currentFestival && !cricketSpecial) {
    return null;
  }

  // Prioritize cricket special if active
  const activeEvent = cricketSpecial || currentFestival;
  const isCricketEvent = !!cricketSpecial;

  const theme = isCricketEvent 
    ? {
        colors: 'from-blue-600 via-green-600 to-orange-600',
        icon: '🏏',
        bgPattern: '🏏🎯🏆🎯',
        greeting: 'Cricket Special'
      }
    : FESTIVAL_THEMES[currentFestival?.theme || 'diwali'];

  const renderMinimal = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-gradient-to-r p-3 rounded-lg text-white shadow-lg',
        theme.colors,
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-xl"
          >
            {theme.icon}
          </motion.span>
          <div>
            <h3 className="font-semibold text-sm">
              {isCricketEvent ? activeEvent.name : `${theme.greeting} Special`}
            </h3>
            <p className="text-xs opacity-90">
              {isCricketEvent 
                ? `${activeEvent.discount}% OFF during matches` 
                : `${activeEvent.discount}% Festival Discount`
              }
            </p>
          </div>
        </div>
        
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
          {isCricketEvent ? 'Live Now' : 'Coming Soon'}
        </Badge>
      </div>
    </motion.div>
  );

  const renderBanner = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'bg-gradient-to-r text-white shadow-lg relative overflow-hidden',
        theme.colors,
        className
      )}
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10 text-4xl">
        <motion.div
          animate={{ x: ['0%', '100%'] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          className="whitespace-nowrap py-4"
        >
          {theme.bgPattern.repeat(20)}
        </motion.div>
      </div>

      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-3xl"
            >
              {theme.icon}
            </motion.div>
            
            <div>
              <h2 className="text-xl font-bold">
                {isCricketEvent ? activeEvent.name : theme.greeting}!
              </h2>
              <p className="text-white/90">
                Special {activeEvent.discount}% discount on all premium content
              </p>
            </div>
          </div>

          {/* Mini countdown for banner */}
          <div className="text-right">
            <CountdownTimer
              config={generateCountdownConfig('festival')}
              variant="inline"
              size="sm"
              className="bg-white/10"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      <Card className="overflow-hidden border-2 shadow-2xl relative">
        {/* Gradient background */}
        <div className={cn('absolute inset-0 bg-gradient-to-br', theme.colors, 'opacity-90')} />
        
        {/* Animated decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 20, ease: 'linear' },
              scale: { repeat: Infinity, duration: 4 }
            }}
            className="absolute -top-10 -right-10 text-8xl opacity-20"
          >
            {theme.icon}
          </motion.div>
          
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 0.9, 1]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 25, ease: 'linear' },
              scale: { repeat: Infinity, duration: 5 }
            }}
            className="absolute -bottom-10 -left-10 text-6xl opacity-20"
          >
            {theme.icon}
          </motion.div>
        </div>

        <div className="relative z-10 p-6 text-white">
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-4xl mb-3"
            >
              {theme.icon}
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-2">
              {isCricketEvent ? activeEvent.name : `${theme.greeting} Special`}
            </h2>
            
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block"
            >
              <Badge 
                variant="secondary" 
                className="bg-yellow-400 text-black text-lg px-4 py-2 font-bold"
              >
                {activeEvent.discount}% OFF
              </Badge>
            </motion.div>
          </div>

          {/* Countdown */}
          <div className="mb-6">
            <CountdownTimer
              config={{
                type: 'festival',
                endTime: isCricketEvent ? activeEvent.endDate : activeEvent.date,
                title: isCricketEvent ? 'Match Special Ends' : 'Festival Begins',
                subtitle: 'Don\'t miss this exclusive offer',
                urgencyText: 'Time remaining:',
                showProgress: true
              }}
              variant="card"
              size="md"
              className="bg-white/10 backdrop-blur-sm border-white/20"
            />
          </div>

          {/* Festival Benefits */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
              <Star className="w-5 h-5 text-yellow-300 flex-shrink-0" />
              <span className="text-sm">
                {isCricketEvent 
                  ? 'Watch live cricket discussions and analysis'
                  : 'Celebrate with family-friendly movies'
                }
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Gift className="w-5 h-5 text-pink-300 flex-shrink-0" />
              <span className="text-sm">
                Exclusive {isCricketEvent ? 'sports' : 'festival'} content collection
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5 text-blue-300 flex-shrink-0" />
              <span className="text-sm">
                Premium quality streaming in 4K HDR
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Heart className="w-5 h-5 text-red-300 flex-shrink-0" />
              <span className="text-sm">
                {isCricketEvent 
                  ? 'Special commentary and behind-the-scenes'
                  : 'Traditional stories and cultural content'
                }
              </span>
            </div>
          </div>

          {/* Special Message */}
          <div className="text-center bg-white/10 rounded-lg p-4">
            <p className="text-sm font-medium mb-1">
              🎉 {isCricketEvent 
                  ? 'Cricket fever is here!' 
                  : `May this ${currentFestival?.name.toLowerCase()} bring joy to your family`
                }
            </p>
            <p className="text-xs text-white/80">
              {isCricketEvent
                ? 'Enjoy matches with premium streaming quality'
                : 'Watch together, celebrate together with our special collection'
              }
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  switch (variant) {
    case 'minimal':
      return renderMinimal();
    case 'banner':
      return renderBanner();
    default:
      return renderCard();
  }
}