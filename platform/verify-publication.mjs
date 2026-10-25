import { hasUnsafeExecutableMarkup } from "./safe-video-frames.mjs";
// Verify the owner-approved website before sending a customer delivery email.
// Works with standalone Firebase static HTML, the older sandboxed Firebase
// viewer, and the original direct HTML serving path.
const fail=(message)=>{throw Error(message);};
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function verifyStaticPage(html, version, assets) {
  const marker='<meta name="awe-approved-version" content="'+version+'">';
  if(!UUID.test(version) || !html.includes(marker) ||
      !/^<!doctype html>/i.test(html.slice(0,60)) ||
      hasUnsafeExecutableMarkup(html))return null;
  const names=[];
  for(const id of assets) {
    if(!UUID.test(id))fail("Published static asset reference is invalid.");
    const matches=html.match(new RegExp('src="assets/'+id+'\\.(jpg|png|webp)"','g'))||[];
    if(!matches.length) {
      // Some approved assets are intentionally not displayed by a template,
      // but are still selected. Do not allow them to bypass verification.
      continue;
    }
    const ext=/\.(jpg|png|webp)"/.exec(matches[0])?.[1];
    if(!ext)fail("Invalid static asset extension.");
    names.push("assets/"+id+"."+ext);
  }
  return names;
}
async function verifyApprovedSubpages(fetcher,siteUrl,version,requiredPages) {
  const base=siteUrl.replace(/\/$/, "");
  for (const name of requiredPages) {
    if (!["research.html","work.html","features.html","studio.html","journal.html","contact.html"].includes(name))
      fail("Unexpected approved document.");
    const response=await fetcher(base+"/"+name,{
      method:"GET",redirect:"error",cache:"no-store",signal:AbortSignal.timeout(15000)
    });
    if (!response.ok) fail("Multi-page website is awaiting deployment.");
    const html=await response.text();
    if (!/^<!doctype html>/i.test(html.slice(0,60)) ||
        !html.includes('<meta name="awe-approved-version" content="'+version+'">') ||
        !/<h1(?:\s|>)/i.test(html) || hasUnsafeExecutableMarkup(html))
      fail("Multi-page publication verification failed.");
  }
}
export async function verifyPublication({siteUrl, publicApiUrl, version, assets=[], requiredPages=[], fetcher=fetch}) {
  const published=await fetcher(siteUrl,{
    method:"GET",redirect:"follow",cache:"no-store",signal:AbortSignal.timeout(15000)
  });
  if(!published.ok)fail("Published website is not reachable.");
  if(published.url && new URL(published.url).origin!==new URL(siteUrl).origin)
    fail("Published website redirected to an unexpected origin.");
  const current=published.headers.get("x-awe-version");
  if(current===version) {
    for(const id of assets) {
      const response=await fetcher(siteUrl.replace(/\/$/,"")+"/assets/"+id,{
        method:"HEAD",redirect:"error",cache:"no-store",signal:AbortSignal.timeout(10000)
      });
      if(!response.ok)fail("Published website asset verification failed.");
    }
    await verifyApprovedSubpages(fetcher,siteUrl,version,requiredPages);
    return {url:siteUrl,version,mode:"direct"};
  }
  const html=await published.text();
  const staticAssets=verifyStaticPage(html,version,assets);
  if(staticAssets) {
    for(const asset of staticAssets) {
      const response=await fetcher(siteUrl.replace(/\/$/,"")+"/"+asset,{
        method:"HEAD",redirect:"error",cache:"no-store",signal:AbortSignal.timeout(10000)
      });
      if(!response.ok)fail("A published static image is missing.");
    }
    // Check that the PUBLIC Supabase pointer is still this exact version.
    const approved=await fetcher(publicApiUrl,{
      method:"GET",redirect:"error",cache:"no-store",
      headers:{Accept:"application/json"},
      signal:AbortSignal.timeout(15000)
    });
    if(!approved.ok)fail("Website approval has been revoked.");
    const data=await approved.json();
    if(data?.version!==version)fail("Published site no longer matches owner approval.");
    await verifyApprovedSubpages(fetcher,siteUrl,version,requiredPages);
    return {url:siteUrl,version,mode:"static"};
  }
  if(requiredPages.length) fail("Multi-page website is awaiting static publication.");
  if(!html.includes('data-awe-public-viewer="v1"'))
    fail("The public website host is not running an approved viewer or static page.");
  const approved=await fetcher(publicApiUrl,{
    method:"GET",redirect:"error",cache:"no-store",
    headers:{Accept:"application/json"},
    signal:AbortSignal.timeout(15000)
  });
  if(!approved.ok)fail("The website is not publicly approved.");
  const data=await approved.json();
  if(data?.version!==version||typeof data.html!=="string"||
      !/^<!doctype html>/i.test(data.html.slice(0,100)))
    fail("Published website version could not be verified.");
  for(const id of assets) {
    const response=await fetcher(publicApiUrl+"/assets/"+id,{
      method:"HEAD",redirect:"error",cache:"no-store",
      signal:AbortSignal.timeout(10000)
    });
    if(!response.ok)fail("Published website asset verification failed.");
  }
  return {url:siteUrl,version,mode:"viewer"};
}
