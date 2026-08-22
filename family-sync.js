(()=>{
'use strict';
const ENDPOINT_KEY='romania-sync-endpoint';
const DEVICE_KEY='romania-sync-device';
const MEMBER_KEY='romania-sync-member';
const MIGRATED_KEY='romania-sync-migrated-v1';
const LAST_SYNC_KEY='romania-last-sync';
const device=(()=>{let d=localStorage.getItem(DEVICE_KEY);if(!d){d='dev-'+crypto.randomUUID();localStorage.setItem(DEVICE_KEY,d)}return d})();
function endpoint(){return (localStorage.getItem(ENDPOINT_KEY)||'').trim()}
function member(){return (localStorage.getItem(MEMBER_KEY)||'').trim()||'Family'}
function setStatus(text,cls=''){const el=document.getElementById('familySyncStatus');if(el){el.textContent=text;el.dataset.state=cls}}
function safeJson(key,def){try{return JSON.parse(localStorage.getItem(key)||'null')??def}catch(e){return def}}
function localPayload(){
 const expenses=safeJson('romania-manual-expenses-v2',safeJson('romania-manual-expenses',[]));
 const todo=safeJson('romania-todo-v1',[]);
 const car=safeJson('romania-rental-car-details',{});
 const itinerary=safeJson('romania-itinerary-v2',[]);
 const fuel={type:localStorage.getItem('fuelType')||'',consumption:localStorage.getItem('fuelConsumption')||'',price:localStorage.getItem('fuelPrice')||''};
 const carRows=Object.entries(car||{}).map(([key,value])=>({key,value,updatedBy:member(),updatedAt:new Date().toISOString()}));
 Object.entries(fuel).forEach(([key,value])=>{if(value)carRows.push({key:'fuel_'+key,value,updatedBy:member(),updatedAt:new Date().toISOString()})});
 const expRows=(Array.isArray(expenses)?expenses:[]).map(x=>({id:String(x.id||crypto.randomUUID()),createdAt:x.createdAt||new Date().toISOString(),amount:Number(x.amount)||0,currency:x.currency||'ILS',description:x.description||'',category:x.category||'',paidBy:x.paidBy||member(),status:x.status||'committed',updatedBy:member(),updatedAt:new Date().toISOString()}));
 const todoRows=(Array.isArray(todo)?todo:[]).map(x=>({id:String(x.id||crypto.randomUUID()),date:x.date||'',time:x.time||'',text:x.text||'',category:x.cat||x.category||'',done:!!x.done,reminderMinutes:x.reminderMinutes||'',custom:!!x.custom,updatedBy:member(),updatedAt:new Date().toISOString()}));
 const itineraryRows=[];
 if(Array.isArray(itinerary)) itinerary.forEach((day,di)=>(day?.s||[]).forEach((s,si)=>itineraryRows.push({id:`${di}-${si}-${String(s[0]).slice(0,40)}`,date:`2026-09-${String(23+di).padStart(2,'0')}`,time:s[3]||'',name:s[0]||'',description:s[4]||'',lat:s[1]||'',lng:s[2]||'',status:'planned',selected:true,updatedBy:member(),updatedAt:new Date().toISOString()})));
 return {Expenses:expRows,Todo:todoRows,Car:carRows,Itinerary:itineraryRows,Votes:[],Family:[],Settings:[]};
}
async function api(body){const url=endpoint();if(!url)throw new Error('NO_ENDPOINT');const r=await fetch(url,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body),cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);return await r.json()}
async function getSnapshot(){const url=endpoint();if(!url)throw new Error('NO_ENDPOINT');const r=await fetch(url+'?action=snapshot&t='+Date.now(),{cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);return await r.json()}
function applySnapshot(data){if(!data)return;
 if(Array.isArray(data.Expenses)){localStorage.setItem('romania-manual-expenses-v2',JSON.stringify(data.Expenses.map(x=>({id:String(x.id),createdAt:x.createdAt,amount:Number(x.amount),currency:x.currency,description:x.description,category:x.category,paidBy:x.paidBy,status:x.status}))))}
 if(Array.isArray(data.Todo)){localStorage.setItem('romania-todo-v1',JSON.stringify(data.Todo.map(x=>({id:String(x.id),date:String(x.date).slice(0,10),time:String(x.time||''),text:x.text,cat:x.category,done:String(x.done)==='true'||x.done===true,reminderMinutes:x.reminderMinutes,custom:String(x.custom)==='true'||x.custom===true}))))}
 if(Array.isArray(data.Car)){const obj={};data.Car.forEach(x=>obj[x.key]=x.value);const car={model:obj.model||'Volkswagen Tiguan Automatic או דומה',engine:obj.engine||'לא ידוע עדיין',fuel:obj.fuel||'petrol'};localStorage.setItem('romania-rental-car-details',JSON.stringify(car));if(obj.fuel_type)localStorage.setItem('fuelType',obj.fuel_type);if(obj.fuel_consumption)localStorage.setItem('fuelConsumption',obj.fuel_consumption);if(obj.fuel_price)localStorage.setItem('fuelPrice',obj.fuel_price)}
 try{window.RomaniaSummary?.render?.();window.RomaniaTodo?.render?.();window.renderHome?.()}catch(e){}
}
async function migrateAndSync(){if(!endpoint()){setStatus('☁️ סנכרון ממתין לחיבור','pending');return}
 setStatus('🔄 מסנכרן…','syncing');
 try{
   const first=localStorage.getItem(MIGRATED_KEY)!=='1';
   if(first){const res=await api({action:'sync',device,member:member(),data:localPayload()});if(!res.ok)throw new Error(res.error||'sync failed');localStorage.setItem(MIGRATED_KEY,'1');applySnapshot(res.data)}
   else {const snap=await getSnapshot();if(!snap.ok)throw new Error(snap.error||'snapshot failed');applySnapshot(snap.data)}
   localStorage.setItem(LAST_SYNC_KEY,new Date().toISOString());setStatus('🟢 מסונכרן','ok');
 }catch(e){setStatus('🟡 אופליין · הנתונים נשמרים במכשיר','offline');}
}
async function pushNow(){if(!endpoint())return migrateAndSync();setStatus('🔄 שולח עדכונים…','syncing');try{const res=await api({action:'sync',device,member:member(),data:localPayload()});if(!res.ok)throw new Error(res.error||'sync failed');localStorage.setItem(MIGRATED_KEY,'1');applySnapshot(res.data);localStorage.setItem(LAST_SYNC_KEY,new Date().toISOString());setStatus('🟢 מסונכרן','ok')}catch(e){setStatus('🟡 אופליין · יסונכרן מאוחר יותר','offline')}}
function build(){if(document.getElementById('familySyncBar'))return;const h=document.querySelector('header');if(!h)return;const bar=document.createElement('div');bar.id='familySyncBar';bar.style='display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-top:8px;font-size:.88rem';bar.innerHTML=`<span id="familySyncStatus">☁️ סנכרון ממתין לחיבור</span><button id="syncNowBtn" type="button" style="border:1px solid #ffffff88;background:#ffffff18;color:white;border-radius:8px;padding:5px 8px">סנכרן עכשיו</button><button id="syncSetupBtn" type="button" style="border:1px solid #ffffff88;background:#ffffff18;color:white;border-radius:8px;padding:5px 8px">הגדרת סנכרון</button>`;h.appendChild(bar);document.getElementById('syncNowBtn').onclick=pushNow;document.getElementById('syncSetupBtn').onclick=()=>{const u=prompt('הדבק כאן את כתובת Google Apps Script Web App:',endpoint());if(u!==null){localStorage.setItem(ENDPOINT_KEY,u.trim());const n=prompt('שם בן המשפחה במכשיר הזה:',member());if(n)localStorage.setItem(MEMBER_KEY,n.trim());localStorage.removeItem(MIGRATED_KEY);migrateAndSync()}}}
function watch(){window.addEventListener('online',migrateAndSync);window.addEventListener('storage',e=>{if(e.key&&e.key.startsWith('romania-'))setTimeout(pushNow,400)});setInterval(()=>{if(document.visibilityState==='visible'&&endpoint())migrateAndSync()},60000)}
function init(){build();migrateAndSync();watch()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
window.RomaniaFamilySync={sync:pushNow,setEndpoint:u=>{localStorage.setItem(ENDPOINT_KEY,u);localStorage.removeItem(MIGRATED_KEY);return migrateAndSync()},endpoint};
})();