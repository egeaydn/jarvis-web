import createMDX from "@next/mdx";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/downloads/Jarvis-0.1.0-beta.2-windows-x64.exe",
        destination:
          "https://github.com/egeaydn/jarvis-web/releases/download/v0.1.0-beta.2/Jarvis-0.1.0-beta.2-windows-x64.exe",
        permanent: false,
      },
      {
        source: "/downloads/Jarvis-0.1.0-beta.1-windows-x64.exe",
        destination:
          "https://github.com/egeaydn/jarvis-web/releases/download/v0.1.0-beta.1/Jarvis-0.1.0-beta.1-windows-x64.exe",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), display-capture=()",
          },
        ],
      },
    ];
  },
};
export default createMDX({})(nextConfig);
