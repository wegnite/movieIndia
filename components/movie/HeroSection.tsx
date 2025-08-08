'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Play, Calendar, Star, Award, Film, Clock } from 'lucide-react'
import { movieData } from '@/data/movie-data'
import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [particles, setParticles] = useState<Array<{ left: number; top: number; duration: number; delay: number }>>([]);
  
  useEffect(() => {
    // Generate random particles on client side only
    const generatedParticles = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(generatedParticles);
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Epic Mythological Background */}
      <div className="absolute inset-0">
        {/* Gradient Background inspired by divine colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-red-900"></div>
        
        {/* Animated Divine Light Rays */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            background: `
              radial-gradient(ellipse at top left, rgba(251, 191, 36, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at top right, rgba(239, 68, 68, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse at bottom, rgba(251, 146, 60, 0.4) 0%, transparent 50%)
            `
          }}></div>
        </div>

        {/* Animated Mandala Pattern */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <pattern id="mandala" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="20" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="25" cy="25" r="15" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="25" cy="25" r="10" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="25" cy="25" r="5" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="200" height="200" fill="url(#mandala)" />
          </svg>
        </motion.div>

        {/* Floating Particles Effect */}
        <div className="absolute inset-0">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Movie Logo/Title with Divine Glow */}
          <motion.div
            animate={{ 
              textShadow: [
                "0 0 20px rgba(251, 191, 36, 0.5)",
                "0 0 40px rgba(251, 191, 36, 0.8)",
                "0 0 20px rgba(251, 191, 36, 0.5)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-4 font-display">
              <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                MAHAVATAR
              </span>
              <br />
              <span className="text-7xl md:text-9xl bg-gradient-to-r from-orange-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                NARSIMHA
              </span>
            </h1>
          </motion.div>
          
          {/* Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-amber-100 mb-6 font-medium tracking-wider"
          >
            {movieData.tagline}
          </motion.p>

          {/* Epic Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-base md:text-lg text-amber-50/80 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            The First Chapter of the Mahavatar Cinematic Universe
          </motion.p>

          {/* Key Info Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-10"
          >
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/30">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-white font-bold">{movieData.imdbRating}</span>
              <span className="text-amber-200 text-sm">IMDb</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/30">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-amber-100 text-sm font-medium">{movieData.boxOfficeStatus}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/30">
              <Film className="w-5 h-5 text-amber-400" />
              <span className="text-amber-100 text-sm">{movieData.format}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/30">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="text-amber-100 text-sm">{movieData.duration}</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold px-8 py-6 text-lg shadow-lg hover:shadow-amber-500/25 transition-all duration-300"
            >
              <Play className="w-6 h-6 mr-2" />
              Watch Trailer
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-amber-400 text-amber-100 hover:bg-amber-400/20 font-bold px-8 py-6 text-lg backdrop-blur-sm"
            >
              <Calendar className="w-6 h-6 mr-2" />
              Book Tickets Now
            </Button>
          </motion.div>

          {/* Release Info Cards */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 backdrop-blur-md rounded-xl p-4 border border-amber-500/30">
              <h3 className="text-amber-400 font-semibold text-sm mb-1">THEATRICAL RELEASE</h3>
              <p className="text-white font-bold text-lg">July 25, 2025</p>
            </div>
            <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 backdrop-blur-md rounded-xl p-4 border border-amber-500/30">
              <h3 className="text-amber-400 font-semibold text-sm mb-1">OTT STREAMING</h3>
              <p className="text-white font-bold text-lg">Sept 25, 2025</p>
            </div>
            <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 backdrop-blur-md rounded-xl p-4 border border-amber-500/30">
              <h3 className="text-amber-400 font-semibold text-sm mb-1">LANGUAGES</h3>
              <p className="text-white font-bold text-lg">5 Languages</p>
            </div>
            <div className="bg-gradient-to-br from-amber-900/50 to-orange-900/50 backdrop-blur-md rounded-xl p-4 border border-amber-500/30">
              <h3 className="text-amber-400 font-semibold text-sm mb-1">PRODUCTION</h3>
              <p className="text-white font-bold text-lg">4.5 Years</p>
            </div>
          </motion.div>

          {/* Franchise Announcement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12 p-6 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-md rounded-2xl border border-purple-500/30 max-w-2xl mx-auto"
          >
            <p className="text-purple-300 font-semibold mb-2">MAHAVATAR CINEMATIC UNIVERSE</p>
            <p className="text-purple-100 text-sm">
              Beginning of an epic 7-film franchise chronicling the divine avatars of Lord Vishnu
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-amber-400/50 rounded-full flex justify-center">
            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-3 bg-amber-400 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}