/* aff-track.js v1 - one affiliate_click GA4 event for every outbound affiliate click.
   Same file on every site (TCS, SWL, KW, BTL, SCL, WV, SFF, GrowthMath).
   Params: program, placement, sub_id, link_url, link_domain, page_path, page_lang, site.
   Debug: add ?aff_debug=1 to any page (then the events also show in GA4 DebugView). */
(function () {
  if (window.__affTrack) return;
  window.__affTrack = 1;

  // [host regex, path regex or null, program]. First match wins.
  var RULES = [
    [/(^|\.)stripchat\.com$|^go\.(mavrtracktor|whitetrafsa|rmhfrtnd|xlviiirdr)\.com$/, null, 'Stripchat'],
    [/(^|\.)chaturbate\.com$/, null, 'Chaturbate'],
    [/(^|\.)livematures\.com$/, null, 'LiveMatures'],
    [/(^|\.)cams-24\.com$/, null, 'Cams-24'],
    [/(^|\.)crakrevenue\.com$/, null, 'CrakRevenue'],
    [/./, /^\/62181\//, 'CrakRevenue'],
    [/(^|\.)bongacams\d*\.com$|(^|\.)bngprm\.com$/, null, 'BongaCams'],
    [/(^|\.)adultfriendfinder\.com$/, null, 'AdultFriendFinder'],
    [/(^|\.)sdc\.com$/, null, 'SDC'],
    [/(^|\.)ashleymadison\.com$/, null, 'Ashley Madison'],
    [/(^|\.)nubiles\.net$/, null, 'Nubiles'],
    [/betonlineaffiliates\.ag$/, null, 'BetOnline'],
    [/tigergamingaffiliates\.com$/, null, 'TigerGaming'],
    [/sportsbettingaffiliates\.ag$/, null, 'SportsBetting.ag'],
    [/(^|\.)webpartners\.co$/, null, 'MyBookie'],
    [/(^|\.)systeme\.io$/, null, 'Systeme.io'],
    [/(^|\.)traffic-goat\.com$/, null, 'Traffic Goat']
  ];
  // Slugs of same-site cloaked links (/recommends/<slug>/, /go/<slug>).
  var SLUGS = [
    [/^stripchat|^stripcash/, 'Stripchat'], [/^chaturbate/, 'Chaturbate'],
    [/^livematures/, 'LiveMatures'], [/^cams-?24/, 'Cams-24'], [/^bonga/, 'BongaCams'],
    [/^systeme/, 'Systeme.io'], [/^crak/, 'CrakRevenue']
  ];

  function program(u, a) {
    var h = u.hostname.toLowerCase().replace(/^www\./, ''), i, r;
    var self = location.hostname.replace(/^www\./, '');
    if (h === self) {
      var m = u.pathname.match(/^\/(?:[a-z-]{2,5}\/)?(?:recommends|go|out|visit)\/([^\/?#]+)/i);
      if (!m) return null;
      var slug = m[1].toLowerCase();
      for (i = 0; i < SLUGS.length; i++) if (SLUGS[i][0].test(slug)) return SLUGS[i][1];
      return slug;
    }
    for (i = 0; i < RULES.length; i++) {
      r = RULES[i];
      if (r[0].test(h) && (!r[1] || r[1].test(u.pathname))) return r[2];
    }
    if (/[?&]userId=7202a06c/i.test(u.search)) return 'Stripchat';
    if (/(^|\s)sponsored(\s|$)/i.test(a.getAttribute('rel') || '')) return 'Other: ' + h;
    return null;
  }

  function placement(a) {
    var p = a.getAttribute('data-placement');
    if (p) return p;
    if (a.hasAttribute('data-hcp')) return 'hcp-' + a.getAttribute('data-hcp');
    var zones = [
      ['#hcp-bar', 'hcp-bar'], ['.hcp-box', 'hcp-box'], ['[data-placement]', null],
      ['header,nav,.site-header,#masthead', 'nav'], ['footer,.site-footer,#colophon', 'footer'],
      ['aside,.sidebar,.widget-area,#secondary', 'sidebar'], ['.wv-toplist,.wv-op', 'toplist'],
      ['table', 'table']
    ];
    for (var i = 0; i < zones.length; i++) {
      var z = a.closest(zones[i][0]);
      if (z) return zones[i][1] || z.getAttribute('data-placement');
    }
    return 'content';
  }

  function subId(u) {
    var q = u.searchParams, keys = ['creativeId', 'campaignId', 'track', 'AFNO', 'aff_sub', 'sourceId', 'subid', 'btag'];
    var out = [];
    for (var i = 0; i < keys.length; i++) if (q.get(keys[i])) out.push(q.get(keys[i]));
    return out.join('|').slice(0, 100) || undefined;
  }

  function lang() {
    var m = location.pathname.match(/^\/(ja|pt-br|es|hi)(\/|$)/);
    return m ? m[1] : (document.documentElement.lang || 'en').toLowerCase().split('-')[0];
  }

  var debug = /[?&]aff_debug=1/.test(location.search);

  function send(e) {
    if (e.type === 'auxclick' && e.button !== 1) return;
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var u;
    try { u = new URL(a.href, location.href); } catch (x) { return; }
    if (!/^https?:$/.test(u.protocol)) return;
    var prog = program(u, a);
    if (!prog) return;
    var params = {
      program: prog,
      placement: placement(a),
      sub_id: subId(u),
      link_url: u.href.slice(0, 100),
      link_domain: u.hostname.replace(/^www\./, ''),
      page_path: location.pathname.slice(0, 100),
      page_lang: lang(),
      site: location.hostname.replace(/^www\./, ''),
      transport_type: 'beacon'
    };
    if (debug) { params.debug_mode = true; console.log('[aff-track] affiliate_click', params); }
    if (typeof window.gtag !== 'function') {
      if (!window.dataLayer) return;
      window.gtag = function () { window.dataLayer.push(arguments); };
    }
    window.gtag('event', 'affiliate_click', params);
  }

  document.addEventListener('click', send, true);
  document.addEventListener('auxclick', send, true);
})();
