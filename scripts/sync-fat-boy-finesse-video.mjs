/**
 * Synchronize Fat Boy Finesse's newest public YouTube upload without an API key.
 * The official Atom feed is fetched by GitHub Actions, not by client browsers,
 * because YouTube does not enable cross-origin reading of its RSS feed.
 * This updater modifies only the watch-room embed and video ID constant.
 */
import {readFile, writeFile} from 'node:fs/promises';

const channel='UC_-FXJoPsApGI_xV1SvRFNw';
const feedUrl='https://www.youtube.com/feeds/videos.xml?channel_id='+channel;
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
const latestVideoId=entries[0].videoId;

const htmlPath='preview/fat-boy-finesse/index.html';
const jsPath='preview/fat-boy-finesse/site.js';
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
js=replaceOne(js,/(const latestVideoId=')[A-Za-z0-9_-]{11}(';)/,
  (_match,prefix,suffix)=>prefix+latestVideoId+suffix,'JavaScript video ID');
const beforeHtml=await readFile(htmlPath,'utf8');
const beforeJs=await readFile(jsPath,'utf8');
if(beforeHtml!==html)await writeFile(htmlPath,html,'utf8');
if(beforeJs!==js)await writeFile(jsPath,js,'utf8');
console.log('Latest Fat Boy Finesse video:',latestVideoId,'published:',entries[0].published,
  'changed:',beforeHtml!==html||beforeJs!==js);
