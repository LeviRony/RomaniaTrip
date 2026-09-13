(()=>{
'use strict';
const STATUS_CLASS_KEY='romania-sync-status-class';
function injectStyle(){if(document.getElementById('compactHeaderStyle'))return;const s=document.createElement('style');s.id='compactHeaderStyle';s.textContent=`
header{position:sticky!important;top:0!important;z-index:9900!important;box-shadow:0 4px 18px #0002!important}
header .head{max-width:1180px!important;margin:0 auto!important;padding:7px 10px!important;display:grid!important;grid-template-columns:1fr auto!important;align-items:center!important;gap:10px!important;direction:rtl!important}
.brand-row{display:flex!important;align-items:center!important;justify-content:flex-start!important;min-width:0!important}
header .brand{font-size:.94rem!important;line-height:1.15!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important;max-width:min(72vw,720px)!important;display:inline-flex!important;align-items:center!important;gap:7px!important;font-weight:850!important}
#syncDot{display:inline-block!important;width:9px!important;height:9px!important;min-width:9px!important;max-width:9px!important;border-radius:50%!important;background:#ffb020!important;box-shadow:0 0 0 2px #ffffff2b!important;vertical-align:middle!important;flex:0 0 9px!important}
#syncDot.ok{background:#24c45a!important}#syncDot.syncing{background:#D0A765!important}#syncDot.offline{background:#ffb020!important}
#headerLeftControls{display:flex!important;align-items:center!important;justify-content:flex-start!important;direction:ltr!important;gap:6px!important}
header .nav{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;clip-path:inset(50%)!important;white-space:nowrap!important}
#themeToggleBtn{position:static!important;width:36px!important;height:36px!important;min-width:36px!important;max-width:36px!important;margin:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;font-size:17px!important;border-radius:10px!important}
@media(max-width:700px){header .head{padding:6px 8px!important;gap:7px!important}header .brand{font-size:.8rem!important;max-width:74vw!important}#themeToggleBtn{width:32px!important;height:32px!important;min-width:32px!important;max-width:32px!important;font-size:15px!important}}
`;document.head.appendChild(s)}
function removeLegacyStatus(){document.getElementById('connectionMini')?.remove();document.getElementById('familySyncBar')?.remove();document.querySelectorAll('header div,header span,header p').forEach(el=>{if(el.id==='syncDot'||el.closest('#syncDot')||el.id==='headerLeftControls'||el.closest('#headerLeftControls')||el.classList.contains('brand')||el.closest('.brand'))return;if(el.querySelector('button'))return;const t=(el.textContent||'').trim();if(/מסונכרן|מסנכרן|אופליין|הנתונים נשמרים במכשיר/.test(t))el.remove()})}
function statusClass(){const c=localStorage.getItem(STATUS_CLASS_KEY)||'';if(c==='ok'||c==='syncing'||c==='offline')return c;return navigator.onLine?'ok':'offline'}
function ensureDot(){const brand=document.querySelector('header .brand');if(!brand)return;let dot=document.getElementById('syncDot');if(!dot){dot=document.createElement('span');dot.id='syncDot';dot.setAttribute('aria-label','סטטוס סנכרון');dot.title='סטטוס סנכרון';brand.appendChild(dot)}dot.className=statusClass()}
function arrangeHeader(){const head=document.querySelector('header .head');if(!head)return;let controls=document.getElementById('headerLeftControls');if(!controls){controls=document.createElement('div');controls.id='headerLeftControls';head.appendChild(controls)}const theme=document.getElementById('themeToggleBtn');if(theme&&theme.parentNode!==controls)controls.appendChild(theme)}
function refresh(){removeLegacyStatus();ensureDot();arrangeHeader()}
function init(){injectStyle();refresh();setTimeout(refresh,400);setTimeout(refresh,1200);window.addEventListener('romania-sync-status',refresh);window.addEventListener('online',refresh);window.addEventListener('offline',refresh);window.addEventListener('storage',e=>{if(e.key===STATUS_CLASS_KEY)refresh()});new MutationObserver(()=>setTimeout(refresh,0)).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();