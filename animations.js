// === Sri Vishnu Safety Nets — Premium Animation Engine ===
(function(){
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
  if(reduced) return;

  // --- Scroll progress bar ---
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);
  const onScroll = () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + '%';
  };
  addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // --- Cursor glow (desktop only) ---
  if(matchMedia('(hover:hover) and (pointer:fine)').matches){
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    addEventListener('mousemove', e => {
      glow.classList.add('active');
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
    addEventListener('mouseleave', () => glow.classList.remove('active'));
  }

  // --- Auto-tag elements for reveal ---
  const autoSelectors = ['.section-head','.card','.project-card','.gallery-grid > *','.stat','.feature','.f-col'];
  autoSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el,i) => {
      if(!el.classList.contains('reveal')) el.classList.add('reveal');
      if(i>0 && i<6) el.dataset.delay = String(i);
    });
  });
  // Stagger grids
  document.querySelectorAll('.grid, .projects-grid, .gallery-grid, .footer-grid').forEach(g => g.classList.add('stagger'));

  // --- IntersectionObserver reveal ---
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold:.12, rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.reveal, .stagger, .section-head').forEach(el => io.observe(el));

  // --- 3D tilt on cards ---
  const tiltSel = '.card, .project-card, .stat, .feature';
  document.querySelectorAll(tiltSel).forEach(el => {
    el.classList.add('tilt');
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(900px) rotateX(${(-y*8).toFixed(2)}deg) rotateY(${(x*10).toFixed(2)}deg) translateY(-6px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });

  // --- Magnetic buttons + ripple ---
  document.querySelectorAll('.btn-hero,.btn-outline,.call-btn,.float-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      btn.style.setProperty('--mx', x+'px');
      btn.style.setProperty('--my', y+'px');
      const dx = (x - r.width/2) / r.width;
      const dy = (y - r.height/2) / r.height;
      btn.style.transform = `translate(${dx*8}px, ${dy*8}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    btn.addEventListener('click', e => {
      const r = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(r.width, r.height);
      ripple.style.width = ripple.style.height = size+'px';
      ripple.style.left = (e.clientX - r.left - size/2)+'px';
      ripple.style.top = (e.clientY - r.top - size/2)+'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // --- Animated counters in .stat .v ---
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(!e.isIntersecting) return;
      const el = e.target;
      const text = el.textContent.trim();
      const match = text.match(/([\d.]+)/);
      if(!match) return;
      const target = parseFloat(match[1]);
      const suffix = text.slice(match.index + match[0].length);
      const prefix = text.slice(0, match.index);
      const dur = 1400, start = performance.now();
      const isInt = Number.isInteger(target);
      function tick(t){
        const p = Math.min(1, (t-start)/dur);
        const eased = 1 - Math.pow(1-p, 3);
        const val = target * eased;
        el.textContent = prefix + (isInt ? Math.round(val).toLocaleString() : val.toFixed(1)) + suffix;
        if(p<1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, {threshold:.5});
  document.querySelectorAll('.stat .v').forEach(el => counterIO.observe(el));

  // --- Hero parallax on mouse ---
  const hero = document.querySelector('.hero');
  if(hero){
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - .5;
      const y = (e.clientY - r.top)/r.height - .5;
      hero.querySelectorAll('.slide.active').forEach(s => {
        s.style.transform = `scale(1.08) translate(${x*-20}px, ${y*-20}px)`;
      });
    });
  }

  // --- Inject decorative blobs into hero & section heads ---
  if(hero && !hero.querySelector('.blobs')){
    const b = document.createElement('div');
    b.className = 'blobs';
    b.innerHTML = '<span class="blob b1"></span><span class="blob b2"></span><span class="blob b3"></span>';
    hero.prepend(b);
  }

  // --- Marquee strip after hero ---
  if(hero && !document.querySelector('.marquee')){
    const m = document.createElement('div');
    m.className = 'marquee';
    const items = ['10+ Years Experience','5,000+ Happy Clients','ISI Certified Materials','Free Site Inspection','Same-Day Service','UV Resistant Nets','7 Year Warranty','24/7 Support'];
    const row = items.map(t => `<span><i class="dot"></i>${t}</span>`).join('');
    m.innerHTML = `<div class="marquee-track">${row}${row}</div>`;
    hero.after(m);
  }
})();
