// V3.6 — adaptive gallery markup
(function(){
  const tag=document.querySelector('.side-intro .eyebrow');if(tag)tag.textContent='V3.6';document.title='وثّق — صانع التقارير الذكي V3.6';
  const oldRender=render;
  render=function(){
    oldRender();
    const report=document.querySelector('#reportPreview');
    if(!report)return;
    const gallery=report.querySelector('.poster-gallery');
    if(gallery){
      gallery.className=`poster-gallery count-${Math.min(images.length,15)}`;
      gallery.querySelectorAll('figure').forEach((fig,i)=>{
        const img=fig.querySelector('img');
        if(img && !fig.querySelector('.photo-wrap')){
          const wrap=document.createElement('div');wrap.className='photo-wrap';
          img.parentNode.insertBefore(wrap,img);wrap.appendChild(img);
        }
        fig.setAttribute('data-index',String(i+1));
      });
    }
  };
  form.addEventListener('input',()=>render());form.addEventListener('change',()=>render());
  render();
})();
