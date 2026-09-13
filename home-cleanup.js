(()=>{
'use strict';
function clean(){
  const panel=document.getElementById('homeSmartPanel');
  if(!panel)return;
  const cards=[...panel.querySelectorAll('.home-smart-card')];
  for(const card of cards){
    const text=(card.textContent||'').replace(/\s+/g,' ').trim();
    if(text.includes('לינה')&&text.includes('Hotel Orizont Predeal')&&text.includes('כל ההזמנות, כתובות וטלפונים במקום אחד')) card.remove();
  }
  if(panel.children.length===1) panel.style.gridTemplateColumns='1fr';
}
function init(){clean();setTimeout(clean,600);setTimeout(clean,1600);new MutationObserver(clean).observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();