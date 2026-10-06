// Long-form guides at /guides/<slug>/. Each answers one search question and points to the matching tool.

const table = (head, rows) => `<div class="tscroll"><table class="t"><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;

export const guides = [
  {
    slug: 'what-is-a-good-roas',
    name: 'What is a good ROAS?',
    title: 'What Is a Good ROAS? Benchmarks by Margin and Industry',
    desc: 'What counts as a good ROAS depends on your margin. Break-even ROAS by margin, typical ROAS by channel, and how to set a target ROAS that leaves profit.',
    lede: 'The honest answer is "it depends on your margin" - so here is exactly how it depends, with the numbers.',
    tools: ['roas-calculator', 'break-even-cpa-calculator', 'profit-margin-calculator'],
    html: `
<p>A good ROAS is any ROAS above your break-even ROAS, and a great ROAS is one that leaves the profit you planned for after overheads. The often-quoted "4:1 is good" rule only holds for businesses with roughly 35 to 45% gross margins. A software company at 90% margin is profitable at 1.2x, while a reseller at 20% margin loses money below 5x.</p>
<h2>Step 1: find your break-even ROAS</h2>
<div class="formula">Break-even ROAS = 1 / Gross margin</div>
<p>Gross margin here means the share of revenue left after the direct cost of each sale: product or COGS, packaging, shipping you pay, payment fees and expected returns. Not after rent or salaries - those come later.</p>
${table(['Gross margin', 'Break-even ROAS', 'In plain words'], [['20%', '5.0x', 'Every $1 of ads must bring $5 of sales just to cover cost'], ['30%', '3.3x', 'The common "3x is good" campaign is losing money'], ['40%', '2.5x', ''], ['50%', '2.0x', ''], ['60%', '1.67x', ''], ['75%', '1.33x', ''], ['90%', '1.11x', 'Software and digital products'],])}
<p>Run your own numbers in the <a href="/roas-calculator/">ROAS calculator</a> - it shows break-even ROAS and profit after ads from three inputs.</p>
<h2>Step 2: set a target ROAS above break-even</h2>
<p>Break-even covers product costs and ad spend, but nothing else. To pay for overheads and keep some profit, aim higher:</p>
<div class="formula">Target ROAS = 1 / (Gross margin - Target profit margin)</div>
<p>Example: a skincare brand with a 65% gross margin wants 20% of revenue left after ads. Target ROAS = 1 / (0.65 - 0.20) = 2.2x. A 2.2x campaign is a "good" ROAS for that brand, even though it looks weak next to the 4x rule of thumb.</p>
<h2>Typical ROAS by channel and campaign type</h2>
<p>Platform-reported ROAS varies hugely by campaign type, so compare within a type rather than across them. As a rough orientation, not a benchmark to aim for:</p>
${table(['Campaign type', 'What usually happens to ROAS'], [['Brand search', 'Very high (often 10x+), because people already looking for you'], ['Retargeting', 'High, but much of it would have happened anyway'], ['Non-brand search', 'Moderate; depends heavily on keyword intent'], ['Prospecting social (Meta, TikTok)', 'Lowest first-order ROAS; this is where new customers come from'], ['Shopping / Performance Max', 'Mixed; can blend brand and retargeting traffic into the number']])}
<p>A business that only funds high-ROAS campaigns usually stops growing, because brand search and retargeting mostly harvest demand created elsewhere. That is why many teams track blended ROAS (MER) - total revenue divided by total ad spend - alongside platform ROAS.</p>
<h2>When a low ROAS is fine</h2>
<ul><li><b>Strong repeat purchases.</b> If customers buy three times a year, a first-order ROAS below break-even can still pay back. Judge it with the <a href="/customer-ltv-calculator/">LTV calculator</a> instead.</li><li><b>Subscriptions.</b> The first payment rarely covers acquisition. What matters is LTV:CAC and payback time.</li><li><b>Launch and testing.</b> New campaigns need data before the algorithm settles. Judge after a meaningful number of conversions, not the first few days.</li></ul>
<h2>When a high ROAS is a warning sign</h2>
<ul><li>It comes almost entirely from brand search or retargeting.</li><li>Spend is tiny - many campaigns hit high ROAS at $20 a day and collapse at $200.</li><li>Attribution overlaps: if Meta, Google and email all claim the same order, every channel looks great while total revenue is flat.</li></ul>
<h2>How to raise ROAS without touching the ads</h2>
<ul><li>Increase average order value with bundles and free-shipping thresholds.</li><li>Improve gross margin: supplier pricing, shipping rates, fewer returns. This lowers break-even directly.</li><li>Fix the landing page: speed, clearer offer, reviews near the buy button.</li><li>Raise prices if your conversion rate can absorb it - a 10% price rise with no drop in conversion improves ROAS by 10%.</li></ul>`,
    faq: [
      ['Is 2x ROAS good?', 'It is good if your gross margin is above 50%, roughly break-even at 50%, and a loss below that. Calculate 1 / margin to know for sure.'],
      ['Is 4x ROAS good?', 'For most e-commerce businesses with 30 to 50% margins, yes - 4x is comfortably above break-even. For a 20% margin reseller it is still a loss.'],
      ['What is the difference between ROAS and ROI?', 'ROAS is revenue divided by ad spend. ROI is profit divided by total investment. ROAS ignores product cost; ROI does not.'],
    ],
  },

  {
    slug: 'break-even-roas-formula',
    name: 'Break-even ROAS formula',
    title: 'Break-Even ROAS Formula: How to Calculate It (With Examples)',
    desc: 'The break-even ROAS formula is 1 / gross margin. How to calculate gross margin correctly, worked examples, and how to turn break-even ROAS into CPA and bids.',
    lede: 'One formula decides whether your ads make or lose money. Here is how to calculate it properly - including the costs most people forget.',
    tools: ['roas-calculator', 'break-even-cpa-calculator', 'profit-margin-calculator'],
    html: `
<p>Break-even ROAS is the return on ad spend at which a campaign makes exactly zero profit. Below it, every sale loses money; above it, you profit. The formula is simple:</p>
<div class="formula">Break-even ROAS = 1 / Gross margin (as a decimal)</div>
<p>At a 40% gross margin, break-even ROAS = 1 / 0.40 = 2.5. You need $2.50 in sales for every $1 of ads.</p>
<h2>Why the formula works</h2>
<p>If gross margin is m, each $1 of revenue leaves m dollars to pay for advertising. To break even, the gross profit from ad-driven sales must equal the ad spend: Revenue x m = Spend. Rearranged, Revenue / Spend = 1 / m. Revenue divided by spend is ROAS, so break-even ROAS = 1 / m.</p>
<h2>Calculating gross margin correctly</h2>
<p>Most break-even mistakes come from an optimistic margin. Include every cost that grows with each order:</p>
${table(['Cost per order', 'Example on a $80 order'], [['Product cost (COGS)', '$26.00'], ['Packaging', '$1.50'], ['Shipping you pay', '$7.00'], ['Payment processing (about 2.9% + $0.30)', '$2.62'], ['Returns and refunds (expected)', '$3.20 (4% of revenue)'], ['App or platform fees per order', '$0.68'], ['<b>Total variable cost</b>', '<b>$41.00</b>']])}
<p>Gross margin = ($80 - $41) / $80 = 48.75%. Break-even ROAS = 1 / 0.4875 = <b>2.05x</b>. Had this store used only product cost ($26), it would have calculated a 67.5% margin and a 1.48x break-even - and happily run campaigns that were losing money.</p>
<h2>Three worked examples</h2>
${table(['Business', 'AOV', 'Variable cost', 'Gross margin', 'Break-even ROAS'], [['Supplements store', '$55', '$16.50', '70%', '1.43x'], ['Furniture e-commerce', '$420', '$273', '35%', '2.86x'], ['Phone accessories reseller', '$25', '$20', '20%', '5.0x']])}
<h2>From break-even ROAS to break-even CPA</h2>
<p>Ad platforms often bid on cost per acquisition rather than ROAS. Convert with:</p>
<div class="formula">Break-even CPA = Average order value / Break-even ROAS = AOV x Gross margin</div>
<p>For the $80 store: $80 x 0.4875 = $39. Pay more than $39 per order and you lose money on the first purchase. The <a href="/break-even-cpa-calculator/">break-even CPA calculator</a> also turns this into a max CPC using your conversion rate.</p>
<h2>Adding a profit target</h2>
<p>Break-even is the floor. To keep a profit margin p after ads, use:</p>
<div class="formula">Target ROAS = 1 / (Gross margin - p)</div>
<p>The $80 store wanting 15% profit: 1 / (0.4875 - 0.15) = 2.96x. That is the number to put into a target ROAS bid strategy.</p>
<h2>Break-even ROAS for repeat-purchase businesses</h2>
<p>If customers come back, the first order does not need to break even on its own. A lifetime version uses gross profit across expected orders:</p>
<div class="formula">Lifetime break-even ROAS = 1 / (Gross margin x Expected orders per customer)</div>
<p>Use it carefully: it only works if repeat behaviour is proven in your data and you have the cash to wait for those later orders. Many brands use first-order break-even for prospecting budgets and lifetime break-even only as an upper limit.</p>`,
    faq: [
      ['What is the break-even ROAS at 50% margin?', '2.0x. You need $2 in revenue for every $1 of ad spend.'],
      ['Should break-even ROAS include overheads like salaries?', 'No. Break-even ROAS covers variable costs and ad spend. Cover fixed overheads by setting a target ROAS above break-even.'],
      ['Is break-even ROAS the same in every ad platform?', 'The math is the same, but platforms report revenue differently. Compare it against revenue you trust, ideally your own store data.'],
    ],
  },

  {
    slug: 'how-to-calculate-epc',
    name: 'How to calculate EPC',
    title: 'How to Calculate EPC (Earnings Per Click) in Affiliate Marketing',
    desc: 'EPC = commissions / clicks. How to calculate earnings per click, EPC per 100 clicks, what a good EPC is, and how to use EPC to choose affiliate offers.',
    lede: 'EPC is the one number that lets you compare any two affiliate offers fairly. Here is how to calculate it and how to use it.',
    tools: ['affiliate-commission-calculator', 'affiliate-revenue-leak-calculator', 'cpm-cpc-cpa-calculator'],
    html: `
<p>EPC (earnings per click) is the average commission you earn for each click on an affiliate link. Calculate it by dividing total commissions by total clicks for the same period:</p>
<div class="formula">EPC = Total commissions / Total clicks</div>
<p>If 2,400 clicks earned $1,080 in commissions last month, EPC = $1,080 / 2,400 = <b>$0.45</b>.</p>
<h2>EPC from conversion rate and payout</h2>
<p>For an offer you have not run yet, estimate EPC from its parts:</p>
<div class="formula">EPC = Conversion rate x Commission per sale</div>
<p>A product that converts 3% of clicks and pays $18 per sale has an expected EPC of 0.03 x $18 = $0.54. Our <a href="/affiliate-commission-calculator/">affiliate commission calculator</a> does this and also tells you how many clicks you need to hit an income goal.</p>
<h2>EPC vs. EPC per 100 clicks</h2>
<p>Some networks report EPC per 100 clicks rather than per click, because the per-click numbers are small. A "100 EPC" of $45 equals $0.45 per click. Always check which version a network shows before comparing offers across networks.</p>
<h2>Why EPC beats commission rate</h2>
${table(['Offer', 'Commission', 'Conversion rate', 'EPC'], [['$29 ebook, 50% commission', '$14.50', '1.0%', '$0.145'], ['$300 software, 30% first payment', '$90', '0.8%', '$0.72'], ['$15 trial signup (CPA)', '$15', '6%', '$0.90']])}
<p>The 50% offer has the most attractive headline and the worst economics. The flat CPA trial converts so well that it beats both. Commission rate alone tells you almost nothing.</p>
<h2>What is a good EPC?</h2>
<p>There is no universal number - it depends on niche and traffic type - but a useful way to judge it is against what the click costs you:</p>
<ul><li><b>Paid traffic:</b> EPC must be higher than your cost per click, with room for profit. A $0.60 EPC is excellent if clicks cost $0.20 and a loss at $0.80. Compare with the <a href="/cpm-cpc-cpa-calculator/">CPC calculator</a>.</li><li><b>SEO or content traffic:</b> compare EPC between offers that fit the same page. Your traffic has a fixed size, so the offer with the higher EPC earns more.</li><li><b>Email:</b> calculate earnings per email sent or per subscriber as well as per click - clicks from email are usually warmer and convert better.</li></ul>
<h2>Network EPC vs. your EPC</h2>
<p>Networks show average EPC across all their affiliates. That average often includes coupon, cashback and loyalty sites, which convert at very high rates because their visitors are already at checkout. A content site or social account will usually see a lower EPC. Use the network figure as a starting estimate, then switch to your own data after a few hundred clicks.</p>
<h2>How to increase EPC</h2>
<ul><li>Place links on high-intent pages: reviews, comparisons and "best X for Y" articles.</li><li>Deep-link to the exact product rather than the homepage.</li><li>Pre-sell: explain who the product is for and who it is not for. Better-qualified clicks convert better.</li><li>Ask the affiliate manager for an exclusive coupon for your audience - it often lifts conversion rate noticeably.</li><li>Drop offers whose EPC stays low after a fair test and reuse the placement for better ones.</li></ul>
<h2>For affiliate program managers</h2>
<p>EPC is also how affiliates judge your program. If your network EPC is lower than competing programs in the same niche, serious affiliates will quietly promote someone else. Improving landing-page conversion rate raises every partner's EPC at once - often a better investment than raising commissions. If many of your partners never send traffic at all, start with the <a href="/affiliate-revenue-leak-calculator/">affiliate revenue leak calculator</a>.</p>`,
    faq: [
      ['What does EPC stand for?', 'Earnings per click - the average commission earned for each click on an affiliate link.'],
      ['Is a higher EPC always better?', 'For the same traffic, yes. But also check cookie length, recurring payouts, reversal rates and whether the program pays reliably.'],
      ['How many clicks do I need before EPC is reliable?', 'At least a few hundred clicks and ideally 20 or more sales. Below that, one or two sales can swing EPC dramatically.'],
    ],
  },

  {
    slug: 'ltv-to-cac-ratio',
    name: 'LTV to CAC ratio',
    title: 'LTV to CAC Ratio: What Is Good and How to Calculate It',
    desc: 'The LTV:CAC ratio compares customer lifetime value to acquisition cost. Why 3:1 is the common target, how to calculate both sides correctly, and how to improve it.',
    lede: 'LTV:CAC tells you whether growth creates value or burns it. Here is how to calculate it honestly and what the result means.',
    tools: ['customer-ltv-calculator', 'cac-calculator', 'churn-rate-calculator'],
    html: `
<p>The LTV to CAC ratio divides the lifetime value of a customer by what it cost to acquire them. A ratio of 3:1 means each customer is worth three times what you paid to win them. It is the most common shorthand for whether a business's growth is healthy.</p>
<div class="formula">LTV:CAC = Customer lifetime value / Customer acquisition cost</div>
<h2>What is a good LTV:CAC ratio?</h2>
${table(['Ratio', 'What it usually means'], [['Below 1:1', 'Each new customer destroys value. Stop scaling and fix the unit economics.'], ['1:1 to 3:1', 'Profitable per customer but thin. Overheads and churn surprises can wipe it out.'], ['3:1 to 5:1', 'The commonly cited healthy range. Room to grow and to absorb mistakes.'], ['Above 5:1', 'Often a sign you are under-investing in growth and could acquire more customers profitably.']])}
<p>The 3:1 rule is a convention from venture-backed SaaS, not a law. A business with low overheads can thrive at 2:1; one with heavy fixed costs may need 4:1. Treat it as a starting benchmark.</p>
<h2>Calculating LTV correctly</h2>
<div class="formula">LTV = Average order value x Purchases per year x Lifespan (years) x Gross margin</div>
<p>For subscriptions, lifespan comes from churn: average lifetime in months = 1 / monthly churn rate. With 4% monthly churn, the average customer stays 25 months.</p>
<p>The most important rule: <b>use gross profit, not revenue</b>. A $600 revenue LTV at 40% margin is $240 of real value. Comparing $600 to a $200 CAC shows a comfortable 3:1; the honest ratio is 1.2:1. Calculate yours with the <a href="/customer-ltv-calculator/">LTV calculator</a>, and work out churn with the <a href="/churn-rate-calculator/">churn rate calculator</a>.</p>
<h2>Calculating CAC correctly</h2>
<div class="formula">CAC = Total sales and marketing cost / New customers acquired</div>
<p>"Total" is where most ratios get flattered. Paid CAC (ad spend only) is useful for channel decisions, but fully loaded CAC also includes marketing salaries, agency fees, tools, sales commissions and content production. Investors and lenders usually want the fully loaded number. The <a href="/cac-calculator/">CAC calculator</a> shows both.</p>
<h2>Worked example</h2>
<p>A B2B software tool charges $49 a month at 85% gross margin with 3% monthly churn. Last quarter it spent $36,000 on ads and $24,000 on marketing salaries and tools, and won 400 new customers.</p>
<ul><li>Lifetime: 1 / 0.03 = 33.3 months</li><li>LTV: $49 x 33.3 x 0.85 = <b>$1,388</b></li><li>Paid CAC: $36,000 / 400 = $90 - ratio 15.4:1</li><li>Fully loaded CAC: $60,000 / 400 = <b>$150</b> - ratio <b>9.3:1</b></li><li>CAC payback: $150 / ($49 x 0.85) = <b>3.6 months</b></li></ul>
<p>That ratio is high enough to suggest the company could spend more on acquisition - though a 33-month lifetime estimated from a young customer base deserves caution.</p>
<h2>Do not forget payback time</h2>
<p>LTV:CAC ignores timing. Two businesses can both have 3:1, but one earns back CAC in 4 months and the other in 30. The second needs far more cash to grow. Track CAC payback months alongside the ratio:</p>
<div class="formula">CAC payback (months) = CAC / Monthly gross profit per customer</div>
<h2>How to improve LTV:CAC</h2>
<ul><li><b>Reduce churn.</b> Better onboarding, quicker time to value, and win-back campaigns. Because lifetime = 1 / churn, cutting churn from 5% to 4% lengthens average lifetime by 25%.</li><li><b>Raise prices or average order value.</b> It raises LTV with no change in CAC.</li><li><b>Shift budget to efficient channels.</b> Calculate CAC per channel; blended averages hide channels that lose money.</li><li><b>Improve conversion rates</b> on landing pages and trials - the same spend wins more customers.</li><li><b>Expand existing customers</b> with upgrades and add-ons.</li></ul>`,
    faq: [
      ['Is a 3:1 LTV to CAC ratio good?', 'Yes, 3:1 is the most commonly cited healthy ratio. Whether it is enough depends on your overheads and how fast you recover CAC.'],
      ['Can LTV:CAC be too high?', 'A very high ratio (above about 5:1) often means you could profitably spend more on acquisition and grow faster.'],
      ['Should LTV use revenue or profit?', 'Gross profit. Revenue-based LTV overstates customer value and leads to overspending on acquisition.'],
    ],
  },

  {
    slug: 'how-long-to-run-an-ab-test',
    name: 'How long to run an A/B test',
    title: 'How Long Should You Run an A/B Test? (Sample Size Guide)',
    desc: 'How long to run an A/B test: sample size by conversion rate and expected lift, why to run at least one to two weeks, and the mistakes that create false winners.',
    lede: 'Stop too early and you ship false winners. Run too long and you waste traffic. Here is how to plan the right duration before you start.',
    tools: ['ab-test-significance-calculator', 'cpm-cpc-cpa-calculator'],
    html: `
<p>Run an A/B test until it reaches the sample size you calculated before starting, and for at least one full week - ideally two - so every day of the week is represented. Never stop just because the dashboard shows 95% confidence on day three. The duration comes from three things: your baseline conversion rate, the smallest lift you want to detect, and how much traffic you have.</p>
<h2>Step 1: decide the minimum lift worth detecting</h2>
<p>Ask: what is the smallest improvement that would change a decision? For a pricing page that might be a 10% relative lift; for a button colour, nothing small is worth the effort. The smaller the lift, the more traffic you need - roughly four times the traffic to detect half the effect.</p>
<h2>Step 2: look up the sample size</h2>
<p>At 95% confidence and 80% power (the usual defaults), the visitors needed per variant are approximately:</p>
${table(['Baseline conversion', '10% relative lift', '20% relative lift', '30% relative lift'], [['1%', '~163,000', '~42,700', '~19,800'], ['2%', '~80,700', '~21,100', '~9,800'], ['3%', '~53,200', '~13,900', '~6,400'], ['5%', '~31,200', '~8,200', '~3,800'], ['10%', '~14,800', '~3,800', '~1,800']])}
<p>These come from the standard two-proportion sample size formula. Multiply by the number of variants (two for a classic A/B test) to get total traffic.</p>
<h2>Step 3: convert sample size into days</h2>
<div class="formula">Days = (Visitors per variant x Number of variants) / Daily visitors in the test</div>
<p>Example: a product page converts at 3%, gets 2,000 visitors a day, and the team wants to detect a 20% lift. That needs about 13,900 per variant, or 27,800 total - about 14 days. If the result says 3 days, still run a full week; if it says 6 months, test something bolder.</p>
${table(['Situation', 'What to do'], [['Under 7 days needed', 'Run for 7 to 14 days anyway to cover weekly cycles'], ['1 to 4 weeks needed', 'Ideal; run as planned'], ['More than 6 to 8 weeks needed', 'Test a bigger change, test higher in the funnel, or use a higher-traffic page']])}
<h2>Why at least one full week</h2>
<p>Visitors behave differently on Monday morning and Saturday night, and email sends, paydays and promotions create spikes. A test that runs Tuesday to Thursday only measures Tuesday-to-Thursday visitors. Running whole weeks averages these cycles out.</p>
<h2>Mistakes that create false winners</h2>
<ul><li><b>Peeking.</b> Checking significance every day and stopping at the first 95% reading pushes the real false-positive rate well above 5%. Decide the sample size first and check significance at the end.</li><li><b>Changing the test mid-way.</b> Editing a variant or splitting traffic differently resets the experiment.</li><li><b>Novelty effect.</b> Returning visitors sometimes click a new design simply because it is new. Longer tests let this fade.</li><li><b>Too many variants.</b> Each extra variant needs its own full sample and raises the chance of a lucky winner.</li><li><b>Ignoring segments after the fact.</b> Slicing results by device or country until something "wins" is fishing. Plan segments before starting.</li></ul>
<h2>When the test ends</h2>
<p>Enter the final visitors and conversions for each variant into the <a href="/ab-test-significance-calculator/">A/B test significance calculator</a>. If you reach 95% confidence and the lift is big enough to matter, ship it. If not, the honest conclusion is "no detectable difference" - which is still useful, because it tells you this change is not where the growth is.</p>`,
    faq: [
      ['What is the minimum time to run an A/B test?', 'At least one full week, and ideally two, even if the required sample size is reached sooner.'],
      ['Can I stop an A/B test early if it reaches 95% confidence?', 'Not safely. Stopping at the first significant reading inflates false positives. Wait for the sample size you planned.'],
      ['What if my site does not have enough traffic?', 'Test bigger changes that could produce 20 to 30% lifts, test on your highest-traffic pages, or measure an earlier step in the funnel such as add-to-cart.'],
    ],
  },
];
