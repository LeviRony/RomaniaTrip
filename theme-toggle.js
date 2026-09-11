(()=>{
'use strict';
const KEY='romania-theme-v1';
const root=document.documentElement;
function systemTheme(){try{return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){return'light'}}
function savedTheme(){const v=localStorage.getItem(KEY);return v==='dark'||v==='light'?v:null}
function currentTheme(){return root.dataset.theme||savedTheme()||systemTheme()}
function updateMeta(t){let m=document.querySelector('meta[name="theme-color"]');if(!m){m=document.createElement('meta');m.name='theme-color';document.head.appendChild(m)}m.content=t==='dark'?'#091217':'#0d6f88'}
function apply(t,persist=true){t=t==='dark'?'dark':'light';root.dataset.theme=t;root.style.colorScheme=t;if(persist)localStorage.setItem(KEY,t);updateMeta(t);const b=document.getElementById('themeToggleBtn');if(b){b.textContent=t==='dark'?'☀️ יום':'🌙 לילה';b.title=t==='dark'?'החלף למצב יום':'החלף למצב לילה'}}
function injectStyle(){if(document.getElementById('romania-theme-style'))return;const s=document.createElement('style');s.id='romania-theme-style';s.textContent=`
:root[data-theme="dark"]{--p:#24a6c1;--bg:#071217;--card:#10232b;--text:#f2f8fa;--muted:#b8cbd1;--line:#36515b;--soft:#19343e;color-scheme:dark}
:root[data-theme="dark"] body,:root[data-theme="dark"] main,:root[data-theme="dark"] .wrap,:root[data-theme="dark"] .page,:root[data-theme="dark"] section{background:var(--bg)!important;color:var(--text)!important}
:root[data-theme="dark"] header{background:#0b6577!important;color:#fff!important;box-shadow:0 2px 10px #0008}
:root[data-theme="dark"] .brand{color:#fff!important}
:root[data-theme="dark"] .nav button{background:#ffffff10!important;color:#f5fbfc!important;border-color:#ffffff55!important;text-shadow:none!important}
:root[data-theme="dark"] .nav button.on{background:#eaf6f8!important;color:#07576a!important;border-color:#eaf6f8!important}
:root[data-theme="dark"] .nav button.on *{color:#07576a!important}
:root[data-theme="dark"] .card,:root[data-theme="dark"] .edit-day,:root[data-theme="dark"] .attraction-row,:root[data-theme="dark"] .metric,:root[data-theme="dark"] .facts div,:root[data-theme="dark"] .summary-row,:root[data-theme="dark"] .expense-item,:root[data-theme="dark"] .summary-note,:root[data-theme="dark"] .bike-options,:root[data-theme="dark"] .bike-option{background:var(--card)!important;color:var(--text)!important;border-color:var(--line)!important}
:root[data-theme="dark"] .card h1,:root[data-theme="dark"] .card h2,:root[data-theme="dark"] .card h3,:root[data-theme="dark"] .card h4,:root[data-theme="dark"] .card b,:root[data-theme="dark"] .card strong,:root[data-theme="dark"] .card p,:root[data-theme="dark"] .card div:not(.btn):not(.price):not(.wx),:root[data-theme="dark"] .hotel-title,:root[data-theme="dark"] .hotel-title *{color:var(--text)!important}
:root[data-theme="dark"] .muted,:root[data-theme="dark"] .source{color:var(--muted)!important}
:root[data-theme="dark"] .price,:root[data-theme="dark"] .wx,:root[data-theme="dark"] .metric b,:root[data-theme="dark"] .summary-ils,:root[data-theme="dark"] .phone,:root[data-theme="dark"] a:not(.btn){color:#68d7ee!important}
:root[data-theme="dark"] .pill{background:#274854!important;color:#f1fafc!important}
:root[data-theme="dark"] .facts div,:root[data-theme="dark"] .metric,:root[data-theme="dark"] .summary-row:not(.total),:root[data-theme="dark"] .expense-item,:root[data-theme="dark"] .summary-note{background:var(--soft)!important}
:root[data-theme="dark"] input,:root[data-theme="dark"] select,:root[data-theme="dark"] textarea,:root[data-theme="dark"] option,:root[data-theme="dark"] [data-remind-select]{background:#0e2027!important;color:var(--text)!important;border-color:var(--line)!important}
:root[data-theme="dark"] .warn{background:#3b3218!important;color:#f7e7ae!important;border-right-color:#c99a24!important}
:root[data-theme="dark"] .ok{background:#143d27!important;color:#e1f7e7!important;border-right-color:#45b563!important}
:root[data-theme="dark"] .ok *,:root[data-theme="dark"] .warn *{color:inherit!important}
:root[data-theme="dark"] .btn{background:#20a7c3!important;color:#fff!important}
:root[data-theme="dark"] .danger-btn{color:#fff!important}
:root[data-theme="dark"] .tab,:root[data-theme="dark"] .quick button{background:var(--card)!important;color:var(--text)!important;border-color:var(--line)!important}
:root[data-theme="dark"] .tab.on{background:var(--p)!important;color:#fff!important}
:root[data-theme="dark"] .stop{border-bottom-color:var(--line)!important}
:root[data-theme="dark"] [style*="background:#fff"],:root[data-theme="dark"] [style*="background: #fff"],:root[data-theme="dark"] [style*="background:white"],:root[data-theme="dark"] [style*="background: white"],:root[data-theme="dark"] [style*="background:#f8fafb"],:root[data-theme="dark"] [style*="background: #f8fafb"]{background:var(--card)!important;color:var(--text)!important}
:root[data-theme="dark"] [style*="color:#17313b"],:root[data-theme="dark"] [style*="color: #17313b"],:root[data-theme="dark"] [style*="color:#667983"],:root[data-theme="dark"] [style*="color: #667983"]{color:var(--text)!important}
:root[data-theme="dark"] .leaflet-control-zoom a{background:#152a32!important;color:#fff!important;border-color:#294149!important}
:root[data-theme="dark"] .leaflet-popup-content-wrapper,:root[data-theme="dark"] .leaflet-popup-tip{background:#12232a!important;color:#ecf5f7!important}
:root[data-theme="dark"] .leaflet-popup-content,:root[data-theme="dark"] .leaflet-popup-content *{color:#ecf5f7!important}
:root[data-theme="dark"] input::placeholder,:root[data-theme="dark"] textarea::placeholder{color:#8da2aa!important}
#themeToggleBtn{border:1px solid #ffffff66;background:#ffffff18;color:#fff;border-radius:10px;padding:8px 11px;font-size:14px;font-weight:800;cursor:pointer;white-space:nowrap}
@media(max-width:850px){#themeToggleBtn{padding:7px 10px;font-size:13px}}
`;document.head.appendChild(s)}
function addButton(){if(document.getElementById('themeToggleBtn'))return;const h=document.querySelector('.head');if(!h)return;const b=document.createElement('button');b.id='themeToggleBtn';b.type='button';b.onclick=()=>apply(currentTheme()==='dark'?'light':'dark',true);h.appendChild(b);apply(currentTheme(),false)}
function init(){injectStyle();apply(savedTheme()||systemTheme(),false);addButton();try{const mq=matchMedia('(prefers-color-scheme: dark)');mq.addEventListener?.('change',e=>{if(!savedTheme())apply(e.matches?'dark':'light',false)})}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();