import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {templates,sampleForTemplate} from "../shared/model.mjs";
import {renderSite} from "../shared/render.mjs";
import {shellIdentities} from "../shared/site-shells.mjs";

test("every customer design has a separate outer shell and page ordering",()=>{
  assert.equal(Object.keys(shellIdentities).length,27);
  assert.equal(new Set(Object.values(shellIdentities)).size,27);
  for(const t of templates){
    const html=renderSite(sampleForTemplate(t.id),{sample:true});
    if(t.id==="liquidmetal"){
      assert(html.includes('class="shell-header shell-liquidmetal'),"Missing special Liquid Metal header");
      assert(html.includes('class="shell-footer shell-footer-liquidmetal'),"Missing special Liquid Metal footer");
      assert(html.includes('data-architecture="metal-machined-glass"'));
      assert(html.includes('aria-label="Section navigation"'));
      assert(html.includes('id="main"'));
      assert(!html.includes("<script"));
      continue;
    }
    assert(html.includes('class="shell-header shell-'+t.id+'"'),"Missing "+t.id+" header");
    assert(html.includes('class="shell-footer shell-footer-'+t.id+'"'),"Missing "+t.id+" footer");
    assert(html.includes('data-architecture="'+shellIdentities[t.id]+'"'),"Missing unique architecture");
    assert(html.includes(".shell-header"),"Shell CSS was omitted");
    assert(html.includes('id="main"'),"Skip-link target missing");
    assert(html.includes('href="#main"'),"Back-to-top link missing");
    assert(html.includes('aria-label="Section navigation"'),"Navigation needs label");
    assert(!html.includes('class="site-footer"'),"Generic footer still rendered");
    assert(!html.includes('class="site-nav"'),"Generic nav still rendered");
    assert(!html.includes("<script"),"Static customer sites must remain script-free");
  }
});
test("purpose-aware pages preserve specialized content with each outer shell",()=>{
  const purposes=["Actor / model","Student résumé","Small business","Creative portfolio","Professional portfolio","Personal brand"];
  for(const purpose of purposes){
    for(const t of templates){
      const html=renderSite(sampleForTemplate(t.id,purpose),{sample:true});
      assert(html.includes('class="site-architecture site-architecture-'+t.id+'"'));
      if(t.id==="liquidmetal"){
        assert(html.includes("lm-work-grid"),"Liquid Metal independent portfolio missing");
        assert(!html.includes('id="testimonials"'));
        assert(html.includes("motion-expressive"));
        continue;
      }
      assert(html.includes("chapter-work"),"Work chapter missing in "+t.id+" / "+purpose);
      assert(!html.includes('id="testimonials"'),"No fictional testimonials allowed");
      assert(html.includes('motion-expressive'));
    }
  }
});
test("four real comparison scenarios and a case-study page with working destination links",async()=>{
  const [home,logic,style,deep,deepStyle,build,hero]=await Promise.all(
    ["index.html","cinema.js","cinema.css","why-awe.html","why-awe.css","scripts/build.mjs","hero-layout-fix.css"].map(x=>readFile(x,"utf8")));
  for(const id of ["actor","business","developer","creative"]){
    assert(home.includes('data-comparison="'+id+'"'),"Missing "+id+" comparison button");
    assert(deep.includes('id="'+id+'"'),"Missing "+id+" design story");
    assert(logic.includes(id+":"),"Missing "+id+" comparison data");
  }
  assert(home.includes('id="comparison-learn-more"'));
  assert(deep.includes('/templates/student/terminal.html'));
  assert(deep.includes('/templates/business/bloom.html'));
  assert(logic.includes("/why-awe.html?concept="));
  for(const n of [0,50,100])assert(home.includes('data-reveal="'+n+'"'));
  assert(hero.includes("grid-template-columns:"));
  assert(hero.includes("grid-column:2"));
  assert(hero.includes("position:relative!important"));
  assert(style.includes(".transformation-experiences"));
  assert(deepStyle.includes(".story-chapter"));
  for(const asset of ["hero-layout-fix.css","why-awe.html","why-awe.css","why-awe.js"]){
    assert(build.includes('"'+asset+'"'));
  }
});
test("website copy promotes design quality without excessive template-count repetition",async()=>{
  const [home,order]=await Promise.all(["index.html","app/order.mjs"].map(x=>readFile(x,"utf8")));
  assert(!home.includes("TWENTY WORLDS"));
  assert(!home.includes("20 distinct creative directions"));
  assert(!home.includes("Nº / 020"));
  assert(!order.includes("TWENTY DISTINCT WORLDS"));
  assert(!order.includes("ORIGINAL CREATIVE WORLDS"));
});

