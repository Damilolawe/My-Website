/**
 * Synchronize KevOnStage's newest public long-form YouTube upload across
 * all four of his channels. The official Atom feed is fetched by GitHub
 * Actions, not by client browsers.
 */
import {readFile, writeFile} from 'node:fs/promises';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const execFileAsync=promisify(execFile);

const channels=[
  {id:'UC5Zc0EUB-km6in-55cK7k2g',  handle:'@KevOnStage'},
  {id:'UC_VyMH33jngaVysIivLKTlw',  handle:'@kevonstagestudios'},
  {id:'UCIcfJdhsYRHTm-H6G0VJCug',  handle:'@HTT_Show'},
  {id:'UC1DYqWSRDF1UhQns1KZPg3w',  handle:'@baldxbrothers'},
];

const requestHeaders={'user-agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36','accept-language':'en-US,en;q=0.9'};
const loadText=async url=>{
  const response=await fetch(url,{signal:AbortSignal.timeout(20000),headers:requestHeaders});
  if(!response.ok)throw new Error(url+': HTTP '+response.status);
  return response.text();
};
const parseAtom=(xml,channelId)=>{
  if(!xml.includes(channelId))throw new Error('Atom feed did not match channel '+channelId);
  return [...xml.matchAll(/<entry(?:\s[^>]*)?>([\s\S]*?)<\/entry>/g)]
    .map(match=>{
      const entry=match[1];
      const videoId=entry.match(/<yt:videoId>\s*([A-Za-z0-9_-]{11})\s*<\/yt:videoId>/)?.[1];
      const published=entry.match(/<published>([^<]+)<\/published>/)?.[1];
      const title=entry.match(/<title>([^<]+)<\/title>/)?.[1]||'';
      return {videoId,published,title,date:Date.parse(published||''),channelId};
    })
    .filter(entry=>entry.videoId&&Number.isFinite(entry.date))
    .sort((a,b)=>b.date-a.date);
};

const fetchChannelEntries=async({id,handle})=>{
  const playlist='UULF'+id.slice(2);
  const feedUrl='https://www.youtube.com/feeds/videos.xml?playlist_id='+playlist;
  try{
    const xml=await loadText(feedUrl);
    const entries=parseAtom(xml,id);
    if(entries.length>=1)return entries;
  }catch(error){
    console.warn('Feed error for '+handle+': '+error.message);
  }
  return [];
};

const allEntries=[];
const results=await Promise.allSettled(channels.map(ch=>fetchChannelEntries(ch)));
for(const result of results){
  if(result.status==='fulfilled')allEntries.push(...result.value);
}
if(allEntries.length<2)throw new Error('Not enough uploads found across all channels.');

allEntries.sort((a,b)=>b.date-a.date);
const longFormVideoIds=[...new Set(allEntries.map(e=>e.videoId))].slice(0,15);
const latestVideoId=longFormVideoIds[0];
const latestEntry=allEntries[0];
const channelHandle=channels.find(c=>c.id===latestEntry.channelId)?.handle||'unknown';

const htmlPath='preview/kevonstage/index.html';
const queuePath='preview/kevonstage/latest-videos.txt';
let html=await readFile(htmlPath,'utf8');

const replaceEmbed=(source,regex,replacement,label)=>{
  const matches=[...source.matchAll(new RegExp(regex.source,'g'))];
  if(matches.length!==1)throw new Error('Expected exactly one '+label+' replacement; got '+matches.length);
  return source.replace(regex,replacement);
};
html=replaceEmbed(html,/(id="heroVideo"[^>]*?data-embed="https:\/\/www\.youtube-nocookie\.com\/embed\/)[A-Za-z0-9_-]{11}/,
  (_match,prefix)=>prefix+latestVideoId,'hero video embed');
html=replaceEmbed(html,/(class="video-poster" src="https:\/\/i\.ytimg\.com\/vi\/)[A-Za-z0-9_-]{11}/,
  (_match,prefix)=>prefix+latestVideoId,'hero video poster');
html=replaceEmbed(html,/(data-fallback="https:\/\/i\.ytimg\.com\/vi\/)[A-Za-z0-9_-]{11}/,
  (_match,prefix)=>prefix+latestVideoId,'hero video fallback poster');

const beforeHtml=await readFile(htmlPath,'utf8');
const beforeQueue=await readFile(queuePath,'utf8').catch(error=>{
  if(error.code==='ENOENT')return '';
  throw error;
});
const queueText=longFormVideoIds.join('\n')+'\n';
if(beforeHtml!==html)await writeFile(htmlPath,html,'utf8');
if(beforeQueue!==queueText)await writeFile(queuePath,queueText,'utf8');
console.log('Latest KevOnStage video:',latestVideoId,'from:',channelHandle,'title:',latestEntry.title,
  'published:',latestEntry.published,'queue size:',longFormVideoIds.length,
  'changed:',beforeHtml!==html||beforeQueue!==queueText);
