(()=>{
'use strict';
const KEY='romania-theme-v1';
const root=document.documentElement;
function systemTheme(){try{return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){return 'light'}}
function savedTheme(){const v=localStorage.getItem(KEY);return v==='dark'||v==='light'?v:null}
function currentTheme(){return root.dataset.theme||savedTheme()||systemTheme()}
function updateMeta(theme){let meta=document.querySelector('meta[name="theme-color"]');if(!meta){meta=document.createElement('meta');meta.name='theme-color';document.head.appendChild(meta)}meta.content=theme==='dark'?'#0b1d24':'#0d6f88'}
function apply(theme,persist=true){theme=theme==='dark'?'dark':'light';root.dataset.theme=theme;root.style.colorScheme=theme;if(persist)localStorage.setItem(KEY,theme);updateMeta(theme);const b=document.getElementById('themeToggleBtn');if(b){b.textContent=theme==='dark'?'☀️ יום':'🌙 לילה';b.setAttribute('aria-label',theme==='dark'?'החלף למצב יום':'החלף למצב לילה');b.title=b.getAttribute('aria-label')}}
function injectStyle(){if(document.getElementById('romania-theme-style'))return;const s=document.createElement('style');s.id='romania-theme-style';s.textContent=`
:root[data-theme="dark"]{
 --p:#1592ad;--bg:#0b151a;--card:#12232a;--text:#ecf5f7;--muted:#a9bcc3;--line:#294149;--soft:#18313a;
 color-scheme:dark;
}
:root[data-theme="dark"] body{background:var(--bg);color:var(--text)}
:root[data-theme="dark"] header{background:#0b5b6d;box-shadow:0 2px 10px #0008}
:root[data-theme="dark"] .card,
:root[data-theme="dark"] .tab,
:root[data-theme="dark"] .quick button,
:root[data-theme="dark"] .field input,
:root[data-theme="dark"] .field select,
:root[data-theme="dark"] .expense-form input,
:root[data-theme="dark"] .expense-form select,
:root[data-theme="dark"] #page-todo .attraction-row,
:root[data-theme="dark"] #page-todo .edit-day{background:var(--card)!important;color:var(--text)!important;border-color:var(--line)!important}
:root[data-theme="dark"] .facts div,
:root[data-theme="dark"] .summary-row,
:root[data-theme="dark"] .expense-item,
:root[data-theme="dark"] .summary-note{background:var(--soft)!important;color:var(--text)!important}
:root[data-theme="dark"] .warn{background:#3b3218;color:#f7e7ae;border-right-color:#c99a24}
:root[data-theme="dark"] .ok{background:#183522;color:#ccebd5;border-right-color:#45b563}
:root[data-theme="dark"] a:not(.btn){color:#7fd7eb}
:root[data-theme="dark"] .tab{border-color:var(--line)}
:root[data-theme="dark"] .tab.on{background:var(--p);color:#fff}
:root[data-theme="dark"] .leaflet-control-zoom a{background:#152a32!important;color:#fff!important;border-color:#294149!important}
:root[data-theme="dark"] .leaflet-popup-content-wrapper,
:root[data-theme="dark"] .leaflet-popup-tip{background:#12232a;color:#ecf5f7}
:root[data-theme="dark"] input::placeholder,
:root[data-theme="dark"] textarea::placeholder{color:#82979f}
#themeToggleBtn{border:1px solid #ffffff66;background:#ffffff18;color:#fff;border-radius:10px;padding:8px 11px;font-size:14px;font-weight:800;cursor:pointer;white-space:nowrap}
#themeToggleBtn:focus-visible{outline:2px solid #fff;outline-offset:2px}
@media(max-width:850px){#themeToggleBtn{padding:7px 10px;font-size:13px}}
`;
document.head.appendChild(s)}
function addButton(){if(document.getElementById('themeToggleBtn'))return;const head=document.querySelector('.head');if(!head)return;const b=document.createElement('button');b.id='themeToggleBtn';b.type='button';b.onclick=()=>apply(currentTheme()==='dark'?'light':'dark',true);head.appendChild(b);apply(currentTheme(),false)}
function init(){injectStyle();apply(savedTheme()||systemTheme(),false);addButton();try{const mq=matchMedia('(prefers-color-scheme: dark)');mq.addEventListener?.('change',e=>{if(!savedTheme())apply(e.matches?'dark':'light',false)})}catch(e){}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();