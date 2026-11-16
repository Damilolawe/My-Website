import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const read = path => readFile(new URL("../" + path, import.meta.url), "utf8");

test("Express customization offers true desktop and phone viewport modes", async () => {
  const [order, css, page] = await Promise.all([
    read("app/order.mjs"), read("app/app.css"), read("order.html")
  ]);
  assert(order.includes('class="preview-device-stage"'), "A scaled preview needs a clipping stage");
  assert(order.includes('const documentWidth = 1200'), "Desktop must render at desktop CSS width");
  assert(order.includes('const width = Math.min(390, available)'), "Mobile must use a real phone width");
  assert(order.includes('frame.style.transform = "scale(" + scale + ")"'), "Desktop should be fitted without changing layout breakpoints");
  assert(order.includes('wide.setAttribute("aria-pressed"'), "Active desktop control must be announced");
  assert(order.includes('narrow.setAttribute("aria-pressed"'), "Active mobile control must be announced");
  assert(order.includes('setPreviewDevice(matchMedia("(max-width: 760px)").matches)'), "Phones should enter mobile preview automatically");
  assert(css.includes('.design-preview-shell .preview-device-stage iframe{'), "Preview iframe needs transform origin and unclamped width");
  assert(css.includes('max-width:none!important'), "An iframe capped at 100% cannot render the desktop layout");
  assert(page.includes("/app/order.mjs?v=20261116-mobile-color-v2"), "Old customization script must be cache-busted");
});

test("color input changes render selected sample palette and final selection", async () => {
  const order = await read("app/order.mjs");
  assert(order.includes('name="primary" type="color"'));
  assert(order.includes('name="secondary" type="color"'));
  assert(order.includes('$("#design").oninput = scheduleUpdate'));
  assert(order.includes('$("#design").onchange = update'));
  assert(order.includes('generation !== previewGeneration'), "Older asynchronous frames cannot replace newer choices");
  assert(order.includes('...sampleForTemplate(input.template,input.type), design: input.design'));
  assert(order.includes('{sample:true}'));
});

test("phone gallery remains usable while previews stay in a real phone viewport", async () => {
  const [css, engine] = await Promise.all([
    read("app/express-gallery.css"), read("showcase.js")
  ]);
  assert(css.includes('.worlds-screen.is-mobile .worlds-view iframe{'));
  assert(css.includes('height:clamp(500px,68dvh,720px)!important'), "Phone preview should not grow indefinitely");
  assert(css.includes('max-height:350px;overflow-y:auto'), "The catalog should remain scrollable");
  assert(engine.includes('screen.classList.toggle("is-mobile",mobileView)'));
  assert(engine.includes('onModeChange(mobileView)'));
});
