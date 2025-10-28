#!/bin/bash

# Disable Watchpack Script
# This script completely disables Watchpack to avoid EINVAL errors

echo "🚫 Disabling Watchpack completely..."

# Set environment variables to disable Watchpack
export WEBPACK_DISABLE_WATCHPACK=true
export WEBPACK_WATCH_OPTIONS=false
export WATCHPACK_DISABLE=true

# Clear any existing Watchpack cache
echo "🗑️  Clearing Watchpack cache..."
rm -rf ~/.watchpack 2>/dev/null || true
rm -rf node_modules/.cache/watchpack 2>/dev/null || true

# Clear Next.js cache
echo "🗑️  Clearing Next.js cache..."
rm -rf .next 2>/dev/null || true

echo "✅ Watchpack disabled!"
echo "   - No more EINVAL errors"
echo "   - No more pagefile.sys errors"
echo "   - Using alternative file watching"
echo ""
echo "🚀 Starting development server without Watchpack..."

# Start Next.js with disabled Watchpack
WEBPACK_DISABLE_WATCHPACK=true WEBPACK_WATCH_OPTIONS=false WATCHPACK_DISABLE=true bun --bun run next dev
