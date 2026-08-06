/* ==========================================================================
   upbss — FAQ and guide content rendering
   ========================================================================== */

(function () {
  'use strict';

  var UP = window.UPBSS;
  var u = UP.util;

  function accordionItem(item, i, idPrefix) {
    var id = idPrefix + i;
    return '' +
      '<div class="acc-item">' +
        '<h3>' +
          '<button class="acc-trigger" type="button" aria-expanded="false" aria-controls="' + id + '">' +
            '<span>' + u.escape(item.q) + '</span>' +
            '<span class="acc-icon">' + UP.icon('chevronDown', 15) + '</span>' +
          '</button>' +
        '</h3>' +
        '<div class="acc-panel" id="' + id + '" role="region"><div><p>' + u.escape(item.a) + '</p></div></div>' +
      '</div>';
  }

  /* ---------- FAQ ---------------------------------------------------------- */

  function initFaq() {
    var host = document.querySelector('[data-faq]');
    if (!host) return;

    var limit = Number(host.dataset.faq) || 0;
    var catBar = document.getElementById('faqCategories');
    var searchInput = document.getElementById('faqSearch');
    var empty = document.getElementById('faqEmpty');
    var activeCat = 'All';

    if (catBar) {
      var cats = ['All'].concat(UP.faqs.map(function (f) { return f.cat; })
        .filter(function (c, i, arr) { return arr.indexOf(c) === i; }));
      catBar.innerHTML = cats.map(function (c) {
        return '<button type="button" class="chip" data-cat="' + c + '" aria-pressed="' +
          (c === 'All') + '">' + c + '</button>';
      }).join('');
      catBar.addEventListener('click', function (e) {
        var b = e.target.closest('[data-cat]');
        if (!b) return;
        activeCat = b.dataset.cat;
        catBar.querySelectorAll('.chip').forEach(function (c) {
          c.setAttribute('aria-pressed', String(c === b));
        });
        draw();
      });
    }

    if (searchInput) searchInput.addEventListener('input', u.debounce(draw, 200));

    function draw() {
      var q = searchInput ? searchInput.value.trim().toLowerCase() : '';
      var list = UP.faqs.filter(function (f) {
        if (activeCat !== 'All' && f.cat !== activeCat) return false;
        if (q && (f.q + ' ' + f.a).toLowerCase().indexOf(q) === -1) return false;
        return true;
      });
      if (limit) list = list.slice(0, limit);

      host.innerHTML = list.map(function (f, i) { return accordionItem(f, i, 'faq-'); }).join('');
      if (empty) empty.hidden = list.length > 0;
      UP.hydrateIcons(host);
      UP.initAccordion(host.parentNode);
    }

    draw();
  }

  /* ---------- Guides index ------------------------------------------------- */

  function initGuides() {
    var grid = document.querySelector('[data-guides]');
    if (!grid) return;
    var limit = Number(grid.dataset.guides) || UP.guides.length;

    grid.innerHTML = UP.guides.slice(0, limit).map(function (g, i) {
      return '' +
        '<article class="guide-card">' +
          '<div class="guide-media">' + UP.propertyScene(['tower', 'house', 'loft', 'terrace', 'shop', 'land'][i % 6], i + 2) + '</div>' +
          '<div class="guide-body">' +
            '<p class="guide-meta">' + u.escape(g.cat) + ' · ' + g.read + ' min read · ' + u.escape(g.date) + '</p>' +
            '<h3><a href="guide.html?slug=' + encodeURIComponent(g.slug) + '">' + u.escape(g.title) + '</a></h3>' +
            '<p>' + u.escape(g.excerpt) + '</p>' +
            '<a class="link-arrow" href="guide.html?slug=' + encodeURIComponent(g.slug) + '">Read the guide' +
              UP.icon('arrow', 16) + '<span class="sr-only"> ' + u.escape(g.title) + '</span></a>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  /* ---------- Single guide -------------------------------------------------- */

  function initGuide() {
    var root = document.getElementById('guideRoot');
    if (!root) return;

    var slug = u.param('slug');
    var g = UP.guides.filter(function (x) { return x.slug === slug; })[0];

    if (!g) {
      root.innerHTML = '<div class="wrap section"><div class="empty-state">' + UP.icon('empty', 44) +
        '<h3>That guide is not available</h3><p>It may have been renamed or retired.</p>' +
        '<a class="btn btn-primary" href="info-hub.html">Back to the info hub</a></div></div>';
      return;
    }

    document.title = g.title + ' — upbss';
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', g.excerpt);

    var headings = g.body.filter(function (b) { return b[0] === 'h2'; }).map(function (b) {
      return { id: u.slug(b[1]), text: b[1] };
    });

    var bodyHtml = g.body.map(function (block) {
      var tag = block[0], val = block[1];
      if (tag === 'h2') return '<h2 id="' + u.slug(val) + '">' + u.escape(val) + '</h2>';
      if (tag === 'ul') return '<ul>' + val.map(function (li) { return '<li>' + u.escape(li) + '</li>'; }).join('') + '</ul>';
      if (tag === 'quote') return '<blockquote>' + u.escape(val) + '</blockquote>';
      return '<p>' + u.escape(val) + '</p>';
    }).join('');

    var others = UP.guides.filter(function (x) { return x.slug !== g.slug; }).slice(0, 3);

    root.innerHTML = '' +
      '<header class="page-header">' +
        '<div class="blueprint"></div>' +
        '<div class="wrap">' +
          '<ol class="breadcrumb">' +
            '<li><a href="index.html">Home</a></li>' +
            '<li><a href="info-hub.html">Info hub</a></li>' +
            '<li aria-current="page">' + u.escape(g.cat) + '</li>' +
          '</ol>' +
          '<p class="eyebrow on-dark">' + u.escape(g.cat) + ' · ' + g.read + ' min read</p>' +
          '<h1>' + u.escape(g.title) + '</h1>' +
          '<p>' + u.escape(g.excerpt) + '</p>' +
        '</div>' +
      '</header>' +

      '<div class="wrap section">' +
        '<div class="doc-layout">' +
          '<nav class="toc" aria-label="On this page">' +
            '<h4>On this page</h4><ul>' +
            headings.map(function (h) { return '<li><a href="#' + h.id + '">' + u.escape(h.text) + '</a></li>'; }).join('') +
            '</ul>' +
            '<p class="guide-meta" style="margin-top:20px;">Published ' + u.escape(g.date) + '</p>' +
          '</nav>' +
          '<article class="prose">' + bodyHtml +
            '<hr>' +
            '<p><strong>Next step.</strong> If you are weighing up a sale, start with a free appraisal — ' +
            'it takes under a minute and there is no obligation.</p>' +
            '<p><a class="btn btn-primary" href="appraisal.html" style="text-decoration:none;">Get my free appraisal</a></p>' +
          '</article>' +
        '</div>' +
      '</div>' +

      '<section class="section section-alt">' +
        '<div class="wrap">' +
          '<div class="section-head"><p class="eyebrow">Keep reading</p>' +
          '<h2 style="font-size:var(--t-2xl);">More from the info hub</h2></div>' +
          '<div class="card-grid" style="margin-top:32px;">' +
            others.map(function (o) {
              return '<article class="guide-card"><div class="guide-body">' +
                '<p class="guide-meta">' + u.escape(o.cat) + ' · ' + o.read + ' min read</p>' +
                '<h3><a href="guide.html?slug=' + encodeURIComponent(o.slug) + '">' + u.escape(o.title) + '</a></h3>' +
                '<p>' + u.escape(o.excerpt) + '</p>' +
                '<a class="link-arrow" href="guide.html?slug=' + encodeURIComponent(o.slug) + '">Read the guide' +
                UP.icon('arrow', 16) + '</a></div></article>';
            }).join('') +
          '</div>' +
        '</div>' +
      '</section>';

    document.dispatchEvent(new CustomEvent('upbss:rebind'));
  }

  document.addEventListener('upbss:ready', function () {
    initFaq();
    initGuides();
    initGuide();
  });
})();
