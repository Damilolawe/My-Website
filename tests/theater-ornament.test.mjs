import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
test("Theater ornament cannot crowd device controls",async()=>{
 const css=await read("showcase.css");
 const qa=await read("scripts/browser-qa.mjs");
 assert(css.includes("#express-showcase .worlds-accent{display:none!important}"));
 assert(qa.includes("AUDIT_THEATER_ORNAMENT"));
 assert(qa.includes('decoration!=="none"'));
});
