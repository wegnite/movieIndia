import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function RedirectPage() {
  // 获取用户语言偏好（Next.js 15 中 headers() 是异步的）
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  const isChinesePreferred = acceptLanguage.toLowerCase().includes('zh')
  const locale = isChinesePreferred ? 'zh' : 'en'
  
  // 重定向到带语言前缀的路径
  redirect(`/${locale}/posts`)
}