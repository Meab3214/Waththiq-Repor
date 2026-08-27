// V5 — interactive report emphasis + balanced composition
(function(){
 const $q=s=>document.querySelector(s),$qa=s=>[...document.querySelectorAll(s)];
 function enhance(){
  const sheet=$q('.premium-sheet');if(!sheet)return;
  const sections=$qa('.p-section');sections.forEach((el,i)=>{el.style.setProperty('--delay',`${i*25}ms`);el.tabIndex=0;el.setAttribute('role','group');});
  $qa('.p-stat').forEach((el,i)=>{el.tabIndex=0;el.setAttribute('title','مؤشر تفاعلي — اضغط لإبرازه');el.addEventListener('click',()=>{const on=el.classList.contains('is-active');$qa('.p-stat').forEach(x=>x.classList.remove('is-active'));if(!on)el.classList.add('is-active')},{once:false})});
  $qa('.p-bullet').forEach(el=>{el.tabIndex=0;el.addEventListener('click',()=>el.classList.toggle('is-active'))});
  const content=$q('.premium-content');if(content){let visible=sections.filter(x=>x.offsetParent!==null).length;content.dataset.density=visible<=3?'light':visible<=6?'medium':'dense'}
 }
 const oldRender=window.render;
 if(typeof oldRender==='function')window.render=function(){oldRender();requestAnimationFrame(enhance)};
 document.addEventListener('click',e=>{const card=e.target.closest('.theme-card');if(card){$qa('.theme-card').forEach(x=>x.classList.remove('selected'));card.classList.add('selected');const r=card.querySelector('input[type=radio]');if(r&&!r.checked){r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}))}}});
 const css=document.createElement('style');css.textContent=`
 .p-section{transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}.p-section:focus-visible{outline:2px solid var(--a);outline-offset:2px}.p-stat,.p-bullet{cursor:pointer;transition:transform .18s ease,filter .18s ease}.p-stat.is-active{transform:translateY(-3px) scale(1.035);filter:saturate(1.15);outline:2px solid var(--a);outline-offset:2px}.p-bullet.is-active{font-weight:700}.p-bullet.is-active i{transform:scale(1.12)}
 @media(hover:hover){.p-section:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(14,74,66,.12)!important}.p-stat:hover{transform:translateY(-2px)}}
 @media print{.p-section,.p-stat,.p-bullet{transform:none!important;outline:0!important}}
 `;document.head.appendChild(css);
 requestAnimationFrame(enhance);
})();