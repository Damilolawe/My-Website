#!/usr/bin/env bash
set -Eeuo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
readonly PROJECT_REF=hxxplkirfsewqsxodngv
readonly RELEASE_SHA="$(git rev-parse HEAD)"
for cmd in git node npm python3 curl; do command -v "$cmd" >/dev/null; done
node -e 'if(Number(process.versions.node.split(".")[0])<22)throw Error("Node 22 or newer is required")'
npm ci
# Authenticate/check tools before any database or hosting writes.
npx --yes firebase-tools@14.22.0 projects:list --non-interactive >/dev/null
npx --no-install supabase db query --linked --project-ref "$PROJECT_REF" 'select 1 as deployment_access_check;'
if [[ ! -x /usr/bin/chromium && -z "${PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH:-}" ]]; then
  npx --no-install playwright install chromium
fi
GITHUB_SHA="$RELEASE_SHA" npm run build
npm run check
npm test
AWE_SITE_ORIGIN=https://aweconcepts.com node scripts/materialize-approved-sites.mjs
npm run check
node scripts/hosting-audit.mjs

# Apply ONLY the owner-first migration, transactionally and once. Existing
# production migration timestamps differ from source: do not use db push.
readonly MIGRATION_SQL="$(mktemp /tmp/awe-owner-first.XXXXXX.sql)"
trap 'rm -f -- "$MIGRATION_SQL"' EXIT
python3 - "$MIGRATION_SQL" <<'PY'
from pathlib import Path
import sys
source=Path('supabase/migrations/20261028230000_owner_first_review.sql').read_text()
Path(sys.argv[1]).write_text('''BEGIN;
SELECT pg_advisory_xact_lock(28230000);
DO $release$
BEGIN
 IF NOT EXISTS (SELECT 1 FROM supabase_migrations.schema_migrations
                WHERE name='owner_first_review' OR version='20261028230000') THEN
  IF to_regprocedure('public.awe_customer_approve(uuid,uuid,uuid)') IS NULL THEN
   RAISE EXCEPTION 'Customer approval prerequisite is missing; release stopped';
  END IF;
  IF to_regprocedure('public.awe_owner_release(uuid,integer,uuid,uuid)') IS NOT NULL THEN
   RAISE EXCEPTION 'Unrecorded owner-first migration detected; reconcile before release';
  END IF;
  EXECUTE $migration$''' + source + '''$migration$;
  INSERT INTO supabase_migrations.schema_migrations(version,name,statements)
   VALUES ('20261028230000','owner_first_review',ARRAY[$migration$''' + source + '''$migration$]);
 END IF;
END $release$;
COMMIT;
''')
PY
npx --no-install supabase db query --linked --project-ref "$PROJECT_REF" -f "$MIGRATION_SQL"
npx --no-install supabase functions deploy awe-api --project-ref "$PROJECT_REF" --no-verify-jwt --use-api
FIREBASE_HOSTING_UPLOAD_CONCURRENCY=2 npx --yes firebase-tools@14.22.0 deploy --only hosting --project awe-digital --non-interactive
curl --fail --silent --show-error --retry 3 --max-time 30 \
  -H 'Cache-Control: no-cache' "https://aweconcepts.com/release.json?commit=$RELEASE_SHA" \
  | EXPECTED_SHA="$RELEASE_SHA" node --input-type=module -e '
let body="";for await (const chunk of process.stdin)body+=chunk;
const release=JSON.parse(body);
if(release.commit!==process.env.EXPECTED_SHA)throw Error("Public release fingerprint mismatch");
console.log("VERIFIED: https://aweconcepts.com serves",release.commit);'
