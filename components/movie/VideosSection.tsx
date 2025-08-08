'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Play, Eye, Clock, Film, Star, TrendingUp, X, ExternalLink } from 'lucide-react'
import { useState } from 'react'

interface Video {
  id: string
  title: string
  type: string
  url: string
  youtubeId?: string
  thumbnail?: string
  duration: string
  views: string
}

interface Props {
  videos: Video[]
}

export default function VideosSection({ videos }: Props) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const getVideoTypeIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'trailer': return <Film className="w-4 h-4" />
      case 'teaser': return <Star className="w-4 h-4" />
      case 'behind-scenes': return <Eye className="w-4 h-4" />
      case 'educational': return <Eye className="w-4 h-4" />
      default: return <Play className="w-4 h-4" />
    }
  }

  const getVideoTypeBgColor = (type: string) => {
    switch(type.toLowerCase()) {
      case 'trailer': return 'bg-gradient-to-r from-red-500 to-orange-500'
      case 'teaser': return 'bg-gradient-to-r from-amber-500 to-yellow-500'
      case 'behind-scenes': return 'bg-gradient-to-r from-purple-500 to-indigo-500'
      case 'educational': return 'bg-gradient-to-r from-green-500 to-teal-500'
      default: return 'bg-gradient-to-r from-blue-500 to-cyan-500'
    }
  }

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video)
    setIsPlaying(true)
  }

  const closeModal = () => {
    setSelectedVideo(null)
    setIsPlaying(false)
  }

  return (
    <>
      <div className="relative">
        {/* Enhanced Section Header with Pulsing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                🎬 Watch Trailers & Videos
              </span>
            </h2>
          </motion.div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-red-500 rounded-full"
            />
            <p className="text-white text-lg max-w-2xl mx-auto font-medium">
              Click to watch exclusive trailers, teasers, and behind-the-scenes content
            </p>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              className="w-2 h-2 bg-orange-500 rounded-full"
            />
          </div>
          <div className="flex justify-center gap-4">
            <span className="bg-red-600/20 border border-red-500/50 text-red-300 px-4 py-1 rounded-full text-sm font-semibold">
              🔥 HOT: New Trailer Released
            </span>
            <span className="bg-yellow-600/20 border border-yellow-500/50 text-yellow-300 px-4 py-1 rounded-full text-sm font-semibold">
              ⭐ Must Watch
            </span>
          </div>
        </motion.div>

        {/* Featured Video - First video as main feature */}
        {videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl group cursor-pointer transform hover:scale-[1.02] transition-transform duration-300"
              onClick={() => handleVideoClick(videos[0])}
            >
              <motion.div
                animate={{ boxShadow: ["0 0 0 0 rgba(239, 68, 68, 0)", "0 0 0 10px rgba(239, 68, 68, 0.3)", "0 0 0 0 rgba(239, 68, 68, 0)"] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl"
              />
              <div className="aspect-video bg-gradient-to-br from-orange-900 to-red-900">
                {videos[0].thumbnail ? (
                  <img 
                    src={videos[0].thumbnail} 
                    alt={videos[0].title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Film className="w-32 h-32 text-white/20" />
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:bg-black/40 transition-all duration-300">
                  {/* Enhanced Play Button with Pulse */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute w-32 h-32 bg-white/20 rounded-full"
                    />
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative bg-gradient-to-r from-red-500 to-orange-500 rounded-full p-6 shadow-2xl group-hover:from-red-600 group-hover:to-orange-600 transition-all duration-300"
                    >
                      <Play className="w-12 h-12 text-white fill-white" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -bottom-8 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                    >
                      ▶ PLAY NOW
                    </motion.div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`${getVideoTypeBgColor(videos[0].type)} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1`}>
                        {getVideoTypeIcon(videos[0].type)}
                        {videos[0].type.toUpperCase()}
                      </span>
                      <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {videos[0].duration}
                      </span>
                      <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {videos[0].views}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-2xl">{videos[0].title}</h3>
                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-white font-bold text-lg"
                      >
                        ▶
                      </motion.span>
                      <p className="text-white font-semibold text-lg">Click to Watch Full Trailer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Video Grid - Rest of the videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(1).map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => handleVideoClick(video)}
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300">
                  {video.thumbnail ? (
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-red-100">
                      <Film className="w-16 h-16 text-orange-400/50" />
                    </div>
                  )}
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      className="bg-white/90 rounded-full p-3 group-hover:bg-white transition-all duration-300"
                    >
                      <Play className="w-6 h-6 text-orange-600 fill-orange-600" />
                    </motion.div>
                  </div>
                  
                  {/* Duration Badge */}
                  <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-medium">
                    {video.duration}
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`${getVideoTypeBgColor(video.type)} text-white px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1`}>
                      {getVideoTypeIcon(video.type)}
                      {video.type}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{video.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced YouTube Channel CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 backdrop-blur-md rounded-2xl p-8 border border-red-500/50">
            <h3 className="text-2xl font-bold text-white mb-4">
              Watch More on YouTube
            </h3>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Subscribe to our official YouTube channel for more exclusive content, interviews, and updates about Mahavatar Narsimha
            </p>
            <a
              href="https://youtube.com/results?search_query=mahavatar+narsimha"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-colors"
            >
              <Play className="w-5 h-5" />
              Visit YouTube Channel
            </a>
          </div>
        </motion.div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {isPlaying && selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="relative w-full max-w-6xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Video Container */}
              <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
                <div className="aspect-video">
                  <iframe
                    src={`${selectedVideo.url}?autoplay=1&rel=0&modestbranding=1`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                
                {/* Video Info Bar */}
                <div className="bg-gradient-to-r from-gray-900 to-black p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-1">{selectedVideo.title}</h3>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {selectedVideo.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {selectedVideo.duration}
                        </span>
                      </div>
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId || ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 text-center">
                <p className="text-gray-400 text-sm">
                  Press ESC or click outside to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}