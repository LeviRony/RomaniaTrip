(()=>{
'use strict';
function injectResponsiveFixes(){
  if(document.getElementById('romania-responsive-fixes'))return;
  const style=document.createElement('style');
  style.id='romania-responsive-fixes';
  style.textContent=`
header{max-width:100%;}#familySyncBar{max-width:1180px;margin:0 auto!important;padding:0 14px 10px;justify-content:flex-start}#page-todo>.card{padding:14px 16px}#todoList{display:grid;gap:12px}#page-todo .edit-day{border:1px solid var(--line);border-radius:14px;background:#fff;overflow:hidden}#page-todo .edit-day>h3{margin:0;padding:12px 16px;background:var(--soft);font-size:1rem;border-bottom:1px solid var(--line)}#page-todo .attraction-row{display:grid!important;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center!important;padding:12px 16px!important;min-height:0!important;margin:0!important;border-bottom:1px solid #e7eef1;background:#fff}#page-todo .attraction-row:last-child{border-bottom:0}#page-todo .attraction-row>div:first-child{min-width:0;width:100%}#page-todo .attraction-row label{align-items:flex-start!important;gap:10px!important}#page-todo .attraction-row label>span{min-width:0;overflow-wrap:anywhere;line-height:1.4}#page-todo .attraction-row input[type=checkbox]{flex:0 0 20px}#page-todo .attraction-row .muted{margin-top:2px}#page-todo .attraction-row select{min-height:38px;padding:7px 9px!important;border:1px solid var(--line);background:#fff;color:var(--text)}#page-todo .attraction-row .btn{min-height:38px;margin-top:0!important;padding:8px 11px;white-space:nowrap}#page-todo .danger-btn{align-self:center;white-space:nowrap}#page-todo .expense-form{grid-template-columns:160px 130px minmax(240px,1fr) auto}.bike-options{margin-top:10px;display:grid;gap:8px}.bike-option{background:#f5fafb;border:1px solid var(--line,#d8e3e7);border-radius:11px;padding:10px}.bike-option a{display:inline-block;margin-top:6px;text-decoration:none;font-weight:800;color:var(--p,#0d6f88)}
@media (min-width:851px) and (max-width:1180px){.head{max-width:none;padding:10px 16px;display:grid;grid-template-columns:auto 1fr;align-items:center}.brand{font-size:.92rem}.nav{justify-content:flex-start;gap:6px}.nav button{padding:8px 11px;font-size:14px;min-width:0}#familySyncBar{padding:0 16px 8px!important;font-size:.8rem!important}#familySyncBar button{padding:4px 7px!important;font-size:.78rem}.wrap{padding-top:14px}#page-todo h1{margin-top:4px;margin-bottom:10px}#page-todo .expense-form{grid-template-columns:150px 120px minmax(220px,1fr) auto}}
@media (max-width:850px){header{position:sticky;top:0}.head{padding:8px 10px;gap:8px}.brand{font-size:.92rem;width:100%}.nav{display:flex;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:2px;scrollbar-width:none}.nav::-webkit-scrollbar{display:none}.nav button{flex:0 0 auto!important;min-width:auto!important;padding:8px 11px;font-size:13px;white-space:nowrap}#familySyncBar{padding:0 10px 8px!important;gap:5px!important;white-space:nowrap;overflow-x:auto;flex-wrap:nowrap!important;scrollbar-width:none}#page-todo>.card{padding:10px}#todoList{gap:10px}#page-todo .edit-day>h3{padding:10px 12px}#page-todo .attraction-row{grid-template-columns:1fr!important;padding:11px 12px!important;gap:8px}#page-todo .danger-btn{width:100%}#page-todo .expense-form{grid-template-columns:1fr!important}}
@media (max-width:430px){.wrap{padding:10px 8px 50px}#page-todo h1{font-size:1.45rem}#page-todo .attraction-row .btn{width:100%!important}}
`;
  document.head.appendChild(style);
}
function addBikeLinks(){
  if(document.getElementById('predealBikeOptions'))return;
  const dayCards=[...document.querySelectorAll('.edit-day')];
  const target=dayCards.find(x=>/ראשון|שני/.test(x.textContent||''));
  if(!target)return;
  const box=document.createElement('div');box.id='predealBikeOptions';box.className='bike-options';
  box.innerHTML=`<div class="bike-option"><b>🚲 אפשרות רגועה 1 · סיבוב קצר באזור Predeal</b><br><span class="muted">רכיבה משפחתית רגועה, לחזור באותה דרך אם נהיה קשה.</span><br><a target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&origin=Hotel+Orizont+Predeal&destination=Clabucet+Sosire+Predeal&travelmode=bicycling">🗺️ פתח מסלול אופניים ב-Google Maps</a></div><div class="bike-option"><b>🚲 אפשרות רגועה 2 · Hotel Orizont → מרכז Predeal → חזרה</b><br><span class="muted">מסלול קצר וגמיש; אפשר לעצור ולחזור בכל שלב.</span><br><a target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&origin=Hotel+Orizont+Predeal&destination=Predeal+Train+Station&travelmode=bicycling">🗺️ פתח מסלול אופניים ב-Google Maps</a></div><div class="muted">ℹ️ אם Google Maps לא מציג מצב אופניים באזור, פתח את אותו קישור ובחר מסלול הליכה/בדוק את הדרך מול מקום ההשכרה לפני הרכיבה.</div>`;
  target.appendChild(box);
}
function apply(){
  injectResponsiveFixes();
  if(typeof D==='undefined'||!Array.isArray(D)||D.length<4)return;
  D[1]={n:'ראשון · Predeal → Sinaia',note:'מזחלות ההרים ב-Predeal בוצעו. ממשיכים לארמון פלש ולאחר מכן זמן חופשי להסתובב בסינאיה.',s:[['Hotel Orizont Predeal',45.503,25.578,'09:00','ארוחת בוקר ויציאה'],['Mountain Coaster Predeal',45.500,25.570,'בוצע ✅','מזחלות הרים · בוצע · עלינו לגובה 1,451 מטר'],['Hotel Orizont Predeal',45.503,25.578,'אחרי המזחלות','חזרה למלון · בוצע ✅'],['Peleș Castle',45.3599,25.5426,'אחר כך','יציאה מהמלון לארמון פלש'],['Sinaia',45.351,25.551,'אחר כך','הסתובבות חופשית בסינאיה · מרכז / פארק / קפה'],['Hotel Orizont Predeal',45.503,25.578,'ערב','חזרה למלון'],['צעדים ביום',0,0,'13,105 צעדים','10.09 ק״מ · 479 קלוריות · 8 קומות · Samsung Health']]};
  D[2]={n:'שני · Brașov ו-Poiana Brașov',note:'המסלול שבוצע בפועל ב-21.9.',s:[['Hotel Orizont Predeal',45.503,25.578,'יציאה','יציאה מהמלון'],['AFI Brașov',45.642,25.600,'אחר כך','קניון AFI Brașov · בוצע ✅'],['Fun Park Poiana Brașov',45.590,25.554,'אחר כך','Fun Park Poiana Brașov · בוצע ✅'],['Starbucks Piața Sfatului, Brașov',45.642,25.589,'אחר כך','Starbucks במרכז Brașov · בוצע ✅'],['Hotel Orizont Predeal',45.503,25.578,'ערב','חזרה למלון · בוצע ✅'],['צעדים ביום',0,0,'8,671 צעדים','6.68 ק״מ · 314 קלוריות · 6 קומות · Samsung Health']]};
  D[3]={n:'שלישי · Predeal → Bran Plaza',note:'המסלול שבוצע בפועל ב-22.9. Bran Plaza היה היעד היחיד היום.',s:[['Hotel Orizont Predeal',45.503,25.578,'יציאה','יציאה מהמלון'],['BRAN PLAZA',45.55,25.32,'אחר כך','Bran Plaza · בוצע ✅'],['Hotel Orizont Predeal',45.503,25.578,'חזרה','חזרה למלון · בוצע ✅'],['צעדים ביום',0,0,'5,810 צעדים','4.68 ק״מ · 236 קלוריות · Samsung Health']]};
  try{localStorage.removeItem('romania-itinerary-v3')}catch(e){}
  try{window.renderHome?.()}catch(e){}
  setTimeout(addBikeLinks,250);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,350));else setTimeout(apply,350);
window.addEventListener('load',()=>setTimeout(apply,600));
})();