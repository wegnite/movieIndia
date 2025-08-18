import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/_next/',
          '/api/',
          '/*.json$',
          '/cdn-cgi/',
          '/icon',
          '/$'  // Disallow the bare $ path
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/_next/',
          '/api/',
          '/cdn-cgi/',
        ],
      },
    ],
    sitemap: 'https://mahavatar-narsimha.com/sitemap.xml',
    host: 'https://mahavatar-narsimha.com',
  }
}