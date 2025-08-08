import { NextResponse } from 'next/server'

// Free YouTube movie trailers and clips
const videoDatabase = [
  {
    id: '1',
    title: 'Mahavatar Narsimha - Official Teaser',
    type: 'teaser',
    youtubeId: 'Imdduj0nl8w', // From user's provided link
    url: 'https://www.youtube.com/embed/Imdduj0nl8w',
    thumbnail: 'https://img.youtube.com/vi/Imdduj0nl8w/maxresdefault.jpg',
    duration: '2:30',
    views: '10M+',
    description: 'Official teaser of the epic animated mythological film'
  },
  {
    id: '2',
    title: 'Indian Mythology Animation - Epic Battles',
    type: 'trailer',
    youtubeId: 'k7qNHjDGtWA', // Free mythology content
    url: 'https://www.youtube.com/embed/k7qNHjDGtWA',
    thumbnail: 'https://img.youtube.com/vi/k7qNHjDGtWA/maxresdefault.jpg',
    duration: '3:15',
    views: '25M+',
    description: 'Epic battles from Indian mythology'
  },
  {
    id: '3',
    title: 'Lord Vishnu Avatars - Animated Stories',
    type: 'special',
    youtubeId: 'JtaxUbQdPXA', // Free educational content
    url: 'https://www.youtube.com/embed/JtaxUbQdPXA',
    thumbnail: 'https://img.youtube.com/vi/JtaxUbQdPXA/maxresdefault.jpg',
    duration: '5:45',
    views: '8M+',
    description: 'Learn about the ten avatars of Lord Vishnu'
  },
  {
    id: '4',
    title: 'Narsimha Avatar Story - Animation',
    type: 'educational',
    youtubeId: 'YE4_lvJYFQc', // Free mythology education
    url: 'https://www.youtube.com/embed/YE4_lvJYFQc',
    thumbnail: 'https://img.youtube.com/vi/YE4_lvJYFQc/maxresdefault.jpg',
    duration: '8:20',
    views: '5M+',
    description: 'The complete story of Lord Narsimha avatar'
  },
  {
    id: '5',
    title: 'Prahlada Story - Animated Film',
    type: 'special',
    youtubeId: '1jL8OBijVvA', // Free animated content
    url: 'https://www.youtube.com/embed/1jL8OBijVvA',
    thumbnail: 'https://img.youtube.com/vi/1jL8OBijVvA/maxresdefault.jpg',
    duration: '10:30',
    views: '3M+',
    description: 'The devotion of Prahlada - full animated story'
  }
]

export async function GET() {
  try {
    // Return video data with embedded player URLs
    return NextResponse.json({
      success: true,
      videos: videoDatabase,
      message: 'Videos fetched successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { videoId } = body

    // Find specific video by ID
    const video = videoDatabase.find(v => v.id === videoId)
    
    if (!video) {
      return NextResponse.json(
        { success: false, message: 'Video not found' },
        { status: 404 }
      )
    }

    // Return video with player URL for embedding
    return NextResponse.json({
      success: true,
      video: {
        ...video,
        embedUrl: video.url,
        watchUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
        channelUrl: 'https://www.youtube.com/@MahavatarNarsimha'
      }
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process request' },
      { status: 500 }
    )
  }
}