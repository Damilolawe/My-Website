// Build ONE prospect preview into its own scratch folder, applying the same
// publishing steps as the full build, so several people/agents can work on
// different sites at once without overwriting branded-previews/public.
//
//   node scripts/build-one-preview.mjs <slug>
//   QA_ROOT=artifacts/one/<slug>/public node scripts/qa-portfolio.mjs <slug>
//
// Fails if a page links to an original business website, lacks the
// stylesheet/script references the full build versions, or uses an emoji or
// arrow glyph the full build rejects.
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { applyAweDesignCredit } from "../shared/brand-credit.mjs";
import { stripLegacyAweCredits } from "./preview-publish.mjs";
import { findOriginalSiteLinks } from "./preview-link-policy.mjs";
import { auditPreviewGlyphs } from "./validate-preview-icons.mjs";

const slug = process.argv[2];
if (!slug || !/^[a-z0-9-]+$/.test(slug)) throw new Error("Usage: node scripts/build-one-preview.mjs <slug>");
const out = `artifacts/one/${slug}/public`;
await rm(`artifacts/one/${slug}`, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(`preview/${slug}`, `${out}/${slug}`, { recursive: true, filter: s => !/\.(?:md|json|mjs)$/i.test(s) });
try { await readFile(`preview/${slug}/site.js`); }
catch { await cp("preview/prospect-shared/site.js", `${out}/${slug}/site.js`); }
await cp("favicon.ico", `${out}/favicon.ico`);

const problems = [];
const glyphs = (await auditPreviewGlyphs(`preview/${slug}`)).filter(Boolean);
problems.push(...glyphs.map(g => "glyph: " + g));
const pages = (await readdir(`${out}/${slug}`)).filter(f => f.endsWith(".html"));
for (const page of pages) {
  const path = join(out, slug, page);
  let html = await readFile(path, "utf8");
  for (const link of findOriginalSiteLinks(html)) problems.push(page + ": links to original business site " + link);
  if (page === "index.html" && (!/(?:href)="\.\/styles\.css"/.test(html) || !/src="\.\/site\.js"/.test(html)))
    problems.push("index.html must reference ./styles.css and ./site.js (the full build versions these)");
  if (/<script(?![^>]*\bsrc=)[^>]*>/i.test(html)) problems.push(page + ": inline <script> is blocked by the preview host CSP; use site.js");
  await writeFile(path, applyAweDesignCredit(stripLegacyAweCredits(html)));
}
await writeFile(`${out}/preview-manifest.json`, JSON.stringify({ sites: [{ slug }] }));
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log(`Built ${slug} (${pages.length} page${pages.length === 1 ? "" : "s"}) -> ${out}/${slug}/`);
