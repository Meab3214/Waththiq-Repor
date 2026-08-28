// V12 — activate supplied-reference visual system without generating image assets.
(function(){
 const q=s=>document.querySelector(s);
 const names={aurora:['الإطار التعليمي','إطار نباتي رسمي مستوحى من النموذج المرفق'],editorial:['توثيق النشاط','تقرير نشاط تعليمي منظم بعناوين شريطية ومؤشرات'],minimal:['الهوية الهادئة','إطار مفتوح أنيق بخطوط تركوازية وذهبية'],prism:['مسار التوثيق','تكوين رسمي بموجات وهوية ومسار مراحل'],impact:['النموذج الهندسي','تقرير حديث بإطارات هندسية وشواهد ومؤشرات']};
 Object.entries(names).forEach(([k,[a,b]])=>{const c=q(`input[name="theme"][value="${k}"]`)?.closest('.theme-card');if(c){const t=c.querySelector('strong'),s=c.querySelector('span');if(t)t.textContent=a;if(s)s.textContent=b;}});
 const badge=q('.side-intro .eyebrow');if(badge)badge.textContent='V12';document.title='توثيق — القوالب التعليمية V12';
 if(window.render)requestAnimationFrame(window.render);
})();