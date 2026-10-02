// Browser test harness: paste into a page on the site (or load via the preview) and run `await runAll(base)`.
// Each case sets inputs, fires 'input', and compares output text to values worked out by hand.
window.CASES = [
  // ---- ROAS
  { t: 'roas-calculator', in: { spend: 1000, rev: 3500, margin: 40 }, out: { o_roas: '3.5x', o_be: '2.5x', o_profit: '$400.00', o_pct: '350%', o_maxcpa: '$1,400.00' } },
  { t: 'roas-calculator', in: { spend: 2000, rev: 3000, margin: 25 }, out: { o_roas: '1.5x', o_be: '4x', o_profit: '-$1,250.00' }, verdict: /Losing money/ },
  { t: 'roas-calculator', in: { spend: 0, rev: 3000, margin: 25 }, out: { o_roas: '-', o_be: '-' } },
  { t: 'roas-calculator', in: { spend: 1000, rev: 3500, margin: 0 }, out: { o_roas: '3.5x', o_be: '-', o_profit: '-' } },
  { t: 'roas-calculator', in: { spend: -5, rev: 3500, margin: 40 }, out: { o_roas: '-' } },
  { t: 'roas-calculator', in: { spend: 1000, rev: 3500, margin: 150 }, out: { o_be: '-' } },
  // ---- CPM/CPC/CPA
  { t: 'cpm-cpc-cpa-calculator', in: { spend: 500, imp: 120000, clk: 1800, conv: 45 }, out: { o_cpm: '$4.17', o_cpc: '$0.28', o_ctr: '1.5%', o_cvr: '2.5%', o_cpa: '$11.11' } },
  { t: 'cpm-cpc-cpa-calculator', in: { spend: 100, imp: 0, clk: 0, conv: 0 }, out: { o_cpm: '-', o_cpc: '-', o_ctr: '-', o_cvr: '-', o_cpa: '-' } },
  // ---- Break-even CPA: gp=(80-35)=45; target=45-80*.2=29; cpc=29*.025=0.725; roas=80/45=1.78
  { t: 'break-even-cpa-calculator', in: { aov: 80, cogs: 35, orders: 1, tprofit: 20, cvr: 2.5 }, out: { o_be: '$45.00', o_target: '$29.00', o_cpc: '$0.73', o_roas: '1.78x', o_gp: '$45.00' } },
  // 2 orders: gp=90, target=90-160*.2=58
  { t: 'break-even-cpa-calculator', in: { aov: 80, cogs: 35, orders: 2, tprofit: 20, cvr: 2.5 }, out: { o_be: '$90.00', o_target: '$58.00' } },
  // ---- Affiliate EPC: sales=2000*.03=60, per=60*.3=18, earn=1080, epc=.54, need=ceil(3000/.54)=5556
  { t: 'affiliate-commission-calculator', in: { clicks: 2000, cvr: 3, aov: 60, com: 30, flat: '', goal: 3000 }, out: { o_earn: '$1,080.00', o_epc: '$0.54', o_sales: '60', o_per: '$18.00', o_need: '5,556' } },
  // flat CPA overrides %: per=40, epc=1.2, earn=2400
  { t: 'affiliate-commission-calculator', in: { clicks: 2000, cvr: 3, aov: 60, com: 30, flat: 40, goal: 3000 }, out: { o_earn: '$2,400.00', o_epc: '$1.20', o_per: '$40.00', o_need: '2,500' } },
  // ---- Revenue leak: dormant 360, rec 54, leak 18900
  { t: 'affiliate-revenue-leak-calculator', in: { approved: 400, active: 40, avg: 350, rate: 15 }, out: { o_leak: '$18,900', o_dorm: '360', o_act: '10%', o_rec: '54', o_year: '$226,800' } },
  { t: 'affiliate-revenue-leak-calculator', in: { approved: 40, active: 60, avg: 350, rate: 15 }, out: { o_leak: '$0', o_dorm: '0' } },
  // ---- LTV: rev 500, ltv 300, ratio 5, payback 60/(50*4*.6/12=10)=6
  { t: 'customer-ltv-calculator', in: { aov: 50, freq: 4, life: 2.5, gm: 60, cac: 60 }, out: { o_ltv: '$300.00', o_rev: '$500.00', o_ratio: '5 : 1', o_pay: '6 months', o_max: '$100.00' } },
  { t: 'customer-ltv-calculator', in: { aov: 50, freq: 4, life: 2.5, gm: 60, cac: 400 }, out: { o_ratio: '0.8 : 1' }, verdict: /lose money/ },
  // ---- Margin: 40 -> 100 = 60% margin, 150% markup; 50% target -> $80, 100% markup
  { t: 'profit-margin-calculator', in: { cost: 40, price: 100, tm: 50 }, out: { o_m: '60%', o_mu: '150%', o_p: '$60.00', o_tp: '$80.00', o_tmu: '100%' } },
  { t: 'profit-margin-calculator', in: { cost: 120, price: 100, tm: 100 }, out: { o_m: '-20%', o_p: '-$20.00', o_tp: '-' } },
  // ---- A/B: z=2.207, p=0.0273
  { t: 'ab-test-significance-calculator', in: { va: 5000, ca: 150, vb: 5000, cb: 190 }, out: { o_ra: '3%', o_rb: '3.8%', o_up: '26.7%', o_p: '0.0273', o_conf: '97.3%' }, verdict: /Significant/ },
  { t: 'ab-test-significance-calculator', in: { va: 1000, ca: 50, vb: 1000, cb: 50 }, out: { o_p: '1', o_conf: '0%' }, verdict: /Not significant/ },
  { t: 'ab-test-significance-calculator', in: { va: 100, ca: 150, vb: 100, cb: 10 }, out: { o_conf: '-' }, verdict: /cannot be higher/ },
];

window.runAll = async (base = '') => {
  const fails = [], log = [];
  for (const c of window.CASES) {
    const f = document.createElement('iframe'); f.style.cssText = 'width:900px;height:600px'; f.src = base + '/' + c.t + '/';
    document.body.appendChild(f); await new Promise((r) => (f.onload = r));
    const d = f.contentDocument;
    for (const [k, v] of Object.entries(c.in)) { const el = d.getElementById(k); el.value = v; }
    d.getElementById(Object.keys(c.in)[0]).dispatchEvent(new Event('input', { bubbles: true }));
    for (const [k, v] of Object.entries(c.out)) { const got = d.getElementById(k).textContent.trim(); if (got !== v) fails.push(`${c.t} ${JSON.stringify(c.in)} ${k}: expected "${v}" got "${got}"`); }
    if (c.verdict) { const vt = d.getElementById('o_v').textContent; if (!c.verdict.test(vt)) fails.push(`${c.t} verdict: "${vt}"`); }
    log.push(c.t); f.remove();
  }
  return { cases: window.CASES.length, fails };
};
