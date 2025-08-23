-- A/B Testing Database Schema

-- Experiments table
CREATE TABLE IF NOT EXISTS ab_experiments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  status ENUM('draft', 'running', 'paused', 'completed') DEFAULT 'draft',
  start_date TIMESTAMP NULL,
  end_date TIMESTAMP NULL,
  traffic_percentage INT DEFAULT 100 CHECK (traffic_percentage >= 0 AND traffic_percentage <= 100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_name (name),
  INDEX idx_dates (start_date, end_date)
);

-- Variants table (different versions to test)
CREATE TABLE IF NOT EXISTS ab_variants (
  id INT PRIMARY KEY AUTO_INCREMENT,
  experiment_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  traffic_split INT NOT NULL CHECK (traffic_split >= 0 AND traffic_split <= 100),
  config JSON, -- Configuration for the variant (pricing, features, etc.)
  is_control BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (experiment_id) REFERENCES ab_experiments(id) ON DELETE CASCADE,
  UNIQUE KEY unique_variant_name_per_experiment (experiment_id, name),
  INDEX idx_experiment_control (experiment_id, is_control)
);

-- User assignments to variants
CREATE TABLE IF NOT EXISTS ab_assignments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  experiment_id INT NOT NULL,
  variant_id INT NOT NULL,
  user_id INT NULL, -- NULL for anonymous users
  session_id VARCHAR(255) NOT NULL, -- Browser session ID
  ip_hash VARCHAR(64), -- Hashed IP for additional consistency
  user_agent_hash VARCHAR(64), -- Hashed user agent for device consistency
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (experiment_id) REFERENCES ab_experiments(id) ON DELETE CASCADE,
  FOREIGN KEY (variant_id) REFERENCES ab_variants(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_experiment (experiment_id, user_id),
  UNIQUE KEY unique_session_experiment (experiment_id, session_id),
  INDEX idx_experiment_variant (experiment_id, variant_id),
  INDEX idx_session (session_id),
  INDEX idx_user_id (user_id)
);

-- Event tracking (views, clicks, conversions)
CREATE TABLE IF NOT EXISTS ab_events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  experiment_id INT NOT NULL,
  variant_id INT NOT NULL,
  assignment_id INT NOT NULL,
  event_type ENUM('view', 'click', 'conversion', 'purchase') NOT NULL,
  event_data JSON, -- Additional event data
  value DECIMAL(10,2), -- Monetary value for conversion events
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (experiment_id) REFERENCES ab_experiments(id) ON DELETE CASCADE,
  FOREIGN KEY (variant_id) REFERENCES ab_variants(id) ON DELETE CASCADE,
  FOREIGN KEY (assignment_id) REFERENCES ab_assignments(id) ON DELETE CASCADE,
  INDEX idx_experiment_event_type (experiment_id, event_type),
  INDEX idx_variant_event_type (variant_id, event_type),
  INDEX idx_assignment (assignment_id),
  INDEX idx_created_at (created_at)
);

-- Pre-populate with pricing experiment variants
INSERT IGNORE INTO ab_experiments (name, description, status, traffic_percentage) 
VALUES 
('pricing_strategy_2025', 'Test different pricing strategies for movie tickets', 'draft', 100);

-- Get the experiment ID for the pricing experiment
SET @pricing_exp_id = (SELECT id FROM ab_experiments WHERE name = 'pricing_strategy_2025');

-- Create variants for pricing experiment
INSERT IGNORE INTO ab_variants (experiment_id, name, description, traffic_split, config, is_control) VALUES
(@pricing_exp_id, 'original_pricing', 'Original pricing structure', 25, JSON_OBJECT(
  'type', 'original',
  'standard_price', 120,
  'standard_original', 150,
  'premium_price', 250,
  'premium_original', 300,
  'imax_price', 450,
  'imax_original', 500,
  'features', JSON_ARRAY('Standard experience', 'Regular pricing')
), true),

(@pricing_exp_id, 'lower_pricing', 'Lower pricing to increase conversion', 25, JSON_OBJECT(
  'type', 'lower',
  'standard_price', 99,
  'standard_original', 150,
  'premium_price', 199,
  'premium_original', 300,
  'imax_price', 349,
  'imax_original', 500,
  'features', JSON_ARRAY('Special pricing', '30% discount offer')
), false),

(@pricing_exp_id, 'bundle_focus', 'Bundle pricing with high savings', 25, JSON_OBJECT(
  'type', 'bundle',
  'standard_price', 199,
  'standard_original', 250,
  'premium_price', 199,
  'premium_original', 300,
  'imax_price', 199,
  'imax_original', 500,
  'bundle_savings', 70,
  'features', JSON_ARRAY('Same price for all formats', 'Save up to 70%', 'Best value bundle')
), false),

(@pricing_exp_id, 'time_limited', 'Time-limited offers with urgency', 25, JSON_OBJECT(
  'type', 'time_limited',
  'standard_price', 99,
  'standard_original', 150,
  'premium_price', 179,
  'premium_original', 300,
  'imax_price', 299,
  'imax_original', 500,
  'countdown_hours', 24,
  'urgency_text', 'Limited Time Offer - Ends in 24 Hours!',
  'features', JSON_ARRAY('Flash sale pricing', 'Limited time only', 'Save big today')
), false);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ab_events_experiment_date ON ab_events(experiment_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ab_events_variant_date ON ab_events(variant_id, created_at);
CREATE INDEX IF NOT EXISTS idx_ab_assignments_session_date ON ab_assignments(session_id, assigned_at);

-- Feature flags table for easy experiment control
CREATE TABLE IF NOT EXISTS feature_flags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  enabled BOOLEAN DEFAULT FALSE,
  config JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_name_enabled (name, enabled)
);

-- Insert feature flags for A/B testing
INSERT IGNORE INTO feature_flags (name, description, enabled, config) VALUES
('ab_testing_enabled', 'Master switch for A/B testing system', true, JSON_OBJECT('version', '1.0')),
('pricing_experiment_enabled', 'Enable pricing strategy A/B test', true, JSON_OBJECT('experiment_name', 'pricing_strategy_2025')),
('show_experiment_debug', 'Show A/B test debug info to admins', false, JSON_OBJECT('admin_only', true));