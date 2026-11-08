// Portfolio-wide browser QA for the branded preview host.
//
// Usage:
//   NODE_USE_ENV_PROXY=1 node scripts/build-branded-previews.mjs
//   node scripts/qa-portfolio.mjs                 # every site, every page
//   node scripts/qa-portfolio.mjs kora-bakery tbili   # selected sites
//   QA_HOME_ONLY=1 node scripts/qa-portfolio.mjs  # homepages only
//
// Serves branded-previews/public locally, opens each page at desktop
// (1440x900) and mobile (390x844), saves full-page screenshots to
// artifacts/portfolio-qa/<date>/<slug>/ and writes machine-readable results to
// qa/portfolio-qa/results.json (merged per site, so partial runs accumulate).
// Screenshots are evidence for a person to look at; these checks only
// supplement that inspection.
import { chromium } from "playwright";
import { createServer } from "node:http";
import { mkdir, readFile, readdir, writeFile, stat } from "node:fs/promises";
import { resolve, extname, sep, join } from "node:path";
import { execSync } from "node:child_process";
import { findOriginalSiteLinks } from "./preview-link-policy.mjs";

const root = resolve(process.env.QA_ROOT || "branded-previews/public");
// Serve with the same Content-Security-Policy as the live preview host so
// blocked images, fonts, frames and inline scripts surface as console errors.
const hostingHeaders = JSON.parse(await readFile("branded-previews/firebase.json", "utf8")).hosting.headers[0].headers;
const csp = hostingHeaders.find(h => h.key === "Content-Security-Policy").value;
const date = new Date().toISOString().slice(0, 10);
const shotsDir = resolve("artifacts/portfolio-qa", date);
const resultsPath = resolve(process.env.QA_RESULTS || (process.env.QA_ROOT ? process.env.QA_ROOT + "/../qa-results.json" : "qa/portfolio-qa/results.json"));
const commit = (() => { try { return execSync("git rev-parse --short HEAD").toString().trim(); } catch { return "unknown"; } })();

const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".json": "application/json", ".woff2": "font/woff2" };
const server = createServer(async (req, res) => {
  try {
    let uri = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname);
    let file = resolve(root, "." + (uri.endsWith("/") ? uri + "index.html" : uri));
    if (file !== root && !file.startsWith(root + sep)) throw Error("bad path");
    // Firebase cleanUrls: /slug/menu -> /slug/menu.html
    try { if ((await stat(file)).isDirectory()) file = join(file, "index.html"); }
    catch { if (!extname(file)) file += ".html"; }
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": mime[extname(file)] || "application/octet-stream", "Cache-Control": "no-store", "Content-Security-Policy": csp });
    res.end(body);
  } catch { res.writeHead(404); res.end("Not found"); }
});
await new Promise(ok => server.listen(0, "127.0.0.1", ok));
const base = "http://127.0.0.1:" + server.address().port;

const manifest = JSON.parse(await readFile(join(root, "preview-manifest.json"), "utf8"));
const wanted = process.argv.slice(2);
const sites = manifest.sites.filter(s => !wanted.length || wanted.includes(s.slug));
const homeOnly = process.env.QA_HOME_ONLY === "1";

const placeholderPattern = /illustrative stock|placeholder|image coming soon|sample content|demo content|lorem ipsum|subject to confirmation|notes from the concept|representative image/i;
const emojiPattern = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F2FF}]/u;

async function pagesFor(slug) {
  const dir = join(root, slug);
  const list = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith(".html") && entry.name !== "404.html") list.push(entry.name);
  }
  list.sort((a, b) => (a === "index.html" ? -1 : b === "index.html" ? 1 : a.localeCompare(b)));
  return homeOnly ? list.filter(n => n === "index.html") : list;
}

const executablePath = process.env.CHROMIUM_PATH || (await stat("/opt/pw-browsers/chromium").then(() => "/opt/pw-browsers/chromium", () => undefined));
const browser = await chromium.launch({ headless: true, executablePath, args: ["--disable-dev-shm-usage"] });
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844, isMobile: true, hasTouch: true },
];

async function checkPage(context, slug, file, view) {
  const page = await context.newPage();
  const consoleErrors = [], failed = [];
  page.on("console", m => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 200)); });
  page.on("pageerror", e => consoleErrors.push("pageerror: " + String(e.message).slice(0, 200)));
  page.on("requestfailed", r => failed.push(r.url().slice(0, 160) + " " + (r.failure()?.errorText || "")));
  page.on("response", r => { if (r.status() >= 400) failed.push(r.status() + " " + r.url().slice(0, 160)); });
  const rec = { page: file, view: view.name, issues: [] };
  try {
    const url = base + "/" + slug + "/" + (file === "index.html" ? "" : file);
    const resp = await page.goto(url, { waitUntil: "load", timeout: 30000 });
    if (!resp || !resp.ok()) rec.issues.push("page did not load");
    // Scroll through so lazy images and reveal animations trigger, then return to top.
    await page.evaluate(async () => {
      document.querySelectorAll("img").forEach(i => { i.loading = "eager"; });
      const step = innerHeight * 0.8;
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
      scrollTo(0, 0);
      await Promise.race([Promise.all([...document.images].map(i => i.decode().catch(() => null))), new Promise(r => setTimeout(r, 8000))]);
    });
    await page.waitForTimeout(400);
    const m = await page.evaluate(({ placeholderSrc, emojiSrc }) => {
      const issues = [];
      const vw = document.documentElement.clientWidth;
      const sw = document.documentElement.scrollWidth;
      if (sw > vw + 2) issues.push("horizontal overflow " + sw + "px > " + vw + "px");
      for (const img of document.images) {
        if (img.complete && img.naturalWidth === 0 && getComputedStyle(img).display !== "none") issues.push("broken image " + (img.getAttribute("src") || "").slice(0, 120));
        if (!img.hasAttribute("alt")) issues.push("image without alt " + (img.getAttribute("src") || "").slice(0, 80));
      }
      for (const a of document.querySelectorAll('a[href^="#"]')) {
        const id = decodeURIComponent(a.getAttribute("href").slice(1));
        if (id && !document.getElementById(id)) issues.push("broken anchor #" + id);
      }
      for (const a of document.querySelectorAll("a")) {
        const h = a.getAttribute("href");
        if (h === null || h === "" || h === "#" || /^javascript:/i.test(h)) issues.push("non-functional link: " + a.textContent.trim().slice(0, 40));
      }
      for (const el of document.querySelectorAll("h1,h2,h3")) {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        if (el.scrollWidth > el.clientWidth + 4 && cs.overflowX !== "visible") issues.push("clipped heading: " + el.textContent.trim().slice(0, 50));
        const r = el.getBoundingClientRect();
        if (r.width && (r.right > vw + 4 || r.left < -4)) issues.push("heading outside viewport: " + el.textContent.trim().slice(0, 50));
      }
      const text = document.body.innerText;
      const ph = text.match(new RegExp(placeholderSrc, "i"));
      if (ph) issues.push("placeholder text: " + ph[0]);
      const em = text.match(new RegExp(emojiSrc, "u"));
      if (em) issues.push("emoji in copy: " + em[0]);
      const credit = document.querySelector('#awe-design-credit a[href^="https://aweconcepts.com"]');
      if (!credit || !/Designed by/i.test(credit.textContent)) issues.push("missing Awe Concepts footer credit");
      const h1 = document.querySelectorAll("h1").length;
      if (h1 !== 1) issues.push("h1 count " + h1);
      return { issues, title: document.title, height: document.documentElement.scrollHeight, images: document.images.length };
    }, { placeholderSrc: placeholderPattern.source, emojiSrc: emojiPattern.source });
    rec.issues.push(...m.issues);
    rec.title = m.title; rec.height = m.height; rec.images = m.images;

    if (view.name === "mobile") {
      // Find a visible menu toggle and confirm it reveals navigation links.
      const toggle = await page.$('[data-menu], button[aria-controls], .menu-toggle, .nav-toggle, button[aria-label*="menu" i], button[aria-label*="navigation" i]');
      if (toggle && await toggle.isVisible()) {
        const before = await page.evaluate(() => [...document.querySelectorAll("header a, nav a")].filter(a => { const r = a.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.top < innerHeight; }).length);
        await toggle.click();
        await page.waitForTimeout(500);
        const after = await page.evaluate(() => [...document.querySelectorAll("header a, nav a")].filter(a => { const r = a.getBoundingClientRect(); const cs = getComputedStyle(a); return r.width > 0 && r.height > 0 && r.top < innerHeight && cs.visibility !== "hidden" && Number(cs.opacity) > 0.1; }).length);
        rec.menu = { before, after };
        if (after <= before) rec.issues.push("mobile menu toggle did not reveal links");
        await toggle.click().catch(() => {});
        await page.waitForTimeout(300);
      } else {
        rec.menu = "no-toggle";
      }
    }
    if (consoleErrors.length) rec.issues.push(...consoleErrors.map(e => "console: " + e));
    if (failed.length) rec.issues.push(...[...new Set(failed)].map(f => "request: " + f));
    const dir = join(shotsDir, slug);
    await mkdir(dir, { recursive: true });
    rec.screenshot = join("artifacts/portfolio-qa", date, slug, file.replace(/\.html$/, "") + "-" + view.name + ".jpg");
    await page.screenshot({ path: resolve(rec.screenshot), fullPage: true, type: "jpeg", quality: 62 });
  } catch (e) {
    rec.issues.push("exception: " + String(e.message).slice(0, 200));
  }
  await page.close();
  return rec;
}

async function staticChecks(slug, files) {
  const issues = [];
  for (const file of files) {
    const html = await readFile(join(root, slug, file), "utf8");
    for (const link of findOriginalSiteLinks(html)) issues.push(file + ": original-site link " + link);
    for (const m of html.matchAll(/<a\b[^>]*\bhref="(\.\/|\/)?([^"#?:]+\.html|[^"#?:]*\/)?(?:#[^"]*)?"/g)) {
      const target = m[2];
      if (!target || m[1] === "/") continue;
      try { await stat(join(root, slug, target.endsWith("/") ? target + "index.html" : target)); }
      catch { issues.push(file + ": broken internal link " + target); }
    }
  }
  return issues;
}

let existing = {};
try { existing = JSON.parse(await readFile(resultsPath, "utf8")).sites || {}; } catch {}
const queue = [...sites];
const workers = Array.from({ length: Number(process.env.QA_WORKERS || 4) }, async () => {
  const contexts = Object.fromEntries(await Promise.all(viewports.map(async v => [v.name, await browser.newContext({ viewport: { width: v.width, height: v.height }, isMobile: !!v.isMobile, hasTouch: !!v.hasTouch, deviceScaleFactor: 1, reducedMotion: "no-preference" })])));
  while (queue.length) {
    const site = queue.shift();
    const files = await pagesFor(site.slug);
    const result = { slug: site.slug, checkedAt: new Date().toISOString(), commit, pages: files, static: await staticChecks(site.slug, files), views: [] };
    for (const file of files) for (const v of viewports) result.views.push(await checkPage(contexts[v.name], site.slug, file, v));
    const count = result.static.length + result.views.reduce((n, r) => n + r.issues.length, 0);
    result.automatedIssueCount = count;
    existing[site.slug] = result;
    console.log((count ? "ISSUES " : "ok     ") + site.slug.padEnd(48) + " pages=" + files.length + " issues=" + count);
  }
  await Promise.all(Object.values(contexts).map(c => c.close()));
});
await Promise.all(workers);
await browser.close();
server.close();
await mkdir(resolve(resultsPath, ".."), { recursive: true });
await writeFile(resultsPath, JSON.stringify({ updatedAt: new Date().toISOString(), note: "Automated checks only. Visual sign-off is recorded in qa/awe-concepts-master-progress.json.", sites: existing }, null, 1) + "\n");
console.log("Results:", resultsPath, "Screenshots:", shotsDir);
