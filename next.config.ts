import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tối ưu hóa cho Bun runtime
  serverExternalPackages: [],
  experimental: {
    // Cấu hình Turbopack cho Bun compatibility
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
      // Tối ưu hóa cho Bun runtime
      resolveAlias: {
        "async_hooks": "empty-module",
      },
    },
    // Tăng tốc độ build
    optimizePackageImports: [
      "@heroui/react",
      "@radix-ui/react-avatar",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-separator",
      "@radix-ui/react-slot",
      "@radix-ui/react-toast",
      "@radix-ui/react-tooltip",
      "@tanstack/react-query",
      "@tanstack/react-table",
      "lucide-react",
      "framer-motion",
    ],
    // Tối ưu hóa memory usage
    memoryBasedWorkersCount: true,
    // Tối ưu hóa CSS - tắt để tránh lỗi critters với Bun
    optimizeCss: false,
    // Tối ưu hóa server actions
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
  },

  // Tối ưu hóa build performance
  compiler: {
    // Loại bỏ console.log trong production
    removeConsole: process.env.NODE_ENV === "production",
    // Tối ưu hóa styled-jsx
    styledComponents: true,
  },

  // Tối ưu hóa webpack cho Bun và SSR
  webpack: (config, { dev, isServer }) => {
    // Tối ưu hóa cho development
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/.next/**',
          '**/pagefile.sys', // Ignore Windows pagefile
          'D:/pagefile.sys', // Ignore Windows pagefile on D drive
        ],
      };
    }

    // Tối ưu hóa cho Bun runtime và SSR
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        util: false,
        buffer: false,
        process: false,
        path: false,
        os: false,
      };
    }

    // Xử lý lỗi tương thích với Bun và SSR
    config.resolve.alias = {
      ...config.resolve.alias,
      'async_hooks': 'empty-module',
    };


    // Xử lý lỗi "i.M" trong build
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          default: {
            ...config.optimization.splitChunks?.cacheGroups?.default,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      },
    };

    return config;
  },

  // Tối ưu hóa images
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "scontent.fsgn2-10.fna.fbcdn.net" },
    ],
    // Tối ưu hóa image loading
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Hỗ trợ import images từ assets
    unoptimized: false,
  },

  // Tối ưu hóa output - sử dụng standalone cho Vercel
  output: "standalone",

  // Tối ưu hóa performance
  poweredByHeader: false,
  compress: true,

  // Cấu hình để tránh prerendering errors
  trailingSlash: false,
  skipTrailingSlashRedirect: true,

  // Tối ưu hóa caching
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Tối ưu hóa cho production
  ...(process.env.NODE_ENV === "production" && {
    generateEtags: false,
    httpAgentOptions: {
      keepAlive: true,
    },
  }),
};

export default nextConfig;
