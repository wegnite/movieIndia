import { PaymentIntentData, PaymentIntentStats } from '@/types/payment-intent';
import { paymentIntentStorage } from './payment-intent-storage';

export interface PaymentIntentAnalytics {
  // Time-based analysis
  getHourlyDistribution(data: PaymentIntentData[]): Record<string, number>;
  getDayOfWeekDistribution(data: PaymentIntentData[]): Record<string, number>;
  getMonthlyTrends(data: PaymentIntentData[]): Record<string, number>;
  
  // User behavior analysis
  getTopUserAgents(data: PaymentIntentData[], limit?: number): Array<{ userAgent: string; count: number }>;
  getTopCountries(data: PaymentIntentData[]): Record<string, number>;
  getSessionAnalysis(data: PaymentIntentData[]): {
    averageSessionValue: number;
    sessionsWithMultipleIntents: number;
    topSessions: Array<{ sessionId: string; intentCount: number; totalValue: number }>;
  };
  
  // Business intelligence
  getConversionFunnel(data: PaymentIntentData[]): {
    totalIntents: number;
    withEmail: number;
    withFeedback: number;
    conversionRate: number;
  };
  getPlanPerformance(data: PaymentIntentData[]): Array<{
    planName: string;
    count: number;
    totalRevenue: number;
    averageValue: number;
    conversionRate: number;
  }>;
}

export class PaymentIntentAnalyticsService implements PaymentIntentAnalytics {
  
  /**
   * Get hourly distribution of payment intents
   */
  getHourlyDistribution(data: PaymentIntentData[]): Record<string, number> {
    const hourly: Record<string, number> = {};
    
    for (let i = 0; i < 24; i++) {
      hourly[i.toString().padStart(2, '0')] = 0;
    }
    
    data.forEach(intent => {
      const hour = new Date(intent.timestamp).getHours().toString().padStart(2, '0');
      hourly[hour]++;
    });
    
    return hourly;
  }

  /**
   * Get day of week distribution
   */
  getDayOfWeekDistribution(data: PaymentIntentData[]): Record<string, number> {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const distribution: Record<string, number> = {};
    
    days.forEach(day => distribution[day] = 0);
    
    data.forEach(intent => {
      const dayName = days[new Date(intent.timestamp).getDay()];
      distribution[dayName]++;
    });
    
    return distribution;
  }

  /**
   * Get monthly trends
   */
  getMonthlyTrends(data: PaymentIntentData[]): Record<string, number> {
    const monthly: Record<string, number> = {};
    
    data.forEach(intent => {
      const monthKey = new Date(intent.timestamp).toISOString().substr(0, 7); // YYYY-MM
      monthly[monthKey] = (monthly[monthKey] || 0) + 1;
    });
    
    return monthly;
  }

  /**
   * Get top user agents
   */
  getTopUserAgents(data: PaymentIntentData[], limit = 10): Array<{ userAgent: string; count: number }> {
    const userAgentCounts: Record<string, number> = {};
    
    data.forEach(intent => {
      // Extract browser info from user agent
      const cleanUA = this.cleanUserAgent(intent.userAgent);
      userAgentCounts[cleanUA] = (userAgentCounts[cleanUA] || 0) + 1;
    });
    
    return Object.entries(userAgentCounts)
      .map(([userAgent, count]) => ({ userAgent, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  }

  /**
   * Clean and simplify user agent string
   */
  private cleanUserAgent(userAgent: string): string {
    // Extract major browser and OS info
    const browserRegex = /(Chrome|Firefox|Safari|Edge|Opera)\/[\d.]+/;
    const osRegex = /(Windows NT|macOS|Mac OS X|Linux|Android|iOS)/;
    
    const browser = userAgent.match(browserRegex)?.[0] || 'Unknown Browser';
    const os = userAgent.match(osRegex)?.[0] || 'Unknown OS';
    
    return `${browser} on ${os}`;
  }

  /**
   * Get approximate country distribution based on common patterns
   * Note: This is a basic implementation. For production, use a proper GeoIP service.
   */
  getTopCountries(data: PaymentIntentData[]): Record<string, number> {
    const countries: Record<string, number> = {};
    
    data.forEach(intent => {
      // This is a simplified approach - in production, use GeoIP lookup
      const country = this.guessCountryFromIP(intent.ipAddress);
      countries[country] = (countries[country] || 0) + 1;
    });
    
    return countries;
  }

  /**
   * Basic country guessing (placeholder - use proper GeoIP in production)
   */
  private guessCountryFromIP(ip: string): string {
    // This is a placeholder implementation
    // In production, integrate with a GeoIP service like MaxMind or ipapi
    if (ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
      return 'Local Network';
    }
    return 'Unknown';
  }

  /**
   * Analyze session behavior
   */
  getSessionAnalysis(data: PaymentIntentData[]): {
    averageSessionValue: number;
    sessionsWithMultipleIntents: number;
    topSessions: Array<{ sessionId: string; intentCount: number; totalValue: number }>;
  } {
    const sessionData: Record<string, { count: number; totalValue: number }> = {};
    
    data.forEach(intent => {
      if (!sessionData[intent.sessionId]) {
        sessionData[intent.sessionId] = { count: 0, totalValue: 0 };
      }
      
      sessionData[intent.sessionId].count++;
      const amount = typeof intent.amount === 'string' ? parseFloat(intent.amount) : intent.amount;
      if (!isNaN(amount)) {
        sessionData[intent.sessionId].totalValue += amount;
      }
    });
    
    const sessions = Object.entries(sessionData);
    const totalValue = sessions.reduce((sum, [, data]) => sum + data.totalValue, 0);
    const averageSessionValue = sessions.length > 0 ? totalValue / sessions.length : 0;
    
    const sessionsWithMultipleIntents = sessions.filter(([, data]) => data.count > 1).length;
    
    const topSessions = sessions
      .map(([sessionId, data]) => ({
        sessionId,
        intentCount: data.count,
        totalValue: data.totalValue
      }))
      .sort((a, b) => b.totalValue - a.totalValue)
      .slice(0, 10);
    
    return {
      averageSessionValue,
      sessionsWithMultipleIntents,
      topSessions
    };
  }

  /**
   * Get conversion funnel analysis
   */
  getConversionFunnel(data: PaymentIntentData[]): {
    totalIntents: number;
    withEmail: number;
    withFeedback: number;
    conversionRate: number;
  } {
    const totalIntents = data.length;
    const withEmail = data.filter(intent => intent.userEmail && intent.userEmail.trim() !== '').length;
    const withFeedback = data.filter(intent => intent.feedback && intent.feedback.trim() !== '').length;
    
    const conversionRate = totalIntents > 0 ? (withEmail / totalIntents) * 100 : 0;
    
    return {
      totalIntents,
      withEmail,
      withFeedback,
      conversionRate
    };
  }

  /**
   * Get plan performance analysis
   */
  getPlanPerformance(data: PaymentIntentData[]): Array<{
    planName: string;
    count: number;
    totalRevenue: number;
    averageValue: number;
    conversionRate: number;
  }> {
    const planData: Record<string, {
      count: number;
      totalRevenue: number;
      withEmail: number;
    }> = {};
    
    data.forEach(intent => {
      if (!planData[intent.planName]) {
        planData[intent.planName] = { count: 0, totalRevenue: 0, withEmail: 0 };
      }
      
      planData[intent.planName].count++;
      
      const amount = typeof intent.amount === 'string' ? parseFloat(intent.amount) : intent.amount;
      if (!isNaN(amount)) {
        planData[intent.planName].totalRevenue += amount;
      }
      
      if (intent.userEmail && intent.userEmail.trim() !== '') {
        planData[intent.planName].withEmail++;
      }
    });
    
    return Object.entries(planData).map(([planName, data]) => ({
      planName,
      count: data.count,
      totalRevenue: data.totalRevenue,
      averageValue: data.count > 0 ? data.totalRevenue / data.count : 0,
      conversionRate: data.count > 0 ? (data.withEmail / data.count) * 100 : 0
    })).sort((a, b) => b.totalRevenue - a.totalRevenue);
  }
}

/**
 * Generate comprehensive analytics report
 */
export async function generateAnalyticsReport(
  startDate?: Date,
  endDate?: Date
): Promise<{
  period: { start: string; end: string };
  basicStats: PaymentIntentStats;
  timeAnalysis: {
    hourly: Record<string, number>;
    dayOfWeek: Record<string, number>;
    monthly: Record<string, number>;
  };
  userAnalysis: {
    topUserAgents: Array<{ userAgent: string; count: number }>;
    sessionAnalysis: ReturnType<PaymentIntentAnalyticsService['getSessionAnalysis']>;
  };
  businessIntelligence: {
    conversionFunnel: ReturnType<PaymentIntentAnalyticsService['getConversionFunnel']>;
    planPerformance: ReturnType<PaymentIntentAnalyticsService['getPlanPerformance']>;
  };
}> {
  const analytics = new PaymentIntentAnalyticsService();
  
  // Query data with date filters
  const data = await paymentIntentStorage.queryPaymentIntents({
    startDate,
    endDate
  });
  
  // Generate basic statistics
  const basicStats = await paymentIntentStorage.generateStatistics();
  
  return {
    period: {
      start: startDate?.toISOString() || 'beginning',
      end: endDate?.toISOString() || 'now'
    },
    basicStats,
    timeAnalysis: {
      hourly: analytics.getHourlyDistribution(data),
      dayOfWeek: analytics.getDayOfWeekDistribution(data),
      monthly: analytics.getMonthlyTrends(data)
    },
    userAnalysis: {
      topUserAgents: analytics.getTopUserAgents(data),
      sessionAnalysis: analytics.getSessionAnalysis(data)
    },
    businessIntelligence: {
      conversionFunnel: analytics.getConversionFunnel(data),
      planPerformance: analytics.getPlanPerformance(data)
    }
  };
}

// Export singleton instance
export const paymentIntentAnalytics = new PaymentIntentAnalyticsService();