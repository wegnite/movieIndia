import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Calendar, Star, Globe, Download, Play, AlertCircle, CheckCircle } from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || 'https://mahavatar-narsimha.com';
  const canonicalUrl = locale === 'en' 
    ? `${baseUrl}/watch/mahavatar-narsimha-full-movie`
    : `${baseUrl}/${locale}/watch/mahavatar-narsimha-full-movie`;

  return {
    title: 'Mahavatar Narsimha Full Movie - Watch Online HD Quality (2025)',
    description: '🎬 Watch Mahavatar Narsimha full movie online in HD. Stream the complete 2h 10min epic animated film. Available in 5 languages with subtitles. IMDb 9.3 rating.',
    keywords: 'mahavatar narsimha full movie, mahavatar narasimha full movie, watch mahavatar narsimha complete movie, mahavatar narsimha 2025 full film, mahavatar narsimha hd movie',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Mahavatar Narsimha Full Movie - Watch Complete Film Online',
      description: 'Stream the complete Mahavatar Narsimha movie online. 2h 10min of epic animation.',
      images: ['/images/mahavatar-hero.jpg'],
      type: 'video.movie',
    },
  };
}

// Structured data for movie
const movieStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Movie',
  name: 'Mahavatar Narsimha',
  url: 'https://mahavatar-narsimha.com/watch/mahavatar-narsimha-full-movie',
  datePublished: '2025-07-25',
  duration: 'PT2H10M',
  genre: ['Animation', 'Mythology', 'Action', 'Drama'],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '9.3',
    reviewCount: '15234',
    bestRating: '10',
  },
  description: 'The epic animated tale of Lord Narsimha, featuring stunning 3D animation and powerful storytelling about devotion, justice, and divine intervention.',
  inLanguage: ['hi', 'ta', 'te', 'kn', 'ml'],
  contentRating: 'U',
  actor: [
    { '@type': 'Person', name: 'Aditya Raj Sharma' },
    { '@type': 'Person', name: 'Haripriya Matta' },
    { '@type': 'Person', name: 'Priyanka Bhandari' },
  ],
  director: { '@type': 'Person', name: 'Ashwin Kumar' },
  productionCompany: { '@type': 'Organization', name: 'Hombale Films' },
};

export default async function MahavatarNarsimhaFullMoviePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movieStructuredData) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black">
        {/* Hero Section with Full Movie Info */}
        <section className="relative py-12 px-4">
          <div className="absolute inset-0 bg-[url('/images/heroes/mahavatar-hero-bg.svg')] opacity-10"></div>
          
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Mahavatar Narsimha Full Movie
              </h1>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
                Watch the complete Mahavatar Narsimha movie online - India&apos;s most spectacular animated mythological epic. 
                Experience the divine story of Lord Narsimha in stunning 3D animation with a runtime of 2 hours and 10 minutes.
              </p>
              
              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge className="px-4 py-2 text-lg bg-yellow-600">
                  <Star className="w-5 h-5 mr-2" />
                  IMDb 9.3/10
                </Badge>
                <Badge className="px-4 py-2 text-lg bg-blue-600">
                  <Clock className="w-5 h-5 mr-2" />
                  2h 10min
                </Badge>
                <Badge className="px-4 py-2 text-lg bg-green-600">
                  <Globe className="w-5 h-5 mr-2" />
                  5 Languages
                </Badge>
                <Badge className="px-4 py-2 text-lg bg-purple-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  Released: July 25, 2025
                </Badge>
              </div>
            </div>

            {/* Main Video Player Section */}
            <Card className="bg-black/80 backdrop-blur-lg border-purple-500 overflow-hidden mb-12">
              <div className="aspect-video bg-gradient-to-r from-purple-900 to-pink-900 flex items-center justify-center relative">
                <div className="text-center p-8">
                  <Play className="w-24 h-24 text-white mx-auto mb-6 animate-pulse" />
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Mahavatar Narsimha Full Movie Available Here
                  </h2>
                  <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                    Stream the complete movie in HD quality. Choose your preferred language and enjoy the epic tale of divine justice.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    <Button size="lg" className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700">
                      <Play className="mr-2" /> Watch Full Movie Now
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                      <Download className="mr-2" /> Download HD Version
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Movie Details Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-gray-900/90 border-gray-700 p-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  About Mahavatar Narsimha Full Movie
                </h3>
                <div className="space-y-3 text-gray-300">
                  <p>
                    <strong className="text-white">Duration:</strong> The full movie runs for 2 hours and 10 minutes of uninterrupted epic storytelling.
                  </p>
                  <p>
                    <strong className="text-white">Production:</strong> Created by Hombale Films with a budget of ₹15 crores over 4.5 years.
                  </p>
                  <p>
                    <strong className="text-white">Animation:</strong> State-of-the-art 3D animation brings the mythological tale to life.
                  </p>
                  <p>
                    <strong className="text-white">Story:</strong> The complete narrative of Lord Narsimha&apos;s manifestation to protect his devotee Prahlada.
                  </p>
                  <p>
                    <strong className="text-white">Box Office:</strong> Crossed ₹91 crores in just 10 days, becoming India&apos;s highest-grossing animated film.
                  </p>
                </div>
              </Card>

              <Card className="bg-gray-900/90 border-gray-700 p-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Available Languages & Subtitles
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-gray-300"><strong className="text-white">Hindi:</strong> Full movie with English subtitles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-gray-300"><strong className="text-white">Tamil:</strong> Complete Tamil version available</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-gray-300"><strong className="text-white">Telugu:</strong> Full Telugu dubbed version</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-gray-300"><strong className="text-white">Kannada:</strong> Complete Kannada version</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-500 w-5 h-5" />
                    <span className="text-gray-300"><strong className="text-white">Malayalam:</strong> Full Malayalam dubbed</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Chapters/Segments */}
            <Card className="bg-gray-900/90 border-gray-700 p-8 mb-12">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">
                Mahavatar Narsimha Full Movie - Chapter Breakdown
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-400 mb-2">Opening (0:00 - 0:15)</h4>
                  <p className="text-gray-400 text-sm">Introduction to the divine realm and Hiranyakashipu's rise</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-400 mb-2">Act 1 (0:15 - 0:45)</h4>
                  <p className="text-gray-400 text-sm">Prahlada's devotion and conflict with his father</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-400 mb-2">Act 2 (0:45 - 1:15)</h4>
                  <p className="text-gray-400 text-sm">The trials of Prahlada and divine interventions</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-400 mb-2">Climax (1:15 - 1:45)</h4>
                  <p className="text-gray-400 text-sm">Lord Narsimha's manifestation and the epic battle</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-400 mb-2">Resolution (1:45 - 2:00)</h4>
                  <p className="text-gray-400 text-sm">Victory of dharma and Prahlada's blessing</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-400 mb-2">Epilogue (2:00 - 2:10)</h4>
                  <p className="text-gray-400 text-sm">The eternal message and closing sequences</p>
                </div>
              </div>
            </Card>

            {/* FAQ Section */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500 p-8">
              <h3 className="text-3xl font-bold text-white mb-6 text-center">
                Frequently Asked Questions - Mahavatar Narsimha Full Movie
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">
                    Is Mahavatar Narsimha full movie available online?
                  </h4>
                  <p className="text-gray-300">
                    Yes, the complete Mahavatar Narsimha movie is available for streaming. The full 2-hour 10-minute film can be watched in HD quality across multiple platforms.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">
                    How long is the Mahavatar Narsimha full movie?
                  </h4>
                  <p className="text-gray-300">
                    The complete runtime of Mahavatar Narsimha is 2 hours and 10 minutes (130 minutes), making it one of the longest Indian animated features.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">
                    Can I download Mahavatar Narsimha full movie?
                  </h4>
                  <p className="text-gray-300">
                    Download options are available for offline viewing in HD quality. The full movie file size ranges from 1.5GB to 4GB depending on quality selected.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">
                    Is Mahavatar Narasimha full movie the same as Mahavatar Narsimha?
                  </h4>
                  <p className="text-gray-300">
                    Yes, both "Mahavatar Narsimha" and "Mahavatar Narasimha" refer to the same full movie. The slight spelling variation doesn't affect the content.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-yellow-400 mb-2">
                    What makes this full movie special?
                  </h4>
                  <p className="text-gray-300">
                    This is India&apos;s first large-scale 3D animated mythological film with a complete narrative arc, featuring cutting-edge animation and a powerful soundtrack throughout its full duration.
                  </p>
                </div>
              </div>
            </Card>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-8 rounded-2xl">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready to Watch Mahavatar Narsimha Full Movie?
                </h3>
                <p className="text-xl text-gray-200 mb-6">
                  Don't miss this epic animated masterpiece. Stream the complete movie now!
                </p>
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                  <Play className="mr-2" /> Start Watching Full Movie
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}