import Pricing from "@/components/blocks/pricing";
import ABTestPricing from "@/components/blocks/ab-test-pricing";
import { getPricingPage } from "@/services/page";
import { isABTestingEnabled, getFeatureFlag } from "@/services/ab-test";
import { getSessionIdFromHeaders } from "@/lib/ab-test-middleware";
import { auth } from "@/auth";
import { headers } from "next/headers";
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
  
  // Get session info for A/B testing
  const session = await auth();
  const headersList = await headers();
  const sessionId = getSessionIdFromHeaders(headersList);
  
  // Check if A/B testing is enabled
  const isABTestEnabled = await isABTestingEnabled();
  const pricingExperimentFlag = await getFeatureFlag("pricing_experiment_enabled");
  
  const shouldUseABTest = isABTestEnabled && pricingExperimentFlag?.enabled;

  if (shouldUseABTest && page.pricing) {
    return (
      <ABTestPricing 
        fallbackPricing={page.pricing}
        sessionId={sessionId}
        userId={session?.user?.id}
      />
    );
  }

  return <>{page.pricing && <Pricing pricing={page.pricing} />}</>;
}
