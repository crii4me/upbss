/* ==========================================================================
   upbss — property listings
   Powers: featured grid (home), search results (buy.html), sold list (sold.html)
   ========================================================================== */

(function () {
  'use strict';

  var UP = window.UPBSS;
  var u = UP.util;

  /* ---------- Card markup ------------------------------------------------- */

  UP.propertyCard = function (p) {
    var specs = [];
    if (p.beds) specs.push(['bed', p.beds + (p.beds === 1 ? ' bed' : ' beds')]);
    if (p.baths) specs.push(['bath', p.baths + (p.baths === 1 ? ' bath' : ' baths')]);
    specs.push(['area', u.number(p.area) + ' m²']);
    if (p.year) specs.push(['calendar', p.year]);

    return '' +
      '<article class="property-card">' +
        '<div class="card-media">' +
          (p.images && p.images.length
            ? UP.propertyImage('properties/' + p.images[0], p.title + ', ' + p.location,
                { sizes: '(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 33vw' })
            : UP.propertyScene(p.scene, p.seed)) +
          '<span class="badge ' + u.statusClass(p.status) + '">' + u.statusLabel(p.status) + '</span>' +
          '<span class="ref">' + u.escape(p.ref) + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<p class="card-loc">' + UP.icon('pin', 13) + u.escape(p.location) + ' · ' + u.escape(p.type) + '</p>' +
          '<h3><a href="property.html?ref=' + encodeURIComponent(p.ref) + '">' + u.escape(p.title) + '</a></h3>' +
          '<p class="card-desc">' + u.escape(p.summary) + '</p>' +
          '<div class="spec-row">' +
            specs.map(function (s) { return '<span>' + UP.icon(s[0], 15) + s[1] + '</span>'; }).join('') +
          '</div>' +
          '<div class="card-foot">' +
            '<p class="price">' + u.money(p.price) + '<small>£' + Math.round(p.price / p.area).toLocaleString('en-GB') + ' / m²</small></p>' +
            '<a class="link-arrow" href="property.html?ref=' + encodeURIComponent(p.ref) + '">' +
              'View' + UP.icon('arrow', 16) + '<span class="sr-only"> ' + u.escape(p.title) + '</span></a>' +
          '</div>' +
        '</div>' +
      '</article>';
  };

  function renderInto(el, list) {
    el.innerHTML = list.map(UP.propertyCard).join('');
  }

  /* ---------- Featured grid (home) ---------------------------------------- */

  function initFeatured() {
    var grid = document.querySelector('[data-featured]');
    if (!grid) return;
    var limit = Number(grid.dataset.featured) || 6;
    var picks = UP.properties.filter(function (p) { return p.featured; });
    var fill = UP.properties.filter(function (p) { return !p.featured && p.status === 'available'; });
    renderInto(grid, picks.concat(fill).slice(0, limit));
  }

  /* ---------- Search results (buy.html) ----------------------------------- */

  function initSearch() {
    var root = document.querySelector('[data-listings]');
    if (!root) return;

    var grid = document.getElementById('resultsGrid');
    var empty = document.getElementById('resultsEmpty');
    var count = document.getElementById('resultsCount');
    var tags = document.getElementById('activeFilters');
    var pager = document.getElementById('pagination');
    var form = document.getElementById('filterForm');
    var sortSel = document.getElementById('sortBy');
    var reset = document.getElementById('resetFilters');

    var page = 1;
    var perPage = UP.config.perPage;

    /* Populate the selects from data so the options can never drift. */
    fillSelect('fCategory', Object.keys(UP.categories), 'All property');
    fillSelect('fLocation', UP.locations.slice().sort(), 'Any location');

    function fillSelect(id, values, anyLabel) {
      var sel = document.getElementById(id);
      if (!sel) return;
      sel.innerHTML = '<option value="">' + anyLabel + '</option>' +
        values.map(function (v) { return '<option value="' + u.escape(v) + '">' + u.escape(v) + '</option>'; }).join('');
    }

    /* The type list depends on the category: a residential search offers flats
       and houses, a commercial one offers businesses and land. With no
       category chosen there is nothing sensible to offer, so the whole field
       is hidden rather than shown listing types from both worlds at once. */
    var typeField = document.getElementById('typeField');
    function syncTypes(keep) {
      var cat = form.elements.category.value;
      var sel = form.elements.type;
      if (!cat) {
        if (typeField) typeField.hidden = true;
        sel.innerHTML = '<option value="">Any type</option>';
        sel.value = '';
        return;
      }
      var wanted = keep && (UP.categories[cat] || []).indexOf(keep) > -1 ? keep : '';
      fillSelect('fType', UP.categories[cat] || [], 'Any ' + cat.toLowerCase() + ' type');
      sel.value = wanted;
      if (typeField) typeField.hidden = false;
    }

    /* Which category a type belongs to. Lets a link carry just ?type=Flat and
       still work — the homepage shortcuts do exactly that. */
    function categoryOf(type) {
      var found = '';
      Object.keys(UP.categories).forEach(function (cat) {
        if (UP.categories[cat].indexOf(type) > -1) found = cat;
      });
      return found;
    }

    function readURL() {
      var q = new URLSearchParams(window.location.search);
      /* Category first: the type options do not exist until it is set. A link
         giving only a type has its category inferred, so old-style shortcuts
         keep working instead of silently returning everything. */
      var cat = q.get('category') || categoryOf(q.get('type') || '');
      if (cat) form.elements.category.value = cat;
      syncTypes(q.get('type') || '');
      ['location', 'min', 'max', 'beds'].forEach(function (k) {
        var el = form.elements[k];
        if (el && q.get(k)) el.value = q.get(k);
      });
      if (q.get('sort') && sortSel) sortSel.value = q.get('sort');
      page = Math.max(1, Number(q.get('page') || 1));
    }

    function state() {
      return {
        category: form.elements.category.value,
        type: form.elements.type.value,
        location: form.elements.location.value,
        min: form.elements.min.value,
        max: form.elements.max.value,
        beds: form.elements.beds.value,
        sort: sortSel ? sortSel.value : 'newest'
      };
    }

    function writeURL(s) {
      var q = new URLSearchParams();
      Object.keys(s).forEach(function (k) { if (s[k] && s[k] !== 'newest') q.set(k, s[k]); });
      if (page > 1) q.set('page', page);
      var qs = q.toString();
      history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);
    }

    function filter(s) {
      return UP.properties.filter(function (p) {
        if (p.status === 'sold') return false;
        if (s.category && p.category !== s.category) return false;
        if (s.type && p.type !== s.type) return false;
        if (s.location && p.location !== s.location) return false;
        if (s.min && p.price < Number(s.min)) return false;
        if (s.max && p.price > Number(s.max)) return false;
        if (s.beds && p.beds < Number(s.beds)) return false;
        return true;
      });
    }

    var SORTS = {
      newest: function (a, b) { return b.ref.localeCompare(a.ref); },
      'price-asc': function (a, b) { return a.price - b.price; },
      'price-desc': function (a, b) { return b.price - a.price; },
      'area-desc': function (a, b) { return b.area - a.area; },
      'beds-desc': function (a, b) { return b.beds - a.beds; }
    };

    function renderTags(s) {
      var labels = {
        category: 'Category', type: 'Type', location: 'Location',
        min: 'From', max: 'Up to', beds: 'Min beds'
      };
      var parts = Object.keys(labels).filter(function (k) { return s[k]; }).map(function (k) {
        var val = (k === 'min' || k === 'max') ? u.money(Number(s[k])) : s[k];
        return '<span class="filter-tag">' + labels[k] + ': ' + u.escape(String(val)) +
          '<button type="button" data-clear="' + k + '" aria-label="Remove ' + labels[k] + ' filter">' +
          UP.icon('close', 11) + '</button></span>';
      });
      tags.innerHTML = parts.join('');
      reset.hidden = parts.length === 0;
    }

    function renderPager(total) {
      var pages = Math.ceil(total / perPage);
      if (pages <= 1) { pager.innerHTML = ''; return; }
      var html = '<button type="button" data-page="' + (page - 1) + '"' + (page === 1 ? ' disabled' : '') +
        ' aria-label="Previous page">' + UP.icon('chevronLeft', 16) + '</button>';
      var shown = [];
      for (var i = 1; i <= pages; i++) {
        if (i === 1 || i === pages || Math.abs(i - page) <= 1) shown.push(i);
        else if (shown[shown.length - 1] !== '…') shown.push('…');
      }
      shown.forEach(function (i) {
        html += i === '…'
          ? '<span class="ellipsis">…</span>'
          : '<button type="button" data-page="' + i + '"' + (i === page ? ' aria-current="page"' : '') + '>' + i + '</button>';
      });
      html += '<button type="button" data-page="' + (page + 1) + '"' + (page === pages ? ' disabled' : '') +
        ' aria-label="Next page">' + UP.icon('chevronRight', 16) + '</button>';
      pager.innerHTML = html;
    }

    function render(scroll) {
      var s = state();
      var list = filter(s).sort(SORTS[s.sort] || SORTS.newest);
      var pages = Math.max(1, Math.ceil(list.length / perPage));
      if (page > pages) page = pages;

      writeURL(s);
      renderTags(s);

      count.innerHTML = list.length
        ? '<strong>' + list.length + '</strong> ' + (list.length === 1 ? 'property' : 'properties') +
          ' · page <strong>' + page + '</strong> of <strong>' + pages + '</strong>'
        : '<strong>0</strong> properties';

      if (!list.length) {
        grid.innerHTML = '';
        empty.hidden = false;
        pager.innerHTML = '';
        return;
      }
      empty.hidden = true;
      renderInto(grid, list.slice((page - 1) * perPage, page * perPage));
      renderPager(list.length);

      if (scroll) {
        var y = root.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }

    form.addEventListener('submit', function (e) { e.preventDefault(); page = 1; render(true); });
    form.addEventListener('change', function () { page = 1; render(false); });
    /* Rebuilds the type list when the category changes. This runs before the
       form-level handler above regardless of registration order: the event
       fires on the select itself first, and only then bubbles to the form. */
    form.elements.category.addEventListener('change', function () { syncTypes(''); });
    if (sortSel) sortSel.addEventListener('change', function () { page = 1; render(false); });

    tags.addEventListener('click', function (e) {
      var b = e.target.closest('[data-clear]');
      if (!b) return;
      form.elements[b.dataset.clear].value = '';
      /* Clearing the category leaves any chosen type orphaned. */
      if (b.dataset.clear === 'category') syncTypes('');
      page = 1;
      render(false);
    });

    reset.addEventListener('click', function () {
      form.reset();
      /* form.reset() restores the select's original options, which for the
         type field were built at runtime — so rebuild and hide it again. */
      syncTypes('');
      if (sortSel) sortSel.value = 'newest';
      page = 1;
      render(false);
    });

    pager.addEventListener('click', function (e) {
      var b = e.target.closest('[data-page]');
      if (!b || b.disabled) return;
      page = Number(b.dataset.page);
      render(true);
    });

    readURL();
    render(false);
  }

  /* ---------- Sold list ---------------------------------------------------- */

  function initSold() {
    var grid = document.querySelector('[data-sold]');
    if (!grid) return;
    var filterSel = document.getElementById('soldType');
    if (filterSel) {
      filterSel.innerHTML = '<option value="">All property types</option>' +
        UP.propertyTypes.map(function (t) { return '<option>' + t + '</option>'; }).join('');
      filterSel.addEventListener('change', draw);
    }

    function draw() {
      var type = filterSel ? filterSel.value : '';
      var list = UP.sold.filter(function (s) { return !type || s.type === type; });
      grid.innerHTML = list.length ? list.map(function (s) {
        return '' +
          '<article class="sold-card">' +
            '<span class="badge badge-sold">Sold ' + s.year + '</span>' +
            '<h3>' + u.escape(s.title) + '</h3>' +
            '<p class="card-loc">' + UP.icon('pin', 13) + u.escape(s.location) + ' · ' + u.escape(s.type) + '</p>' +
            '<div class="sold-meta">' +
              '<span>Sold for<br><strong>' + u.money(s.price) + '</strong></span>' +
              '<span>Time to offer<br><strong>' + s.weeks + ' weeks</strong></span>' +
            '</div>' +
          '</article>';
      }).join('') : '<div class="empty-state">' + UP.icon('empty', 44) +
        '<h3>Nothing in that category yet</h3><p>Try another property type.</p></div>';
    }
    draw();
  }

  document.addEventListener('upbss:ready', function () {
    initFeatured();
    initSearch();
    initSold();
  });
})();
