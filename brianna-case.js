/* Before/after uses captured site screenshots, never fabricated artwork.
   If a release could not archive both sites, show real external links instead. */
(() => {
  "use strict";
  const root = document.querySelector("[data-bld-compare]");
  if (!root) return;
  const viewport = root.querySelector(".bld-viewport");
  const range = root.querySelector("#bld-range");
  const percent = root.querySelector("[data-bld-percent]");
  const buttons = [...root.querySelectorAll("[data-bld-view]")];
  const controls = root.querySelector(".bld-controls");
  const fallback = root.querySelector("[data-bld-capture-fallback]");
  const note = document.querySelector("[data-bld-capture-status]");
  const captures = [...root.querySelectorAll("img[data-bld-shot]")];
  if (!viewport || !range || !percent || !controls || !fallback || buttons.length !== 3 || captures.length !== 2) return;

  const clamp = value => Math.max(0, Math.min(100, Number(value) || 0));
  const setSplit = value => {
    const amount = clamp(value);
    viewport.style.setProperty("--bld-split", amount + "%");
    range.value = String(amount);
    range.setAttribute("aria-valuetext", amount + " percent original and " + (100 - amount) + " percent redesign");
    percent.textContent = String(amount);
    const view = amount === 0 ? "after" : amount === 100 ? "before" : "split";
    for (const button of buttons) button.setAttribute("aria-pressed", String(button.dataset.bldView === view));
  };
  range.addEventListener("input", () => setSplit(range.value));
  range.addEventListener("change", () => setSplit(range.value));
  for (const button of buttons) {
    button.addEventListener("click", () => {
      setSplit(button.dataset.bldView === "before" ? 100 : button.dataset.bldView === "after" ? 0 : 52);
    });
  }
  setSplit(range.value);

  const checkImage = img => new Promise(resolve => {
    const probe = new Image();
    let finished = false;
    const finish = good => {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      resolve(good);
    };
    probe.onload = () => finish(probe.naturalWidth >= 600 && probe.naturalHeight >= 350);
    probe.onerror = () => finish(false);
    const timeout = setTimeout(() => finish(false), 12000);
    probe.src = img.currentSrc || img.src;
    if (probe.complete && probe.naturalWidth) finish(probe.naturalWidth >= 600 && probe.naturalHeight >= 350);
  });
  // Build strips absent src attributes, not merely the files, so Firebase
  // link validation succeeds even if Wix blocks automated screenshot capture.
  // Preserve the real-site cards without trying to load the current document
  // as an image from an empty src.
  if (captures.some(img => !img.hasAttribute("src"))) {
    viewport.hidden = true;
    controls.hidden = true;
    fallback.hidden = false;
    if (note) note.textContent = "Website captures are not yet available. Open either actual website below instead of a simulated preview.";
    return;
  }
  Promise.all(captures.map(checkImage)).then(results => {
    if (results.every(Boolean)) {
      viewport.hidden = false;
      controls.hidden = false;
      fallback.hidden = true;
      if (note) note.textContent = "Actual archived captures of Brianna's original website and Wix Studio redesign. Use the slider to compare.";
      setSplit(range.value);
    } else {
      viewport.hidden = true;
      controls.hidden = true;
      fallback.hidden = false;
      if (note) note.textContent = "Website captures are not yet available. Open either actual website below instead of a simulated preview.";
    }
  });
})();
