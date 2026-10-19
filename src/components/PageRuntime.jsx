import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export function mountPageRuntime(scope, page, pathname, navigate) {
  const root = document.documentElement;
  const body = document.body;
  const reduce = reduced();
  const fine = finePointer();
  const cleanups = [];
  const q = (selector, parent = scope) => parent.querySelector(selector);
  const qa = (selector, parent = scope) => [...parent.querySelectorAll(selector)];
  const on = (target, event, listener, options) => {
    target.addEventListener(event, listener, options);
    cleanups.push(() => target.removeEventListener(event, listener, options));
  };
  const ctx = gsap.context(() => {}, scope);
  const motion = callback => ctx.add(callback);
  let lenis = null;
  let cursorFrame = null; // null = not running

  root.classList.remove('no-js');
  root.classList.add('js');
  body.dataset.page = page;
  if (!pathname.includes('#')) window.scrollTo(0, 0);
  if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

  // ── Theme ────────────────────────────────────────────────────────────────
  const setTheme = theme => {
    root.dataset.theme = theme;
    try { localStorage.setItem('dtd-theme', theme); } catch { /* optional */ }
    qa('[data-theme-toggle]').forEach(b => b.setAttribute('aria-checked', String(theme === 'dark')));
  };
  let theme = root.dataset.theme || 'dark';
  try { theme = localStorage.getItem('dtd-theme') || theme; } catch { /* optional */ }
  setTheme(theme);
  qa('[data-theme-toggle]').forEach(b => on(b, 'click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark')));
  qa('[data-nav]').forEach(link => { if (link.dataset.nav === page) link.setAttribute('aria-current', 'page'); });

  // Roll text init (clone inner spans for CSS hover animation)
  qa('.roll').forEach(el => {
    const text = el.textContent.trim();
    el.innerHTML = `<span class="roll__inner">${text}</span><span class="roll__inner" aria-hidden="true">${text}</span>`;
  });

  // ── Text split ────────────────────────────────────────────────────────────
  const split = element => {
    if (element.dataset.splitDone) return qa('.split-inner', element);
    const text = element.textContent.replace(/\s+/g, ' ').trim();
    element.setAttribute('aria-label', text);
    element.innerHTML = element.innerHTML
      .split(/<br\s*\/?>/i)
      .map(line => {
        const h = document.createElement('div');
        h.innerHTML = line;
        return h.textContent.trim().split(' ')
          .map(w => `<span class="split-word" aria-hidden="true"><span class="split-inner">${w}</span></span>`)
          .join(' ');
      })
      .join('<br>');
    element.dataset.splitDone = '1';
    return qa('.split-inner', element);
  };

  const fill = element => {
    const text = element.textContent.replace(/\s+/g, ' ').trim();
    element.setAttribute('aria-label', text);
    element.innerHTML = text.split(' ').map(w => `<span class="w" aria-hidden="true">${w}</span>`).join(' ');
    return qa('.w', element);
  };

  // ── Menu ─────────────────────────────────────────────────────────────────
  const menu = q('.menu');
  const closeMenu = () => {
    if (!menu) return;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    qa('[data-menu-open]').forEach(b => b.setAttribute('aria-expanded', 'false'));
    lenis?.start();
  };
  qa('[data-menu-open]').forEach(b => on(b, 'click', () => {
    if (!menu) return;
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    b.setAttribute('aria-expanded', 'true');
    lenis?.stop();
  }));
  qa('[data-menu-close], .menu a').forEach(el => on(el, 'click', closeMenu));
  on(document, 'keydown', e => { if (e.key === 'Escape' && menu?.classList.contains('is-open')) closeMenu(); });

  // ── Smooth scroll (Lenis + GSAP ticker) ──────────────────────────────────
  if (!reduce) {
    lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.85,
      smoothWheel: true,
      autoRaf: false, // driven by gsap.ticker below
    });

    if (!pathname.includes('#')) {
      lenis.scrollTo(0, { immediate: true });
    }

    // Sync Lenis → ScrollTrigger using a single debounced update
    lenis.on('scroll', ScrollTrigger.update);

    const tick = time => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    // lagSmoothing(0) prevents GSAP from skipping frames after tab switches
    gsap.ticker.lagSmoothing(0);

    cleanups.push(() => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    });
  }

  // Smooth anchor scrolling
  qa('a[href^="#"]').forEach(link => on(link, 'click', e => {
    const id = link.getAttribute('href');
    const target = id && id.length > 1 ? q(id) : null;
    if (!target) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(target, { offset: -40 }) : target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  }));

  // ── Page-transition curtain ───────────────────────────────────────────────
  const curtain = q('.curtain');
  if (curtain && reduce) curtain.style.display = 'none';
  if (curtain && !reduce) {
    let isFirstVisit = false;
    try {
      isFirstVisit = !window.sessionStorage.getItem('dtd-visited');
      window.sessionStorage.setItem('dtd-visited', '1');
    } catch { /* storage optional */ }

    motion(() => {
      const paths = qa('.curtain__mark path', curtain);
      const tl = gsap.timeline({
        onComplete: () => {
          // Hide curtain after intro — GPU layer removed to free memory
          curtain.style.display = 'none';
        },
      });

      if (isFirstVisit) {
        paths.forEach(path => {
          const length = path.getTotalLength();
          path.style.strokeDasharray = length;
          path.style.strokeDashoffset = length;
          path.style.fillOpacity = 0;
        });
        const count = q('.curtain__count span', curtain);
        const value = { number: 0 };
        tl.to(paths, { strokeDashoffset: 0, duration: 1.1, stagger: 0.12 })
          .to(value, {
            number: 100, duration: 1.3,
            onUpdate: () => { if (count) count.textContent = String(Math.round(value.number)).padStart(3, '0'); },
          }, 0)
          .to(paths, { fillOpacity: 1, duration: 0.4 }, '-=0.2')
          .to(curtain, { yPercent: -100, duration: 1, ease: 'expo.inOut' }, '+=0.15');
      } else {
        qa('.curtain__mark, .curtain__count, .curtain__label', curtain).forEach(el => { el.style.opacity = 0; });
        tl.to(curtain, { yPercent: -100, duration: 0.55, ease: 'expo.inOut', delay: 0.05 });
      }
    });

    // Page-exit transition: slide curtain in, then SPA navigate
    let isNavigating = false;
    on(document, 'click', e => {
      const link = e.target.closest('a');
      const internal =
        link &&
        link.origin === window.location.origin &&
        !link.hash &&
        !link.target &&
        !link.hasAttribute('download') &&
        link.pathname !== window.location.pathname;
      if (!internal || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();

      if (isNavigating) return;
      isNavigating = true;

      const targetUrl = link.pathname + link.search + (link.hash || '');

      if (reduce) {
        if (navigate) {
          navigate(targetUrl);
        } else {
          window.location.href = link.href;
        }
        return;
      }

      // Re-show curtain from bottom — reset before animating to prevent glitch
      curtain.style.display = 'grid';
      curtain.style.transform = ''; // clear any leftover GSAP inline transform
      motion(() =>
        gsap.fromTo(
          curtain,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.45,
            ease: 'expo.inOut',
            onComplete: () => {
              if (navigate) {
                navigate(targetUrl);
              } else {
                window.location.href = link.href;
              }
            },
          },
        )
      );
    });
  }

  // ── Custom cursor ─────────────────────────────────────────────────────────
  const cursor = q('.cursor');
  if (cursor && fine && !reduce) {
    root.classList.add('has-cursor');
    const dot        = q('.cursor__dot', cursor);
    const horizontal = q('.cursor__line--h', cursor);
    const vertical   = q('.cursor__line--v', cursor);
    const label      = q('.cursor__label', cursor);
    const media      = q('.cursor__media', cursor);
    const image      = q('img', media);

    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;
    let dx = mx, dy = my;
    let lx = mx, ly = my;

    const loop = () => {
      // Lerp dot toward real pointer
      dx += (mx - dx) * 0.2;
      dy += (my - dy) * 0.2;
      // Lerp media card (slower = trailing lag effect)
      const next = lx + (mx - lx) * 0.14;
      const velocity = next - lx;
      lx = next;
      ly += (my - ly) * 0.14;

      // Use transform3d — compositor only, no layout
      dot.style.transform       = `translate3d(${dx}px,${dy}px,0)`;
      horizontal.style.transform = `translate3d(0,${my}px,0)`;
      vertical.style.transform   = `translate3d(${mx}px,0,0)`;
      label.style.left  = `${dx}px`;
      label.style.top   = `${dy}px`;
      media.style.left  = `${lx}px`;
      media.style.top   = `${ly}px`;
      media.style.rotate = `${Math.max(-12, Math.min(12, velocity * 0.6))}deg`;

      cursorFrame = window.requestAnimationFrame(loop);
    };

    on(window, 'pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    on(window, 'pointerdown', () => cursor.classList.add('is-down'));
    on(window, 'pointerup',   () => cursor.classList.remove('is-down'));
    on(document, 'mouseleave', () => { cursor.style.opacity = '0'; });
    on(document, 'mouseenter', () => { cursor.style.opacity = '1'; });
    on(document, 'pointerover', e => {
      cursor.classList.remove('is-label', 'is-media', 'is-hidden', 'is-link');
      const target = e.target.closest('[data-cursor], [data-cursor-img], input, textarea, .btn, .btn-bracket, .icon-btn, .theme-toggle');
      if (!target) return;
      if (target.dataset.cursorImg) {
        image.src = target.dataset.cursorImg;
        cursor.classList.add('is-media');
      } else if (target.dataset.cursor === 'hide' || target.matches('input,textarea,.btn,.btn-bracket,.icon-btn,.theme-toggle')) {
        cursor.classList.add('is-hidden');
      } else if (target.dataset.cursor) {
        label.textContent = target.dataset.cursor;
        cursor.classList.add('is-label');
      }
    });

    loop();

    cleanups.push(() => {
      if (cursorFrame !== null) { window.cancelAnimationFrame(cursorFrame); cursorFrame = null; }
      root.classList.remove('has-cursor');
    });
  }

  // Magnetic effect (only for fine-pointer, no reduced-motion)
  if (fine && !reduce) {
    qa('[data-magnetic]').forEach(el => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
      on(el, 'pointermove', e => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - rect.left - rect.width  / 2) * 0.3);
        yTo((e.clientY - rect.top  - rect.height / 2) * 0.35);
      });
      on(el, 'pointerleave', () => { xTo(0); yTo(0); });
    });
  }

  // ── Accordion ────────────────────────────────────────────────────────────
  qa('.accordion').forEach(details => on(q('summary', details), 'click', e => {
    if (reduce) return;
    e.preventDefault();
    const content = q('.accordion__body', details);
    motion(() => {
      if (details.open) {
        gsap.to(content, { height: 0, duration: 0.45, onComplete: () => { details.open = false; gsap.set(content, { clearProps: 'height' }); ScrollTrigger.refresh(); } });
      } else {
        details.open = true;
        gsap.fromTo(content, { height: 0 }, { height: 'auto', duration: 0.55, onComplete: () => ScrollTrigger.refresh() });
      }
    });
  }));

  // ── Work filter ──────────────────────────────────────────────────────────
  const filterButtons = qa('[data-filter]');
  filterButtons.forEach(button => on(button, 'click', () => {
    filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    qa('[data-cat]').forEach(card => {
      const visible = button.dataset.filter === 'all' || card.dataset.cat.split(' ').includes(button.dataset.filter);
      if (reduce) {
        card.classList.toggle('is-filtered-out', !visible);
      } else if (visible) {
        card.classList.remove('is-filtered-out');
        motion(() => gsap.fromTo(card, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }));
      } else {
        motion(() => gsap.to(card, { opacity: 0, duration: 0.25, onComplete: () => card.classList.add('is-filtered-out') }));
      }
    });
  }));

  qa('[data-toggle]').forEach(chip => on(chip, 'click', () =>
    qa('[data-toggle]', chip.parentElement).forEach(item => item.setAttribute('aria-pressed', String(item === chip)))
  ));

  // ── Form validation ──────────────────────────────────────────────────────
  qa('form[data-validate]').forEach(form => {
    form.setAttribute('novalidate', '');
    on(form, 'submit', async e => {
      e.preventDefault();
      let valid = true;
      qa('[required]', form).forEach(input => {
        const field = input.closest('.field');
        const hint  = field && q('.hint', field);
        let message = '';
        if (input.type === 'checkbox' ? !input.checked : !input.value.trim()) {
          message = input.type === 'checkbox' ? 'Please accept to continue.' : 'This field is required.';
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          message = 'Enter a valid email address, e.g. name@brand.com.';
        }
        field?.classList.toggle('is-error', !!message);
        input.setAttribute('aria-invalid', String(!!message));
        if (hint) hint.textContent = message || hint.dataset.default || '';
        if (message) valid = false;
      });

      if (!valid) {
        q('.is-error input, .is-error textarea', form)?.focus();
      } else {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.setAttribute('role', 'status');
        body.appendChild(toast);
        const submitButton = q('[type="submit"]', form);
        if (submitButton) submitButton.disabled = true;

        try {
          const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } = import.meta.env;
          if (!VITE_EMAILJS_SERVICE_ID || !VITE_EMAILJS_TEMPLATE_ID || !VITE_EMAILJS_PUBLIC_KEY) {
            throw new Error('EmailJS is not configured. Add its service ID, template ID, and public key to the Vite environment.');
          }

          const formData = new FormData(form);
          const selectedEngagement = q('[data-toggle][aria-pressed="true"]', form)?.textContent.trim() || '';
          const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              service_id: VITE_EMAILJS_SERVICE_ID,
              template_id: VITE_EMAILJS_TEMPLATE_ID,
              user_id: VITE_EMAILJS_PUBLIC_KEY,
              template_params: {
                form_type: form.dataset.emailjsType || 'website contact',
                name: formData.get('name') || 'Website visitor',
                email: formData.get('email') || '',
                reply_to: formData.get('email') || '',
                brand: formData.get('brand') || '',
                engagement: selectedEngagement,
                message: formData.get('message') || '',
              },
            }),
          });
          if (!response.ok) throw new Error(`EmailJS request failed (${response.status}).`);

          form.reset();
          toast.textContent = form.dataset.success || 'Message sent';
          window.setTimeout(() => toast.remove(), 5000);
        } catch (error) {
          toast.textContent = 'Unable to send right now. Please try again or email hello@dot-todesign.com.';
          console.error(error);
          window.setTimeout(() => toast.remove(), 7000);
        } finally {
          if (submitButton) {
            submitButton.disabled = false;
          }
        }
      }
    });
  });

  // ── Reading progress bar ─────────────────────────────────────────────────
  const progress = q('.reading-progress');
  if (progress) {
    on(window, 'scroll', () => {
      const height = root.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${height > 0 ? window.scrollY / height : 0})`;
    }, { passive: true });
  }

  // ── Lost dot decoration ──────────────────────────────────────────────────
  const lostDot = q('[data-lost-dot]');
  if (lostDot) {
    motion(() => gsap.set(lostDot, { left: '50%', top: '22%' }));
    if (!reduce) motion(() => gsap.to(lostDot, { x: 'random(-160, 160)', y: 'random(-60, 80)', duration: 3, repeat: -1, repeatRefresh: true }));
  }

  // ── Scroll-driven animations ──────────────────────────────────────────────
  const hero   = q('.hero');
  const header = q('.header');
  const dock   = q('.dock');

  const staticState = () => {
    qa('[data-count]').forEach(el => { el.textContent = (el.dataset.prefix || '') + el.dataset.count + (el.dataset.suffix || ''); });
    qa('[data-fill]').forEach(el => fill(el).forEach(w => { w.style.opacity = 1; }));
    dock?.classList.add('is-visible');
  };

  if (reduce) {
    staticState();
  } else {
    // Header show/hide
    if (hero) {
      motion(() => ScrollTrigger.create({
        trigger: hero, start: 'bottom-=10% bottom',
        onEnter:     () => { header?.classList.add('is-hidden');    dock?.classList.add('is-visible'); },
        onLeaveBack: () => { header?.classList.remove('is-hidden'); dock?.classList.remove('is-visible'); },
      }));
    } else {
      motion(() => {
        let previous = 0;
        ScrollTrigger.create({
          start: 0, end: 'max',
          onUpdate: state => {
            const y = state.scroll();
            header?.classList.toggle('is-solid',  y > 40);
            header?.classList.toggle('is-hidden', y > 300 && y > previous);
            dock?.classList.toggle('is-visible',  y > window.innerHeight * 0.8);
            previous = y;
          },
        });
      });
    }

    // Hero panel zoom-out
    if (hero) {
      motion(() => {
        const panel = q('.hero__panel', hero);
        gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: 0.8 } })
          .to(panel, { scale: 0.42, borderRadius: 16, ease: 'none' })
          .to(qa('.glow', panel), { scale: 0.7, ease: 'none' }, 0)
          .to('.hero__scroll .scroll-ind__bar', { scaleX: 1, ease: 'none' }, 0)
          .to('.hero__scroll', { opacity: 0 }, 0.85);

        gsap.timeline({ delay: 0.15 })
          .fromTo(split(q('.hero__title', hero)), { yPercent: 110 }, { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.06 })
          .from(qa('.hero__meta, .hero__cta, .hero__construct, .hero__scroll', hero), { opacity: 0, y: 24, duration: 0.9, stagger: 0.08 }, '-=0.8');
      });
    }

    // Curve collapse
    qa('.curve').forEach(el => motion(() =>
      gsap.fromTo(el, { scaleY: 1 }, { scaleY: 0, scrollTrigger: { trigger: el.closest('.curve-wrap') || el.parentElement, start: 'top bottom', end: 'top 25%', scrub: true } })
    ));

    // Text splits (non-hero)
    qa('[data-split]').forEach(el => {
      if (!el.closest('.hero')) {
        motion(() => gsap.from(split(el), { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.04, scrollTrigger: { trigger: el, start: 'top 88%' } }));
      }
    });

    // Reveal elements (grouped for performance — one ScrollTrigger per group)
    const groups = new Map();
    qa('[data-reveal]').forEach(el => {
      const group = el.closest('[data-reveal-group]') || el;
      if (!groups.has(group)) groups.set(group, []);
      groups.get(group).push(el);
    });
    groups.forEach((elements, group) => motion(() =>
      gsap.to(elements, { opacity: 1, y: 0, duration: 1, stagger: 0.09, scrollTrigger: { trigger: group, start: 'top 88%' } })
    ));

    // Image reveal with clip-path
    qa('[data-reveal-img]').forEach(el => motion(() =>
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 85%' } })
        .to(el, { clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.4, ease: 'expo.out' })
        .to(q('img', el), { scale: 1, duration: 1.6 }, 0)
    ));

    // Parallax
    qa('[data-parallax]').forEach(el => motion(() =>
      gsap.fromTo(el,
        { yPercent: -parseFloat(el.dataset.parallax) * 50 },
        { yPercent: parseFloat(el.dataset.parallax) * 50, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }
      )
    ));

    // Scroll-fill text
    qa('[data-fill]').forEach(el => motion(() =>
      gsap.to(fill(el), { opacity: 1, stagger: 0.08, scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } })
    ));

    // Count-up numbers
    qa('[data-count]').forEach(el => motion(() => {
      const value = { number: 0 };
      const end = parseFloat(el.dataset.count);
      const format = n => (el.dataset.prefix || '') + n.toFixed(parseInt(el.dataset.decimals || '0', 10)) + (el.dataset.suffix || '');
      gsap.to(value, { number: end, duration: 1.6, onUpdate: () => { el.textContent = format(value.number); }, scrollTrigger: { trigger: el, start: 'top 88%' } });
    }));

    // Sticky work cards — shrink previous on next scroll in
    const stack = qa('.stack-item');
    stack.forEach((item, i) => {
      if (i < stack.length - 1) {
        motion(() => gsap.to(q('.work-card', item), { scale: 0.92, scrollTrigger: { trigger: stack[i + 1], start: 'top bottom', end: 'top top+=120', scrub: true } }));
      }
    });

    // Framework word-roll (3-D)
    const framework = q('.framework');
    if (framework) motion(() => {
      const words        = qa('.framework__words li', framework);
      const descriptions = qa('.framework__desc p', framework);
      const bars         = qa('.framework__progress i', framework);
      gsap.set(words.slice(1), { rotateX: -90, yPercent: 50, opacity: 0 });
      gsap.set(descriptions.slice(1), { opacity: 0, y: 20 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: framework, start: 'top top', end: 'bottom bottom', scrub: 0.6 } });
      words.forEach((word, i) => {
        tl.to(bars[i], { scaleX: 1, duration: 1 }, i);
        if (i < words.length - 1) {
          tl.to(word,             { rotateX: 90, yPercent: -50, opacity: 0, duration: 0.5 }, i + 0.75)
            .to(words[i + 1],    { rotateX: 0,  yPercent: 0,   opacity: 1, duration: 0.5 }, i + 0.75)
            .to(descriptions[i], { opacity: 0, y: -20, duration: 0.3 }, i + 0.75)
            .to(descriptions[i + 1], { opacity: 1, y: 0, duration: 0.3 }, i + 0.95);
        }
      });
    });

    // Testimonials (scroll-driven card deck)
    const testimonials = q('.testis');
    if (testimonials) motion(() => {
      const cards   = qa('.testimonial', testimonials);
      const counter = q('[data-testi-index]', testimonials);
      cards.forEach((card, i) => gsap.set(card, { zIndex: cards.length - i, rotation: [0, -3, 4, -2][i % 4], y: i * 8 }));
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: testimonials, start: 'top top', end: 'bottom bottom', scrub: 0.6,
          onUpdate: state => {
            if (counter) counter.textContent = String(Math.min(cards.length, Math.floor(state.progress * cards.length) + 1)).padStart(2, '0');
          },
        },
      });
      cards.slice(0, -1).forEach((card, i) => tl.to(card, { xPercent: -130, yPercent: -40, rotation: -14, opacity: 0, duration: 1 }, i));
    });

    // Anatomy SVG draw
    const anatomy = q('[data-anatomy]');
    if (anatomy) motion(() => {
      const lines = qa('.anatomy__lines line', anatomy);
      const paths = qa('.anatomy__mark path', anatomy);
      const mark  = q('.anatomy__mark', anatomy);
      paths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray  = length;
        path.style.strokeDashoffset = length;
        path.style.fill = 'rgba(0,0,0,0)';
      });
      gsap.timeline({ scrollTrigger: { trigger: anatomy, start: 'top 75%', end: 'center 45%', scrub: 0.8 } })
        .from(lines, { opacity: 0, stagger: 0.04 })
        .to(paths, { strokeDashoffset: 0, duration: 1.2, stagger: 0.15 }, 0.2)
        .to(paths, { fill: window.getComputedStyle(mark).color, duration: 0.4 }, '>-0.1')
        .from(qa('.anatomy__node, .construct', anatomy), { scale: 0, opacity: 0, stagger: 0.05 }, '<');
    });
  }

  // Refresh ScrollTrigger after all images/fonts have loaded — debounced to
  // avoid repeated calls when many resources resolve at similar times.
  let refreshTimer = null;
  const scheduleRefresh = () => {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 120);
  };
  on(window, 'load', scheduleRefresh);
  // Also refresh if fonts cause layout shift after the load event
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleRefresh);
  }

  return () => {
    clearTimeout(refreshTimer);
    cleanups.splice(0).forEach(fn => fn());
    ctx.revert();
    if (cursorFrame !== null) { window.cancelAnimationFrame(cursorFrame); cursorFrame = null; }
    root.classList.remove('has-cursor');
    if (body.dataset.page === page) delete body.dataset.page;
  };
}
