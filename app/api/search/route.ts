import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import movieData from '@/data/movie-static-data.json';
import newsData from '@/data/news-data.json';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all';
    
    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Search query is required' },
        { status: 400 }
      );
    }
    
    const searchTerm = query.toLowerCase();
    const results: any = {
      query: query,
      type: type,
      results: []
    };
    
    // Search in movie data
    if (type === 'all' || type === 'movie') {
      // Search in cast
      const matchingCast = movieData.cast.voiceActors.filter(actor =>
        actor.name.toLowerCase().includes(searchTerm) ||
        actor.role.toLowerCase().includes(searchTerm)
      );
      
      // Search in characters
      const matchingCharacters = movieData.characters.filter(char =>
        char.name.toLowerCase().includes(searchTerm) ||
        char.description.toLowerCase().includes(searchTerm)
      );
      
      // Search in soundtrack
      const matchingSongs = movieData.soundtrack.filter(song =>
        song.title.toLowerCase().includes(searchTerm) ||
        song.singer.toLowerCase().includes(searchTerm)
      );
      
      if (matchingCast.length > 0) {
        results.results.push({
          category: 'Cast',
          items: matchingCast.map(actor => ({
            type: 'cast',
            title: actor.name,
            subtitle: actor.role,
            description: actor.bio,
            image: actor.image
          }))
        });
      }
      
      if (matchingCharacters.length > 0) {
        results.results.push({
          category: 'Characters',
          items: matchingCharacters.map(char => ({
            type: 'character',
            title: char.name,
            subtitle: char.traits.join(', '),
            description: char.description,
            image: char.image
          }))
        });
      }
      
      if (matchingSongs.length > 0) {
        results.results.push({
          category: 'Soundtrack',
          items: matchingSongs.map(song => ({
            type: 'song',
            title: song.title,
            subtitle: `${song.singer} • ${song.duration}`,
            description: song.type
          }))
        });
      }
    }
    
    // Search in news
    if (type === 'all' || type === 'news') {
      const matchingNews = newsData.news.filter(item =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.excerpt.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
      
      if (matchingNews.length > 0) {
        results.results.push({
          category: 'News',
          items: matchingNews.slice(0, 10).map(news => ({
            type: 'news',
            title: news.title,
            subtitle: `${news.source} • ${news.date}`,
            description: news.excerpt,
            url: `/news/${news.slug}`,
            image: news.image
          }))
        });
      }
    }
    
    // Add quick suggestions based on common searches
    if (results.results.length === 0) {
      results.suggestions = [
        'Rana Daggubati',
        'Narasimha',
        'Prahlada',
        'MM Keeravani',
        'Box Office',
        'Trailer',
        'Release Date'
      ];
    }
    
    return NextResponse.json({
      success: true,
      data: results,
      count: results.results.reduce((acc: number, cat: any) => acc + cat.items.length, 0),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Search failed' },
      { status: 500 }
    );
  }
}