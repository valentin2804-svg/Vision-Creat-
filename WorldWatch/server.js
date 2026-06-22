const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3001;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.ico':  'image/x-icon',
};

http.createServer((req, res) => {
  const file = req.url === '/' ? '/index.html' : req.url;
  const full = path.join(__dirname, file);
  const ext  = path.extname(full);

  fs.readFile(full, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'text/plain',
      'Cache-Control': 'no-store',
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`\n  WorldWatch running → http://localhost:${PORT}\n`);
});
