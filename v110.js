// V11 reference-inspired visual decorator. Keeps V9 data/render logic and enriches each page after render.
(function(){
  'use strict';
  const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
  function add(parent,cls){if(!parent||parent.querySelector('.'+cls.split(' ').join('.')))return;const el=document.createElement('span');el.className=cls;el.setAttribute('aria-hidden','true');parent.appendChild(el)}
  function decorate(){
    const sheet=q('.v9-sheet');if(!sheet)return;
    sheet.classList.add('v11-visual');
    add(sheet,'v11-botanical a');add(sheet,'v11-botanical b');add(sheet,'v11-hex a');add(sheet,'v11-hex b');
    qa('.v9-sheet h2').forEach((h,i)=>h.dataset.section=String(i+1).padStart(2,'0'));
    qa('.v9-sheet .v9-gallery figure').forEach((f,i)=>f.dataset.photo=String(i+1).padStart(2,'0'));
    qa('.v9-sheet .v9-kpis>div,.v9-sheet .v9-rings>div').forEach((x,i)=>x.style.setProperty('--order',i));
  }
  const base=window.render;
  if(typeof base==='function'){
    window.render=function(){base();requestAnimationFrame(decorate)};
  }
  const labels={
    aurora:['الإطار المؤسسي','هوية خضراء وذهبية بإطار نباتي رسمي'],
    editorial:['بطاقة الأثر','مؤشرات تعليمية داخل تكوين رسمي متوازن'],
    minimal:['التقرير التحريري','مساحات أنيقة وفواصل راقية وهوية بصرية هادئة'],
    prism:['مسار الإنجاز','رحلة مرئية مترابطة من الهدف إلى الأثر'],
    impact:['التدفق التعليمي','موجات حديثة وبيانات وصور في تكوين واحد']
  };
  Object.entries(labels).forEach(([key,[name,desc]])=>{const card=q(`input[name="theme"][value="${key}"]`)?.closest('.theme-card');if(card){card.style.position='relative';const strong=card.querySelector('strong'),span=card.querySelector('span');if(strong)strong.textContent=name;if(span)span.textContent=desc;card.dataset.template=key}});
  const badge=q('.side-intro .eyebrow');if(badge)badge.textContent='V11';
  document.title='توثيق — قوالب تقارير تعليمية احترافية V11';
  setTimeout(()=>{if(typeof window.render==='function')window.render()},100);
})();