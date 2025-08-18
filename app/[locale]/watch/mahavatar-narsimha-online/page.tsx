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
    title: 'Mahavatar Narsimha Watch Online FREE | Stream HD Movie 2025',
    description: '🎥 Watch Mahavatar Narsimha online FREE. Multiple HD streaming options. No sign-up required. Stream in Hindi, Tamil, Telugu with subtitles. Mobile & desktop friendly.',
    keywords: 'mahavatar narsimha watch online, mahavatar narsimha online, watch mahavatar narsimha, stream mahavatar narsimha, mahavatar narsimha streaming',
    openGraph: {
      title: 'Watch Mahavatar Narsimha Online - HD Streaming',
      description: 'Stream Mahavatar Narsimha online in HD quality. Multiple players and language options available.',
      images: ['/images/mahavatar-hero.jpg'],
      type: 'video.movie',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL || 'https://mahavatar-narsimha.com'}/${locale}/watch/mahavatar-narsimha-online`,
    },
  };
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WatchAction',
  object: {
    '@type': 'Movie',
    name: 'Mahavatar Narsimha',
  },
  target: {
    '@type': 'EntryPoint',
    urlTemplate: 'https://mahavatar-narsimha.com/watch/mahavatar-narsimha-online',
    actionPlatform: [
      'http://schema.org/DesktopWebPlatform',
      'http://schema.org/MobileWebPlatform',
      'http://schema.org/IOSPlatform',
      'http://schema.org/AndroidPlatform'
    ]
  },
  potentialAction: {
    '@type': 'WatchAction',
    target: 'https://mahavatar-narsimha.com/watch/mahavatar-narsimha-online'
  }
}

export default async function WatchOnlinePage({
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
      
      <main className="min-h-screen bg-gradient-to-b from-purple-950 via-black to-red-950">
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Watch Mahavatar Narsimha Online
                <span className="block text-3xl md:text-4xl text-purple-400 mt-2">
                  Stream Now • No Sign-up Required
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Choose from multiple HD streaming options below
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <span className="bg-purple-600/80 text-white px-3 py-1.5 rounded-full text-sm">
                  🎬 Multiple Players
                </span>
                <span className="bg-pink-600/80 text-white px-3 py-1.5 rounded-full text-sm">
                  📱 Mobile Friendly
                </span>
                <span className="bg-orange-600/80 text-white px-3 py-1.5 rounded-full text-sm">
                  🌐 5 Languages
                </span>
                <span className="bg-green-600/80 text-white px-3 py-1.5 rounded-full text-sm">
                  ⚡ Fast Streaming
                </span>
              </div>
            </div>

            {/* Player Selection Grid */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Select Your Preferred Player
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {/* Player 1 - Main */}
                <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Player 1 - Premium HD</h3>
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">RECOMMENDED</span>
                  </div>
                  <div className="aspect-video bg-black/50 rounded-lg mb-4 overflow-hidden">
                    <VideoPlayer 
                      videoUrl="https://reelreviewhub.com/en/movie/1383072"
                      title="Mahavatar Narsimha - Player 1"
                      poster="/images/mahavatar-hero.svg"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">HD/4K</span>
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">Fast Loading</span>
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">All Languages</span>
                  </div>
                </div>

                {/* Player 2 - Alternative */}
                <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Player 2 - Mobile Optimized</h3>
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">MOBILE</span>
                  </div>
                  <div className="aspect-video bg-black/50 rounded-lg mb-4 flex items-center justify-center">
                    <Link 
                      href={`/${locale}/movie/mahavatar-narsimha-full-movie`}
                      className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-lg font-bold hover:from-orange-700 hover:to-red-700 transition-all"
                    >
                      ▶️ Launch Player 2
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">Low Bandwidth</span>
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">Mobile First</span>
                    <span className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">Data Saver</span>
                  </div>
                </div>
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

            {/* More Players Grid */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Additional Streaming Options
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href={`/${locale}/watch/mahavatar-narsimha-free`}
                      className="bg-gradient-to-r from-green-600/80 to-teal-600/80 text-white p-4 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all text-center">
                  <div className="text-2xl mb-1">🆓</div>
                  <div className="font-semibold text-sm">Free Stream</div>
                </Link>
                
                <Link href={`/${locale}/movie/mahavatar-narsimha-full-movie`}
                      className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 text-white p-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all text-center">
                  <div className="text-2xl mb-1">🎬</div>
                  <div className="font-semibold text-sm">Full Movie</div>
                </Link>
                
                <Link href={`/${locale}/watch/mahavatar-narsimha-hd`}
                      className="bg-gradient-to-r from-red-600/80 to-orange-600/80 text-white p-4 rounded-lg hover:from-red-700 hover:to-orange-700 transition-all text-center">
                  <div className="text-2xl mb-1">📺</div>
                  <div className="font-semibold text-sm">HD Quality</div>
                </Link>
                
                <Link href={`/${locale}/movie/narasimha-2025`}
                      className="bg-gradient-to-r from-yellow-600/80 to-amber-600/80 text-white p-4 rounded-lg hover:from-yellow-700 hover:to-amber-700 transition-all text-center">
                  <div className="text-2xl mb-1">🎥</div>
                  <div className="font-semibold text-sm">Alt Version</div>
                </Link>
              </div>
            </div>

            {/* Streaming Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">🌍</div>
                <h3 className="text-xl font-bold text-white mb-2">Global Access</h3>
                <p className="text-gray-300 text-sm">
                  Stream from anywhere in the world. No geo-restrictions or VPN required.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2">Instant Streaming</h3>
                <p className="text-gray-300 text-sm">
                  No downloads or waiting. Start watching immediately with adaptive bitrate.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl mb-3">🔒</div>
                <h3 className="text-xl font-bold text-white mb-2">Safe & Secure</h3>
                <p className="text-gray-300 text-sm">
                  100% safe streaming with no malware or unwanted downloads.
                </p>
              </div>
            </div>

            {/* Language Selection */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Select Your Language
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transition-all group">
                  <div className="text-white font-semibold group-hover:text-purple-300">हिंदी</div>
                  <div className="text-gray-400 text-xs mt-1">Hindi</div>
                </button>
                
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transition-all group">
                  <div className="text-white font-semibold group-hover:text-purple-300">தமிழ்</div>
                  <div className="text-gray-400 text-xs mt-1">Tamil</div>
                </button>
                
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transition-all group">
                  <div className="text-white font-semibold group-hover:text-purple-300">తెలుగు</div>
                  <div className="text-gray-400 text-xs mt-1">Telugu</div>
                </button>
                
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transition-all group">
                  <div className="text-white font-semibold group-hover:text-purple-300">ಕನ್ನಡ</div>
                  <div className="text-gray-400 text-xs mt-1">Kannada</div>
                </button>
                
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transition-all group">
                  <div className="text-white font-semibold group-hover:text-purple-300">മലയാളം</div>
                  <div className="text-gray-400 text-xs mt-1">Malayalam</div>
                </button>
              </div>
            </div>

            {/* How to Watch Guide */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                How to Watch Mahavatar Narsimha Online
              </h2>
              
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    1
                  </div>
                  <h4 className="text-white font-semibold mb-2">Choose Player</h4>
                  <p className="text-gray-400 text-sm">Select from our available streaming players</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    2
                  </div>
                  <h4 className="text-white font-semibold mb-2">Select Language</h4>
                  <p className="text-gray-400 text-sm">Pick your preferred audio language</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-orange-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    3
                  </div>
                  <h4 className="text-white font-semibold mb-2">Choose Quality</h4>
                  <p className="text-gray-400 text-sm">Select video quality based on your internet</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    4
                  </div>
                  <h4 className="text-white font-semibold mb-2">Start Watching</h4>
                  <p className="text-gray-400 text-sm">Click play and enjoy the movie!</p>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Common Questions
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Is registration required?</h3>
                  <p className="text-gray-300 text-sm">No, you can watch immediately without any sign-up or registration.</p>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">What internet speed do I need?</h3>
                  <p className="text-gray-300 text-sm">Minimum 2 Mbps for SD, 5 Mbps for HD, and 25 Mbps for 4K streaming.</p>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Can I download the movie?</h3>
                  <p className="text-gray-300 text-sm">This is a streaming-only service. Downloads are not available.</p>
                </div>
                
                <div className="bg-black/30 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">Are there ads?</h3>
                  <p className="text-gray-300 text-sm">Minimal ads to support free streaming. Premium options available.</p>
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