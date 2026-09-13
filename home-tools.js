(()=>{
'use strict';
function injectStyle(){if(document.getElementById('homeToolsStyle'))return;const s=document.createElement('style');s.id='homeToolsStyle';s.textContent=`
#homeTools{margin-top:18px}.home-tools-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.home-tool-btn{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:78px;padding:16px;border:1px solid var(--line,#DED5C9);border-radius:16px;background:var(--card,#FFFCF7);color:var(--text,#1F2A24);text-decoration:none;font:inherit;font-weight:800;cursor:pointer;text-align:right}.home-tool-btn .ico{font-size:28px}.home-tool-btn .txt{flex:1}.home-tool-btn .txt small{display:block;margin-top:3px;color:var(--muted,#6F716B);font-weight:600}.home-tool-btn .arrow{font-size:20px;opacity:.6}@media(max-width:600px){.home-tools-grid{grid-template-columns:1fr}.home-tool-btn{min-height:68px;padding:13px}}
`;document.head.appendChild(s)}
function navTo(page){document.querySelector(`header .nav button[data-page="${page}"]`)?.click()}
function removeFromMenus(){
 document.querySelectorAll('header .nav button').forEach(b=>{const t=(b.textContent||'').trim(),p=b.dataset.page||'';if(p==='calculator'||/תרגום/.test(t))b.remove()});
 document.querySelectorAll('#moreSheet button').forEach(b=>{const t=(b.textContent||'').trim(),p=b.dataset.go||'';if(p==='calculator'||/תרגום/.test(t))b.remove()});
 document.querySelectorAll('.page').forEach(p=>{if(/translate|translation/i.test(p.id||''))p.remove()});
}
function build(){const home=document.getElementById('page-home');if(!home)return;if(document.getElementById('homeTools'))return;const box=document.createElement('section');box.id='homeTools';box.innerHTML=`<h2>🧰 כלים</h2><div class="home-tools-grid"><button class="home-tool-btn" id="homeCalcBtn" type="button"><span class="ico">🧮</span><span class="txt">מחשבון<small>פתח את מחשבון המטבע והעלויות</small></span><span class="arrow">‹</span></button><a class="home-tool-btn" id="homeTranslateBtn" href="https://translate.google.com/?sl=auto&tl=ro&op=translate" target="_blank" rel="noopener"><span class="ico">🌐</span><span class="txt">Google Translate<small>פתיחה ישירה של Google Translate</small></span><span class="arrow">↗</span></a></div>`;home.appendChild(box);box.querySelector('#homeCalcBtn').onclick=()=>navTo('calculator')}
function init(){injectStyle();removeFromMenus();build();setTimeout(()=>{removeFromMenus();build()},400);setTimeout(removeFromMenus,1200);new MutationObserver(()=>{removeFromMenus();build()}).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();