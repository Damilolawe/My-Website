import { createHash } from "node:crypto";
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { access, mkdir, readFile, readdir, unlink, writeFile } from "node:fs/promises";
import { join, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import sharp from "sharp";
import { chromium } from "playwright";
import { templates } from "../shared/model.mjs";
import { zipDesignFor } from "../shared/zip-design-catalog.mjs";

const root = resolve(".");
const htmlDir = join(root, "dist/templates");
const assetsDir = join(root, "assets/catalog-thumbnails");
const distAssetsDir = join(root, "dist/assets/catalog-thumbnails");
const manifestPath = join(assetsDir, "manifest.json");
const VERSION = "catalog-shot-v2:1024x661:webp640x413";

function templatePagePath(template) {
  return zipDesignFor(template.id)?.multipage
    ? `${template.id}/home.html`
    : `${template.id}--still.html`;
}

async function readManifest() {
  try { return JSON.parse(await readFile(manifestPath, "utf8")); }
  catch { return { version: VERSION, hashes: {} }; }
}

async function serveDist() {
  const server = createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      const file = resolve(join(root, "dist", pathname.replace(/^\/+/, "")));
      if (!file.startsWith(resolve(root, "dist") + sep)) { res.writeHead(403).end(); return; }
      const data = await readFile(file);
      res.setHeader("Content-Type", file.endsWith(".html") ? "text/html; charset=utf-8" : "application/octet-stream");
      res.setHeader("Cache-Control", "no-store");
      res.writeHead(200).end(data);
    } catch { res.writeHead(404).end("Not found"); }
  });
  await new Promise((ok, fail) => server.listen(0, "127.0.0.1", ok).once("error", fail));
  return { server, origin: `http://127.0.0.1:${server.address().port}` };
}

async function main() {
  await mkdir(assetsDir, { recursive: true });
  await mkdir(distAssetsDir, { recursive: true });
  const previous = await readManifest();
  const current = {};
  const stale = [];
  for (const template of templates) {
    const source = join(htmlDir, templatePagePath(template));
    const html = await readFile(source);
    const hash = createHash("sha256").update(VERSION).update(html).digest("hex");
    current[template.id] = hash;
    const image = join(assetsDir, `${template.id}.webp`);
    try { await access(image); } catch { stale.push(template); continue; }
    if (previous.version !== VERSION || previous.hashes?.[template.id] !== hash) stale.push(template);
  }

  if (stale.length) {
    const { server, origin } = await serveDist();
    let browser;
    try {
      const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || (existsSync("/opt/pw-browsers/chromium-1243/chrome-linux64/chrome") ? "/opt/pw-browsers/chromium-1243/chrome-linux64/chrome" : existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
      browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });
      let cursor = 0;
      const workers = Array.from({ length: Math.min(3, stale.length) }, async () => {
        const page = await browser.newPage({ viewport: { width: 1024, height: 661 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
        await page.emulateMedia({ reducedMotion: "reduce" });
        while (cursor < stale.length) {
          const template = stale[cursor++];
          const url = `${origin}/templates/${templatePagePath(template).split("/").map(encodeURIComponent).join("/")}`;
          await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
          await page.waitForFunction(() => document.readyState === "complete", { timeout: 6000 }).catch(() => {});
          await page.evaluate(async () => Promise.race([
            document.fonts?.ready || Promise.resolve(),
            new Promise(resolve => setTimeout(resolve, 1200)),
          ]));
          // Trigger lazy-loaded hero and below-hero imagery while preserving a consistent viewport.
          const maxScroll = await page.evaluate(() => Math.min(1600, document.documentElement.scrollHeight - innerHeight));
          for (let y = 0; y <= maxScroll; y += 600) await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
          await page.waitForFunction(() => [...document.images].filter(image => {
            const rect = image.getBoundingClientRect();
            return rect.width > 0 && rect.top + scrollY < 1800;
          }).every(image => image.complete && image.naturalWidth > 0), { timeout: 5000 }).catch(() => {});
          await page.evaluate(() => window.scrollTo(0, 0));
          await page.addStyleTag({ content: ".sample-banner,.demo-banner,.arcade-demo,.fd-demo,.fe-demo,.fg-banner,.lm-banner,.trio-demo,.rw-demo-note{display:none!important}" });
          await page.waitForTimeout(150);
          const screenshot = await page.screenshot({ type: "png", animations: "disabled", timeout: 30000 });
          const imagePath = join(assetsDir, `${template.id}.webp`);
          await sharp(screenshot).resize({ width: 640, height: 413, fit: "cover", position: "top" }).webp({ quality: 78, effort: 4 }).toFile(imagePath);
          console.log(`Captured ${template.id}`);
        }
        await page.close();
      });
      await Promise.all(workers);
    } finally {
      await browser?.close();
      await new Promise(resolve => server.close(resolve));
    }
  }

  for (const name of await readdir(assetsDir)) {
    if (name.endsWith(".webp") && !current[name.slice(0, -5)]) await unlink(join(assetsDir, name));
  }
  await writeFile(manifestPath, JSON.stringify({ version: VERSION, hashes: current }, null, 2) + "\n");
  for (const template of templates) {
    await writeFile(join(distAssetsDir, `${template.id}.webp`), await readFile(join(assetsDir, `${template.id}.webp`)));
  }
  await writeFile(join(distAssetsDir, "manifest.json"), await readFile(manifestPath));
  console.log(`Catalog thumbnail assets ready: ${templates.length} total, ${stale.length} generated.`);
  return { total: templates.length, generated: stale.length };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await main();
export { main as generateTemplateThumbnails };
