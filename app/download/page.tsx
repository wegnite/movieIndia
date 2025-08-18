import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mahavatar Narsimha Download - Watch Online in HD',
  description: 'Stream Mahavatar Narsimha online in HD quality. Legal streaming options available. Watch the full movie in Hindi, Tamil, Telugu with subtitles.',
  keywords: 'mahavatar narsimha download, mahavatar narsimha hd, watch mahavatar narsimha',
}

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-red-950 pt-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Watch Mahavatar Narsimha Online
        </h1>
        
        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 mb-8">
          <p className="text-xl text-gray-300 mb-6">
            Stream Mahavatar Narsimha legally in HD quality. 
            We provide safe and legal streaming options only.
          </p>
          
          <div className="bg-black/50 rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">Legal Streaming Options</h2>
            <p className="text-gray-300 mb-4">
              Watch the full movie online through our verified streaming partners:
            </p>
          </div>
          
          <div className="grid gap-4">
            <Link
              href="/en/movie/mahavatar-narsimha-full-movie"
              className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-lg font-bold hover:from-red-700 hover:to-orange-700 transition-all"
            >
              🎬 Watch Full Movie HD
            </Link>
            
            <Link
              href="/en/watch/mahavatar-narsimha-online"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              📺 Stream Online Now
            </Link>
            
            <Link
              href="/en/watch/narasimha-2025-ott"
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-4 rounded-lg font-bold hover:from-green-700 hover:to-teal-700 transition-all"
            >
              🔔 OTT Release Updates
            </Link>
          </div>
        </div>
        
        <div className="text-gray-400 text-sm">
          <p className="mb-2">✅ 100% Legal Streaming</p>
          <p className="mb-2">✅ HD Quality Available</p>
          <p className="mb-2">✅ Multiple Language Options</p>
          <p>✅ Safe & Secure</p>
        </div>
      </div>
    </main>
  )
}