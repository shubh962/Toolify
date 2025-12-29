/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

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

  async redirects() {
    return [
      // ✅ 0️⃣ ADS.TXT → EZOIC (MOST IMPORTANT)
      {
        source: "/ads.txt",
        destination: "https://srv.adstxtmanager.com/19390/taskguru.online",
        permanent: true,
      },

      // 1️⃣ Redirect Vercel → WWW
      {
        source: "/:path*",
        has: [{ type: "host", value: "toolify-liard.vercel.app" }],
        destination: "https://www.taskguru.online/:path*",
        permanent: true,
      },

      // 2️⃣ Redirect NON-WWW → WWW
      {
        source: "/:path*",
        has: [{ type: "host", value: "taskguru.online" }],
        destination: "https://www.taskguru.online/:path*",
        permanent: true,
      },
    ];
  },

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

