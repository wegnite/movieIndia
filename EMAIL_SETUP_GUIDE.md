# 📧 邮件通知配置指南

您想要在 **310842705@qq.com** 收到用户付费意愿通知。

## 快速设置步骤

### 1️⃣ 注册 EmailJS（5分钟）

1. 访问 https://www.emailjs.com/
2. 点击 "Sign Up Free" 注册账号
3. 免费套餐每月可发送 200 封邮件

### 2️⃣ 创建邮件服务（3分钟）

1. 登录后，点击左侧 **Email Services**
2. 点击 **Add New Service**
3. 选择 **Gmail**（推荐）或其他服务
4. 按提示连接您的发送邮箱
5. 记下 **Service ID**（例如：`service_abc123`）

### 3️⃣ 创建邮件模板（3分钟）

1. 点击左侧 **Email Templates**
2. 点击 **Create New Template**
3. 填写模板：

**To Email（收件人）**: 
```
310842705@qq.com
```

**Subject（主题）**:
```
🎬 新的付费意愿 - {{plan_name}} - ₹{{amount}}
```

**Content（内容）**:
```
您好！

有用户对 Mahavatar Narsimha 表现出付费意愿：

📊 用户选择：
- 套餐：{{plan_name}}
- 价格：{{amount}}
- 时间：{{timestamp}}
- 用户邮箱：{{user_email}}
- IP地址：{{ip_address}}
- 设备信息：{{user_agent}}

这表明用户有兴趣付费观看！

---
自动通知系统
```

4. 保存并记下 **Template ID**（例如：`template_xyz789`）

### 4️⃣ 获取 API Key（1分钟）

1. 点击左侧 **Account**
2. 选择 **API Keys** 标签
3. 复制 **Public Key**（例如：`BPK_xxxxxxxx`）

### 5️⃣ 配置环境变量（2分钟）

编辑 `.env.local` 文件，填入您的值：

```env
EMAILJS_SERVICE_ID="service_abc123"
EMAILJS_TEMPLATE_ID="template_xyz789"
EMAILJS_PUBLIC_KEY="BPK_xxxxxxxx"
```

### 6️⃣ 重启服务器

```bash
# 按 Ctrl+C 停止当前服务器
# 然后重新启动
pnpm dev
```

## 📱 测试配置

访问测试页面：
```
http://localhost:3001/test-email-config
```

点击 "发送测试邮件" 按钮，检查是否收到邮件。

## ⚠️ 常见问题

### 没收到邮件？

1. **检查垃圾邮箱** - EmailJS 发的邮件可能被识别为垃圾邮件
2. **检查配置** - 确保三个环境变量都正确填写
3. **检查 EmailJS 控制台** - 登录 EmailJS 查看发送日志
4. **QQ邮箱设置** - 确保 QQ 邮箱允许接收外部邮件

### 配额限制

- 免费账号：每月 200 封邮件
- 付费账号：根据套餐不同，可发送更多

## 🎯 配置成功后

当用户点击播放按钮时，您将在 **310842705@qq.com** 收到：

- 用户选择的套餐
- 价格信息
- 用户设备信息
- 精确时间戳

这样您就能实时了解有多少印度用户对您的内容有付费意愿！

---

需要帮助？查看 EmailJS 官方文档：https://www.emailjs.com/docs/