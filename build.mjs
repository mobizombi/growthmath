// Static build for GrowthMath: node build.mjs  ->  dist/
// Config via env: SITE_URL (canonical origin), CONTACT_EMAIL, ADSENSE (ca-pub id, empty = no ads).
import { mkdirSync, writeFileSync, readFileSync, rmSync, copyFileSync } from 'node:fs';
import { tools, categories } from './src/tools.mjs';
import { extra } from './src/extra.mjs';
import { guides } from './src/guides.mjs';

const SITE = (process.env.SITE_URL || 'https://growthmath.io').replace(/\/$/, '');
const HOST = new URL(SITE).hostname;
const BASE = new URL(SITE).pathname.replace(/\/$/, ''); // e.g. /growthmath on a temp github.io URL
const TEMP = HOST.endsWith('github.io'); // temp host: noindex, no CNAME, no ads.txt
const NAME = 'GrowthMath';
const EMAIL = process.env.CONTACT_EMAIL || `hello@${TEMP ? 'growthmath.io' : HOST}`;
const ADSENSE = process.env.ADSENSE ?? 'ca-pub-5619164579775107';
const GA4 = process.env.GA4 ?? 'G-NNNSG3D7ML'; // GA4 property growthmath.io (traffic-goat account)
// Consent Mode v2: deny storage by default for EEA/UK/CH until the AdSense (Google) CMP updates it.
const EEA = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','GB','CH'];
const AUDIT_URL = 'https://traffic-goat.com/?utm_source=growthmath&utm_medium=referral&utm_campaign=tool_cta';
const YEAR = new Date().getFullYear();
const OUT = 'dist';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const bySlug = Object.fromEntries(tools.map((t) => [t.slug, t]));

// Auto ads place themselves once the site is approved. Set AD_SLOT (a display unit id from AdSense)
// to also reserve fixed in-content slots under the tool and above the footer.
const AD_SLOT = process.env.AD_SLOT || '';
const adUnit = () => (ADSENSE && AD_SLOT
  ? `<div class="ad"><ins class="adsbygoogle" style="display:block;width:100%" data-ad-client="${ADSENSE}" data-ad-slot="${AD_SLOT}" data-ad-format="auto" data-full-width-responsive="true"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({});</script></div>`
  : '');

function layout({ title, desc, path, body, schema = [], scripts = '' }) {
  const url = SITE + path;
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website"><meta property="og:site_name" content="${NAME}">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#0b6e4f">
${TEMP ? '<meta name="robots" content="noindex">' : ''}
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
${GA4 && !TEMP ? `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',region:${JSON.stringify(EEA)},wait_for_update:500});
gtag('js',new Date());gtag('config','${GA4}');</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4}"></script>` : ''}
${ADSENSE ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE}" crossorigin="anonymous"></script>` : ''}
${schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n')}
</head><body>
<header class="site-head"><div class="wrap"><a class="logo" href="/"><span class="logo-mark">g/m</span>${NAME}</a>
<nav><a href="/#tools">All tools</a><a href="/guides/">Guides</a><a href="/about/">About</a></nav></div></header>
<main class="wrap">${body}</main>
<footer class="site-foot"><div class="wrap"><div><b>${NAME}</b> - free calculators for marketers, affiliates and store owners. &copy; ${YEAR}</div>
<div><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></div></div></footer>
${scripts}
</body></html>`;
}

function card(t) {
  return `<a class="card" href="/${t.slug}/"><span class="tag">${categories[t.cat]}</span><b>${esc(t.name)}</b><span>${esc(t.short)}</span></a>`;
}

const guideCard = (g) => `<a class="card" href="/guides/${g.slug}/"><span class="tag">Guide</span><b>${esc(g.name)}</b><span>${esc(g.desc)}</span></a>`;

function toolPage(t0) {
  const x = extra[t0.slug] || {};
  const t = { ...t0, content: t0.content + (x.html || ''), faq: [...t0.faq, ...(x.faq || [])] };
  const path = `/${t.slug}/`;
  const tGuides = guides.filter((g) => g.tools.includes(t.slug));
  const faqHtml = t.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
  const related = t.related.map((s) => bySlug[s]).filter(Boolean).map(card).join('');
  const cta = t.cta
    ? `<div class="cta"><div><strong>Run an affiliate program that is not growing?</strong><p>Traffic Goat audits affiliate programs and shows exactly where partners and revenue are leaking - with a fix plan.</p></div><a class="btn" href="${AUDIT_URL}" rel="noopener">See the audit</a></div>`
    : '';
  const body = `
<div class="crumbs"><a href="/">Home</a> / <a href="/#${t.cat}">${categories[t.cat]}</a> / ${esc(t.name)}</div>
<h1>${esc(t.h1)}</h1>
<p class="lede">${esc(t.lede)}</p>
<section class="tool${t.single ? ' single' : ''}">${t.tool}</section>
${adUnit()}
<article class="content narrow">${t.content}
<h2>Frequently asked questions</h2><div class="faq">${faqHtml}</div></article>
${cta}
<h2>Related tools</h2><div class="grid">${related}</div>
${tGuides.length ? `<h2>Related guides</h2><div class="grid">${tGuides.map(guideCard).join('')}</div>` : ''}
${adUnit()}`;
  const schema = [
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: t.name, url: SITE + path, description: t.desc, applicationCategory: 'BusinessApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: t.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: t.name, item: SITE + path } ] },
  ];
  return layout({ title: t.title, desc: t.desc, path, body, schema, scripts: `<script src="/app.js"></script>\n<script>${t.js}</script>` });
}

function home() {
  const sections = Object.entries(categories).map(([k, label]) => {
    const list = tools.filter((t) => t.cat === k);
    return list.length ? `<h3 class="cat-h" id="${k}">${label}</h3><div class="grid">${list.map(card).join('')}</div>` : '';
  }).join('');
  const body = `
<section class="hero"><h1>The numbers behind your marketing, calculated in seconds.</h1>
<p class="lede">Free, no-signup calculators for ROAS, CPA, affiliate earnings, LTV, CAC, churn, store profit, YouTube earnings, UTM links and A/B tests. Everything runs in your browser - your data never leaves your device.</p></section>
<div id="tools">${sections}</div>
<h3 class="cat-h" id="guides">Guides</h3><div class="grid">${guides.map(guideCard).join('')}</div>
${adUnit()}
<article class="content narrow">
<h2>Why GrowthMath?</h2>
<p>Most marketing decisions come down to a handful of formulas: what a click is worth, what a customer is worth, and how much you can afford to pay for either. These tools put those formulas in one place, explain the math behind each one, and tell you what the result means - not just the number.</p>
<ul><li><b>Free and no signup.</b> Open a tool and use it.</li><li><b>Private.</b> Calculations run locally in your browser. Uploaded files are never sent to a server.</li><li><b>Explained.</b> Every tool shows its formula, benchmarks and common mistakes.</li></ul>
</article>`;
  const schema = [{ '@context': 'https://schema.org', '@type': 'WebSite', name: NAME, url: SITE + '/' }];
  return layout({ title: `${NAME} - Free Marketing, Ads & Affiliate Calculators`, desc: 'Free calculators for marketers: ROAS, CPA, affiliate EPC, LTV, CAC, churn, Shopify profit, YouTube earnings, profit margin, UTM builder and A/B test significance.', path: '/', body, schema });
}

function guidePage(g) {
  const path = `/guides/${g.slug}/`;
  const faqHtml = g.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
  const toolCards = g.tools.map((s) => bySlug[s]).filter(Boolean).map(card).join('');
  const more = guides.filter((o) => o.slug !== g.slug).map(guideCard).join('');
  const body = `
<div class="crumbs"><a href="/">Home</a> / <a href="/guides/">Guides</a> / ${esc(g.name)}</div>
<h1>${esc(g.title.split(':')[0].split(' (')[0])}</h1>
<p class="lede">${esc(g.lede)}</p>
<h2>Calculators for this guide</h2><div class="grid">${toolCards}</div>
${adUnit()}
<article class="content narrow">${g.html}
<h2>Frequently asked questions</h2><div class="faq">${faqHtml}</div></article>
<h2>More guides</h2><div class="grid">${more}</div>
${adUnit()}`;
  const schema = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.desc, url: SITE + path, datePublished: g.date || '2026-10-06', dateModified: new Date().toISOString().slice(0, 10), author: { '@type': 'Organization', name: NAME }, publisher: { '@type': 'Organization', name: NAME } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: g.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: SITE + '/guides/' },
      { '@type': 'ListItem', position: 3, name: g.name, item: SITE + path } ] },
  ];
  return layout({ title: g.title, desc: g.desc, path, body, schema });
}

function guidesIndex() {
  const body = `
<div class="crumbs"><a href="/">Home</a> / Guides</div>
<h1>Marketing math guides</h1>
<p class="lede">Plain-English explanations of the formulas behind ads, affiliate and growth decisions - each one paired with a free calculator.</p>
<div class="grid">${guides.map(guideCard).join('')}</div>`;
  return layout({ title: `Marketing Math Guides - ROAS, EPC, LTV:CAC, A/B Tests - ${NAME}`, desc: 'Guides to the formulas that drive marketing decisions: good ROAS, break-even ROAS, EPC, LTV:CAC ratio and A/B test sample size.', path: '/guides/', body });
}

const staticPage = (path, title, desc, html) => layout({ title: `${title} - ${NAME}`, desc, path, body: `<article class="content narrow"><h1>${title}</h1>${html}</article>` });

const pages = {
  '/about/': staticPage('/about/', 'About GrowthMath', 'About GrowthMath, a collection of free calculators for marketers, affiliates and online store owners.', `
<p>GrowthMath is a small collection of free calculators for people who buy traffic, run affiliate programs or sell online. It is built by people who work hands-on in affiliate marketing, paid acquisition and conversion optimisation.</p>
<p>Every tool follows three rules: it is free with no signup, it runs entirely in your browser, and it explains the formula and what the result means for your business.</p>
<p>The site is supported by display advertising. We also run <a href="${AUDIT_URL}">Traffic Goat</a>, an affiliate program audit service - some tools link to it where it is relevant.</p>
<p>Spotted a bug or want a tool we do not have? <a href="/contact/">Get in touch</a>.</p>`),
  '/contact/': staticPage('/contact/', 'Contact', 'Contact the GrowthMath team.', `
<p>Questions, bug reports, tool requests or partnership ideas - email us at <a href="mailto:${EMAIL}">${EMAIL}</a>. We read everything and usually reply within two business days.</p>`),
  '/privacy/': staticPage('/privacy/', 'Privacy Policy', 'GrowthMath privacy policy: what data is collected, cookies, and Google AdSense advertising.', `
<p><i>Last updated: ${new Date().toISOString().slice(0, 10)}</i></p>
<h2>Calculations and uploaded files</h2>
<p>All calculators run locally in your browser. The numbers you type and any files you upload (for example a CSV in the Dormant Affiliate Finder) are processed on your device and are never sent to or stored on our servers.</p>
<h2>Advertising and cookies</h2>
<p>We use Google AdSense to show ads. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to this site and/or other sites on the Internet.</p>
<p>You can opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" rel="nofollow noopener">Google Ads Settings</a>, or opt out of some third-party vendors' use of cookies at <a href="https://www.aboutads.info/choices/" rel="nofollow noopener">aboutads.info</a>. Learn more about <a href="https://policies.google.com/technologies/partner-sites" rel="nofollow noopener">how Google uses information from sites that use its services</a>.</p>
<p>Where the law requires it (for example in the EEA, UK and Switzerland), we ask for your consent before personalised ads or non-essential cookies are used. Until you choose, Google's Consent Mode keeps advertising and analytics storage switched off.</p>
<h2>Analytics</h2>
<p>We use Google Analytics 4 to understand which tools are used and how visitors find the site (pages viewed, approximate location, device and browser). It does not receive the numbers you type or the files you upload. You can opt out with the <a href="https://tools.google.com/dlpage/gaoptout" rel="nofollow noopener">Google Analytics opt-out browser add-on</a>.</p>
<h2>Server logs</h2>
<p>Our hosting provider may record standard technical logs (IP address, browser type, pages requested) for security and reliability. We do not use these to identify individuals.</p>
<h2>Contact</h2>
<p>Privacy questions: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`),
  '/terms/': staticPage('/terms/', 'Terms of Use', 'GrowthMath terms of use.', `
<p>The tools on GrowthMath are provided free of charge, as-is, for general information and planning. Results are estimates based on the numbers you enter and standard formulas; they are not financial, legal or tax advice. Always verify important decisions with your own data and, where appropriate, a qualified professional.</p>
<p>We may change or remove tools at any time. By using the site you agree not to misuse it, attempt to disrupt it, or scrape it at scale.</p>`),
};

// ---- write
rmSync(OUT, { recursive: true, force: true });
const rebase = (s) => (BASE ? s.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`) : s);
const write = (p, s) => { s = rebase(s); const file = OUT + (p.endsWith('/') ? p + 'index.html' : p); mkdirSync(file.replace(/\/[^/]*$/, ''), { recursive: true }); writeFileSync(file, s); };

write('/', home());
for (const t of tools) write(`/${t.slug}/`, toolPage(t));
write('/guides/', guidesIndex());
for (const g of guides) write(`/guides/${g.slug}/`, guidePage(g));
for (const [p, html] of Object.entries(pages)) write(p, html);
write('/404.html', staticPage('/404.html', 'Page not found', 'Page not found.', `<p>That page does not exist. <a href="/">Browse all tools</a>.</p>`));

copyFileSync('src/style.css', OUT + '/style.css');
copyFileSync('src/app.js', OUT + '/app.js');
writeFileSync(OUT + '/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#15171a"/><text x="32" y="42" font-family="monospace" font-size="26" font-weight="700" fill="#fff" text-anchor="middle">g/m</text></svg>`);
if (ADSENSE && !TEMP) writeFileSync(OUT + '/ads.txt', `google.com, ${ADSENSE.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`);
writeFileSync(OUT + '/robots.txt', TEMP ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
const today = new Date().toISOString().slice(0, 10);
const urls = ['/', ...tools.map((t) => `/${t.slug}/`), '/guides/', ...guides.map((g) => `/guides/${g.slug}/`), ...Object.keys(pages)];
writeFileSync(OUT + '/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
if (!TEMP) writeFileSync(OUT + '/CNAME', HOST + '\n');
// IndexNow key (Bing/Yandex instant crawl). Submit with: node indexnow.mjs
export const INDEXNOW_KEY = '533f7889d5ad743ef1f4e3731f054279';
if (!TEMP) writeFileSync(OUT + `/${INDEXNOW_KEY}.txt`, INDEXNOW_KEY);
writeFileSync(OUT + '/.nojekyll', '');
console.log(`Built ${urls.length} pages for ${SITE} -> ${OUT}/ (ads: ${ADSENSE || 'off'})`);
