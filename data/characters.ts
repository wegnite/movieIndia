export interface Character {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  powers: string[];
  backstory: string;
  role: 'protagonist' | 'antagonist' | 'supporting';
}

export const characters: Character[] = [
  {
    id: 'narsimha',
    name: 'Lord Narsimha',
    title: 'The Divine Protector',
    description: 'The fourth avatar of Lord Vishnu, half-man and half-lion, emerged to protect his devotee Prahlada and restore cosmic balance.',
    image: '/images/characters/narsimha.jpg',
    powers: ['Divine Strength', 'Immortality', 'Shape-shifting', 'Cosmic Powers'],
    backstory: 'Born from a pillar at twilight, neither man nor beast, Lord Narsimha appeared when evil reached its peak. His fierce form represents the triumph of devotion over tyranny.',
    role: 'protagonist'
  },
  {
    id: 'prahlada',
    name: 'Prahlada',
    title: 'The Devoted Prince',
    description: 'Young prince whose unwavering devotion to Lord Vishnu defied his demon father and inspired divine intervention.',
    image: '/images/characters/prahlada.jpg',
    powers: ['Unshakeable Faith', 'Divine Protection', 'Wisdom Beyond Years', 'Miraculous Survival'],
    backstory: 'Born to the demon king Hiranyakashipu, Prahlada chose the path of righteousness, becoming a symbol of devotion that transcends fear and oppression.',
    role: 'protagonist'
  },
  {
    id: 'hiranyakashipu',
    name: 'Hiranyakashipu',
    title: 'The Demon King',
    description: 'Powerful demon king who gained near-immortality through severe penance, only to be consumed by his own pride and hatred.',
    image: '/images/characters/hiranyakashipu.jpg',
    powers: ['Near Immortality', 'Superhuman Strength', 'Mystical Weapons', 'Army Command'],
    backstory: 'After his brother was slain by Lord Vishnu, Hiranyakashipu performed intense tapasya to gain powers that made him nearly invincible, ruling the three worlds with tyranny.',
    role: 'antagonist'
  },
  {
    id: 'holika',
    name: 'Holika',
    title: 'The Fire Demoness',
    description: 'Sister of Hiranyakashipu, blessed with immunity to fire, who met her end trying to harm the devoted Prahlada.',
    image: '/images/characters/holika.jpg',
    powers: ['Fire Immunity', 'Demonic Magic', 'Shape-shifting', 'Illusion Creation'],
    backstory: 'Holika received a boon that fire could not harm her, but her evil intentions turned the blessing into a curse when she tried to burn Prahlada.',
    role: 'antagonist'
  },
  {
    id: 'kayadu',
    name: 'Kayadu',
    title: 'The Queen Mother',
    description: 'Wife of Hiranyakashipu and mother of Prahlada, torn between loyalty to her husband and love for her devoted son.',
    image: '/images/characters/kayadu.jpg',
    powers: ['Maternal Love', 'Royal Authority', 'Spiritual Wisdom', 'Protective Instincts'],
    backstory: 'A woman of virtue trapped in a palace of evil, Kayadu secretly nurtured the divine spark in her son while navigating the dangerous court of her demon husband.',
    role: 'supporting'
  },
  {
    id: 'narada',
    name: 'Sage Narada',
    title: 'The Divine Messenger',
    description: 'Celestial sage who travels between worlds, spreading wisdom and devotion, instrumental in Prahlada\'s spiritual education.',
    image: '/images/characters/narada.jpg',
    powers: ['Interdimensional Travel', 'Divine Knowledge', 'Musical Magic', 'Prophecy'],
    backstory: 'The eternal wanderer and devotee of Lord Vishnu, Narada Muni planted the seeds of devotion in Prahlada while he was still in his mother\'s womb.',
    role: 'supporting'
  },
  {
    id: 'vishnu',
    name: 'Lord Vishnu',
    title: 'The Preserver',
    description: 'The supreme deity who maintains cosmic order, taking avatars whenever evil threatens to overwhelm righteousness.',
    image: '/images/characters/vishnu.jpg',
    powers: ['Omnipotence', 'Avatar Manifestation', 'Cosmic Control', 'Divine Weapons'],
    backstory: 'The preserver of the universe, Lord Vishnu promised to protect his devotees and maintain dharma, manifesting as Narsimha to fulfill this divine promise.',
    role: 'protagonist'
  },
  {
    id: 'garuda',
    name: 'Garuda',
    title: 'The Divine Eagle',
    description: 'Mount of Lord Vishnu, the mighty eagle who serves as the vehicle and companion of the supreme deity.',
    image: '/images/characters/garuda.jpg',
    powers: ['Supersonic Flight', 'Divine Speed', 'Serpent Slayer', 'Immortality'],
    backstory: 'Born to sage Kashyapa and Vinata, Garuda became the eternal servant of Lord Vishnu after a legendary quest for the nectar of immortality.',
    role: 'supporting'
  }
];