import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {templates,sample,sampleForTemplate,normalize} from "../shared/model.mjs";
import {architectureMode} from "../shared/full-page-layouts.mjs";
import {freeDesignFor} from "../shared/free-designmd.mjs";
import {renderSite} from "../shared/render.mjs";

test("20 designs change entire page architecture, not just hero color",()=>{
  const modes=new Set(),workStructures=new Set();
  for(const t of templates.filter(t=>!["arcade","liquidmetal","runwayml","runwaymulti","nike","clay","ferrari"].includes(t.id)&&!freeDesignFor(t.id))){
    const html=renderSite(sampleForTemplate(t.id),{sample:true});
    const mode=architectureMode(t.id);
    assert(mode,t.id+" is missing full-page composition");
    modes.add(mode);
    const match=html.match(/<div class="art-directed-work mode-([^"]+)"/);
    assert(match,t.id+" has no custom work presentation");
    workStructures.add(match[1]);
    assert(html.includes("chapter-"+mode),t.id+" chapters do not match its design");
    assert(html.includes('class="shell-header shell-'+t.id+'"'),t.id+" missing template-specific header");
    assert(html.includes('class="shell-footer shell-footer-'+t.id+'"'),t.id+" missing template-specific footer");
    assert(html.includes("chapter-work"),t.id+" missing designed work chapter");
    assert(html.includes("case-entry"),t.id+" missing art-directed work");
    assert(!html.includes('class="work-grid"'),t.id+" fell back to generic work cards");
    assert(html.includes("full-page")||html.includes(".art-directed-work"),t.id+" page stylesheet missing");
    assert(html.includes("alternateCSS")===false,"No module source should leak into generated output");
    assert(html.includes("FICTIONAL TEMPLATE DEMO"));
    assert(!html.includes("<script"));
  }
  assert.equal(modes.size,25);
  assert.equal(workStructures.size,25);
});
test("all 14 alternative designs include their actual generated CSS in final HTML",()=>{
  const html=renderSite(sampleForTemplate("playbill"),{sample:true});
  assert(html.includes(".playbill-stage{"),"Theatre layout CSS must be delivered");
  assert(html.includes(".theatre-program{"),"Theatre credit CSS must be delivered");
  const tech=renderSite(sampleForTemplate("terminal"),{sample:true});
  assert(tech.includes(".terminal-window{"),"Developer console CSS must be delivered");
  assert(tech.includes(".command-console{"),"Developer case architecture CSS must be delivered");
  const photo=renderSite(sampleForTemplate("contactsheet"),{sample:true});
  assert(photo.includes(".photographic-contact{"),"Photographer-specific contact sheet missing");
});
test("purpose-specific work sections and honest content persist across all designs",()=>{
  const typeChecks=[
    ["Actor / model","Credits &amp; on-screen work"],
    ["Student résumé","Projects &amp; experiments"],
    ["Small business","What we offer"],
  ];
  for(const [type,label] of typeChecks){
    for(const t of templates){
      const site=renderSite(sampleForTemplate(t.id,type),{sample:true});
      if(t.id!=="arcade"&&t.id!=="runwayml"&&t.id!=="runwaymulti"&&!["nike","clay","ferrari"].includes(t.id)&&!freeDesignFor(t.id)) assert(site.includes(label),t.id+" missed "+type+" copy");
      assert(!site.includes('id="testimonials"'),"No fabricated endorsements in public samples");
    }
  }
});
test("customer section order, unsafe content, and private media rules survive redesign",()=>{
  const input=normalize({
    ...sample,
    template:"monologue",
    design:{sections:["contact","work","about"],animation:"none",primary:"#eeeeee"},
    content:{...sample.content,name:"<script>alert(9)</script>",bio:"<svg onload=alert(1)>",
      cards:[{title:"<img src=x>",description:"A genuine custom project",url:"javascript:alert(9)"}],
      photoIds:["../../private","11111111-1111-4111-8111-111111111111"],testimonials:[]}
  });
  const html=renderSite(input);
  assert(html.indexOf('id="contact"')<html.indexOf('id="work"'));
  assert(html.indexOf('id="work"')<html.indexOf('id="about"'));
  assert(!html.includes("<script>alert(9)"));
  assert(!html.includes("javascript:alert"));
  assert(!html.includes("../../private"));
  assert(html.includes("&lt;svg"));
  assert(html.includes("&lt;img"));
  assert(html.includes("motion-none"));
  assert(html.includes("case-screenplay"));
});
test("homepage genuinely includes interaction, working links and demo module assets",async()=>{
  const [html,js,styles,build]=await Promise.all([
    readFile("index.html","utf8"),readFile("awe-relaunch.js","utf8"),
    readFile("awe-relaunch.css","utf8"),readFile("scripts/build.mjs","utf8")
  ]);
  assert(html.includes('id="awe-hero-showreel"'));
  assert(html.includes('id="reel-next"'));
  assert(html.includes('id="reel-explore"'));
  assert(html.includes('id="awe-impact-title"'));
  assert(html.includes('data-reel-select="2"'));
  assert(js.includes('addEventListener("click"'));
  assert(js.includes('compactTouch.matches'));
  assert(!js.includes('reduced.matches'));
  assert(js.includes("/templates/student/terminal.html"));
  assert(styles.includes(".reel-console"));
  assert(styles.includes(".reel-cinema"));
  assert(styles.includes(".reel-boutique"));
  assert(build.includes('"awe-relaunch.css"'));
  assert(build.includes('"awe-relaunch.js"'));
});

