import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF/WebP when the optimizer is used (remote or future local fix).
    formats: ["image/avif", "image/webp"],
    // Local `/media` still goes through MediaImage `unoptimized` because
    // Turbopack `/_next/image` returns empty bodies for many local JPEGs.
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
