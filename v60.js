// V6 — five genuinely different educational infographic renderers for Tawtheeq
(function(){
  const formEl=document.querySelector('#reportForm');
  if(!formEl) return;
  const $q=s=>document.querySelector(s), $qa=s=>[...document.querySelectorAll(s)];
  const get=n=>String(formEl.elements[n]?.value||'').trim();
  const has=n=>!!get(n);
  const nval=n=>Number(get(n))||0;
  const esc2=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const rows=s=>String(s||'').split(/\n+/).map(x=>x.trim()).filter(Boolean);
  const title=()=>get('title')||'عنوان التقرير';
  const school=()=>get('school')||'';
  const logo=()=>'<img class="v6-moe" src="./moe-logo.svg?v=60" alt="وزارة التعليم">';
  const person=()=> (has('jobTitle')||has('executor')) ? `<div class="v6-person">${has('jobTitle')?`<span>${esc2(get('jobTitle'))}</span>`:''}${has('executor')?`<b>${esc2(get('executor'))}</b>`:''}</div>`:'';
  const identity=()=>`<div class="v6-id">${logo()}<div>${has('authority')?`<small>${esc2(get('authority'))}</small>`:''}${school()?`<strong>${esc2(school())}</strong>`:''}</div></div>`;
  const facts=()=>[['date','التاريخ'],['duration','المدة'],['audience','الفئة المستهدفة'],['location','المكان'],['department','القسم / الوحدة']].filter(([k])=>has(k)).map(([k,l])=>({l,v:get(k)}));
  const metrics=()=>{
    const out=[];
    [['beneficiaries','المستفيدون',''],['attendance','الحضور','%'],['satisfaction','الرضا','%'],['activities','الأنشطة',''],['students','الطلاب',''],['femaleStudents','الطالبات',''],['teachers','المعلمون',''],['femaleTeachers','المعلمات',''],['target','المستهدف',''],['achieved','المتحقق','']].forEach(([k,l,u])=>{if(has(k)&&nval(k)>0)out.push({l,v:nval(k),u})});
    $qa('.metric-name').forEach((m,i)=>{const name=m.value.trim(), value=Number($qa('.metric-value')[i]?.value)||0;if(name&&value>0)out.push({l:name,v:value,u:''})});
    if(nval('target')>0 && has('achieved')) out.push({l:'نسبة التحقق',v:Math.min(100,Math.round(nval('achieved')/nval('target')*100)),u:'%'});
    return out.slice(0,8);
  };
  const bulletItems=(txt,cls='')=>rows(txt).map((x,i)=>`<div class="v6-bullet ${cls}"><i>${String(i+1).padStart(2,'0')}</i><span>${esc2(x)}</span></div>`).join('');
  const metricCards=(kind='cards')=>{const m=metrics();if(!m.length)return'';return `<div class="v6-metrics ${kind}">${m.map((x,i)=>`<div class="v6-metric m${i}" tabindex="0"><strong>${x.v}${x.u}</strong><span>${esc2(x.l)}</span>${x.u==='%'?`<em style="--p:${Math.max(0,Math.min(100,x.v))}"></em>`:''}</div>`).join('')}</div>`};
  const factsHtml=(kind='strip')=>{const f=facts();if(!f.length)return'';return `<div class="v6-facts ${kind}">${f.map(x=>`<div><small>${x.l}</small><b>${esc2(x.v)}</b></div>`).join('')}</div>`};
  const gallery=(kind='grid')=>{if(!window.images?.length)return'';return `<div class="v6-gallery ${kind} n${window.images.length}">${window.images.map((im,i)=>`<figure><img src="${im.src}" alt="شاهد ${i+1}">${im.caption?`<figcaption>${esc2(im.caption)}</figcaption>`:''}</figure>`).join('')}</div>`};
  const approval=()=>has('approver')?`<div class="v6-approval"><small>الاعتماد</small><b>${esc2(get('approver'))}</b></div>`:'';
  const brand=()=>`<div class="v6-brand"><b>توثيق</b><span>هوية تعليمية للتقارير</span></div>`;
  const section=(cls,head,body)=>body?`<section class="v6-sec ${cls}"><h2>${head}</h2>${body}</section>`:'';
  const textP=n=>has(n)?`<p>${esc2(get(n)).replace(/\n/g,'<br>')}</p>`:'';

  function templateMasar(){
    return `<article class="v6-sheet t-masar"><div class="v6-ribbon"></div><header>${identity()}${brand()}</header><div class="masar-hero"><div><span>تقرير تعليمي موثق</span><h1>${esc2(title())}</h1>${person()}</div>${metricCards('hero-kpis')}</div>${factsHtml('rail')}<main class="masar-flow">${section('goal','الهدف العام',textP('generalGoal'))}${has('goals')?section('goals','الأهداف',`<div class="v6-bullets">${bulletItems(get('goals'))}</div>`):''}${section('exec','آلية التنفيذ',textP('execution'))}${section('results','النتائج والأثر',textP('results'))}${has('recommendations')?section('recs','التوصيات',`<div class="v6-bullets">${bulletItems(get('recommendations'),'compact')}</div>`):''}${window.images?.length?section('evidence','الشواهد المصورة',gallery('mosaic')):''}</main><footer>${approval()}${school()?`<span>${esc2(school())}</span>`:''}</footer></article>`;
  }

  function templateAthar(){
    return `<article class="v6-sheet t-athar"><header class="athar-head"><div>${identity()}${person()}</div><div class="athar-title"><small>لوحة أثر تعليمية</small><h1>${esc2(title())}</h1></div></header><div class="athar-dashboard">${metricCards('rings')}${factsHtml('chips')}</div><main class="athar-body"><div class="athar-left">${has('goals')?section('goals','ماذا نستهدف؟',bulletItems(get('goals'),'line')):''}${section('exec','كيف نُفّذ؟',textP('execution'))}</div><div class="athar-center">${section('goal','الهدف المحوري',textP('generalGoal'))}${section('results','الأثر المتحقق',textP('results'))}</div><div class="athar-right">${window.images?.length?section('evidence','شواهد الأثر',gallery('stack')):''}${has('recommendations')?section('recs','خطوات تالية',bulletItems(get('recommendations'),'mini')):''}</div></main><footer>${brand()}${approval()}</footer></article>`;
  }

  function templateRiwaya(){
    return `<article class="v6-sheet t-riwaya"><header>${identity()}<div class="riwaya-mark">توثيق التعليم</div></header><div class="riwaya-title"><small>${esc2(get('reportType')||'تقرير تعليمي')}</small><h1>${esc2(title())}</h1>${person()}</div>${factsHtml('editorial')}<main class="riwaya-grid"><div class="riwaya-story">${section('goal','الفكرة والهدف',textP('generalGoal'))}${section('exec','قصة التنفيذ',textP('execution'))}${section('results','ما الذي تحقق؟',textP('results'))}</div><aside>${metricCards('editorial-kpis')}${has('goals')?section('goals','أهداف مختصرة',bulletItems(get('goals'),'dot')):''}</aside>${window.images?.length?`<div class="riwaya-photos">${gallery('editorial-gallery')}</div>`:''}${has('recommendations')?section('recs full','التوصيات',bulletItems(get('recommendations'),'horizontal')):''}</main><footer>${brand()}${approval()}</footer></article>`;
  }

  function templateBasma(){
    const f=facts();
    return `<article class="v6-sheet t-basma"><div class="basma-orbit"></div><header>${brand()}${identity()}</header><div class="basma-hero"><div class="basma-num">${metrics()[0]?`${metrics()[0].v}${metrics()[0].u}`:'01'}</div><div><small>بصمة تعليمية موثقة</small><h1>${esc2(title())}</h1>${person()}</div></div><div class="basma-facts">${f.map((x,i)=>`<div><i>${i+1}</i><span><small>${x.l}</small><b>${esc2(x.v)}</b></span></div>`).join('')}</div><main class="basma-path">${has('generalGoal')?`<div class="node n1"><span>01</span>${section('goal','الهدف',textP('generalGoal'))}</div>`:''}${has('goals')?`<div class="node n2"><span>02</span>${section('goals','الأهداف',bulletItems(get('goals'),'mini'))}</div>`:''}${has('execution')?`<div class="node n3"><span>03</span>${section('exec','التنفيذ',textP('execution'))}</div>`:''}${metrics().length?`<div class="node n4"><span>04</span>${metricCards('bubbles')}</div>`:''}${has('results')?`<div class="node n5"><span>05</span>${section('results','الأثر',textP('results'))}</div>`:''}${window.images?.length?`<div class="node n6 photos"><span>06</span>${gallery('tiles')}</div>`:''}</main>${has('recommendations')?section('recs basma-recs','التوصيات',bulletItems(get('recommendations'),'horizontal')):''}<footer>${approval()}${school()?`<b>${esc2(school())}</b>`:''}</footer></article>`;
  }

  function templateManara(){
    return `<article class="v6-sheet t-manara"><header><div class="manara-brand">${brand()}<span class="manara-line"></span></div>${identity()}</header><div class="manara-hero"><div><small>ملخص تعليمي بصري</small><h1>${esc2(title())}</h1>${person()}</div>${factsHtml('vertical')}</div><main class="manara-layout"><div class="manara-primary">${section('goal','الهدف العام',textP('generalGoal'))}${window.images?.length?gallery('feature'):''}</div><div class="manara-secondary">${has('goals')?section('goals','الأهداف',bulletItems(get('goals'),'clean')):''}${metricCards('bars')}${section('exec','التنفيذ',textP('execution'))}${section('results','النتائج والأثر',textP('results'))}</div>${has('recommendations')?section('recs wide','التوصيات',bulletItems(get('recommendations'),'horizontal')):''}</main><footer>${school()?`<span>${esc2(school())}</span>`:''}${approval()}${brand()}</footer></article>`;
  }

  const registry={aurora:templateMasar,editorial:templateAthar,minimal:templateRiwaya,prism:templateBasma,impact:templateManara};
  function fit(){const sh=$q('.v6-sheet');if(!sh)return;sh.style.setProperty('--fit','1');requestAnimationFrame(()=>{const max=1123, h=sh.scrollHeight;if(h>max){const s=Math.max(.72,Math.min(1,max/h));sh.style.setProperty('--fit',s.toFixed(3));sh.classList.toggle('v6-dense',s<.9)}})}
  window.render=function(){
    const theme=formEl.elements.theme?.value||'aurora';
    const fn=registry[theme]||templateMasar;
    const preview=$q('#reportPreview'); if(!preview)return;
    preview.className=`report v6-report theme-${theme}`;
    preview.style.transform=`scale(${window.zoom||.72})`;
    preview.innerHTML=fn();
    const z=$q('#zoomText');if(z)z.textContent=Math.round((window.zoom||.72)*100)+'%';
    fit();
  };

  const badge=document.querySelector('.side-intro .eyebrow');if(badge)badge.textContent='V6';
  document.title='توثيق — صانع التقارير الذكي V6';
  const cards=[
    ['aurora','مسار توثيق','تدفق إنفوجرافيك تعليمي مترابط'],
    ['editorial','أثر التعليم','مؤشرات ونتائج في تكوين بصري تحليلي'],
    ['minimal','رواية تعليمية','تقرير تحريري بصري يروي التنفيذ والأثر'],
    ['prism','بصمة الإنجاز','مسار مرقّم يربط الهدف بالتنفيذ والنتيجة'],
    ['impact','منارة توثيق','تكوين تعليمي مرن يوازن النص والصور والبيانات']
  ];
  cards.forEach(([v,name,desc])=>{const c=document.querySelector(`.theme-card input[value="${v}"]`)?.closest('.theme-card');if(c){const s=c.querySelector('strong'),p=c.querySelector('span');if(s)s.textContent=name;if(p)p.textContent=desc}});
  formEl.addEventListener('input',()=>requestAnimationFrame(window.render));
  formEl.addEventListener('change',()=>requestAnimationFrame(window.render));
  document.addEventListener('click',e=>{const m=e.target.closest('.v6-metric');if(m){document.querySelectorAll('.v6-metric.active').forEach(x=>x!==m&&x.classList.remove('active'));m.classList.toggle('active')}});
  setTimeout(window.render,50);
})();