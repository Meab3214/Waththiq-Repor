// V15 bootstrap — load the rebuilt five-template engine plus the final supplied-reference visual layer.
(function(){
 [...document.querySelectorAll('link[rel="stylesheet"]')].filter(x=>/v60|v70|v80|v90|v100|v110|v120|v121|v130|v140|v150/.test(x.href)).forEach(x=>x.remove());
 [...document.querySelectorAll('script[src]')].filter(x=>/v60|v70|v80|v90|v100|v110|v120|v130|v140|v150/.test(x.src)).forEach(x=>x.remove());
 const base=document.createElement('link');base.rel='stylesheet';base.href='./v140.css?v=150';document.head.appendChild(base);
 const visual=document.createElement('link');visual.rel='stylesheet';visual.href='./v150.css?v=150';document.head.appendChild(visual);
 const engine=document.createElement('script');engine.src='./v140.js?v=150';engine.async=false;document.body.appendChild(engine);
 engine.addEventListener('load',()=>{const ui=document.createElement('script');ui.src='./v150.js?v=150';ui.async=false;document.body.appendChild(ui);});
})();