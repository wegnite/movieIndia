import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mahavatar-narsimha.com'
  const currentDate = new Date().toISOString()
  const locales = ['en', 'zh']

  // 基础页面路径（需要国际化）
  const localizedPages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/posts', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/showcase', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/pricing', priority: 0.6, changeFrequency: 'monthly' as const },
  ]

  // 电影相关页面（需要国际化）
  const moviePages = [
    // watch 路径
    { path: '/watch/mahavatar-narsimha-full-movie', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/watch/mahavatar-narsimha-full-movie-watch-online', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/watch/where-to-watch', priority: 0.85, changeFrequency: 'daily' as const },
    { path: '/watch/mahavatar-narsimha-online', priority: 0.95, changeFrequency: 'daily' as const },
    { path: '/watch/narasimha-2025-ott', priority: 0.85, changeFrequency: 'weekly' as const },
    // movie 路径
    { path: '/movie/mahavatar-narsimha-full-movie', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/movie/narasimha-2025', priority: 0.9, changeFrequency: 'daily' as const },
  ]

  // 这些页面已经被robots.txt禁止，不应该出现在sitemap中
  // 注释掉以避免Google Search Console报告冲突
  const rootPages: { url: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' }[] = [
    // 这些URL已在robots.txt中禁止爬取，不应包含在sitemap中
    // { url: `${baseUrl}/bookmyshow`, priority: 0.7, changeFrequency: 'weekly' as const },
    // { url: `${baseUrl}/cast`, priority: 0.6, changeFrequency: 'monthly' as const },
    // { url: `${baseUrl}/download`, priority: 0.7, changeFrequency: 'weekly' as const },
    // { url: `${baseUrl}/news`, priority: 0.8, changeFrequency: 'daily' as const },
    // { url: `${baseUrl}/ott-release`, priority: 0.8, changeFrequency: 'weekly' as const },
    // { url: `${baseUrl}/reviews`, priority: 0.7, changeFrequency: 'weekly' as const },
    // { url: `${baseUrl}/watch-online`, priority: 0.8, changeFrequency: 'daily' as const },
  ]

  // 生成所有国际化页面的URL
  const sitemapEntries: MetadataRoute.Sitemap = []

  // 添加根路径（默认语言不需要前缀）
  sitemapEntries.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
  })

  // 为每个语言生成页面URL
  locales.forEach(locale => {
    // 基础页面
    localizedPages.forEach(page => {
      // 英文作为默认语言，根路径不需要 /en 前缀（as-needed策略）
      const url = locale === 'en' && page.path === '' 
        ? baseUrl 
        : `${baseUrl}/${locale}${page.path}`
      
      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })
    })

    // 电影相关页面
    moviePages.forEach(page => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page.path}`,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })
    })
  })

  // 添加根目录独立页面
  rootPages.forEach(page => {
    sitemapEntries.push({
      url: page.url,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })
  })

  // 添加法律页面（不需要语言前缀）
  sitemapEntries.push(
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    }
  )

  return sitemapEntries
}