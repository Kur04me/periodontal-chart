/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "./out",
  output: "export",
  basePath: "/periodontal-chart",
  assetPrefix: "/periodontal-chart/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
