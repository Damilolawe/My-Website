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
  // The About image must come from Jay's own personal Instagram, not a
  // client session or temporary external URL. Keep a locally hosted copy.
  const aboutSource = JSON.parse(await readFile("preview/jay-millz-shot-em/about-source.json", "utf8"));
  if (aboutSource.file !== "about-jay.jpg" ||
      aboutSource.account !== "itsjaymillz" ||
      !/^https:\/\/www\.instagram\.com\/itsjaymillz\/p\/[A-Za-z0-9_-]+\/$/.test(aboutSource.post))
    throw new Error("Unverified Jay Millz personal portrait source");
  let about = null;
  let aboutBytes = null;
  for (const candidate of [
    { url: aboutSource.url, source: "original-personal-instagram-post" },
    { url: host + directory + aboutSource.file, source: "published-personal-photo-snapshot" }
  ]) {
    try {
      const data = await getJpeg(candidate.url);
      await writeFile(join(folder, aboutSource.file), data);
      aboutBytes = data;
      about = { file: aboutSource.file, post: aboutSource.post, imported: true, bytes: data.length, source: candidate.source };
      break;
    } catch {
      // Reuse the previously hosted photo if Instagram rotates the source.
    }
  }
  if (!about) throw new Error("Jay Millz personal About photo unavailable; preserve the last working release rather than publish an incorrect image.");
  let html = await readFile("preview/jay-millz-shot-em/index.html", "utf8");
  let imageIndex = 0;
  html = html.replace(/<img\b[^>]*?\bsrc="([^"]+)"[^>]*>/g, (tag, original) => {
    const photo = results[imageIndex++];
    if (tag.includes('data-about-portrait="personal"')) {
      if (!about?.imported || !photo) throw new Error("Personal About image mapping failed");
      return tag.replace(original, "data:image/jpeg;base64," + aboutBytes.toString("base64"));
    }
    if (!photo || !photo.imported) return tag;
    return tag.replace(original, directory + photo.file);
  });
  if (imageIndex !== source.images.length)
    throw new Error("Photo mapping changed; inspect current Jay Millz HTML before shipping");
  await writeFile(join(publicDir, "jay-millz-shot-em", "index.html"), html);
  await writeFile(join(publicDir, "jay-millz-shot-em", "import-status.json"),
    JSON.stringify({ photographer: "Jay Millz Shot Em", count: results.filter(x => x.imported).length, requested: results.length, assets: results, about }, null, 2));
  console.log("Jay Millz: first-party photographs " + results.filter(x => x.imported).length +
    "/9; other photographs use photographer's Acuity images with broken-photo fallback.");
  return results;
}