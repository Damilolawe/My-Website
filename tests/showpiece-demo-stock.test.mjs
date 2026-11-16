import test from "node:test";
import assert from "node:assert/strict";
import {templates, normalize, sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {renderSite as edgeRender} from "../supabase/functions/awe-api/shared/render.mjs";
import {showpieceDesigns} from "../shared/showpiece/index.mjs";
import {demoStockPhoto} from "../shared/showpiece/sample-stock.mjs";

test("fictional image slots have purpose-matched stock photo URLs", () => {
  const expected = [
    ["md-renault", "photo-1504674900247-0877df9cc836"],
    ["nike", "photo-1552674605-db6ffd4facb5"],
    ["md-mongodb", "photo-1498050108023-c5249f4df085"],
    ["contactsheet", "photo-1718964312487-d5e3d56fd2ce"]
  ];
  for (const [id, photo] of expected) {
    const img=demoStockPhoto(showpieceDesigns[id], 0);
    assert.match(img, /class="awe-demo-stock"/, id);
    assert.ok(img.includes(photo), id+" used off-topic image");
    assert.ok(img.includes("images.unsplash.com"), id);
  }
});
test("all creator-independent showpiece demos fill their authored stock-image slots", () => {
  let sitesWithStock = 0;
  for (const t of templates) {
    const design = showpieceDesigns[t.id];
    if (!design) continue;
    const sample=sampleForTemplate(t.id);
    const rendered=renderSite(sample,{sample:true});
    const hasPhotoHook = ["hero","work","services","about","intro"].some(section =>
      typeof design[section] === "function" && design[section].toString().includes("k.photo("));
    if (hasPhotoHook && rendered.includes('class="awe-demo-stock"')) sitesWithStock++;
    // In customer mode, stock photos must never substitute for uploaded assets.
    const customer=normalize({...sample,content:{...sample.content,photoIds:[]}});
    const publicCustomer=renderSite(customer);
    assert.ok(!publicCustomer.includes("awe-demo-stock"),t.id+" leaked sample stock");
    assert.equal(publicCustomer,edgeRender(customer),t.id+" edge renderer differs");
  }
  assert.ok(sitesWithStock >= 70, "Expected widespread coverage of authored stock-image slots, saw "+sitesWithStock);
});
