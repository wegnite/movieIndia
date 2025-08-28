import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function RedirectPage() {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language') || ''
  const locale = acceptLanguage.toLowerCase().includes('zh') ? 'zh' : 'en'
  
  redirect(`/${locale}/movie/narasimha-2025`)
}