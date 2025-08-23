'use client'

import { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'

export default function QuickPaymentCTA() {
  const [loading, setLoading] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const handleQuickPayment = async () => {
    setLoading(true)
    
    try {
      await fetch('/api/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: 'Quick Access',
          amount: '₹49',
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          userEmail: ''
        })
      })
      
      setTimeout(() => {
        setLoading(false)
        setShowThankYou(true)
        setTimeout(() => setShowThankYou(false), 5000)
      }, 1500)
    } catch (error) {
      console.error('Error:', error)
      setLoading(false)
    }
  }

  if (showThankYou) {
    return (
      <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-4 border border-green-500/30">
        <p className="text-green-400 text-center font-semibold">
          ✅ Thank you for your interest! We'll notify you soon at 310842705@qq.com
        </p>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm rounded-lg p-4 border border-orange-500/30">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-bold">Remove Ads & Get HD Quality</span>
          </div>
          <p className="text-gray-300 text-sm">
            Watch without interruptions for just ₹49
          </p>
        </div>
        <button
          onClick={handleQuickPayment}
          disabled={loading}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-bold hover:from-orange-600 hover:to-red-700 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Get Instant Access - ₹49
            </>
          )}
        </button>
      </div>
    </div>
  )
}