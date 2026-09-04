(()=>{
'use strict';
function injectResponsiveFixes(){
  if(document.getElementById('romania-responsive-fixes'))return;
  const style=document.createElement('style');
  style.id='romania-responsive-fixes';
  style.textContent=`
/* Compact responsive header + To-Do layout */
header{max-width:100%;}
#familySyncBar{max-width:1180px;margin:0 auto!important;padding:0 14px 10px;justify-content:flex-start;}
#page-todo>.card{padding:14px 16px;}
#todoList{display:grid;gap:12px;}
#page-todo .edit-day{border:1px solid var(--line);border-radius:14px;background:#fff;overflow:hidden;}
#page-todo .edit-day>h3{margin:0;padding:12px 16px;background:var(--soft);font-size:1rem;border-bottom:1px solid var(--line);}
#page-todo .attraction-row{display:grid!important;grid-template-columns:minmax(0,1fr) auto;gap:12px;align-items:center!important;padding:12px 16px!important;min-height:0!important;margin:0!important;border-bottom:1px solid #e7eef1;background:#fff;}
#page-todo .attraction-row:last-child{border-bottom:0;}
#page-todo .attraction-row>div:first-child{min-width:0;width:100%;}
#page-todo .attraction-row label{align-items:flex-start!important;gap:10px!important;}
#page-todo .attraction-row label>span{min-width:0;overflow-wrap:anywhere;line-height:1.4;}
#page-todo .attraction-row input[type=checkbox]{flex:0 0 20px;}
#page-todo .attraction-row .muted{margin-top:2px;}
#page-todo .attraction-row select{min-height:38px;padding:7px 9px!important;border:1px solid var(--line);background:#fff;color:var(--text);}
#page-todo .attraction-row .btn{min-height:38px;margin-top:0!important;padding:8px 11px;white-space:nowrap;}
#page-todo .danger-btn{align-self:center;white-space:nowrap;}
#page-todo .expense-form{grid-template-columns:160px 130px minmax(240px,1fr) auto;}

@media (min-width:851px) and (max-width:1180px){
  .head{max-width:none;padding:10px 16px;display:grid;grid-template-columns:auto 1fr;align-items:center;}
  .brand{font-size:.92rem;}
  .nav{justify-content:flex-start;gap:6px;}
  .nav button{padding:8px 11px;font-size:14px;min-width:0;}
  #familySyncBar{padding:0 16px 8px!important;font-size:.8rem!important;}
  #familySyncBar button{padding:4px 7px!important;font-size:.78rem;}
  .wrap{padding-top:14px;}
  #page-todo h1{margin-top:4px;margin-bottom:10px;}
  #page-todo .attraction-row{grid-template-columns:minmax(0,1fr) auto;}
  #page-todo .expense-form{grid-template-columns:150px 120px minmax(220px,1fr) auto;}
}

@media (max-width:850px){
  header{position:sticky;top:0;}
  .head{padding:8px 10px;gap:8px;}
  .brand{font-size:.92rem;width:100%;}
  .nav{display:flex;flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:2px;scrollbar-width:none;}
  .nav::-webkit-scrollbar{display:none;}
  .nav button{flex:0 0 auto!important;min-width:auto!important;padding:8px 11px;font-size:13px;white-space:nowrap;}
  #familySyncBar{padding:0 10px 8px!important;gap:5px!important;white-space:nowrap;overflow-x:auto;flex-wrap:nowrap!important;scrollbar-width:none;}
  #familySyncBar::-webkit-scrollbar{display:none;}
  #page-todo>.card{padding:10px;}
  #todoList{gap:10px;}
  #page-todo .edit-day>h3{padding:10px 12px;}
  #page-todo .attraction-row{grid-template-columns:1fr!important;padding:11px 12px!important;gap:8px;}
  #page-todo .attraction-row>div:first-child>div{display:grid!important;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:7px!important;}
  #page-todo .attraction-row select{width:100%;min-width:0;}
  #page-todo .attraction-row .btn{width:auto!important;min-width:118px;}
  #page-todo .danger-btn{width:100%;}
  #page-todo .expense-form{grid-template-columns:1fr!important;}
}

@media (max-width:430px){
  .wrap{padding:10px 8px 50px;}
  #page-todo h1{font-size:1.45rem;}
  #page-todo .attraction-row>div:first-child>div{grid-template-columns:1fr;}
  #page-todo .attraction-row .btn{width:100%!important;}
}
`;
  document.head.appendChild(style);
}
function apply(){
  injectResponsiveFixes();
  if(typeof D==='undefined'||!Array.isArray(D)||D.length<4)return;
  D[1]={n:'ראשון · פרדיאל · יום כיפור',note:'יום כיפור — נשארים במלון.',s:[['Hotel Orizont Predeal',45.503,25.578,'','נשארים במלון · יום כיפור']]};
  D[2]={n:'שני · פרדיאל',note:'',s:[['Hotel Orizont Predeal',45.503,25.578,'','מלון']]};
  D[3]={n:'שלישי · פרדיאל',note:'',s:[['Hotel Orizont Predeal',45.503,25.578,'','מלון']]};
  try{localStorage.removeItem('romania-itinerary-v3')}catch(e){}
  try{window.renderHome?.()}catch(e){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,350));else setTimeout(apply,350);
window.addEventListener('load',()=>setTimeout(apply,600));
})();