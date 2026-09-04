(()=>{
const KEY='romania-rental-car-details';
const defaults={model:'Volkswagen Tiguan Automatic או דומה',engine:'לא ידוע עדיין',fuel:'petrol'};
const BOOKING={number:'OTP-2468182759765',pickup:'19.9.2026 · 04:00',dropoff:'30.9.2026 · 08:30',location:'OTP-AIR',flight:'LY9491',arrival:'OTP',cover:'Klass Total Cover'};
function load(){try{return {...defaults,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(e){return {...defaults}}}
function save(v){try{localStorage.setItem(KEY,JSON.stringify(v))}catch(e){}}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function fuelLabel(v){return ({petrol:'בנזין',diesel:'דיזל',hybrid:'היברידי',phev:'פלאג־אין היברידי'})[v]||v}
function syncFuel(v){const fuel=document.getElementById('fuelType');if(!fuel)return;fuel.value=v==='diesel'?'diesel':'petrol';fuel.dispatchEvent(new Event('change',{bubbles:true}));}
function updateBookingDisplay(){
 const page=document.getElementById('page-car');if(!page)return;
 const first=page.querySelector('.grid .card');
 if(first){
  const p=first.querySelector('p');
  if(p)p.innerHTML=`<b>Volkswagen Tiguan Automatic</b> או דומה<br>${BOOKING.pickup} → ${BOOKING.dropoff}<br>${BOOKING.cover}<br><span class="muted">הזמנה: <span class="ltr">${BOOKING.number}</span></span>`;
 }
 const grid=page.querySelector('.grid');
 if(grid&&!document.getElementById('bookingFlightCard')){
  const card=document.createElement('div');card.className='card';card.id='bookingFlightCard';
  card.innerHTML=`<b>✈️ פרטי טיסה עודכנו בחברת ההשכרה</b><div class="ok" style="margin-top:10px"><b>✅ מספר הטיסה עודכן בהצלחה</b><br>טיסה <span class="ltr"><b>${BOOKING.flight}</b></span> · נחיתה ב־${BOOKING.arrival}</div><p><b>איסוף:</b> ${BOOKING.pickup}<br><b>מיקום:</b> ${BOOKING.location}<br><b>החזרה:</b> ${BOOKING.dropoff}<br><b>מספר הזמנה חדש:</b> <span class="ltr">${BOOKING.number}</span></p>`;
  grid.appendChild(card);
 }
}
function updateDisplay(v){
 const page=document.getElementById('page-car');if(!page)return;
 const first=page.querySelector('.grid .card');
 if(first){const p=first.querySelector('p');if(p){const lines=p.innerHTML.split('<br>');lines[0]=`<b id="currentCarModel">${esc(v.model)}</b>`;p.innerHTML=lines.join('<br>');}}
 const status=document.getElementById('currentCarDetails');if(status)status.innerHTML=`<b>${esc(v.model)}</b><br><span class="muted">מנוע: ${esc(v.engine)} · ${fuelLabel(v.fuel)}</span>`;
 syncFuel(v.fuel);
}
function build(){
 const page=document.getElementById('page-car');if(!page)return;
 updateBookingDisplay();
 if(document.getElementById('carEditorCard')){updateDisplay(load());return}
 const firstGrid=page.querySelector('.grid');if(!firstGrid)return;
 const v=load();
 const card=document.createElement('div');card.id='carEditorCard';card.className='card';card.style.marginTop='14px';
 card.innerHTML=`<h2 style="margin-top:0">✏️ הרכב שקיבלתי בפועל</h2><div id="currentCarDetails" class="ok"></div><div class="controls"><label class="field"><span>יצרן / דגם</span><input id="actualCarModel" type="text" value="${esc(v.model)}" placeholder="למשל: Skoda Karoq"></label><label class="field"><span>מנוע / נפח</span><input id="actualCarEngine" type="text" value="${esc(v.engine)}" placeholder="למשל: 2.0 TDI 150hp"></label><label class="field"><span>סוג הנעה / דלק</span><select id="actualCarFuel"><option value="petrol">בנזין</option><option value="diesel">דיזל</option><option value="hybrid">היברידי</option><option value="phev">פלאג־אין היברידי</option></select></label></div><button class="btn" type="button" id="saveCarDetails">שמור פרטי רכב</button><span id="carSaveStatus" class="muted" style="margin-right:10px"></span><p class="muted">הפרטים נשמרים במכשיר. שינוי סוג הדלק יעדכן גם את חישוב עלות הדלק בעמוד הרכב.</p>`;
 firstGrid.insertAdjacentElement('afterend',card);
 document.getElementById('actualCarFuel').value=v.fuel;
 document.getElementById('saveCarDetails').addEventListener('click',()=>{
  const nv={model:document.getElementById('actualCarModel').value.trim()||defaults.model,engine:document.getElementById('actualCarEngine').value.trim()||'לא ידוע',fuel:document.getElementById('actualCarFuel').value};
  save(nv);updateDisplay(nv);const st=document.getElementById('carSaveStatus');st.textContent='✅ נשמר';setTimeout(()=>st.textContent='',1800);
 });
 updateDisplay(v);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
document.addEventListener('click',e=>{const b=e.target.closest('.nav button[data-page="car"]');if(b)setTimeout(()=>{build();updateBookingDisplay();updateDisplay(load())},0)},true);
})();