#!/bin/bash

# Clear Watchman Cache Script
# This script clears Watchman cache to fix file watching issues

echo "🧹 Clearing Watchman cache..."

# Check if Watchman is installed
if ! command -v watchman &> /dev/null; then
    echo "⚠️  Watchman is not installed. Installing..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install watchman
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update
        sudo apt-get install watchman
    else
        echo "❌ Please install Watchman manually for your OS"
        exit 1
    fi
fi

# Stop Watchman
echo "🛑 Stopping Watchman..."
watchman shutdown-server 2>/dev/null || true

# Clear Watchman cache
echo "🗑️  Clearing Watchman cache..."
watchman watch-del-all 2>/dev/null || true

# Clear Watchman state
echo "🗑️  Clearing Watchman state..."
rm -rf ~/.watchman 2>/dev/null || true

# Restart Watchman
echo "🔄 Restarting Watchman..."
watchman get-sockname 2>/dev/null || true

echo "✅ Watchman cache cleared!"
echo "   - File watching should now work properly"
echo "   - No more Watchpack errors"
echo "   - Auto-reload should be faster"
