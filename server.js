/**
 * Pujari Baba - Production Static Server
 * Runs on Port 3006 with zero external dependencies (pure Node.js http).
 * Handles React single-page routing (SPA fallback to index.html).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3006;
const BUILD_DIR = path.join(__dirname, 'build');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.avif': 'image/avif',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.map': 'application/json',
};

const server = http.createServer((req, res) => {
  // Normalize request path and strip query params
  const parsedUrl = req.url.split('?')[0];
  let safePath = path.normalize(parsedUrl).replace(/^(\.\.[/\\])+/, '');
  
  if (safePath === '/' || safePath === '\\' || safePath === '') {
    safePath = '/index.html';
  }

  let filePath = path.join(BUILD_DIR, safePath);

  // Check if requested file exists and is not a directory
  let isFile = false;
  try {
    const stats = fs.statSync(filePath);
    isFile = stats.isFile();
  } catch (err) {
    isFile = false;
  }

  // If file doesn't exist (SPA client-side route like /poojas or /packages), serve index.html
  if (!isFile) {
    filePath = path.join(BUILD_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }

    // Static cache header: cache hashed bundles forever, do not cache index.html
    const cacheControl =
      ext === '.html'
        ? 'no-cache, no-store, must-revalidate'
        : 'public, max-age=31536000, immutable';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
    });
    res.end(content);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`=========================================`);
  console.log(`🕉️ Pujari Baba Production Server`);
  console.log(`🚀 Running at: http://localhost:${PORT}`);
  console.log(`📁 Serving directory: ${BUILD_DIR}`);
  console.log(`=========================================`);
});
