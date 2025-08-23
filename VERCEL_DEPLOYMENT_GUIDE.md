# 🚀 Vercel 部署指南

## 📋 部署前准备

### 1. 必需的外部服务

由于 Vercel 是无服务器环境，您需要配置以下外部服务来替代文件存储：

#### 选项 A：Supabase（推荐 - 免费套餐足够）
- **用途**：存储付费意愿数据
- **免费额度**：500MB 数据库，无限 API 请求
- **注册**：https://supabase.com

#### 选项 B：MongoDB Atlas（备选）
- **用途**：存储付费意愿数据
- **免费额度**：512MB 存储
- **注册**：https://www.mongodb.com/atlas

#### 选项 C：Vercel KV（简单但有限制）
- **用途**：轻量级键值存储
- **免费额度**：30,000 请求/月
- **启用**：在 Vercel 项目中直接启用

### 2. 可选服务（增强功能）

#### EmailJS（邮件通知）
- **用途**：发送付费意愿通知到 310842705@qq.com
- **免费额度**：200 封邮件/月
- **注册**：https://www.emailjs.com

#### Google Analytics（数据分析）
- **用途**：追踪用户行为
- **免费**：完全免费
- **注册**：https://analytics.google.com

## 🔧 配置步骤

### Step 1: 准备数据库（选择一个）

#### 使用 Supabase（推荐）
```sql
-- 在 Supabase SQL 编辑器中运行
CREATE TABLE payment_intents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_name TEXT NOT NULL,
  amount TEXT NOT NULL,
  user_email TEXT,
  user_agent TEXT,
  ip_address TEXT,
  feedback TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_payment_intents_created_at ON payment_intents(created_at);
CREATE INDEX idx_payment_intents_session_id ON payment_intents(session_id);
```

#### 使用 Vercel KV（最简单）
```bash
# 在 Vercel 项目设置中启用 KV Storage
# 自动获得 KV_URL 等环境变量
```

### Step 2: 修改代码适配 Vercel

创建新文件 `/lib/payment-intent-vercel.ts`：

```typescript
import { kv } from '@vercel/kv';

export async function savePaymentIntent(data: any) {
  const id = crypto.randomUUID();
  const key = `payment_intent:${id}`;
  
  // 保存到 Vercel KV
  await kv.set(key, {
    ...data,
    id,
    createdAt: new Date().toISOString()
  });
  
  // 设置过期时间（365天）
  await kv.expire(key, 365 * 24 * 60 * 60);
  
  return id;
}

export async function getPaymentIntents() {
  const keys = await kv.keys('payment_intent:*');
  const intents = [];
  
  for (const key of keys) {
    const data = await kv.get(key);
    if (data) intents.push(data);
  }
  
  return intents;
}
```

### Step 3: 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

```env
# 基础配置
NEXT_PUBLIC_WEB_URL=https://your-domain.vercel.app
NODE_ENV=production

# 数据存储（选择一个）
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# 或 MongoDB
MONGODB_URI=mongodb+srv://...

# 或 Vercel KV（自动提供）
# KV_URL=...
# KV_REST_API_URL=...
# KV_REST_API_TOKEN=...
# KV_REST_API_READ_ONLY_TOKEN=...

# EmailJS（可选）
EMAILJS_SERVICE_ID=service_xxxxx
EMAILJS_TEMPLATE_ID=template_xxxxx
EMAILJS_PUBLIC_KEY=xxxxx

# Google Analytics（可选）
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# A/B 测试（可选）
AB_TESTING_ENABLED=true
```

### Step 4: 更新 API 路由

修改 `/app/api/payment-intent/route.ts`：

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // 检测环境
  const isVercel = process.env.VERCEL === '1';
  
  if (isVercel) {
    // 使用 Vercel KV 或其他云存储
    if (process.env.KV_URL) {
      // Vercel KV
      const { savePaymentIntent } = await import('@/lib/payment-intent-vercel');
      const id = await savePaymentIntent(body);
      return NextResponse.json({ success: true, id });
    } else if (process.env.SUPABASE_URL) {
      // Supabase
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY!
      );
      const { data, error } = await supabase
        .from('payment_intents')
        .insert(body);
      return NextResponse.json({ success: !error, data });
    }
  } else {
    // 本地开发使用文件系统
    const { PaymentIntentStorage } = await import('@/lib/payment-intent-storage');
    // ... 现有代码
  }
}
```

## 📦 部署步骤

### 1. 安装 Vercel CLI
```bash
npm i -g vercel
```

### 2. 登录 Vercel
```bash
vercel login
```

### 3. 部署项目
```bash
# 首次部署
vercel

# 后续更新
vercel --prod
```

### 4. 配置域名（可选）
在 Vercel 控制台：
1. 进入项目设置
2. 点击 "Domains"
3. 添加自定义域名

## 🎯 推荐配置（最简单方案）

### 最小化配置（免费且简单）：

1. **使用 Vercel KV** 存储数据
   - 在 Vercel 项目中一键启用
   - 无需额外注册
   - 自动配置环境变量

2. **暂时跳过 EmailJS**
   - 通过 Vercel 控制台查看日志
   - 或通过 API 端点查询数据

3. **部署命令**：
```bash
vercel --prod
```

### 生产环境配置（推荐）：

1. **Supabase** 作为数据库
2. **EmailJS** 发送通知
3. **Google Analytics** 追踪
4. **自定义域名**

## 🔍 部署后验证

### 1. 检查功能
- 访问主页：`https://your-app.vercel.app`
- 测试付费按钮
- 查看 Vercel 函数日志

### 2. 监控数据
- Vercel Dashboard → Functions → Logs
- 查看 API 调用记录
- 检查错误日志

### 3. 数据查询
创建查询端点 `/api/payment-intent/list`：
```typescript
export async function GET() {
  // 从 KV 或数据库读取数据
  const intents = await getPaymentIntents();
  return NextResponse.json(intents);
}
```

## ⚠️ 注意事项

1. **文件存储不可用**
   - Vercel 是无服务器环境
   - 必须使用外部存储服务

2. **环境变量**
   - 生产环境变量在 Vercel 控制台设置
   - 不要提交 `.env.local` 到 Git

3. **API 限制**
   - 免费版有 10 秒执行时间限制
   - 注意优化 API 性能

4. **日志查看**
   - 使用 Vercel Dashboard 查看
   - 或使用 `vercel logs` 命令

## 🆘 故障排除

### 问题：部署失败
```bash
# 清理缓存重新部署
rm -rf .next
vercel --force
```

### 问题：环境变量未生效
- 在 Vercel 控制台检查环境变量
- 确保变量名正确
- 重新部署：`vercel --prod --force`

### 问题：API 超时
- 优化数据库查询
- 使用缓存
- 考虑升级到 Pro 版（60秒超时）

## 📞 支持

如有问题，请联系：310842705@qq.com

---

*最简单的部署方案：使用 Vercel KV，5分钟完成部署！*