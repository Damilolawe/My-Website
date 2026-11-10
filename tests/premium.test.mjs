import test from "node:test";
import assert from "node:assert/strict";
import { zipSync, strToU8 } from "fflate";
import { normalize, sample, templates } from "../shared/model.mjs";
import { renderLegacySite as renderSite } from "../shared/render.mjs";
import {freeDesignFor} from "../shared/free-designmd.mjs";
import { previewResume, suggestionsFromText } from "../platform/resume.mjs";

test("twenty premium templates produce semantic, responsive site documents", () => {
  const documents=templates.slice(0,42).map(t=>renderSite({...sample,template:t.id},{sample:true}));
  for (const [index,html] of documents.entries()) {
    assert.match(html,/<!doctype html>/i);
    assert.match(html,["runwayml","runwaymulti"].includes(templates[index].id) ? /<h1 id="rw-h1">/ : /<h1 id="hero-title">/);
    assert.match(html,/width=device-width/);
    assert.match(html,/prefers-reduced-motion/);
    assert.match(html,/FICTIONAL TEMPLATE DEMO/);
    assert.match(html,/id="work"/);
    if(!["runwayml","runwaymulti","nike","clay","ferrari"].includes(templates[index].id)&&!html.includes("site-architecture-arcade")&&!html.includes("site-architecture-liquidmetal")&&!freeDesignFor(templates[index].id)) assert.match(html,/Verified quotation|fictional quote/i);
    assert.match(html,/Skip to content/);
  }
  assert.equal(new Set(documents).size,42);
});
test("explicit section reordering and structured service cards persist, unsafe content stays escaped",()=>{
  const input=normalize({
    ...sample,template:"signal",
    design:{...sample.design,sections:["contact","services","work","about"],density:"airy",corners:"sharp",heroAlignment:"center"},
    content:{...sample.content,cards:[{title:"<script>alert(9)</script>",description:"Protected",url:"javascript:alert(1)"}],
      services:[{title:"Portfolio site",description:"Safe service",url:"https://example.org"}],
      testimonials:[],heroLabel:"<img src=x onerror=alert(1)>",ctaLabel:"See my work"}
  });
  assert.deepEqual(input.design.sections,["contact","services","work","about"]);
  assert.equal(input.content.cards[0].url,"");
  const html=renderSite(input);
  assert(html.indexOf('id="contact"')<html.indexOf('id="services"'));
  assert(html.indexOf('id="services"')<html.indexOf('id="work"'));
  assert(!html.includes("<script>alert(9)"));
  assert(!html.includes("javascript:"));
  assert(html.includes("&lt;script&gt;"));
  assert(html.includes("&lt;img"));
  assert(html.includes('https://example.org'));
});
test("generated websites only use approved image identifiers",()=>{
  const good="11111111-1111-4111-8111-111111111111";
  const html=renderSite({...sample,content:{...sample.content,photoIds:[good,"../../secret"]}});
  assert(html.includes('/api/assets/'+good));
  assert(!html.includes('../../secret'));
});
test("DOCX résumé parser extracts real text and requires review without auto-publishing contacts",()=>{
  const xml='<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' +
    ['Maya Stewart','Software Engineer','Education','State University, BSc Computer Science','Experience',
     'Software Engineering Intern, Example Inc','Skills','JavaScript, SQL, Testing','Projects','Study Planner']
    .map(t=>'<w:p><w:r><w:t>'+t+'</w:t></w:r></w:p>').join('') + '</w:body></w:document>';
  const zip=zipSync({"word/document.xml":strToU8(xml)});
  const result=previewResume(Buffer.from(zip),"application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  assert.equal(result.mode,"review-required");
  assert.equal(result.fields.name,"Maya Stewart");
  assert.match(result.fields.education,/State University/);
  assert.match(result.fields.skills,/JavaScript/);
  assert.equal(Object.hasOwn(result.fields,"publicEmail"),false);
});
test("simple text-based PDF extraction and scanned-file failure are explicit",()=>{
  const text=Buffer.from('%PDF-1.4\n1 0 obj <<>> stream\nBT (Maya Stewart) Tj ET\nendstream\n%%EOF');
  const suggestion=previewResume(text,"application/pdf");
  assert.match(suggestion.fields.name,/Maya Stewart/);
  assert.throws(()=>previewResume(Buffer.from('%PDF-1.4\n%%EOF'),"application/pdf"),/No readable text/);
});
test("resume fields are suggestions, not fabricated experience or required publication",()=>{
  const suggestions=suggestionsFromText('Resume\nJordan Lee\nEducation\nCity College\nSkills\nReact and CSS\n');
  assert.equal(suggestions.fields.name,"Jordan Lee");
  assert.equal(suggestions.fields.experience,"");
  assert(suggestions.warnings.some(x=>/review/i.test(x)));
  assert(!("payment" in suggestions));
});

