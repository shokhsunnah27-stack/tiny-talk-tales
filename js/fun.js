/* Tiny Talk Tales - small playful touches: confetti on click and a colour change for the big ABC letter.
   Safe to delete: remove this file and its <script> line in index.html and everything else keeps working. */
(function(){
  'use strict';
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var colors=['#F2545B','#FF8A3D','#FFC93C','#4CB944','#3FA7E0','#8E5CD9','#F472B6'];

  function burst(x,y){
    if(reduce)return;
    var n=14;
    for(var i=0;i<n;i++){
      var p=document.createElement('i');
      var ang=(Math.PI*2)*(i/n)+Math.random()*0.5;
      var dist=40+Math.random()*50;
      p.className='confetti';
      p.style.left=x+'px';
      p.style.top=y+'px';
      p.style.background=colors[i%colors.length];
      p.style.setProperty('--dx',(Math.cos(ang)*dist).toFixed(1)+'px');
      p.style.setProperty('--dy',(Math.sin(ang)*dist-20).toFixed(1)+'px');
      p.style.setProperty('--rot',Math.round(Math.random()*540-270)+'deg');
      document.body.appendChild(p);
      setTimeout((function(el){return function(){if(el.parentNode)el.parentNode.removeChild(el)}})(p),900);
    }
  }

  var abcShow=document.querySelector('.abc-show');

  document.addEventListener('click',function(e){
    var t=e.target.closest?e.target.closest('.blk, .ph, .speak, .round, .wc-art, .vcard'):null;
    if(!t||t.disabled)return;
    var x=e.clientX,y=e.clientY;
    if(!x&&!y){ /* keyboard click: burst from the middle of the element */
      var r=t.getBoundingClientRect();
      x=r.left+r.width/2;y=r.top+r.height/2;
    }
    burst(x,y);

    if(t.classList.contains('blk')&&abcShow){
      var idx=Array.prototype.indexOf.call(t.parentNode.children,t);
      abcShow.style.setProperty('--tone','var(--c'+((idx%7)+1)+'i)');
      abcShow.classList.remove('pop');
      void abcShow.offsetWidth;
      abcShow.classList.add('pop');
    }
  });
})();
