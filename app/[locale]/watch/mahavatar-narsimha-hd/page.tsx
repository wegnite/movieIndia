import { redirect } from 'next/navigation'

// 重定向到主观看页面 - 避免404错误
export default function RedirectPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/watch/mahavatar-narsimha-online`)
}