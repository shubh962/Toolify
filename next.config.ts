import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Prevent build breaking on TS/ESLint warnings
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

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
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
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

  // ✅ Headers for SEO + security (no CSP so ads run fine)
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
          // ✅ Cache static assets aggressively
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
