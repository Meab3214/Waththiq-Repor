// V5 bridge — keeps existing interaction layer, then loads V6 educational infographic engine
(function(){
 const $q=s=>document.querySelector(s),$qa=s=>[...document.querySelectorAll(s)];
 function enhance(){
  const sheet=$q('.premium-sheet');if(!sheet)return;
  const sections=$qa('.p-section');sections.forEach((el,i)=>{el.style.setProperty('--delay',`${i*25}ms`);el.tabIndex=0;el.setAttribute('role','group');});
  $qa('.p-stat').forEach(el=>{el.tabIndex=0;el.setAttribute('title','مؤشر تفاعلي — اضغط لإبرازه');el.addEventListener('click',()=>{const on=el.classList.contains('is-active');$qa('.p-stat').forEach(x=>x.classList.remove('is-active'));if(!on)el.classList.add('is-active')})});
  $qa('.p-bullet').forEach(el=>{el.tabIndex=0;el.addEventListener('click',()=>el.classList.toggle('is-active'))});
 }
 const oldRender=window.render;
 if(typeof oldRender==='function')window.render=function(){oldRender();requestAnimationFrame(enhance)};
 document.addEventListener('click',e=>{const card=e.target.closest('.theme-card');if(card){$qa('.theme-card').forEach(x=>x.classList.remove('selected'));card.classList.add('selected');const r=card.querySelector('input[type=radio]');if(r&&!r.checked){r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}))}}});
 const css=document.createElement('style');css.textContent=`.p-section{transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}.p-stat,.p-bullet{cursor:pointer}.p-stat.is-active{transform:translateY(-3px) scale(1.035)}@media print{.p-section,.p-stat,.p-bullet{transform:none!important;outline:0!important}}`;document.head.appendChild(css);

 // Load the new V6 design system last so it becomes the active report engine.
 if(!document.querySelector('link[href*="v60.css"]')){
  const l=document.createElement('link');l.rel='stylesheet';l.href='./v60.css?v=60';document.head.appendChild(l);
 }
 if(!document.querySelector('script[src*="v60.js"]')){
  const s=document.createElement('script');s.src='./v60.js?v=60';s.defer=false;document.body.appendChild(s);
 }
})();