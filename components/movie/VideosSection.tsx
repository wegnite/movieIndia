'use client'

import { motion } from 'framer-motion'
import { Play, Eye } from 'lucide-react'

interface Video {
  id: string
  title: string
  type: string
  url: string
  thumbnail?: string
  duration: string
  views: string
}

interface Props {
  videos: Video[]
}

export default function VideosSection({ videos }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="relative aspect-video bg-gradient-to-br from-orange-300 to-red-300">
            {video.thumbnail && (
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 text-orange-600 fill-orange-600" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
              {video.duration}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg text-gray-800 mb-2">{video.title}</h3>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded">
                {video.type}
              </span>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{video.views} views</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="md:col-span-2 text-center mt-4"
      >
        <p className="text-gray-600 mb-4">
          Watch the official Mahavatar Narsimha teaser and exclusive behind-the-scenes content
        </p>
        <a
          href="https://youtube.com/results?search_query=mahavatar+narsimha"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
        >
          <Play className="w-5 h-5" />
          View All Videos on YouTube
        </a>
      </motion.div>
    </div>
  )
}