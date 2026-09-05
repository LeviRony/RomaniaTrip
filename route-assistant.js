(()=>{
'use strict';
const SEL='romania-attraction-selection-v1',CACHE='romania-smart-route-v1';
const PARKING={
'Parc Aventura Brașov':['חניה ליד Parc Aventura','חניון / חניה באזור','לבדוק במקום','Parc Aventura Brasov parking',false],
'Salina Slănic Prahova':['חניה ליד Salina Slănic','חניה ציבורית ליד הכניסה','לבדוק במקום','Salina Slanic Prahova parking',false],
'Sinaia Gondola':['Parcare Gondola Sinaia','חניון בתשלום באזור הרכבל','לבדוק ביום הביקור','Parcare Gondola Sinaia',false],
'Sania Alpină Sinaia':['חניה באזור Gondola','חניון / חניה ציבורית','לבדוק ביום הביקור','Sinaia Gondola parking',false],
'Peleș Castle':['Parcare Peleș','חניה ציבורית באזור הארמון','לבדוק ביום הביקור','Peles Castle parking Sinaia',false],
'Paradisul Acvatic':['חניה ליד Paradisul Acvatic','חניה במתחם / באזור','לבדוק במקום','Paradisul Acvatic parking',false],
'Bâlea Lake':['חניה Bâlea Lac','חניה ציבורית באזור האגם','לבדוק במקום','Balea Lake parking',false],
'Vidraru Dam':['חניה באזור סכר Vidraru','עצירה / חניה ציבורית מוגבלת','לבדוק שילוט','Vidraru Dam parking',false],
'Old Town Bucharest':['חניון ליד העיר העתיקה','עדיף חניון מסודר','משתנה לפי חניון','parking Old Town Bucharest',true],
'Fashion House Militari':['חניה Fashion House','חניה במתחם הקניות','לבדוק במקום','Fashion House Militari parking',false],
'Jumbo Militari':['חניה Jumbo','חניה במתחם','לבדוק במקום','Jumbo Militari parking',false],
'King Mihai I Park':['חניה ליד Herăstrău','חניון / חניה עירונית','לפי אזור החניה','parking Herastrau Bucharest',true],
'AFI Cotroceni':['חניה AFI Cotroceni','חניון הקניון','לפי תנאי הקניון','AFI Cotroceni parking',false],
'Therme București':['חניה Therme','חניה במתחם','לבדוק במקום','Therme Bucuresti parking',false]
};
const style=document.createElement('style');style.textContent=`.smart-route{margin:12px 0;padding:13px;border:1px solid var(--line,#d8e3e7);border-radius:14px;background:#fff}.smart-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.smart-kpi{background:#f8fafb;border-radius:10px;padding:9px}.smart-kpi b{display:block;color:var(--p,#0d6f88);font-size:1.05rem}.busy{margin-top:9px;padding:9px;border-radius:10px;background:#fff2c9}.now-card{margin-top:10px;background:#eef6f8;border-radius:12px;padding:11px}.parking-card{margin-top:7px;padding:8px;background:#f8fafb;border-radius:9px;font-size:.86rem}.parking-card a{font-weight:800}.parking-buch{color:#9a5b00;font-weight:800}@media(max-width:850px){.smart-grid{grid-template-columns:1fr 1fr}}`;
document.head.appendChild(style);
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[m]))}
function fixed(s){return /(hotel|swissôtel|swissotel|novotel|orizont|otp|tlv|airport|klass|מלון|צ׳ק|צ'ק|חזרה למלון|יציאה|טרמינל|החזרת הרכב)/i.test(String((s?.[0]||'')+' '+(s?.[4]||''))) }
function skey(s){return [s?.[0],s?.[1],s?.[2]].join('|')}
function selected(i,s){if(fixed(s))return true;try{const a=JSON.parse(localStorage.getItem(SEL)||'{}'),d=a[String(i)]||{};return d[skey(s)]!==false}catch(e){return true}}
function stops(i){return (window.D?.[i]?.s||[]).filter(s=>selected(i,s))}
function parseTime(t){const m=String(t||'').match(/(\d{1,2}):(\d{2})/);return m?Number(m[1])*60+Number(m[2]):null}
function fmtMin(n){n=Math.max(0,Math.round(n));return n>=60?`${Math.floor(n/60)} ש׳ ${n%60} דק׳`:`${n} דק׳`}
function clock(min){min=((Math.round(min)%1440)+1440)%1440;return `${String(Math.floor(min/60)).padStart(2,'0')}:${String(min%60).padStart(2,'0')}`}
function visitMinutes(s){const t=String(s?.[3]||''),m=t.match(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/);if(m){let a=+m[1]*60 + +m[2],b=+m[3]*60 + +m[4];if(b<a)b+=1440;return Math.min(300,Math.max(30,b-a))}return fixed(s)?15:75}
async function routeInfo(i){const ss=stops(i);if(ss.length<2)return{km:0,mins:0};const key=i+'|'+ss.map(s=>skey(s)).join(';');try{const c=JSON.parse(localStorage.getItem(CACHE)||'{}');if(c[key]&&Date.now()-c[key].at<12*3600000)return c[key]}catch(e){}
 try{const u='https://router.project-osrm.org/route/v1/driving/'+ss.map(s=>`${s[2]},${s[1]}`).join(';')+'?overview=false';const j=await(await fetch(u)).json(),r=j.routes?.[0];if(!r)throw 0;const x={km:r.distance/1000,mins:r.duration/60,at:Date.now()};let c={};try{c=JSON.parse(localStorage.getItem(CACHE)||'{}')}catch(e){}c[key]=x;localStorage.setItem(CACHE,JSON.stringify(c));return x}catch(e){return{km:0,mins:0}}
}
function tripDay(){const z=new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Bucharest'}));if(z.getFullYear()!==2026||z.getMonth()!==8||z.getDate()<19||z.getDate()>30)return-1;return z.getDate()-19}
function currentMin(){const z=new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Bucharest'}));return z.getHours()*60+z.getMinutes()}
function nextStop(i){const ss=stops(i),now=currentMin();for(const s of ss){const t=parseTime(s[3]);if(t!==null&&t>=now)return s}return ss[ss.length-1]||null}
function maps(name){return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(name)}
function addParking(){document.querySelectorAll('#stops .stop').forEach(row=>{if(row.querySelector('.parking-card'))return;const b=row.querySelector('b');if(!b)return;const text=b.textContent;const name=Object.keys(PARKING).find(n=>text.includes(n));if(!name)return;const p=PARKING[name],d=document.createElement('div');d.className='parking-card';d.innerHTML=`🅿️ <b>${p[0]}</b><br>${p[1]} · ${p[2]}<br><a target="_blank" href="${maps(p[3])}">📍 Google Maps לחניה</a>${p[4]?'<div class="parking-buch">📱 בבוקרשט: לבדוק אם נדרש תשלום דרך Parking Bucharest לפי השילוט באזור.</div>':''}`;row.appendChild(d)})}
async function render(){const root=document.getElementById('stops');if(!root||!window.D)return;const active=[...document.querySelectorAll('.tab')].findIndex(x=>x.classList.contains('on')),i=active>=0?active:0;let box=document.getElementById('smartRouteBox');if(!box){box=document.createElement('div');box.id='smartRouteBox';box.className='smart-route';root.parentNode.insertBefore(box,root)}box.innerHTML='🧠 מחשב מחדש לפי האטרקציות שבחרת…';const ss=stops(i),r=await routeInfo(i),vis=ss.reduce((a,s)=>a+visitMinutes(s),0),total=r.mins+vis;let dep=parseTime(ss[0]?.[3]);if(dep===null)dep=9*60;const ret=dep+total,attractions=ss.filter(s=>!fixed(s)).length,busy=total>=720||attractions>=6;let now='';if(tripDay()===i){const n=nextStop(i);if(n)now=`<div class="now-card"><b>▶️ מה עושים עכשיו?</b><div style="margin-top:5px"><b>${esc(n[0])}</b> · ${esc(n[3]||'לפי התכנון')}</div><div class="muted">${esc(n[4]||'')}</div><a class="btn" target="_blank" href="${maps(n[0])}">🧭 נווט עכשיו</a> <a class="btn" target="_blank" href="${maps(n[0]+' opening hours')}">🕒 בדוק שעות פתיחה</a><div class="muted" style="margin-top:6px">סטטוס פתיחה בפועל נבדק ב-Google Maps; האתר לא מנחש שעות פתיחה.</div></div>`}else now='<div class="now-card"><b>▶️ מה עושים עכשיו?</b><div class="muted">הכפתור יהפוך לפעיל אוטומטית ביום הטיול לפי השעה המקומית ברומניה.</div></div>';
box.innerHTML=`<h3 style="margin:0 0 9px">🧠 מסלול חכם לפי הבחירה</h3><div class="smart-grid"><div class="smart-kpi"><span>נסיעה</span><b>${r.mins?fmtMin(r.mins):'לא זמין'}</b></div><div class="smart-kpi"><span>מרחק</span><b>${r.km?Math.round(r.km)+' ק״מ':'לא זמין'}</b></div><div class="smart-kpi"><span>יציאה מומלצת</span><b>${clock(dep)}</b></div><div class="smart-kpi"><span>חזרה משוערת</span><b>${clock(ret)}</b></div></div>${busy?`<div class="busy">⚠️ <b>יום עמוס</b> — ${attractions} אטרקציות וכ־${fmtMin(total)} כולל נסיעות/ביקורים. מומלץ לשקול להסיר אטרקציה אחת.</div>`:''}${now}`;addParking()}
let timer;function schedule(){clearTimeout(timer);timer=setTimeout(render,180)}
function init(){schedule();new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});document.addEventListener('change',e=>{if(e.target.matches('[data-attraction]'))schedule()},true);document.addEventListener('click',e=>{if(e.target.closest('.tab,[data-picker-all],[data-picker-none],[data-page="trip"]'))schedule()},true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,1200));else setTimeout(init,1200);window.RomaniaRouteAssistant={render};
})();