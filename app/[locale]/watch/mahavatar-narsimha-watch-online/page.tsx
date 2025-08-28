import { redirect } from 'next/navigation'

// 重定向页面 - 避免404错误
export default function RedirectPage({ params }: { params: { locale: string } }) {
  // 重定向到正确的页面
  redirect(`/${params.locale}/watch/mahavatar-narsimha-online`)
}