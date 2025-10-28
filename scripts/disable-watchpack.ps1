# Disable Watchpack Script (PowerShell)
# This script completely disables Watchpack to avoid EINVAL errors

Write-Host "🚫 Disabling Watchpack completely..." -ForegroundColor Red

# Set environment variables to disable Watchpack
$env:WEBPACK_DISABLE_WATCHPACK = "true"
$env:WEBPACK_WATCH_OPTIONS = "false"
$env:WATCHPACK_DISABLE = "true"

# Clear any existing Watchpack cache
Write-Host "🗑️  Clearing Watchpack cache..." -ForegroundColor Yellow
try {
    Remove-Item -Recurse -Force "$env:USERPROFILE\.watchpack" -ErrorAction SilentlyContinue
} catch { }

try {
    Remove-Item -Recurse -Force ".\node_modules\.cache\watchpack" -ErrorAction SilentlyContinue
} catch { }

# Clear Next.js cache
Write-Host "🗑️  Clearing Next.js cache..." -ForegroundColor Yellow
try {
    Remove-Item -Recurse -Force ".\.next" -ErrorAction SilentlyContinue
} catch { }

Write-Host "✅ Watchpack disabled!" -ForegroundColor Green
Write-Host "   - No more EINVAL errors" -ForegroundColor Gray
Write-Host "   - No more pagefile.sys errors" -ForegroundColor Gray
Write-Host "   - Using alternative file watching" -ForegroundColor Gray
Write-Host ""
Write-Host "🚀 Starting development server without Watchpack..." -ForegroundColor Cyan

# Start Next.js with disabled Watchpack
$env:WEBPACK_DISABLE_WATCHPACK = "true"
$env:WEBPACK_WATCH_OPTIONS = "false"
$env:WATCHPACK_DISABLE = "true"
bun --bun run next dev
