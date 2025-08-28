import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

// 添加canonical标签防止重复内容
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Watch Mahavatar Narsimha Full Movie',
    alternates: {
      canonical: 'https://mahavatar-narsimha.com/en/movie/mahavatar-narsimha-full-movie'
    },
    robots: {
      index: false,
      follow: false
    }
  }
}

// 重定向到带语言前缀的页面
export default async function RedirectPage() {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  const locale = acceptLanguage.toLowerCase().includes('zh') ? 'zh' : 'en'
  
  redirect(`/${locale}/watch/mahavatar-narsimha-full-movie`)
}