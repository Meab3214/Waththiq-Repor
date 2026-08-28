// V11 bootstrap — preserve report logic, activate supplied-reference visual direction and ornaments.
(function(){
  [...document.querySelectorAll('link[rel="stylesheet"]')].filter(x=>/v60|v70|v80|v90|v100|v110/.test(x.href)).forEach(x=>x.remove());
  const css9=document.createElement('link');css9.rel='stylesheet';css9.href='./v90.css?v=111';document.head.appendChild(css9);
  const css11=document.createElement('link');css11.rel='stylesheet';css11.href='./v110.css?v=111';document.head.appendChild(css11);
  const js9=document.createElement('script');js9.src='./v90.js?v=111';js9.async=false;document.body.appendChild(js9);
  js9.addEventListener('load',()=>{
    const js11=document.createElement('script');js11.src='./v110.js?v=111';js11.async=false;document.body.appendChild(js11);
  });
})();