// News aggregator for Mahavatar Narsimha from multiple sources
// In production, use RSS feeds, Google News API, or web scraping

import newsData from '@/data/news-data.json';

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  summary: string;
  imageUrl?: string;
  category: string;
  readTime: number;
}

export async function aggregateNews(limit: number = 20): Promise<NewsItem[]> {
  // Combine news from multiple sources
  // In production, this would fetch from:
  // - Google News API
  // - RSS feeds from major publications
  // - Twitter API for real-time updates
  // - Press release APIs
  
  const aggregatedNews: NewsItem[] = newsData.news.slice(0, limit).map(item => ({
    id: item.id,
    title: item.title,
    source: item.source,
    url: `/news/${item.slug}`,
    publishedAt: item.date,
    summary: item.excerpt,
    imageUrl: item.image,
    category: item.category,
    readTime: Math.ceil(item.content.split(' ').length / 200)
  }));
  
  // Add some dynamic news items (simulating real-time updates)
  const dynamicNews: NewsItem[] = [
    {
      id: `dynamic_${Date.now()}_1`,
      title: `Mahavatar Narsimha advance booking crosses ₹${(15 + Math.random() * 5).toFixed(1)} Crores`,
      source: "Box Office India",
      url: "#",
      publishedAt: new Date().toISOString(),
      summary: "Real-time box office update shows strong pre-release performance",
      category: "Box Office",
      readTime: 2
    },
    {
      id: `dynamic_${Date.now()}_2`,
      title: `Twitter buzz: #MahavatarNarsimha trending at #${Math.floor(Math.random() * 5) + 1} in India`,
      source: "Social Media Today",
      url: "#",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      summary: "Social media engagement reaches new heights",
      category: "Social Media",
      readTime: 1
    }
  ];
  
  // Combine and sort by date
  const allNews = [...dynamicNews, ...aggregatedNews]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return allNews;
}

export async function getNewsByCategory(category: string): Promise<NewsItem[]> {
  const allNews = await aggregateNews(50);
  return allNews.filter(item => 
    item.category.toLowerCase() === category.toLowerCase()
  );
}

export async function searchNews(query: string): Promise<NewsItem[]> {
  const allNews = await aggregateNews(100);
  const searchTerm = query.toLowerCase();
  
  return allNews.filter(item =>
    item.title.toLowerCase().includes(searchTerm) ||
    item.summary.toLowerCase().includes(searchTerm) ||
    item.source.toLowerCase().includes(searchTerm)
  );
}

export async function getTrendingNews(): Promise<NewsItem[]> {
  const trendingItems = newsData.news
    .filter(item => item.trending)
    .slice(0, 5)
    .map(item => ({
      id: item.id,
      title: item.title,
      source: item.source,
      url: `/news/${item.slug}`,
      publishedAt: item.date,
      summary: item.excerpt,
      imageUrl: item.image,
      category: item.category,
      readTime: Math.ceil(item.content.split(' ').length / 200)
    }));
  
  await new Promise(resolve => setTimeout(resolve, 300));
  return trendingItems;
}