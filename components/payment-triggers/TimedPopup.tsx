'use client'

import { useState, useEffect } from 'react'
import { X, Star, Users, Clock, Gift, Zap } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface TimedPopupProps {
  delay: number // in milliseconds
  onPaymentClick: () => void
}

export default function TimedPopup({ delay, onPaymentClick }: TimedPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes for limited offer
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Check if user previously dismissed this trigger
    const dismissed = localStorage.getItem('timed_popup_dismissed')
    if (dismissed) {
      const dismissTime = new Date(dismissed)
      const now = new Date()
      // Show again after 4 hours
      if (now.getTime() - dismissTime.getTime() < 4 * 60 * 60 * 1000) {
        setIsDismissed(true)
        return
      }
    }

    if (isDismissed) return

    // Show popup after specified delay
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, isDismissed])

  // Countdown timer for urgency
  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1
          // Update progress bar (reverse progress as time decreases)
          setProgress((600 - newTime) / 6) // Convert to percentage
          return newTime
        })
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, timeLeft])

  const handleDismiss = () => {
    localStorage.setItem('timed_popup_dismissed', new Date().toISOString())
    setIsDismissed(true)
    setIsOpen(false)
  }

  const handlePaymentClick = () => {
    onPaymentClick()
    setIsOpen(false)
    // Redirect to payment page
    window.open('/pricing', '_blank')
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isDismissed) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-lg bg-white border-2 border-orange-500 shadow-2xl overflow-hidden">
        <div className="relative">
          {/* Close button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 rounded-full z-10"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Header with animated background */}
          <div className="relative bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 pb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-50 animate-pulse"></div>
            
            <div className="relative text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Gift className="h-6 w-6 text-yellow-300" />
                <h2 className="text-xl font-bold">Special Time-Limited Offer!</h2>
                <Gift className="h-6 w-6 text-yellow-300" />
              </div>
              
              <p className="text-orange-100 text-sm">
                You've been browsing for a while. Here's an exclusive offer just for you!
              </p>
            </div>
          </div>

          <div className="p-6">
            {/* Countdown timer with progress */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="text-center mb-3">
                <Badge className="bg-red-500 text-white px-3 py-1 animate-pulse">
                  <Clock className="h-3 w-3 mr-1" />
                  Expires in {formatTime(timeLeft)}
                </Badge>
              </div>
              
              <Progress value={progress} className="h-2 mb-2" />
              
              <div className="text-center text-sm text-red-600 font-medium">
                ⚡ Don't miss out - offer disappears soon!
              </div>
            </div>

            {/* Movie details card */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-lg text-center mb-2">Mahavatar Narsimha</h3>
              
              <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                  <span>9.4/10 IMDb</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>2.1M+ views</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>HD Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>No Ads</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>5 Languages</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Mobile + Desktop</span>
                </div>
              </div>
            </div>

            {/* Pricing comparison */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 mb-4 border border-green-200">
              <h4 className="font-semibold text-center mb-3 text-gray-800">Exclusive Time-Based Discount</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span>Regular Price:</span>
                  <span className="line-through text-gray-500">₹99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Standard Discount (30%):</span>
                  <span className="line-through text-gray-500">₹69</span>
                </div>
                <div className="flex justify-between items-center text-green-600 font-bold border-t pt-2">
                  <span>Your Time-Limited Price (70% OFF):</span>
                  <span className="text-xl">₹29</span>
                </div>
              </div>
              
              <div className="text-center mt-3 text-sm text-green-700">
                💰 You save ₹70 with this special offer!
              </div>
            </div>

            {/* Social proof */}
            <div className="bg-blue-50 rounded-lg p-3 mb-4">
              <div className="text-center text-sm">
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold text-green-600">8,234</span> users upgraded in the last 24 hours
                </p>
                <div className="flex justify-center items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 text-yellow-400" fill="currentColor" />
                  ))}
                  <span className="text-gray-600 ml-2">4.9/5 user satisfaction</span>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="space-y-3">
              <Button 
                onClick={handlePaymentClick}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 text-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                <Zap className="h-5 w-5 mr-2" />
                <span className="relative">Get 70% OFF - Just ₹29!</span>
              </Button>
              
              <button
                onClick={handleDismiss}
                className="w-full text-sm text-gray-500 hover:text-gray-700 underline py-2"
              >
                Maybe later (continue with ads)
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 text-center">
                <div>🔒 SSL Secure</div>
                <div>💳 All Payment Methods</div>
                <div>⚡ Instant Access</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}