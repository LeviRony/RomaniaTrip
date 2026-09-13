(()=>{
'use strict';
let calcNodes=null;
function injectStyle(){if(document.getElementById('homeToolsStyle'))return;const s=document.createElement('style');s.id='homeToolsStyle';s.textContent=`
#homeTools{margin-top:18px}#homeCalculatorHost{margin-top:10px}.home-quick-grid{grid-template-columns:repeat(5,minmax(0,1fr))!important}.home-quick[data-translate]{border-color:var(--trans-gold,#B68A4C)!important}.home-quick[data-translate] span{font-size:1.25rem}
#homeCalculatorHost>.card{margin:0!important}#homeCalculatorHost>h1{display:none!important}#page-calculator{display:none!important}
@media(max-width:850px){.home-quick-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}#homeTools .calc-grid{grid-template-columns:1fr!important}#homeTools .swap{justify-self:center;transform:rotate(90deg)}#homeTools .rate-cards{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
@media(max-width:520px){.home-quick-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}#homeTools .rate-cards{grid-template-columns:1fr!important}}
`;document.head.appendChild(s)}
function removeFromMenus(){
 document.querySelectorAll('header .nav button').forEach(b=>{const t=(b.textContent||'').trim(),p=b.dataset.page||'';if(p==='calculator'||/תרגום/.test(t))b.remove()});
 document.querySelectorAll('#moreSheet button').forEach(b=>{const t=(b.textContent||'').trim(),p=b.dataset.go||'';if(p==='calculator'||/תרגום/.test(t))b.remove()});
 document.querySelectorAll('.page').forEach(p=>{if(/translate|translation/i.test(p.id||''))p.remove()});
}
function openGoogleTranslate(){
 const ua=navigator.userAgent||'';
 const play='https://play.google.com/store/apps/details?id=com.google.android.apps.translate';
 const appStore='https://apps.apple.com/app/google-translate/id414706506';
 if(/Android/i.test(ua)){
   location.href='intent://translate.google.com/#Intent;scheme=https;package=com.google.android.apps.translate;S.browser_fallback_url='+encodeURIComponent(play)+';end';
   return;
 }
 if(/iPhone|iPad|iPod/i.test(ua)){
   const started=Date.now();
   location.href='googletranslate://';
   setTimeout(()=>{if(Date.now()-started<2200)location.href=appStore},1200);
   return;
 }
 window.open('https://translate.google.com/?sl=auto&tl=ro&op=translate','_blank','noopener');
}
function addTranslateQuick(){
 const grid=document.querySelector('#homeSmartPanel .home-quick-grid')||document.querySelector('#page-home .home-quick-grid')||document.querySelector('.dash-actions');
 if(!grid||grid.querySelector('[data-translate]'))return;
 const b=document.createElement('button');b.className=grid.classList.contains('dash-actions')?'':'home-quick';b.type='button';b.dataset.translate='1';b.innerHTML='<span>🌐</span>תרגום';b.onclick=openGoogleTranslate;grid.appendChild(b);
}
function captureCalculator(){
 if(calcNodes?.length)return true;
 const calc=document.getElementById('page-calculator');
 if(!calc)return false;
 calcNodes=[...calc.childNodes];
 return calcNodes.length>0;
}
function mountCalculator(){
 const home=document.getElementById('page-home');
 if(!home||!captureCalculator())return;
 let box=document.getElementById('homeTools');
 if(!box){box=document.createElement('section');box.id='homeTools';box.className='dash-card';box.innerHTML='<h2>🧮 מחשבון מטבע</h2><div id="homeCalculatorHost"></div>';const dash=document.getElementById('realDashboard');(dash||home).appendChild(box)}
 let host=document.getElementById('homeCalculatorHost');
 if(!host)return;
 calcNodes.forEach(n=>{if(n.parentNode!==host)host.appendChild(n)});
 const calc=document.getElementById('page-calculator');if(calc)calc.style.display='none';
}
function refresh(){injectStyle();removeFromMenus();mountCalculator();addTranslateQuick()}
function init(){captureCalculator();refresh();[300,800,1500,2600].forEach(t=>setTimeout(refresh,t));new MutationObserver(()=>{if(document.getElementById('page-home'))setTimeout(refresh,30)}).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();