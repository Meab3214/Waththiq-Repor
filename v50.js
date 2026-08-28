// V8 bootstrap — keep the stable form workflow and load only the new report design engine last.
(function(){
  const oldCss=[...document.querySelectorAll('link[rel="stylesheet"]')].filter(x=>/v60|v70/.test(x.href));
  oldCss.forEach(x=>x.remove());
  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href='./v80.css?v=80';
  document.head.appendChild(css);

  const js=document.createElement('script');
  js.src='./v80.js?v=80';
  js.defer=false;
  document.body.appendChild(js);
})();