# Clear Watchman Cache Script (PowerShell)
# This script clears Watchman cache to fix file watching issues

Write-Host "🧹 Clearing Watchman cache..." -ForegroundColor Cyan

# Check if Watchman is installed
try {
    $watchmanVersion = watchman --version 2>$null
    Write-Host "✅ Watchman is installed: $watchmanVersion" -ForegroundColor Green
}
catch {
    Write-Host "⚠️  Watchman is not installed. Please install it manually:" -ForegroundColor Yellow
    Write-Host "   - Download from: https://facebook.github.io/watchman/docs/install.html" -ForegroundColor Gray
    Write-Host "   - Or use: winget install Facebook.Watchman" -ForegroundColor Gray
    exit 1
}

# Stop Watchman
Write-Host "🛑 Stopping Watchman..." -ForegroundColor Yellow
try {
    watchman shutdown-server 2>$null
}
catch { }

# Clear Watchman cache
Write-Host "🗑️  Clearing Watchman cache..." -ForegroundColor Yellow
try {
    watchman watch-del-all 2>$null
}
catch { }

# Clear Watchman state
Write-Host "🗑️  Clearing Watchman state..." -ForegroundColor Yellow
try {
    Remove-Item -Recurse -Force "$env:USERPROFILE\.watchman" -ErrorAction SilentlyContinue
}
catch { }

# Restart Watchman
Write-Host "🔄 Restarting Watchman..." -ForegroundColor Yellow
try {
    watchman get-sockname 2>$null
}
catch { }

Write-Host "✅ Watchman cache cleared!" -ForegroundColor Green
Write-Host "   - File watching should now work properly" -ForegroundColor Gray
Write-Host "   - No more Watchpack errors" -ForegroundColor Gray
Write-Host "   - Auto-reload should be faster" -ForegroundColor Gray
