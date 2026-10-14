// GrowthMath popup. Everything runs locally: no network requests, no analytics.
// Permissions: activeTab (read the current tab's URL and meta tags on click), scripting, storage (remember inputs).
const $ = (id) => document.getElementById(id);
const EXT = typeof chrome !== 'undefined' && chrome.tabs && chrome.storage;
const store = {
  get: (keys) => (EXT ? chrome.storage.local.get(keys) : Promise.resolve({})),
  set: (obj) => (EXT ? chrome.storage.local.set(obj) : Promise.resolve()),
};
const num = (id) => { const v = parseFloat(String($(id).value).replace(/[, $%]/g, '')); return Number.isFinite(v) && v >= 0 ? v : NaN; };
const ok = (...xs) => xs.every(Number.isFinite);
const money = (x) => (ok(x) ? (x < 0 ? '-$' : '$') + Math.abs(x).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-');
const fnum = (x, d = 2) => (ok(x) ? x.toLocaleString('en-US', { maximumFractionDigits: d }) : '-');
const set = (id, v) => { $(id).textContent = v; };

// ---------------------------------------------------------------- tabs
document.querySelectorAll('nav button').forEach((b) => {
  b.onclick = () => {
    document.querySelectorAll('nav button').forEach((x) => x.setAttribute('aria-selected', x === b));
    document.querySelectorAll('.panel').forEach((p) => (p.hidden = p.id !== b.dataset.tab));
    store.set({ tab: b.dataset.tab });
    if (b.dataset.tab === 'seo') loadSeo();
  };
});

let activeTab = null;
async function currentTab() {
  if (!EXT) return { url: location.href, id: null };
  if (!activeTab) [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return activeTab;
}

// ---------------------------------------------------------------- UTM
const UTM = [['utm_source', 'src'], ['utm_medium', 'med'], ['utm_campaign', 'cmp'], ['utm_content', 'cnt'], ['utm_term', 'trm']];
const clean = (s) => ($('lc').checked ? s.trim().toLowerCase().replace(/\s+/g, '_') : s.trim());

function buildUtm() {
  let u;
  try { u = new URL($('url').value.trim()); } catch (e) { set('out', 'Enter a full URL starting with https://'); return ''; }
  if (!/^https?:$/.test(u.protocol)) { set('out', 'UTM tags only work on http(s) pages.'); return ''; }
  UTM.forEach(([k, id]) => { const v = clean($(id).value); if (v) u.searchParams.set(k, v); else u.searchParams.delete(k); });
  const missing = ['src', 'med', 'cmp'].filter((id) => !$(id).value.trim());
  set('out', u.toString());
  $('copy').disabled = missing.length > 0;
  $('copy').title = missing.length ? 'Source, medium and campaign are required' : '';
  store.set({ utm: { src: $('src').value, med: $('med').value, cmp: $('cmp').value, cnt: $('cnt').value, trm: $('trm').value, lc: $('lc').checked } });
  return u.toString();
}

$('preset').onchange = () => {
  const [s, m] = $('preset').value.split('|');
  if (s) { $('src').value = s; $('med').value = m; buildUtm(); }
};
['url', 'src', 'med', 'cmp', 'cnt', 'trm', 'lc'].forEach((id) => $(id).addEventListener('input', buildUtm));

$('clear').onclick = () => { ['src', 'med', 'cmp', 'cnt', 'trm'].forEach((id) => ($(id).value = '')); $('preset').value = ''; buildUtm(); };

$('copy').onclick = async () => {
  const link = buildUtm();
  if (!link) return;
  await navigator.clipboard.writeText(link);
  $('copy').textContent = 'Copied';
  setTimeout(() => ($('copy').textContent = 'Copy link'), 1400);
  const { recent = [] } = await store.get('recent');
  const next = [link, ...recent.filter((x) => x !== link)].slice(0, 8);
  await store.set({ recent: next });
  renderRecent(next);
};

function renderRecent(list) {
  $('recent-wrap').hidden = !list.length;
  $('recent').replaceChildren(...list.map((link) => {
    const li = document.createElement('li'), code = document.createElement('code'), b = document.createElement('button');
    code.textContent = link; code.title = link; b.textContent = 'Copy';
    b.onclick = () => navigator.clipboard.writeText(link).then(() => { b.textContent = 'Copied'; setTimeout(() => (b.textContent = 'Copy'), 1200); });
    li.append(code, b);
    return li;
  }));
}

// Strip existing utm_* from the page URL so tagging an already-tagged page starts clean.
function baseUrl(url) {
  try { const u = new URL(url); [...u.searchParams.keys()].filter((k) => k.startsWith('utm_')).forEach((k) => u.searchParams.delete(k)); return u.toString(); } catch (e) { return url || ''; }
}

// ---------------------------------------------------------------- SEO
let seoLoaded = false;
function readMeta() {
  const m = (sel) => document.querySelector(sel)?.getAttribute('content')?.trim() || '';
  return {
    url: location.href,
    title: document.title.trim(),
    desc: m('meta[name="description" i]'),
    canonical: document.querySelector('link[rel="canonical" i]')?.href || '',
    robots: m('meta[name="robots" i]'),
    h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim().replace(/\s+/g, ' ')).filter(Boolean),
    lang: document.documentElement.lang || '',
    ogImage: m('meta[property="og:image" i]'),
  };
}

async function loadSeo() {
  if (seoLoaded) return;
  const tab = await currentTab();
  let d;
  try {
    if (!EXT) d = readMeta();
    else [{ result: d }] = await chrome.scripting.executeScript({ target: { tabId: tab.id }, func: readMeta });
  } catch (e) {
    set('seo-msg', 'Chrome does not let extensions read this page (browser pages, the Web Store and PDFs are off limits). Open a normal web page and try again.');
    return;
  }
  seoLoaded = true;
  $('seo-msg').hidden = true; $('seo-body').hidden = false;
  const u = new URL(d.url);
  set('s-url', u.hostname + (u.pathname !== '/' ? ' > ' + u.pathname.split('/').filter(Boolean).join(' > ') : ''));
  set('s-title', d.title.length > 60 ? d.title.slice(0, 57).trimEnd() + '...' : d.title || '(no title)');
  set('s-desc', d.desc.length > 158 ? d.desc.slice(0, 155).trimEnd() + '...' : d.desc || '(no meta description - Google will pick text from the page)');
  const canonSelf = d.canonical && baseUrl(d.canonical).replace(/\/$/, '') === baseUrl(d.url).split('#')[0].replace(/\/$/, '');
  const noindex = /noindex/i.test(d.robots);
  const rows = [
    ['Title', d.title ? d.title.length + ' chars' : 'Missing', d.title && d.title.length >= 30 && d.title.length <= 60],
    ['Description', d.desc ? d.desc.length + ' chars' : 'Missing', d.desc && d.desc.length >= 70 && d.desc.length <= 160],
    ['H1', d.h1.length === 1 ? d.h1[0].slice(0, 48) : d.h1.length + ' found', d.h1.length === 1],
    ['Canonical', !d.canonical ? 'Missing' : canonSelf ? 'Points to this page' : 'Points elsewhere', canonSelf],
    ['Robots', noindex ? 'noindex - hidden from Google' : d.robots || 'index (default)', !noindex],
    ['Share image', d.ogImage ? 'og:image set' : 'No og:image', !!d.ogImage],
    ['Language', d.lang || 'Not set', !!d.lang],
  ];
  $('checks').replaceChildren(...rows.map(([k, v, good]) => {
    const tr = document.createElement('tr'), a = document.createElement('td'), b = document.createElement('td'), c = document.createElement('td'), p = document.createElement('span');
    a.textContent = k; b.textContent = v; p.className = 'pill ' + (good ? 'good' : 'warn'); p.textContent = good ? 'OK' : 'Check';
    c.append(p); tr.append(a, b, c);
    return tr;
  }));
}

// ---------------------------------------------------------------- Ads math
const CALC = ['c_spend', 'c_rev', 'c_m', 'c_imp', 'c_clk', 'c_conv'];
function calc() {
  document.querySelectorAll('#calc .stats b').forEach((b) => { b.textContent = '-'; b.classList.remove('bad'); });
  const s = num('c_spend'), r = num('c_rev'), m0 = num('c_m') / 100, m = m0 > 0 && m0 <= 1 ? m0 : NaN;
  const i = num('c_imp'), c = num('c_clk'), v = num('c_conv');
  if (ok(s, r) && s > 0) {
    const roas = r / s, be = 1 / m;
    set('r_roas', fnum(roas) + 'x');
    if (ok(m)) { set('r_be', fnum(be) + 'x'); set('r_profit', money(r * m - s)); $('r_roas').classList.toggle('bad', roas < be); $('r_profit').classList.toggle('bad', r * m - s < 0); }
  }
  if (ok(s, i) && i > 0) set('r_cpm', money(s / i * 1000));
  if (ok(s, c) && c > 0) set('r_cpc', money(s / c));
  if (ok(c, i) && i > 0) set('r_ctr', fnum(c / i * 100) + '%');
  if (ok(v, c) && c > 0) set('r_cvr', fnum(v / c * 100) + '%');
  if (ok(s, v) && v > 0) set('r_cpa', money(s / v));
  store.set({ calc: Object.fromEntries(CALC.map((id) => [id, $(id).value])) });
}
CALC.forEach((id) => $(id).addEventListener('input', calc));

// ---------------------------------------------------------------- init
(async () => {
  const saved = await store.get(['utm', 'recent', 'calc', 'tab']);
  if (saved.utm) { ['src', 'med', 'cmp', 'cnt', 'trm'].forEach((id) => ($(id).value = saved.utm[id] || '')); $('lc').checked = saved.utm.lc !== false; }
  if (saved.calc) CALC.forEach((id) => { if (saved.calc[id] != null) $(id).value = saved.calc[id]; });
  renderRecent(saved.recent || []);
  const tab = await currentTab();
  $('url').value = baseUrl(tab?.url || '');
  buildUtm(); calc();
  if (saved.tab && saved.tab !== 'utm') document.querySelector(`nav button[data-tab="${saved.tab}"]`)?.click();
})();
