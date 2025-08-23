'use client'

import { useRef, useEffect, useState } from 'react'
import { PaymentTriggersManager, ContentSectionCTA } from '@/components/payment-triggers'

// Example of how to integrate payment triggers into a movie page
export default function MoviePageWithTriggers() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      setVideoElement(videoRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Payment Triggers Manager - manages all triggers */}
      <PaymentTriggersManager
        showFloatingButton={true}
        showExitIntent={true}
        showVideoPauseOverlay={true}
        showStickyBanner={true}
        showTimedPopup={true}
        showContentCTAs={true}
        videoElement={videoElement}
        page="movie"
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-xl p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">Mahavatar Narsimha</h1>
            <p className="text-xl mb-6">The Epic Mythological Animated Spectacle</p>
            
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                poster="/images/mahavatar-hero.jpg"
                preload="metadata"
              >
                <source src="/path-to-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* Cast Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Cast & Characters</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold">Ashwin Kumar</h3>
              <p className="text-gray-600">Lord Narsimha (Voice)</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold">Young Voice Artist</h3>
              <p className="text-gray-600">Prahlada (Voice)</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold">Veteran Voice Actor</h3>
              <p className="text-gray-600">Hiranyakashipu (Voice)</p>
            </div>
          </div>
        </section>

        {/* Content CTA after cast */}
        <ContentSectionCTA variant="after-cast" />

        {/* Reviews Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">User Reviews</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <h4 className="font-bold">Rajesh Kumar</h4>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                "A Rare Perfect 10/10 - Completely Melted My Heart. Every frame is a visual treat, 
                and the way they brought the legend of Lord Narasimha to life is beyond anything I imagined."
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <h4 className="font-bold">Priya Sharma</h4>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700">
                "Soul-Stirring Spiritual Experience. This isn't just a film - it's an epic divine experience. 
                The last 30 minutes? Goosebumps!"
              </p>
            </div>
          </div>
        </section>

        {/* Content CTA after reviews */}
        <ContentSectionCTA variant="after-reviews" />

        {/* News Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Latest News</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-lg mb-2">
                Mahavatar Narsimha Becomes Highest-Grossing Indian Animated Film
              </h3>
              <p className="text-gray-600 text-sm mb-2">Times of India • July 29, 2025</p>
              <p className="text-gray-700">
                The film has earned ₹21.95 crore net in its first four days, surpassing 2005's Hanuman...
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="font-bold text-lg mb-2">
                Director Ashwin Kumar: "Indian Animation Can Be World-Class"
              </h3>
              <p className="text-gray-600 text-sm mb-2">India Today • July 26, 2025</p>
              <p className="text-gray-700">
                Kumar emphasizes their goal to challenge the notion that animation is only for children...
              </p>
            </div>
          </div>
        </section>

        {/* Content CTA after news */}
        <ContentSectionCTA variant="after-news" />

        {/* Videos Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">More Videos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="aspect-video bg-gray-200 rounded mb-4"></div>
              <h3 className="font-bold">Making of Mahavatar</h3>
              <p className="text-sm text-gray-600">Behind the scenes</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="aspect-video bg-gray-200 rounded mb-4"></div>
              <h3 className="font-bold">Character Design</h3>
              <p className="text-sm text-gray-600">Animation process</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="aspect-video bg-gray-200 rounded mb-4"></div>
              <h3 className="font-bold">Voice Acting</h3>
              <p className="text-sm text-gray-600">Cast interviews</p>
            </div>
          </div>
        </section>

        {/* Final Content CTA after videos */}
        <ContentSectionCTA variant="after-videos" />

        {/* Footer */}
        <footer className="text-center py-12 text-gray-600">
          <p>Experience the complete movie in HD quality without interruptions</p>
        </footer>
      </div>
    </div>
  )
}