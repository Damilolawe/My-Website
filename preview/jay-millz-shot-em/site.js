/* Jay Millz Shot Em - independent public portfolio concept.
   Deliberately no analytics, forms, private data or third-party JavaScript. */
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('#mobile-nav');
  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    menu.hidden = true;
  }
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    menu.hidden = open;
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', event => {
    if (!menu?.hidden && !menu.contains(event.target) && !toggle?.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  window.matchMedia('(min-width:901px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

  // Images are served from the photographer's own public scheduler.
  // Never show browser broken-image icons if an image is removed there.
  document.querySelectorAll('.image-panel img, .gallery img, .vision-visual img').forEach(img => {
    function markUnavailable() {
      const placeholder = document.createElement('div');
      placeholder.className = 'photo-fallback';
      const heading = document.createElement('strong');
      heading.textContent = 'JAY MILLZ';
      const subtitle = document.createElement('small');
      subtitle.textContent = 'VIEW PHOTOGRAPHY ON INSTAGRAM';
      placeholder.append(heading, subtitle);
      img.replaceWith(placeholder);
      const card = placeholder.closest('button.shot');
      if (card) card.dataset.unavailable = 'true';
    }
    img.addEventListener('error', markUnavailable, { once: true });
    if (img.complete && img.naturalWidth === 0) markUnavailable();
  });

  const filters = [...document.querySelectorAll('button[data-filter]')];
  const gallery = document.querySelector('.gallery');
  const shots = [...document.querySelectorAll('.gallery .shot')];
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const category = filter.dataset.filter;
      filters.forEach(button => {
        const active = button === filter;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      gallery?.classList.toggle('is-filtered', category !== 'all');
      shots.forEach(shot => { shot.hidden = category !== 'all' && shot.dataset.category !== category; });
    });
  });

  const lightbox = document.querySelector('#lightbox');
  const photo = document.querySelector('#lightbox-photo');
  const caption = document.querySelector('#lightbox-caption');
  const counter = document.querySelector('#lightbox-counter');
  let index = 0;
  let previousFocus = null;
  const available = () => shots.filter(shot => !shot.hidden && shot.dataset.unavailable !== 'true' && shot.querySelector('img'));
  function showPhoto(shot) {
    const img = shot.querySelector('img');
    if (!img || !photo || !caption || !counter) return;
    const options = available();
    index = Math.max(0, options.indexOf(shot));
    photo.src = img.currentSrc || img.src;
    photo.alt = img.alt;
    caption.textContent = shot.querySelector('.shot-meta span')?.textContent || 'JAY MILLZ SHOT EM';
    counter.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(options.length).padStart(2, '0');
  }
  shots.forEach(shot => shot.addEventListener('click', () => {
    if (shot.dataset.unavailable === 'true') {
      window.open('https://www.instagram.com/jaymillzshotem/', '_blank', 'noopener,noreferrer');
      return;
    }
    previousFocus = document.activeElement;
    showPhoto(shot);
    if (!lightbox?.open) lightbox?.showModal();
  }));
  function shift(delta) {
    const options = available();
    if (!options.length) return;
    const nextIndex = (index + delta + options.length) % options.length;
    showPhoto(options[nextIndex]);
  }
  document.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox?.close());
  document.querySelector('.lightbox-prev')?.addEventListener('click', () => shift(-1));
  document.querySelector('.lightbox-next')?.addEventListener('click', () => shift(1));
  lightbox?.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); shift(-1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); shift(1); }
  });
  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox?.addEventListener('close', () => {
    photo?.removeAttribute('src');
    previousFocus?.focus?.();
  });

  // Accessible scroll-reveal: content remains visible without JS or when
  // reduced-motion is enabled.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const elements = document.querySelectorAll('.section-head, .session-card, .vision-copy, .statement h2');
    elements.forEach(element => element.classList.add('reveal'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
      });
    }, { threshold: .07, rootMargin: '0px 0px 24px 0px' });
    elements.forEach(element => observer.observe(element));
  }
})();