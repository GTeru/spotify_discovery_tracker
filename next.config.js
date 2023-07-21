/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000,
    };
    return config;
  },
};

module.exports = nextConfig;
