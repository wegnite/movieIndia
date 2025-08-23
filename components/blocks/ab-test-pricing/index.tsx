"use client";

import { Check, Loader, Clock, TrendingUp, Zap } from "lucide-react";
import { PricingItem, Pricing as PricingType } from "@/types/blocks/pricing";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Icon from "@/components/icon";
import { Label } from "@/components/ui/label";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { useAppContext } from "@/contexts/app";
import { generatePricingFromVariant, PricingVariantConfig } from "@/services/pricing-variants";

interface ABTestPricingProps {
  fallbackPricing: PricingType;
  sessionId: string;
  userId?: number;
}

interface VariantAssignment {
  experiment_id: number;
  experiment_name: string;
  variant_id: number;
  variant_name: string;
  config: PricingVariantConfig;
  assignment_id: number;
}

export default function ABTestPricing({ 
  fallbackPricing, 
  sessionId, 
  userId 
}: ABTestPricingProps) {
  const { user, setShowSignModal } = useAppContext();
  const [pricing, setPricing] = useState<PricingType>(fallbackPricing);
  const [assignment, setAssignment] = useState<VariantAssignment | null>(null);
  const [group, setGroup] = useState(fallbackPricing.groups?.[0]?.name);
  const [isLoading, setIsLoading] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isABTestLoading, setIsABTestLoading] = useState(true);

  // Initialize A/B testing
  useEffect(() => {
    const initializeABTest = async () => {
      try {
        const response = await fetch("/api/ab-test/assign", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            experiment_name: "pricing_strategy_2025",
            session_id: sessionId,
            user_id: userId,
          }),
        });

        const data = await response.json();
        
        if (data.code === 0 && data.data.assigned) {
          const assignmentData = data.data.assignment;
          setAssignment(assignmentData);
          
          // Generate pricing based on variant config
          const variantPricing = generatePricingFromVariant(assignmentData.config, "en");
          setPricing(variantPricing);
          
          // Setup countdown for time-limited variants
          if (assignmentData.config.type === "time_limited" && assignmentData.config.countdown_hours) {
            setTimeRemaining(assignmentData.config.countdown_hours * 60 * 60); // Convert to seconds
          }
        }
      } catch (error) {
        console.error("A/B test initialization failed:", error);
        // Use fallback pricing on error
      } finally {
        setIsABTestLoading(false);
      }
    };

    initializeABTest();
  }, [sessionId, userId]);

  // Countdown timer for time-limited variants
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Track events
  const trackEvent = async (eventType: "click" | "conversion" | "purchase", eventData?: any, value?: number) => {
    if (!assignment) return;

    try {
      await fetch("/api/ab-test/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignment_id: assignment.assignment_id,
          event_type: eventType,
          event_data: eventData,
          value,
        }),
      });
    } catch (error) {
      console.error("Event tracking failed:", error);
    }
  };

  useEffect(() => {
    if (pricing.items) {
      setGroup(pricing.items[0].group);
      setProductId(pricing.items[0].product_id);
      setIsLoading(false);
    }
  }, [pricing.items]);

  const handleCheckout = async (item: PricingItem, cn_pay: boolean = false) => {
    try {
      if (!user) {
        setShowSignModal(true);
        return;
      }

      // Track click event
      await trackEvent("click", { 
        product_id: item.product_id, 
        variant_type: assignment?.config.type,
        cn_pay 
      });

      const params = {
        product_id: item.product_id,
        product_name: item.product_name,
        credits: item.credits,
        interval: item.interval,
        amount: cn_pay ? item.cn_amount : item.amount,
        currency: cn_pay ? "cny" : item.currency,
        valid_months: item.valid_months,
        // Include A/B test context
        ab_test_context: assignment ? {
          experiment_id: assignment.experiment_id,
          variant_id: assignment.variant_id,
          assignment_id: assignment.assignment_id,
        } : null,
      };

      setIsLoading(true);
      setProductId(item.product_id);

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (response.status === 401) {
        setIsLoading(false);
        setProductId(null);
        setShowSignModal(true);
        return;
      }

      const { code, message, data } = await response.json();
      if (code !== 0) {
        toast.error(message);
        return;
      }

      // Track conversion event
      await trackEvent("conversion", { 
        product_id: item.product_id,
        amount: params.amount,
        currency: params.currency,
      });

      const { public_key, session_id } = data;
      const stripe = await loadStripe(public_key);
      if (!stripe) {
        toast.error("checkout failed");
        return;
      }

      const result = await stripe.redirectToCheckout({
        sessionId: session_id,
      });

      if (result.error) {
        toast.error(result.error.message);
      }
    } catch (e) {
      console.log("checkout failed: ", e);
      toast.error("checkout failed");
    } finally {
      setIsLoading(false);
      setProductId(null);
    }
  };

  // Format countdown display
  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  // Get variant-specific styling
  const getVariantStyling = () => {
    if (!assignment) return {};

    switch (assignment.config.type) {
      case "lower":
        return {
          headerBg: "bg-green-50 dark:bg-green-950",
          headerText: "text-green-700 dark:text-green-300",
          accentColor: "border-green-500",
          badgeColor: "bg-green-500",
        };
      case "bundle":
        return {
          headerBg: "bg-purple-50 dark:bg-purple-950",
          headerText: "text-purple-700 dark:text-purple-300",
          accentColor: "border-purple-500",
          badgeColor: "bg-purple-500",
        };
      case "time_limited":
        return {
          headerBg: "bg-red-50 dark:bg-red-950",
          headerText: "text-red-700 dark:text-red-300",
          accentColor: "border-red-500",
          badgeColor: "bg-red-500",
        };
      default:
        return {
          headerBg: "bg-blue-50 dark:bg-blue-950",
          headerText: "text-blue-700 dark:text-blue-300",
          accentColor: "border-blue-500",
          badgeColor: "bg-blue-500",
        };
    }
  };

  if (isABTestLoading) {
    return (
      <section id="pricing" className="py-16">
        <div className="container">
          <div className="mx-auto mb-12 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (pricing.disabled) {
    return null;
  }

  const styling = getVariantStyling();

  return (
    <section id={pricing.name} className="py-16">
      <div className="container">
        {/* Variant-specific header */}
        {assignment && assignment.config.type !== "original" && (
          <div className={`${styling.headerBg} rounded-lg p-4 mb-8 border-l-4 ${styling.accentColor}`}>
            <div className="flex items-center gap-2 mb-2">
              {assignment.config.type === "time_limited" && <Clock className="w-5 h-5" />}
              {assignment.config.type === "bundle" && <TrendingUp className="w-5 h-5" />}
              {assignment.config.type === "lower" && <Zap className="w-5 h-5" />}
              <h3 className={`font-semibold ${styling.headerText}`}>
                {assignment.config.type === "time_limited" && "🔥 Flash Sale Active!"}
                {assignment.config.type === "bundle" && "💎 Best Value Bundle"}
                {assignment.config.type === "lower" && "⚡ Special Discount"}
              </h3>
            </div>
            
            {assignment.config.type === "time_limited" && timeRemaining !== null && timeRemaining > 0 && (
              <div className="flex items-center gap-2">
                <span className={styling.headerText}>Time remaining:</span>
                <span className={`font-mono font-bold ${styling.headerText}`}>
                  {formatCountdown(timeRemaining)}
                </span>
              </div>
            )}
            
            {assignment.config.type === "bundle" && (
              <p className={styling.headerText}>
                All formats at the same price - Save up to {assignment.config.bundle_savings}%!
              </p>
            )}
          </div>
        )}

        <div className="mx-auto mb-12 text-center">
          <h2 className="mb-4 text-4xl font-semibold lg:text-5xl">
            {pricing.title}
          </h2>
          <p className="text-muted-foreground lg:text-lg">
            {pricing.description}
          </p>
        </div>

        <div className="w-full flex flex-col items-center gap-2">
          {pricing.groups && pricing.groups.length > 0 && (
            <div className="flex h-12 mb-12 items-center rounded-md bg-muted p-1 text-lg">
              <RadioGroup
                value={group}
                className={`h-full grid-cols-${pricing.groups.length}`}
                onValueChange={(value) => {
                  setGroup(value);
                }}
              >
                {pricing.groups.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className='h-full rounded-md transition-all has-[button[data-state="checked"]]:bg-white'
                    >
                      <RadioGroupItem
                        value={item.name || ""}
                        id={item.name}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={item.name}
                        className="flex h-full cursor-pointer items-center justify-center px-7 font-semibold text-muted-foreground peer-data-[state=checked]:text-primary"
                      >
                        {item.title}
                        {item.label && (
                          <Badge
                            variant="outline"
                            className="border-primary bg-primary px-1.5 ml-1 text-primary-foreground"
                          >
                            {item.label}
                          </Badge>
                        )}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          )}

          <div
            className={`w-full mt-0 grid gap-6 md:grid-cols-${
              pricing.items?.filter(
                (item) => !item.group || item.group === group
              )?.length
            }`}
          >
            {pricing.items?.map((item, index) => {
              if (item.group && item.group !== group) {
                return null;
              }

              const isUrgent = assignment?.config.type === "time_limited" && timeRemaining !== null && timeRemaining < 3600; // Less than 1 hour

              return (
                <div
                  key={index}
                  className={`rounded-lg p-6 transition-all ${
                    item.is_featured
                      ? `border-primary border-2 bg-card text-card-foreground ${
                          isUrgent ? "animate-pulse" : ""
                        }`
                      : "border-muted border hover:border-primary/50"
                  }`}
                >
                  <div className="flex h-full flex-col justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        {item.title && (
                          <h3 className="text-xl font-semibold">
                            {item.title}
                          </h3>
                        )}
                        <div className="flex-1"></div>
                        {item.label && (
                          <Badge
                            variant="outline"
                            className={`border-primary px-1.5 text-primary-foreground ${styling.badgeColor}`}
                          >
                            {item.label}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-end gap-2 mb-4">
                        {item.original_price && (
                          <span className="text-xl text-muted-foreground font-semibold line-through">
                            {item.original_price}
                          </span>
                        )}
                        {item.price && (
                          <span className="text-5xl font-semibold">
                            {item.price}
                          </span>
                        )}
                        {item.unit && (
                          <span className="block font-semibold">
                            {item.unit}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                      {item.features_title && (
                        <p className="mb-3 mt-6 font-semibold">
                          {item.features_title}
                        </p>
                      )}
                      {item.features && (
                        <ul className="flex flex-col gap-3">
                          {item.features.map((feature, fi) => {
                            return (
                              <li className="flex gap-2" key={`feature-${fi}`}>
                                <Check className="mt-1 size-4 shrink-0" />
                                {feature}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {item.cn_amount && item.cn_amount > 0 ? (
                        <div className="flex items-center gap-x-2 mt-2">
                          <span className="text-sm">人民币支付 👉</span>
                          <div
                            className="inline-block p-2 hover:cursor-pointer hover:bg-base-200 rounded-md"
                            onClick={() => {
                              if (isLoading) {
                                return;
                              }
                              handleCheckout(item, true);
                            }}
                          >
                            <img
                              src="/imgs/cnpay.png"
                              alt="cnpay"
                              className="w-20 h-10 rounded-lg"
                            />
                          </div>
                        </div>
                      ) : null}
                      {item.button && (
                        <Button
                          className={`w-full flex items-center justify-center gap-2 font-semibold ${
                            isUrgent ? "bg-red-600 hover:bg-red-700 animate-pulse" : ""
                          }`}
                          disabled={isLoading}
                          onClick={() => {
                            if (isLoading) {
                              return;
                            }
                            handleCheckout(item);
                          }}
                        >
                          {(!isLoading ||
                            (isLoading && productId !== item.product_id)) && (
                            <p>{item.button.title}</p>
                          )}

                          {isLoading && productId === item.product_id && (
                            <p>{item.button.title}</p>
                          )}
                          {isLoading && productId === item.product_id && (
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          {item.button.icon && (
                            <Icon name={item.button.icon} className="size-4" />
                          )}
                        </Button>
                      )}
                      {item.tip && (
                        <p className={`text-sm mt-2 ${
                          isUrgent ? "text-red-600 font-semibold animate-pulse" : "text-muted-foreground"
                        }`}>
                          {item.tip}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}