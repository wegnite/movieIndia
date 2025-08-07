# 🚀 Vercel部署指南 - Mahavatar Narsimha

## 方法1：通过Vercel网站部署（推荐）

1. **访问Vercel网站**
   - 打开 https://vercel.com
   - 登录您的账户

2. **导入GitHub仓库**
   - 点击 "New Project"
   - 选择 "Import Git Repository"
   - 搜索并选择 `wegnite/movieIndia`

3. **配置项目**
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `pnpm build`
   - **Output Directory**: 保持默认
   - **Install Command**: `pnpm install`

4. **环境变量**（可选）
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

5. **点击Deploy**

## 方法2：命令行部署

```bash
# 1. 安装Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel --prod
```

## 🔗 访问地址

部署成功后，您将获得以下地址：
- 生产环境: https://movie-india.vercel.app
- 预览环境: https://movie-india-*.vercel.app

## ⚠️ 注意事项

1. **区域限制已移除** - 免费版只能使用默认区域
2. **构建错误已修复** - 所有类型错误和路径问题已解决
3. **SEO优化已完成** - 包含所有目标关键词

## 📊 部署后检查

1. **访问主页** - 确认Mahavatar Narsimha内容显示
2. **检查SEO** - 查看页面源码确认meta标签
3. **测试响应式** - 移动端和桌面端显示
4. **检查重定向** - 测试SEO关键词URL重定向

## 🆘 故障排除

### 如果部署失败：
1. 检查 `pnpm build` 本地是否成功
2. 确认没有TypeScript错误
3. 检查环境变量配置

### 如果页面显示错误：
1. 清除浏览器缓存
2. 检查Console错误日志
3. 确认API路由正常

## 📞 支持

如需帮助：
- GitHub Issues: https://github.com/wegnite/movieIndia/issues
- Vercel文档: https://vercel.com/docs