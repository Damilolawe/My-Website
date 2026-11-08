import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Text-based pictographs render inconsistently between operating systems and
// often turn premium web-design icons into colored emoji. Preview websites
// must use authored SVG, vector assets or CSS shapes for decorative icons.
const FORBIDDEN_DECORATIVE_GLYPHS = /[\u{1F000}-\u{1FAFF}\u2190-\u21FF\u2600-\u27BF\uFE0E\uFE0F\u200D]/gu;
const SOURCE_EXTENSIONS = /\.(?:html|css|js)$/i;

export function detectDecorativeGlyphs(source) {
  const hits = [];
  for (const match of source.matchAll(FORBIDDEN_DECORATIVE_GLYPHS)) {
    const before = source.slice(0, match.index);
    hits.push({
      glyph: match[0],
      line: before.split("\n").length,
      codepoint: "U+" + match[0].codePointAt(0).toString(16).toUpperCase()
    });
  }
  return hits;
}

export async function auditPreviewGlyphs(root = "preview") {
  const failures = [];
  async function inspect(folder) {
    for (const entry of await readdir(folder, { withFileTypes: true })) {
      const path = join(folder, entry.name);
      if (entry.isDirectory()) await inspect(path);
      else if (entry.isFile() && SOURCE_EXTENSIONS.test(entry.name)) {
        const text = await readFile(path, "utf8");
        for (const match of detectDecorativeGlyphs(text)) {
          failures.push(`${path}:${match.line} uses ${match.glyph} (${match.codepoint}). Replace with an SVG or CSS-designed element.`);
        }
      }
    }
  }
  await inspect(root);
  return failures;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const failures = await auditPreviewGlyphs();
  if (failures.length) {
    for (const violation of failures) console.error(violation);
    process.exitCode = 1;
  } else {
    console.log("Preview icon audit passed: no Unicode emoji, dingbats or decorative arrows.");
  }
}

// Preview-only release trigger: distinct designs, 2026-11-08. No runtime change.

// Preview-only release trigger: editorial v2 and original-site link removal, 2026-11-08.

// Preview-only release retry: allow independent booking and menu service links.
// Preview-only deployment of Claude redesign checkpoint 63fee837 (no runtime changes).
