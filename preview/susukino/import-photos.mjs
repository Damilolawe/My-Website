import {mkdir,readFile,writeFile} from "node:fs/promises";
const manifest=JSON.parse(await readFile("preview/susukino/instagram-sources.json","utf8"));
const out="branded-previews/public/susukino/assets";
const embeddedFiles=new Set(["photo-01.jpg","photo-02.jpg","photo-03.jpg","photo-06.jpg","photo-08.jpg","photo-10.jpg"]);
const embedded=new Map();
await mkdir(out,{recursive:true});
const fallback="https://images.squarespace-cdn.com/content/v1/67d098b46c116641dd43048a/0966128e-2aae-4fab-8ee9-44725d8d4484/2024-08-28.jpg";
async function download(url){const res=await fetch(url,{headers:{"User-Agent":"Mozilla/5.0 (compatible; AweConceptsDesign/1.0)","Accept":"image/avif,image/webp,image/apng,image/*,*/*;q=0.8"},signal:AbortSignal.timeout(17000)});if(!res.ok||!(res.headers.get("content-type")||"").startsWith("image/"))throw new Error("Image request failed "+res.status);const b=Buffer.from(await res.arrayBuffer());if(b.byteLength<4000||b.byteLength>6000000)throw Error("Invalid image size "+b.byteLength);return b}
const results=await Promise.all(manifest.images.map(async item=>{let data;let source="instagram";try{data=await download(item.url)}catch(e){try{data=await download(fallback);source="restaurant-interior-fallback"}catch(again){return{file:item.file,source:"failed",error:String(e)+"; "+String(again)}}}await writeFile(out+"/"+item.file,data);if(embeddedFiles.has(item.file))embedded.set(item.file,data.toString("base64"));return{file:item.file,source,bytes:data.byteLength}}));

const extraAssets=[
{file:"restaurant-interior.jpg",urls:["https://images.squarespace-cdn.com/content/v1/67d098b46c116641dd43048a/0966128e-2aae-4fab-8ee9-44725d8d4484/2024-08-28.jpg",manifest.images[0].url],origin:"published-restaurant-interior"},
{file:"ramen-set.jpg",urls:["https://doordash-static.s3.amazonaws.com/media/store/header/a7d1e07c-dd15-4948-81c1-e23d058a4b77.jpg","https://img.cdn4dd.com/cdn-cgi/image/fit%3Dcover%2Cwidth%3D600%2Cheight%3D400%2Cformat%3Dauto%2Cquality%3D80/https%3A/doordash-static.s3.amazonaws.com/media/store/header/a7d1e07c-dd15-4948-81c1-e23d058a4b77.jpg",manifest.images[7].url],origin:"restaurant-ordering-menu"}
];
const extras=await Promise.all(extraAssets.map(async asset=>{
let data,source;
for(let i=0;i<asset.urls.length;i++)try{data=await download(asset.urls[i]);source=i===0?asset.origin:"verified-restaurant-image-fallback";break}catch(error){}
if(!data)throw Error("No valid restaurant asset for "+asset.file);
await writeFile(out+"/"+asset.file,data);
return{file:asset.file,bytes:data.byteLength,source};
}));
let html=await readFile("branded-previews/public/susukino/index.html","utf8");
let script=await readFile("branded-previews/public/susukino/site.js","utf8");
for(const [file,base64] of embedded){const data="data:image/jpeg;base64,"+base64;html=html.replaceAll("/susukino/assets/"+file,data);script=script.replaceAll(file,data)}
await writeFile("branded-previews/public/susukino/index.html",html);
await writeFile("branded-previews/public/susukino/site.js",script);
await writeFile("branded-previews/public/susukino/import-status.json",JSON.stringify({images:results,extras,instagram:results.filter(x=>x.source==="instagram").length},null,2));
if(results.some(x=>x.source==="failed"))throw Error("Susukino imagery missing; refused to deploy a broken preview: "+JSON.stringify(results.filter(x=>x.source==="failed")));
console.log("Susukino media imported to first-party hosting:",results.map(r=>r.source).join(", "));
