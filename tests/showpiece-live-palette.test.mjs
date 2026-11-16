import test from "node:test";
import assert from "node:assert/strict";
import {templates, sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {showpieceDesigns} from "../shared/showpiece/index.mjs";

const livePreview = (id, primary, secondary) => {
  const fixture = sampleForTemplate(id);
  return renderSite({
    ...fixture,
    design: {...fixture.design, primary, secondary}
  }, {sample:true});
};

test("the live customer color pickers recolor every showpiece sample", () => {
  let checked = 0;
  for (const {id} of templates) {
    if (!showpieceDesigns[id]) continue;
    const magenta = livePreview(id, "#fc0a72", "#244ad1");
    const green = livePreview(id, "#10c970", "#ffc72d");
    assert.notEqual(magenta, green, id + " ignored the selected palette");
    assert.ok(magenta.includes("#fc0a72"), id + " did not apply primary");
    assert.ok(magenta.includes("color-mix(in srgb,#244ad1"), id + " did not apply secondary");
    assert.ok(green.includes("#10c970"), id + " did not apply next primary");
    assert.ok(green.includes("color-mix(in srgb,#ffc72d"), id + " did not apply next secondary");
    assert.ok(magenta.includes('FICTIONAL TEMPLATE DEMO'), id + " lost sample indicator");
    checked++;
  }
  assert.ok(checked >= 70, "Expected wide catalog coverage; got " + checked);
});

test("the palette choices also make it into the customer renderer", () => {
  for (const id of ["index", "md-mintlify", "md-together-ai", "liquidmetal", "limepress"]) {
    const fixture = sampleForTemplate(id);
    const branded = renderSite({
      ...fixture,
      design: {...fixture.design,primary:"#fc0a72",secondary:"#244ad1"}
    });
    assert.ok(branded.includes("#fc0a72"), id + " lost the chosen primary on customer output");
    assert.ok(branded.includes("color-mix(in srgb,#244ad1"), id + " lost secondary on customer output");
    assert.ok(!branded.includes("awe-demo-stock"), id + " leaked sample photos to customers");
  }
});
