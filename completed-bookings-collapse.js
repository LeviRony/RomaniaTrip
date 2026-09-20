(()=>{
function isBookingCard(card){const t=(card.textContent||'').toLowerCase();return /hotel orizont|swiss[oô]tel|novotel|ly9491|ly574|טיסה|מלון|flight|hotel/.test(t)}
function collapse(card){
 if(card.dataset.compactBooking==='1')return; card.dataset.compactBooking='1';
 const heading=card.querySelector('h1,h2,h3');
 const bold=card.querySelector('b');
 const title=(heading?.textContent||bold?.textContent||'פרטי הזמנה').trim();
 const body=document.createElement('div');body.className='booking-collapse-body';
 [...card.childNodes].forEach(n=>body.appendChild(n));
 const head=document.createElement('div');head.className='booking-collapse-head';
 const label=document.createElement('strong');label.textContent=title;
 const btn=document.createElement('button');btn.type='button';btn.className='booking-collapse-toggle';btn.textContent='הצג פרטים ▾';
 head.append(label,btn);card.append(head,body);body.hidden=true;
 btn.addEventListener('click',()=>{body.hidden=!body.hidden;btn.textContent=body.hidden?'הצג פרטים ▾':'סגור פרטים ▴'});
}
function apply(){
 const roots=[document.getElementById('page-home'),document.getElementById('page-hotels')].filter(Boolean);
 roots.forEach(root=>[...root.querySelectorAll('.card')].filter(isBookingCard).forEach(collapse));
}
const st=document.createElement('style');st.textContent='.booking-collapse-head{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:38px}.booking-collapse-head strong{font-size:1.05rem}.booking-collapse-toggle{border:1px solid var(--line,#d8e3e7);background:var(--card,#fff);color:inherit;border-radius:10px;padding:8px 11px;font-weight:800;cursor:pointer;white-space:nowrap}.booking-collapse-body[hidden]{display:none!important}.booking-collapse-body{margin-top:12px}';document.head.appendChild(st);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,700));else setTimeout(apply,700);
let timer;new MutationObserver(()=>{clearTimeout(timer);timer=setTimeout(apply,100)}).observe(document.body||document.documentElement,{childList:true,subtree:true});
document.addEventListener('click',e=>{if(e.target.closest('[data-page="home"],[data-page="hotels"]'))setTimeout(apply,300)},true);
})();