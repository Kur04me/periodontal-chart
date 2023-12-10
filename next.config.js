/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "./out",
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/github.io-periodontal-chart" : "",
  trailingSlash: true,
};

module.exports = nextConfig;
