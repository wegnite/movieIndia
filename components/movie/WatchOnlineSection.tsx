'use client'

import { motion } from 'framer-motion'
import { Tv, Ticket, Calendar, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Platform {
  name: string
  type: string
  url: string
  available: boolean
  price?: string
  expectedDate?: string
}

interface Props {
  platforms: Platform[]
}

export default function WatchOnlineSection({ platforms }: Props) {
  const theaterPlatforms = platforms.filter(p => p.type === 'theater')
  const ottPlatforms = platforms.filter(p => p.type === 'ott')

  return (
    <div className="space-y-8">
      {/* Theater Booking */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Ticket className="w-6 h-6 text-orange-600" />
          Book Movie Tickets
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {theaterPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 border-2 border-orange-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{platform.name}</h4>
                  <p className="text-gray-600">In Theaters Now</p>
                  {platform.price && (
                    <p className="text-orange-600 font-semibold mt-2">{platform.price}</p>
                  )}
                </div>
                <Ticket className="w-8 h-8 text-orange-600" />
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                <ExternalLink className="w-4 h-4 mr-2" />
                Book Now on {platform.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* OTT Platforms */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Tv className="w-6 h-6 text-blue-600" />
          OTT Platform Release
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ottPlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-lg shadow-md p-6 ${
                platform.available 
                  ? 'bg-green-50 border-2 border-green-300' 
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-gray-800">{platform.name}</h4>
                <Tv className={`w-6 h-6 ${
                  platform.available ? 'text-green-600' : 'text-gray-400'
                }`} />
              </div>
              
              {platform.available ? (
                <>
                  <p className="text-green-600 font-semibold mb-3">Available Now</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Watch on {platform.name}
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Expected: {platform.expectedDate}</span>
                  </div>
                  <Button variant="outline" className="w-full" disabled>
                    Coming Soon
                  </Button>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Download Notice */}
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Legal Download Options
        </h3>
        <p className="text-gray-600 mb-4">
          Mahavatar Narsimha will be available for digital purchase/rental after OTT release.
          Support the creators by watching through official platforms only.
        </p>
        <p className="text-sm text-blue-600">
          Available on iTunes, Google Play Movies, and YouTube Movies from May 2025
        </p>
      </div>
    </div>
  )
}