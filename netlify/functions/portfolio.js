// Serves a selected private portfolio image. Images live only inside this function, not in the public site folder.
const INDEX = require('./lib/portfolio-index.js');
let DATA; const hits = new Map();
exports.handler = async (event) => {
  const q = event.queryStringParameters || {}, id = String(q.id || ''), size = q.s === 'full' ? 'full' : 'thumb';
  const ip = (event.headers['x-nf-client-connection-ip'] || event.headers['x-forwarded-for'] || 'x').split(',')[0].trim(), now = Date.now();
  const r = (hits.get(ip) || []).filter(t => now - t < 60000); if (r.length >= 60) return { statusCode: 429, body: 'Too many requests' };
  r.push(now); hits.set(ip, r);
  if (!/^[a-f0-9]{16}$/.test(id) || !INDEX.some(p => p.id === id)) return { statusCode: 404, body: 'Not found' };
  DATA = DATA || require('./lib/portfolio-data.js');
  return { statusCode: 200, isBase64Encoded: true, body: DATA[id][size], headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'private, max-age=3600', 'X-Robots-Tag': 'noindex' } };
};
