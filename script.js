(() => {
  "use strict";
  document.documentElement.classList.add("has-js");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const clamp = (number, min, max) => Math.min(Math.max(number, min), max);

  // Reveal gracefully: in unsupported browsers, content is always visible.
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      }
    }, { threshold: 0.06, rootMargin: "0px 0px -35px 0px" });
    reveals.forEach((item) => observer.observe(item));
  } else {
    reveals.forEach((item) => item.classList.add("in-view"));
  }

  // Hero arrival: purposeful, staggered typography.
  const hero = $(".hero");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => hero?.classList.add("is-ready"));
  });

  // Header and a subtle reading-progress line.
  const header = $("#header");
  const progress = $("#progress");
  let ticking = false;
  const updateScroll = () => {
    const y = window.scrollY || 0;
    header?.classList.toggle("scrolled", y > 32);
    if (progress) {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.style.width = (clamp(y / scrollable, 0, 1) * 100).toFixed(2) + "%";
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  }, { passive: true });
  window.addEventListener("resize", updateScroll, { passive: true });
  updateScroll();

  // Mobile navigation, escape key, focus return, and actual focus trapping.
  const menuButton = $("#menu-toggle");
  const menu = $("#mobile-menu");
  const setMenu = (open) => {
    if (!menu || !menuButton) return;
    menu.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    menu.inert = !open;
    document.body.classList.toggle("menu-open", open);
    if (open) {
      const firstLink = $("a", menu);
      firstLink?.focus();
    } else if (menu.contains(document.activeElement)) {
      menuButton.focus();
    }
  };
  menuButton?.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  $$("a", menu || document.createElement("div")).forEach(link => {
    link.addEventListener("click", () => setMenu(false));
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.classList.contains("open")) setMenu(false);
    if (event.key !== "Tab" || !menu?.classList.contains("open")) return;
    const focusable = [menuButton, ...$$("a", menu)].filter(Boolean);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && menu?.classList.contains("open")) setMenu(false);
  }, { passive: true });

  // Pointer-responsive spotlight and sculpture. Never required for content.
  const halo = $("#pointer-halo");
  const sculpture = $("#hero-sculpture");
  if (finePointer.matches && !reducedMotion.matches) {
    let x = -1000, y = -1000, hx = -1000, hy = -1000, active = false;
    window.addEventListener("pointermove", (event) => {
      x = event.clientX; y = event.clientY; active = true;
      if (halo) halo.style.opacity = "1";
    }, { passive: true });
    document.addEventListener("mouseleave", () => {
      active = false;
      if (halo) halo.style.opacity = "0";
    });
    const animatePointer = () => {
      if (active) {
        hx += (x - hx) * .17; hy += (y - hy) * .17;
        if (halo) halo.style.transform = "translate3d(" + (hx - 200) + "px," + (hy - 200) + "px,0)";
        if (sculpture && window.scrollY < window.innerHeight * 1.2) {
          const dx = (x / window.innerWidth - .5) * 22;
          const dy = (y / window.innerHeight - .5) * 22;
          sculpture.style.transform = "translate3d(" + dx.toFixed(1) + "px," + dy.toFixed(1) + "px,0)";
        }
      }
      requestAnimationFrame(animatePointer);
    };
    requestAnimationFrame(animatePointer);
    $$(".magnetic").forEach(el => {
      el.addEventListener("pointermove", event => {
        const r = el.getBoundingClientRect();
        const cx = event.clientX - (r.left + r.width / 2);
        const cy = event.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + (cx * .13).toFixed(1) + "px," + (cy * .13).toFixed(1) + "px)";
      });
      el.addEventListener("pointerleave", () => { el.style.transform = ""; });
    });
  }

  // Project-card lighting adapts to the cursor without breaking touch scrolling.
  if (finePointer.matches) {
    $$(".project-visual").forEach(card => {
      card.addEventListener("pointermove", event => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((event.clientX - r.left) / r.width * 100).toFixed(2) + "%");
        card.style.setProperty("--my", ((event.clientY - r.top) / r.height * 100).toFixed(2) + "%");
      }, { passive: true });
    });
  }

  // Live brand-direction sandbox.
  const themes = {
    electric: { title: "NORMAL<br>IS <em>OVERRATED.</em>", name: "ELECTRIC", label: "THE NEXT GENERATION OF CREATIVE", brand: "future<span>✳</span>form" },
    editorial: { title: "Make<br><em>an entrance.</em>", name: "EDITORIAL", label: "A MORE CONSIDERED POINT OF VIEW", brand: "Maison<span>✳</span>" },
    minimal: { title: "LESS.<br><em>BUT BETTER.</em>", name: "MINIMAL", label: "REDUCE TO THE ESSENTIAL", brand: "form<span>✳</span>" }
  };
  const stage = $("#lab-stage");
  const demoHeadline = $("#demo-headline");
  const demoBrand = $(".demo-brand");
  const demoLabel = $(".demo-label");
  const styleName = $("#style-name");
  $$(".lab-option").forEach(button => {
    button.addEventListener("click", () => {
      const value = button.dataset.style;
      const theme = themes[value];
      if (!theme || !stage) return;
      stage.dataset.style = value;
      // These HTML strings are authored above, not accepted from visitors.
      if (demoHeadline) demoHeadline.innerHTML = theme.title;
      if (demoBrand) demoBrand.innerHTML = theme.brand;
      if (demoLabel) demoLabel.textContent = theme.label;
      if (styleName) styleName.textContent = theme.name;
      $$(".lab-option").forEach(option => {
        const selected = option === button;
        option.classList.toggle("selected", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
    });
  });

  // Working interactive mini-brief; no external account or fake form backend.
  const selections = {
    project: "Portfolio website",
    vibe: "Bold and expressive",
    timeline: "As soon as possible"
  };
  $$(".choice-wrap").forEach(group => {
    group.addEventListener("click", event => {
      const button = event.target.closest(".choice");
      if (!button || !group.contains(button)) return;
      const key = group.dataset.group;
      if (!Object.prototype.hasOwnProperty.call(selections, key)) return;
      selections[key] = button.dataset.value;
      $$(".choice", group).forEach(option => {
        const selected = option === button;
        option.classList.toggle("active", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
    });
  });

  const toast = $("#toast");
  const feedback = $("#brief-feedback");
  let toastTimer;
  const notify = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 3200);
  };
  const briefText = () => [
    "MY PROJECT BRIEF — AWE / DIGITAL",
    "",
    "Project: " + selections.project,
    "Creative direction: " + selections.vibe,
    "Timeline: " + selections.timeline,
    "",
    "A few details about my idea:",
    "[Tell me what you'd like to build.]"
  ].join("\n");
  $("#copy-brief")?.addEventListener("click", async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(briefText());
      } else {
        const input = document.createElement("textarea");
        input.value = briefText();
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.focus(); input.select();
        const copied = document.execCommand("copy");
        input.remove();
        if (!copied) throw new Error("Clipboard unavailable");
      }
      notify("PROJECT BRIEF COPIED ✓");
      if (feedback) feedback.textContent = "Copied! Paste your project brief into an email or message.";
    } catch {
      notify("COPY UNAVAILABLE — TRY AN HTTPS CONNECTION");
      if (feedback) feedback.textContent = "Clipboard access was blocked. Try a secure (HTTPS) connection.";
    }
  });

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
