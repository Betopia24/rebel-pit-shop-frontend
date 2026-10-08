import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Next's dev compression middleware can accumulate drain listeners during
  // repeated client navigations. Keep compression enabled for production,
  // while avoiding the development-only MaxListeners warning.
  compress: process.env.NODE_ENV === "production",
  output: "standalone",
  images: {
    qualities: [75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
        ],
      },
    ]
  },
}

export default nextConfig
