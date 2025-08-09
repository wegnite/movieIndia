import { NextResponse } from 'next/server'

export async function GET() {
  // Force Google to recognize favicon by returning proper headers
  const headers = {
    'Content-Type': 'image/x-icon',
    'Cache-Control': 'public, max-age=3600',
    'X-Robots-Tag': 'all',
  }
  
  // Redirect to actual favicon with proper headers
  return NextResponse.redirect(
    new URL('/favicon.ico', 'https://mahavatar-narsimha.com'),
    { 
      status: 301,
      headers 
    }
  )
}