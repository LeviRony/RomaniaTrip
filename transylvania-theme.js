(()=>{
'use strict';
function inject(){if(document.getElementById('transylvaniaTheme'))return;const s=document.createElement('style');s.id='transylvaniaTheme';s.textContent=`
/* Transylvania palette — intentionally does not recolor the top header/navigation */
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
/* Preserve existing header, menu and home hero colors exactly as defined by the original theme */
`;
document.head.appendChild(s)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject);else inject();
})();