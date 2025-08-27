# 404错误快速修复指南

## 🚨 紧急修复步骤

### 第1步：备份当前sitemap
```bash
cp app/sitemap.ts app/sitemap.ts.backup
```

### 第2步：应用修复后的sitemap
```bash
# 将修复后的sitemap替换当前文件
cp docs/sitemap-fixed.ts app/sitemap.ts
```

### 第3步：创建必要的重定向页面

创建以下文件来处理无语言前缀的路径：

#### 1. 创建 `/posts` 重定向页面
```bash
mkdir -p app/posts
```

创建文件 `app/posts/page.tsx`：
```typescript
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default function RedirectPage() {
  // 获取用户语言偏好
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  const isChinesePreferred = acceptLanguage.toLowerCase().includes('zh')
  const locale = isChinesePreferred ? 'zh' : 'en'
  
  // 重定向到带语言前缀的路径
  redirect(`/${locale}/posts`)
}
```

#### 2. 创建 `/showcase` 重定向页面
```bash
mkdir -p app/showcase
```

创建文件 `app/showcase/page.tsx`：
```typescript
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default function RedirectPage() {
  const headersList = headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  const isChinesePreferred = acceptLanguage.toLowerCase().includes('zh')
  const locale = isChinesePreferred ? 'zh' : 'en'
  
  redirect(`/${locale}/showcase`)
}
```

### 第4步：更新middleware配置

编辑 `middleware.ts`，确保matcher配置正确：

```typescript
export const config = {
  matcher: [
    "/",
    "/(en|en-US|zh|zh-CN|zh-TW|zh-HK|zh-MO|ja|ko|ru|fr|de|ar|es|it)/:path*",
    // 移除对posts和showcase的排除
    "/((?!privacy-policy|terms-of-service|api/|_next|_vercel|sitemap.xml|robots.txt|site.webmanifest|favicon.ico|reviews|download|bookmyshow|watch-online|ott-release|news|cast|icon|.*\\..*).*)",
  ],
};
```

### 第5步：验证修复

1. **启动开发服务器**
```bash
pnpm dev
```

2. **手动测试关键路径**
访问以下URL确认它们工作正常：
- http://localhost:3000/posts → 应重定向到 /en/posts
- http://localhost:3000/showcase → 应重定向到 /en/showcase
- http://localhost:3000/en/posts → 应正常显示
- http://localhost:3000/zh/posts → 应正常显示

3. **运行自动验证脚本**（可选）
```bash
node docs/verify-routes.js
```

### 第6步：部署到生产环境

确认本地测试通过后：
```bash
git add .
git commit -m "fix: 修复sitemap配置和404错误"
git push
```

### 第7步：通知搜索引擎

部署完成后：
1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 提交新的sitemap: `https://mahavatar-narsimha.com/sitemap.xml`
3. 使用"URL检查"工具验证关键页面

## 🔍 验证清单

- [ ] `/posts` 重定向到 `/en/posts`
- [ ] `/showcase` 重定向到 `/en/showcase`
- [ ] 所有 `/en/*` 路径正常访问
- [ ] 所有 `/zh/*` 路径正常访问
- [ ] sitemap.xml 可以正常访问
- [ ] 根目录页面正常工作（/bookmyshow, /cast等）

## ⚠️ 注意事项

1. **根目录pricing冲突**
   - 当前有两个pricing页面：`/pricing` 和 `/[locale]/pricing`
   - 需要决定保留哪个或如何处理

2. **测试环境差异**
   - 本地环境可能与生产环境行为不同
   - 建议在staging环境进行完整测试

3. **缓存问题**
   - 部署后可能需要清除CDN缓存
   - Google可能需要时间重新爬取

## 📞 需要帮助？

如果遇到问题：
1. 检查 `docs/sitemap-404-analysis-report.md` 获取详细分析
2. 运行 `node docs/verify-routes.js` 进行自动诊断
3. 查看Next.js日志获取错误信息

## 🎯 长期建议

1. **建立CI/CD验证**
   - 在部署流程中加入路由验证
   - 自动检测404错误

2. **监控设置**
   - 配置404错误告警
   - 定期检查Search Console

3. **文档维护**
   - 更新路由时同步更新sitemap
   - 保持路由文档最新

---

*最后更新：2025-08-27*