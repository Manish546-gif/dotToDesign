/* ==========================================================================
   DotToDesign — interaction & motion layer
   GSAP + ScrollTrigger + Lenis. Everything degrades gracefully: without JS
   the content is fully visible; with prefers-reduced-motion the scroll-driven
   effects resolve to static end states.
   ========================================================================== */
(() => {
  const d = document;
  const root = d.documentElement;
  const body = d.body;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);
  // Intro sequences + pinned sections expect to start at the top (hash links still work)
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (!location.hash) scrollTo(0, 0);

  /* ---------------------------------------------------------------- Theme */
  const setTheme = t => { root.dataset.theme = t; try { localStorage.setItem('dtd-theme', t); } catch (e) {} $$('[data-theme-toggle]').forEach(b => b.setAttribute('aria-checked', String(t === 'dark'))); };
  $$('[data-theme-toggle]').forEach(b => b.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark')));
  setTheme(root.dataset.theme || 'dark');

  /* --------------------------------------------------------- Active nav */
  const page = body.dataset.page;
  $$('[data-nav]').forEach(a => { if (a.dataset.nav === page) a.setAttribute('aria-current', 'page'); });

  /* ------------------------------------------------- Rolling text labels */
  $$('.roll').forEach(el => {
    const t = el.textContent.trim();
    el.innerHTML = `<span class="roll__inner">${t}</span><span class="roll__inner" aria-hidden="true">${t}</span>`;
  });

  /* ------------------------------------------- Accessible text splitting */
  const splitWords = el => {
    if (el.dataset.splitDone) return $$('.split-inner', el);
    const text = el.textContent.replace(/\s+/g, ' ').trim();
    el.setAttribute('aria-label', text);
    const lines = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = lines.map(line => {
      const tmp = d.createElement('div'); tmp.innerHTML = line;
      return tmp.textContent.trim().split(' ').map(w => `<span class="split-word" aria-hidden="true"><span class="split-inner">${w}</span></span>`).join(' ');
    }).join('<br>');
    el.dataset.splitDone = '1';
    return $$('.split-inner', el);
  };
  const fillWords = el => {
    const text = el.textContent.replace(/\s+/g, ' ').trim();
    el.setAttribute('aria-label', text);
    el.innerHTML = text.split(' ').map(w => `<span class="w" aria-hidden="true">${w}</span>`).join(' ');
    return $$('.w', el);
  };

  /* ------------------------------------------------------- Mobile menu */
  const menu = $('.menu');
  $$('[data-menu-open]').forEach(b => b.addEventListener('click', () => { menu.classList.add('is-open'); menu.setAttribute('aria-hidden', 'false'); b.setAttribute('aria-expanded', 'true'); lenis && lenis.stop(); }));
  $$('[data-menu-close], .menu a').forEach(b => b.addEventListener('click', () => { menu.classList.remove('is-open'); menu.setAttribute('aria-hidden', 'true'); $$('[data-menu-open]').forEach(x => x.setAttribute('aria-expanded', 'false')); lenis && lenis.start(); }));
  d.addEventListener('keydown', e => { if (e.key === 'Escape' && menu && menu.classList.contains('is-open')) $('[data-menu-close]').click(); });

  /* ------------------------------------------------------ Smooth scroll */
  let lenis = null;
  if (!reduce && window.Lenis && hasGSAP) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis; // debugging hook
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const t = $(id); if (!t) return; e.preventDefault();
    lenis ? lenis.scrollTo(t, { offset: -40 }) : t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }));

  /* -------------------------------------------- Curtain: preload + nav */
  const curtain = $('.curtain');
  const revealPage = () => new Promise(res => {
    if (!curtain) return res();
    if (reduce || !hasGSAP) { curtain.style.display = 'none'; return res(); }
    let first = false; try { first = !sessionStorage.getItem('dtd-visited'); sessionStorage.setItem('dtd-visited', '1'); } catch (e) {}
    const tl = gsap.timeline({ onComplete: () => { curtain.style.display = 'none'; res(); } });
    const paths = $$('.curtain__mark path', curtain);
    if (first) {
      paths.forEach(p => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p.style.fillOpacity = 0; });
      const count = $('.curtain__count span', curtain); const o = { v: 0 };
      tl.to(paths, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut', stagger: 0.12 })
        .to(o, { v: 100, duration: 1.3, ease: 'power2.inOut', onUpdate: () => count && (count.textContent = String(Math.round(o.v)).padStart(3, '0')) }, 0)
        .to(paths, { fillOpacity: 1, duration: 0.4 }, '-=0.2')
        .to(curtain, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '+=0.15');
    } else {
      $$('.curtain__mark, .curtain__count, .curtain__label', curtain).forEach(n => n.style.opacity = 0);
      tl.to(curtain, { yPercent: -100, duration: 0.8, ease: 'expo.inOut', delay: 0.05 });
    }
  });
  const isInternal = a => a.origin === location.origin && !a.hash && !a.target && !a.hasAttribute('download') && a.pathname !== location.pathname;
  if (curtain && hasGSAP && !reduce) {
    d.addEventListener('click', e => {
      const a = e.target.closest('a'); if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      if (!isInternal(a)) return;
      e.preventDefault();
      curtain.style.display = 'grid';
      $$('.curtain__mark, .curtain__count, .curtain__label', curtain).forEach(n => n.style.opacity = 0);
      gsap.fromTo(curtain, { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: 'expo.inOut', onComplete: () => { location.href = a.href; } });
    });
    addEventListener('pageshow', e => { if (e.persisted) { curtain.style.display = 'none'; gsap.set(curtain, { yPercent: -100 }); } });
  }

  /* -------------------------------------------------------------- Cursor */
  const cursor = $('.cursor');
  if (cursor && finePointer && !reduce) {
    root.classList.add('has-cursor');
    const dot = $('.cursor__dot', cursor), lh = $('.cursor__line--h', cursor), lv = $('.cursor__line--v', cursor);
    const label = $('.cursor__label', cursor), media = $('.cursor__media', cursor), mediaImg = $('img', media);
    let mx = innerWidth / 2, my = innerHeight / 2, dx = mx, dy = my, lx = mx, ly = my, vx = 0;
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    addEventListener('pointerdown', () => cursor.classList.add('is-down'));
    addEventListener('pointerup', () => cursor.classList.remove('is-down'));
    d.addEventListener('mouseleave', () => cursor.style.opacity = 0);
    d.addEventListener('mouseenter', () => cursor.style.opacity = 1);
    const loop = () => {
      dx += (mx - dx) * 0.2; dy += (my - dy) * 0.2;
      const nlx = lx + (mx - lx) * 0.14; vx = nlx - lx; lx = nlx; ly += (my - ly) * 0.14;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      lh.style.transform = `translate3d(0, ${my}px, 0)`;
      lv.style.transform = `translate3d(${mx}px, 0, 0)`;
      label.style.left = dx + 'px'; label.style.top = dy + 'px';
      media.style.left = lx + 'px'; media.style.top = ly + 'px';
      media.style.rotate = `${Math.max(-12, Math.min(12, vx * 0.6))}deg`;
      requestAnimationFrame(loop);
    };
    loop();
    const state = el => {
      cursor.classList.remove('is-label', 'is-media', 'is-hidden', 'is-link');
      if (!el) return;
      const t = el.closest('[data-cursor], [data-cursor-img], input, textarea, .btn, .btn-bracket, .icon-btn, .theme-toggle');
      if (!t) return;
      if (t.dataset.cursorImg) { mediaImg.src = t.dataset.cursorImg; cursor.classList.add('is-media'); return; }
      if (t.dataset.cursor === 'hide' || t.matches('input, textarea, .btn, .btn-bracket, .icon-btn, .theme-toggle')) { cursor.classList.add('is-hidden'); return; }
      if (t.dataset.cursor) { label.textContent = t.dataset.cursor; cursor.classList.add('is-label'); }
    };
    d.addEventListener('pointerover', e => state(e.target));
  }

  /* ----------------------------------------------------------- Magnetic */
  if (finePointer && !reduce && hasGSAP) {
    $$('[data-magnetic]').forEach(el => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' }), yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
      el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.3); yTo((e.clientY - r.top - r.height / 2) * 0.35); });
      el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
  }

  /* ------------------------------------------------------- Accordions */
  $$('.accordion').forEach(det => {
    const sum = $('summary', det), bodyEl = $('.accordion__body', det);
    sum.addEventListener('click', e => {
      if (reduce || !hasGSAP) return;
      e.preventDefault();
      if (det.open) { gsap.to(bodyEl, { height: 0, duration: 0.45, ease: 'power3.inOut', onComplete: () => { det.open = false; gsap.set(bodyEl, { clearProps: 'height' }); ScrollTrigger.refresh(); } }); }
      else { det.open = true; gsap.fromTo(bodyEl, { height: 0 }, { height: 'auto', duration: 0.55, ease: 'power3.out', onComplete: () => ScrollTrigger.refresh() }); }
    });
  });

  /* -------------------------------------------------------- Work filter */
  const filterBtns = $$('[data-filter]');
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filterBtns.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    $$('[data-cat]').forEach(card => {
      const show = f === 'all' || card.dataset.cat.split(' ').includes(f);
      if (hasGSAP && !reduce) {
        if (show) { card.classList.remove('is-filtered-out'); gsap.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }); }
        else gsap.to(card, { opacity: 0, duration: 0.25, onComplete: () => card.classList.add('is-filtered-out') });
      } else card.classList.toggle('is-filtered-out', !show);
    });
    hasGSAP && setTimeout(() => ScrollTrigger.refresh(), 350);
  }));

  /* ------------------------------------------------- Forms (prototype) */
  const toast = (title, msg) => {
    let wrap = $('.toast-wrap'); if (!wrap) { wrap = d.createElement('div'); wrap.className = 'toast-wrap'; wrap.setAttribute('role', 'status'); body.appendChild(wrap); }
    const t = d.createElement('div'); t.className = 'toast';
    t.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg><div><p class="t-label-lg">${title}</p><p class="t-body-sm c-secondary">${msg}</p></div>`;
    wrap.appendChild(t);
    hasGSAP && gsap.from(t, { y: 30, opacity: 0, duration: 0.5, ease: 'power3.out' });
    setTimeout(() => hasGSAP ? gsap.to(t, { opacity: 0, y: 10, duration: 0.3, onComplete: () => t.remove() }) : t.remove(), 5000);
  };
  $$('form[data-validate]').forEach(form => {
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      $$('[required]', form).forEach(input => {
        const field = input.closest('.field'); const hint = field && $('.hint', field);
        let msg = '';
        if (input.type === 'checkbox' ? !input.checked : !input.value.trim()) msg = input.type === 'checkbox' ? 'Please accept to continue.' : 'This field is required.';
        else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) msg = 'Enter a valid email address, e.g. name@brand.com.';
        if (field) { field.classList.toggle('is-error', !!msg); input.setAttribute('aria-invalid', String(!!msg)); if (hint) hint.textContent = msg || hint.dataset.default || ''; }
        if (msg) ok = false;
      });
      if (!ok) { const first = $('.is-error input, .is-error textarea', form); first && first.focus(); return; }
      form.reset();
      toast(form.dataset.success || 'Brief received', form.dataset.successMsg || 'We’ll reply within 24 hours.');
    });
  });

  /* --------------------------------------- Single-select chip groups */
  $$('[data-toggle]').forEach(chip => chip.addEventListener('click', () => {
    $$('[data-toggle]', chip.parentElement).forEach(c => c.setAttribute('aria-pressed', String(c === chip)));
  }));

  /* ------------------------------------------------ 404: the lost dot */
  const lostDot = $('[data-lost-dot]');
  if (lostDot && hasGSAP) {
    gsap.set(lostDot, { left: '50%', top: '22%' });
    if (!reduce) {
      gsap.to(lostDot, { x: 'random(-160, 160)', y: 'random(-60, 80)', duration: 3, ease: 'sine.inOut', repeat: -1, repeatRefresh: true });
      if (finePointer) addEventListener('pointermove', e => gsap.to(lostDot, { left: e.clientX, top: e.clientY, duration: 2.2, ease: 'power3.out' }));
    }
  }

  /* ------------------------------------------------- Reading progress */
  const progress = $('.reading-progress');
  if (progress) addEventListener('scroll', () => { const h = root.scrollHeight - innerHeight; progress.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`; }, { passive: true });

  /* =====================================================================
     Scroll-driven motion
     ===================================================================== */
  const header = $('.header'), dock = $('.dock');
  const start = () => {
    if (!hasGSAP || reduce) {
      $$('[data-count]').forEach(el => el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || ''));
      $$('[data-fill]').forEach(el => fillWords(el).forEach(w => w.style.opacity = 1));
      if (dock) dock.classList.add('is-visible');
      return;
    }

    // Header / dock behaviour
    const hero = $('.hero');
    if (hero) {
      ScrollTrigger.create({ trigger: hero, start: 'bottom-=10% bottom', onEnter: () => { header.classList.add('is-hidden'); dock && dock.classList.add('is-visible'); }, onLeaveBack: () => { header.classList.remove('is-hidden'); dock && dock.classList.remove('is-visible'); } });
    } else {
      let last = 0;
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: self => {
        const y = self.scroll();
        header.classList.toggle('is-solid', y > 40);
        header.classList.toggle('is-hidden', y > 300 && y > last);
        dock && dock.classList.toggle('is-visible', y > innerHeight * 0.8);
        last = y;
      } });
    }

    // Hero zoom-out (Clipzo layout × Mōno transform)
    if (hero) {
      const panel = $('.hero__panel', hero);
      const tl = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: 0.8 } });
      tl.to(panel, { scale: 0.42, borderRadius: 16, ease: 'none', duration: 1 }, 0)
        .to($$('.glow', panel), { scale: 0.7, ease: 'none', duration: 1 }, 0)
        .to('.hero__scroll .scroll-ind__bar', { scaleX: 1, ease: 'none', duration: 1 }, 0)
        .to('.hero__scroll', { opacity: 0, ease: 'none', duration: 0.15 }, 0.85);
      // intro
      const words = splitWords($('.hero__title', hero));
      gsap.timeline({ delay: 0.15 })
        .fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.06, clearProps: 'transform' })
        .from($$('.hero__meta, .hero__cta, .hero__construct, .hero__scroll', hero), { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', stagger: 0.08 }, '-=0.8');
    }

    // Curved section edges flatten as they enter
    $$('.curve').forEach(c => gsap.fromTo(c, { scaleY: 1 }, { scaleY: 0, ease: 'none', scrollTrigger: { trigger: c.parentElement, start: 'top bottom', end: 'top 25%', scrub: true } }));

    // Split-word headings
    $$('[data-split]').forEach(el => {
      if (el.closest('.hero')) return;
      const w = splitWords(el);
      gsap.from(w, { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.04, scrollTrigger: { trigger: el, start: 'top 88%' } });
    });

    // Fade-up reveals (grouped stagger)
    const groups = new Map();
    $$('[data-reveal]').forEach(el => { const g = el.closest('[data-reveal-group]') || el; if (!groups.has(g)) groups.set(g, []); groups.get(g).push(el); });
    groups.forEach((els, g) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.09, scrollTrigger: { trigger: g, start: 'top 88%' } }));

    // Image clip reveals
    $$('[data-reveal-img]').forEach(el => {
      const img = $('img', el);
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%' } })
        .to(el, { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.4, ease: 'expo.out' })
        .to(img, { scale: 1, duration: 1.6, ease: 'expo.out' }, 0);
    });

    // Parallax
    $$('[data-parallax]').forEach(el => gsap.fromTo(el, { yPercent: -parseFloat(el.dataset.parallax) * 50 }, { yPercent: parseFloat(el.dataset.parallax) * 50, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));

    // Statement colour fill
    $$('[data-fill]').forEach(el => {
      const w = fillWords(el);
      gsap.to(w, { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } });
    });

    // Counters
    $$('[data-count]').forEach(el => {
      const end = parseFloat(el.dataset.count), dec = parseInt(el.dataset.decimals || '0', 10), o = { v: 0 };
      const fmt = v => (el.dataset.prefix || '') + v.toFixed(dec) + (el.dataset.suffix || '');
      el.textContent = fmt(0);
      gsap.to(o, { v: end, duration: 1.6, ease: 'power3.out', onUpdate: () => el.textContent = fmt(o.v), scrollTrigger: { trigger: el, start: 'top 88%' } });
    });

    // Sticky work stack: previous card scales & dims as the next covers it
    const items = $$('.stack-item');
    items.forEach((it, i) => {
      if (i === items.length - 1) return;
      gsap.to($('.work-card', it), { scale: 0.92, opacity: 0.5, ease: 'none', scrollTrigger: { trigger: items[i + 1], start: 'top bottom', end: 'top top+=120', scrub: true } });
    });

    // Framework: pinned 3D word roll
    const fw = $('.framework');
    if (fw) {
      const words = $$('.framework__words li', fw), descs = $$('.framework__desc p', fw), bars = $$('.framework__progress i', fw);
      gsap.set(words.slice(1), { rotateX: -90, yPercent: 50, opacity: 0 });
      gsap.set(descs.slice(1), { opacity: 0, y: 20 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: fw, start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
      words.forEach((w, i) => {
        tl.to(bars[i], { scaleX: 1, ease: 'none', duration: 1 }, i);
        if (i < words.length - 1) {
          tl.to(w, { rotateX: 90, yPercent: -50, opacity: 0, ease: 'power2.inOut', duration: 0.5 }, i + 0.75)
            .to(words[i + 1], { rotateX: 0, yPercent: 0, opacity: 1, ease: 'power2.inOut', duration: 0.5 }, i + 0.75)
            .to(descs[i], { opacity: 0, y: -20, duration: 0.3 }, i + 0.75)
            .to(descs[i + 1], { opacity: 1, y: 0, duration: 0.3 }, i + 0.95);
        }
      });
    }

    // Testimonials: pinned stack, one card leaves per step
    const ts = $('.testis');
    if (ts) {
      const cards = $$('.testimonial', ts), counter = $('[data-testi-index]', ts);
      cards.forEach((c, i) => gsap.set(c, { zIndex: cards.length - i, rotation: [0, -3, 4, -2][i % 4], y: i * 8 }));
      const tl = gsap.timeline({ scrollTrigger: { trigger: ts, start: 'top top', end: 'bottom bottom', scrub: 0.6, onUpdate: s => { if (counter) counter.textContent = String(Math.min(cards.length, Math.floor(s.progress * cards.length) + 1)).padStart(2, '0'); } } });
      cards.slice(0, -1).forEach((c, i) => tl.to(c, { xPercent: -130, yPercent: -40, rotation: -14, opacity: 0, ease: 'power2.in', duration: 1 }, i));
      tl.to({}, { duration: 0.6 });
    }

    // Studio: anatomy diagram — grid lines draw, mark strokes draw then fill, nodes & labels pop
    const an = $('[data-anatomy]');
    if (an) {
      const lines = $$('.anatomy__lines line', an), paths = $$('.anatomy__mark path', an);
      const ink = getComputedStyle($('.anatomy__mark', an)).color;
      paths.forEach(p => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; p.style.fill = 'rgba(0,0,0,0)'; });
      lines.forEach(l => { l.style.strokeDasharray = '3 4'; });
      gsap.timeline({ scrollTrigger: { trigger: an, start: 'top 75%', end: 'center 45%', scrub: 0.8 } })
        .from(lines, { opacity: 0, stagger: 0.04, duration: 0.4 })
        .to(paths, { strokeDashoffset: 0, duration: 1.2, stagger: 0.15, ease: 'power2.inOut' }, 0.2)
        .to(paths, { fill: ink, duration: 0.4 }, '>-0.1')
        .from($$('.anatomy__node', an), { scale: 0, stagger: 0.05, duration: 0.3 }, '<')
        .from($$('.construct', an), { opacity: 0, y: 16, stagger: 0.08, duration: 0.4 }, '<');
    }

    // Case hero parallax handled by [data-parallax]; refresh after fonts/images
    addEventListener('load', () => ScrollTrigger.refresh());
  };

  revealPage().then(start);
})();
