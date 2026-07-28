import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingExcludes: {
    '*': [
      'merch/**',
      'images/**',
      'audio/**',
      'assets/**',
      'print/**',
      'interviews/**',
      'sessions/**',
      'podcast-production/**',
      'book/**',
      'bipolar-brand/**',
      'public/audio/**',
      'public/images/**',
      '**/*.png',
      '**/*.jpg',
      '**/*.jpeg',
      '**/*.webp',
      '**/*.mp4',
      '**/*.mp3',
      '**/*.m4a',
      '**/*.wav',
    ],
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 256, 384],
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  async redirects() {
    return [
      { source: "/featured", destination: "/", permanent: true },
      { source: "/journal", destination: "/essays", permanent: true },
      { source: "/journal/:slug", destination: "/essays/:slug", permanent: true },
      { source: "/essays/the-return", destination: "/essays/five-fifteen", permanent: true },
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
