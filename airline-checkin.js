(()=>{
'use strict';
const KEY='romania-airline-checkin-v1';
const ELAL='https://www.elal.com/CheckIn/home/New_Identification/C';
const TAROM='https://www.tarom.ro/en?tab=1';
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){return{}}}
function save(v){localStorage.setItem(KEY,JSON.stringify(v))}
function addNav(){const nav=document.querySelector('.nav');if(!nav||nav.querySelector('[data-page="checkin"]'))return;const b=document.createElement('button');b.dataset.page='checkin';b.textContent='✈️ צ׳ק-אין';nav.appendChild(b)}
function build(){if(document.getElementById('page-checkin'))return;const main=document.querySelector('main.wrap');if(!main)return;const d=load();const s=document.createElement('section');s.id='page-checkin';s.className='page';s.innerHTML=`
<h1>✈️ צ׳ק-אין לטיסות</h1>
<div class="card"><div class="warn"><b>פרטי ההזמנה נשמרים רק במכשיר הזה.</b><br>הם לא נשמרים ב-GitHub ולא נשלחים לשרת האתר.</div>
<div class="controls" style="grid-template-columns:1fr 1fr 1fr">
<label class="field"><span>שם משפחה באנגלית</span><input id="ciSurname" autocomplete="off" value="${esc(d.surname||'Levi')}"></label>
<label class="field"><span>קוד הזמנה / Booking code</span><input id="ciPnr" autocomplete="off" autocapitalize="characters" value="${esc(d.pnr||'')}" placeholder="6 תווים"></label>
<label class="field"><span>מספר כרטיס / Ticket number</span><input id="ciTicket" inputmode="numeric" autocomplete="off" value="${esc(d.ticket||'')}" placeholder="13 ספרות"></label>
</div>
<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="ciSave" type="button">💾 שמור במכשיר</button><button class="danger-btn" id="ciClear" type="button">נקה פרטים</button></div></div>

<div class="grid" style="margin-top:14px;grid-template-columns:1fr 1fr">
<div class="card"><h2>הלוך · LY9491</h2><p><b>19.9.2026 · 00:20</b><br>TLV → OTP · נחיתה 03:05</p><p>משווקת ע״י EL AL · מופעלת ע״י TAROM</p><div class="ok">TAROM מציינת שצ׳ק-אין אונליין זמין החל מ־36 שעות לפני הטיסה.</div><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn" target="_blank" rel="noopener" href="${TAROM}">פתח TAROM Check-in</a><a class="btn" target="_blank" rel="noopener" href="${ELAL}">פתח EL AL Check-in</a></div></div>
<div class="card"><h2>חזור · LY574</h2><p><b>30.9.2026 · 10:25</b><br>OTP → TLV · נחיתה 12:55</p><p>השתמש באותו קוד הזמנה אם הוא מופיע גם בכרטיס החזור.</p><a class="btn" target="_blank" rel="noopener" href="${ELAL}">פתח EL AL Check-in</a></div>
</div>
<div class="card" style="margin-top:14px"><h2>הפרטים שלי</h2><div id="ciSummary" class="facts"></div></div>`;
main.appendChild(s);
const surname=s.querySelector('#ciSurname'),pnr=s.querySelector('#ciPnr'),ticket=s.querySelector('#ciTicket'),summary=s.querySelector('#ciSummary');
function render(){const v=load();summary.innerHTML=`<div><b>שם משפחה</b><br>${esc(v.surname||'—')}</div><div><b>Booking code</b><br><span class="ltr">${esc(v.pnr||'—')}</span></div><div><b>Ticket number</b><br><span class="ltr">${esc(v.ticket||'—')}</span></div><div><b>נוסעת</b><br>Levi Rinat Mrs</div>`}
s.querySelector('#ciSave').onclick=()=>{const v={surname:surname.value.trim(),pnr:pnr.value.trim().toUpperCase(),ticket:ticket.value.trim()};save(v);pnr.value=v.pnr;render();alert('הפרטים נשמרו במכשיר הזה בלבד')};
s.querySelector('#ciClear').onclick=()=>{localStorage.removeItem(KEY);surname.value='Levi';pnr.value='';ticket.value='';render()};render();}
function init(){addNav();build()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();