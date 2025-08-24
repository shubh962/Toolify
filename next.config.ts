import type { NextConfig } from "next";
import withCritters from "next-plugin-critters";

const nextConfig: NextConfig = {
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
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizeCss: true, // ✅ Enable Next.js CSS optimizer
  },
};

// ✅ Wrap with Critters plugin
export default withCritters({
  ...nextConfig,
  critters: {
    preload: "swap", // Preload fonts properly
    compress: true, // Minify CSS
  },
});
