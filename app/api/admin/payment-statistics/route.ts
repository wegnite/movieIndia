import { getPaiedOrders, getPaidOrdersTotal, getOrderCountByDate } from "@/models/order";
import { respData, respErr } from "@/lib/resp";
import { getSupabaseClient } from "@/models/db";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const startDate = url.searchParams.get('start_date') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const endDate = url.searchParams.get('end_date') || new Date().toISOString();
    const granularity = url.searchParams.get('granularity') || 'daily';
    
    const supabase = getSupabaseClient();

    // Get all payment intents (orders with session IDs)
    const { data: allOrders, error: allOrdersError } = await supabase
      .from('orders')
      .select('*')
      .not('stripe_session_id', 'is', null)
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: true });

    if (allOrdersError) {
      return respErr('Failed to fetch orders: ' + allOrdersError.message);
    }

    // Get paid orders for conversion calculation
    const { data: paidOrders, error: paidOrdersError } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'paid')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: true });

    if (paidOrdersError) {
      return respErr('Failed to fetch paid orders: ' + paidOrdersError.message);
    }

    // Calculate key metrics
    const totalIntents = allOrders?.length || 0;
    const totalPaid = paidOrders?.length || 0;
    const conversionRate = totalIntents > 0 ? (totalPaid / totalIntents) * 100 : 0;
    const totalRevenue = paidOrders?.reduce((sum, order) => sum + (order.amount || 0), 0) / 100; // Convert from cents
    const revenuePerIntent = totalIntents > 0 ? totalRevenue / totalIntents : 0;

    // Plan distribution
    const planDistribution = paidOrders?.reduce((acc, order) => {
      const planName = order.product_name || 'Unknown';
      acc[planName] = (acc[planName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    // Currency breakdown
    const currencyBreakdown = paidOrders?.reduce((acc, order) => {
      const currency = order.currency?.toUpperCase() || 'Unknown';
      acc[currency] = (acc[currency] || 0) + (order.amount || 0) / 100;
      return acc;
    }, {} as Record<string, number>) || {};

    // Time series data
    const timeSeriesData = generateTimeSeriesData(allOrders || [], paidOrders || [], granularity, startDate, endDate);

    // Hourly activity (for bar chart)
    const hourlyActivity = generateHourlyActivity(allOrders || []);

    // User journey analysis
    const userJourneyData = await generateUserJourneyData(supabase, startDate, endDate);

    // Average time to conversion
    const averageTimeToConversion = calculateAverageTimeToConversion(paidOrders || []);

    // Top products by revenue
    const topProductsByRevenue = Object.entries(
      paidOrders?.reduce((acc, order) => {
        const productName = order.product_name || 'Unknown';
        acc[productName] = (acc[productName] || 0) + (order.amount || 0) / 100;
        return acc;
      }, {} as Record<string, number>) || {}
    )
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 10)
      .map(([name, revenue]) => ({ name, revenue }));

    const statistics = {
      overview: {
        totalIntents,
        totalPaid,
        conversionRate: Math.round(conversionRate * 100) / 100,
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        revenuePerIntent: Math.round(revenuePerIntent * 100) / 100,
        averageTimeToConversion: Math.round(averageTimeToConversion * 100) / 100
      },
      planDistribution,
      currencyBreakdown,
      timeSeriesData,
      hourlyActivity,
      userJourneyData,
      topProductsByRevenue
    };

    return respData(statistics);
  } catch (error: any) {
    console.error('Payment statistics error:', error);
    return respErr('Failed to fetch payment statistics: ' + error.message);
  }
}

function generateTimeSeriesData(
  allOrders: any[],
  paidOrders: any[],
  granularity: string,
  startDate: string,
  endDate: string
) {
  const data = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let current = new Date(start);
  
  while (current <= end) {
    let nextPeriod: Date;
    let key: string;
    
    if (granularity === 'hourly') {
      nextPeriod = new Date(current.getTime() + 60 * 60 * 1000);
      key = current.toISOString().slice(0, 13) + ':00:00.000Z';
    } else {
      nextPeriod = new Date(current.getTime() + 24 * 60 * 60 * 1000);
      key = current.toISOString().slice(0, 10);
    }
    
    const intentsInPeriod = allOrders.filter(order => {
      const orderDate = new Date(order.created_at);
      return orderDate >= current && orderDate < nextPeriod;
    }).length;
    
    const paidInPeriod = paidOrders.filter(order => {
      const orderDate = new Date(order.created_at);
      return orderDate >= current && orderDate < nextPeriod;
    }).length;
    
    const revenueInPeriod = paidOrders
      .filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate >= current && orderDate < nextPeriod;
      })
      .reduce((sum, order) => sum + (order.amount || 0) / 100, 0);
    
    data.push({
      date: key,
      intents: intentsInPeriod,
      conversions: paidInPeriod,
      revenue: Math.round(revenueInPeriod * 100) / 100,
      conversionRate: intentsInPeriod > 0 ? Math.round((paidInPeriod / intentsInPeriod) * 10000) / 100 : 0
    });
    
    current = nextPeriod;
  }
  
  return data;
}

function generateHourlyActivity(orders: any[]) {
  const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    count: 0
  }));
  
  orders.forEach(order => {
    const hour = new Date(order.created_at).getHours();
    hourlyData[hour].count++;
  });
  
  return hourlyData;
}

async function generateUserJourneyData(supabase: any, startDate: string, endDate: string) {
  // Simplified user journey - track session paths from creation to conversion
  const { data: sessions, error } = await supabase
    .from('orders')
    .select('stripe_session_id, status, created_at, paid_at')
    .not('stripe_session_id', 'is', null)
    .gte('created_at', startDate)
    .lte('created_at', endDate);
    
  if (error) {
    return { paths: [], conversionFunnel: [] };
  }
  
  const paths = {
    'Intent Created': sessions?.length || 0,
    'Payment Started': sessions?.length || 0, // All sessions started payment
    'Payment Completed': sessions?.filter((s: any) => s.status === 'paid').length || 0
  };
  
  const conversionFunnel = [
    { stage: 'Intent Created', count: paths['Intent Created'], percentage: 100 },
    { 
      stage: 'Payment Started', 
      count: paths['Payment Started'], 
      percentage: paths['Intent Created'] > 0 ? Math.round((paths['Payment Started'] / paths['Intent Created']) * 100) : 0
    },
    { 
      stage: 'Payment Completed', 
      count: paths['Payment Completed'], 
      percentage: paths['Intent Created'] > 0 ? Math.round((paths['Payment Completed'] / paths['Intent Created']) * 100) : 0
    }
  ];
  
  return { paths, conversionFunnel };
}

function calculateAverageTimeToConversion(paidOrders: any[]) {
  const conversionsWithTime = paidOrders
    .filter(order => order.paid_at && order.created_at)
    .map(order => {
      const created = new Date(order.created_at).getTime();
      const paid = new Date(order.paid_at).getTime();
      return (paid - created) / (1000 * 60); // Minutes
    });
    
  if (conversionsWithTime.length === 0) return 0;
  
  return conversionsWithTime.reduce((sum, time) => sum + time, 0) / conversionsWithTime.length;
}
