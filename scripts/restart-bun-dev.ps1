# Bun Development Server Restart Script (PowerShell)
# This script helps restart the development server with proper cleanup

Write-Host "🔄 Restarting Bun development server..." -ForegroundColor Cyan

# Kill any existing Bun processes
Write-Host "📋 Killing existing Bun processes..." -ForegroundColor Yellow
Get-Process | Where-Object { $_.ProcessName -like "*bun*" -and $_.CommandLine -like "*dev*" } | Stop-Process -Force -ErrorAction SilentlyContinue

# Wait a moment for processes to fully terminate
Start-Sleep -Seconds 2

# Clear Next.js cache
Write-Host "🧹 Clearing Next.js cache..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path ".turbo") { Remove-Item -Recurse -Force ".turbo" }

# Clear Bun cache (if needed)
Write-Host "🧹 Clearing Bun cache..." -ForegroundColor Yellow
try { bun pm cache rm } catch { }

# Start development server
Write-Host "🚀 Starting Bun development server..." -ForegroundColor Green
Write-Host "   - Auto-reload enabled" -ForegroundColor Gray
Write-Host "   - Optimized for Bun runtime" -ForegroundColor Gray
Write-Host "   - Minimal middleware overhead" -ForegroundColor Gray
Write-Host ""

# Start with Bun
bun run dev

Write-Host ""
Write-Host "✅ Development server restarted!" -ForegroundColor Green
Write-Host "   - File changes should now trigger auto-reload" -ForegroundColor Gray
Write-Host "   - Middleware is minimal and optimized" -ForegroundColor Gray
Write-Host "   - Watch options are optimized for Bun" -ForegroundColor Gray
