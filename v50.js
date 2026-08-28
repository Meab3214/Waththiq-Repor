// V10 bootstrap — preserve stable form workflow, load V9 report engine plus premium V10 visual identity.
(function(){
  [...document.querySelectorAll('link[rel="stylesheet"]')].filter(x=>/v60|v70|v80|v90|v100/.test(x.href)).forEach(x=>x.remove());
  const css9=document.createElement('link');css9.rel='stylesheet';css9.href='./v90.css?v=100';document.head.appendChild(css9);
  const css10=document.createElement('link');css10.rel='stylesheet';css10.href='./v100.css?v=100';document.head.appendChild(css10);
  const js9=document.createElement('script');js9.src='./v90.js?v=100';js9.async=false;document.body.appendChild(js9);
  js9.addEventListener('load',()=>{const js10=document.createElement('script');js10.src='./v100.js?v=100';js10.async=false;document.body.appendChild(js10)});
})();