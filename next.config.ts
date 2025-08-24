import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "taskguru.online",
        pathname: "/**",
      },
    ],
  },

  // ✅ Enable Critters (CSS inlining) safely
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
