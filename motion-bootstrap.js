// Mobile already uses CSS motion. Avoid initializing desktop-only animation
// engines there; keep the same interactive UI scripts on every device.
(async () => {
  const load = (src) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
  const compact = matchMedia('(max-width: 900px), (pointer: coarse)');
  let engines;
  const loadEngines = () => engines || (engines = (async () => {
    try {
      await load('/vendor/gsap.min.js');
      await load('/vendor/ScrollTrigger.min.js');
      document.dispatchEvent(new CustomEvent('awe:vendors-ready'));
    } catch { engines = null; /* Essential UI and CSS motion remain available. */ }
  })());
  if (!compact.matches) await loadEngines();
  compact.addEventListener('change', () => { if (!compact.matches) loadEngines(); });
  for (const src of ['/script.js', '/cinema.js', '/awe-relaunch.js']) {
    try { await load(src); }
    catch { console.error('A studio interaction could not load. Please reload the page.'); }
  }
})();
