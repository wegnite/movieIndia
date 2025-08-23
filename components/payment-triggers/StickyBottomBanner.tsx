'use client'

import { useState, useEffect } from 'react'
import { X, Clock, Users, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface StickyBottomBannerProps {
  onPaymentClick: () => void
}

export default function StickyBottomBanner({ onPaymentClick }: StickyBottomBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    // Check if user previously dismissed this trigger
    const dismissed = localStorage.getItem('sticky_banner_dismissed')
    if (dismissed) {
      const dismissTime = new Date(dismissed)
      const now = new Date()
      // Show again after 1 hour
      if (now.getTime() - dismissTime.getTime() < 60 * 60 * 1000) {
        setIsDismissed(true)
        return
      }
    }

    // Show banner after user scrolls 50% of the page
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      
      if (scrollPercent > 50 && !isDismissed) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isDismissed])

  // Countdown timer
  useEffect(() => {
    if (isVisible && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, timeLeft])

  const handleDismiss = () => {
    localStorage.setItem('sticky_banner_dismissed', new Date().toISOString())
    setIsDismissed(true)
    setIsVisible(false)
  }

  const handlePaymentClick = () => {
    onPaymentClick()
    // Redirect to payment page
    window.open('/pricing', '_blank')
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m ${secs}s`
  }

  if (!isVisible || isDismissed) {
    return null
  }

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 transform transition-all duration-500 ${
      isMinimized ? 'translate-y-16' : 'translate-y-0'
    }`}>
      {/* Minimized state */}
      {isMinimized && (
        <div 
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-2 cursor-pointer"
          onClick={() => setIsMinimized(false)}
        >
          <div className="container flex items-center justify-center">
            <Badge className="bg-white/20 text-white px-2 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {formatTime(timeLeft)} left
            </Badge>
            <span className="mx-2 text-sm font-medium">Premium Offer: ₹49 only</span>
            <Button size="sm" className="bg-white text-orange-600 hover:bg-gray-100 px-3 py-1 text-xs">
              Get Now
            </Button>
          </div>
        </div>
      )}

      {/* Full banner */}
      {!isMinimized && (
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-2xl border-t-2 border-orange-400">
          {/* Close and minimize buttons */}
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 rounded-full text-white hover:bg-white/20 p-0"
              onClick={() => setIsMinimized(true)}
            >
              <span className="text-xs">−</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 rounded-full text-white hover:bg-white/20 p-0"
              onClick={handleDismiss}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>

          <div className="container py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Left side - Offer details */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-yellow-500 text-yellow-900 px-2 py-1 animate-pulse">
                    LIMITED TIME
                  </Badge>
                  <span className="text-sm font-medium">Special Offer</span>
                </div>
                
                <h3 className="text-lg font-bold mb-1">
                  Watch Mahavatar Narsimha in HD - Just ₹49!
                </h3>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>2.1M+ watching</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Offer ends in {formatTime(timeLeft)}</span>
                  </div>
                </div>
              </div>

              {/* Center - Features */}
              <div className="hidden lg:flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-300" />
                  <span>HD Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">🚫</span>
                  <span>No Ads</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-300">🌍</span>
                  <span>5 Languages</span>
                </div>
              </div>

              {/* Right side - Pricing and CTA */}
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="flex items-center gap-2">
                    <span className="text-lg line-through text-orange-200">₹99</span>
                    <Badge className="bg-red-500 text-white px-2 py-1">50% OFF</Badge>
                  </div>
                  <div className="text-2xl font-bold">₹49</div>
                </div>
                
                <Button 
                  onClick={handlePaymentClick}
                  className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-6 py-3 rounded-lg shadow-lg relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-red-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative">Watch Now</span>
                </Button>
              </div>
            </div>

            {/* Mobile features row */}
            <div className="lg:hidden mt-3 pt-3 border-t border-orange-400/30">
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4 text-yellow-300" />
                  <span>HD Quality</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-300">🚫</span>
                  <span>No Ads</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-300">🌍</span>
                  <span>5 Languages</span>
                </div>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-3 pt-3 border-t border-orange-400/30">
              <div className="flex items-center justify-center gap-6 text-xs text-orange-100">
                <span>🔒 Secure Payment</span>
                <span>💳 UPI/Cards Accepted</span>
                <span>📱 Instant Access</span>
                <span>⚡ 30-day money back</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}