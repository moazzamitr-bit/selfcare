import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*\/faq/,
      handler: "NetworkFirst",
      options: {
        cacheName: "offline-faq",
        expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 },
      },
    },
  ],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [],
  },
};

export default withPWA(nextConfig);
