// Shared behaviour + animation engine for prospect previews without their own site.js.
// Progressive enhancement only: every feature is optional and guarded, and motion
// is skipped under automation (navigator.webdriver) and prefers-reduced-motion so
// content always renders. CSP-safe: no inline scripts, no external deps.
(function () {
  "use strict";
  var reduce = false;
  try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  var still = !!navigator.webdriver || reduce; // show final state, no motion

  /* ---- Mobile nav toggle ---- */
  try {
    var menuButton = document.querySelector("[data-menu]");
    var nav = document.querySelector("[data-nav]") ||
      (menuButton && menuButton.closest("header") && menuButton.closest("header").querySelector("nav")) ||
      document.querySelector("header nav");
    if (menuButton && nav) {
      if (!nav.id) nav.id = "site-menu";
      menuButton.setAttribute("aria-controls", nav.id);
      menuButton.setAttribute("aria-expanded", "false");
      var setOpen = function (open) {
        nav.classList.toggle("open", open);
        menuButton.setAttribute("aria-expanded", String(open));
        document.documentElement.classList.toggle("nav-open", open);
      };
      menuButton.addEventListener("click", function () { setOpen(!nav.classList.contains("open")); });
      nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
    }
  } catch (e) {}

  /* ---- Scroll reveal (staggered) ---- */
  try {
    var revealNodes = [].slice.call(document.querySelectorAll("[data-reveal]"));
    // auto-stagger direct children of [data-reveal-group]
    [].slice.call(document.querySelectorAll("[data-reveal-group]")).forEach(function (group) {
      [].slice.call(group.children).forEach(function (child, i) {
        child.setAttribute("data-reveal", "");
        child.style.transitionDelay = (i * 0.08) + "s";
        revealNodes.push(child);
      });
    });
    if (still || !("IntersectionObserver" in window)) {
      revealNodes.forEach(function (n) { n.classList.add("seen"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("seen"); io.unobserve(en.target); }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
      revealNodes.forEach(function (n) { io.observe(n); });
    }
  } catch (e) {}

  /* ---- Header scroll state ---- */
  try {
    var header = document.querySelector("[data-header]") || document.querySelector("header");
    if (header) {
      var onScroll = function () { header.classList.toggle("is-scrolled", window.pageYOffset > 24); };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  } catch (e) {}

  /* ---- Active nav link by section in view ---- */
  try {
    var navLinks = [].slice.call(document.querySelectorAll("[data-nav] a[href^='#']"));
    var sections = navLinks.map(function (a) {
      var id = a.getAttribute("href").slice(1);
      return id ? document.getElementById(id) : null;
    });
    if (navLinks.length && "IntersectionObserver" in window) {
      var navIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var i = sections.indexOf(en.target);
          navLinks.forEach(function (a, j) { a.classList.toggle("active", i === j); });
        });
      }, { threshold: 0.2, rootMargin: "-40% 0px -55% 0px" });
      sections.forEach(function (s) { if (s) navIo.observe(s); });
    }
  } catch (e) {}

  /* ---- Count-up stats: <span data-count="48"> ---- */
  try {
    var counters = [].slice.call(document.querySelectorAll("[data-count]"));
    var runCount = function (el) {
      var target = parseFloat(el.getAttribute("data-count")) || 0;
      if (still) { el.textContent = String(target); return; }
      var dur = 1100, start = null;
      var step = function (ts) {
        if (start === null) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (counters.length) {
      if (still || !("IntersectionObserver" in window)) { counters.forEach(runCount); }
      else {
        var cIo = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { if (en.isIntersecting) { runCount(en.target); cIo.unobserve(en.target); } });
        }, { threshold: 0.6 });
        counters.forEach(function (c) { cIo.observe(c); });
      }
    }
  } catch (e) {}

  /* ---- Hero parallax: [data-parallax] (subtle, rAF-throttled) ---- */
  try {
    var pxNodes = [].slice.call(document.querySelectorAll("[data-parallax]"));
    if (pxNodes.length && !still) {
      var ticking = false;
      var apply = function () {
        pxNodes.forEach(function (el) {
          var speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
          var r = el.getBoundingClientRect();
          var off = (r.top + r.height / 2 - window.innerHeight / 2) * -speed;
          el.style.transform = "translate3d(0," + off.toFixed(1) + "px,0)";
        });
        ticking = false;
      };
      var req = function () { if (!ticking) { ticking = true; requestAnimationFrame(apply); } };
      apply();
      window.addEventListener("scroll", req, { passive: true });
      window.addEventListener("resize", req);
    }
  } catch (e) {}

  /* ---- Lightbox: clicks inside [data-lightbox] open the image full-screen ---- */
  try {
    var triggers = [].slice.call(document.querySelectorAll("[data-lightbox] img, img[data-lightbox]"));
    if (triggers.length) {
      var lbStyle = document.createElement("style");
      lbStyle.textContent =
        ".awe-lightbox{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;" +
        "padding:4vw;background:rgba(12,11,10,.9);backdrop-filter:blur(6px);cursor:zoom-out;opacity:0;transition:opacity .25s ease}" +
        ".awe-lightbox.open{display:flex;opacity:1}" +
        ".awe-lightbox img{max-width:min(1100px,94vw);max-height:90vh;object-fit:contain;border-radius:8px;" +
        "box-shadow:0 40px 100px -30px rgba(0,0,0,.7);transform:scale(.97);transition:transform .3s ease}" +
        ".awe-lightbox.open img{transform:scale(1)}" +
        ".awe-lightbox-close{position:absolute;top:18px;right:20px;width:44px;height:44px;border:0;border-radius:50%;" +
        "background:rgba(255,255,255,.14);color:#fff;cursor:pointer}" +
        ".awe-lightbox-close::before,.awe-lightbox-close::after{content:'';position:absolute;top:50%;left:50%;width:20px;height:2px;background:#fff}" +
        ".awe-lightbox-close::before{transform:translate(-50%,-50%) rotate(45deg)}" +
        ".awe-lightbox-close::after{transform:translate(-50%,-50%) rotate(-45deg)}" +
        "html.nav-open{overflow:hidden}" +
        "@media(prefers-reduced-motion:reduce){.awe-lightbox,.awe-lightbox img{transition:none}}";
      document.head.appendChild(lbStyle);
      var box = document.createElement("div");
      box.className = "awe-lightbox";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-modal", "true");
      box.setAttribute("aria-hidden", "true");
      var boxImg = document.createElement("img");
      boxImg.alt = "";
      var closeBtn = document.createElement("button");
      closeBtn.type = "button";
      closeBtn.className = "awe-lightbox-close";
      closeBtn.setAttribute("aria-label", "Close");
      box.appendChild(closeBtn);
      box.appendChild(boxImg);
      document.body.appendChild(box);
      var openLb = function (src, alt) {
        boxImg.src = src; boxImg.alt = alt || "";
        box.classList.add("open"); box.setAttribute("aria-hidden", "false");
        document.documentElement.classList.add("nav-open");
      };
      var closeLb = function () {
        box.classList.remove("open"); box.setAttribute("aria-hidden", "true");
        document.documentElement.classList.remove("nav-open");
      };
      triggers.forEach(function (img) {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", function () {
          openLb(img.currentSrc || img.src, img.alt);
        });
      });
      box.addEventListener("click", closeLb);
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });
    }
  } catch (e) {}
})();
