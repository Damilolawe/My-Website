import {sandboxCustomerAllowed, sandboxOrderAllowed} from "../shared/sandbox-checkout.mjs";
import legacyApi from '../netlify/functions/api.mjs';
import legacySite from '../netlify/functions/site.mjs';
import webhook from '../netlify/functions/webhook.mjs';
import {env, json, fail, user, isOwner, rows, insert, patch, owned, id, body, origin, originAllowed, rpc, liveCheckoutConfigured} from './backend.mjs';
import {normalize, validate, customerOrder} from '../shared/model.mjs';
import {packageAllowsTemplate} from '../shared/tiers.mjs';
import {renderSite} from '../shared/render.mjs';
import {renderApprovedRunwayPages} from '../shared/runway-customer-pages.mjs';
import {runJobs} from './production.mjs';
import {approvedSiteManifest} from './public-manifest.mjs';

// Continue verified checkout and owner-approved publication work after the
// HTTP response. Supabase keeps the isolate alive for registered tasks.
// The durable awe_jobs table is the source of truth; the existing owner-only
// Retry/Run Jobs controls remain available for later provider outages.
function startBackgroundJobs() {
  if (typeof EdgeRuntime === "undefined" ||
      typeof EdgeRuntime.waitUntil !== "function") return;
  const task = runJobs(3).catch(error => {
    console.error("AWE worker task failed", error?.status || 500);
  });
  EdgeRuntime.waitUntil(task);
}

const limit = 4500000;
async function bounded(req) {
  if (!req.body) return req;
  if (Number(req.headers.get('content-length')) > limit) fail('Request too large.', 413);
  const reader = req.body.getReader(); const parts = []; let total = 0;
  for (;;) { const {done,value} = await reader.read(); if(done)break;
    total += value.length; if(total > limit) { await reader.cancel(); fail('Request too large.',413); } parts.push(value); }
  const bytes = new Uint8Array(total); let offset = 0;
  for(const part of parts){bytes.set(part,offset);offset+=part.length;}
  return new Request(req.url,{method:req.method,headers:req.headers,body:bytes});
}
function relocate(req,path) {
  const u=new URL(req.url); u.pathname=path;
  return new Request(u,req);
}
function cors(req,res) {
  const headers=new Headers(res.headers);
  if(originAllowed(req)) headers.set('Access-Control-Allow-Origin',req.headers.get('origin'));
  headers.set('Vary',headers.has('Vary')?headers.get('Vary')+', Origin':'Origin');
  headers.set('Access-Control-Max-Age','3600'); headers.set('Access-Control-Allow-Headers','authorization, apikey, content-type, x-client-info');
  headers.set('Access-Control-Allow-Methods','GET, HEAD, POST, OPTIONS');
  headers.set('Access-Control-Expose-Headers','X-AWE-Version, Content-Disposition');
  headers.set('X-Content-Type-Options','nosniff');
  return new Response(res.body,{status:res.status,headers});
}
async function dispatch(req) {
  const url=new URL(req.url), path=url.pathname.replace(/^\/functions\/v1\/awe-api\/?/,'').replace(/^\/awe-api\/?/,'');
  if(path==='stripe-webhook') {
    const verified = await webhook(req);
    // Reject missing or invalid signatures before starting any worker.
    if (verified.ok) startBackgroundJobs();
    return verified;
  }
  if(req.method==='OPTIONS') { origin(req); return new Response(null,{status:204}); }
  if(!['GET','HEAD','POST'].includes(req.method))fail('Method not allowed.',405);
  if(req.method==='POST') origin(req);
  if(path==='health')return json({service:'awe-api',version:1,testPaymentsOnly:!liveCheckoutConfigured()});
  if(path==='public/manifest' && req.method==='GET') {
    // No private drafts: only immutable owner-approved current public versions.
    return json(await approvedSiteManifest(rows),200,{'Cache-Control':'no-store'});
  }
  if(path.startsWith('public/')) {
    const response=await legacySite(relocate(req,'/sites/'+path.slice(7)));
    if(response.ok && (response.headers.get('content-type')||'').includes('text/html')) {
      const html=(await response.text()).replaceAll('src="/sites/',`src="${env().SUPABASE_URL}/functions/v1/awe-api/public/`);
      const version=response.headers.get('x-awe-version');
      const slug=path.slice(7);
      // The legacy site endpoint has already verified the immutable version's
      // owner approval. Only after its successful approval check may multi-page
      // output be generated. Never serve saved drafts or editable order.input.
      if(/^[a-z0-9-]{3,90}$/.test(slug) && /^[a-f0-9-]{36}$/i.test(version||'')){
        const published=(await rows('awe_orders',
          'slug=eq.'+slug+'&public_version=eq.'+version+'&select=id&limit=1'))[0];
        if(published){
          const v=(await rows('awe_versions',
            'id=eq.'+version+'&order_id=eq.'+published.id+'&select=input&limit=1'))[0];
          if(v?.input?.template==='runwaymulti'){
            const pages=renderApprovedRunwayPages(v.input);
            return json({html:pages['index.html'],pages,version},200,{'Cache-Control':'no-store'});
          }
        }
      }
      return json({html,version});
    }
    return response;
  }
  // Supabase Auth handles signup, passwordless recovery, refresh and revocation directly.
  if(path.startsWith('auth/'))fail('Use Supabase Auth for sign-in.',404);
  if(path==='catalog') {
    const catalogResponse=await legacyApi(relocate(req,'/api/catalog'));
    if(!catalogResponse.ok)return catalogResponse;
    const catalog=await catalogResponse.json();
    // The legacy public catalog never exposes test-only package records.
    // Only a verified, assigned customer can see the short-lived QA offer.
    if(req.headers.get('authorization')) {
      let customer;
      try { customer=await user(req); } catch(error) { if(error.status!==401)throw error; }
      if(customer) {
        const tests=(await rows('awe_packages')).filter(p=>sandboxCustomerAllowed(p.data,customer,env()));
        catalog.packages.push(...tests.map(p=>({id:p.id,...p.data})));
        if(tests.length){catalog.ordersEnabled=true;catalog.paymentMode='test';}
      }
    }
    return json(catalog);
  }
  const u=await user(req);
  if(req.method==='POST') {
    const allowed=await rpc('awe_take_rate',{p_user:u.id,p_limit:90});
    if(!allowed)fail('Too many requests. Please wait a minute.',429);
  }
  const p=path.split('/');
  if(p[0]==='drafts') {
    if(p.length===1 && req.method==='POST') {
      if((await rows('awe_orders',`user_id=eq.${u.id}&payment=eq.unpaid&limit=20`)).length>=20)fail('You have reached the limit of 20 unfinished projects.');
      const b=await body(req), oid=id();
      await insert('awe_orders',{id:oid,user_id:u.id,email:u.email,slug:`project-${oid}`,input:normalize(b.input),package_snapshot:{name:'Draft project'}});
      return json({id:oid,version:0});
    }
    const o=await owned(p[1],u);
    if(req.method==='GET') {
      const assets=(await rows('awe_assets',`order_id=eq.${o.id}`)).map(({id,name,mime,public_allowed})=>({id,name,mime,public_allowed}));
      return json({id:o.id,input:o.input,version:o.version,assets,editable:o.payment==='unpaid'&&!o.checkout_at&&!o.stripe_session});
    }
    if(o.payment!=='unpaid'||o.checkout_at||o.stripe_session)fail('This project is locked for checkout. Contact the studio for changes.',409);
    const b=await body(req); const data=normalize(b.input);
    const assets=await rows('awe_assets',`order_id=eq.${o.id}`);
    if(data.content.photoIds.some(a=>!assets.some(x=>x.id===a&&x.public_allowed&&x.mime.startsWith('image/'))))fail('Invalid project image.');
    const changes={input:data,version:o.version+1,updated_at:new Date().toISOString()};
    if(p[2]==='prepare') {
      validate(data);
      const pkg=(await rows('awe_packages',`id=eq.${encodeURIComponent(b.packageId)}`))[0];
      const v=pkg?.data;
      const qaAllowed=sandboxOrderAllowed(v,u,o.id,env());
      if(v?.testOnly===true&&!qaAllowed)fail('This test package is not available for this project.',403);
      if(!liveCheckoutConfigured()&&!qaAllowed)fail('Orders are not open yet.',503);
      if(!v?.enabled||!Number.isInteger(v.amount)||v.amount<=0||!v.hosting||!v.ownership||!v.revisions||!v.termsVersion||(!v.testOnly&&!v.refunds))fail('This package is not ready.',503);
      if(b.consent!==true||b.termsVersion!==v.termsVersion)fail('Review the current package terms.');
      if(!(await rows('awe_templates',`id=eq.${data.template}&enabled=eq.true`)).length)fail('This template is unavailable.');
      if(!packageAllowsTemplate(v,data.template))fail('This design requires a higher package tier.',403);
      changes.package_snapshot={id:pkg.id,...v};
    }
    if(b.version!==o.version)fail('Your draft changed in another tab. Reload it before saving.',409);
    const updated=await patch('awe_orders',`id=eq.${o.id}&version=eq.${o.version}&checkout_at=is.null`,changes);
    if(!updated.length)fail('Your project changed. Reload before saving.',409);
    return json({id:o.id,version:changes.version});
  }
  if(p[0]==='assets'&&req.method==='GET') {
    const a=(await rows('awe_assets',`id=eq.${encodeURIComponent(p[1])}`))[0];
    if(!a)fail('Not found.',404);
    await owned(a.order_id,u,await isOwner(u));
    // The legacy reader is owner-only. Fetch the authorized private object here instead.
    const {sb}=await import('./backend.mjs');
    const result=await sb(`/storage/v1/object/awe-private/${a.path}`);
    return new Response(await result.arrayBuffer(),{headers:{'Content-Type':a.mime,'Cache-Control':'private, no-store','Content-Security-Policy':"default-src 'none'; sandbox",'Content-Disposition':a.mime.startsWith('image/')?'inline':'attachment; filename="customer-document"'}});
  }
  if(p[0]==='orders'&&p[2]==='preview'&&req.method==='GET') {
    const o=await owned(p[1],u);
    if(o.payment!=='paid'||!o.draft_version)fail('Your website draft is not ready yet.',409);
    const v=(await rows('awe_versions',`id=eq.${o.draft_version}&order_id=eq.${o.id}`))[0];
    if(!v)fail('Your website draft is not ready yet.',409);
    const page=url.searchParams.get('page')||'index.html';
    const pages=v.input.template==='runwaymulti'?renderApprovedRunwayPages(v.input):{'index.html':v.html};
    if(!Object.hasOwn(pages,page))fail('Preview page not found.',404);
    return json({html:pages[page],version:v.id},200,{'Cache-Control':'private, no-store'});
  }
  // Configuration visibility is owner-only. Never expose Stripe keys,
  // webhook signing secrets or their lengths to browser clients.
  // These flags do NOT indicate a validated Stripe account or webhook delivery.
  if(path==='admin/checkout-readiness'&&req.method==='GET') {
    if(!(await isOwner(u)))fail('Owner access required.',403);
    const settings=env();
    const packages=await rows('awe_packages');
    const enabledPackages=packages.filter(p=>
      p.data?.enabled===true && p.data?.testOnly!==true && Number.isInteger(p.data?.amount) &&
      p.data.amount>0 && p.data.hosting && p.data.ownership &&
      p.data.revisions && p.data.refunds && p.data.termsVersion);
    const priorPayments=await rows('awe_payments','select=event_id&limit=1');
    return json({
      mode:liveCheckoutConfigured()?'live':'test-only',
      serverTestKeyPresent:typeof settings.STRIPE_SECRET_KEY==='string' &&
        settings.STRIPE_SECRET_KEY.startsWith('sk_test_'),
      webhookSigningSecretPresent:typeof settings.STRIPE_WEBHOOK_SECRET==='string' &&
        settings.STRIPE_WEBHOOK_SECRET.startsWith('whsec_'),
      ordersEnabled:liveCheckoutConfigured(),
       liveActivationRequested:settings.LIVE_CHECKOUT_ENABLED==='true',
       liveSecretKeyPresent:(settings.STRIPE_LIVE_SECRET_KEY?.startsWith('sk_live_')===true || settings.STRIPE_LIVE_SECRET_KEY?.startsWith('rk_live_')===true),
       liveWebhookSigningSecretPresent:settings.STRIPE_LIVE_WEBHOOK_SECRET?.startsWith('whsec_')===true,
      enabledPackages:enabledPackages.length,
      configuredOrigin:settings.SITE_ORIGIN || 'https://awe-digital.web.app',
      recordedPaymentExists:priorPayments.length>0,
      // Only Stripe Workbench can confirm the external destination is registered.
      externalWebhookVerified:false,
      livePaymentsAllowed:liveCheckoutConfigured() && enabledPackages.length>0
    });
  }
  if(p[0]==='admin'&&p[1]==='payments'&&req.method==='GET') {
    if(!(await isOwner(u)))fail('Owner access required.',403);
    return json(await rows('awe_payments','order=created_at.desc&limit=200'));
  }
  // Owner-only lead management. Browser API never receives service credentials.
  if(p[0]==='admin'&&p[1]==='inquiries') {
    if(!(await isOwner(u)))fail('Owner access required.',403);
    if(p.length===2&&req.method==='GET') {
      return json(await rows('awe_inquiries',
        'select=id,created_at,name,email,project,message,status&order=created_at.desc&limit=100'));
    }
    if(p.length===3&&req.method==='POST') {
      const ref=p[2];
      if(!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(ref))
        fail('Invalid inquiry.',400);
      const data=await body(req,2048);
      if(!['new','contacted','archived'].includes(data?.status))
        fail('Invalid inquiry status.',400);
      const updated=await patch('awe_inquiries',
        `id=eq.${ref}&select=id,status`,{status:data.status});
      if(updated.length!==1)fail('Inquiry not found.',404);
      await insert('awe_events',{
        actor:u.id,kind:'inquiry_status_updated',details:{inquiry_id:ref,status:data.status}
      });
      return json({ok:true,id:ref,status:data.status});
    }
    fail('Inquiry endpoint not found.',404);
  }
  const response=await legacyApi(relocate(req,'/api/'+path));
  if (response.ok && req.method==='POST' && p.length===4 &&
      p[0]==='admin' && p[1]==='orders' && p[3]==='publish') {
    // The legacy handler verifies owner JWT and commits approval atomically.
    // Never kick off delivery if authorization or publishing failed.
    startBackgroundJobs();
  }
  if(response.ok && p.at(-1)==='preview')return json({html:await response.text()});
  return response;
}
export default async function edge(req) {
  let response;
  try { response=await dispatch(await bounded(req)); }
  catch(e){response=json({error:e.status?e.message:'The operation could not be completed. Please try again.'},e.status||500);}
  return cors(req,response);
}
export {bounded};

