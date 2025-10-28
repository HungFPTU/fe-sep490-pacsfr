#!/bin/bash

# Clear Next.js cache and restart development server
# This script fixes common issues with "exports is not defined" and Watchpack errors

echo "🧹 Clearing Next.js cache and build files..."

# Remove cache directories
rm -rf .next
rm -rf .turbo
rm -rf node_modules/.cache
rm -rf .next/cache

# Clear TypeScript build info
rm -f .next/cache/tsconfig.tsbuildinfo

echo "✅ Cache cleared successfully!"
echo "🚀 Starting development server..."

# Start development server
bun dev
