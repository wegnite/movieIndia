import { NextResponse } from 'next/server';

// Simulated real-time data updates
// In production, this would connect to real data sources, websockets, or streaming APIs

export async function GET() {
  try {
    const realtimeData = {
      boxOffice: {
        currentCollection: (Math.random() * 5 + 10).toFixed(2),
        ticketsSold: Math.floor(Math.random() * 100000) + 400000,
        occupancy: {
          morning: Math.floor(Math.random() * 30) + 40,
          afternoon: Math.floor(Math.random() * 30) + 50,
          evening: Math.floor(Math.random() * 20) + 70,
          night: Math.floor(Math.random() * 20) + 75
        },
        topCities: [
          { city: 'Mumbai', collection: (Math.random() + 1.5).toFixed(2) },
          { city: 'Hyderabad', collection: (Math.random() + 1.3).toFixed(2) },
          { city: 'Bangalore', collection: (Math.random() + 1.2).toFixed(2) },
          { city: 'Delhi', collection: (Math.random() + 1.1).toFixed(2) },
          { city: 'Chennai', collection: (Math.random() + 1.0).toFixed(2) }
        ]
      },
      social: {
        twitterMentions: Math.floor(Math.random() * 10000) + 50000,
        instagramPosts: Math.floor(Math.random() * 5000) + 25000,
        youtubeViews: Math.floor(Math.random() * 100000) + 12000000,
        trendingRank: Math.floor(Math.random() * 5) + 1,
        sentimentScore: (Math.random() * 2 + 7.5).toFixed(1)
      },
      bookings: {
        lastHour: Math.floor(Math.random() * 5000) + 10000,
        last24Hours: Math.floor(Math.random() * 50000) + 100000,
        upcomingShows: {
          today: Math.floor(Math.random() * 500) + 3000,
          tomorrow: Math.floor(Math.random() * 500) + 3200,
          weekend: Math.floor(Math.random() * 1000) + 7000
        },
        fastFillingShows: [
          { theater: 'PVR Phoenix', city: 'Mumbai', time: '6:30 PM', filling: 92 },
          { theater: 'INOX Forum', city: 'Bangalore', time: '9:00 PM', filling: 88 },
          { theater: 'Cinepolis VIP', city: 'Delhi', time: '7:00 PM', filling: 85 },
          { theater: 'AGS Cinemas', city: 'Chennai', time: '10:00 PM', filling: 83 },
          { theater: 'Prasads IMAX', city: 'Hyderabad', time: '3:00 PM', filling: 95 }
        ]
      },
      buzz: {
        mediaArticles: Math.floor(Math.random() * 10) + 40,
        blogPosts: Math.floor(Math.random() * 20) + 80,
        videoReviews: Math.floor(Math.random() * 5) + 15,
        podcasts: Math.floor(Math.random() * 3) + 8,
        influencerPosts: Math.floor(Math.random() * 15) + 50
      },
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json({
      success: true,
      data: realtimeData,
      nextUpdate: new Date(Date.now() + 60000).toISOString() // Update every minute
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch real-time data' },
      { status: 500 }
    );
  }
}