import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@playnest/shared-types", "@playnest/game-sdk"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ]
  },
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
