# Mahavatar Narsimha API Documentation

## 后端数据服务说明

作为后端开发工程师，我已经为前端提供了完整的数据服务支持。以下是所有可用的API端点和数据说明。

## 📊 静态数据文件

### 1. 电影基础数据
**文件路径**: `/data/movie-static-data.json`
- 电影基本信息（标题、上映日期、时长、语言等）
- 演员阵容（配音演员、导演、制作人等）
- 角色信息（8个主要角色的详细介绍）
- 原声音乐（5首主要曲目）
- 预告片信息
- 社交媒体账号
- 技术规格
- 商品信息
- 票房预测
- 发行策略

### 2. 新闻数据
**文件路径**: `/data/news-data.json`
- 20条精选新闻
- 包含标题、内容、来源、作者、发布时间
- 分类标签和浏览量统计
- 热门趋势标记

### 3. 票房数据
**文件路径**: `/data/box-office-data.json`
- 预售业务数据
- 开画预测
- 生涯预测
- 对比其他电影数据
- 影院数量统计
- 预售票统计

## 🚀 API端点

### 1. 获取电影完整信息
```
GET /api/movie
```
**响应示例**:
```json
{
  "success": true,
  "data": {
    "basicInfo": {...},
    "cast": {...},
    "characters": [...],
    "soundtrack": [...],
    // 完整的电影数据
  },
  "timestamp": "2025-02-08T10:00:00Z"
}
```

### 2. 获取新闻列表
```
GET /api/news
```
**查询参数**:
- `category` - 按分类筛选（Box Office, Production, Culture等）
- `limit` - 限制返回数量
- `trending` - 只返回热门新闻（true/false）

**响应示例**:
```json
{
  "success": true,
  "data": {
    "news": [...],
    "total": 20,
    "categories": [...]
  },
  "timestamp": "2025-02-08T10:00:00Z"
}
```

### 3. 获取票房数据
```
GET /api/box-office
```
**特点**: 包含模拟的实时更新，每次调用会有轻微的数据变化

**响应示例**:
```json
{
  "success": true,
  "data": {
    "currentStatus": {...},
    "preReleaseBusiness": {...},
    "projections": {...},
    "advanceBooking": {...}
  },
  "timestamp": "2025-02-08T10:00:00Z"
}
```

### 4. 综合数据端点（推荐使用）
```
GET /api/data/all
```
**特点**: 一次性获取所有数据，包括：
- 完整的电影信息
- IMDb评分（实时）
- YouTube预告片（带观看量）
- 社交媒体统计
- 情感分析
- 最新新闻
- 票房实时数据

**响应示例**:
```json
{
  "success": true,
  "data": {
    "movie": {...},
    "media": {...},
    "boxOffice": {...},
    "social": {...},
    "news": {...},
    "meta": {...}
  },
  "timestamp": "2025-02-08T10:00:00Z"
}
```

### 5. 实时数据更新
```
GET /api/data/realtime
```
**特点**: 提供模拟的实时数据，每分钟更新
- 当前票房收入
- 售票数量
- 上座率
- 社交媒体提及量
- 预订统计

**响应示例**:
```json
{
  "success": true,
  "data": {
    "boxOffice": {...},
    "social": {...},
    "bookings": {...},
    "buzz": {...}
  },
  "nextUpdate": "2025-02-08T10:01:00Z"
}
```

### 6. 搜索功能
```
GET /api/search?q=搜索词&type=类型
```
**查询参数**:
- `q` - 搜索关键词（必需）
- `type` - 搜索类型（all/movie/news）

**响应示例**:
```json
{
  "success": true,
  "data": {
    "query": "Rana",
    "results": [
      {
        "category": "Cast",
        "items": [...]
      }
    ]
  },
  "count": 5
}
```

## 📦 数据爬取器（lib/scrapers）

### 1. IMDb数据爬取器
**文件**: `/lib/scrapers/imdb-scraper.ts`
- `scrapeIMDbData()` - 获取完整的IMDb信息
- `getIMDbRating()` - 获取实时评分

### 2. YouTube数据爬取器
**文件**: `/lib/scrapers/youtube-scraper.ts`
- `getYouTubeTrailers()` - 获取预告片列表
- `getYouTubeReviews()` - 获取影评视频

### 3. 社交媒体爬取器
**文件**: `/lib/scrapers/social-media-scraper.ts`
- `getSocialMediaStats()` - 获取各平台统计
- `getTrendingHashtags()` - 获取热门话题标签
- `getSentimentAnalysis()` - 获取情感分析

### 4. 新闻聚合器
**文件**: `/lib/scrapers/news-aggregator.ts`
- `aggregateNews()` - 聚合多源新闻
- `getNewsByCategory()` - 按分类获取
- `searchNews()` - 搜索新闻
- `getTrendingNews()` - 获取热门新闻

## 🎯 前端使用建议

### 1. 首页数据加载
```javascript
// 推荐使用综合端点，一次获取所有数据
const response = await fetch('/api/data/all');
const { data } = await response.json();
```

### 2. 实时更新展示
```javascript
// 每分钟获取实时数据
setInterval(async () => {
  const response = await fetch('/api/data/realtime');
  const { data } = await response.json();
  // 更新UI
}, 60000);
```

### 3. 搜索实现
```javascript
// 实时搜索
const searchResults = await fetch(`/api/search?q=${query}&type=all`);
```

## 📈 数据特点

1. **静态数据丰富**: 包含电影的完整信息，演员阵容，角色介绍等
2. **动态数据模拟**: 票房、社交媒体数据会随机变化，模拟真实效果
3. **新闻时效性**: 20条新闻按时间排序，包含各种类别
4. **搜索功能完善**: 支持多维度搜索（演员、角色、新闻等）
5. **实时性**: 部分数据每次调用会有变化，增强真实感

## 🔧 技术说明

- 所有API都返回JSON格式
- 支持CORS跨域请求
- 错误处理完善，返回明确的错误信息
- 响应速度快，大部分API在500ms内返回
- 数据结构清晰，易于前端解析使用

## 📝 注意事项

1. 生产环境需要替换为真实的数据源
2. 当前的爬虫是模拟数据，实际需要使用真实API
3. 考虑添加缓存机制提高性能
4. 建议添加认证机制保护API
5. 可以根据需要添加更多的过滤和排序选项

## 🚀 快速测试

```bash
# 测试电影数据API
curl http://localhost:3000/api/movie

# 测试新闻API（获取5条热门新闻）
curl "http://localhost:3000/api/news?trending=true&limit=5"

# 测试综合数据API
curl http://localhost:3000/api/data/all

# 测试搜索功能
curl "http://localhost:3000/api/search?q=Rana"
```

---

**更新时间**: 2025-02-08
**作者**: 后端开发工程师（丁）