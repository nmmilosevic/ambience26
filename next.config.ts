import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ambiencehomedesign.com",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.ambiencehomedesign.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
