(()=>{
'use strict';
const labels={home:'🏠 ראשי',trip:'🧭 מסלול',hotels:'🏨 מלונות',car:'🚙 רכב',calculator:'🧮 מחשבון',summary:'💰 סיכום',todo:'✅ משימות',emergency:'🆘 חשוב',checkin:'✈️ צ׳ק־אין',settings:'⚙️ הגדרות'};
function injectStyle(){if(document.getElementById('compactHeaderStyle'))return;const s=document.createElement('style');s.id='compactHeaderStyle';s.textContent=`
header .head{max-width:1180px!important;padding:6px 10px!important;gap:8px!important;display:grid!important;grid-template-columns:auto 1fr!important;align-items:center!important}
.brand-row{display:flex!important;flex-direction:column!important;align-items:flex-start!important;justify-content:center!important;gap:1px!important;min-width:0!important}
header .brand{font-size:.9rem!important;line-height:1.15!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important;max-width:210px!important}
header .nav{display:flex!important;flex-wrap:nowrap!important;gap:5px!important;overflow-x:auto!important;overflow-y:hidden!important;width:100%!important;scrollbar-width:none!important;-webkit-overflow-scrolling:touch!important;align-items:center!important;padding:1px 0!important}
header .nav::-webkit-scrollbar{display:none!important}
header .nav button{flex:0 0 auto!important;min-width:0!important;padding:6px 9px!important;border-radius:8px!important;font-size:13px!important;line-height:1.1!important;white-space:nowrap!important;height:32px!important}
#themeToggleBtn{width:32px!important;height:32px!important;min-width:32px!important;max-width:32px!important;flex:0 0 32px!important;font-size:15px!important;border-radius:8px!important}
@media(max-width:850px){header .head{display:grid!important;grid-template-columns:1fr!important;padding:5px 8px!important;gap:4px!important}.brand-row{width:100%!important;align-items:flex-start!important}.brand{max-width:90vw!important;font-size:.82rem!important}header .nav button{font-size:12px!important;padding:5px 8px!important;height:30px!important}#themeToggleBtn{width:30px!important;height:30px!important;min-width:30px!important;max-width:30px!important;flex-basis:30px!important}}
`;document.head.appendChild(s)}
function shortenButtons(){document.querySelectorAll('.nav button[data-page]').forEach(b=>{const p=b.dataset.page;if(labels[p])b.textContent=labels[p]})}
function removeStatus(){document.getElementById('connectionMini')?.remove();document.getElementById('familySyncBar')?.remove()}
function init(){injectStyle();shortenButtons();removeStatus();setTimeout(()=>{shortenButtons();removeStatus()},500);new MutationObserver(removeStatus).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();