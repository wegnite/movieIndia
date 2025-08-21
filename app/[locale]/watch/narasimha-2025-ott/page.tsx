import { Metadata } from 'next'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  return {
    title: 'Narasimha Movie 2025 OTT Release Date | Platform & Streaming Info',
    description: '📅 Narasimha 2025 OTT release date, platform details & streaming info. Coming to Prime Video, Netflix, Hotstar in September 2025. Get updates on digital release.',
    keywords: 'narasimha movie 2025 ott platform, narasimha movie 2025 ott release date, narsimha 2025 ott, mahavatar narsimha ott release, narasimha 2025 streaming platform',
    openGraph: {
      title: 'Narasimha 2025 OTT Release - Platform & Date Info',
      description: 'Get the latest updates on Narasimha 2025 OTT release date and streaming platforms.',
      images: ['/images/mahavatar-hero.jpg'],
      type: 'website',
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_WEB_URL || 'https://mahavatar-narsimha.com'}/${locale}/watch/narasimha-2025-ott`,
    },
  };
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Narasimha 2025 OTT Release Date and Platform Information',
  datePublished: '2025-01-15',
  dateModified: '2025-01-15',
  author: {
    '@type': 'Organization',
    name: 'Mahavatar Narsimha Official'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Mahavatar Narsimha',
    logo: {
      '@type': 'ImageObject',
      url: 'https://mahavatar-narsimha.com/images/mahavatar-hero.jpg'
    }
  },
  description: 'Complete guide to Narasimha 2025 OTT release date, streaming platforms, and digital availability',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://mahavatar-narsimha.com/watch/narasimha-2025-ott'
  }
}

export default async function NarasimhaOTTPage({
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
      
      <main className="min-h-screen bg-gradient-to-b from-purple-950 via-black to-purple-950">
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Narasimha 2025 OTT Release
                <span className="block text-3xl md:text-4xl text-purple-400 mt-2">
                  Platform & Streaming Details
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                Everything you need to know about Mahavatar Narsimha&apos;s digital release
              </p>
              
              {/* Quick Info Cards */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="bg-purple-600/20 border border-purple-500/30 text-white px-6 py-3 rounded-lg">
                  <div className="text-sm text-purple-300">Expected Date</div>
                  <div className="font-bold">September 25, 2025</div>
                </div>
                <div className="bg-pink-600/20 border border-pink-500/30 text-white px-6 py-3 rounded-lg">
                  <div className="text-sm text-pink-300">Platforms</div>
                  <div className="font-bold">Prime, Netflix, Hotstar</div>
                </div>
                <div className="bg-orange-600/20 border border-orange-500/30 text-white px-6 py-3 rounded-lg">
                  <div className="text-sm text-orange-300">Languages</div>
                  <div className="font-bold">5 Languages</div>
                </div>
              </div>
            </div>

            {/* OTT Release Timeline */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                📅 OTT Release Timeline
              </h2>
              
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-500/30"></div>
                
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="flex-1 text-right pr-8">
                      <h3 className="text-white font-bold">Theatrical Release</h3>
                      <p className="text-gray-300">In cinemas nationwide</p>
                    </div>
                    <div className="relative z-10 bg-green-600 text-white w-32 py-2 px-4 rounded-full text-center font-bold">
                      March 21, 2025
                    </div>
                    <div className="flex-1 pl-8"></div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-1"></div>
                    <div className="relative z-10 bg-yellow-600 text-white w-32 py-2 px-4 rounded-full text-center font-bold">
                      July 2025
                    </div>
                    <div className="flex-1 pl-8">
                      <h3 className="text-white font-bold">Digital Purchase</h3>
                      <p className="text-gray-300">Available for rent/buy</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-1 text-right pr-8">
                      <h3 className="text-white font-bold">OTT Streaming</h3>
                      <p className="text-gray-300">Free with subscription</p>
                    </div>
                    <div className="relative z-10 bg-purple-600 text-white w-32 py-2 px-4 rounded-full text-center font-bold">
                      Sept 25, 2025
                    </div>
                    <div className="flex-1 pl-8"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Cards */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                🎬 Expected OTT Platforms
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
                  <div className="text-4xl mb-3">📺</div>
                  <h3 className="text-xl font-bold text-white mb-2">Prime Video</h3>
                  <p className="text-gray-300 text-sm mb-3">Most likely platform based on previous releases</p>
                  <div className="space-y-1">
                    <div className="text-green-400 text-sm">✓ All languages</div>
                    <div className="text-green-400 text-sm">✓ 4K HDR</div>
                    <div className="text-green-400 text-sm">✓ Offline download</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-red-900/50 to-pink-900/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
                  <div className="text-4xl mb-3">🎭</div>
                  <h3 className="text-xl font-bold text-white mb-2">Netflix</h3>
                  <p className="text-gray-300 text-sm mb-3">Selected regions only</p>
                  <div className="space-y-1">
                    <div className="text-green-400 text-sm">✓ Multi-profile</div>
                    <div className="text-green-400 text-sm">✓ Smart downloads</div>
                    <div className="text-yellow-400 text-sm">⚠ Region locked</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
                  <div className="text-4xl mb-3">🌟</div>
                  <h3 className="text-xl font-bold text-white mb-2">Disney+ Hotstar</h3>
                  <p className="text-gray-300 text-sm mb-3">Premium & Super plans</p>
                  <div className="space-y-1">
                    <div className="text-green-400 text-sm">✓ Regional focus</div>
                    <div className="text-green-400 text-sm">✓ Mobile plans</div>
                    <div className="text-green-400 text-sm">✓ Live sports bonus</div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
                  <div className="text-4xl mb-3">🎪</div>
                  <h3 className="text-xl font-bold text-white mb-2">ZEE5</h3>
                  <p className="text-gray-300 text-sm mb-3">Affordable option</p>
                  <div className="space-y-1">
                    <div className="text-green-400 text-sm">✓ Budget friendly</div>
                    <div className="text-green-400 text-sm">✓ Regional content</div>
                    <div className="text-green-400 text-sm">✓ TV integration</div>
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

            {/* Subscription Comparison */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                💰 Platform Subscription Comparison
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-white p-4">Platform</th>
                      <th className="text-white p-4">Monthly Plan</th>
                      <th className="text-white p-4">Annual Plan</th>
                      <th className="text-white p-4">Features</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="text-gray-300 p-4 font-semibold">Prime Video</td>
                      <td className="text-gray-300 p-4">₹299/month</td>
                      <td className="text-gray-300 p-4">₹1499/year</td>
                      <td className="text-gray-300 p-4">Prime benefits + Music</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="text-gray-300 p-4 font-semibold">Netflix</td>
                      <td className="text-gray-300 p-4">₹149-649/month</td>
                      <td className="text-gray-300 p-4">-</td>
                      <td className="text-gray-300 p-4">Multiple screens</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="text-gray-300 p-4 font-semibold">Hotstar</td>
                      <td className="text-gray-300 p-4">₹299/month</td>
                      <td className="text-gray-300 p-4">₹1499/year</td>
                      <td className="text-gray-300 p-4">Sports + Shows</td>
                    </tr>
                    <tr>
                      <td className="text-gray-300 p-4 font-semibold">ZEE5</td>
                      <td className="text-gray-300 p-4">₹99-299/month</td>
                      <td className="text-gray-300 p-4">₹599-999/year</td>
                      <td className="text-gray-300 p-4">Regional focus</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pre-OTT Watch Options */}
            <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Can&apos;t Wait for OTT? Watch Now!
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Link href={`/${locale}/movie/mahavatar-narsimha-full-movie`}
                      className="bg-black/50 hover:bg-black/70 rounded-lg p-6 text-center transition-all">
                  <div className="text-3xl mb-2">🎬</div>
                  <h3 className="text-white font-bold mb-1">Watch Full Movie</h3>
                  <p className="text-gray-400 text-sm">Stream now in HD</p>
                </Link>
                
                <Link href={`/${locale}/watch/mahavatar-narsimha-online`}
                      className="bg-black/50 hover:bg-black/70 rounded-lg p-6 text-center transition-all">
                  <div className="text-3xl mb-2">📺</div>
                  <h3 className="text-white font-bold mb-1">Online Streaming</h3>
                  <p className="text-gray-400 text-sm">Multiple players</p>
                </Link>
                
                <Link href={`/${locale}/movie/narasimha-2025`}
                      className="bg-black/50 hover:bg-black/70 rounded-lg p-6 text-center transition-all">
                  <div className="text-3xl mb-2">🎭</div>
                  <h3 className="text-white font-bold mb-1">Movie Info</h3>
                  <p className="text-gray-400 text-sm">Cast & details</p>
                </Link>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                OTT Release FAQs
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-white font-semibold mb-2">When will Narasimha 2025 release on OTT?</h3>
                  <p className="text-gray-300 text-sm">Expected OTT release date is September 25, 2025, approximately 2 months after theatrical release.</p>
                </div>
                
                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-white font-semibold mb-2">Which OTT platform will have Narsimha movie?</h3>
                  <p className="text-gray-300 text-sm">Prime Video is most likely, but Netflix, Hotstar, and ZEE5 are also potential platforms.</p>
                </div>
                
                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-white font-semibold mb-2">Will it be free on OTT platforms?</h3>
                  <p className="text-gray-300 text-sm">It will be included with platform subscriptions. No additional rental fees for subscribers.</p>
                </div>
                
                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-white font-semibold mb-2">What about 4K and HDR versions?</h3>
                  <p className="text-gray-300 text-sm">4K HDR versions expected on Prime Video and Netflix for premium subscribers.</p>
                </div>
                
                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-white font-semibold mb-2">Can I download for offline viewing?</h3>
                  <p className="text-gray-300 text-sm">Yes, most platforms will offer offline download options for mobile devices.</p>
                </div>
                
                <div className="bg-purple-900/20 rounded-lg p-4 border border-purple-500/20">
                  <h3 className="text-white font-semibold mb-2">Will all language versions be available?</h3>
                  <p className="text-gray-300 text-sm">Yes, all 5 language versions (Hindi, Tamil, Telugu, Kannada, Malayalam) will be available.</p>
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