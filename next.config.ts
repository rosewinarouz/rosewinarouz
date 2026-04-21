import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ── SEO: www → non-www 301 redirect ── */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.rosewinarouz.org" }],
        destination: "https://rosewinarouz.org/:path*",
        permanent: true, // 301
      },
    ];
  },

  /* ── Performance: reduce JS bundle count ── */
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
