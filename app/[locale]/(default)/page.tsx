import { Metadata } from 'next'
import HeroSection from '@/components/movie/HeroSection'
import ReleaseCountdown from '@/components/movie/ReleaseCountdown'
import CastSection from '@/components/movie/CastSection'
import NewsSection from '@/components/movie/NewsSection'
import VideosSection from '@/components/movie/VideosSection'
import ReviewsSection from '@/components/movie/ReviewsSection'
import WatchOnlineSection from '@/components/movie/WatchOnlineSection'
import VideoPlayer from '@/components/movie/VideoPlayer'
import PremiumContentSection from '@/components/movie/PremiumContentSection'
import QuickPaymentCTA from '@/components/movie/QuickPaymentCTA'
import { movieData } from '@/data/movie-data'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL || 'https://mahavatar-narsimha.com'}`;

  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL || 'https://mahavatar-narsimha.com'}/${locale}`;
  }

  return {
    title: 'Mahavatar Narsimha Full Movie Watch Online FREE HD (2025) | Official Website',
    description: '🎬 Watch Mahavatar Narsimha full movie online FREE in HD quality. Stream now or download. IMDb 9.3/10. Available in Hindi, Tamil, Telugu. Official trailers & exclusive content!',
    keywords: 'mahavatar narsimha full movie, mahavatar narsimha full movie watch online, mahavatar narsimha movie watch online free, mahavatar narsimha watch online, mahavatar narsimha movie watch online, mahavatar narsimha online, mahavatar narasimha full movie, mahavatar narsimha where to watch, mahavatar narsimha free watch online, mahavatar narsimha website',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
      other: {
        rel: 'icon',
        url: '/favicon.ico',
      },
    },
    openGraph: {
      title: 'Mahavatar Narsimha - Epic Animated Movie 2025',
      description: 'The legendary tale of Lord Narsimha comes to life in this epic animated adventure',
      images: ['/images/mahavatar-hero.jpg'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Mahavatar Narsimha Movie 2025',
      description: 'Release date, cast, and everything about Mahavatar Narsimha',
      images: ['/images/mahavatar-hero.jpg'],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

// JSON-LD Structured Data
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Movie',
  name: 'Mahavatar Narsimha',
  datePublished: '2025-03-21',
  genre: ['Animation', 'Mythology', 'Adventure'],
  director: {
    '@type': 'Person',
    name: movieData.director,
  },
  actor: movieData.cast.map(actor => ({
    '@type': 'Person',
    name: actor.name,
  })),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.5',
    reviewCount: '1234',
    bestRating: '5',
  },
  description: movieData.description,
}

export default async function HomePage({
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
      
      <main className="min-h-screen">
        {/* Google AdSense 自动广告 - 顶部 */}
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-6224617757558738"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script dangerouslySetInnerHTML={{ __html: '(adsbygoogle = window.adsbygoogle || []).push({});' }} />

        {/* Full Movie Section - HIGHEST PRIORITY for 301 searches */}
        <section id="full-movie" className="py-20 px-4 bg-gradient-to-b from-red-900 to-orange-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-4">
                Watch Mahavatar Narsimha Full Movie Online
              </h2>
              <p className="text-xl text-gray-200 mb-8">
                Stream Mahavatar Narsimha full movie in HD quality. Available in Hindi, Tamil, Telugu, Kannada, and Malayalam.
              </p>
              
              {/* Embedded Video Player */}
              <div className="max-w-5xl mx-auto mb-8">
                <VideoPlayer 
                  videoUrl="https://reelreviewhub.com/en/movie/1383072"
                  title="Mahavatar Narsimha Full Movie HD"
                  poster="/images/mahavatar-hero.svg"
                />
              </div>
              
              {/* Quick Payment CTA */}
              <div className="max-w-4xl mx-auto mb-8">
                <QuickPaymentCTA />
              </div>
              
              <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6">
                  <Link
                    href="/en/watch/mahavatar-narsimha-full-movie"
                    className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-red-700 hover:to-orange-700 transition-all transform hover:scale-105 shadow-xl"
                  >
                    🎬 More Watch Options
                  </Link>
                  <Link
                    href="/en/watch/mahavatar-narsimha-full-movie-watch-online"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl"
                  >
                    📺 Alternative Players
                  </Link>
                </div>
                <div className="mt-6 text-gray-300">
                  <p className="text-sm mb-2">⭐ IMDb Rating: 9.3/10 | Runtime: 2h 10min</p>
                  <p className="text-sm">🎭 Available Languages: Hindi, Tamil, Telugu, Kannada, Malayalam</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Videos Section */}
        <section id="videos" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <VideosSection videos={movieData.videos} />
          </div>
        </section>
        
        {/* Premium Content Section - Payment Intent Testing */}
        <PremiumContentSection />
        
        {/* Hero Section with main keyword */}
        <HeroSection />

        {/* Cast Section - targets "mahavatar narsimha cast" */}
        <section id="cast" className="py-20 px-4 bg-gradient-to-b from-amber-50 to-orange-50">
          <div className="max-w-7xl mx-auto">
            <CastSection cast={movieData.cast} />
          </div>
        </section>

        {/* Google AdSense 自动广告 - 中间位置 */}
        <div className="py-8 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-6224617757558738"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script dangerouslySetInnerHTML={{ __html: '(adsbygoogle = window.adsbygoogle || []).push({});' }} />
          </div>
        </div>

        {/* Watch Online Section - targets "mahavatar narsimha ott" & "bookmyshow" */}
        <section id="watch-online" className="py-20 px-4 bg-gradient-to-b from-orange-50 to-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Watch Mahavatar Narsimha Online
              </span>
            </h2>
            <WatchOnlineSection platforms={movieData.platforms} />
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="py-20 px-4 bg-gradient-to-b from-red-50 to-purple-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Latest News & Updates
              </span>
            </h2>
            <NewsSection news={movieData.news} />
          </div>
        </section>

        {/* Reviews Section - targets "mahavatar narsimha reviews" */}
        <section id="reviews" className="py-20 px-4 bg-gradient-to-b from-purple-50 to-indigo-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                Reviews & Ratings
              </span>
            </h2>
            <ReviewsSection reviews={movieData.reviews} />
          </div>
        </section>
        
        {/* 联系方式部分 */}
        <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Contact Us
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Have questions about the movie or need assistance? Get in touch with us!
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-3">
                  <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xl text-white font-medium">Email</span>
                </div>
                <a 
                  href="mailto:310842705@qq.com" 
                  className="text-2xl text-orange-400 hover:text-orange-300 transition-colors font-semibold"
                >
                  310842705@qq.com
                </a>
                <p className="text-sm text-gray-400 mt-4">
                  We typically respond within 24-48 hours
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="py-20 px-4 bg-gradient-to-b from-indigo-50 to-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-100 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  When is Mahavatar Narsimha release date?
                </h3>
                <p className="text-gray-600">
                  Mahavatar Narsimha was theatrically released on July 25, 2025, in 2D and 3D formats across India in 5 languages.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-100 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Who is in the Mahavatar Narsimha cast?
                </h3>
                <p className="text-gray-600">
                  The movie features voice actors including Ashwin Kumar as Lord Narsimha, along with talented artists voicing Prahlada, Hiranyakashipu, and other characters.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-100 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Where can I watch Mahavatar Narsimha online?
                </h3>
                <p className="text-gray-600">
                  OTT release is expected on September 25, 2025. Currently showing in theaters - book tickets on BookMyShow.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-100 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  What is the budget of Mahavatar Narsimha?
                </h3>
                <p className="text-gray-600">
                  Made with a budget of ₹100+ crores over 4.5 years, it&apos;s one of India&apos;s biggest animated productions.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-100 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Is it part of a franchise?
                </h3>
                <p className="text-gray-600">
                  Yes! It&apos;s the first film in the Mahavatar Cinematic Universe, with 6 more films planned through 2037.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-100 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  What is the IMDb rating?
                </h3>
                <p className="text-gray-600">
                  Mahavatar Narsimha has an impressive 9.4/10 rating on IMDb, making it one of the highest-rated Indian animated films.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Google AdSense 自动广告 - 底部 */}
        <div className="py-8 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-6224617757558738"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script dangerouslySetInnerHTML={{ __html: '(adsbygoogle = window.adsbygoogle || []).push({});' }} />
          </div>
        </div>
      </main>
    </>
  )
}