import type { NextConfig } from "next";

// Define a Content Security Policy (CSP)
const ContentSecurityPolicy = [
  "default-src 'self'",
  // ✅ Allow Google + Ad networks
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://www.google.com https://www.gstatic.com https://ads.pubmatic.com https://securepubads.g.doubleclick.net https://fpyf8.com https://pl27365402.profitableratecpm.com https://groleegni.net",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src * blob: data:",
  "font-src 'self' https://fonts.gstatic.com data:",
  "connect-src *",
  "frame-src *",
  "media-src *",
  "worker-src 'self' blob:",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },

  // ✅ Prevent build breaking on warnings
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // ✅ Optimize images
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "taskguru.online" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
    ],
  },

  // ✅ Redirect Vercel subdomain to main domain
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "toolify-liard.vercel.app" }],
        destination: "https://taskguru.online/:path*",
        permanent: true,
      },
    ];
  },

  // ✅ Add strong security + performance headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "x-robots-tag", value: "index, follow" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "0" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: ContentSecurityPolicy },
          // ✅ Cache static assets aggressively
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
