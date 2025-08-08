'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const HeroSection = () => {
  const [particles, setParticles] = useState<Array<{ left: number; animationDelay: number; animationDuration: number }>>([]);
  
  useEffect(() => {
    // Generate random particles on client side only
    const generatedParticles = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      animationDelay: Math.random() * 5,
      animationDuration: 15 + Math.random() * 10,
    }));
    setParticles(generatedParticles);
  }, []);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/heroes/mahavatar-hero-bg.webp"
            alt="Mahavatar Narsimha Epic Scene"
            fill
            priority
            className="object-cover"
            quality={90}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          
          {/* Animated Particles Effect */}
          <div className="absolute inset-0">
            <div className="particle-container">
              {particles.map((particle, i) => (
                <div
                  key={i}
                  className="particle"
                  style={{
                    left: `${particle.left}%`,
                    animationDelay: `${particle.animationDelay}s`,
                    animationDuration: `${particle.animationDuration}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto animate-slide-up">
          {/* Epic Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 backdrop-blur-sm border border-gold-500/30 rounded-full mb-6">
            <span className="w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
            <span className="text-gold-400 text-sm font-medium uppercase tracking-wider">Coming 2025</span>
          </div>

          {/* Main Title */}
          <h1 className="hero-title mb-6">
            <span className="block text-6xl md:text-7xl lg:text-8xl font-display text-gold-400 mb-2">
              MAHAVATAR
            </span>
            <span className="block text-5xl md:text-6xl lg:text-7xl font-display text-red-500">
              NARSIMHA
            </span>
          </h1>

          {/* Tagline */}
          <p className="hero-subtitle text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 font-light">
            The Divine Warrior Awakens
          </p>

          {/* Description */}
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Experience the legendary tale of Lord Narsimha in stunning animation. 
            A divine epic that transcends time, bringing ancient mythology to life 
            with breathtaking visuals and powerful storytelling.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-primary group flex items-center gap-2 px-8 py-4 text-lg">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>Watch Trailer</span>
            </button>
            
            <button className="btn-secondary px-8 py-4 text-lg">
              Learn More
            </button>
          </div>

          {/* Release Info */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-gold-400 text-sm uppercase tracking-wider mb-1">Director</div>
              <div className="text-white text-lg font-medium">Ashwin Kumar</div>
            </div>
            <div className="text-center">
              <div className="text-gold-400 text-sm uppercase tracking-wider mb-1">Studio</div>
              <div className="text-white text-lg font-medium">Bomma Borusa</div>
            </div>
            <div className="text-center">
              <div className="text-gold-400 text-sm uppercase tracking-wider mb-1">Release</div>
              <div className="text-white text-lg font-medium">March 2025</div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .particle-container {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(212, 175, 55, 0.6);
          border-radius: 50%;
          animation: float-up linear infinite;
        }
        
        @keyframes float-up {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) scale(1);
            opacity: 0;
          }
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #D4AF37 0%, #C41E3A 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4);
        }
        
        .btn-secondary {
          background: transparent;
          color: #D4AF37;
          padding: 1rem 2rem;
          border-radius: 0.5rem;
          font-weight: 600;
          border: 2px solid #D4AF37;
          transition: all 0.3s ease;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .btn-secondary:hover {
          background: #D4AF37;
          color: #111827;
        }
        
        .font-display {
          font-family: 'Cinzel', serif;
          font-weight: 700;
          letter-spacing: 0.025em;
        }
        
        .text-gold-400 { color: #D4AF37; }
        .text-gold-500 { color: #B8941F; }
        .bg-gold-500 { background-color: #B8941F; }
        .text-red-500 { color: #C41E3A; }
        
        @media (max-width: 768px) {
          .hero-title span:first-child {
            font-size: 3rem;
          }
          .hero-title span:last-child {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  )
}

export default HeroSection