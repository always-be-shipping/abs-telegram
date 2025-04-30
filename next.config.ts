import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // this might be kinda big but should account for most document types
    },
  },
};

export default nextConfig;
