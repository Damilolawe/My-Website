(() => {
  "use strict";
  const header = document.querySelector(".site-header");
  const navButton = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".primary-nav");
  const body = document.body;
  const toggleMenu = (open) => {
    body.classList.toggle("menu-open", open);
    navButton?.setAttribute("aria-expanded", String(open));
    navButton?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  };
  navButton?.addEventListener("click", () => toggleMenu(!body.classList.contains("menu-open")));
  nav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => toggleMenu(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") toggleMenu(false);
  });
  document.addEventListener("click", (event) => {
    if (body.classList.contains("menu-open") && !event.target.closest(".nav-shell")) toggleMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 780 && body.classList.contains("menu-open")) toggleMenu(false);
  }, { passive: true });
  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 12);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  // Loop a complete repeating segment, not half of a viewport-sized track.
  // Extra copies prevent empty space on ultrawide desktop displays.
  const ticker = document.querySelector(".ticker");
  const tickerTrack = ticker?.querySelector(".ticker-track");
  const tickerSeed = tickerTrack?.querySelector(".ticker-segment");
  const layoutTicker = () => {
    if (!ticker || !tickerTrack || !tickerSeed) return;
    const width = tickerSeed.getBoundingClientRect().width;
    if (width <= 0) return;
    const needed = Math.max(2, Math.ceil(ticker.clientWidth / width) + 2);
    while (tickerTrack.children.length < needed) tickerTrack.appendChild(tickerSeed.cloneNode(true));
    while (tickerTrack.children.length > needed) tickerTrack.lastElementChild.remove();
    tickerTrack.style.setProperty("--ticker-loop-offset", "-" + width + "px");
    tickerTrack.style.setProperty("--ticker-duration", (width / 32).toFixed(2) + "s");
  };
  layoutTicker();
  document.fonts?.ready?.then(layoutTicker);
  let tickerResizeFrame = 0;
  window.addEventListener("resize", () => {
    if (tickerResizeFrame) cancelAnimationFrame(tickerResizeFrame);
    tickerResizeFrame = requestAnimationFrame(layoutTicker);
  }, { passive: true });
  const features = [
    {
      image: "https://otakuhavenapp.com/wp-content/uploads/2026/10/1-554x1024.webp",
      tag: "BUILD CONNECTIONS", title: "Your circle. Your people.",
      description: "Build training bonds with people who speak your fandom language, and let every interaction strengthen your circle."
    },
    {
      image: "https://otakuhavenapp.com/wp-content/uploads/2026/10/2-523x1024.webp",
      tag: "PICK YOUR SIDE", title: "Your take has a place.",
      description: "Step into Shonen Showdown, debate your favorites, and earn XP for bringing your voice to the arena."
    },
    {
      image: "https://otakuhavenapp.com/wp-content/uploads/2026/10/3-1-506x1024.webp",
      tag: "SHOW YOUR CREATIVE SIDE", title: "The spotlight is yours.",
      description: "Post your looks and builds, join contests, and connect with creators who appreciate every detail."
    },
    {
      image: "https://otakuhavenapp.com/wp-content/uploads/2026/10/4-495x1024.webp",
      tag: "DISCOVER FAN-MADE WORK", title: "Made by the community.",
      description: "Explore the Otaku Bazaar and turn your passion into creations the whole Haven can discover."
    }
  ];
  const tabs = Array.from(document.querySelectorAll(".feature-tab"));
  const showcase = document.querySelector("#feature-preview");
  const shot = document.querySelector("#showcase-image");
  const tag = document.querySelector("#showcase-tag");
  const title = document.querySelector("#showcase-title");
  const description = document.querySelector("#showcase-description");
  const count = document.querySelector(".showcase-indicator");
  const selectFeature = (index, focus = false) => {
    const feature = features[index];
    if (!feature || !showcase || !shot || !title || !description || !tag || !count) return;
    tabs.forEach((button, idx) => {
      const selected = idx === index;
      button.classList.toggle("active", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    showcase.setAttribute("aria-labelledby", tabs[index].id);
    shot.src = feature.image;
    shot.alt = "Official Otaku Haven mobile app screenshot";
    tag.textContent = feature.tag;
    title.textContent = feature.title;
    description.textContent = feature.description;
    count.textContent = String(index + 1).padStart(2, "0") + " / 04";
    if (focus || document.activeElement?.classList?.contains("feature-tab")) {
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
          typeof showcase.animate === "function") {
        showcase.animate([
          { opacity: .76, transform: "translateY(9px)" },
          { opacity: 1, transform: "translateY(0)" }
        ], { duration: 420, easing: "cubic-bezier(.16,1,.3,1)" });
      }
    }
    if (focus) tabs[index].focus();
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectFeature(index));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const backwards = event.key === "ArrowLeft" || event.key === "ArrowUp";
      const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (backwards ? -1 : 1) + tabs.length) % tabs.length;
      selectFeature(nextIndex, true);
    });
  });
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((element) => element.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: "0px 0px -24px 0px" });
    reveals.forEach((element) => observer.observe(element));
  }
  document.querySelectorAll("img").forEach((img) => {
    const handleUnavailable = () => {
      if (img.classList.contains("logo-mark")) {
        img.hidden = true;
      } else {
        img.style.visibility = "hidden";
        img.parentElement?.classList.add("asset-unavailable");
      }
    };
    img.addEventListener("error", handleUnavailable, { once: true });
    // Cached failures can complete before the deferred script attaches listeners.
    if (img.complete && img.naturalWidth === 0) handleUnavailable();
  });

  // One pointer-driven glow, attached only to the interactive feature panel.
  // No mousemove handlers on the window and no persistent animation loop.
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    showcase?.addEventListener("pointermove", (event) => {
      const rect = showcase.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      showcase.style.setProperty("--oh-spot-x", ((event.clientX - rect.left) / rect.width * 100).toFixed(1) + "%");
      showcase.style.setProperty("--oh-spot-y", ((event.clientY - rect.top) / rect.height * 100).toFixed(1) + "%");
    }, { passive: true });
  }
  const rankPanel = document.querySelector(".rank-panel");
  if (rankPanel && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const charge = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-powered");
          charge.unobserve(entry.target);
        }
      });
    }, { threshold: .3 });
    charge.observe(rankPanel);
  }
})();