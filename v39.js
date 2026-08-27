// V3.9 — robust interactions + polished report identity
(function(){
  const tag=document.querySelector('.side-intro .eyebrow'); if(tag) tag.textContent='V3.9';
  document.title='توثيق — صانع التقارير الذكي V3.9';
  logo='./moe-logo-official.png';

  const input=document.querySelector('#imagesInput');
  if(input){
    input.onchange=function(e){
      const files=[...e.target.files].filter(f=>/^image\/(jpeg|png|webp)$/.test(f.type));
      const allowed=files.slice(0,Math.max(0,15-images.length));
      if(!allowed.length){toast('اختر صور JPG أو PNG أو WEBP');e.target.value='';return;}
      let pending=allowed.length;
      allowed.forEach(file=>{
        const reader=new FileReader();
        reader.onload=()=>{images.push({src:reader.result,caption:''});pending--;if(!pending){renderImages();render();toast(`تمت إضافة ${allowed.length} صورة`);}};
        reader.onerror=()=>{pending--;if(!pending){renderImages();render();}toast('تعذر قراءة إحدى الصور');};
        reader.readAsDataURL(file);
      });
      e.target.value='';
    };
  }

  const close=document.querySelector('#closePreview');
  if(close){close.onclick=function(ev){ev.preventDefault();ev.stopPropagation();document.body.classList.remove('preview-open');};}

  function filled(n){const v=val(n);return v!==''&&v!==null&&v!==undefined;}
  function txt(v){return esc(v).replace(/\n/g,'<br>');}
  function items(v){return lines(v).map((x,i)=>`<div class="r-list-item"><i>${i+1}</i><span>${esc(x)}</span></div>`).join('');}
  function section(title,body,cls=''){return body?`<section class="r-section ${cls}"><div class="r-section-title"><span>${esc(title)}</span></div>${body}</section>`:'';}
  function facts(){const a=[];[['date','تاريخ التنفيذ'],['duration','مدة التنفيذ'],['audience','الفئة المستهدفة'],['location','مكان التنفيذ'],['department','القسم / الوحدة']].forEach(([n,l])=>{if(filled(n))a.push([l,val(n)])});return a.length?`<div class="r-facts">${a.map(([l,v])=>`<div><small>${l}</small><b>${esc(v)}</b></div>`).join('')}</div>`:'';}
  function statRows(){const s=[];[['students','الطلاب',0],['femaleStudents','الطالبات',0],['teachers','المعلمون',0],['femaleTeachers','المعلمات',0],['beneficiaries','المستفيدون',0],['attendance','الحضور',1],['satisfaction','الرضا',1],['activities','الأنشطة',0],['target','المستهدف',0],['achieved','المتحقق',0]].forEach(([n,l,p])=>{if(filled(n)&&num(n)>0)s.push({l,v:num(n),p:!!p})});$$('.metric-name').forEach((m,i)=>{const v=Number($$('.metric-value')[i]?.value)||0;if(m.value.trim()&&v>0)s.push({l:m.value.trim(),v,p:false})});return s;}
  function stats(){const s=statRows();if(!s.length)return'';const max=Math.max(...s.filter(x=>!x.p).map(x=>x.v),1);return `<div class="r-stats">${s.slice(0,6).map(x=>{const p=x.p?Math.min(100,x.v):Math.max(12,Math.round(x.v/max*100));return `<div class="r-stat"><div class="r-ring" style="--p:${p}"><strong>${x.v}${x.p?'%':''}</strong></div><span>${esc(x.l)}</span></div>`}).join('')}</div>${s.some(x=>!x.p)?`<div class="r-bars">${s.filter(x=>!x.p).slice(0,6).map(x=>`<div class="r-bar"><span>${esc(x.l)}</span><i><em style="width:${Math.max(6,Math.round(x.v/max*100))}%"></em></i><b>${x.v}</b></div>`).join('')}</div>`:''}`;}
  function gallery(){if(!images.length)return'';const n=images.length;return `<div class="r-gallery count-${n}">${images.map((im,i)=>`<figure><div class="photo-frame"><img src="${im.src}" alt="شاهد ${i+1}"></div>${im.caption?`<figcaption><i>${String(i+1).padStart(2,'0')}</i><span>${esc(im.caption)}</span></figcaption>`:''}</figure>`).join('')}</div>`;}
  function fit(){const sheet=document.querySelector('.report-sheet'),inner=document.querySelector('.report-inner');if(!sheet||!inner)return;inner.style.transform='scale(1)';inner.style.width='100%';requestAnimationFrame(()=>{const h=inner.scrollHeight,scale=Math.min(1,1120/h);inner.style.transform=`scale(${scale})`;inner.style.width=`${100/scale}%`;sheet.dataset.fit=scale.toFixed(3);});}
  function bodyBlocks(){let out='';if(filled('generalGoal'))out+=section('الهدف العام',`<div class="r-lead">${txt(val('generalGoal'))}</div>`,'goal');if(filled('goals'))out+=section('الأهداف',`<div class="r-list">${items(val('goals'))}</div>`,'goals');if(filled('execution'))out+=section('آلية التنفيذ',`<div class="r-copy">${txt(val('execution'))}</div>`,'execution');const st=stats();if(st)out+=section('الأثر بالأرقام',st,'stats');if(filled('results'))out+=section('النتائج والأثر',`<div class="r-copy">${txt(val('results'))}</div>`,'results');if(filled('recommendations'))out+=section('التوصيات',`<div class="r-list">${items(val('recommendations'))}</div>`,'recommendations');const g=gallery();if(g)out+=section('الشواهد المصورة',g,'evidence');return out;}

  render=function(){
    const theme=form.elements.theme?.value||'aurora';
    const title=filled('title')?val('title'):'تقرير البرنامج';
    const authority=filled('authority')?val('authority'):'';
    const school=filled('school')?val('school'):'';
    const executor=filled('executor')?val('executor'):'';
    const role=filled('jobTitle')?val('jobTitle'):'';
    const executorLabel=filled('executorLabel')?val('executorLabel'):'منفذ البرنامج';
    const identity=(role||executor||school)?`<div class="r-identity">${role?`<div class="identity-role"><small>المسمى الوظيفي</small><strong>${esc(role)}</strong></div>`:''}${executor?`<div class="identity-name"><small>${esc(executorLabel)}</small><strong>${esc(executor)}</strong></div>`:''}${school?`<div class="identity-school"><small>المدرسة / المنشأة</small><strong>${esc(school)}</strong></div>`:''}</div>`:'';
    const sign=filled('approver')?`<div class="r-signatures"><span><small>الاعتماد</small><b>${esc(val('approver'))}</b></span></div>`:'';
    $('#reportPreview').className=`report theme-${theme}`;$('#reportPreview').style.transform=`scale(${zoom})`;
    $('#reportPreview').innerHTML=`<section class="report-sheet"><div class="report-inner"><header class="r-hero"><div class="r-brand-row"><img class="official-moe-logo" src="./moe-logo-official.png" alt="شعار وزارة التعليم"></div><div class="r-title-wrap"><h1>${esc(title)}</h1>${authority?`<p>${esc(authority)}</p>`:''}</div>${identity}</header><main class="r-body">${facts()}${bodyBlocks()}${sign}<footer class="r-footer">${school?`<span>${esc(school)}</span>`:''}</footer></main></div></section>`;
    $('#zoomText').textContent=Math.round(zoom*100)+'%';fit();
  };

  form.addEventListener('input',render);form.addEventListener('change',render);
  render();
})();