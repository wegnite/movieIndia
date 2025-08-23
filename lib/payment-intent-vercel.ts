/**
 * Vercel-compatible payment intent storage
 * Uses Vercel KV for serverless environment
 */

// Type-safe KV client wrapper
interface KVClient {
  set: (key: string, value: any, options?: { ex?: number }) => Promise<void>;
  get: (key: string) => Promise<any>;
  keys: (pattern: string) => Promise<string[]>;
  del: (key: string) => Promise<void>;
  expire: (key: string, seconds: number) => Promise<void>;
  incr: (key: string) => Promise<number>;
}

let kvClient: KVClient | null = null;

// Lazy load KV client
async function getKVClient(): Promise<KVClient | null> {
  if (kvClient) return kvClient;
  
  // Check if running on Vercel with KV enabled
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    try {
      const { kv } = await import('@vercel/kv');
      kvClient = kv as unknown as KVClient;
      return kvClient;
    } catch (error) {
      console.error('Failed to load Vercel KV:', error);
      return null;
    }
  }
  
  return null;
}

// Fallback to in-memory storage for development
const memoryStore = new Map<string, any>();

export async function savePaymentIntent(data: any): Promise<string> {
  const id = crypto.randomUUID();
  const key = `payment_intent:${id}`;
  const timestamp = new Date().toISOString();
  
  const intentData = {
    ...data,
    id,
    createdAt: timestamp,
    sessionId: data.sessionId || generateSessionId()
  };
  
  const kv = await getKVClient();
  
  if (kv) {
    // Use Vercel KV in production
    await kv.set(key, intentData, { ex: 365 * 24 * 60 * 60 }); // 1 year expiry
    
    // Update daily counter
    const dateKey = `payment_intent:stats:${timestamp.split('T')[0]}`;
    await kv.incr(dateKey);
    
    // Store in index for listing
    const indexKey = `payment_intent:index:${timestamp.split('T')[0]}`;
    const index = (await kv.get(indexKey)) || [];
    index.push(id);
    await kv.set(indexKey, index, { ex: 365 * 24 * 60 * 60 });
  } else {
    // Fallback to memory storage in development
    memoryStore.set(key, intentData);
    console.log('💾 Saved to memory store (development mode):', id);
  }
  
  return id;
}

export async function getPaymentIntent(id: string): Promise<any | null> {
  const key = `payment_intent:${id}`;
  const kv = await getKVClient();
  
  if (kv) {
    return await kv.get(key);
  } else {
    return memoryStore.get(key) || null;
  }
}

export async function getPaymentIntents(options?: {
  limit?: number;
  offset?: number;
  date?: string;
}): Promise<any[]> {
  const kv = await getKVClient();
  const intents: any[] = [];
  
  if (kv) {
    // Get from KV store
    const pattern = options?.date 
      ? `payment_intent:index:${options.date}`
      : 'payment_intent:index:*';
    
    const indexKeys = await kv.keys(pattern);
    
    for (const indexKey of indexKeys) {
      const ids = (await kv.get(indexKey)) || [];
      for (const id of ids) {
        const data = await getPaymentIntent(id);
        if (data) intents.push(data);
      }
    }
  } else {
    // Get from memory store
    for (const [key, value] of memoryStore.entries()) {
      if (key.startsWith('payment_intent:')) {
        intents.push(value);
      }
    }
  }
  
  // Sort by creation date (newest first)
  intents.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  
  // Apply pagination
  const start = options?.offset || 0;
  const end = start + (options?.limit || 100);
  
  return intents.slice(start, end);
}

export async function getPaymentIntentStats(): Promise<{
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  byPlan: Record<string, number>;
}> {
  const intents = await getPaymentIntents();
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const stats = {
    total: intents.length,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    byPlan: {} as Record<string, number>
  };
  
  for (const intent of intents) {
    const date = new Date(intent.createdAt);
    
    if (date.toISOString().split('T')[0] === today) {
      stats.today++;
    }
    if (date >= weekAgo) {
      stats.thisWeek++;
    }
    if (date >= monthAgo) {
      stats.thisMonth++;
    }
    
    // Count by plan
    const plan = intent.planName || 'Unknown';
    stats.byPlan[plan] = (stats.byPlan[plan] || 0) + 1;
  }
  
  return stats;
}

function generateSessionId(): string {
  const array = new Uint8Array(8);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Clean up old entries (for scheduled jobs)
export async function cleanupOldIntents(daysToKeep: number = 90): Promise<number> {
  const kv = await getKVClient();
  if (!kv) return 0;
  
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
  
  const allKeys = await kv.keys('payment_intent:*');
  let deleted = 0;
  
  for (const key of allKeys) {
    if (key.includes(':index:') || key.includes(':stats:')) continue;
    
    const data = await kv.get(key);
    if (data && data.createdAt) {
      const createdAt = new Date(data.createdAt);
      if (createdAt < cutoffDate) {
        await kv.del(key);
        deleted++;
      }
    }
  }
  
  return deleted;
}