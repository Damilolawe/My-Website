// Wolf Forest Cafe: rail navigation toggle + canopy reveal.
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var button = document.querySelector('[data-menu]');
  var nav = document.querySelector('[data-nav]');
  function setOpen(open) {
    if (!nav || !button) return;
    nav.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('menu-open', open);
  }
  if (button && nav) {
    button.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); button.focus(); }
    });
  }
  var nodes = [].slice.call(document.querySelectorAll('[data-reveal]'));
  if (navigator.webdriver || !('IntersectionObserver' in window)) {
    nodes.forEach(function (n) { n.classList.add('seen'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('seen'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  nodes.forEach(function (n) {
    var r = n.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) n.classList.add('seen'); else io.observe(n);
  });
})();
