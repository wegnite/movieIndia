'use client'

import { useState, useEffect } from 'react'
import { Play, ExternalLink, Star, Clock, Globe } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface VideoPlayerProps {
  videoUrl: string
  title?: string
  poster?: string
}

export default function VideoPlayer({ videoUrl, title = "Mahavatar Narsimha Full Movie", poster }: VideoPlayerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [pulseAnimation, setPulseAnimation] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setPulseAnimation(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const handlePlayClick = () => {
    // Open video link in new window
    window.open(videoUrl, '_blank', 'width=1280,height=720,menubar=no,toolbar=no,location=no,status=no')
  }

  return (
    <Card 
      className="bg-black/90 backdrop-blur-lg border-purple-500 overflow-hidden shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
        {/* Background poster image */}
        {poster && (
          <Image 
            src={poster} 
            alt={title || '电影海报'}
            fill
            className={`object-cover transition-opacity duration-300 ${isHovered ? 'opacity-40' : 'opacity-30'}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
          />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Main content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
          {/* Top badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <Badge className="bg-red-600 text-white px-3 py-1">
              <Star className="w-4 h-4 mr-1" />
              HD Quality
            </Badge>
            <Badge className="bg-green-600 text-white px-3 py-1">
              Full Movie Available
            </Badge>
          </div>
          
          {/* Center play button */}
          <div className="relative">
            <div className={`absolute inset-0 bg-white/20 rounded-full blur-xl ${pulseAnimation ? 'animate-pulse' : ''}`} />
            <Button
              onClick={handlePlayClick}
              className="relative group bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white rounded-full p-8 transition-all transform hover:scale-110 shadow-2xl"
              aria-label="Play movie in new window"
            >
              <Play className="w-16 h-16 ml-2" fill="white" />
            </Button>
          </div>
          
          {/* Title and description */}
          <h3 className="text-4xl font-bold text-white mt-8 mb-4 text-center drop-shadow-lg">
            {title}
          </h3>
          
          <p className="text-xl text-gray-200 mb-6 text-center max-w-2xl">
           Click the play button to watch the full movie in a new window.
          </p>
          
          {/* Movie info */}
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-5 h-5" />
              <span>2h 10min</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Globe className="w-5 h-5" />
              <span>5 Languages</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>IMDb 9.3/10</span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handlePlayClick}
              size="lg"
              className="bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 transition-all"
            >
              <ExternalLink className="mr-2 w-5 h-5" />
              Watch in New Window
            </Button>
          </div>
        </div>
        
        {/* Bottom gradient info bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">
              Click to open movie player in a new window
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500">
                Hindi
              </Badge>
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500">
                Tamil
              </Badge>
              <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500">
                Telugu
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}