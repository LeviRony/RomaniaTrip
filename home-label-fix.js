(()=>{
'use strict';
function fix(){document.querySelectorAll('#homeDays .muted').forEach(el=>{if(el.textContent.trim()==='מלון / מעבר / טיסה')el.textContent='מלון / מעבר';});}
function run(){fix();setTimeout(fix,300);setTimeout(fix,1200);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
document.addEventListener('click',e=>{if(e.target.closest('[data-page="home"]'))setTimeout(run,50)},true);
new MutationObserver(fix).observe(document.documentElement,{subtree:true,childList:true,characterData:true});
})();