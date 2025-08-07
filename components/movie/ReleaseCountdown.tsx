'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'

interface Props {
  releaseDate: string
}

export default function ReleaseCountdown({ releaseDate }: Props) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(releaseDate).getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [releaseDate])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-8">
      <div className="flex items-center justify-center mb-6">
        <Calendar className="w-8 h-8 text-orange-600 mr-3" />
        <h3 className="text-2xl font-bold text-gray-800">Theatrical Release Countdown</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-4 text-center shadow-lg"
          >
            <div className="text-4xl font-bold text-orange-600">
              {unit.value.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-gray-600 mt-1">{unit.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-orange-600 mr-2" />
            <h4 className="font-semibold">India Release</h4>
          </div>
          <p className="text-gray-600">March 21, 2025 - All Theaters</p>
          <p className="text-sm text-gray-500 mt-1">Hindi, Tamil, Telugu, Malayalam</p>
        </div>

        <div className="bg-white rounded-lg p-4">
          <div className="flex items-center mb-2">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="font-semibold">OTT Release</h4>
          </div>
          <p className="text-gray-600">May 1, 2025 - Digital Premiere</p>
          <p className="text-sm text-gray-500 mt-1">Netflix, Prime Video, Hotstar</p>
        </div>
      </div>
    </div>
  )
}