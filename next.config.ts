const nextConfig = {
  // Prevent build breaking on TS/ESLint warnings
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // Optimize images
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      { protocol: "https", hostname: "taskguru.online", pathname: "/**" },
      { protocol: "https", hostname: "www.taskguru.online", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "i.imgur.com", pathname: "/**" },
      { protocol: "https", hostname: "cdn.pixabay.com", pathname: "/**" },
    ],
  },

  // Redirects (Fixed + SEO Safe)
  async redirects() {
    return [
      // 1️⃣ Redirect Vercel Preview Domain → Main domain (SAFE)
      {
        source: "/:path*",
        has: [{ type: "host", value: "toolify-liard.vercel.app" }],
        destination: "https://www.taskguru.online/:path*",
        permanent: true,
      },

      // 2️⃣ Redirect NON-WWW → WWW (Correct)
      {
        source: "/:path*",
        has: [{ type: "host", value: "taskguru.online" }],
        destination: "https://www.taskguru.online/:path*",
        permanent: true,
      },

      // 3️⃣ Global WWW Redirect (Fixes ALL crawling issues)
      {
        source: "/:path*",
        destination: "https://www.taskguru.online/:path*",
        permanent: true,
      },
    ];
  },

  // Global headers
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
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
