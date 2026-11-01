import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

// Nine real photographs are sourced directly from the photographer's public posts.
// Imported photographs live on the isolated, public Firebase preview Hosting site.
// When short-lived Instagram CDN URLs expire, reuse those previously published
// copies rather than publishing broken images or touching the production site.
const CDN_SUFFIXES = [".cdninstagram.com", ".fbcdn.net"];
const ARCHIVE_ORIGIN = "https://awe-concepts-previews.web.app";
const isAllowed = url => {
  try {
    const x = new URL(url);
    return x.protocol === "https:" &&
      CDN_SUFFIXES.some(s => x.hostname.endsWith(s)) &&
      x.pathname.toLowerCase().endsWith(".jpg");
  } catch {
    return false;
  }
};
async function getVerifiedJpeg(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(16000),
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; AweConceptsPortfolioPreview/1.0)",
      "Referer": "https://www.instagram.com/",
      "Accept": "image/jpeg,image/*"
    }
  });
  if (!response.ok) throw new Error("HTTP " + response.status);
  const type = response.headers.get("content-type") || "";
  if (!type.startsWith("image/jpeg") && !type.startsWith("image/jpg"))
    throw new Error("Unexpected image media type: " + type);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 4000 || bytes.length > 6500000 || bytes[0] !== 255 || bytes[1] !== 216)
    throw new Error("Invalid JPEG response (" + bytes.length + " bytes)");
  return bytes;
}

export async function importShotsByRiqPhotos(publicDir) {
  const manifest = JSON.parse(await readFile("preview/shotsbyriq/instagram-sources.json", "utf8"));
  if (!Array.isArray(manifest.images) || manifest.images.length !== 9)
    throw new Error("Expected nine verified photographer source images");

  let html = await readFile("preview/shotsbyriq/index.html", "utf8");
  const paths = new Set();
  const photosDir = join(publicDir, "shotsbyriq", "photos");
  await mkdir(photosDir, { recursive: true });

  const results = await Promise.all(manifest.images.map(async image => {
    if (!/^[a-z0-9-]+\.jpg$/.test(image.file) ||
        paths.has(image.file) ||
        !isAllowed(image.url) ||
        !/^https:\/\/www\.instagram\.com\/shotsbyriq_\/p\/[a-zA-Z0-9_-]+\/$/.test(image.post))
      throw new Error("Invalid public photography source entry");
    paths.add(image.file);

    // Strictly allowlisted, publicly deployed backup prevents future preview
    // regressions when an Instagram signed image URL is rotated or expired.
    const candidates = [
      { url: image.url, source: "original-instagram-post" },
      { url: ARCHIVE_ORIGIN + "/shotsbyriq/photos/" + image.file, source: "published-photo-snapshot" }
    ];
    const problems = [];
    for (const candidate of candidates) {
      try {
        const bytes = await getVerifiedJpeg(candidate.url);
        await writeFile(join(photosDir, image.file), bytes);
        return { id: image.id, imported: true, bytes: bytes.length, source: candidate.source };
      } catch (error) {
        problems.push(candidate.source + ": " + String(error.message));
      }
    }
    return { id: image.id, imported: false, errors: problems };
  }));

  // Never silently deploy broken image URLs. An unsuccessful new build
  // leaves the last working Firebase live release untouched.
  const failures = results.filter(item => !item.imported);
  if (failures.length)
    throw new Error("SHOTSBYRIQ image preservation failed for " +
      failures.map(item => item.id + " (" + item.errors.join("; ") + ")").join(", ") +
      ". The current live preview was not replaced.");

  for (const image of manifest.images)
    html = html.replaceAll(image.url, "/shotsbyriq/photos/" + image.file);
  html = html.replaceAll("/preview/shotsbyriq/styles.css", "/shotsbyriq/styles.css")
             .replaceAll("/preview/shotsbyriq/site.js", "/shotsbyriq/site.js");
  await writeFile(join(publicDir, "shotsbyriq", "index.html"), html);
  await writeFile(join(publicDir, "shotsbyriq", "import-status.json"),
    JSON.stringify({ snapshot: "Instagram public source photographs", count: results.length,
      requested: results.length, assets: results }, null, 2));
  console.log("SHOTSBYRIQ: preserved " + results.length +
    " original photographer post images as same-origin public preview files.");
  return { count: results.length, results };
}
