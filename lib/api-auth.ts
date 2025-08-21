import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'

/**
 * API 认证中间件
 * 用于保护需要身份验证的 API 端点
 */
export async function requireAuth(request: NextRequest) {
  try {
    // 获取当前会话 - NextAuth v5 使用 auth() 函数
    const session = await auth()
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: '未授权访问' },
        { status: 401 }
      )
    }
    
    return session
  } catch (error) {
    console.error('认证错误:', error)
    return NextResponse.json(
      { error: '认证失败' },
      { status: 500 }
    )
  }
}

/**
 * API 速率限制器
 * 防止 API 滥用
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000 // 默认1分钟
) {
  const now = Date.now()
  const limit = rateLimitMap.get(identifier)
  
  if (!limit || now > limit.resetTime) {
    // 重置或初始化限制
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs
    })
    return true
  }
  
  if (limit.count >= maxRequests) {
    return false // 超过速率限制
  }
  
  // 增加计数
  limit.count++
  rateLimitMap.set(identifier, limit)
  return true
}

/**
 * 获取客户端 IP 地址
 * 用于速率限制
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
  return ip
}

/**
 * API 响应包装器
 * 统一 API 响应格式
 */
export function apiResponse<T>(
  data: T | null,
  error: string | null = null,
  status: number = 200
) {
  if (error) {
    return NextResponse.json(
      { 
        success: false, 
        error,
        timestamp: new Date().toISOString()
      },
      { status }
    )
  }
  
  return NextResponse.json(
    { 
      success: true, 
      data,
      timestamp: new Date().toISOString()
    },
    { status }
  )
}

/**
 * 验证请求体
 * 确保必需字段存在
 */
export function validateRequestBody<T extends Record<string, any>>(
  body: any,
  requiredFields: (keyof T)[]
): { valid: boolean; missing?: string[] } {
  if (!body || typeof body !== 'object') {
    return { valid: false, missing: requiredFields as string[] }
  }
  
  const missing = requiredFields.filter(field => !(field in body))
  
  return {
    valid: missing.length === 0,
    missing: missing as string[]
  }
}

/**
 * CORS 头部设置
 * 用于跨域请求
 */
export function setCorsHeaders(response: NextResponse): NextResponse {
  const origin = process.env.NEXT_PUBLIC_WEB_URL || 'https://mahavatar-narsimha.com'
  
  response.headers.set('Access-Control-Allow-Origin', origin)
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Max-Age', '86400')
  
  return response
}

/**
 * 安全头部设置
 * 增强 API 安全性
 */
export function setSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Content-Security-Policy', "default-src 'self'")
  
  return response
}