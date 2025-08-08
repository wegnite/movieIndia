import { NextResponse } from 'next/server';
import movieData from '@/data/movie-static-data.json';
import newsData from '@/data/news-data.json';
import boxOfficeData from '@/data/box-office-data.json';
import { scrapeIMDbData, getIMDbRating } from '@/lib/scrapers/imdb-scraper';
import { getYouTubeTrailers } from '@/lib/scrapers/youtube-scraper';
import { getSocialMediaStats, getTrendingHashtags, getSentimentAnalysis } from '@/lib/scrapers/social-media-scraper';
import { aggregateNews, getTrendingNews } from '@/lib/scrapers/news-aggregator';

export async function GET() {
  try {
    // Fetch all data in parallel for better performance
    const [
      imdbData,
      imdbRating,
      youtubeTrailers,
      socialStats,
      trendingHashtags,
      sentiment,
      latestNews,
      trendingNewsItems
    ] = await Promise.all([
      scrapeIMDbData('tt28507139'),
      getIMDbRating('tt28507139'),
      getYouTubeTrailers('Mahavatar Narsimha'),
      getSocialMediaStats(),
      getTrendingHashtags(),
      getSentimentAnalysis(),
      aggregateNews(10),
      getTrendingNews()
    ]);
    
    // Combine all data into a comprehensive response
    const responseData = {
      movie: {
        ...movieData,
        imdb: {
          ...imdbData,
          currentRating: imdbRating
        }
      },
      media: {
        trailers: youtubeTrailers,
        gallery: {
          posters: [
            { id: 1, url: '/images/posters/poster1.jpg', title: 'Official Poster' },
            { id: 2, url: '/images/posters/poster2.jpg', title: 'Character Poster - Narasimha' },
            { id: 3, url: '/images/posters/poster3.jpg', title: 'Character Poster - Prahlada' }
          ],
          stills: [
            { id: 1, url: '/images/stills/still1.jpg', title: 'The Divine Transformation' },
            { id: 2, url: '/images/stills/still2.jpg', title: 'Prahlada\'s Devotion' },
            { id: 3, url: '/images/stills/still3.jpg', title: 'The Final Battle' }
          ]
        }
      },
      boxOffice: {
        ...boxOfficeData,
        liveTracking: {
          lastUpdated: new Date().toISOString(),
          ticketsSoldToday: Math.floor(Math.random() * 50000) + 10000,
          collectionsToday: (Math.random() * 2 + 0.5).toFixed(2)
        }
      },
      social: {
        stats: socialStats,
        trending: trendingHashtags,
        sentiment: sentiment,
        buzz: {
          score: 8.7,
          trend: 'rising',
          peakTime: '8:00 PM IST'
        }
      },
      news: {
        latest: latestNews,
        trending: trendingNewsItems,
        categories: newsData.categories,
        total: newsData.news.length
      },
      meta: {
        lastUpdated: new Date().toISOString(),
        dataVersion: '1.0.0',
        apiStatus: 'healthy'
      }
    };
    
    return NextResponse.json({
      success: true,
      data: responseData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching comprehensive data:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch comprehensive data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}