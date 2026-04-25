import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.fourthwall.com" },
      { protocol: "https", hostname: "imgproxy.fourthwall.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/featured", destination: "/", permanent: true },
      { source: "/journal", destination: "/essays", permanent: true },
      { source: "/journal/:slug", destination: "/essays/:slug", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
