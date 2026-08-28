// V13 — reference-faithful selector labels and immediate refresh.
(function(){
 const q=s=>document.querySelector(s);
 const names={
  aurora:['الإطار التعليمي النباتي','إطار رسمي تركوازي وذهبي مستوحى من النموذج المرفق الأول'],
  editorial:['توثيق النشاط التعليمي','توزيع معلومات وأهداف ونتائج وشواهد مثل نموذج النشاط المرفق'],
  minimal:['الهوية الهادئة','إطار مفتوح أنيق ومتنفس بخطوط تركوازية وذهبية'],
  prism:['مسار التوثيق الرسمي','موجات وهوية مركزية ومسار مراحل متصل'],
  impact:['النموذج الهندسي الحديث','تقسيمات هندسية واضحة للمؤشرات والشواهد والنتائج']
 };
 Object.entries(names).forEach(([k,[a,b]])=>{
  const card=q(`input[name="theme"][value="${k}"]`)?.closest('.theme-card');
  if(card){const t=card.querySelector('strong'),s=card.querySelector('span');if(t)t.textContent=a;if(s)s.textContent=b;}
 });
 const badge=q('.side-intro .eyebrow'); if(badge) badge.textContent='V13';
 document.title='توثيق — القوالب التعليمية V13';
 if(window.render) requestAnimationFrame(window.render);
})();