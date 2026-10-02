// Every tool on the site. build.mjs turns each entry into /<slug>/index.html.
// Keep content genuinely useful - AdSense reviews thin tool pages as "low value content".

const f = (id, label, value, o = {}) => `
<div class="field"><label for="${id}">${label}</label>
<div class="inp${o.pre ? ' has-pre' : ''}${o.suf ? ' has-suf' : ''}">${o.pre ? `<span class="pre">${o.pre}</span>` : ''}<input id="${id}" type="text" inputmode="decimal" value="${value}" autocomplete="off">${o.suf ? `<span class="suf">${o.suf}</span>` : ''}</div>
${o.hint ? `<div class="hint">${o.hint}</div>` : ''}</div>`;

const stat = (id, label) => `<div class="stat"><span>${label}</span><strong id="${id}">-</strong></div>`;

export const categories = {
  ads: 'Paid ads',
  affiliate: 'Affiliate marketing',
  ecom: 'E-commerce & business',
  seo: 'SEO & tracking',
  cro: 'Testing & CRO',
};

export const tools = [
  // ---------------------------------------------------------------- ROAS
  {
    slug: 'roas-calculator',
    cat: 'ads',
    name: 'ROAS Calculator',
    short: 'Return on ad spend plus your break-even ROAS from margin.',
    title: 'ROAS Calculator - Return on Ad Spend + Break-Even ROAS',
    desc: 'Free ROAS calculator. Enter ad spend and revenue to get ROAS, profit and your break-even ROAS based on profit margin. Works for Google, Meta and TikTok ads.',
    h1: 'ROAS Calculator',
    lede: 'Find your return on ad spend - and, more importantly, the ROAS you actually need to stop losing money.',
    tool: `<div>
${f('spend', 'Ad spend', '1000', { pre: '$' })}
${f('rev', 'Revenue from ads', '3500', { pre: '$' })}
${f('margin', 'Gross margin', '40', { suf: '%', hint: 'Revenue left after product cost, shipping and fees - before ad spend.' })}
</div>
<div class="out">
<div class="big-label">Your ROAS</div><div class="big" id="o_roas">-</div>
<div class="stats">${stat('o_be', 'Break-even ROAS')}${stat('o_profit', 'Profit after ads')}${stat('o_pct', 'ROAS as %')}${stat('o_maxcpa', 'Max ad spend at break-even')}</div>
<div class="verdict" id="o_v"></div></div>`,
    js: `live(() => {
  const s = num('spend'), r = num('rev'), m0 = num('margin') / 100, m = m0 > 0 && m0 <= 1 ? m0 : NaN;
  if (!ok(s, r) || s <= 0) return;
  const roas = r / s, be = m > 0 ? 1 / m : NaN, profit = r * m - s;
  set('o_roas', fnum(roas) + 'x'); set('o_pct', pct(roas * 100, 0));
  set('o_be', ok(be) ? fnum(be) + 'x' : '-'); set('o_profit', ok(profit) ? money(profit) : '-');
  set('o_maxcpa', ok(m) ? money(r * m) : '-');
  $('o_roas').classList.toggle('bad', ok(be) && roas < be);
  set('o_v', !ok(be) ? 'Enter a gross margin between 1% and 100% to see if this campaign is profitable.' :
    roas >= be ? 'Profitable: your ' + fnum(roas) + 'x ROAS beats the ' + fnum(be) + 'x you need to break even.' :
    'Losing money: you need ' + fnum(be) + 'x ROAS at a ' + pct(m * 100, 0) + ' margin. Cut spend or raise margin.');
});`,
    content: `
<h2>What is ROAS?</h2>
<p>ROAS (return on ad spend) is the revenue your ads generate for every dollar you spend on them. A ROAS of 3.5x means $3.50 in revenue for each $1 of ad spend.</p>
<div class="formula">ROAS = Revenue from ads / Ad spend</div>
<h2>Break-even ROAS: the number that actually matters</h2>
<p>A "good" ROAS is meaningless without your margin. If you keep 40 cents of every sales dollar after product and fulfilment costs, every $1 of ads needs to bring in $2.50 just to break even.</p>
<div class="formula">Break-even ROAS = 1 / Gross margin</div>
<div class="tscroll"><table class="t"><tr><th>Gross margin</th><th>Break-even ROAS</th><th>Typical business</th></tr>
<tr><td>20%</td><td>5.0x</td><td>Electronics, resellers</td></tr>
<tr><td>30%</td><td>3.3x</td><td>General e-commerce</td></tr>
<tr><td>50%</td><td>2.0x</td><td>Apparel, private label</td></tr>
<tr><td>70%</td><td>1.4x</td><td>Cosmetics, supplements</td></tr>
<tr><td>90%</td><td>1.1x</td><td>SaaS, digital products, courses</td></tr></table></div>
<h2>How to use this calculator</h2>
<ol><li>Enter the ad spend for the period (campaign, week or month).</li><li>Enter the revenue attributed to those ads in your ad platform or analytics.</li><li>Enter your gross margin to get break-even ROAS and true profit after ads.</li></ol>
<p>If your ROAS is below break-even, every sale is costing you money - even when the dashboard looks "green". Either lower acquisition cost, raise average order value, or improve margin.</p>
<h2>ROAS vs. ROI</h2>
<p>ROAS only looks at revenue versus ad spend. ROI subtracts all costs (product, fees, staff, tools) and compares profit to investment. A campaign can have a 3x ROAS and still a negative ROI. Use ROAS to steer campaigns day-to-day and ROI to judge the business.</p>`,
    faq: [
      ['What is a good ROAS?', 'A common rule of thumb is 4x, but the real answer depends on margin. A 90%-margin digital product is profitable at 1.2x, while a 20%-margin reseller needs more than 5x.'],
      ['Is ROAS the same as ROI?', 'No. ROAS compares revenue to ad spend only. ROI compares profit to the total investment including product and operating costs.'],
      ['How do I calculate ROAS in percent?', 'Multiply ROAS by 100. A 3.5x ROAS is 350%.'],
    ],
    related: ['cpm-cpc-cpa-calculator', 'break-even-cpa-calculator', 'profit-margin-calculator'],
  },

  // ---------------------------------------------------------------- CPM/CPC/CPA
  {
    slug: 'cpm-cpc-cpa-calculator',
    cat: 'ads',
    name: 'CPM, CPC & CPA Calculator',
    short: 'All your ad cost metrics - CPM, CPC, CTR, CPA, conversion rate - at once.',
    title: 'CPM, CPC & CPA Calculator - All Ad Metrics in One',
    desc: 'Calculate CPM, CPC, CTR, CPA and conversion rate from ad spend, impressions, clicks and conversions. Free ad metrics calculator for any ad platform.',
    h1: 'CPM, CPC & CPA Calculator',
    lede: 'Paste the four numbers from any ad dashboard and get every cost and rate metric instantly.',
    tool: `<div>
${f('spend', 'Ad spend', '500', { pre: '$' })}
<div class="row2">${f('imp', 'Impressions', '120000')}${f('clk', 'Clicks', '1800')}</div>
${f('conv', 'Conversions', '45', { hint: 'Sales, leads or sign-ups - whatever you optimise for.' })}
</div>
<div class="out">
<div class="big-label">Cost per acquisition (CPA)</div><div class="big" id="o_cpa">-</div>
<div class="stats">${stat('o_cpm', 'CPM (per 1,000 views)')}${stat('o_cpc', 'CPC (per click)')}${stat('o_ctr', 'CTR')}${stat('o_cvr', 'Conversion rate')}</div>
<div class="verdict" id="o_v"></div></div>`,
    js: `live(() => {
  const s = num('spend'), i = num('imp'), c = num('clk'), v = num('conv');
  set('o_cpm', ok(s, i) && i > 0 ? money(s / i * 1000) : '-');
  set('o_cpc', ok(s, c) && c > 0 ? money(s / c) : '-');
  set('o_ctr', ok(c, i) && i > 0 ? pct(c / i * 100) : '-');
  set('o_cvr', ok(v, c) && c > 0 ? pct(v / c * 100) : '-');
  set('o_cpa', ok(s, v) && v > 0 ? money(s / v) : '-');
  const ctr = c / i * 100;
  set('o_v', ok(ctr) ? (ctr < 0.9 ? 'CTR under 0.9% is weak for most platforms - test new creative or tighter targeting.' : ctr > 2 ? 'CTR above 2% is strong - if CPA is still high, the problem is the landing page, not the ad.' : 'CTR is in the normal range. Watch conversion rate for the next lever.') : '');
});`,
    content: `
<h2>The formulas</h2>
<div class="formula">CPM = Spend / Impressions x 1,000<br>CPC = Spend / Clicks<br>CTR = Clicks / Impressions x 100<br>Conversion rate = Conversions / Clicks x 100<br>CPA = Spend / Conversions</div>
<h2>How the metrics connect</h2>
<p>These numbers are a chain. CPA is simply CPC divided by conversion rate, and CPC is CPM divided by (CTR x 10). That tells you where to look when costs rise:</p>
<ul><li><b>High CPM</b> - you are paying a lot to be seen. Audience is small or competitive, or it is a seasonal peak (Q4).</li><li><b>Low CTR</b> - the ad is not earning the click. Fix the hook, image or offer.</li><li><b>Low conversion rate</b> - people click but do not buy. Fix the landing page, price or trust signals.</li></ul>
<h2>Typical benchmarks</h2>
<div class="tscroll"><table class="t"><tr><th>Platform</th><th>Typical CPM</th><th>Typical CTR</th></tr>
<tr><td>Meta (Facebook/Instagram)</td><td>$8 - $20</td><td>0.9% - 1.5%</td></tr>
<tr><td>Google Search</td><td>n/a (CPC based)</td><td>3% - 6%</td></tr>
<tr><td>Google Display</td><td>$2 - $6</td><td>0.3% - 0.6%</td></tr>
<tr><td>TikTok</td><td>$5 - $12</td><td>0.8% - 1.5%</td></tr>
<tr><td>LinkedIn</td><td>$25 - $60</td><td>0.4% - 0.7%</td></tr></table></div>
<p class="small muted">Benchmarks vary widely by country, industry and season - treat them as a rough sanity check, not a target.</p>`,
    faq: [
      ['What is the difference between CPM and CPC?', 'CPM is the cost of 1,000 ad impressions. CPC is the cost of a single click. You can convert between them with CTR: CPC = CPM / (CTR x 10).'],
      ['What is a good CPA?', 'Any CPA below the profit you make per conversion. Use the break-even CPA calculator to find your ceiling.'],
      ['Does this work for Google Ads and Meta Ads?', 'Yes. The formulas are the same on every platform - just copy spend, impressions, clicks and conversions from the dashboard.'],
    ],
    related: ['roas-calculator', 'break-even-cpa-calculator', 'ab-test-significance-calculator'],
  },

  // ---------------------------------------------------------------- Break-even CPA
  {
    slug: 'break-even-cpa-calculator',
    cat: 'ads',
    name: 'Break-Even CPA Calculator',
    short: 'The most you can pay for a customer before an ad campaign loses money.',
    title: 'Break-Even CPA Calculator - Max Cost per Acquisition',
    desc: 'Find the maximum CPA you can afford. Enter price, costs and repeat purchases to get break-even CPA, target CPA and max CPC for your ads.',
    h1: 'Break-Even CPA Calculator',
    lede: 'Know your ceiling before you launch: the highest cost per customer your numbers can survive.',
    tool: `<div>
${f('aov', 'Average order value', '80', { pre: '$' })}
${f('cogs', 'Cost per order (product + shipping + fees)', '35', { pre: '$' })}
${f('orders', 'Orders per customer (lifetime)', '1', { hint: 'Leave at 1 to judge on the first purchase only.' })}
<div class="row2">${f('tprofit', 'Target profit (% of revenue)', '20', { suf: '%' })}${f('cvr', 'Landing page conv. rate', '2.5', { suf: '%' })}</div>
</div>
<div class="out">
<div class="big-label">Break-even CPA</div><div class="big" id="o_be">-</div>
<div class="stats">${stat('o_target', 'Target CPA (with profit)')}${stat('o_cpc', 'Max CPC at your conv. rate')}${stat('o_roas', 'Break-even ROAS')}${stat('o_gp', 'Gross profit per customer')}</div>
</div>`,
    js: `live(() => {
  const aov = num('aov'), cogs = num('cogs'), n = num('orders') || 1, tp = num('tprofit') / 100, cvr = num('cvr') / 100;
  if (!ok(aov, cogs)) return;
  const gp = (aov - cogs) * n, be = gp, target = gp - aov * n * (ok(tp) ? tp : 0);
  set('o_be', money(be)); set('o_gp', money(gp));
  set('o_target', money(target));
  set('o_cpc', ok(cvr) ? money(target * cvr) : '-');
  set('o_roas', gp > 0 ? fnum(aov * n / gp) + 'x' : '-');
  $('o_be').classList.toggle('bad', be <= 0);
});`,
    content: `
<h2>What break-even CPA means</h2>
<p>Break-even CPA is the gross profit one customer brings you. Pay exactly that to acquire them and you make zero; pay less and you profit.</p>
<div class="formula">Break-even CPA = (Average order value - Cost per order) x Orders per customer</div>
<h2>From CPA to max CPC</h2>
<p>Ad platforms bill per click, so it helps to turn your CPA ceiling into a bid ceiling. If 2.5% of visitors buy, you get one customer every 40 clicks, so each click is worth your target CPA divided by 40.</p>
<div class="formula">Max CPC = Target CPA x Conversion rate</div>
<h2>First purchase vs. lifetime</h2>
<p>Many profitable brands lose money on the first order and earn it back on repeat purchases. If you know customers buy 2.3 times on average, enter 2.3 - but only if you have the cash flow to wait for those repeat orders.</p>`,
    faq: [
      ['What is the difference between CPA and CAC?', 'CPA usually refers to the ad cost per conversion inside one channel. CAC (customer acquisition cost) includes all sales and marketing costs across channels.'],
      ['Should I include repeat purchases?', 'Include them if you have solid retention data and enough cash flow. Otherwise judge on the first purchase to stay safe.'],
    ],
    related: ['roas-calculator', 'customer-ltv-calculator', 'cpm-cpc-cpa-calculator'],
  },

  // ---------------------------------------------------------------- Affiliate EPC
  {
    slug: 'affiliate-commission-calculator',
    cat: 'affiliate',
    name: 'Affiliate Commission & EPC Calculator',
    short: 'Estimate affiliate earnings, EPC and the traffic you need to hit a goal.',
    title: 'Affiliate Commission & EPC Calculator - Earnings per Click',
    desc: 'Estimate affiliate income. Enter clicks, conversion rate, order value and commission to get monthly earnings, EPC, and the clicks needed to reach your income goal.',
    h1: 'Affiliate Commission & EPC Calculator',
    lede: 'Compare affiliate offers by what they actually pay per click - and see how much traffic your income goal needs.',
    tool: `<div>
${f('clicks', 'Monthly clicks to the offer', '2000')}
${f('cvr', 'Conversion rate', '3', { suf: '%' })}
<div class="row2">${f('aov', 'Average sale value', '60', { pre: '$' })}${f('com', 'Commission', '30', { suf: '%' })}</div>
${f('flat', 'Or flat CPA payout per sale', '', { pre: '$', hint: 'Fill this in instead of %, e.g. for CPA/CPL offers.' })}
${f('goal', 'Monthly income goal', '3000', { pre: '$' })}
</div>
<div class="out">
<div class="big-label">Estimated monthly earnings</div><div class="big" id="o_earn">-</div>
<div class="stats">${stat('o_epc', 'EPC (earnings per click)')}${stat('o_sales', 'Sales per month')}${stat('o_per', 'Payout per sale')}${stat('o_need', 'Clicks needed for goal')}</div>
</div>`,
    js: `live(() => {
  const c = num('clicks'), cvr = num('cvr') / 100, aov = num('aov'), com = num('com') / 100, flat = num('flat'), goal = num('goal');
  const per = ok(flat) && flat > 0 ? flat : aov * com;
  if (!ok(c, cvr, per)) return;
  const sales = c * cvr, earn = sales * per, epc = cvr * per;
  set('o_earn', money(earn)); set('o_epc', money(epc)); set('o_sales', fnum(sales, 1)); set('o_per', money(per));
  set('o_need', ok(goal) && epc > 0 ? fnum(Math.ceil(goal / epc), 0) : '-');
});`,
    content: `
<h2>What is EPC?</h2>
<p>EPC (earnings per click) is the average amount you earn every time someone clicks your affiliate link. It is the single best number for comparing offers, because it combines commission size and conversion rate into one figure.</p>
<div class="formula">EPC = Conversion rate x Payout per sale<br>Monthly earnings = Clicks x EPC</div>
<h2>Why a 50% commission can lose to a 10% one</h2>
<p>A 50% commission on a $20 product that converts at 1% earns $0.10 per click. A 10% commission on a $400 product that converts at 2% earns $0.80 per click - eight times more for the same traffic. Always compare EPC, not commission rate.</p>
<h2>Working backwards from a goal</h2>
<p>Divide your income goal by EPC to see the traffic you need. If $3,000/month needs 50,000 clicks, you know whether the plan is realistic - and whether to find a higher-EPC offer first.</p>
<h2>Where to find real conversion rates</h2>
<p>Most affiliate networks show network-wide EPC on the offer page. Use it as a starting estimate, then replace it with your own numbers after a few hundred clicks - your audience will convert differently.</p>`,
    faq: [
      ['What is a good EPC?', 'It depends on the niche. $0.10 - $0.50 is common for retail, while finance, software and dating offers often pay $1 - $5+ per click.'],
      ['Is EPC shown per click or per 100 clicks?', 'Some networks (such as CJ) show EPC per 100 clicks. Divide by 100 to compare with this calculator.'],
    ],
    related: ['affiliate-revenue-leak-calculator', 'dormant-affiliate-finder', 'utm-builder'],
    cta: true,
  },

  // ---------------------------------------------------------------- Revenue leak (ported from Traffic Goat)
  {
    slug: 'affiliate-revenue-leak-calculator',
    cat: 'affiliate',
    name: 'Affiliate Program Revenue Leak Calculator',
    short: 'For program owners: what your dormant affiliates are costing you each month.',
    title: 'Affiliate Revenue Leak Calculator - Cost of Dormant Affiliates',
    desc: 'Most affiliate programs have 80%+ inactive partners. Calculate how much monthly revenue your dormant affiliates are leaving on the table.',
    h1: 'Affiliate Program Revenue Leak Calculator',
    lede: 'In most affiliate programs, 80-90% of approved partners never send a sale. Here is what that costs you.',
    tool: `<div>
${f('approved', 'Approved affiliates', '400')}
${f('active', 'Active affiliates (sent a sale in the last 90 days)', '40')}
${f('avg', 'Average monthly revenue per active affiliate', '350', { pre: '$' })}
${f('rate', 'Realistic reactivation rate', '15', { suf: '%', hint: 'A structured outreach campaign typically wakes up 10-20% of dormant partners.' })}
</div>
<div class="out">
<div class="big-label">Monthly revenue leak</div><div class="big bad" id="o_leak">-</div>
<div class="stats">${stat('o_dorm', 'Dormant affiliates')}${stat('o_act', 'Activation rate')}${stat('o_rec', 'Recoverable partners')}${stat('o_year', 'Annual leak')}</div>
</div>`,
    js: `live(() => {
  const a = num('approved'), act = num('active'), avg = num('avg'), r = num('rate') / 100;
  if (!ok(a, act, avg, r)) return;
  const d = Math.max(a - act, 0), rec = Math.round(d * r), leak = rec * avg;
  set('o_leak', money(leak, 0)); set('o_dorm', fnum(d, 0)); set('o_rec', fnum(rec, 0));
  set('o_act', a > 0 ? pct(act / a * 100, 1) : '-'); set('o_year', money(leak * 12, 0));
});`,
    content: `
<h2>The dormant affiliate problem</h2>
<p>Affiliate programs follow a steep power law: a handful of partners drive most of the revenue, and the majority sign up, grab a link and never promote. It is widely reported across the industry that most approved affiliates - often 80% or more - never drive a single sale.</p>
<p>Each of those partners already passed your approval process. They know your brand and they have an audience. Waking up even a small share of them is usually far cheaper than recruiting new ones.</p>
<div class="formula">Monthly leak = (Approved - Active) x Reactivation rate x Revenue per active affiliate</div>
<h2>How to recover the leak</h2>
<ol><li><b>Segment by time since last activity</b> - 14, 30 and 60+ days dark need different messages. Our free <a href="/dormant-affiliate-finder/">Dormant Affiliate Finder</a> does this from a CSV.</li><li><b>Remove friction</b> - ready-made creatives, swipe copy and a deep-link generator.</li><li><b>Give a reason to act now</b> - a time-limited commission bump or bonus for the first sale.</li><li><b>Talk to the top 10% personally</b> - a short call beats any automated sequence.</li></ol>`,
    faq: [
      ['What is a normal affiliate activation rate?', 'Many programs see only 10-20% of approved affiliates generating sales in a given quarter. Above 25% is strong.'],
      ['How is "active" defined?', 'This calculator treats an affiliate as active if they drove at least one sale in the last 90 days. Use whatever definition your network reports.'],
    ],
    related: ['dormant-affiliate-finder', 'affiliate-commission-calculator', 'customer-ltv-calculator'],
    cta: true,
  },

  // ---------------------------------------------------------------- Dormant affiliate finder (ported)
  {
    slug: 'dormant-affiliate-finder',
    cat: 'affiliate',
    name: 'Dormant Affiliate Finder + Email Generator',
    short: 'Upload a CSV, flag inactive partners by tier, get reactivation emails.',
    title: 'Dormant Affiliate Finder - Free Reactivation Email Generator',
    desc: 'Upload your affiliate list as CSV. Flag dormant partners by 14/30/60+ days of inactivity and generate ready-to-send reactivation emails. Runs in your browser.',
    h1: 'Dormant Affiliate Finder + Email Generator',
    lede: 'Upload your affiliate list. Get everyone who has gone quiet, sorted by how long, with a reactivation email for each. Your file never leaves your browser.',
    single: true,
    tool: `<div>
<div class="drop" id="drop"><b>Click to upload</b> or drag a CSV here<br><span class="small muted">Columns needed: <code>name</code>, <code>last_active_date</code> (YYYY-MM-DD). Optional: <code>email</code></span><input type="file" id="file" accept=".csv,text/csv" hidden></div>
<p class="small muted" style="margin:10px 0 0">No file handy? <a href="#" id="sample">Try it with sample data</a>. Your name for signatures: <input type="text" id="sig" value="" placeholder="Your name" style="width:180px;padding:5px 8px;font-size:14px"></p>
<div id="res" hidden>
<p class="small muted" id="skip"></p>
<div class="stats" id="sum" style="grid-template-columns:repeat(4,1fr)"></div>
<div style="margin:14px 0"><button class="btn" id="dl">Download all emails (.txt)</button> <button class="btn ghost" id="dlcsv">Download CSV</button></div>
<div class="tscroll"><table class="res-table"><thead><tr><th>Name</th><th>Last active</th><th>Days dark</th><th>Tier</th><th>Email</th></tr></thead><tbody id="rows"></tbody></table></div>
</div></div>`,
    js: `
let results = [], skipped = 0;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function splitCSV(line) {
  const out = []; let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
    else if (ch === ',' && !q) { out.push(cur); cur = ''; } else cur += ch;
  }
  out.push(cur); return out.map((s) => s.trim());
}
function email(name, tier) {
  // "Last, First" -> First; otherwise the first word. Strip stray punctuation.
  const parts = name.includes(',') ? name.split(',')[1] : name;
  const fn = (parts.trim().split(/\\s+/)[0] || '').replace(/[^\\p{L}\\p{N}'-]/gu, '') || 'there', me = $('sig').value.trim() || '[Your name]';
  if (tier === 14) return 'Subject: Quick question about the program\\n\\nHey ' + fn + ',\\n\\nNoticed you joined the program but have not had a chance to start promoting yet - totally normal. I just want to make sure you have what you need.\\n\\nWhat would make it easier to get your first link live this week? Happy to send creatives, talking points, or jump on a quick call.\\n\\n- ' + me;
  if (tier === 30) return 'Subject: A quick update + something that might help\\n\\nHey ' + fn + ',\\n\\nWanted to share what is working for our top partners right now - it might be useful if you are thinking about promoting again.\\n\\nIf now is not the right time, no worries. Just let me know what would make this a better fit down the line.\\n\\n- ' + me;
  return 'Subject: Should I keep your spot open?\\n\\nHey ' + fn + ',\\n\\nHave not seen activity on your affiliate account in a while, so I wanted to check in before assuming it is not a fit anymore.\\n\\nIf you are open to it, I would love to send a couple of quick wins other partners used to get started. If it is just not the right time, that is completely fine too.\\n\\n- ' + me;
}
function parse(text) {
  const lines = text.trim().split(/\\r?\\n/); const head = splitCSV(lines[0].toLowerCase());
  const ni = head.indexOf('name'), di = head.indexOf('last_active_date'), ei = head.indexOf('email');
  if (ni < 0 || di < 0) { alert('The CSV needs "name" and "last_active_date" columns.'); return; }
  const today = new Date(); results = []; skipped = 0;
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const c = splitCSV(lines[i]); const d = new Date(c[di]); if (isNaN(d)) { skipped++; continue; }
    const days = Math.floor((today - d) / 864e5); const tier = days >= 60 ? 60 : days >= 30 ? 30 : days >= 14 ? 14 : 0;
    if (tier) results.push({ name: c[ni] || 'Partner', addr: ei >= 0 ? c[ei] : '', date: c[di], days, tier });
  }
  results.sort((a, b) => b.days - a.days); render();
}
function render() {
  const n = (t) => results.filter((r) => r.tier === t).length;
  $('sum').innerHTML = [['Dormant found', results.length], ['14+ days', n(14)], ['30+ days', n(30)], ['60+ days', n(60)]].map(([l, v]) => '<div class="stat"><span>' + l + '</span><strong>' + v + '</strong></div>').join('');
  $('rows').innerHTML = results.map((r, i) => '<tr><td>' + esc(r.name) + (r.addr ? '<br><span class="small muted">' + esc(r.addr) + '</span>' : '') + '</td><td>' + esc(r.date) + '</td><td>' + r.days + '</td><td><span class="pill">' + r.tier + '+ days</span></td><td><button class="btn ghost small" data-i="' + i + '" style="padding:5px 10px;font-size:13px">Copy email</button></td></tr>').join('');
  $('res').hidden = false;
  $('skip').textContent = skipped ? skipped + ' row(s) skipped because the date could not be read. Use YYYY-MM-DD.' : '';
  if (window.gtag) gtag('event', 'tool_use', { tool: 'dormant-affiliate-finder' });
}
$('rows').addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) { const r = results[b.dataset.i]; copyText(email(r.name, r.tier), b); } });
const drop = $('drop'), file = $('file');
drop.onclick = () => file.click();
drop.ondragover = (e) => { e.preventDefault(); drop.classList.add('drag'); };
drop.ondragleave = () => drop.classList.remove('drag');
drop.ondrop = (e) => { e.preventDefault(); drop.classList.remove('drag'); if (e.dataTransfer.files[0]) read(e.dataTransfer.files[0]); };
file.onchange = () => file.files[0] && read(file.files[0]);
function read(fl) { const r = new FileReader(); r.onload = () => parse(r.result); r.readAsText(fl); }
$('sample').onclick = (e) => {
  e.preventDefault(); const d = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
  parse('name,email,last_active_date\\nJane Smith,jane@example.com,' + d(95) + '\\nCarlos Diaz,carlos@example.com,' + d(41) + '\\nPriya Nair,,' + d(17) + '\\nTom Becker,tom@example.com,' + d(3) + '\\n"Lee, Ana",ana@example.com,' + d(70));
};
function save(name, text, type) { const u = URL.createObjectURL(new Blob([text], { type })); const a = document.createElement('a'); a.href = u; a.download = name; a.click(); URL.revokeObjectURL(u); }
$('dl').onclick = () => save('reactivation-emails.txt', results.map((r) => '===== ' + r.name + (r.addr ? ' <' + r.addr + '>' : '') + ' - ' + r.days + ' days dark =====\\n\\n' + email(r.name, r.tier)).join('\\n\\n\\n'), 'text/plain');
$('dlcsv').onclick = () => save('dormant-affiliates.csv', 'name,email,last_active_date,days_dark,tier\\n' + results.map((r) => ['"' + r.name.replace(/"/g, '""') + '"', r.addr, r.date, r.days, r.tier + '+'].join(',')).join('\\n'), 'text/csv');
`,
    content: `
<h2>How it works</h2>
<ol><li>Export your affiliate list from your network or platform (Impact, PartnerStack, ShareASale, Refersion, Tapfiliate, FirstPromoter...).</li><li>Make sure it has a <code>name</code> column and a <code>last_active_date</code> column - the date of the partner's last click or sale.</li><li>Upload it. Partners are grouped into 14, 30 and 60+ days of inactivity, each with an email tuned to that stage.</li></ol>
<p><b>Privacy:</b> the file is read by JavaScript in your browser. Nothing is uploaded to a server.</p>
<h2>Why three tiers?</h2>
<div class="tscroll"><table class="t"><tr><th>Tier</th><th>What is usually going on</th><th>Message angle</th></tr>
<tr><td>14+ days</td><td>Joined but never started, or stalled early</td><td>Remove friction - offer creatives and help</td></tr>
<tr><td>30+ days</td><td>Promoted once, moved on to other offers</td><td>Show what is working for top partners now</td></tr>
<tr><td>60+ days</td><td>Mentally churned</td><td>Honest "should I keep your spot?" check-in</td></tr></table></div>
<p>The "should I keep your spot open?" email works because it gives people permission to say no - which makes replying easy, and many reply with a yes.</p>`,
    faq: [
      ['Is my affiliate data uploaded anywhere?', 'No. The CSV is processed entirely in your browser and never sent to a server.'],
      ['What date formats work?', 'YYYY-MM-DD is the safest. Most formats your browser can parse (like 04/02/2026) also work.'],
    ],
    related: ['affiliate-revenue-leak-calculator', 'affiliate-commission-calculator', 'utm-builder'],
    cta: true,
  },

  // ---------------------------------------------------------------- LTV
  {
    slug: 'customer-ltv-calculator',
    cat: 'ecom',
    name: 'Customer Lifetime Value (LTV) Calculator',
    short: 'LTV, LTV:CAC ratio and payback for e-commerce and subscriptions.',
    title: 'Customer Lifetime Value Calculator - LTV & LTV:CAC Ratio',
    desc: 'Calculate customer lifetime value for e-commerce or subscription businesses, plus LTV:CAC ratio and CAC payback period. Free LTV calculator.',
    h1: 'Customer Lifetime Value (LTV) Calculator',
    lede: 'What a customer is really worth over time - and whether you are paying too much to get them.',
    tool: `<div>
<div class="row2">${f('aov', 'Average order / monthly fee', '50', { pre: '$' })}${f('freq', 'Purchases per year', '4')}</div>
<div class="row2">${f('life', 'Customer lifespan (years)', '2.5')}${f('gm', 'Gross margin', '60', { suf: '%' })}</div>
${f('cac', 'Customer acquisition cost (CAC)', '60', { pre: '$' })}
<p class="small muted">Subscription? Use the monthly fee, 12 purchases per year, and lifespan = 1 / (monthly churn x 12).</p>
</div>
<div class="out">
<div class="big-label">Lifetime value (gross profit)</div><div class="big" id="o_ltv">-</div>
<div class="stats">${stat('o_rev', 'Lifetime revenue')}${stat('o_ratio', 'LTV : CAC')}${stat('o_pay', 'CAC payback')}${stat('o_max', 'Max CAC at 3:1')}</div>
<div class="verdict" id="o_v"></div></div>`,
    js: `live(() => {
  const aov = num('aov'), fr = num('freq'), life = num('life'), gm = num('gm') / 100, cac = num('cac');
  if (!ok(aov, fr, life, gm)) return;
  const rev = aov * fr * life, ltv = rev * gm, ratio = ltv / cac, monthlyGP = aov * fr * gm / 12;
  set('o_ltv', money(ltv)); set('o_rev', money(rev)); set('o_max', money(ltv / 3));
  set('o_ratio', ok(cac) && cac > 0 ? fnum(ratio, 1) + ' : 1' : '-');
  set('o_pay', ok(cac) && monthlyGP > 0 ? fnum(cac / monthlyGP, 1) + ' months' : '-');
  set('o_v', !ok(ratio) ? '' : ratio < 1 ? 'You lose money on every customer. Fix CAC or retention before scaling.' : ratio < 3 ? 'Below the 3:1 benchmark - profitable, but thin. Improve retention or AOV.' : ratio > 5 ? 'Above 5:1 - you are probably under-investing in growth.' : 'Healthy 3-5:1 ratio. Room to scale.');
});`,
    content: `
<h2>The LTV formula</h2>
<div class="formula">LTV = Average order value x Purchases per year x Lifespan (years) x Gross margin</div>
<p>This calculator uses gross-profit LTV, not revenue LTV. Comparing revenue to acquisition cost overstates how much you can spend - the product still has to be paid for.</p>
<h2>LTV:CAC ratio</h2>
<p>The ratio of lifetime value to acquisition cost is the health check investors and operators use most:</p>
<ul><li><b>Below 1:1</b> - every new customer destroys value.</li><li><b>1:1 - 3:1</b> - profitable but fragile; overheads can wipe it out.</li><li><b>3:1 - 5:1</b> - healthy and scalable.</li><li><b>Above 5:1</b> - you can afford to spend more on growth.</li></ul>
<h2>Subscription businesses</h2>
<p>If 5% of subscribers cancel each month, the average customer stays 1 / 0.05 = 20 months, or 1.67 years. Enter your monthly price, 12 purchases per year and 1.67 years.</p>`,
    faq: [
      ['What is a good LTV:CAC ratio?', 'About 3:1 is the widely used benchmark for a healthy, scalable business.'],
      ['What is CAC payback?', 'The number of months of gross profit it takes to earn back what you paid to acquire a customer. Under 12 months is generally good.'],
    ],
    related: ['break-even-cpa-calculator', 'profit-margin-calculator', 'roas-calculator'],
  },

  // ---------------------------------------------------------------- Margin
  {
    slug: 'profit-margin-calculator',
    cat: 'ecom',
    name: 'Profit Margin & Markup Calculator',
    short: 'Margin, markup and profit from cost and price - or the price for a target margin.',
    title: 'Profit Margin Calculator - Margin, Markup & Selling Price',
    desc: 'Free profit margin calculator. Get gross margin, markup and profit from cost and price, or find the selling price you need for a target margin.',
    h1: 'Profit Margin & Markup Calculator',
    lede: 'Enter cost and price to get margin and markup - or set a target margin and get the price to charge.',
    tool: `<div>
${f('cost', 'Cost', '40', { pre: '$' })}
${f('price', 'Selling price', '100', { pre: '$' })}
<hr style="border:0;border-top:1px solid var(--line);margin:18px 0">
${f('tm', 'Target margin (optional)', '50', { suf: '%', hint: 'We will show the price you need to hit this margin.' })}
</div>
<div class="out">
<div class="big-label">Gross margin</div><div class="big" id="o_m">-</div>
<div class="stats">${stat('o_mu', 'Markup')}${stat('o_p', 'Profit per unit')}${stat('o_tp', 'Price for target margin')}${stat('o_tmu', 'Markup for target margin')}</div>
</div>`,
    js: `live(() => {
  const c = num('cost'), p = num('price'), tm = num('tm') / 100;
  if (ok(c, p) && p > 0) { set('o_m', pct((p - c) / p * 100)); set('o_mu', c > 0 ? pct((p - c) / c * 100) : '-'); set('o_p', money(p - c)); $('o_m').classList.toggle('bad', p < c); }
  if (ok(c, tm) && tm < 1) { set('o_tp', money(c / (1 - tm))); set('o_tmu', pct(tm / (1 - tm) * 100)); } else { set('o_tp', '-'); set('o_tmu', '-'); }
});`,
    content: `
<h2>Margin vs. markup</h2>
<p>They use the same two numbers but divide by different things, which is why they are so often confused.</p>
<div class="formula">Margin = (Price - Cost) / Price<br>Markup = (Price - Cost) / Cost<br>Price for target margin = Cost / (1 - Target margin)</div>
<p>A product that costs $40 and sells for $100 has a 60% margin but a 150% markup. Pricing with "50% markup" when you meant "50% margin" leaves you with a 33% margin instead.</p>
<div class="tscroll"><table class="t"><tr><th>Markup</th><th>Equals margin</th></tr>
<tr><td>25%</td><td>20%</td></tr><tr><td>50%</td><td>33.3%</td></tr><tr><td>100%</td><td>50%</td></tr><tr><td>150%</td><td>60%</td></tr><tr><td>300%</td><td>75%</td></tr></table></div>`,
    faq: [
      ['Can margin be over 100%?', 'No. Margin is a share of the price, so it can approach but never reach 100%. Markup can be any size.'],
      ['What should I include in cost?', 'For gross margin, include the direct cost of the unit: product, packaging, shipping to you, and payment fees. Rent and salaries belong in net margin.'],
    ],
    related: ['roas-calculator', 'break-even-cpa-calculator', 'customer-ltv-calculator'],
  },

  // ---------------------------------------------------------------- UTM
  {
    slug: 'utm-builder',
    cat: 'seo',
    name: 'UTM Link Builder',
    short: 'Build clean, consistent UTM tracking links for GA4.',
    title: 'UTM Builder - Free Campaign URL Builder for GA4',
    desc: 'Build UTM tracking links for Google Analytics 4 in seconds. Consistent lowercase naming, presets for common channels, one-click copy.',
    h1: 'UTM Link Builder',
    lede: 'Tag every link the same way, every time - so your GA4 reports stop splitting "Facebook", "facebook" and "fb" into three sources.',
    single: true,
    tool: `<div>
<div class="field"><label for="url">Website URL</label><input type="url" id="url" value="https://example.com/landing-page"></div>
<div class="field"><label for="preset">Quick preset</label><div class="inp"><select id="preset"><option value="">- choose a channel -</option><option>facebook|paid_social</option><option>instagram|paid_social</option><option>tiktok|paid_social</option><option>google|cpc</option><option>newsletter|email</option><option>linkedin|social</option><option>reddit|social</option><option>youtube|video</option><option>partner|affiliate</option></select></div></div>
<div class="row2"><div class="field"><label for="src">utm_source *</label><input type="text" id="src" value="facebook"></div><div class="field"><label for="med">utm_medium *</label><input type="text" id="med" value="paid_social"></div></div>
<div class="row2"><div class="field"><label for="cmp">utm_campaign *</label><input type="text" id="cmp" value="spring_sale_2026"></div><div class="field"><label for="cnt">utm_content</label><input type="text" id="cnt" value=""></div></div>
<div class="field"><label for="trm">utm_term</label><input type="text" id="trm" value=""></div>
<label class="small"><input type="checkbox" id="lc" checked> Force lowercase and replace spaces with underscores</label>
<div class="field" style="margin-top:14px"><label>Your tracking link</label><div class="copy-out" id="out"></div></div>
<button class="btn" id="copy">Copy link</button>
</div>`,
    js: `live(() => {
  const clean = (s) => ($('lc').checked ? s.trim().toLowerCase().replace(/\\s+/g, '_') : s.trim());
  let u; try { u = new URL($('url').value.trim()); } catch (e) { set('out', 'Enter a full URL starting with https://'); return; }
  [['utm_source', 'src'], ['utm_medium', 'med'], ['utm_campaign', 'cmp'], ['utm_content', 'cnt'], ['utm_term', 'trm']].forEach(([k, id]) => { const v = clean($(id).value); if (v) u.searchParams.set(k, v); else u.searchParams.delete(k); });
  set('out', u.toString());
});
$('preset').onchange = () => { const [s, m] = $('preset').value.split('|'); if (s) { $('src').value = s; $('med').value = m; $('src').dispatchEvent(new Event('input', { bubbles: true })); } };
$('copy').onclick = () => copyText($('out').textContent, $('copy'));`,
    content: `
<h2>What each UTM parameter means</h2>
<div class="tscroll"><table class="t"><tr><th>Parameter</th><th>Answers</th><th>Example</th></tr>
<tr><td>utm_source</td><td>Where is the traffic from?</td><td>facebook, google, newsletter</td></tr>
<tr><td>utm_medium</td><td>What type of channel?</td><td>paid_social, cpc, email, affiliate</td></tr>
<tr><td>utm_campaign</td><td>Which campaign or promotion?</td><td>spring_sale_2026</td></tr>
<tr><td>utm_content</td><td>Which ad or link variant?</td><td>video_a, blue_button</td></tr>
<tr><td>utm_term</td><td>Which keyword (search ads)?</td><td>running_shoes</td></tr></table></div>
<h2>Rules that keep GA4 reports clean</h2>
<ul><li><b>Always lowercase.</b> GA4 is case-sensitive - "Facebook" and "facebook" become two rows.</li><li><b>Pick one medium vocabulary</b> and stick to it. GA4's default channel groups recognise values like <code>cpc</code>, <code>email</code>, <code>social</code>, <code>paid_social</code>, <code>affiliate</code>.</li><li><b>Never UTM-tag internal links</b> on your own site - it restarts the session and overwrites the original source.</li><li><b>Keep a naming sheet</b> so the whole team uses the same campaign names.</li></ul>`,
    faq: [
      ['Which UTM parameters are required?', 'Source, medium and campaign should always be set. Content and term are optional.'],
      ['Do UTM parameters hurt SEO?', 'No, as long as you only use them on external links (ads, emails, social posts). Search engines treat the canonical URL as the page.'],
    ],
    related: ['serp-snippet-preview', 'cpm-cpc-cpa-calculator', 'affiliate-commission-calculator'],
  },

  // ---------------------------------------------------------------- SERP preview
  {
    slug: 'serp-snippet-preview',
    cat: 'seo',
    name: 'SERP Snippet Preview & Meta Length Checker',
    short: 'See how your title and meta description look in Google - with pixel width.',
    title: 'SERP Snippet Preview - Title & Meta Description Length Checker',
    desc: 'Preview how your page title and meta description appear in Google search results. Checks pixel width so titles do not get cut off.',
    h1: 'SERP Snippet Preview & Meta Length Checker',
    lede: 'Google truncates by pixel width, not characters. See exactly where your title and description get cut.',
    single: true,
    tool: `<div>
<div class="field"><label for="t">Title tag</label><input type="text" id="t" value="ROAS Calculator - Return on Ad Spend + Break-Even ROAS"><div class="meter" id="mt"><i></i></div><div class="hint" id="ht"></div></div>
<div class="field"><label for="d">Meta description</label><textarea id="d">Free ROAS calculator. Enter ad spend and revenue to get ROAS, profit and your break-even ROAS based on profit margin. Works for Google, Meta and TikTok ads.</textarea><div class="meter" id="md"><i></i></div><div class="hint" id="hd"></div></div>
<div class="field"><label for="u">URL</label><input type="text" id="u" value="https://www.example.com/roas-calculator/"></div>
<label class="big-label" style="display:block;margin:18px 0 8px">Desktop preview</label>
<div class="serp"><div class="u" id="pu"></div><div class="tt" id="pt"></div><div class="d" id="pd"></div></div>
</div>`,
    js: `
const cv = document.createElement('canvas').getContext('2d');
const width = (s, font) => { cv.font = font; return cv.measureText(s).width; };
function cut(s, font, max) { if (width(s, font) <= max) return s; let lo = 0, hi = s.length; while (lo < hi) { const m = (lo + hi + 1) >> 1; width(s.slice(0, m) + ' ...', font) <= max ? (lo = m) : (hi = m - 1); } return s.slice(0, lo).replace(/\\s+\\S*$/, '') + ' ...'; }
function meter(id, w, max) { const el = $(id); el.firstChild.style.width = Math.min(w / max * 100, 100) + '%'; el.classList.toggle('over', w > max); }
live(() => {
  const t = $('t').value, d = $('d').value, TF = '20px arial', DF = '14px arial', TM = 580, DM = 920;
  const tw = width(t, TF), dw = width(d, DF);
  meter('mt', tw, TM); meter('md', dw, DM);
  set('ht', t.length + ' characters - ' + Math.round(tw) + ' / ~' + TM + ' px ' + (tw > TM ? '(likely truncated)' : '(fits)'));
  set('hd', d.length + ' characters - ' + Math.round(dw) + ' / ~' + DM + ' px ' + (dw > DM ? '(likely truncated)' : d.length < 70 ? '(short - Google may rewrite it)' : '(fits)'));
  set('pt', cut(t || 'Page title', TF, TM)); set('pd', cut(d || 'Meta description', DF, DM));
  let u = $('u').value; try { const x = new URL(u); u = x.hostname + x.pathname.replace(/\\/$/, '').split('/').filter(Boolean).map((p) => ' > ' + p).join(''); } catch (e) {}
  set('pu', u);
});`,
    content: `
<h2>Ideal title and description length</h2>
<p>Google cuts desktop titles at roughly 580-600 pixels and descriptions at around 920 pixels (about two lines). In characters, that is usually 50-60 for titles and 140-160 for descriptions - but wide letters like W and M use up the space faster than i and l, which is why this tool measures pixels.</p>
<div class="tscroll"><table class="t"><tr><th>Element</th><th>Pixel limit</th><th>Rough characters</th></tr>
<tr><td>Title (desktop)</td><td>~580 px</td><td>50 - 60</td></tr>
<tr><td>Meta description (desktop)</td><td>~920 px</td><td>140 - 160</td></tr></table></div>
<h2>Writing snippets that get clicked</h2>
<ul><li>Put the main keyword near the start of the title.</li><li>Say what the page gives the reader: "Free", "Calculator", "2026", "Step-by-step".</li><li>Use the description to answer "why this result?" - it does not affect rankings directly, but it strongly affects click-through rate.</li><li>Google rewrites descriptions it considers unhelpful. A specific, page-matched description is more likely to be kept.</li></ul>`,
    faq: [
      ['Does meta description length affect rankings?', 'Not directly. It affects how much of your snippet shows, which affects click-through rate.'],
      ['Why does Google show a different title than mine?', 'Google rewrites titles it thinks are too long, stuffed with keywords or mismatched with the page content. Keeping titles under the pixel limit and accurate reduces rewrites.'],
    ],
    related: ['utm-builder', 'ab-test-significance-calculator', 'affiliate-commission-calculator'],
  },

  // ---------------------------------------------------------------- A/B test
  {
    slug: 'ab-test-significance-calculator',
    cat: 'cro',
    name: 'A/B Test Significance Calculator',
    short: 'Is your winning variant real or noise? Get confidence and uplift.',
    title: 'A/B Test Significance Calculator - Statistical Confidence',
    desc: 'Check if your A/B test result is statistically significant. Enter visitors and conversions for each variant to get conversion rates, uplift, p-value and confidence.',
    h1: 'A/B Test Significance Calculator',
    lede: 'Before you ship the "winner", check whether the difference is real or just random noise.',
    tool: `<div>
<div class="big-label" style="margin-bottom:8px">Variant A (control)</div>
<div class="row2">${f('va', 'Visitors', '5000')}${f('ca', 'Conversions', '150')}</div>
<div class="big-label" style="margin:6px 0 8px">Variant B</div>
<div class="row2">${f('vb', 'Visitors', '5000')}${f('cb', 'Conversions', '190')}</div>
</div>
<div class="out">
<div class="big-label">Confidence B is different</div><div class="big" id="o_conf">-</div>
<div class="stats">${stat('o_ra', 'Conv. rate A')}${stat('o_rb', 'Conv. rate B')}${stat('o_up', 'Relative uplift')}${stat('o_p', 'p-value')}</div>
<div class="verdict" id="o_v"></div></div>`,
    js: `
function ncdf(z) { const t = 1 / (1 + 0.2316419 * Math.abs(z)); const d = 0.3989423 * Math.exp(-z * z / 2); const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274)))); return z > 0 ? 1 - p : p; }
live(() => {
  const va = num('va'), ca = num('ca'), vb = num('vb'), cb = num('cb');
  if (!ok(va, ca, vb, cb) || va <= 0 || vb <= 0) return;
  if (ca > va || cb > vb) { set('o_v', 'Conversions cannot be higher than visitors - check your numbers.'); return; }
  const ra = ca / va, rb = cb / vb, pp = (ca + cb) / (va + vb), se = Math.sqrt(pp * (1 - pp) * (1 / va + 1 / vb));
  const z = se > 0 ? (rb - ra) / se : 0, p = Math.min(1, Math.max(0, 2 * (1 - ncdf(Math.abs(z))))), conf = (1 - p) * 100;
  set('o_ra', pct(ra * 100)); set('o_rb', pct(rb * 100)); set('o_up', ra > 0 ? pct((rb - ra) / ra * 100, 1) : '-');
  set('o_p', p < 0.0001 ? '< 0.0001' : fnum(p, 4)); set('o_conf', pct(conf, 1));
  $('o_conf').classList.toggle('bad', conf < 95);
  set('o_v', conf >= 95 ? 'Significant at 95%. ' + (rb > ra ? 'B is the winner.' : 'A (control) performs better.') : 'Not significant yet. Keep the test running or treat the result as a tie.' + (Math.min(ca, cb) < 100 ? ' Aim for at least 100 conversions per variant.' : ''));
});`,
    content: `
<h2>How this calculator works</h2>
<p>It runs a two-tailed, two-proportion z-test - the standard method most A/B testing tools use. It compares the two conversion rates, accounts for sample size, and returns the probability that a difference this large would appear by chance if the variants were actually identical (the p-value).</p>
<div class="formula">z = (rate B - rate A) / sqrt( p x (1 - p) x (1/visitors A + 1/visitors B) )<br>where p = total conversions / total visitors</div>
<h2>How to read the result</h2>
<ul><li><b>95% confidence or higher</b> - the conventional threshold to call a winner.</li><li><b>90 - 95%</b> - promising, but keep running.</li><li><b>Below 90%</b> - you cannot tell the variants apart yet.</li></ul>
<h2>Common A/B testing mistakes</h2>
<ul><li><b>Peeking and stopping early.</b> Checking daily and stopping the moment you hit 95% inflates false positives. Decide the sample size up front.</li><li><b>Tests shorter than a week.</b> Weekday and weekend visitors behave differently - run at least one full business cycle.</li><li><b>Too few conversions.</b> Under ~100 conversions per variant, results swing wildly.</li><li><b>Testing tiny changes on low traffic.</b> Small sites should test bold changes (offer, headline, price) that can produce big uplifts.</li></ul>`,
    faq: [
      ['What confidence level should I use?', '95% is the standard. For low-risk changes some teams accept 90%.'],
      ['Is this one-tailed or two-tailed?', 'Two-tailed. It detects a difference in either direction, which is the safer default.'],
    ],
    related: ['cpm-cpc-cpa-calculator', 'serp-snippet-preview', 'roas-calculator'],
  },
];
