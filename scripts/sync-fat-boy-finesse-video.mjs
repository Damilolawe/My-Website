/**
 * Synchronize Fat Boy Finesse's newest public YouTube upload without an API key.
 * The official Atom feed is fetched by GitHub Actions, not by client browsers,
 * because YouTube does not enable cross-origin reading of its RSS feed.
 * This updater refreshes the embed, initial video queue, and a text manifest
 * used to update open pages without a refresh.
 */
import {readFile, writeFile} from 'node:fs/promises';

const channel='UC_-FXJoPsApGI_xV1SvRFNw';
// UULF is YouTube's Videos-only playlist (not its Shorts playlist).
const feedUrl='https://www.youtube.com/feeds/videos.xml?playlist_id=UULF_'+channel.slice(2);
const response=await fetch(feedUrl,{
  signal:AbortSignal.timeout(20000),
  headers:{'user-agent':'AweConceptsFeedSync/1.0','accept':'application/atom+xml, application/xml;q=0.9'}
});
if(!response.ok)throw new Error('Could not read official YouTube feed: HTTP '+response.status);
const xml=await response.text();
if(!xml.includes(channel))throw new Error('YouTube feed channel ID did not match expected creator.');
const entries=[...xml.matchAll(/<entry(?:\s[^>]*)?>([\s\S]*?)<\/entry>/g)]
  .map(match=>{
    const entry=match[1];
    const videoId=entry.match(/<yt:videoId>\s*([A-Za-z0-9_-]{11})\s*<\/yt:videoId>/)?.[1];
    const published=entry.match(/<published>([^<]+)<\/published>/)?.[1];
    return {videoId,published,date:Date.parse(published||'')};
  })
  .filter(e=>e.videoId&&Number.isFinite(e.date))
  .sort((a,b)=>b.date-a.date);
if(!entries.length)throw new Error('Official YouTube feed returned no valid public videos.');
const longFormVideoIds=entries.slice(0,15).map(entry=>entry.videoId);
if(longFormVideoIds.length<2)throw new Error('Not enough long-form uploads found for continuous playback.');
const latestVideoId=longFormVideoIds[0];

const htmlPath='preview/fat-boy-finesse/index.html';
const jsPath='preview/fat-boy-finesse/site.js';
const queuePath='preview/fat-boy-finesse/latest-videos.txt';
let html=await readFile(htmlPath,'utf8');
let js=await readFile(jsPath,'utf8');
const replaceOne=(source,regex,replacement,label)=>{
  const matches=[...source.matchAll(new RegExp(regex.source,'g'))];
  if(matches.length!==1)throw new Error('Expected exactly one '+label+' replacement; got '+matches.length);
  return source.replace(regex,replacement);
};
html=replaceOne(html,/(id="live-player"[^>]*?src="https:\/\/www\.youtube\.com\/embed\/)[A-Za-z0-9_-]{11}/,
  (_match,prefix)=>prefix+latestVideoId,'main player');
html=replaceOne(html,/(id="latest-video-link" href="https:\/\/www\.youtube\.com\/watch\?v=)[A-Za-z0-9_-]{11}/,
  (_match,prefix)=>prefix+latestVideoId,'video fallback link');
html=replaceOne(html,/(id="latest-video-thumbnail" src="https:\/\/i\.ytimg\.com\/vi\/)[A-Za-z0-9_-]{11}/,
  (_match,prefix)=>prefix+latestVideoId,'video fallback thumbnail');
js=replaceOne(js,/const longFormVideoIds=\[[^\]]+\];/,
  ()=> 'const longFormVideoIds='+JSON.stringify(longFormVideoIds)+';','long-form playlist queue');
const beforeHtml=await readFile(htmlPath,'utf8');
const beforeJs=await readFile(jsPath,'utf8');
const beforeQueue=await readFile(queuePath,'utf8').catch(error=>{
  if(error.code==='ENOENT')return '';
  throw error;
});
const queueText=longFormVideoIds.join('\n')+'\n';
if(beforeHtml!==html)await writeFile(htmlPath,html,'utf8');
if(beforeJs!==js)await writeFile(jsPath,js,'utf8');
if(beforeQueue!==queueText)await writeFile(queuePath,queueText,'utf8');
console.log('Latest long-form Fat Boy Finesse video:',latestVideoId,'queue size:',longFormVideoIds.length,'published:',entries[0].published,
  'changed:',beforeHtml!==html||beforeJs!==js||beforeQueue!==queueText);
