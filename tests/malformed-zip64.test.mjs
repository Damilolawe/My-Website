import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';

test('malformed ZIP64 resume input cannot hang the document parser', () => {
  // Isolate hostile parsing so a dependency regression fails within 3 seconds.
  const result = spawnSync(process.execPath, ['--input-type=module', '-e', `
    import {zipSync, strToU8} from 'fflate';
    import {previewResume} from './platform/resume.mjs';
    const bytes = Buffer.from(zipSync({'word/document.xml':strToU8('<w:p><w:t>QA</w:t></w:p>')}));
    const central = bytes.indexOf(Buffer.from([0x50,0x4b,0x01,0x02]));
    if (central < 0) process.exit(2);
    // ZIP64 compressed-size sentinel without its required extra-field record.
    bytes.writeUInt32LE(0xffffffff, central + 20);
    try { previewResume(bytes, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'); }
    catch { /* Invalid input must terminate rather than occupy the worker. */ }
  `], {timeout:3000, encoding:'utf8'});
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
});
