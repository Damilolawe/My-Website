import {cp, mkdir, rm} from 'node:fs/promises';
const files=['index.html','404.html','styles.css','studio.css','case-studies.css','script.js','sculpture.js','case-studies.js','config.js','favicon.svg','_headers','robots.txt','assets','vendor','demos'];
await rm('dist',{recursive:true,force:true});await mkdir('dist');
for(const file of files)await cp(file,'dist/'+file,{recursive:true});
console.log('Built static Cloudflare Pages site in dist/');
