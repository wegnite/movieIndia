import { Metadata } from 'next'
import VideoPlayer from '@/components/movie/VideoPlayer'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return {
    title: 'Narasimha Movie 2025 Watch Online FREE | Narsimha Full Movie HD',
    description: '🎬 Watch Narasimha 2025 full movie online FREE. Stream Narsimha movie in HD quality. Available on OTT platforms. Hindi, Tamil, Telugu versions with subtitles.',
    keywords: 'narasimha movie 2025, narsimha 2025, narasimha 2025 watch online, narsimha movie 2025 online, narasimha 2025 full movie, narsimha 2025 ott',
    openGraph: {
      title: 'Narasimha 2025 - Epic Animated Movie',
      description: 'Watch Narasimha 2025 movie online. The legendary tale of Lord Narasimha in stunning animation.',
      images: ['/images/mahavatar-hero.jpg'],
      type: 'video.movie',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL || 'https://mahavatar-narsimha.com'}/${locale}/movie/narasimha-2025`,
    },
  };
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Movie',
  name: 'Narasimha 2025',
  alternateName: 'Mahavatar Narsimha',
  datePublished: '2025-03-21',
  genre: ['Animation', 'Mythology', 'Adventure'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '9.3',
    reviewCount: '1789',
    bestRating: '10',
  },
  description: 'Narasimha 2025 - The epic animated tale of Lord Narasimha, also known as Mahavatar Narsimha',
}

export default async function Narasimha2025Page({
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
      
      <main className="min-h-screen bg-gradient-to-b from-orange-950 via-red-950 to-black">
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Narasimha 2025
                <span className="block text-3xl md:text-4xl text-orange-400 mt-2">
                  Narsimha Movie • Watch Online FREE
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                The epic animated adventure of Lord Narasimha - Also known as Mahavatar Narsimha
              </p>
              
              {/* Movie Info Pills */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="bg-red-600/80 text-white px-4 py-2 rounded-full text-sm">
                  🎬 Release: March 2025
                </span>
                <span className="bg-orange-600/80 text-white px-4 py-2 rounded-full text-sm">
                  ⭐ IMDb 9.3/10
                </span>
                <span className="bg-yellow-600/80 text-white px-4 py-2 rounded-full text-sm">
                  🎭 5 Languages
                </span>
                <span className="bg-green-600/80 text-white px-4 py-2 rounded-full text-sm">
                  📺 OTT: Sept 2025
                </span>
              </div>
            </div>

            {/* Main Video Section */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">
                  Watch Narsimha 2025 Full Movie
                </h2>
                <VideoPlayer 
                  videoUrl="https://reelreviewhub.com/en/movie/1383072"
                  title="Narasimha 2025 Full Movie"
                  poster="/images/mahavatar-hero.svg"
                />
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">HD Available</span>
                  <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">Subtitles</span>
                  <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm">Multi-Audio</span>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="bg-gradient-to-r from-red-900/50 to-orange-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Watch Narasimha 2025 - All Options
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Link href={`/${locale}/movie/mahavatar-narsimha-full-movie`}
                      className="bg-black/50 hover:bg-black/70 rounded-lg p-6 text-center transition-all group">
                  <div className="text-3xl mb-2">🎬</div>
                  <h3 className="text-white font-bold group-hover:text-orange-300">Full Movie HD</h3>
                  <p className="text-gray-400 text-sm mt-1">Complete 2h 10min version</p>
                </Link>
                
                <Link href={`/${locale}/watch/mahavatar-narsimha-online`}
                      className="bg-black/50 hover:bg-black/70 rounded-lg p-6 text-center transition-all group">
                  <div className="text-3xl mb-2">📺</div>
                  <h3 className="text-white font-bold group-hover:text-orange-300">Stream Online</h3>
                  <p className="text-gray-400 text-sm mt-1">Multiple player options</p>
                </Link>
                
                <Link href={`/${locale}/watch/narasimha-2025-ott`}
                      className="bg-black/50 hover:bg-black/70 rounded-lg p-6 text-center transition-all group">
                  <div className="text-3xl mb-2">🔥</div>
                  <h3 className="text-white font-bold group-hover:text-orange-300">OTT Release</h3>
                  <p className="text-gray-400 text-sm mt-1">Coming September 2025</p>
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

            {/* About Narasimha 2025 */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">About Narasimha 2025</h2>
                <p className="text-gray-300 mb-4">
                  Narasimha 2025, officially titled "Mahavatar Narsimha", is a groundbreaking animated film that brings 
                  the ancient story of Lord Narasimha to modern audiences. This epic production has been 4.5 years in the making.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    India's biggest animated mythological film
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    Budget of over ₹100 crores
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    First of 6 films in the Mahavatar universe
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-2">•</span>
                    Released in 2D and 3D formats
                  </li>
                </ul>
              </div>
              
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Narsimha vs Narasimha</h2>
                <p className="text-gray-300 mb-4">
                  Many people search for both "Narsimha" and "Narasimha" - both refer to the same deity and movie:
                </p>
                <div className="bg-orange-900/30 rounded-lg p-4 mb-4">
                  <p className="text-white font-semibold mb-2">Common Searches:</p>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Narsimha 2025 full movie</li>
                    <li>• Narasimha movie 2025</li>
                    <li>• Mahavatar Narsimha</li>
                    <li>• Mahavatar Narasimha</li>
                  </ul>
                </div>
                <p className="text-gray-400 text-sm">
                  All these terms refer to the same epic animated movie releasing in 2025.
                </p>
              </div>
            </div>

            {/* OTT Platform Information */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Narasimha 2025 OTT Release
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="bg-black/40 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-3">📅 OTT Release Date</h3>
                  <p className="text-gray-300 mb-2">Expected: September 25, 2025</p>
                  <p className="text-gray-400 text-sm">
                    The movie will be available on major OTT platforms approximately 2 months after theatrical release.
                  </p>
                </div>
                
                <div className="bg-black/40 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-3">🎬 Expected Platforms</h3>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Amazon Prime Video</li>
                    <li>• Disney+ Hotstar</li>
                    <li>• Netflix (selected regions)</li>
                    <li>• ZEE5</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link href={`/${locale}/watch/narasimha-2025-ott`}
                      className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all">
                  Get OTT Updates →
                </Link>
              </div>
            </div>

            {/* Language Versions */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Narsimha 2025 - Available Languages
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { lang: 'Hindi', native: 'हिंदी', viewers: '45M+' },
                  { lang: 'Tamil', native: 'தமிழ்', viewers: '20M+' },
                  { lang: 'Telugu', native: 'తెలుగు', viewers: '25M+' },
                  { lang: 'Kannada', native: 'ಕನ್ನಡ', viewers: '10M+' },
                  { lang: 'Malayalam', native: 'മലയാളം', viewers: '8M+' }
                ].map((item) => (
                  <div key={item.lang} className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-lg p-4 text-center hover:from-orange-900/50 hover:to-red-900/50 transition-all cursor-pointer">
                    <div className="text-white font-bold text-lg">{item.native}</div>
                    <div className="text-gray-300 text-sm">{item.lang}</div>
                    <div className="text-orange-400 text-xs mt-1">{item.viewers} viewers</div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Frequently Asked Questions - Narasimha 2025
              </h2>
              
              <div className="space-y-4 max-w-4xl mx-auto">
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">When will Narsimha 2025 release?</h3>
                  <p className="text-gray-300 text-sm">The movie was released on March 21, 2025 in theaters across India.</p>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Is Narasimha 2025 available on OTT?</h3>
                  <p className="text-gray-300 text-sm">OTT release is expected in September 2025 on major streaming platforms.</p>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">What is the budget of Narsimha movie 2025?</h3>
                  <p className="text-gray-300 text-sm">The movie was made with a budget of over ₹100 crores over 4.5 years.</p>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Where can I watch Narasimha 2025 online free?</h3>
                  <p className="text-gray-300 text-sm">You can watch it on this platform or wait for the official OTT release.</p>
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