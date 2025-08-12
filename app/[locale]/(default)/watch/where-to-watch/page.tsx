import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Globe, Ticket, Calendar, TrendingUp, Users, Film, Award, Info, ExternalLink } from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_WEB_URL || 'https://mahavatar-narsimha.com';
  const canonicalUrl = locale === 'en' 
    ? `${baseUrl}/watch/where-to-watch`
    : `${baseUrl}/${locale}/watch/where-to-watch`;

  return {
    title: 'Where to Watch Mahavatar Narsimha - Complete Platform Guide 2025',
    description: '📍 Find where to watch Mahavatar Narsimha movie. Theater locations, OTT platforms, streaming services. Compare prices and availability. Updated daily.',
    keywords: 'mahavatar narsimha where to watch, mahavatar narsimha free watch online, mahavatar narsimha website, mahavatar narsimha streaming platforms',
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: 'Where to Watch Mahavatar Narsimha - All Platforms',
      description: 'Complete guide on where to watch Mahavatar Narsimha movie',
      images: ['/images/mahavatar-hero.jpg'],
      type: 'website',
    },
  };
}

export default async function WhereToWatchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-black">
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Where to Watch Mahavatar Narsimha
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              Your complete guide to finding Mahavatar Narsimha across all platforms. From theaters to streaming services, 
              discover where to watch this epic animated movie in your preferred language and format.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge className="px-4 py-2 text-lg bg-red-600">
                <Film className="w-5 h-5 mr-2" />
                In Theaters Now
              </Badge>
              <Badge className="px-4 py-2 text-lg bg-purple-600">
                <Globe className="w-5 h-5 mr-2" />
                OTT Coming Soon
              </Badge>
              <Badge className="px-4 py-2 text-lg bg-green-600">
                <Users className="w-5 h-5 mr-2" />
                5 Languages
              </Badge>
            </div>
          </div>

          {/* Theater Availability */}
          <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-red-500 p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <Ticket className="mr-3" /> Currently in Theaters
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Major Cinema Chains</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center justify-between">
                    <span>PVR Cinemas</span>
                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/10">
                      Book Now <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>INOX Movies</span>
                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/10">
                      Book Now <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Cinepolis</span>
                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/10">
                      Book Now <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Carnival Cinemas</span>
                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white/10">
                      Book Now <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Booking Platforms</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center justify-between">
                    <span>BookMyShow</span>
                    <Badge className="bg-green-600">Available</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Paytm Movies</span>
                    <Badge className="bg-green-600">Available</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>TicketNew</span>
                    <Badge className="bg-green-600">Available</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Direct Cinema Booking</span>
                    <Badge className="bg-green-600">Available</Badge>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-black/30 rounded-lg">
              <p className="text-gray-300 flex items-start">
                <Info className="w-5 h-5 mr-2 text-yellow-400 flex-shrink-0 mt-0.5" />
                <span>Mahavatar Narsimha is currently showing in over 2,500 screens across India in 2D and 3D formats.</span>
              </p>
            </div>
          </Card>

          {/* Streaming Platforms */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Where to Watch Mahavatar Narsimha Online
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Platform Cards */}
              <Card className="bg-gray-900/90 border-purple-500 hover:scale-105 transition-transform">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">JioHotstar</h3>
                    <Badge className="bg-yellow-600">Expected Soon</Badge>
                  </div>
                  <ul className="space-y-2 text-gray-300 mb-4 text-sm">
                    <li>• Expected: September 2025</li>
                    <li>• Languages: Hindi, English</li>
                    <li>• Quality: Up to 4K</li>
                    <li>• Subscription Required</li>
                  </ul>
                  <Button className="w-full" disabled>
                    Coming Soon
                  </Button>
                </div>
              </Card>

              <Card className="bg-gray-900/90 border-blue-500 hover:scale-105 transition-transform">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Amazon Prime</h3>
                    <Badge className="bg-blue-600">Negotiations</Badge>
                  </div>
                  <ul className="space-y-2 text-gray-300 mb-4 text-sm">
                    <li>• Expected: Q4 2025</li>
                    <li>• All 5 Languages</li>
                    <li>• HD & 4K Available</li>
                    <li>• Prime Membership</li>
                  </ul>
                  <Button className="w-full" disabled>
                    Not Yet Available
                  </Button>
                </div>
              </Card>

              <Card className="bg-gray-900/90 border-green-500 hover:scale-105 transition-transform">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Netflix</h3>
                    <Badge className="bg-gray-600">TBA</Badge>
                  </div>
                  <ul className="space-y-2 text-gray-300 mb-4 text-sm">
                    <li>• Release Date: TBA</li>
                    <li>• Global Availability</li>
                    <li>• Multiple Languages</li>
                    <li>• Download Option</li>
                  </ul>
                  <Button className="w-full" disabled>
                    To Be Announced
                  </Button>
                </div>
              </Card>

              <Card className="bg-gray-900/90 border-orange-500 hover:scale-105 transition-transform">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">ZEE5</h3>
                    <Badge className="bg-orange-600">Regional</Badge>
                  </div>
                  <ul className="space-y-2 text-gray-300 mb-4 text-sm">
                    <li>• South Indian Languages</li>
                    <li>• Expected: Late 2025</li>
                    <li>• HD Streaming</li>
                    <li>• Affordable Plans</li>
                  </ul>
                  <Button className="w-full" disabled>
                    Coming Later
                  </Button>
                </div>
              </Card>

              <Card className="bg-gray-900/90 border-pink-500 hover:scale-105 transition-transform">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">SonyLIV</h3>
                    <Badge className="bg-pink-600">Possible</Badge>
                  </div>
                  <ul className="space-y-2 text-gray-300 mb-4 text-sm">
                    <li>• Under Discussion</li>
                    <li>• Multi-language Support</li>
                    <li>• Sports Bundle Option</li>
                    <li>• Mobile Plans</li>
                  </ul>
                  <Button className="w-full" disabled>
                    Stay Tuned
                  </Button>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500 hover:scale-105 transition-transform">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Official Website</h3>
                    <Badge className="bg-green-600">Free Preview</Badge>
                  </div>
                  <ul className="space-y-2 text-gray-300 mb-4 text-sm">
                    <li>• Trailers & Clips</li>
                    <li>• Behind the Scenes</li>
                    <li>• Cast Interviews</li>
                    <li>• Making Videos</li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Watch Free Content
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Regional Availability */}
          <Card className="bg-gray-900/90 border-gray-700 p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <MapPin className="mr-3" /> Regional Availability
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-yellow-400 mb-2">North India</h4>
                <p className="text-gray-400 text-sm mb-2">Hindi Version</p>
                <p className="text-gray-300 text-sm">Wide theatrical release in Delhi, UP, Punjab, Haryana, Rajasthan</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-yellow-400 mb-2">South India</h4>
                <p className="text-gray-400 text-sm mb-2">Tamil, Telugu, Kannada, Malayalam</p>
                <p className="text-gray-300 text-sm">Maximum screens in Karnataka, Tamil Nadu, Andhra Pradesh, Kerala</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-yellow-400 mb-2">West India</h4>
                <p className="text-gray-400 text-sm mb-2">Hindi & Gujarati Subtitles</p>
                <p className="text-gray-300 text-sm">Major cities: Mumbai, Pune, Ahmedabad, Surat</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-yellow-400 mb-2">East India</h4>
                <p className="text-gray-400 text-sm mb-2">Hindi with Bengali Subtitles</p>
                <p className="text-gray-300 text-sm">Available in Kolkata, Bhubaneswar, Guwahati</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-yellow-400 mb-2">International</h4>
                <p className="text-gray-400 text-sm mb-2">English Subtitles</p>
                <p className="text-gray-300 text-sm">UAE, USA, UK, Singapore, Malaysia theaters</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-bold text-yellow-400 mb-2">Online Global</h4>
                <p className="text-gray-400 text-sm mb-2">All Languages</p>
                <p className="text-gray-300 text-sm">Worldwide streaming coming soon on major platforms</p>
              </div>
            </div>
          </Card>

          {/* Free Watch Options */}
          <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-500 p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Free Watch Online Options
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Mahavatar Narsimha Free Watch Online</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Official YouTube channel - Selected clips and trailers free</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Free preview on Mahavatar Narsimha website - First 10 minutes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Partner platforms with ad-supported free viewing (coming soon)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Limited-time free streaming during festivals</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Premium Benefits</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">★</span>
                    <span>Ad-free viewing experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">★</span>
                    <span>4K Ultra HD quality streaming</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">★</span>
                    <span>Download for offline viewing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">★</span>
                    <span>Bonus content and behind-the-scenes</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Box Office Stats */}
          <Card className="bg-gray-900/90 border-gray-700 p-8 mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <TrendingUp className="mr-3" /> Why Everyone's Watching
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">₹91Cr+</div>
                <p className="text-gray-400">Box Office Collection</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">9.3/10</div>
                <p className="text-gray-400">IMDb Rating</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">2500+</div>
                <p className="text-gray-400">Screens Worldwide</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">5</div>
                <p className="text-gray-400">Languages Available</p>
              </div>
            </div>
          </Card>

          {/* FAQ Section */}
          <Card className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 border-purple-500 p-8">
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              Frequently Asked Questions - Where to Watch
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-yellow-400 mb-2">
                  Where can I watch Mahavatar Narsimha right now?
                </h4>
                <p className="text-gray-300">
                  Currently, Mahavatar Narsimha is available in theaters across India. You can book tickets through BookMyShow, Paytm Movies, or directly at cinema halls. OTT release is expected in September 2025.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-yellow-400 mb-2">
                  Is there a free way to watch Mahavatar Narsimha online?
                </h4>
                <p className="text-gray-300">
                  Yes, Mahavatar Narsimha free watch online options include official trailers and clips on YouTube. The official Mahavatar Narsimha website also offers preview content. Full movie free streaming may be available during special promotions.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-yellow-400 mb-2">
                  Which platform will have Mahavatar Narsimha first for streaming?
                </h4>
                <p className="text-gray-300">
                  Industry reports suggest JioHotstar has the highest probability for first streaming rights of the Hindi version. Regional language versions may appear on different platforms.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-yellow-400 mb-2">
                  Can I watch Mahavatar Narsimha outside India?
                </h4>
                <p className="text-gray-300">
                  Yes, the movie is showing in select international theaters in UAE, USA, UK, and Singapore. Global streaming will be available once OTT platforms acquire international rights.
                </p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 p-8 rounded-2xl">
              <h3 className="text-3xl font-bold text-white mb-4">
                Find Your Perfect Way to Watch Mahavatar Narsimha
              </h3>
              <p className="text-xl text-gray-200 mb-6">
                Choose from theaters, upcoming streaming platforms, or free preview options
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                  <Ticket className="mr-2" /> Book Theater Tickets
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Globe className="mr-2" /> Check Streaming Updates
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}