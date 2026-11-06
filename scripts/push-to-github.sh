#!/usr/bin/env bash
# First-time push of this blog to an empty GitHub repo.
# Usage: scripts/push-to-github.sh https://github.com/USER/REPO.git   (or git@github.com:USER/REPO.git)
set -euo pipefail
cd "$(dirname "$0")/.."

url="${1:?usage: $0 <github repo url>}"
[[ "$url" =~ github\.com[:/]([^/]+)/([^/]+)$ ]] || { echo "not a github.com repo url: $url" >&2; exit 1; }
user="${BASH_REMATCH[1]}"
repo="${BASH_REMATCH[2]%.git}"

# Point the site at https://USER.github.io/REPO/ (or the root for a USER.github.io repo).
base="/$repo"
[[ "${repo,,}" == "${user,,}.github.io" ]] && base="/"
sed -i.bak "s|YOUR_GITHUB_USERNAME|$user|; s|const base = '/YOUR_REPO_NAME';|const base = '$base';|" astro.config.mjs
rm -f astro.config.mjs.bak

[ -d .git ] || git init -q
git add -A
git commit -qm "Initial commit" || true
git branch -M main
git remote get-url origin >/dev/null 2>&1 && git remote set-url origin "$url" || git remote add origin "$url"
git push -u origin main

cat <<MSG

Pushed. One-time setup still needed on GitHub:
  1. Make sure the repo is public.
  2. https://github.com/$user/$repo/settings/pages -> Source: "GitHub Actions"
  3. https://github.com/$user/$repo/actions -> "Deploy blog" -> Run workflow
     (the first run fails if Pages wasn't enabled yet; just re-run it)

Blog URL: https://$user.github.io${base%/}/
After this, every push to main rebuilds and deploys the site.
MSG
