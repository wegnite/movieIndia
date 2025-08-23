export interface ABTestExperiment {
  id: number;
  name: string;
  description?: string;
  status: "draft" | "running" | "paused" | "completed";
  start_date?: Date;
  end_date?: Date;
  traffic_percentage: number;
  created_at: Date;
  updated_at: Date;
}

export interface ABTestVariant {
  id: number;
  experiment_id: number;
  name: string;
  description?: string;
  traffic_split: number;
  config: string; // JSON configuration
  is_control: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ABTestAssignment {
  id: number;
  experiment_id: number;
  variant_id: number;
  user_id?: number;
  session_id: string;
  ip_hash?: string;
  user_agent_hash?: string;
  assigned_at: Date;
}

export interface ABTestEvent {
  id: number;
  experiment_id: number;
  variant_id: number;
  assignment_id: number;
  event_type: "view" | "click" | "conversion" | "purchase";
  event_data?: string; // JSON
  value?: number;
  created_at: Date;
}

export interface ABTestMetrics {
  experiment_id: number;
  variant_id: number;
  variant_name: string;
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
  conversion_rate: number;
  click_through_rate: number;
  avg_order_value: number;
}

export interface StatisticalSignificance {
  confidence: number;
  significant: boolean;
  p_value: number;
}

export interface VariantResult extends ABTestMetrics {
  variant: ABTestVariant;
  statistical_significance: StatisticalSignificance;
}

export interface ExperimentSummary {
  total_views: number;
  total_conversions: number;
  total_revenue: number;
  avg_conversion_rate: number;
}

export interface ExperimentResults {
  experiment: ABTestExperiment;
  results: VariantResult[];
  total_assignments: number;
  summary: ExperimentSummary;
}

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

export interface FeatureFlag {
  name: string;
  enabled: boolean;
  config: any;
}

export interface UserContext {
  sessionId: string;
  ipHash?: string;
  userAgentHash?: string;
  userId?: number;
}

export interface AssignmentQuality {
  isValid: boolean;
  reason?: string;
  shouldExclude: boolean;
}

// API Response types
export interface ABTestAssignResponse {
  assigned: boolean;
  assignment?: {
    experiment_id: number;
    experiment_name: string;
    variant_id: number;
    variant_name: string;
    config: any;
    assignment_id: number;
  };
  message?: string;
}

export interface ABTestTrackResponse {
  tracked: boolean;
  event_type: string;
  assignment_id: number;
}

export interface ExperimentsListResponse {
  experiments: ABTestExperiment[];
}

// Pricing specific types
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

export interface ABTestContext {
  experiment_id: number;
  variant_id: number;
  assignment_id: number;
}

// Dashboard types
export interface DashboardMetrics {
  active_experiments: number;
  total_experiments: number;
  total_assignments: number;
  total_revenue: number;
  avg_conversion_rate: number;
}

export interface ChartData {
  name: string;
  value: number;
  variant_name?: string;
}

export interface TimeSeriesData {
  date: string;
  views: number;
  conversions: number;
  revenue: number;
  conversion_rate: number;
}

// Error types
export interface ABTestError {
  code: string;
  message: string;
  details?: any;
}

// Configuration types
export interface ABTestConfig {
  enabled: boolean;
  default_traffic_percentage: number;
  min_sample_size: number;
  significance_threshold: number;
  session_duration_days: number;
  bot_patterns: string[];
}