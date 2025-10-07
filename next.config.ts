import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // 1. DEVELOPMENT BACKEND (HTTP)
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      // 2. PRODUCTION BACKEND (HTTPS)
      {
        protocol: "https",
        hostname: "flowstack-backend.onrender.com",
        port: "", // No port needed for standard HTTPS
        pathname: "/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
