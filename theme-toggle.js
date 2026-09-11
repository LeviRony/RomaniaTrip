(()=>{
'use strict';
const KEY='romania-theme-v1';
const root=document.documentElement;
function systemTheme(){try{return matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){return 'light'}}
function savedTheme(){const v=localStorage.getItem(KEY);return v==='dark'||v==='light'?v:null}
function currentTheme(){return root.dataset.theme||savedTheme()||systemTheme()}
function updateMeta(theme){let meta=document.querySelector('meta[name="theme-color"]');if(!meta){meta=document.createElement('meta');meta.name='theme-color';document.head.appendChild(meta)}meta.content=theme==='dark'?'#0b151a':'#0d6f88'}
function apply(theme,persist=true){theme=theme==='dark'?'dark':'light';root.dataset.theme=theme;root.style.colorScheme=theme;if(persist)localStorage.setItem(KEY,theme);updateMeta(theme);const b=document.getElementById('themeToggleBtn');if(b){b.textContent=theme==='dark'?'☀️ יום':'🌙 לילה';b.setAttribute('aria-label',theme==='dark'?'החלף למצב יום':'החלף למצב לילה');b.title=b.getAttribute('aria-label')}}
function injectStyle(){if(document.getElementById('romania-theme-style'))return;const s=document.createElement('style');s.id='romania-theme-style';s.textContent=`
:root[data-theme="dark"]{
 --p:#24a6c1;--bg:#091217;--card:#122229;--text:#eef7f9;--muted:#b3c4ca;--line:#31464e;--soft:#192f37;
 color-scheme:dark;
}
:root[data-theme="dark"] body,
:root[data-theme="dark"] main,
:root[data-theme="dark"] .wrap,
:root[data-theme="dark"] .page,
:root[data-theme="dark"] section{background:var(--bg);color:var(--text)}
:root[data-theme="dark"] header{background:#0b5b6d;box-shadow:0 2px 10px #0008}
:root[data-theme="dark"] h1,
:root[data-theme="dark"] h2,
:root[data-theme="dark"] h3,
:root[data-theme="dark"] h4,
:root[data-theme="dark"] p,
:root[data-theme="dark"] label,
:root[data-theme="dark"] span:not(.pill),
:root[data-theme="dark"] strong,
:root[data-theme="dark"] b{color:inherit}
:root[data-theme="dark"] .card,
:root[data-theme="dark"] .tab,
:root[data-theme="dark"] .quick button,
:root[data-theme="dark"] .edit-day,
:root[data-theme="dark"] .attraction-row,
:root[data-theme="dark"] .metric,
:root[data-theme="dark"] .facts div,
:root[data-theme="dark"] .summary-row,
:root[data-theme="dark"] .expense-item,
:root[data-theme="dark"] .summary-note,
:root[data-theme="dark"] .bike-options,
:root[data-theme="dark"] .bike-option{background:var(--card)!important;color:var(--text)!important;border-color:var(--line)!important}
:root[data-theme="dark"] .metric,
:root[data-theme="dark"] .facts div,
:root[data-theme="dark"] .summary-row:not(.total),
:root[data-theme="dark"] .expense-item,
:root[data-theme="dark"] .summary-note{background:var(--soft)!important}
:root[data-theme="dark"] input,
:root[data-theme="dark"] select,
:root[data-theme="dark"] textarea,
:root[data-theme="dark"] option,
:root[data-theme="dark"] .field input,
:root[data-theme="dark"] .field select,
:root[data-theme="dark"] .expense-form input,
:root[data-theme="dark"] .expense-form select,
:root[data-theme="dark"] [data-remind-select]{background:#102027!important;color:var(--text)!important;border-color:var(--line)!important}
:root[data-theme="dark"] input,
:root[data-theme="dark"] select,
:root[data-theme="dark"] textarea{background:#102027!important;color:var(--text)!important;border-color:var(--line)!important}
:root[data-theme="dark"] button:not(.btn):not(.danger-btn):not(#themeToggleBtn){color:var(--text)}
:root[data-theme="dark"] .quick button{background:var(--card)!important}
:root[data-theme="dark"] .warn{background:#3b3218!important;color:#f7e7ae!important;border-right-color:#c99a24}
:root[data-theme="dark"] .ok{background:#183522!important;color:#d7f1de!important;border-right-color:#45b563}
:root[data-theme="dark"] .muted,
:root[data-theme="dark"] .source{color:var(--muted)!important}
:root[data-theme="dark"] .price,
:root[data-theme="dark"] .wx,
:root[data-theme="dark"] .metric b,
:root[data-theme="dark"] .summary-ils{color:#66d3e8!important}
:root[data-theme="dark"] .summary-row.total,
:root[data-theme="dark"] .summary-row.total *{color:#fff!important}
:root[data-theme="dark"] .pill{background:#23414b!important;color:#e8f5f8!important}
:root[data-theme="dark"] a:not(.btn){color:#7fd7eb}
:root[data-theme="dark"] .tab{border-color:var(--line)!important;background:var(--card)!important;color:var(--text)!important}
:root[data-theme="dark"] .tab.on{background:var(--p)!important;color:#fff!important}
:root[data-theme="dark"] .stop{border-bottom-color:var(--line)!important}
:root[data-theme="dark"] [style*="background:#fff"],
:root[data-theme="dark"] [style*="background: #fff"],
:root[data-theme="dark"] [style*="background:white"],
:root[data-theme="dark"] [style*="background: white"],
:root[data-theme="dark"] [style*="background:#f8fafb"],
:root[data-theme="dark"] [style*="background: #f8fafb"]{background:var(--card)!important;color:var(--text)!important}
:root[data-theme="dark"] [style*="color:#17313b"],
:root[data-theme="dark"] [style*="color: #17313b"],
:root[data-theme="dark"] [style*="color:#667983"],
:root[data-theme="dark"] [style*="color: #667983"]{color:var(--text)!important}
:root[data-theme="dark"] .leaflet-control-zoom a{background:#152a32!important;color:#fff!important;border-color:#294149!important}
:root[data-theme="dark"] .leaflet-popup-content-wrapper,
:root[data-theme="dark"] .leaflet-popup-tip{background:#12232a!important;color:#ecf5f7!important}
:root[data-theme="dark"] .leaflet-popup-content,
:root[data-theme="dark"] .leaflet-popup-content *{color:#ecf5f7!important}
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