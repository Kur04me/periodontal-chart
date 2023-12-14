const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // 本番環境の場合は '/periodontal-chart' を、開発環境の場合は空文字列を設定
  basePath: isProd ? "/periodontal-chart" : "",
  assetPrefix: isProd ? "/periodontal-chart/" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
