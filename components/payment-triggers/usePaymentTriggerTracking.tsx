'use client'

import { useCallback } from 'react'

interface TriggerMetadata {
  page?: string
  section?: string
  [key: string]: any
}

export function usePaymentTriggerTracking() {
  const trackTriggerView = useCallback(async (triggerType: string, metadata: TriggerMetadata = {}) => {
    try {
      // Log to console for debugging
      console.log(`Payment Trigger View: ${triggerType}`, metadata)
      
      // Store in localStorage for analytics
      const viewData = {
        triggerType,
        action: 'view',
        timestamp: new Date().toISOString(),
        metadata,
        userAgent: navigator.userAgent
      }
      
      const existingViews = JSON.parse(localStorage.getItem('payment_trigger_views') || '[]')
      existingViews.push(viewData)
      
      // Keep only last 100 entries
      if (existingViews.length > 100) {
        existingViews.splice(0, existingViews.length - 100)
      }
      
      localStorage.setItem('payment_trigger_views', JSON.stringify(existingViews))

      // Send to analytics API if available
      fetch('/api/payment-intent/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'trigger_view',
          triggerType,
          metadata,
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.warn('Analytics tracking failed:', err))
      
    } catch (error) {
      console.warn('Failed to track trigger view:', error)
    }
  }, [])

  const trackTriggerClick = useCallback(async (triggerType: string, metadata: TriggerMetadata = {}) => {
    try {
      // Log to console for debugging
      console.log(`Payment Trigger Click: ${triggerType}`, metadata)
      
      // Store in localStorage for analytics
      const clickData = {
        triggerType,
        action: 'click',
        timestamp: new Date().toISOString(),
        metadata,
        userAgent: navigator.userAgent
      }
      
      const existingClicks = JSON.parse(localStorage.getItem('payment_trigger_clicks') || '[]')
      existingClicks.push(clickData)
      
      // Keep only last 100 entries
      if (existingClicks.length > 100) {
        existingClicks.splice(0, existingClicks.length - 100)
      }
      
      localStorage.setItem('payment_trigger_clicks', JSON.stringify(existingClicks))

      // Send to analytics API if available
      fetch('/api/payment-intent/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'trigger_click',
          triggerType,
          metadata,
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.warn('Analytics tracking failed:', err))
      
      // Also send to payment intent API for conversion tracking
      fetch('/api/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: `${triggerType}_trigger`,
          amount: '₹49',
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          userEmail: '',
          triggerSource: triggerType,
          metadata
        })
      }).catch(err => console.warn('Payment intent tracking failed:', err))
      
    } catch (error) {
      console.warn('Failed to track trigger click:', error)
    }
  }, [])

  const getTriggerStats = useCallback(() => {
    try {
      const views = JSON.parse(localStorage.getItem('payment_trigger_views') || '[]')
      const clicks = JSON.parse(localStorage.getItem('payment_trigger_clicks') || '[]')
      
      return { views, clicks }
    } catch {
      return { views: [], clicks: [] }
    }
  }, [])

  return {
    trackTriggerView,
    trackTriggerClick,
    getTriggerStats
  }
}