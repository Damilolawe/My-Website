#!/usr/bin/env bash
# Temporary no-GitHub-Actions bridge: Cloudflare Pages Git build -> Firebase Hosting Classic.
# Only the reviewed production main branch can publish. No hosting/domain migration.
set -Eeuo pipefail
export CI=1
readonly PROJECT="awe-digital"
cd "$(dirname "$0")/.."

# Cloudflare Pages requires a build output directory. Serve only a redirect notice
# there, NOT the customer website (which stays hosted on Firebase).
mkdir -p .cloudflare-build-stub
cat > .cloudflare-build-stub/index.html <<'HTML'
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><meta http-equiv="refresh" content="0; url=https://aweconcepts.com/"><title>AWE Concepts</title></head><body><a href="https://aweconcepts.com/">AWE Concepts</a></body></html>
HTML

if [[ "$CF_PAGES" != "1" ]]; then
  echo "ERROR: This temporary script may only run in Cloudflare Pages builds." >&2; exit 1
fi
if [[ "$CF_PAGES_BRANCH" != "main" ]]; then
  echo "Preview branch: never publish to Firebase."; exit 0
fi
if [[ "$AWE_CF_FIREBASE_ENABLED" != "true" ]]; then
  echo "ERROR: Temporary Firebase release disabled. Set AWE_CF_FIREBASE_ENABLED=true only after reviewed setup." >&2; exit 1
fi
if [[ ! "$CF_PAGES_COMMIT_SHA" =~ ^[0-9a-f]{40}$ ]]; then
  echo "ERROR: Missing full Cloudflare commit SHA." >&2; exit 1
fi
if [[ "$(git rev-parse HEAD)" != "$CF_PAGES_COMMIT_SHA" ]]; then
  echo "ERROR: Cloudflare source SHA does not match checked-out git HEAD." >&2; exit 1
fi
if [[ -z "$AWE_FIREBASE_SERVICE_ACCOUNT_JSON" ]]; then
  echo "ERROR: Missing private Cloudflare build variable AWE_FIREBASE_SERVICE_ACCOUNT_JSON." >&2; exit 1
fi
for tool in node npm python3 git curl mktemp; do
  command -v "$tool" >/dev/null || { echo "Missing required build tool: $tool" >&2; exit 1; }
done
if ! node --input-type=module -e '
const raw=process.env.AWE_FIREBASE_SERVICE_ACCOUNT_JSON;
let key;
try { key=JSON.parse(raw); } catch { throw Error("Invalid Firebase service account JSON"); }
if (key.type!=="service_account" || key.project_id!=="awe-digital" ||
    !key.client_email?.endsWith(".gserviceaccount.com") || !key.private_key)
  throw Error("Credentials must be a service-account key for awe-digital");
'; then
  echo "ERROR: Invalid credentials configuration (contents were not printed)." >&2; exit 1
fi

echo "Verifying and building commit $CF_PAGES_COMMIT_SHA"
npm ci
GITHUB_SHA="$CF_PAGES_COMMIT_SHA" npm run build
npm run check
npm test
node scripts/materialize-approved-sites.mjs
npm run check
node scripts/hosting-audit.mjs
node scripts/smoke-production-cors.mjs
EXPECTED_SHA="$CF_PAGES_COMMIT_SHA" node --input-type=module -e '
import {readFileSync} from "node:fs";
const value=JSON.parse(readFileSync("dist/release.json","utf8"));
if (value.commit!==process.env.EXPECTED_SHA) throw Error("Built release stamp mismatch");
console.log("Verified build stamp:",value.commit);
'

# Ephemeral credential file is accessible only in the isolated build container.
keyfile="$(mktemp /tmp/awe-firebase-XXXXXXXX.json)"
chmod 600 "$keyfile"
trap 'rm -f "$keyfile"' EXIT
printf '%s' "$AWE_FIREBASE_SERVICE_ACCOUNT_JSON" > "$keyfile"
unset AWE_FIREBASE_SERVICE_ACCOUNT_JSON
export GOOGLE_APPLICATION_CREDENTIALS="$keyfile"
echo "Publishing approved static assets to existing Firebase Hosting project $PROJECT"
FIREBASE_HOSTING_UPLOAD_CONCURRENCY=5 npx --yes firebase-tools@15.30.1 deploy --only hosting --project "$PROJECT" --non-interactive

# Independently verify both live endpoints before reporting success.
for domain in awe-digital.web.app aweconcepts.com; do
  echo "Checking https://$domain/release.json"
  verified=false
  for attempt in 1 2 3 4 5; do
    if live="$(curl --silent --show-error --fail --max-time 25 -H 'Cache-Control: no-cache' "https://$domain/release.json?release=$CF_PAGES_COMMIT_SHA-$attempt")"; then
      if EXPECTED_SHA="$CF_PAGES_COMMIT_SHA" LIVE_RELEASE="$live" node --input-type=module -e '
let r; try { r=JSON.parse(process.env.LIVE_RELEASE); } catch { process.exit(1); }
if(r.commit !== process.env.EXPECTED_SHA) process.exit(1);
console.log("Verified",r.commit);
'; then verified=true; break; fi
    fi
    sleep 4
  done
  if [[ "$verified" != "true" ]]; then
    echo "ERROR: Public domain $domain did not confirm the expected release." >&2
    exit 1
  fi
done
echo "SUCCESS: Firebase public sites verified on $CF_PAGES_COMMIT_SHA"
