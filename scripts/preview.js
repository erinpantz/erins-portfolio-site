// Serves the built site (build/client) the way a static host does, so you can
// check it before deploying: /profile serves profile/index.html, and an
// address with no page gets the Page not found page (404/index.html) with a
// 404 status.
// Run `npm run build` first, then `npm run preview`.
//
// (Vite's own preview server sends the Home page for /profile, which breaks
// the pre-rendered pages, so the site doesn't use it.)

import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const ROOT = 'build/client';
const PORT = 4173;
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.data': 'text/x-script',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
};

const isFile = (path) => statSync(path, { throwIfNoEntry: false })?.isFile();

createServer((request, response) => {
  const path = normalize(decodeURIComponent(new URL(request.url, 'http://x').pathname));
  const file = [join(ROOT, path), join(ROOT, path, 'index.html')].find(isFile);
  const status = file ? 200 : 404;
  const served = file ?? join(ROOT, '404', 'index.html');
  response.writeHead(status, { 'Content-Type': TYPES[extname(served)] ?? 'application/octet-stream' });
  createReadStream(served).pipe(response);
}).listen(PORT, () => console.log(`Serving the built site at http://localhost:${PORT}`));
