const nav = document.querySelector('[data-nav]');
document.querySelector('[data-menu]')?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open');
  document.querySelector('[data-menu]')?.setAttribute('aria-expanded', String(Boolean(open)));
});
const revealNodes = [...document.querySelectorAll('[data-reveal]')];
if (navigator.webdriver) {
  revealNodes.forEach(node => node.classList.add('seen'));
} else {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('seen');
  }), { threshold: .14 });
  revealNodes.forEach(node => observer.observe(node));
}

