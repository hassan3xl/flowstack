import type { NextConfig } from "next";
import withPWA from "next-pwa";

const isDev = process.env.NODE_ENV === "development";

const config: NextConfig = {
  // No turbopack config needed unless customizing behavior
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // Optional: If you want to restrict to certain paths (usually not needed for Cloudinary)
        // pathname: '/dfu8qswfh/**',
      },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  reactStrictMode: true,
};

export default withPWA({
  dest: "public",
  disable: isDev,
  register: true,
  skipWaiting: true,
})(config as any);
