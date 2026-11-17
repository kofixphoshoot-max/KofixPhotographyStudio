const V='kofix-v5';
const SHELL=['./','index.html','app.js','music.js','chat.js','extras.js','extras.css','testimonials.js','chat.css','assets/kofix-mark.png','favicon.ico','404.html','icons/apple-touch-icon.png','icons/favicon-32.png','icons/icon-maskable-512.png','media.js','manifest.webmanifest','assets/kofix-ambient.mp3','assets/logo-dark-text.png','assets/logo-white.png','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
async function range(req,hit){const m=/bytes=(\d+)-(\d*)/.exec(req.headers.get('range')),b=await hit.blob(),s=+m[1],e=m[2]?+m[2]:b.size-1;
 return new Response(b.slice(s,e+1),{status:206,headers:{'Content-Type':hit.headers.get('Content-Type')||'audio/mpeg','Content-Range':`bytes ${s}-${e}/${b.size}`,'Content-Length':e-s+1}})}
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
 if(r.method!=='GET'||u.origin!==location.origin||/\.(mp4|webm|mov)$/i.test(u.pathname))return; // videos are never cached
 const fresh=r.mode==='navigate'||/\.(js|html|webmanifest)$/.test(u.pathname);
 if(fresh){e.respondWith(fetch(r).then(x=>{if(x.ok){const c=x.clone();caches.open(V).then(k=>k.put(r.mode==='navigate'?'index.html':r,c))}return x}).catch(()=>caches.match(r.mode==='navigate'?'index.html':r,{ignoreSearch:true})));return}
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{if(hit)return r.headers.has('range')?range(r,hit):hit;
  return fetch(r).then(x=>{if(x.status===200){const c=x.clone();caches.open(V).then(k=>k.put(r,c))}return x})}))});
