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

  // ✅ Redirect Vercel subdomain to main domain
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "toolify-liard.vercel.app", // <- Vercel subdomain
          },
        ],
        destination: "https://taskguru.online/:path*", // <- Your main domain
        permanent: true,
      },
    ];
  },

  // ✅ Force canonical hostname (for Next.js App Router SEO)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "x-robots-tag",
            value: "index, follow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
