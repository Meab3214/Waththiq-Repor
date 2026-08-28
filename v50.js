// V13 bootstrap — load only the rebuilt reference-based report engine.
(function(){
 [...document.querySelectorAll('link[rel="stylesheet"]')].filter(x=>/v60|v70|v80|v90|v100|v110|v120|v121|v130/.test(x.href)).forEach(x=>x.remove());
 const css=document.createElement('link');css.rel='stylesheet';css.href='./v130.css?v=130';document.head.appendChild(css);
 [...document.querySelectorAll('script[src]')].filter(x=>/v60|v70|v80|v90|v100|v110|v120|v130/.test(x.src)).forEach(x=>x.remove());
 const engine=document.createElement('script');engine.src='./v130.js?v=130';engine.async=false;document.body.appendChild(engine);
})();