import { NextResponse } from 'next/server';
import movieData from '@/data/movie-static-data.json';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: movieData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch movie data' },
      { status: 500 }
    );
  }
}