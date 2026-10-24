import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
test("Folio mobile cover uses content flow with separate image and legible copy",async()=>{
 const css=await read("shared/collection-edition.mjs");
 assert(css.includes("Folio mobile art-book cover"));
 assert(css.includes("display:flex!important;flex-direction:column!important"));
 assert(css.includes("position:relative!important;inset:auto!important"));
 assert(css.includes("margin:22px 0 0!important"));
 const qa=await read("scripts/browser-qa.mjs");
 assert(qa.includes("fold.photo.top<fold.title.bottom+8"));
});
