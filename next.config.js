/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["cloud.appwrite.io"],
  },

  experimental: {
    serverComponentsExternalPackages: [
      "@react-email/components",
      "@react-email/render",
      "@react-email/html",
    ],
  },
  transpilePackages: ["@react-email/components", "@react-email/render", "@react-email/html"],
};

module.exports = nextConfig;
