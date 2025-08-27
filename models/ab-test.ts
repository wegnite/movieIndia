/**
 * A/B Test Model with fallback to mock implementation
 * Uses real database if configured, otherwise uses in-memory mock
 */

// In-memory storage for when database is not configured
const mockStorage = {
  experiments: new Map(),
  variants: new Map(),
  assignments: new Map(),
  events: new Map(),
  featureFlags: new Map([
    ['ab_testing_enabled', { enabled: false }],
    ['pricing_experiment_enabled', { enabled: false }]
  ])
};

// Types
export interface ABTestExperiment {
  id: number;
  name: string;
  description?: string;
  status: 'draft' | 'running' | 'paused' | 'completed';
  traffic_percentage: number;
  created_at: Date;
  updated_at: Date;
  started_at?: Date;
  ended_at?: Date;
}

export interface ABTestVariant {
  id: number;
  experiment_id: number;
  name: string;
  description?: string;
  traffic_percentage: number;
  is_control: boolean;
  config: any;
  created_at: Date;
}

export interface ABTestAssignment {
  id: number;
  experiment_id: number;
  variant_id: number;
  session_id: string;
  user_id?: string;
  created_at: Date;
}

export interface ABTestEvent {
  id: number;
  experiment_id: number;
  variant_id: number;
  session_id: string;
  user_id?: string;
  event_type: 'view' | 'click' | 'conversion' | 'custom';
  event_value?: any;
  created_at: Date;
}

export interface ABTestMetrics {
  [variantId: number]: {
    views: number;
    clicks: number;
    conversions: number;
    conversion_rate?: number;
  };
}

// Helper to check if database is available
function isDatabaseAvailable(): boolean {
  return !!(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
}

// Mock implementations
async function mockOperation(operation: string, data?: any): Promise<any> {
  console.log(`Mock A/B Test operation: ${operation}`, data);
  
  switch (operation) {
    case 'createExperiment':
      const expId = Date.now();
      const experiment = { id: expId, ...data, created_at: new Date(), updated_at: new Date() };
      mockStorage.experiments.set(expId, experiment);
      return experiment;
      
    case 'getExperiment':
      return mockStorage.experiments.get(data) || null;
      
    case 'getExperimentByName':
      for (const exp of mockStorage.experiments.values()) {
        if (exp.name === data) return exp;
      }
      return null;
      
    case 'getActiveExperiments':
      return Array.from(mockStorage.experiments.values()).filter(exp => exp.status === 'running');
      
    case 'createVariant':
      const varId = Date.now();
      const variant = { id: varId, ...data, created_at: new Date() };
      mockStorage.variants.set(varId, variant);
      return variant;
      
    case 'getVariantsByExperiment':
      return Array.from(mockStorage.variants.values()).filter(v => v.experiment_id === data);
      
    case 'createAssignment':
      const assignId = Date.now();
      const assignment = { id: assignId, ...data, created_at: new Date() };
      mockStorage.assignments.set(assignId, assignment);
      return assignment;
      
    case 'trackEvent':
      const eventId = Date.now();
      const event = { id: eventId, ...data, created_at: new Date() };
      mockStorage.events.set(eventId, event);
      return event;
      
    case 'getFeatureFlag':
      return mockStorage.featureFlags.get(data) || { enabled: false };
      
    default:
      return null;
  }
}

// Exported functions with database/mock fallback
export async function createExperiment(data: Partial<ABTestExperiment>): Promise<ABTestExperiment> {
  if (!isDatabaseAvailable()) {
    return mockOperation('createExperiment', data);
  }
  
  // Real database implementation would go here
  const { getSupabaseClient } = await import('./db');
  const client = getSupabaseClient();
  if (!client) return mockOperation('createExperiment', data);
  
  const { data: result, error } = await client
    .from('ab_experiments')
    .insert(data)
    .select()
    .single();
    
  if (error) throw error;
  return result;
}

export async function getExperiment(id: number): Promise<ABTestExperiment | null> {
  if (!isDatabaseAvailable()) {
    return mockOperation('getExperiment', id);
  }
  
  const { getSupabaseClient } = await import('./db');
  const client = getSupabaseClient();
  if (!client) return mockOperation('getExperiment', id);
  
  const { data, error } = await client
    .from('ab_experiments')
    .select()
    .eq('id', id)
    .single();
    
  if (error) return null;
  return data;
}

export async function getExperimentByName(name: string): Promise<ABTestExperiment | null> {
  if (!isDatabaseAvailable()) {
    return mockOperation('getExperimentByName', name);
  }
  
  const { getSupabaseClient } = await import('./db');
  const client = getSupabaseClient();
  if (!client) return mockOperation('getExperimentByName', name);
  
  const { data, error } = await client
    .from('ab_experiments')
    .select()
    .eq('name', name)
    .single();
    
  if (error) return null;
  return data;
}

export async function getActiveExperiments(): Promise<ABTestExperiment[]> {
  if (!isDatabaseAvailable()) {
    return mockOperation('getActiveExperiments') || [];
  }
  
  const { getSupabaseClient } = await import('./db');
  const client = getSupabaseClient();
  if (!client) return mockOperation('getActiveExperiments') || [];
  
  const { data, error } = await client
    .from('ab_experiments')
    .select()
    .eq('status', 'running');
    
  if (error) return [];
  return data || [];
}

export async function updateExperimentStatus(id: number, status: string): Promise<void> {
  if (!isDatabaseAvailable()) {
    const exp = mockStorage.experiments.get(id);
    if (exp) {
      exp.status = status;
      exp.updated_at = new Date();
    }
    return;
  }
  
  const { getSupabaseClient } = await import('./db');
  const client = getSupabaseClient();
  if (!client) return;
  
  await client
    .from('ab_experiments')
    .update({ status, updated_at: new Date() })
    .eq('id', id);
}

export async function createVariant(data: Partial<ABTestVariant>): Promise<ABTestVariant> {
  if (!isDatabaseAvailable()) {
    return mockOperation('createVariant', data);
  }
  
  const { getSupabaseClient } = await import('./db');
  const client = getSupabaseClient();
  if (!client) return mockOperation('createVariant', data);
  
  const { data: result, error } = await client
    .from('ab_variants')
    .insert(data)
    .select()
    .single();
    
  if (error) throw error;
  return result;
}

export async function getVariant(id: number): Promise<ABTestVariant | null> {
  if (!isDatabaseAvailable()) {
    return mockStorage.variants.get(id) || null;
  }
  
  const { getSupabaseClient } = await import('./db');
  const client = getSupabaseClient();
  if (!client) return mockStorage.variants.get(id) || null;
  
  const { data, error } = await client
    .from('ab_variants')
    .select()
    .eq('id', id)
    .single();
    
  if (error) return null;
  return data;
}

export async function getVariantsByExperiment(experimentId: number): Promise<ABTestVariant[]> {
  if (!isDatabaseAvailable()) {
    return mockOperation('getVariantsByExperiment', experimentId) || [];
  }
  
  const { getSupabaseClient } = await import('./db');
  const client = getSupabaseClient();
  if (!client) return mockOperation('getVariantsByExperiment', experimentId) || [];
  
  const { data, error } = await client
    .from('ab_variants')
    .select()
    .eq('experiment_id', experimentId);
    
  if (error) return [];
  return data || [];
}

export async function createAssignment(data: Partial<ABTestAssignment>): Promise<ABTestAssignment> {
  if (!isDatabaseAvailable()) {
    return mockOperation('createAssignment', data);
  }
  
  const { getSupabaseClient } = await import('./db');
  const client = getSupabaseClient();
  if (!client) return mockOperation('createAssignment', data);
  
  const { data: result, error } = await client
    .from('ab_assignments')
    .insert(data)
    .select()
    .single();
    
  if (error) throw error;
  return result;
}

export async function getAssignment(sessionId: string, experimentId: number): Promise<ABTestAssignment | null> {
  if (!isDatabaseAvailable()) {
    for (const assignment of mockStorage.assignments.values()) {
      if (assignment.session_id === sessionId && assignment.experiment_id === experimentId) {
        return assignment;
      }
    }
    return null;
  }
  
  const { getSupabaseClient } = await import('./db');
  const client = getSupabaseClient();
  if (!client) {
    for (const assignment of mockStorage.assignments.values()) {
      if (assignment.session_id === sessionId && assignment.experiment_id === experimentId) {
        return assignment;
      }
    }
    return null;
  }
  
  const { data, error } = await client
    .from('ab_assignments')
    .select()
    .eq('session_id', sessionId)
    .eq('experiment_id', experimentId)
    .single();
    
  if (error) return null;
  return data;
}

export async function trackEvent(data: Partial<ABTestEvent>): Promise<void> {
  if (!isDatabaseAvailable()) {
    mockOperation('trackEvent', data);
    return;
  }
  
  const { getSupabaseClient } = await import('./db');
  const client = getSupabaseClient();
  if (!client) {
    mockOperation('trackEvent', data);
    return;
  }
  
  await client.from('ab_events').insert(data);
}

export async function getExperimentMetrics(experimentId: number): Promise<ABTestMetrics> {
  if (!isDatabaseAvailable()) {
    const metrics: ABTestMetrics = {};
    const events = Array.from(mockStorage.events.values()).filter(e => e.experiment_id === experimentId);
    const variantIds = new Set(events.map(e => e.variant_id));
    
    for (const variantId of variantIds) {
      const variantEvents = events.filter(e => e.variant_id === variantId);
      metrics[variantId] = {
        views: variantEvents.filter(e => e.event_type === 'view').length,
        clicks: variantEvents.filter(e => e.event_type === 'click').length,
        conversions: variantEvents.filter(e => e.event_type === 'conversion').length,
      };
      
      if (metrics[variantId].views > 0) {
        metrics[variantId].conversion_rate = metrics[variantId].conversions / metrics[variantId].views;
      }
    }
    
    return metrics;
  }
  
  const { getSupabaseClient } = await import('./db');
  const client = getSupabaseClient();
  if (!client) {
    // Fallback to mock
    return getExperimentMetrics(experimentId);
  }
  
  // Real implementation would aggregate from database
  return {};
}

export async function getExperimentSummary(experimentId: number): Promise<any> {
  const experiment = await getExperiment(experimentId);
  const variants = await getVariantsByExperiment(experimentId);
  const metrics = await getExperimentMetrics(experimentId);
  
  return {
    experiment,
    variants,
    metrics,
    summary: {
      total_participants: Object.keys(metrics).reduce((sum, vid) => sum + metrics[Number(vid)].views, 0),
      total_conversions: Object.keys(metrics).reduce((sum, vid) => sum + metrics[Number(vid)].conversions, 0),
      status: experiment?.status || 'unknown'
    }
  };
}

export async function getFeatureFlag(name: string): Promise<{ enabled: boolean }> {
  if (!isDatabaseAvailable()) {
    return mockOperation('getFeatureFlag', name) || { enabled: false };
  }
  
  const { getSupabaseClient } = await import('./db');
  const client = getSupabaseClient();
  if (!client) return mockOperation('getFeatureFlag', name) || { enabled: false };
  
  const { data, error } = await client
    .from('feature_flags')
    .select('enabled')
    .eq('name', name)
    .single();
    
  if (error) return { enabled: false };
  return data || { enabled: false };
}

export async function updateFeatureFlag(name: string, enabled: boolean): Promise<void> {
  if (!isDatabaseAvailable()) {
    mockStorage.featureFlags.set(name, { enabled });
    return;
  }
  
  const { getSupabaseClient } = await import('./db');
  const client = getSupabaseClient();
  if (!client) {
    mockStorage.featureFlags.set(name, { enabled });
    return;
  }
  
  await client
    .from('feature_flags')
    .upsert({ name, enabled, updated_at: new Date() });
}