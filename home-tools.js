(()=>{
'use strict';
function injectStyle(){if(document.getElementById('homeToolsStyle'))return;const s=document.createElement('style');s.id='homeToolsStyle';s.textContent=`
#homeTools{margin-top:18px}#homeCalculatorHost{margin-top:10px}.home-quick-grid{grid-template-columns:repeat(5,minmax(0,1fr))!important}.home-quick[data-translate]{border-color:var(--trans-gold,#B68A4C)!important}.home-quick[data-translate] span{font-size:1.25rem}
@media(max-width:850px){.home-quick-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}}
@media(max-width:520px){.home-quick-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
#homeCalculatorHost>.card{margin:0!important}#page-calculator{display:none!important}
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
 const grid=document.querySelector('#homeSmartPanel .home-quick-grid')||document.querySelector('#page-home .home-quick-grid');
 if(!grid||grid.querySelector('[data-translate]'))return;
 const b=document.createElement('button');b.className='home-quick';b.type='button';b.dataset.translate='1';b.innerHTML='<span>🌐</span>תרגום';b.onclick=openGoogleTranslate;grid.appendChild(b);
}
function moveCalculator(){
 const home=document.getElementById('page-home'),calc=document.getElementById('page-calculator');
 if(!home||!calc)return;
 let box=document.getElementById('homeTools');
 if(!box){box=document.createElement('section');box.id='homeTools';box.innerHTML='<h2>🧮 מחשבון</h2><div id="homeCalculatorHost"></div>';home.appendChild(box)}
 const host=document.getElementById('homeCalculatorHost');
 if(!host||host.children.length)return;
 while(calc.firstChild)host.appendChild(calc.firstChild);
 calc.style.display='none';
}
function init(){injectStyle();removeFromMenus();moveCalculator();addTranslateQuick();setTimeout(()=>{removeFromMenus();moveCalculator();addTranslateQuick()},400);setTimeout(()=>{removeFromMenus();moveCalculator();addTranslateQuick()},1200);new MutationObserver(()=>{removeFromMenus();moveCalculator();addTranslateQuick()}).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();