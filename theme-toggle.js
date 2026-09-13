(()=>{
'use strict';
const KEY='romania-theme-v1',root=document.documentElement;
const systemTheme=()=>{try{return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){return'light'}};
const savedTheme=()=>{const v=localStorage.getItem(KEY);return v==='dark'||v==='light'?v:null};
const currentTheme=()=>root.dataset.theme||savedTheme()||systemTheme();
function apply(t,persist=true){t=t==='dark'?'dark':'light';root.dataset.theme=t;root.style.colorScheme=t;if(persist)localStorage.setItem(KEY,t);let m=document.querySelector('meta[name="theme-color"]');if(!m){m=document.createElement('meta');m.name='theme-color';document.head.appendChild(m)}m.content=t==='dark'?'#071217':'#0d6f88';const b=document.getElementById('themeToggleBtn');if(b){b.textContent=t==='dark'?'☀️':'🌙';b.setAttribute('aria-label',t==='dark'?'מצב יום':'מצב לילה');b.title=t==='dark'?'מצב יום':'מצב לילה'}}
function injectStyle(){if(document.getElementById('romania-theme-style'))return;const s=document.createElement('style');s.id='romania-theme-style';s.textContent=`
:root[data-theme="dark"]{--p:#24a6c1;--bg:#071217;--card:#10232b;--text:#f4f9fb;--muted:#b8cbd1;--line:#36515b;--soft:#19343e;color-scheme:dark}
:root[data-theme="dark"] body,:root[data-theme="dark"] main,:root[data-theme="dark"] .wrap,:root[data-theme="dark"] .page,:root[data-theme="dark"] section{background:var(--bg)!important;color:var(--text)!important}
:root[data-theme="dark"] header{background:#0b6577!important;color:#fff!important;box-shadow:0 2px 10px #0008}
:root[data-theme="dark"] .brand{color:#fff!important}
:root[data-theme="dark"] .nav button{background:#ffffff10!important;color:#f5fbfc!important;border-color:#ffffff55!important;text-shadow:none!important}
:root[data-theme="dark"] .nav button.on{background:#eaf6f8!important;color:#07576a!important;border-color:#eaf6f8!important}
:root[data-theme="dark"] .card,:root[data-theme="dark"] .edit-day,:root[data-theme="dark"] .attraction-row,:root[data-theme="dark"] .metric,:root[data-theme="dark"] .facts div,:root[data-theme="dark"] .summary-row,:root[data-theme="dark"] .expense-item,:root[data-theme="dark"] .summary-note,:root[data-theme="dark"] .bike-options,:root[data-theme="dark"] .bike-option,:root[data-theme="dark"] .home-item,:root[data-theme="dark"] .emergency-card{background:var(--card)!important;color:var(--text)!important;border-color:var(--line)!important}
:root[data-theme="dark"] .card h1,:root[data-theme="dark"] .card h2,:root[data-theme="dark"] .card h3,:root[data-theme="dark"] .card h4,:root[data-theme="dark"] .card b,:root[data-theme="dark"] .card strong,:root[data-theme="dark"] .card p,:root[data-theme="dark"] .home-item,:root[data-theme="dark"] .home-item *,:root[data-theme="dark"] .emergency-card h3,:root[data-theme="dark"] .emergency-card p,:root[data-theme="dark"] .emergency-card b,:root[data-theme="dark"] .flight-row{color:var(--text)!important}
:root[data-theme="dark"] .muted,:root[data-theme="dark"] .source,:root[data-theme="dark"] #insStatus{color:var(--muted)!important}
:root[data-theme="dark"] .price,:root[data-theme="dark"] .wx,:root[data-theme="dark"] .metric b,:root[data-theme="dark"] .summary-ils,:root[data-theme="dark"] .phone,:root[data-theme="dark"] .emergency-number,:root[data-theme="dark"] a:not(.btn){color:#68d7ee!important}
:root[data-theme="dark"] .pill{background:#274854!important;color:#f1fafc!important}
:root[data-theme="dark"] .facts div,:root[data-theme="dark"] .metric,:root[data-theme="dark"] .summary-row:not(.total),:root[data-theme="dark"] .expense-item,:root[data-theme="dark"] .summary-note{background:var(--soft)!important;color:var(--text)!important}
:root[data-theme="dark"] .rule{background:#3b3218!important;color:#fff0bd!important;border-right-color:#c99a24!important}
:root[data-theme="dark"] .rule *{color:#fff0bd!important}
.home-hero{background:linear-gradient(135deg,#075f78,#0b8eaa)!important;color:#fff!important;box-shadow:0 8px 24px #0d6f8824}
.home-hero #homeTitle,.home-hero #homeSub{color:#fff!important}
.today-badge{background:#e8f8fc!important;color:#075d70!important;border:1px solid #b8e7f0!important;box-shadow:0 2px 8px #063f4c24}
.home-kpi{background:#ffffff1c!important;border-color:#ffffff5c!important;color:#fff!important}
.home-kpi span,.home-kpi b{color:#fff!important}
:root[data-theme="dark"] .home-hero{background:linear-gradient(135deg,#073e4c,#086d82)!important;color:#fff!important;box-shadow:0 8px 26px #0007}
:root[data-theme="dark"] .home-kpi{background:#ffffff12!important;border-color:#ffffff35!important;color:#fff!important}
:root[data-theme="dark"] .today-badge{background:#123946!important;color:#9fe8f5!important;border-color:#2b6d7c!important;box-shadow:none!important}
:root[data-theme="dark"] input,:root[data-theme="dark"] select,:root[data-theme="dark"] textarea,:root[data-theme="dark"] option,:root[data-theme="dark"] [data-remind-select],:root[data-theme="dark"] #page-emergency input{background:#0e2027!important;color:var(--text)!important;border-color:var(--line)!important}
:root[data-theme="dark"] .warn{background:#4a3b12!important;color:#fff0bd!important;border-color:#a97c14!important}
:root[data-theme="dark"] .warn *{color:#fff0bd!important}
:root[data-theme="dark"] .ok{background:#123d26!important;color:#e5f8e9!important;border-color:#45b563!important}
:root[data-theme="dark"] .ok *{color:#e5f8e9!important}
:root[data-theme="dark"] .btn{background:#20a7c3!important;color:#fff!important}
:root[data-theme="dark"] .danger-btn{color:#fff!important}
:root[data-theme="dark"] .emergency-actions a,:root[data-theme="dark"] .emergency-actions button{background:#20a7c3!important;color:#fff!important;border:1px solid #48bfd5!important}
:root[data-theme="dark"] .flight-row{border-bottom-color:var(--line)!important}
:root[data-theme="dark"] .tab,:root[data-theme="dark"] .quick button{background:var(--card)!important;color:var(--text)!important;border-color:var(--line)!important}
:root[data-theme="dark"] .tab.on{background:var(--p)!important;color:#fff!important}
:root[data-theme="dark"] .stop{background:var(--card)!important;color:var(--text)!important;border-bottom-color:var(--line)!important}
:root[data-theme="dark"] .stop *{color:var(--text)!important}
:root[data-theme="dark"] .stop .muted{color:var(--muted)!important}
:root[data-theme="dark"] [style*="background:#fff"],:root[data-theme="dark"] [style*="background: #fff"],:root[data-theme="dark"] [style*="background:white"],:root[data-theme="dark"] [style*="background: white"],:root[data-theme="dark"] [style*="background:#f8fafb"],:root[data-theme="dark"] [style*="background: #f8fafb"]{background:var(--card)!important;color:var(--text)!important}
:root[data-theme="dark"] [style*="color:#17313b"],:root[data-theme="dark"] [style*="color: #17313b"],:root[data-theme="dark"] [style*="color:#667983"],:root[data-theme="dark"] [style*="color: #667983"]{color:var(--text)!important}
#themeToggleBtn{position:static!important;left:auto!important;top:auto!important;right:auto!important;z-index:auto!important;width:42px!important;height:38px!important;min-width:42px!important;max-width:42px!important;padding:0!important;margin:0!important;border:1px solid #ffffff55!important;background:#ffffff10!important;color:#fff!important;border-radius:10px!important;font-size:18px!important;line-height:1!important;font-weight:400!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;box-shadow:none!important;overflow:hidden!important;flex:0 0 42px!important}
@media(max-width:850px){#themeToggleBtn{width:38px!important;height:36px!important;min-width:38px!important;max-width:38px!important;flex-basis:38px!important;font-size:16px!important}}
`;document.head.appendChild(s)}
function addButton(){let b=document.getElementById('themeToggleBtn');if(b)return;const nav=document.querySelector('.nav');if(!nav)return;b=document.createElement('button');b.id='themeToggleBtn';b.type='button';b.onclick=()=>apply(currentTheme()==='dark'?'light':'dark',true);nav.insertBefore(b,nav.firstChild);apply(currentTheme(),false)}
function init(){injectStyle();apply(savedTheme()||systemTheme(),false);addButton();try{matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change',e=>{if(!savedTheme())apply(e.matches?'dark':'light',false)})}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();