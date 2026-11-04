const nav = document.querySelector('[data-nav]');
document.querySelector('[data-menu]')?.addEventListener('click', () => {
  const open = nav?.classList.toggle('open');
  document.querySelector('[data-menu]')?.setAttribute('aria-expanded', String(Boolean(open)));
});
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('seen');
}), { threshold: .14 });
document.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node));

