(()=>{
'use strict';
function inject(){if(document.getElementById('transylvaniaTheme'))return;const s=document.createElement('style');s.id='transylvaniaTheme';s.textContent=`
:root[data-theme="light"]{--bg:#F4F1EC;--card:#FFFCF7;--text:#1F2A24;--muted:#6F716B;--line:#DED5C9;--soft:#F1E8DE;--p:#31473A;--trans-accent:#743B46;--trans-gold:#B68A4C;color-scheme:light}
:root[data-theme="light"] body,:root[data-theme="light"] main,:root[data-theme="light"] .wrap,:root[data-theme="light"] .page,:root[data-theme="light"] section{background:var(--bg)!important;color:var(--text)!important}
:root[data-theme="light"] .card,:root[data-theme="light"] .edit-day,:root[data-theme="light"] .attraction-row,:root[data-theme="light"] .metric,:root[data-theme="light"] .facts div,:root[data-theme="light"] .summary-row,:root[data-theme="light"] .expense-item,:root[data-theme="light"] .summary-note,:root[data-theme="light"] .bike-options,:root[data-theme="light"] .bike-option,:root[data-theme="light"] .home-item,:root[data-theme="light"] .emergency-card,:root[data-theme="light"] .home-smart-card,:root[data-theme="light"] .home-quick{background:var(--card)!important;color:var(--text)!important;border-color:var(--line)!important}
:root[data-theme="light"] .muted,:root[data-theme="light"] .source{color:var(--muted)!important}
:root[data-theme="light"] .btn,:root[data-theme="light"] .home-smart-actions a,:root[data-theme="light"] .home-smart-actions button,:root[data-theme="light"] #nextNavFab{background:var(--p)!important;color:#fff!important}
:root[data-theme="light"] .tab.on{background:var(--trans-accent)!important;color:#fff!important}
:root[data-theme="light"] .pill,:root[data-theme="light"] .facts div,:root[data-theme="light"] .metric,:root[data-theme="light"] .summary-row:not(.total),:root[data-theme="light"] .expense-item,:root[data-theme="light"] .summary-note{background:var(--soft)!important;color:var(--text)!important}
:root[data-theme="light"] #homeToday .home-item{border-right-color:#CDBAA9!important}
:root[data-theme="light"] #homeToday .home-item:before{background:var(--trans-accent)!important}
:root[data-theme="light"] #homeToday .home-item:first-child{background:#F7EDE8!important;border-color:#E4CFC7!important}
:root[data-theme="light"] #mobileDock button.on{background:#EFE4DC!important;color:var(--trans-accent)!important}
:root[data-theme="light"] #moreSheet .more-grid button{background:var(--soft)!important;color:var(--text)!important;border-color:var(--line)!important}
:root[data-theme="light"] input,:root[data-theme="light"] select,:root[data-theme="light"] textarea{background:#FFFCF7!important;color:var(--text)!important;border-color:var(--line)!important}

:root[data-theme="dark"]{--p:#587461;--bg:#111412;--card:#1B211D;--text:#F3EFE7;--muted:#B9B5AC;--line:#3D493F;--soft:#2A322B;--trans-accent:#B46B78;--trans-gold:#D0A765;color-scheme:dark}
:root[data-theme="dark"] body,:root[data-theme="dark"] main,:root[data-theme="dark"] .wrap,:root[data-theme="dark"] .page,:root[data-theme="dark"] section{background:var(--bg)!important;color:var(--text)!important}
:root[data-theme="dark"] .card,:root[data-theme="dark"] .edit-day,:root[data-theme="dark"] .attraction-row,:root[data-theme="dark"] .metric,:root[data-theme="dark"] .facts div,:root[data-theme="dark"] .summary-row,:root[data-theme="dark"] .expense-item,:root[data-theme="dark"] .summary-note,:root[data-theme="dark"] .bike-options,:root[data-theme="dark"] .bike-option,:root[data-theme="dark"] .home-item,:root[data-theme="dark"] .emergency-card,:root[data-theme="dark"] .home-smart-card,:root[data-theme="dark"] .home-quick{background:var(--card)!important;color:var(--text)!important;border-color:var(--line)!important}
:root[data-theme="dark"] .muted,:root[data-theme="dark"] .source,:root[data-theme="dark"] #insStatus{color:var(--muted)!important}
:root[data-theme="dark"] .price,:root[data-theme="dark"] .wx,:root[data-theme="dark"] .metric b,:root[data-theme="dark"] .summary-ils,:root[data-theme="dark"] .phone,:root[data-theme="dark"] .emergency-number,:root[data-theme="dark"] a:not(.btn){color:#D0A765!important}
:root[data-theme="dark"] .btn,:root[data-theme="dark"] .home-smart-actions a,:root[data-theme="dark"] .home-smart-actions button,:root[data-theme="dark"] #nextNavFab,:root[data-theme="dark"] .emergency-actions a,:root[data-theme="dark"] .emergency-actions button{background:var(--p)!important;color:#fff!important;border-color:#78937F!important}
:root[data-theme="dark"] .pill,:root[data-theme="dark"] .facts div,:root[data-theme="dark"] .metric,:root[data-theme="dark"] .summary-row:not(.total),:root[data-theme="dark"] .expense-item,:root[data-theme="dark"] .summary-note{background:var(--soft)!important;color:var(--text)!important}
:root[data-theme="dark"] .tab.on{background:var(--trans-accent)!important;color:#fff!important}
:root[data-theme="dark"] #homeToday .home-item{border-right-color:#667066!important}
:root[data-theme="dark"] #homeToday .home-item:before{background:var(--trans-accent)!important}
:root[data-theme="dark"] #homeToday .home-item:first-child{background:#342A2B!important;border-color:#65464C!important}
:root[data-theme="dark"] #mobileDock{background:#1B211DF2!important;border-color:var(--line)!important}
:root[data-theme="dark"] #mobileDock button.on{background:#3A2A2D!important;color:#E5A1AC!important}
:root[data-theme="dark"] #moreSheet .sheet{background:var(--card)!important;color:var(--text)!important}
:root[data-theme="dark"] #moreSheet .more-grid button{background:var(--soft)!important;color:var(--text)!important;border-color:var(--line)!important}
:root[data-theme="dark"] input,:root[data-theme="dark"] select,:root[data-theme="dark"] textarea,:root[data-theme="dark"] option{background:#202821!important;color:var(--text)!important;border-color:var(--line)!important}
#homeSmartPanel.pretrip-clean{grid-template-columns:1fr!important}

/* Transylvania navigation */
:root[data-theme="light"] header{background:#31473A!important;color:#fff!important}
:root[data-theme="light"] header .nav button{background:#ffffff12!important;color:#FFFDF7!important;border-color:#ffffff42!important}
:root[data-theme="light"] header .nav button.on{background:#FFF8EF!important;color:#743B46!important;border-color:#FFF8EF!important}
:root[data-theme="dark"] header{background:#202821!important;color:#F3EFE7!important}
:root[data-theme="dark"] header .nav button{background:#ffffff0d!important;color:#F3EFE7!important;border-color:#ffffff2e!important}
:root[data-theme="dark"] header .nav button.on{background:#342A2B!important;color:#E5A1AC!important;border-color:#65464C!important}

/* Responsive: never require horizontal page scrolling */
html,body{width:100%!important;max-width:100%!important;overflow-x:hidden!important}
body *{max-width:100%;min-width:0}
.wrap,main.wrap,.page,section,.card,.home-grid,.grid,.facts,.metrics,.controls,.rate-cards,.summary-row,.expense-form,.expense-item,.calc-grid,.route-editor,.edit-day,#homeSmartPanel{min-width:0!important;max-width:100%!important}
img,svg,canvas,video,iframe{max-width:100%!important;height:auto}
#map{max-width:100%!important}
pre,code,.ltr,.phone{max-width:100%!important;overflow-wrap:anywhere}

@media(max-width:850px){
 header .head{width:100%!important;max-width:100%!important;grid-template-columns:1fr!important;padding:7px 8px!important;overflow:visible!important}
 .brand-row{width:100%!important}
 header .brand{max-width:100%!important;white-space:normal!important}
 header .nav{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;width:100%!important;max-width:100%!important;overflow:visible!important;gap:5px!important;padding:2px 0!important}
 header .nav button,#themeToggleBtn{width:100%!important;max-width:none!important;min-width:0!important;flex:none!important;height:auto!important;min-height:34px!important;padding:6px 4px!important;font-size:11px!important;line-height:1.15!important;white-space:normal!important;text-align:center!important}
 #themeToggleBtn{display:flex!important;align-items:center!important;justify-content:center!important}
 .wrap{padding-left:10px!important;padding-right:10px!important;width:100%!important}
 .grid,.metrics,.controls,.facts,.rate-cards,.home-grid,.calc-grid,.summary-row,.expense-form,.expense-item{grid-template-columns:1fr!important;width:100%!important}
 .card{width:100%!important;padding:13px!important}
 .home-quick-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 .more-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
 .tabs{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;overflow:visible!important;width:100%!important}
 .tab{min-width:0!important;white-space:normal!important;padding:8px 4px!important;font-size:12px!important}
 .hotel-title{display:grid!important;grid-template-columns:1fr!important}
 .price{font-size:1.3rem!important;overflow-wrap:anywhere}
}

@media(max-width:430px){
 header .nav{grid-template-columns:repeat(3,minmax(0,1fr))!important}
 .tabs{grid-template-columns:repeat(3,minmax(0,1fr))!important}
 .home-quick-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
}
`;
document.head.appendChild(s)}
function bucharestDate(){try{return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Bucharest',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}catch(e){return''}}
function cleanPreTripLodging(){if(bucharestDate()>='2026-09-19')return;const panel=document.getElementById('homeSmartPanel');if(!panel)return;for(const card of [...panel.querySelectorAll('.home-smart-card')]){const h=card.querySelector('h3')?.textContent||'';if(h.includes('לינה'))card.remove()}panel.classList.add('pretrip-clean')}
function init(){inject();cleanPreTripLodging();setTimeout(cleanPreTripLodging,600);setTimeout(cleanPreTripLodging,1600);new MutationObserver(cleanPreTripLodging).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();