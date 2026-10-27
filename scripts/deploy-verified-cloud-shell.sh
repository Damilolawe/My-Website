#!/usr/bin/env bash
# Deploy the current main branch to the EXISTING Firebase Hosting project.
# Fail closed: do not claim success without matching public release fingerprints.
set -Eeuo pipefail
export CI=1
readonly PROJECT="awe-digital"
cd "$(dirname "${BASH_SOURCE[0]}")/.."

for command in git npm node python3 firebase curl; do
  command -v "$command" >/dev/null || { echo "Missing required command: $command" >&2; exit 1; }
done

# Local builds regenerate tracked thumbnail cache files. Preserve those in a
# recoverable Git stash so normal Cloud Shell deployments do not repeatedly
# fail with an uncommitted-worktree error. Other tracked changes still block.
if [[ -n "$(git status --porcelain --untracked-files=no -- . ':(exclude)assets/catalog-thumbnails/**')" ]]; then
  echo "Refusing to deploy: uncommitted source changes outside generated catalog thumbnails." >&2
  git status --short --untracked-files=no -- . ':(exclude)assets/catalog-thumbnails/**' >&2
  exit 1
fi
if [[ -n "$(git status --porcelain --untracked-files=no -- assets/catalog-thumbnails)" ]]; then
  echo "Preserving locally regenerated catalog thumbnails in a recoverable Git stash..."
  git stash push -m "Cloud Shell generated thumbnail cache $(date -u +%Y%m%dT%H%M%SZ)" -- assets/catalog-thumbnails
  if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
    echo "Refusing to deploy: tracked changes remain after saving thumbnails." >&2
    exit 1
  fi
fi

echo "Preparing latest main from Damilolawe/My-Website..."
git fetch --prune origin main
git switch main
git pull --ff-only origin main

readonly RELEASE_SHA="$(git rev-parse HEAD)"
readonly UPSTREAM_SHA="$(git rev-parse origin/main)"
if [[ "$RELEASE_SHA" != "$UPSTREAM_SHA" ]]; then
  echo "Refusing to deploy: local HEAD does not match origin/main" >&2
  exit 1
fi
if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
  echo "Refusing to deploy: source tree contains uncommitted changes." >&2
  exit 1
fi
echo "Building commit: $RELEASE_SHA"

npm ci
GITHUB_SHA="$RELEASE_SHA" npm run build
npm run check
npm test
node scripts/materialize-approved-sites.mjs
npm run check
node scripts/hosting-audit.mjs
node scripts/smoke-production-cors.mjs

# Build embeds the requested commit in dist/release.json before Firebase publication.
EXPECTED_SHA="$RELEASE_SHA" node --input-type=module -e '
import {readFileSync} from "node:fs";
const local=JSON.parse(readFileSync("dist/release.json","utf8"));
if(local.commit!==process.env.EXPECTED_SHA)throw Error("Local build stamp differs from Git commit");
console.log("Local build fingerprint:",local.commit);
'

echo "Deploying to Firebase Hosting Classic site: $PROJECT"
FIREBASE_HOSTING_UPLOAD_CONCURRENCY=5 firebase deploy --only hosting --project "$PROJECT" --non-interactive

# Do not infer public success merely from the CLI reporting "release complete".
# The no-cache request confirms both custom and Firebase default domains.
for domain in "awe-digital.web.app" "aweconcepts.com"; do
  echo "Verifying https://$domain/release.json against $RELEASE_SHA"
  passed=false
  for attempt in 1 2 3 4 5; do
    # Force revalidation even when proxies cache by URL.
    query="$RELEASE_SHA-$attempt-$(date +%s)"
    if response="$(curl --silent --show-error --fail --max-time 25 --retry 2 \
       -H 'Cache-Control: no-cache' \
       "https://$domain/release.json?version=$query")"; then
      if EXPECTED_SHA="$RELEASE_SHA" LIVE_RELEASE="$response" node --input-type=module -e '
const release=JSON.parse(process.env.LIVE_RELEASE);
if(release.commit!==process.env.EXPECTED_SHA){
 console.error("Public commit mismatch:",release.commit,"expected:",process.env.EXPECTED_SHA);
 process.exit(1);
}
console.log("Verified public release:",release.commit);
'; then
        passed=true
        break
      fi
    fi
    if [[ "$attempt" != 5 ]]; then sleep 4; fi
  done
  if [[ "$passed" != true ]]; then
    echo "Firebase CLI may have accepted a release, but $domain is NOT verified on $RELEASE_SHA." >&2
    echo "Check Firebase Hosting Releases and domain mapping before claiming success." >&2
    exit 1
  fi
done

echo "SUCCESS: Both aweconcepts.com and awe-digital.web.app serve commit $RELEASE_SHA"
