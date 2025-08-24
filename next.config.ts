import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Strict mode for better performance & debugging
  reactStrictMode: true,

  // ✅ Ignore build blocking issues (you already had this)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Remote image domains
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "taskguru.online",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // ✅ Add Security + Performance Headers
  async headers() {
    return [
      {
        source: "/(.*)", // apply to all routes
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // prevent clickjacking
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; font-src 'self' https: data:; connect-src 'self' https:; frame-ancestors 'self';",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
        ],
      },
    ];
  },

  // ✅ Experimental optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
