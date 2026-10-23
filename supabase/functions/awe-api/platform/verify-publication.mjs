// Verify the public website before sending the customer's delivery email.
// Firebase Spark serves a static, sandboxed viewer. Supabase Edge supplies
// only approved-site JSON because HTML responses are not supported by its
// default function domain. The legacy direct HTML route remains supported.
const fail = (message) => { throw new Error(message); };
export async function verifyPublication({siteUrl, publicApiUrl, version, assets = [], fetcher = fetch}) {
  const published = await fetcher(siteUrl, {
    method: "GET", redirect: "error", cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  if (!published.ok) fail("Published website is not reachable.");
  let assetsOrigin = siteUrl;
  if (published.headers.get("x-awe-version") !== version) {
    const viewer = await published.text();
    if (!viewer.includes('data-awe-public-viewer="v1"'))
      fail("The public website host is not running the approved-site viewer.");
    const approved = await fetcher(publicApiUrl, {
      method: "GET", redirect: "error", cache: "no-store",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
    });
    if (!approved.ok) fail("The website is not publicly approved.");
    const data = await approved.json();
    if (data?.version !== version || typeof data.html !== "string" ||
        !/^<!doctype html>/i.test(data.html.slice(0,100)))
      fail("Published website version could not be verified.");
    assetsOrigin = publicApiUrl;
  }
  for (const assetId of assets) {
    const response = await fetcher(assetsOrigin + "/assets/" + assetId, {
      method: "HEAD", redirect: "error", cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) fail("Published website asset verification failed.");
  }
  return {url:siteUrl, version};
}
