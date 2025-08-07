'use client'

import { motion } from 'framer-motion'
import { Calendar, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NewsItem {
  id: string
  title: string
  source: string
  date: string
  excerpt: string
  url: string
}

interface Props {
  news: NewsItem[]
}

export default function NewsSection({ news }: Props) {
  return (
    <div className="space-y-4">
      {news.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-orange-600 transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">{item.source}</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{item.excerpt}</p>
          <Button variant="outline" size="sm" className="text-orange-600 border-orange-600 hover:bg-orange-50">
            <ExternalLink className="w-4 h-4 mr-2" />
            Read More
          </Button>
        </motion.article>
      ))}
      
      <div className="text-center mt-8">
        <Button className="bg-orange-600 hover:bg-orange-700">
          View All News & Updates
        </Button>
      </div>
    </div>
  )
}