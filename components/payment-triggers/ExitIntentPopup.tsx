'use client'

import { useState, useEffect } from 'react'
import { X, AlertTriangle, Clock, Users, Star, Gift } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface ExitIntentPopupProps {
  onPaymentClick: () => void
}

export default function ExitIntentPopup({ onPaymentClick }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  useEffect(() => {
    // Check if user previously dismissed this trigger
    const dismissed = localStorage.getItem('exit_intent_dismissed')
    if (dismissed) {
      const dismissTime = new Date(dismissed)
      const now = new Date()
      // Show again after 2 hours
      if (now.getTime() - dismissTime.getTime() < 2 * 60 * 60 * 1000) {
        setIsDismissed(true)
        return
      }
    }

    let exitIntentDetected = false

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect exit intent - mouse leaving from top of the page
      if (e.clientY <= 0 && !exitIntentDetected && !isDismissed) {
        exitIntentDetected = true
        setIsOpen(true)
      }
    }

    // Also trigger on mobile with back button attempt (history change)
    const handlePopState = () => {
      if (!exitIntentDetected && !isDismissed) {
        exitIntentDetected = true
        setIsOpen(true)
        // Prevent actual back navigation temporarily
        window.history.pushState(null, '', window.location.href)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('popstate', handlePopState)
    
    // Push a state for mobile back button detection
    window.history.pushState(null, '', window.location.href)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [isDismissed])

  // Countdown timer for urgency
  useEffect(() => {
    if (isOpen && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, timeLeft])

  const handleDismiss = () => {
    localStorage.setItem('exit_intent_dismissed', new Date().toISOString())
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
      <DialogContent className="max-w-md bg-white border-2 border-orange-500 shadow-2xl">
        <div className="relative p-6">
          {/* Close button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Header with urgency indicator */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-800">Wait! Don't Leave</h2>
            </div>
            
            <Badge className="bg-red-500 text-white px-3 py-1 animate-pulse">
              <Clock className="h-3 w-3 mr-1" />
              Offer expires in {formatTime(timeLeft)}
            </Badge>
          </div>

          {/* Movie poster and title */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="relative w-12 h-16 flex-shrink-0">
              <Image
                src="/images/mahavatar-hero.jpg"
                alt="Mahavatar Narsimha"
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">Mahavatar Narsimha</h3>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Star className="h-3 w-3 text-yellow-500" fill="currentColor" />
                <span>9.4/10 IMDb</span>
                <span>•</span>
                <span>HD Quality</span>
              </div>
            </div>
          </div>

          {/* Special offer details */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg mb-4 border border-orange-200">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-5 w-5 text-orange-600" />
              <h3 className="font-bold text-orange-800">Exclusive Exit Offer</h3>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Original Price:</span>
                <span className="line-through text-gray-500">₹99</span>
              </div>
              <div className="flex justify-between">
                <span>Exit Offer (60% OFF):</span>
                <span className="font-bold text-green-600">₹39</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">You Save:</span>
                <span className="font-bold text-orange-600">₹60</span>
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>2.1M+ viewers</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>4.8/5 rating</span>
            </div>
          </div>

          {/* What they get */}
          <div className="mb-4">
            <p className="text-sm text-gray-700 font-medium mb-2">This exclusive offer includes:</p>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>✓ Full HD streaming (1080p)</li>
              <li>✓ All 5 language versions</li>
              <li>✓ Zero advertisements</li>
              <li>✓ Mobile & desktop access</li>
              <li>✓ Instant streaming</li>
            </ul>
          </div>

          {/* Call to action buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handlePaymentClick}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              <span className="relative">Get 60% OFF - Just ₹39</span>
            </Button>
            
            <button
              onClick={handleDismiss}
              className="w-full text-sm text-gray-500 hover:text-gray-700 underline"
            >
              No thanks, I'll pay full price later
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <span>🔒 Secure Payment</span>
              <span>💳 All Cards Accepted</span>
              <span>📱 UPI Available</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}