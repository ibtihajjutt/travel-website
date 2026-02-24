/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/travel-website',
  assetPrefix: '/travel-website/',
  images: {
    unoptimized: true,
  },
  compress: true,
  trailingSlash: true,
};

module.exports = nextConfig;
