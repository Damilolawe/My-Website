import { aweClient } from './service-client.mjs';

// Private images need authenticated requests; iframe navigation cannot carry
// bearer tokens. Keep credentials outside the isolated document and use blobs.
export function privatePreview(frame, client = aweClient) {
  let current = 0;
  let urls = [];
  const dispose = () => { current++; urls.forEach(URL.revokeObjectURL); urls = []; };
  return {
    dispose,
    async load(route) {
      const generation = ++current;
      const created = [];
      try {
        const {html} = await client.api(route);
        if (typeof html !== 'string' || html.length > 300000 || !/^<!doctype html>/i.test(html.trimStart()))
          throw Error('The private preview could not be validated.');
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const images = [...doc.querySelectorAll('img[src]')];
        const refs = new Map();
        for (const image of images) {
          const match = image.getAttribute('src').match(/^\/api\/assets\/([a-f0-9-]{36})$/i);
          if (match) refs.set(match[1], null);
        }
        if (refs.size > 12) throw Error('Too many preview images.');
        for (const id of refs.keys()) {
          const {blob} = await client.download('assets/' + id);
          if (!['image/jpeg','image/png','image/webp'].includes(blob.type) || blob.size > 4194304)
            throw Error('An image could not be safely previewed.');
          const url = URL.createObjectURL(blob);
          created.push(url); refs.set(id, url);
        }
        for (const image of images) {
          const match = image.getAttribute('src').match(/^\/api\/assets\/([a-f0-9-]{36})$/i);
          if (match) image.src = refs.get(match[1]);
        }
        // Multi-page documents are selected using the account's page buttons.
        // Keep same-page links functional without navigating out of isolation.
        for (const a of doc.querySelectorAll('a[href]')) {
          if (a.getAttribute('href').startsWith('#')) a.setAttribute('href', 'about:srcdoc' + a.getAttribute('href'));
          if (/^\.\//.test(a.getAttribute('href'))) {
            const label = doc.createElement('span');
            label.className = a.className;
            label.textContent = a.textContent;
            label.title = 'Use the page buttons above this private preview.';
            a.replaceWith(label);
          }
        }
        if (generation !== current || !frame.isConnected) return;
        urls.forEach(URL.revokeObjectURL);
        urls = created.splice(0);
        frame.srcdoc = '<!doctype html>\n' + doc.documentElement.outerHTML;
      } finally { created.forEach(URL.revokeObjectURL); }
    }
  };
}
