/** @type {import('next').NextConfig} */
import nextI18nextConfig from "./next-i18next.config.js";

const nextConfig = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  i18n: nextI18nextConfig.i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.com",
        port: "",
        search: "",
      },
    ],
  },

  // Adding headers to fix the Cross-Origin-Opener-Policy issue
  async headers() {
    return [
      {
        source: "/:path*", // Match all routes
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
        ],
      },
    ];
  },
};

export default nextConfig;