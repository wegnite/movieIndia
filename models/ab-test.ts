import { db } from "./db";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";

export interface ABTestExperiment extends RowDataPacket {
  id: number;
  name: string;
  description?: string;
  status: "draft" | "running" | "paused" | "completed";
  start_date?: Date;
  end_date?: Date;
  traffic_percentage: number; // 0-100
  created_at: Date;
  updated_at: Date;
}

export interface ABTestVariant extends RowDataPacket {
  id: number;
  experiment_id: number;
  name: string;
  description?: string;
  traffic_split: number; // 0-100
  config: string; // JSON configuration for the variant
  is_control: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface ABTestAssignment extends RowDataPacket {
  id: number;
  experiment_id: number;
  variant_id: number;
  user_id?: number;
  session_id: string;
  ip_hash?: string;
  user_agent_hash?: string;
  assigned_at: Date;
}

export interface ABTestEvent extends RowDataPacket {
  id: number;
  experiment_id: number;
  variant_id: number;
  assignment_id: number;
  event_type: "view" | "click" | "conversion" | "purchase";
  event_data?: string; // JSON additional data
  value?: number; // monetary value for conversion events
  created_at: Date;
}

export interface ABTestMetrics extends RowDataPacket {
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

// Experiment CRUD operations
export async function createExperiment(experiment: {
  name: string;
  description?: string;
  traffic_percentage?: number;
}): Promise<number> {
  const connection = await db.getConnection();
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO ab_experiments (name, description, status, traffic_percentage, created_at, updated_at)
       VALUES (?, ?, 'draft', ?, NOW(), NOW())`,
      [
        experiment.name,
        experiment.description || null,
        experiment.traffic_percentage || 100,
      ]
    );
    return result.insertId;
  } finally {
    connection.release();
  }
}

export async function getExperiment(id: number): Promise<ABTestExperiment | null> {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute<ABTestExperiment[]>(
      "SELECT * FROM ab_experiments WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  } finally {
    connection.release();
  }
}

export async function getExperimentByName(name: string): Promise<ABTestExperiment | null> {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute<ABTestExperiment[]>(
      "SELECT * FROM ab_experiments WHERE name = ?",
      [name]
    );
    return rows[0] || null;
  } finally {
    connection.release();
  }
}

export async function getActiveExperiments(): Promise<ABTestExperiment[]> {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute<ABTestExperiment[]>(
      `SELECT * FROM ab_experiments 
       WHERE status = 'running' AND traffic_percentage > 0
       ORDER BY created_at DESC`
    );
    return rows;
  } finally {
    connection.release();
  }
}

export async function updateExperimentStatus(
  id: number,
  status: "draft" | "running" | "paused" | "completed"
): Promise<void> {
  const connection = await db.getConnection();
  try {
    await connection.execute(
      "UPDATE ab_experiments SET status = ?, updated_at = NOW() WHERE id = ?",
      [status, id]
    );
    
    if (status === "running") {
      await connection.execute(
        "UPDATE ab_experiments SET start_date = NOW() WHERE id = ? AND start_date IS NULL",
        [id]
      );
    } else if (status === "completed") {
      await connection.execute(
        "UPDATE ab_experiments SET end_date = NOW() WHERE id = ? AND end_date IS NULL",
        [id]
      );
    }
  } finally {
    connection.release();
  }
}

// Variant CRUD operations
export async function createVariant(variant: {
  experiment_id: number;
  name: string;
  description?: string;
  traffic_split: number;
  config: object;
  is_control?: boolean;
}): Promise<number> {
  const connection = await db.getConnection();
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO ab_variants (experiment_id, name, description, traffic_split, config, is_control, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        variant.experiment_id,
        variant.name,
        variant.description || null,
        variant.traffic_split,
        JSON.stringify(variant.config),
        variant.is_control || false,
      ]
    );
    return result.insertId;
  } finally {
    connection.release();
  }
}

export async function getVariantsByExperiment(experimentId: number): Promise<ABTestVariant[]> {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute<ABTestVariant[]>(
      "SELECT * FROM ab_variants WHERE experiment_id = ? ORDER BY is_control DESC, created_at ASC",
      [experimentId]
    );
    return rows;
  } finally {
    connection.release();
  }
}

export async function getVariant(id: number): Promise<ABTestVariant | null> {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute<ABTestVariant[]>(
      "SELECT * FROM ab_variants WHERE id = ?",
      [id]
    );
    return rows[0] || null;
  } finally {
    connection.release();
  }
}

// Assignment operations
export async function createAssignment(assignment: {
  experiment_id: number;
  variant_id: number;
  user_id?: number;
  session_id: string;
  ip_hash?: string;
  user_agent_hash?: string;
}): Promise<number> {
  const connection = await db.getConnection();
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO ab_assignments (experiment_id, variant_id, user_id, session_id, ip_hash, user_agent_hash, assigned_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        assignment.experiment_id,
        assignment.variant_id,
        assignment.user_id || null,
        assignment.session_id,
        assignment.ip_hash || null,
        assignment.user_agent_hash || null,
      ]
    );
    return result.insertId;
  } finally {
    connection.release();
  }
}

export async function getAssignment(
  experimentId: number,
  sessionId: string,
  userId?: number
): Promise<ABTestAssignment | null> {
  const connection = await db.getConnection();
  try {
    let query = `SELECT * FROM ab_assignments 
                 WHERE experiment_id = ? AND session_id = ?`;
    const params: any[] = [experimentId, sessionId];
    
    if (userId) {
      query += " AND (user_id = ? OR user_id IS NULL)";
      params.push(userId);
    }
    
    query += " ORDER BY user_id DESC LIMIT 1";
    
    const [rows] = await connection.execute<ABTestAssignment[]>(query, params);
    return rows[0] || null;
  } finally {
    connection.release();
  }
}

// Event tracking
export async function trackEvent(event: {
  experiment_id: number;
  variant_id: number;
  assignment_id: number;
  event_type: "view" | "click" | "conversion" | "purchase";
  event_data?: object;
  value?: number;
}): Promise<number> {
  const connection = await db.getConnection();
  try {
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO ab_events (experiment_id, variant_id, assignment_id, event_type, event_data, value, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        event.experiment_id,
        event.variant_id,
        event.assignment_id,
        event.event_type,
        event.event_data ? JSON.stringify(event.event_data) : null,
        event.value || null,
      ]
    );
    return result.insertId;
  } finally {
    connection.release();
  }
}

// Analytics and metrics
export async function getExperimentMetrics(experimentId: number): Promise<ABTestMetrics[]> {
  const connection = await db.getConnection();
  try {
    const [rows] = await connection.execute<ABTestMetrics[]>(
      `SELECT 
        e.experiment_id,
        v.id as variant_id,
        v.name as variant_name,
        COUNT(DISTINCT CASE WHEN e.event_type = 'view' THEN e.id END) as views,
        COUNT(DISTINCT CASE WHEN e.event_type = 'click' THEN e.id END) as clicks,
        COUNT(DISTINCT CASE WHEN e.event_type = 'conversion' THEN e.id END) as conversions,
        SUM(CASE WHEN e.event_type = 'purchase' THEN COALESCE(e.value, 0) ELSE 0 END) as revenue,
        CASE 
          WHEN COUNT(DISTINCT CASE WHEN e.event_type = 'view' THEN e.id END) > 0 
          THEN COUNT(DISTINCT CASE WHEN e.event_type = 'conversion' THEN e.id END) / COUNT(DISTINCT CASE WHEN e.event_type = 'view' THEN e.id END) * 100
          ELSE 0 
        END as conversion_rate,
        CASE 
          WHEN COUNT(DISTINCT CASE WHEN e.event_type = 'view' THEN e.id END) > 0 
          THEN COUNT(DISTINCT CASE WHEN e.event_type = 'click' THEN e.id END) / COUNT(DISTINCT CASE WHEN e.event_type = 'view' THEN e.id END) * 100
          ELSE 0 
        END as click_through_rate,
        CASE 
          WHEN COUNT(DISTINCT CASE WHEN e.event_type = 'purchase' THEN e.id END) > 0 
          THEN SUM(CASE WHEN e.event_type = 'purchase' THEN COALESCE(e.value, 0) ELSE 0 END) / COUNT(DISTINCT CASE WHEN e.event_type = 'purchase' THEN e.id END)
          ELSE 0 
        END as avg_order_value
      FROM ab_variants v
      LEFT JOIN ab_events e ON v.id = e.variant_id AND e.experiment_id = ?
      WHERE v.experiment_id = ?
      GROUP BY v.id, v.name
      ORDER BY v.is_control DESC, v.created_at ASC`,
      [experimentId, experimentId]
    );
    return rows;
  } finally {
    connection.release();
  }
}

export async function getExperimentSummary(experimentId: number): Promise<{
  experiment: ABTestExperiment;
  variants: ABTestVariant[];
  metrics: ABTestMetrics[];
  total_assignments: number;
} | null> {
  const experiment = await getExperiment(experimentId);
  if (!experiment) return null;

  const variants = await getVariantsByExperiment(experimentId);
  const metrics = await getExperimentMetrics(experimentId);

  const connection = await db.getConnection();
  try {
    const [countRows] = await connection.execute<RowDataPacket[]>(
      "SELECT COUNT(*) as total FROM ab_assignments WHERE experiment_id = ?",
      [experimentId]
    );
    const totalAssignments = countRows[0].total;

    return {
      experiment,
      variants,
      metrics,
      total_assignments: totalAssignments,
    };
  } finally {
    connection.release();
  }
}