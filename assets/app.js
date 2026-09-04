/* Nguyen Tuan Dinh — BA Portfolio · shared behaviour
   Theme + language applied to <html> before body renders (script is in <head>),
   persisted per-viewer in localStorage. Wiring runs on DOMContentLoaded. */
(function () {
  'use strict';

  /* ===========================================================
     EDIT YOUR CONTACT DETAILS HERE  ↓↓↓
     Leave a value as "" to hide that item everywhere on the site.
     These are injected by JavaScript, so they do NOT sit in the
     raw page source (a mild anti-scraping measure).
     =========================================================== */
  var CONTACT = {
    email:    "ngtuandinh2004@gmail.com",
    phone:    "",   // e.g. "0869 159 656"  — leave "" to hide the phone line
    linkedin: "https://www.linkedin.com/in/định-nguyễn-tuấn-1a7004431/",   // full URL, e.g. "https://www.linkedin.com/in/your-handle"
    github:   "https://github.com/ngtuandinh123",
    cv:       ""    // link to your CV PDF, e.g. "assets/cv.pdf"
  };
  /* =========================================================== */

  var root = document.documentElement;
  var LS = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  // ---- apply stored (or system) preferences immediately ----
  var theme = LS.get('pf-theme');
  if (theme !== 'light' && theme !== 'dark') {
    theme = (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  root.setAttribute('data-theme', theme);

  var lang = LS.get('pf-lang');
  if (lang !== 'en' && lang !== 'vi') lang = 'en';
  root.setAttribute('data-lang', lang);
  root.lang = lang;

  function sync() {
    var t = root.getAttribute('data-theme');
    var l = root.getAttribute('data-lang');
    document.querySelectorAll('[data-toggle-theme]').forEach(function (b) {
      b.textContent = t === 'dark' ? '☾' : '☀';
      b.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === l));
    });
  }

  function fillContacts() {
    // hide any item whose value is empty
    document.querySelectorAll('[data-contact-item]').forEach(function (el) {
      var key = el.getAttribute('data-contact-item');
      if (!CONTACT[key]) el.style.display = 'none';
    });
    // fill links / text
    document.querySelectorAll('[data-contact]').forEach(function (el) {
      var key = el.getAttribute('data-contact');
      var val = CONTACT[key];
      if (!val) { return; }
      var leaf = el.children.length === 0; // no child elements → safe to set text
      if (key === 'email') {
        if (el.tagName === 'A') el.setAttribute('href', 'mailto:' + val);
        if (leaf) el.textContent = val;
      } else if (key === 'phone') {
        el.textContent = val;
      } else { // linkedin, github, cv
        if (el.tagName === 'A') {
          el.setAttribute('href', val);
          if (key !== 'cv') { el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); }
        }
      }
    });
  }

  function wire() {
    fillContacts();

    document.querySelectorAll('[data-toggle-theme]').forEach(function (b) {
      b.addEventListener('click', function () {
        theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', theme);
        LS.set('pf-theme', theme);
        sync();
      });
    });
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.addEventListener('click', function () {
        lang = b.getAttribute('data-set-lang');
        root.setAttribute('data-lang', lang);
        root.lang = lang;
        LS.set('pf-lang', lang);
        sync();
        syncScrollRegions();   // labels are language-specific
      });
    });
    sync();

    // in-page nav: mark the section currently in view (homepage only — links start with '#')
    var navLinks = [].filter.call(
      document.querySelectorAll('.nav .links a[href^="#"]'),
      function (a) { return document.getElementById(a.getAttribute('href').slice(1)); }
    );
    if (navLinks.length && 'IntersectionObserver' in window) {
      var navMap = {};
      navLinks.forEach(function (a) { navMap[a.getAttribute('href').slice(1)] = a; });
      var navCur = null;
      var navSpy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var id = en.target.id;
          if (id === navCur || !navMap[id]) return;
          if (navCur && navMap[navCur]) navMap[navCur].removeAttribute('aria-current');
          navMap[id].setAttribute('aria-current', 'true');
          navCur = id;
        });
      }, { rootMargin: '-70px 0px -70% 0px', threshold: 0 });
      navLinks.forEach(function (a) { navSpy.observe(document.getElementById(a.getAttribute('href').slice(1))); });
    }

    // keep horizontally-scrolling containers keyboard-reachable (WCAG 2.1.1);
    // re-evaluated on resize and on language change, and torn down when a
    // container stops overflowing so it leaves no phantom tab stop / region.
    function syncScrollRegions() {
      var l = root.getAttribute('data-lang');
      var generic = l === 'vi' ? 'vùng cuộn ngang' : 'scrollable region';
      document.querySelectorAll('.tbl-scroll, .diagram-scroll, pre.code').forEach(function (el) {
        if (el.scrollWidth - el.clientWidth > 2) {
          el.tabIndex = 0;
          el.setAttribute('role', 'region');
          el.setAttribute('data-scroll-region', '');
          var label = el.getAttribute('data-scroll-label') || '';
          if (!label) {
            var fig = el.closest('figure');
            var cap = fig && fig.querySelector('figcaption');
            if (cap) label = (cap.querySelector('[data-lang="' + l + '"]') || cap).textContent.trim();
          }
          if (!label) {
            var prev = el.previousElementSibling;
            while (prev && !/^H[1-6]$/.test(prev.tagName)) prev = prev.previousElementSibling;
            if (prev) label = (prev.querySelector('[data-lang="' + l + '"]') || prev).textContent.trim();
          }
          el.setAttribute('aria-label', label ? label + ' — ' + generic : generic);
        } else if (el.hasAttribute('data-scroll-region')) {
          el.removeAttribute('tabindex');
          el.removeAttribute('role');
          el.removeAttribute('aria-label');
          el.removeAttribute('data-scroll-region');
        }
      });
    }
    syncScrollRegions();
    var srTimer;
    function scheduleSync() { clearTimeout(srTimer); srTimer = setTimeout(syncScrollRegions, 150); }
    if ('ResizeObserver' in window) {
      new ResizeObserver(scheduleSync).observe(document.documentElement);
    } else {
      window.addEventListener('resize', scheduleSync);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wire);
  } else {
    wire();
  }
})();
