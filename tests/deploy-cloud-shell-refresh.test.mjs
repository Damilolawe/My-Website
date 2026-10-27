import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {execFileSync} from "node:child_process";

test("Cloud Shell deploy script refreshes itself after main updates its own safety checks",async()=>{
 const file=new URL("../scripts/deploy-verified-cloud-shell.sh",import.meta.url);
 const script=await readFile(file,"utf8");
 assert(script.includes('git stash push -m "Cloud Shell generated thumbnail cache'),"Auto-stash must protect generated thumbnail files");
 assert(script.includes("outside generated catalog thumbnails"),"Source changes must remain guarded");
 assert(script.includes('STARTED_SCRIPT_HASH="$(git hash-object scripts/deploy-verified-cloud-shell.sh)"'),"Must record current script identity before git pull");
 assert(script.includes('CURRENT_SCRIPT_HASH="$(git hash-object scripts/deploy-verified-cloud-shell.sh)"'),"Must detect scripts updated by git pull");
 assert(script.indexOf('readonly STARTED_SCRIPT_HASH=')<script.indexOf("git pull --ff-only origin main"),"Hash must be captured before pull");
 assert(script.indexOf('CURRENT_SCRIPT_HASH=')>script.indexOf("git pull --ff-only origin main"),"Hash must be checked after pull");
 assert(script.includes('exec env AWE_DEPLOY_RESTARTS='),"Must restart the latest script, not keep executing stale instructions");
 assert(script.includes('AWE_DEPLOY_RESTARTS:-0}" -ge 2'),"Must have a finite restart limit");
 assert(script.includes("npm test"),"Quality gate must remain enabled");
 assert(script.includes('firebase deploy --only hosting --project "$PROJECT" --non-interactive'),"Production deployment must remain scoped to existing Firebase Hosting");
 assert(script.includes('SUCCESS: Both aweconcepts.com and awe-digital.web.app serve commit'),"Public version verification must be preserved");
 execFileSync("bash",["-n",file.pathname],{stdio:"pipe"});
});

test("untracked Brianna image files are preserved before pulling versioned copies",async()=>{
 const script=await readFile(new URL("../scripts/deploy-verified-cloud-shell.sh",import.meta.url),"utf8");
 const paths=[
  "assets/case-studies/brianna-before.webp",
  "assets/case-studies/brianna-after.webp",
 ];
 assert(script.includes("brianna_captures=("),"The guard must scope the two specific captured images");
 for(const path of paths)assert(script.includes(path),"Missing capture path "+path);
 assert(script.includes('git ls-files --others --exclude-standard -- "${brianna_captures[@]}"'),
   "Do not disturb already-tracked or unrelated user files");
 assert(script.includes("git stash push --include-untracked"),"Untracked assets must be recoverably backed up");
 assert(script.includes('-- "${brianna_captures[@]}"'),"Stash must be path-scoped");
 assert(script.indexOf("git stash push --include-untracked")<script.indexOf("git pull --ff-only origin main"),
   "Preserve locally generated image assets before fetching the committed versions");
 assert(!script.includes('rm -f assets/case-studies/brianna'),
   "Generated original images must not be destroyed");

 // Exercise the same safe, scoped stash against a disposable Git fixture so
 // deployment cannot regress into a pre-pull merge blocker or delete data.
 const {mkdtemp,mkdir,writeFile,access,readFile:read}=await import("node:fs/promises");
 const {tmpdir}=await import("node:os");
 const {join}=await import("node:path");
 const {rm}=await import("node:fs/promises");
 const dir=await mkdtemp(join(tmpdir(),"awe-brianna-stash-"));
 const git=(...args)=>execFileSync("git",["-C",dir,...args],{encoding:"utf8"});
 try{
  git("init","-b","main");
  git("config","user.name","AWE Test");
  git("config","user.email","test@example.com");
  await writeFile(join(dir,"tracked.txt"),"base");
  git("add","tracked.txt");
  git("commit","-m","Baseline");
  await mkdir(join(dir,"assets","case-studies"),{recursive:true});
  for(const [index,path] of paths.entries()){
   await writeFile(join(dir,path),index===0?"precious old original":"precious Wix redesign");
  }
  await writeFile(join(dir,"keep-untracked.txt"),"do not touch");
  git("stash","push","--include-untracked","-m","Brianna test backup","--",...paths);
  const remaining=git("ls-files","--others","--exclude-standard","--",...paths).trim();
  assert.equal(remaining,"","Old untracked files should no longer block a fast-forward");
  assert.equal(await read(join(dir,"keep-untracked.txt"),"utf8"),"do not touch");
  const stash=git("stash","show","-u","--name-only","stash@{0}");
  for(const path of paths)assert(stash.includes(path),"Stash must preserve "+path);
  assert.equal(git("show","stash@{0}^3:"+paths[0]).trim(),"precious old original");
  assert.equal(git("show","stash@{0}^3:"+paths[1]).trim(),"precious Wix redesign");
 }finally{await rm(dir,{recursive:true,force:true});}
});
