'use client';

import { useState } from 'react';
import Link from 'next/link';
import { characters } from '@/data/characters';
import { motion } from 'framer-motion';

export default function CharactersPage() {
  const [filter, setFilter] = useState<'all' | 'protagonist' | 'antagonist' | 'supporting'>('all');

  const filteredCharacters = filter === 'all' 
    ? characters 
    : characters.filter(char => char.role === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-center mb-4"
          >
            Epic Characters
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-center max-w-3xl mx-auto"
          >
            Meet the legendary characters from the epic tale of Mahavatar Narsimha
          </motion.p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['all', 'protagonist', 'antagonist', 'supporting'].map((role) => (
            <button
              key={role}
              onClick={() => setFilter(role as any)}
              className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                filter === role
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg'
              }`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
              {role === 'all' && ` (${characters.length})`}
              {role !== 'all' && ` (${characters.filter(c => c.role === role).length})`}
            </button>
          ))}
        </div>

        {/* Characters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCharacters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Link href={`/characters/${character.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  {/* Character Image */}
                  <div className="relative h-64 bg-gradient-to-b from-orange-200 to-red-200 dark:from-gray-700 dark:to-gray-600">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-30">
                        {character.role === 'protagonist' && '👑'}
                        {character.role === 'antagonist' && '👹'}
                        {character.role === 'supporting' && '🙏'}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-2xl font-bold text-white">{character.name}</h3>
                      <p className="text-orange-200">{character.title}</p>
                    </div>
                  </div>

                  {/* Character Info */}
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {character.description}
                    </p>
                    
                    {/* Powers Preview */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {character.powers.slice(0, 2).map((power, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-medium"
                        >
                          {power}
                        </span>
                      ))}
                      {character.powers.length > 2 && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                          +{character.powers.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Role Badge */}
                    <div className="flex justify-between items-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        character.role === 'protagonist' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : character.role === 'antagonist'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {character.role}
                      </span>
                      <span className="text-orange-500 group-hover:text-orange-600 transition-colors">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}