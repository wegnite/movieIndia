'use client'

import { useState } from 'react'
import { Crown, Star, Users, Zap, Play, Gift, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { usePaymentTriggerTracking } from './usePaymentTriggerTracking'

interface ContentSectionCTAProps {
  variant?: 'after-cast' | 'after-reviews' | 'after-news' | 'after-videos' | 'mid-content'
  onPaymentClick?: () => void
}

export default function ContentSectionCTA({ 
  variant = 'mid-content',
  onPaymentClick 
}: ContentSectionCTAProps) {
  const [isDismissed, setIsDismissed] = useState(false)
  const { trackTriggerClick } = usePaymentTriggerTracking()

  const handlePaymentClick = () => {
    trackTriggerClick(`content-cta-${variant}`, { variant })
    if (onPaymentClick) {
      onPaymentClick()
    }
    // Redirect to payment page
    window.open('/pricing', '_blank')
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem(`content_cta_${variant}_dismissed`, new Date().toISOString())
  }

  if (isDismissed) {
    return null
  }

  // Different variants for different content sections
  const variants = {
    'after-cast': {
      title: 'Meet the Cast in HD Quality!',
      subtitle: 'Experience crystal-clear visuals of your favorite characters',
      highlight: 'Perfect Cast Visibility',
      color: 'from-purple-500 to-pink-600',
      icon: Users,
      features: ['HD character details', 'Behind-the-scenes content', 'Cast interviews']
    },
    'after-reviews': {
      title: 'Join 2.1M+ Happy Viewers!',
      subtitle: 'See why everyone is raving about this movie',
      highlight: '4.9/5 User Rating',
      color: 'from-green-500 to-blue-600',
      icon: Star,
      features: ['Ad-free experience', 'User community access', 'Exclusive reviews']
    },
    'after-news': {
      title: 'Get Latest Updates Premium!',
      subtitle: 'Never miss breaking news about Mahavatar universe',
      highlight: 'Exclusive News Access',
      color: 'from-blue-500 to-indigo-600',
      icon: Zap,
      features: ['Breaking news alerts', 'Exclusive interviews', 'Behind-the-scenes news']
    },
    'after-videos': {
      title: 'Watch More Exclusive Content!',
      subtitle: 'Unlock behind-the-scenes and bonus videos',
      highlight: 'Premium Video Library',
      color: 'from-red-500 to-orange-600',
      icon: Play,
      features: ['Bonus scenes', 'Making videos', 'Director commentary']
    },
    'mid-content': {
      title: 'Loving the Content? Go Premium!',
      subtitle: 'Get the complete Mahavatar experience',
      highlight: 'Complete Experience',
      color: 'from-orange-500 to-red-600',
      icon: Crown,
      features: ['Full movie access', 'All languages', 'Zero interruptions']
    }
  }

  const config = variants[variant]
  const IconComponent = config.icon

  return (
    <div className="my-8">
      <Card className="relative overflow-hidden border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r ${config.color} opacity-5`}></div>
        
        <div className="relative p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <IconComponent className="h-6 w-6 text-orange-600" />
              <h3 className="text-xl font-bold text-gray-800">{config.title}</h3>
            </div>
            <p className="text-gray-600">{config.subtitle}</p>
          </div>

          {/* Main content grid */}
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Left side - Benefits */}
            <div className="space-y-4">
              <Badge className={`bg-gradient-to-r ${config.color} text-white px-3 py-1`}>
                ⚡ {config.highlight}
              </Badge>
              
              <div className="space-y-2">
                {config.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>2.1M+ users</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
                    <span>4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Pricing and CTA */}
            <div className="text-center space-y-4">
              {/* Special offer badge */}
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-800 px-3 py-2 rounded-full text-sm font-medium">
                <Gift className="h-4 w-4" />
                <span>Limited Time: 50% OFF</span>
              </div>

              {/* Pricing */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl line-through text-gray-400">₹99</span>
                  <Badge className="bg-red-500 text-white px-2 py-1">50% OFF</Badge>
                </div>
                <div className="text-4xl font-bold text-orange-600">₹49</div>
                <p className="text-sm text-gray-600">One-time payment • Lifetime access</p>
              </div>

              {/* CTA Button */}
              <Button 
                onClick={handlePaymentClick}
                className={`w-full bg-gradient-to-r ${config.color} hover:opacity-90 text-white font-bold py-4 px-6 rounded-lg shadow-lg relative overflow-hidden group`}
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <span>Upgrade Now - ₹49</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Button>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mt-3">
                <span>🔒 Secure</span>
                <span>💳 UPI/Cards</span>
                <span>⚡ Instant</span>
              </div>
            </div>
          </div>

          {/* Bottom testimonial */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-700 italic">
                "Best decision ever! HD quality and no ads made the experience amazing." 
                <span className="font-semibold text-blue-600"> - Rahul K., Mumbai</span>
              </p>
              <div className="flex justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 text-yellow-400" fill="currentColor" />
                ))}
              </div>
            </div>
          </div>

          {/* Dismiss option */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xs"
          >
            ✕
          </button>
        </div>
      </Card>
    </div>
  )
}