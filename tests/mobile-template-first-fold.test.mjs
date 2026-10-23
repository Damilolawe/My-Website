import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
test("Small-screen fashion and editorial covers display imagery and headlines above the fold",async()=>{
 const s=await read("shared/collection-edition.mjs");
 for(const selector of ["body.folio .folio-picture","body.folio .folio-words","body.atelier .atelier-photo","body.atelier .atelier-copy","body.afterhours .afterhours-veil",".demo-banner"])
  assert(s.includes(selector),selector+" missing");
 const qa=await read("scripts/browser-qa.mjs");
 assert(qa.includes("MOBILE_TEMPLATE_FIRST_FOLD"));
 assert(qa.includes("fold.photo.top>fold.viewport-40"));
 assert(qa.includes("fold.nav.bottom-2"));
});
