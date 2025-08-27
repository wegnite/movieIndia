/**
 * Mock A/B Test Model for Vercel deployment without database
 * Uses in-memory storage for development/demo purposes
 */

// In-memory storage
const experiments = new Map();
const variants = new Map();
const assignments = new Map();
const events = new Map();
const featureFlags = new Map();

// Initialize with default data
featureFlags.set('ab_testing_enabled', { enabled: false });
featureFlags.set('pricing_experiment_enabled', { enabled: false });

export async function createExperiment(data: any) {
  const id = Date.now();
  experiments.set(id, { id, ...data });
  return { id, ...data };
}

export async function getExperiment(id: number) {
  return experiments.get(id) || null;
}

export async function getExperimentByName(name: string) {
  for (const exp of experiments.values()) {
    if (exp.name === name) return exp;
  }
  return null;
}

export async function getActiveExperiments() {
  return Array.from(experiments.values()).filter(exp => exp.status === 'running');
}

export async function updateExperimentStatus(id: number, status: string) {
  const exp = experiments.get(id);
  if (exp) {
    exp.status = status;
    experiments.set(id, exp);
  }
  return exp;
}

export async function createVariant(data: any) {
  const id = Date.now();
  variants.set(id, { id, ...data });
  return { id, ...data };
}

export async function getVariant(id: number) {
  return variants.get(id) || null;
}

export async function getVariantsByExperiment(experimentId: number) {
  return Array.from(variants.values()).filter(v => v.experiment_id === experimentId);
}

export async function createAssignment(data: any) {
  const id = Date.now();
  assignments.set(id, { id, ...data });
  return { id, ...data };
}

export async function getAssignment(sessionId: string, experimentId: number) {
  for (const assignment of assignments.values()) {
    if (assignment.session_id === sessionId && assignment.experiment_id === experimentId) {
      return assignment;
    }
  }
  return null;
}

export async function trackEvent(data: any) {
  const id = Date.now();
  events.set(id, { id, ...data, created_at: new Date() });
  return { id, ...data };
}

export async function getExperimentMetrics(experimentId: number) {
  const allEvents = Array.from(events.values()).filter(e => e.experiment_id === experimentId);
  
  const metrics: any = {};
  const variantIds = new Set(allEvents.map(e => e.variant_id));
  
  for (const variantId of variantIds) {
    const variantEvents = allEvents.filter(e => e.variant_id === variantId);
    metrics[variantId] = {
      views: variantEvents.filter(e => e.event_type === 'view').length,
      clicks: variantEvents.filter(e => e.event_type === 'click').length,
      conversions: variantEvents.filter(e => e.event_type === 'conversion').length,
    };
  }
  
  return metrics;
}

export async function getExperimentSummary(experimentId: number) {
  const exp = experiments.get(experimentId);
  const variantList = await getVariantsByExperiment(experimentId);
  const metrics = await getExperimentMetrics(experimentId);
  
  return {
    experiment: exp,
    variants: variantList,
    metrics,
    summary: {
      total_participants: assignments.size,
      total_events: events.size,
      status: exp?.status || 'unknown'
    }
  };
}

export async function getFeatureFlag(name: string) {
  return featureFlags.get(name) || { enabled: false };
}

export async function updateFeatureFlag(name: string, enabled: boolean) {
  featureFlags.set(name, { enabled });
  return { name, enabled };
}

// Export types
export type ABTestExperiment = any;
export type ABTestVariant = any;
export type ABTestAssignment = any;
export type ABTestEvent = any;
export type ABTestMetrics = any;