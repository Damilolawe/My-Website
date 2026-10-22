#!/usr/bin/env bash
# Run in Google Cloud Shell as the owner of awe-digital.
# No billing changes, app changes, Firebase Functions, or backend deployment.
set +x
set -euo pipefail
umask 077

readonly awe_project='awe-digital'
readonly awe_repo='Damilolawe/My-Website'
readonly awe_sa="github-hosting@${awe_project}.iam.gserviceaccount.com"
readonly awe_workflow='firebase-hosting.yml'

for awe_command in gcloud gh python3; do
  command -v "$awe_command" >/dev/null || {
    echo "Missing command: $awe_command. Run this script in Google Cloud Shell with GitHub CLI installed." >&2
    exit 1
  }
done

gh auth status --hostname github.com
gh api "repos/$awe_repo" --jq '.permissions.admin' | python3 -c \
  'import sys; assert sys.stdin.read().strip() == "true", "GitHub repository admin access is required to set the deployment secret"'
gcloud projects describe "$awe_project" --format='value(projectId)'

echo 'Connecting only awe-digital Hosting to Damilolawe/My-Website.'
echo 'This grants a dedicated service account Hosting Admin, API Keys Viewer, and Service Usage Viewer.'
echo 'Its key goes directly to the encrypted GitHub Actions secret; it is never printed.'
echo 'No billing account is linked or upgraded by this script.'

gcloud services enable iam.googleapis.com firebasehosting.googleapis.com \
  --project="$awe_project" --quiet

# Provision the default Classic Hosting site only when it does not exist.
# Keep the user's short-lived Google access token in memory, out of output.
python3 - <<'PY'
import json, subprocess, urllib.request, urllib.error
token = subprocess.check_output(['gcloud', 'auth', 'print-access-token'], text=True).strip()
base = 'https://firebasehosting.googleapis.com/v1beta1/projects/awe-digital/sites'
headers = {'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}
try:
    with urllib.request.urlopen(urllib.request.Request(base + '/awe-digital', headers=headers)) as response:
        site = json.load(response)
except urllib.error.HTTPError as error:
    if error.code != 404:
        raise SystemExit(f'Cannot inspect Hosting site (HTTP {error.code}); no key has been created.')
    request = urllib.request.Request(base + '?siteId=awe-digital', headers=headers, data=b'{}', method='POST')
    try:
        with urllib.request.urlopen(request) as response:
            site = json.load(response)
    except urllib.error.HTTPError as error:
        raise SystemExit(f'Cannot create Hosting site (HTTP {error.code}); no key has been created.')
print('Hosting site:', site['name'])
PY

awe_accounts=$(gcloud iam service-accounts list --project="$awe_project" \
  --filter="email=$awe_sa" --format='value(email)')
if [[ -z "$awe_accounts" ]]; then
  gcloud iam service-accounts create github-hosting --project="$awe_project" \
    --display-name='GitHub Classic Hosting deploy only' --quiet
fi
for awe_role in roles/firebasehosting.admin roles/serviceusage.apiKeysViewer roles/serviceusage.serviceUsageViewer; do
  gcloud projects add-iam-policy-binding "$awe_project" \
    --member="serviceAccount:$awe_sa" --role="$awe_role" \
    --condition=None --quiet --format='none'
done

# Never overwrite an existing secret or create another key on a routine rerun.
awe_secrets=$(gh secret list --repo "$awe_repo" --json name --jq '.[].name')
if ! printf '%s\n' "$awe_secrets" | grep -Fxq 'FIREBASE_SERVICE_ACCOUNT'; then
  awe_tmp=$(mktemp -d)
  awe_key_id=''
  awe_key_uploaded=false
  cleanup() {
    if [[ -n "$awe_key_id" && "$awe_key_uploaded" != true ]]; then
      gcloud iam service-accounts keys delete "$awe_key_id" \
        --iam-account="$awe_sa" --project="$awe_project" --quiet || \
        echo "Key upload failed; revoke unused key $awe_key_id for $awe_sa in Google Cloud IAM." >&2
    fi
    rm -rf -- "$awe_tmp"
  }
  trap cleanup EXIT
  # New service accounts can take a few seconds to propagate.
  for awe_attempt in 1 2 3 4 5 6; do
    if gcloud iam service-accounts keys create "$awe_tmp/key.json" \
      --iam-account="$awe_sa" --project="$awe_project" --quiet; then
      break
    fi
    if [[ "$awe_attempt" == 6 ]]; then exit 1; fi
    sleep 5
  done
  awe_key_id=$(python3 -c 'import json,sys; print(json.load(open(sys.argv[1]))["private_key_id"])' "$awe_tmp/key.json")
  gh secret set FIREBASE_SERVICE_ACCOUNT --repo "$awe_repo" < "$awe_tmp/key.json"
  awe_key_uploaded=true
  rm -f -- "$awe_tmp/key.json"
else
  echo 'Existing FIREBASE_SERVICE_ACCOUNT secret retained.'
fi

gh variable set FIREBASE_PROJECT_ID --repo "$awe_repo" --body "$awe_project"
gh workflow run "$awe_workflow" --repo "$awe_repo" --ref main
echo 'SETUP COMPLETE: the real Hosting deployment was requested.'
echo 'Return to ChatGPT so the deployment run and live URL can be verified.'
echo 'https://github.com/Damilolawe/My-Website/actions/workflows/firebase-hosting.yml'
