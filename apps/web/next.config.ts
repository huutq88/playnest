import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ["@playnest/level-schema", "@playnest/puzzle-engine", "@playnest/shared-types", "@playnest/game-sdk"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3002/api/:path*",
      },
    ];
  },
};

export default nextConfig;
