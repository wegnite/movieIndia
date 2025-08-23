"use client";

import { useState, useEffect } from "react";
import { getClientSessionId } from "@/lib/ab-test-middleware";

interface ABTestAssignment {
  experiment_id: number;
  experiment_name: string;
  variant_id: number;
  variant_name: string;
  config: any;
  assignment_id: number;
}

/**
 * Hook to manage A/B test session and assignments on the client side
 */
export function useABTestSession(userId?: number) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<ABTestAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get or create session ID
    const id = getClientSessionId();
    setSessionId(id);

    // Fetch user assignments
    fetchAssignments(id, userId);
  }, [userId]);

  const fetchAssignments = async (sessionId: string, userId?: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/ab-test/user-experiments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          user_id: userId,
        }),
      });

      const data = await response.json();

      if (data.code === 0) {
        setAssignments(data.data.assignments || []);
      } else {
        setError(data.message || "Failed to fetch assignments");
      }
    } catch (err) {
      console.error("Error fetching A/B test assignments:", err);
      setError("Failed to fetch assignments");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get assignment for a specific experiment
   */
  const getAssignment = (experimentName: string): ABTestAssignment | null => {
    return assignments.find(a => a.experiment_name === experimentName) || null;
  };

  /**
   * Track an event for a specific assignment
   */
  const trackEvent = async (
    assignmentId: number,
    eventType: "view" | "click" | "conversion" | "purchase",
    eventData?: any,
    value?: number
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/ab-test/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assignment_id: assignmentId,
          event_type: eventType,
          event_data: eventData,
          value,
        }),
      });

      const data = await response.json();
      return data.code === 0;
    } catch (error) {
      console.error("Error tracking A/B test event:", error);
      return false;
    }
  };

  /**
   * Check if user is assigned to a specific experiment variant
   */
  const isInVariant = (experimentName: string, variantName: string): boolean => {
    const assignment = getAssignment(experimentName);
    return assignment?.variant_name === variantName;
  };

  /**
   * Get variant config for an experiment
   */
  const getVariantConfig = (experimentName: string): any => {
    const assignment = getAssignment(experimentName);
    return assignment?.config || null;
  };

  return {
    sessionId,
    assignments,
    loading,
    error,
    getAssignment,
    trackEvent,
    isInVariant,
    getVariantConfig,
    refetch: () => sessionId && fetchAssignments(sessionId, userId),
  };
}

/**
 * Hook specifically for pricing experiment
 */
export function usePricingExperiment(userId?: number) {
  const {
    sessionId,
    assignments,
    loading,
    error,
    getAssignment,
    trackEvent,
    isInVariant,
    getVariantConfig,
    refetch,
  } = useABTestSession(userId);

  const assignment = getAssignment("pricing_strategy_2025");
  const config = getVariantConfig("pricing_strategy_2025");

  return {
    sessionId,
    assignment,
    config,
    loading,
    error,
    trackEvent: assignment
      ? (eventType: "view" | "click" | "conversion" | "purchase", eventData?: any, value?: number) =>
          trackEvent(assignment.assignment_id, eventType, eventData, value)
      : async () => false,
    isOriginalPricing: isInVariant("pricing_strategy_2025", "original_pricing"),
    isLowerPricing: isInVariant("pricing_strategy_2025", "lower_pricing"),
    isBundleFocus: isInVariant("pricing_strategy_2025", "bundle_focus"),
    isTimeLimited: isInVariant("pricing_strategy_2025", "time_limited"),
    refetch,
  };
}

/**
 * HOC to provide A/B test session context to components
 */
export function withABTestSession<P extends object>(
  Component: React.ComponentType<P & { abTestSession: ReturnType<typeof useABTestSession> }>
) {
  return function WrappedComponent(props: P & { userId?: number }) {
    const { userId, ...otherProps } = props;
    const abTestSession = useABTestSession(userId);

    return <Component {...(otherProps as P)} abTestSession={abTestSession} />;
  };
}