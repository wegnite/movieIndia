import { respData, respErr } from "@/lib/resp";
import { getSupabaseClient } from "@/models/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const startDate = url.searchParams.get('start_date') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const endDate = url.searchParams.get('end_date') || new Date().toISOString();
    const includePaymentIntents = url.searchParams.get('include_payment_intents') === 'true';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const status = url.searchParams.get('status');
    
    const supabase = getSupabaseClient();
    
    let query = supabase
      .from('orders')
      .select('*')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false });
    
    // If we only want payment intents (orders with session IDs)
    if (includePaymentIntents) {
      query = query.not('stripe_session_id', 'is', null);
    }
    
    // Filter by status if provided
    if (status && status !== 'all') {
      query = query.eq('status', status);
    }
    
    // Apply pagination
    const startIndex = (page - 1) * limit;
    query = query.range(startIndex, startIndex + limit - 1);
    
    const { data, error } = await query;
    
    if (error) {
      return respErr('Failed to fetch orders: ' + error.message);
    }
    
    return respData(data || []);
  } catch (error: any) {
    console.error('Orders fetch error:', error);
    return respErr('Failed to fetch orders: ' + error.message);
  }
}
