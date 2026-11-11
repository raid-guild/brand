import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/raid-guild/website/**",
      },
      {
        protocol: "https",
        hostname: "media.githubusercontent.com",
        pathname: "/media/raid-guild/brand/**",
      },
      {
        protocol: "https",
        hostname: "www.raidguild.org",
        pathname: "/witch/images/**",
      },
    ],
  },
};

export default nextConfig;
