import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/api/mcp": ["./styles/**/*"],
  },
};

export default nextConfig;
