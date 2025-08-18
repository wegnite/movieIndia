'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  Eye, 
  TrendingUp, 
  Search,
  Film,
  Music,
  DollarSign,
  Megaphone,
  Star,
  ChevronRight,
  Newspaper
} from 'lucide-react';
import newsData from '@/data/news-data.json';

// 分类图标映射
const categoryIcons = {
  'Box Office': DollarSign,
  'Production': Film,
  'Music': Music,
  'Reviews': Star,
  'Marketing': Megaphone,
  'Awards': Star,
};

// 分类颜色映射
const categoryColors = {
  'Box Office': 'bg-green-100 text-green-800 border-green-200',
  'Production': 'bg-purple-100 text-purple-800 border-purple-200',
  'Music': 'bg-pink-100 text-pink-800 border-pink-200',
  'Reviews': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Marketing': 'bg-orange-100 text-orange-800 border-orange-200',
  'Awards': 'bg-red-100 text-red-800 border-red-200',
};

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [newsItems, setNewsItems] = useState(newsData.news);

  // 获取所有分类
  const categories = ['all', ...new Set(newsData.news.map(item => item.category))];

  // 过滤和排序新闻
  useEffect(() => {
    let filtered = [...newsData.news];

    // 按分类过滤
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // 按搜索词过滤
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // 排序
    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.views - a.views);
    } else if (sortBy === 'trending') {
      filtered = filtered.filter(item => item.trending);
    }

    setNewsItems(filtered);
  }, [searchQuery, selectedCategory, sortBy]);

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // 格式化浏览量
  const formatViews = (views: number) => {
    if (views > 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views > 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  // 获取热门新闻
  const trendingNews = newsData.news.filter(item => item.trending).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* 页面标题区域 */}
      <div className="relative bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">电影新闻中心</h1>
          <p className="text-xl opacity-90">
            《Mahavatar Narsimha》最新资讯、幕后花絮、票房动态
          </p>
        </div>
        
        {/* 装饰性元素 */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* 搜索栏 */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="搜索新闻标题、内容或标签..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === 'latest' ? 'default' : 'outline'}
                  onClick={() => setSortBy('latest')}
                >
                  最新发布
                </Button>
                <Button
                  variant={sortBy === 'popular' ? 'default' : 'outline'}
                  onClick={() => setSortBy('popular')}
                >
                  最多浏览
                </Button>
                <Button
                  variant={sortBy === 'trending' ? 'default' : 'outline'}
                  onClick={() => setSortBy('trending')}
                  className="flex items-center gap-1"
                >
                  <TrendingUp className="w-4 h-4" />
                  热门
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* 左侧新闻列表 */}
          <div className="lg:col-span-3">
            {/* 分类标签 */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
              <TabsList className="flex flex-wrap gap-2 h-auto p-1">
                {categories.map(category => {
                  const Icon = category !== 'all' ? categoryIcons[category as keyof typeof categoryIcons] : Newspaper;
                  return (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="flex items-center gap-1"
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      {category === 'all' ? '全部' : category}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>

            {/* 新闻列表 */}
            <div className="space-y-6">
              {newsItems.length > 0 ? (
                newsItems.map((item) => {
                  const CategoryIcon = categoryIcons[item.category as keyof typeof categoryIcons] || Film;
                  return (
                    <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="grid md:grid-cols-3 gap-0">
                        {/* 新闻图片 */}
                        <div className="relative h-48 md:h-full">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                          {item.trending && (
                            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              热门
                            </Badge>
                          )}
                        </div>

                        {/* 新闻内容 */}
                        <div className="md:col-span-2 p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant="outline" 
                              className={categoryColors[item.category as keyof typeof categoryColors]}
                            >
                              <CategoryIcon className="w-3 h-3 mr-1" />
                              {item.category}
                            </Badge>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(item.date)}
                            </span>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {formatViews(item.views)}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold mb-2 hover:text-orange-600 transition-colors">
                            <Link href={`/news/${item.slug}`}>
                              {item.title}
                            </Link>
                          </h3>

                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {item.excerpt}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              {item.tags.slice(0, 3).map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/news/${item.slug}`}>
                                阅读更多
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Link>
                            </Button>
                          </div>

                          <div className="mt-3 pt-3 border-t text-sm text-gray-500">
                            来源: {item.source} · 作者: {item.author}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <Card className="p-12 text-center">
                  <p className="text-gray-500">没有找到相关新闻</p>
                </Card>
              )}
            </div>
          </div>

          {/* 右侧边栏 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 热门新闻 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  热门新闻
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingNews.map((item, index) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <Link 
                        href={`/news/${item.slug}`}
                        className="text-sm font-medium hover:text-orange-600 transition-colors line-clamp-2"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatViews(item.views)} 次浏览
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 新闻统计 */}
            <Card>
              <CardHeader>
                <CardTitle>新闻统计</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">总新闻数</span>
                    <span className="font-bold">{newsData.news.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">本周更新</span>
                    <span className="font-bold text-green-600">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">热门话题</span>
                    <span className="font-bold text-orange-600">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 订阅新闻 */}
            <Card className="bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader>
                <CardTitle>订阅新闻推送</CardTitle>
                <CardDescription>
                  第一时间获取最新电影资讯
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input 
                    type="email" 
                    placeholder="输入您的邮箱" 
                  />
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">
                    订阅
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 快速链接 */}
            <Card>
              <CardHeader>
                <CardTitle>快速链接</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/cast" className="flex items-center gap-2 text-sm hover:text-orange-600 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                    演员阵容
                  </Link>
                  <Link href="/reviews" className="flex items-center gap-2 text-sm hover:text-orange-600 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                    影评专区
                  </Link>
                  <Link href="/download" className="flex items-center gap-2 text-sm hover:text-orange-600 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                    素材下载
                  </Link>
                  <Link href="/bookmyshow" className="flex items-center gap-2 text-sm hover:text-orange-600 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                    购票指南
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}