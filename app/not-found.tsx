import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Mahavatar Narsimha',
  description: 'The page you are looking for does not exist. Watch Mahavatar Narsimha full movie online.',
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-red-950 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          The page you&apos;re looking for doesn&apos;t exist. 
          But you can still watch Mahavatar Narsimha!
        </p>
        
        <div className="space-y-4">
          <Link
            href="/en"
            className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-lg font-bold hover:from-red-700 hover:to-orange-700 transition-all"
          >
            🏠 Go to Homepage
          </Link>
          
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <Link
              href="/en/movie/mahavatar-narsimha-full-movie"
              className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg hover:bg-white/20 transition-all"
            >
              <div className="text-2xl mb-2">🎬</div>
              <div className="font-semibold">Watch Full Movie</div>
            </Link>
            
            <Link
              href="/en/watch/mahavatar-narsimha-online"
              className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg hover:bg-white/20 transition-all"
            >
              <div className="text-2xl mb-2">📺</div>
              <div className="font-semibold">Stream Online</div>
            </Link>
            
            <Link
              href="/en/watch/narasimha-2025-ott"
              className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg hover:bg-white/20 transition-all"
            >
              <div className="text-2xl mb-2">🔔</div>
              <div className="font-semibold">OTT Updates</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}