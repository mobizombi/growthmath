// Ping IndexNow (Bing, Yandex, Seznam...) with every URL in the live sitemap. Run after each deploy that adds pages.
const KEY = (await import('node:fs')).readFileSync('build.mjs', 'utf8').match(/INDEXNOW_KEY = '([0-9a-f]+)'/)[1];
const xml = (await import('node:fs')).readFileSync('dist/sitemap.xml', 'utf8'); // built sitemap == live sitemap
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const r = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: 'growthmath.io', key: KEY, keyLocation: `https://growthmath.io/${KEY}.txt`, urlList }),
});
console.log('IndexNow', r.status, urlList.length, 'urls');
