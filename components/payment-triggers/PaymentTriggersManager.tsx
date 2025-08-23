'use client'

import { useEffect, useState } from 'react'
import FloatingActionButton from './FloatingActionButton'
import ExitIntentPopup from './ExitIntentPopup'
import VideoPauseOverlay from './VideoPauseOverlay'
import StickyBottomBanner from './StickyBottomBanner'
import TimedPopup from './TimedPopup'
import ContentSectionCTA from './ContentSectionCTA'
import { usePaymentTriggerTracking } from './usePaymentTriggerTracking'

interface PaymentTriggersManagerProps {
  showFloatingButton?: boolean
  showExitIntent?: boolean
  showVideoPauseOverlay?: boolean
  showStickyBanner?: boolean
  showTimedPopup?: boolean
  showContentCTAs?: boolean
  videoElement?: HTMLVideoElement | null
  page?: 'home' | 'movie' | 'pricing' | 'watch'
}

export default function PaymentTriggersManager({
  showFloatingButton = true,
  showExitIntent = true,
  showVideoPauseOverlay = false,
  showStickyBanner = true,
  showTimedPopup = true,
  showContentCTAs = true,
  videoElement = null,
  page = 'movie'
}: PaymentTriggersManagerProps) {
  const [scrolled, setScrolled] = useState(false)
  const [showManager, setShowManager] = useState(false)
  const { trackTriggerView, trackTriggerClick } = usePaymentTriggerTracking()

  useEffect(() => {
    // Initialize after component mount
    setShowManager(true)

    const handleScroll = () => {
      const isScrolled = window.scrollY > 200
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track initial page view
  useEffect(() => {
    if (showManager) {
      // Track which triggers are shown on this page
      const visibleTriggers = []
      if (showFloatingButton) visibleTriggers.push('floating-button')
      if (showExitIntent) visibleTriggers.push('exit-intent')
      if (showVideoPauseOverlay) visibleTriggers.push('video-pause')
      if (showStickyBanner) visibleTriggers.push('sticky-banner')
      if (showTimedPopup) visibleTriggers.push('timed-popup')
      if (showContentCTAs) visibleTriggers.push('content-ctas')
      
      visibleTriggers.forEach(trigger => {
        trackTriggerView(trigger, { page })
      })
    }
  }, [showManager, page, trackTriggerView])

  if (!showManager) {
    return null
  }

  return (
    <>
      {/* Floating Action Button - shows after scrolling */}
      {showFloatingButton && scrolled && (
        <FloatingActionButton 
          onPaymentClick={() => trackTriggerClick('floating-button', { page })}
        />
      )}

      {/* Exit Intent Popup */}
      {showExitIntent && (
        <ExitIntentPopup 
          onPaymentClick={() => trackTriggerClick('exit-intent', { page })}
        />
      )}

      {/* Video Pause Overlay */}
      {showVideoPauseOverlay && videoElement && (
        <VideoPauseOverlay 
          videoElement={videoElement}
          onPaymentClick={() => trackTriggerClick('video-pause', { page })}
        />
      )}

      {/* Sticky Bottom Banner */}
      {showStickyBanner && (
        <StickyBottomBanner 
          onPaymentClick={() => trackTriggerClick('sticky-banner', { page })}
        />
      )}

      {/* Timed Popup - shows after 30 seconds */}
      {showTimedPopup && (
        <TimedPopup 
          delay={30000} // 30 seconds
          onPaymentClick={() => trackTriggerClick('timed-popup', { page })}
        />
      )}

      {/* Content Section CTAs - rendered separately in content */}
      {showContentCTAs && (
        <div className="hidden">
          {/* This is a placeholder - actual CTAs are rendered in content sections */}
        </div>
      )}
    </>
  )
}