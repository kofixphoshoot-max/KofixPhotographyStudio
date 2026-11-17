// Optional AI photo editing / concept images. Disabled until OPENAI_API_KEY is set in Netlify. Nothing is stored by Kofix.
const hits = new Map();
const json = (s, o) => ({ statusCode: s, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, body: JSON.stringify(o) });
async function inScope(prompt, hasImage) {
  const key = process.env.ANTHROPIC_API_KEY; if (!key) return false;
  const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', signal: AbortSignal.timeout(6000),
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: process.env.KOFIX_AI_MODEL || 'claude-haiku-5-5', max_tokens: 5,
      system: 'Answer only YES or NO. YES only if the request is a harmless photo edit or a photography, portrait, wedding, birthday, graduation, event, maternity, baby, fashion or photoshoot concept request. NO for anything unrelated, sexual, violent, hateful, deceptive, or about impersonating a real person.',
      messages: [{ role: 'user', content: (hasImage ? '[edit of the customer\'s own photo] ' : '[new concept image] ') + prompt }] }) });
  if (!r.ok) return false;
  const d = await r.json(); return /^\s*yes/i.test((d.content && d.content[0] && d.content[0].text) || '');
}
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'method' });
  const ok = process.env.OPENAI_API_KEY; if (!ok) return json(503, { error: 'not_configured' });
  const ip = (event.headers['x-nf-client-connection-ip'] || event.headers['x-forwarded-for'] || 'x').split(',')[0].trim(), now = Date.now();
  const r = (hits.get(ip) || []).filter(t => now - t < 3600000); if (r.length >= 6) return json(429, { error: 'rate_limited' });
  let b; try { b = JSON.parse(event.body || '{}'); } catch { return json(400, { error: 'bad_request' }); }
  const prompt = String(b.prompt || '').trim().slice(0, 400); if (prompt.length < 3) return json(400, { error: 'bad_request' });
  let img = null;
  if (b.mode === 'edit') {
    const m = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(String(b.image || ''));
    if (!m) return json(400, { error: 'bad_image' });
    img = Buffer.from(m[2], 'base64'); if (img.length > 4.5 * 1048576) return json(413, { error: 'too_large' });
    img = { type: m[1], buf: img };
  } else if (b.mode !== 'generate') return json(400, { error: 'bad_request' });
  try {
    if (!(await inScope(prompt, !!img))) return json(422, { error: 'out_of_scope' });
    r.push(now); hits.set(ip, r);
    let res;
    if (img) {
      const f = new FormData(); f.append('model', 'gpt-image-1'); f.append('quality', 'medium');
      f.append('prompt', 'Edit this photograph as requested. Keep the person\'s identity, face, skin tone and important details unchanged unless the request says otherwise. Request: ' + prompt);
      f.append('image', new Blob([img.buf], { type: img.type }), 'photo.' + img.type.split('/')[1]);
      res = await fetch('https://api.openai.com/v1/images/edits', { method: 'POST', headers: { Authorization: 'Bearer ' + ok }, body: f, signal: AbortSignal.timeout(24000) });
    } else {
      res = await fetch('https://api.openai.com/v1/images/generations', { method: 'POST', signal: AbortSignal.timeout(24000),
        headers: { Authorization: 'Bearer ' + ok, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'gpt-image-1', quality: 'medium', size: '1024x1024', prompt: 'Photography concept image (not a real photograph): ' + prompt }) });
    }
    if (!res.ok) return json(502, { error: 'upstream' });
    const d = await res.json(); const o = d.data && d.data[0] && d.data[0].b64_json;
    return o ? json(200, { image: 'data:image/png;base64,' + o }) : json(502, { error: 'empty' });
  } catch (e) { return json(504, { error: 'timeout' }); }
};
