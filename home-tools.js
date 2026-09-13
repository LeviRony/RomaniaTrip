(()=>{
'use strict';
let calcNodes=null;
function injectStyle(){if(document.getElementById('homeToolsStyle'))return;const s=document.createElement('style');s.id='homeToolsStyle';s.textContent=`
#homeTools{margin-top:18px}#homeCalculatorHost{margin-top:10px}.home-quick-grid{grid-template-columns:repeat(7,minmax(0,1fr))!important}.home-quick[data-translate]{border-color:var(--trans-gold,#B68A4C)!important}.home-quick[data-translate] span{font-size:1.25rem}
#homeCalculatorHost>.card{margin:0!important}#homeCalculatorHost>h1{display:none!important}#page-calculator{display:none!important}
/* Quick actions use the same app-like tiles on desktop and mobile */
#page-home .dash-actions{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(92px,1fr))!important;gap:10px!important}
#page-home .dash-actions button{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:5px!important;min-height:88px!important;padding:11px 7px!important;border:1px solid var(--line,#DED5C9)!important;border-radius:16px!important;background:var(--soft,#F1E8DE)!important;color:var(--text,#1F2A24)!important;font-weight:900!important;font-size:.86rem!important;cursor:pointer!important;box-shadow:none!important}
#page-home .dash-actions button span{display:block!important;font-size:1.5rem!important;line-height:1!important;margin:0!important}
:root[data-theme="dark"] #page-home .dash-actions button{background:var(--soft,#2A322B)!important;color:var(--text,#F3EFE7)!important;border-color:var(--line,#3D493F)!important}
@media(max-width:850px){.home-quick-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}#page-home .dash-actions{grid-template-columns:repeat(3,minmax(0,1fr))!important}#page-home .dash-actions button{min-height:82px!important}#homeTools .calc-grid{grid-template-columns:1fr!important}#homeTools .swap{justify-self:center;transform:rotate(90deg)}#homeTools .rate-cards{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
@media(max-width:520px){.home-quick-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}#page-home .dash-actions{grid-template-columns:repeat(2,minmax(0,1fr))!important}#homeTools .rate-cards{grid-template-columns:1fr!important}}
`;document.head.appendChild(s)}
function navTo(page){const b=document.querySelector(`header .nav button[data-page="${page}"]`);if(b){b.click();return}document.querySelectorAll('.page').forEach(p=>p.classList.remove('on'));document.getElementById('page-'+page)?.classList.add('on');window.scrollTo({top:0,behavior:'smooth'})}
function removeFromMenus(){
 const quickPages=new Set(['trip','hotels','car','emergency','checkin','todo','calculator']);
 document.querySelectorAll('header .nav button').forEach(b=>{const t=(b.textContent||'').trim(),p=b.dataset.page||'';if(quickPages.has(p)||/תרגום/.test(t))b.remove()});
 document.querySelectorAll('#moreSheet button').forEach(b=>{const t=(b.textContent||'').trim(),p=b.dataset.go||'';if(quickPages.has(p)||/תרגום/.test(t))b.remove()});
 document.querySelectorAll('.page').forEach(p=>{if(/translate|translation/i.test(p.id||''))p.remove()});
}
function openGoogleTranslate(){
 const ua=navigator.userAgent||'';
 const play='https://play.google.com/store/apps/details?id=com.google.android.apps.translate';
 const appStore='https://apps.apple.com/app/google-translate/id414706506';
 if(/Android/i.test(ua)){location.href='intent://translate.google.com/#Intent;scheme=https;package=com.google.android.apps.translate;S.browser_fallback_url='+encodeURIComponent(play)+';end';return}
 if(/iPhone|iPad|iPod/i.test(ua)){const started=Date.now();location.href='googletranslate://';setTimeout(()=>{if(Date.now()-started<2200)location.href=appStore},1200);return}
 window.open('https://translate.google.com/?sl=auto&tl=ro&op=translate','_blank','noopener');
}
function quickGrid(){return document.querySelector('#homeSmartPanel .home-quick-grid')||document.querySelector('#page-home .home-quick-grid')||document.querySelector('.dash-actions')}
function addQuick(key,icon,label,handler){const grid=quickGrid();if(!grid||grid.querySelector(`[data-quick-${key}]`))return;const b=document.createElement('button');if(!grid.classList.contains('dash-actions'))b.className='home-quick';b.type='button';b.setAttribute(`data-quick-${key}`,'1');b.innerHTML=`<span>${icon}</span>${label}`;b.onclick=handler;grid.appendChild(b)}
function addQuickActions(){addQuick('translate','🌐','תרגום',openGoogleTranslate);addQuick('flights','✈️','טיסות',()=>navTo('checkin'));addQuick('todo','✅','To Do',()=>navTo('todo'))}
function captureCalculator(){if(calcNodes?.length)return true;const calc=document.getElementById('page-calculator');if(!calc)return false;calcNodes=[...calc.childNodes];return calcNodes.length>0}
function mountCalculator(){const home=document.getElementById('page-home');if(!home||!captureCalculator())return;let box=document.getElementById('homeTools');if(!box){box=document.createElement('section');box.id='homeTools';box.className='dash-card';box.innerHTML='<h2>🧮 מחשבון מטבע</h2><div id="homeCalculatorHost"></div>';const dash=document.getElementById('realDashboard');(dash||home).appendChild(box)}const host=document.getElementById('homeCalculatorHost');if(!host)return;calcNodes.forEach(n=>{if(n.parentNode!==host)host.appendChild(n)});const calc=document.getElementById('page-calculator');if(calc)calc.style.display='none'}
function refresh(){injectStyle();removeFromMenus();mountCalculator();addQuickActions()}
function init(){captureCalculator();refresh();[300,800,1500,2600].forEach(t=>setTimeout(refresh,t));new MutationObserver(()=>{if(document.getElementById('page-home'))setTimeout(refresh,30)}).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();