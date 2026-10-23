import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import sharp from "sharp";
import { sanitizeImage, cleanJpeg, cleanPng } from "../supabase/functions/awe-api/platform/image-sanitize.mjs";

const bytes = value => new Uint8Array(value);
const raw = async ({width=20,height=12,format="jpeg"}={}) =>
  sharp({create:{width,height,channels:3,background:"#2266aa"}})[format]().toBuffer();
const crcTable = Array.from({length:256},(_,i)=>{
  let c=i;for(let j=0;j<8;j++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;
});
function crc(payload) {
  let c=0xffffffff;
  for (const value of payload) c=crcTable[(c^value)&255]^(c>>>8);
  return (c^0xffffffff)>>>0;
}
function pngChunk(type,content) {
  const name=Buffer.from(type,"ascii");
  const out=Buffer.alloc(content.length+12);
  out.writeUInt32BE(content.length,0);
  name.copy(out,4);
  Buffer.from(content).copy(out,8);
  out.writeUInt32BE(crc(out.subarray(4,8+content.length)),8+content.length);
  return out;
}
test("A valid JPEG stays decodable and drops EXIF/APP and comment metadata",async()=>{
  const jpeg=await raw();
  const secret=Buffer.from("Exif\0\0GPS-CONFIDENTIAL-location-1234");
  const app=Buffer.alloc(secret.length+4);
  app[0]=255;app[1]=225;app.writeUInt16BE(secret.length+2,2);secret.copy(app,4);
  const withExif=Buffer.concat([jpeg.subarray(0,2),app,jpeg.subarray(2)]);
  const result=sanitizeImage(bytes(withExif),"image/jpeg");
  assert.equal(result.mime,"image/jpeg");
  assert.equal(Buffer.from(result.bytes).includes(Buffer.from("GPS-CONFIDENTIAL")),false);
  const metadata=await sharp(result.bytes).metadata();
  assert.equal(metadata.width,20);
  assert.equal(metadata.height,12);
});
test("A valid PNG stays decodable while private tEXt metadata is removed",async()=>{
  const png=await raw({format:"png"});
  const secret=pngChunk("tEXt",Buffer.from("GPS\0private-location-9876"));
  const withText=Buffer.concat([png.subarray(0,33),secret,png.subarray(33)]);
  const result=sanitizeImage(bytes(withText),"image/png");
  assert.equal(result.mime,"image/png");
  assert(!Buffer.from(result.bytes).includes(Buffer.from("private-location")));
  const meta=await sharp(result.bytes).metadata();
  assert.equal(meta.width,20);
  assert.equal(meta.height,12);
});
test("PNG invalid CRCs and corrupt structural headers fail closed",async()=>{
  const png=await raw({format:"png"});
  const corrupted=Buffer.from(png);
  corrupted[17]^=1;
  assert.throws(()=>cleanPng(bytes(corrupted)),/checksum/);
  const truncated=png.subarray(0,png.length-8);
  assert.throws(()=>cleanPng(bytes(truncated)),/end marker|encoding|chunk/);
});
test("Oversized pixel dimensions are rejected independent of compressed bytes",async()=>{
  const png=Buffer.from(await raw({format:"png"}));
  png.writeUInt32BE(3000,16);png.writeUInt32BE(2500,20);
  png.writeUInt32BE(crc(png.subarray(12,29)),29);
  assert.throws(()=>cleanPng(bytes(png)),/pixel limits/);
  const jpeg=Buffer.from(await raw());
  const sof=jpeg.indexOf(Buffer.from([255,192]));
  assert(sof>0);
  jpeg.writeUInt16BE(3500,sof+5);
  jpeg.writeUInt16BE(2500,sof+7);
  assert.throws(()=>cleanJpeg(bytes(jpeg)),/pixel limits/);
});
test("Missing file signature or unsupported MIME never reaches object storage",async()=>{
  assert.throws(()=>sanitizeImage(new Uint8Array([1,2,3]),"image/jpeg"));
  assert.throws(()=>sanitizeImage(new Uint8Array(30),"image/jpeg"));
  assert.throws(()=>sanitizeImage(new Uint8Array(30),"image/png"));
  assert.throws(()=>sanitizeImage(new Uint8Array(30),"image/webp"));
  assert.throws(()=>sanitizeImage(new Uint8Array(4_194_305),"image/png"));
});
test("Edge's image normalization cannot boot the unsupported native image codec",async()=>{
  const file = p => readFile(new URL("../"+p,import.meta.url),"utf8");
  const edge=await file("supabase/functions/awe-api/platform/uploads.mjs");
  const map=JSON.parse(await file("supabase/functions/awe-api/deno.json"));
  const browser=await file("app/image-upload.mjs");
  const client=await file("app/service-client.mjs");
  assert(edge.includes("sanitizeImage(bytes,mime)"));
  assert(!edge.includes("imagescript"));
  assert(!("imagescript" in map.imports));
  assert(client.includes("prepareImageUpload(payload)"));
  assert(browser.includes('new File([output]'));
  assert(browser.includes("canvas.toBlob"));
  assert(browser.includes("URL.revokeObjectURL"));
  assert(browser.includes("image/webp"));
});
