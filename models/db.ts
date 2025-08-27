import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL || "";

  let supabaseKey = process.env.SUPABASE_ANON_KEY || "";
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  }

  if (!supabaseUrl || !supabaseKey) {
    // Return a mock client if not configured
    console.warn("Supabase not configured, using mock database");
    return null;
  }

  const client = createClient(supabaseUrl, supabaseKey);

  return client;
}

// Export db as an alias for getSupabaseClient
export const db = getSupabaseClient;
