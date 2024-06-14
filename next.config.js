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
    dangerouslyAllowSVG: true,
    domains: [
      "cloud.appwrite.io",
      "source.boringavatars.com",
      "media.dev.to",
      "placehold.co",
      "img.icons8.com",
    ],
  },

  experimental: {
    serverComponentsExternalPackages: [
      "@react-email/components",
      "@react-email/render",
      "@react-email/html",
    ],
  },
  transpilePackages: [],
};

module.exports = nextConfig;
