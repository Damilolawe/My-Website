import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const manifest=JSON.parse(await readFile('qa/111-prospect-revamp.json','utf8'));
const bespoke=new Set(['aoko-matcha','baker-studio','dumbo-oyster-bar','house-of-amrut',
  'jalopy-theatre','jane-s-matcha','petaled','pilates-addiction']);
const marker='awe-distinctive-direction-2026';

test('111 preview prospects have 103 unique bespoke-aware redesign signatures',async()=>{
  assert.equal(manifest.sites.length,111);
  let redesigned=0;
  const signatures=new Set();
  for(const site of manifest.sites){
    const html=await readFile('preview/'+site.slug+'/index.html','utf8');
    const css=await readFile('preview/'+site.slug+'/styles.css','utf8');
    assert.match(html,/Designed by Awe Concepts/,'Missing Awe Concepts credit: '+site.slug);
    if(bespoke.has(site.slug)){
      assert.doesNotMatch(html,new RegExp(marker),'Bespoke site overwritten: '+site.slug);
      continue;
    }
    redesigned++;
    assert.match(html,new RegExp(marker),'Missing unique redesign: '+site.slug);
    assert.match(html,/class="marquee-track"/,'Motion banner missing: '+site.slug);
    assert.match(css,/animation:awe-scroll/,'Motion banner animation lost: '+site.slug);
    assert.match(html,/id="experience"/,'Missing experience anchor: '+site.slug);
    assert.match(html,/id="details"/,'Missing details anchor: '+site.slug);
    assert.match(html,/id="visit"/,'Missing visit anchor: '+site.slug);
    assert.match(html,/class="gallery section"/,'Missing photo gallery: '+site.slug);
    assert.ok(css.includes(marker)||html.includes('<style data-awe-direction='),
      'Missing per-site layout CSS: '+site.slug);
    const id=html.match(/\bdesign-([0-9-]+)"/)?.[1];
    assert.ok(id,'Missing layout fingerprint: '+site.slug);
    assert.ok(!signatures.has(id),'Repeated layout combination: '+site.slug+' / '+id);
    signatures.add(id);
  }
  assert.equal(redesigned,103);
  assert.equal(signatures.size,103);
});

test('Four formerly repeated older previews have their own business-specific structures',async()=>{
  for(const slug of ['chique-collective','loove-labs','one-two-one-cafe','studio-ephemera']){
    const html=await readFile('preview/'+slug+'/index.html','utf8');
    assert.match(html,/data-awe-bespoke-2026/,'Missing bespoke stylesheet: '+slug);
    assert.doesNotMatch(html,/Designed around how people decide\./,'Old generic copy: '+slug);
    assert.match(html,/Designed by Awe Concepts/,'Missing footer credit: '+slug);
    assert.match(html,/id="details"/,'Missing source anchor: '+slug);
  }
});
