/* ==========================================================================
   upbss — shared front-end behaviour
   Vanilla ES2015+, no dependencies. Every module is defensive: if the markup
   it targets is not on the page, it exits quietly.
   ========================================================================== */

(function () {
  'use strict';

  var UP = (window.UPBSS = window.UPBSS || {});
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Utilities -------------------------------------------------- */

  UP.util = {
    money: function (n, opts) {
      if (n === null || n === undefined || n === '') return 'POA';
      var o = opts || {};
      return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(o.round ? Math.round(n / 1000) * 1000 : n);
    },

    number: function (n) {
      return new Intl.NumberFormat('en-GB').format(n);
    },

    slug: function (s) {
      return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    },

    param: function (key) {
      return new URLSearchParams(window.location.search).get(key);
    },

    escape: function (s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    },

    debounce: function (fn, wait) {
      var t;
      return function () {
        var args = arguments, ctx = this;
        clearTimeout(t);
        t = setTimeout(function () { fn.apply(ctx, args); }, wait || 200);
      };
    },

    statusLabel: function (status) {
      return { available: 'For sale', 'under-offer': 'Under offer', sold: 'Sold' }[status] || 'For sale';
    },

    statusClass: function (status) {
      return { available: 'badge-brand', 'under-offer': 'badge-offer', sold: 'badge-sold' }[status] || 'badge-brand';
    }
  };

  /* ---------- Icons (inline SVG, single stroke family) -------------------- */

  var ICON = {
    pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
    bed: '<path d="M3 18v-9"/><path d="M3 13h18v5"/><path d="M21 18v-3"/><path d="M7 13v-2.5A1.5 1.5 0 0 1 8.5 9h8A1.5 1.5 0 0 1 18 10.5V13"/>',
    bath: '<path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z"/><path d="M6 12V6a2 2 0 0 1 4 0"/><path d="M7 19l-1 2"/><path d="M17 19l1 2"/>',
    area: '<path d="M4 4h16v16H4z"/><path d="M9 4v5H4"/><path d="M15 20v-5h5"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/>',
    check: '<path d="m5 13 4 4L19 7"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.3 2.3 2.3 4.7-4.9"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.2v.1"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    chevronLeft: '<path d="m14 6-6 6 6 6"/>',
    chevronRight: '<path d="m10 6 6 6-6 6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
    shield: '<path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3Z"/><path d="m9 12 2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 2"/>',
    euro: '<path d="M17 6.5A6 6 0 0 0 7.5 12 6 6 0 0 0 17 17.5"/><path d="M4.5 10.5h8M4.5 13.5h8"/>',
    users: '<circle cx="9" cy="9" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 6.4a3.2 3.2 0 0 1 0 5.2"/><path d="M17.5 14.6a5.5 5.5 0 0 1 3 4.4"/>',
    mail: '<rect x="3" y="5.5" width="18" height="13" rx="2"/><path d="m3.6 7 8.4 6 8.4-6"/>',
    phone: '<path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z"/>',
    doc: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
    key: '<circle cx="8" cy="14" r="4"/><path d="m11 11 8-8 2 2-2 2 2 2-2 2-2-2-2 2"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    empty: '<path d="M4 7h16v13H4z"/><path d="M4 7l2-3h12l2 3"/><path d="M9 12h6"/>',
    facebook: '<path d="M14 8.5h2.5V5.5H14c-2 0-3.5 1.5-3.5 3.5v2H8v3h2.5v6h3v-6H16l.5-3h-3V9.3c0-.5.4-.8 1-.8Z"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r="1"/>',
    linkedin: '<path d="M6 9.5v9M6 5.8v.1"/><path d="M11 18.5v-5a3 3 0 0 1 6 0v5"/><path d="M11 18.5v-9"/>'
  };

  UP.icon = function (name, size) {
    var d = ICON[name];
    if (!d) return '';
    var s = size || 24;
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none" stroke="currentColor" ' +
      'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + d + '</svg>';
  };

  /* Build a responsive <img> for any of the artwork containers.
     `stem` is a path without the width suffix, e.g. 'properties/UP2291'.
     Everything on the site routes through here so srcset, lazy loading and
     alt text are handled once rather than in four separate renderers. */
  UP.propertyImage = function (stem, alt, opts) {
    var o = opts || {};
    var base = 'assets/img/' + stem;
    return '<img src="' + base + '-800.webp"' +
      ' srcset="' + base + '-800.webp 800w, ' + base + '-1400.webp 1400w"' +
      ' sizes="' + (o.sizes || '(max-width: 680px) 100vw, 33vw') + '"' +
      ' alt="' + UP.util.escape(alt || '') + '"' +
      ' loading="' + (o.eager ? 'eager' : 'lazy') + '" decoding="async">';
  };

  /* Fill <div data-scene="house" data-seed="3"> with generated artwork, or
     <div data-image="scenes/hero" data-image-alt="..."> with a photograph. */
  function hydrateScenes(root) {
    (root || document).querySelectorAll('[data-scene], [data-image]').forEach(function (el) {
      if (el.dataset.sceneDone) return;
      var html = el.dataset.image
        ? UP.propertyImage(el.dataset.image, el.dataset.imageAlt || '', {
            sizes: '(max-width: 960px) 100vw, 50vw',
            eager: el.hasAttribute('data-eager')
          })
        : UP.propertyScene(el.dataset.scene, Number(el.dataset.seed) || 1);
      el.insertAdjacentHTML('afterbegin', html);
      el.dataset.sceneDone = '1';
    });
  }

  /* Replace <i data-icon="pin"></i> placeholders anywhere in the document. */
  function hydrateIcons(root) {
    (root || document).querySelectorAll('[data-icon]').forEach(function (el) {
      if (el.dataset.iconDone) return;
      el.innerHTML = UP.icon(el.dataset.icon, el.dataset.iconSize || 24);
      el.dataset.iconDone = '1';
    });
  }
  UP.hydrateIcons = hydrateIcons;

  /* ---------- Property artwork ------------------------------------------- */
  /* Deterministic SVG scenes stand in for photography so no listing ever
     renders a broken image. Swap propertyScene() for an <img> when the CMS
     supplies real photographs. */

  var SKIES = [
    ['#2A4160', '#0F1B2C'],
    ['#3A4E6B', '#131F31'],
    ['#26405E', '#0B1626'],
    ['#42506A', '#161F2E']
  ];

  function windows(seed, cols, rows, x, y, w, h, gap) {
    var out = '';
    var cw = (w - gap * (cols - 1)) / cols;
    var ch = (h - gap * (rows - 1)) / rows;
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var lit = ((seed * 13 + r * 7 + c * 3) % 5) < 2;
        out += '<rect x="' + (x + c * (cw + gap)).toFixed(1) + '" y="' + (y + r * (ch + gap)).toFixed(1) +
          '" width="' + cw.toFixed(1) + '" height="' + ch.toFixed(1) + '" rx="1.5" fill="' +
          (lit ? '#E29B3E' : '#F6F1E7') + '" fill-opacity="' + (lit ? 0.85 : 0.16) + '"/>';
      }
    }
    return out;
  }

  UP.propertyScene = function (scene, seed) {
    seed = seed || 1;
    var sky = SKIES[seed % SKIES.length];
    var id = 'sky' + scene + seed;
    var body = '';

    switch (scene) {
      case 'house':
        body =
          '<path d="M60 210 L60 130 L160 78 L260 130 L260 210 Z" fill="#F6F1E7" fill-opacity="0.08" stroke="#F6F1E7" stroke-opacity="0.5" stroke-width="2"/>' +
          '<path d="M42 134 L160 70 L278 134" fill="none" stroke="#E29B3E" stroke-opacity="0.9" stroke-width="2.5"/>' +
          windows(seed, 2, 2, 82, 140, 56, 44, 8) +
          '<rect x="146" y="160" width="30" height="50" rx="1.5" fill="#E29B3E" fill-opacity="0.5"/>' +
          windows(seed + 1, 2, 1, 196, 140, 46, 20, 8) +
          '<path d="M20 210 H300" stroke="#E29B3E" stroke-opacity="0.8" stroke-width="2"/>' +
          '<path d="M282 210 v-38 m-9 12 9-9 9 9" stroke="#F6F1E7" stroke-opacity="0.32" stroke-width="2" fill="none"/>' +
          '<path d="M38 210 v-30 m-8 10 8-8 8 8" stroke="#F6F1E7" stroke-opacity="0.32" stroke-width="2" fill="none"/>';
        break;

      case 'tower':
        body =
          '<rect x="72" y="52" width="106" height="158" rx="3" fill="#F6F1E7" fill-opacity="0.07" stroke="#F6F1E7" stroke-opacity="0.45" stroke-width="2"/>' +
          windows(seed, 3, 6, 84, 64, 82, 118, 7) +
          '<rect x="190" y="104" width="72" height="106" rx="3" fill="#F6F1E7" fill-opacity="0.05" stroke="#F6F1E7" stroke-opacity="0.32" stroke-width="1.6"/>' +
          windows(seed + 2, 2, 4, 200, 116, 52, 74, 7) +
          '<path d="M72 88 h106 M72 124 h106 M72 160 h106" stroke="#E29B3E" stroke-opacity="0.55" stroke-width="1.4"/>' +
          '<path d="M20 210 H300" stroke="#E29B3E" stroke-opacity="0.8" stroke-width="2"/>';
        break;

      case 'loft':
        body =
          '<path d="M56 210 V96 L164 60 L164 210 Z" fill="#F6F1E7" fill-opacity="0.07" stroke="#F6F1E7" stroke-opacity="0.45" stroke-width="2"/>' +
          '<path d="M164 210 V88 L268 116 V210 Z" fill="#F6F1E7" fill-opacity="0.04" stroke="#F6F1E7" stroke-opacity="0.3" stroke-width="1.6"/>' +
          windows(seed, 2, 3, 72, 110, 76, 78, 9) +
          '<path d="M180 130 h74 M180 158 h74 M180 186 h74" stroke="#F6F1E7" stroke-opacity="0.2" stroke-width="1.4"/>' +
          '<rect x="196" y="132" width="26" height="24" fill="#E29B3E" fill-opacity="0.75"/>' +
          '<path d="M20 210 H300" stroke="#E29B3E" stroke-opacity="0.8" stroke-width="2"/>';
        break;

      case 'shop':
        body =
          '<rect x="46" y="80" width="212" height="130" fill="#F6F1E7" fill-opacity="0.06" stroke="#F6F1E7" stroke-opacity="0.42" stroke-width="2"/>' +
          '<path d="M46 128 H258" stroke="#F6F1E7" stroke-opacity="0.35" stroke-width="1.6"/>' +
          windows(seed, 4, 1, 58, 92, 188, 26, 10) +
          '<rect x="62" y="146" width="76" height="64" fill="#E29B3E" fill-opacity="0.6"/>' +
          '<rect x="152" y="146" width="94" height="64" fill="#F6F1E7" fill-opacity="0.14"/>' +
          '<path d="M46 140 l16 -14 h184 l16 14 Z" fill="#E29B3E" fill-opacity="0.35"/>' +
          '<path d="M20 210 H300" stroke="#E29B3E" stroke-opacity="0.8" stroke-width="2"/>';
        break;

      case 'terrace':
        body =
          '<rect x="48" y="86" width="66" height="124" fill="#F6F1E7" fill-opacity="0.07" stroke="#F6F1E7" stroke-opacity="0.42" stroke-width="1.8"/>' +
          '<rect x="118" y="66" width="70" height="144" fill="#F6F1E7" fill-opacity="0.05" stroke="#F6F1E7" stroke-opacity="0.42" stroke-width="1.8"/>' +
          '<rect x="192" y="98" width="64" height="112" fill="#F6F1E7" fill-opacity="0.07" stroke="#F6F1E7" stroke-opacity="0.42" stroke-width="1.8"/>' +
          windows(seed, 2, 3, 58, 98, 46, 76, 8) +
          windows(seed + 3, 2, 4, 128, 78, 50, 100, 8) +
          windows(seed + 5, 2, 3, 202, 110, 44, 74, 8) +
          '<path d="M48 86 h66 M118 66 h70 M192 98 h64" stroke="#E29B3E" stroke-opacity="0.75" stroke-width="2.5"/>' +
          '<path d="M20 210 H300" stroke="#E29B3E" stroke-opacity="0.8" stroke-width="2"/>';
        break;

      default: /* land */
        body =
          '<path d="M40 196 L120 150 L206 178 L276 142" fill="none" stroke="#F6F1E7" stroke-opacity="0.3" stroke-width="2"/>' +
          '<path d="M56 210 L56 156 L246 122 L246 186 Z" fill="#E29B3E" fill-opacity="0.1" stroke="#E29B3E" stroke-opacity="0.7" stroke-width="2" stroke-dasharray="7 6"/>' +
          '<circle cx="56" cy="156" r="4" fill="#E29B3E"/><circle cx="246" cy="122" r="4" fill="#E29B3E"/>' +
          '<circle cx="246" cy="186" r="4" fill="#E29B3E"/><circle cx="56" cy="210" r="4" fill="#E29B3E"/>' +
          '<path d="M20 210 H300" stroke="#E29B3E" stroke-opacity="0.8" stroke-width="2"/>';
    }

    return '<svg class="scene" viewBox="0 0 320 224" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true" focusable="false">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0.4" y2="1">' +
      '<stop offset="0" stop-color="' + sky[0] + '"/><stop offset="1" stop-color="' + sky[1] + '"/></linearGradient>' +
      '<pattern id="g' + id + '" width="16" height="16" patternUnits="userSpaceOnUse">' +
      '<path d="M16 0H0v16" fill="none" stroke="#F6F1E7" stroke-opacity="0.09" stroke-width="1"/></pattern></defs>' +
      '<rect width="320" height="224" fill="url(#' + id + ')"/>' +
      '<rect width="320" height="224" fill="url(#g' + id + ')"/>' +
      '<circle cx="' + (250 - (seed % 5) * 22) + '" cy="46" r="15" fill="#E29B3E" fill-opacity="0.3"/>' +
      body + '</svg>';
  };

  /* ---------- Theme ------------------------------------------------------- */

  function initTheme() {
    var toggles = document.querySelectorAll('[data-theme-toggle]');
    if (!toggles.length) return;

    function current() {
      var set = document.documentElement.getAttribute('data-theme');
      if (set) return set;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function apply(mode) {
      document.documentElement.setAttribute('data-theme', mode);
      try { localStorage.setItem('upbss-theme', mode); } catch (e) { /* private mode */ }
      toggles.forEach(function (b) {
        b.setAttribute('aria-label', mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        b.setAttribute('aria-pressed', String(mode === 'dark'));
      });
    }

    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () { apply(current() === 'dark' ? 'light' : 'dark'); });
    });
    apply(current());
  }

  /* ---------- Header + navigation ---------------------------------------- */

  function initHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var burger = header.querySelector('.burger');
    var mobile = header.querySelector('.mobile-nav');
    if (!burger || !mobile) return;

    function setOpen(open) {
      burger.setAttribute('aria-expanded', String(open));
      mobile.classList.toggle('is-open', open);
    }

    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });

    mobile.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        burger.focus();
      }
    });

    window.addEventListener('resize', UP.util.debounce(function () {
      if (window.innerWidth > 1024) setOpen(false);
    }, 150));

    /* Mark the current page in both navs. */
    var here = window.location.pathname.split('/').pop() || 'index.html';
    header.querySelectorAll('a[href]').forEach(function (a) {
      var target = a.getAttribute('href').split('?')[0].split('#')[0];
      if (target && target === here) a.setAttribute('aria-current', 'page');
    });
  }

  /* ---------- Accordion --------------------------------------------------- */

  UP.initAccordion = function (root) {
    (root || document).querySelectorAll('.accordion').forEach(function (acc) {
      if (acc.dataset.bound) return;
      acc.dataset.bound = '1';
      acc.addEventListener('click', function (e) {
        var trigger = e.target.closest('.acc-trigger');
        if (!trigger || !acc.contains(trigger)) return;
        var item = trigger.closest('.acc-item');
        var open = item.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', String(open));
      });
    });
  };

  /* ---------- Testimonial carousel ---------------------------------------- */

  function initCarousel() {
    var shell = document.querySelector('[data-carousel]');
    if (!shell || !UP.testimonials) return;

    var items = UP.testimonials;
    var fig = shell.querySelector('.testimonial');
    var quote = shell.querySelector('[data-quote]');
    var name = shell.querySelector('[data-name]');
    var role = shell.querySelector('[data-role]');
    var dots = shell.querySelector('[data-dots]');
    var live = shell.querySelector('[data-live]');
    var index = 0;
    var timer;

    dots.innerHTML = items.map(function (_, i) {
      return '<button type="button" role="tab" aria-selected="' + (i === 0) +
        '" aria-label="Testimonial ' + (i + 1) + ' of ' + items.length + '"></button>';
    }).join('');

    function render(i, announce) {
      index = (i + items.length) % items.length;
      var t = items[index];
      var swap = function () {
        quote.textContent = '“' + t.quote + '”';
        name.textContent = t.name;
        role.textContent = t.role;
        if (announce && live) live.textContent = t.quote + ' — ' + t.name + ', ' + t.role;
        dots.querySelectorAll('button').forEach(function (b, bi) {
          b.setAttribute('aria-selected', String(bi === index));
        });
        fig.classList.remove('is-swapping');
      };
      if (reduceMotion) return swap();
      fig.classList.add('is-swapping');
      setTimeout(swap, 180);
    }

    function restart() {
      clearInterval(timer);
      if (reduceMotion) return;
      timer = setInterval(function () { render(index + 1); }, 7000);
    }

    shell.querySelector('[data-prev]').addEventListener('click', function () { render(index - 1, true); restart(); });
    shell.querySelector('[data-next]').addEventListener('click', function () { render(index + 1, true); restart(); });
    dots.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) return;
      render([].indexOf.call(dots.children, b), true);
      restart();
    });
    shell.addEventListener('mouseenter', function () { clearInterval(timer); });
    shell.addEventListener('mouseleave', restart);
    shell.addEventListener('focusin', function () { clearInterval(timer); });

    render(0);
    restart();
  }

  /* ---------- Scroll reveal ----------------------------------------------- */

  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = (entry.target.dataset.delay || 0) + 'ms';
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Forms ------------------------------------------------------- */
  /* Client-side validation plus a real submit.

     ============================================================
     TO MAKE THE FORMS ACTUALLY EMAIL YOU: fill in FORM.key below.
     ============================================================

     Until a key is present every form falls back to the old simulated
     success, so the demo keeps working and nothing breaks half-configured.

     An access key here is meant to be public — it only lets a visitor submit
     to your own form. Never put a real email API key (SendGrid, Mailgun,
     Resend) in front-end code: anyone reading the page source could then
     send mail as you. */

  var FORM = {
    /* Enquiries are handled by our own PHP script on the same server, so there
       is no third-party form service, no monthly submission cap, and the mail
       is sent from the site's own domain rather than someone else's.
       The delivery address is set in api/enquiry.php, not here. */
    provider: 'custom',
    endpoint: '/api/enquiry.php',
    key: '',                    /* unused for 'custom' — kept for easy switching back */
    destination: 'customerservice@upbss.com'
  };

  function formEndpoint() {
    if (FORM.provider === 'web3forms') return FORM.key ? 'https://api.web3forms.com/submit' : null;
    if (FORM.provider === 'formspree') return FORM.key ? 'https://formspree.io/f/' + FORM.key : null;
    return FORM.endpoint || null;
  }

  /* True once a key is in place. Callers use this to decide whether to send
     for real or fall back to the simulation. */
  UP.formConfigured = function () { return !!formEndpoint(); };

  /* Spam trap. Bots fill in every field they find, so a field a human never
     sees arriving with a value is a reliable bot signal. Kept off-screen
     rather than display:none, because many bots skip hidden inputs, and
     hidden from assistive tech so it is never announced or focused. */
  function addHoneypot(form) {
    if (form.querySelector('[data-honeypot]')) return;
    var name = FORM.provider === 'formspree' ? '_gotcha' : 'botcheck';
    var el = document.createElement('input');
    el.type = FORM.provider === 'formspree' ? 'text' : 'checkbox';
    el.name = name;
    el.className = 'sr-only';
    el.tabIndex = -1;
    el.setAttribute('autocomplete', 'off');
    el.setAttribute('aria-hidden', 'true');
    el.setAttribute('data-honeypot', '');
    form.appendChild(el);
  }

  /* One send path for every lead on the site, so the contact form, the
     viewing request and the appraisal wizard all behave identically.
     Resolves true on success, false on failure, and null when no key is
     configured yet. */
  UP.submitLead = function (fields, opts) {
    var url = formEndpoint();
    if (!url) return Promise.resolve(null);

    var o = opts || {};
    var body = {};
    Object.keys(fields).forEach(function (k) { body[k] = fields[k]; });

    body.source_page = window.location.pathname.split('/').pop() || 'index.html';
    var subject = o.subject || 'UPBSS website — new enquiry';

    if (FORM.provider === 'web3forms') {
      body.access_key = FORM.key;
      body.subject = subject;
      if (fields.name) body.from_name = fields.name;
      if (fields.email) body.replyto = fields.email;
    } else if (FORM.provider === 'formspree') {
      body._subject = subject;
      if (fields.email) body._replyto = fields.email;
    } else {
      body.subject = subject;
    }

    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body)
    }).then(function (r) {
      if (!r.ok) console.warn('upbss: form provider returned ' + r.status);
      return r.ok;
    }).catch(function (e) {
      console.warn('upbss: form submission failed', e);
      return false;
    });
  };

  function fieldOf(input) { return input.closest('.field') || input.closest('.checkbox'); }

  function showError(input, message) {
    var wrap = fieldOf(input);
    if (!wrap) return;
    wrap.classList.add('has-error');
    var slot = wrap.querySelector('.field-error');
    if (slot) slot.innerHTML = UP.icon('alert', 14) + '<span>' + UP.util.escape(message) + '</span>';
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input) {
    var wrap = fieldOf(input);
    if (!wrap) return;
    wrap.classList.remove('has-error');
    input.removeAttribute('aria-invalid');
  }

  function validate(input) {
    var value = (input.value || '').trim();
    var label = input.dataset.label || 'This field';

    if (input.type === 'checkbox') {
      if (input.required && !input.checked) { showError(input, 'Please tick to continue.'); return false; }
      clearError(input); return true;
    }
    if (input.required && !value) { showError(input, label + ' is required.'); return false; }
    if (value && input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      showError(input, 'Enter a valid email address, e.g. name@example.com.'); return false;
    }
    if (value && input.type === 'tel' && !/^[+0-9 ()\/-]{6,}$/.test(value)) {
      showError(input, 'Enter a valid phone number, digits and + only.'); return false;
    }
    if (value && input.type === 'number') {
      var n = Number(value);
      if (Number.isNaN(n)) { showError(input, 'Enter a number.'); return false; }
      if (input.min !== '' && n < Number(input.min)) { showError(input, label + ' must be at least ' + input.min + '.'); return false; }
      if (input.max !== '' && n > Number(input.max)) { showError(input, label + ' must be no more than ' + input.max + '.'); return false; }
    }
    clearError(input);
    return true;
  }

  UP.validateGroup = function (inputs) {
    var ok = true, first = null;
    inputs.forEach(function (i) {
      if (!validate(i) && ok) { ok = false; first = i; }
      else if (!validate(i)) { /* already invalid */ }
    });
    if (first) first.focus();
    return ok;
  };

  function initForms() {
    document.querySelectorAll('form[data-validate]').forEach(function (form) {
      if (form.dataset.bound) return;
      form.dataset.bound = '1';
      /* Suppress native validation bubbles so every error is reported the same
         way: inline, next to the field, with a recovery hint. */
      form.setAttribute('novalidate', '');
      var fields = [].slice.call(form.querySelectorAll('input, select, textarea'));
      /* Added after `fields` is read, so the trap is submitted but never
         validated or focused as part of the real form. */
      addHoneypot(form);

      fields.forEach(function (input) {
        input.addEventListener('blur', function () { if (input.value || input.required) validate(input); });
        input.addEventListener('input', function () {
          if (fieldOf(input) && fieldOf(input).classList.contains('has-error')) validate(input);
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var status = form.querySelector('.form-status');
        var btn = form.querySelector('[type="submit"]');

        var ok = true, firstBad = null;
        fields.forEach(function (input) {
          if (!validate(input)) { ok = false; if (!firstBad) firstBad = input; }
        });

        if (!ok) {
          if (status) {
            status.className = 'form-status error is-visible';
            status.innerHTML = UP.icon('alert', 18) + '<span>Please correct the highlighted fields and try again.</span>';
          }
          if (firstBad) firstBad.focus();
          return;
        }

        var label = btn ? btn.textContent : '';
        if (btn) { btn.classList.add('is-loading'); btn.disabled = true; btn.textContent = 'Sending…'; }
        if (status) status.classList.remove('is-visible');

        var done = function (success) {
          if (btn) { btn.classList.remove('is-loading'); btn.disabled = false; btn.textContent = label; }
          if (!status) return;
          status.className = 'form-status ' + (success ? 'success' : 'error') + ' is-visible';
          status.innerHTML = success
            ? UP.icon('checkCircle', 18) + '<span>' + (form.dataset.successMessage ||
              'Thank you — your enquiry has been received. A named consultant will reply within one working day.') + '</span>'
            : UP.icon('alert', 18) + '<span>Something went wrong sending that. Please call us on ' +
              UP.config.phone + ' and we will pick it up.</span>';
          if (success) form.reset();
          status.focus && status.focus();
        };

        if (UP.formConfigured()) {
          var payload = Object.fromEntries(new FormData(form));
          /* A ticked consent box arrives as 'on'; send a real boolean. */
          if (form.elements.consent) payload.consent = !!form.elements.consent.checked;
          UP.submitLead(payload, {
            subject: form.dataset.subject ||
              ('UPBSS website — ' + (payload.interest || 'enquiry') +
               (payload.ref ? ' (ref ' + payload.ref + ')' : ''))
          }).then(function (ok) { done(ok); });
        } else {
          setTimeout(function () { done(true); }, 700);
        }
      });
    });
  }

  /* ---------- Footer year, telephone, misc -------------------------------- */

  function initChrome() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---------- Boot -------------------------------------------------------- */

  function boot() {
    hydrateIcons();
    hydrateScenes();
    initTheme();
    initHeader();
    UP.initAccordion();
    initCarousel();
    initForms();
    initChrome();
    initReveal();
    document.dispatchEvent(new CustomEvent('upbss:ready'));
  }

  /* Pages that inject markup after boot (property detail, guide article) fire
     upbss:rebind so late-arriving forms, accordions and icons get wired up. */
  document.addEventListener('upbss:rebind', function () {
    hydrateIcons();
    hydrateScenes();
    UP.initAccordion();
    initForms();
    initReveal();
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
