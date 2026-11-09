const links = [...document.querySelectorAll('a[href^="#"]')];
links.forEach((link) => link.addEventListener("click", () => document.body.classList.remove("nav-open")));

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && !navigator.webdriver) {
  const elements = document.querySelectorAll(".story > *, .atmosphere-copy > *, .details > *, .visit > *, .mcol > *, .vcol > *");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.animate(
        [{ opacity: 0, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 620, easing: "cubic-bezier(.22,.61,.36,1)", fill: "both" }
      );
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px 100px", threshold: 0 });
  elements.forEach((element) => observer.observe(element));
}
