import { readdir, stat, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ROOT = path.join(PROJECT_ROOT, "dist");
const FREE_STORAGE_BYTES = 10 * 1024 ** 3;
const BANNED_SEGMENTS = new Set([".git", ".github", ".netlify", "node_modules", "platform", "supabase", "netlify"]);
const BANNED_FILES = new Set([".env", ".env.local", ".env.production", ".env.example", "netlify.toml", "package-lock.json"]);

function isSecretPath(relativePath) {
  const segments = relativePath.split("/");
  return segments.some((part) => BANNED_SEGMENTS.has(part) || BANNED_FILES.has(part) || part.startsWith(".env."));
}
async function collect(dir, prefix = "") {
  const items = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const relative = prefix ? prefix + "/" + entry.name : entry.name;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) items.push(...await collect(fullPath, relative));
    else if(entry.isSymbolicLink()) throw Error('Symlink is forbidden in Firebase output: '+relative);
    else if (entry.isFile()) {
      const info = await stat(fullPath);
      items.push({ path: relative, bytes: info.size });
    }
  }
  return items;
}
function formatBytes(bytes) {
  if (bytes >= 1024 ** 2) return (bytes / (1024 ** 2)).toFixed(2) + " MiB";
  if (bytes >= 1024) return (bytes / 1024).toFixed(1) + " KiB";
  return String(bytes) + " B";
}
export async function hostingAudit(root = ROOT) {
  const files = await collect(root);
  const totalBytes = files.reduce((sum, item) => sum + item.bytes, 0);
  const html = files.filter((f) => f.path.endsWith(".html"));
  const media = files.filter((f) => /\.(png|jpe?g|webp|avif|gif|svg|mp4|webm|woff2?|ttf|otf)$/i.test(f.path));
  const unsafe = files.filter((f) => isSecretPath(f.path));
  if (unsafe.length) throw Error("Unsafe private files in Firebase output: " + unsafe.map(f=>f.path).join(", "));
  const largest = [...files].sort((a, b) => b.bytes - a.bytes).slice(0, 15);
  const indexed = new Map(files.map((f) => ["/" + f.path, f.bytes]));
  const home = await readFile(path.join(root, "index.html"), "utf8");
  const linkedPaths = [...home.matchAll(/(?:src|href)=["'](\/?[^"'#?]+)["']/g)]
    .map((m) => m[1]).filter((v) => !/^(?:https?:|data:|mailto:|tel:)/i.test(v))
    .map((v) => "/" + v.replace(/^\/+/, ""));
  const uniqueHomeAssets = [...new Set(linkedPaths)].filter((p) => indexed.has(p));
  const homeBytes = Buffer.byteLength(home) + uniqueHomeAssets.reduce((sum, p) => sum + indexed.get(p), 0);
  return {
    files: files.length, pages: html.length, mediaFiles: media.length,
    totalBytes, totalFormatted: formatBytes(totalBytes),
    sparkStorageUsedPercent: Math.round((totalBytes / FREE_STORAGE_BYTES) * 10000) / 100,
    homeReferencedBytes: homeBytes,
    homeReferencedFormatted: formatBytes(homeBytes),
    largest: largest.map((f) => ({ ...f, formatted: formatBytes(f.bytes) })),
    unsafePaths: unsafe.map((f) => f.path),
    note: "Sizes are uncompressed build-file bytes, not measured browser transfer or Firebase billed bandwidth.",
  };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const report = await hostingAudit();
    console.log("Awe Concepts Firebase Hosting public-output audit");
    console.log("Public files: " + report.files + " | HTML pages: " + report.pages);
    console.log("Stored bytes: " + report.totalFormatted + " (" + report.sparkStorageUsedPercent + "% of 10 GiB reference allowance)");
    console.log("Homepage + same-origin directly referenced assets: " + report.homeReferencedFormatted);
    console.log("Largest assets:");
    for (const f of report.largest) console.log("  " + f.formatted.padStart(10) + " " + f.path);
    if (report.unsafePaths.length) {
      console.error("ERROR: private/server paths found in publish output: " + report.unsafePaths.join(", "));
      process.exitCode = 1;
    } else {
      console.log("Static output contains no known private/server directories or environment files.");
    }
    console.log(report.note);
  } catch (error) {
    console.error("Build first with npm run build. " + error.message);
    process.exitCode = 1;
  }
}
