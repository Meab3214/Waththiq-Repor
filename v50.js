// V14 bootstrap — load only the rebuilt five-template report engine.
(function(){
 [...document.querySelectorAll('link[rel="stylesheet"]')].filter(x=>/v60|v70|v80|v90|v100|v110|v120|v121|v130|v140/.test(x.href)).forEach(x=>x.remove());
 [...document.querySelectorAll('script[src]')].filter(x=>/v60|v70|v80|v90|v100|v110|v120|v130|v140/.test(x.src)).forEach(x=>x.remove());
 const css=document.createElement('link');css.rel='stylesheet';css.href='./v140.css?v=140';document.head.appendChild(css);
 const engine=document.createElement('script');engine.src='./v140.js?v=140';engine.async=false;document.body.appendChild(engine);
})();