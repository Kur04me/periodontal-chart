/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/periodontal-chart",
  assetPrefix: "/periodontal-chart/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
