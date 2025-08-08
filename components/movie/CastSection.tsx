'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { User, Mic } from 'lucide-react'

interface CastMember {
  id: string
  name: string
  role: string
  character: string
  image?: string
  description: string
}

interface CastSectionProps {
  cast: CastMember[]
}

export default function CastSection({ cast }: CastSectionProps) {
  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 30c11.046 0 20 8.954 20 20s-8.954 20-20 20-20-8.954-20-20 8.954-20 20-20zm0 5c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15z' fill='%23D4AF37' fill-opacity='0.3'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Voice Cast & Characters
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bringing the legendary characters to life with powerful voice performances
          </p>
        </motion.div>

        {/* Main Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cast.slice(0, 3).map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-200/50">
                {/* Character Image */}
                <div className="relative h-80 bg-gradient-to-b from-amber-100 to-orange-100 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    {member.image ? (
                      <img src={member.image} alt={member.character} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                        <User className="w-32 h-32 text-amber-600/30" />
                      </div>
                    )}
                  </div>
                  {/* Character Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-3xl font-bold text-white mb-1 drop-shadow-lg">
                      {member.character}
                    </h3>
                  </div>
                </div>

                {/* Cast Details */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Mic className="w-4 h-4 text-amber-600" />
                    <p className="text-sm font-medium text-amber-600">Voice Actor</p>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                  
                  {/* Character Badge */}
                  <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300">
                    <span className="text-xs font-semibold text-amber-800">{member.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Supporting Cast */}
        {cast.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Supporting Cast</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {cast.slice(3).map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-amber-100"
                >
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center flex-shrink-0">
                    {member.image ? (
                      <img src={member.image} alt={member.character} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-amber-600/50" />
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-gray-800">{member.character}</h4>
                    <p className="text-sm text-gray-600 mb-1">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Director & Producer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200/50"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Creative Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-200 to-indigo-200 flex items-center justify-center">
                <User className="w-12 h-12 text-purple-600/50" />
              </div>
              <h4 className="font-bold text-lg text-gray-800">Ashwin Kumar</h4>
              <p className="text-purple-600 font-medium">Director</p>
              <p className="text-sm text-gray-600 mt-2">Directorial Debut</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-200 to-indigo-200 flex items-center justify-center">
                <User className="w-12 h-12 text-purple-600/50" />
              </div>
              <h4 className="font-bold text-lg text-gray-800">Kleem Productions</h4>
              <p className="text-purple-600 font-medium">Producer</p>
              <p className="text-sm text-gray-600 mt-2">with Hombale Films</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}