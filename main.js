var RT_EN=document.documentElement.lang==='en';
var RT_T={"Wide (өргөн хавтан)": "Wide (wide sheet)", "Бэлэн шал": "In stock", "Бүтээгдэхүүн — бүгд": "Availability — all", "Захиалгаар": "To order", "Интерьер": "Interior", "Материал · Material": "Material", "Материал": "Material", "Металл · Metal": "Metal", "Металл": "Metal", "Модон хээ · Wood": "Wood", "Модон хээ": "Wood", "Нэр, кодоор хайх…": "Search by name or code…", "Онцлог — бүгд": "Feature — all", "Тусгай · Specials": "Specials", "Тусгай": "Specials", "Төрөл — бүгд": "Type — all", "Универсаль": "Universal", "Хайх": "Search", "Хэрэглээ — бүгд": "Application — all", "Цуглуулга — бүгд": "Collection — all", "Цул өнгө · Uni": "Uni colour", "Цул өнгө": "Uni colour", "Шинэ": "New", "Ангилал — бүгд": "Class — all", "Ангилал": "Class", "Хаах": "Close", "Экстерьер": "Exterior", "Max Art": "Max Art", "мм": "mm", "Материалын хээ (чулуу, бетон, даавуу) · Material": "Material decors (stone, concrete, textile)", "Гялтгануур эффект · Specials": "Glitter effect · Specials", "Хэвлэмэл дизайн · Max Art": "Printed designs · Max Art", "Материалын хээ": "Material decor", "Гялтгануур эффект": "Glitter effect", "Хэвлэмэл дизайн": "Printed design", "Нэг өнгө · Uni": "Solid colour · Uni", "Нэг өнгө": "Solid colour", "Модны хээ · Wood": "Wood", "Модны хээ": "Wood", "Чулуу, бетон, бүтэцтэй гадаргуу · Material": "Stone, concrete & textured surfaces · Material", "Чулуу, бетон, бүтэцтэй гадаргуу": "Stone, concrete & textured surfaces", "Тусгай эффект (гялтгануур, алтлаг) · Specials": "Special effects (glitter, metallic) · Specials", "Тусгай эффект": "Special effects", "Зургийн хэвлэмэл хээ · Max Art": "Printed images · Max Art", "Зургийн хэвлэмэл хээ": "Printed images"};
function T(s){return RT_EN&&RT_T[s]!==undefined?RT_T[s]:s;}
(function(){
  try{
    var burger = document.getElementById('burgerBtn');
    var mobileNav = document.getElementById('mobileNav');
    var mclose=document.getElementById('menuClose');
    var closeNav=function(){ mobileNav.classList.remove('open'); document.body.classList.remove('menu-open'); if(burger){burger.classList.remove('open');burger.setAttribute('aria-expanded','false');} };
    if(burger && !burger.querySelector('.ico-x')){ var sv=burger.querySelector('svg'); if(sv) sv.classList.add('ico-bars'); burger.insertAdjacentHTML('beforeend','<svg class="ico-x" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M4.5 4.5l11 11M15.5 4.5l-11 11"/></svg>'); }
    if(mclose && mobileNav){ mclose.addEventListener('click', closeNav); }
    if(mobileNav){ document.addEventListener('keydown',function(e){ if(e.key==='Escape' && mobileNav.classList.contains('open')) closeNav(); }); }
    if(burger && mobileNav){
      burger.addEventListener('click', function(){
        var open = mobileNav.classList.toggle('open'); document.body.classList.toggle('menu-open', open);
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
  }catch(e){}

  // fundermax use toggle (exterior / interior)
  try{
    var tabs=document.getElementById('useTabs');
    if(tabs){
      var sets=document.querySelectorAll('.props-set');
      var setUse=function(u){tabs.querySelectorAll('.use-tab').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-use')===u);}); sets.forEach(function(s){s.hidden=s.getAttribute('data-use')!==u;});};
      tabs.addEventListener('click',function(e){var b=e.target.closest('.use-tab'); if(b) setUse(b.getAttribute('data-use'));});
      var q=(location.search.match(/[?&]use=(exterior|interior)/)||[])[1]; if(q) setUse(q);
      if(q==='exterior'){var pt=document.querySelector('.pg-title'); var ex=RT_EN?'Exterior':'Экстерьер'; if(pt) pt.textContent=ex; document.title=ex+' — Fundermax — Render Trade';}
    }
  }catch(e){}

  // homepage hero cards carousel
  try{
    var hct=document.getElementById('hcTrack');
    if(hct){
      var hcs=hct.children, hsSteps=document.querySelectorAll('#hsSteps .hs-step'), hPrev=document.getElementById('hcPrev'), hNext=document.getElementById('hcNext');
      var step=function(){return hcs.length>1?(hcs[1].offsetLeft-hcs[0].offsetLeft):hct.clientWidth;};
      var cur=function(){return Math.round(hct.scrollLeft/step());};
      var upd=function(){var i=cur(); hsSteps.forEach(function(s,k){s.classList.toggle('active',k===i);}); var maxI=Math.max(0,Math.round((hct.scrollWidth-hct.clientWidth)/step())); if(hPrev)hPrev.disabled=i<=0; if(hNext)hNext.disabled=i>=maxI;};
      var go=function(i){hct.scrollTo({left:Math.max(0,i)*step(),behavior:'smooth'});};
      if(hPrev)hPrev.addEventListener('click',function(){go(cur()-1);});
      if(hNext)hNext.addEventListener('click',function(){go(cur()+1);});
      hsSteps.forEach(function(s){s.addEventListener('click',function(){go(parseInt(s.getAttribute('data-i'),10));});});
      hct.addEventListener('scroll',function(){clearTimeout(hct._t);hct._t=setTimeout(upd,80);});
      window.addEventListener('resize',upd); upd();
    }
  }catch(e){}

  // homepage hero: cross info panels (fallback for browsers without :has)
  try{
    var h3=document.getElementById('hero3');
    if(h3&&!(window.CSS&&CSS.supports&&CSS.supports('selector(:has(a))'))){
      var cols=h3.querySelectorAll('.hero3-col');
      cols.forEach(function(c){c.addEventListener('mouseenter',function(){var k=c.getAttribute('data-col');cols.forEach(function(o){if(o!==c){o.classList.add('show-'+k);}});c.classList.add('is-active');});c.addEventListener('mouseleave',function(){cols.forEach(function(o){o.classList.remove('show-a','show-b','is-active');});});});
    }
  }catch(e){}

  // brands page: filters + names view
  try{
    var bfBar=document.getElementById('bfBar');
    if(bfBar){
      var bfOpts=bfBar.querySelectorAll('.bf-opt'), bfItems=document.querySelectorAll('#bgpGrid .bg-item');
      bfOpts.forEach(function(o){o.querySelector('input').addEventListener('change',function(){var v=this.value;bfOpts.forEach(function(x){x.classList.toggle('on',x.querySelector('input').value===v);});bfItems.forEach(function(it){it.hidden=!(v==='all'||(' '+(it.getAttribute('data-cat')||'')+' ').indexOf(' '+v+' ')>-1);});});});
      var bfN=document.getElementById('bfNames'), bfL=document.getElementById('bfList'), bfG=document.getElementById('bgpGrid');
      if(bfN&&bfL&&bfG){bfN.addEventListener('click',function(){var on=bfN.classList.toggle('on');bfL.hidden=!on;bfG.hidden=on;});}
    }
  }catch(e){}

  // brands grid zoom (+ / -)
  try{
    var bgp=document.getElementById('bgpGrid'), bz=document.querySelectorAll('.bgp-z');
    if(bgp&&bz.length){
      var cur=3; var setG=function(n,save){n=Math.max(1,Math.min(3,n));cur=n;bgp.classList.remove('grid-1','grid-2','grid-3');bgp.classList.add('grid-'+n);bz.forEach(function(b){var d=b.getAttribute('data-g');b.classList.toggle('off',(d==='2'&&n===1)||(d==='3'&&n===3));});if(save){try{localStorage.setItem('rt_bgp3',n);}catch(e){}}};
      var sv=null; try{sv=parseInt(localStorage.getItem('rt_bgp3'),10);}catch(e){}
      setG(sv>=1&&sv<=3?sv:3);
      bz.forEach(function(b){b.addEventListener('click',function(){setG(b.getAttribute('data-g')==='2'?cur-1:cur+1,true);});});
    }
  }catch(e){}

  // menu hover image swap
  try{
    var mi=document.querySelector('.menu-img'); var hov=mi?mi.querySelector('.menu-img-hover'):null;
    if(mi&&hov){ document.querySelectorAll('.menu-links a[data-img]').forEach(function(a){ var im=new Image(); im.src=a.getAttribute('data-img'); a.addEventListener('mouseenter',function(){ hov.src=a.getAttribute('data-img'); mi.classList.add('show'); }); a.addEventListener('mouseleave',function(){ mi.classList.remove('show'); }); }); }
  }catch(e){}

  // project detail slider
  try{
    var tr=document.getElementById('pdTrack');
    if(tr){
      var slides=tr.children, cur=document.getElementById('pdCur'), thumbs=document.querySelectorAll('#pdThumbs .pd-thumb');
      var idx=function(){return Math.round(tr.scrollLeft/tr.clientWidth);};
      var go=function(i){ i=Math.max(0,Math.min(slides.length-1,i)); tr.scrollTo({left:i*tr.clientWidth,behavior:'smooth'}); };
      var upd=function(){ var i=idx(); if(cur) cur.textContent=i+1; thumbs.forEach(function(t,k){t.classList.toggle('active',k===i);}); };
      document.getElementById('pdPrev').addEventListener('click',function(){go(idx()-1);});
      document.getElementById('pdNext').addEventListener('click',function(){go(idx()+1);});
      thumbs.forEach(function(t){t.addEventListener('click',function(){go(parseInt(t.getAttribute('data-i'),10));});});
      tr.addEventListener('scroll',function(){ clearTimeout(tr._t); tr._t=setTimeout(upd,80); });
      document.addEventListener('keydown',function(e){ if(e.key==='ArrowRight') go(idx()+1); if(e.key==='ArrowLeft') go(idx()-1); });
    }
  }catch(e){}

  // accordions (project page)
  try{ document.querySelectorAll('.fx-acc-head').forEach(function(b){ b.addEventListener('click',function(){ var a=b.parentElement; var o=a.classList.toggle('open'); b.setAttribute('aria-expanded',o?'true':'false'); }); }); }catch(e){}

  // back to top
  try{ document.querySelectorAll('.hl-totop').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});});}); }catch(e){}

  // textarea counter (contact)
  try{
    document.querySelectorAll('textarea[data-counter]').forEach(function(t){var c=document.getElementById(t.getAttribute('data-counter')); if(!c)return; var u=function(){c.textContent=t.value.length;}; t.addEventListener('input',u); u();});
  }catch(e){}

  // gallery filter (projects page)
  try{
    var buttons = document.querySelectorAll('.filterbtn');
    var items = document.querySelectorAll('.gallery figure');
    if(buttons.length && items.length){
      buttons.forEach(function(btn){
        btn.addEventListener('click', function(){
          buttons.forEach(function(b){b.classList.remove('active');});
          btn.classList.add('active');
          var f = btn.getAttribute('data-filter');
          items.forEach(function(it){
            if(f === 'all' || it.getAttribute('data-cat') === f){
              it.style.display = '';
            } else {
              it.style.display = 'none';
            }
          });
        });
      });
    }
  }catch(e){}


  // downloads: catalogue rows scroll sideways when there are more than four
  try{
    document.querySelectorAll('.cat-wrap.scroll').forEach(function(w){
      var g=w.querySelector('.cat-grid'),pv=w.querySelector('.cat-nav.prev'),nx=w.querySelector('.cat-nav.next');
      var upd=function(){pv.disabled=g.scrollLeft<=4;nx.disabled=g.scrollLeft+g.clientWidth>=g.scrollWidth-4;};
      var step=function(d){var c=g.querySelector('.cat');var s=c?c.getBoundingClientRect().width+parseFloat(getComputedStyle(g).columnGap||0):g.clientWidth;g.scrollBy({left:d*s,behavior:'smooth'});};
      pv.addEventListener('click',function(){step(-1);});nx.addEventListener('click',function(){step(1);});
      g.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);upd();
    });
  }catch(e){}


  // project page: gallery below the cover — arrows scroll, counter, click opens a lightbox
  try{
    document.querySelectorAll('.pd3-gal').forEach(function(g){
      var tr=g.querySelector('.pd3-track'),pv=g.querySelector('.pd3-nav.prev'),nx=g.querySelector('.pd3-nav.next'),ths=[].slice.call(g.querySelectorAll('.pd3-th')),cnt=g.querySelector('.pd3-count b');
      var first=function(){var l=tr.getBoundingClientRect().left,k=0;ths.forEach(function(t,i){if(t.getBoundingClientRect().left-l<8)k=i;});return k;};
      var upd=function(){pv.disabled=tr.scrollLeft<=4;nx.disabled=tr.scrollLeft+tr.clientWidth>=tr.scrollWidth-4;if(cnt)cnt.textContent=first()+1;};
      var go=function(d){var i=Math.max(0,Math.min(ths.length-1,first()+d));tr.scrollTo({left:ths[i].offsetLeft-ths[0].offsetLeft,behavior:'smooth'});};
      pv.addEventListener('click',function(){go(-1);});nx.addEventListener('click',function(){go(1);});
      tr.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);upd();
      ths.forEach(function(t){var im=t.querySelector('img');if(im&&!im.complete)im.addEventListener('load',upd);});window.addEventListener('load',upd);
      // lightbox
      var lb=document.createElement('div');lb.className='pd3-lb';lb.hidden=true;
      lb.innerHTML='<button type="button" class="pd3-lb-x" aria-label="Close">×</button><button type="button" class="pd3-lb-n prev" aria-label="Prev">'+pv.innerHTML+'</button><img alt=""><button type="button" class="pd3-lb-n next" aria-label="Next">'+nx.innerHTML+'</button><span class="pd3-lb-c"></span>';
      document.body.appendChild(lb);
      var li=lb.querySelector('img'),lc=lb.querySelector('.pd3-lb-c'),cur=0;
      var show=function(i){cur=(i+ths.length)%ths.length;li.src=ths[cur].getAttribute('data-src');li.alt=ths[cur].getAttribute('data-alt')||'';lc.textContent=(cur+1)+' / '+ths.length;};
      var close=function(){lb.hidden=true;document.documentElement.style.overflow='';};
      ths.forEach(function(t,i){t.addEventListener('click',function(){show(i);lb.hidden=false;document.documentElement.style.overflow='hidden';});});
      lb.querySelector('.pd3-lb-x').addEventListener('click',close);
      lb.querySelector('.pd3-lb-n.prev').addEventListener('click',function(e){e.stopPropagation();show(cur-1);});
      lb.querySelector('.pd3-lb-n.next').addEventListener('click',function(e){e.stopPropagation();show(cur+1);});
      lb.addEventListener('click',function(e){if(e.target===lb)close();});
      document.addEventListener('keydown',function(e){if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1);});
    });
  }catch(e){}


  // back button: go back in history when coming from this site, otherwise open the parent page
  try{
    document.querySelectorAll('[data-back]').forEach(function(a){
      a.addEventListener('click',function(e){
        var r=document.referrer;
        if(r&&history.length>1){try{if(new URL(r).host===location.host){e.preventDefault();history.back();}}catch(x){}}
      });
    });
  }catch(e){}

  // projects gallery filters (projects page)
  try{
    var pjMat=document.getElementById('pjMat'), pjArea=document.getElementById('pjArea'), pjType=document.getElementById('pjType');
    var pjSearch=document.getElementById('pjSearch');
    var pjCards=document.querySelectorAll('#pjGrid .pcard'), pjCount=document.getElementById('pjCount'), pjEmpty=document.getElementById('pjEmpty'), pjReset=document.getElementById('pjReset');
    if(pjMat && pjArea && pjType && pjCards.length){
      var pjApply=function(){
        var m=pjMat.value, a=pjArea.value, t=pjType.value, shown=0, q=pjSearch?pjSearch.value.toLowerCase().trim():'';
        pjCards.forEach(function(c){
          var ok=(m==='all'||c.getAttribute('data-mat')===m)&&(a==='all'||c.getAttribute('data-area')===a)&&(t==='all'||c.getAttribute('data-type')===t)&&(!q||c.textContent.toLowerCase().indexOf(q)>-1);
          c.hidden=!ok; if(ok) shown++;
        });
        if(pjCount) pjCount.textContent=shown;
        [pjMat,pjArea,pjType].forEach(function(el){var l=el.parentElement; if(l&&l.classList.contains('pyf-sel')) l.classList.toggle('on',el.value!=='all');});
        if(pjEmpty) pjEmpty.hidden=shown!==0;
        pjOpts();
      };
      // only offer options that exist for the other selected filters
      var pjOpts=function(){
        var sels=[[pjMat,'data-mat'],[pjArea,'data-area'],[pjType,'data-type']];
        sels.forEach(function(cur){
          var avail={};
          pjCards.forEach(function(c){
            var ok=sels.every(function(o){return o===cur||o[0].value==='all'||c.getAttribute(o[1])===o[0].value;});
            if(ok) avail[c.getAttribute(cur[1])]=1;
          });
          var n=0;
          Array.prototype.forEach.call(cur[0].options,function(op){
            if(op.value==='all') return;
            var has=!!avail[op.value]; op.hidden=!has; op.disabled=!has; if(has) n++;
          });
          var l=cur[0].parentElement;
          if(l&&l.classList.contains('pyf-sel')) l.classList.toggle('off',n<=1&&cur[0].value==='all');
        });
      };
      [pjMat,pjArea,pjType].forEach(function(el){el.addEventListener('change',pjApply);}); if(pjSearch){pjSearch.addEventListener('input',pjApply);}
      if(pjReset){pjReset.addEventListener('click',function(){pjMat.value='all';pjArea.value='all';pjType.value='all';if(pjSearch)pjSearch.value='';pjApply();});}
      pjOpts();
    }
  }catch(e){}


  // brands grid: on touch / phone the hover text panel is shown under the caption
  try{
    if(window.matchMedia&&window.matchMedia('(max-width:760px), (hover:none)').matches){
      document.querySelectorAll('.bg-item').forEach(function(it){var inf=it.querySelector('.bg-info');if(inf&&inf.parentNode!==it){it.appendChild(inf);}});
    }
  }catch(e){}
  // generic decor finder (brand pages) — data in data/decors.js
  try{
    var root=document.getElementById('dfRoot');
    var D=window.RT_DECORS;
    if(root && D){
      var brand=root.getAttribute('data-brand');
      var rows=D[brand]||[];
      var esc=function(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');};
      var cfg;
      if(brand==='fundermax'){
        rows=rows.map(function(r){r=r.slice();r[1]=r[1].replace(/m\.look exterior/g,'Exterior');if(r[1]==='Exterior|Exterior')r[1]='Exterior';return r;});
        var areaMn={'Exterior':T('Экстерьер'),'Interior':T('Интерьер'),'Universal':T('Универсаль'),'Premium Star':'Premium Star','Interior Plus':'Interior Plus'};
        var catMn={'Uni':T('Нэг өнгө'),'Wood':T('Модны хээ'),'Material':T('Чулуу, бетон, бүтэцтэй гадаргуу'),'Specials':T('Тусгай эффект'),'Metal':T('Металл'),'Max Art':T('Зургийн хэвлэмэл хээ')};
        var useOf=function(r){var a=r[1].split('|'),o=[];if(a.indexOf('Exterior')>-1||a.indexOf('Universal')>-1)o.push('exterior');if(a.indexOf('Interior')>-1||a.indexOf('Universal')>-1||a.indexOf('Premium Star')>-1||a.indexOf('Interior Plus')>-1)o.push('interior');return o;};
        var fimg=(RT_EN?'../':'')+'images/decors/fmx/';
        var sheetStyle=function(base,idx,per,cols,rws){var s=Math.floor(idx/per),p=idx%per,c=p%cols,rw=Math.floor(p/cols);var px=cols>1?(c/(cols-1)*100):0,py=rws>1?(rw/(rws-1)*100):0;return 'background-image:url('+base+s+'.jpg);background-size:'+(cols*100)+'% auto;background-position:'+px.toFixed(3)+'% '+py.toFixed(3)+'%;';};
        var sheetSq=function(base,idx,per,cols,rws,tw,th){var s=Math.floor(idx/per),p=idx%per,c=p%cols,rw=Math.floor(p/cols);var px=(c*tw+(tw-th)/2)/(cols*tw-th)*100,py=rws>1?(rw/(rws-1)*100):0;return 'background-image:url('+base+s+'.jpg);background-size:'+(cols*tw/th*100).toFixed(3)+'% auto;background-position:'+px.toFixed(3)+'% '+py.toFixed(3)+'%;';};
        cfg={sprite:null,sq:true,nameOnly:true,imgStyle:function(r){return sheetSq(fimg+'t',r[8],20,5,4,600,425);},fullStyle:function(r){return sheetStyle(fimg+'f',r[8],12,4,3);},fullRatio:'1500/700',
          filters:[
            {id:'area',label:T('Хэрэглээ — бүгд'),get:useOf,opts:[['exterior',T('Экстерьер')],['interior',T('Интерьер')]]},
            {id:'cat',label:T('Төрөл — бүгд'),get:function(r){return [r[2]];},opts:[['Uni',T('Нэг өнгө · Uni')],['Wood',T('Модны хээ · Wood')],['Material',T('Чулуу, бетон, бүтэцтэй гадаргуу · Material')],['Specials',T('Тусгай эффект (гялтгануур, алтлаг) · Specials')],['Metal',T('Металл · Metal')],['Max Art',T('Зургийн хэвлэмэл хээ · Max Art')]]}
          ],
          name:function(r){return r[0];},search:function(r){return (r[0]+' '+r[3]+' '+r[4]).toLowerCase();},
          cat:function(r){return r[1].split('|').map(function(a){return areaMn[a]||a;}).join(' · ')+' · '+(catMn[r[2]]||r[2]);},
          codes:function(r){var u=T('мм'),us=useOf(r),s='2800×1300 · 4100×1300 · 3670×1630 · 2800×1854 · 4100×1854 '+u,a=[];if(us.indexOf('exterior')>-1)a.push('<b>Max Compact Exterior:</b> '+s);if(us.indexOf('interior')>-1)a.push('<b>Max Compact Interior:</b> '+s);return a.join('<br>');},
          tile:function(r){return r[8];},hex:function(r){return r[6];}};
      } else if(brand==='durasein'){
        var colMn={timeless:'Timeless',brilliant:'Brilliant',lively:'Lively',charming:'Charming',balanced:'Balanced',rooted:'Rooted',dreamy:'Dreamy'};
        cfg={sprite:null,sq:true,
          filters:[{id:'col',label:T('Цуглуулга — бүгд'),get:function(r){return [r[2]];},opts:Object.keys(colMn).map(function(k){return [k,colMn[k]];})},
                   {id:'badge',label:T('Онцлог — бүгд'),get:function(r){return r[3]?r[3].split('|'):[];},opts:[['New',T('Шинэ')],['Wide',T('Wide (өргөн хавтан)')]]}],
          name:function(r){return r[0]+' '+r[1];},search:function(r){return (r[0]+' '+r[1]).toLowerCase();},
          cat:function(r){return (colMn[r[2]]||r[2])+(r[3]?' · '+r[3].replace(/\|/g,' · '):'');},codes:function(){return '';},
          tile:function(){return -1;},hex:function(r){return r[4];}};
      } else if(brand==='krono'){
        var stock={}; (window.RT_KRONO_STOCK||[]).forEach(function(c){stock[String(c).toUpperCase()]=1;});
        var rngs=[]; rows.forEach(function(r){if(rngs.indexOf(r[4])===-1)rngs.push(r[4]);});
        var kimg=(RT_EN?'../':'')+'images/decors/krono/';
        var KIDX={"1665": 0, "4282": 1, "5529": 2, "5537": 3, "5542": 4, "5543": 5, "5943": 6, "5946": 7, "5953": 8, "8072": 9, "8075": 10, "8155": 11, "8259": 12, "8274": 13, "8573": 14, "8630": 15, "8642": 16, "C031": 17, "C509": 18, "C614": 19, "C615": 20, "C616": 21, "K039": 22, "K056": 23, "K278": 24, "K285": 25, "K287": 26, "K327": 27, "K329": 28, "K336": 29, "K338": 30, "K350": 31, "K394": 32, "K395": 33, "K396": 34, "K413": 35, "K418": 36, "K451": 37, "K452": 38, "K470": 39, "K476": 40, "K477": 41, "K478": 42, "U601": 43, "U602": 44, "U603": 45, "U613": 46, "U614": 47, "U615": 48, "U616": 49, "U617": 50, "U618": 51, "U619": 52, "U620": 53, "U628": 54, "U629": 55};
        cfg={sprite:null,sq:true,imgStyle:function(r){var i=KIDX[r[0]];if(i===undefined)return 'background-image:url('+kimg+r[0]+'.jpg);background-size:cover;background-position:center;';var c=i%8,w=Math.floor(i/8);return 'background-image:url('+kimg.replace(/krono\/$/,'')+'krono-thumbs.jpg);background-size:800% auto;background-position:'+(c/7*100).toFixed(3)+'% '+(w/6*100).toFixed(3)+'%;';},full:function(r){return kimg+r[0]+'.jpg';},
          filters:[{id:'avail',label:T('Бүтээгдэхүүн — бүгд'),get:function(r){return [stock[String(r[0]).toUpperCase()]?'stock':'order'];},opts:[['stock',T('Бэлэн шал')],['order',T('Захиалгаар')]]},
                   {id:'col',label:T('Цуглуулга — бүгд'),get:function(r){return [r[4]];},opts:rngs.map(function(c){return [c,c];})},
                   {id:'cls',label:T('Ангилал — бүгд'),get:function(r){return [r[7]];},opts:[['33 / AC5','33 / AC5'],['32 / AC4','32 / AC4']]}],
          name:function(r){return r[0]+' '+r[1];},search:function(r){return (r[0]+' '+r[1]+' '+r[2]+' '+r[3]+' '+r[4]).toLowerCase();},
          cat:function(r){return r[4]+' · '+r[3]+(r[9]?' · '+T('Шинэ'):'');},
          codes:function(r){var u=T('мм');return r[5]+' '+u+' · '+r[6]+' '+u+' · '+T('Ангилал')+' '+r[7]+(r[8]?' · '+r[8]:'');},
          tile:function(){return -1;},hex:function(){return '#e6e6e6';}};
      }
      if(cfg){
        var fwrap=document.getElementById('dfFilters');
        var sels=[];
        cfg.filters.forEach(function(f){
          var s=document.createElement('select'); s.setAttribute('aria-label',f.label);
          s.innerHTML='<option value="all">'+esc(f.label)+'</option>'+f.opts.map(function(o){return '<option value="'+esc(o[0])+'">'+esc(o[1])+'</option>';}).join('');
          fwrap.appendChild(s); sels.push({el:s,f:f});
        });
        var inp=document.createElement('input'); inp.type='text'; inp.placeholder=T('Нэр, кодоор хайх…'); inp.setAttribute('aria-label',T('Хайх')); fwrap.appendChild(inp);
        var cards=document.getElementById('dfCards'), countEl=document.getElementById('dfCount'), emptyEl=document.getElementById('dfEmpty');
        var html=rows.map(function(r,i){
          var t=cfg.tile(r), style;
          if(cfg.imgStyle){
            style=cfg.imgStyle(r);
          } else if(cfg.img && cfg.img(r)){
            style='background-image:url('+cfg.img(r)+');background-size:cover;background-position:center;';
          } else if(cfg.sprite && t>=0){
            var c=t%cfg.cols, rw=Math.floor(t/cfg.cols);
            var px=cfg.cols>1?(c/(cfg.cols-1)*100):0, py=cfg.rows>1?(rw/(cfg.rows-1)*100):0;
            style='background-image:url('+cfg.sprite+');background-size:'+(cfg.cols*100)+'% auto;background-position:'+px.toFixed(3)+'% '+py.toFixed(3)+'%;';
          } else { style='background:'+cfg.hex(r)+';'; }
          var codes=cfg.codes(r);
          return '<div class="decorcard'+((cfg.full||cfg.fullStyle)?' hasfull':'')+'" data-i="'+i+'"><div class="fill tile'+(cfg.sq?' sq':'')+'" style="'+style+'"></div><div class="info">'+(cfg.nameOnly?'':'<div class="cat">'+esc(cfg.cat(r))+'</div>')+'<div class="dname">'+esc(cfg.name(r))+'</div>'+((codes&&!cfg.nameOnly)?'<div class="codes">'+codes+'</div>':'')+'</div></div>';
        }).join('');
        cards.innerHTML=html;
        var els=cards.children;
        if(cfg.full||cfg.fullStyle){
          var lb=document.createElement('div'); lb.className='dlb'; lb.innerHTML='<div class="dlb-box"><button type="button" class="dlb-x" aria-label="'+T('Хаах')+'">×</button>'+(cfg.fullStyle?'<div class="dlb-tile" style="aspect-ratio:'+cfg.fullRatio+'"></div>':'<img alt="">')+'<div class="dlb-info"><div class="dlb-cat"></div><div class="dlb-name"></div><div class="dlb-codes"></div></div></div>';
          document.body.appendChild(lb);
          var lbImg=lb.querySelector('img'),lbTile=lb.querySelector('.dlb-tile'),lbCat=lb.querySelector('.dlb-cat'),lbName=lb.querySelector('.dlb-name'),lbCodes=lb.querySelector('.dlb-codes');
          var closeLb=function(){lb.classList.remove('open');document.body.classList.remove('dlb-open');};
          lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('dlb-x'))closeLb();});
          document.addEventListener('keydown',function(e){if(e.key==='Escape')closeLb();});
          cards.addEventListener('click',function(e){var c=e.target.closest('.decorcard'); if(!c)return; var r=rows[parseInt(c.getAttribute('data-i'),10)]; if(lbTile){lbTile.setAttribute('style','aspect-ratio:'+cfg.fullRatio+';'+cfg.fullStyle(r));}else{lbImg.src=cfg.full(r);} lbCat.textContent=cfg.cat(r); lbName.textContent=cfg.name(r); lbCodes.innerHTML=cfg.codes(r); lb.classList.add('open'); document.body.classList.add('dlb-open');});
        }
        var PAGE=12, page=1, pager=document.getElementById('dfPager');
        var matches=[];
        var render=function(){
          var total=matches.length, pages=Math.max(1,Math.ceil(total/PAGE));
          if(page>pages) page=pages; if(page<1) page=1;
          for(var i=0;i<els.length;i++) els[i].hidden=true;
          var from=(page-1)*PAGE, to=Math.min(total,from+PAGE);
          for(var j=from;j<to;j++) els[matches[j]].hidden=false;
          countEl.textContent=total; if(emptyEl) emptyEl.hidden=total!==0;
          var rng=document.getElementById('dfRange'); if(rng) rng.textContent=total?((from+1)+'–'+to):'0';
          if(pager){
            var h='';
            if(pages>1){
              h+='<button type="button" class="pg" data-p="'+(page-1)+'"'+(page===1?' disabled':'')+'>‹</button>';
              var shown={}; [1,2,3,page-1,page,page+1,pages-1,pages].forEach(function(p){if(p>=1&&p<=pages)shown[p]=1;});
              var last=0; Object.keys(shown).map(Number).sort(function(a,b){return a-b;}).forEach(function(p){
                if(p-last>1) h+='<span class="pg-dots">…</span>';
                h+='<button type="button" class="pg'+(p===page?' active':'')+'" data-p="'+p+'">'+p+'</button>'; last=p;});
              h+='<button type="button" class="pg" data-p="'+(page+1)+'"'+(page===pages?' disabled':'')+'>›</button>';
            }
            pager.innerHTML=h;
          }
        };
        if(pager){pager.addEventListener('click',function(e){var b=e.target.closest('button.pg'); if(!b||b.disabled)return; page=parseInt(b.getAttribute('data-p'),10); render(); var top=root.getBoundingClientRect().top+window.scrollY-90; window.scrollTo({top:top,behavior:'smooth'});});}
        var apply=function(){
          var q=inp.value.toLowerCase().trim(); matches=[];
          for(var i=0;i<rows.length;i++){
            var r=rows[i], ok=true;
            for(var k=0;k<sels.length;k++){var v=sels[k].el.value; if(v!=='all' && sels[k].f.get(r).indexOf(v)===-1){ok=false;break;}}
            if(ok && q && cfg.search(r).indexOf(q)===-1) ok=false;
            if(ok) matches.push(i);
          }
          page=1; render();
        };
        sels.forEach(function(s){s.el.addEventListener('change',apply);}); inp.addEventListener('input',apply);
        try{var qu=(location.search.match(/[?&]use=(exterior|interior)/)||[])[1]; if(qu&&sels[0]&&sels[0].f.id==='area'){sels[0].el.value=qu;}}catch(e){}
        apply();
      }
    }
  }catch(e){}
})();

/* Contact form -> FormSubmit (trade@render.mn) */
(function(){
  var f=document.getElementById('ctForm'); if(!f) return;
  var st=document.getElementById('ctStatus'), btn=f.querySelector('.ct-submit');
  var M=RT_EN?{ok:'Thank you. Your enquiry has been sent — we will get back to you shortly.',err:'Sorry, the message could not be sent. Please call +976 7711 6433 or try again.',wait:'Sending…'}
             :{ok:'Баярлалаа. Таны хүсэлт илгээгдлээ, бид удахгүй холбогдох болно.',err:'Уучлаарай, илгээж чадсангүй. +976 7711 6433 дугаарт залгах эсвэл дахин оролдоно уу.',wait:'Илгээж байна…'};
  var show=function(t,ok){st.textContent=t;st.hidden=false;st.className='ct-status '+(ok?'ok':'err');};
  if(/[?&]sent=1/.test(location.search)) show(M.ok,true);
  f.addEventListener('submit',function(e){
    if(!window.fetch||!window.FormData) return;
    e.preventDefault();
    if(f._honey&&f._honey.value) return;
    var label=btn.textContent; btn.disabled=true; btn.textContent=M.wait;
    var data={}; new FormData(f).forEach(function(v,k){ if(k!=='_next'&&k!=='_honey') data[k]=v; });
    fetch(f.getAttribute('data-ajax'),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
      .then(function(r){return r.json().catch(function(){return {};}).then(function(j){ if(!r.ok||String(j.success)==='false') throw 0; });})
      .then(function(){ f.reset(); var c=document.getElementById('zcCount'); if(c) c.textContent='0'; show(M.ok,true); })
      .catch(function(){ show(M.err,false); })
      .then(function(){ btn.disabled=false; btn.textContent=label; });
  });
})();

/* Projects filter: custom white drop-down panels (native select kept for state) */
(function(){
  var labels=document.querySelectorAll('.pyp .pyf-sel'); if(!labels.length) return;
  var all=[];
  var closeAll=function(except){all.forEach(function(o){if(o!==except&&o.l.classList.contains('open')){o.l.classList.remove('open');o.b.setAttribute('aria-expanded','false');}});};
  var sync=function(){all.forEach(function(o){var op=o.s.options[o.s.selectedIndex];o.b.textContent=op?op.text:'';});};
  labels.forEach(function(l){
    var s=l.querySelector('select'); if(!s) return;
    var b=document.createElement('button'); b.type='button'; b.className='pyf-btn'; b.setAttribute('aria-haspopup','listbox'); b.setAttribute('aria-expanded','false'); b.setAttribute('aria-label',s.getAttribute('aria-label')||'');
    var p=document.createElement('ul'); p.className='pyf-pop'; p.setAttribute('role','listbox');
    s.classList.add('pyf-native'); s.tabIndex=-1; s.setAttribute('aria-hidden','true');
    l.insertBefore(b,s); l.appendChild(p);
    var o={l:l,s:s,b:b,p:p}; all.push(o);
    var build=function(){
      p.innerHTML='';
      Array.prototype.forEach.call(s.options,function(op){
        if(op.hidden||op.disabled) return;
        var li=document.createElement('li'); li.setAttribute('role','option'); li.tabIndex=-1; li.textContent=op.text; li.dataset.v=op.value;
        if(op.value===s.value){li.className='is-sel';li.setAttribute('aria-selected','true');}
        p.appendChild(li);
      });
    };
    var pick=function(v){ if(s.value!==v){s.value=v; s.dispatchEvent(new Event('change',{bubbles:true}));} sync(); closeAll(); b.focus(); };
    b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation(); var open=!l.classList.contains('open'); closeAll(o); if(open){build(); l.classList.add('open'); b.setAttribute('aria-expanded','true'); var c=p.querySelector('.is-sel')||p.firstChild; if(c) c.focus({preventScroll:true});} else {l.classList.remove('open'); b.setAttribute('aria-expanded','false');}});
    p.addEventListener('click',function(e){e.preventDefault();e.stopPropagation(); var li=e.target.closest('li'); if(li) pick(li.dataset.v);});
    p.addEventListener('keydown',function(e){
      var li=document.activeElement; if(!li||li.parentNode!==p) return;
      if(e.key==='ArrowDown'){e.preventDefault(); (li.nextSibling||li).focus();}
      else if(e.key==='ArrowUp'){e.preventDefault(); (li.previousSibling||li).focus();}
      else if(e.key==='Enter'||e.key===' '){e.preventDefault(); pick(li.dataset.v);}
    });
    l.addEventListener('click',function(e){ if(e.target===l){ e.preventDefault(); e.stopPropagation(); b.click(); } });
  });
  document.addEventListener('click',function(){closeAll();});
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ var o=all.filter(function(x){return x.l.classList.contains('open');})[0]; closeAll(); if(o) o.b.focus(); }});
  var r=document.getElementById('pjReset'); if(r) r.addEventListener('click',function(){setTimeout(sync,0);});
  all.forEach(function(o){o.s.addEventListener('change',sync);});
  sync();
})();
