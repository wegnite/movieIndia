'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface LazyAdProps {
  adSlot: string
  adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical'
  className?: string
  adLayout?: string
  adLayoutKey?: string
}

declare global {
  interface Window {
    adsbygoogle?: any[]
  }
}

/**
 * 懒加载广告组件 - 提升页面性能和广告收入
 * 只有当广告位进入视口时才加载广告
 */
export default function LazyAd({
  adSlot,
  adFormat = 'auto',
  className,
  adLayout,
  adLayoutKey
}: LazyAdProps) {
  const adRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // 使用 Intersection Observer 检测广告位是否进入视口
  useEffect(() => {
    if (!adRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 当广告位进入视口时触发
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        // 提前50px开始加载，提升用户体验
        rootMargin: '50px',
        threshold: 0.01
      }
    )

    observer.observe(adRef.current)

    return () => {
      observer.disconnect()
    }
  }, [isVisible])

  // 当广告位可见时，加载广告
  useEffect(() => {
    if (isVisible && !isLoaded && typeof window !== 'undefined') {
      try {
        // 推送广告到 Google AdSense
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        setIsLoaded(true)
        
        // 记录广告加载事件（用于性能监控）
        if (window.gtag) {
          window.gtag('event', 'ad_load', {
            ad_slot: adSlot,
            ad_format: adFormat,
            page_path: window.location.pathname
          })
        }
      } catch (error) {
        console.error('广告加载失败:', error)
        
        // 记录错误（用于调试）
        if (window.gtag) {
          window.gtag('event', 'ad_error', {
            ad_slot: adSlot,
            error_message: error instanceof Error ? error.message : 'Unknown error'
          })
        }
      }
    }
  }, [isVisible, isLoaded, adSlot, adFormat])

  return (
    <div
      ref={adRef}
      className={cn(
        'ad-container min-h-[90px] flex items-center justify-center',
        className
      )}
    >
      {isVisible ? (
        <ins
          className="adsbygoogle"
          style={{ 
            display: 'block',
            textAlign: 'center'
          }}
          data-ad-client="ca-pub-6224617757558738"
          data-ad-slot={adSlot}
          data-ad-format={adFormat}
          data-ad-layout={adLayout}
          data-ad-layout-key={adLayoutKey}
          data-full-width-responsive="true"
        />
      ) : (
        // 占位符，避免布局跳动
        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg">
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            广告加载中...
          </div>
        </div>
      )}
    </div>
  )
}