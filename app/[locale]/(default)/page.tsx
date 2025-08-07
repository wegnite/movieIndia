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
      
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero Section with main keyword */}
        <HeroSection />
        
        {/* Release Date Countdown - targets "mahavatar narsimha release date" */}
        <section id="release-date" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
              Mahavatar Narsimha Release Date
            </h2>
            <ReleaseCountdown releaseDate={movieData.releaseDate} />
          </div>
        </section>

        {/* Cast Section - targets "mahavatar narsimha cast" */}
        <section id="cast" className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
              Mahavatar Narsimha Cast & Characters
            </h2>
            <CastSection cast={movieData.cast} />
          </div>
        </section>

        {/* Watch Online Section - targets "mahavatar narsimha ott" & "bookmyshow" */}
        <section id="watch-online" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
              Watch Mahavatar Narsimha Online - OTT & BookMyShow
            </h2>
            <WatchOnlineSection platforms={movieData.platforms} />
          </div>
        </section>

        {/* Videos Section - targets "mahavatar narsimha teaser" & "videos" */}
        <section id="videos" className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
              Mahavatar Narsimha Videos & Teaser
            </h2>
            <VideosSection videos={movieData.videos} />
          </div>
        </section>

        {/* News Section */}
        <section id="news" className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
              Latest Mahavatar Narsimha News & Updates
            </h2>
            <NewsSection news={movieData.news} />
          </div>
        </section>

        {/* Reviews Section - targets "mahavatar narsimha reviews" */}
        <section id="reviews" className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
              Mahavatar Narsimha Reviews & Ratings
            </h2>
            <ReviewsSection reviews={movieData.reviews} />
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  When is Mahavatar Narsimha release date?
                </h3>
                <p className="text-gray-600">
                  Mahavatar Narsimha is scheduled to release on March 21, 2025, in theaters across India.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Who is in the Mahavatar Narsimha cast?
                </h3>
                <p className="text-gray-600">
                  The movie features renowned voice actors including the lead hero and supporting cast bringing the epic characters to life.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Where can I watch Mahavatar Narsimha online?
                </h3>
                <p className="text-gray-600">
                  After theatrical release, Mahavatar Narsimha will be available on major OTT platforms. Book tickets on BookMyShow.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  What is the budget of Mahavatar Narsimha?
                </h3>
                <p className="text-gray-600">
                  Mahavatar Narsimha is made with a budget of approximately ₹100 crores, making it one of India's biggest animated productions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Is Mahavatar Narsimha available for download?
                </h3>
                <p className="text-gray-600">
                  Legal download options will be available after the OTT release on platforms like iTunes, Google Play Movies, and YouTube Movies.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  What is the hero name in Mahavatar Narsimha?
                </h3>
                <p className="text-gray-600">
                  The main character is Lord Narsimha, the fourth avatar of Lord Vishnu, voiced by a renowned Bollywood actor.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}