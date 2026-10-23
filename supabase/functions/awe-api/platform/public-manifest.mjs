// Enumerate only PUBLIC pointers with immutable verified owner approvals.
// The manifest reveals no contact details, drafts, order IDs, or private files.
const SLUG = /^[a-z0-9-]{3,90}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export async function approvedSiteManifest(rows,limit=100) {
  const orders=await rows("awe_orders",
    "public_version=not.is.null&select=id,slug,public_version&order=updated_at.desc&limit="+(limit+1));
  if(orders.length>limit) throw Object.assign(Error("Approved site limit reached."),{status:503});
  const sites=[];
  for(const order of orders) {
    if(!SLUG.test(order.slug)||!UUID.test(order.id)||!UUID.test(order.public_version))
      throw Object.assign(Error("Invalid published site pointer."),{status:503});
    const approved=await rows("awe_approvals",
      "order_id=eq."+order.id+"&version_id=eq."+order.public_version+"&select=version_id&limit=1");
    if(!approved.length)continue;
    const versions=await rows("awe_versions",
      "id=eq."+order.public_version+"&order_id=eq."+order.id+"&select=id,asset_ids&limit=1");
    const v=versions[0];
    if(!v||!Array.isArray(v.asset_ids)||v.asset_ids.length>12||
       !v.asset_ids.every(a=>UUID.test(a)))
      throw Object.assign(Error("Invalid approved website assets."),{status:503});
    sites.push({slug:order.slug,version:order.public_version,assets:v.asset_ids});
  }
  sites.sort((a,b)=>a.slug.localeCompare(b.slug));
  return {sites};
}
