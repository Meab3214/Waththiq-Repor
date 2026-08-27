// V3.8 — one A4 page, supplied Ministry logo, cleaner report header
(function(){
  const brand=document.querySelector('.brand');
  if(brand) brand.innerHTML='<span class="brand-mark">ت</span><div><strong>توثيق</strong><small>صانع التقارير الذكي</small></div>';
  const tag=document.querySelector('.side-intro .eyebrow'); if(tag) tag.textContent='V3.8';
  const h=document.querySelector('.side-intro h1'); if(h) h.textContent='صمّم تقرير برنامج احترافي في صفحة واحدة.';
  document.title='توثيق — صانع التقارير الذكي V3.8';
  const logoBox=document.querySelector('.upload-logo'); if(logoBox){
    logoBox.innerHTML='<div><b>شعار وزارة التعليم</b><span>مرفق تلقائيًا في جميع التقارير.</span></div><div id="logoPreview" class="logo-preview"><img src="./moe-logo-official.png" alt="شعار وزارة التعليم"></div>';
  }
  logo='./moe-logo-official.png';

  function filled(n){const v=val(n); return v!==''&&v!==null&&v!==undefined;}
  function eText(t){return esc(t).replace(/\n/g,'<br>');}
  function listItems(t){return lines(t).map((x,i)=>`<div class="r-list-item"><i>${i+1}</i><span>${esc(x)}</span></div>`).join('');}
  function section(title,body,cls=''){return body?`<section class="r-section ${cls}"><div class="r-section-title"><span>${esc(title)}</span></div>${body}</section>`:'';}
  function factCards(){
    const arr=[];
    [['date','تاريخ التنفيذ'],['duration','مدة التنفيذ'],['audience','الفئة المستهدفة'],['location','مكان التنفيذ'],['department','القسم / الوحدة']].forEach(([n,l])=>{if(filled(n))arr.push([l,val(n)]);});
    return arr.length?`<div class="r-facts">${arr.map(([l,v])=>`<div><small>${l}</small><b>${esc(v)}</b></div>`).join('')}</div>`:'';
  }
  function statsData(){
    const s=[];
    [['students','الطلاب',false],['femaleStudents','الطالبات',false],['teachers','المعلمون',false],['femaleTeachers','المعلمات',false],['beneficiaries','المستفيدون',false],['attendance','الحضور',true],['satisfaction','الرضا',true],['activities','الأنشطة',false],['target','المستهدف',false],['achieved','المتحقق',false]].forEach(([n,l,p])=>{if(filled(n)&&num(n)>0)s.push({l,v:num(n),p});});
    $$('.metric-name').forEach((m,i)=>{const v=Number($$('.metric-value')[i]?.value)||0;if(m.value.trim()&&v>0)s.push({l:m.value.trim(),v,p:false});});
    return s;
  }
  function statsHtml(){
    const s=statsData(); if(!s.length)return'';
    const max=Math.max(...s.filter(x=>!x.p).map(x=>x.v),1);
    const cards=s.slice(0,6).map(x=>{const pct=x.p?Math.min(100,x.v):Math.min(100,Math.max(14,Math.round(x.v/max*100)));return `<div class="r-stat"><div class="r-ring" style="--p:${pct}"><strong>${x.v}${x.p?'%':''}</strong></div><span>${esc(x.l)}</span></div>`;}).join('');
    const bars=s.filter(x=>!x.p).slice(0,6).map(x=>`<div class="r-bar"><span>${esc(x.l)}</span><i><em style="width:${Math.max(6,Math.round(x.v/max*100))}%"></em></i><b>${x.v}</b></div>`).join('');
    return `<div class="r-stats">${cards}</div>${bars?`<div class="r-bars">${bars}</div>`:''}`;
  }
  function galleryHtml(){
    if(!images.length)return'';
    const n=images.length;
    return `<div class="r-gallery count-${n}">${images.map((im,i)=>`<figure><div class="photo-frame"><img src="${im.src}" alt="شاهد ${i+1}"></div>${im.caption?`<figcaption><i>${String(i+1).padStart(2,'0')}</i><span>${esc(im.caption)}</span></figcaption>`:''}</figure>`).join('')}</div>`;
  }
  function fitPage(){
    const sheet=document.querySelector('.report-sheet'),inner=document.querySelector('.report-inner'); if(!sheet||!inner)return;
    inner.style.transform='scale(1)'; inner.style.width='100%';
    requestAnimationFrame(()=>{
      const maxH=1123, h=inner.scrollHeight;
      const scale=Math.min(1,(maxH-2)/h);
      inner.style.transform=`scale(${scale})`;
      inner.style.width=`${100/scale}%`;
      sheet.dataset.fit=scale.toFixed(3);
    });
  }
  function buildContent(){
    let blocks='';
    if(filled('generalGoal')) blocks+=section('الهدف العام',`<div class="r-lead">${eText(val('generalGoal'))}</div>`,'goal');
    if(filled('goals')) blocks+=section('الأهداف',`<div class="r-list">${listItems(val('goals'))}</div>`,'goals');
    if(filled('execution')) blocks+=section('آلية التنفيذ',`<div class="r-copy">${eText(val('execution'))}</div>`,'execution');
    const sh=statsHtml(); if(sh) blocks+=section('الأثر بالأرقام',sh,'stats');
    if(filled('results')) blocks+=section('النتائج والأثر',`<div class="r-copy">${eText(val('results'))}</div>`,'results');
    if(filled('recommendations')) blocks+=section('التوصيات',`<div class="r-list">${listItems(val('recommendations'))}</div>`,'recommendations');
    const gh=galleryHtml(); if(gh) blocks+=section('الشواهد المصورة',gh,'evidence');
    return blocks;
  }
  render=function(){
    const theme=form.elements.theme?.value||'aurora';
    const title=filled('title')?val('title'):'تقرير برنامج';
    const org=[filled('authority')?val('authority'):'',filled('school')?val('school'):''].filter(Boolean);
    const facts=factCards();
    const sign=[]; if(filled('executor')) sign.push(`<span><small>منفذ البرنامج</small><b>${esc(val('executor'))}${filled('jobTitle')?` — ${esc(val('jobTitle'))}`:''}</b></span>`); if(filled('approver')) sign.push(`<span><small>الاعتماد</small><b>${esc(val('approver'))}</b></span>`);
    $('#reportPreview').className=`report theme-${theme}`; $('#reportPreview').style.transform=`scale(${zoom})`;
    $('#reportPreview').innerHTML=`<section class="report-sheet"><div class="report-inner"><header class="r-hero"><div class="r-brand-row"><img class="official-moe-logo" src="./moe-logo-official.png" alt="شعار وزارة التعليم"></div><div class="r-title-wrap"><h1>${esc(title)}</h1>${org.length?`<p>${org.map(esc).join(' • ')}</p>`:''}</div></header><main class="r-body">${facts}${buildContent()}${sign.length?`<div class="r-signatures">${sign.join('')}</div>`:''}<footer class="r-footer"><span>${esc(filled('school')?val('school'):(filled('authority')?val('authority'):'وزارة التعليم'))}</span></footer></main></div></section>`;
    const official=$('#reportPreview .official-moe-logo'); if(official){official.style.filter='none';official.style.width='110px';official.style.height='auto';}
    $('#zoomText').textContent=Math.round(zoom*100)+'%';
    fitPage();
  };
  form.addEventListener('input',render);form.addEventListener('change',render);
  window.addEventListener('beforeprint',()=>{const old=zoom;zoom=1;render();setTimeout(()=>{zoom=old;},50)});
  render();
})();