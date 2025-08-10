import Pricing from "@/components/blocks/pricing";
import { getPricingPage } from "@/services/page";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = locale === "en" 
    ? "https://mahavatar-narsimha.com/en/pricing"
    : "https://mahavatar-narsimha.com/zh/pricing";
    
  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://mahavatar-narsimha.com/en/pricing',
        'zh': 'https://mahavatar-narsimha.com/zh/pricing',
      }
    }
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getPricingPage(locale);

  return <>{page.pricing && <Pricing pricing={page.pricing} />}</>;
}
