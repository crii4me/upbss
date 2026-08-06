(function(){
  // Mobile menu toggle
  var header = document.getElementById('siteHeader');
  var burger = document.getElementById('burgerBtn');
  burger.addEventListener('click', function(){
    var isOpen = header.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  document.querySelectorAll('.mobile-menu a').forEach(function(a){
    a.addEventListener('click', function(){ header.classList.remove('open'); });
  });

  // Testimonials carousel
  var testimonials = [
    {quote:"Excellent from start to finish. Our sales consultant kept us updated at every stage and found a buyer within three weeks.", author:"Marta & Jonas Weber", role:"Sellers, Linz"},
    {quote:"We viewed five apartments in a single afternoon thanks to the search tools. The whole process felt refreshingly direct.", author:"Daniel Prohaska", role:"Buyer, Wels"},
    {quote:"No pressure, no hidden fees, and a valuation that turned out to be spot on. Couldn't have asked for a smoother sale.", author:"Sofia Bauer", role:"Seller, Steyr"}
  ];
  var carIndex = 0;
  var quoteEl = document.getElementById('carQuote');
  var authorEl = document.getElementById('carAuthor');
  var dotsWrap = document.getElementById('carDots');

  function renderCarousel(){
    var t = testimonials[carIndex];
    quoteEl.textContent = '"' + t.quote + '"';
    authorEl.innerHTML = t.author + ' <span>— ' + t.role + '</span>';
    Array.from(dotsWrap.children).forEach(function(d, i){
      d.classList.toggle('active', i === carIndex);
    });
  }
  testimonials.forEach(function(_, i){
    var b = document.createElement('button');
    b.setAttribute('aria-label', 'Go to testimonial ' + (i+1));
    b.addEventListener('click', function(){ carIndex = i; renderCarousel(); });
    dotsWrap.appendChild(b);
  });
  document.getElementById('carPrev').addEventListener('click', function(){
    carIndex = (carIndex - 1 + testimonials.length) % testimonials.length;
    renderCarousel();
  });
  document.getElementById('carNext').addEventListener('click', function(){
    carIndex = (carIndex + 1) % testimonials.length;
    renderCarousel();
  });
  renderCarousel();
  setInterval(function(){
    carIndex = (carIndex + 1) % testimonials.length;
    renderCarousel();
  }, 7000);

  // Property listings (demo data — swap for a live MS SQL / PHP endpoint)
  var properties = [
    {type:'Apartment', location:'Linz, Urfahr', title:'Riverside Two-Bed Apartment', price:'€ 289,000', beds:2, baths:1, sqm:78, ref:'2291'},
    {type:'House', location:'Wels, Pernau', title:'Detached Family House with Garden', price:'€ 465,000', beds:4, baths:2, sqm:162, ref:'2287'},
    {type:'Studio', location:'Linz, Innenstadt', title:'City-Centre Studio, Renovated', price:'€ 159,000', beds:1, baths:1, sqm:34, ref:'2299'},
    {type:'Commercial', location:'Steyr, Industrial Park', title:'Ground-Floor Retail Unit', price:'€ 3,200 / mo', beds:0, baths:1, sqm:210, ref:'2276'},
    {type:'Apartment', location:'Wels, Zentrum', title:'Bright Three-Bed near Old Town', price:'€ 312,500', beds:3, baths:2, sqm:95, ref:'2303'},
    {type:'House', location:'Linz, Ebelsberg', title:'Semi-Detached House, South-Facing', price:'€ 398,000', beds:3, baths:2, sqm:130, ref:'2280'}
  ];

  var grid = document.getElementById('listingGrid');
  var emptyState = document.getElementById('emptyState');

  function propCardSVG(seed){
    var colors = ['#DCD2B8','#E29B3E','#12233B'];
    return '<svg viewBox="0 0 200 100" preserveAspectRatio="none">' +
      '<polyline points="20,80 20,45 100,20 180,45 180,80" fill="none" stroke="#12233B" stroke-opacity="0.28" stroke-width="2"/>' +
      '<line x1="20" y1="80" x2="180" y2="80" stroke="#E29B3E" stroke-opacity="0.6" stroke-width="2"/>' +
      '</svg>';
  }

  function renderListings(list){
    grid.innerHTML = '';
    if(list.length === 0){
      emptyState.style.display = 'block';
      return;
    }
    emptyState.style.display = 'none';
    list.forEach(function(p){
      var card = document.createElement('article');
      card.className = 'card';
      card.innerHTML =
        '<div class="card-media">' + propCardSVG() + '<span class="badge">' + p.type + '</span></div>' +
        '<div class="card-body">' +
          '<div class="loc">' + p.location + ' · REF ' + p.ref + '</div>' +
          '<h3>' + p.title + '</h3>' +
          '<div class="stat-row">' +
            (p.beds ? '<span>' + p.beds + ' bed</span>' : '') +
            '<span>' + p.baths + ' bath</span>' +
            '<span>' + p.sqm + ' m²</span>' +
          '</div>' +
          '<div class="card-foot"><span class="price">' + p.price + '</span><a href="#enquiry">Enquire →</a></div>' +
        '</div>';
      grid.appendChild(card);
    });
  }

  function applyFilters(){
    var type = document.getElementById('filterType').value;
    var loc = document.getElementById('filterLoc').value.trim().toLowerCase();
    var filtered = properties.filter(function(p){
      var matchesType = !type || p.type === type;
      var matchesLoc = !loc || p.location.toLowerCase().indexOf(loc) !== -1;
      return matchesType && matchesLoc;
    });
    renderListings(filtered);
  }

  document.getElementById('filterType').addEventListener('change', applyFilters);
  document.getElementById('filterLoc').addEventListener('input', applyFilters);
  renderListings(properties);

  // Hero search feeds into the listings filter + scrolls down
  document.getElementById('searchBtn').addEventListener('click', function(){
    var type = document.getElementById('propType').value;
    var loc = document.getElementById('propLoc').value;
    document.getElementById('filterType').value = type;
    document.getElementById('filterLoc').value = loc;
    applyFilters();
    document.getElementById('listings').scrollIntoView({behavior:'smooth'});
  });

  // FAQ accordion
  var faqs = [
    {q:'What does it cost?', a:'Appraisals are free with no obligation. Selling fees are agreed up front before any listing goes live — no hidden percentages.'},
    {q:'How long does it take?', a:'Most listings receive their first enquiry within a week. Full sale timelines vary by property type and local demand, but we keep you updated at every stage.'},
    {q:'Where do you list my property?', a:'Every listing appears on upbss.com and is syndicated to partner property portals, so it reaches both direct buyers and portal traffic.'},
    {q:'Do you help arrange buyer finance?', a:'Yes — we can put buyers in touch with independent mortgage advisers as part of the enquiry process.'}
  ];
  var faqList = document.getElementById('faqList');
  faqs.forEach(function(f){
    var item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML =
      '<button class="faq-q"><span>' + f.q + '</span><span class="chev">⌄</span></button>' +
      '<div class="faq-a"><p>' + f.a + '</p></div>';
    var btn = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');
    btn.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function(el){
        el.classList.remove('open');
        el.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
    faqList.appendChild(item);
  });

  // Enquiry form (front-end demo submission)
  var form = document.getElementById('enquiryForm');
  var formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }
    formMsg.classList.add('show');
    form.reset();
  });
})();
