/**
 * Content-Security-Policy notes:
 *  - 'unsafe-inline' is required for scripts because Next's App Router injects
 *    an inline bootstrap and the JSON-LD block; tightening this means moving to
 *    nonces, which needs middleware and breaks static generation.
 *  - blob: is needed by react-pdf's pdf.js worker on /curriculo.
 *  - next/font self-hosts Google Fonts at build time, so font-src 'self' is
 *    enough; fonts.gstatic.com is kept as a fallback.
 * It is deliberately permissive rather than aspirational — a CSP that breaks
 * the page gets deleted, one that blocks injected third-party origins survives.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint runs separately in CI; skip during next build to avoid false failures
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
