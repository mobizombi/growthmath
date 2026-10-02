#!/bin/sh
# Build and publish dist/ to the gh-pages branch of mobizombi/growthmath.
# Temp:   ./deploy.sh https://mobizombi.github.io/growthmath   (noindex, no ads.txt/CNAME/GA)
# Domain: ./deploy.sh https://growthmath.io                    (indexable, ads.txt + CNAME + GA4)
set -e
cd "$(dirname "$0")"
SITE_URL="${1:?usage: ./deploy.sh <site-url>}" node build.mjs
STAGE="${TMPDIR:-/tmp}/growthmath-deploy"
rm -rf "$STAGE" && cp -R dist "$STAGE" && cd "$STAGE"
git init -q -b gh-pages && git add -A
git commit -q -m "Deploy $(date +%F) to $1"
git push -q -f https://github.com/mobizombi/growthmath.git gh-pages
echo "Deployed -> $1"
