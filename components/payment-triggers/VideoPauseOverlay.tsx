'use client'

import { useState, useEffect } from 'react'
import { Play, Crown, Zap, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface VideoPauseOverlayProps {
  videoElement: HTMLVideoElement
  onPaymentClick: () => void
}

export default function VideoPauseOverlay({ videoElement, onPaymentClick }: VideoPauseOverlayProps) {
  const [showOverlay, setShowOverlay] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [pauseCount, setPauseCount] = useState(0)

  useEffect(() => {
    // Check if user previously dismissed this trigger
    const dismissed = localStorage.getItem('video_pause_overlay_dismissed')
    if (dismissed) {
      const dismissTime = new Date(dismissed)
      const now = new Date()
      // Show again after 30 minutes
      if (now.getTime() - dismissTime.getTime() < 30 * 60 * 1000) {
        setIsDismissed(true)
        return
      }
    }

    if (!videoElement || isDismissed) return

    const handlePause = () => {
      setPauseCount(prev => {
        const newCount = prev + 1
        
        // Show overlay on 2nd pause or every 3rd pause after that
        if (newCount === 2 || (newCount > 2 && newCount % 3 === 0)) {
          setShowOverlay(true)
          
          // Auto-hide after 8 seconds if user doesn't interact
          setTimeout(() => {
            setShowOverlay(false)
          }, 8000)
        }
        
        return newCount
      })
    }

    const handlePlay = () => {
      setShowOverlay(false)
    }

    videoElement.addEventListener('pause', handlePause)
    videoElement.addEventListener('play', handlePlay)

    return () => {
      videoElement.removeEventListener('pause', handlePause)
      videoElement.removeEventListener('play', handlePlay)
    }
  }, [videoElement, isDismissed])

  const handleDismiss = () => {
    localStorage.setItem('video_pause_overlay_dismissed', new Date().toISOString())
    setIsDismissed(true)
    setShowOverlay(false)
  }

  const handlePaymentClick = () => {
    onPaymentClick()
    setShowOverlay(false)
    // Redirect to payment page
    window.open('/pricing', '_blank')
  }

  const handleContinueWatching = () => {
    setShowOverlay(false)
    if (videoElement && videoElement.paused) {
      videoElement.play()
    }
  }

  if (!showOverlay || isDismissed) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-up">
        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 rounded-full"
          onClick={handleDismiss}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Crown className="h-8 w-8 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-800">Enjoying the Movie?</h2>
          </div>
          
          <p className="text-gray-600">
            Upgrade to Premium and watch without any interruptions
          </p>
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 text-center">Premium Benefits</h3>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-700">Zero ads throughout the movie</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-700">Ultra HD quality (1080p)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-700">All 5 language versions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm text-gray-700">Watch on any device</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg line-through text-gray-400">₹99</span>
            <Badge className="bg-red-500 text-white px-2 py-1">50% OFF</Badge>
          </div>
          <div className="text-3xl font-bold text-orange-600">₹49</div>
          <p className="text-sm text-gray-600 mt-1">One-time payment • Lifetime access</p>
        </div>

        {/* Social proof */}
        <div className="bg-gray-50 rounded-lg p-3 mb-6 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-green-600">2.1M+</span> viewers have upgraded
          </p>
          <div className="flex justify-center mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-sm">★</span>
            ))}
            <span className="text-sm text-gray-600 ml-2">4.9/5 satisfaction</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <Button 
            onClick={handlePaymentClick}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 relative overflow-hidden"
          >
            <Zap className="h-4 w-4 mr-2" />
            <span>Upgrade Now - ₹49</span>
          </Button>
          
          <Button 
            onClick={handleContinueWatching}
            variant="outline" 
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Play className="h-4 w-4 mr-2" />
            Continue Watching (with ads)
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span>🔒 100% Secure</span>
            <span>💳 UPI/Cards</span>
            <span>📱 Instant Access</span>
          </div>
        </div>
      </div>
    </div>
  )
}