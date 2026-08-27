// V4.0 — robust gallery + clean hierarchy + five distinct report compositions
(function(){
  const tag=document.querySelector('.side-intro .eyebrow'); if(tag) tag.textContent='V4.0';
  document.title='توثيق — صانع التقارير الذكي V4.0';
  const sideTitle=document.querySelector('.side-intro h1'); if(sideTitle) sideTitle.textContent='أنشئ تقريرًا بصريًا متكاملًا في صفحة واحدة.';

  // Generic examples only.
  const generic={school:'مثال: اسم المدرسة',department:'مثال: القسم أو الوحدة',jobTitle:'مثال: المسمى الوظيفي',executor:'مثال: الاسم الكامل',audience:'مثال: الفئة المستهدفة',location:'مثال: مكان التنفيذ'};
  Object.entries(generic).forEach(([n,p])=>{const el=form.elements[n];if(el)el.placeholder=p});

  // Rebuild image picker to accept phone-gallery formats without MIME blocking.
  const picker=document.querySelector('#imagesInput');
  if(picker){
    picker.setAttribute('accept','image/*');
    picker.onchange=null;
    picker.addEventListener('change',async e=>{
      const chosen=[...e.target.files].slice(0,Math.max(0,15-images.length));
      if(!chosen.length){e.target.value='';return;}
      let added=0,failed=0;
      for(const file of chosen){
        try{
          const src=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file)});
          // Validate that the browser can actually display the selected file.
          await new Promise((resolve,reject)=>{const im=new Image();im.onload=resolve;im.onerror=reject;im.src=src});
          images.push({src,caption:''});added++;
        }catch(err){failed++;}
      }
      renderImages();render();e.target.value='';
      if(added)toast(`تمت إضافة ${added} صورة`);
      if(failed)toast(`تعذر عرض ${failed} صورة؛ جرّب JPG أو PNG`);
    },true);
  }

  // Closing preview must always work on mobile.
  const close=document.querySelector('#closePreview');
  if(close){
    close.onclick=null;
    close.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();document.body.classList.remove('preview-open');document.documentElement.classList.remove('preview-open')},true);
  }

  const filled=n=>{const v=val(n);return v!==''&&v!==null&&v!==undefined};
  const txt=v=>esc(v).replace(/\n/g,'<br>');
  const list=v=>lines(v).map((x,i)=>`<div class="v4-list-item"><i>${String(i+1).padStart(2,'0')}</i><span>${esc(x)}</span></div>`).join('');
  const section=(title,body,cls='')=>body?`<section class="v4-section ${cls}"><div class="v4-section-head"><b>${esc(title)}</b></div>${body}</section>`:'';

  function factCards(){const a=[];[['date','تاريخ التنفيذ'],['duration','المدة'],['audience','الفئة المستهدفة'],['location','مكان التنفيذ'],['department','القسم / الوحدة']].forEach(([n,l])=>{if(filled(n))a.push([l,val(n)])});return a.length?`<div class="v4-facts">${a.map(([l,v])=>`<div><small>${l}</small><strong>${esc(v)}</strong></div>`).join('')}</div>`:''}
  function statData(){const s=[];[['students','الطلاب',0],['femaleStudents','الطالبات',0],['teachers','المعلمون',0],['femaleTeachers','المعلمات',0],['beneficiaries','المستفيدون',0],['attendance','الحضور',1],['satisfaction','الرضا',1],['activities','الأنشطة',0],['target','المستهدف',0],['achieved','المتحقق',0]].forEach(([n,l,p])=>{if(filled(n)&&num(n)>0)s.push({l,v:num(n),p:!!p})});$$('.metric-name').forEach((m,i)=>{const v=Number($$('.metric-value')[i]?.value)||0;if(m.value.trim()&&v>0)s.push({l:m.value.trim(),v,p:false})});return s}
  function stats(){const s=statData();if(!s.length)return'';const max=Math.max(...s.filter(x=>!x.p).map(x=>x.v),1);return `<div class="v4-kpis">${s.slice(0,6).map(x=>`<div class="v4-kpi"><strong>${x.v}${x.p?'%':''}</strong><span>${esc(x.l)}</span></div>`).join('')}</div><div class="v4-chart">${s.filter(x=>!x.p).slice(0,6).map(x=>`<div><span>${esc(x.l)}</span><i><em style="width:${Math.max(8,Math.round(x.v/max*100))}%"></em></i><b>${x.v}</b></div>`).join('')}</div>`}
  function gallery(){if(!images.length)return'';const n=images.length;return `<div class="v4-gallery count-${n}">${images.map((im,i)=>`<figure><img src="${im.src}" alt="شاهد ${i+1}">${im.caption?`<figcaption>${esc(im.caption)}</figcaption>`:''}</figure>`).join('')}</div>`}
  function blocks(){let o='';if(filled('generalGoal'))o+=section('الهدف العام',`<div class="v4-copy lead">${txt(val('generalGoal'))}</div>`,'goal');if(filled('goals'))o+=section('الأهداف',`<div class="v4-list">${list(val('goals'))}</div>`,'goals');if(filled('execution'))o+=section('آلية التنفيذ',`<div class="v4-copy">${txt(val('execution'))}</div>`,'execution');const st=stats();if(st)o+=section('المؤشرات والنتائج بالأرقام',st,'stats');if(filled('results'))o+=section('النتائج والأثر',`<div class="v4-copy">${txt(val('results'))}</div>`,'results');if(filled('recommendations'))o+=section('التوصيات',`<div class="v4-list">${list(val('recommendations'))}</div>`,'recommendations');const g=gallery();if(g)o+=section('الشواهد المصورة',g,'evidence');return o}
  function fit(){const sheet=document.querySelector('.v4-sheet'),inner=document.querySelector('.v4-inner');if(!sheet||!inner)return;inner.style.transform='scale(1)';inner.style.width='100%';requestAnimationFrame(()=>{const h=inner.scrollHeight;const scale=Math.min(1,1118/h);inner.style.transform=`scale(${scale})`;inner.style.width=`${100/scale}%`;sheet.dataset.fit=scale.toFixed(3)})}

  render=function(){
    const theme=form.elements.theme?.value||'aurora';
    const title=filled('title')?val('title'):'عنوان التقرير';
    const authority=filled('authority')?val('authority'):'';
    const school=filled('school')?val('school'):'';
    const role=filled('jobTitle')?val('jobTitle'):'';
    const person=filled('executor')?val('executor'):'';
    const executorLabel=filled('executorLabel')?val('executorLabel'):'منفذ البرنامج';
    const byline=(role||person)?`<div class="v4-byline">${role?`<span class="job"><small>المسمى الوظيفي</small><b>${esc(role)}</b></span>`:''}${person?`<span class="person"><small>${esc(executorLabel)}</small><b>${esc(person)}</b></span>`:''}</div>`:'';
    const approval=filled('approver')?`<div class="v4-approval"><small>الاعتماد</small><b>${esc(val('approver'))}</b></div>`:'';
    $('#reportPreview').className=`report theme-${theme}`;$('#reportPreview').style.transform=`scale(${zoom})`;
    $('#reportPreview').innerHTML=`<section class="v4-sheet"><div class="v4-inner"><header class="v4-hero"><div class="v4-org"><img src="./moe-logo-official.png?v=40" alt="وزارة التعليم" onerror="this.onerror=null;this.src='./moe-logo.svg'"><div>${authority?`<b>${esc(authority)}</b>`:''}${school?`<strong>${esc(school)}</strong>`:''}</div></div><div class="v4-title"><h1>${esc(title)}</h1></div>${byline}</header><main class="v4-body">${factCards()}<div class="v4-content">${blocks()}</div>${approval}<footer class="v4-footer"><i></i><span>${school?esc(school):(authority?esc(authority):'')}</span></footer></main></div></section>`;
    $('#zoomText').textContent=Math.round(zoom*100)+'%';fit();
  };
  form.addEventListener('input',render);form.addEventListener('change',render);render();
})();