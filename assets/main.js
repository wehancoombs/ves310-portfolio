/* Wehan Coombs · VES 310 portfolio
   Theme toggle, phone menu, pop-out sheets, the arc of a lesson, menu highlighting. */
(function () {
  'use strict';
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.prototype.slice.call((el || document).querySelectorAll(s));
  const root = document.documentElement, body = document.body;

  /* ---------- Decorative icon in the pop-out header ---------- */
  const ART = {
    quill: '<svg viewBox="0 0 48 48"><path d="M8 40c6-2 10-6 14-12 4-6 8-10 18-16-4 10-8 14-14 18-6 4-10 6-18 10z"/><path d="M8 40l10-10"/></svg>',
    scroll: '<svg viewBox="0 0 48 48"><path d="M10 8h24l6 6v26H10z"/><path d="M34 8v6h6"/><path d="M16 20h16M16 26h16M16 32h10"/></svg>',
    school: '<svg viewBox="0 0 48 48"><path d="M6 40V20l10-8 10 8v20"/><path d="M26 40V24l8-6 8 6v16"/><path d="M6 40h36"/></svg>',
    lamp: '<svg viewBox="0 0 48 48"><path d="M18 34c-6-3-9-8-9-14a15 15 0 0 1 30 0c0 6-3 11-9 14"/><path d="M18 34v4h12v-4M20 42h8"/></svg>',
    book: '<svg viewBox="0 0 48 48"><path d="M8 10h14a4 4 0 0 1 4 4v26a4 4 0 0 0-4-4H8z"/><path d="M40 10H26a4 4 0 0 0-4 4v26a4 4 0 0 1 4-4h14z"/></svg>',
    quote: '<svg viewBox="0 0 48 48"><path d="M10 28a8 8 0 0 1 8-8v-8a16 16 0 0 0-16 16v12h16V28z"/><path d="M28 28a8 8 0 0 1 8-8v-8a16 16 0 0 0-16 16v12h16V28z"/></svg>'
  };



  /* ---------- Theme: remembered in this browser ---------- */
  const themeBtn = $('#theme');
  const isLight = () => root.getAttribute('data-theme') === 'light';
  function paintTheme() { if (themeBtn) themeBtn.textContent = isLight() ? '☾ Dark' : '☀ Light'; }
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      if (isLight()) root.removeAttribute('data-theme'); else root.setAttribute('data-theme', 'light');
      try { localStorage.setItem('theme', isLight() ? 'light' : 'dark'); } catch (e) {}
      paintTheme();
    });
    paintTheme();
  }

  /* ---------- Phone menu ---------- */
  const menuBtn = $('.menu-btn'), nav = $('#nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', e => {
      if (e.target.tagName === 'A') { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ---------- Lesson stages: tap a segment, read that stage ---------- */
  function initStages(root) {
    $$('.lesson-bar', root).forEach(bar => {
      const steps = bar.parentElement.querySelector('ol.steps'); if (!steps) return;
      const segs = $$('span', bar), items = $$('li', steps);
      bar.classList.add('staged'); steps.classList.add('staged');
      const pick = i => { segs.forEach((s2, k) => s2.classList.toggle('on', k === i)); items.forEach((li, k) => { li.dataset.n = k + 1; li.classList.toggle('on', k === i); }); };
      segs.forEach((s2, i) => { s2.setAttribute('role', 'button'); s2.setAttribute('tabindex', '0'); s2.addEventListener('click', () => pick(i)); s2.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(i); } }); });
      pick(0);
    });
  }

  /* ---------- Pop-out sheets: content lives in #library, one sheet shows it ---------- */
  const sheet = $('#sheet'), scrim = $('#scrim'), lib = $('#library');
  if (sheet && scrim && lib) {
    const sheetTitle = $('#sheet-title'), sheetBody = $('#sheet-body'), sheetCh = $('#sheet-ch');
    const CH = { begin: 'Introduction', profile: 'Profile', lessons: 'Lesson plans', assessment: 'Assessment', technology: 'Technology', references: 'References' };
    let lastFocus = null, timer = null;
    function find(id) { return lib.querySelector('[id="s-' + id + '"]'); }
    function openSheet(id) {
      const art = find(id); if (!art) return;
      clearTimeout(timer);
      if (!sheet.classList.contains('on')) lastFocus = document.activeElement;
      sheet.dataset.ch = art.dataset.ch || '';
      if (art.dataset.tone) sheet.dataset.tone = art.dataset.tone; else delete sheet.dataset.tone;
      const artBox = $('#sheet-art'); if (artBox) artBox.innerHTML = ART[art.dataset.art] || '';
      sheetCh.textContent = CH[art.dataset.ch] || '';
      sheetTitle.textContent = art.dataset.title || '';
      sheetBody.innerHTML = art.innerHTML;
      sheetBody.scrollTop = 0;
      initStages(sheetBody);
      sheet.hidden = false; scrim.hidden = false; body.classList.add('locked');
      requestAnimationFrame(() => { sheet.classList.add('on'); scrim.classList.add('on'); sheetTitle.focus({ preventScroll: true }); });
      try { history.replaceState(null, '', '#s-' + id); } catch (e) {}
    }
    function closeSheet() {
      if (!sheet.classList.contains('on')) return;
      sheet.classList.remove('on'); scrim.classList.remove('on'); body.classList.remove('locked');
      timer = setTimeout(() => { sheet.hidden = true; scrim.hidden = true; sheetBody.innerHTML = ''; }, 420);
      try { history.replaceState(null, '', location.pathname); } catch (e) {}
      if (lastFocus && lastFocus.focus) { lastFocus.focus({ preventScroll: true }); lastFocus = null; }
    }
    $('#sheet-close').addEventListener('click', closeSheet);
    scrim.addEventListener('click', closeSheet);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
    document.addEventListener('click', e => {
      const s = e.target.closest('[data-sheet]');
      if (s) { e.preventDefault(); openSheet(s.dataset.sheet); }
    });
    function fromHash() {
      const h = location.hash || '';
      if (h.indexOf('#s-') === 0) {
        const id = h.slice(3), art = find(id);
        if (art) { const sec = $('#' + art.dataset.ch); if (sec) sec.scrollIntoView({ block: 'start' }); openSheet(id); }
      }
    }
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  /* ---------- The arc of a lesson ---------- */
  const arcText = $('#arc-text'), nodes = $$('.arc .node');
  nodes.forEach(n => {
    const go = () => { nodes.forEach(m => m.classList.toggle('on', m === n)); if (arcText) arcText.textContent = n.dataset.text; };
    n.addEventListener('click', go); n.addEventListener('mouseenter', go); n.addEventListener('focus', go);
  });


  /* ---------- One activity, two classrooms: the switch ---------- */
  const cls = $('#classroom'), clsBtn = $('#cls-switch'), clsState = $('#cls-state');
  if (cls && clsBtn) {
    clsBtn.addEventListener('click', () => {
      const off = cls.classList.toggle('off');
      clsBtn.setAttribute('aria-pressed', off ? 'false' : 'true');
      if (clsState) clsState.textContent = off ? 'off · the same Gauntlet on a chalkboard' : 'on · the Tempest Gauntlet on Kahoot';
    });
  }

  /* ---------- Gallery: swipe, arrows, dots ---------- */
  $$('.gallery').forEach(g => {
    const track = $('.gal-track', g), slides = $$('.gal-slide', g), dots = $$('.gal-dots button', g);
    const go = i => { i = (i + slides.length) % slides.length; track.scrollTo({ left: slides[i].offsetLeft - track.offsetLeft, behavior: 'smooth' }); };
    const current = () => Math.round(track.scrollLeft / Math.max(1, slides[0].offsetWidth + 12));
    $('.gal-prev', g).addEventListener('click', () => go(current() - 1));
    $('.gal-next', g).addEventListener('click', () => go(current() + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    track.addEventListener('scroll', () => { const c = current(); dots.forEach((d, i) => d.classList.toggle('on', i === c)); }, { passive: true });
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight') go(current() + 1); if (e.key === 'ArrowLeft') go(current() - 1); });
  });

  /* ---------- Hover cards: centred, hover to peek, click to pin ---------- */
  const pc = $('#popcard'), pcScrim = $('#pc-scrim');
  if (pc && pcScrim) {
    let pinned = false, pcTimer = null, currentPop = null, pcFocus = null;
    const src = id => document.getElementById('p-' + id);
    function showPop(id, pin) {
      const s = src(id); if (!s) return;
      clearTimeout(pcTimer);
      if (currentPop !== id) pc.innerHTML = '<button class="close" type="button" aria-label="Close">×</button>' + s.innerHTML + (pin ? '' : '<p class="pc-hint">Click the card to keep it open.</p>');
      currentPop = id;
      pc.hidden = false; pcScrim.hidden = false; pcScrim.classList.toggle('peek', !pin);
      requestAnimationFrame(() => { pc.classList.add('on'); pcScrim.classList.add('on'); });
      if (pin) { pinned = true; pcFocus = document.activeElement; const h = $('.pc-hint', pc); if (h) h.remove(); $('.close', pc).focus({ preventScroll: true }); }
    }
    function hidePop(force) {
      if (pinned && !force) return;
      pinned = false; currentPop = null;
      pc.classList.remove('on'); pcScrim.classList.remove('on');
      pcTimer = setTimeout(() => { pc.hidden = true; pcScrim.hidden = true; pc.innerHTML = ''; }, 240);
      if (force && pcFocus && pcFocus.focus) { pcFocus.focus({ preventScroll: true }); pcFocus = null; }
    }
    $$('[data-pop]').forEach(el => {
      const id = el.dataset.pop;
      el.addEventListener('click', e => { e.preventDefault(); if (pinned && currentPop === id) hidePop(true); else showPop(id, true); });
    });
    pc.addEventListener('click', e => {
      if (e.target.closest('.close')) { hidePop(true); return; }
      if (e.target.closest('[data-sheet]')) { hidePop(true); return; }
      if (!pinned) { pinned = true; pcScrim.classList.remove('peek'); const h = $('.pc-hint', pc); if (h) h.remove(); }
    });
    pcScrim.addEventListener('click', () => hidePop(true));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hidePop(true); });
  }

  /* ---------- Highlight the menu item for the chapter on screen ---------- */
  const secs = $$('.chapter[id]'), links = $$('.nav a[href^="#"]');
  if (secs.length && links.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
      });
    }, { rootMargin: '-15% 0px -75% 0px' });
    secs.forEach(s => io.observe(s));
  }
})();
