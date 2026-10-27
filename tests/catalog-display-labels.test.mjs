import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { templates } from "../shared/model.mjs";
import { zipDesigns } from "../shared/zip-design-catalog.mjs";

test("current authored catalog labels override older API labels in the order gallery", async () => {
  const source = await readFile(new URL("../app/order.mjs", import.meta.url), "utf8");
  // The API may still publish old demo titles while a static deployment introduces
  // approved generic labels. Authored display data must take final precedence.
  assert.match(
    source,
    /const galleryTemplates=templates\.map\(t=>\(\{\s*\.\.\.\(catalog\.templates\|\|\[\]\)\.find\(remote=>remote\.id===t\.id\),\s*\.\.\.t\s*\}\)\);/,
  );
  for (const [id, name] of [
    ["runwayml", "Cinematic"],
    ["runwaymulti", "Cinematic Pages"],
    ["clay", "Sculpt"],
    ["nike", "Athletic"],
    ["ferrari", "Motorsport"],
  ]) {
    const authored = templates.find(t => t.id === id);
    assert.equal(authored?.name, name, id);
    const staleApi = { id, name: "Old demo name", style: "Old style" };
    const display = { ...staleApi, ...authored };
    assert.equal(display.name, name, id + " must not revert to stale API label");
    assert.equal(display.style, authored.style, id + " should retain authored art direction");
  }
});

test("source-guided template subtitles never expose original reference names", async()=>{
  const allowed=new Set([
    "Automotive editorial","Editorial publishing","Financial interface",
    "Developer experience","Product design","Digital commerce","Creative portfolio"
  ]);
  assert.equal(zipDesigns.length,74);
  for(const study of zipDesigns){
    const display=templates.find(t=>t.id===study.id);
    assert(display,study.id+" missing from public catalog");
    assert(allowed.has(study.style),study.id+" has an original or generic source subtitle: "+study.style);
    assert.equal(display.style,study.style,study.id+" did not receive neutral subtitle");
    assert(!study.style.includes("source-guided"),study.id+" still has source-identifying text");
    const referenceLabel=study.name.replace(/ Study$/,"").toLowerCase();
    assert(!study.style.toLowerCase().startsWith(referenceLabel+" /"),study.id+" exposes source reference name");
  }
  const [catalog,server]=await Promise.all([
    readFile(new URL("../shared/zip-design-catalog.mjs",import.meta.url),"utf8"),
    readFile(new URL("../supabase/functions/awe-api/shared/zip-design-catalog.mjs",import.meta.url),"utf8")
  ]);
  assert.equal(catalog,server,"Public and server template metadata must match");
});

test("gallery only uses current names, neutral subtitles, thumbnails and selection arrows",async()=>{
  const [code,css,shared]=await Promise.all([
    readFile(new URL("../showcase.js",import.meta.url),"utf8"),
    readFile(new URL("../app/express-gallery.css",import.meta.url),"utf8"),
    readFile(new URL("../showcase.css",import.meta.url),"utf8")
  ]);
  assert(code.includes("title.textContent=item.name"),"Renamed template name must remain visible");
  assert(code.includes("meta.textContent=item.style"),"Use vetted, neutral style subtitle");
  assert(code.includes("button.append(count,thumb,copy,symbol)"),"Exactly four elements in each choice");
  assert(!code.includes("worlds-choice-swatch"),"No palette dot should be rendered");
  assert(!css.includes("worlds-choice-swatch")&&!shared.includes("worlds-choice-swatch"),"No swatch styling should remain");
  assert(code.includes("mini.src=\"/assets/catalog-thumbnails/\""),"Keep live thumbnail imagery");
  assert(code.includes('button.addEventListener("click",()=>choose(item.id,true))'),"Template selection behavior must remain");
});
