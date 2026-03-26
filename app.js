/* ═══════════════════════════════════════════════════
   MINIMAL CV — app.js  (do not edit)
   ═══════════════════════════════════════════════════ */

function $(id) { return document.getElementById(id); }
function set(id, val, isHTML) { const el = $(id); if (!el) return; if (isHTML) el.innerHTML = val; else el.textContent = val; }

/* ── THEME ENGINE ──────────────────────────────── */
function applyTheme(name, mode) {
  const t = THEMES[name] || THEMES.mono;
  const vars = t[mode] || t.light;
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute('data-theme', name);
  root.setAttribute('data-mode', mode);
  set('theme-label', t.label);
  try { localStorage.setItem('cv-theme', name); localStorage.setItem('cv-mode', mode); } catch(e) {}
}

/* ── INIT ──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // Restore or use config defaults
  let savedTheme, savedMode;
  try { savedTheme = localStorage.getItem('cv-theme'); savedMode = localStorage.getItem('cv-mode'); } catch(e) {}
  const activeTheme = savedTheme || CV.theme || 'mono';
  const activeMode  = savedMode  || CV.defaultMode || 'light';
  applyTheme(activeTheme, activeMode);

  // Theme & dark toggle buttons
  const themeNames = Object.keys(THEMES);
  let themeIdx = themeNames.indexOf(activeTheme);
  let mode = activeMode;

  const themeBtn = $('theme-toggle');
  const darkBtn  = $('dark-toggle');

  if (themeBtn) themeBtn.addEventListener('click', () => {
    themeIdx = (themeIdx + 1) % themeNames.length;
    applyTheme(themeNames[themeIdx], mode);
  });
  if (darkBtn) darkBtn.addEventListener('click', () => {
    mode = mode === 'light' ? 'dark' : 'light';
    darkBtn.textContent = mode === 'dark' ? '◐' : '◑';
    applyTheme(themeNames[themeIdx], mode);
  });

  // Page title
  set('page-title', CV.name.first + ' ' + CV.name.last + ' — CV');

  // Header name (animated spans already in HTML via CSS)
  const nameEl = $('header-name');
  if (nameEl) nameEl.innerHTML = '<span class="name-first">' + CV.name.first + '</span><span class="name-last">' + CV.name.last + '</span>';

  // Role: typewriter or instant
  if (CV.typewriter !== false) {
    setTimeout(() => initTypewriter('header-role', CV.role), 900);
  } else {
    set('header-role', CV.role);
  }

  // Contact
  const contactList = $('contact-list');
  if (contactList) CV.contact.forEach(c => {
    const el = document.createElement(c.href ? 'a' : 'span');
    el.className = 'contact-item';
    if (c.href) { el.href = c.href; el.target = '_blank'; el.rel = 'noopener'; }
    el.innerHTML = '<span class="contact-icon">' + c.icon + '</span>' + c.label;
    contactList.appendChild(el);
  });

  // Availability
  if (CV.availability && CV.availability.open) {
    const badge = $('availability-badge');
    if (badge) { badge.className = 'availability-badge'; badge.innerHTML = '<span class="availability-dot"></span>' + CV.availability.label; }
  }

  // About
  set('about-text', CV.about);

  // Footer
  set('footer-name', CV.name.first + ' ' + CV.name.last);
  set('footer-date', new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }));

  // Experience
  const expList = $('experience-list');
  if (expList) CV.experience.forEach(exp => expList.appendChild(buildTimelineEntry(exp, 'exp')));

  // Education
  const eduList = $('education-list');
  if (eduList) CV.education.forEach(edu => eduList.appendChild(buildTimelineEntry(edu, 'edu')));

  // Skills
  const skillsContainer = $('skills-categories');
  if (skillsContainer) CV.skills.forEach(cat => {
    const catEl = document.createElement('div');
    catEl.className = 'skill-category';
    catEl.innerHTML = '<div class="skill-category-name">' + cat.category + '</div>';
    const pills = document.createElement('div');
    pills.className = 'skill-pills';
    cat.items.forEach(item => {
      const pill = document.createElement('div');
      pill.className = 'skill-pill';
      pill.appendChild(item.logo ? makeImg(item.logo, item.name, 'pill-logo', () => makeFallback(item.logoFallback, 'pill-fallback')) : makeFallback(item.logoFallback, 'pill-fallback'));
      const span = document.createElement('span');
      span.textContent = item.name;
      pill.appendChild(span);
      pills.appendChild(pill);
    });
    catEl.appendChild(pills);
    skillsContainer.appendChild(catEl);
  });

  // Certifications
  const certList = $('cert-list');
  if (certList) CV.certifications.forEach(cert => {
    const card = document.createElement('div');
    card.className = 'cert-card';
    const logoWrap = document.createElement('div');
    logoWrap.className = 'cert-logo-wrap';
    if (cert.logo) {
      logoWrap.appendChild(makeImg(cert.logo, cert.issuer, 'cert-logo', () => {
        logoWrap.innerHTML = '';
        logoWrap.appendChild(makeFallback(cert.logoFallback, 'cert-fallback'));
        if (cert.wikipediaQuery) injectWikiImage(logoWrap, cert.wikipediaQuery, cert.logoFallback);
      }));
    } else if (cert.wikipediaQuery) {
      logoWrap.appendChild(makeFallback(cert.logoFallback, 'cert-fallback'));
      injectWikiImage(logoWrap, cert.wikipediaQuery, cert.logoFallback);
    } else {
      logoWrap.appendChild(makeFallback(cert.logoFallback, 'cert-fallback'));
    }
    const info = document.createElement('div');
    info.className = 'cert-info';
    info.innerHTML = '<div class="cert-name">' + cert.name + '</div><div class="cert-meta">' + cert.issuer + ' · ' + cert.year + '</div>';
    card.appendChild(logoWrap);
    card.appendChild(info);
    certList.appendChild(card);
  });

  // Languages
  const langList = $('lang-list');
  if (langList) CV.languages.forEach(lang => {
    const item = document.createElement('div');
    item.className = 'lang-item';
    item.innerHTML = '<div class="lang-header"><span class="lang-name">' + lang.name + '</span><span class="lang-level">' + lang.level + '</span></div><div class="lang-bar"><div class="lang-bar-fill" data-width="' + lang.bar + '"></div></div>';
    langList.appendChild(item);
  });

  initNoise();
  initCursor();
  initReveal();
  initPhoto();
  initPDF();
  initAnalytics();
});

/* ── TIMELINE ENTRY BUILDER ─────────────────────── */
function buildTimelineEntry(data, type) {
  const isExp = type === 'exp';
  const entry = document.createElement('div');
  entry.className = 'tl-entry reveal';

  // Dot column
  const dotCol = document.createElement('div');
  dotCol.className = 'tl-dot-col';
  const dot = document.createElement('div');
  dot.className = 'tl-dot';
  const logoSrc  = isExp ? data.logo   : data.logo;
  const logoAlt  = isExp ? data.company : data.school;
  const fallback = isExp ? data.logoFallback : data.logoFallback;
  const wikiQuery = data.wikipediaQuery || null;
  if (logoSrc) {
    dot.appendChild(makeImg(logoSrc, logoAlt, '', () => {
      dot.innerHTML = '';
      dot.appendChild(makeFallback(fallback, 'tl-dot-fallback'));
      if (wikiQuery) injectWikiImage(dot, wikiQuery, fallback);
    }));
  } else if (wikiQuery) {
    dot.appendChild(makeFallback(fallback, 'tl-dot-fallback'));
    injectWikiImage(dot, wikiQuery, fallback);
  } else {
    dot.appendChild(makeFallback(fallback, 'tl-dot-fallback'));
  }
  dotCol.appendChild(dot);
  entry.appendChild(dotCol);

  // Content
  const content = document.createElement('div');
  content.className = 'tl-content';

  const top = document.createElement('div');
  top.className = 'tl-top';

  const titleWrap = document.createElement('div');
  const title = isExp ? data.title : data.degree;
  const sub   = isExp ? data.type  : '';
  titleWrap.innerHTML = '<div class="tl-title">' + title + '</div>' + (sub ? '<div class="tl-type">' + sub + '</div>' : '');

  const badge = document.createElement('div');
  badge.className = 'tl-period-badge';
  badge.textContent = (data.period || '') + (data.periodEnd ? ' → ' + data.periodEnd : '');

  top.appendChild(titleWrap);
  top.appendChild(badge);
  content.appendChild(top);

  const company = document.createElement('div');
  company.className = 'tl-company';
  company.textContent = (isExp ? data.company : data.school) + ' · ' + data.location;
  content.appendChild(company);

  const bullets = document.createElement('ul');
  bullets.className = 'tl-bullets';
  const items = isExp ? data.bullets : [data.description];
  items.forEach(b => { const li = document.createElement('li'); li.textContent = b; bullets.appendChild(li); });
  content.appendChild(bullets);

  if (data.tags && data.tags.length) {
    const tags = document.createElement('div');
    tags.className = 'tl-tags';
    data.tags.forEach(t => { const tag = document.createElement('span'); tag.className = 'tl-tag'; tag.textContent = t; tags.appendChild(tag); });
    content.appendChild(tags);
  }

  entry.appendChild(content);
  return entry;
}

/* ── HELPERS ───────────────────────────────────── */
function makeImg(src, alt, cls, fallbackFn) {
  const img = document.createElement('img');
  img.src = src; img.alt = alt; if (cls) img.className = cls;
  img.onerror = () => img.replaceWith(fallbackFn());
  return img;
}
function makeFallback(text, cls) {
  const el = document.createElement(cls && cls.includes('fallback') ? 'div' : 'span');
  el.className = cls || 'pill-fallback';
  el.textContent = text;
  return el;
}

/* ── NOISE ─────────────────────────────────────── */
function initNoise() {
  const canvas = $('noise-canvas'); if (!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize() { canvas.width = innerWidth; canvas.height = innerHeight; draw(); }
  function draw() {
    const img = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255 | 0;
      img.data[i] = img.data[i+1] = img.data[i+2] = v; img.data[i+3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }
  resize(); window.addEventListener('resize', resize);
}

/* ── CURSOR ─────────────────────────────────────── */
function initCursor() {
  const cursor = $('cursor'); if (!cursor) return;
  const follower = $('cursor-follower'); if (!follower) return;
  let mx = 0, my = 0, fx = 0, fy = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });
  (function anim() {
    fx += (mx - fx) * 0.13; fy += (my - fy) * 0.13;
    follower.style.left = fx + 'px'; follower.style.top = fy + 'px';
    requestAnimationFrame(anim);
  })();
  if ('ontouchstart' in window) {
    cursor.style.display = follower.style.display = 'none';
    document.body.style.cursor = 'auto';
  }
}

/* ── SCROLL REVEAL ──────────────────────────────── */
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const idx = [...reveals].indexOf(el);
      el.style.transitionDelay = Math.min(idx * 55, 350) + 'ms';
      el.classList.add('visible');
      el.querySelectorAll('.lang-bar-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 300);
      });
      obs.unobserve(el);
    });
  }, { threshold: 0.08 });
  reveals.forEach(el => obs.observe(el));
}


/* ── PROFILE PHOTO ──────────────────────────────────
   Supports: local path, URL, or drag-and-drop upload.
   Photo is stored in localStorage (base64) so it
   persists across page reloads.
   ─────────────────────────────────────────────────── */
function initPhoto() {
  const wrap = $('header-photo-wrap');
  if (!wrap) return;

  // Try: config path, then localStorage
  const stored = (() => { try { return localStorage.getItem('cv-photo'); } catch(e) { return null; } })();
  const src = stored || CV.photo || null;

  if (src) {
    showPhoto(wrap, src);
  } else {
    showDropzone(wrap);
  }
}

function showPhoto(wrap, src) {
  wrap.innerHTML = '';
  wrap.classList.add('has-photo');

  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Profile photo';
  img.className = 'header-photo';
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.5s ease';
  img.onload  = () => { img.style.opacity = '1'; };
  img.onerror = () => { wrap.classList.remove('has-photo'); showDropzone(wrap); };

  const removeBtn = document.createElement('button');
  removeBtn.className = 'photo-remove';
  removeBtn.title = 'Remove photo';
  removeBtn.textContent = '×';
  removeBtn.addEventListener('click', e => {
    e.stopPropagation();
    try { localStorage.removeItem('cv-photo'); } catch(e) {}
    wrap.classList.remove('has-photo');
    showDropzone(wrap);
  });

  wrap.appendChild(img);
  wrap.appendChild(removeBtn);
}

function showDropzone(wrap) {
  wrap.innerHTML = '';
  wrap.classList.remove('has-photo');

  const zone = document.createElement('div');
  zone.className = 'photo-dropzone';
  zone.innerHTML = '<span class="photo-dropzone-icon">+</span><span class="photo-dropzone-label">Add photo</span>';

  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) readAndStore(file, wrap);
  });
  zone.appendChild(input);

  // Drag & drop
  zone.addEventListener('dragover',  e => { e.preventDefault(); zone.classList.add('drag-over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) readAndStore(file, wrap);
  });

  wrap.appendChild(zone);
}

function readAndStore(file, wrap) {
  const reader = new FileReader();
  reader.onload = e => {
    const base64 = e.target.result;
    try { localStorage.setItem('cv-photo', base64); } catch(err) {}
    showPhoto(wrap, base64);
  };
  reader.readAsDataURL(file);
}

/* ── TYPEWRITER ─────────────────────────────────────
   Types out the role text letter-by-letter after the
   name animation completes.
   ─────────────────────────────────────────────────── */
function initTypewriter(id, text) {
  const el = $(id);
  if (!el) return;
  el.textContent = '';
  el.style.opacity = '1';
  el.style.animation = 'none';

  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  el.appendChild(cursor);

  let i = 0;
  const speed = Math.max(30, Math.min(80, 1800 / text.length));

  (function type() {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i++]), cursor);
      setTimeout(type, speed);
    } else {
      // Blink for 3s then remove cursor
      setTimeout(() => {
        cursor.style.animation = 'none';
        cursor.style.opacity = '0';
        cursor.style.transition = 'opacity 0.5s ease';
        setTimeout(() => cursor.remove(), 500);
      }, 3000);
    }
  })();
}

/* ── PDF EXPORT ─────────────────────────────────────
   Triggers browser print dialog which can save as PDF.
   The @media print CSS handles all layout adjustments.
   ─────────────────────────────────────────────────── */
function initPDF() {
  const btn = $('pdf-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    // Temporarily set page title to name for the PDF filename
    const prev = document.title;
    document.title = (CV.name.first + '_' + CV.name.last + '_CV').replace(/\s+/g, '_');

    // Make all reveals visible before printing
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

    window.print();
    document.title = prev;
  });
}

/* ── ANALYTICS ──────────────────────────────────────
   Lightweight view counting via counter.dev or a custom
   pixel URL. No cookies, no tracking, just a count.
   counter.dev is free, open-source & GDPR-friendly.
   ─────────────────────────────────────────────────── */
function initAnalytics() {
  if (!CV.analytics || !CV.analytics.enabled) return;

  const counter = $('view-counter');

  // counter.dev integration
  if (CV.analytics.counterDevUser) {
    const user = CV.analytics.counterDevUser;

    // Fire the count pixel
    const pixel = new Image();
    pixel.src = 'https://counter.dev/track?' + new URLSearchParams({
      user,
      referrer: document.referrer,
      screen:   screen.width + 'x' + screen.height,
      tz:       Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    // Fetch the count to display it
    fetch('https://counter.dev/stats?' + new URLSearchParams({ user, page: location.pathname }), { mode: 'cors' })
      .then(r => r.json())
      .then(data => {
        if (!counter) return;
        const views = data?.total ?? data?.count ?? null;
        if (views === null) return;
        counter.innerHTML =
          '<span class="view-counter-dot"></span>' +
          '<a href="https://counter.dev" target="_blank" rel="noopener" title="Powered by counter.dev">' +
          Number(views).toLocaleString() + ' views</a>';
      })
      .catch(() => {
        // silently fail — analytics shouldn't break the CV
      });
  }

  // Custom pixel URL (any endpoint, just fires a GET)
  if (CV.analytics.customPixelUrl) {
    const pixel = new Image();
    pixel.src = CV.analytics.customPixelUrl + '?r=' + Math.random();
  }
}

/* ── WIKIPEDIA IMAGE FETCHER ────────────────────────
   Automatically fetches logos/thumbnails from Wikipedia
   for any entry that has wikipediaQuery set in config.
   Results are cached in sessionStorage.
   ─────────────────────────────────────────────────── */

async function fetchWikipediaImage(query) {
  const cacheKey = 'wiki-img::' + query;
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) return cached === 'null' ? null : cached;
  } catch(e) {}

  try {
    // Step 1: find the best matching article title
    const searchUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='
      + encodeURIComponent(query) + '&limit=1&format=json&origin=*';
    const searchRes = await fetch(searchUrl);
    const [, titles] = await searchRes.json();
    if (!titles || !titles.length) { cache(cacheKey, null); return null; }

    const title = titles[0];

    // Step 2: get the page thumbnail
    const imgUrl = 'https://en.wikipedia.org/w/api.php?action=query&titles='
      + encodeURIComponent(title) + '&prop=pageimages&format=json&pithumbsize=200&origin=*';
    const imgRes = await fetch(imgUrl);
    const imgData = await imgRes.json();
    const pages = imgData.query.pages;
    const page = pages[Object.keys(pages)[0]];
    const src = page?.thumbnail?.source || null;

    cache(cacheKey, src);
    return src;
  } catch(e) {
    return null;
  }
}

function cache(key, val) {
  try { sessionStorage.setItem(key, val === null ? 'null' : val); } catch(e) {}
}

// Inject a Wikipedia image into a .tl-dot or logo-wrap element
async function injectWikiImage(dotEl, query, fallbackText) {
  if (!query) return;
  dotEl.classList.add('wiki-loading');
  const src = await fetchWikipediaImage(query);
  dotEl.classList.remove('wiki-loading');
  if (!src) return;

  // Replace whatever is in the dot with a fresh img
  dotEl.innerHTML = '';
  const img = document.createElement('img');
  img.src = src;
  img.alt = query;
  img.style.cssText = 'width:36px;height:36px;object-fit:contain;border-radius:2px;';
  img.onerror = () => {
    dotEl.innerHTML = '';
    dotEl.appendChild(makeFallback(fallbackText, 'tl-dot-fallback'));
  };

  // Fade in
  img.style.opacity = '0';
  img.style.transition = 'opacity 0.4s ease';
  dotEl.appendChild(img);
  img.onload = () => { img.style.opacity = '1'; };
}
