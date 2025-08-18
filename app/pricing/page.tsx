import { redirect } from 'next/navigation'

export default function PricingRootPage() {
  // Redirect to English pricing page as canonical
  redirect('/en/pricing')
}