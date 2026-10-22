import { Buffer } from 'node:buffer';
import edge from './platform/edge-router.mjs';
// Node-compatible modules use Buffer; never place server credentials in the browser.
globalThis.Buffer = Buffer;
Deno.serve(edge);
