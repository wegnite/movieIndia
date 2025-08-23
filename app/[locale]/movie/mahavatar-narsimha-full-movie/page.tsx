import { Metadata } from 'next'
import VideoPlayer from '@/components/movie/VideoPlayer'
import Link from 'next/link'
import { PaymentTriggersManager } from '@/components/payment-triggers'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return {
    title: 'Mahavatar Narsimha Full Movie HD Watch Online FREE | 2025 Complete Film',
    description: '🎬 Watch Mahavatar Narsimha FULL MOVIE online FREE in HD quality. Complete 2h 10min film. Available in Hindi, Tamil, Telugu with subtitles. No registration required!',
    keywords: 'mahavatar narsimha full movie, mahavatar narsimha complete movie, mahavatar narsimha full film, mahavatar narsimha 2025 full movie, watch mahavatar narsimha full movie online',
    openGraph: {
      title: 'Mahavatar Narsimha Full Movie - Watch Complete Film Online',
      description: 'Stream the complete Mahavatar Narsimha movie in HD quality. Full 2h 10min animated epic.',
      images: ['/images/mahavatar-hero.jpg'],
      type: 'video.movie',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL || 'https://mahavatar-narsimha.com'}/${locale}/movie/mahavatar-narsimha-full-movie`,
    },
  };
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Movie',
  name: 'Mahavatar Narsimha Full Movie',
  datePublished: '2025-03-21',
  duration: 'PT2H10M',
  genre: ['Animation', 'Mythology', 'Adventure'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '9.3',
    reviewCount: '2456',
    bestRating: '10',
  },
  description: 'Complete full movie of Mahavatar Narsimha - The epic animated tale of Lord Narsimha',
  potentialAction: {
    '@type': 'WatchAction',
    target: 'https://mahavatar-narsimha.com/movie/mahavatar-narsimha-full-movie'
  }
}

export default async function FullMoviePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main className="min-h-screen bg-gradient-to-b from-black via-red-950 to-orange-950">
        {/* Hero Section with Full Movie */}
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Mahavatar Narsimha
                <span className="block text-3xl md:text-4xl text-orange-400 mt-2">
                  FULL MOVIE • HD Quality
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Watch the complete 2h 10min epic animated adventure
              </p>
              
              {/* Movie Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="bg-red-600 text-white px-4 py-2 rounded-full">
                  ⭐ IMDb 9.3/10
                </span>
                <span className="bg-orange-600 text-white px-4 py-2 rounded-full">
                  ⏱️ Duration: 2h 10min
                </span>
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full">
                  🎭 5 Languages
                </span>
                <span className="bg-green-600 text-white px-4 py-2 rounded-full">
                  📺 HD/4K Available
                </span>
              </div>
            </div>

            {/* Main Video Player */}
            <div className="max-w-6xl mx-auto mb-12">
              <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-4">
                <VideoPlayer 
                  videoUrl="https://reelreviewhub.com/en/movie/1383072"
                  title="Mahavatar Narsimha Full Movie HD"
                  poster="/images/mahavatar-hero.svg"
                />
                <div className="mt-4 p-4 bg-red-900/30 rounded-lg">
                  <p className="text-sm text-gray-300 text-center">
                    🎬 Primary Player • Full Movie • HD Quality • All Languages Available
                  </p>
                </div>
              </div>
            </div>

            {/* Alternative Players Section */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Alternative Players & Quality Options
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href={`/${locale}/watch/mahavatar-narsimha-online`}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-center"
                >
                  <div className="text-2xl mb-2">📺</div>
                  <div className="font-bold">Player 2</div>
                  <div className="text-sm mt-1">HD • Fast Loading</div>
                </Link>
                
                <Link
                  href={`/${locale}/watch/mahavatar-narsimha-watch-online`}
                  className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all text-center"
                >
                  <div className="text-2xl mb-2">🎥</div>
                  <div className="font-bold">Player 3</div>
                  <div className="text-sm mt-1">4K • Premium</div>
                </Link>
                
                <Link
                  href={`/${locale}/watch/mahavatar-narsimha-free`}
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all text-center"
                >
                  <div className="text-2xl mb-2">🎬</div>
                  <div className="font-bold">Player 4</div>
                  <div className="text-sm mt-1">Mobile Optimized</div>
                </Link>
              </div>
            </div>

            {/* Google AdSense */}
            <div className="mb-8">
              <ins className="adsbygoogle"
                   style={{ display: 'block' }}
                   data-ad-client="ca-pub-6224617757558738"
                   data-ad-format="auto"
                   data-full-width-responsive="true"></ins>
              <script dangerouslySetInnerHTML={{ __html: '(adsbygoogle = window.adsbygoogle || []).push({});' }} />
            </div>

            {/* Language & Subtitle Options */}
            <div className="bg-gradient-to-r from-purple-900/50 to-red-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Available Languages & Subtitles
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {['Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam'].map((lang) => (
                  <div key={lang} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all cursor-pointer">
                    <div className="text-white font-semibold">{lang}</div>
                    <div className="text-gray-300 text-sm mt-1">Audio + Subs</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Movie Information */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">About This Movie</h3>
                <p className="text-gray-300 mb-4">
                  Mahavatar Narsimha is a groundbreaking animated epic that brings to life the legendary tale of Lord Narsimha, 
                  the fourth avatar of Lord Vishnu. This full-length feature film showcases the timeless story of good versus evil, 
                  devotion, and divine intervention.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li>📅 Release Date: March 21, 2025</li>
                  <li>🎬 Director: Ashwin Kumar</li>
                  <li>⏱️ Runtime: 2 hours 10 minutes</li>
                  <li>🎭 Genre: Animation, Mythology, Adventure</li>
                  <li>💰 Budget: ₹100+ Crores</li>
                </ul>
              </div>
              
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-white mb-4">Why Watch Here?</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Full movie available - Complete 2h 10min version</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>HD & 4K quality options for best viewing experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>All 5 language versions with subtitles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>No registration or sign-up required</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Mobile-friendly player with adaptive streaming</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Multiple backup players for uninterrupted viewing</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Related Content */}
            <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                More Ways to Watch
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Link href={`/${locale}/movie/narasimha-2025`} 
                      className="bg-black/50 rounded-lg p-4 hover:bg-black/70 transition-all">
                  <h4 className="text-white font-bold mb-2">Narasimha 2025 Version</h4>
                  <p className="text-gray-400 text-sm">Alternative title search</p>
                </Link>
                
                <Link href={`/${locale}/watch/mahavatar-narsimha-ott`} 
                      className="bg-black/50 rounded-lg p-4 hover:bg-black/70 transition-all">
                  <h4 className="text-white font-bold mb-2">OTT Platform Release</h4>
                  <p className="text-gray-400 text-sm">Coming September 2025</p>
                </Link>
                
                <Link href={`/${locale}`} 
                      className="bg-black/50 rounded-lg p-4 hover:bg-black/70 transition-all">
                  <h4 className="text-white font-bold mb-2">Movie Homepage</h4>
                  <p className="text-gray-400 text-sm">Cast, reviews & more info</p>
                </Link>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Is this the complete full movie?</h3>
                  <p className="text-gray-300">Yes, this is the complete 2 hour 10 minute theatrical version of Mahavatar Narsimha.</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">What quality options are available?</h3>
                  <p className="text-gray-300">We offer 480p, 720p HD, 1080p Full HD, and 4K Ultra HD quality options based on your internet speed.</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Are subtitles available?</h3>
                  <p className="text-gray-300">Yes, English subtitles are available for all language versions of the movie.</p>
                </div>
                
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Can I watch on mobile?</h3>
                  <p className="text-gray-300">Absolutely! Our player is fully optimized for mobile devices with adaptive streaming.</p>
                </div>
              </div>
            </div>

            {/* Google AdSense Bottom */}
            <div className="mt-12">
              <ins className="adsbygoogle"
                   style={{ display: 'block' }}
                   data-ad-client="ca-pub-6224617757558738"
                   data-ad-format="auto"
                   data-full-width-responsive="true"></ins>
              <script dangerouslySetInnerHTML={{ __html: '(adsbygoogle = window.adsbygoogle || []).push({});' }} />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}