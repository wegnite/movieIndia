'use client'

import { useState } from 'react'
import { Loader2, Crown, Star, Zap, Play, Download, Sparkles } from 'lucide-react'

interface Plan {
  id: string
  name: string
  price: string
  originalPrice?: string
  features: string[]
  popular?: boolean
  icon: React.ReactNode
}

export default function PremiumContentSection() {
  const [loading, setLoading] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [userEmail, setUserEmail] = useState('')
  const [feedback, setFeedback] = useState('')

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic HD',
      price: '₹49',
      originalPrice: '₹99',
      icon: <Play className="w-6 h-6" />,
      features: [
        'HD Quality (720p)',
        'No Ads',
        '1 Device',
        '7 Days Access'
      ]
    },
    {
      id: 'premium',
      name: 'Premium 4K',
      price: '₹99',
      originalPrice: '₹199',
      popular: true,
      icon: <Crown className="w-6 h-6" />,
      features: [
        '4K Ultra HD Quality',
        'No Ads + Bonus Content',
        '3 Devices',
        '30 Days Access',
        'Download for Offline'
      ]
    },
    {
      id: 'lifetime',
      name: 'Lifetime Pass',
      price: '₹299',
      originalPrice: '₹599',
      icon: <Sparkles className="w-6 h-6" />,
      features: [
        '4K + Behind Scenes',
        'No Ads Forever',
        'Unlimited Devices',
        'Lifetime Access',
        'Early Access to Sequels',
        'Exclusive Merchandise'
      ]
    }
  ]

  const handlePaymentIntent = async (plan: Plan) => {
    setLoading(plan.id)
    setSelectedPlan(plan)

    try {
      await fetch('/api/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: plan.name,
          amount: plan.price,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          userEmail: ''
        })
      })

      setTimeout(() => {
        setLoading(null)
        setShowFeedback(true)
      }, 1500)
    } catch (error) {
      console.error('Error tracking payment intent:', error)
      setLoading(null)
      setShowFeedback(true)
    }
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await fetch('/api/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: selectedPlan?.name,
          amount: selectedPlan?.price,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
          userEmail: userEmail,
          feedback: feedback
        })
      })

      alert(`Thank you for your interest! We've noted your request for ${selectedPlan?.name} plan. We'll notify you at ${userEmail || '310842705@qq.com'} when premium access is available.`)
      
      setShowFeedback(false)
      setUserEmail('')
      setFeedback('')
      setSelectedPlan(null)
    } catch (error) {
      console.error('Error submitting feedback:', error)
    }
  }

  if (showFeedback) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900 via-indigo-900 to-black">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              🎬 Almost There!
            </h2>
            <p className="text-gray-200 mb-6">
              Premium access is coming soon! Leave your email to be the first to know when {selectedPlan?.name} plan is available.
            </p>
            
            <form onSubmit={handleFeedbackSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2">Your Email (Optional)</label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:border-orange-400"
                />
              </div>
              
              <div>
                <label className="block text-white mb-2">Any feedback? (Optional)</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us what you're most excited about..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:outline-none focus:border-orange-400"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-bold hover:from-orange-600 hover:to-red-700 transition-all"
                >
                  Notify Me When Available
                </button>
                <button
                  type="button"
                  onClick={() => setShowFeedback(false)}
                  className="px-6 py-3 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
            
            <p className="text-xs text-gray-400 mt-4 text-center">
              Contact: 310842705@qq.com for any questions
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-900 via-indigo-900 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Zap className="w-4 h-4" />
            LIMITED TIME OFFER - 50% OFF
          </div>
          
          <h2 className="text-5xl font-bold text-white mb-4">
            🎬 Get Premium Access
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Watch Mahavatar Narsimha in stunning 4K quality with no ads. Download and watch offline on any device!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gradient-to-b ${
                plan.popular 
                  ? 'from-orange-600/20 to-red-600/20 border-2 border-orange-500' 
                  : 'from-white/10 to-white/5 border border-white/20'
              } backdrop-blur-lg rounded-3xl p-8 hover:scale-105 transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Star className="w-4 h-4" /> MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl ${
                  plan.popular ? 'bg-orange-500' : 'bg-white/20'
                }`}>
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">{plan.originalPrice}</span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mt-1">One-time payment</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-200">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handlePaymentIntent(plan)}
                disabled={loading === plan.id}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700'
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading === plan.id ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Get {plan.name} Now
                    {plan.popular && ' 🔥'}
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-8 border border-yellow-500/30">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">
                🎁 Special Bundle Offer
              </h3>
              <p className="text-gray-300">
                Get all Mahavatar Universe movies (6 upcoming films) with lifetime access at 70% discount!
              </p>
            </div>
            <button
              onClick={() => handlePaymentIntent({
                id: 'bundle',
                name: 'Universe Bundle',
                price: '₹999',
                originalPrice: '₹2999',
                icon: <Sparkles />,
                features: []
              })}
              className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black px-8 py-4 rounded-xl font-bold hover:from-yellow-600 hover:to-orange-700 transition-all flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Get Universe Bundle - ₹999
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Secure payment • Instant access • 30-day money-back guarantee
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Questions? Contact: 310842705@qq.com
          </p>
        </div>
      </div>
    </section>
  )
}