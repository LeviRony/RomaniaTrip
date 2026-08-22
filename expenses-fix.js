(()=>{
const KEY='romania-manual-expenses';
function get(){try{const v=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(v)?v:[]}catch(e){return []}}
function save(v){try{localStorage.setItem(KEY,JSON.stringify(v));return true}catch(e){return false}}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function moneyOriginal(x){const sym=x.currency==='USD'?'$':x.currency==='EUR'?'€':x.currency==='ILS'?'₪':'';return `${sym}${Number(x.amount).toLocaleString('he-IL',{maximumFractionDigits:2})}${sym?'':' '+x.currency}`}
function ilsFor(x){try{if(typeof toIls==='function'){const n=toIls(x.amount,x.currency);return Number.isFinite(n)&&n>0?'₪'+Math.round(n).toLocaleString('he-IL'):'ממתין לשער'}}catch(e){}return x.currency==='ILS'?'₪'+Math.round(Number(x.amount)).toLocaleString('he-IL'):'ממתין לשער'}
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
function install(){
 const btn=document.getElementById('addExpenseBtn');
 if(btn&&!btn.dataset.expenseFix){btn.dataset.expenseFix='1';btn.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();add()},true)}
 render();
 document.querySelector('[data-page="summary"]')?.addEventListener('click',()=>setTimeout(render,20));
 window.addEventListener('storage',e=>{if(e.key===KEY)render()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
window.renderManualExpenses=render;
})();