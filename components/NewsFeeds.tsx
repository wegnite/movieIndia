'use client'

import React from 'react'
import Image from 'next/image'

interface NewsItem {
  id: string
  title: string
  source: string
  date: string
  url: string
  thumbnail?: string
}

const NewsFeeds = () => {
  // Mock data for demonstration - will be replaced with actual crawled data
  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'Mahavatar Narsimha: First Look Revealed at Animation Summit',
      source: 'Animation Magazine',
      date: '2025-08-06',
      url: '#'
    },
    {
      id: '2',
      title: 'Director Ashwin Kumar Discusses the Epic Vision Behind Mahavatar Narsimha',
      source: 'Variety India',
      date: '2025-08-05',
      url: '#'
    },
    {
      id: '3',
      title: 'Bomma Borusa Studios Announces March 2025 Release Date',
      source: 'The Hindu',
      date: '2025-08-04',
      url: '#'
    },
    {
      id: '4',
      title: 'Music Composer Revealed for Mahavatar Narsimha Soundtrack',
      source: 'Film Companion',
      date: '2025-08-03',
      url: '#'
    },
    {
      id: '5',
      title: 'Voice Cast Announcement Creates Buzz on Social Media',
      source: 'Times of India',
      date: '2025-08-02',
      url: '#'
    }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display text-gold-400 mb-4">
            Latest News
          </h2>
          <p className="text-gray-400 text-lg">
            Stay updated with the latest developments
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {newsItems.map((news, index) => (
            <article 
              key={news.id}
              className={`news-card group ${index === 0 ? 'md:col-span-2' : ''}`}
            >
              <a 
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-gray-800/50 backdrop-blur-sm border border-gold-500/20 rounded-lg hover:border-gold-500/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className={`${index === 0 ? 'text-xl md:text-2xl' : 'text-lg'} font-semibold text-white group-hover:text-gold-400 transition-colors line-clamp-2`}>
                      {news.title}
                    </h3>
                  </div>
                  <svg className="w-5 h-5 text-gold-400 ml-3 flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                
                <div className="flex items-center text-sm text-gray-400">
                  <span className="font-medium text-gold-400/80">{news.source}</span>
                  <span className="mx-2">•</span>
                  <time dateTime={news.date}>{formatDate(news.date)}</time>
                </div>
              </a>
            </article>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-2 px-6 py-3 text-gold-400 border border-gold-400/50 rounded-lg hover:bg-gold-400/10 transition-colors">
            <span>View All News</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .font-display {
          font-family: 'Cinzel', serif;
        }
        
        .text-gold-400 {
          color: #D4AF37;
        }
        
        .border-gold-500\/20 {
          border-color: rgba(212, 175, 55, 0.2);
        }
        
        .border-gold-500\/40 {
          border-color: rgba(212, 175, 55, 0.4);
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        
        @media (max-width: 768px) {
          .news-card h3 {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  )
}

export default NewsFeeds