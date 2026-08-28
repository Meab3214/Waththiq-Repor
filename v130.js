// V13 — five report renderers rebuilt from the supplied educational references.
(function(){
'use strict';
const F=document.querySelector('#reportForm'); if(!F)return;
const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
const V=n=>String(F.elements[n]?.value||'').trim(), H=n=>!!V(n), N=n=>Number(V(n))||0;
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const lines=s=>String(s||'').split(/\n+/).map(x=>x.trim()).filter(Boolean);
const photos=()=>typeof images!=='undefined'&&Array.isArray(images)?images:[];
const title=()=>V('title')||'عنوان التقرير';
const officialLogo=()=>'<img class="r13-logo" src="./moe-logo-official.png?v=130" alt="شعار وزارة التعليم">';
const identity=()=>`<div class="r13-identity">${officialLogo()}<div>${H('authority')?`<small>${esc(V('authority'))}</small>`:''}${H('school')?`<b>${esc(V('school'))}</b>`:''}</div></div>`;
const signature=()=>'<span class="r13-sign">توثيق</span>';
const executor=()=>H('executor')||H('jobTitle')?`<div class="r13-executor">${H('jobTitle')?`<span>${esc(V('jobTitle'))}</span>`:''}${H('executor')?`<b>${esc(V('executor'))}</b>`:''}</div>`:'';
const para=n=>H(n)?`<p>${esc(V(n)).replace(/\n/g,'<br>')}</p>`:'';
const list=(text,cls='')=>lines(text).map((x,i)=>`<div class="r13-item ${cls}"><i>${String(i+1).padStart(2,'0')}</i><span>${esc(x)}</span></div>`).join('');
const facts=()=>[
 ['audience','الفئة المستهدفة','◉'],['date','تاريخ التنفيذ','◫'],
 ['duration','مدة التنفيذ','◷'],['location','مكان التنفيذ','⌖'],['beneficiaries','المستفيدون','◎']
].filter(([k])=>H(k)).map(([k,l,ic])=>({k,l,ic,v:V(k)}));
function metricData(){
 const a=[];[['beneficiaries','المستفيدون',''],['attendance','الحضور','%'],['satisfaction','الرضا','%'],['activities','الأنشطة',''],['students','الطلاب',''],['femaleStudents','الطالبات',''],['teachers','المعلمون',''],['femaleTeachers','المعلمات','']].forEach(([k,l,u])=>{if(H(k)&&N(k)>0)a.push({l,v:N(k),u})});
 if(N('target')>0)a.push({l:'المستهدف',v:N('target'),u:''});
 if(N('achieved')>0)a.push({l:'المتحقق',v:N('achieved'),u:''});
 qa('.metric-name').forEach((e,i)=>{const x=Number(qa('.metric-value')[i]?.value)||0;if(e.value.trim()&&x>0)a.push({l:e.value.trim(),v:x,u:''})});
 return a.slice(0,10)
}
function factStrip(cls=''){const a=facts();return a.length?`<div class="r13-facts ${cls}">${a.map(x=>`<div><i>${x.ic}</i><span>${x.l}</span><b>${esc(x.v)}${x.k==='attendance'?'%':''}</b></div>`).join('')}</div>`:''}
function rings(cls=''){const a=metricData().slice(0,4);return a.length?`<div class="r13-rings ${cls}">${a.map(x=>{const pct=x.u==='%'?Math.min(100,x.v):Math.min(100,20+x.v);return `<div class="r13-ring"><i style="--p:${pct}"><b>${x.v}${x.u}</b></i><span>${esc(x.l)}</span></div>`}).join('')}</div>`:''}
function kpis(cls=''){const a=metricData().slice(0,6);return a.length?`<div class="r13-kpis ${cls}">${a.map((x,i)=>`<div><em>${['●','◆','▲','✦','◉','■'][i%6]}</em><b>${x.v}${x.u}</b><span>${esc(x.l)}</span></div>`).join('')}</div>`:''}
function gallery(cls='',limit=10){const a=photos().slice(0,limit);if(!a.length)return'';return `<div class="r13-gallery ${cls} n${a.length}">${a.map((im,i)=>`<figure><img src="${im.src}" alt="شاهد ${i+1}">${im.caption?`<figcaption>${esc(im.caption)}</figcaption>`:''}</figure>`).join('')}</div>`}
function footer(){return `<footer class="r13-footer">${H('approver')?`<span>الاعتماد: <b>${esc(V('approver'))}</b></span>`:'<span></span>'}${signature()}</footer>`}
function density(){const s=lines(V('goals')).length+lines(V('execution')).length+lines(V('recommendations')).length+metricData().length+photos().length;return s<10?'light':s<20?'medium':'dense'}

// 1 — framed botanical educational report
function T1(){return `<article class="r13-sheet t1 ${density()}"><div class="orn top"></div><div class="orn left"></div><div class="orn right"></div><header>${identity()}</header><section class="hero"><small>${esc(V('reportType')||'تقرير تعليمي')}</small><h1>${esc(title())}</h1>${executor()}</section>${factStrip('t1-facts')}<main><div class="split">${H('generalGoal')?`<section class="panel goal"><h2>الهدف العام</h2>${para('generalGoal')}</section>`:''}${H('goals')?`<section class="panel objectives"><h2>الأهداف</h2><div>${list(V('goals'))}</div></section>`:''}</div>${metricData().length?`<section class="panel metrics"><h2>أثر البرنامج</h2>${rings('t1-rings')}${kpis('t1-kpis')}</section>`:''}<div class="split lower">${H('execution')?`<section class="panel"><h2>آلية التنفيذ</h2>${list(V('execution'),'soft')}</section>`:''}${H('results')?`<section class="panel results"><h2>أبرز النتائج</h2>${para('results')}</section>`:''}</div>${H('recommendations')?`<section class="panel recommendations"><h2>التوصيات</h2>${list(V('recommendations'),'check')}</section>`:''}${photos().length?`<section class="panel evidence"><h2>الشواهد المصورة</h2>${gallery('t1-gallery',10)}</section>`:''}</main>${footer()}</article>`}

// 2 — activity documentation reference
function T2(){return `<article class="r13-sheet t2 ${density()}"><header>${identity()}</header><section class="title"><h1>${esc(title())}</h1><p>${H('generalGoal')?esc(V('generalGoal')).slice(0,110):''}</p></section>${factStrip('t2-facts')}<main><div class="two-col">${H('goals')?`<section class="panel objectives"><h2>أهداف النشاط</h2><div class="objective-grid">${list(V('goals'),'icon')}</div></section>`:''}${H('execution')?`<section class="panel description"><h2>وصف التنفيذ</h2>${para('execution')}</section>`:''}</div><div class="two-col">${H('results')?`<section class="panel results"><h2>أبرز النتائج</h2>${list(V('results'),'check')}</section>`:''}${metricData().length?`<section class="panel impact"><h2>أثر النشاط</h2>${rings('t2-rings')}</section>`:''}</div>${photos().length?`<section class="panel evidence"><h2>الشواهد المصورة</h2>${gallery('t2-gallery',10)}</section>`:''}<div class="approval-row">${executor()}${H('approver')?`<div class="approve"><span>اعتماد الجهة</span><b>${esc(V('approver'))}</b></div>`:''}</div></main>${footer()}</article>`}

// 3 — airy botanical framed reference
function T3(){return `<article class="r13-sheet t3 ${density()}"><div class="curve c1"></div><div class="curve c2"></div><div class="leaf l1"></div><div class="leaf l2"></div><header>${identity()}</header><section class="hero"><small>${esc(V('reportType')||'تقرير توثيق')}</small><h1>${esc(title())}</h1>${executor()}</section>${factStrip('t3-facts')}<main><div class="content-frame">${H('generalGoal')?`<section class="wide"><h2>الهدف العام</h2>${para('generalGoal')}</section>`:''}${H('goals')?`<section><h2>الأهداف</h2><div class="steps">${list(V('goals'))}</div></section>`:''}${H('execution')?`<section><h2>مسار التنفيذ</h2>${list(V('execution'),'line')}</section>`:''}${metricData().length?`<section class="metric-band">${kpis('t3-kpis')}</section>`:''}${H('results')?`<section class="result-callout"><h2>النتائج والأثر</h2>${para('results')}</section>`:''}${photos().length?`<section><h2>الشواهد</h2>${gallery('t3-gallery',8)}</section>`:''}</div></main>${footer()}</article>`}

// 4 — wave cover / premium report reference
function T4(){return `<article class="r13-sheet t4 ${density()}"><div class="wave w1"></div><div class="wave w2"></div><header>${identity()}</header><section class="hero"><small>${esc(V('reportType')||'برنامج / مبادرة / فعالية')}</small><h1>${esc(title())}</h1>${H('department')?`<div class="department">${esc(V('department'))}</div>`:''}${executor()}</section>${factStrip('t4-facts')}<main>${H('generalGoal')?`<section class="statement"><h2>الهدف</h2>${para('generalGoal')}</section>`:''}${H('goals')?`<section class="journey"><h2>محاور العمل</h2><div>${list(V('goals'),'journey-step')}</div></section>`:''}${metricData().length?`<section class="metric-strip"><h2>المؤشرات</h2>${rings('t4-rings')}${kpis('t4-kpis')}</section>`:''}<div class="two-col">${H('results')?`<section class="panel"><h2>الأثر</h2>${para('results')}</section>`:''}${H('recommendations')?`<section class="panel"><h2>التوصيات</h2>${list(V('recommendations'),'check')}</section>`:''}</div>${photos().length?`<section class="photos"><h2>شواهد التنفيذ</h2>${gallery('t4-gallery',10)}</section>`:''}</main>${footer()}</article>`}

// 5 — geometric educational form reference
function T5(){return `<article class="r13-sheet t5 ${density()}"><div class="geo g1"></div><div class="geo g2"></div><header>${identity()}</header><section class="title"><small>${esc(V('reportType')||'تقرير نشاط تعليمي')}</small><h1>${esc(title())}</h1></section>${factStrip('t5-facts')}<main><div class="two-col">${H('execution')?`<section class="panel"><h2>وصف النشاط</h2>${para('execution')}</section>`:''}${H('goals')?`<section class="panel"><h2>أهداف النشاط</h2><div class="goal-cards">${list(V('goals'),'goal-card')}</div></section>`:''}</div>${photos().length?`<section class="panel evidence"><h2>الشواهد المصورة</h2>${gallery('t5-gallery',10)}</section>`:''}<div class="two-col">${H('results')?`<section class="panel results"><h2>أبرز النتائج</h2>${list(V('results'),'check')}</section>`:''}${metricData().length?`<section class="panel stats"><h2>الأثر بالأرقام</h2>${rings('t5-rings')}${kpis('t5-kpis')}</section>`:''}</div>${H('recommendations')?`<section class="note"><h2>ملاحظات وتوصيات</h2>${para('recommendations')}</section>`:''}</main>${footer()}</article>`}

const REG={aurora:T1,editorial:T2,minimal:T3,prism:T4,impact:T5};
function fit(){const s=q('.r13-sheet');if(!s)return;s.style.setProperty('--fit',1);requestAnimationFrame(()=>{const h=s.scrollHeight;let z=1;if(h>1123)z=Math.max(.76,1123/h);s.style.setProperty('--fit',z.toFixed(3));s.classList.toggle('auto-dense',z<.9)})}
window.render=function(){const prev=q('#reportPreview');if(!prev)return;const key=F.elements.theme?.value||'aurora';prev.className=`report r13-report theme-${key}`;prev.style.transform=`scale(${typeof zoom!=='undefined'?zoom:.72})`;prev.innerHTML=(REG[key]||T1)();const z=q('#zoomText');if(z)z.textContent=Math.round((typeof zoom!=='undefined'?zoom:.72)*100)+'%';fit()};
const names={aurora:['الإطار الملكي التعليمي','إطار مزدوج وموجات وأوراق بتكوين رسمي متكامل'],editorial:['توثيق النشاط','نموذج إنفوجرافيك منظم للبيانات والأهداف والأثر والشواهد'],minimal:['الإطار النباتي الهادئ','مساحات بيضاء راقية وإطار داخلي وزخارف نباتية'],prism:['الموجة التعليمية','عنوان مركزي وموجات خضراء وذهبية ومسار بصري متكامل'],impact:['النموذج الهندسي','تكوين حديث بعناوين شريطية وإطارات ومؤشرات وشواهد']};
Object.entries(names).forEach(([k,[a,b]])=>{const c=q(`input[name="theme"][value="${k}"]`)?.closest('.theme-card');if(c){const t=c.querySelector('strong'),s=c.querySelector('span');if(t)t.textContent=a;if(s)s.textContent=b;c.dataset.v13=k}});
const badge=q('.side-intro .eyebrow');if(badge)badge.textContent='V13';document.title='توثيق — القوالب التعليمية V13';
F.addEventListener('input',()=>requestAnimationFrame(window.render));F.addEventListener('change',()=>requestAnimationFrame(window.render));
setTimeout(window.render,60);
})();