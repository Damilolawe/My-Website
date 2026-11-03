import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { applyAweDesignCredit } from "../shared/brand-credit.mjs";
import { KAPPO_PAGES, toEmbeddedKappoUrls } from "./rewrite-kappo-preview-urls.mjs";
import { auditPreviewGlyphs } from "./validate-preview-icons.mjs";
import { importShotsByRiqPhotos } from "./import-shotsbyriq-photos.mjs";
import { importJayMillzPhotos } from "../preview/jay-millz-shot-em/import-photos.mjs";
import { buildPaceSbdc } from "../preview/pace-sbdc/build.mjs";
import { detailSlugs } from "../preview/pace-sbdc/deep-content.mjs";
import { mediaSlugs } from "../preview/pace-sbdc/media-content.mjs";

// Only an explicit list of PUBLIC, independently labeled concept pages is
// allowed on this separate host. Never copy dist/, Supabase data, customer
// orders, unpublished client drafts or admin resources into this directory.
const forbiddenIcons = await auditPreviewGlyphs("preview");
if (forbiddenIcons.length) throw new Error(
  "Branded preview build blocked: replace text emoji / decorative arrows with SVG or CSS.\\n" +
  forbiddenIcons.join("\\n")
);
const output = "branded-previews/public";
const publicKappo = `${output}/kappo-sono`;
const publicOtaku = `${output}/otaku-haven`;
const publicBao = `${output}/bao-dumpling`;
const publicMesa = `${output}/mesa-bar`;
const publicCasa = `${output}/casa-serra`;
const publicSolerum = `${output}/solerum`;
const publicJjDeli = `${output}/jj-deli`;
const publicChong = `${output}/chong`;
await rm(output, { recursive: true, force: true });
await mkdir(publicKappo, { recursive: true });
await mkdir(publicOtaku, { recursive: true });
await mkdir(publicBao, { recursive: true });
await mkdir(publicMesa, { recursive: true });
await mkdir(publicCasa, { recursive: true });
await mkdir(publicSolerum, { recursive: true });
await mkdir(publicJjDeli, { recursive: true });
await mkdir(publicChong, { recursive: true });
for (const asset of ["index.html", "styles.css", "site.js"]) {
  await cp(`preview/bao-dumpling/${asset}`, `${publicBao}/${asset}`);
  await cp(`preview/mesa-bar/${asset}`, `${publicMesa}/${asset}`);
  await cp(`preview/casa-serra/${asset}`, `${publicCasa}/${asset}`);
  await cp(`preview/solerum/${asset}`, `${publicSolerum}/${asset}`);
  await cp(`preview/jj-deli/${asset}`, `${publicJjDeli}/${asset}`);
}
await mkdir(`${publicBao}/assets`, { recursive: true });
await cp("preview/bao-dumpling/assets/gold-street-spread.webp", `${publicBao}/assets/gold-street-spread.webp`);
for (const asset of ["index.html", "story.html", "menu.html", "styles.css", "site.js"]) {
  await cp(`preview/chong/${asset}`, `${publicChong}/${asset}`);
}
await cp("preview/chong/assets", `${publicChong}/assets`, { recursive: true });
for (const asset of ['index.html', 'styles.css', 'site.js']) {
  await cp(`preview/otaku-haven/${asset}`, `${publicOtaku}/${asset}`);
}
for (const asset of ["styles.css", "site.js"]) {
  await cp(`preview/kappo-sono/${asset}`, `${publicKappo}/${asset}`);
}
for (const file of KAPPO_PAGES) {
  const html = await readFile(`preview/kappo-sono/${file}`, "utf8");
  await writeFile(`${publicKappo}/${file}`, toEmbeddedKappoUrls(html, "/kappo-sono/"));
}
// Photographer-specific independent portfolio concept, with direct source
// photos fetched from the original public Instagram posts, never screenshot crops.
// Independent, public Jay Millz Shot Em portfolio proposal.
await mkdir(`${output}/jay-millz-shot-em`, { recursive: true });
for (const asset of ["index.html", "styles.css", "site.js"]) {
  await cp(`preview/jay-millz-shot-em/${asset}`, `${output}/jay-millz-shot-em/${asset}`);
}
await importJayMillzPhotos(output);
await mkdir(`${output}/shotsbyriq`, { recursive: true });
for (const asset of ["styles.css","site.js"]) await cp(`preview/shotsbyriq/${asset}`, `${output}/shotsbyriq/${asset}`);
await importShotsByRiqPhotos(output);
// Public-only, seven-page Pace SBDC redesign concept.
await buildPaceSbdc(`${output}/pace-sbdc`);
await mkdir(`${output}/susukino`,{recursive:true});
for (const asset of ["index.html","styles.css","site.js"]) await cp(`preview/susukino/${asset}`,`${output}/susukino/${asset}`);
await import("../preview/susukino/import-photos.mjs");
// Original Susukino logo from the user-provided Instagram screenshot, committed locally to prevent expiring remote branding links.
await cp("preview/susukino/assets/restaurant-logo.jpg", `${output}/susukino/assets/restaurant-logo.jpg`);
// Motion assets are explicitly versioned only on the isolated preview host.
const animationRevision = "motion-20261102";
const otakuAnimationRevision = "motion-20261102-always-3";
const riqCollageRevision = "motion-20261102-collage-1";
for (const page of [
  ...KAPPO_PAGES.map(name => "kappo-sono/" + name),
  "otaku-haven/index.html", "bao-dumpling/index.html", "mesa-bar/index.html", "casa-serra/index.html", "solerum/index.html", "jj-deli/index.html", "chong/index.html", "chong/story.html", "chong/menu.html", "shotsbyriq/index.html", "jay-millz-shot-em/index.html",
  ...["index","services","about","stories","events","resources","contact","team","teambio","locations","library","media","partners","spanish",...detailSlugs,...mediaSlugs].map(name=>"pace-sbdc/"+name+".html")
]) {
  const path = output + "/" + page;
  const html = await readFile(path, "utf8");
  const revision = page.startsWith("otaku-haven/") ? otakuAnimationRevision : page.startsWith("shotsbyriq/") ? riqCollageRevision : animationRevision;
  const updated = html.replace(
    /(href|src)="((?:\.\/|\/(?:kappo-sono|otaku-haven|bao-dumpling|mesa-bar|casa-serra|solerum|jj-deli|shotsbyriq|jay-millz-shot-em|pace-sbdc|chong)\/)(?:styles\.css|site\.js))(?:\?[^"]*)?"/g,
    (_, attr, asset) => attr + '="' + asset + "?v=" + revision + '"'
  );
  if (updated === html || !updated.includes("styles.css?v=" + revision) ||
      (!page.endsWith("404.html") && !updated.includes("site.js?v=" + revision))) {
    throw new Error("Preview motion assets not versioned for " + page);
  }
  await writeFile(path, updated);
}

const landing = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="theme-color" content="#0b0b0b"><title>Website Previews | Awe Concepts</title><style>
:root{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color-scheme:dark}*{box-sizing:border-box}body{background:#0b0b0b;color:#f7f7f1;margin:0;min-height:100vh}main{max-width:960px;margin:0 auto;padding:clamp(36px,7vw,84px) 24px}a{color:inherit}.brand{font-size:14px;font-weight:700;letter-spacing:.07em;text-decoration:none}.accent{color:#c6ff00}.eyebrow{margin:clamp(48px,10vw,110px) 0 14px;font-size:11px;letter-spacing:.23em;text-transform:uppercase;color:#c6ff00}h1{font-size:clamp(42px,8vw,94px);letter-spacing:-.06em;line-height:1.03;margin:0 0 18px;max-width:740px}p{max-width:580px;line-height:1.75;color:#bbbcb7}.preview{display:block;margin-top:46px;padding:28px;border:1px solid #373a33;border-radius:12px;text-decoration:none;transition:border-color .2s,transform .2s}.preview:hover,.preview:focus-visible{border-color:#c6ff00;transform:translateY(-2px)}.preview strong{display:block;font-size:23px;font-weight:550}.preview span{display:block;margin-top:8px;color:#bbbcb7;font-size:13px}footer{padding:32px 24px;text-align:center;color:#979992;font-size:12px;border-top:1px solid #292a28}footer a{text-underline-offset:4px}@media(prefers-reduced-motion:reduce){.preview{transition:none}}
</style></head><body><main><a class="brand" href="https://aweconcepts.com/" aria-label="Awe Concepts main website">AWE<span class="accent">/</span>CONCEPTS</a><p class="eyebrow">Selected design studies</p><h1>Ideas, made visible.</h1><p>Awe Concepts creates premium, personalized websites. These publicly shared examples are independent design studies—not official websites for the businesses featured.</p><a class="preview" href="/kappo-sono/" aria-label="Explore unofficial Kappo Sono restaurant design study"><strong>Kappo Sono · Restaurant concept</strong><span>View the independent five-page Japanese dining website study.</span></a><a class="preview" href="/otaku-haven/" aria-label="Explore unofficial Otaku Haven anime social app design study"><strong>Otaku Haven · Anime social app concept</strong><span>Explore the independent animated anime community landing page.</span></a><a class=\"preview\" href=\"/shotsbyriq\" aria-label=\"Explore independent Shotsbyriq photography portfolio concept\"><strong>SHOTSBYRIQ · Photography concept</strong><span>Explore a cinematic NYC photography portfolio design study.</span></a><a class="preview" href="/jay-millz-shot-em/" aria-label="Explore Jay Millz Shot Em photography website concept"><strong>Jay Millz Shot Em · Photography concept</strong><span>Explore the electric-blue NYC photographer website study.</span></a><a class="preview" href="/pace-sbdc/" aria-label="Explore the independent Pace SBDC website redesign"><strong>Pace SBDC · Institutional website redesign</strong><span>Explore the fully rebuilt Pace SBDC website with every original section recreated locally.</span></a><a class="preview" href="/susukino/" aria-label="Explore the independent Susukino ramen restaurant website concept"><strong>Susukino · Ramen &amp; sake concept</strong><span>Explore a red-and-black Japanese ramen, sushi and sake dining experience in FiDi.</span></a><a class="preview" href="/bao-dumpling/" aria-label="Explore the independent Bao Dumpling website concept"><strong>Bao Dumpling · Dumpling house concept</strong><span>Explore a warm, editorial fast-casual experience for the new Gold Street dumpling spot.</span></a><a class="preview" href="/mesa-bar/" aria-label="Explore the independent Mesa Bar pre-opening website concept"><strong>Mesa Bar · Seaport cocktail bar concept</strong><span>Explore a high-desert-inspired pre-opening experience for Historic Front Street.</span></a><a class="preview" href="/casa-serra/" aria-label="Explore the independent Casa Serra pre-opening website concept"><strong>Casa Serra · Seaport Italian concept</strong><span>Explore a greenhouse-inspired pre-opening experience for Historic Front Street.</span></a><a class="preview" href="/solerum/" aria-label="Explore the independent Solerum pre-opening website concept"><strong>Solerum · FiDi fusion restaurant concept</strong><span>Explore a vivid coastal pre-opening experience for 2 Gold Street.</span></a><a class="preview" href="/jj-deli/" aria-label="Explore the independent JJ Deli redesign concept"><strong>JJ Deli · FiDi kosher deli redesign</strong><span>Explore a bold editorial storefront for Trinity Place.</span></a><a class="preview" href="/chong/" aria-label="Explore the independent CHONG Thai tea café redesign concept"><strong>CHONG · Thai tea café redesign</strong><span>Explore a warm, photography-led three-page concept for the East Village café.</span></a></main><footer>Public concepts only. Customer drafts remain private.</footer></body></html>`;
await writeFile(`${output}/index.html`, landing);
await writeFile(`${output}/404.html`, `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Preview unavailable | Awe Concepts</title><body style="background:#0b0b0b;color:#f7f7f1;font:16px/1.6 system-ui;padding:10vw"><h1>Preview not found.</h1><p>This design study may no longer be available.</p><a style="color:#c6ff00" href="/">See public previews</a></body></html>`);
await writeFile(`${output}/robots.txt`, "User-agent: *\nDisallow: /\n");

const stripLegacyAweCredits = html => html
  .replace(/<style\b[^>]*data-awe-credit-style=["']v1["'][^>]*>[\s\S]*?<\/style>/gi, "")
  .replace(/<div\b[^>]*\bid=["']awe-design-credit["'][^>]*>[\s\S]*?<\/div>/gi, "")
  .replace(/<a\b(?=[^>]*class=["'][^"']*\bawe-(?:credit|signature)\b)[^>]*>[\s\S]*?<\/a>/gi, "")
  .replace(/<p\b[^>]*>\s*Designed by\s*<a\b[^>]*href=["']https:\/\/aweconcepts\.com\/?["'][^>]*>[\s\S]*?<\/a>\s*<\/p>/gi, "");

async function standardizeAweCredits(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = directory + "/" + entry.name;
    if (entry.isDirectory()) await standardizeAweCredits(path);
    else if (entry.isFile() && entry.name.endsWith(".html")) {
      const html = await readFile(path, "utf8");
      await writeFile(path, applyAweDesignCredit(stripLegacyAweCredits(html)));
    }
  }
}
await standardizeAweCredits(output);
console.log("Built branded public previews. Only explicitly allowlisted public concepts are included.");
