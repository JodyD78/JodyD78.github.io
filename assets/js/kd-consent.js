/* GA4 loaded only after explicit consent (UK GDPR / PECR). */
(function(){
  var GA_ID='G-QXSQQ3JV2B', KEY='kd-cookie-consent';
  function get(){try{return localStorage.getItem(KEY)}catch(e){return null}}
  function set(v){try{localStorage.setItem(KEY,v)}catch(e){}}
  function loadGA(){
    if(window.__kdGA)return;window.__kdGA=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){dataLayer.push(arguments)};
    gtag('js',new Date());
    gtag('config',GA_ID,{anonymize_ip:true});
    var s=document.createElement('script');s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;
    document.head.appendChild(s);
  }
  function clearGA(){
    document.cookie.split(';').forEach(function(c){
      var n=c.split('=')[0].trim();
      if(/^_ga/.test(n)){
        ['', '; domain=.kdbespoke.co.uk','; domain=kdbespoke.co.uk'].forEach(function(d){
          document.cookie=n+'=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'+d;
        });
      }
    });
  }
  function hide(){var b=document.getElementById('kd-consent');if(b)b.remove()}
  function show(){
    if(document.getElementById('kd-consent'))return;
    var b=document.createElement('div');b.id='kd-consent';b.setAttribute('role','dialog');b.setAttribute('aria-label','Cookie consent');
    b.innerHTML='<p>We\'d like to use Google Analytics cookies to understand how visitors use this site. They\'re only set if you accept. <a href="/cookies.html">More about cookies</a></p>'+
      '<div class="kd-consent-btns"><button type="button" data-c="denied">Reject</button><button type="button" data-c="granted">Accept</button></div>';
    b.addEventListener('click',function(e){
      var v=e.target.getAttribute&&e.target.getAttribute('data-c');if(!v)return;
      set(v);hide();
      if(v==='granted'){loadGA()}else{clearGA(); if(window.__kdGA)location.reload()}
    });
    document.body.appendChild(b);
  }
  // Track enquiry clicks (sent only when GA has been loaded with consent)
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href^="tel:"],a[href^="mailto:"]');
    if(!a||!window.__kdGA)return;
    var tel=a.getAttribute('href').indexOf('tel:')===0;
    gtag('event',tel?'phone_click':'email_click',{link_text:(a.textContent||'').trim().slice(0,60),page_location:location.href,quote:/quote/i.test(a.href)});
  });
  window.kdCookieSettings=function(){show()};
  var c=get();
  if(c==='granted')loadGA();
  document.addEventListener('DOMContentLoaded',function(){if(c!=='granted'&&c!=='denied')show()});
})();
