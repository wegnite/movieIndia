import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { withABTestSession } from "./lib/ab-test-middleware";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Handle internationalization first
  const intlResponse = intlMiddleware(request);
  
  // If intl middleware returns a redirect, use that response
  if (intlResponse && intlResponse.status >= 300 && intlResponse.status < 400) {
    return intlResponse;
  }
  
  // Add A/B test session handling
  const abTestResponse = withABTestSession(request);
  
  // Merge headers from intl response if it exists
  if (intlResponse && intlResponse.headers) {
    intlResponse.headers.forEach((value, key) => {
      abTestResponse.headers.set(key, value);
    });
  }
  
  return abTestResponse;
}

export const config = {
  matcher: [
    "/",
    "/(en|en-US|zh|zh-CN|zh-TW|zh-HK|zh-MO|ja|ko|ru|fr|de|ar|es|it)/:path*",
    "/((?!privacy-policy|terms-of-service|api/|_next|_vercel|sitemap.xml|robots.txt|site.webmanifest|favicon.ico|reviews|download|bookmyshow|watch-online|ott-release|news|cast|pricing|icon|.*\\..*).*)",
  ],
};
