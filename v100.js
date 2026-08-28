// V10 visual polish layer. Runs after V9 renderer and adds premium report-only decoration hooks.
(function(){
  const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
  const oldRender=window.render;
  function decorate(){
    const sheet=q('.v9-sheet'); if(!sheet)return;
    sheet.classList.add('v10-visual');
    qa('.v9-sheet h2').forEach((h,i)=>{h.dataset.section=String(i+1).padStart(2,'0')});
    qa('.v9-sheet .v9-facts>div').forEach((x,i)=>x.style.setProperty('--i',i));
    qa('.v9-sheet .v9-kpis>div').forEach((x,i)=>x.style.setProperty('--i',i));
    qa('.v9-sheet section').forEach(x=>x.setAttribute('data-v10','section'));
  }
  if(typeof oldRender==='function')window.render=function(){oldRender();requestAnimationFrame(decorate)};
  const badge=q('.side-intro .eyebrow');if(badge)badge.textContent='V10';
  document.title='توثيق — صانع التقارير الذكي V10';
  setTimeout(()=>{ if(typeof window.render==='function')window.render(); },80);
})();