(()=>{
'use strict';
const STATUS_CLASS_KEY='romania-sync-status-class';
function injectStyle(){if(document.getElementById('compactHeaderStyle'))return;const s=document.createElement('style');s.id='compactHeaderStyle';s.textContent=`
header{position:sticky!important;top:0!important;z-index:9900!important;box-shadow:0 4px 18px #0002!important;background:var(--p,#31473A)!important}
header>.head{position:relative!important;max-width:none!important;width:100%!important;min-height:56px!important;margin:0!important;padding:0 14px!important;display:flex!important;align-items:center!important;justify-content:center!important;box-sizing:border-box!important;direction:rtl!important}
header>.head>.brand-row{position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;display:flex!important;align-items:center!important;justify-content:center!important;min-width:0!important;max-width:calc(100% - 120px)!important;margin:0!important}
header .brand{font-size:1rem!important;line-height:1.15!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important;max-width:100%!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;font-weight:850!important;color:#fff!important;text-align:center!important}
#syncDot{display:inline-block!important;width:9px!important;height:9px!important;min-width:9px!important;max-width:9px!important;border-radius:50%!important;background:#ffb020!important;box-shadow:0 0 0 2px #ffffff2b!important;vertical-align:middle!important;flex:0 0 9px!important}
#syncDot.ok{background:#24c45a!important}#syncDot.syncing{background:#D0A765!important}#syncDot.offline{background:#ffb020!important}
#headerLeftControls{position:absolute!important;left:12px!important;top:50%!important;transform:translateY(-50%)!important;display:flex!important;align-items:center!important;justify-content:flex-start!important;direction:ltr!important;gap:6px!important;margin:0!important;padding:0!important}
header .nav{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;clip-path:inset(50%)!important;white-space:nowrap!important}
#themeToggleBtn{position:static!important;width:38px!important;height:38px!important;min-width:38px!important;max-width:38px!important;margin:0!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;font-size:18px!important;border-radius:11px!important;padding:0!important}
header>*:not(.head){display:none!important}
@media(max-width:700px){header>.head{min-height:50px!important;padding:0 8px!important}header>.head>.brand-row{max-width:calc(100% - 96px)!important}header .brand{font-size:.82rem!important}#headerLeftControls{left:8px!important}#themeToggleBtn{width:34px!important;height:34px!important;min-width:34px!important;max-width:34px!important;font-size:16px!important}}
`;document.head.appendChild(s)}
function removeLegacyStatus(){
 document.getElementById('connectionMini')?.remove();
 document.getElementById('familySyncBar')?.remove();
 const header=document.querySelector('header');if(!header)return;
 [...header.querySelectorAll('*')].forEach(el=>{
   if(el.id==='syncDot'||el.closest('#syncDot')||el.id==='headerLeftControls'||el.closest('#headerLeftControls')||el.classList.contains('brand')||el.closest('.brand')||el.classList.contains('brand-row')||el.closest('.brand-row')||el.classList.contains('nav')||el.closest('.nav')||el.id==='themeToggleBtn'||el.closest('#themeToggleBtn'))return;
   const t=(el.textContent||'').trim();
   if(t&&/^(🟢|🟡|🟠|🔄)?\s*(מסונכרן|מסנכרן…?|אופליין)(\s*·.*)?$/u.test(t))el.remove();
 });
}
function statusClass(){const c=localStorage.getItem(STATUS_CLASS_KEY)||'';if(c==='ok'||c==='syncing'||c==='offline')return c;return navigator.onLine?'ok':'offline'}
function ensureDot(){const brand=document.querySelector('header .brand');if(!brand)return;let dot=document.getElementById('syncDot');if(!dot){dot=document.createElement('span');dot.id='syncDot';dot.setAttribute('aria-label','סטטוס סנכרון');dot.title='סטטוס סנכרון';brand.appendChild(dot)}dot.className=statusClass()}
function arrangeHeader(){const head=document.querySelector('header .head');if(!head)return;let controls=document.getElementById('headerLeftControls');if(!controls){controls=document.createElement('div');controls.id='headerLeftControls';head.appendChild(controls)}const theme=document.getElementById('themeToggleBtn');if(theme&&theme.parentNode!==controls)controls.appendChild(theme)}
function refresh(){injectStyle();removeLegacyStatus();arrangeHeader();ensureDot();removeLegacyStatus()}
function init(){refresh();[200,600,1200,2200].forEach(t=>setTimeout(refresh,t));window.addEventListener('romania-sync-status',refresh);window.addEventListener('online',refresh);window.addEventListener('offline',refresh);window.addEventListener('storage',e=>{if(e.key===STATUS_CLASS_KEY)refresh()});new MutationObserver(()=>setTimeout(refresh,0)).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();