#!/bin/bash

# Bun Development Server Restart Script
# This script helps restart the development server with proper cleanup

echo "🔄 Restarting Bun development server..."

# Kill any existing Bun processes
echo "📋 Killing existing Bun processes..."
pkill -f "bun.*dev" || true
pkill -f "bun.*run.*dev" || true

# Wait a moment for processes to fully terminate
sleep 2

# Clear Next.js cache
echo "🧹 Clearing Next.js cache..."
rm -rf .next 2>/dev/null || true
rm -rf .turbo 2>/dev/null || true

# Clear Bun cache (if needed)
echo "🧹 Clearing Bun cache..."
bun pm cache rm 2>/dev/null || true

# Start development server
echo "🚀 Starting Bun development server..."
echo "   - Auto-reload enabled"
echo "   - Optimized for Bun runtime"
echo "   - Minimal middleware overhead"
echo ""

# Start with Bun
bun run dev

echo ""
echo "✅ Development server restarted!"
echo "   - File changes should now trigger auto-reload"
echo "   - Middleware is minimal and optimized"
echo "   - Watch options are optimized for Bun"
