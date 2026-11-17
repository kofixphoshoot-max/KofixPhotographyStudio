(()=>{
const WA='https://wa.me/233534349054',Q=['Where are you located?','Show me your wedding work','I want a birthday shoot','I am travelling to Ghana','How do I get prices?','Create a photo concept'];
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const wal=t=>WA+'?text='+encodeURIComponent(t);
const link=(txt,href,cls)=>{const a=el('a',cls||'kai-act',txt);a.href=href;a.target='_blank';a.rel='noopener';return a};
const fab=el('button','kai-fab');fab.type='button';fab.setAttribute('aria-haspopup','dialog');fab.setAttribute('aria-expanded','false');
const mark=el('img');mark.src='assets/kofix-mark.png';mark.alt='';mark.width=26;mark.height=26;fab.append(mark,el('span',null,'Ask Kofix AI'));
const panel=el('div','kai-panel');panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Kofix AI assistant');
const head=el('div','kai-h'),ht=el('div');ht.append(el('b',null,'Kofix AI'),el('small',null,'Virtual assistant for Kofix Photography Studio'));
const xb=el('button',null,'\u00d7');xb.type='button';xb.setAttribute('aria-label','Close chat and return to the website');head.append(ht,xb);
const list=el('div','kai-m');list.setAttribute('role','log');list.setAttribute('aria-live','polite');
const form=el('form','kai-f'),inp=el('input');inp.placeholder='Ask about our services or booking';inp.maxLength=400;inp.setAttribute('aria-label','Your message');inp.autocomplete='off';
const clip=el('button','kai-clip');clip.type='button';clip.setAttribute('aria-label','Attach a photo to edit');clip.innerHTML='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 11-9 9a5 5 0 0 1-7-7l9-9a3.500 3.500 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8"/></svg>';
const file=el('input');file.type='file';file.accept='image/jpeg,image/png,image/webp';file.hidden=true;
const send=el('button','kai-send','Send');send.type='submit';form.append(clip,inp,send,file);
const wa=el('div','kai-wa');wa.innerHTML='Prefer to talk to the studio? <a href="'+WA+'" target="_blank" rel="noopener">WhatsApp +233 53 434 9054</a>';
const view=el('div','kai-view');view.hidden=true;
panel.append(head,list,form,wa,view);document.body.append(panel,fab);
const hist=[];let busy=false,mode='chat',photo=null,ctl=null;
const scroll=()=>{list.scrollTop=list.scrollHeight};
const say=(b,text)=>{try{const s=window.speechSynthesis;if(!s)return;s.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=document.documentElement.lang||'en';s.speak(u)}catch(e){}};
function listen(b,text){if(!('speechSynthesis' in window))return;const s=el('button','kai-spk');s.type='button';s.setAttribute('aria-label','Listen to this message');s.innerHTML='<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4zM15.500 8.500a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg><span>Listen</span>';
 s.onclick=()=>{const sy=window.speechSynthesis;if(sy.speaking){sy.cancel();return}say(b,text)};b.append(s)}
function chips(box,items){const c=el('div','kai-chips');(items||Q).forEach(q=>{const b=el('button',null,q);b.type='button';b.onclick=()=>q==='Create a photo concept'?startGen():ask(q);c.append(b)});box.append(c)}
function bot(text,cls){const b=el('div','kai-b bot'+(cls?' '+cls:''));const p=el('div',null);text.split('\n').forEach((l,i)=>{if(i)p.append(document.createElement('br'));p.append(l)});b.append(p);if(!cls||cls!=='kai-dots')listen(b,text);list.append(b);scroll();return b}
function welcome(){const b=bot("Hi! I'm Kofix AI, the virtual assistant for Kofix Photography Studio. I can help with our services, portfolio and bookings. What would you like to know?");chips(b)}
// image viewer inside the chat
function open(imgs,i){view.hidden=false;view.replaceChildren();const im=el('img');im.alt=imgs[i].alt;im.src=imgs[i].full;const c=el('button','kai-vx','\u00d7');c.setAttribute('aria-label','Close viewer');c.onclick=()=>view.hidden=true;
 const cap=el('div','kai-vc',imgs[i].alt+' (genuine Kofix photograph)');view.append(im,c,cap);
 if(imgs.length>1){['\u2039','\u203a'].forEach((s,k)=>{const n=el('button','kai-vn '+(k?'r':'l'),s);n.setAttribute('aria-label',k?'Next photo':'Previous photo');n.onclick=()=>open(imgs,(i+(k?1:imgs.length-1))%imgs.length);view.append(n)})}}
function pubImgs(cat){const M=window.MEDIA||{photos:[],frames:[]};const a=cat==='frames'?M.frames:M.photos.filter(p=>p.cat===cat);return a.map(p=>({thumb:p.src,full:p.src,alt:p.alt,pub:1}))}
function pick(priv,pub){const a=priv.slice(0,2),r=a.concat(pub.slice(0,4-a.length));return r.concat(priv.slice(2,2+4-r.length)).slice(0,4)}
function render(d){const b=bot(d.reply);
 if(d.cat){const priv=(d.images||[]).map(i=>({thumb:'/api/portfolio?id='+i.id+'&s=thumb',full:'/api/portfolio?id='+i.id+'&s=full',alt:i.alt})),pub=pubImgs(d.cat),sel=pick(priv,pub);
  if(sel.length){const r=el('div','kai-th');sel.forEach((p,i)=>{const t=el('button','kai-tb');t.type='button';t.setAttribute('aria-label','View larger: '+p.alt);const im=el('img');im.src=p.thumb;im.alt=p.alt;im.loading='lazy';t.append(im);t.onclick=()=>open(sel,i);r.append(t)});b.append(r,el('div','kai-cap','Genuine photographs from the Kofix portfolio. Tap one to enlarge.'))}
  else d.unavailable=true}
 if(d.unavailable)b.append(link('Ask the studio for '+(d.phrase||'these')+' samples on WhatsApp',wal('Hello Kofix Photography Studio, I would like to see samples of your '+(d.phrase||'photography')+' work. Please assist me.')),el('div','kai-cap','Tap to open WhatsApp. You can review the message before sending.'));
 if(d.wa)b.append(link('Send this enquiry on WhatsApp',wal(d.wa)),el('div','kai-cap','You can review the message in WhatsApp before sending. Nothing is booked until the studio confirms.'));
 scroll()}
function fail(why){const b=bot(why||"Sorry, Kofix AI can't answer right now, so I won't guess. You can try again in a moment, or message the studio directly.",'err');b.append(link('Chat with the studio on WhatsApp',wal('Hello Kofix Photography Studio, I would like to enquire about your services.')),el('div'));chips(b)}
async function ask(q){q=q.trim();if(!q||busy)return;
 if(mode==='gen'||mode==='edit'){return aiImage(q)}
 busy=true;send.disabled=true;inp.value='';list.append(el('div','kai-b me',q));hist.push({role:'user',content:q});scroll();
 const key='kofixai2:'+q.toLowerCase().replace(/[^a-z0-9 ]/g,'').replace(/\s+/g,' ').trim(),first=hist.length===1;
 try{if(first){const c=JSON.parse(localStorage.getItem(key)||'null');if(c&&Date.now()-c.t<864e5){hist.push({role:'assistant',content:c.d.reply});render(c.d);return}}}catch(e){}
 const ld=el('div','kai-b bot kai-dots');ld.setAttribute('aria-label','Kofix AI is thinking');ld.innerHTML='<span></span><span></span><span></span>';list.append(ld);scroll();
 try{const c=new AbortController(),to=setTimeout(()=>c.abort(),12000);
  const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:hist.slice(-10)}),signal:c.signal});clearTimeout(to);
  if(!r.ok)throw 0;const d=await r.json();if(!d.reply)throw 0;ld.remove();hist.push({role:'assistant',content:d.reply});render(d);
  if(first){try{localStorage.setItem(key,JSON.stringify({d,t:Date.now()}))}catch(e){}}
 }catch(e){ld.remove();hist.pop();fail()}
 finally{busy=false;send.disabled=false;inp.focus()}}
// ---- customer photo tools (every result gets the Kofix footer) ----
const loadImg=src=>new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=src});
async function brand(cv){const fh=Math.round(Math.max(64,cv.width*.08)),o=document.createElement('canvas');o.width=cv.width;o.height=cv.height+fh;const x=o.getContext('2d');
 x.drawImage(cv,0,0);x.fillStyle='#14392b';x.fillRect(0,cv.height,o.width,fh);
 const fs=Math.round(fh*.42);x.font='600 '+fs+'px Figtree,system-ui,-apple-system,Segoe UI,Arial,sans-serif';x.textBaseline='middle';x.fillStyle='#ffffff';
 const t='Kofix Photography Studio',tw=x.measureText(t).width;let lw=0;
 try{const lg=await loadImg('assets/logo-white.png'),sh=lg.height,sw=Math.round(lg.width*.27),lh=fh*.62;lw=lh*sw/sh;const gap=fs*.5,total=lw+gap+tw,x0=(o.width-total)/2;x.drawImage(lg,0,0,sw,sh,x0,cv.height+(fh-lh)/2,lw,lh);x.textAlign='left';x.fillText(t,x0+lw+gap,cv.height+fh/2+1);return o}catch(e){}
 x.textAlign='center';x.fillText(t,o.width/2,cv.height+fh/2+1);return o}
function enhance(cv){const o=document.createElement('canvas');o.width=cv.width;o.height=cv.height;const x=o.getContext('2d');x.drawImage(cv,0,0);const id=x.getImageData(0,0,o.width,o.height),d=id.data,h=new Uint32Array(256);
 for(let i=0;i<d.length;i+=4)h[(d[i]*.299+d[i+1]*.587+d[i+2]*.114)|0]++;const n=d.length/4;let a=0,lo=0,hi=255;for(let i=0;i<256;i++){a+=h[i];if(a>n*.01){lo=i;break}}a=0;for(let i=255;i>=0;i--){a+=h[i];if(a>n*.01){hi=i;break}}
 const sc=255/Math.max(40,hi-lo);let m=0;for(let i=0;i<256;i++)m+=h[i]*i;m/=n;const g=m<115?.9:m>150?1.06:1;
 for(let i=0;i<d.length;i+=4){let r=Math.pow(Math.min(255,Math.max(0,(d[i]-lo)*sc))/255,g)*255,gg=Math.pow(Math.min(255,Math.max(0,(d[i+1]-lo)*sc))/255,g)*255,bb=Math.pow(Math.min(255,Math.max(0,(d[i+2]-lo)*sc))/255,g)*255;const l=r*.299+gg*.587+bb*.114;d[i]=Math.min(255,l+(r-l)*1.14);d[i+1]=Math.min(255,l+(gg-l)*1.14);d[i+2]=Math.min(255,l+(bb-l)*1.14)}
 x.putImageData(id,0,0);return o}
async function showResult(cv,label){const b=await brand(cv),box=bot(label,'kai-res');const im=el('img','kai-pic');im.src=b.toDataURL('image/jpeg',.92);im.alt='Your edited photo with Kofix Photography Studio beneath it';box.append(im);
 const dl=el('button','kai-act','Download photo');dl.type='button';dl.onclick=()=>b.toBlob(bl=>{const a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='kofix-photography-studio-photo.jpg';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000)},'image/jpeg',.92);
 box.append(dl,el('div','kai-cap','Preview of your final image, with "Kofix Photography Studio" beneath it. On iPhone you can also press and hold the picture to save it.'));scroll()}
async function onFile(){const f=file.files[0];file.value='';if(!f)return;
 if(!/^image\/(jpeg|png|webp)$/.test(f.type))return bot('Please choose a JPG, PNG or WebP photo.','err');
 if(f.size>12*1048576)return bot('That photo is too large. Please choose one under 12 MB.','err');
 try{const im=await loadImg(URL.createObjectURL(f));const s=Math.min(1,1600/Math.max(im.width,im.height)),cv=document.createElement('canvas');cv.width=Math.round(im.width*s);cv.height=Math.round(im.height*s);cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);photo=cv;
  const b=bot('Photo received. Your finished image will have "Kofix Photography Studio" added beneath it, and you can preview it before downloading. Your photo is not stored by Kofix. What would you like?');
  const th=el('img','kai-pic');th.src=cv.toDataURL('image/jpeg',.6);th.alt='Your uploaded photo';b.append(th);
  const c=el('div','kai-chips');const e1=el('button',null,'Quick enhance (colour and light)');e1.type='button';e1.onclick=()=>quick();const e2=el('button',null,'Describe an AI edit');e2.type='button';e2.onclick=()=>{mode='edit';inp.placeholder='e.g. remove the background';inp.focus();bot('Tell me the edit you want, for example "remove the background" or "give this a professional studio look".')};c.append(e1,e2);b.append(c)}
 catch(e){bot('That photo could not be opened. Please try another one.','err')}}
async function quick(){if(!photo)return;const ld=bot('Enhancing your photo\u2026','kai-dots');try{const r=enhance(photo);ld.remove();await showResult(r,'Done. Here is your enhanced photo.')}catch(e){ld.remove();bot('Sorry, that photo could not be enhanced.','err')}}
function startGen(){mode='gen';photo=null;inp.placeholder='Describe the photo concept';list.append(el('div','kai-b me','Create a photo concept'));bot('Describe the photography concept you have in mind, for example "elegant outdoor maternity shoot at sunset". The result is an AI-generated concept, not a real Kofix photograph, and will have "Kofix Photography Studio" beneath it.');inp.focus()}
async function aiImage(q){busy=true;send.disabled=true;inp.value='';list.append(el('div','kai-b me',q));const gen=mode==='gen';
 const ld=bot(gen?'Creating your concept\u2026 this can take up to 30 seconds.':'Editing your photo\u2026 this can take up to 30 seconds.','kai-dots');
 try{let img;if(!gen){const t=document.createElement('canvas'),s=Math.min(1,1280/Math.max(photo.width,photo.height));t.width=Math.round(photo.width*s);t.height=Math.round(photo.height*s);t.getContext('2d').drawImage(photo,0,0,t.width,t.height);img=t.toDataURL('image/jpeg',.88)}
  const c=new AbortController(),to=setTimeout(()=>c.abort(),30000);
  const r=await fetch('/api/edit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({mode:gen?'generate':'edit',prompt:q,image:img}),signal:c.signal});clearTimeout(to);ld.remove();
  if(r.status===503){bot('AI photo editing is not switched on yet, so I have not changed your photo. '+(gen?'':'Quick enhance is available.')+' You can also message the studio.','err');return}
  if(r.status===422){bot('I can only help with photography-related edits and concepts. Try describing a photo edit or a photoshoot idea.','err');return}
  if(r.status===429){bot('Too many requests for now. Please try again later.','err');return}
  if(!r.ok)throw 0;const d=await r.json();if(!d.image)throw 0;const im=await loadImg(d.image),cv=document.createElement('canvas');cv.width=im.width;cv.height=im.height;cv.getContext('2d').drawImage(im,0,0);
  await showResult(cv,gen?'Here is your AI-generated concept. It is a concept image, not a genuine Kofix photograph.':'Done. Here is your AI-edited photo.')}
 catch(e){ld.remove();bot('The image service did not finish, so I have not produced a result. Please try again, or message the studio.','err')}
 finally{busy=false;send.disabled=false;mode='chat';inp.placeholder='Ask about our services or booking'}}
clip.onclick=()=>file.click();file.onchange=onFile;
form.onsubmit=e=>{e.preventDefault();ask(inp.value)};
function openChat(){panel.classList.add('open');fab.setAttribute('aria-expanded','true');if(window.kofixMusic)kofixMusic.hold();if(!list.children.length)welcome();setTimeout(()=>inp.focus(),50)}
function closeChat(){panel.classList.remove('open');view.hidden=true;fab.setAttribute('aria-expanded','false');try{speechSynthesis.cancel()}catch(e){}if(window.kofixMusic)kofixMusic.release();fab.focus()}
let isOpen=false;fab.onclick=()=>{if(panel.classList.contains('open'))closeChat();else openChat()};xb.onclick=closeChat;
panel.addEventListener('keydown',e=>{if(e.key==='Escape')closeChat()});
})();
