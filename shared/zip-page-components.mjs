/* Source-guide page components for genuinely different multipage archetypes.
   Pricing examples deliberately do not represent the owner's live prices.
   Client-specific price/content fields require a future editor schema extension. */
export function sampleChapterHTML(t,chapter,contactUrl){
 if(chapter==="Pricing"){
  const plans=[
   ["ESSENTIAL","A focused introduction","A foundational experience for a new idea."],
   ["STUDIO","More room to grow","Flexible sections for an evolving creative practice."],
   ["CUSTOM","Made around you","A bespoke direction shaped around your specific needs."]
  ];
  return '<section class="study-chapter study-price" id="features" aria-labelledby="study-chapter-title">'+
    '<div class="study-chapter-head"><span class="eyebrow">ILLUSTRATIVE DESIGN STUDY</span><h2 id="study-chapter-title">Find your fit.</h2>'+
    '<p>Sample package information for visual demonstration only. These are not prices or packages offered by AWE Concepts.</p></div>'+
    '<div class="study-plan-grid">'+plans.map((p,i)=>'<article class="study-plan">'+
    '<span class="eyebrow">PLAN '+String(i+1).padStart(2,"0")+'</span>'+
    '<h3>'+p[0]+'</h3><strong>'+p[1]+'</strong><p>'+p[2]+'</p>'+
    '<a href="'+contactUrl+'">Explore the next step <span aria-hidden="true">→︎</span></a></article>').join("")+'</div></section>';
 }
 if(chapter==="Documentation"){
  return '<section class="study-chapter study-docs" id="features" aria-labelledby="study-chapter-title">'+
   '<aside class="study-docs-side"><span class="eyebrow">DEVELOPER GUIDE / SAMPLE</span><a href="#study-start" aria-current="location">Introduction</a><a href="#study-setup">Getting started</a><a href="#study-reference">Reference</a></aside>'+
   '<div class="study-docs-body"><span class="eyebrow">DOCUMENTATION / 01</span>'+
   '<h2 id="study-chapter-title">A clearer way to build.</h2>'+
   '<section id="study-start"><h3>Introduction</h3><p>Documentation examples illustrate the source design language without claiming to describe a real integration.</p></section>'+
   '<section id="study-setup"><h3>Getting started</h3><p>Begin with a simple workspace, then explore the details one step at a time.</p>'+
   '<pre tabindex="0" aria-label="Fictional code snippet"><code>// Sample interface only\nconst project = { status: "ready" };</code></pre></section>'+
   '<section id="study-reference"><h3>Reference</h3><p>Structured guides, copyable patterns, and clear supporting examples belong here.</p></section></div>'+
   '<aside class="study-docs-toc"><span class="eyebrow">ON THIS PAGE</span><a href="#study-start">Introduction</a><a href="#study-setup">Getting started</a><a href="#study-reference">Reference</a></aside></section>';
 }
 return null;
}
export const sampleChapterCSS=`.study-chapter{padding:clamp(65px,8vw,120px) var(--g);border-top:1px solid var(--line);color:var(--ink);background:var(--bg)}.study-chapter-head{max-width:1180px;margin:0 auto 45px}.study-chapter h2{font:620 clamp(45px,5.5vw,83px)/1.08 var(--display);letter-spacing:-.055em;max-width:16ch;margin:16px 0 20px}.study-chapter p{font:400 clamp(15px,1.5vw,18px)/1.55 Arial;max-width:60ch}.study-plan-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;max-width:1300px;margin:auto}.study-plan{border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);padding:clamp(23px,3vw,50px);display:flex;flex-direction:column;gap:18px;min-height:355px}.study-plan h3{font:650 clamp(26px,2.8vw,41px)/1.11 var(--display);letter-spacing:-.04em;margin:18px 0 10px}.study-plan strong{font:650 15px/1.3 Arial}.study-plan p{font-size:14px;opacity:.75}.study-plan a{margin-top:auto;font:700 13px Arial;text-underline-offset:5px}.study-docs{display:grid;grid-template-columns:minmax(140px,.78fr) minmax(0,2.3fr) minmax(130px,.65fr);gap:clamp(20px,3vw,65px);max-width:1480px;margin:auto}.study-docs-side,.study-docs-toc{align-self:start;position:sticky;top:15px;display:flex;flex-direction:column;gap:18px;font:500 13px/1.4 Arial}.study-docs-side a,.study-docs-toc a{text-decoration:none;opacity:.65}.study-docs-side a:hover,.study-docs-toc a:hover{opacity:1;color:var(--accent)}.study-docs-body{min-width:0}.study-docs-body h2{font-size:clamp(39px,4.6vw,72px);margin-bottom:40px}.study-docs-body section{border-top:1px solid var(--line);padding:32px 0 45px}.study-docs-body section h3{font:650 clamp(23px,2.4vw,32px)/1.1 var(--display);margin-bottom:15px}.study-docs-body pre{background:#1d1d23;color:#b6e6c7;border-radius:10px;padding:24px;font:500 13px/1.5 ui-monospace,monospace;overflow-x:auto;max-width:100%;white-space:pre-wrap;overflow-wrap:anywhere;margin:25px 0 0}@media(max-width:900px){.study-plan-grid{grid-template-columns:1fr}.study-plan{min-height:260px}.study-docs{grid-template-columns:1fr;gap:35px}.study-docs-side,.study-docs-toc{position:static;flex-direction:row;flex-wrap:wrap;gap:13px}.study-docs-toc{display:none}}@media(max-width:550px){.study-chapter{padding-inline:clamp(20px,5vw,32px)}.study-chapter h2{font-size:clamp(37px,10vw,57px)}}`;
