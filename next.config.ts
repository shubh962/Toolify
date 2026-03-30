/** @type {import('next').NextConfig} */
const nextConfig = {

  // ✅ 1. Ignore TypeScript build errors (not recommended long term)
  typescript: { ignoreBuildErrors: true },

  // ✅ 2. Ignore ESLint errors during build
  eslint: { ignoreDuringBuilds: true },

  // ✅ 3. Increase server action payload limit
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  // ✅ 4. Allow external images (for tools like background remover, etc.)
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

  // ✅ 5. Fix canvas error (important for some libraries)
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },

  // ✅ 6. REDIRECTS (MOST IMPORTANT PART)
  async redirects() {
    return [

      // 🔥 6.1 EZOIC ADS.TXT REDIRECT (MUST BE FIRST)
      {
        source: "/ads.txt",
        destination: "https://srv.adstxtmanager.com/19390/taskguru.online",
        permanent: true,
      },

      // 🔹 6.2 Redirect Vercel preview domain → main domain
      {
        source: "/:path*",
        has: [{ type: "host", value: "toolify-liard.vercel.app" }],
        destination: "https://www.taskguru.online/:path*",
        permanent: true,
      },

      // 🔹 6.3 Redirect NON-WWW → WWW
      {
        source: "/:path*",
        has: [{ type: "host", value: "taskguru.online" }],
        destination: "https://www.taskguru.online/:path*",
        permanent: true,
      },
    ];
  },

  // ✅ 7. Security + SEO headers
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
