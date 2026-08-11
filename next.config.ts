import path from "node:path";
import type { NextConfig } from "next";

// Permite lo mínimo necesario: scripts/beacons de Meta Pixel y TikTok Pixel
// (se montan solo si META_PIXEL_ID/TIKTOK_PIXEL_ID están configurados), más
// Vercel Analytics (que se sirve desde el propio dominio, no necesita regla
// aparte). Stripe Checkout es una redirección de página completa, no un
// iframe, así que no hace falta frame-src para Stripe.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://connect.facebook.net https://analytics.tiktok.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.facebook.com https://analytics.tiktok.com",
  "connect-src 'self' https://www.facebook.com https://analytics.tiktok.com",
  "font-src 'self' data:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://checkout.stripe.com",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
