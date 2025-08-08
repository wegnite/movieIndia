import { NextResponse } from 'next/server';
import boxOfficeData from '@/data/box-office-data.json';

export async function GET() {
  try {
    // Simulate real-time updates with random variations
    const data = { ...boxOfficeData };
    
    // Add some random variation to advance booking numbers (simulate real-time)
    if (data.advanceBooking.stats.ticketsSold) {
      const randomIncrease = Math.floor(Math.random() * 1000) + 500;
      data.advanceBooking.stats.ticketsSold += randomIncrease;
      data.advanceBooking.stats.grossCollection += randomIncrease * 0.00003;
    }
    
    return NextResponse.json({
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch box office data' },
      { status: 500 }
    );
  }
}