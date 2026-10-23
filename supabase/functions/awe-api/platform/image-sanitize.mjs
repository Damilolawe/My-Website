// Edge-safe, dependency-free JPEG/PNG validation and private metadata removal.
// Never pass EXIF, text, GPS, or unrecognized ancillary chunks into public media.
const read32=(b,p)=>(b[p]*16777216+b[p+1]*65536+b[p+2]*256+b[p+3])>>>0;
const read16=(b,p)=>b[p]*256+b[p+1];
const concat=parts=>{
  const out=new Uint8Array(parts.reduce((n,a)=>n+a.length,0));
  let p=0;for(const part of parts){out.set(part,p);p+=part.length;}return out;
};
function dimension(width,height) {
  if (!Number.isInteger(width)||!Number.isInteger(height)||
      width<1||height<1||width*height>4_000_000||width>4096||height>4096)
    throw Error("Image exceeds pixel limits.");
}
export function cleanJpeg(bytes) {
  if(bytes.length<24||bytes[0]!==255||bytes[1]!==216||
      bytes.at(-2)!==255||bytes.at(-1)!==217)throw Error("Invalid JPEG signature.");
  const blocks=[bytes.subarray(0,2)];
  let i=2,foundFrame=false,foundScan=false,seenQuant=false,count=0;
  while(i<bytes.length-2 && count++<512) {
    const start=i;
    if(bytes[i++]!==255)throw Error("Invalid JPEG marker.");
    while(bytes[i]===255 && i<bytes.length-2)i++;
    const marker=bytes[i++];
    if(marker===0||marker===0xd9||(marker>=0xd0&&marker<=0xd7))
      throw Error("Unexpected JPEG marker.");
    if(i+2>bytes.length-2)throw Error("Truncated JPEG segment.");
    const size=read16(bytes,i);
    if(size<2||i+size>bytes.length-2)throw Error("Invalid JPEG segment size.");
    if([0xc0,0xc1,0xc2].includes(marker)) {
      if(size<8)throw Error("Invalid JPEG frame.");
      dimension(read16(bytes,i+5),read16(bytes,i+3));foundFrame=true;
    }
    if(marker===0xdb)seenQuant=true;
    if(marker===0xda) {
      if(!foundFrame||!seenQuant)throw Error("JPEG frame is incomplete.");
      blocks.push(bytes.subarray(start));foundScan=true;break;
    }
    // APP0-APP15, including GPS-bearing EXIF, and COM may contain
    // customer location/private metadata. Drop them all.
    if(!((marker>=0xe0&&marker<=0xef)||marker===0xfe))
      blocks.push(bytes.subarray(start,i+size));
    i+=size;
  }
  if(!foundScan||count>=512)throw Error("Missing JPEG scan.");
  return concat(blocks);
}
const PNG_SIG=new Uint8Array([137,80,78,71,13,10,26,10]);
const CRC_TABLE=Array.from({length:256},(_,i)=>{
 let c=i;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;return c>>>0;
});
function crc(b,start,end) {
 let v=0xffffffff;
 for(let i=start;i<end;i++)v=CRC_TABLE[(v^b[i])&255]^(v>>>8);
 return (v^0xffffffff)>>>0;
}
export function cleanPng(bytes) {
 if(bytes.length<57||!PNG_SIG.every((v,i)=>bytes[i]===v))
   throw Error("Invalid PNG signature.");
 const chunks=[bytes.subarray(0,8)];
 let pos=8,count=0,ihdr=false,idat=false,finished=false;
 while(pos+12<=bytes.length&&count++<512) {
   const len=read32(bytes,pos),end=pos+12+len;
   if(len>4_194_304||end>bytes.length)throw Error("Invalid PNG chunk length.");
   const type=String.fromCharCode(...bytes.subarray(pos+4,pos+8));
   if(!/^[A-Za-z]{4}$/.test(type)||crc(bytes,pos+4,pos+8+len)!==read32(bytes,pos+8+len))
     throw Error("Invalid PNG chunk checksum.");
   if(!ihdr && type!=="IHDR")throw Error("Missing PNG header.");
   if(type==="IHDR") {
     if(ihdr||len!==13)throw Error("Invalid PNG header.");
     dimension(read32(bytes,pos+8),read32(bytes,pos+12));
     if(bytes[pos+20]!==0||bytes[pos+21]!==0||bytes[pos+22]>1)
       throw Error("Unsupported PNG encoding.");
     ihdr=true;
   } else if(type==="IDAT")idat=true;
   else if(type==="IEND"){
     if(len||!idat||end!==bytes.length)throw Error("Incomplete PNG image.");
     finished=true;
   } else if(type!=="PLTE"&&type!=="tRNS"&&type[0]===type[0].toUpperCase())
     throw Error("Unknown required PNG chunk.");
   if(["IHDR","PLTE","tRNS","IDAT","IEND"].includes(type))
     chunks.push(bytes.subarray(pos,end));
   pos=end;
   if(finished)break;
 }
 if(!finished||count>=512)throw Error("Missing PNG end marker.");
 return concat(chunks);
}
export function sanitizeImage(bytes,mime) {
 if(!(bytes instanceof Uint8Array)||bytes.length>4_194_304||bytes.length<24)
   throw Error("Invalid image size.");
 if(mime==="image/jpeg")return {bytes:cleanJpeg(bytes),mime};
 if(mime==="image/png")return {bytes:cleanPng(bytes),mime};
 throw Error("Unsupported image format.");
}
