(()=>{
// background music: starts when the browser allows it (otherwise on the first tap, click or key press); no visible control
const au=new Audio('assets/kofix-ambient.mp3');au.loop=true;au.volume=.14;au.preload='auto';
let hold=0;const sd=navigator.connection&&navigator.connection.saveData;let vid=0,started=false;
const evs=['pointerdown','pointerup','mousedown','keydown','touchend','click'];
const go=()=>{if(sd||vid||hold)return;au.play().then(()=>{started=true;if(hold||vid)au.pause();evs.forEach(e=>removeEventListener(e,go,true))}).catch(()=>{})};
evs.forEach(e=>addEventListener(e,go,true));go();
addEventListener('play',e=>{if(e.target.tagName==='VIDEO'){vid++;au.pause()}},true);
const vend=e=>{if(e.target.tagName==='VIDEO'){vid=Math.max(0,vid-1);if(!vid&&!hold&&started)au.play().catch(()=>{})}};
addEventListener('pause',vend,true);addEventListener('ended',vend,true);
document.addEventListener('visibilitychange',()=>{document.hidden?au.pause():(started&&!vid&&!hold&&au.play().catch(()=>{}))});
window.kofixMusic={hold(){hold++;au.pause()},release(){hold=Math.max(0,hold-1);if(!hold&&!vid&&!sd)au.play().then(()=>{started=true}).catch(()=>{})}};
})();
