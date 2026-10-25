import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { templates,sampleForTemplate } from "../shared/model.mjs";
import { renderSite } from "../shared/render.mjs";
import { typographySafetyCSS, protectedTypographyTemplates } from "../shared/typography-guard.mjs";
const read=path=>readFile(new URL("../"+path,import.meta.url),"utf8");

test("Typography guard is appended to actual generated HTML across the template catalog",()=>{
  const protectedSet=new Set(protectedTypographyTemplates);
  assert.equal(templates.length,116);
  for(const {id} of templates.slice(0,42)){
    const html=renderSite(sampleForTemplate(id),{sample:true});
    assert.equal(html.includes('data-awe-typography="readability"'),!protectedSet.has(id),id);
    if(!protectedSet.has(id)){
      assert(html.includes("word-spacing:.045em!important"),id);
      assert(html.includes("line-height:1.08!important"),id);
      assert(html.includes("letter-spacing:-.025em!important"),id);
    }
  }
});
test("The After Hours title specifically prevents the illustrated collapsed lettering",()=>{
  assert.match(typographySafetyCSS,/body\.afterhours \.afterhours-words h1\{/);
  assert.match(typographySafetyCSS,/letter-spacing:\.005em!important/);
  assert.match(typographySafetyCSS,/line-height:1\.12!important/);
  assert.match(typographySafetyCSS,/word-spacing:\.11em!important/);
  assert.match(typographySafetyCSS,/@media\(max-width:900px\)/);
  assert.match(typographySafetyCSS,/@media\(max-width:480px\)/);
});
test("Production and Edge renderers use the same final-stage safety rules",async()=>{
  assert.equal(await read("shared/render.mjs"),await read("supabase/functions/awe-api/shared/render.mjs"));
  assert.equal(await read("shared/typography-guard.mjs"),await read("supabase/functions/awe-api/shared/typography-guard.mjs"));
  const qa=await read("scripts/browser-qa.mjs");
  assert(qa.includes("TYPOGRAPHY_GUARD"));
  assert(qa.includes("TYPOGRAPHY_TRACKING"));
  assert(qa.includes("TYPOGRAPHY_LINE_HEIGHT"));
});
