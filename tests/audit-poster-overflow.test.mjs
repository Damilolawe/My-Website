import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const read=p=>readFile(new URL("../"+p,import.meta.url),"utf8");
test("Unbroken Brutalist slogans cannot increase phone document width",async()=>{
 const s=await read("shared/collection-edition.mjs");
 assert(s.includes("body.brutalist .brutalist-strap"));
 assert(s.includes("white-space:normal!important"));
 assert(s.includes("body.brutalist .brutalist-art"));
 assert(s.includes("body.brutalist .shell-brutalist"));
 assert.equal(s,await read("supabase/functions/awe-api/shared/collection-edition.mjs"));
});
test("Signal tape and shell are unrotated before 1024px tablet breakpoint",async()=>{
 const s=await read("shared/collection-edition.mjs");
 assert(s.includes("@media(max-width:1024px)"));
 assert(s.includes("body.signal .signal-tape{width:100%!important"));
 assert(s.includes("transform:none!important"));
});
