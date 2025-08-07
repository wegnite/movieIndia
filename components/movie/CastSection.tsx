'use client'

import { motion } from 'framer-motion'
import { User } from 'lucide-react'

interface CastMember {
  id: string
  name: string
  role: string
  character: string
  image?: string
  description: string
}

interface Props {
  cast: CastMember[]
}

export default function CastSection({ cast }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cast.map((member, index) => (
        <motion.div
          key={member.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          <div className="aspect-square bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
            {member.image ? (
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-20 h-20 text-orange-600" />
            )}
          </div>
          <div className="p-4">
            <h3 className="font-bold text-lg text-gray-800">{member.name}</h3>
            <p className="text-orange-600 font-medium">{member.character}</p>
            <p className="text-sm text-gray-600 mt-1">{member.role}</p>
            <p className="text-xs text-gray-500 mt-2">{member.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}