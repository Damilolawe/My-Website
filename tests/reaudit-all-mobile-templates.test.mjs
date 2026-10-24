import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {templates} from "../shared/model.mjs";
test("Picky re-audit checks every design at all four true narrow widths",async()=>{
 const qa=await readFile(new URL("../scripts/browser-qa.mjs",import.meta.url),"utf8");
 assert.equal(templates.length,37);
 assert(qa.includes("for(const width of [320,345,360,375])"));
 assert(qa.includes("for(const {id} of templates)"));
 assert(qa.includes("NESTED_PHONE_THEATER"));
 assert(qa.includes('page.frameLocator("#worlds-frame")'));
 assert(qa.includes("geometry.heading.right>width+1"));
 assert(qa.includes("card.right>width+4"));
 assert(qa.includes("contactLinks"));
});

