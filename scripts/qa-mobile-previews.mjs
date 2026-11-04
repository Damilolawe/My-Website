import { chromium, devices } from 'playwright';
import { mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const base = (process.env.PREVIEW_BASE_URL || 'https://preview.aweconcepts.com').replace(/\/$/, '');
const defaultSites = 'chong,shotsbyriq,jay-millz-shot-em,otaku-haven,kappo-sono,susukino,bao-dumpling,mesa-bar,casa-serra,solerum,jj-deli,pace-sbdc';
let requestedSites = process.env.PREVIEW_SITES;
if (!requestedSites && process.env.MOBILE_QA_REQUEST_FILE) {
  try {
    const request = JSON.parse(await readFile(process.env.MOBILE_QA_REQUEST_FILE, 'utf8'));
    requestedSites = Array.isArray(request.sites) ? request.sites.join(',') : request.sites || request.site;
    console.log('Mobile audit request:', JSON.stringify({ sites: requestedSites, requestId: request.requestId || null }));
  } catch (error) {
    console.warn('No valid mobile QA request file; using default sites:', error.message);
  }
}
// Discover future PUBLIC previews from the deployed preview index, never from private source folders.
let sites;
if (!requestedSites || requestedSites === 'all') {
  try {
    const indexResponse = await fetch(base + '/', { signal: AbortSignal.timeout(15000) });
    if (!indexResponse.ok) throw new Error('Index HTTP ' + indexResponse.status);
    const indexHtml = await indexResponse.text();
    const discovered = [...indexHtml.matchAll(/href=["']\/?([a-z0-9][a-z0-9-]*)\/?["']/gi)].map(m => m[1]);
    sites = [...new Set(discovered.filter(s => !['index', 'assets'].includes(s)))];
    if (!sites.length) throw new Error('No public preview links found');
    console.log('Discovered public preview sites:', sites.join(', '));
  } catch (error) {
    console.warn('Public preview discovery failed; using known public sites:', error.message);
    sites = defaultSites.split(',');
  }
} else {
  sites = requestedSites.split(',').map(s => s.trim()).filter(Boolean);
}
if (sites.some(s => !/^[a-z0-9][a-z0-9-]*$/.test(s))) throw new Error('Invalid preview site slug');
const output = process.env.MOBILE_QA_OUTPUT || 'artifacts/mobile-qa';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
let failures = 0;
const desktopMotionSites = new Set(['chong','bao-dumpling','casa-serra','jj-deli','mesa-bar','solerum']);
const auditDevices = [
  ['iphone-13', devices['iPhone 13']],
  ['pixel-7', devices['Pixel 7']],
  ['desktop-1440', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }]
];
for (const [deviceName, config] of auditDevices) {
  const context = await browser.newContext({ ...config, defaultBrowserType: undefined });
  for (const site of sites) {
    if (deviceName === 'desktop-1440' && !desktopMotionSites.has(site)) continue;
    const page = await context.newPage();
    const url = `${base}/${site}/`;
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      if (!response || response.status() >= 400) throw new Error(`HTTP ${response?.status() ?? 'no response'}`);
      // On desktop confirm the track is not merely present: its rendered position must move.
      if (deviceName === 'desktop-1440') {
        const motion = await page.evaluate(async () => {
          const track = document.querySelector('.awe-motion-track');
          if (!track) return { ok: false, reason: 'banner track not found' };
          const initialStyle = getComputedStyle(track);
          const animation = initialStyle.animationName;
          const playState = initialStyle.animationPlayState;
          const first = track.getBoundingClientRect().left;
          await new Promise(resolve => setTimeout(resolve, 550));
          const second = track.getBoundingClientRect().left;
          return { ok: animation !== 'none' && playState === 'running' && Math.abs(second - first) > 2,
                   animation, playState, pixelsMoved: Math.round((second-first)*10)/10 };
        });
        if (!motion.ok) {
          failures++;
          console.error('FAIL desktop banner motion ' + url + ' ' + JSON.stringify(motion));
        } else {
          console.log('PASS desktop banner motion ' + url + ' ' + JSON.stringify(motion));
        }
      }
      // Full-page screenshots can race lazy/data-image decoding on emulated mobile.
      // Eagerly decode every authored image before deciding that it is broken.
      await page.evaluate(async () => {
        const images = [...document.images].filter(img => img.getAttribute('src'));
        for (const img of images) img.loading = 'eager';
        await Promise.all(images.map(img => img.decode().catch(() => undefined)));
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      });
      await page.screenshot({ path: join(output, `${site}-${deviceName}.png`), fullPage: true, animations: 'disabled' });
      const info = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
        overflowingElements: [...document.querySelectorAll('body *')].filter(el => {
          const r = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return r.width > 0 && style.position !== 'fixed' && r.right > document.documentElement.clientWidth + 3 && r.left >= 0;
        }).slice(0, 8).map(el => `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().replace(/\s+/g, '.') : ''}`)
      }));
      const visualIssues = await page.evaluate(() => {
        const issues = [];
        for (const img of document.images) {
          const source = img.getAttribute('src');
          if (!source) continue;
          if (!img.complete || img.naturalWidth === 0) issues.push('broken image: ' + source);
        }
        for (const el of document.querySelectorAll('h1,h2,h3,p,a,button')) {
          const st = getComputedStyle(el), r = el.getBoundingClientRect();
          if (r.width < 1 || r.height < 1 || st.visibility === 'hidden' || st.display === 'none') continue;
          if (r.left < -4 || r.right > document.documentElement.clientWidth + 4) {
            issues.push('clipped text: ' + el.tagName.toLowerCase() + ' ' + (el.textContent || '').trim().slice(0,55));
          }
        }
        return issues.slice(0,30);
      });
      if (visualIssues.length) {
        console.warn('VISUAL WARN ' + deviceName + ' ' + url + ': ' + visualIssues.join(' | '));
        failures += visualIssues.length;
      }
      const overflow = info.document > info.viewport + 3;
      console.log(`${overflow ? 'FAIL' : 'PASS'} ${deviceName} ${url} viewport=${info.viewport} page=${info.document}${overflow ? ' suspects=' + info.overflowingElements.join(', ') : ''}`);
      if (overflow) failures++;
    } catch (error) {
      failures++;
      console.error(`FAIL ${deviceName} ${url}: ${error.message}`);
    } finally {
      await page.close();
    }
  }
  await context.close();
}
await browser.close();
if (failures) {
  console.error(`Mobile QA found ${failures} issue(s). See screenshots in ${output}.`);
  process.exitCode = 1;
}
