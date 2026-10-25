import test from 'node:test';
import assert from 'node:assert/strict';
import {templates, sampleForTemplate, normalize, esc} from '../shared/model.mjs';
import {renderSite} from '../shared/render.mjs';
import {renderSite as edgeRender} from '../supabase/functions/awe-api/shared/render.mjs';

for (const template of templates) {
  test(`${template.id}: customer identity and first uploaded image survive both renderers`, () => {
    const sample=sampleForTemplate(template.id);
    const photo='11111111-1111-4111-8111-111111111111';
    const name='QA <Customer> & '+template.id;
    const input=normalize({...sample,template:template.id,content:{...sample.content,name,
      headline:'QACUSTOMHEADLINE '+template.id,heroVideoUrl:'',photoIds:[photo]}});
    const html=renderSite(input);
    assert(html.includes(esc(name)));
    assert(html.includes('QACUSTOMHEADLINE'));
    assert(html.includes('/api/assets/'+photo), 'Uploaded hero image was silently discarded');
    assert(!html.includes('<Customer>'));
    assert.equal(edgeRender(input),html);
  });
}
