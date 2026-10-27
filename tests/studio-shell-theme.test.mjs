import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";

const read = path => readFile(new URL("../"+path,import.meta.url),"utf8");

test("studio and authenticated pages share homepage charcoal, soft-white and lime branding",async()=>{
 const [homepage,css] = await Promise.all([read("styles.css"),read("app/app.css")]);
 for(const token of ["--bg:#0c0d10","--ink:#f1efe8","--acid:#d1fa57"]){
  assert(homepage.includes(token),"Homepage missing "+token);
 }
 for(const token of ["--paper: #0c0d10","--ink: #f1efe8","--acid: #d1fa57"]){
  assert(css.includes(token),"Shared app shell missing "+token);
 }
 assert(css.includes("color-scheme: dark"),"Native fields should use dark-mode controls");
 assert(css.includes("ONE STUDIO IDENTITY"),"Shared homepage theme overrides must be last");
 assert(css.includes(".panel,.choice-card,.template-card,.tier-choice,.stat,.studio-tools,"),
  "Client, checkout and owner panel surfaces must all use the same palette");
 assert(css.includes(".tier-switch[aria-pressed=true],.purpose-chip[aria-pressed=true]"),
  "Selection controls must remain clear with accent colors");
 assert(!css.includes("body{background:#f0f1e6;color:#18201a}"),"Old beige body override must be removed");
 assert(css.lastIndexOf("ONE STUDIO IDENTITY")>css.lastIndexOf("Cohesive editorial visual identity"),
  "Homepage brand rules must override earlier app-specific cream skin");
});

test("public, customer, checkout and owner pages have consistent identity and browser chrome",async()=>{
 const pages=["order.html","account.html","admin.html","contact.html","privacy.html","inquiry-received.html"];
 for(const path of pages){
  const html=await read(path);
  assert(html.includes('<meta name="theme-color" content="#0c0d10">'),path+" chrome must match homepage");
  assert(html.includes('href="/app/app.css"'),path+" must use same themed stylesheet");
  assert(html.includes('awe-concepts-dark.svg'),path+" must carry Awe Concepts header wordmark");
  assert(html.includes('href="/favicon.svg"'),path+" must include the site icon");
 }
});

test("editorial AWE page has no beige interface band while preserving distinct concept art",async()=>{
 const [page,css]=await Promise.all([read("why-awe.html"),read("why-awe.css")]);
 assert(page.includes('<meta name="theme-color" content="#0c0d10">'));
 assert(css.includes("--bg:#0c0d10;--cream:#f1efe8;--acid:#d1fa57"));
 assert(css.includes(".story-preface{")&&css.includes("background:#141518;color:var(--cream)"),
  "Story preface must no longer render beige");
 assert(css.includes(".process{background:var(--acid)"),"Full-width highlight uses the home accent");
 for(const template of [".art-actor",".art-business",".art-developer",".art-creative"]){
  assert(css.includes(template),template+" concept artwork should not be recolored into one design");
 }
});

test("all interface theme changes stay outside generated customer websites",async()=>{
 const build=await read("scripts/build.mjs");
 const model=await read("shared/model.mjs");
 assert(build.includes('await writeFile(`dist/templates/${t.id}.html`, renderSite(config, { sample: true }));'));
 assert(model.includes("export const templates"));
 const css=await read("app/app.css");
 assert(css.includes("Template demo artwork remains independent"));
});
