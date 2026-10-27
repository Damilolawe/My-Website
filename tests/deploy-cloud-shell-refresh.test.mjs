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
