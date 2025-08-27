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