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
<div class="card"><h2>הלוך · LY9491</h2><p><b>19.9.2026 · 00:20</b><br>TLV → OTP · נחיתה 03:05</p><p>כרטיסי <b>EL AL Classic</b> · משווקת ע״י EL AL · מופעלת ע״י TAROM</p>
<div class="card" style="margin:10px 0;padding:12px"><h3 style="margin-top:0">🧳 כבודה · Classic</h3><div class="facts"><div><b>כבודת יד / טרולי</b><br><b>1 יחידה עד 8 ק״ג</b> לכל כרטיס</div><div><b>מזוודה לבטן</b><br><b>1 × עד 23 ק״ג</b> לכל כרטיס</div></div><div class="muted" style="margin-top:8px">בכרטיס ההלוך שכבר בדקנו מופיע גם הסימון 1PC. מאחר שהטיסה מופעלת ע״י TAROM, במקרה של הבדל בין כללי החברות יש לפעול לפי הכרטיס/החברה המפעילה.</div></div>
<div class="card" style="margin:10px 0;padding:12px"><h3 style="margin-top:0">🛫 סטטוס טיסה ומושבים</h3><div class="facts"><div><b>טרמינל</b><br>3</div><div><b>מגזר / דלפקים</b><br><span class="ltr">B · 46–48</span></div><div><b>טיסה</b><br><span class="ltr">LY9491 / RO156</span></div><div><b>המראה</b><br>00:20</div></div><div style="margin:12px auto;max-width:430px;border:2px solid var(--line);border-radius:50% 50% 24px 24px;padding:14px;background:var(--soft);text-align:center" dir="ltr"><div style="font-size:26px">✈</div><b>22E · 22F · 23E · 23F</b><div style="display:grid;grid-template-columns:34px repeat(3,1fr) 20px repeat(3,1fr);gap:5px;margin-top:10px;align-items:center"><b>22</b><span>A</span><span>B</span><span>C</span><i></i><span>D</span><span style="background:#2f9e44;color:#fff;border-radius:6px;padding:7px">E</span><span style="background:#2f9e44;color:#fff;border-radius:6px;padding:7px">F</span><b>23</b><span>A</span><span>B</span><span>C</span><i></i><span>D</span><span style="background:#2f9e44;color:#fff;border-radius:6px;padding:7px">E</span><span style="background:#2f9e44;color:#fff;border-radius:6px;padding:7px">F</span></div></div><a class="btn" target="_blank" rel="noopener" href="https://www.iaa.gov.il/airports/ben-gurion/flight-board/?FlightNumber=LY9491&flightType=flightnumber&searchFlight=">🔄 לוח הטיסה הרשמי · LY9491</a></div><div class="ok">TAROM מציינת שצ׳ק-אין אונליין זמין החל מ־36 שעות לפני הטיסה.</div><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn" target="_blank" rel="noopener" href="${TAROM}">פתח TAROM Check-in</a><a class="btn" target="_blank" rel="noopener" href="${ELAL}">פתח EL AL Check-in</a></div></div>
<div class="card"><h2>חזור · LY574</h2><p><b>30.9.2026 · 10:25</b><br>OTP → TLV · נחיתה 12:55</p><p>כרטיסי <b>EL AL Lite</b></p>
<div class="card" style="margin:10px 0;padding:12px"><h3 style="margin-top:0">🧳 כבודה · Lite</h3><div class="facts"><div><b>כבודת יד / טרולי</b><br><b>1 יחידה עד 8 ק״ג</b> לכל כרטיס</div><div><b>מזוודה לבטן</b><br><b>לא כלולה</b> בכרטיס Lite</div><div><b>רינת</b><br>מזוודה לבטן <b>1 × 23 ק״ג</b> ✅ נרכשה בנפרד</div></div></div>
<p>השתמש באותו קוד הזמנה אם הוא מופיע גם בכרטיס החזור.</p><a class="btn" target="_blank" rel="noopener" href="${ELAL}">פתח EL AL Check-in</a></div>
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