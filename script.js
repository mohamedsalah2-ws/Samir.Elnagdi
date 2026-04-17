'use strict';

const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const lerp  = (a, b, t) => a + (b - a) * t;

/* 1. THEME TOGGLE */
(function initTheme() {
  const html    = document.documentElement;
  const overlay = qs('#theme-overlay');
  const btn     = qs('#theme-toggle');
  if (!btn || !overlay) return;

  const saved = localStorage.getItem('as-theme');
  if (saved) html.setAttribute('data-theme', saved);

  btn.addEventListener('click', function () {
    const rect    = btn.getBoundingClientRect();
    const x       = rect.left + rect.width / 2;
    const y       = rect.top  + rect.height / 2;
    const current = html.getAttribute('data-theme') || 'dark';
    const next    = current === 'dark' ? 'light' : 'dark';
    const destBg  = next === 'light' ? '#f4f0e8' : '#08080a';

    overlay.style.background   = destBg;
    overlay.style.clipPath     = `circle(0px at ${x}px ${y}px)`;
    overlay.style.transition   = 'none';
    overlay.style.display      = 'block';

    void overlay.getBoundingClientRect();

    overlay.style.transition   = 'clip-path .72s cubic-bezier(.76,0,.24,1)';
    overlay.style.clipPath     = `circle(170vmax at ${x}px ${y}px)`;

    setTimeout(() => {
      html.setAttribute('data-theme', next);
      localStorage.setItem('as-theme', next);
      overlay.style.transition = 'none';
      overlay.style.clipPath   = 'circle(0px at 50% 50%)';
      overlay.style.display    = 'none';
    }, 740);
  });
})();

/* 2. MAGNETIC ELEMENTS */
(function initMagnetic() {
  const STRENGTH = 0.32;
  qsa('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r   = el.getBoundingClientRect();
      const cx  = r.left + r.width  / 2;
      const cy  = r.top  + r.height / 2;
      const dx  = (e.clientX - cx) * STRENGTH;
      const dy  = (e.clientY - cy) * STRENGTH;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0,0)';
      el.style.transition = 'transform .45s cubic-bezier(.16,1,.3,1)';
    });
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform .1s ease';
    });
  });
})();

/* 3. NAV SCROLL GLASS */
(function initNav() {
  const nav = qs('#nav');
  if (!nav) return;
  const toggle = () => nav.classList.toggle('scrolled', window.scrollY > 70);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  const sections = qsa('section[id]');
  const links    = qsa('.nav-link');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.remove('active'));
        const active = links.find(l => l.getAttribute('href') === `#${id}`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => observer.observe(s));
})();

/* 4. SCROLL REVEAL */
(function initReveal() {
  const items = qsa('[data-reveal]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.getAttribute('data-delay') || 0);
      setTimeout(() => el.classList.add('in'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => observer.observe(el));

  const heroItems = qsa('#hero [data-reveal]');
  setTimeout(() => {
    heroItems.forEach(el => {
      const delay = parseInt(el.getAttribute('data-delay') || 0);
      setTimeout(() => el.classList.add('in'), delay + 200);
    });
  }, 100);
})();

/* 5. COUNTER ANIMATION */
(function initCounters() {
  const counters = qsa('.counter');
  if (!counters.length) return;
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'));
    const duration = 1800;
    const start    = performance.now();
    function tick(now) {
      const elapsed  = now - start;
      const progress = clamp(elapsed / duration, 0, 1);
      el.textContent = Math.round(easeOut(progress) * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
})();

/* 6. WORKS FILTER */
(function initFilter() {
  const btns  = qsa('.filter-btn');
  const cards = qsa('.work-card');
  if (!btns.length) return;
  function filter(cat) {
    cards.forEach(card => {
      const match = cat === 'all' || card.getAttribute('data-cat') === cat;
      if (match) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filter(btn.getAttribute('data-filter'));
    });
  });
})();

/* 7. CARD CLICK → PROJECT PAGE */
(function initWorkCardLinks() {
  qsa('.work-card[data-project], .auto-card[data-project]').forEach(card => {
    const id = card.getAttribute('data-project');
    if (!id) return;
    card.addEventListener('click', e => {
      if (e.target.closest('a')) return;
      window.location.href = `project.html?id=${id}`;
    });
    const btn = card.querySelector('.work-view-btn');
    if (btn) {
      const a = document.createElement('a');
      a.className = 'work-view-btn';
      a.href = `project.html?id=${id}`;
      a.textContent = 'View Project ↗';
      btn.replaceWith(a);
    }
  });
})();

/* 8. CONTACT FORM */
(function initForm() {
  const form    = qs('#contact-form');
  const success = qs('#form-success');
  if (!form) return;
  function shake(el) {
    el.style.animation = 'none';
    el.style.borderColor = 'var(--red)';
    setTimeout(() => { el.style.animation = ''; el.style.borderColor = ''; }, 600);
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name  = qs('#f-name',  form);
    const email = qs('#f-email', form);
    const msg   = qs('#f-msg',   form);
    let valid   = true;
    if (!name.value.trim())  { shake(name);  valid = false; }
    if (!email.value.includes('@')) { shake(email); valid = false; }
    if (!msg.value.trim())   { shake(msg);   valid = false; }
    if (!valid) return;
    const btn = qs('.form-submit', form);
    btn.style.opacity = '.6';
    btn.style.pointerEvents = 'none';
    qs('.submit-text', btn).textContent = 'Sending...';
    setTimeout(() => {
      form.style.display  = 'none';
      success.style.display = 'block';
    }, 1400);
  });
  qsa('.form-input', form).forEach(input => {
    input.addEventListener('focus',  () => input.closest('.form-group')?.classList.add('focused'));
    input.addEventListener('blur',   () => input.closest('.form-group')?.classList.remove('focused'));
  });
})();

/* 9. VISUAL PARALLAX */
(function initOrbParallax() {
  const vis  = qs('.hero-visual');
  const hero = qs('#hero');
  if (!vis || !hero) return;
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
  hero.addEventListener('mousemove', e => {
    const r  = hero.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    targetX  = (e.clientX - cx) / r.width  * 14;
    targetY  = (e.clientY - cy) / r.height * 14;
  });
  hero.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });
  function animVis() {
    currentX = lerp(currentX, targetX, .07);
    currentY = lerp(currentY, targetY, .07);
    vis.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(animVis);
  }
  animVis();
})();

/* 10. TICKER */
(function initTicker() {
  const inner = qs('#ticker');
  if (!inner) return;
  inner.innerHTML += inner.innerHTML;
})();

/* 11. SMOOTH SCROLL */
(function initSmoothScroll() {
  qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = qs(href);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();

/* 12. EXPERTISE CARDS 3D TILT */
(function initCardTilt() {
  const cards = qsa('.exp-card');
  const TILT  = 5;
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const x   = (e.clientX - r.left) / r.width  - .5;
      const y   = (e.clientY - r.top)  / r.height - .5;
      card.style.transform    = `perspective(800px) rotateY(${x * TILT}deg) rotateX(${-y * TILT}deg)`;
      card.style.transition   = 'transform .1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
      card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
    });
  });
})();

/* 13. HERO CANVAS */
(function initHeroCanvas() {
  const canvas = qs('#hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouseX = -9999, mouseY = -9999, raf;
  const PARTICLE_COUNT = 90;
  const MAX_DIST       = 130;
  const MOUSE_REPEL    = 90;
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  function isDark() { return document.documentElement.getAttribute('data-theme') !== 'light'; }
  function makeParticle() {
    return {
      x:  Math.random() * W, y:  Math.random() * H,
      vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      r:  Math.random() * 1.4 + .4, a:  Math.random() * .6 + .2,
    };
  }
  function init() { particles = Array.from({ length: PARTICLE_COUNT }, makeParticle); }
  function drawFrame() {
    ctx.clearRect(0, 0, W, H);
    const dark     = isDark();
    const dotColor = dark ? '200,162,85' : '130,100,40';
    const linColor = dark ? '200,162,85' : '130,100,40';
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p = particles[i], q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * (dark ? .18 : .1);
          ctx.beginPath(); ctx.strokeStyle = `rgba(${linColor},${alpha})`; ctx.lineWidth = .6;
          ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    particles.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${dotColor},${p.a * (dark ? 1 : .7)})`; ctx.fill();
    });
  }
  function update() {
    particles.forEach(p => {
      const dx = p.x - mouseX, dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_REPEL) {
        const force = (1 - dist / MOUSE_REPEL) * .6;
        p.vx += (dx / dist) * force; p.vy += (dy / dist) * force;
      }
      p.vx *= .97; p.vy *= .97;
      p.x  += p.vx; p.y  += p.vy;
      if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
    });
  }
  function loop() {
    update(); drawFrame(); raf = requestAnimationFrame(loop);
  }
  const hero = qs('#hero');
  if (hero) {
    hero.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect(); mouseX = e.clientX - r.left; mouseY = e.clientY - r.top;
    });
    hero.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });
  }
  const ro = new ResizeObserver(() => { resize(); init(); });
  ro.observe(canvas.parentElement || document.body);
  resize(); init(); loop();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf); else { raf = requestAnimationFrame(loop); }
  });
})();

/* 14. PAGE LOAD */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  setTimeout(() => { const ey = qs('#h-eyebrow'); if (ey) ey.classList.add('in'); }, 200);
  qsa('.word-inner').forEach((w, i) => { setTimeout(() => w.classList.add('in'), 380 + i * 120); });
  setTimeout(() => { const d = qs('#h-desc'); if (d) d.classList.add('in'); }, 900);
  setTimeout(() => { const a = qs('#h-actions'); if (a) a.classList.add('in'); }, 1050);
  setTimeout(() => { const r = qs('#h-right'); if (r) r.classList.add('in'); }, 500);
});

/* 15. PERFORMANCE */
document.addEventListener('visibilitychange', () => {
  qsa('.vr, .ticker-inner').forEach(el => { el.style.animationPlayState = document.hidden ? 'paused' : 'running'; });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');

    if (menuBtn && navMenu) {
        menuBtn.onclick = () => {
            menuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // قفل السكرول في الخلفية والمنيو مفتوح
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        };

        // قفل المنيو تلقائياً لما تضغط على أي قسم
        links.forEach(link => {
            link.onclick = () => {
                menuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            };
        });
    }
});




document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            try {
                // 1. بياناتك (حط رقمك هنا)
                const myPhoneNumber = "201128864057"; 

                // 2. سحب البيانات مع التأكد إنها موجودة
                const name = document.getElementById('f-name')?.value || "Not provided";
                const email = document.getElementById('f-email')?.value || "Not provided";
                const service = document.getElementById('f-service')?.value || "Not selected";
                const budget = document.getElementById('f-budget')?.value || "Not specified";
                const message = document.getElementById('f-msg')?.value || "No message";

                // 3. تجهيز الرسالة
                const whatsappMessage = encodeURIComponent(
                    `*New Project Inquiry* 🚀\n\n` +
                    `*Name:* ${name}\n` +
                    `*Email:* ${email}\n` +
                    `*Service:* ${service}\n` +
                    `*Budget:* ${budget}\n` +
                    `*Message:* ${message}`
                );

                const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${whatsappMessage}`;

                // 4. إظهار رسالة النجاح
                const successMsg = document.getElementById('form-success');
                if (successMsg) successMsg.style.display = 'block';

                // 5. التحويل للواتساب بعد ثانية واحدة
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                }, 1000);

            } catch (error) {
                console.error("WhatsApp Form Error:", error);
            }
        });
    }
});





