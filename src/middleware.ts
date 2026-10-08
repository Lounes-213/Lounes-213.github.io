import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "@/lib/i18n/routing";

/**
 * The one edge entry point: locale negotiation (Accept-Language → cookie →
 * default) and the baseline security headers for every HTML response.
 *
 * CSP is deliberately not set here yet: a policy strict enough to matter needs
 * either a per-request nonce (which forces dynamic rendering) or hashes for the
 * exact inline scripts, and that trade-off belongs with the API/security pass,
 * where it can be verified against the production build instead of guessed.
 */
const handleI18nRouting = createMiddleware(routing);

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "X-DNS-Prefetch-Control": "on",
};

export default function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

export const config = {
  // Skip API routes, Next internals and anything with a file extension
  // (public assets). Locale paths like /fr or /ar/contact all match.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
