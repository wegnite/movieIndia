import { PricingItem, Pricing } from "@/types/blocks/pricing";

export interface PricingVariantConfig {
  type: "original" | "lower" | "bundle" | "time_limited";
  standard_price: number;
  standard_original: number;
  premium_price: number;
  premium_original: number;
  imax_price: number;
  imax_original: number;
  bundle_savings?: number;
  countdown_hours?: number;
  urgency_text?: string;
  features?: string[];
}

/**
 * Generate pricing data based on A/B test variant configuration
 */
export function generatePricingFromVariant(
  config: PricingVariantConfig,
  locale: string = "en"
): Pricing {
  const baseFeatures = {
    standard: [
      "HD Quality Viewing",
      "5.1 Surround Sound",
      "Comfortable Seating",
      "Regular Screen Size",
      "Standard Refreshments Available",
      "Family Friendly Environment"
    ],
    premium: [
      "3D Viewing Experience",
      "Dolby Atmos Sound",
      "Premium Recliner Seats",
      "Large Format Screen",
      "Complimentary Popcorn",
      "Reserved Parking",
      "Priority Entry"
    ],
    imax: [
      "IMAX Laser Projection",
      "12-Channel Sound",
      "Luxury Lounge Seats",
      "Largest Screen Format",
      "Gourmet Refreshments",
      "Valet Parking",
      "Exclusive Merchandise"
    ]
  };

  let title = "Book Your Experience";
  let description = "Choose your preferred viewing experience for Mahavatar Narsimha.";

  switch (config.type) {
    case "lower":
      title = "Special Discount Pricing";
      description = "Limited time special pricing - Don't miss out on these amazing discounts!";
      break;
    case "bundle":
      title = "Best Value Bundle Pricing";
      description = `All formats at one price - Save up to ${config.bundle_savings}%!`;
      break;
    case "time_limited":
      title = config.urgency_text || "Flash Sale - Limited Time Only!";
      description = `Special pricing ends soon - Book now and save big!`;
      break;
  }

  const items: PricingItem[] = [];

  // Standard ticket
  items.push({
    title: "Standard",
    description: config.type === "bundle" ? "Same great experience at bundle price!" : 
                 config.type === "lower" ? "Enjoy the movie with special discount pricing." :
                 config.type === "time_limited" ? "Limited time special rate!" :
                 "Enjoy the movie in regular format.",
    features_title: "Includes",
    features: config.type === "bundle" ? 
              [...baseFeatures.standard, `Save ₹${config.standard_original - config.standard_price}!`] :
              config.type === "lower" ?
              [...baseFeatures.standard, "Special Discount Applied!"] :
              config.type === "time_limited" ?
              [...baseFeatures.standard, "Flash Sale Pricing!", `Save ₹${config.standard_original - config.standard_price}`] :
              baseFeatures.standard,
    interval: "per-ticket",
    amount: config.standard_price * 100, // Convert to cents
    cn_amount: config.standard_price * 53, // Rough INR to CNY conversion
    currency: "INR",
    price: `₹${config.standard_price}`,
    original_price: `₹${config.standard_original}`,
    unit: "INR",
    is_featured: false,
    tip: config.type === "bundle" ? "Same price for all!" :
         config.type === "lower" ? "Great savings!" :
         config.type === "time_limited" ? `Hurry! Only ${config.countdown_hours || 24} hours left!` :
         "Perfect for families!",
    button: {
      title: config.type === "time_limited" ? "Book Before It Ends!" : "Book Now",
      url: "https://www.bookmyshow.com",
      icon: "RiTicket2Fill"
    },
    product_id: "standard",
    product_name: "Standard Ticket",
    credits: 0,
    valid_months: 0
  });

  // Premium 3D ticket
  const isPremiumFeatured = config.type === "original";
  items.push({
    title: "Premium 3D",
    description: config.type === "bundle" ? "Premium experience at the same bundle price!" :
                 config.type === "lower" ? "Immersive 3D experience with special discount." :
                 config.type === "time_limited" ? "Premium 3D at flash sale price!" :
                 "Immersive 3D experience with stunning visuals.",
    label: config.type === "bundle" ? "Best Deal!" : 
           config.type === "lower" ? "Save Big!" :
           config.type === "time_limited" ? "Flash Sale!" :
           "Popular",
    features_title: "Everything in Standard, plus",
    features: config.type === "bundle" ?
              [...baseFeatures.premium, `Incredible ₹${config.premium_original - config.premium_price} savings!`] :
              config.type === "lower" ?
              [...baseFeatures.premium, "Amazing Discount Applied!"] :
              config.type === "time_limited" ?
              [...baseFeatures.premium, "Limited Time Only!", `Save ₹${config.premium_original - config.premium_price}`] :
              baseFeatures.premium,
    interval: "per-ticket",
    amount: config.premium_price * 100,
    cn_amount: config.premium_price * 53,
    currency: "INR",
    price: `₹${config.premium_price}`,
    original_price: `₹${config.premium_original}`,
    unit: "INR",
    is_featured: isPremiumFeatured,
    tip: config.type === "bundle" ? "Unbeatable value!" :
         config.type === "lower" ? "Most popular choice!" :
         config.type === "time_limited" ? `Act fast! ${config.countdown_hours || 24}hrs remaining!` :
         "Most immersive experience!",
    button: {
      title: config.type === "time_limited" ? "Grab This Deal!" :
             config.type === "bundle" ? "Book Bundle Deal" :
             "Book Premium",
      url: "https://www.bookmyshow.com",
      icon: "RiVipCrown2Fill"
    },
    product_id: "premium3d",
    product_name: "Premium 3D Ticket",
    credits: 0,
    valid_months: 0
  });

  // IMAX ticket
  items.push({
    title: "IMAX",
    description: config.type === "bundle" ? "Ultimate IMAX experience at bundle price - incredible value!" :
                 config.type === "lower" ? "Ultimate cinematic experience with special discount." :
                 config.type === "time_limited" ? "IMAX experience at unprecedented low price!" :
                 "Ultimate cinematic experience in IMAX.",
    features_title: "Everything in Premium, plus",
    features: config.type === "bundle" ?
              [...baseFeatures.imax, `Massive ₹${config.imax_original - config.imax_price} discount!`] :
              config.type === "lower" ?
              [...baseFeatures.imax, "Exclusive Discount Price!"] :
              config.type === "time_limited" ?
              [...baseFeatures.imax, "Flash Sale Special!", `Huge ₹${config.imax_original - config.imax_price} savings`] :
              baseFeatures.imax,
    interval: "per-ticket",
    amount: config.imax_price * 100,
    cn_amount: config.imax_price * 53,
    currency: "INR",
    price: `₹${config.imax_price}`,
    original_price: `₹${config.imax_original}`,
    unit: "INR",
    is_featured: config.type === "bundle",
    tip: config.type === "bundle" ? "Ultimate value!" :
         config.type === "lower" ? "Premium experience!" :
         config.type === "time_limited" ? `Don't wait! Only ${config.countdown_hours || 24}hrs left!` :
         "The divine experience!",
    button: {
      title: config.type === "time_limited" ? "Book Before Time Runs Out!" :
             config.type === "bundle" ? "Get Bundle Price" :
             "Book IMAX",
      url: "https://www.bookmyshow.com",
      icon: "RiMovie2Fill"
    },
    product_id: "imax",
    product_name: "IMAX Ticket",
    credits: 0,
    valid_months: 0
  });

  return {
    name: "pricing",
    title,
    description,
    items,
    groups: [],
  };
}

/**
 * Get pricing variant configurations
 */
export const PRICING_VARIANTS = {
  original_pricing: {
    type: "original" as const,
    standard_price: 120,
    standard_original: 150,
    premium_price: 250,
    premium_original: 300,
    imax_price: 450,
    imax_original: 500,
    features: ["Standard experience", "Regular pricing"]
  },
  
  lower_pricing: {
    type: "lower" as const,
    standard_price: 99,
    standard_original: 150,
    premium_price: 199,
    premium_original: 300,
    imax_price: 349,
    imax_original: 500,
    features: ["Special pricing", "30% discount offer"]
  },
  
  bundle_focus: {
    type: "bundle" as const,
    standard_price: 199,
    standard_original: 250,
    premium_price: 199,
    premium_original: 300,
    imax_price: 199,
    imax_original: 500,
    bundle_savings: 70,
    features: ["Same price for all formats", "Save up to 70%", "Best value bundle"]
  },
  
  time_limited: {
    type: "time_limited" as const,
    standard_price: 99,
    standard_original: 150,
    premium_price: 179,
    premium_original: 300,
    imax_price: 299,
    imax_original: 500,
    countdown_hours: 24,
    urgency_text: "Limited Time Offer - Ends in 24 Hours!",
    features: ["Flash sale pricing", "Limited time only", "Save big today"]
  }
};

/**
 * Calculate savings percentage
 */
export function calculateSavings(originalPrice: number, currentPrice: number): number {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Format countdown text
 */
export function formatCountdown(hours: number): string {
  if (hours <= 1) {
    return "Ends in less than 1 hour!";
  } else if (hours <= 24) {
    return `Ends in ${hours} hours!`;
  } else {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `Ends in ${days}d ${remainingHours}h!`;
  }
}