import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
test("Signal's decorative overflow is contained through tablet widths",async()=>{
 const css=await read("shared/collection-edition.mjs");
 assert(css.includes("html:has(body.signal){overflow-x:clip!important"));
 assert(css.includes("body.signal .signal-tape,"));
 assert.equal(css,await read("supabase/functions/awe-api/shared/collection-edition.mjs"));
});
test("Device toggle snaps to actual mobile width and QA catches enlarged phone frame",async()=>{
 const [css,qa]=await Promise.all([read("showcase.css"),read("scripts/browser-qa.mjs")]);
 assert(css.includes(".worlds-screen.is-mobile .worlds-view iframe{"));
 assert(css.includes("transition:none!important;max-width:100%!important"));
 assert(qa.includes("mobile.width>380"));
 assert(qa.includes("NARROW_OVERFLOW_ELEMENTS"));
});
