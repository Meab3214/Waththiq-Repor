// V3.5 — one coherent infographic report, conditional sections, richer participation stats
(function(){
  const css=document.createElement('link');css.rel='stylesheet';css.href='./v35.css';document.head.appendChild(css);
  const tag=document.querySelector('.side-intro .eyebrow');if(tag)tag.textContent='V3.5';document.title='وثّق — صانع التقارير الذكي V3.5';
  const statStep=document.querySelector('.form-step[data-step="3"] .grid.two');
  if(statStep && !form.elements.students){
    statStep.insertAdjacentHTML('beforeend',`<label>عدد الطلاب<input name="students" type="number" min="0" placeholder="0"></label><label>عدد الطالبات<input name="femaleStudents" type="number" min="0" placeholder="0"></label><label>عدد المعلمين<input name="teachers" type="number" min="0" placeholder="0"></label><label>عدد المعلمات<input name="femaleTeachers" type="number" min="0" placeholder="0"></label>`);
  }
  function filled(n){const v=val(n);return v!==''&&v!==null&&v!==undefined}
  function textBlock(t){return esc(t).replace(/\n/g,'<br>')}
  function items(t){return lines(t).map((x,i)=>`<div class="poster-item"><i>${String(i+1).padStart(2,'0')}</i><span>${esc(x)}</span></div>`).join('')}
  function sectionTitle(t){return `<div class="poster-section-title"><b>${esc(t)}</b><i></i></div>`}
  function facts(){
    const f=[];
    [['date','تاريخ التنفيذ'],['duration','مدة التنفيذ'],['audience','الفئة المستهدفة'],['location','مكان التنفيذ'],['department','القسم / الوحدة']].forEach(([n,l])=>{if(filled(n))f.push([l,val(n)])});
    return f.length?`<section class="poster-section">${sectionTitle('بيانات البرنامج')}<div class="poster-facts">${f.map(([l,v])=>`<div class="poster-fact"><small>${l}</small><b>${esc(v)}</b></div>`).join('')}</div></section>`:'';
  }
  function narrative(){
    let out='';
    if(filled('generalGoal'))out+=`<section class="poster-section">${sectionTitle('الهدف العام')}<div class="poster-lead">${textBlock(val('generalGoal'))}</div></section>`;
    const goals=filled('goals'),execution=filled('execution');
    if(goals||execution)out+=`<section class="poster-section"><div class="poster-grid">${goals?`<div class="poster-card emphasis"><h3>الأهداف</h3><div class="poster-list">${items(val('goals'))}</div></div>`:''}${execution?`<div class="poster-card"><h3>آلية التنفيذ</h3><p>${textBlock(val('execution'))}</p></div>`:''}</div></section>`;
    return out;
  }
  function statsData(){
    const rows=[];
    [['students','الطلاب'],['femaleStudents','الطالبات'],['teachers','المعلمون'],['femaleTeachers','المعلمات'],['beneficiaries','المستفيدون'],['attendance','الحضور %'],['satisfaction','الرضا %'],['activities','الأنشطة / المحاور'],['target','المستهدف'],['achieved','المتحقق']].forEach(([n,l])=>{if(filled(n)&&num(n)>0)rows.push({n,l,v:num(n),percent:['attendance','satisfaction'].includes(n)})});
    $$('.metric-name').forEach((e,i)=>{const v=Number($$('.metric-value')[i]?.value)||0;if(e.value.trim()&&v>0)rows.push({n:'custom',l:e.value.trim(),v,percent:false})});
    return rows;
  }
  function stats(){
    const s=statsData();if(!s.length)return'';
    const max=Math.max(...s.filter(x=>!x.percent).map(x=>x.v),100);
    const cards=s.slice(0,6).map(x=>{const p=x.percent?Math.min(100,x.v):Math.min(100,Math.round(x.v/max*100));return `<div class="poster-stat"><div class="stat-ring" style="--p:${p}"><strong>${x.v}${x.percent?'%':''}</strong></div><span>${esc(x.l.replace(' %',''))}</span></div>`}).join('');
    const bars=s.filter(x=>!x.percent).slice(0,8).map(x=>`<div class="poster-bar"><span>${esc(x.l)}</span><i><em style="width:${Math.max(5,Math.min(100,Math.round(x.v/max*100)))}%"></em></i><b>${x.v}</b></div>`).join('');
    return `<section class="poster-section">${sectionTitle('الأثر بالأرقام')}<div class="poster-stats">${cards}</div>${bars?`<div class="poster-bars">${bars}</div>`:''}</section>`;
  }
  function outcomes(){
    const r=filled('results'),rec=filled('recommendations');if(!r&&!rec)return'';
    return `<section class="poster-section">${sectionTitle('النتائج والتوصيات')}<div class="poster-grid">${r?`<div class="poster-card"><h3>النتائج والأثر</h3><p>${textBlock(val('results'))}</p></div>`:''}${rec?`<div class="poster-card emphasis"><h3>التوصيات</h3><div class="poster-list">${items(val('recommendations'))}</div></div>`:''}</div></section>`;
  }
  function gallery(){
    if(!images.length)return'';
    const cls=images.length===1?'one':images.length===3?'three':'';
    return `<section class="poster-section">${sectionTitle('الشواهد المصورة')}<div class="poster-gallery ${cls}">${images.map((im,i)=>`<figure><img src="${im.src}"><figcaption><i>${String(i+1).padStart(2,'0')}</i><span>${esc(im.caption||'شاهد من تنفيذ البرنامج')}</span></figcaption></figure>`).join('')}</div></section>`;
  }
  function signatures(){
    const a=[];if(filled('executor'))a.push(`<span>منفذ البرنامج<br><b>${esc(val('executor'))}${filled('jobTitle')?` — ${esc(val('jobTitle'))}`:''}</b></span>`);if(filled('approver'))a.push(`<span>الاعتماد<br><b>${esc(val('approver'))}</b></span>`);return a.length?`<div class="poster-signatures">${a.join('')}</div>`:'';
  }
  const newRender=function(){
    const theme=form.elements.theme?.value||'aurora',title=val('title')||'تقرير برنامج',type=val('reportType')||'تقرير برنامج',authority=val('authority'),school=val('school');
    const meta=[];if(authority)meta.push(authority);if(school)meta.push(school);
    $('#reportPreview').className=`report theme-${theme}`;$('#reportPreview').style.transform=`scale(${zoom})`;
    const headerMeta=[];if(filled('date'))headerMeta.push(`التاريخ: ${esc(val('date'))}`);if(filled('audience'))headerMeta.push(`الفئة: ${esc(val('audience'))}`);if(filled('location'))headerMeta.push(`المكان: ${esc(val('location'))}`);
    $('#reportPreview').innerHTML=`<section class="page one-report"><div class="poster-top"><div class="poster-brand"><img src="${logo||'./moe-logo.svg'}" alt="شعار وزارة التعليم"><span class="type-pill">${esc(type)}</span></div><div class="poster-title"><small>تقرير برنامج</small><h1>${esc(title)}</h1>${meta.length?`<p>${meta.map(esc).join(' • ')}</p>`:''}</div>${headerMeta.length?`<div class="poster-meta">${headerMeta.map(x=>`<span>${x}</span>`).join('')}</div>`:''}</div><div class="poster-body">${facts()}${narrative()}${stats()}${outcomes()}${gallery()}${signatures()}<div class="poster-footer"><span>${esc(school||authority||'وزارة التعليم')}</span><span>تم إنشاء التقرير عبر وثّق</span></div></div></section>`;
    $('#zoomText').textContent=Math.round(zoom*100)+'%';
  };
  render=newRender;
  form.addEventListener('input',()=>newRender());form.addEventListener('change',()=>newRender());
  newRender();
})();
