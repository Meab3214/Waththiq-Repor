// V12 bootstrap — load the five supplied-reference report designs directly.
(function(){
 [...document.querySelectorAll('link[rel="stylesheet"]')].filter(x=>/v60|v70|v80|v90|v100|v110|v120/.test(x.href)).forEach(x=>x.remove());
 const base=document.createElement('link');base.rel='stylesheet';base.href='./v90.css?v=120';document.head.appendChild(base);
 const visual=document.createElement('link');visual.rel='stylesheet';visual.href='./v120.css?v=120';document.head.appendChild(visual);
 const engine=document.createElement('script');engine.src='./v90.js?v=120';engine.async=false;document.body.appendChild(engine);
 engine.addEventListener('load',()=>{const ui=document.createElement('script');ui.src='./v120.js?v=120';ui.async=false;document.body.appendChild(ui);});
})();