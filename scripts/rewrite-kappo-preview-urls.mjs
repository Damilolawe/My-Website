import { readFile, writeFile } from "node:fs/promises";

// The same restaurant concept is hosted both at the root of an isolated
// Firebase preview channel and inside the main Awe Concepts site.
// Firebase cleanUrls removes .html, so relative CSS, script and home links
// can resolve one directory too high when the URL lacks a trailing slash.
export const KAPPO_EMBEDDED_BASE = "/preview/kappo-sono/";
export const KAPPO_PAGES = [
  "index.html", "menu.html", "story.html",
  "gallery.html", "visit.html", "404.html",
];

export function toEmbeddedKappoUrls(html) {
  if (typeof html !== "string") throw new TypeError("Expected HTML source");
  return html.replace(
    /\b(href|src)="\/(styles\.css|site\.js|index\.html|menu\.html|story\.html|gallery\.html|visit\.html)?"/g,
    (_match, attribute, resource) => `${attribute}="${KAPPO_EMBEDDED_BASE}${resource || ""}"`,
  );
}

export async function rewriteKappoPreviewPages(directory) {
  for (const file of KAPPO_PAGES) {
    const path = `${directory}/${file}`;
    const original = await readFile(path, "utf8");
    const rewritten = toEmbeddedKappoUrls(original);
    if (original === rewritten) throw new Error(`No Kappo URLs rewritten in ${path}`);
    await writeFile(path, rewritten);
  }
}
