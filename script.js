/**
 * ============================================================
 * KARAN PORTFOLIO — script.js
 * All interactivity, animations, rendering & UI logic
 * ============================================================
 */

'use strict';

/* ── Helpers ──────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Wait for DOM ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initConfig();
  initNavbar();
  initHeroCanvas();
  initTyped();
  initScrollReveal();
  initSections();
  initSkills();
  initProjects();
  initTimeline();
  initFocus();
  initGithub();
  initContact();
  initModal();
  initBackToTop();
  initFooterYear();
  initKeyboard();
});

/* ══════════════════════════════════════════════════════════
   LOADER
══════════════════════════════════════════════════════════ */
function initLoader() {
  const loader = $('#loader');
  if (!loader) return;

  const hide = () => {
    loader.classList.add('hidden');
    /* Remove from DOM after transition; fall back with timeout in case
       transitionend never fires (e.g. reduced-motion, display:none) */
    const cleanup = () => { if (loader.parentNode) loader.remove(); };
    loader.addEventListener('transitionend', cleanup, { once: true });
    setTimeout(cleanup, 800); /* safety net */
    triggerReveal();
  };

  if (prefersReducedMotion()) {
    /* Don't wait for animation — hide immediately */
    setTimeout(hide, 200);
  } else {
    setTimeout(hide, 1500);
  }
}

/* ══════════════════════════════════════════════════════════
   APPLY CONFIG TO DOM
══════════════════════════════════════════════════════════ */
function initConfig() {
  if (typeof CONFIG === 'undefined') {
    console.warn('CONFIG not found — make sure config.js loads before script.js');
    return;
  }

  /* Resume links */
  const resumeLinks = $$('#nav-resume-btn, #hero-resume-link, #about-resume-link, #contact-resume-link');
  resumeLinks.forEach(el => {
    if (el) el.setAttribute('href', CONFIG.resumeURL || '#');
  });

  /* Social links — hero */
  setLink('#hero-github',   CONFIG.github);
  setLink('#hero-linkedin', CONFIG.linkedin);

  /* GitHub section */
  const ghProfileLink = $('#github-profile-link');
  if (ghProfileLink) ghProfileLink.setAttribute('href', CONFIG.github || '#');
  const ghUsername = $('#github-username-display');
  if (ghUsername && CONFIG.github) {
    const uname = CONFIG.github.replace(/\/$/, '').split('/').pop();
    ghUsername.textContent = '@' + uname;
  }
}

function setLink(selector, href) {
  const el = $(selector);
  if (el && href) el.setAttribute('href', href);
}

/* ══════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar  = $('#navbar');
  const toggle  = $('#nav-toggle');
  const navList = $('#nav-links');
  if (!navbar) return;

  /* Scroll: glass effect */
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveLink();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile toggle */
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      navList.classList.toggle('open', !open);
    });

    /* Close on link click */
    $$('.nav-link', navList).forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
      });
    });

    /* Close on outside click */
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
      }
    });
  }

  /* Smooth scroll for all anchor links */
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = $(id);
    if (!target) return;
    e.preventDefault();
    const navH = navbar ? navbar.offsetHeight : 0;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });
}

/* Active nav link based on scroll position */
function updateActiveLink() {
  const sections = $$('section[id]');
  const navH     = $('#navbar')?.offsetHeight || 72;
  let currentId  = '';

  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top - navH - 40;
    if (top <= 0) currentId = sec.id;
  });

  $$('.nav-link').forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('data-section') === currentId
    );
  });
}

/* ══════════════════════════════════════════════════════════
   HERO CANVAS — Particle field
══════════════════════════════════════════════════════════ */
function initHeroCanvas() {
  const canvas = $('#hero-canvas');
  if (!canvas || prefersReducedMotion()) return;

  const ctx    = canvas.getContext('2d');
  let W, H, particles = [], animId;

  const PARTICLE_COUNT = Math.min(70, Math.floor(window.innerWidth / 20));
  const CONNECT_DIST   = 140;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function Particle() {
    this.reset = function () {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
    };
    this.reset();

    this.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    };

    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(14, 165, 233, ${this.alpha})`;
      ctx.fill();
    };
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    /* Draw connections */
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        }
      }
    }

    /* Update & draw particles */
    particles.forEach(p => { p.update(); p.draw(); });

    animId = requestAnimationFrame(loop);
  }

  let resizeTimer = null;
  const resizeObserver = new ResizeObserver(() => {
    /* Debounce to prevent double-init on first observe */
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(init, 50);
  });
  resizeObserver.observe(canvas);

  init();
  loop();

  /* Pause when tab hidden */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
    } else {
      animId = requestAnimationFrame(loop);
    }
  });
}

/* ══════════════════════════════════════════════════════════
   TYPED ROLE ANIMATION
══════════════════════════════════════════════════════════ */
function initTyped() {
  const el = $('#typed-role');
  if (!el || typeof CONFIG === 'undefined') return;

  const roles  = CONFIG.roles || ['Developer', 'AI Enthusiast'];
  let   roleIdx = 0;
  let   charIdx = 0;
  let   deleting = false;

  if (prefersReducedMotion()) {
    el.textContent = roles[0];
    return;
  }

  function type() {
    const current = roles[roleIdx];

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
        setTimeout(type, 400);
        return;
      }
    }

    const speed = deleting ? 45 : 85;
    setTimeout(type, speed);
  }

  setTimeout(type, 1800);
}

/* ══════════════════════════════════════════════════════════
   SCROLL REVEAL (IntersectionObserver)
══════════════════════════════════════════════════════════ */
function triggerReveal() {
  /* Called after loader hides — kick off observer */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    /* Elements already in viewport get revealed immediately */
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      el.classList.add('revealed');
    } else {
      io.observe(el);
    }
  });
}

function initScrollReveal() {
  /* For elements added dynamically after loader */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  /* Observe after slight delay to let dynamic rendering finish */
  setTimeout(() => {
    $$('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
      if (!el.classList.contains('revealed')) io.observe(el);
    });
  }, 200);
}

/* Helper — observe newly created elements */
function observeReveal(el) {
  if (!el) return;
  /* If already visible (e.g. scrolled past), reveal immediately */
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight - 40 && rect.bottom > 0) {
    el.classList.add('revealed');
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  io.observe(el);
}

/* ══════════════════════════════════════════════════════════
   ABOUT SECTION — Stats cards
══════════════════════════════════════════════════════════ */
function initSections() {
  if (typeof CONFIG === 'undefined') return;
  const grid = $('#about-stats-grid');
  if (!grid) return;

  CONFIG.stats.forEach(stat => {
    const card = document.createElement('div');
    card.className  = 'stat-card reveal-up';
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <div class="stat-icon" aria-hidden="true">${stat.icon}</div>
      <div class="stat-label">${escHtml(stat.label)}</div>
      <div class="stat-sub">${escHtml(stat.sub)}</div>
    `;
    grid.appendChild(card);
    observeReveal(card);
  });
}

/* ══════════════════════════════════════════════════════════
   SKILLS SECTION
══════════════════════════════════════════════════════════ */
function initSkills() {
  if (typeof CONFIG === 'undefined') return;

  const tabsEl  = $('#skills-tabs');
  const gridEl  = $('#skills-grid');
  if (!tabsEl || !gridEl) return;

  let activeIdx = 0;

  /* Build tabs */
  CONFIG.techStack.forEach((cat, idx) => {
    const btn = document.createElement('button');
    btn.className   = 'tab-btn' + (idx === 0 ? ' active' : '');
    btn.textContent = cat.icon + ' ' + cat.category;
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-selected', String(idx === 0));
    btn.setAttribute('aria-controls', 'skills-grid');
    btn.dataset.idx = idx;
    tabsEl.appendChild(btn);

    btn.addEventListener('click', () => {
      activeIdx = idx;
      $$('.tab-btn', tabsEl).forEach((b, i) => {
        b.classList.toggle('active', i === idx);
        b.setAttribute('aria-selected', String(i === idx));
      });
      renderSkills(CONFIG.techStack[idx].items);
    });
  });

  renderSkills(CONFIG.techStack[0].items);

  function renderSkills(items) {
    gridEl.innerHTML = '';
    items.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'skill-card';
      card.style.setProperty('--i', i);
      card.style.animationDelay = `${i * 0.05}s`;
      card.setAttribute('role', 'listitem');
      card.innerHTML = `
        <div class="skill-icon-wrap" aria-hidden="true">${escHtml(item.fallback || item.name.slice(0, 3))}</div>
        <span class="skill-name">${escHtml(item.name)}</span>
      `;
      gridEl.appendChild(card);
    });
  }
}

/* ══════════════════════════════════════════════════════════
   PROJECTS SECTION
══════════════════════════════════════════════════════════ */
const PROJECT_EMOJIS = {
  'plant-health': '🌱',
  'localwork':    '💼',
  'travel-advisor': '✈️',
  'jek-ai':       '🤖',
};

function getBadgeClass(badge) {
  const map = {
    'Major Project': 'badge-major',
    'Web Platform':  'badge-web',
    'Experimental':  'badge-exp',
    'Web App':       'badge-web',
  };
  return map[badge] || 'badge-default';
}

function getProjectFilter(p) {
  const techStr = (p.tech || []).join(' ').toLowerCase();
  const flags   = [];
  if (p.featured) flags.push('featured');
  if (techStr.includes('ai') || techStr.includes('ml') ||
      techStr.includes('machine') || techStr.includes('vision') ||
      techStr.includes('deep') || techStr.includes('computer vision')) {
    flags.push('ai');
  }
  if (techStr.includes('html') || techStr.includes('css') ||
      techStr.includes('php') || techStr.includes('javascript') ||
      techStr.includes('web')) {
    flags.push('web');
  }
  return flags;
}

function initProjects() {
  if (typeof CONFIG === 'undefined') return;

  const grid     = $('#projects-grid');
  const filterEl = $('.project-filters');
  if (!grid) return;

  /* Render all cards */
  CONFIG.projects.forEach(p => {
    const card = buildProjectCard(p);
    grid.appendChild(card);
  });

  /* Observe for reveal */
  $$('.project-card', grid).forEach(c => observeReveal(c));

  /* Filter logic */
  if (filterEl) {
    $$('.filter-btn', filterEl).forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.filter-btn', filterEl).forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.dataset.filter;
        $$('.project-card', grid).forEach(card => {
          if (filter === 'all') {
            card.classList.remove('hidden');
          } else {
            const flags = card.dataset.filters ? card.dataset.filters.split(',') : [];
            card.classList.toggle('hidden', !flags.includes(filter));
          }
        });
      });
    });
  }
}

function buildProjectCard(p) {
  const isFeatured = p.featured && p.id === 'plant-health'; /* first featured spans full width */
  const card = document.createElement('article');
  card.className   = 'project-card reveal-up' + (isFeatured ? ' featured' : '');
  card.dataset.id  = p.id;
  card.dataset.filters = getProjectFilter(p).join(',');
  card.setAttribute('role', 'listitem');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `Project: ${p.title}`);

  const badgeClass = getBadgeClass(p.badge);
  const emoji      = PROJECT_EMOJIS[p.id] || '💡';
  const featList   = p.features && p.features.length
    ? `<ul class="project-features-list" aria-label="Features">
        ${p.features.slice(0, isFeatured ? 8 : 4).map(f => `<li>${escHtml(f)}</li>`).join('')}
       </ul>`
    : '';
  const techTags = (p.tech || []).map(t => `<span class="tech-tag">${escHtml(t)}</span>`).join('');
  const noteHtml = p.note ? `<div class="project-note" role="note">⚠ ${escHtml(p.note)}</div>` : '';
  const githubBtn = p.github && p.github !== '#'
    ? `<a href="${escAttr(p.github)}" class="btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer" aria-label="View ${p.title} on GitHub">GitHub</a>`
    : `<button class="btn btn-outline btn-sm" aria-disabled="true" disabled>GitHub</button>`;
  const demoBtn = p.demo
    ? `<a href="${escAttr(p.demo)}" class="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer" aria-label="Live demo for ${p.title}">Live Demo</a>`
    : '';

  card.innerHTML = `
    <div class="project-image">
      <div class="project-image-placeholder" aria-hidden="true">
        <span>${emoji}</span>
      </div>
      <div class="project-overlay" aria-hidden="true">
        <span class="overlay-text">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          View Details
        </span>
      </div>
    </div>
    <div class="project-body">
      <div class="project-top">
        <h3 class="project-title">${escHtml(p.title)}</h3>
        <span class="project-badge ${badgeClass}">${escHtml(p.badge)}</span>
      </div>
      <p class="project-desc">${escHtml(p.description)}</p>
      ${noteHtml}
      ${featList ? `<div class="project-features">${featList}</div>` : ''}
      <div class="project-tech" aria-label="Technologies">${techTags}</div>
      <div class="project-actions">
        ${githubBtn}
        ${demoBtn}
        <button class="btn btn-primary btn-sm view-details-btn" data-project="${escAttr(p.id)}">
          View Details
        </button>
      </div>
    </div>
  `;

  /* Open modal on card or button click */
  card.addEventListener('click', e => {
    if (e.target.closest('a')) return; /* let actual links through */
    openModal(p.id);
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(p.id); }
  });

  return card;
}

/* ══════════════════════════════════════════════════════════
   PROJECT MODAL
══════════════════════════════════════════════════════════ */
let lastFocused = null;

function initModal() {
  const overlay   = $('#project-modal');
  const closeBtn  = $('#modal-close');
  if (!overlay) return;

  closeBtn && closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
}

function openModal(projectId) {
  if (typeof CONFIG === 'undefined') return;
  const p = CONFIG.projects.find(x => x.id === projectId);
  if (!p) return;

  lastFocused = document.activeElement;

  const overlay = $('#project-modal');
  const content = $('#modal-content');
  if (!overlay || !content) return;

  const badgeClass = getBadgeClass(p.badge);
  const techTags   = (p.tech || []).map(t => `<span class="tech-tag">${escHtml(t)}</span>`).join('');
  const featuresList = p.features && p.features.length
    ? `<ul class="modal-features-list">${p.features.map(f => `<li>${escHtml(f)}</li>`).join('')}</ul>`
    : '<p>—</p>';
  const noteHtml = p.note ? `<div class="modal-note">⚠ ${escHtml(p.note)}</div>` : '';
  const githubBtn = p.github && p.github !== '#'
    ? `<a href="${escAttr(p.github)}" class="btn btn-outline" target="_blank" rel="noopener noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
        View on GitHub
       </a>`
    : '';
  const demoBtn = p.demo
    ? `<a href="${escAttr(p.demo)}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Live Demo →</a>`
    : '';

  content.innerHTML = `
    <div class="modal-header">
      <div class="modal-badge">
        <span class="project-badge ${badgeClass}">${escHtml(p.badge)}</span>
      </div>
      <h2 class="modal-title" id="modal-title">${escHtml(p.title)}</h2>
      <p class="modal-tagline">${escHtml(p.tagline)}</p>
      ${noteHtml}
    </div>

    <div class="modal-section">
      <h3 class="modal-section-title">Overview</h3>
      <p>${escHtml(p.overview || p.description)}</p>
    </div>

    <div class="modal-section">
      <h3 class="modal-section-title">Problem</h3>
      <p>${escHtml(p.problem || '—')}</p>
    </div>

    <div class="modal-section">
      <h3 class="modal-section-title">Solution</h3>
      <p>${escHtml(p.solution || '—')}</p>
    </div>

    <div class="modal-section">
      <h3 class="modal-section-title">Key Features</h3>
      ${featuresList}
    </div>

    <div class="modal-section">
      <h3 class="modal-section-title">Technology Stack</h3>
      <div class="modal-tech">${techTags}</div>
    </div>

    <div class="modal-section">
      <h3 class="modal-section-title">My Contribution</h3>
      <p>${escHtml(p.contribution || '—')}</p>
    </div>

    <div class="modal-section">
      <h3 class="modal-section-title">Challenges</h3>
      <p>${escHtml(p.challenges || '—')}</p>
    </div>

    <div class="modal-section">
      <h3 class="modal-section-title">What I Learned</h3>
      <p>${escHtml(p.learned || '—')}</p>
    </div>

    <div class="modal-actions">
      ${githubBtn}
      ${demoBtn}
    </div>
  `;

  overlay.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';

  /* Focus trap — focus the close button */
  const closeBtn = $('#modal-close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 50);

  /* Remove any previously attached trap before adding fresh one */
  overlay.removeEventListener('keydown', trapFocus);
  overlay.addEventListener('keydown', trapFocus);
}

function closeModal() {
  const overlay = $('#project-modal');
  if (!overlay) return;

  overlay.setAttribute('hidden', '');
  document.body.style.overflow = '';

  overlay.removeEventListener('keydown', trapFocus);

  if (lastFocused) lastFocused.focus();
}

function trapFocus(e) {
  if (e.key !== 'Tab') {
    if (e.key === 'Escape') closeModal();
    return;
  }
  const modal      = $('#project-modal .modal-container');
  const focusable  = $$('button, a, input, textarea, [tabindex]:not([tabindex="-1"])', modal)
    .filter(el => !el.disabled && !el.getAttribute('aria-disabled'));

  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
  } else {
    if (document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
}

/* ══════════════════════════════════════════════════════════
   TIMELINE
══════════════════════════════════════════════════════════ */
function initTimeline() {
  if (typeof CONFIG === 'undefined') return;

  const container = $('#timeline');
  if (!container) return;

  CONFIG.journey.forEach((item, idx) => {
    const isLast = idx === CONFIG.journey.length - 1;
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.setAttribute('role', 'listitem');
    el.innerHTML = `
      <div class="timeline-marker">
        <div class="timeline-dot" aria-label="${escHtml(item.year)}">${escHtml(item.year)}</div>
      </div>
      <div class="timeline-card${isLast ? ' timeline-card-last' : ''}">
        <div class="timeline-label">${escHtml(item.label)}</div>
        <div class="timeline-desc">${escHtml(item.desc)}</div>
      </div>
    `;
    container.appendChild(el);
  });

  /* Animate items into view */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  $$('.timeline-item', container).forEach(item => io.observe(item));
}

/* ══════════════════════════════════════════════════════════
   CURRENT FOCUS
══════════════════════════════════════════════════════════ */
function initFocus() {
  if (typeof CONFIG === 'undefined') return;

  const grid = $('#focus-grid');
  if (!grid) return;

  CONFIG.focus.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'focus-card reveal-up';
    card.style.setProperty('--delay', `${i * 0.08}s`);
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <span class="focus-icon" aria-hidden="true">${item.icon}</span>
      <h3 class="focus-title">${escHtml(item.title)}</h3>
      <p class="focus-desc">${escHtml(item.desc)}</p>
    `;
    grid.appendChild(card);
    observeReveal(card);
  });
}

/* ══════════════════════════════════════════════════════════
   GITHUB SECTION — animate bars when visible
══════════════════════════════════════════════════════════ */
function initGithub() {
  const section = $('#github-section');
  if (!section) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        $$('.lang-bar-fill', section).forEach((fill, i) => {
          fill.style.animationDelay = `${i * 0.15}s`;
          fill.classList.add('animated');
        });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  io.observe(section);
}

/* ══════════════════════════════════════════════════════════
   CONTACT SECTION
══════════════════════════════════════════════════════════ */
function initContact() {
  if (typeof CONFIG === 'undefined') return;

  /* Build contact link items */
  const linksEl = $('#contact-links');
  if (linksEl) {
    const links = [
      {
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" width="20" height="20"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 7l10 7 10-7"/></svg>`,
        label: 'Email',
        value: CONFIG.email || 'Not set',
        href:  CONFIG.email ? `mailto:${CONFIG.email}` : null,
      },
      {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
        label: 'GitHub',
        value: CONFIG.github ? CONFIG.github.replace(/^https?:\/\/(www\.)?/, '') : 'Not set',
        href:  CONFIG.github || null,
      },
      {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
        label: 'LinkedIn',
        value: CONFIG.linkedin ? CONFIG.linkedin.replace(/^https?:\/\/(www\.)?/, '') : 'Not set',
        href:  CONFIG.linkedin || null,
      },
    ];

    /* Optional Instagram */
    if (CONFIG.instagram) {
      links.push({
        icon: `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
        label: 'Instagram',
        value: CONFIG.instagram.replace(/^https?:\/\/(www\.)?/, ''),
        href:  CONFIG.instagram,
      });
    }

    links.forEach(link => {
      const el = document.createElement(link.href ? 'a' : 'div');
      el.className = 'contact-link-item';
      el.setAttribute('role', 'listitem');
      if (link.href) {
        el.setAttribute('href', link.href);
        if (!link.href.startsWith('mailto:')) {
          el.setAttribute('target', '_blank');
          el.setAttribute('rel', 'noopener noreferrer');
        }
        el.setAttribute('aria-label', `${link.label}: ${link.value}`);
      }
      el.innerHTML = `
        <div class="contact-link-icon" aria-hidden="true">${link.icon}</div>
        <div class="contact-link-text">
          <div class="contact-link-label">${escHtml(link.label)}</div>
          <div class="contact-link-value">${escHtml(link.value)}</div>
        </div>
        ${link.href ? `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>` : ''}
      `;
      linksEl.appendChild(el);
    });
  }

  /* Contact form */
  const form       = $('#contact-form');
  const submitBtn  = $('#form-submit');
  const successEl  = $('#form-success');
  const errorEl    = $('#form-error-msg');
  if (!form) return;

  /* Real-time validation on blur */
  const nameInput  = $('#contact-name');
  const emailInput = $('#contact-email');
  const msgInput   = $('#contact-message');

  nameInput  && nameInput.addEventListener('blur',  () => validateField(nameInput,  'name-error',    validateName));
  emailInput && emailInput.addEventListener('blur', () => validateField(emailInput, 'email-error',   validateEmail));
  msgInput   && msgInput.addEventListener('blur',   () => validateField(msgInput,   'message-error', validateMessage));

  /* Clear error on input */
  [nameInput, emailInput, msgInput].forEach(inp => {
    if (!inp) return;
    inp.addEventListener('input', () => {
      const errId = inp.id.replace('contact-', '') + '-error';
      clearError(inp, errId);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nameOk  = validateField(nameInput,  'name-error',    validateName);
    const emailOk = validateField(emailInput, 'email-error',   validateEmail);
    const msgOk   = validateField(msgInput,   'message-error', validateMessage);

    if (!nameOk || !emailOk || !msgOk) return;

    /* Show loading state */
    const submitText    = $('.submit-text', submitBtn);
    const submitLoading = $('.submit-loading', submitBtn);
    if (submitText)    submitText.hidden   = true;
    if (submitLoading) submitLoading.hidden = false;
    submitBtn.disabled = true;

    /* Simulate async send (replace with real backend/EmailJS/Formspree) */
    setTimeout(() => {
      if (submitText)    submitText.hidden   = false;
      if (submitLoading) submitLoading.hidden = true;
      submitBtn.disabled = false;

      /* Show success */
      if (successEl) { successEl.hidden = false; }
      if (errorEl)   { errorEl.hidden   = true;  }
      form.reset();

      /* Auto-hide after 5s */
      setTimeout(() => { if (successEl) successEl.hidden = true; }, 5000);
    }, 1200);
  });
}

/* ── Validation helpers ─────────────────────────────────── */
function validateField(input, errorId, validatorFn) {
  if (!input) return true;
  const msg    = validatorFn(input.value.trim());
  const errEl  = $(`#${errorId}`);
  const group  = input.closest('.form-group');

  if (msg) {
    if (errEl)  errEl.textContent = msg;
    if (group)  group.classList.add('error');
    input.setAttribute('aria-invalid', 'true');
    return false;
  } else {
    if (errEl)  errEl.textContent = '';
    if (group)  group.classList.remove('error');
    input.setAttribute('aria-invalid', 'false');
    return true;
  }
}

function clearError(input, errorId) {
  const errEl = $(`#${errorId}`);
  const group = input.closest('.form-group');
  if (errEl)  errEl.textContent = '';
  if (group)  group.classList.remove('error');
  input.removeAttribute('aria-invalid');
}

function validateName(v)    { if (!v) return 'Name is required.'; if (v.length < 2) return 'Name must be at least 2 characters.'; return ''; }
function validateEmail(v)   { if (!v) return 'Email is required.'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email address.'; return ''; }
function validateMessage(v) { if (!v) return 'Message is required.'; if (v.length < 10) return 'Message must be at least 10 characters.'; return ''; }

/* ══════════════════════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.removeAttribute('hidden');
    } else {
      btn.setAttribute('hidden', '');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });
}

/* ══════════════════════════════════════════════════════════
   FOOTER YEAR
══════════════════════════════════════════════════════════ */
function initFooterYear() {
  const el = $('#footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ══════════════════════════════════════════════════════════
   KEYBOARD ACCESSIBILITY
══════════════════════════════════════════════════════════ */
function initKeyboard() {
  /* Escape closes modal */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      const modal = $('#project-modal');
      if (modal && !modal.hasAttribute('hidden')) closeModal();

      /* Close mobile nav */
      const toggle  = $('#nav-toggle');
      const navList = $('#nav-links');
      if (navList && navList.classList.contains('open')) {
        toggle && toggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('open');
      }
    }
  });
}

/* ══════════════════════════════════════════════════════════
   SECURITY HELPERS — prevent XSS via innerHTML
══════════════════════════════════════════════════════════ */
function escHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#39;');
}

function escAttr(str) {
  return escHtml(str);
}
