/* Real portfolio case-study images. Cinematic foreground controls, not another slider. */
(() => {
  "use strict";
  const stage = document.querySelector("[data-bld-showcase]");
  if (!stage) return;

  const section = stage.closest(".bld-case");
  const focusButtons = [...stage.querySelectorAll("[data-bld-focus]")];
  const previews = [...stage.querySelectorAll("img[data-bld-shot]")];
  const openButtons = [...stage.querySelectorAll("[data-bld-open]")];
  const status = stage.querySelector("[data-bld-status]");
  const fallback = section?.querySelector("[data-bld-capture-fallback]");
  const viewer = section?.querySelector("[data-bld-lightbox]");
  const viewerImage = viewer?.querySelector("[data-bld-lightbox-image]");
  const viewerCaption = viewer?.querySelector("[data-bld-lightbox-caption]");
  const viewerButtons = [...(viewer?.querySelectorAll("[data-bld-modal]") || [])];
  const closeButton = viewer?.querySelector("[data-bld-close]");
  if (!fallback || !status || !viewer || !viewerImage || !viewerCaption || focusButtons.length !== 2 || previews.length !== 2 || openButtons.length < 2) return;

  const images = Object.fromEntries(previews.map(img => [img.dataset.bldShot, img]));
  const labels = {
    before: { title: "ORIGINAL WEBSITE / 01", alt: "Brianna's original website screenshot" },
    after: { title: "REDESIGNED WEBSITE / 02", alt: "Brianna's redesigned website screenshot" },
  };

  const focus = side => {
    if (!labels[side]) return;
    stage.dataset.active = side;
    for (const button of focusButtons) button.setAttribute("aria-pressed", String(button.dataset.bldFocus === side));
    status.textContent = side === "after" ? "REDESIGN IN FOCUS" : "ORIGINAL IN FOCUS";
  };

  const modalSide = side => {
    if (!labels[side]) return;
    focus(side);
    viewerImage.src = images[side].getAttribute("src");
    viewerImage.alt = labels[side].alt;
    viewerCaption.textContent = labels[side].title;
    for (const button of viewerButtons) button.setAttribute("aria-pressed", String(button.dataset.bldModal === side));
  };

  for (const button of focusButtons) {
    button.addEventListener("click", () => focus(button.dataset.bldFocus));
    button.addEventListener("keydown", event => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const next = event.key === "ArrowLeft" ? "before" : "after";
      focus(next);
      focusButtons.find(btn => btn.dataset.bldFocus === next)?.focus();
    });
  }
  for (const button of openButtons) {
    button.addEventListener("click", () => {
      modalSide(button.dataset.bldOpen);
      if (!viewer.open && typeof viewer.showModal === "function") viewer.showModal();
    });
  }
  for (const button of viewerButtons) button.addEventListener("click", () => modalSide(button.dataset.bldModal));
  closeButton?.addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", event => { if (event.target === viewer) viewer.close(); });

  // The repository contains both approved, permanent screenshots.
  // If either image is lost in a future release, reveal true website links.
  const verifyImage = image => new Promise(resolve => {
    const source = image.getAttribute("src");
    if (!source) return resolve(false);
    const probe = new Image();
    let finished = false;
    const finish = valid => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      resolve(valid);
    };
    const timeout = setTimeout(() => finish(false), 12000);
    probe.onload = () => finish(probe.naturalWidth >= 1100 && probe.naturalHeight >= 650);
    probe.onerror = () => finish(false);
    probe.src = source;
    if (probe.complete && probe.naturalWidth) finish(probe.naturalWidth >= 1100 && probe.naturalHeight >= 650);
  });

  Promise.all(previews.map(verifyImage)).then(results => {
    const ready = results.every(Boolean);
    stage.hidden = !ready;
    fallback.hidden = ready;
    if (ready) focus("after");
  });
})();
