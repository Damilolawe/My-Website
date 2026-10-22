import {validateInquiry} from "./validate.mjs";

const SITE_ORIGINS = new Set(["https://awe-digital.web.app", "https://aweconcepts.com", "https://www.aweconcepts.com"]);
const MAX_BODY_BYTES = 12_000;
function json(data, status=200, requestOrigin="") {
  const allowed = SITE_ORIGINS.has(requestOrigin);
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "Vary": "Origin",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "apikey, content-type",
    ...(allowed ? {"Access-Control-Allow-Origin":requestOrigin} : {}),
  };
  return new Response(status === 204 ? null : JSON.stringify(data),{status,headers});
}
async function boundedText(req) {
  const declared = req.headers.get("content-length");
  if (declared && (!/^\d+$/.test(declared) || Number(declared)>MAX_BODY_BYTES))
    throw Object.assign(Error("Request exceeds limit."),{status:413});
  if (!req.body) throw Object.assign(Error("Missing request."),{status:400});
  const reader=req.body.getReader();const parts=[];let bytes=0;
  for (;;) {
    const {done,value}=await reader.read();
    if(done)break;
    bytes+=value.byteLength;
    if(bytes>MAX_BODY_BYTES) {await reader.cancel();throw Object.assign(Error("Request exceeds limit."),{status:413});}
    parts.push(value);
  }
  const merged=new Uint8Array(bytes);let offset=0;
  for(const chunk of parts){merged.set(chunk,offset);offset+=chunk.byteLength;}
  return new TextDecoder("utf-8",{fatal:true}).decode(merged);
}
async function rateFingerprint(req, secret) {
  // Never store raw IP addresses or user-agent strings. Fingerprints expire from
  // the inquiries table when old inquiries are purged under the retention policy.
  const peer = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               req.headers.get("cf-connecting-ip") || "";
  if (!peer) throw Object.assign(Error("Can't verify submission source."),{status:429});
  const bytes = await crypto.subtle.digest("SHA-256",
    new TextEncoder().encode(secret+"\n"+peer));
  return [...new Uint8Array(bytes)].map(v=>v.toString(16).padStart(2,"0")).join("");
}
Deno.serve(async req=>{
  const origin=req.headers.get("origin") || "";
  if (req.method === "OPTIONS")
    return SITE_ORIGINS.has(origin) ? json({ok:true},204,origin) : json({error:"Origin rejected."},403,origin);
  if (req.method !== "POST") return json({error:"Method not allowed."},405,origin);
  if (!SITE_ORIGINS.has(origin)) return json({error:"Origin rejected."},403,origin);
  if (!(req.headers.get("content-type")||"").startsWith("application/json"))
    return json({error:"Send JSON data."},415,origin);
  try {
    const raw=await boundedText(req);
    const submitted=JSON.parse(raw);
    if (submitted.website) return json({ok:true,reference:"received"},200,origin); // Honeypot.
    const cleaned=validateInquiry(submitted);
    const supabaseUrl=Deno.env.get("SUPABASE_URL");
    const serverKey=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const rateSalt=Deno.env.get("AWE_INQUIRY_RATE_SALT") || serverKey; // Secret-only fallback until a dedicated salt is configured.
    if(!supabaseUrl||!serverKey||!rateSalt)
      return json({error:"The inquiry service is not ready. Please try again later."},503,origin);
    const fingerprint=await rateFingerprint(req,rateSalt);
    const response=await fetch(supabaseUrl+"/rest/v1/rpc/awe_submit_inquiry",{
      method:"POST",
      headers:{"apikey":serverKey,"Authorization":"Bearer "+serverKey,
        "Content-Type":"application/json"},
      body:JSON.stringify({
        p_name:cleaned.name,p_email:cleaned.email,p_project:cleaned.project,
        p_message:cleaned.message,p_fingerprint:fingerprint
      }),
      signal:AbortSignal.timeout(15000)
    });
    if(!response.ok){
      const error=await response.json().catch(()=>({}));
      if(error?.code==="P0001")return json({error:"Please wait before sending another inquiry."},429,origin);
      console.error("AWE inquiry storage failed",response.status);
      return json({error:"We couldn't save your inquiry. Please try again."},503,origin);
    }
    const reference=await response.json();
    if(typeof reference!=="string" || !/^[a-f0-9-]{36}$/i.test(reference))
      return json({error:"The inquiry service didn't confirm the submission."},503,origin);
    return json({ok:true,reference},200,origin);
  }catch(error){
    if(error instanceof SyntaxError)return json({error:"Invalid request."},400,origin);
    const status=error.status||400;
    return json({error:status===400?error.message:status===413?"Your message is too large.":"Unable to submit right now."},status,origin);
  }
});
