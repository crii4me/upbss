/* ==========================================================================
   upbss — single property view (property.html?ref=UP2291)
   ========================================================================== */

(function () {
  'use strict';

  var UP = window.UPBSS;
  var u = UP.util;

  function notFound(root) {
    root.innerHTML = '' +
      '<div class="wrap section">' +
        '<div class="empty-state">' + UP.icon('empty', 44) +
          '<h3>We could not find that property</h3>' +
          '<p>It may have been sold or withdrawn. Browse everything currently available instead.</p>' +
          '<a class="btn btn-primary" href="buy.html">Browse all properties</a>' +
        '</div>' +
      '</div>';
  }

  function scenesFor(p) {
    /* Three views so the gallery has depth. Photographs where the listing has
       them, generated artwork for any slot that does not — so a part-
       photographed listing still fills the layout rather than showing gaps. */
    var alt = { house: 'terrace', tower: 'loft', loft: 'tower', shop: 'terrace', terrace: 'tower', land: 'house' };
    var fallback = [
      UP.propertyScene(p.scene, p.seed),
      UP.propertyScene(alt[p.scene] || 'tower', p.seed + 4),
      UP.propertyScene(p.scene, p.seed + 9)
    ];
    if (!p.images || !p.images.length) return fallback;

    return [0, 1, 2].map(function (i) {
      if (!p.images[i]) return fallback[i];
      return UP.propertyImage('properties/' + p.images[i],
        i === 0 ? p.title + ', ' + p.location : p.title + ', view ' + (i + 1),
        {
          sizes: i === 0 ? '(max-width: 860px) 100vw, 60vw' : '(max-width: 860px) 50vw, 22vw',
          eager: i === 0
        });
    });
  }

  function render(p, root) {
    var art = scenesFor(p);
    var perM2 = Math.round(p.price / p.area);

    var specRows = [
      ['Reference', p.ref],
      ['Property type', p.type],
      ['Location', p.location + ', ' + p.region],
      ['Internal area', u.number(p.area) + ' m²'],
      ['Bedrooms', p.beds || '—'],
      ['Bathrooms', p.baths || '—'],
      ['Year built', p.year || '—'],
      ['Energy rating', p.epc],
      ['Tenure', p.tenure],
      ['Price per m²', u.money(perM2)]
    ];

    document.title = p.title + ' · ' + p.location + ' — upbss';
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', p.summary);

    root.innerHTML = '' +
      '<header class="page-header">' +
        '<div class="blueprint"></div>' +
        '<div class="wrap">' +
          '<ol class="breadcrumb">' +
            '<li><a href="index.html">Home</a></li>' +
            '<li><a href="buy.html">Buy a property</a></li>' +
            '<li><a href="buy.html?location=' + encodeURIComponent(p.location) + '">' + u.escape(p.location) + '</a></li>' +
            '<li aria-current="page">' + u.escape(p.ref) + '</li>' +
          '</ol>' +
          '<p class="eyebrow on-dark">' + u.escape(p.type) + ' · ' + u.statusLabel(p.status) + '</p>' +
          '<h1>' + u.escape(p.title) + '</h1>' +
          '<p style="display:flex;align-items:center;gap:8px;">' + UP.icon('pin', 16) +
            '<span>' + u.escape(p.location) + ', ' + u.escape(p.region) + '</span></p>' +
        '</div>' +
      '</header>' +

      '<div class="wrap section">' +
        '<div class="detail-hero">' +
          '<div class="detail-main-media">' + art[0] +
            '<span class="badge ' + u.statusClass(p.status) + '" style="position:absolute;top:16px;left:16px;">' +
              u.statusLabel(p.status) + '</span>' +
          '</div>' +
          '<div class="detail-thumbs">' +
            '<div class="detail-thumb">' + art[1] + '</div>' +
            '<div class="detail-thumb">' + art[2] + '</div>' +
          '</div>' +
        '</div>' +

        '<div class="detail-layout">' +
          '<div class="stack-lg">' +
            '<section>' +
              '<h2>About this property</h2>' +
              '<p class="lead" style="margin-top:16px;">' + u.escape(p.summary) + '</p>' +
              '<p class="muted" style="margin-top:16px;max-width:70ch;">' +
                'Viewings are arranged directly with your named consultant. Ask us for the Home Report — ' +
                'Single Survey, Energy Report and Property Questionnaire — before you make an offer.' +
              '</p>' +
            '</section>' +

            '<section>' +
              '<h2 style="font-size:var(--t-xl);">Key features</h2>' +
              '<ul class="tick-list" style="margin-top:20px;">' +
                p.features.map(function (f) {
                  return '<li>' + UP.icon('check', 18) + '<span>' + u.escape(f) + '</span></li>';
                }).join('') +
              '</ul>' +
            '</section>' +

            '<section>' +
              '<h2 style="font-size:var(--t-xl);">Specification</h2>' +
              '<table class="spec-table" style="margin-top:20px;">' +
                '<caption class="sr-only">Specification for ' + u.escape(p.ref) + '</caption><tbody>' +
                specRows.map(function (r) {
                  return '<tr><th scope="row">' + r[0] + '</th><td>' + u.escape(String(r[1])) + '</td></tr>';
                }).join('') +
              '</tbody></table>' +
            '</section>' +
          '</div>' +

          '<aside class="detail-aside">' +
            '<div class="panel on-panel" style="padding:28px;">' +
              '<p class="eyebrow on-dark">Guide price</p>' +
              '<p class="price" style="font-size:2.1rem;margin:10px 0 4px;color:var(--panel-text);">' +
                u.money(p.price) + '</p>' +
              '<p style="font-family:var(--font-mono);font-size:var(--t-xs);color:var(--panel-muted);">' +
                u.money(perM2) + ' per m² · ref ' + u.escape(p.ref) + '</p>' +
              '<form data-validate id="viewingForm" style="display:grid;gap:16px;margin-top:24px;" ' +
                'data-success-message="Thank you — we have your viewing request for ' + u.escape(p.ref) +
                '. Your consultant will confirm a time within one working day.">' +
                '<input type="hidden" name="ref" value="' + u.escape(p.ref) + '">' +
                '<div class="field"><label class="field-label" for="vName">Your name<span class="req">*</span></label>' +
                  '<input class="input" id="vName" name="name" type="text" autocomplete="name" required data-label="Your name">' +
                  '<p class="field-error"></p></div>' +
                '<div class="field"><label class="field-label" for="vEmail">Email<span class="req">*</span></label>' +
                  '<input class="input" id="vEmail" name="email" type="email" autocomplete="email" required data-label="Email">' +
                  '<p class="field-error"></p></div>' +
                '<div class="field"><label class="field-label" for="vPhone">Phone</label>' +
                  '<input class="input" id="vPhone" name="phone" type="tel" autocomplete="tel" placeholder="0131 …">' +
                  '<p class="field-error"></p></div>' +
                '<div class="field"><label class="field-label" for="vMsg">Message</label>' +
                  '<textarea class="input" id="vMsg" name="message" rows="3" ' +
                    'placeholder="I would like to view this property…" style="min-height:90px;"></textarea>' +
                  '<p class="field-error"></p></div>' +
                '<p class="form-status" tabindex="-1"></p>' +
                '<button type="submit" class="btn btn-primary btn-block">Request a viewing</button>' +
                '<p class="form-note">Or call ' + UP.config.phone + ' quoting ' + u.escape(p.ref) + '.</p>' +
              '</form>' +
            '</div>' +
            '<div class="surface-card">' +
              '<h3 style="font-size:var(--t-base);font-family:var(--font-body);">Thinking of selling something similar?</h3>' +
              '<p class="muted" style="font-size:var(--t-sm);margin:10px 0 16px;">' +
                'Get a free, no-obligation appraisal for your own property in under a minute.</p>' +
              '<a class="btn btn-outline btn-sm" href="appraisal.html">Free appraisal</a>' +
            '</div>' +
          '</aside>' +
        '</div>' +
      '</div>' +

      '<section class="section section-alt" id="similar">' +
        '<div class="wrap">' +
          '<div class="section-head"><p class="eyebrow">Similar properties</p>' +
            '<h2 style="font-size:var(--t-2xl);">Others you may want to see</h2></div>' +
          '<div class="card-grid" id="similarGrid" style="margin-top:32px;"></div>' +
        '</div>' +
      '</section>';

    /* Similar: same type first, then same location, excluding this one. */
    var pool = UP.properties.filter(function (o) { return o.ref !== p.ref && o.status !== 'sold'; });
    var similar = pool
      .map(function (o) {
        var score = (o.type === p.type ? 2 : 0) + (o.location === p.location ? 2 : 0) +
          (Math.abs(o.price - p.price) < p.price * 0.25 ? 1 : 0);
        return { o: o, score: score };
      })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, 3)
      .map(function (x) { return x.o; });

    document.getElementById('similarGrid').innerHTML = similar.map(UP.propertyCard).join('');

    UP.hydrateIcons(root);
    document.dispatchEvent(new CustomEvent('upbss:rebind'));
  }

  document.addEventListener('upbss:ready', function () {
    var root = document.getElementById('propertyRoot');
    if (!root) return;
    var ref = u.param('ref');
    var p = UP.properties.filter(function (x) { return x.ref === ref; })[0];
    if (!p) return notFound(root);
    render(p, root);
  });
})();
