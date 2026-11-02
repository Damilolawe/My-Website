import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Durable first-party snapshots of public Instagram portfolio photography.
// Expiring Instagram media links are never left in the deployed HTML.
// An unavailable new source preserves a formerly published snapshot, and a
// first deployment can fall back to the photographer's Acuity-hosted images.
const host = "https://awe-concepts-previews.web.app";
const directory = "/jay-millz-shot-em/photos/";

async function getJpeg(url) {
  const parsed = new URL(url);
  const instagram = parsed.hostname.endsWith(".cdninstagram.com") || parsed.hostname.endsWith(".fbcdn.net");
  const published = parsed.origin === host && parsed.pathname.startsWith(directory);
  if (parsed.protocol !== "https:" || (!instagram && !published) || !parsed.pathname.endsWith(".jpg"))
    throw new Error("Disallowed media source");
  const response = await fetch(url, {
    signal: AbortSignal.timeout(12000),
    headers: { "Accept": "image/jpeg,image/*", "User-Agent": "Mozilla/5.0 (compatible; AweConceptsPublicPreview/1.0)", "Referer": "https://www.instagram.com/" }
  });
  if (!response.ok) throw new Error("Media HTTP " + response.status);
  const type = response.headers.get("content-type") || "";
  if (!/^image\/(?:jpeg|jpg)/i.test(type)) throw new Error("Unsupported image type: " + type);
  const data = Buffer.from(await response.arrayBuffer());
  if (data.length < 3500 || data.length > 7500000 || data[0] !== 255 || data[1] !== 216)
    throw new Error("Invalid JPEG contents");
  return data;
}

export async function importJayMillzPhotos(publicDir) {
  const source = JSON.parse(await readFile("preview/jay-millz-shot-em/instagram-sources.json", "utf8"));
  if (!Array.isArray(source.images) || source.images.length !== 9)
    throw new Error("Jay Millz public portfolio manifest must contain exactly nine images");
  const folder = join(publicDir, "jay-millz-shot-em", "photos");
  await mkdir(folder, { recursive: true });
  const results = await Promise.all(source.images.map(async (image, i) => {
    if (image.id !== i + 1 || image.file !== "frame-" + String(i + 1).padStart(2, "0") + ".jpg")
      throw new Error("Invalid portfolio manifest entry");
    const candidates = [
      { url: image.url, source: "public-instagram-profile" },
      { url: host + directory + image.file, source: "published-photo-snapshot" }
    ];
    for (const candidate of candidates) {
      try {
        const data = await getJpeg(candidate.url);
        await writeFile(join(folder, image.file), data);
        return { id: image.id, file: image.file, imported: true, source: candidate.source, bytes: data.length };
      } catch {
        // A source can disappear or become rate limited; move to safe fallback.
      }
    }
    return { id: image.id, file: image.file, imported: false, source: "photographer-acuity-image-fallback" };
  }));
  let html = await readFile("preview/jay-millz-shot-em/index.html", "utf8");
  let imageIndex = 0;
  html = html.replace(/<img\b[^>]*?\bsrc="([^"]+)"[^>]*>/g, (tag, original) => {
    const photo = results[imageIndex++];
    if (!photo || !photo.imported) return tag;
    return tag.replace(original, directory + photo.file);
  });
  if (imageIndex !== source.images.length)
    throw new Error("Photo mapping changed; inspect current Jay Millz HTML before shipping");
  await writeFile(join(publicDir, "jay-millz-shot-em", "index.html"), html);
  await writeFile(join(publicDir, "jay-millz-shot-em", "import-status.json"),
    JSON.stringify({ photographer: "Jay Millz Shot Em", count: results.filter(x => x.imported).length, requested: results.length, assets: results }, null, 2));
  console.log("Jay Millz: first-party photographs " + results.filter(x => x.imported).length +
    "/9; other photographs use photographer's Acuity images with broken-photo fallback.");
  return results;
}