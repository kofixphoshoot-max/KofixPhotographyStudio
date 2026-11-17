(()=>{
const $=(s,r=document)=>[...r.querySelectorAll(s)],G=id=>document.getElementById(id);
const WA="https://wa.me/233534349054";
const M=window.MEDIA||{photos:[],videos:[],frames:[]};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
G('y').textContent=new Date().getFullYear();
function tabs(items,box,fn){const cats=[...new Map(items.map(i=>[i.cat,i.label])).entries()];
 box.innerHTML='<button aria-pressed="true" data-f="all">All</button>'+cats.map(([c,l])=>`<button aria-pressed="false" data-f="${esc(c)}">${esc(l)}</button>`).join('');
 if(cats.length<2)box.hidden=true;
 $('button',box).forEach(b=>b.onclick=()=>{$('button',box).forEach(t=>t.setAttribute('aria-pressed',t===b));fn(b.dataset.f)});}
const show=(el,cat)=>{const h=cat!=='all'&&el.dataset.cat!==cat;el.classList.toggle('off',h);el.classList.remove('show');if(!h)requestAnimationFrame(()=>el.classList.add('show'))};
const tile=p=>`<button class="ph" data-cat="${esc(p.cat||'')}" aria-label="View: ${esc(p.alt)}"><img src="${p.src}" width="${p.w}" height="${p.h}" alt="${esc(p.alt)}" loading="lazy" decoding="async"></button>`;
const hide=(sec,link)=>{G(sec).hidden=true;const a=document.querySelector(`nav a[href="#${sec}"]`);if(a)a.hidden=true};
if(M.photos.length){G('gallery').innerHTML=M.photos.map(tile).join('');tabs(M.photos,G('ptabs'),c=>$('#gallery .ph').forEach(t=>show(t,c)))}else hide('work');
if(M.frames.length)G('fgal').innerHTML=M.frames.map(tile).join('');else hide('frames');
if(M.videos.length){G('vgrid').innerHTML=M.videos.map(v=>`<figure class="vid${v.portrait?' v':''}" data-cat="${esc(v.cat)}"><video controls preload="none" playsinline ${v.poster?`poster="${v.poster}"`:''} src="${v.src}"></video><figcaption>${esc(v.title)}</figcaption></figure>`).join('');
 tabs(M.videos,G('vtabs'),c=>$('#vgrid .vid').forEach(t=>show(t,c)))}else hide('videos');
// lightbox
const lb=G('lb'),big=G('big');
document.addEventListener('click',e=>{const t=e.target.closest('#gallery .ph,#fgal .ph');if(!t)return;const i=t.querySelector('img').cloneNode();i.removeAttribute('loading');big.replaceChildren(i);lb.showModal()});
G('x').onclick=()=>lb.close();lb.addEventListener('click',e=>{if(e.target===lb)lb.close()});
// email enquiry dialog (opens WhatsApp with the full message)
const em=G('em'),ef=G('ef'),es=G('es'),eow=G('eow'),eu=G('eu');
G('eo').onclick=()=>em.showModal();G('ex').onclick=()=>em.close();
em.addEventListener('click',e=>{if(e.target===em)em.close()});
es.onchange=()=>{const o=es.value==='Other';eow.hidden=!o;eu.required=o;if(!o)eu.value=''};
em.addEventListener('close',()=>{eow.hidden=es.value!=='Other'});
ef.addEventListener('submit',e=>{e.preventDefault();const g=id=>G(id).value.trim();
 const L=['Hello Kofix Photography Studio, I would like to make an enquiry.','','Name: '+g('en'),'Email: '+g('ee')];
 if(g('ep'))L.push('Phone: '+g('ep'));L.push('Subject: '+(g('es')==='Other'?'Other - '+g('eu'):g('es')));
 if(g('ed'))L.push('Event date: '+g('ed'));L.push('Message: '+g('em2'));
 const a=document.createElement('a');a.href=WA+'?text='+encodeURIComponent(L.join('\n'));a.target='_blank';a.rel='noopener';document.body.append(a);a.click();a.remove()});
// nav: mobile menu + current-section highlight
const mb=G('mb'),mn=G('mn');
mb.onclick=()=>{const o=mn.classList.toggle('open');mb.setAttribute('aria-expanded',o)};
mn.addEventListener('click',e=>{if(e.target.closest('a')){mn.classList.remove('open');mb.setAttribute('aria-expanded',false)}});
if('IntersectionObserver' in window){
 const sp=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting)$('nav a').forEach(a=>a.toggleAttribute('aria-current',a.getAttribute('href')==='#'+x.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
 ['home','work','videos','frames','services','about','contact'].forEach(id=>{const n=G(id);if(n&&!n.hidden)sp.observe(n)});
 const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});$('.rv').forEach(n=>io.observe(n));
}else $('.rv').forEach(n=>n.classList.add('in'));
// offline notice + service worker
const ofl=document.createElement('p');ofl.className='ofl';ofl.hidden=true;ofl.setAttribute('role','status');
ofl.textContent="You're offline. Pages and photos you have already opened are still available. Videos and new content load when you're back online.";document.body.append(ofl);
const net=()=>ofl.hidden=navigator.onLine;addEventListener('online',net);addEventListener('offline',net);net();
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
})();
