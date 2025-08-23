import crypto from "crypto";
import {
  ABTestExperiment,
  ABTestVariant,
  ABTestAssignment,
  ABTestMetrics,
  createAssignment,
  createExperiment,
  createVariant,
  getActiveExperiments,
  getAssignment,
  getExperiment,
  getExperimentByName,
  getExperimentMetrics,
  getExperimentSummary,
  getVariantsByExperiment,
  trackEvent,
  updateExperimentStatus,
  getVariant,
} from "@/models/ab-test";

export interface VariantAssignment {
  experimentId: number;
  experimentName: string;
  variantId: number;
  variantName: string;
  config: any;
  assignmentId: number;
}

export interface ExperimentConfig {
  name: string;
  description?: string;
  variants: {
    name: string;
    description?: string;
    trafficSplit: number;
    config: any;
    isControl?: boolean;
  }[];
  trafficPercentage?: number;
}

/**
 * Hash a string using SHA-256
 */
function hashString(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

/**
 * Generate a consistent hash for user identification
 */
function generateUserHash(sessionId: string, ip?: string, userAgent?: string): string {
  const identifier = `${sessionId}:${ip || ""}:${userAgent || ""}`;
  return hashString(identifier);
}

/**
 * Assign user to a variant using consistent hashing
 */
function assignVariant(
  variants: ABTestVariant[],
  userHash: string,
  trafficPercentage: number = 100
): ABTestVariant | null {
  // Check if user should be included in the experiment
  const hashNum = parseInt(userHash.slice(0, 8), 16);
  const userPercentile = (hashNum % 10000) / 100; // 0-99.99

  if (userPercentile >= trafficPercentage) {
    return null; // User not in experiment
  }

  // Sort variants by traffic split for consistent assignment
  const sortedVariants = [...variants].sort((a, b) => {
    if (a.is_control !== b.is_control) {
      return a.is_control ? -1 : 1; // Control first
    }
    return a.created_at.getTime() - b.created_at.getTime();
  });

  // Calculate cumulative weights
  let cumulativeWeight = 0;
  const weightedVariants = sortedVariants.map((variant) => {
    cumulativeWeight += variant.traffic_split;
    return { variant, cumulativeWeight };
  });

  // Use hash to select variant
  const variantHash = hashString(`variant:${userHash}`);
  const variantNum = parseInt(variantHash.slice(0, 8), 16);
  const variantPercentile = (variantNum % 10000) / 100;

  // Find the variant for this percentile
  const totalWeight = weightedVariants[weightedVariants.length - 1].cumulativeWeight;
  const normalizedPercentile = (variantPercentile * totalWeight) / 100;

  for (const { variant, cumulativeWeight } of weightedVariants) {
    if (normalizedPercentile <= cumulativeWeight) {
      return variant;
    }
  }

  // Fallback to control variant
  return sortedVariants.find((v) => v.is_control) || sortedVariants[0];
}

/**
 * Get or create user assignment for an experiment
 */
export async function assignUserToExperiment(
  experimentName: string,
  sessionId: string,
  userId?: number,
  ip?: string,
  userAgent?: string
): Promise<VariantAssignment | null> {
  try {
    const experiment = await getExperimentByName(experimentName);
    if (!experiment || experiment.status !== "running") {
      return null;
    }

    // Check if user already has an assignment
    let assignment = await getAssignment(experiment.id, sessionId, userId);

    if (!assignment) {
      // Get variants for this experiment
      const variants = await getVariantsByExperiment(experiment.id);
      if (variants.length === 0) {
        return null;
      }

      // Generate consistent user hash
      const userHash = generateUserHash(sessionId, ip, userAgent);
      const ipHash = ip ? hashString(ip) : undefined;
      const userAgentHash = userAgent ? hashString(userAgent) : undefined;

      // Assign variant
      const selectedVariant = assignVariant(variants, userHash, experiment.traffic_percentage);
      if (!selectedVariant) {
        return null; // User not in experiment
      }

      // Create assignment
      const assignmentId = await createAssignment({
        experiment_id: experiment.id,
        variant_id: selectedVariant.id,
        user_id: userId,
        session_id: sessionId,
        ip_hash: ipHash,
        user_agent_hash: userAgentHash,
      });

      assignment = {
        id: assignmentId,
        experiment_id: experiment.id,
        variant_id: selectedVariant.id,
        user_id: userId,
        session_id: sessionId,
        ip_hash: ipHash,
        user_agent_hash: userAgentHash,
        assigned_at: new Date(),
      } as ABTestAssignment;
    }

    // Get variant details
    const variant = await getVariant(assignment.variant_id);
    if (!variant) {
      return null;
    }

    return {
      experimentId: experiment.id,
      experimentName: experiment.name,
      variantId: variant.id,
      variantName: variant.name,
      config: JSON.parse(variant.config || "{}"),
      assignmentId: assignment.id,
    };
  } catch (error) {
    console.error("Error assigning user to experiment:", error);
    return null;
  }
}

/**
 * Track an event for A/B testing
 */
export async function trackABTestEvent(
  assignmentId: number,
  eventType: "view" | "click" | "conversion" | "purchase",
  eventData?: any,
  value?: number
): Promise<boolean> {
  try {
    // Get assignment details
    const connection = await import("@/models/db").then((m) => m.db.getConnection());
    try {
      const [assignments] = await connection.execute(
        "SELECT experiment_id, variant_id FROM ab_assignments WHERE id = ?",
        [assignmentId]
      );

      if (!Array.isArray(assignments) || assignments.length === 0) {
        return false;
      }

      const assignment = assignments[0] as any;

      await trackEvent({
        experiment_id: assignment.experiment_id,
        variant_id: assignment.variant_id,
        assignment_id: assignmentId,
        event_type: eventType,
        event_data: eventData,
        value,
      });

      return true;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error tracking A/B test event:", error);
    return false;
  }
}

/**
 * Create a new A/B test experiment with variants
 */
export async function createABTestExperiment(config: ExperimentConfig): Promise<number> {
  // Validate traffic splits
  const totalSplit = config.variants.reduce((sum, v) => sum + v.trafficSplit, 0);
  if (Math.abs(totalSplit - 100) > 0.01) {
    throw new Error("Variant traffic splits must sum to 100%");
  }

  // Create experiment
  const experimentId = await createExperiment({
    name: config.name,
    description: config.description,
    traffic_percentage: config.trafficPercentage || 100,
  });

  // Create variants
  for (const variant of config.variants) {
    await createVariant({
      experiment_id: experimentId,
      name: variant.name,
      description: variant.description,
      traffic_split: variant.trafficSplit,
      config: variant.config,
      is_control: variant.isControl || false,
    });
  }

  return experimentId;
}

/**
 * Start an experiment
 */
export async function startExperiment(experimentId: number): Promise<void> {
  await updateExperimentStatus(experimentId, "running");
}

/**
 * Stop an experiment
 */
export async function stopExperiment(experimentId: number): Promise<void> {
  await updateExperimentStatus(experimentId, "completed");
}

/**
 * Pause an experiment
 */
export async function pauseExperiment(experimentId: number): Promise<void> {
  await updateExperimentStatus(experimentId, "paused");
}

/**
 * Get experiment results with statistical analysis
 */
export async function getExperimentResults(experimentId: number) {
  const summary = await getExperimentSummary(experimentId);
  if (!summary) {
    throw new Error("Experiment not found");
  }

  const { experiment, variants, metrics, total_assignments } = summary;

  // Calculate statistical significance
  const results = metrics.map((metric) => {
    const variant = variants.find((v) => v.id === metric.variant_id);
    return {
      ...metric,
      variant,
      statistical_significance: calculateStatisticalSignificance(metrics, metric),
    };
  });

  return {
    experiment,
    results,
    total_assignments,
    summary: {
      total_views: metrics.reduce((sum, m) => sum + m.views, 0),
      total_conversions: metrics.reduce((sum, m) => sum + m.conversions, 0),
      total_revenue: metrics.reduce((sum, m) => sum + m.revenue, 0),
      avg_conversion_rate: metrics.reduce((sum, m) => sum + m.conversion_rate, 0) / metrics.length,
    },
  };
}

/**
 * Calculate statistical significance using z-test for conversion rates
 */
function calculateStatisticalSignificance(
  allMetrics: ABTestMetrics[],
  currentMetric: ABTestMetrics
): {
  confidence: number;
  significant: boolean;
  p_value: number;
} {
  // Find control variant
  const controlMetric = allMetrics.find((m) => {
    // Assume first variant or highest views is control
    return m.views === Math.max(...allMetrics.map((metric) => metric.views));
  });

  if (!controlMetric || controlMetric.variant_id === currentMetric.variant_id) {
    return { confidence: 0, significant: false, p_value: 1 };
  }

  const controlRate = controlMetric.conversion_rate / 100;
  const variantRate = currentMetric.conversion_rate / 100;
  const controlSample = controlMetric.views;
  const variantSample = currentMetric.views;

  if (controlSample < 30 || variantSample < 30) {
    // Sample too small for reliable statistics
    return { confidence: 0, significant: false, p_value: 1 };
  }

  // Calculate pooled standard error
  const pooledRate = (controlMetric.conversions + currentMetric.conversions) / (controlSample + variantSample);
  const standardError = Math.sqrt(pooledRate * (1 - pooledRate) * (1 / controlSample + 1 / variantSample));

  if (standardError === 0) {
    return { confidence: 0, significant: false, p_value: 1 };
  }

  // Calculate z-score
  const zScore = Math.abs(variantRate - controlRate) / standardError;

  // Convert z-score to p-value (two-tailed test)
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));

  // Calculate confidence level
  const confidence = (1 - pValue) * 100;

  return {
    confidence: Math.round(confidence * 100) / 100,
    significant: pValue < 0.05, // 95% confidence threshold
    p_value: Math.round(pValue * 10000) / 10000,
  };
}

/**
 * Normal cumulative distribution function approximation
 */
function normalCDF(x: number): number {
  // Approximation using error function
  return 0.5 * (1 + erf(x / Math.sqrt(2)));
}

/**
 * Error function approximation
 */
function erf(x: number): number {
  // Abramowitz and Stegun approximation
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x >= 0 ? 1 : -1;
  x = Math.abs(x);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
}

/**
 * Get all active experiments for a user
 */
export async function getUserExperiments(
  sessionId: string,
  userId?: number,
  ip?: string,
  userAgent?: string
): Promise<VariantAssignment[]> {
  try {
    const activeExperiments = await getActiveExperiments();
    const assignments: VariantAssignment[] = [];

    for (const experiment of activeExperiments) {
      const assignment = await assignUserToExperiment(
        experiment.name,
        sessionId,
        userId,
        ip,
        userAgent
      );
      if (assignment) {
        assignments.push(assignment);
      }
    }

    return assignments;
  } catch (error) {
    console.error("Error getting user experiments:", error);
    return [];
  }
}

/**
 * Feature flag service
 */
export async function getFeatureFlag(name: string): Promise<{
  enabled: boolean;
  config: any;
} | null> {
  try {
    const connection = await import("@/models/db").then((m) => m.db.getConnection());
    try {
      const [rows] = await connection.execute(
        "SELECT enabled, config FROM feature_flags WHERE name = ?",
        [name]
      );

      if (!Array.isArray(rows) || rows.length === 0) {
        return null;
      }

      const row = rows[0] as any;
      return {
        enabled: row.enabled,
        config: JSON.parse(row.config || "{}"),
      };
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Error getting feature flag:", error);
    return null;
  }
}

/**
 * Check if A/B testing is enabled
 */
export async function isABTestingEnabled(): Promise<boolean> {
  const flag = await getFeatureFlag("ab_testing_enabled");
  return flag?.enabled || false;
}