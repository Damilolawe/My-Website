/**
 * Synchronize Fat Boy Finesse's newest public YouTube upload without an API key.
 * The official Atom feed is fetched by GitHub Actions, not by client browsers,
 * because YouTube does not enable cross-origin reading of its RSS feed.
 * This updater refreshes the embed, initial video queue, and a text manifest
 * used to update open pages without a refresh.
 */
import {readFile, writeFile} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const execFileAsync=promisify(execFile);

const channel='UC_-FXJoPsApGI_xV1SvRFNw';
// UULF is YouTube's Videos-only playlist (not its Shorts playlist).
const playlist='UULF'+channel.slice(2);
const feedUrl='https://www.youtube.com/feeds/videos.xml?playlist_id='+playlist;
const videosPage='https://www.youtube.com/@fatboyfinesse/videos';
const requestHeaders={'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','accept-language':'en-US,en;q=0.9'};
const loadText=async url=>{
 const response=await fetch(url,{signal:AbortSignal.timeout(20000),headers:requestHeaders});
 if(!response.ok)throw new Error(url+': HTTP '+response.status);
 return response.text();
};
const parseAtom=xml=>{
 if(!xml.includes(channel))throw new Error('Atom feed did not match the creator channel.');
 return [...xml.matchAll(/<entry(?:\s[^>]*)?>([\s\S]*?)<\/entry>/g)]
  .map(match=>{
   const entry=match[1];
   const videoId=entry.match(/<yt:videoId>\s*([A-Za-z0-9_-]{11})\s*<\/yt:videoId>/)?.[1];
   const published=entry.match(/<published>([^<]+)<\/published>/)?.[1];
   return {videoId,published,date:Date.parse(published||'')};
  })
  .filter(entry=>entry.videoId&&Number.isFinite(entry.date))
  .sort((a,b)=>b.date-a.date);
};
// When YouTube's unofficial long-form Atom feed intermittently returns 404/500,
// use the creator's official Videos tab (not Shorts) as the fallback.
const parseVideosTab=html=>{
 const ids=[];
 const selectors=[
  /"richItemRenderer":\{"content":\{"videoRenderer":\{"videoId":"([A-Za-z0-9_-]{11})"/g,
  /"videoRenderer":\{"videoId":"([A-Za-z0-9_-]{11})"/g
 ];
 for(const regex of selectors){
  for(const match of html.matchAll(regex)){
   if(!ids.includes(match[1]))ids.push(match[1]);
   if(ids.length>=15)break;
  }
  if(ids.length>=2)break;
 }
 return ids.map(videoId=>({videoId,published:'videos-tab',date:0}));
};
const fetchEntries=async()=>{
 const errors=[];
 try{
  const xml=await loadText(feedUrl);
  const entries=parseAtom(xml);
  if(entries.length>=2)return entries;
  errors.push('Long-form Atom feed returned fewer than two videos.');
 }catch(error){errors.push(String(error.message));}
 try{
  const html=await loadText(videosPage);
  const entries=parseVideosTab(html);
  if(entries.length>=2){
   console.warn('YouTube long-form RSS unavailable; using official Videos tab.',errors.join(' | '));
   return entries;
  }
  errors.push('YouTube Videos tab returned fewer than two video IDs.');
 }catch(error){errors.push(String(error.message));}
 // Last resort: yt-dlp reads YouTube's Videos tab through the same browse
 // API as YouTube's client, and doesn't mix in channel Shorts or livestream tabs.
 try{
  const {stdout}=await execFileAsync('yt-dlp',[
   '--flat-playlist','--playlist-items','1:15','--print','%(id)s',
   '--no-warnings','--skip-download',videosPage
  ],{timeout:90000,maxBuffer:1024*1024});
  const ids=stdout.trim().split(/\r?\n/).filter(id=>/^[A-Za-z0-9_-]{11}$/.test(id));
  if(ids.length>=2){
   console.warn('Using yt-dlp long-form Videos tab fallback.',errors.join(' | '));
   return [...new Set(ids)].map(videoId=>({videoId,published:'videos-tab-yt-dlp',date:0}));
  }
  errors.push('yt-dlp did not return enough regular videos.');
 }catch(error){errors.push('yt-dlp: '+String(error.message).slice(0,250));}
 throw new Error('Unable to refresh long-form queue; current deployed videos retained. '+errors.join(' | '));
};
const entries=await fetchEntries();
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
