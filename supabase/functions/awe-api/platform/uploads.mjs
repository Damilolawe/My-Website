// Validate JPEG/PNG structure and remove location-bearing image metadata.
import { Buffer } from 'node:buffer';
import { fail } from './backend.mjs';
import { sanitizeImage } from './image-sanitize.mjs';
// Edge supports only sanitized JPEG/PNG. The browser converts WebP to JPEG.
export async function inspectUpload(file) {
  if(!file||file.size<1||file.size>4194304)fail('Each file must be between 1 byte and 4 MB.');
  let bytes=Buffer.from(await file.arrayBuffer()), mime=file.type;
  if(['image/png','image/jpeg'].includes(mime)) {
    try {
      const cleaned=sanitizeImage(bytes,mime);
      bytes=Buffer.from(cleaned.bytes);
      mime=cleaned.mime;
    } catch {
      fail('The image is invalid or exceeds 4 megapixels. Use a valid JPEG or PNG.');
    }
  }else if(mime==='image/webp')fail('Use the website editor to convert WebP to a safe JPEG before uploading.');
  else if(mime==='application/pdf'){if(bytes.subarray(0,5).toString()!=='%PDF-')fail('Invalid PDF file.');}
  else if(mime==='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
    if(bytes.length<4||bytes.readUInt32LE(0)!==0x04034b50||!bytes.includes(Buffer.from('[Content_Types].xml'))||!bytes.includes(Buffer.from('word/document.xml')))fail('Invalid DOCX file.');
  }else fail('Use JPEG, PNG, WebP, PDF or DOCX.');
  return {bytes,mime};
}
