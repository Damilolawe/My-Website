import sharp from "sharp";
import { fail } from "./backend.mjs";
export async function inspectUpload(file) {
  if (!file || file.size < 1 || file.size > 4 * 1024 * 1024)
    fail("Each file must be between 1 byte and 4 MB.");
  let bytes = Buffer.from(await file.arrayBuffer());
  let mime = file.type;
  if (["image/jpeg", "image/png", "image/webp"].includes(mime)) {
    try {
      bytes = await sharp(bytes, {
        limitInputPixels: 20000000,
        animated: false,
      })
        .rotate()
        .resize({
          width: 1800,
          height: 1800,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 82 })
        .toBuffer();
      mime = "image/webp";
    } catch {
      fail("The image could not be decoded. Use a valid JPEG, PNG or WebP.");
    }
  } else if (mime === "application/pdf") {
    if (bytes.subarray(0, 5).toString() !== "%PDF-") fail("Invalid PDF file.");
  } else if (
    mime ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    if (
      bytes.readUInt32LE(0) !== 0x04034b50 ||
      !bytes.includes(Buffer.from("[Content_Types].xml")) ||
      !bytes.includes(Buffer.from("word/document.xml"))
    )
      fail("Invalid DOCX file.");
  } else fail("Use JPEG, PNG, WebP, PDF or DOCX.");
  return { bytes, mime };
}
