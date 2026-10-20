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
// Email signup ("new tools" updates). Static site, so FormSubmit relays each signup to this inbox.
// After FormSubmit activation, swap the address for the random alias it gives you to keep it out of page source.
const SIGNUP_TO = process.env.SIGNUP_TO || 'trafficgoathq@gmail.com';
const signup = (where) => SIGNUP_TO ? `<section class="signup"><div><strong>Get new calculators first</strong><p>One short email when we add a tool or guide. No spam, unsubscribe any time.</p></div>
<form class="signup-form" action="https://formsubmit.co/${SIGNUP_TO}" method="POST" data-ajax="https://formsubmit.co/ajax/${SIGNUP_TO}">
<input type="email" name="email" required placeholder="you@company.com" aria-label="Email address" autocomplete="email">
<input type="hidden" name="_subject" value="GrowthMath signup"><input type="hidden" name="source" value="${where}">
<input type="hidden" name="_template" value="table"><input type="hidden" name="_captcha" value="false"><input type="hidden" name="_next" value="${SITE}/?subscribed=1">
<input type="text" name="_honey" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true">
<button class="btn" type="submit">Subscribe</button><span class="signup-msg" role="status"></span></form></section>` : '';
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
<nav><a href="/#tools">All tools</a><a href="/guides/">Guides</a><a class="nav-ext" href="/affiliate-link-checker-extension/">Extension</a><a href="/about/">About</a></nav></div></header>
<main class="wrap">${body}</main>
<footer class="site-foot"><div class="wrap"><div><b>${NAME}</b> - free calculators for marketers, affiliates and store owners. &copy; ${YEAR}</div>
<div><a href="/about/">About</a><a href="/contact/">Contact</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a><a href="/embed/">Embed our calculators</a><a href="/affiliate-link-checker-extension/">Chrome extension</a></div></div></footer>
${scripts}
${SIGNUP_TO ? `<script>document.querySelectorAll('.signup-form').forEach(function(f){var m=f.querySelector('.signup-msg'),b=f.querySelector('button');
if(/[?&]subscribed=1/.test(location.search))m.textContent='Thanks - you are on the list.';
f.addEventListener('submit',function(e){e.preventDefault();if(f._honey.value)return;b.disabled=true;m.textContent='Sending...';
fetch(f.dataset.ajax,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({email:f.email.value,source:f.source.value,_subject:f._subject.value,_template:'table',_captcha:'false'})})
.then(function(r){return r.json().then(function(j){if(!r.ok||String(j.success)==='false')throw 0;})}).then(function(){f.email.value='';m.textContent='Thanks - you are on the list.';if(window.gtag)gtag('event','sign_up',{method:'newsletter',source:f.source.value});})
.catch(function(){m.textContent='Something went wrong - please try again.';}).finally(function(){b.disabled=false;});});});</script>` : ''}
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
<h2>Frequently asked questions</h2><div class="faq">${faqHtml}</div>
${embedBox(t)}</article>
${cta}
${signup(t.slug)}
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

// ---- embeddable widgets: /embed/<slug>/ is the bare tool (noindex, canonical -> tool page).
// The snippet keeps the credit link OUTSIDE the iframe so it counts as a backlink on the host page.
const embedSnippet = (t) => `<iframe src="${SITE}/embed/${t.slug}/" title="${esc(t.name)}" data-gm="${t.slug}" width="100%" height="620" style="border:0;max-width:820px" loading="lazy" allow="clipboard-write"></iframe>
<p style="font-size:13px;margin:4px 0 0"><a href="${SITE}/${t.slug}/">${esc(t.name)}</a> by GrowthMath</p>
<script>window.addEventListener('message',function(e){var d=e.data;if(e.origin==='${new URL(SITE).origin}'&&d&&d.gm==='h')document.querySelectorAll('iframe[data-gm="'+d.slug+'"]').forEach(function(f){f.style.height=d.h+'px'})});</script>`;

const embedBox = (t, open = false) => `<details class="embed-box"${open ? ' open' : ''}><summary>Embed this calculator on your site</summary>
<p>Free for blogs, newsletters and client sites. Paste this HTML where you want the calculator - it resizes itself and works on any device. Please keep the credit line.</p>
<textarea class="embed-code" readonly rows="6" aria-label="Embed code for the ${esc(t.name)}">${esc(embedSnippet(t))}</textarea>
<button class="btn ghost" type="button" onclick="copyText(this.previousElementSibling.value,this)">Copy embed code</button></details>`;

function embedPage(t) {
  const back = `${SITE}/${t.slug}/`;
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(t.name)} - ${NAME}</title>
<meta name="robots" content="noindex,follow"><link rel="canonical" href="${back}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
${GA4 && !TEMP ? `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',region:${JSON.stringify(EEA)},wait_for_update:500});
gtag('js',new Date());gtag('config','${GA4}',{embed_host:document.referrer?new URL(document.referrer).hostname:'direct'});</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4}"></script>` : ''}
</head><body class="embed">
<section class="tool${t.single ? ' single' : ''}">${t.tool}</section>
<div class="embed-foot"><a href="${back}" target="_blank" rel="noopener"><span class="logo-mark">g/m</span> ${esc(t.name)}</a><a href="${back}" target="_blank" rel="noopener">Formula and guide</a></div>
<script src="/app.js"></script>
<script>${t.js}</script>
<script>(function(){var last=0;function post(){var h=Math.ceil(document.documentElement.getBoundingClientRect().height);if(h!==last&&window.parent!==window){last=h;parent.postMessage({gm:'h',slug:${JSON.stringify(t.slug)},h:h},'*');}}
if(window.ResizeObserver)new ResizeObserver(post).observe(document.body);window.addEventListener('load',post);post();})();</script>
</body></html>`;
}

function embedHub() {
  const rows = tools.map((t) => `<div class="embed-item"><h3><a href="/${t.slug}/">${esc(t.name)}</a></h3><p>${esc(t.short)}</p>${embedBox(t)}</div>`).join('');
  const body = `
<div class="crumbs"><a href="/">Home</a> / Embed</div>
<h1>Free calculator widgets for your website</h1>
<p class="lede">Add any GrowthMath calculator to your blog, course, newsletter landing page or client site - free, no signup, no ads inside the widget. Copy the code, paste it into an HTML block, done.</p>
<section class="tool single embed-demo"><iframe src="/embed/roas-calculator/" title="ROAS Calculator demo" data-gm="roas-calculator" width="100%" height="620" style="border:0"></iframe></section>
<script>window.addEventListener('message',function(e){var d=e.data;if(e.origin===location.origin&&d&&d.gm==='h')document.querySelectorAll('iframe[data-gm="'+d.slug+'"]').forEach(function(f){f.style.height=d.h+'px'})});</script>
<article class="content narrow">
<h2>How to embed a calculator</h2>
<ol><li>Pick a calculator below and click <b>Embed this calculator</b>.</li><li>Copy the code.</li><li>In WordPress, add a <b>Custom HTML</b> block and paste it. In Webflow, Ghost, Squarespace or Wix, use the "Embed" or "HTML" element.</li></ol>
<p>The widget resizes itself to fit, works on mobile, and runs entirely in your visitor's browser - nothing they type is sent anywhere. If your platform strips scripts, the iframe still works; it just keeps a fixed height, so raise the <code>height</code> value if it gets cut off.</p>
<h2>Terms</h2>
<p>Widgets are free for any site, commercial or not. Please keep the credit line under the calculator and do not frame the widget inside a page that misrepresents what it does.</p>
</article>
<h2>All embeddable calculators</h2>
<div class="embed-list">${rows}</div>`;
  return layout({ title: `Free Embeddable Marketing Calculators - Widgets for Your Site - ${NAME}`, desc: 'Free calculator widgets you can embed on any website: ROAS, CPA, affiliate EPC, LTV, CAC, churn, profit margin, A/B test and more. Copy, paste, done.', path: '/embed/', body, scripts: '<script src="/app.js"></script>' });
}

function home() {
  const sections = Object.entries(categories).map(([k, label]) => {
    const list = tools.filter((t) => t.cat === k);
    return list.length ? `<h3 class="cat-h" id="${k}">${label}</h3><div class="grid">${list.map(card).join('')}</div>` : '';
  }).join('');
  const body = `
<section class="hero"><h1>The numbers behind your marketing, calculated in seconds.</h1>
<p class="lede">Free, no-signup calculators for ROAS, CPA, affiliate earnings, LTV, CAC, churn, store profit, YouTube earnings, UTM links and A/B tests. Everything runs in your browser - your data never leaves your device.</p></section>
<a class="cta ext-promo" href="/affiliate-link-checker-extension/"><div><strong>New: free Affiliate Link Checker for Chrome</strong><p>See every affiliate link on a page - network, tracking ID, rel="sponsored" and disclosure - in one click.</p></div><span class="btn">Get the extension</span></a>
<div id="tools">${sections}</div>
${signup('home')}
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
${signup("guide-" + g.slug)}
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

const EXT_VERSION = JSON.parse(readFileSync('extension-affiliate/manifest.json', 'utf8')).version;
const EXT_FAQ = [
  ['Is the Affiliate Link Checker free?', 'Yes. It is free, needs no account, and has no paid tier.'],
  ['Do affiliate links need rel="sponsored"?', 'Google asks that links you are paid for, including affiliate links, are marked rel="sponsored" or rel="nofollow". Unmarked paid links can be treated as a link scheme.'],
  ['Does it detect every affiliate link?', 'It detects links by network domain, URL pattern and common affiliate parameters, which covers most programs. Links that hide behind an unrelated redirect domain cannot be identified without following them, so treat the count as a minimum.'],
  ['Does the extension send my data anywhere?', 'No. It runs only when you click it, reads the current page locally, makes no network requests and stores nothing.'],
];
const table = (head, rows) => `<div class="tscroll"><table class="t"><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;
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
<h2>Email updates</h2>
<p>If you subscribe to updates, we collect only your email address and the page you subscribed from. We use it solely to tell you about new tools and guides, and you can unsubscribe at any time by replying to any email or writing to us. Signups are delivered to us through FormSubmit (formsubmit.co), a form-forwarding service. We never sell or share your address.</p>
<h2>Server logs</h2>
<p>Our hosting provider may record standard technical logs (IP address, browser type, pages requested) for security and reliability. We do not use these to identify individuals.</p>
<h2>Contact</h2>
<p>Privacy questions: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p>`),
  '/affiliate-link-checker-extension/': layout({ title: 'Affiliate Link Checker - Free Chrome Extension to Audit Affiliate Links', desc: 'Free Chrome extension that finds every affiliate link on a page, names the network and tracking ID, flags links missing rel="sponsored" and checks for an FTC disclosure. Export to CSV.', path: '/affiliate-link-checker-extension/', schema: [
    { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Affiliate Link Checker by GrowthMath', applicationCategory: 'BrowserApplication', operatingSystem: 'Chrome', url: SITE + '/affiliate-link-checker-extension/', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: EXT_FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }],
    body: `
<div class="crumbs"><a href="/">Home</a> / Chrome extension</div>
<h1>Affiliate Link Checker for Chrome</h1>
<p class="lede">Click once on any page to see every affiliate link on it: which network, which tracking ID, whether it carries rel="sponsored", and whether the page has a disclosure. Free, no account, nothing leaves your browser.</p>
<div class="ext-hero"><img src="/img/affiliate-link-checker.jpg" width="800" height="512" alt="Affiliate Link Checker popup listing 13 affiliate links by network, with links missing rel=sponsored outlined in red on the page" loading="eager">
<div class="ext-cta"><a class="btn" href="/downloads/affiliate-link-checker-${EXT_VERSION}.zip" download>Download for Chrome (v${EXT_VERSION})</a><p class="small muted">Chrome Web Store listing coming soon. Until then, install it in 30 seconds with the steps below - it works in Chrome, Edge, Brave and Arc.</p></div></div>
<article class="content narrow">
<h2>What it checks</h2>
<ul><li><b>Every affiliate link, by network.</b> Amazon Associates, Impact, CJ, Awin, Rakuten, ShareASale, ClickBank, eBay Partner Network, Partnerize, Skimlinks, Sovrn, AvantLink, FlexOffers, Digistore24, Booking.com, SaaS referral programs (Rewardful, FirstPromoter, PartnerStack) and more - plus cloaked links like <code>/go/</code> and <code>/recommends/</code>.</li>
<li><b>Tracking IDs.</b> See the Amazon tag, Impact or CJ publisher ID, Awin affiliate ID and others on every link. Catch a missing or wrong tag before it costs you commissions.</li>
<li><b>rel="sponsored".</b> Google asks for paid and affiliate links to carry <code>rel="sponsored"</code> (or <code>nofollow</code>). Links without it are counted and outlined in red on the page.</li>
<li><b>Disclosure.</b> Finds wording like "As an Amazon Associate" or "we may earn a commission", and warns you if it only appears after the first affiliate link.</li>
<li><b>Export to CSV</b> for audits, client reports or competitor research.</li></ul>
<h2>Who it is for</h2>
<ul><li><b>Affiliate publishers and bloggers:</b> audit your own pages for broken tags, missing rel attributes and disclosure placement.</li>
<li><b>Affiliate managers:</b> check how partners link to you, and spot which networks and competitors a publisher already works with before you pitch them.</li>
<li><b>SEO agencies:</b> run a link-attribute compliance check on a client's money pages in seconds.</li></ul>
<h2>How to install (while the Web Store listing is in review)</h2>
<ol><li>Download the zip above and unzip it.</li><li>Open <code>chrome://extensions</code> and switch on <b>Developer mode</b> (top right).</li><li>Click <b>Load unpacked</b> and choose the unzipped folder.</li><li>Pin the extension from the puzzle-piece menu, open any page and click the icon.</li></ol>
<h2>How to read the results</h2>
${table(['You see', 'What it means', 'What to do'], [['Red "no rel" tag', 'The link has neither rel="sponsored" nor rel="nofollow"', 'Add rel="sponsored" (most affiliate plugins have a setting for it)'], ['"hidden" tag', 'The link exists in the page code but is not visible', 'Check it is intentional - hidden affiliate links can look like cookie stuffing'], ['Disclosure "only after the first link"', 'Readers can click before they see the disclosure', 'Move a short disclosure above the first affiliate link'], ['Cloaked redirect', 'A link on your own domain like /go/product that likely redirects to an affiliate URL', 'Make sure the redirect target carries your tracking ID'], ['Amazon (short link)', 'An amzn.to link - the tag is inside the redirect', 'Open it once to confirm your tag is applied']])}
<h2>Privacy</h2>
<p>The extension only reads a page when you click its icon, uses Chrome's <code>activeTab</code> permission (no access to your browsing otherwise), makes no network requests, stores nothing and contains no analytics. The source is a few small, readable files.</p>
<p>Want to know what those links are worth? Use the <a href="/affiliate-commission-calculator/">affiliate EPC calculator</a>, or find inactive partners with the <a href="/dormant-affiliate-finder/">dormant affiliate finder</a>.</p>
<h2>Frequently asked questions</h2><div class="faq">${EXT_FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
</article>
${signup('extension')}` }),
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
for (const t of tools) write(`/embed/${t.slug}/`, embedPage(t));
write('/embed/', embedHub());
write('/guides/', guidesIndex());
for (const g of guides) write(`/guides/${g.slug}/`, guidePage(g));
for (const [p, html] of Object.entries(pages)) write(p, html);
write('/404.html', staticPage('/404.html', 'Page not found', 'Page not found.', `<p>That page does not exist. <a href="/">Browse all tools</a>.</p>`));

copyFileSync('src/style.css', OUT + '/style.css');
copyFileSync('src/app.js', OUT + '/app.js');
mkdirSync(OUT + '/img', { recursive: true }); copyFileSync('src/img/affiliate-link-checker.jpg', OUT + '/img/affiliate-link-checker.jpg');
mkdirSync(OUT + '/downloads', { recursive: true }); copyFileSync(`brand/extension/affiliate-link-checker-${EXT_VERSION}.zip`, OUT + `/downloads/affiliate-link-checker-${EXT_VERSION}.zip`);
writeFileSync(OUT + '/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#15171a"/><text x="32" y="42" font-family="monospace" font-size="26" font-weight="700" fill="#fff" text-anchor="middle">g/m</text></svg>`);
if (ADSENSE && !TEMP) writeFileSync(OUT + '/ads.txt', `google.com, ${ADSENSE.replace('ca-', '')}, DIRECT, f08c47fec0942fa0\n`);
writeFileSync(OUT + '/robots.txt', TEMP ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
const today = new Date().toISOString().slice(0, 10);
const urls = ['/', ...tools.map((t) => `/${t.slug}/`), '/guides/', ...guides.map((g) => `/guides/${g.slug}/`), '/embed/', ...Object.keys(pages)];
writeFileSync(OUT + '/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `<url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
if (!TEMP) writeFileSync(OUT + '/CNAME', HOST + '\n');
// IndexNow key (Bing/Yandex instant crawl). Submit with: node indexnow.mjs
export const INDEXNOW_KEY = '533f7889d5ad743ef1f4e3731f054279';
if (!TEMP) writeFileSync(OUT + `/${INDEXNOW_KEY}.txt`, INDEXNOW_KEY);
writeFileSync(OUT + '/.nojekyll', '');
console.log(`Built ${urls.length} pages for ${SITE} -> ${OUT}/ (ads: ${ADSENSE || 'off'})`);
