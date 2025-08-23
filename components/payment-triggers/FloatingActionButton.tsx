'use client'

import { useState, useEffect } from 'react'
import { Sparkles, X, Play, Zap, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

interface FloatingActionButtonProps {
  onPaymentClick: () => void
}

export default function FloatingActionButton({ onPaymentClick }: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [pulse, setPulse] = useState(true)

  useEffect(() => {
    // Check if user previously dismissed this trigger
    const dismissed = localStorage.getItem('fab_dismissed')
    if (dismissed) {
      const dismissTime = new Date(dismissed)
      const now = new Date()
      // Show again after 24 hours
      if (now.getTime() - dismissTime.getTime() < 24 * 60 * 60 * 1000) {
        setIsDismissed(true)
        return
      }
    }

    // Auto-expand after 3 seconds
    const expandTimer = setTimeout(() => {
      setIsExpanded(true)
      setPulse(false)
    }, 3000)

    // Auto-collapse after showing for 10 seconds
    const collapseTimer = setTimeout(() => {
      setIsExpanded(false)
    }, 13000)

    return () => {
      clearTimeout(expandTimer)
      clearTimeout(collapseTimer)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('fab_dismissed', new Date().toISOString())
    setIsDismissed(true)
  }

  const handlePaymentClick = () => {
    onPaymentClick()
    // Redirect to payment page or show payment modal
    window.open('/pricing', '_blank')
  }

  if (isDismissed) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Card */}
      {isExpanded && (
        <Card className="absolute bottom-16 right-0 w-80 p-4 bg-gradient-to-r from-orange-600 to-red-600 border-orange-500 shadow-2xl animate-slide-up">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full text-white hover:bg-white/20"
              onClick={handleDismiss}
            >
              <X className="h-3 w-3" />
            </Button>
            
            <div className="text-white">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-yellow-300" />
                <h3 className="font-bold text-lg">Premium Access</h3>
                <Badge className="bg-yellow-500 text-yellow-900 px-2 py-0">50% OFF</Badge>
              </div>
              
              <p className="text-sm text-orange-100 mb-3">
                🎬 Watch Mahavatar Narsimha in HD quality without ads
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-yellow-300" />
                  <span>Instant HD streaming</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Play className="h-4 w-4 text-yellow-300" />
                  <span>All language versions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-yellow-300" />
                  <span>Ad-free experience</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="line-through text-orange-200">₹99</span>
                  <span className="text-2xl font-bold ml-2">₹49</span>
                </div>
                <Button 
                  onClick={handlePaymentClick}
                  className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-4 py-2"
                >
                  Watch Now
                </Button>
              </div>
              
              <p className="text-xs text-orange-200 mt-2 text-center">
                ⏰ Limited time offer - 2.1M+ viewers watching
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          relative h-14 w-14 rounded-full bg-gradient-to-r from-orange-500 to-red-600 
          hover:from-orange-600 hover:to-red-700 shadow-lg hover:shadow-xl 
          transition-all duration-300 group
          ${pulse ? 'animate-pulse' : ''}
        `}
      >
        {/* Pulse ring animation */}
        <div className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-75"></div>
        
        {/* Main icon */}
        <div className="relative">
          {isExpanded ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <div className="flex flex-col items-center">
              <Play className="h-5 w-5 text-white mb-0.5" fill="white" />
              <span className="text-xs text-white font-bold">HD</span>
            </div>
          )}
        </div>
        
        {/* Floating badge */}
        <div className="absolute -top-1 -right-1 bg-yellow-500 text-yellow-900 rounded-full px-1.5 py-0.5 text-xs font-bold">
          ₹49
        </div>
        
        {/* Viewer count badge */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-green-500 text-white rounded-full px-2 py-0.5 text-xs font-bold whitespace-nowrap">
          2.1M+
        </div>
      </Button>
    </div>
  )
}