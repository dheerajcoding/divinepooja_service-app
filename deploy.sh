#!/usr/bin/env bash
# ==============================================================================
# 🕉️ Pujari Baba - Automated Deployment Script for Ubuntu VPS
# Location: /var/rrr/pujaribaba/deploy.sh
# ==============================================================================

set -e # Exit immediately on error

echo ""
echo "========================================================"
echo " 🕉️  Pujari Baba - Starting Deployment"
echo "========================================================"
echo "🕒 Timestamp: $(date)"

# 1. Resolve application root directory
APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_DIR"
echo "📁 Working Directory: $APP_DIR"

# 2. Fetch and pull latest changes from master
echo ""
echo "📥 Pulling latest changes from GitHub (master branch)..."
git fetch origin master
git checkout master
git pull origin master

# 3. Install/update dependencies if package.json has changed
echo ""
echo "📦 Checking and installing dependencies..."
npm install --prefer-offline --no-audit

# 4. Build optimized production React bundle
echo ""
echo "⚡ Building optimized production bundle (npm run build)..."
npm run build

# 5. Check and restart PM2 process
echo ""
echo "🔄 Managing PM2 process (pujaribaba on port 3006)..."
if command -v pm2 >/dev/null 2>&1; then
  if pm2 describe pujaribaba >/dev/null 2>&1; then
    echo "♻️  Reloading existing PM2 process: pujaribaba..."
    pm2 restart pujaribaba
  else
    echo "🚀 Starting new PM2 process: pujaribaba..."
    PORT=3006 pm2 start server.js --name "pujaribaba"
  fi
  pm2 save
else
  echo "⚠️  PM2 is not installed globally. Starting with nohup or node..."
  pkill -f "node server.js" || true
  PORT=3006 nohup node server.js > server.log 2>&1 &
fi

# 6. Verify health
echo ""
echo "🩺 Verifying local server response on port 3006..."
sleep 2
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3006 || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
  echo "✅ Health check passed! HTTP Status: $HTTP_CODE"
else
  echo "⚠️ Server returned HTTP Status: $HTTP_CODE. Check logs with: pm2 logs pujaribaba"
fi

echo ""
echo "========================================================"
echo " 🎉 Deployment Complete!"
echo " 🌐 Live Site: https://pujaribaba.com"
echo "========================================================"
echo ""
