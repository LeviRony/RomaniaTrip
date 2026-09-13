(()=>{
const TRIP_START_DAY=19;
const TRIP_END_DAY=30;
function bucharestDate(){
  const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Bucharest',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
  const get=t=>Number(parts.find(p=>p.type===t)?.value||0);
  return {y:get('year'),m:get('month'),d:get('day')};
}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function currentIndex(){
  const x=bucharestDate();
  return x.y===2026&&x.m===9&&x.d>=TRIP_START_DAY&&x.d<=TRIP_END_DAY?x.d-TRIP_START_DAY:-1;
}
function renderToday(){
  const page=document.getElementById('page-home');
  const box=document.getElementById('homeToday');
  if(!page||!box)return;
  const card=box.closest('.card');
  const h=card?.querySelector('h2');
  if(h)h.textContent='📍 מה בתוכנית היום:';

  const idx=currentIndex();
  if(idx<0){
    const x=bucharestDate();
    const before=x.y<2026||(x.y===2026&&(x.m<9||(x.m===9&&x.d<19)));
    box.innerHTML=`<div class="home-item"><b>${before?'הטיול עדיין לא התחיל':'הטיול הסתיים'}</b><span class="muted">${before?'התוכנית היומית תופיע כאן אוטומטית החל מ־19.9.2026.':'אין תוכנית להיום.'}</span></div>`;
    const btn=document.getElementById('openTodayRoute');
    if(btn)btn.style.display='none';
    return;
  }

  const days=(typeof D!=='undefined'&&Array.isArray(D))?D:null;
  const day=days?.[idx];
  const btn=document.getElementById('openTodayRoute');
  if(btn)btn.style.display='';
  if(!day){box.innerHTML='<div class="home-item"><b>אין תוכנית שמורה להיום</b></div>';return;}

  const title=`${idx+19}.9 · ${day.n||''}`;
  const stops=Array.isArray(day.s)?day.s:[];
  box.innerHTML=`<div class="home-item"><b>${esc(title)}</b>${day.note?`<span class="muted">${esc(day.note)}</span>`:''}</div>`+
    stops.map(s=>`<div class="home-item"><b>${esc(s?.[3]||'')} ${esc(s?.[0]||'')}</b><span>${esc(s?.[4]||'')}</span></div>`).join('');
}
function schedule(){setTimeout(renderToday,0);setTimeout(renderToday,250);setTimeout(renderToday,1200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule);else schedule();
document.addEventListener('click',e=>{if(e.target.closest('.nav button[data-page="home"]'))schedule()},true);
window.addEventListener('storage',e=>{if(e.key==='romania-itinerary-v3')schedule()});
})();