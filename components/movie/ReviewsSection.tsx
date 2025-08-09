'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

interface Review {
  id: string
  source: string
  rating: number
  headline: string
  review: string
  critic?: string // Made optional for backward compatibility
  userName?: string
  userAvatar?: string
  date?: string
  likes?: number
  verified?: boolean
}

interface Props {
  reviews: Review[]
}

export default function ReviewsSection({ reviews }: Props) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Average Rating</h3>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-5xl font-bold text-orange-600">4.5</span>
          <span className="text-2xl text-gray-600">/5</span>
        </div>
        <div className="flex justify-center mb-2">
          {renderStars(4.5)}
        </div>
        <p className="text-gray-600">Based on 1,234 reviews</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 relative"
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-orange-200" />
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                {renderStars(review.rating)}
                <span className="text-sm text-gray-600">({review.rating}/5)</span>
              </div>
              <h3 className="font-bold text-lg text-gray-800">{review.headline}</h3>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3">{review.review}</p>
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {review.userAvatar && (
                    <img 
                      src={review.userAvatar} 
                      alt={review.userName || review.critic || ''} 
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-800">{review.userName || review.critic}</p>
                    <p className="text-xs text-gray-600">{review.source}</p>
                  </div>
                </div>
                {review.verified && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">✓ Verified</span>
                )}
              </div>
              {review.date && (
                <p className="text-xs text-gray-500 mt-2">{review.date}</p>
              )}
              {review.likes !== undefined && (
                <p className="text-xs text-gray-500 mt-1">👍 {review.likes} helpful</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 mb-4">
          Read what critics and audiences are saying about Mahavatar Narsimha
        </p>
        <button className="text-orange-600 hover:text-orange-700 font-medium">
          View All Reviews →
        </button>
      </div>
    </div>
  )
}