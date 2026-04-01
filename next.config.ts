/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ 1. Ignore TypeScript & ESLint build errors for faster deployment
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // ✅ 2. Increase server action payload limit
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  // ✅ 3. Allow external images
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "taskguru.online" },
      { protocol: "https", hostname: "www.taskguru.online" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
    ],
  },

  // ✅ 4. FIX: Webpack Canvas Error (For pdfjs-dist compatibility)
  webpack: (config, { isServer }) => {
    // Server-side build ke waqt canvas module ko ignore karein
    if (isServer) {
      config.resolve.alias.canvas = false;
    }
    return config;
  },

  // ✅ 5. REDIRECTS (Cleaned: Ezoic Removed, Adsterra Ready)
  async redirects() {
    return [
      // 🔹 5.1 Redirect Vercel preview domain → main domain
      {
        source: "/:path*",
        has: [{ type: "host", value: "toolify-liard.vercel.app" }],
        destination: "https://www.taskguru.online/:path*",
        permanent: true,
      },

      // 🔹 5.2 Redirect NON-WWW → WWW (SEO Best Practice)
      {
        source: "/:path*",
        has: [{ type: "host", value: "taskguru.online" }],
        destination: "https://www.taskguru.online/:path*",
        permanent: true,
      },
    ];
  },

  // ✅ 6. Security + SEO headers
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
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
