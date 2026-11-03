import {mkdir,readFile,writeFile} from "node:fs/promises";
const manifest=JSON.parse(await readFile("preview/susukino/instagram-sources.json","utf8"));
const out="branded-previews/public/susukino/assets";
await mkdir(out,{recursive:true});
const fallback="https://images.squarespace-cdn.com/content/v1/67d098b46c116641dd43048a/0966128e-2aae-4fab-8ee9-44725d8d4484/2024-08-28.jpg";
async function download(url){const res=await fetch(url,{headers:{"User-Agent":"Mozilla/5.0 (compatible; AweConceptsDesign/1.0)","Accept":"image/avif,image/webp,image/apng,image/*,*/*;q=0.8"},signal:AbortSignal.timeout(17000)});if(!res.ok||!(res.headers.get("content-type")||"").startsWith("image/"))throw new Error("Image request failed "+res.status);const b=Buffer.from(await res.arrayBuffer());if(b.byteLength<4000||b.byteLength>6000000)throw Error("Invalid image size "+b.byteLength);return b}
const results=await Promise.all(manifest.images.map(async item=>{let data;let source="instagram";try{data=await download(item.url)}catch(e){try{data=await download(fallback);source="restaurant-interior-fallback"}catch(again){return{file:item.file,source:"failed",error:String(e)+"; "+String(again)}}}await writeFile(out+"/"+item.file,data);return{file:item.file,source,bytes:data.byteLength}}));
await writeFile("branded-previews/public/susukino/import-status.json",JSON.stringify({images:results,instagram:results.filter(x=>x.source==="instagram").length},null,2));
if(results.some(x=>x.source==="failed"))throw Error("Susukino imagery missing; refused to deploy a broken preview: "+JSON.stringify(results.filter(x=>x.source==="failed")));
console.log("Susukino media imported to first-party hosting:",results.map(r=>r.source).join(", "));
