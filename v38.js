// V3.8 — official supplied Ministry logo; cleaner report header/footer
(function(){
  const tag=document.querySelector('.side-intro .eyebrow'); if(tag) tag.textContent='V3.8';
  document.title='توثيق — صانع التقارير الذكي V3.8';
  const logoBox=document.querySelector('.upload-logo');
  if(logoBox){logoBox.innerHTML='<div><b>شعار وزارة التعليم</b><span>معتمد تلقائيًا من الشعار المرفق في النظام.</span></div><div id="logoPreview" class="logo-preview"><img src="./moe-logo-official.png" alt="شعار وزارة التعليم"></div>';}
  logo='./moe-logo-official.png';
  const baseRender=render;
  render=function(){
    baseRender();
    const preview=document.querySelector('#reportPreview'); if(!preview)return;
    preview.querySelectorAll('.r-brand-row .r-type,.r-kicker').forEach(el=>el.remove());
    preview.querySelectorAll('.r-brand-row img').forEach(img=>{img.src='./moe-logo-official.png';img.alt='شعار وزارة التعليم';});
    preview.querySelectorAll('.r-footer span').forEach(el=>{if(el.textContent.trim()==='توثيق'||el.textContent.includes('صانع التقارير الذكي'))el.remove();});
  };
  form.addEventListener('input',render);form.addEventListener('change',render);
  render();
})();