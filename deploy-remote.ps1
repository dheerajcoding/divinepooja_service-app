# ==============================================================================
# 🕉️ Pujari Baba - 1-Click Remote Deployment Script (Windows PowerShell)
# Runs from your local machine to automatically update your VPS!
# Usage: .\deploy-remote.ps1
# ==============================================================================

param (
    [string]$Server = "72.62.192.33",
    [string]$User = "root",
    [string]$RemoteDir = "/var/rrr/pujaribaba"
)

Write-Host ""
Write-Host "========================================================" -ForegroundColor Yellow
Write-Host " 🕉️  Pujari Baba - 1-Click Remote VPS Deployment" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Yellow
Write-Host "📡 Connecting to: $User@$Server" -ForegroundColor Gray
Write-Host "📁 Target Directory: $RemoteDir" -ForegroundColor Gray
Write-Host ""

# 1. Push local changes to GitHub first
Write-Host "1️⃣  Pushing local changes to GitHub (master)..." -ForegroundColor Green
git push origin master

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Git push returned non-zero code. Make sure your local commits are pushed." -ForegroundColor Yellow
}

# 2. Trigger remote deployment on VPS via SSH
Write-Host ""
Write-Host "2️⃣  Executing deployment script on VPS..." -ForegroundColor Green
$remoteCmd = "cd $RemoteDir && chmod +x deploy.sh && ./deploy.sh"

ssh -o StrictHostKeyChecking=accept-new "$User@$Server" "$remoteCmd"

Write-Host ""
Write-Host "✨ Remote deployment finished. Check https://pujaribaba.com" -ForegroundColor Cyan
