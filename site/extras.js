(()=>{
const $=(s,r=document)=>[...r.querySelectorAll(s)],G=id=>document.getElementById(id),WA='https://wa.me/233534349054';
const M=window.MEDIA||{photos:[]};
// ---- spinning ring of real portfolio photos ----
(function(){const box=G('ringbox');if(!box)return;const by={};M.photos.forEach(p=>(by[p.cat]=by[p.cat]||[]).push(p));
 const pick=[];for(let i=0;pick.length<10&&i<10;i++)Object.keys(by).forEach(k=>{if(by[k][i]&&pick.length<10)pick.push(by[k][i])});
 if(pick.length<3){G('spin').hidden=true;return}
 const n=pick.length,mob=innerWidth<560,W=mob?104:150,H=mob?138:200,R=Math.round((W+16)/2/Math.tan(Math.PI/n));
 const ring=document.createElement('div');ring.className='ring';
 pick.forEach((p,i)=>{const b=document.createElement('button');b.type='button';b.className='ring-item';b.setAttribute('aria-label','View larger: '+p.alt);b.style.cssText='width:'+W+'px;height:'+H+'px;left:'+(-W/2)+'px;top:'+(-H/2)+'px;transform:rotateY('+(i*360/n)+'deg) translateZ('+R+'px)';
  const im=document.createElement('img');im.src=p.src;im.alt=p.alt;im.width=p.w;im.height=p.h;im.loading='lazy';im.decoding='async';b.append(im);b.onclick=()=>show(im);ring.append(b)});
 const show=im=>{const c=im.cloneNode();c.removeAttribute('loading');G('big').replaceChildren(c);G('lb').showModal()};
 box.append(ring);let tap=null,ang=0,vel=0,drag=false,lx=0,moved=0,vis=false,last=0,hold=0;const still=matchMedia('(prefers-reduced-motion:reduce)').matches;
 const set=()=>{ring.style.transform='translateZ(-'+R+'px) rotateY('+ang+'deg)'};set();
 box.addEventListener('pointerdown',e=>{tap=e.target.closest('.ring-item');drag=true;moved=0;lx=e.clientX;vel=0;hold=performance.now();try{box.setPointerCapture(e.pointerId)}catch(x){}});
 box.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-lx;lx=e.clientX;moved+=Math.abs(dx);ang+=dx*.4;vel=dx*.4;set()});
 const up=()=>{const t=tap;tap=null;if(drag&&t&&moved<6)show(t.querySelector('img'));drag=false;hold=performance.now()};box.addEventListener('pointerup',up);box.addEventListener('pointercancel',up);
 function tick(t){if(!vis){return}const dt=Math.min(40,t-last||16);last=t;
  if(!drag){if(Math.abs(vel)>.02){ang+=vel;vel*=.94}else if(!still&&t-hold>1500)ang-=.05*dt/16*2.2;set()}requestAnimationFrame(tick)}
 if('IntersectionObserver' in window)new IntersectionObserver(es=>{const v=es[0].isIntersecting;if(v&&!vis){vis=true;last=0;requestAnimationFrame(tick)}vis=v}).observe(box);else{vis=true;requestAnimationFrame(tick)}
})();
// ---- testimonials (from testimonials.js) ----
(function(){const t=(window.TESTIMONIALS||[]).filter(x=>x&&x.quote&&x.name).slice(0,4),s=G('reviews');if(!s)return;if(!t.length){s.hidden=true;return}
 const g=G('quotes'),mk=(tag,cls,txt)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e};
 t.forEach(x=>{const q=mk('figure','quote'+(x.photo?' has-photo':''));q.style.margin=0;
  if(x.photo){const im=mk('img','q-photo');im.src=x.photo;im.alt='Photo of '+x.name;im.width=104;im.height=140;im.loading='lazy';im.decoding='async';if(x.pos)im.style.objectPosition=x.pos;q.append(im)}
  const id=mk('figcaption','q-id');id.append(mk('strong',null,x.name));if(x.role)id.append(mk('span','q-role',x.role));if(x.detail)id.append(mk('small',null,x.detail));
  q.append(id,mk('p','q-text','\u201c'+x.quote+'\u201d'));g.append(q)})})();
// ---- learn dialog -> WhatsApp ----
(function(){const d=G('lrn'),f=G('lrnf');if(!d)return;G('learnbtn').onclick=()=>d.showModal();G('lrnx').onclick=()=>d.close();d.addEventListener('click',e=>{if(e.target===d)d.close()});
 f.addEventListener('submit',e=>{e.preventDefault();const v=n=>(f.elements[n]&&f.elements[n].value||'').trim(),topics=$('input[name=topic]:checked',f).map(x=>x.value);
  if(!topics.length){G('lrnerr').hidden=false;return}G('lrnerr').hidden=true;
  const L=['Hello Kofix Photography Studio, I would like to apply to learn photography and videography.','','Name: '+v('name'),'Phone: '+v('phone'),'Gender: '+v('gender'),'Marital status: '+v('marital'),'Where I stay: '+v('town'),'I want to learn: '+topics.join(', '),'Experience: '+v('level'),'Camera: '+v('camera'),'Preferred days: '+v('days')];
  if(v('notes'))L.push('Notes: '+v('notes'));
  const a=document.createElement('a');a.href=WA+'?text='+encodeURIComponent(L.join('\n'));a.target='_blank';a.rel='noopener';document.body.append(a);a.click();a.remove()})})();
// ---- promo pill: shows from Mon 9 Nov 2026 to Mon 16 Nov 2026 (Ghana time = UTC) ----
(function(){const PROMO={start:'2026-11-09T00:00:00Z',end:'2026-11-16T23:59:59Z',url:'https://kofixphotographypromo.netlify.app/'};
 try{if(sessionStorage.getItem('kofix-promo-x'))return}catch(e){}
 const now=Date.now(),s=Date.parse(PROMO.start),e=Date.parse(PROMO.end);if(now>e)return;
 const live=now>=s,w=document.createElement('div');w.className='promo';
 const a=document.createElement('a');a.className='promo-a';a.href=PROMO.url;a.target='_blank';a.rel='noopener';const sp=document.createElement('span');
 sp.append(live?'Kofix promo is live':'Kofix promo starts Monday');const sm=document.createElement('small');sm.textContent=live?'Ends Monday 16 November. Tap to view':'Starts 9 November. Tap to preview';sp.append(sm);a.append(sp);
 const x=document.createElement('button');x.type='button';x.className='promo-x';x.textContent='\u00d7';x.setAttribute('aria-label','Hide promo notice');x.onclick=()=>{w.remove();try{sessionStorage.setItem('kofix-promo-x','1')}catch(e){}};w.append(a,x);document.body.append(w)})();
})();
