import test from "node:test";
import assert from "node:assert/strict";
import { sampleForTemplate } from "../shared/model.mjs";
import { renderSite } from "../shared/render.mjs";
import { premiumStudyIds } from "../shared/premium-art-direction-35.mjs";
import { uploadedDesignFor } from "../shared/uploaded-designs.mjs";

const preserved = ["folio","liquidmetal","runwayml","runwaymulti","nike","clay","ferrari"];
const clutter = [
  /<aside\s+class="experience-interlude\b/,
  /<aside\s+class="md-edition-break\b/,
  /<span\s+class="chapter-num"/,
  /<span\s+class="chapter-kicker"/,
  /<span\s+class="contact-emblem"/,
  /<span\s+class="story-opening"/,
  /<span\s+class="story-art"/,
  /<p\s+class="contact-setup-note"/
];
test("all 35 templates remove generic interludes, decorative symbols, and unconfigured contact blocks",()=>{
  assert.equal(premiumStudyIds.length,35);
  for(const id of premiumStudyIds){
    const html=renderSite(sampleForTemplate(id),{sample:true});
    for(const re of clutter) assert(!re.test(html),id+" reintroduced boilerplate: "+re);
    assert(!html.includes("Something worth making starts here."),id+" repeated contact tagline");
    const forbidden = "Black opening titles alternating";
    const position = html.indexOf(forbidden);
    assert(position<0,id+" leaked a design instruction: "+html.slice(Math.max(0,position-170),position+forbidden.length+220));
    assert(!html.includes("Fictional portfolio demonstration — add your own email"),id+" renders a duplicate placeholder contact panel");
    if(uploadedDesignFor(id)) assert(html.includes("class=\"art-scene"),id+" lost original authored art");
    assert(html.includes('id="hero-title"')||id==="arcade",id+" lost its hero");
    assert(html.length<=256000,id+" exceeds publication limit");
  }
});
test("client email and links still render as functioning contact anchors",()=>{
  for(const id of ["index","still","afterhours","portraiture","atlas","atelier","orbit"]){
    const input=sampleForTemplate(id);
    input.content.publicEmail="artist@example.com";
    input.content.links=["https://portfolio.example.com/projects"];
    const html=renderSite(input);
    assert(html.includes('id="contact"'),id+" missing contact target");
    assert(html.includes('href="mailto:artist@example.com"'),id+" missing email");
    assert(html.includes('href="https://portfolio.example.com/projects"'),id+" missing client link");
    assert(!/<span\s+class="contact-emblem"/.test(html),id+" repeated emblem");
    assert(!html.includes("Something worth making starts here."),id+" repeated generic tagline");
  }
});
test("protected templates retain their original source architecture",()=>{
  for(const id of preserved){
    const html=renderSite(sampleForTemplate(id),{sample:true});
    assert(!html.includes('data-awe-design-study'),id+" must be excluded from 35-template cleanup");
  }
});
