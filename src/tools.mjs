// Every tool on the site. build.mjs turns each entry into /<slug>/index.html.
// Keep content genuinely useful - AdSense reviews thin tool pages as "low value content".

const f = (id, label, value, o = {}) => `
<div class="field"><label for="${id}">${label}</label>
<div class="inp${o.pre ? ' has-pre' : ''}${o.suf ? ' has-suf' : ''}">${o.pre ? `<span class="pre">${o.pre}</span>` : ''}<input id="${id}" type="text" inputmode="decimal" value="${value}" autocomplete="off">${o.suf ? `<span class="suf">${o.suf}</span>` : ''}</div>
${o.hint ? `<div class="hint">${o.hint}</div>` : ''}</div>`;

const table = (head, rows) => `<div class="tscroll"><table class="t"><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;

const stat = (id, label) => `<div class="stat"><span>${label}</span><strong id="${id}">-</strong></div>`;

export const categories = {
  ads: 'Paid ads',
  affiliate: 'Affiliate marketing',
  ecom: 'E-commerce & business',
  seo: 'SEO & tracking',
  cro: 'Testing & CRO',
  creator: 'Creators & publishers',
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

  // ---------------------------------------------------------------- CAC
  {
    slug: 'cac-calculator',
    cat: 'ecom',
    name: 'CAC Calculator',
    short: 'Customer acquisition cost - paid and fully loaded - with payback and LTV:CAC.',
    title: 'CAC Calculator - Customer Acquisition Cost, Payback & LTV:CAC',
    desc: 'Free CAC calculator. Work out paid and fully loaded customer acquisition cost, CAC payback in months and your LTV:CAC ratio from a few numbers.',
    h1: 'Customer Acquisition Cost (CAC) Calculator',
    lede: 'What one new customer really costs you - once salaries, tools and agencies are counted, not just ad spend.',
    tool: `<div>
${f('ads', 'Ad spend in the period', '36000', { pre: '$' })}
${f('other', 'Other sales & marketing costs', '24000', { pre: '$', hint: 'Marketing and sales salaries, agencies, tools, content, commissions. Leave 0 for paid CAC only.' })}
${f('cust', 'New customers in the period', '400')}
<div class="row2">${f('mgp', 'Monthly gross profit per customer', '41.65', { pre: '$', hint: 'Optional - for payback.' })}${f('ltv', 'Customer lifetime value', '1388', { pre: '$', hint: 'Optional - gross-profit LTV.' })}</div>
</div>
<div class="out">
<div class="big-label">Fully loaded CAC</div><div class="big" id="o_cac">-</div>
<div class="stats">${stat('o_paid', 'Paid CAC (ads only)')}${stat('o_pay', 'CAC payback')}${stat('o_ratio', 'LTV : CAC')}${stat('o_max', 'Max CAC at 3:1')}</div>
<div class="verdict" id="o_v"></div></div>`,
    js: `live(() => {
  const a = num('ads'), o0 = num('other'), c = num('cust'), mgp = num('mgp'), ltv = num('ltv');
  if (!ok(a, c) || c <= 0) return;
  const o = ok(o0) ? o0 : 0, full = (a + o) / c, paid = a / c;
  set('o_cac', money(full)); set('o_paid', money(paid));
  const pay = ok(mgp) && mgp > 0 ? full / mgp : NaN, ratio = ok(ltv) && ltv > 0 && full > 0 ? ltv / full : NaN;
  set('o_pay', ok(pay) ? fnum(pay, 1) + ' months' : '-');
  set('o_ratio', ok(ratio) ? fnum(ratio, 1) + ' : 1' : '-');
  set('o_max', ok(ltv) && ltv > 0 ? money(ltv / 3) : '-');
  set('o_v', ok(ratio) ? (ratio < 1 ? 'Each customer costs more than they are worth. Fix CAC or retention before scaling.' : ratio < 3 ? 'Below the 3:1 benchmark - profitable but thin.' : ratio > 5 ? 'Above 5:1 - you can probably afford to spend more on growth.' : 'Healthy 3-5:1 ratio.')
    : ok(pay) ? 'It takes ' + fnum(pay, 1) + ' months of gross profit to earn back what you paid for a customer.' : 'Add monthly gross profit or LTV to see payback and LTV:CAC.');
});`,
    content: `
<h2>The CAC formula</h2>
<div class="formula">CAC = Total sales and marketing cost / New customers acquired</div>
<p>Use the same period on both sides. If you spent $60,000 on sales and marketing last quarter and won 400 new customers, CAC is $150.</p>
<h2>Paid CAC vs. fully loaded CAC</h2>
<p><b>Paid CAC</b> divides only ad spend by new customers. It is useful for comparing channels and campaigns day to day. <b>Fully loaded CAC</b> adds everything it takes to win customers: marketing and sales salaries, agencies, freelancers, software, content production and sales commissions. It is the honest number for unit economics, and the one investors and lenders ask for.</p>
<p>The gap is often large. In the default example, paid CAC is $90 but fully loaded CAC is $150 - a ratio that looks like 15:1 on ad spend alone is really about 9:1.</p>
<h2>CAC payback period</h2>
<div class="formula">CAC payback (months) = CAC / Monthly gross profit per customer</div>
<p>Payback tells you how long cash is tied up in each new customer. Under 12 months is generally considered healthy for subscription businesses; longer paybacks need more cash to grow and leave you exposed if customers churn early.</p>
<h2>Blended vs. new-customer CAC</h2>
<p>Only count genuinely new customers in the denominator. Including returning customers who would have bought anyway makes CAC look lower than it is. If you can, calculate CAC per channel as well as blended - a blended average often hides one channel that is losing money.</p>
<h2>How to lower CAC</h2>
<ul><li>Improve landing-page and trial conversion rates - the same spend then wins more customers.</li><li>Cut channels whose CAC is above break-even and move budget to efficient ones.</li><li>Invest in compounding channels such as SEO, referrals and partnerships, whose cost per customer falls over time.</li><li>Raise prices or average order value, which does not lower CAC but improves the ratio to LTV.</li></ul>
<p>Pair this with the <a href="/customer-ltv-calculator/">LTV calculator</a> and read <a href="/guides/ltv-to-cac-ratio/">what LTV:CAC ratio to aim for</a>.</p>`,
    faq: [
      ['What is a good CAC?', 'There is no universal number. A good CAC is comfortably below the gross profit a customer brings over their lifetime - typically one third of LTV or less - and is earned back within about 12 months.'],
      ['Should CAC include salaries?', 'For fully loaded CAC, yes. Include marketing and sales salaries, agencies and tools. Paid CAC (ads only) is useful for channel decisions but flatters the true cost.'],
      ['What is the difference between CAC and CPA?', 'CPA is the cost of any conversion action - a lead, signup or purchase - usually measured per campaign. CAC is the cost of winning a new paying customer, usually across all channels and costs.'],
    ],
    related: ['customer-ltv-calculator', 'churn-rate-calculator', 'break-even-cpa-calculator'],
  },

  // ---------------------------------------------------------------- Churn / MRR
  {
    slug: 'churn-rate-calculator',
    cat: 'ecom',
    name: 'Churn Rate & MRR Calculator',
    short: 'Customer churn, MRR churn, net revenue retention and average lifetime.',
    title: 'Churn Rate Calculator - Customer Churn, MRR Churn & NRR',
    desc: 'Free churn rate calculator for subscription businesses. Get monthly and annual customer churn, gross MRR churn, net revenue retention and average customer lifetime.',
    h1: 'Churn Rate & MRR Calculator',
    lede: 'How fast you lose customers and revenue - and how long the average subscriber actually stays.',
    tool: `<div>
<div class="row2">${f('sc', 'Customers at start of month', '1000')}${f('lost', 'Customers lost during month', '50')}</div>
<div class="row2">${f('smrr', 'MRR at start of month', '50000', { pre: '$' })}${f('cmrr', 'MRR lost (cancels + downgrades)', '3000', { pre: '$' })}</div>
${f('emrr', 'Expansion MRR (upgrades + add-ons)', '2000', { pre: '$', hint: 'From existing customers only - not new customers.' })}
</div>
<div class="out">
<div class="big-label">Monthly customer churn</div><div class="big" id="o_churn">-</div>
<div class="stats">${stat('o_annual', 'Annual customer churn')}${stat('o_life', 'Average lifetime')}${stat('o_mrr', 'Gross MRR churn')}${stat('o_nrr', 'Net revenue retention')}</div>
<div class="verdict" id="o_v"></div></div>`,
    js: `live(() => {
  const sc = num('sc'), lost = num('lost'), smrr = num('smrr'), cmrr = num('cmrr'), e0 = num('emrr');
  if (ok(sc, lost) && sc > 0 && lost <= sc) {
    const c = lost / sc;
    set('o_churn', pct(c * 100, 2)); set('o_annual', pct((1 - Math.pow(1 - c, 12)) * 100, 1));
    set('o_life', c > 0 ? fnum(1 / c, 1) + ' months' : 'No churn');
  }
  if (ok(smrr, cmrr) && smrr > 0 && cmrr <= smrr) {
    const e = ok(e0) ? e0 : 0, g = cmrr / smrr, nrr = (smrr - cmrr + e) / smrr;
    set('o_mrr', pct(g * 100, 2)); set('o_nrr', pct(nrr * 100, 1));
    set('o_v', nrr >= 1 ? 'Net revenue retention is above 100% - expansion from existing customers outweighs what you lose.' : g > 0.05 ? 'Gross MRR churn above 5% a month is high for most subscription businesses - retention is your biggest lever.' : 'Revenue churn is under control, but expansion is not yet covering it.');
  } else if (ok(sc, lost) && lost > sc) set('o_v', 'Customers lost cannot be higher than customers at the start.');
});`,
    content: `
<h2>The churn formulas</h2>
<div class="formula">Customer churn rate = Customers lost in period / Customers at start of period</div>
<div class="formula">Average lifetime (months) = 1 / Monthly churn rate</div>
<div class="formula">Gross MRR churn = MRR lost (cancellations + downgrades) / MRR at start</div>
<div class="formula">Net revenue retention = (Start MRR - MRR lost + Expansion MRR) / Start MRR</div>
<h2>Monthly vs. annual churn</h2>
<p>Annual churn is not monthly churn times 12, because each month's churn applies to a smaller base. The correct conversion is 1 - (1 - monthly churn)^12. A 5% monthly churn rate is about 46% a year, not 60%.</p>
${table(['Monthly churn', 'Annual churn', 'Average lifetime'], [['1%', '11.4%', '100 months'], ['2%', '21.5%', '50 months'], ['3%', '30.6%', '33 months'], ['5%', '46.0%', '20 months'], ['8%', '63.2%', '12.5 months'], ['10%', '71.8%', '10 months']])}
<h2>Customer churn vs. revenue churn</h2>
<p>They can tell different stories. If small customers leave and large ones stay, customer churn looks bad while revenue churn looks fine - and the reverse is a serious warning. Track both. Net revenue retention above 100% means existing customers grow faster through upgrades than you lose to cancellations, which is the strongest position a subscription business can be in.</p>
<h2>What counts as good churn?</h2>
<p>Churn varies enormously by customer type. Consumer subscriptions and small-business software commonly see several percent per month, while software sold to large companies on annual contracts often has single-digit annual churn. Compare yourself with businesses selling to similar customers at similar prices, and focus on the trend: falling churn is worth more than any benchmark.</p>
<h2>How to reduce churn</h2>
<ul><li><b>Shorten time to value.</b> Customers who get a clear result in their first week stay longer.</li><li><b>Fix involuntary churn.</b> Failed card payments can be a meaningful share of cancellations; card updaters and retry emails recover many of them.</li><li><b>Offer pause and downgrade options</b> before cancellation.</li><li><b>Ask why people leave</b> and fix the top reason each quarter.</li></ul>
<p>Use the lifetime from this tool in the <a href="/customer-ltv-calculator/">LTV calculator</a>, and compare LTV with your <a href="/cac-calculator/">CAC</a>.</p>`,
    faq: [
      ['How do I convert monthly churn to annual churn?', 'Annual churn = 1 - (1 - monthly churn)^12. For 3% monthly churn: 1 - 0.97^12 = 30.6%.'],
      ['Should new customers be included in the churn calculation?', 'Not in the denominator. Use customers at the start of the period, so customers who join and leave within the same month do not distort the rate. Track early churn of new customers separately.'],
      ['What is net revenue retention?', 'The share of last period\'s recurring revenue you still have from the same customers, after cancellations, downgrades and upgrades. Above 100% means existing customers are growing revenue on their own.'],
    ],
    related: ['customer-ltv-calculator', 'cac-calculator', 'profit-margin-calculator'],
  },

  // ---------------------------------------------------------------- Shopify profit
  {
    slug: 'shopify-profit-calculator',
    cat: 'ecom',
    name: 'Shopify Profit Calculator',
    short: 'Real monthly profit after product, shipping, payment fees, ads and apps.',
    title: 'Shopify Profit Calculator - Profit per Order, Margin & Break-Even ROAS',
    desc: 'Free Shopify profit calculator. Enter price, product cost, shipping, payment fees, ad spend and app costs to see real profit per order, net margin and break-even ROAS.',
    h1: 'Shopify Profit Calculator',
    lede: 'Revenue is not profit. See what is left of each order after product, shipping, payment fees, ads and your monthly apps.',
    tool: `<div>
<div class="row2">${f('price', 'Average order value', '60', { pre: '$' })}${f('orders', 'Orders per month', '500')}</div>
<div class="row2">${f('cogs', 'Product cost per order', '20', { pre: '$' })}${f('ship', 'Shipping + packaging per order', '6', { pre: '$' })}</div>
<div class="row2">${f('pf', 'Payment fee', '2.9', { suf: '%', hint: 'Check your plan and country.' })}${f('ff', 'Fixed fee per order', '0.30', { pre: '$' })}</div>
<div class="row2">${f('ads', 'Ad spend per month', '5000', { pre: '$' })}${f('fixed', 'Shopify plan + apps per month', '200', { pre: '$' })}</div>
</div>
<div class="out">
<div class="big-label">Net profit per month</div><div class="big" id="o_net">-</div>
<div class="stats">${stat('o_po', 'Profit per order')}${stat('o_nm', 'Net margin')}${stat('o_gm', 'Contribution per order (before ads)')}${stat('o_beroas', 'Break-even ROAS')}${stat('o_beo', 'Break-even orders / month')}</div>
<div class="verdict" id="o_v"></div></div>`,
    js: `live(() => {
  const p = num('price'), n = num('orders'), cogs = num('cogs'), sh = num('ship'), pf = num('pf') / 100, ff = num('ff'), ads0 = num('ads'), fx0 = num('fixed');
  if (!ok(p, n, cogs, sh, pf, ff) || p <= 0 || n <= 0) return;
  const ads = ok(ads0) ? ads0 : 0, fx = ok(fx0) ? fx0 : 0;
  const cpo = p - cogs - sh - p * pf - ff, rev = p * n, net = cpo * n - ads - fx;
  set('o_net', money(net)); set('o_po', money(net / n)); set('o_nm', pct(net / rev * 100, 1)); set('o_gm', money(cpo));
  $('o_net').classList.toggle('bad', net < 0);
  set('o_beroas', cpo > 0 ? fnum(p / cpo) + 'x' : '-');
  set('o_beo', cpo > 0 ? fnum(Math.ceil((ads + fx) / cpo), 0) : '-');
  set('o_v', cpo <= 0 ? 'Each order loses money before ads. Raise prices or cut product and shipping costs.' : net < 0 ? 'Losing money: you need ' + fnum(Math.ceil((ads + fx) / cpo), 0) + ' orders a month at this spend, or a higher contribution per order.' : 'Profitable: you keep ' + pct(net / rev * 100, 1) + ' of revenue after ads and fixed costs.');
});`,
    content: `
<h2>How this calculator works</h2>
<div class="formula">Contribution per order = Order value - Product cost - Shipping - (Order value x Payment fee %) - Fixed fee</div>
<div class="formula">Net profit = Contribution per order x Orders - Ad spend - Monthly plan and apps</div>
<div class="formula">Break-even ROAS = Order value / Contribution per order</div>
<p>Contribution per order is what each sale leaves to pay for advertising and fixed costs. It is the number that decides how much you can spend to win an order.</p>
<h2>Shopify costs people forget</h2>
<ul><li><b>Payment processing.</b> Shopify Payments charges a percentage plus a fixed fee per online transaction, and the rate depends on your plan and country. If you use a third-party gateway, Shopify adds its own transaction fee on top. Check your current rates in your admin before relying on the default.</li><li><b>Apps.</b> Reviews, subscriptions, upsells and email apps add up quickly; many stores spend more on apps than on the Shopify plan itself.</li><li><b>Shipping you absorb.</b> "Free shipping" is never free - it is a cost per order.</li><li><b>Returns and refunds.</b> Add your average refund cost per order to product cost, especially in apparel.</li><li><b>Currency conversion and payout fees</b> if you sell internationally.</li><li><b>Taxes.</b> Sales tax and VAT you collect are not revenue; leave them out of order value.</li></ul>
<h2>Worked example</h2>
<p>With the defaults - a $60 order, $20 product, $6 shipping, 2.9% + $0.30 payment fees - each order contributes $31.96. At 500 orders a month that is $15,980, minus $5,000 of ads and $200 of plan and apps, leaving <b>$10,780</b> profit, a 35.9% net margin. Break-even ROAS is 1.88x: spend $5,000 on ads and they must drive at least $9,400 of sales to pay for themselves.</p>
<h2>Ways to raise profit per order</h2>
<ul><li>Raise average order value with bundles and a free-shipping threshold set above your current average order.</li><li>Negotiate shipping rates or switch carriers once volume grows.</li><li>Cut apps you no longer use - review them every quarter.</li><li>Raise prices on best-sellers; a small price increase goes straight to profit.</li></ul>
<p>Next: check whether your campaigns clear the bar with the <a href="/roas-calculator/">ROAS calculator</a>, and see <a href="/guides/break-even-roas-formula/">how break-even ROAS works</a>.</p>`,
    faq: [
      ['What profit margin is good for a Shopify store?', 'It varies by product. Many stores aim for 50%+ gross margin so there is room for ads, and a net margin of 10 to 20% after ads and fixed costs is a healthy result for most small e-commerce brands.'],
      ['Does Shopify charge transaction fees?', 'With Shopify Payments you pay card processing fees but no extra Shopify transaction fee. With third-party payment gateways, Shopify adds a transaction fee that depends on your plan.'],
      ['Should I include my own time as a cost?', 'Not in this calculator, but remember that profit has to pay you. If the business needs 40 hours a week, compare monthly profit with what that time is worth.'],
    ],
    related: ['roas-calculator', 'profit-margin-calculator', 'break-even-cpa-calculator'],
  },

  // ---------------------------------------------------------------- YouTube earnings
  {
    slug: 'youtube-earnings-calculator',
    cat: 'creator',
    name: 'YouTube Earnings Calculator',
    short: 'Estimate YouTube ad revenue from views and RPM, plus sponsorships.',
    title: 'YouTube Earnings Calculator - Estimate Ad Revenue from Views & RPM',
    desc: 'Free YouTube earnings calculator. Estimate monthly and yearly AdSense revenue from views and RPM, add sponsorships, and see how niche changes what a channel earns.',
    h1: 'YouTube Earnings Calculator',
    lede: 'Estimate what a channel earns from ads and sponsorships - using RPM, the number YouTube actually pays on.',
    tool: `<div>
<div class="row2">${f('views', 'Views per month', '200000')}${f('rpm', 'RPM (revenue per 1,000 views)', '4', { pre: '$', hint: 'Find it in YouTube Studio - Analytics - Revenue.' })}</div>
<div class="row2">${f('sp', 'Sponsored videos per month', '1')}${f('rate', 'Average fee per sponsorship', '800', { pre: '$' })}</div>
</div>
<div class="out">
<div class="big-label">Estimated monthly ad revenue</div><div class="big" id="o_ad">-</div>
<div class="stats">${stat('o_year', 'Ad revenue per year')}${stat('o_total', 'Monthly total with sponsors')}${stat('o_eff', 'Effective earnings per 1,000 views')}${stat('o_low', 'Range at RPM -50% / +50%')}</div>
<div class="verdict" id="o_v"></div></div>`,
    js: `live(() => {
  const v = num('views'), r = num('rpm'), sp0 = num('sp'), rate0 = num('rate');
  if (!ok(v, r)) return;
  const ad = v / 1000 * r, spon = (ok(sp0) ? sp0 : 0) * (ok(rate0) ? rate0 : 0), tot = ad + spon;
  set('o_ad', money(ad)); set('o_year', money(ad * 12)); set('o_total', money(tot));
  set('o_eff', v > 0 ? money(tot / v * 1000) : '-');
  set('o_low', money(ad * 0.5, 0) + ' - ' + money(ad * 1.5, 0));
  set('o_v', v > 0 && spon > ad ? 'Sponsorships earn more than ads here - common for channels in niches with a clear buyer audience.' : 'Ad revenue swings with season and audience; treat this as an estimate, not a forecast.');
});`,
    content: `
<h2>How YouTube earnings are calculated</h2>
<div class="formula">Monthly ad revenue = Monthly views / 1,000 x RPM</div>
<p><b>RPM</b> (revenue per mille) is what you actually earn per 1,000 views, after YouTube's share and counting all views - including those that showed no ad. <b>CPM</b> is what advertisers pay per 1,000 ad impressions, before YouTube's share. RPM is always lower than CPM, and it is the right number for estimating income.</p>
<h2>Why RPM varies so much</h2>
<p>RPM depends on how much advertisers will pay to reach your viewers. Rough tendencies, which vary by country and season:</p>
${table(['Niche', 'Typical RPM tendency'], [['Personal finance, investing, business software', 'Among the highest - advertisers pay a lot for these viewers'], ['Tech reviews, education, marketing', 'Above average'], ['Lifestyle, travel, food', 'Middle of the range'], ['Gaming, entertainment, music, vlogs', 'Often lower'], ['YouTube Shorts', 'Usually far lower per view than long-form']])}
<p>Viewer location matters as much as niche: views from the US, UK, Canada and Australia usually earn several times more than views from lower-cost ad markets. Q4 (October to December) RPMs tend to be highest and January the lowest, because advertiser budgets follow the shopping calendar. The only reliable RPM is the one in your own YouTube Studio.</p>
<h2>Revenue share basics</h2>
<p>For long-form videos, creators in the YouTube Partner Program receive the majority of ad revenue (YouTube's published split is 55% to the creator). Shorts revenue is pooled and shared under a separate model, which is one reason Shorts RPMs are much lower. YouTube Premium views also pay creators a share of subscription revenue.</p>
<h2>Sponsorships often beat ads</h2>
<p>For channels with a focused audience, one sponsored segment can earn more than a month of ad revenue. Sponsors usually price on expected views - often quoted as a cost per 1,000 views of the video - and pay more for niches with a clear buying audience. Affiliate links in descriptions add a third income stream; estimate it with the <a href="/affiliate-commission-calculator/">affiliate EPC calculator</a>.</p>
<h2>Requirements to earn ad revenue</h2>
<p>You need to join the YouTube Partner Program, which requires a minimum number of subscribers plus either public watch hours or Shorts views in a recent period, and you must follow YouTube's monetization policies. Check YouTube's current requirements, as thresholds have changed over time.</p>`,
    faq: [
      ['How much does YouTube pay per 1,000 views?', 'That is your RPM, and it ranges widely - from well under $1 to more than $10 per 1,000 views depending on niche, audience country, season and video length. Check YouTube Studio for your real number.'],
      ['What is the difference between RPM and CPM?', 'CPM is what advertisers pay per 1,000 ad impressions. RPM is what you earn per 1,000 views, after YouTube\'s share and including views with no ads. RPM is lower and is the number to use for income.'],
      ['How much does a YouTuber with 1 million views earn?', 'Multiply by RPM: at $2 RPM about $2,000, at $5 about $5,000, at $10 about $10,000 - before sponsorships, affiliates and merchandise.'],
    ],
    related: ['affiliate-commission-calculator', 'cpm-cpc-cpa-calculator', 'utm-builder'],
  },

  // ---------------------------------------------------------------- Engagement rate
  {
    slug: 'engagement-rate-calculator',
    cat: 'creator',
    name: 'Engagement Rate Calculator',
    short: 'Instagram, TikTok or LinkedIn engagement rate by followers and by reach.',
    title: 'Engagement Rate Calculator - Instagram, TikTok & LinkedIn (by Followers and Reach)',
    desc: 'Free engagement rate calculator. Enter likes, comments, shares, saves and followers to get engagement rate by followers and by reach, with benchmarks for Instagram, TikTok and LinkedIn.',
    h1: 'Engagement Rate Calculator',
    lede: 'Work out engagement rate the two ways brands actually check it - per follower and per person reached.',
    tool: `<div>
<div class="row2">${f('likes', 'Likes (total)', '4200')}${f('comments', 'Comments (total)', '180')}</div>
<div class="row2">${f('shares', 'Shares (total)', '90')}${f('saves', 'Saves (total)', '130')}</div>
<div class="row2">${f('posts', 'Number of posts', '5', { hint: 'How many posts the totals above cover.' })}${f('followers', 'Followers', '50000')}</div>
${f('reach', 'Total reach of those posts (optional)', '60000', { hint: 'From your insights. Leave empty if you only have public numbers.' })}
</div>
<div class="out">
<div class="big-label">Engagement rate by followers</div><div class="big" id="o_er">-</div>
<div class="stats">${stat('o_err', 'Engagement rate by reach')}${stat('o_avg', 'Interactions per post')}${stat('o_cr', 'Comments per 100 likes')}${stat('o_rf', 'Reach as % of followers')}</div>
<div class="verdict" id="o_v"></div></div>`,
    js: `live(() => {
  const l = num('likes'), c = num('comments'), s0 = num('shares'), v0 = num('saves'), n = num('posts'), fol = num('followers'), r = num('reach');
  if (!ok(l, c) || !ok(n) || n <= 0) return;
  const tot = l + c + (ok(s0) ? s0 : 0) + (ok(v0) ? v0 : 0), per = tot / n;
  set('o_avg', fnum(per, 0));
  set('o_cr', l > 0 ? fnum(c / l * 100, 1) : '-');
  if (ok(r) && r > 0) set('o_err', pct(tot / r * 100, 2));
  if (ok(r, fol) && fol > 0 && r > 0) set('o_rf', pct(r / n / fol * 100, 1));
  if (!ok(fol) || fol <= 0) return;
  const er = per / fol * 100;
  set('o_er', pct(er, 2));
  set('o_v', er < 1 ? 'Under 1% is low for most accounts - posts are being seen but not acted on. Test stronger hooks and ask a question people can answer.' : er < 3 ? 'Between 1% and 3% is a solid, typical engagement rate for most accounts.' : er < 6 ? 'Above 3% is strong engagement - a good number to show brands.' : 'Above 6% is exceptional. Common for small or very niche accounts; check that a single viral post is not skewing the average.');
});`,
    content: `
<h2>Engagement rate formulas</h2>
<div class="formula">Engagement rate by followers = (Likes + Comments + Shares + Saves) / Posts / Followers x 100</div>
<div class="formula">Engagement rate by reach = (Likes + Comments + Shares + Saves) / Total reach x 100</div>
<p><b>By followers</b> is the number anyone can calculate from public data, so it is what most brands and agencies quote. <b>By reach</b> measures how people who actually saw the post reacted - it is the fairer measure of content quality, because reach on most platforms is now driven by recommendations rather than by followers.</p>
<h2>Worked example</h2>
<p>Five posts collected 4,200 likes, 180 comments, 90 shares and 130 saves - 4,600 interactions, or 920 per post. With 50,000 followers that is 920 / 50,000 = <b>1.84%</b> engagement by followers. The posts reached 60,000 people in total, so engagement by reach is 4,600 / 60,000 = <b>7.67%</b>. Average reach per post was only 12,000, or 24% of followers - typical for an account that depends on followers rather than recommendations.</p>
<h2>Typical engagement rates by platform</h2>
${table(['Platform', 'Typical rate by followers', 'Notes'], [['TikTok', 'Often 3% - 9%', 'Reach comes mostly from the For You feed, so rates by followers run high'], ['Instagram', 'Often 0.5% - 3%', 'Reels usually beat static posts; carousels earn the most saves'], ['LinkedIn', 'Often 1% - 4%', 'Comments carry the most weight; personal profiles beat company pages'], ['Facebook pages', 'Often under 0.5%', 'Organic page reach is low'], ['X (Twitter)', 'Often under 1%', 'Highly dependent on topic and timing']])}
<p class="small muted">Ranges differ between studies, niches and account sizes - use them as a sanity check, not a target. Compare yourself mainly with your own past months and with accounts of a similar size in your niche.</p>
<h2>Why small accounts have higher engagement</h2>
<p>Engagement rate almost always falls as follower count rises. Small accounts have a tighter, more interested audience; large accounts collect inactive and passive followers over time. A 6% rate at 5,000 followers and a 1.5% rate at 500,000 followers can be equally healthy, which is why brands increasingly look at engagement within a follower band.</p>
<h2>Which interactions matter most</h2>
<ul><li><b>Shares and saves</b> signal that a post is worth coming back to or sending to someone - the platforms weight them heavily when deciding what to recommend.</li><li><b>Comments</b> show conversation. A low comments-per-100-likes number on high likes can mean the content is passive, or that likes are not coming from real fans.</li><li><b>Likes</b> are the cheapest action and the easiest to inflate.</li></ul>
<h2>Spotting fake engagement</h2>
<p>Very high likes with almost no comments, generic one-word comments, or a sudden jump in followers without a matching jump in reach are classic signs of bought engagement. If you are vetting an influencer, ask for screenshots of reach and audience location from their insights, and estimate what a sponsored post is worth with the <a href="/cpm-cpc-cpa-calculator/">CPM calculator</a>.</p>`,
    faq: [
      ['What is a good engagement rate on Instagram?', 'For most accounts 1% to 3% by followers is solid, and above 3% is strong. Smaller accounts usually see higher rates than large ones, and Reels tend to beat static posts.'],
      ['Should I calculate engagement rate by followers or by reach?', 'Use followers when you only have public data or need to compare accounts. Use reach when you have insights access - it shows how well the content performs with the people who actually saw it.'],
      ['Do views count as engagement?', 'Not in this formula. Views and impressions measure exposure, not interaction. Video creators sometimes report engagement by views instead of followers; in that case divide interactions by views.'],
    ],
    related: ['youtube-earnings-calculator', 'email-list-growth-calculator', 'cpm-cpc-cpa-calculator'],
  },

  // ---------------------------------------------------------------- A/B sample size
  {
    slug: 'ab-test-sample-size-calculator',
    cat: 'cro',
    name: 'A/B Test Sample Size Calculator',
    short: 'Visitors you need per variant - and how many days the test must run.',
    title: 'A/B Test Sample Size Calculator - Visitors per Variant & Test Duration',
    desc: 'Free A/B test sample size calculator. Enter your baseline conversion rate and the lift you want to detect to get visitors per variant, total sample and how many days to run the test.',
    h1: 'A/B Test Sample Size Calculator',
    lede: 'Decide before you start how many visitors a test needs - so you do not stop early and ship a false winner.',
    tool: `<div>
<div class="row2">${f('base', 'Baseline conversion rate', '3', { suf: '%' })}${f('mde', 'Minimum detectable lift (relative)', '20', { suf: '%', hint: '20% means detecting 3% -> 3.6%.' })}</div>
<div class="row2">${f('conf', 'Significance level (confidence)', '95', { suf: '%' })}${f('power', 'Statistical power', '80', { suf: '%' })}</div>
<div class="row2">${f('variants', 'Number of variants (incl. control)', '2')}${f('daily', 'Visitors per day in the test', '1000')}</div>
</div>
<div class="out">
<div class="big-label">Visitors needed per variant</div><div class="big" id="o_n">-</div>
<div class="stats">${stat('o_total', 'Total visitors')}${stat('o_days', 'Test duration')}${stat('o_target', 'Variant rate to detect')}${stat('o_conv', 'Conversions per variant (expected)')}</div>
<div class="verdict" id="o_v"></div></div>`,
    js: `// Inverse standard normal CDF (Acklam's rational approximation, error < 1.2e-9).
function qnorm(p) {
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239],
    b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572],
    c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783],
    d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416], pl = 0.02425;
  if (p < pl) { const q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  if (p > 1 - pl) return -qnorm(1 - p);
  const q = p - 0.5, r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}
live(() => {
  const p1 = num('base') / 100, m = num('mde') / 100, cf = num('conf') / 100, pw = num('power') / 100, k = num('variants'), daily = num('daily');
  if (!ok(p1, m, cf, pw) || p1 <= 0 || p1 >= 1 || m <= 0 || cf <= 0.5 || cf >= 1 || pw <= 0.5 || pw >= 1) { set('o_v', 'Enter a baseline between 0 and 100%, a lift above 0, and confidence and power between 50% and 100%.'); return; }
  const p2 = p1 * (1 + m);
  if (p2 >= 1) { set('o_v', 'Baseline x (1 + lift) must stay below 100%.'); return; }
  const za = qnorm(1 - (1 - cf) / 2), zb = qnorm(pw), pb = (p1 + p2) / 2;
  const n = Math.ceil(Math.pow(za * Math.sqrt(2 * pb * (1 - pb)) + zb * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2)), 2) / Math.pow(p2 - p1, 2));
  const kk = ok(k) && k >= 2 ? Math.round(k) : 2, total = n * kk;
  set('o_n', fnum(n, 0)); set('o_total', fnum(total, 0)); set('o_target', pct(p2 * 100, 2)); set('o_conv', fnum(Math.round(n * p1), 0));
  const days = ok(daily) && daily > 0 ? Math.ceil(total / daily) : NaN;
  set('o_days', ok(days) ? fnum(days, 0) + (days === 1 ? ' day' : ' days') : '-');
  set('o_v', !ok(days) ? 'Add daily visitors to see how long the test must run.' : days > 56 ? 'Over 8 weeks is too long - results drift as seasons and traffic change. Test a bolder change (bigger lift) or a higher-traffic page.' : days < 7 ? 'Run it for at least 7 full days anyway, so every weekday is covered.' : 'A realistic test. Decide the end date now and do not stop early when one variant pulls ahead.');
});`,
    content: `
<h2>The sample size formula</h2>
<p>This calculator uses the standard two-sided test for the difference between two proportions:</p>
<div class="formula">n per variant = ( z(1-a/2) x sqrt(2 x p x (1-p)) + z(power) x sqrt(p1(1-p1) + p2(1-p2)) )^2 / (p2 - p1)^2</div>
<p>where p1 is the baseline conversion rate, p2 is the rate you want to be able to detect (baseline x (1 + lift)), p is their average, a is 1 minus the confidence level, and z(...) is the standard normal quantile - 1.96 for 95% confidence and 0.84 for 80% power.</p>
<h2>Worked example</h2>
<p>A product page converts at 3% and you want to reliably detect a 20% relative lift - from 3% to 3.6%. At 95% confidence and 80% power the formula gives <b>13,914 visitors per variant</b>, or 27,828 for an A/B test. With 1,000 visitors a day the test needs <b>28 days</b>. Each variant will see roughly 417 conversions over that time.</p>
<h2>Why the lift you choose matters so much</h2>
<p>Sample size grows with the square of the smaller difference. Halve the lift you want to detect and you need roughly four times the traffic:</p>
${table(['Baseline', 'Lift to detect', 'Visitors per variant (95% / 80%)'], [['3%', '10%', '~53,200'], ['3%', '20%', '~13,900'], ['3%', '30%', '~6,500'], ['10%', '10%', '~14,800'], ['10%', '20%', '~3,800']])}
<p>That is why low-traffic sites should test bold changes - a new offer, a new page layout, a different price - rather than button colours. Small tweaks produce small lifts that need huge samples to prove.</p>
<h2>Rules for a clean test</h2>
<ul><li><b>Fix the sample size before you start</b>, and stop only when you reach it. Checking daily and stopping at the first "significant" result inflates false positives dramatically.</li><li><b>Run whole weeks.</b> Weekday and weekend visitors behave differently; a test should cover at least one, preferably two, full weekly cycles.</li><li><b>Split traffic evenly and randomly</b>, and keep returning visitors in the same variant.</li><li><b>Pick one primary metric</b> before launch. Looking at ten metrics guarantees one of them will look significant by chance.</li><li><b>Adding variants costs traffic.</b> An A/B/C/D test needs twice the total visitors of an A/B test.</li></ul>
<p>When the test finishes, check the result with the <a href="/ab-test-significance-calculator/">A/B test significance calculator</a>, and translate the lift into money with the <a href="/conversion-rate-calculator/">conversion rate calculator</a>.</p>`,
    faq: [
      ['How many visitors do I need for an A/B test?', 'It depends on your baseline conversion rate and the smallest lift you care about. A 3% baseline and a 20% relative lift needs about 13,900 visitors per variant at 95% confidence and 80% power.'],
      ['What is statistical power?', 'The probability that the test detects a real effect of the size you specified. 80% power means that if the variant truly is 20% better, the test will show a significant result 8 times out of 10.'],
      ['Can I stop a test early if it is already significant?', 'Not with this fixed-sample method. Repeatedly checking and stopping at the first significant result greatly increases the chance of a false winner. Decide the sample size up front and wait for it, or use a sequential testing method designed for peeking.'],
    ],
    related: ['ab-test-significance-calculator', 'conversion-rate-calculator', 'cpm-cpc-cpa-calculator'],
  },

  // ---------------------------------------------------------------- Conversion rate
  {
    slug: 'conversion-rate-calculator',
    cat: 'cro',
    name: 'Conversion Rate Calculator',
    short: 'Conversion rate, revenue per visitor and what a higher rate is worth.',
    title: 'Conversion Rate Calculator - Conversion Rate, Revenue per Visitor & Uplift Value',
    desc: 'Free conversion rate calculator. Get your conversion rate and revenue per visitor, then see how much extra revenue a higher conversion rate would bring with the same traffic.',
    h1: 'Conversion Rate Calculator',
    lede: 'Get your conversion rate - and see what raising it is worth in money, with the traffic you already have.',
    tool: `<div>
<div class="row2">${f('vis', 'Visitors (sessions)', '20000')}${f('conv', 'Conversions (orders, leads)', '400')}</div>
<div class="row2">${f('aov', 'Average value per conversion', '75', { pre: '$' })}${f('target', 'Target conversion rate', '2.5', { suf: '%' })}</div>
</div>
<div class="out">
<div class="big-label">Conversion rate</div><div class="big" id="o_cvr">-</div>
<div class="stats">${stat('o_rpv', 'Revenue per visitor')}${stat('o_rev', 'Revenue now')}${stat('o_trev', 'Revenue at target rate')}${stat('o_gain', 'Extra revenue at target')}</div>
<div class="verdict" id="o_v"></div></div>`,
    js: `live(() => {
  const v = num('vis'), c = num('conv'), a = num('aov'), t = num('target') / 100;
  if (!ok(v, c) || v <= 0) return;
  if (c > v) { set('o_v', 'Conversions cannot be higher than visitors - count each visitor once.'); return; }
  const cvr = c / v;
  set('o_cvr', pct(cvr * 100, 2));
  if (!ok(a)) return;
  set('o_rpv', money(c * a / v)); set('o_rev', money(c * a));
  if (!ok(t) || t <= 0 || t > 1) return;
  const tr = v * t * a, gain = tr - c * a;
  set('o_trev', money(tr)); set('o_gain', money(gain));
  set('o_v', gain > 0 ? 'Raising conversion from ' + pct(cvr * 100, 2) + ' to ' + pct(t * 100, 2) + ' adds ' + money(gain) + ' with the same traffic - that is ' + fnum(Math.round(gain / a), 0) + ' more conversions, no extra ad spend.' : 'You are already at or above this target rate.');
});`,
    content: `
<h2>Conversion rate formula</h2>
<div class="formula">Conversion rate = Conversions / Visitors x 100</div>
<div class="formula">Revenue per visitor = Revenue / Visitors = Conversion rate x Average order value</div>
<p>A "conversion" is whatever the page exists to produce: an order, a lead form, a sign-up, a call. Use one definition and keep it fixed so you can compare months.</p>
<h2>Worked example</h2>
<p>A store had 20,000 sessions and 400 orders, so its conversion rate is 400 / 20,000 = <b>2%</b>. At a $75 average order that is $30,000 of revenue, or <b>$1.50 per visitor</b>. Raising conversion to 2.5% - one extra order per 200 visitors - would bring 500 orders and $37,500, an extra <b>$7,500</b> from the same traffic. To get the same gain from ads at 2% conversion, you would need 5,000 more visitors.</p>
<h2>Why revenue per visitor is the better number</h2>
<p>Conversion rate on its own can mislead. A discount can raise conversion and lower order value so far that you earn less. Revenue per visitor captures both, which makes it the best single number to judge a test or a landing page change. It is also the ceiling for what you can pay per click: if a visitor is worth $1.50 in revenue and your gross margin is 40%, you can pay up to $0.60 per click and break even.</p>
<h2>Typical conversion rates</h2>
${table(['Type of page or business', 'Typical conversion rate'], [['E-commerce store, all traffic', 'Around 1% - 3%'], ['E-commerce, returning visitors', 'Often 2 - 3 times new visitors'], ['Lead generation landing page', 'Around 3% - 10%'], ['Free trial sign-up (SaaS)', 'Around 2% - 8% of visitors'], ['Email traffic to a store', 'Usually higher than paid social']])}
<p class="small muted">Ranges vary hugely by price point, industry, device and traffic source. A luxury store at 0.8% may be doing better than a discount store at 3%. Compare with your own history first.</p>
<h2>Common conversion rate mistakes</h2>
<ul><li><b>Mixing users and sessions.</b> Session-based rates are lower than user-based ones. Pick one.</li><li><b>Blending traffic sources.</b> One spike of low-intent traffic (a viral post, a cheap display campaign) drags the average down even if nothing is wrong with the site. Segment by source.</li><li><b>Ignoring mobile.</b> Mobile usually converts lower than desktop; a mobile-only problem hides inside the average.</li><li><b>Declaring victory too early.</b> Small samples swing a lot. Size tests properly with the <a href="/ab-test-sample-size-calculator/">sample size calculator</a>.</li></ul>
<p>Turn a better conversion rate into an ad budget with the <a href="/break-even-cpa-calculator/">break-even CPA calculator</a>.</p>`,
    faq: [
      ['What is a good conversion rate?', 'For most online stores 1% to 3% is typical, and lead generation pages often convert higher. The right benchmark is your own past performance for the same traffic source.'],
      ['How do I calculate conversion rate in Google Analytics?', 'Divide key events (conversions) by sessions or users for the same period and multiply by 100. Make sure the numerator and denominator use the same date range and filters.'],
      ['Is a higher conversion rate always better?', 'Not if it comes from discounts that cut order value or margin. Watch revenue per visitor and profit, not just the rate.'],
    ],
    related: ['ab-test-sample-size-calculator', 'ab-test-significance-calculator', 'break-even-cpa-calculator'],
  },

  // ---------------------------------------------------------------- Break-even point
  {
    slug: 'break-even-point-calculator',
    cat: 'ecom',
    name: 'Break-Even Point Calculator',
    short: 'Units and revenue you need to cover fixed costs - and to hit a profit goal.',
    title: 'Break-Even Point Calculator - Break-Even Units & Revenue',
    desc: 'Free break-even point calculator. Enter fixed costs, price and variable cost per unit to get break-even units, break-even revenue, contribution margin and the sales needed for a profit target.',
    h1: 'Break-Even Point Calculator',
    lede: 'How many units you must sell to cover your costs - and how many more to reach the profit you want.',
    tool: `<div>
${f('fixed', 'Fixed costs per month', '10000', { pre: '$', hint: 'Rent, salaries, software, insurance - costs that do not change with sales.' })}
<div class="row2">${f('price', 'Price per unit', '50', { pre: '$' })}${f('vc', 'Variable cost per unit', '30', { pre: '$', hint: 'Product, packaging, shipping, payment fees.' })}</div>
<div class="row2">${f('tp', 'Target profit per month', '5000', { pre: '$' })}${f('exp', 'Expected units per month (optional)', '600')}</div>
</div>
<div class="out">
<div class="big-label">Break-even units per month</div><div class="big" id="o_units">-</div>
<div class="stats">${stat('o_rev', 'Break-even revenue')}${stat('o_cm', 'Contribution per unit')}${stat('o_cmr', 'Contribution margin')}${stat('o_tu', 'Units for target profit')}${stat('o_mos', 'Margin of safety')}</div>
<div class="verdict" id="o_v"></div></div>`,
    js: `live(() => {
  const F = num('fixed'), p = num('price'), v = num('vc'), tp = num('tp'), e = num('exp');
  if (!ok(F, p, v) || p <= 0) return;
  const cm = p - v;
  set('o_cm', money(cm)); set('o_cmr', pct(cm / p * 100, 1));
  if (cm <= 0) { set('o_v', 'Each unit costs as much as or more than it sells for, so you can never break even. Raise the price or cut variable costs.'); return; }
  const be = F / cm, beu = Math.ceil(be);
  set('o_units', fnum(beu, 0)); set('o_rev', money(F / (cm / p)));
  if (ok(tp)) set('o_tu', fnum(Math.ceil((F + tp) / cm), 0));
  if (ok(e) && e > 0) {
    const mos = (e - be) / e;
    set('o_mos', pct(mos * 100, 1));
    set('o_v', e < be ? 'At ' + fnum(e, 0) + ' units you lose ' + money((be - e) * cm) + ' a month. You need ' + fnum(beu - e, 0) + ' more units, a higher price or lower costs.' : 'At ' + fnum(e, 0) + ' units you make ' + money((e - be) * cm) + ' a month, and sales could fall ' + pct(mos * 100, 1) + ' before you lose money.');
  } else set('o_v', 'Every unit after number ' + fnum(beu, 0) + ' adds ' + money(cm) + ' of profit.');
});`,
    content: `
<h2>Break-even formulas</h2>
<div class="formula">Contribution per unit = Price - Variable cost per unit</div>
<div class="formula">Break-even units = Fixed costs / Contribution per unit</div>
<div class="formula">Break-even revenue = Fixed costs / Contribution margin %</div>
<div class="formula">Units for target profit = (Fixed costs + Target profit) / Contribution per unit</div>
<p>Contribution is what each sale leaves over after its own direct costs. That money first pays the fixed costs; once they are covered, every further unit's contribution is profit.</p>
<h2>Worked example</h2>
<p>A product sells for $50 and costs $30 to make, pack and ship, so each unit contributes $20 (a 40% contribution margin). With $10,000 of monthly fixed costs, break-even is 10,000 / 20 = <b>500 units</b>, or <b>$25,000</b> of revenue. To make $5,000 profit you need (10,000 + 5,000) / 20 = <b>750 units</b>. If you expect to sell 600, your margin of safety is (600 - 500) / 600 = <b>16.7%</b>: sales can fall by a sixth before you start losing money.</p>
<h2>Price moves break-even more than you think</h2>
<p>Because break-even depends on contribution, not price, a small price change has a large effect:</p>
${table(['Price', 'Contribution per unit', 'Break-even units'], [['$45', '$15', '667'], ['$50', '$20', '500'], ['$55', '$25', '400'], ['$60', '$30', '334']])}
<p>A 10% price increase (from $50 to $55) cuts the break-even point by 20% in this example. The same logic works in reverse: a 10% discount raises it by a third. See the <a href="/discount-calculator/">discount calculator</a> for how much more you must sell to make a discount pay.</p>
<h2>Fixed or variable?</h2>
<ul><li><b>Fixed:</b> rent, salaries, software subscriptions, insurance, loan repayments, your own minimum pay.</li><li><b>Variable:</b> product cost, packaging, shipping, payment processing, marketplace fees, sales commissions.</li><li><b>Advertising</b> can be treated either way. If you set a fixed monthly budget, put it in fixed costs. If you pay per sale (CPA) or think of ads as cost per order, add it to the variable cost per unit.</li></ul>
<h2>Limits of break-even analysis</h2>
<p>The model assumes a constant price and constant cost per unit. In reality bulk buying lowers unit cost, discounts lower price, and fixed costs step up when you hire or move. Recalculate whenever one of those changes, and treat the result as a planning number, not a guarantee.</p>`,
    faq: [
      ['What is a break-even point?', 'The level of sales at which total revenue equals total costs, so profit is zero. Below it you lose money; above it each additional sale contributes profit.'],
      ['How do I calculate break-even in revenue instead of units?', 'Divide fixed costs by the contribution margin percentage. With $10,000 fixed costs and a 40% contribution margin, break-even revenue is $25,000.'],
      ['What is the margin of safety?', 'How far sales can fall before you reach break-even, as a share of expected sales: (Expected sales - Break-even sales) / Expected sales.'],
    ],
    related: ['profit-margin-calculator', 'discount-calculator', 'shopify-profit-calculator'],
  },

  // ---------------------------------------------------------------- Email list growth
  {
    slug: 'email-list-growth-calculator',
    cat: 'creator',
    name: 'Email List Growth Calculator',
    short: 'Project your list size from sign-ups and churn - and find its ceiling.',
    title: 'Email List Growth Calculator - Subscriber Growth, Churn & List Ceiling',
    desc: 'Free email list growth calculator. Enter current subscribers, new sign-ups per month and monthly churn to project list size, net growth rate and the ceiling your list will level off at.',
    h1: 'Email List Growth Calculator',
    lede: 'Project where your list will be in a year - and see the ceiling that churn quietly sets on it.',
    tool: `<div>
<div class="row2">${f('cur', 'Current subscribers', '5000')}${f('newm', 'New subscribers per month', '600')}</div>
<div class="row2">${f('churn', 'Monthly list churn', '2', { suf: '%', hint: 'Unsubscribes + bounces + spam complaints, as % of the list.' })}${f('months', 'Months to project', '12')}</div>
</div>
<div class="out">
<div class="big-label">Projected list size</div><div class="big" id="o_final">-</div>
<div class="stats">${stat('o_net1', 'Net new subscribers, month 1')}${stat('o_rate', 'Net growth rate, month 1')}${stat('o_lost', 'Subscribers lost over the period')}${stat('o_cap', 'List ceiling (sign-ups / churn)')}</div>
<div class="verdict" id="o_v"></div></div>`,
    js: `live(() => {
  const s0 = num('cur'), n = num('newm'), c = num('churn') / 100, m0 = num('months');
  if (!ok(s0, n, c, m0) || c >= 1 || m0 < 1 || m0 > 600) return;
  const m = Math.round(m0);
  let s = s0, lost = 0;
  for (let i = 0; i < m; i++) { const l = s * c; lost += l; s = s - l + n; }
  const net1 = n - s0 * c;
  set('o_final', fnum(Math.round(s), 0)); set('o_net1', fnum(Math.round(net1), 0)); set('o_lost', fnum(Math.round(lost), 0));
  set('o_rate', s0 > 0 ? pct(net1 / s0 * 100, 1) : '-');
  set('o_cap', c > 0 ? fnum(Math.round(n / c), 0) : 'No limit');
  set('o_v', c <= 0 ? 'With no churn the list grows by the full sign-up number every month.' : s0 >= n / c ? 'Your list is at or above its ceiling - churn is eating every new sign-up. Grow sign-ups or cut churn to grow again.' : 'At this pace the list levels off around ' + fnum(Math.round(n / c), 0) + ' subscribers. To raise that ceiling, increase sign-ups or reduce churn.');
});`,
    content: `
<h2>How list growth works</h2>
<p>Each month you add new sign-ups and lose a percentage of the list to unsubscribes, bounces and spam complaints. Because the loss is a percentage, it grows as the list grows, while sign-ups usually stay roughly flat. Eventually the two meet and the list stops growing:</p>
<div class="formula">Next month = This month x (1 - Churn %) + New subscribers</div>
<div class="formula">List ceiling = New subscribers per month / Monthly churn %</div>
<div class="formula">Net growth rate = (New subscribers - Subscribers lost) / List size at start</div>
<h2>Worked example</h2>
<p>A list of 5,000 adds 600 subscribers a month and loses 2% a month. In month one it loses 100 and gains 600, a net 500 (10% growth). After 12 months it reaches about <b>10,380</b> subscribers, having lost about 1,820 along the way. But the ceiling is 600 / 2% = <b>30,000</b>: however long you wait, the list will level off near there unless sign-ups grow or churn falls.</p>
<h2>Two levers, very different costs</h2>
${table(['Change', 'New ceiling', 'Effect'], [['Baseline: 600/month, 2% churn', '30,000', '-'], ['Double sign-ups to 1,200/month', '60,000', 'Needs more traffic or a better offer'], ['Halve churn to 1%', '60,000', 'Needs better content and list hygiene'], ['Both', '120,000', 'Compounding effect']])}
<p>Cutting churn is often cheaper than doubling sign-ups. Send what you promised at sign-up, at the frequency you promised, and remove inactive subscribers before they turn into spam complaints.</p>
<h2>Typical churn numbers</h2>
<p>Many healthy lists lose somewhere around 0.5% to 3% a month to unsubscribes, bounces and complaints combined, plus a slower decay as email addresses go stale. If you send very often, buy lists or collect emails with a giveaway unrelated to your content, expect the high end or worse.</p>
<h2>Growing sign-ups</h2>
<ul><li><b>Offer something specific</b> in exchange for the email - a checklist, a template, a calculator result - rather than "subscribe to our newsletter".</li><li><b>Put the form where intent is highest:</b> at the end of your most-read posts and inside tools people already use.</li><li><b>Track sign-up rate per page</b> using the <a href="/conversion-rate-calculator/">conversion rate calculator</a>, and tag your promotion links with the <a href="/utm-builder/">UTM builder</a> to see which channels bring subscribers who stay.</li></ul>`,
    faq: [
      ['How do I calculate email list growth rate?', 'Subtract subscribers lost (unsubscribes, bounces, complaints) from new subscribers in the period, then divide by the list size at the start. 600 new minus 100 lost on a 5,000 list is a 10% monthly growth rate.'],
      ['Why has my email list stopped growing?', 'Because churn is a percentage of the list, it grows as the list grows. When monthly losses equal monthly sign-ups, the list plateaus. The plateau is roughly new subscribers per month divided by monthly churn rate.'],
      ['Should I remove inactive subscribers?', 'Usually yes, after a re-engagement attempt. Inactive addresses hurt deliverability and can turn into spam traps. A smaller, engaged list often earns more than a large, cold one.'],
    ],
    related: ['engagement-rate-calculator', 'conversion-rate-calculator', 'customer-ltv-calculator'],
  },

  // ---------------------------------------------------------------- Discount
  {
    slug: 'discount-calculator',
    cat: 'ecom',
    name: 'Discount Profit Calculator',
    short: 'How many more sales a discount needs just to keep the same profit.',
    title: 'Discount Profit Calculator - Sales Increase Needed to Break Even on a Discount',
    desc: 'Free discount calculator for stores. Enter price, unit cost and discount to see the new margin and how much sales must rise to make the same gross profit as before.',
    h1: 'Discount Profit Calculator',
    lede: 'Before you run a sale, see how many extra orders it needs just to earn what you earn today.',
    tool: `<div>
<div class="row2">${f('price', 'Normal price', '100', { pre: '$' })}${f('cost', 'Cost per unit', '60', { pre: '$', hint: 'Product + shipping + fees per unit.' })}</div>
<div class="row2">${f('disc', 'Discount', '20', { suf: '%' })}${f('units', 'Units you normally sell', '200', { hint: 'In the period the sale will run.' })}</div>
</div>
<div class="out">
<div class="big-label">Sales increase needed to break even</div><div class="big" id="o_need">-</div>
<div class="stats">${stat('o_np', 'Sale price')}${stat('o_pu', 'Profit per unit on sale')}${stat('o_m', 'Margin on sale')}${stat('o_units', 'Units needed on sale')}${stat('o_gp', 'Gross profit at normal price')}</div>
<div class="verdict" id="o_v"></div></div>`,
    js: `live(() => {
  const p = num('price'), c = num('cost'), d = num('disc') / 100, u = num('units');
  if (!ok(p, c, d) || p <= 0 || d >= 1) return;
  const np = p * (1 - d), old = p - c, nw = np - c;
  set('o_np', money(np)); set('o_pu', money(nw)); set('o_m', pct(nw / np * 100, 1));
  if (ok(u)) set('o_gp', money(old * u, 0));
  if (old <= 0) { set('o_v', 'You already lose money on each unit at the normal price.'); return; }
  if (nw <= 0) { set('o_v', 'At this discount every unit sells at a loss - no amount of extra volume makes it profitable.'); $('o_need').classList.add('bad'); return; }
  $('o_need').classList.remove('bad');
  const inc = old / nw - 1;
  set('o_need', pct(inc * 100, 1));
  if (ok(u)) set('o_units', fnum(Math.ceil(u * old / nw - 1e-9), 0));
  set('o_v', 'A ' + pct(d * 100, 0) + ' discount turns ' + money(old) + ' of profit per unit into ' + money(nw) + '. You must sell ' + fnum(old / nw, 2) + 'x as many units to earn the same gross profit.');
});`,
    content: `
<h2>The discount formula</h2>
<div class="formula">Sales increase needed = Profit per unit before / Profit per unit after discount - 1</div>
<div class="formula">Profit per unit after = Price x (1 - Discount) - Cost per unit</div>
<p>The discount comes entirely out of your margin, not out of the price, so the profit per unit falls much faster than the price does.</p>
<h2>Worked example</h2>
<p>A product sells for $100 and costs $60, so it makes $40 a unit (a 40% margin). A 20% discount brings the price to $80, but the cost is still $60, so profit per unit halves to $20 - a 25% margin. To make the same $8,000 gross profit you make from 200 units at full price, you need to sell <b>400 units</b> on sale: a <b>100% increase</b> in volume, just to stand still.</p>
<h2>Discount vs. margin table</h2>
<p>Sales increase needed to keep the same gross profit:</p>
${table(['Discount', '30% margin', '40% margin', '50% margin', '60% margin'], [['5%', '20%', '14.3%', '11.1%', '9.1%'], ['10%', '50%', '33.3%', '25%', '20%'], ['15%', '100%', '60%', '42.9%', '33.3%'], ['20%', '200%', '100%', '66.7%', '50%'], ['25%', '500%', '166.7%', '100%', '71.4%'], ['30%', 'Loss', '300%', '150%', '100%']])}
<p>Lower-margin businesses get hurt fastest. At a 30% margin, a 30% discount means selling at cost - every order is work for nothing.</p>
<h2>When a discount can still make sense</h2>
<ul><li><b>Clearing dead stock.</b> If the alternative is writing it off, any price above the cost of selling it is a gain.</li><li><b>Acquiring customers who come back.</b> A first-order discount can pay off if repeat purchases follow - check it with the <a href="/customer-ltv-calculator/">LTV calculator</a>.</li><li><b>Raising order value.</b> "10% off orders over $150" protects margin better than a sitewide discount, because it only applies to bigger baskets.</li></ul>
<h2>Alternatives to a straight discount</h2>
<p>Free shipping thresholds, gifts with purchase, bundles and limited-time bonuses often lift sales while costing less than a percentage off, because the perceived value is higher than the cost to you. Whatever you choose, run the numbers first - and check your <a href="/break-even-point-calculator/">break-even point</a> at the sale price.</p>`,
    faq: [
      ['How much do sales need to increase to cover a discount?', 'Divide your profit per unit before the discount by your profit per unit after it, then subtract 1. At a 40% margin, a 20% discount needs a 100% increase in units to earn the same gross profit.'],
      ['Is a 20% discount the same as a 20% loss of profit?', 'No - it is usually much more. The discount comes out of the margin, so on a 40% margin product a 20% discount cuts profit per unit in half.'],
      ['Does this include fixed costs?', 'No. It compares gross profit (price minus unit cost), which is the right view for a short promotion where fixed costs do not change.'],
    ],
    related: ['profit-margin-calculator', 'break-even-point-calculator', 'shopify-profit-calculator'],
  },
];
