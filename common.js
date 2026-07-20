/* === ECO MT - Common Scripts === */
(function() {
  // Navbar scroll effect
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // Fade-in on scroll
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(function(el) { observer.observe(el); });

  // Hamburger mobile drawer
  var hamburger = document.getElementById('hamburgerBtn');
  var drawer = document.getElementById('mobileDrawer');
  if (hamburger && drawer) {
    function setDrawer(open) {
      drawer.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
      var icon = hamburger.querySelector('i');
      if (icon) icon.className = open ? 'fas fa-times' : 'fas fa-bars';
    }
    hamburger.addEventListener('click', function() {
      setDrawer(!drawer.classList.contains('open'));
    });
    // Close on link tap, on Escape, or on a click outside the drawer/hamburger.
    drawer.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() { setDrawer(false); });
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) setDrawer(false);
    });
    // Close when resizing up to desktop (where the drawer is hidden by CSS).
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 1024 && drawer.classList.contains('open')) setDrawer(false);
    });
  }

  // Nav underline indicator (desktop)
  var navList = document.getElementById('navList');
  var navInd = document.getElementById('navIndicator');
  if (navList && navInd) {
    var activeItem = navList.querySelector('.nav-item.active');
    function moveIndicator(el) {
      var rect = el.getBoundingClientRect();
      var navRect = navList.getBoundingClientRect();
      navInd.style.left = (rect.left - navRect.left) + 'px';
      navInd.style.width = rect.width + 'px';
      navInd.style.opacity = '1';
    }
    if (activeItem) moveIndicator(activeItem);
    navList.querySelectorAll('.nav-item').forEach(function(item) {
      item.addEventListener('mouseenter', function() { moveIndicator(this); });
    });
    navList.addEventListener('mouseleave', function() {
      if (activeItem) moveIndicator(activeItem);
      else navInd.style.opacity = '0';
    });
  }

  // Category filter (tin-tuc page)
  var filterButtons = document.querySelectorAll('[data-filter]');
  var filterArticles = document.querySelectorAll('[data-category]');
  if (filterButtons.length && filterArticles.length) {
    var noResults = document.getElementById('noResults');
    function setActive(btn) {
      filterButtons.forEach(function(b) {
        b.classList.remove('bg-green-600', 'text-white');
        b.classList.add('bg-white', 'text-gray-600', 'border', 'border-gray-100');
      });
      btn.classList.add('bg-green-600', 'text-white');
      btn.classList.remove('bg-white', 'text-gray-600', 'border', 'border-gray-100');
    }
    function applyFilter(filter, btn) {
      if (btn) setActive(btn);
      var visible = 0;
      filterArticles.forEach(function(art) {
        var show = (filter === 'all' || art.getAttribute('data-category') === filter);
        art.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (noResults) noResults.style.display = visible === 0 ? '' : 'none';
    }
    filterButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        applyFilter(btn.getAttribute('data-filter'), btn);
      });
    });
  }

  // Back to top
  var btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        btt.classList.remove('opacity-0', 'invisible');
        btt.classList.add('opacity-100', 'visible');
      } else {
        btt.classList.add('opacity-0', 'invisible');
        btt.classList.remove('opacity-100', 'visible');
      }
    });
    btt.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();

