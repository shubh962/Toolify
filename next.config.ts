/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    serverActions: { bodySizeLimit: '10mb' },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "taskguru.online" },
      { protocol: "https", hostname: "www.taskguru.online" },
    ],
  },
  async redirects() {
    return [
      // 🔹 Redirect Vercel preview domain → main domain
      {
        source: "/:path*",
        has: [{ type: "host", value: "toolify-liard.vercel.app" }],
        destination: "https://www.taskguru.online/:path*",
        permanent: true,
      },
      // 🔹 Redirect NON-WWW → WWW
      {
        source: "/:path*",
        has: [{ type: "host", value: "taskguru.online" }],
        destination: "https://www.taskguru.online/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
