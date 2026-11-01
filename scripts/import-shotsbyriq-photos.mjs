import {readFile,writeFile,mkdir} from "node:fs/promises";
import {join} from "node:path";
// Public photo carousel imports for an independent design study.
// All source URLs are from the photographer's own public post pages.
// No private Instagram API, credentials, or customer files are read.
const CDN_SUFFIXES=[".cdninstagram.com",".fbcdn.net"];
const isAllowed=url=>{try{const x=new URL(url);return x.protocol==="https:"&&CDN_SUFFIXES.some(s=>x.hostname.endsWith(s))&&x.pathname.toLowerCase().endsWith(".jpg")}catch{return false}};
export async function importShotsByRiqPhotos(publicDir){
 const manifest=JSON.parse(await readFile("preview/shotsbyriq/instagram-sources.json","utf8"));
 if(!Array.isArray(manifest.images)||manifest.images.length!==9)throw new Error("Expected nine verified photographer source images");
 let html=await readFile("preview/shotsbyriq/index.html","utf8");
 const paths=new Set();
 const photosDir=join(publicDir,"shotsbyriq","photos");await mkdir(photosDir,{recursive:true});
 const results=await Promise.all(manifest.images.map(async image=>{
  if(!/^[a-z0-9-]+\.jpg$/.test(image.file)||paths.has(image.file)||!isAllowed(image.url)||!/^https:\/\/www\.instagram\.com\/shotsbyriq_\/p\/[a-zA-Z0-9_-]+\/$/.test(image.post))throw new Error("Invalid public photography source entry");
  paths.add(image.file);
  try{
   const response=await fetch(image.url,{signal:AbortSignal.timeout(16000),headers:{"User-Agent":"Mozilla/5.0 (compatible; AweConceptsPortfolioPreview/1.0)","Referer":"https://www.instagram.com/","Accept":"image/avif,image/webp,image/jpeg,image/*"}});
   if(!response.ok)throw new Error("HTTP "+response.status);
   const type=response.headers.get("content-type")||"";
   if(!type.startsWith("image/"))throw new Error("Unexpected image media type "+type);
   const bytes=Buffer.from(await response.arrayBuffer());
   if(bytes.length<4000||bytes.length>6500000||bytes[0]!==255||bytes[1]!==216)throw new Error("Invalid JPEG response ("+bytes.length+" bytes)");
   await writeFile(join(photosDir,image.file),bytes);
   // Replace all uses of each time-limited post image with a permanent
   // same-origin local file for the published preview snapshot.
   html=html.replaceAll(image.url,"/shotsbyriq/photos/"+image.file);
   return {id:image.id,imported:true,bytes:bytes.length};
  }catch(error){console.warn("Instagram image direct import unavailable for "+image.id+": "+String(error.message));return {id:image.id,imported:false,error:String(error.message)}}
 }));
 html=html.replaceAll("/preview/shotsbyriq/styles.css","/shotsbyriq/styles.css").replaceAll("/preview/shotsbyriq/site.js","/shotsbyriq/site.js");
 await writeFile(join(publicDir,"shotsbyriq","index.html"),html);
 await writeFile(join(publicDir,"shotsbyriq","import-status.json"),JSON.stringify({snapshot:"Instagram public source photographs",count:results.filter(r=>r.imported).length,requested:results.length,assets:results},null,2));
 const imported=results.filter(r=>r.imported).length;
 console.log("SHOTSBYRIQ: imported "+imported+"/"+results.length+" original Instagram post image files into isolated Hosting. Failed imports retain their direct Instagram CDN source as temporary fallback.");
 return {count:imported,results};
}