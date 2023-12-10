/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "./out",
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/github.io-periodontal-chart" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
