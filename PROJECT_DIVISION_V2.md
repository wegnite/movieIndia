# Mahavatar Narsimha 门户网站项目分工文档 V2.0
## 基于ShipAny模板快速开发

## 项目基本信息
- **项目名称**: Mahavatar Narsimha 电影门户网站
- **版本**: v2.0.0
- **更新日期**: 2025-08-07
- **项目说明**: 基于ShipAny模板快速搭建印度史诗动画电影《Mahavatar Narsimha》门户网站
- **开发周期**: 4小时极简版 → 24小时MVP → 3天完整版

---

## 🚀 极简版本（4小时快速上线测试流量）

### 极简版目标
- **核心目的**: 快速上线测试市场反应和流量潜力
- **上线时间**: 4小时内
- **功能范围**: 仅包含信息展示和数据收集
- **技术选型**: 最简单的ShipAny配置 + 静态内容

### 极简版功能清单
1. **单页落地页**
   - Hero Section（电影海报+标题）
   - 电影基本信息（爬取的数据）
   - 新闻聚合展示（10条最新消息）
   - 邮件订阅表单
   - 简单的Footer

2. **数据来源**
   - 通过爬虫获取的公开信息
   - IMDb/Wikipedia数据
   - YouTube预告片嵌入
   - 社交媒体动态聚合

3. **分析工具**
   - Google Analytics
   - 热力图追踪
   - 访问来源分析

### 极简版任务分配（4小时并行）

#### 第1小时：环境搭建（全员）
| 成员 | 任务 | 交付物 |
|------|------|--------|
| 甲-产品 | 爬取和整理Mahavatar Narsimha所有公开信息 | `data/movie-info.json` |
| 乙-全栈 | Fork ShipAny，极简配置，部署到Vercel | 可访问的URL |
| 丙-前端 | 创建单页模板结构 | `app/page.tsx` |
| 丁-后端 | 配置Supabase存储爬取数据 | 数据库表ready |
| 戊-设计 | 快速设计Hero Banner | 1张主视觉图 |
| 己-运维 | 配置域名和Analytics | GA追踪代码 |

#### 第2-3小时：内容填充（分工协作）
| 成员组合 | 任务 | 输出 |
|----------|------|------|
| 甲+丁 | 爬虫脚本开发，获取最新新闻和数据 | 自动更新的数据源 |
| 乙+丙 | 实现单页所有区块，数据绑定 | 完整的落地页 |
| 戊+己 | 优化加载速度，配置CDN | PageSpeed>90 |

#### 第4小时：上线发布（全员）
- 15分钟：最终检查
- 15分钟：部署上线
- 15分钟：分享到社交媒体
- 15分钟：监控数据

### 极简版代码结构
```
mahavatar-极简/
├── app/
│   └── page.tsx          # 单页应用
├── components/
│   ├── HeroSection.tsx   # 英雄区域
│   ├── NewsFeeds.tsx     # 新闻聚合
│   └── Subscribe.tsx     # 订阅表单
├── data/
│   └── crawler.js        # 爬虫脚本
├── public/
│   └── hero.webp        # 主视觉
└── lib/
    └── analytics.ts     # 分析代码
```

### 极简版爬虫数据源
```javascript
// data/crawler.js
const sources = {
  imdb: 'https://www.imdb.com/title/tt28507139/',
  wikipedia: 'https://en.wikipedia.org/wiki/Mahavatar_Narsimha',
  youtube: 'https://www.youtube.com/results?search_query=mahavatar+narsimha',
  twitter: 'https://twitter.com/search?q=mahavatar%20narsimha',
  googleNews: 'https://news.google.com/search?q=mahavatar+narsimha'
}

// 爬取内容
- 电影基本信息（导演、演员、上映日期）
- 剧情简介
- 最新预告片
- 相关新闻（标题+链接）
- 社交媒体讨论热度
```

### 极简版快速启动
```bash
# 1. 快速克隆模板
git clone --depth=1 https://github.com/shipany/shipany-template.git mahavatar-simple
cd mahavatar-simple

# 2. 删除不需要的功能
rm -rf app/admin app/api/auth app/api/payment
rm -rf components/admin components/payment

# 3. 安装最少依赖
pnpm install

# 4. 配置最简.env
echo "NEXT_PUBLIC_GA_ID=G-XXXXXX" > .env.local

# 5. 运行爬虫
node data/crawler.js

# 6. 启动开发
pnpm dev

# 7. 一键部署
vercel --prod
```

### 极简版成功指标
- [ ] 4小时内上线
- [ ] 首页加载<2秒
- [ ] 移动端完美适配
- [ ] GA正常追踪
- [ ] 获得首批100个访问

### 流量测试计划
1. **发布渠道**
   - Reddit (r/indiancinema, r/animation)
   - Twitter/X (相关话题标签)
   - Facebook Groups
   - Discord服务器
   - 电影论坛

2. **数据收集**
   - 访问量和来源
   - 页面停留时间
   - 邮件订阅转化率
   - 地理位置分布
   - 设备类型分析

3. **迭代方向**（基于4小时版本的数据）
   - 高流量 → 继续开发完整版
   - 低流量 → 调整定位或内容策略
   - 特定地区高 → 针对性优化

---

## 技术栈说明（基于ShipAny）
### 已有基础设施
- **框架基础**: Next.js 14 + TypeScript + Tailwind CSS + Shadcn/UI
- **数据库**: Supabase（替代MongoDB）
- **认证系统**: next-auth（Google/Github登录）
- **支付系统**: Stripe（已集成）
- **多语言**: next-intl（i18n）
- **数据统计**: Google Analytics + OpenPanel
- **部署**: Vercel/Cloudflare

### 需要定制开发
- 电影相关页面组件
- 角色展示系统
- 票房数据展示
- 影评系统
- 新闻发布系统

## 团队成员分工（6人团队）

| 编号 | 成员代号 | 职责角色 | 英文角色 |
|------|----------|----------|----------|
| 1 | **甲** | 产品经理 | Product Manager |
| 2 | **乙** | 全栈开发主管 | Full-Stack Lead |
| 3 | **丙** | 前端开发工程师 | Frontend Developer |
| 4 | **丁** | 后端开发工程师 | Backend Developer |
| 5 | **戊** | UI/UX设计师 | UI/UX Designer |
| 6 | **己** | 测试与运维工程师 | QA & DevOps Engineer |

## 并行工作流程设计

### 第一阶段（0-4小时）- 基础搭建【所有人并行】

#### 🎯 甲 - 产品经理
**任务清单**：
- [ ] 基于ShipAny功能梳理产品需求文档
- [ ] 制定用户旅程图和功能优先级
- [ ] 创建Supabase数据表结构设计
- [ ] 编写产品功能说明书
- [ ] 设置项目管理看板（Trello/Notion）
- [ ] 准备测试用例文档

**交付物**：
- `docs/PRD.md` - 产品需求文档
- `docs/user-journey.md` - 用户旅程图
- `docs/database-schema.sql` - 数据库设计
- Trello看板链接

#### 🎯 乙 - 全栈开发主管
**任务清单**：
- [ ] Fork ShipAny模板并初始化项目
- [ ] 配置开发环境（.env文件）
- [ ] 连接Supabase数据库
- [ ] 配置Stripe支付（电影周边商品）
- [ ] 设置next-auth认证
- [ ] 创建基础API路由结构

**交付物**：
- 可运行的项目基础框架
- `.env.local` - 环境配置
- `app/api/` - API基础结构
- `lib/supabase.ts` - 数据库连接

#### 🎯 丙 - 前端开发工程师
**任务清单**：
- [ ] 基于ShipAny组件库创建电影主题组件
- [ ] 开发首页Hero Section（使用现有组件）
- [ ] 创建导航栏（基于ShipAny导航组件）
- [ ] 实现响应式布局框架
- [ ] 配置主题色彩（基于电影风格）

**交付物**：
- `components/movie/` - 电影相关组件
- `app/page.tsx` - 定制化首页
- `styles/theme.css` - 主题样式

#### 🎯 丁 - 后端开发工程师
**任务清单**：
- [ ] 在Supabase创建数据表（movies, characters, news, reviews）
- [ ] 编写数据模型Types定义
- [ ] 创建CRUD操作函数
- [ ] 实现实时数据订阅（票房更新）
- [ ] 配置Row Level Security规则

**交付物**：
- `types/database.ts` - 类型定义
- `lib/database/` - 数据库操作函数
- Supabase表结构截图

#### 🎯 戊 - UI/UX设计师
**任务清单**：
- [ ] 设计Logo和品牌视觉系统
- [ ] 制作3张Hero Banner设计稿
- [ ] 设计8个角色卡片UI
- [ ] 创建票房数据可视化设计
- [ ] 准备所有图片素材（WebP格式）
- [ ] 设计移动端适配方案

**交付物**：
- `public/images/` - 所有图片素材
- `design/figma-link.md` - Figma设计链接
- `design/style-guide.md` - 设计规范文档

#### 🎯 己 - 测试与运维工程师
**任务清单**：
- [ ] 配置CI/CD Pipeline（Github Actions）
- [ ] 设置Vercel项目
- [ ] 配置域名和SSL
- [ ] 安装监控工具（Sentry）
- [ ] 准备自动化测试框架
- [ ] 编写部署文档

**交付物**：
- `.github/workflows/` - CI/CD配置
- `vercel.json` - 部署配置
- `tests/` - 测试框架
- `docs/deployment.md` - 部署文档

---

### 第二阶段（4-12小时）- 功能开发【分模块并行】

#### 🎯 甲 - 产品经理
**任务清单**：
- [ ] 收集和整理20篇电影新闻
- [ ] 编写8个角色的详细介绍
- [ ] 准备10篇专业影评内容
- [ ] 创建用户测试计划
- [ ] 协调团队进度
- [ ] 准备营销文案

**交付物**：
- `content/news/` - 新闻内容
- `content/characters/` - 角色资料
- `content/reviews/` - 影评内容

#### 🎯 乙 - 全栈开发主管
**任务清单**：
- [ ] 实现用户会员系统（基于ShipAny）
- [ ] 开发管理后台（使用ShipAny Admin）
- [ ] 集成AI功能（评论情感分析）
- [ ] 实现搜索功能
- [ ] 配置缓存策略

**交付物**：
- `app/admin/` - 管理后台
- `app/api/ai/` - AI接口
- `lib/cache.ts` - 缓存配置

#### 🎯 丙 - 前端开发工程师
**任务清单**：
- [ ] 开发角色展示页面
- [ ] 实现票房数据可视化（Chart.js）
- [ ] 创建新闻列表和详情页
- [ ] 开发影评系统界面
- [ ] 实现无限滚动加载

**交付物**：
- `app/characters/` - 角色页面
- `app/box-office/` - 票房页面
- `app/news/` - 新闻页面
- `app/reviews/` - 影评页面

#### 🎯 丁 - 后端开发工程师
**任务清单**：
- [ ] 实现评论系统API
- [ ] 开发票房数据同步服务
- [ ] 创建内容审核API
- [ ] 实现邮件通知服务
- [ ] 配置定时任务（数据更新）

**交付物**：
- `app/api/comments/` - 评论API
- `app/api/box-office/` - 票房API
- `lib/email.ts` - 邮件服务

#### 🎯 戊 - UI/UX设计师
**任务清单**：
- [ ] 优化页面加载动画
- [ ] 设计404/500错误页面
- [ ] 创建Loading骨架屏
- [ ] 设计社交分享卡片
- [ ] 制作宣传视频/GIF

**交付物**：
- `components/ui/skeleton/` - 骨架屏组件
- `app/error.tsx` - 错误页面
- `public/social/` - 社交媒体素材

#### 🎯 己 - 测试与运维工程师
**任务清单**：
- [ ] 执行功能测试
- [ ] 性能测试（Lighthouse）
- [ ] 安全测试（OWASP）
- [ ] 配置CDN（Cloudflare）
- [ ] 设置备份策略

**交付物**：
- `tests/e2e/` - E2E测试
- `docs/test-report.md` - 测试报告
- 性能优化报告

---

### 第三阶段（12-24小时）- 集成优化【协同工作】

#### 团队协同任务矩阵

| 时间段 | 甲+乙 | 丙+丁 | 戊+己 |
|--------|-------|-------|-------|
| 12-16h | 功能验收+Bug修复 | API集成+前后端联调 | UI优化+性能测试 |
| 16-20h | 内容上线+SEO优化 | 支付流程测试 | 部署准备+监控设置 |
| 20-24h | 最终验收 | 紧急修复 | 正式上线 |

---

## 并行工作同步机制

### 1. 代码同步策略
```
main
├── dev（开发主分支）
│   ├── feature/frontend-丙
│   ├── feature/backend-丁
│   ├── feature/admin-乙
│   └── feature/design-戊
```

### 2. 实时沟通机制
- **即时通讯**: Slack/Discord频道
  - #general - 全员公告
  - #frontend - 前端开发
  - #backend - 后端开发
  - #design - 设计协作
  - #testing - 测试反馈
- **每4小时站会**: 15分钟快速同步

### 3. 文档协作
- **Notion工作空间**: 实时文档编辑
- **Figma**: 设计稿实时预览
- **GitHub Issues**: 任务追踪

### 4. API契约先行
```typescript
// 第一小时内定义所有API接口
interface APIContract {
  // 新闻接口
  '/api/news': {
    GET: { params: NewsQuery; response: News[] }
    POST: { body: NewsCreate; response: News }
  }
  // 角色接口
  '/api/characters': {
    GET: { response: Character[] }
  }
  // ... 其他接口
}
```

---

## 关键时间节点检查清单

### T+4小时检查点
- [ ] ShipAny项目成功运行
- [ ] Supabase数据库连接成功
- [ ] 基础页面框架完成
- [ ] 设计稿完成50%
- [ ] API接口定义完成

### T+8小时检查点
- [ ] 核心功能开发完成60%
- [ ] 前后端接口联调开始
- [ ] 首批内容导入完成
- [ ] UI组件库完成

### T+12小时检查点
- [ ] 所有功能模块完成
- [ ] 集成测试开始
- [ ] 性能优化开始
- [ ] 内容全部就位

### T+16小时检查点
- [ ] Bug修复完成
- [ ] 性能测试通过
- [ ] 部署环境就绪
- [ ] 用户测试开始

### T+20小时检查点
- [ ] 最终测试完成
- [ ] 生产环境部署
- [ ] 监控系统就位
- [ ] 文档更新完成

### T+24小时检查点
- [ ] 网站正式上线
- [ ] 所有功能正常
- [ ] 性能指标达标
- [ ] 团队复盘会议

---

## 风险管理与应急预案

### 技术风险应对
| 风险 | 概率 | 影响 | 应对措施 | 负责人 |
|------|------|------|----------|--------|
| Supabase限额 | 低 | 高 | 准备PostgreSQL备用方案 | 丁 |
| Vercel部署失败 | 低 | 高 | Cloudflare Pages备用 | 己 |
| API延迟过高 | 中 | 中 | Redis缓存+CDN加速 | 乙 |
| 支付集成问题 | 低 | 低 | 暂时隐藏支付功能 | 乙 |

### 人员风险应对
- **主备负责制**: 每个模块设置主备负责人
- **知识共享**: 关键代码必须有注释
- **文档先行**: 先写文档再写代码

---

## 成功标准

### MVP版本（24小时）
- [ ] 网站可正常访问
- [ ] 首页+4个核心页面完成
- [ ] 移动端适配完成
- [ ] 基础功能可用
- [ ] 无重大Bug

### 完整版本（72小时）
- [ ] 所有功能模块完成
- [ ] 性能评分>85
- [ ] SEO优化完成
- [ ] 支付功能可用
- [ ] 多语言支持（中/英/印地语）

---

## 项目启动命令

```bash
# 1. 克隆ShipAny模板
git clone https://github.com/shipany/shipany-template.git mahavatar-narsimha
cd mahavatar-narsimha

# 2. 安装依赖
pnpm install

# 3. 配置环境变量
cp .env.example .env.local
# 编辑.env.local，添加:
# - Supabase凭证
# - Stripe密钥
# - OAuth凭证
# - Analytics ID

# 4. 初始化Supabase
pnpm supabase init
pnpm supabase db push

# 5. 启动开发服务器
pnpm dev

# 6. 构建生产版本
pnpm build

# 7. 部署到Vercel
vercel --prod
```

---

## 团队激励机制

### 里程碑奖励
- **4小时完成基础搭建**: 团队下午茶
- **12小时完成核心功能**: 团队晚餐
- **24小时成功上线**: 项目奖金
- **用户好评>4.5分**: 额外奖励

### 个人贡献认可
- **最佳代码质量**: 乙
- **最佳设计创意**: 戊
- **最佳协作精神**: 甲
- **最快Bug修复**: 己
- **最佳性能优化**: 丙/丁

---

**项目宣言**: "基于ShipAny，24小时创造奇迹！"
**更新时间**: 2025-08-07 20:30
**下次同步**: 2025-08-07 24:00（4小时后）