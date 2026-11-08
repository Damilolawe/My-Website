// Rebuild qa/awe-concepts-master-progress.json from:
//   - the site inventory (preview folders on the build allowlist),
//   - each site's own record, preview/<slug>/site-record.json (written by
//     whoever redesigns/inspects that site; never published),
//   - automated results in qa/portfolio-qa/results.json.
// Per-site records keep parallel work from editing one shared file.
//
//   node scripts/update-master-progress.mjs
import { readFile, writeFile, readdir } from "node:fs/promises";

const STATUSES = ["not-started", "in-progress", "code-complete", "visually-verified", "deployed", "client-ready", "blocked"];
const build = await readFile("scripts/build-branded-previews.mjs", "utf8");
const prospectSlugs = JSON.parse(build.match(/const batchOneSlugs = (\[[^\]]+\])/)[1]);
const bespoke = ["kappo-sono", "otaku-haven", "shotsbyriq", "jay-millz-shot-em", "pace-sbdc", "susukino", "bao-dumpling", "mesa-bar", "casa-serra", "solerum", "jj-deli", "chong"];
const folders = (await readdir("preview", { withFileTypes: true })).filter(e => e.isDirectory()).map(e => e.name);
const inventory = [...bespoke.map(slug => ({ slug, family: "bespoke-build" })), ...prospectSlugs.map(slug => ({ slug, family: "prospect" }))];
const unpublished = folders.filter(f => f !== "prospect-shared" && !inventory.some(s => s.slug === f));

let qa = {};
try { qa = JSON.parse(await readFile("qa/portfolio-qa/results.json", "utf8")).sites; } catch {}
let previous = {};
try { previous = Object.fromEntries(JSON.parse(await readFile("qa/awe-concepts-master-progress.json", "utf8")).sites.map(s => [s.slug, s])); } catch {}

const sites = [];
for (const { slug, family } of inventory) {
  let record = {};
  try { record = JSON.parse(await readFile(`preview/${slug}/site-record.json`, "utf8")); } catch {}
  const auto = qa[slug];
  const prev = previous[slug] || {};
  const status = STATUSES.includes(record.status) ? record.status : "not-started";
  sites.push({
    slug,
    name: record.name || prev.name || slug,
    url: `https://preview.aweconcepts.com/${slug}/`,
    sourceDirectory: `preview/${slug}/`,
    family,
    status,
    researchStatus: record.researchStatus || "not-started",
    verifiedBusinessInfo: record.verifiedBusinessInfo || {},
    sources: record.sources || [],
    designDirection: record.designDirection || "",
    pages: record.pages || auto?.pages || [],
    modifiedFiles: record.modifiedFiles || [],
    problemsFound: record.problemsFound || [],
    fixesImplemented: record.fixesImplemented || [],
    desktopQA: record.desktopQA || "not-inspected",
    mobileQA: record.mobileQA || "not-inspected",
    functionalQA: record.functionalQA || "not-inspected",
    automatedQA: auto ? { checkedAt: auto.checkedAt, commit: auto.commit, issueCount: auto.automatedIssueCount, pages: auto.pages.length } : null,
    deploymentStatus: record.deploymentStatus || prev.deploymentStatus || "not-deployed-from-this-branch",
    commit: record.commit || prev.commit || null,
    outstandingIssues: record.outstandingIssues || [],
  });
}
const count = key => Object.fromEntries(STATUSES.map(s => [s, sites.filter(x => x[key] === s).length]));
await writeFile("qa/awe-concepts-master-progress.json", JSON.stringify({
  updatedAt: new Date().toISOString(),
  totals: { sites: sites.length, byStatus: count("status") },
  unpublishedPreviewFolders: unpublished,
  statusDefinitions: {
    "not-started": "No individual redesign or inspection yet (shared fixes may still apply).",
    "in-progress": "Being redesigned or repaired.",
    "code-complete": "Individual redesign written; not yet visually inspected at both sizes.",
    "visually-verified": "Desktop 1440x900 and mobile 390x844 screenshots inspected by eye, functional checks passed.",
    "deployed": "Visually verified and confirmed live on preview.aweconcepts.com.",
    "client-ready": "Deployed and every acceptance criterion met.",
    "blocked": "Cannot proceed; see outstandingIssues.",
  },
  sites,
}, null, 1) + "\n");
console.log("Master progress:", sites.length, "sites", count("status"), "unpublished folders:", unpublished);
