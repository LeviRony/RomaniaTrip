(()=>{
const KEY='romania-manual-expenses-v2';
const OLD_KEY='romania-manual-expenses';
const FIXED=[
 {key:'intl-license',amount:23,currency:'ILS',description:'רישיון נהיגה בין לאומי',displayOriginal:'₪23',createdAt:'2026-09-12T07:41:00Z'},
 {key:'esim-3',amount:61,currency:'ILS',description:'eSIM 3',displayOriginal:'$20.2',createdAt:'2026-09-12T07:41:00Z'},
 {key:'fx-eur-500',amount:1837,currency:'ILS',description:'500 אירו מטח · הזמנה 625700681',displayOriginal:'₪1,837',orderNumber:'625700681',createdAt:'2026-09-12T07:37:18Z'},
 {key:'fx-ron-2000',amount:1397,currency:'ILS',description:'2000 ליאו רומני מטח · הזמנה 625700676',displayOriginal:'₪1,397',orderNumber:'625700676',createdAt:'2026-09-12T07:36:58Z'},
 {key:'mega-image-20260919',amount:18.46,currency:'RON',description:'Mega Image · 19.9',displayOriginal:'RON 18.46',createdAt:'2026-09-19T12:00:00+03:00'},
 {key:'royal-tickets-20260920',amount:78.18,currency:'RON',description:'ROYAL TICKETS SRL · מזחלות הרים · 20.9',displayOriginal:'RON 78.18',createdAt:'2026-09-20T14:23:00+03:00'},
 {key:'steimatzky-20260918',amount:120.25,currency:'ILS',description:'Steimatzky · הוצאה לטיול · 18.9',displayOriginal:'₪120.25',createdAt:'2026-09-18T12:00:00+03:00'}
];
function get(){try{let raw=localStorage.getItem(KEY);if(!raw){raw=localStorage.getItem(OLD_KEY);if(raw)localStorage.setItem(KEY,raw)}const v=JSON.parse(raw||'[]');return Array.isArray(v)?v:[]}catch(e){return []}}
function save(v){try{const raw=JSON.stringify(v);localStorage.setItem(KEY,raw);localStorage.setItem(OLD_KEY,raw);window.RomaniaFamilySync?.sync?.();return true}catch(e){return false}}
function seedFixed(){
 let a=get();
 const orderNos=new Set(FIXED.map(x=>x.orderNumber).filter(Boolean));
 a=a.filter(x=>!orderNos.has(x.orderNumber)&&!Array.from(orderNos).some(n=>String(x.description||'').includes(n)));
 FIXED.forEach(x=>{
   const i=a.findIndex(y=>y.key===x.key||String(y.description||'').trim()===x.description);
   if(i>=0)a[i]=x;else a.push(x);
 });
 save(a);
}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function moneyOriginal(x){if(x.displayOriginal)return x.displayOriginal;const sym=x.currency==='USD'?'$':x.currency==='EUR'?'€':x.currency==='ILS'?'₪':'';return `${sym}${Number(x.amount).toLocaleString('he-IL',{maximumFractionDigits:2})}${sym?'':' '+x.currency}`}
function ilsFor(x){if(x.currency==='ILS')return '₪'+Math.round(Number(x.amount)).toLocaleString('he-IL');try{if(typeof toIls==='function'){const n=toIls(x.amount,x.currency);return Number.isFinite(n)&&n>0?'₪'+Math.round(n).toLocaleString('he-IL'):'ממתין לשער'}}catch(e){}return 'ממתין לשער'}
function render(){
 const list=get(),table=document.getElementById('expenseTable'),rows=document.getElementById('manualSummaryRows');
 if(table){table.innerHTML=list.length?'':'<div class="muted">עדיין לא נוספו הוצאות ידניות.</div>';list.forEach((x,i)=>table.insertAdjacentHTML('beforeend',`<div class="expense-item"><b class="ltr">${esc(moneyOriginal(x))}</b><span class="summary-ils">${esc(ilsFor(x))}</span><span>${esc(x.description||'הוצאה נוספת')}</span><button class="danger-btn" type="button" data-expense-delete-fix="${i}">מחק</button></div>`));table.querySelectorAll('[data-expense-delete-fix]').forEach(b=>b.onclick=()=>{const a=get();a.splice(Number(b.dataset.expenseDeleteFix),1);save(a);render();try{if(typeof renderSummary==='function')renderSummary()}catch(e){}})}
 if(rows){rows.innerHTML='';list.forEach(x=>rows.insertAdjacentHTML('beforeend',`<div class="summary-row"><div><b>➕ ${esc(x.description||'הוצאה נוספת')}</b></div><div class="ltr">${esc(moneyOriginal(x))}</div><div class="summary-ils">${esc(ilsFor(x))}</div></div>`))}
}
function add(){
 const amountEl=document.getElementById('expenseAmount'),curEl=document.getElementById('expenseCurrency'),descEl=document.getElementById('expenseDescription');
 const amount=Number(amountEl?.value),currency=curEl?.value||'RON',description=(descEl?.value||'').trim();
 if(!(amount>0)){alert('יש להזין מחיר');return}
 const a=get();a.push({amount,currency,description,createdAt:new Date().toISOString()});
 if(!save(a)){alert('לא ניתן לשמור את ההוצאה במכשיר');return}
 if(amountEl)amountEl.value='';if(descEl)descEl.value='';
 render();try{if(typeof renderSummary==='function')renderSummary()}catch(e){}
}
function parseIls(s){const n=Number(String(s||'').replace(/[^0-9.-]/g,''));return Number.isFinite(n)?n:0}
function removeSwissParking(){
 const p=document.getElementById('sumParking');
 if(p){const row=p.closest('.summary-row');if(row)row.style.display='none'}
 document.querySelectorAll('#page-hotels .warn').forEach(el=>{if(el.textContent.includes('חניה:')&&el.closest('.card')?.textContent.includes('Swissôtel'))el.style.display='none'});
}
function adjustGrandTotalWithoutParking(){
 const p=document.getElementById('sumParking'),g=document.getElementById('summaryGrandTotal');
 if(!p||!g)return;
 const park=parseIls(p.textContent),total=parseIls(g.textContent);
 if(park>0&&total>=park)g.textContent='₪'+Math.round(total-park).toLocaleString('he-IL');
}
function patchSummary(){
 if(typeof window.renderSummary==='function'&&!window.renderSummary.__noSwissParking){
   const original=window.renderSummary;
   const wrapped=function(){const r=original.apply(this,arguments);removeSwissParking();adjustGrandTotalWithoutParking();render();return r};
   wrapped.__noSwissParking=true;window.renderSummary=wrapped;
 }
 removeSwissParking();adjustGrandTotalWithoutParking();
}
function install(){
 seedFixed();
 const btn=document.getElementById('addExpenseBtn');
 if(btn&&!btn.dataset.expenseFix){btn.dataset.expenseFix='1';btn.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();add()},true)}
 render();patchSummary();
 document.querySelector('[data-page="summary"]')?.addEventListener('click',()=>setTimeout(()=>{render();patchSummary()},30));
 window.addEventListener('storage',e=>{if(e.key===KEY||e.key===OLD_KEY){render();try{window.RomaniaSummary?.render?.()}catch(_){}}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
window.renderManualExpenses=render;
})();