import { NextRequest, NextResponse } from "next/server";

const AB_TEST_SESSION_COOKIE = "ab_session_id";
const AB_TEST_SESSION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

/**
 * Generate a unique session ID for A/B testing
 * Using Web Crypto API which is available in Edge Runtime
 */
function generateSessionId(): string {
  // Generate a random UUID using Web Crypto API (Edge Runtime compatible)
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  
  // Set version (4) and variant bits
  array[6] = (array[6] & 0x0f) | 0x40; // Version 4
  array[8] = (array[8] & 0x3f) | 0x80; // Variant 10
  
  // Convert to hex string and format as UUID
  const hex = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

/**
 * Get or create A/B test session ID from cookies
 */
export function getABTestSessionId(request: NextRequest): string {
  const existingSessionId = request.cookies.get(AB_TEST_SESSION_COOKIE)?.value;
  
  if (existingSessionId && isValidSessionId(existingSessionId)) {
    return existingSessionId;
  }
  
  return generateSessionId();
}

/**
 * Validate session ID format
 */
function isValidSessionId(sessionId: string): boolean {
  // Check if it's a valid UUID v4
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(sessionId);
}

/**
 * Set A/B test session cookie in response
 */
export function setABTestSession(response: NextResponse, sessionId: string): void {
  response.cookies.set({
    name: AB_TEST_SESSION_COOKIE,
    value: sessionId,
    maxAge: AB_TEST_SESSION_DURATION / 1000, // Convert to seconds
    httpOnly: false, // Allow client-side access for React components
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Middleware function to handle A/B test session management
 */
export function withABTestSession(request: NextRequest): NextResponse {
  const response = NextResponse.next();
  const sessionId = getABTestSessionId(request);
  
  // Set session cookie if it doesn't exist or is invalid
  const existingSessionId = request.cookies.get(AB_TEST_SESSION_COOKIE)?.value;
  if (!existingSessionId || !isValidSessionId(existingSessionId)) {
    setABTestSession(response, sessionId);
  }
  
  // Add session ID to request headers for server components
  response.headers.set("x-ab-session-id", sessionId);
  
  return response;
}

/**
 * Get session ID from server-side context (RSC or API routes)
 */
export function getSessionIdFromHeaders(headers: Headers): string {
  const sessionId = headers.get("x-ab-session-id");
  
  if (sessionId && isValidSessionId(sessionId)) {
    return sessionId;
  }
  
  // Fallback - generate new session (should rarely happen)
  return generateSessionId();
}

/**
 * Client-side hook to get session ID from cookies
 */
export function getClientSessionId(): string {
  if (typeof window === "undefined") {
    return generateSessionId();
  }
  
  const cookies = document.cookie.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  const sessionId = cookies[AB_TEST_SESSION_COOKIE];
  
  if (sessionId && isValidSessionId(sessionId)) {
    return sessionId;
  }
  
  // Generate new session ID and set cookie
  const newSessionId = generateSessionId();
  const expires = new Date(Date.now() + AB_TEST_SESSION_DURATION);
  document.cookie = `${AB_TEST_SESSION_COOKIE}=${newSessionId}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }`;
  
  return newSessionId;
}

/**
 * Hash string using Web Crypto API (Edge Runtime compatible)
 */
async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash IP address for privacy-preserving consistency
 */
export function hashIP(ip: string): string {
  // For Edge Runtime, use a simpler hash that doesn't require async
  // This is a simple hash function that's good enough for distribution
  const str = ip + (process.env.AB_TEST_SALT || "default_salt");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

/**
 * Hash user agent for device consistency
 */
export function hashUserAgent(userAgent: string): string {
  // Extract key parts of user agent for consistency while preserving privacy
  const keyParts = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/[\d.]+|Mobile|Windows|Mac|Linux/g) || [];
  const normalizedUA = keyParts.join("|");
  
  // Simple hash for Edge Runtime
  const str = normalizedUA + (process.env.AB_TEST_SALT || "default_salt");
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

/**
 * Extract user context for consistent assignment
 */
export interface UserContext {
  sessionId: string;
  ipHash?: string;
  userAgentHash?: string;
  userId?: number;
}

export function extractUserContext(request: NextRequest, userId?: number): UserContext {
  const sessionId = getABTestSessionId(request);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
    request.headers.get("x-real-ip") || 
    "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  
  return {
    sessionId,
    ipHash: ip !== "unknown" ? hashIP(ip) : undefined,
    userAgentHash: userAgent !== "unknown" ? hashUserAgent(userAgent) : undefined,
    userId,
  };
}

/**
 * A/B test feature flag checker
 */
export async function isFeatureEnabled(flagName: string): Promise<boolean> {
  try {
    // This would typically check your feature flag system
    // For now, we'll use environment variables as a simple implementation
    const envVar = `FEATURE_${flagName.toUpperCase().replace(/[^A-Z0-9]/g, "_")}`;
    return process.env[envVar] === "true";
  } catch (error) {
    console.error(`Error checking feature flag ${flagName}:`, error);
    return false;
  }
}

/**
 * Bot detection for excluding from A/B tests
 */
export function isBot(userAgent: string): boolean {
  const botPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python/i,
    /java/i,
    /go-http/i,
    /okhttp/i,
    /apache-httpclient/i,
    /facebookexternalhit/i,
    /twitterbot/i,
    /linkedinbot/i,
    /slackbot/i,
    /telegrambot/i,
    /discordbot/i,
    /whatsapp/i,
    /googlebot/i,
    /bingbot/i,
    /yandexbot/i,
    /baiduspider/i,
    /duckduckbot/i,
    /applebot/i,
    /facebot/i,
    /ia_archiver/i,
    /msnbot/i,
    /naverbot/i,
    /sogou/i,
    /yahoo/i,
    /seomatic/i,
    /lighthouse/i,
    /pagespeed/i,
    /gtmetrix/i,
    /pingdom/i,
    /uptime/i,
    /monitor/i,
    /check/i,
    /test/i,
    /headless/i,
    /phantom/i,
    /selenium/i,
    /webdriver/i,
    /playwright/i,
    /puppeteer/i,
  ];
  
  return botPatterns.some(pattern => pattern.test(userAgent));
}

/**
 * Quality assurance for A/B test assignment
 */
export interface AssignmentQuality {
  isValid: boolean;
  reason?: string;
  shouldExclude: boolean;
}

export function assessAssignmentQuality(context: UserContext, userAgent: string): AssignmentQuality {
  // Check for bots
  if (isBot(userAgent)) {
    return {
      isValid: false,
      reason: "Bot detected",
      shouldExclude: true,
    };
  }
  
  // Check for valid session
  if (!context.sessionId || !isValidSessionId(context.sessionId)) {
    return {
      isValid: false,
      reason: "Invalid session ID",
      shouldExclude: false,
    };
  }
  
  // Check for localhost/development
  if (process.env.NODE_ENV !== "production") {
    return {
      isValid: true,
      reason: "Development environment",
      shouldExclude: false,
    };
  }
  
  return {
    isValid: true,
    shouldExclude: false,
  };
}