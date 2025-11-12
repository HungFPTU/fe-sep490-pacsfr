import type { NextConfig } from "next";

// Use Next.js built-in hot reload instead of Webpack
process.env.WEBPACK_DISABLE_WATCHPACK = 'true';
process.env.WEBPACK_WATCH_OPTIONS = 'false';
process.env.NEXT_WEBPACK_USEPOLLING = 'false';
// Disable webpack workers for Bun compatibility
process.env.WEBPACK_DISABLE_WORKERS = 'true';

const nextConfig: NextConfig = {
  // Tối ưu hóa cho Bun runtime
  serverExternalPackages: [],

  // Turbopack configuration (default in Next.js 16, but keeping for custom rules)
  turbopack: {
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

  experimental: {
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
      "@emotion/react",
      "@emotion/styled",
      "@emotion/is-prop-valid",
    ],
    // Tối ưu hóa memory usage - Disabled for Bun compatibility
    memoryBasedWorkersCount: false,
    // Tối ưu hóa CSS - tắt để tránh lỗi critters với Bun
    optimizeCss: false,
    // Tối ưu hóa server actions
    serverActions: {
      allowedOrigins: ["localhost:3000"],
    },
    // Enable Next.js built-in hot reload
    // fastRefresh: true,
    // Optimize for auto-reload
    optimizeServerReact: true,
    // Disable webpackBuildWorker for Bun compatibility (Bun doesn't fully support worker_threads options)
    webpackBuildWorker: false,
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
    // Disable webpack workers for Bun compatibility
    config.parallelism = 1; // Disable parallel processing
    // Keep cache enabled but disable worker-based cache
    if (config.cache && typeof config.cache === 'object') {
      config.cache.type = 'filesystem';
      config.cache.buildDependencies = {};
    }

    // Enable Next.js built-in file watching for auto-reload
    if (dev) {
      // Enable file watching for auto-reload
      config.watchOptions = {
        poll: 1000, // Poll every 1 second for changes
        ignored: /node_modules/, // Only ignore node_modules
        aggregateTimeout: 300, // Wait 300ms before rebuilding
      };

      // Enable file watching
      config.watch = true;

      // Optimize logging
      config.infrastructureLogging = {
        level: 'warn', // Show warnings
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
    const path = require('path');
    const emptyModulePath = path.resolve(__dirname, 'empty-module.js');
    config.resolve.alias = {
      ...config.resolve.alias,
      'async_hooks': emptyModulePath,
      'worker_threads': emptyModulePath, // Disable worker_threads for Bun compatibility
      // Fix for emotion dependencies
      '@emotion/is-prop-valid': require.resolve('@emotion/is-prop-valid'),
      '@emotion/styled': require.resolve('@emotion/styled'),
      '@emotion/react': require.resolve('@emotion/react'),
    };

    // Fix for "exports is not defined" error
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
      '.jsx': ['.jsx', '.tsx'],
    };

    // Additional fixes for CommonJS/ESM compatibility
    config.module = {
      ...config.module,
      rules: [
        ...(config.module?.rules || []),
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
      ],
    };

    // Fix for module resolution issues
    config.resolve.mainFields = ['browser', 'module', 'main'];
    config.resolve.conditionNames = ['browser', 'import', 'module', 'main', 'require'];

    // Handle emotion dependencies properly for client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        // Don't fallback emotion packages to false - let them resolve normally
      };
    }

    // Xử lý lỗi "i.M" trong build và chunk loading
    config.optimization = {
      ...config.optimization,
      // Disable parallel processing for Bun compatibility
      minimize: !dev, // Only minimize in production
      splitChunks: {
        ...config.optimization.splitChunks,
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          default: {
            ...config.optimization.splitChunks?.cacheGroups?.default,
            minChunks: 1,
            reuseExistingChunk: true,
            priority: -20,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: -5,
            reuseExistingChunk: true,
            chunks: 'all',
          },
        },
      },
    };

    return config;
  },

  // Tối ưu hóa images
  // Note: Next.js 16 default minimumCacheTTL is 14400 (4 hours), but we keep 60s for shorter cache
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*" },
      { protocol: "http", hostname: "*" },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60, // Next.js 16 default is 14400, but keeping 60 for shorter cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
  },

  // Tối ưu hóa output - không dùng standalone trên Vercel (Vercel tự xử lý)
  // output: "standalone", // Disabled for Vercel deployment

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
