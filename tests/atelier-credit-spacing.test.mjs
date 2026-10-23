import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
test("Atelier image labels have distinct baselines at phone width",async()=>{
 const css=await read("shared/collection-edition.mjs");
 assert(css.includes("body.atelier .atelier-photo .study-credit"));
 assert(css.includes("top:17%;bottom:auto"));
 const qa=await read("scripts/browser-qa.mjs");
 assert(qa.includes("Mobile Atelier: image credit overlaps its editorial caption"));
 assert(qa.includes("fold.credit.top<fold.motto.bottom+8"));
 assert.equal(css,await read("supabase/functions/awe-api/shared/collection-edition.mjs"));
});
