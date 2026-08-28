// V13 bootstrap — load the supplied-reference report system and official-logo renderer.
(function(){
 [...document.querySelectorAll('link[rel="stylesheet"]')].filter(x=>/v60|v70|v80|v90|v100|v110|v120|v121|v130/.test(x.href)).forEach(x=>x.remove());
 const base=document.createElement('link');base.rel='stylesheet';base.href='./v90.css?v=130';document.head.appendChild(base);
 const visual=document.createElement('link');visual.rel='stylesheet';visual.href='./v130.css?v=130';document.head.appendChild(visual);
 const engine=document.createElement('script');engine.src='./v90.js?v=130';engine.async=false;document.body.appendChild(engine);
 engine.addEventListener('load',()=>{const ui=document.createElement('script');ui.src='./v130.js?v=130';ui.async=false;document.body.appendChild(ui);});
})();