// Publish ONLY the individually verified, no-independent-website-found concepts.
// The approved active set is a machine-readable allowlist, not a hardcoded
// array: qa/active-previews-allowlist.json is the single source of truth.
// Every other source site remains under preview/<slug>/ in GitHub but is
// pruned from the live Firebase Hosting output, the public index and the
// preview manifest. A prospect is NEVER published merely because it appears in
// prospect research — it must be added to the allowlist only after verification.
import assert from 'node:assert/strict';
import {readFile,readdir,rm,writeFile} from 'node:fs/promises';
import {applyAweDesignCredit} from '../shared/brand-credit.mjs';

const dir='branded-previews/public';
const allowlistPath='qa/active-previews-allowlist.json';
const allowlist=JSON.parse(await readFile(allowlistPath,'utf8'));
assert.ok(Array.isArray(allowlist.active)&&allowlist.active.length>0,'Allowlist must list at least one active preview.');

// Normalise + validate every allowlist entry.
const selection=allowlist.active.map(e=>{
  assert.ok(e&&typeof e.slug==='string'&&/^[a-z0-9-]+$/.test(e.slug),'Invalid allowlist slug: '+JSON.stringify(e));
  assert.ok(typeof e.name==='string'&&e.name.trim(),'Allowlist entry missing display name: '+e.slug);
  return [e.slug,e.name,e.group||'uncategorized'];
});
const allowed=new Set(selection.map(s=>s[0]));
assert.equal(allowed.size,selection.length,'Allowlist contains duplicate slugs.');

// Security floor: the original verified core (existing-19) must always remain
// published, so the live restriction cannot be silently emptied or bypassed.
const requiredCore=allowlist.active.filter(e=>e.group===allowlist.requiredCoreGroup).map(e=>e.slug);
assert.ok(requiredCore.length>=19,'The 19-site verified core must stay on the allowlist (found '+requiredCore.length+').');
for(const slug of requiredCore) assert.ok(allowed.has(slug),'Required core slug missing from active set: '+slug);

const manifestPath=dir+'/preview-manifest.json';
const manifest=JSON.parse(await readFile(manifestPath,'utf8'));
const dirs=(await readdir(dir,{withFileTypes:true})).filter(e=>e.isDirectory()).map(e=>e.name);

// Every active slug must have been built AND be present in the manifest.
for(const [slug] of selection)
  assert.ok(dirs.includes(slug)&&manifest.sites.some(s=>s.slug===slug),'Missing active site (not built): '+slug);

// Prune every directory that is not on the allowlist (archived sources never leak).
for(const slug of dirs) if(!allowed.has(slug))
  await rm(dir+'/'+slug,{recursive:true,force:true});

manifest.sites=manifest.sites.filter(s=>allowed.has(s.slug));
manifest.inventoryCount=selection.length;
manifest.publishingPolicy=allowlist.policy||('Only '+selection.length+' verified concepts on live Hosting; all other sources remain archived in GitHub.');
await writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n');

const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cards=selection.map(([slug,name],i)=>
 '<a class="preview" href="/'+slug+'/" aria-label="View independent '+escape(name)+' website concept"><small>'+
 String(i+1).padStart(2,'0')+'</small><strong>'+escape(name)+'</strong><span>View concept</span></a>').join('\n');
const html=[
'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#0b0b0b"><title>Website Previews | Awe Concepts</title>',
'<link rel="icon" type="image/svg+xml" href="/favicon.svg?v=awe-brand-20261111"><link rel="icon" type="image/png" sizes="192x192" href="/favicon.png?v=awe-brand-20261111"><link rel="shortcut icon" href="/favicon.ico?v=awe-brand-20261111"><link rel="apple-touch-icon" href="/favicon.png?v=awe-brand-20261111">',
'<style>:root{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color-scheme:dark}*{box-sizing:border-box}body{margin:0;min-height:100vh;background:#0b0b0b;color:#f8f8f4}main{max-width:980px;margin:auto;padding:clamp(28px,6vw,72px) 22px 90px}a{color:inherit}.brand{text-decoration:none;font-weight:800;letter-spacing:.04em;font-size:17px}.brand span{color:#c6ff00}.eyebrow{color:#c6ff00;text-transform:uppercase;letter-spacing:.19em;font-weight:700;font-size:12px;margin:70px 0 14px}h1{font-size:clamp(42px,8vw,86px);line-height:1.03;letter-spacing:-.055em;margin:0 0 22px}.intro{max-width:680px;color:#b7b7b1;line-height:1.75;margin:0 0 44px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.preview{display:flex;align-items:center;gap:18px;min-width:0;min-height:92px;padding:20px;border:1px solid #363630;border-radius:12px;text-decoration:none;transition:border-color .2s,background .2s}.preview:hover,.preview:focus-visible{border-color:#c6ff00;background:#1b1d16}.preview small{font-size:12px;color:#c6ff00}.preview strong{font-size:clamp(15px,2vw,19px);min-width:0}.preview span{margin-left:auto;font-size:12px;color:#b7b7b1;white-space:nowrap}.note{margin-top:38px;color:#94948e;line-height:1.7;font-size:12px}@media(max-width:650px){.grid{grid-template-columns:1fr}.eyebrow{margin-top:55px}}@media(prefers-reduced-motion:reduce){.preview{transition:none}}</style>',
'</head><body><main><a class="brand" href="https://aweconcepts.com/" aria-label="Awe Concepts homepage">AWE<span>/</span>CONCEPTS</a><p class="eyebrow">Selected website concepts / '+selection.length+'</p><h1>Ideas, made visible.</h1><p class="intro">'+selection.length+' independently developed website concepts for potential clients. These are unofficial design studies by Awe Concepts, not websites operated by or endorsed by the businesses featured.</p><div class="grid">'+cards+'</div><p class="note">Business website availability must be rechecked before outreach. Concepts can be fully modified for the client.</p></main></body></html>'
].join('\n');
await writeFile(dir+'/index.html',applyAweDesignCredit(html));

// Post-prune invariants: the public output is EXACTLY the allowlist, nothing else.
const after=(await readdir(dir,{withFileTypes:true})).filter(e=>e.isDirectory()).map(e=>e.name);
assert.equal(after.length,selection.length,'Public dir does not match allowlist size.');
assert.ok(after.every(s=>allowed.has(s)),'An un-allowlisted directory survived pruning.');
assert.ok(requiredCore.every(s=>after.includes(s)),'A required core site was pruned.');
assert.equal(manifest.sites.length,selection.length);
const rendered=await readFile(dir+'/index.html','utf8');
assert.equal((rendered.match(/class="preview"/g)||[]).length,selection.length);
assert.match(rendered,/data-awe-design-credit="v1"/);
console.log('Selected '+selection.length+' public sites from allowlist; other '+(dirs.length-selection.length)+' retained only in GitHub sources.');
