(()=>{
'use strict';
const KEY='romania-attraction-selection-v1';
let BASE=[];
let currentDay=0;
const style=document.createElement('style');
style.textContent=`
.attraction-picker{margin:12px 0 16px;padding:14px;background:#f8fbfc;border:1px solid var(--line,#d8e3e7);border-radius:14px}
.attraction-picker h3{margin:0 0 5px;font-size:1.05rem}.attraction-picker .picker-sub{color:var(--muted,#667983);font-size:.86rem;margin-bottom:10px}
.attraction-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.attraction-option{display:flex;gap:9px;align-items:flex-start;background:#fff;border:1px solid #dfe9ec;border-radius:11px;padding:10px;cursor:pointer;min-width:0}.attraction-option input{width:20px;height:20px;flex:0 0 auto;margin-top:2px}.attraction-option span{min-width:0}.attraction-option b{display:block;overflow-wrap:anywhere}.attraction-option small{display:block;color:var(--muted,#667983);margin-top:2px}.attraction-option.off{opacity:.5;background:#f2f4f5}.picker-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.picker-actions button{border:1px solid var(--line,#d8e3e7);background:#fff;border-radius:9px;padding:7px 10px;cursor:pointer}.selected-count{font-weight:800;color:var(--p,#0d6f88)}
@media(max-width:850px){.attraction-options{grid-template-columns:1fr}.attraction-picker{padding:11px}.attraction-option{padding:9px}}
`;
document.head.appendChild(style);
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function fixed(s){const name=String(s?.[0]||''),desc=String(s?.[4]||'');return /(hotel|swissôtel|swissotel|novotel|orizont|otp|tlv|airport|klass|מלון|צ׳ק|צ'ק|חזרה למלון|יציאה|טרמינל|החזרת הרכב)/i.test((name+' '+desc).toLowerCase())}
function skey(s){return [s?.[0],s?.[1],s?.[2]].join('|')}
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){return {}}}
function save(v){localStorage.setItem(KEY,JSON.stringify(v));try{window.RomaniaFamilySync?.sync?.()}catch(e){}}
function selected(i,s){if(fixed(s))return true;const all=load(),day=all[String(i)]||{};return day[skey(s)]!==false}
function selectedStops(i){const d=BASE[i];return d?d.s.filter(s=>selected(i,s)):[]}
function renderPicker(i){
 currentDay=i;
 const root=document.getElementById('stops');if(!root||!BASE[i])return;
 let box=document.getElementById('attractionPicker');
 if(!box){box=document.createElement('div');box.id='attractionPicker';box.className='attraction-picker';root.parentNode.insertBefore(box,root)}
 const opts=BASE[i].s.filter(s=>!fixed(s));
 if(!opts.length){box.innerHTML='<h3>🎯 בחירת אטרקציות</h3><div class="picker-sub">ביום הזה אין כרגע אטרקציות לבחירה — רק נקודות קבועות כמו מלון, טיסה או איסוף רכב.</div>';return}
 const on=opts.filter(s=>selected(i,s)).length;
 box.innerHTML=`<h3>🎯 בחר אטרקציות ליום הזה</h3><div class="picker-sub">אפשר להדליק או לכבות אטרקציות לפי מזג האוויר. המסלול והמפה יתעדכנו מיד. <span class="selected-count">נבחרו ${on} מתוך ${opts.length}</span></div><div class="attraction-options">${opts.map(s=>{const checked=selected(i,s);return `<label class="attraction-option ${checked?'':'off'}"><input type="checkbox" data-attraction="${esc(skey(s))}" ${checked?'checked':''}><span><b>${esc(s[0])}</b><small>${esc(s[3]||'')} ${s[4]?'· '+esc(s[4]):''}</small></span></label>`}).join('')}</div><div class="picker-actions"><button type="button" data-picker-all="1">בחר הכל</button><button type="button" data-picker-none="1">נקה אטרקציות</button></div>`;
 box.querySelectorAll('[data-attraction]').forEach(cb=>cb.onchange=()=>{const all=load(),day=all[String(i)]||{};day[cb.dataset.attraction]=cb.checked;all[String(i)]=day;save(all);refresh(i)});
 box.querySelector('[data-picker-all]')?.addEventListener('click',()=>setAll(i,true));
 box.querySelector('[data-picker-none]')?.addEventListener('click',()=>setAll(i,false));
}
function setAll(i,value){const all=load(),day=all[String(i)]||{};BASE[i].s.filter(s=>!fixed(s)).forEach(s=>day[skey(s)]=value);all[String(i)]=day;save(all);refresh(i)}
function refresh(i){if(typeof window.show==='function')window.show(i);else renderPicker(i)}
function patch(){
 if(typeof D==='undefined'||!Array.isArray(D)||!D.length||typeof window.show!=='function')return false;
 BASE=D.map(d=>({n:d.n,note:d.note,s:(d.s||[]).map(s=>[...s])}));
 if(window.show.__attractionPatched)return true;
 const original=window.show;
 const wrapped=function(i){
   currentDay=Number(i)||0;
   const d=D[currentDay];if(!d)return original(i);
   const real=d.s;d.s=selectedStops(currentDay);
   try{return original(currentDay)}finally{d.s=real;setTimeout(()=>renderPicker(currentDay),0)}
 };
 wrapped.__attractionPatched=true;window.show=wrapped;
 const active=[...document.querySelectorAll('.tab')].findIndex(x=>x.classList.contains('on'));
 wrapped(active>=0?active:0);
 return true;
}
function init(){let tries=0;const t=setInterval(()=>{tries++;if(patch()||tries>20)clearInterval(t)},150)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,700));else setTimeout(init,700);
})();