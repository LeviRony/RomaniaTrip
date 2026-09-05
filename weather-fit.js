(()=>{
'use strict';
const CACHE_KEY='romania-attraction-weather-v1';
const TRIP_YEAR=2026,TRIP_MONTH=9,TRIP_DAY=19;
const style=document.createElement('style');
style.textContent=`
.weather-fit{display:inline-flex;align-items:center;gap:5px;margin-top:6px;padding:4px 8px;border-radius:999px;font-size:.78rem;font-weight:800;width:max-content;max-width:100%}
.weather-fit.good{background:#e9f8ee;color:#237a3b}.weather-fit.rain{background:#eaf3ff;color:#245c9c}.weather-fit.wind{background:#fff1dd;color:#9a5b00}.weather-fit.snow{background:#eef4ff;color:#405b89}.weather-fit.wait{background:#f2f4f5;color:#667983}.weather-fit.loading{background:#f2f4f5;color:#667983}
.weather-detail{display:block;margin-top:3px;color:var(--muted,#667983);font-size:.75rem;font-weight:400}
`;
document.head.appendChild(style);
function cacheLoad(){try{return JSON.parse(localStorage.getItem(CACHE_KEY)||'{}')||{}}catch(e){return {}}}
function cacheSave(v){try{localStorage.setItem(CACHE_KEY,JSON.stringify(v))}catch(e){}}
function tripDate(i){const d=new Date(TRIP_YEAR,TRIP_MONTH-1,TRIP_DAY+Number(i||0));return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`}
function attractionType(name,desc){const t=(String(name)+' '+String(desc)).toLowerCase();if(/gondola|cota|sania|alpin|parc aventura|adventure|bâlea|balea|vidraru|transf|park|herăstrău|herastrau|שיט|פארק חבלים|מגלשות|רכבל|אגם|סכר/.test(t))return'outdoor-sensitive';if(/peleș|peles|salina|therme|afi|jumbo|fashion house|museum|paradisul acvatic|מכרה|קניון|מוזיאון|פארק מים/.test(t))return'indoor';return'normal'}
function classify(name,desc,w){const type=attractionType(name,desc),code=Number(w.code),wind=Number(w.wind||0),pp=Number(w.pp||0),min=Number(w.min),max=Number(w.max);
 const snow=[71,73,75,77,85,86].includes(code)||min<=0;
 const rain=(code>=51&&code<=67)||(code>=80&&code<=82)||(code>=95&&code<=99)||pp>=55;
 if(type==='indoor'){
   if(snow||rain||wind>=45)return{cls:'good',label:'☀️ מתאים',detail:'אטרקציה מקורה · מזג האוויר פחות משפיע'};
   return{cls:'good',label:'☀️ מתאים',detail:`${Math.round(min)}°–${Math.round(max)}°`};
 }
 if(snow&&type==='outdoor-sensitive')return{cls:'snow',label:'❄️ לבדוק פתיחה',detail:`${Math.round(min)}°–${Math.round(max)}° · תנאי חורף אפשריים`};
 if(wind>=45&&type==='outdoor-sensitive')return{cls:'wind',label:'💨 לא מומלץ',detail:`רוח עד ${Math.round(wind)} קמ״ש`};
 if((rain||pp>=55)&&type==='outdoor-sensitive')return{cls:'rain',label:'🌧️ עדיף חלופה',detail:`סיכוי גשם ${Math.round(pp)}%`};
 if(wind>=45)return{cls:'wind',label:'💨 לא מומלץ',detail:`רוח עד ${Math.round(wind)} קמ״ש`};
 if(rain)return{cls:'rain',label:'🌧️ עדיף חלופה',detail:`סיכוי גשם ${Math.round(pp)}%`};
 return{cls:'good',label:'☀️ מתאים',detail:`${Math.round(min)}°–${Math.round(max)}° · גשם ${Math.round(pp)}%`};
}
async function weather(lat,lon,date){const key=`${Number(lat).toFixed(3)},${Number(lon).toFixed(3)}|${date}`,all=cacheLoad(),old=all[key];if(old&&Date.now()-Number(old.savedAt||0)<3*3600000)return old.data;
 const today=new Date(),target=new Date(date+'T12:00:00'),days=Math.floor((target-new Date(today.getFullYear(),today.getMonth(),today.getDate()))/86400000);
 if(days>16||days<-1)return null;
 try{
  const u=`https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=Europe%2FBucharest&start_date=${date}&end_date=${date}`;
  const r=await fetch(u,{cache:'no-store'});if(!r.ok)throw new Error('weather');const j=await r.json();
  if(!j.daily?.time?.length)return null;const data={code:j.daily.weather_code?.[0],max:j.daily.temperature_2m_max?.[0],min:j.daily.temperature_2m_min?.[0],pp:j.daily.precipitation_probability_max?.[0]??0,wind:j.daily.wind_speed_10m_max?.[0]??0};all[key]={savedAt:Date.now(),data};cacheSave(all);return data;
 }catch(e){return old?.data||null}
}
function parseKey(k){const p=String(k||'').split('|');return{name:p[0]||'',lat:Number(p[1]),lon:Number(p[2])}}
async function decorate(){const box=document.getElementById('attractionPicker');if(!box)return;const active=[...document.querySelectorAll('.tab')].findIndex(x=>x.classList.contains('on')),day=active>=0?active:0,date=tripDate(day);
 for(const cb of box.querySelectorAll('[data-attraction]')){
   const label=cb.closest('.attraction-option');if(!label)continue;let badge=label.querySelector('.weather-fit');if(!badge){badge=document.createElement('span');badge.className='weather-fit loading';badge.textContent='🌦️ בודק מזג אוויר…';label.querySelector('span')?.appendChild(badge)}
   const p=parseKey(cb.dataset.attraction),desc=label.querySelector('small')?.textContent||'';if(!Number.isFinite(p.lat)||!Number.isFinite(p.lon)){badge.className='weather-fit wait';badge.textContent='⏳ אין נתוני מיקום';continue}
   const w=await weather(p.lat,p.lon,date);if(!badge.isConnected)continue;
   if(!w){badge.className='weather-fit wait';badge.innerHTML='⏳ תחזית טרם זמינה<span class="weather-detail">תתעדכן אוטומטית כשהתאריך יתקרב</span>';continue}
   const s=classify(p.name,desc,w);badge.className='weather-fit '+s.cls;badge.innerHTML=`${s.label}<span class="weather-detail">${s.detail}</span>`;
 }
}
let timer;function schedule(){clearTimeout(timer);timer=setTimeout(decorate,120)}
function init(){schedule();const obs=new MutationObserver(m=>{if(m.some(x=>[...x.addedNodes].some(n=>n.nodeType===1&&(n.id==='attractionPicker'||n.querySelector?.('#attractionPicker')))))schedule();else if(document.getElementById('attractionPicker'))schedule()});obs.observe(document.body,{childList:true,subtree:true});document.addEventListener('click',e=>{if(e.target.closest('.tab,[data-page="trip"],[data-picker-all],[data-picker-none]'))schedule()},true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,1000));else setTimeout(init,1000);
window.RomaniaWeatherFit={refresh:decorate};
})();