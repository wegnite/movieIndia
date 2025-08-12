import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tv, Smartphone, Tablet, Monitor, Wifi, Cloud, Shield, Zap, Star, Play, ChevronRight } from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || 'https://mahavatar-narsimha.com';
  const canonicalUrl = locale === 'en' 
    ? `${baseUrl}/watch/mahavatar-narsimha-full-movie-watch-online`
    : `${baseUrl}/${locale}/watch/mahavatar-narsimha-full-movie-watch-online`;

  return {
    title: 'Mahavatar Narsimha Full Movie Watch Online - HD Streaming Guide 2025',
    description: '📺 Complete guide to watch Mahavatar Narsimha full movie online. Stream in HD on multiple devices. Free & paid options. Available in 5 languages with subtitles.',
    keywords: 'mahavatar narsimha full movie watch online, mahavatar narsimha movie watch online free, mahavatar narsimha watch online, mahavatar narsimha movie watch online, mahavatar narsimha online streaming',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Watch Mahavatar Narsimha Full Movie Online - Streaming Guide',
      description: 'Complete guide to stream Mahavatar Narsimha full movie online in HD quality',
      images: ['/images/mahavatar-hero.jpg'],
      type: 'website',
    },
  };
}

const watchOnlineStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Watch Mahavatar Narsimha Full Movie Online',
  description: 'Step-by-step guide to watch Mahavatar Narsimha full movie online in HD quality',
  step: [
    {
      '@type': 'HowToStep',
      name: 'Choose Platform',
      text: 'Select your preferred streaming platform from our recommended list',
    },
    {
      '@type': 'HowToStep',
      name: 'Select Language',
      text: 'Choose from Hindi, Tamil, Telugu, Kannada, or Malayalam',
    },
    {
      '@type': 'HowToStep',
      name: 'Start Streaming',
      text: 'Click play and enjoy the full movie in HD quality',
    },
  ],
  totalTime: 'PT2H10M',
};

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(watchOnlineStructuredData) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
        {/* Hero Section */}
        <section className="py-12 px-4 relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Mahavatar Narsimha Full Movie Watch Online
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
                Your complete guide to watch Mahavatar Narsimha full movie online. Stream the epic animated film on any device, 
                anytime, anywhere. Multiple platforms, languages, and quality options available.
              </p>
              
              {/* Quick Access Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Play className="mr-2" /> Watch Online Now
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Tv className="mr-2" /> Free Streaming Options
                </Button>
              </div>
            </div>

            {/* Streaming Platforms Grid */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Where to Watch Mahavatar Narsimha Full Movie Online
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Platform 1 */}
                <Card className="bg-gradient-to-br from-red-900/50 to-orange-900/50 border-orange-500 hover:scale-105 transition-transform">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">Premium HD Stream</h3>
                      <Badge className="bg-yellow-600">Most Popular</Badge>
                    </div>
                    <ul className="space-y-2 text-gray-300 mb-4">
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-400" />Full HD 1080p Quality</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-400" />No Ads Interruption</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-400" />All 5 Languages</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-400" />Download Available</li>
                    </ul>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      Watch Full Movie Online
                    </Button>
                  </div>
                </Card>

                {/* Platform 2 */}
                <Card className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border-blue-500 hover:scale-105 transition-transform">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">Free with Ads</h3>
                      <Badge className="bg-green-600">Free Option</Badge>
                    </div>
                    <ul className="space-y-2 text-gray-300 mb-4">
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-400" />HD 720p Quality</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-400" />Limited Ads</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-400" />Hindi & English</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-400" />Instant Access</li>
                    </ul>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Watch Online Free
                    </Button>
                  </div>
                </Card>

                {/* Platform 3 */}
                <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500 hover:scale-105 transition-transform">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">Mobile Optimized</h3>
                      <Badge className="bg-purple-600">Mobile First</Badge>
                    </div>
                    <ul className="space-y-2 text-gray-300 mb-4">
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-400" />Mobile & Tablet</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-400" />Data Saver Mode</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-400" />Offline Download</li>
                      <li className="flex items-center"><ChevronRight className="w-4 h-4 mr-2 text-green-400" />Chromecast Support</li>
                    </ul>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Watch on Mobile
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Device Compatibility Section */}
            <Card className="bg-gray-900/90 border-gray-700 p-8 mb-12">
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Watch Mahavatar Narsimha Online on Any Device
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-blue-600/20 rounded-full p-6 w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                    <Monitor className="w-12 h-12 text-blue-400" />
                  </div>
                  <h4 className="font-bold text-white">Desktop/Laptop</h4>
                  <p className="text-gray-400 text-sm">Full HD streaming</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-600/20 rounded-full p-6 w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                    <Smartphone className="w-12 h-12 text-green-400" />
                  </div>
                  <h4 className="font-bold text-white">Smartphone</h4>
                  <p className="text-gray-400 text-sm">iOS & Android</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-600/20 rounded-full p-6 w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                    <Tablet className="w-12 h-12 text-purple-400" />
                  </div>
                  <h4 className="font-bold text-white">Tablet/iPad</h4>
                  <p className="text-gray-400 text-sm">Optimized view</p>
                </div>
                <div className="text-center">
                  <div className="bg-red-600/20 rounded-full p-6 w-24 h-24 mx-auto mb-3 flex items-center justify-center">
                    <Tv className="w-12 h-12 text-red-400" />
                  </div>
                  <h4 className="font-bold text-white">Smart TV</h4>
                  <p className="text-gray-400 text-sm">4K supported</p>
                </div>
              </div>
            </Card>

            {/* Streaming Features */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500 p-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Premium Features - Watch Online
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white">Ultra HD Quality</h4>
                      <p className="text-gray-400 text-sm">Watch Mahavatar Narsimha full movie online in 4K Ultra HD</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wifi className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white">Adaptive Streaming</h4>
                      <p className="text-gray-400 text-sm">Automatically adjusts quality based on your internet speed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Cloud className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white">Cloud Sync</h4>
                      <p className="text-gray-400 text-sm">Resume watching from where you left off on any device</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white">Safe & Secure</h4>
                      <p className="text-gray-400 text-sm">100% safe streaming with no malware or viruses</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500 p-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  How to Watch Mahavatar Narsimha Online
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Choose Your Platform</h4>
                      <p className="text-gray-400 text-sm">Select from premium or free streaming options above</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Select Language</h4>
                      <p className="text-gray-400 text-sm">Pick from Hindi, Tamil, Telugu, Kannada, or Malayalam</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Choose Quality</h4>
                      <p className="text-gray-400 text-sm">Select HD, Full HD, or 4K based on your connection</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Start Watching</h4>
                      <p className="text-gray-400 text-sm">Enjoy the full movie online instantly!</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* User Reviews */}
            <Card className="bg-gray-900/90 border-gray-700 p-8 mb-12">
              <h3 className="text-3xl font-bold text-white text-center mb-8">
                What Viewers Say About Watching Online
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-2">
                    "Perfect streaming quality! Watched Mahavatar Narsimha full movie online without any buffering."
                  </p>
                  <p className="text-gray-500 text-sm">- Rahul K.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-2">
                    "Easy to watch online on my phone. The mobile experience is fantastic!"
                  </p>
                  <p className="text-gray-500 text-sm">- Priya S.</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-2">
                    "Multiple language options made it perfect for our family movie night online!"
                  </p>
                  <p className="text-gray-500 text-sm">- Arjun M.</p>
                </div>
              </div>
            </Card>

            {/* FAQ Section */}
            <Card className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-500 p-8 mb-12">
              <h3 className="text-3xl font-bold text-white text-center mb-8">
                FAQ - Watch Mahavatar Narsimha Full Movie Online
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">
                    Can I watch Mahavatar Narsimha full movie online for free?
                  </h4>
                  <p className="text-gray-300">
                    Yes, there are free options to watch Mahavatar Narsimha movie watch online free with limited ads. Premium ad-free streaming is also available for the best experience.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">
                    What internet speed do I need to watch online?
                  </h4>
                  <p className="text-gray-300">
                    For HD streaming of Mahavatar Narsimha watch online, you need at least 5 Mbps. For 4K quality, 25 Mbps or higher is recommended.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">
                    Can I watch Mahavatar Narsimha movie watch online on multiple devices?
                  </h4>
                  <p className="text-gray-300">
                    Yes, you can watch Mahavatar Narsimha online on smartphones, tablets, laptops, smart TVs, and gaming consoles. Most platforms support multiple device streaming.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">
                    Is Mahavatar Narsimha available to watch online with subtitles?
                  </h4>
                  <p className="text-gray-300">
                    Yes, when you watch Mahavatar Narsimha full movie watch online, subtitles are available in English and multiple regional languages.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">
                    How soon can I watch Mahavatar Narsimha online after theater release?
                  </h4>
                  <p className="text-gray-300">
                    The movie is expected to be available to watch online approximately 45-60 days after theatrical release, with some platforms offering early access options.
                  </p>
                </div>
              </div>
            </Card>

            {/* Final CTA */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-2xl">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Start Watching Mahavatar Narsimha Full Movie Online Now!
                </h3>
                <p className="text-xl text-gray-200 mb-6">
                  Join millions of viewers streaming this epic animated masterpiece online
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100">
                    <Play className="mr-2" /> Watch Full Movie Online HD
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Tv className="mr-2" /> Free Streaming Guide
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}