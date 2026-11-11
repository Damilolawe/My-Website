import { readFile, writeFile } from "node:fs/promises";

// Reuse the committed thumbnails while restoring main hosting from Firebase.
// Normal npm run build and GitHub visual QA retain their original behavior.
process.env.AWE_USE_COMMITTED_THUMBNAILS = "1";
await import("./build.mjs");

// Carry the CURRENT Firebase security headers across to Cloudflare instead
// of deploying the older _headers file with mismatched Supabase allowances.
const config = JSON.parse(await readFile("firebase.json", "utf8"));
const headers = (config.hosting.headers || []).map(rule => {
  const path = rule.source === "**" ? "/*" : rule.source.replace(/\/\*\*$/, "/*");
  return [
    path,
    ...rule.headers.map(header => `  ${header.key}: ${header.value}`)
  ].join("\n");
});
await writeFile("dist/_headers", headers.join("\n\n") + "\n");

// Preserve Firebase's existing dynamic page viewer rewrite.
await writeFile("dist/_redirects", "/sites/* /site-viewer.html 200\n");
console.log("Cloudflare main build complete: security headers and site-viewer route preserved.");
