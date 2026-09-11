(()=>{
'use strict';
const TODO_KEY='romania-todo-v1';
const DELETED_KEY='romania-todo-deleted-v1';
const YEAR=2026;
const TZ='Europe/Bucharest';
function safeJson(key,def){try{return JSON.parse(localStorage.getItem(key)||'null')??def}catch(e){return def}}
function normalizeDate(v){
  const s=String(v??'').trim().replace(/^d:/,'').replace(/^'/,'');
  if(!s)return '';
  let y,m,d;
  let x=s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if(x){y=+x[1];m=+x[2];d=+x[3]}
  else if(/^\d{4}-\d{2}-\d{2}T/.test(s)){
    const dt=new Date(s);
    if(!Number.isNaN(dt.getTime())){
      try{
        const parts=new Intl.DateTimeFormat('en-CA',{timeZone:TZ,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(dt);
        const p=Object.fromEntries(parts.map(a=>[a.type,a.value]));
        y=+p.year;m=+p.month;d=+p.day;
      }catch(e){}
    }
  } else {
    x=s.match(/(\d{4})[-\/.](\d{1,2})[-\/.](\d{1,2})/);
    if(x){y=+x[1];m=+x[2];d=+x[3]}
  }
  if(!m||!d||m<1||m>12||d<1||d>31)return s.slice(0,10);
  // This site is the 2026 Romania trip. Keep the chosen month/day, but never let
  // timezone or Sheets conversions silently switch the calendar year.
  y=YEAR;
  return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}
function repairStoredDates(){
  const rows=safeJson(TODO_KEY,[]);
  if(!Array.isArray(rows))return;
  let changed=false;
  const fixed=rows.map(x=>{const date=normalizeDate(x?.date);if(date&&date!==x.date){changed=true;return {...x,date}}return x});
  if(changed)localStorage.setItem(TODO_KEY,JSON.stringify(fixed));
}
function formatLabel(date){
  const m=String(date).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if(!m)return date;
  const dt=new Date(Date.UTC(+m[1],+m[2]-1,+m[3],12,0,0));
  return new Intl.DateTimeFormat('he-IL',{timeZone:'UTC',weekday:'long',day:'numeric',month:'numeric',year:'numeric'}).format(dt);
}
function visibleDates(){
  const deleted=new Set((safeJson(DELETED_KEY,[])||[]).map(String));
  const rows=(safeJson(TODO_KEY,[])||[]).filter(x=>x&&x.id&&!deleted.has(String(x.id))&&x.date);
  return [...new Set(rows.map(x=>normalizeDate(x.date)).filter(Boolean))].sort();
}
function fixTodoDom(){
  const input=document.getElementById('todoDate');
  if(input){
    input.min='2026-01-01';input.max='2026-12-31';
    const current=normalizeDate(input.value);
    if(current)input.value=current;
    else input.value='2026-09-11';
  }
  const dates=visibleDates();
  document.querySelectorAll('#todoList .edit-day h3').forEach((h,i)=>{if(dates[i])h.textContent=formatLabel(dates[i])});
}
function wrapRender(){
  if(!window.RomaniaTodo||window.RomaniaTodo.__date2026Patched)return false;
  const old=window.RomaniaTodo.render?.bind(window.RomaniaTodo);
  if(old)window.RomaniaTodo.render=()=>{repairStoredDates();const r=old();setTimeout(fixTodoDom,0);return r};
  window.RomaniaTodo.__date2026Patched=true;
  repairStoredDates();
  try{window.RomaniaTodo.render?.()}catch(e){setTimeout(fixTodoDom,0)}
  return true;
}
function installValidation(){
  document.addEventListener('click',e=>{
    const b=e.target.closest('#todoAdd');if(!b)return;
    const input=document.getElementById('todoDate');if(!input)return;
    const d=normalizeDate(input.value);
    if(!/^2026-\d{2}-\d{2}$/.test(d)){
      e.preventDefault();e.stopImmediatePropagation();
      alert('יש לבחור תאריך בשנת 2026');return;
    }
    input.value=d;
  },true);
}
function init(){repairStoredDates();installValidation();if(!wrapRender()){let n=0;const t=setInterval(()=>{n++;if(wrapRender()||n>40)clearInterval(t)},100)}setTimeout(fixTodoDom,300)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();