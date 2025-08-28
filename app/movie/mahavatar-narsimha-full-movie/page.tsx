import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Mahavatar Narsimha Full Movie',
    alternates: {
      canonical: 'https://mahavatar-narsimha.com/en/movie/mahavatar-narsimha-full-movie'
    },
    robots: {
      index: false,
      follow: false
    }
  }
}

export default async function RedirectPage() {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  const locale = acceptLanguage.toLowerCase().includes('zh') ? 'zh' : 'en'
  
  redirect(`/${locale}/movie/mahavatar-narsimha-full-movie`)
}