/* Brianna project comparison. The two artboards are intentionally illustrative.
   A permanent real screenshot archive can replace the artboards when obtained. */
(() => {
  "use strict";
  const root = document.querySelector("[data-bld-compare]");
  if (!root) return;
  const viewport = root.querySelector(".bld-viewport");
  const range = root.querySelector("#bld-range");
  const percent = root.querySelector("[data-bld-percent]");
  const buttons = [...root.querySelectorAll("[data-bld-view]")];
  if (!viewport || !range || !percent || buttons.length !== 3) return;
  const clamp = value => Math.max(0, Math.min(100, Number(value) || 0));
  const setSplit = (value) => {
    const amount = clamp(value);
    viewport.style.setProperty("--bld-split", amount + "%");
    range.value = String(amount);
    range.setAttribute("aria-valuetext", amount + " percent before and " + (100 - amount) + " percent after");
    percent.textContent = String(amount);
    let view = "split";
    if (amount === 0) view = "after";
    if (amount === 100) view = "before";
    for (const button of buttons) {
      button.setAttribute("aria-pressed", String(button.dataset.bldView === view));
    }
  };
  range.addEventListener("input", () => setSplit(range.value));
  range.addEventListener("change", () => setSplit(range.value));
  for (const button of buttons) {
    button.addEventListener("click", () => {
      setSplit(button.dataset.bldView === "before" ? 100 : button.dataset.bldView === "after" ? 0 : 52);
    });
  }
  setSplit(range.value);
})();
