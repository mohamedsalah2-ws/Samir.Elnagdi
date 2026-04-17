'use strict';

const qs  = (sel, ctx = document) => ctx.querySelector(sel);
const qsa = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

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

(function initNav() {
  const nav = qs('#nav');
  if (!nav) return;
  const toggle = () => nav.classList.toggle('scrolled', window.scrollY > 70);
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
})();

document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const t = qs(a.getAttribute('href'));
  if (!t) return;
  e.preventDefault();
  scrollTo({ top: t.getBoundingClientRect().top + scrollY - 82, behavior: 'smooth' });
});

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

let lbImgs = [], lbIdx = 0;
let lb, lbImg, lbCounter, lbPrev, lbNext;
function buildLightbox() {
  if (qs('.pj-lb')) return;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="pj-lb" role="dialog" aria-modal="true" aria-label="Image viewer">
      <button class="pj-lb-close">✕  Close</button>
      <button class="pj-lb-btn pj-lb-prev" aria-label="Previous">‹</button>
      <div class="pj-lb-img-wrap"><img src="" alt=""></div>
      <button class="pj-lb-btn pj-lb-next" aria-label="Next">›</button>
      <div class="pj-lb-counter"></div>
    </div>`);
  lb        = qs('.pj-lb');
  lbImg     = qs('.pj-lb-img-wrap img');
  lbCounter = qs('.pj-lb-counter');
  lbPrev    = qs('.pj-lb-prev');
  lbNext    = qs('.pj-lb-next');

  lb.addEventListener('click',      e => { if (e.target === lb) closeLb(); });
  qs('.pj-lb-close').addEventListener('click', closeLb);
  lbPrev.addEventListener('click',  () => showLb(lbIdx - 1));
  lbNext.addEventListener('click',  () => showLb(lbIdx + 1));
}
function openLb(imgs, idx) {
  lbImgs = imgs;
  buildLightbox();
  showLb(idx);
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function showLb(idx) {
  lbIdx = ((idx % lbImgs.length) + lbImgs.length) % lbImgs.length;
  lbImg.style.opacity = '.3';
  lbImg.src = lbImgs[lbIdx].src;
  lbImg.alt = lbImgs[lbIdx].alt || '';
  lbImg.onload = () => { lbImg.style.transition = 'opacity .22s'; lbImg.style.opacity = '1'; };
  if (lbCounter) lbCounter.textContent = `${lbIdx + 1} / ${lbImgs.length}`;
  const multi = lbImgs.length > 1;
  if (lbPrev) lbPrev.style.display = multi ? '' : 'none';
  if (lbNext) lbNext.style.display = multi ? '' : 'none';
}
function closeLb() {
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'Escape')      closeLb();
  if (e.key === 'ArrowLeft')   showLb(lbIdx - 1);
  if (e.key === 'ArrowRight')  showLb(lbIdx + 1);
});

(function renderProject() {
  const id       = new URLSearchParams(location.search).get('id');
  const projects = window.PROJECTS || [];
  const idx      = projects.findIndex(p => p.id === id);

  if (idx === -1) return show404(id);

  const p    = projects[idx];
  const prev = projects[idx - 1] || null;
  const next = projects[idx + 1] || null;

  document.title = `${p.title} — A.Studio`;

  const metaRow = qs('#pj-meta-row');
  if (metaRow) {
    const tags = (p.tags || []).map(t => `<span class="pj-badge-tag">${t}</span>`).join('');
    metaRow.innerHTML = `<span class="pj-badge-cat">${p.category}</span>${tags}`;
  }

  setText('#pj-title',  p.title);
  setText('#pj-lead',   p.summary);

  const ctaRow = qs('#pj-cta-row');
  if (ctaRow) {
    let html = '';
    if (p.liveUrl)   html += `<a class="pj-cta-btn filled magnetic"  href="${p.liveUrl}"   target="_blank" rel="noopener">Live Demo ↗</a>`;
    if (p.sourceUrl) html += `<a class="pj-cta-btn outline magnetic" href="${p.sourceUrl}" target="_blank" rel="noopener">Source Code ↗</a>`;
    ctaRow.innerHTML = html;
  }

  const qfDl = qs('#pj-qf-dl');
  if (qfDl) {
    const rows = [
      { k: 'Category', v: p.category },
      { k: 'Year',     v: p.year     },
    ].filter(r => r.v);
    qfDl.innerHTML = rows.map(r =>
      `<div class="pj-qf-row"><dt class="pj-qf-dt">${r.k}</dt><dd class="pj-qf-dd">${r.v}</dd></div>`
    ).join('');
  }
  
  const qfPills = qs('#pj-qf-pills');
  if (qfPills && p.stack && p.stack.length) {
    qfPills.innerHTML = p.stack.map(s => `<span class="pj-qf-pill">${s}</span>`).join('');
  }

  const imgs   = p.images || [];
  const featEl = qs('#pj-featured');
  const phEl   = qs('#pj-feat-placeholder');

  if (imgs.length > 0) {
    if (phEl) phEl.style.display = 'none';
    const img = document.createElement('img');
    img.src   = imgs[0].src;
    img.alt   = imgs[0].alt || p.title;
    img.addEventListener('click', () => openLb(imgs, 0));
    featEl.appendChild(img);
  } else {
    const iconEl = qs('#pj-fp-icon');
    if (iconEl) {
      const iconMap = {
        'ai': '🤖', 'design': '🎨', 'video': '🎬', 'dev': '💻', 'automation': '⚡', 'it': '🛡️', 'accounting': '📊'
      };
      const key = (p.category || '').toLowerCase();
      for (const [k, v] of Object.entries(iconMap)) {
        if (key.includes(k)) { iconEl.textContent = v; break; }
      }
    }
  }

  const galleryEl = qs('#pj-gallery-strip');
  if (galleryEl && imgs.length > 1) {
    const extra = imgs.slice(1);
    const cls = extra.length === 1 ? 'g-2' : extra.length === 2 ? 'g-3' : 'g-many';
    galleryEl.className = `pj-gallery-strip ${cls}`;
    galleryEl.innerHTML = extra.map((img, i) => `
      <div class="pj-gallery-thumb" data-index="${i + 1}" role="button" tabindex="0">
        <img src="${img.src}" alt="${img.alt || ''}" loading="lazy">
      </div>`
    ).join('');
    qsa('.pj-gallery-thumb', galleryEl).forEach(th => {
      const handler = () => openLb(imgs, +th.dataset.index);
      th.addEventListener('click', handler);
    });
  }

  const overviewEl = qs('#pj-overview-text');
  if (overviewEl && p.description) overviewEl.innerHTML = p.description;

  const csrSection = qs('#pj-csr-section');
  if (csrSection) {
    const hasCsr = p.challenge || p.solution || p.result;
    if (!hasCsr) {
      csrSection.style.display = 'none';
    } else {
      setText('#pj-csr-c-text', p.challenge);
      setText('#pj-csr-s-text', p.solution);
      setText('#pj-csr-r-text', p.result);
      if (!p.challenge) hideEl('#pj-csr-c');
      if (!p.solution)  hideEl('#pj-csr-s');
      if (!p.result)    hideEl('#pj-csr-r');
    }
  }

  const prevBtn = qs('#pj-prev');
  const nextBtn = qs('#pj-next');
  if (prevBtn) {
    if (prev) { prevBtn.href = `project.html?id=${prev.id}`; setText('#pj-prev-title', prev.title); }
    else prevBtn.style.display = 'none';
  }
  if (nextBtn) {
    if (next) { nextBtn.href = `project.html?id=${next.id}`; setText('#pj-next-title', next.title); }
    else nextBtn.style.display = 'none';
  }
})();

function setText(sel, val) { const el = qs(sel); if (el && val) el.textContent = val; }
function hideEl(sel) { const el = qs(sel); if (el) el.style.display = 'none'; }

function show404(id) {
  document.title = '404 — A.Studio';
  const main = qs('main') || document.body;
  main.innerHTML = `
    <div style="min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.4rem;padding-top:100px;text-align:center">
      <p style="font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.2em;color:var(--accent)">404</p>
      <p style="font-family:'Fraunces',serif;font-size:2.2rem;font-weight:300;color:var(--text)">Project not found</p>
      <a href="index.html#works" style="color:var(--text-2);border:1px solid var(--border-2);padding:.72rem 1.6rem;margin-top:.5rem">← Back to Works</a>
    </div>`;
}