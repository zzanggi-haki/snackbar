import type { NextConfig } from "next";

// GitHub Pages: 커스텀 도메인 전에는 /snackbar 하위 경로로 서빙된다.
// 배포 워크플로가 PAGES_BASE_PATH를 넣어주고, 도메인을 연결하면 자동으로 빈 값이 된다.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  // Pages가 /soundwich 를 soundwich/index.html 로 찾도록
  trailingSlash: true,
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
