// V7 bootstrap — preserve the existing form workflow and replace only the report engine.
(function(){
  const css=document.createElement('link');
  css.rel='stylesheet';
  css.href='./v70.css?v=70';
  document.head.appendChild(css);

  const js=document.createElement('script');
  js.src='./v70.js?v=70';
  js.defer=false;
  document.body.appendChild(js);
})();