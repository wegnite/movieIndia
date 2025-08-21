import { Metadata } from 'next'

/**
 * SEO 元数据生成器
 * 统一管理所有页面的元数据生成，减少代码重复
 */

// 默认站点信息
const SITE_NAME = 'Mahavatar Narsimha'
const SITE_URL = process.env.NEXT_PUBLIC_WEB_URL || 'https://mahavatar-narsimha.com'
const DEFAULT_IMAGE = '/images/mahavatar-hero.jpg'

// SEO 元数据配置接口
interface SeoConfig {
  title: string
  description: string
  keywords?: string | string[]
  image?: string
  type?: 'website' | 'article' | 'video.movie'
  locale?: string
  path?: string
  noIndex?: boolean
  alternates?: {
    languages?: Record<string, string>
  }
}

/**
 * 生成页面元数据
 * @param config SEO 配置
 * @returns Next.js Metadata 对象
 */
export function generateSeoMetadata(config: SeoConfig): Metadata {
  const {
    title,
    description,
    keywords,
    image = DEFAULT_IMAGE,
    type = 'website',
    locale = 'en',
    path = '',
    noIndex = false,
    alternates
  } = config

  // 构建完整 URL
  const url = `${SITE_URL}${path}`
  
  // 处理关键词
  const keywordsString = Array.isArray(keywords) 
    ? keywords.join(', ') 
    : keywords

  return {
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`
    },
    description,
    keywords: keywordsString,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: alternates?.languages || {
        'en': `${SITE_URL}/en${path}`,
        'zh': `${SITE_URL}/zh${path}`,
      }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale,
      type: type as any,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@mahavatar_movie',
      site: '@mahavatar_movie',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
  }
}

/**
 * 电影页面专用元数据生成器
 */
export function generateMovieMetadata(
  movieTitle: string,
  description: string,
  locale: string = 'en',
  path: string = ''
): Metadata {
  return generateSeoMetadata({
    title: movieTitle,
    description,
    keywords: [
      `${movieTitle.toLowerCase()}`,
      `${movieTitle.toLowerCase()} full movie`,
      `${movieTitle.toLowerCase()} watch online`,
      `${movieTitle.toLowerCase()} hd`,
      `${movieTitle.toLowerCase()} streaming`,
      `${movieTitle.toLowerCase()} free`,
      `${movieTitle.toLowerCase()} 2025`,
      'bollywood movie',
      'hindi movie',
      'indian cinema'
    ],
    type: 'video.movie',
    locale,
    path,
  })
}

/**
 * 生成结构化数据（Schema.org）
 */
export function generateMovieSchema(movie: {
  name: string
  description: string
  datePublished?: string
  director?: string
  actors?: string[]
  genre?: string[]
  duration?: string
  image?: string
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.name,
    description: movie.description,
    datePublished: movie.datePublished || '2025-01-01',
    director: movie.director ? {
      '@type': 'Person',
      name: movie.director
    } : undefined,
    actor: movie.actors?.map(actor => ({
      '@type': 'Person',
      name: actor
    })),
    genre: movie.genre || ['Action', 'Drama', 'Mythology'],
    duration: movie.duration || 'PT2H30M',
    image: movie.image || DEFAULT_IMAGE,
    aggregateRating: movie.aggregateRating ? {
      '@type': 'AggregateRating',
      ratingValue: movie.aggregateRating.ratingValue,
      reviewCount: movie.aggregateRating.reviewCount
    } : undefined,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'USD',
      url: SITE_URL
    }
  }
}

/**
 * 生成面包屑结构化数据
 */
export function generateBreadcrumbSchema(items: Array<{
  name: string
  url: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

/**
 * 生成 FAQ 结构化数据
 */
export function generateFAQSchema(faqs: Array<{
  question: string
  answer: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

/**
 * 生成组织结构化数据
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      'https://www.facebook.com/mahavatar',
      'https://twitter.com/mahavatar_movie',
      'https://www.instagram.com/mahavatar',
      'https://www.youtube.com/@mahavatar'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'ta', 'te']
    }
  }
}

/**
 * 生成视频对象结构化数据
 */
export function generateVideoSchema(video: {
  name: string
  description: string
  thumbnailUrl: string
  uploadDate: string
  duration: string
  contentUrl?: string
  embedUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.embedUrl,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`
      }
    }
  }
}