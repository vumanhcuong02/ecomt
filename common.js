/* === Taxi ECO MT - Common Scripts === */
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
})();

function toggleMenu() {
  var menu = document.getElementById('mobile-menu');
  var icon = document.getElementById('menu-icon');
  if (menu) menu.classList.toggle('open');
  if (icon) {
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  }
}
