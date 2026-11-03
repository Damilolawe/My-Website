import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const base = (process.env.PREVIEW_BASE_URL || 'https://preview.aweconcepts.com').replace(/\/$/, '');
const sites = (process.env.PREVIEW_SITES || 'chong,shotsbyriq,jay-millz-shot-em,otaku-haven,kappo-sono,susukino,bao-dumpling,mesa-bar,casa-serra,solerum,jj-deli,pace-sbdc').split(',').map(s => s.trim()).filter(Boolean);
const output = process.env.MOBILE_QA_OUTPUT || 'artifacts/mobile-qa';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
let failures = 0;
for (const [deviceName, config] of [['iphone-13', devices['iPhone 13']], ['pixel-7', devices['Pixel 7']]]) {
  const context = await browser.newContext({ ...config, defaultBrowserType: undefined });
  for (const site of sites) {
    const page = await context.newPage();
    const url = `${base}/${site}/`;
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      if (!response || response.status() >= 400) throw new Error(`HTTP ${response?.status() ?? 'no response'}`);
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
