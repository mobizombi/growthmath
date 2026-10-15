// Popup: inject scanPage() into the active tab, render the results. No network requests, no storage, no analytics.
const $ = (id) => document.getElementById(id);
const EXT = typeof chrome !== 'undefined' && chrome.tabs && chrome.scripting;
let tabId = null, data = null;

// Outside the extension (local test page) the functions run against this document.
async function inPage(func, args = []) {
  // Local test: when the popup is framed by a test page, run the serialized function in the parent page's realm,
  // exactly like executeScript does (this also proves the injected functions are self-contained).
  if (!EXT) return window.parent !== window ? window.parent.Function('return (' + func.toString() + ').apply(null, arguments)')(...args) : func(...args);
  const [{ result }] = await chrome.scripting.executeScript({ target: { tabId }, func, args });
  return result;
}

const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const relOk = (l) => l.sponsored || l.nofollow;

function render() {
  const { links, disclosure } = data;
  $('msg').hidden = true; $('res').hidden = false;
  const bad = links.filter((l) => !relOk(l)).length;
  const nets = {};
  links.forEach((l) => (nets[l.network] = (nets[l.network] || 0) + 1));
  $('k_links').textContent = links.length;
  $('k_nets').textContent = Object.keys(nets).length;
  $('k_rel').textContent = bad;
  $('k_rel').classList.toggle('bad', bad > 0);

  const d = $('disc');
  d.replaceChildren();
  if (!links.length) { d.hidden = true; }
  else if (!disclosure) { d.className = 'disc bad'; d.append(el('b', null, 'No disclosure found. '), 'The FTC expects a clear disclosure near affiliate links, and Amazon requires "As an Amazon Associate I earn from qualifying purchases."'); }
  else if (!disclosure.before) { d.className = 'disc warn'; d.append(el('b', null, 'Disclosure found, but only after the first affiliate link. '), 'Move it above the first link so readers see it first. ', el('q', null, disclosure.snippet)); }
  else { d.className = 'disc good'; d.append(el('b', null, 'Disclosure found before the first link. '), el('q', null, disclosure.snippet)); }

  $('nets').replaceChildren(...Object.entries(nets).sort((a, b) => b[1] - a[1]).map(([n, c]) => { const s = el('span', null, n + ' '); s.append(el('b', null, String(c))); return s; }));
  $('none').hidden = links.length > 0;
  document.querySelector('.bar').hidden = !links.length;
  renderList();
}

function renderList() {
  const only = $('filter').value === 'bad';
  const rows = data.links.filter((l) => !only || !relOk(l)).map((l) => {
    const li = el('li'), top = el('div', 'top');
    top.append(el('span', 'net', l.network));
    if (l.hidden) top.append(el('span', 'pill hid', 'hidden'));
    top.append(el('span', 'pill ' + (l.sponsored ? 'ok' : l.nofollow ? 'ok' : 'no'), l.sponsored ? 'sponsored' : l.nofollow ? 'nofollow' : 'no rel'));
    li.append(top, el('div', 'txt', l.text), el('div', 'url', l.href));
    if (l.id) li.append(el('div', 'id', 'Tracking ID: ' + l.id));
    li.title = 'Scroll to this link on the page';
    li.onclick = () => inPage(scrollToLink, [l.i]);
    return li;
  });
  $('list').replaceChildren(...rows);
}

$('filter').onchange = renderList;
$('hl').onchange = () => inPage(highlightLinks, [data.links.map((l) => [l.i, relOk(l)]), $('hl').checked]);

$('csv').onclick = () => {
  const q = (v) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
  const head = ['network', 'tracking_id', 'anchor_text', 'url', 'rel', 'rel_ok', 'opens_new_tab', 'hidden'];
  const lines = [head.join(','), ...data.links.map((l) => [l.network, l.id, l.text, l.href, l.rel, relOk(l) ? 'yes' : 'no', l.newTab ? 'yes' : 'no', l.hidden ? 'yes' : 'no'].map(q).join(','))];
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv' }));
  let host = 'page';
  try { host = new URL(data.url).hostname.replace(/^www\./, ''); } catch (e) {}
  a.download = 'affiliate-links-' + host + '.csv';
  a.click();
};

(async () => {
  try {
    if (EXT) { const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); tabId = tab.id; }
    data = await inPage(scanPage);
    $('page').textContent = data.url;
    render();
  } catch (e) {
    $('msg').textContent = 'Chrome does not let extensions read this page (browser pages, the Chrome Web Store and PDF viewers are off limits). Open a normal web page and click the icon again.';
  }
})();
