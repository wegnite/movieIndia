import { redirect } from 'next/navigation'

export default function ReviewsLegacyPage() {
  // Redirect to the main page with reviews section
  redirect('/en#reviews')
}