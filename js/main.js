(function(){
  var $ = function(s,r){return (r||document).querySelector(s)};
  var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  /* speech */
  var toastT;
  function toast(msg){
    var t=$('#toast'); t.textContent=msg; t.classList.add('show');
    clearTimeout(toastT); toastT=setTimeout(function(){t.classList.remove('show')},2600);
  }
  function speak(text, rate){
    try{
      var s=window.speechSynthesis;
      if(!s||!window.SpeechSynthesisUtterance){toast('এই ব্রাউজারে শব্দ শোনা যাচ্ছে না');return}
      s.cancel();
      var u=new SpeechSynthesisUtterance(text);
      u.lang='en-US'; u.rate=rate||0.8; u.pitch=1.08;
      s.speak(u);
    }catch(e){toast('এই ব্রাউজারে শব্দ শোনা যাচ্ছে না')}
  }

  /* theme toggle */
  $('#themeBtn').addEventListener('click',function(){
    var root=document.documentElement;
    var cur=root.getAttribute('data-theme');
    if(!cur){cur=(window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'}
    root.setAttribute('data-theme',cur==='dark'?'light':'dark');
  });

  /* hero word card */
  var words=[
    {en:'Sun',bn:'সূর্য',say:'সান',
     svg:'<svg viewBox="0 0 120 120"><g class="ln"><path d="M60 8v14M60 98v14M8 60h14M98 60h14M23 23l10 10M87 87l10 10M23 97l10-10M87 33l10-10"/></g><circle class="ln ac" cx="60" cy="60" r="26"/><circle class="fi" cx="51" cy="57" r="2.6"/><circle class="fi" cx="69" cy="57" r="2.6"/><path class="ln" d="M52 68q8 6 16 0"/></svg>'},
    {en:'Moon',bn:'চাঁদ',say:'মুন',
     svg:'<svg viewBox="0 0 120 120"><defs><mask id="mm"><rect width="120" height="120" fill="#fff"/><circle cx="82" cy="46" r="34" fill="#000"/></mask></defs><circle class="ac" cx="56" cy="62" r="42" mask="url(#mm)"/><path class="ln" d="M96 82v12M90 88h12"/><path class="ln" d="M100 20v8M96 24h8"/></svg>'},
    {en:'Fish',bn:'মাছ',say:'ফিশ',
     svg:'<svg viewBox="0 0 120 120"><ellipse class="ln ac" cx="55" cy="60" rx="40" ry="26"/><path class="ln" d="M92 60l22-20v40z"/><circle class="fi" cx="38" cy="54" r="3.2"/><path class="ln" d="M62 42q8 18 0 36"/><path class="ln" d="M26 66q5 4 9 0"/></svg>'},
    {en:'Apple',bn:'আপেল',say:'অ্যাপল',
     svg:'<svg viewBox="0 0 120 120"><path class="ln ac" d="M60 36c-14-12-40-6-40 24 0 24 16 42 30 42 6 0 7-3 10-3s4 3 10 3c14 0 30-18 30-42 0-30-26-36-40-24z"/><path class="ln" d="M60 36c0-10 2-18 8-24"/><path class="ln" d="M66 20c8-10 20-8 24-4-4 10-16 12-24 4z"/></svg>'},
    {en:'Cat',bn:'বিড়াল',say:'ক্যাট',
     svg:'<svg viewBox="0 0 120 120"><path class="ln ac" d="M24 50L20 12l30 18zM96 50l4-38-30 18z"/><circle class="ln ac" cx="60" cy="66" r="38"/><circle class="fi" cx="45" cy="60" r="3.6"/><circle class="fi" cx="75" cy="60" r="3.6"/><path class="ln" d="M55 72h10l-5 6z"/><path class="ln" d="M60 78q-6 8-14 4M60 78q6 8 14 4"/><path class="ln" d="M30 66h14M32 77l12-3M90 66H76M88 77l-12-3"/></svg>'},
    {en:'Star',bn:'তারা',say:'স্টার',
     svg:'<svg viewBox="0 0 120 120"><polygon class="ln ac" points="60,10 74,44 110,47 83,70 91,106 60,87 29,106 37,70 10,47 46,44"/><circle class="fi" cx="50" cy="60" r="2.6"/><circle class="fi" cx="70" cy="60" r="2.6"/><path class="ln" d="M52 70q8 6 16 0"/></svg>'}
  ];
  var wi=0;
  var pips=$('#wcPips');
  words.forEach(function(){pips.appendChild(document.createElement('i'))});
  function showWord(){
    var w=words[wi];
    $('#wcArt').innerHTML=w.svg;
    $('#wcEn').textContent=w.en;
    $('#wcBn').textContent=w.bn;
    $('#wcSay').textContent='উচ্চারণ: '+w.say;
    $$('i',pips).forEach(function(p,i){p.classList.toggle('on',i===wi)});
  }
  $('#wcPrev').addEventListener('click',function(){wi=(wi+words.length-1)%words.length;showWord();speak(words[wi].en)});
  $('#wcNext').addEventListener('click',function(){wi=(wi+1)%words.length;showWord();speak(words[wi].en)});
  $('#wcSpeak').addEventListener('click',function(){speak(words[wi].en,0.7)});
  $('#wcArt').addEventListener('click',function(){speak(words[wi].en,0.7)});
  $('#wcEn').addEventListener('click',function(){speak(words[wi].en,0.7)});
  showWord();

  /* story */
  var pages=[
    {en:'Mimi looks at the big moon.',pron:'মিমি লুকস অ্যাট দ্য বিগ মুন।',bn:'মিমি বড় চাঁদটার দিকে তাকায়।'},
    {en:'The moon says, “Hello, Mimi!”',pron:'দ্য মুন সেজ, “হ্যালো, মিমি!”',bn:'চাঁদ বলে, “হ্যালো, মিমি!”'},
    {en:'Mimi waves and says, “Hello, Moon!”',pron:'মিমি ওয়েভস অ্যান্ড সেজ, “হ্যালো, মুন!”',bn:'মিমি হাত নেড়ে বলে, “হ্যালো, চাঁদ!”'},
    {en:'Now they are friends. Good night!',pron:'নাউ দে আর ফ্রেন্ডস। গুড নাইট!',bn:'এখন তারা বন্ধু। শুভ রাত্রি!'}
  ];
  var pi=0;
  function showPage(){
    var p=pages[pi];
    var line=$('#enLine'); line.textContent='';
    p.en.split(' ').forEach(function(tok,i,arr){
      var b=document.createElement('button');
      b.type='button'; b.textContent=tok;
      b.addEventListener('click',function(){
        $$('button',line).forEach(function(x){x.classList.remove('say')});
        b.classList.add('say');
        speak(tok.replace(/[“”",.!?]/g,''),0.7);
      });
      line.appendChild(b);
      if(i<arr.length-1) line.appendChild(document.createTextNode(' '));
    });
    $('#bnPron').innerHTML='<span class="tag">বাংলা উচ্চারণ</span>'+p.pron;
    $('#bnMean').innerHTML='<span class="tag">অর্থ</span>'+p.bn;
    $('#pgLabel').textContent='পাতা '+['১','২','৩','৪'][pi]+' / ৪';
    $('#scene').setAttribute('data-page',String(pi+1));
    $('#stPrev').disabled=pi===0;
    $('#stNext').disabled=pi===pages.length-1;
  }
  $('#stPrev').addEventListener('click',function(){if(pi>0){pi--;showPage()}});
  $('#stNext').addEventListener('click',function(){if(pi<pages.length-1){pi++;showPage()}});
  $('#stSpeak').addEventListener('click',function(){speak(pages[pi].en.replace(/[“”]/g,''),0.75)});
  showPage();

  /* ABC */
  var abc=[['A','Apple','আপেল'],['B','Ball','বল'],['C','Cat','বিড়াল'],['D','Dog','কুকুর'],['E','Egg','ডিম'],['F','Fish','মাছ'],['G','Goat','ছাগল'],['H','Hat','টুপি'],['I','Ice','বরফ'],['J','Jug','জগ'],['K','Kite','ঘুড়ি'],['L','Lion','সিংহ'],['M','Moon','চাঁদ'],['N','Nest','বাসা'],['O','Orange','কমলা'],['P','Pen','কলম'],['Q','Queen','রানি'],['R','Rain','বৃষ্টি'],['S','Sun','সূর্য'],['T','Tree','গাছ'],['U','Umbrella','ছাতা'],['V','Van','ভ্যান'],['W','Water','পানি'],['X','X-ray','এক্স-রে'],['Y','Yak','ইয়াক'],['Z','Zebra','জেব্রা']];
  var bl=$('#blocks');
  abc.forEach(function(a,i){
    var b=document.createElement('button');
    b.type='button'; b.className='blk'; b.textContent=a[0]; b.setAttribute('aria-pressed','false');
    b.setAttribute('aria-label',a[0]+' for '+a[1]);
    b.addEventListener('click',function(){
      $$('.blk',bl).forEach(function(x){x.setAttribute('aria-pressed','false')});
      b.setAttribute('aria-pressed','true');
      $('#abcBig').textContent=a[0];
      $('#abcWord').textContent=a[1];
      $('#abcMean').textContent=a[2];
      speak(a[0]+'. '+a[0]+' for '+a[1],0.75);
    });
    bl.appendChild(b);
  });

  /* video filter */
  var vcards=$$('.vcard');
  vcards.forEach(function(c){c.addEventListener('click',function(){toast('ভিডিওটি শীঘ্রই চালু হচ্ছে')})});
  $$('.chip[data-f]').forEach(function(ch){
    ch.addEventListener('click',function(){
      var f=ch.getAttribute('data-f');
      $$('.chip[data-f]').forEach(function(x){x.setAttribute('aria-pressed',x===ch?'true':'false')});
      vcards.forEach(function(c){c.hidden=!(f==='all'||c.getAttribute('data-age')===f)});
      $('#vgrid').classList.toggle('filtered',f!=='all');
    });
  });

  /* levels */
  var recos=[
    '<b>৩–৫ বছরের জন্য শুরুটা এমন:</b> প্রথম সপ্তাহে ABC ব্লকে ছুঁয়ে অক্ষর শুনুন, তারপর “ABC গান” আর “রঙের নাম শিখি” ভিডিও দেখুন। রোজ ১০ মিনিটই যথেষ্ট।',
    '<b>৬–৮ বছরের জন্য শুরুটা এমন:</b> প্রথম সপ্তাহে “Mimi and the Moon” গল্পটি রোজ একবার শুনুন। তারপর “আমার পরিবার” ভিডিও দেখে Mom, Dad, Sister বলার অভ্যাস করুন।',
    '<b>৯–১২ বছরের জন্য শুরুটা এমন:</b> গল্পের ইংরেজি লাইনগুলো নিজে জোরে পড়ুক, তারপর “ইংরেজিতে নিজের পরিচয় দিই” ভিডিও দেখে “I am ...” দিয়ে নিজের কথা বলুক।'
  ];
  var steps=$$('.step');
  function pick(n){
    steps.forEach(function(s,i){s.classList.toggle('on',i===n)});
    $$('.chip[data-a]').forEach(function(c){c.setAttribute('aria-pressed',c.getAttribute('data-a')===String(n)?'true':'false')});
    $('#reco').innerHTML=recos[n];
  }
  $$('.chip[data-a]').forEach(function(c){c.addEventListener('click',function(){pick(+c.getAttribute('data-a'))})});
  steps.forEach(function(s,i){s.addEventListener('click',function(){pick(i)})});
  pick(0);

  /* phrases */
  var phrases=[
    ['Good morning','গুড মর্নিং','সুপ্রভাত'],
    ['Thank you','থ্যাঙ্ক ইউ','ধন্যবাদ'],
    ['How are you?','হাউ আর ইউ?','তুমি কেমন আছো?'],
    ['I am fine.','আই অ্যাম ফাইন।','আমি ভালো আছি।']
  ];
  var pg=$('#pgrid');
  phrases.forEach(function(p){
    var b=document.createElement('button');
    b.type='button'; b.className='ph';
    b.innerHTML='<span class="e"></span><span class="p"></span><span class="m"></span>';
    $('.e',b).textContent=p[0]; $('.p',b).textContent=p[1]; $('.m',b).textContent=p[2];
    b.addEventListener('click',function(){speak(p[0],0.78)});
    pg.appendChild(b);
  });

  /* services: editable price placeholder */
  $$('.ph-chip[data-ph="price"]').forEach(function(c){c.textContent=SITE.price});

  /* testimonials: real entries only; placeholders when empty */
  var tms=$('#tms');
  var list=SITE.testimonials&&SITE.testimonials.length?SITE.testimonials:null;
  for(var k=0;k<3;k++){
    var f=document.createElement('figure');
    f.className='tm rv'+(list&&list[k]?'':' is-empty');
    var q=document.createElement('blockquote');
    var c=document.createElement('figcaption');
    if(list&&list[k]){q.textContent='“'+list[k].quote+'”';c.textContent=list[k].who}
    else{q.textContent='[অভিভাবকের মতামত এখানে বসবে]';c.textContent='[নাম, সন্তানের বয়স]'}
    f.appendChild(q);f.appendChild(c);tms.appendChild(f);
  }

  /* contact list */
  var cl=$('#cl');
  Object.keys(SITE.contact).forEach(function(label){
    var v=SITE.contact[label];
    var li=document.createElement('li');
    var sm=document.createElement('small'); sm.textContent=label;
    var vv=document.createElement('span'); vv.className='val'+(v.charAt(0)==='['?' is-ph':''); vv.textContent=v;
    li.appendChild(sm); li.appendChild(vv); cl.appendChild(li);
  });

  /* message builder (nothing is sent from this page) */
  $('#leadForm').addEventListener('submit',function(e){
    e.preventDefault();
    var name=$('#fName').value.trim();
    var msg='হ্যালো, '+(name?'আমি '+name+'। ':'')+'আমার সন্তানের বয়স '+$('#fAge').value+'। আমি Tiny Talk Tales-এর '+$('#fWant').value+' সম্পর্কে জানতে চাই।';
    $('#outMsg').value=msg;
    $('#outBox').hidden=false;
  });
  $('#copyBtn').addEventListener('click',function(){
    var ta=$('#outMsg');
    function fallback(){ta.focus();ta.select();toast('বার্তাটি বেছে নেওয়া হয়েছে, কপি করুন')}
    try{
      navigator.clipboard.writeText(ta.value).then(function(){toast('বার্তা কপি হয়েছে')},fallback);
    }catch(e){fallback()}
  });

  /* gentle reveal */
  var rv=$$('.sec-head,.point,.routine,.faq details,.vcard');
  rv.forEach(function(el){el.classList.add('rv')});
  var all=$$('.rv');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.05});
    all.forEach(function(el){io.observe(el)});
  }else{all.forEach(function(el){el.classList.add('in')})}
})();
