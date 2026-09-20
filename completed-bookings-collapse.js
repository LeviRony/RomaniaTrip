(()=>{
const KEY='romania-completed-bookings-collapsed-v1';
function doneCard(card){const t=(card.textContent||'').toLowerCase();return /hotel orizont|swiss[oô]tel|novotel|ly9491|ly574|טיסה|מלון|flight|hotel/.test(t)}
function apply(){
 const home=document.getElementById('page-home'); if(!home)return;
 const now=new Date();
 [...home.querySelectorAll('.card')].filter(doneCard).forEach((card,i)=>{
   if(card.dataset.compactDone)return; card.dataset.compactDone='1';
   const title=card.querySelector('h1,h2,h3,b')?.textContent?.trim()||'פרטי הזמנה';
   const wrap=document.createElement('div'); wrap.className='completed-booking-body';
   const nodes=[...card.childNodes]; nodes.forEach(n=>{if(n.nodeType===1&&n.matches?.('h1,h2,h3'))return;wrap.appendChild(n)});
   const head=document.createElement('div');head.className='completed-booking-head';
   head.innerHTML='<strong>'+title.replace(/[&<>]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]))+'</strong><button type="button" class="completed-booking-toggle">הצג פרטים ▾</button>';
   card.prepend(head); card.appendChild(wrap); wrap.hidden=true;
   head.querySelector('button').onclick=()=>{wrap.hidden=!wrap.hidden;head.querySelector('button').textContent=wrap.hidden?'הצג פרטים ▾':'סגור פרטים ▴'};
 });
}
const style=document.createElement('style');style.textContent='.completed-booking-head{display:flex;align-items:center;justify-content:space-between;gap:10px}.completed-booking-toggle{border:0;border-radius:10px;padding:7px 11px;font-weight:700;cursor:pointer;background:var(--card,#fff);box-shadow:0 1px 5px #0002}.completed-booking-body[hidden]{display:none!important}';document.head.appendChild(style);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,400));else setTimeout(apply,400);
new MutationObserver(()=>apply()).observe(document.documentElement,{childList:true,subtree:true});
})();