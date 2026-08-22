(()=>{
'use strict';
const API_KEY='romania-family-api-url';
const MIGRATION_KEY='romania-family-migrated-v1';
const DEFAULT_API='https://script.google.com/macros/s/AKfycbzK3SEwT-l4TfJHmEZTgv4tzL4Ctw5AZBsskHhiKMWCtrM_Yn_gbcL7wOImsNsh8TlE/exec';
const KEYS={expenses:['romania-manual-expenses-v2','romania-manual-expenses'],todo:['romania-todo-v1'],car:['romania-rental-car-details'],itinerary:['romania-itinerary-v2'],fuel:['fuel-price','fuel-consumption','fuel-type']};
function jget(k,fallback=null){try{const v=localStorage.getItem(k);return v==null?fallback:JSON.parse(v)}catch(e){return fallback}}
function raw(k){return localStorage.getItem(k)}
function getApi(){return raw(API_KEY)||DEFAULT_API}
function collect(){const expenses=jget(KEYS.expenses.find(k=>raw(k)),[])||[];const todo=jget('romania-todo-v1',[])||[];const car=jget('romania-rental-car-details',{})||{};const itinerary=jget('romania-itinerary-v2',null);const fuel={price:raw('fuel-price'),consumption:raw('fuel-consumption'),type:raw('fuel-type')};return {expenses,todo,car,itinerary,fuel,source:'localStorage',deviceId:getDeviceId(),collectedAt:new Date().toISOString()};}
function getDeviceId(){let id=raw('romania-device-id');if(!id){id='dev-'+Date.now()+'-'+Math.random().toString(36).slice(2,9);localStorage.setItem('romania-device-id',id)}return id}
function status(text){const s=document.getElementById('familySyncStatus');if(s)s.textContent=text}
async function call(body){const r=await fetch(getApi(),{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body)});const t=await r.text();let j={};try{j=JSON.parse(t)}catch(e){throw new Error('API returned invalid response')}if(!r.ok||j.ok===false)throw new Error(j.error||'sync failed');return j}
async function migrate(force=false){const payload=collect();const hasData=(payload.expenses?.length||payload.todo?.length||Object.keys(payload.car||{}).length||payload.itinerary);if(!hasData){localStorage.setItem(MIGRATION_KEY,'empty');return {ok:true,empty:true}}if(!force&&raw(MIGRATION_KEY))return {ok:true,already:true};try{status('🔄 מסנכרן…');const j=await call({action:'migrateLocal',payload});localStorage.setItem(MIGRATION_KEY,new Date().toISOString());localStorage.setItem('romania-family-last-sync',new Date().toISOString());localStorage.removeItem('romania-family-sync-error');status('🟢 מסונכרן');return {ok:true,result:j};}catch(e){localStorage.setItem('romania-family-sync-error',String(e.message||e));status('🟠 אופליין · הנתונים נשמרו במכשיר');return {ok:false,error:e};}}
function addStatus(){if(document.getElementById('familySyncStatus'))return;const header=document.querySelector('.head');if(!header)return;const s=document.createElement('button');s.id='familySyncStatus';s.type='button';s.title='לחץ לסנכרון עכשיו';s.style='font-size:.8rem;background:#ffffff22;color:inherit;border:1px solid #ffffff44;padding:5px 8px;border-radius:999px;white-space:nowrap;cursor:pointer';s.textContent='🔄 מתחבר…';s.onclick=()=>migrate(true);header.appendChild(s);}
async function init(){localStorage.setItem(API_KEY,DEFAULT_API);addStatus();await migrate(false);if(raw(MIGRATION_KEY))status('🟢 מסונכרן');}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
window.RomaniaFamilySync={collect,migrate,syncNow:()=>migrate(true),setApiUrl:(url)=>{localStorage.setItem(API_KEY,url||DEFAULT_API);localStorage.removeItem(MIGRATION_KEY);return migrate(true);},apiUrl:DEFAULT_API};
})();