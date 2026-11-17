// Builds media.js from the folders. Folder = category. Run: node tools/scan-media.js (Netlify runs it on every deploy).
const fs=require('fs'),path=require('path');
const L={weddings:'Weddings',birthdays:'Birthdays','maternity-baby':'Maternity & Baby',graduation:'Graduation',portraits:'Portraits',events:'Events',wedding:'Wedding Videos',bts:'BTS Videos',celebrations:'Birthdays & Celebrations',promo:'Studio & Promo'};
const ORDER={photos:['weddings','birthdays','maternity-baby','graduation','portraits','events'],videos:['wedding','bts','celebrations','promo']};
const human=s=>s.replace(/\.[^.]+$/,'').replace(/[-_]+/g,' ').trim().replace(/^./,c=>c.toUpperCase());
const label=c=>L[c]||human(c);
function dims(f){const b=fs.readFileSync(f),e=path.extname(f).toLowerCase();try{
 if(e=='.png')return[b.readUInt32BE(16),b.readUInt32BE(20)];
 if(e=='.webp'){const t=b.toString('ascii',12,16);if(t=='VP8X')return[1+b.readUIntLE(24,3),1+b.readUIntLE(27,3)];if(t=='VP8L'){const v=b.readUInt32LE(21);return[(v&16383)+1,((v>>14)&16383)+1]}return[b.readUInt16LE(26)&16383,b.readUInt16LE(28)&16383]}
 let i=2;while(i<b.length){if(b[i]!=0xFF){i++;continue}const m=b[i+1];if(m>=0xC0&&m<=0xCF&&![0xC4,0xC8,0xCC].includes(m))return[b.readUInt16BE(i+7),b.readUInt16BE(i+5)];i+=2+b.readUInt16BE(i+2)}}catch(x){}return[1200,1500]}
const ls=d=>fs.existsSync(d)?fs.readdirSync(d).sort():[];
const sortCats=(a,o)=>[...o.filter(c=>a.includes(c)),...a.filter(c=>!o.includes(c)).sort()];
const url=p=>p.split(path.sep).map(encodeURIComponent).join('/');
const IMG=/\.(webp|jpe?g|png|avif)$/i;
const photos=[],frames=[],videos=[];
const pc=ls('media/photos').filter(c=>fs.statSync('media/photos/'+c).isDirectory());
for(const c of sortCats(pc,ORDER.photos))for(const f of ls('media/photos/'+c).filter(f=>IMG.test(f))){const p='media/photos/'+c+'/'+f,[w,h]=dims(p);photos.push({cat:c,label:label(c),src:url(p),w,h,alt:human(f)})}
for(const f of ls('media/frames').filter(f=>IMG.test(f))){const p='media/frames/'+f,[w,h]=dims(p);frames.push({src:url(p),w,h,alt:human(f)})}
const vc=ls('media/videos').filter(c=>fs.statSync('media/videos/'+c).isDirectory());
for(const c of sortCats(vc,ORDER.videos))for(const f of ls('media/videos/'+c).filter(f=>/\.(mp4|webm|mov)$/i.test(f))){const base=f.replace(/\.[^.]+$/,''),pf=ls('media/videos/'+c).find(x=>IMG.test(x)&&x.replace(/\.[^.]+$/,'')==base),p=pf?'media/videos/'+c+'/'+pf:null;
 const [w,h]=p?dims(p):[16,9];videos.push({cat:c,label:label(c),src:url('media/videos/'+c+'/'+f),poster:p?url(p):'',portrait:h>w,title:human(f)})}
fs.writeFileSync('media.js','window.MEDIA='+JSON.stringify({photos,videos,frames},null,1)+';\n');
console.log(`media.js: ${photos.length} photos, ${videos.length} videos, ${frames.length} frames`);
try{const c={};photos.forEach(p=>c[p.cat]=(c[p.cat]||0)+1);c.frames=frames.length;
 const d='../netlify/functions/lib';if(fs.existsSync(d)){fs.writeFileSync(d+'/public-counts.js','module.exports='+JSON.stringify(c)+';\n');console.log('public-counts.js updated')}}catch(e){}
