import legacyApi from '../netlify/functions/api.mjs';
import legacySite from '../netlify/functions/site.mjs';
import webhook from '../netlify/functions/webhook.mjs';
import {env, json, fail, user, isOwner, rows, insert, patch, owned, id, body, origin, rpc} from './backend.mjs';
import {normalize, validate, customerOrder} from '../shared/model.mjs';
import {renderSite} from '../shared/render.mjs';
import {runJobs} from './production.mjs';
import {bounded, cors} from './request-safety.mjs';

function relocate(req,path) {
  const u=new URL(req.url); u.pathname=path;
  return new Request(u,req);
}
async function dispatch(req) {
  const url=new URL(req.url), path=url.pathname.replace(/^\/functions\/v1\/awe-api\/?/,'').replace(/^\/awe-api\/?/,'');
  if(path==='stripe-webhook')return webhook(req);
  if(req.method==='OPTIONS') { origin(req); return new Response(null,{status:204}); }
  if(!['GET','HEAD','POST'].includes(req.method))fail('Method not allowed.',405);
  if(req.method==='POST') origin(req);
  if(path==='health')return json({service:'awe-api',version:1,testPaymentsOnly:true});
  if(path.startsWith('public/')) {
    const response=await legacySite(relocate(req,'/sites/'+path.slice(7)));
    if(response.ok && (response.headers.get('content-type')||'').includes('text/html')) {
      const html=(await response.text()).replaceAll('src="/sites/',`src="${env().SUPABASE_URL}/functions/v1/awe-api/public/`);
      return json({html,version:response.headers.get('x-awe-version')});
    }
    return response;
  }
  // Supabase Auth handles signup, passwordless recovery, refresh and revocation directly.
  if(path.startsWith('auth/'))fail('Use Supabase Auth for sign-in.',404);
  if(path==='catalog')return legacyApi(relocate(req,'/api/catalog'));
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
      if(!v?.enabled||!Number.isInteger(v.amount)||v.amount<=0||!v.hosting||!v.ownership||!v.revisions||!v.termsVersion)fail('This package is not ready.',503);
      if(b.consent!==true||b.termsVersion!==v.termsVersion)fail('Review the current package terms.');
      if(!(await rows('awe_templates',`id=eq.${data.template}&enabled=eq.true`)).length)fail('This template is unavailable.');
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
    const v=o.draft_version?(await rows('awe_versions',`id=eq.${o.draft_version}&order_id=eq.${o.id}`))[0]:null;
    return json({html:v?.html||renderSite(normalize(o.input)),version:v?.id||null});
  }
  if(p[0]==='admin'&&p[1]==='payments'&&req.method==='GET') {
    if(!(await isOwner(u)))fail('Owner access required.',403);
    return json(await rows('awe_payments','order=created_at.desc&limit=200'));
  }
  const response=await legacyApi(relocate(req,'/api/'+path));
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
