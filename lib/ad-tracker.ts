/**
 * Google AdSense 性能追踪系统
 * 用于监控广告展示、点击率和收入
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      parameters?: Record<string, any>
    ) => void
  }
}

export class AdTracker {
  private static viewabilityTimers: Map<string, number> = new Map()

  /**
   * 追踪广告展示
   */
  static trackImpression(slotId: string, adType?: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_impression', {
        ad_slot: slotId,
        ad_type: adType || 'display',
        page_path: window.location.pathname,
        page_title: document.title,
        timestamp: new Date().toISOString()
      })

      // 开始计算可见时间
      this.viewabilityTimers.set(slotId, Date.now())
    }
  }

  /**
   * 追踪广告可见性（用于计算有效展示）
   */
  static trackViewability(slotId: string) {
    const startTime = this.viewabilityTimers.get(slotId)
    if (!startTime) return

    const viewTime = Date.now() - startTime
    
    // Google AdSense 认为广告可见1秒以上为有效展示
    const isViewable = viewTime >= 1000

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_viewability', {
        ad_slot: slotId,
        view_time: viewTime,
        is_viewable: isViewable,
        page_path: window.location.pathname
      })
    }

    // 清理计时器
    this.viewabilityTimers.delete(slotId)
  }

  /**
   * 追踪广告点击
   */
  static trackClick(slotId: string, adPosition?: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_click', {
        ad_slot: slotId,
        ad_position: adPosition || 'unknown',
        page_path: window.location.pathname,
        page_title: document.title,
        timestamp: new Date().toISOString()
      })
    }
  }

  /**
   * 追踪广告收入（估算）
   */
  static trackRevenue(estimatedCPM: number, impressions: number = 1) {
    const estimatedRevenue = (estimatedCPM * impressions) / 1000
    
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_revenue', {
        value: estimatedRevenue,
        currency: 'USD',
        impressions: impressions,
        cpm: estimatedCPM,
        page_path: window.location.pathname
      })
    }
  }

  /**
   * 追踪页面停留时间（影响广告收入）
   */
  static trackEngagement(engagementType: 'scroll' | 'click' | 'video' | 'form') {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'user_engagement', {
        engagement_type: engagementType,
        page_path: window.location.pathname,
        timestamp: new Date().toISOString()
      })
    }
  }

  /**
   * 追踪广告加载错误
   */
  static trackError(slotId: string, errorType: string, errorMessage?: string) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_error', {
        ad_slot: slotId,
        error_type: errorType,
        error_message: errorMessage || 'Unknown error',
        page_path: window.location.pathname,
        user_agent: navigator.userAgent
      })
    }
  }

  /**
   * 获取广告性能报告
   */
  static generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
      metrics: {
        viewability: this.calculateViewability(),
        engagement: this.calculateEngagement(),
        performance: this.calculatePerformance()
      }
    }

    return report
  }

  /**
   * 计算可见性指标
   */
  private static calculateViewability() {
    // 实际实现需要从Analytics API获取数据
    return {
      averageViewTime: 0,
      viewableImpressions: 0,
      totalImpressions: 0
    }
  }

  /**
   * 计算用户互动指标
   */
  private static calculateEngagement() {
    return {
      averageSessionDuration: 0,
      pagesPerSession: 0,
      bounceRate: 0
    }
  }

  /**
   * 计算性能指标
   */
  private static calculatePerformance() {
    return {
      ctr: 0, // Click-through rate
      rpm: 0, // Revenue per mille
      fillRate: 0 // Ad fill rate
    }
  }
}

/**
 * 自动追踪页面滚动深度（影响广告展示）
 */
export function initScrollTracking() {
  if (typeof window === 'undefined') return

  let maxScroll = 0
  let scrollTimer: NodeJS.Timeout

  const trackScroll = () => {
    const scrollPercentage = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    )

    if (scrollPercentage > maxScroll) {
      maxScroll = scrollPercentage

      // 每达到25%的里程碑就记录
      if (maxScroll >= 25 && maxScroll < 50) {
        AdTracker.trackEngagement('scroll')
      } else if (maxScroll >= 50 && maxScroll < 75) {
        AdTracker.trackEngagement('scroll')
      } else if (maxScroll >= 75) {
        AdTracker.trackEngagement('scroll')
      }
    }
  }

  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(trackScroll, 100)
  })
}

/**
 * 初始化广告性能监控
 */
export function initAdTracking() {
  if (typeof window === 'undefined') return

  // 监控页面可见性变化
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // 页面隐藏时，记录所有广告的可见性
      AdTracker.viewabilityTimers.forEach((_, slotId) => {
        AdTracker.trackViewability(slotId)
      })
    }
  })

  // 监控页面卸载
  window.addEventListener('beforeunload', () => {
    // 发送最终的性能报告
    const report = AdTracker.generateReport()
    
    // 使用 sendBeacon 确保数据发送
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/ad-report', JSON.stringify(report))
    }
  })

  // 初始化滚动追踪
  initScrollTracking()
}