import { Metadata } from 'next'
import HeroSection from '@/components/movie/HeroSection'
import ReleaseCountdown from '@/components/movie/ReleaseCountdown'
import CastSection from '@/components/movie/CastSection'
import NewsSection from '@/components/movie/NewsSection'
import VideosSection from '@/components/movie/VideosSection'
import ReviewsSection from '@/components/movie/ReviewsSection'
import WatchOnlineSection from '@/components/movie/WatchOnlineSection'
import { movieData } from '@/data/movie-data'

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
    title: 'Mahavatar Narsimha Movie 2025 - Release Date, Cast, Reviews & OTT Platform',
    description: 'Get latest updates on Mahavatar Narsimha movie - release date, cast details, reviews, OTT platforms, BookMyShow booking. Watch teaser videos and download legally.',
    keywords: 'mahavatar narsimha, mahavatar narsimha movie, mahavatar narsimha release date, mahavatar narsimha cast, mahavatar narsimha ott, mahavatar narsimha reviews, mahavatar narsimha bookmyshow, mahavatar narsimha download, mahavatar narsimha teaser',
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
        {/* Videos Section - MOVED TO TOP for immediate visibility */}
        <section id="videos" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-7xl mx-auto">
            <VideosSection videos={movieData.videos} />
          </div>
        </section>
        
        {/* Hero Section with main keyword */}
        <HeroSection />

        {/* Cast Section - targets "mahavatar narsimha cast" */}
        <section id="cast" className="py-20 px-4 bg-gradient-to-b from-amber-50 to-orange-50">
          <div className="max-w-7xl mx-auto">
            <CastSection cast={movieData.cast} />
          </div>
        </section>

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
                  Made with a budget of ₹100+ crores over 4.5 years, it's one of India's biggest animated productions.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border border-indigo-100 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Is it part of a franchise?
                </h3>
                <p className="text-gray-600">
                  Yes! It's the first film in the Mahavatar Cinematic Universe, with 6 more films planned through 2037.
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
      </main>
    </>
  )
}