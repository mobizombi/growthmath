// scanPage() runs INSIDE the inspected page (injected with chrome.scripting.executeScript).
// It must be fully self-contained: no references to anything outside the function body.
// Returns plain data only. It reads the DOM; it never changes the page and never makes a network request.
function scanPage() {
  // [network, test(url) -> {id?} | null]. Order matters: specific networks before generic patterns.
  const host = (u) => u.hostname.replace(/^www\./, '');
  const on = (u, ...ds) => ds.some((d) => host(u) === d || host(u).endsWith('.' + d));
  const p = (u, ...ks) => { for (const k of ks) { const v = u.searchParams.get(k); if (v) return v; } return ''; };
  const NETWORKS = [
    ['Amazon Associates', (u) => (/(^|\.)amazon\.[a-z.]+$/.test(host(u)) && p(u, 'tag') ? { id: p(u, 'tag') } : null)],
    ['Amazon (short link)', (u) => (on(u, 'amzn.to', 'amzn.eu', 'amzn.asia') ? { id: '' } : null)],
    ['eBay Partner Network', (u) => ((/(^|\.)ebay\.[a-z.]+$/.test(host(u)) && p(u, 'campid')) || on(u, 'rover.ebay.com') ? { id: p(u, 'campid') } : null)],
    ['AliExpress Portals', (u) => (on(u, 's.click.aliexpress.com') ? { id: '' } : null)],
    ['Awin', (u) => (on(u, 'awin1.com', 'zenaps.com') ? { id: p(u, 'awinaffid') } : null)],
    ['CJ Affiliate', (u) => (on(u, 'anrdoezrs.net', 'dpbolvw.net', 'jdoqocy.com', 'kqzyfj.com', 'tkqlhce.com', 'emjcd.com', 'qksrv.net', 'ftjcfx.com', 'lduhtrp.net', 'afcyhf.com', 'apmebf.com', 'awltovhc.com', 'tqlkg.com', 'yceml.net') ? { id: (u.pathname.match(/click-(\d+)-/) || [])[1] || '' } : null)],
    ['Impact', (u) => (on(u, 'sjv.io', 'pxf.io', '7eer.net', 'ojrq.net', 'evyy.net', 'r.impact.com', 'impactradius-go.com', '8odi.net', '9nl.it') || (/^\/c\/\d+\/\d+\/\d+/.test(u.pathname) && host(u) !== location.hostname.replace(/^www\./, '')) ? { id: (u.pathname.match(/^\/c\/(\d+)\//) || [])[1] || '' } : null)],
    ['Rakuten Advertising', (u) => (on(u, 'linksynergy.com', 'click.linksynergy.com') ? { id: p(u, 'id') } : null)],
    ['ShareASale', (u) => (on(u, 'shareasale.com', 'shrsl.com') && (/r\.cfm/.test(u.pathname) || on(u, 'shrsl.com')) ? { id: p(u, 'u', 'userID') } : null)],
    ['ClickBank', (u) => (on(u, 'hop.clickbank.net') ? { id: p(u, 'affiliate') || (host(u).split('.').length === 5 ? host(u).split('.')[0] : '') } : null)],
    ['Partnerize', (u) => (on(u, 'prf.hn') ? { id: (u.pathname.match(/camref:([\w]+)/) || [])[1] || '' } : null)],
    ['Skimlinks', (u) => (on(u, 'go.skimresources.com', 'go.redirectingat.com') ? { id: p(u, 'id') } : null)],
    ['Sovrn Commerce', (u) => (on(u, 'redirect.viglink.com', 'sovrn.co') ? { id: p(u, 'key') } : null)],
    ['FlexOffers', (u) => (on(u, 'track.flexlinks.com', 'track.flexlinkspro.com') ? { id: p(u, 'foid') } : null)],
    ['Ascend (Pepperjam)', (u) => (on(u, 'pntra.com', 'pntrs.com', 'pntrac.com', 'gopjn.com') ? { id: '' } : null)],
    ['AvantLink', (u) => (on(u, 'avantlink.com') && /click/.test(u.pathname) ? { id: p(u, 'pw') } : null)],
    ['Admitad', (u) => (on(u, 'ad.admitad.com', 'alitems.com', 'admitad.com') && /\/g\//.test(u.pathname) ? { id: '' } : null)],
    ['Digistore24', (u) => (on(u, 'digistore24.com') && /\/redir\//.test(u.pathname) ? { id: (u.pathname.split('/')[3] || '') } : null)],
    ['JVZoo', (u) => (/^jvz\d+\.com$/.test(host(u)) && /^\/c\//.test(u.pathname) ? { id: (u.pathname.split('/')[2] || '') } : null)],
    ['WarriorPlus', (u) => (on(u, 'warriorplus.com') && /^\/o2\/a\//.test(u.pathname) ? { id: '' } : null)],
    ['Walmart (Impact)', (u) => (on(u, 'goto.walmart.com') ? { id: '' } : null)],
    ['Target (Impact)', (u) => (on(u, 'goto.target.com') ? { id: '' } : null)],
    ['Booking.com', (u) => (/(^|\.)booking\.com$/.test(host(u)) && p(u, 'aid') ? { id: p(u, 'aid') } : null)],
    ['Expedia Group', (u) => (on(u, 'expedia.com') && /^\/affiliate\//.test(u.pathname) ? { id: '' } : null)],
    ['Bluehost', (u) => (on(u, 'bluehost.com') && /\/track\//.test(u.pathname) ? { id: u.pathname.split('/')[2] || '' } : null)],
    ['SaaS referral (Rewardful/FirstPromoter/PartnerStack)', (u) => (p(u, 'via', 'fpr', 'fp_ref', 'gr_pk', 'ps_partner_key', 'ps_xid') ? { id: p(u, 'via', 'fpr', 'fp_ref', 'gr_pk', 'ps_partner_key') } : null)],
    ['Affiliate parameter', (u) => (p(u, 'aff', 'affid', 'aff_id', 'affiliate', 'affiliate_id', 'affiliateid', 'a_aid', 'clickref', 'irgwc', 'ranmid', 'refid', 'ref_id') || (p(u, 'ref') && !/^(nav|menu|footer|header|home|sidebar)/i.test(p(u, 'ref'))) || p(u, 'utm_medium').toLowerCase() === 'affiliate' ? { id: p(u, 'aff', 'affid', 'aff_id', 'affiliate', 'affiliate_id', 'affiliateid', 'a_aid', 'refid', 'ref_id', 'ref', 'clickref') } : null)],
  ];
  const CLOAK = /^\/(go|recommends?|out|refer|visit|aff|affiliate|goto|link|links|outbound|deal|deals|get|try)\/[^/]+/i;

  const here = location.hostname.replace(/^www\./, '');
  const anchors = [...document.querySelectorAll('a[href]')];
  const links = [];
  anchors.forEach((a, i) => {
    let u;
    try { u = new URL(a.getAttribute('href'), location.href); } catch (e) { return; }
    if (!/^https?:$/.test(u.protocol)) return;
    let network = '', id = '';
    for (const [name, test] of NETWORKS) { const r = test(u); if (r) { network = name; id = r.id || ''; break; } }
    const internal = host(u) === here;
    if (!network && internal && CLOAK.test(u.pathname)) network = 'Cloaked redirect (likely affiliate)';
    if (!network) return;
    const rel = (a.getAttribute('rel') || '').toLowerCase().split(/\s+/).filter(Boolean);
    const r = a.getBoundingClientRect(), cs = getComputedStyle(a);
    const text = (a.innerText || a.textContent || '').trim().replace(/\s+/g, ' ') || (a.querySelector('img') ? '[image: ' + (a.querySelector('img').alt || 'no alt') + ']' : '[no text]');
    links.push({
      i, network, id, href: u.href, text: text.slice(0, 120),
      sponsored: rel.includes('sponsored'), nofollow: rel.includes('nofollow'), rel: rel.join(' '),
      newTab: a.target === '_blank', hidden: (r.width === 0 && r.height === 0) || cs.visibility === 'hidden' || cs.display === 'none',
    });
  });

  // Disclosure: look for typical wording in the visible text, and whether it appears before the first affiliate link.
  const DISC = /(affiliate (link|commission|disclosure|partner)|as an amazon associate|we (may )?earn (a )?(small )?commission|earn(s)? (a )?commission|paid link|sponsored (post|content|link)|advertis(ing|er) disclosure|we (may )?(receive|get) (compensation|paid)|compensated|commission at no (extra )?cost)/i;
  let disclosure = null;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const t = n.nodeValue;
    if (t && DISC.test(t) && n.parentElement && n.parentElement.offsetParent !== null) {
      const m = t.match(DISC);
      const firstLink = links.length ? anchors[links[0].i] : null;
      const before = firstLink ? !!(n.compareDocumentPosition(firstLink) & Node.DOCUMENT_POSITION_FOLLOWING) : true;
      disclosure = { phrase: m[0], before, snippet: t.trim().replace(/\s+/g, ' ').slice(0, 140) };
      break;
    }
  }
  return { url: location.href, title: document.title, total: anchors.length, links, disclosure };
}

// Highlight / un-highlight affiliate links on the page. Also self-contained; runs inside the page.
function highlightLinks(indexes, on) {
  const STYLE_ID = 'gm-aff-style';
  document.querySelectorAll('[data-gm-aff]').forEach((a) => a.removeAttribute('data-gm-aff'));
  document.getElementById(STYLE_ID)?.remove();
  if (!on) return 0;
  const st = document.createElement('style');
  st.id = STYLE_ID;
  st.textContent = 'a[data-gm-aff="ok"]{outline:3px solid #12b76a!important;outline-offset:2px!important;background:rgba(18,183,106,.12)!important}' +
    'a[data-gm-aff="bad"]{outline:3px dashed #f04438!important;outline-offset:2px!important;background:rgba(240,68,56,.12)!important}';
  document.head.appendChild(st);
  const anchors = document.querySelectorAll('a[href]');
  indexes.forEach(([i, good]) => anchors[i] && anchors[i].setAttribute('data-gm-aff', good ? 'ok' : 'bad'));
  return indexes.length;
}

function scrollToLink(i) {
  const a = document.querySelectorAll('a[href]')[i];
  if (!a) return false;
  a.scrollIntoView({ behavior: 'smooth', block: 'center' });
  const old = a.style.boxShadow;
  a.style.boxShadow = '0 0 0 6px rgba(11,110,79,.55)';
  setTimeout(() => (a.style.boxShadow = old), 1800);
  return true;
}
