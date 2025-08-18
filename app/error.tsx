'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-purple-950 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-purple-600 mb-4">500</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Something went wrong!
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          We encountered an error while loading this page. 
          Please try again or return to the homepage.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={reset}
            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all mr-4"
          >
            🔄 Try Again
          </button>
          
          <Link
            href="/en"
            className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-lg font-bold hover:from-red-700 hover:to-orange-700 transition-all"
          >
            🏠 Go to Homepage
          </Link>
        </div>
        
        <div className="mt-12 p-6 bg-white/5 rounded-lg">
          <p className="text-gray-400 text-sm mb-4">While we fix this, you can still:</p>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/en/movie/mahavatar-narsimha-full-movie"
              className="bg-white/10 text-white p-3 rounded hover:bg-white/20 transition-all"
            >
              Watch Full Movie
            </Link>
            
            <Link
              href="/en/watch/mahavatar-narsimha-online"
              className="bg-white/10 text-white p-3 rounded hover:bg-white/20 transition-all"
            >
              Stream Online
            </Link>
            
            <Link
              href="/en/movie/narasimha-2025"
              className="bg-white/10 text-white p-3 rounded hover:bg-white/20 transition-all"
            >
              Movie Info
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}