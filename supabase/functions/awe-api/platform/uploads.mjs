// Import image codecs only within upload handling to keep account APIs bootable.
import { Buffer } from 'node:buffer';
import { fail } from './backend.mjs';
// Images are re-encoded without input metadata. WebP is converted to PNG by the client.
export async function inspectUpload(file) {
  if(!file||file.size<1||file.size>4194304)fail('Each file must be between 1 byte and 4 MB.');
  let bytes=Buffer.from(await file.arrayBuffer()), mime=file.type;
  if(['image/png','image/jpeg'].includes(mime)) {
    try {
      // Read dimensions before decoding to prevent oversized decompression allocations.
      let width,height;
      if(mime==='image/png') {
        if(bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error();
        width=bytes.readUInt32BE(16);height=bytes.readUInt32BE(20);
      } else {
        if(bytes.readUInt16BE(0)!==0xffd8)throw Error();
        let i=2;
        while(i<bytes.length-9){if(bytes[i]!==255)throw Error();const marker=bytes[i+1];i+=2;
          if(marker===0xd9||marker===0xda)break;const len=bytes.readUInt16BE(i);
          if(len<2)throw Error();if([0xc0,0xc1,0xc2].includes(marker)){height=bytes.readUInt16BE(i+3);width=bytes.readUInt16BE(i+5);break;}i+=len;}
      }
      if(!width||!height||width*height>4000000)fail('Resize your image to at most 4 megapixels before uploading.');
      const { Image } = await import('imagescript');
      const image=await Image.decode(bytes);
      if(Math.max(width,height)>1600)image.resize(Math.round(width*1600/Math.max(width,height)),Math.round(height*1600/Math.max(width,height)));
      bytes=Buffer.from(await image.encodeJPEG(82));mime='image/jpeg';
    }catch(e){if(e.status)throw e;fail('The image could not be decoded. Use a valid JPEG or PNG.');}
  }else if(mime==='image/webp')fail('Convert this WebP to JPEG or PNG before uploading.');
  else if(mime==='application/pdf'){if(bytes.subarray(0,5).toString()!=='%PDF-')fail('Invalid PDF file.');}
  else if(mime==='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
    if(bytes.length<4||bytes.readUInt32LE(0)!==0x04034b50||!bytes.includes(Buffer.from('[Content_Types].xml'))||!bytes.includes(Buffer.from('word/document.xml')))fail('Invalid DOCX file.');
  }else fail('Use JPEG, PNG, WebP, PDF or DOCX.');
  return {bytes,mime};
}
