(()=>{
'use strict';
function apply(){
  if(typeof D==='undefined'||!Array.isArray(D)||D.length<4)return;
  D[1]={n:'ראשון · פרדיאל · יום כיפור',note:'יום כיפור — נשארים במלון.',s:[['Hotel Orizont Predeal',45.503,25.578,'','נשארים במלון · יום כיפור']]};
  D[2]={n:'שני · פרדיאל',note:'',s:[['Hotel Orizont Predeal',45.503,25.578,'','מלון']]};
  D[3]={n:'שלישי · פרדיאל',note:'',s:[['Hotel Orizont Predeal',45.503,25.578,'','מלון']]};
  try{localStorage.removeItem('romania-itinerary-v3')}catch(e){}
  try{window.renderHome?.()}catch(e){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(apply,350));else setTimeout(apply,350);
window.addEventListener('load',()=>setTimeout(apply,600));
})();