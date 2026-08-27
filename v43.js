// V4.3 — interaction layer
(function(){
 const tag=document.querySelector('.side-intro .eyebrow');if(tag)tag.textContent='V4.3';document.title='توثيق — صانع التقارير الذكي V4.3';
 // Theme cards: full-card touch interaction + selected state
 document.querySelectorAll('.theme-card').forEach(card=>{
   card.addEventListener('click',e=>{
     const r=card.querySelector('input[type=radio]');if(r){r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}));}
     document.querySelectorAll('.theme-card').forEach(c=>c.classList.toggle('selected',c===card));
   });
 });
 // Micro ripple feedback for main buttons
 document.addEventListener('pointerdown',e=>{
   const b=e.target.closest('button,.theme-card,.step-btn');if(!b)return;
   b.classList.add('is-pressed');setTimeout(()=>b.classList.remove('is-pressed'),160);
 });
 // Make image dropzone react to selected files and drag
 const dz=document.querySelector('.dropzone'); const picker=document.querySelector('#imagesInput');
 if(dz&&picker){
   ['dragenter','dragover'].forEach(n=>dz.addEventListener(n,e=>{e.preventDefault();dz.classList.add('dragging')}));
   ['dragleave','drop'].forEach(n=>dz.addEventListener(n,e=>{e.preventDefault();dz.classList.remove('dragging')}));
   picker.addEventListener('change',()=>{dz.classList.add('picked');setTimeout(()=>dz.classList.remove('picked'),700)});
 }
 // keep preview close reliable
 const close=document.querySelector('#closePreview');if(close)close.addEventListener('click',()=>document.body.classList.remove('preview-open'),true);
})();