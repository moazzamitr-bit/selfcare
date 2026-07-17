declare module "next-pwa" {
  import type { NextConfig } from "next";

  type RuntimeCaching = {
    urlPattern: RegExp;
    handler: string;
    options?: Record<string, unknown>;
  };

  export default function withPWAInit(options: {
    dest: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    runtimeCaching?: RuntimeCaching[];
  }): (nextConfig: NextConfig) => NextConfig;
}
