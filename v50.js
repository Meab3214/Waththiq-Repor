// V12.1 bootstrap — five supplied-reference designs + selector previews.
(function(){
 [...document.querySelectorAll('link[rel="stylesheet"]')].filter(x=>/v60|v70|v80|v90|v100|v110|v120|v121/.test(x.href)).forEach(x=>x.remove());
 const base=document.createElement('link');base.rel='stylesheet';base.href='./v90.css?v=121';document.head.appendChild(base);
 const visual=document.createElement('link');visual.rel='stylesheet';visual.href='./v120.css?v=121';document.head.appendChild(visual);
 const cards=document.createElement('link');cards.rel='stylesheet';cards.href='./v121.css?v=121';document.head.appendChild(cards);
 const engine=document.createElement('script');engine.src='./v90.js?v=121';engine.async=false;document.body.appendChild(engine);
 engine.addEventListener('load',()=>{const ui=document.createElement('script');ui.src='./v120.js?v=121';ui.async=false;document.body.appendChild(ui);});
})();