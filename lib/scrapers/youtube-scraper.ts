// YouTube data scraper for trailers and videos
// This would use YouTube Data API in production

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  publishedAt: string;
  channelName: string;
  embedUrl: string;
}

export async function getYouTubeTrailers(movieName: string): Promise<YouTubeVideo[]> {
  // Mock data for Mahavatar Narsimha trailers
  // In production, use YouTube Data API v3
  
  const trailers: YouTubeVideo[] = [
    {
      id: "MN_teaser_2024",
      title: "Mahavatar Narsimha - Official Teaser | Rana Daggubati | April 2025",
      description: "Experience the divine power of Lord Narasimha in this epic animated adventure. Coming to theaters April 2025.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "1:30",
      views: 5234567,
      likes: 234567,
      publishedAt: "2024-11-15",
      channelName: "Harihara Animations",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "MN_trailer_2025",
      title: "Mahavatar Narsimha - Official Trailer | Hindi/Telugu/Tamil | Releasing April 2",
      description: "The most awaited animated epic of 2025. Witness the legend of Lord Narasimha and young Prahlada.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "2:45",
      views: 12567890,
      likes: 567890,
      publishedAt: "2025-01-15",
      channelName: "Dharma Productions",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "MN_character_2025",
      title: "Meet Lord Narasimha - Character Introduction | Mahavatar Narsimha",
      description: "Get an exclusive first look at the divine avatar in stunning animation.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "1:15",
      views: 3890123,
      likes: 189234,
      publishedAt: "2025-02-01",
      channelName: "Harihara Animations",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "MN_music_2025",
      title: "Narasimha Stotram - MM Keeravani | Mahavatar Narsimha | SP Balasubrahmanyam",
      description: "The divine musical journey composed by Oscar winner MM Keeravani.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "5:23",
      views: 7654321,
      likes: 432109,
      publishedAt: "2025-01-20",
      channelName: "T-Series Telugu",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    },
    {
      id: "MN_making_2025",
      title: "Making of Mahavatar Narsimha - Behind the Animation",
      description: "Go behind the scenes of India's biggest animated epic.",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      duration: "10:45",
      views: 2345678,
      likes: 123456,
      publishedAt: "2025-01-25",
      channelName: "Film Companion",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  ];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Add some random view count increases to simulate real-time updates
  return trailers.map(trailer => ({
    ...trailer,
    views: trailer.views + Math.floor(Math.random() * 10000),
    likes: trailer.likes + Math.floor(Math.random() * 1000)
  }));
}

export async function getYouTubeReviews(movieName: string): Promise<YouTubeVideo[]> {
  // Mock review videos
  const reviews: YouTubeVideo[] = [
    {
      id: "MN_review_1",
      title: "Mahavatar Narsimha Review - A Visual Masterpiece | Film Companion",
      description: "Anupama Chopra reviews the epic animated film Mahavatar Narsimha.",
      thumbnail: "https://img.youtube.com/vi/review1/maxresdefault.jpg",
      duration: "8:30",
      views: 1234567,
      likes: 89012,
      publishedAt: "2025-04-03",
      channelName: "Film Companion",
      embedUrl: "https://www.youtube.com/embed/review1"
    },
    {
      id: "MN_review_2",
      title: "Mahavatar Narsimha - Movie Review | Bharadwaj Rangan",
      description: "Detailed analysis of the mythology and animation in Mahavatar Narsimha.",
      thumbnail: "https://img.youtube.com/vi/review2/maxresdefault.jpg",
      duration: "15:20",
      views: 890123,
      likes: 67890,
      publishedAt: "2025-04-04",
      channelName: "Galatta Plus",
      embedUrl: "https://www.youtube.com/embed/review2"
    }
  ];
  
  await new Promise(resolve => setTimeout(resolve, 500));
  return reviews;
}