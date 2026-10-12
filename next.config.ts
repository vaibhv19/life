import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/catalog',
        destination: '/#travel-highlights',
        permanent: false,
      },
      {
        source: '/catalog/:path*',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
