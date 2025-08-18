import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mahavatar Narsimha BookMyShow - Book Movie Tickets Online',
  description: 'Book Mahavatar Narsimha movie tickets on BookMyShow. Check showtimes, theaters near you, and book tickets for 2D/3D shows in Hindi, Tamil, Telugu.',
  keywords: 'mahavatar narsimha bookmyshow, book tickets mahavatar narsimha, narsimha movie tickets, mahavatar narsimha showtimes',
}

export default function BookMyShowPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-red-950 to-black pt-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Book Mahavatar Narsimha Tickets
        </h1>
        
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <p className="text-xl text-gray-300 mb-6">
            Mahavatar Narsimha is currently showing in theaters across India.
            Book your tickets through BookMyShow or watch online below.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <a
              href="https://in.bookmyshow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg font-bold transition-all"
            >
              📍 Book Theater Tickets
            </a>
            
            <Link
              href="/en/movie/mahavatar-narsimha-full-movie"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-lg font-bold transition-all"
            >
              🎬 Watch Online Now
            </Link>
          </div>
          
          <div className="text-gray-400 text-sm">
            <p className="mb-2">🎭 Available in: Hindi, Tamil, Telugu, Kannada, Malayalam</p>
            <p>📺 Formats: 2D, 3D, IMAX (select locations)</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/en/watch/mahavatar-narsimha-online" 
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all">
            <div className="font-bold">Stream Online</div>
            <div className="text-sm">HD Quality</div>
          </Link>
          
          <Link href="/en/watch/narasimha-2025-ott" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
            <div className="font-bold">OTT Release</div>
            <div className="text-sm">Coming Soon</div>
          </Link>
          
          <Link href="/en" 
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all">
            <div className="font-bold">Movie Info</div>
            <div className="text-sm">Cast & Details</div>
          </Link>
        </div>
      </div>
    </main>
  )
}