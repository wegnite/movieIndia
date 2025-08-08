import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import newsData from '@/data/news-data.json';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');
    const trending = searchParams.get('trending');
    
    let filteredNews = [...newsData.news];
    
    // Filter by category
    if (category) {
      filteredNews = filteredNews.filter(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by trending
    if (trending === 'true') {
      filteredNews = filteredNews.filter(item => item.trending);
    }
    
    // Sort by date (newest first)
    filteredNews.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Apply limit
    if (limit) {
      filteredNews = filteredNews.slice(0, parseInt(limit));
    }
    
    return NextResponse.json({
      success: true,
      data: {
        news: filteredNews,
        total: filteredNews.length,
        categories: newsData.categories
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news data' },
      { status: 500 }
    );
  }
}