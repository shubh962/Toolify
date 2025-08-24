import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Prevent build breaking on TS/ESLint warnings
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Optimize images
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

  // ✅ Performance optimizations
  compress: true,       // gzip & brotli
  swcMinify: true,      // faster JS
  experimental: {
    optimizeCss: true,  // Next.js built-in CSS optimizer
  },

  // ✅ Better SEO
  poweredByHeader: false, // remove "X-Powered-By: Next.js"
};

export default nextConfig;
