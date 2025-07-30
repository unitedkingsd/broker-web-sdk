import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable turbo to avoid wasm binding issues in WebContainer
  experimental: {
    turbo: false,
  },
};

export default nextConfig;