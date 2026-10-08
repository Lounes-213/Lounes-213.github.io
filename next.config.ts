import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "linky-api.bensebalounes2.workers.dev" },
      { protocol: "https", hostname: "pub-d15f4b0d1755489294b2202b6f918bd3.r2.dev" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },

  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
};

export default withNextIntl(nextConfig);
