/* Wehan Coombs · VES 310 portfolio
   Theme toggle, phone menu, pop-out sheets, the arc of a lesson, menu highlighting. */
(function () {
  'use strict';
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.prototype.slice.call((el || document).querySelectorAll(s));
  const root = document.documentElement, body = document.body;

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
      sheetCh.textContent = CH[art.dataset.ch] || '';
      sheetTitle.textContent = art.dataset.title || '';
      sheetBody.innerHTML = art.innerHTML;
      sheetBody.scrollTop = 0;
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
