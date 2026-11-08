import { chromium, devices } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const base = (process.env.PREVIEW_BASE_URL || 'https://preview.aweconcepts.com').replace(/\/$/, '');
const qaMode = process.env.PREVIEW_QA_MODE || 'mobile';
if (!['mobile', 'desktop'].includes(qaMode)) throw new Error('Invalid PREVIEW_QA_MODE (expected mobile or desktop)');
const defaultSites = 'chong,shotsbyriq,jay-millz-shot-em,otaku-haven,kappo-sono,susukino,bao-dumpling,mesa-bar,casa-serra,solerum,jj-deli,pace-sbdc';
let requestedSites = process.env.PREVIEW_SITES;
const requestFile = process.env.PREVIEW_QA_REQUEST_FILE || process.env.MOBILE_QA_REQUEST_FILE;
if (!requestedSites && requestFile) {
  try {
    const request = JSON.parse(await readFile(requestFile, 'utf8'));
    requestedSites = Array.isArray(request.sites) ? request.sites.join(',') : request.sites || request.site;
    console.log('Preview audit request:', JSON.stringify({ sites: requestedSites, requestId: request.requestId || null }));
  } catch (error) {
    console.warn('No valid preview QA request file; using default sites:', error.message);
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
const output = process.env.PREVIEW_QA_OUTPUT || process.env.MOBILE_QA_OUTPUT || 'artifacts/mobile-qa';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
let failures = 0;
const findings = [];
const motionViewports = new Set(['iphone-13', 'desktop-1440']);
const auditDevices = [
  ['iphone-13', devices['iPhone 13']],
  ['pixel-7', devices['Pixel 7']],
  ['desktop-1440', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
  ['desktop-1920', { viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 }]
].filter(([name]) => qaMode === 'desktop' ? name.startsWith('desktop-') : !name.startsWith('desktop-'));
for (const [deviceName, config] of auditDevices) {
  const context = await browser.newContext({ ...config, defaultBrowserType: undefined });
  for (const site of sites) {
    const page = await context.newPage();
    const url = `${base}/${site}/`;
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      if (!response || response.status() >= 400) throw new Error(`HTTP ${response?.status() ?? 'no response'}`);
      // On desktop confirm the track is not merely present: its rendered position must move.
      if (motionViewports.has(deviceName)) {
        const motion = await page.evaluate(async () => {
          const track = document.querySelector('.awe-motion-track, .marquee-track');
          if (!track) return { ok: true, skipped: true, reason: 'no moving banner on page' };
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
          findings.push({ site, viewport: deviceName, type: 'banner-motion', details: motion });
          console.error('FAIL desktop banner motion ' + url + ' ' + JSON.stringify(motion));
        } else if (!motion.skipped) {
          console.log('PASS banner motion ' + url + ' ' + JSON.stringify(motion));
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
      await page.screenshot({ path: join(output, `${site}-${deviceName}.jpg`), type: 'jpeg', quality: 78, fullPage: true, animations: 'disabled' });
      // A second desktop image shows the actual above-the-fold viewport at its native height.
      if (qaMode === 'desktop') {
        await page.screenshot({ path: join(output, `${site}-${deviceName}-viewport.jpg`), type: 'jpeg', quality: 82, fullPage: false, animations: 'disabled' });
      }
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
        // Identify a fully disconnected design stylesheet: the CSS may load
        // successfully while containing selectors from an unrelated template.
        // Require substantial authored class coverage before failing the page.
        const authoredClasses = new Set([...document.querySelectorAll('body *')].flatMap(el => [...el.classList || []]));
        const styledClasses = new Set();
        const inspectRules = rules => {
          for (const rule of rules || []) {
            if (rule.selectorText) {
              for (const m of rule.selectorText.matchAll(/\.([a-zA-Z_][\w-]*)/g)) styledClasses.add(m[1]);
            }
            if (rule.cssRules) inspectRules(rule.cssRules);
          }
        };
        for (const sheet of document.styleSheets) {
          try { inspectRules(sheet.cssRules); } catch { /* cross-origin stylesheet; not available */ }
        }
        const authored = [...authoredClasses];
        const styledCount = authored.filter(name => styledClasses.has(name)).length;
        if (authored.length >= 10 && styledCount <= 1) {
          issues.push('unstyled page: stylesheet selectors do not match the authored layout classes (' + styledCount + '/' + authored.length + ' classes)');
        }
        for (const img of document.images) {
          const source = img.getAttribute('src');
          if (!source) continue;
          if (!img.complete || img.naturalWidth === 0) issues.push('broken image: ' + source);
        }
        for (const el of document.querySelectorAll('h1,h2,h3,p,a,button')) {
          const st = getComputedStyle(el), r = el.getBoundingClientRect();
          if (r.width < 1 || r.height < 1 || st.visibility === 'hidden' || st.display === 'none') continue;
          // An accessible skip link intentionally lives offscreen until focused.
          // Ignore it ONLY when it is off the left edge; visible clipped links
          // and every other offscreen text node remain real QA findings.
          if (el.tagName === 'A' && r.right <= 0 && /^(?:skip\s+to\s+(?:main\s+)?content)$/i.test((el.textContent || '').trim())) continue;
          if (r.left < -4 || r.right > document.documentElement.clientWidth + 4) {
            issues.push('clipped text: ' + el.tagName.toLowerCase() + ' ' + (el.textContent || '').trim().slice(0,55));
          }
        }
        const addressNodes = [...document.querySelectorAll('address,.closing-location,.visit h2,.visit p,[class*="address"],[class*="location"]')];
        const streetAddress = /\\b\\d{1,5}(?:-\\d{1,5})?[A-Z]?\\s+[A-Za-z0-9.'’ -]{2,60}\\b(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Place|Pl|Lane|Ln|Drive|Dr|Court|Ct|Parkway|Pkwy|Way|Highway|Hwy|Broadway)(?:\\s+[A-Z])?\\b/i;
        for (const node of addressNodes) {
          const text = (node.textContent || '').replace(/\\s+/g, ' ').trim();
          if (streetAddress.test(text) && !/\\b\\d{5}(?:-\\d{4})?\\b/.test(text)) {
            issues.push('incomplete address: ' + text.slice(0, 140));
            break;
          }
        }
        return issues.slice(0,30);
      });
      if (visualIssues.length) {
        console.warn('VISUAL WARN ' + deviceName + ' ' + url + ': ' + visualIssues.join(' | '));
        failures += visualIssues.length;
        findings.push(...visualIssues.map(message => ({ site, viewport: deviceName, type: 'visual', message })));
      }
      const overflow = info.document > info.viewport + 3;
      console.log(`${overflow ? 'FAIL' : 'PASS'} ${deviceName} ${url} viewport=${info.viewport} page=${info.document}${overflow ? ' suspects=' + info.overflowingElements.join(', ') : ''}`);
      if (overflow) {
        failures++;
        findings.push({ site, viewport: deviceName, type: 'horizontal-overflow', viewportWidth: info.viewport, pageWidth: info.document, suspects: info.overflowingElements });
      }
    } catch (error) {
      failures++;
      findings.push({ site, viewport: deviceName, type: 'navigation-or-capture', message: error.message });
      console.error(`FAIL ${deviceName} ${url}: ${error.message}`);
    } finally {
      await page.close();
    }
  }
  await context.close();
}
await browser.close();
const report = { generatedAt: new Date().toISOString(), mode: qaMode, baseUrl: base, testedSites: sites.length, issues: failures, findings };
await writeFile(join(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`Visual QA report: ${join(output, 'report.json')} (${failures} findings across ${sites.length} sites)`);
if (failures) {
  console.error(`${qaMode} QA found ${failures} issue(s). See screenshots in ${output}.`);
  process.exitCode = 1;
}
