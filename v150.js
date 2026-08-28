// V15 — final labels for the five supplied-reference report templates.
(function(){
 const q=s=>document.querySelector(s);
 const names={
  aurora:['الإطار النباتي الرسمي','إطار مزدوج وموجات وزخارف نباتية تركوازية وذهبية'],
  editorial:['توثيق النشاط التعليمي','تقسيم مرئي للأهداف والوصف والنتائج والمؤشرات والشواهد'],
  minimal:['الإطار الهادئ المفتوح','مساحات بيضاء واسعة وخطوط منحنية وهوية راقية'],
  prism:['مسار التوثيق','موجات وهوية مركزية ومسار تنفيذ ونتائج مترابط'],
  impact:['النموذج الهندسي','تكوين حديث بإطارات هندسية ومؤشرات وشواهد واضحة']
 };
 Object.entries(names).forEach(([k,[a,b]])=>{const c=q(`input[name="theme"][value="${k}"]`)?.closest('.theme-card');if(c){const t=c.querySelector('strong'),s=c.querySelector('span');if(t)t.textContent=a;if(s)s.textContent=b;}});
 const badge=q('.side-intro .eyebrow');if(badge)badge.textContent='V15';
 document.title='توثيق — القوالب التعليمية V15';
 if(window.render)requestAnimationFrame(window.render);
})();