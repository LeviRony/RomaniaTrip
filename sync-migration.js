(()=>{
'use strict';
const API_KEY='romania-family-api-url';
const MIGRATION_KEY='romania-family-migrated-v1';
const KEYS={expenses:['romania-manual-expenses-v2','romania-manual-expenses'],todo:['romania-todo-v1'],car:['romania-rental-car-details'],itinerary:['romania-itinerary-v2'],fuel:['fuel-price','fuel-consumption','fuel-type']};
function jget(k,fallback=null){try{const v=localStorage.getItem(k);return v==null?fallback:JSON.parse(v)}catch(e){return fallback}}
function raw(k){return localStorage.getItem(k)}
function collect(){
 const expenses=jget(KEYS.expenses.find(k=>raw(k)),[])||[];
 const todo=jget('romania-todo-v1',[])||[];
 const car=jget('romania-rental-car-details',{})||{};
 const itinerary=jget('romania-itinerary-v2',null);
 const fuel={price:raw('fuel-price'),consumption:raw('fuel-consumption'),type:raw('fuel-type')};
 return {expenses,todo,car,itinerary,fuel,source:'localStorage',deviceId:getDeviceId(),collectedAt:new Date().toISOString()};
}
function getDeviceId(){let id=raw('romania-device-id');if(!id){id='dev-'+Date.now()+'-'+Math.random().toString(36).slice(2,9);localStorage.setItem('romania-device-id',id)}return id}
async function migrate(){const url=raw(API_KEY);if(!url)return {ok:false,reason:'no-api'};const payload=collect();const hasData=(payload.expenses?.length||payload.todo?.length||Object.keys(payload.car||{}).length||payload.itinerary);if(!hasData){localStorage.setItem(MIGRATION_KEY,'empty');return {ok:true,empty:true}};try{const r=await fetch(url,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'migrateLocal',payload})});const t=await r.text();let j={};try{j=JSON.parse(t)}catch(e){}if(!r.ok||j.ok===false)throw new Error(j.error||'migration failed');localStorage.setItem(MIGRATION_KEY,new Date().toISOString());localStorage.setItem('romania-family-last-sync',new Date().toISOString());return {ok:true,result:j};}catch(e){localStorage.setItem('romania-family-sync-error',String(e.message||e));return {ok:false,error:e};}}
function addStatus(){if(document.getElementById('familySyncStatus'))return;const header=document.querySelector('.head');if(!header)return;const s=document.createElement('span');s.id='familySyncStatus';s.style='font-size:.8rem;background:#ffffff22;border:1px solid #ffffff44;padding:5px 8px;border-radius:999px;white-space:nowrap';const url=raw(API_KEY),done=raw(MIGRATION_KEY);s.textContent=!url?'☁️ סנכרון ממתין לחיבור':done?'🟢 נתונים מקומיים הוכנו לסנכרון':'🟡 נמצאו נתונים מקומיים לשמירה';header.appendChild(s);}
async function init(){addStatus();if(raw(API_KEY)&&!raw(MIGRATION_KEY)){const r=await migrate();const s=document.getElementById('familySyncStatus');if(s)s.textContent=r.ok?'🟢 נתונים קיימים סונכרנו':'🟠 סנכרון יבוצע שוב כשיהיה חיבור';}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();window.RomaniaFamilySync={collect,migrate,setApiUrl:(url)=>{localStorage.setItem(API_KEY,url);localStorage.removeItem(MIGRATION_KEY);return migrate();}};
})();