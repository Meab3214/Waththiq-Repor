// V9 bootstrap — preserve stable form workflow and activate the new reference-inspired report engine.
(function(){
  [...document.querySelectorAll('link[rel="stylesheet"]')].filter(x=>/v60|v70|v80|v90/.test(x.href)).forEach(x=>x.remove());
  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href='./v90.css?v=90';
  document.head.appendChild(css);
  const js=document.createElement('script');
  js.src='./v90.js?v=90';
  js.defer=false;
  document.body.appendChild(js);
})();