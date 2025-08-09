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
      case 'movie': return <Film className="w-4 h-4" />
      case 'trailer': return <Film className="w-4 h-4" />
      case 'teaser': return <Star className="w-4 h-4" />
      case 'behind-scenes': return <Eye className="w-4 h-4" />
      case 'educational': return <Eye className="w-4 h-4" />
      default: return <Play className="w-4 h-4" />
    }
  }

  const getVideoTypeBgColor = (type: string) => {
    switch(type.toLowerCase()) {
      case 'movie': return 'bg-gradient-to-r from-red-600 to-red-700'
      case 'trailer': return 'bg-gradient-to-r from-red-500 to-orange-500'
      case 'teaser': return 'bg-gradient-to-r from-amber-500 to-yellow-500'
      case 'behind-scenes': return 'bg-gradient-to-r from-purple-500 to-indigo-500'
      case 'educational': return 'bg-gradient-to-r from-green-500 to-teal-500'
      default: return 'bg-gradient-to-r from-blue-500 to-cyan-500'
    }
  }
  
  const getVideoTypeLabel = (type: string) => {
    switch(type.toLowerCase()) {
      case 'movie': return 'FULL MOVIE'
      case 'trailer': return 'FULL MOVIE'
      case 'teaser': return 'FULL MOVIE'
      default: return type.toUpperCase()
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
                🎬 Watch Full Movie Online
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
              Click to watch Mahavatar Narsimha complete movie in HD quality
            </p>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              className="w-2 h-2 bg-orange-500 rounded-full"
            />
          </div>
          <div className="flex justify-center gap-4">
            <span className="bg-red-600/20 border border-red-500/50 text-red-300 px-4 py-1 rounded-full text-sm font-semibold">
              🔥 HOT: Watch Full Movie Now
            </span>
            <span className="bg-yellow-600/20 border border-yellow-500/50 text-yellow-300 px-4 py-1 rounded-full text-sm font-semibold">
              ⭐ HD Quality Available
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
                        {getVideoTypeLabel(videos[0].type)}
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
                      <p className="text-white font-semibold text-lg">Click to Watch Full Movie</p>
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
                      {getVideoTypeLabel(video.type)}
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

        {/* More Videos Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl p-8 border border-red-500/30">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  🎬 More Epic Content
                </h3>
                <p className="text-gray-400">
                  Discover more Mahavatar Narsimha content and related videos
                </p>
              </div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
              >
                ⭐
              </motion.div>
            </div>

            {/* Video Recommendations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Recommendation 1 */}
              <a
                href="https://youtube.com/results?search_query=mahavatar+narsimha+behind+scenes"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-red-900/50 to-orange-900/50 rounded-xl p-4 border border-red-500/20 hover:border-red-500/50 transition-all hover:scale-105"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-red-600/20 p-2 rounded-lg">
                    <Film className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1 group-hover:text-red-400 transition-colors">
                      Behind The Scenes
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Making of Mahavatar • VFX Breakdown
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">15 videos</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">3.5M views</span>
                    </div>
                  </div>
                </div>
              </a>

              {/* Recommendation 2 */}
              <a
                href="https://youtube.com/results?search_query=mahavatar+narsimha+interviews"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-xl p-4 border border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-105"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-purple-600/20 p-2 rounded-lg">
                    <Star className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                      Cast Interviews
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Exclusive talks with voice actors
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">8 videos</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">1.2M views</span>
                    </div>
                  </div>
                </div>
              </a>

              {/* Recommendation 3 */}
              <a
                href="https://youtube.com/results?search_query=mahavatar+narsimha+mythology"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-amber-900/50 to-yellow-900/50 rounded-xl p-4 border border-amber-500/20 hover:border-amber-500/50 transition-all hover:scale-105"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-amber-600/20 p-2 rounded-lg">
                    <Eye className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1 group-hover:text-amber-400 transition-colors">
                      Mythology Explained
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Story of Lord Vishnu's Avatars
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">12 videos</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">5.8M views</span>
                    </div>
                  </div>
                </div>
              </a>

              {/* Recommendation 4 */}
              <a
                href="https://youtube.com/results?search_query=mahavatar+narsimha+reaction"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-green-900/50 to-teal-900/50 rounded-xl p-4 border border-green-500/20 hover:border-green-500/50 transition-all hover:scale-105"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-green-600/20 p-2 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1 group-hover:text-green-400 transition-colors">
                      Fan Reactions
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Global audience reactions
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">50+ videos</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">10M views</span>
                    </div>
                  </div>
                </div>
              </a>

              {/* Recommendation 5 */}
              <a
                href="https://youtube.com/results?search_query=mahavatar+cinematic+universe"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-blue-900/50 to-cyan-900/50 rounded-xl p-4 border border-blue-500/20 hover:border-blue-500/50 transition-all hover:scale-105"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-600/20 p-2 rounded-lg">
                    <Film className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                      Mahavatar Universe
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Upcoming films & franchise news
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">20 videos</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">2.3M views</span>
                    </div>
                  </div>
                </div>
              </a>

              {/* Recommendation 6 */}
              <a
                href="https://youtube.com/results?search_query=mahavatar+narsimha+songs"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-pink-900/50 to-rose-900/50 rounded-xl p-4 border border-pink-500/20 hover:border-pink-500/50 transition-all hover:scale-105"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-pink-600/20 p-2 rounded-lg">
                    <Play className="w-6 h-6 text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold mb-1 group-hover:text-pink-400 transition-colors">
                      Soundtrack & Songs
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Official music & BGM
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">18 videos</span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs text-gray-500">8.5M views</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Subscribe Button */}
            <div className="flex justify-center">
              <a
                href="https://youtube.com/@MahavatarNarsimha"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
              >
                <Play className="w-6 h-6" />
                <span>Subscribe to Official Channel</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  2.5M Subscribers
                </span>
              </a>
            </div>
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