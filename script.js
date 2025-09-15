const video1 = document.getElementById('projectvideo1');
const video2 = document.getElementById('projectvideo2');
const video3 = document.getElementById('projectvideo3'); 

const videoList = [video1, video2, video3];

const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const close = document.querySelector('.close-icon');


menu.addEventListener('click', function(){
    sideBar.classList.remove("close-sidebar")
    sideBar.classList.add("open-sidebar")

})

close.addEventListener('click', function(){
    sideBar.classList.remove("open-sidebar")
    sideBar.classList.add("close-sidebar")
})











videoList.forEach(function(video){
    video.addEventListener('mouseover', function(){
        video.pause()
    })

    video.addEventListener('mouseout', function(){
        video.pause()
    })
})


function handleScroll() {
    const elements = document.querySelectorAll('.autoBlur');
    const viewportHeight = window.innerHeight;

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elHeight = rect.height;

        let progress = (viewportHeight - rect.top) / (viewportHeight + elHeight);
        progress = Math.max(0, Math.min(1, progress));

        const blur = Math.abs(0.5 - progress) * 80;
        const opacity = 1 - Math.abs(0.5 - progress) * 2;

        el.style.filter = `blur(${blur}px)`; // fixed
        el.style.opacity = opacity;
    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleScroll);
window.addEventListener('load', handleScroll);






(() => {
  const els = Array.from(document.querySelectorAll('.autoDisplay'));
  const active = new Set();
  let vh = window.innerHeight;
  let ticking = false;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    els.forEach(el => { el.style.transform = 'none'; el.style.filter = 'none'; el.style.opacity = '1'; });
    return;
  }

  // Observe only when near the viewport for perf
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) active.add(e.target);
      else active.delete(e.target);
    });
    requestTick();
  }, { root: null, rootMargin: '20% 0px 20% 0px', threshold: 0 });

  els.forEach(el => io.observe(el));

  function clamp(n, min, max){ return Math.max(min, Math.min(n, max)); }
  function lerp(a, b, t){ return a + (b - a) * t; }
  // “Stronger in the middle” feel
  function easeInOutCubic(t){ return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2; }

  function update(){
    const startY = vh * 0.90; // start anim when top hits 90% (near bottom)
    const endY   = vh * 0.20; // finish by 20% (upper area)

    active.forEach(el => {
      const r = el.getBoundingClientRect();
      // progress: 0 at startY, 1 at endY
      const raw = (startY - r.top) / (startY - endY);
      const p = clamp(raw, 0, 1);
      const t = easeInOutCubic(p);

      const blur = lerp(10, 0, t);
      const ty   = lerp(-200, 0, t);
      const sc   = lerp(0, 1, t);
      const op   = lerp(0.2, 1, t);

      el.style.transform = `translateY(${ty}px) scale(${sc})`;
      el.style.filter = `blur(${blur}px)`;
      el.style.opacity = op.toFixed(3);
    });
  }

  function requestTick(){
    if (!ticking){
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', () => { vh = window.innerHeight; requestTick(); });

  // Initial paint
  requestTick();
})();





(() => {
  const els = Array.from(document.querySelectorAll('.fadeInRight'));
  const active = new Set();
  let vh = window.innerHeight;
  let ticking = false;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) active.add(e.target);
      else active.delete(e.target);
    });
    requestTick();
  }, { rootMargin: "20% 0px 20% 0px" });

  els.forEach(el => io.observe(el));

  function clamp(n, min, max){ return Math.max(min, Math.min(n, max)); }
  function lerp(a, b, t){ return a + (b - a) * t; }

  function update(){
    active.forEach(el => {
      const r = el.getBoundingClientRect();
      const startY = vh * 0.9;  // start anim
      const endY   = vh * 0.2;  // finish anim
      const raw = (startY - r.top) / (startY - endY);
      const p = clamp(raw, 0, 1);

      // Keyframe mimic: 0% → 65% visible → 100%
      const opacity = p < 0.35 ? lerp(0, 1, p/0.35)
                     : p <= 0.65 ? 1
                     : lerp(1, 0.5, (p-0.65)/0.35); // fades again if you want blur back

      const tx = lerp(-500, 0, Math.min(p/0.35, 1));
      const scale = lerp(0.2, 1, Math.min(p/0.35, 1));
      const blur = p <= 0.65 ? lerp(20, 0, Math.min(p/0.35, 1))
                             : lerp(0, 20, (p-0.65)/0.35);

      el.style.opacity = opacity.toFixed(2);
      el.style.transform = `translateX(${tx}px) scale(${scale})`;
      el.style.filter = `blur(${blur}px)`;
    });
  }

  function requestTick(){
    if (!ticking){
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', () => { vh = window.innerHeight; requestTick(); });
  requestTick();
})();




//scroll

      
   
    document.querySelector('.scroll-down').addEventListener('click', function () {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    });
 



















