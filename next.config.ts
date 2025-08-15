import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "mahfouzapp.com",
      "localhost", // for development
      // add other domains as needed
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mahfouzapp.com",
        port: "",
        pathname: "/**",
      },
      // add other patterns as needed
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
