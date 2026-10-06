// Deeper content appended to each tool page (after the base content, before the FAQ).
// Worked examples, mistakes and decision guidance - the part that makes a tool page worth reading.
// faq entries are appended to the tool's own FAQ (and its FAQPage schema).

const table = (head, rows) => `<div class="tscroll"><table class="t"><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</table></div>`;

export const extra = {
  'roas-calculator': {
    html: `
<h2>Worked example: a "good" campaign that loses money</h2>
<p>An apparel store spends $2,000 on Meta ads in a month and the dashboard reports $6,000 in purchases - a 3x ROAS. Product, shipping and payment fees take 70% of revenue, so gross margin is 30%.</p>
<ul><li>Gross profit from the ad revenue: $6,000 x 30% = $1,800</li><li>Minus ad spend: $1,800 - $2,000 = <b>-$200</b></li><li>Break-even ROAS: 1 / 0.30 = <b>3.33x</b></li></ul>
<p>The campaign looks healthy and still loses $200. Raise margin to 40% (a price increase or cheaper shipping) and break-even drops to 2.5x - the same 3x campaign now makes $400. That is why margin work is often the fastest way to "improve" ROAS.</p>
<h2>Target ROAS vs. break-even ROAS</h2>
<p>Break-even ROAS is the floor, not the goal. Most businesses set a target ROAS above it to cover overheads and leave profit. A simple way to set one:</p>
<div class="formula">Target ROAS = 1 / (Gross margin - Target profit margin)</div>
<p>With a 40% gross margin and a goal of keeping 15% of revenue as profit after ads, target ROAS = 1 / (0.40 - 0.15) = 4x. Enter that number as the target in Google Ads tROAS or Meta's minimum ROAS bidding, not the break-even number.</p>
${table(['Gross margin', 'Break-even ROAS', 'Target for 10% profit', 'Target for 20% profit'], [['30%', '3.3x', '5.0x', '10.0x'], ['40%', '2.5x', '3.3x', '5.0x'], ['50%', '2.0x', '2.5x', '3.3x'], ['70%', '1.4x', '1.7x', '2.0x']])}
<h2>Common ROAS mistakes</h2>
<ul><li><b>Trusting platform-reported revenue.</b> Meta, Google and TikTok each use their own attribution windows and will all claim the same sale. Sum them and you can easily "see" more revenue than your store actually made. Check ROAS against your shop's real revenue (often called MER or blended ROAS: total revenue / total ad spend).</li><li><b>Ignoring returns.</b> If 20% of apparel orders come back, your real ROAS is 20% lower than reported.</li><li><b>Judging new-customer campaigns by first-order ROAS.</b> Prospecting campaigns usually show lower ROAS than retargeting, but retargeting mostly harvests people who would have bought anyway. If repeat purchases matter in your business, judge prospecting by customer value - see the <a href="/customer-ltv-calculator/">LTV calculator</a>.</li><li><b>Using revenue including tax and shipping.</b> Use net revenue (after discounts, before tax) consistently on both sides.</li></ul>
<p>Want the full explanation of what "good" means by industry? Read <a href="/guides/what-is-a-good-roas/">What is a good ROAS?</a> and the <a href="/guides/break-even-roas-formula/">break-even ROAS formula guide</a>.</p>`,
    faq: [
      ['What is the difference between ROAS and MER?', 'ROAS is usually measured per campaign or platform using attributed revenue. MER (marketing efficiency ratio) divides total store revenue by total ad spend across all channels. MER is harder to fool because it does not depend on attribution.'],
      ['Can ROAS be below 1 and still be worth it?', 'Only if the customers you acquire buy again later, so their lifetime gross profit exceeds what you paid. That needs reliable repeat-purchase data and enough cash to wait for the payback.'],
    ],
  },

  'cpm-cpc-cpa-calculator': {
    html: `
<h2>Worked example: finding the weak link</h2>
<p>Two campaigns each spend $1,000 and produce 40 sales, so both have a $25 CPA. The chain shows they have completely different problems:</p>
${table(['Metric', 'Campaign A', 'Campaign B'], [['CPM', '$20.00', '$5.00'], ['CTR', '2.0%', '0.5%'], ['CPC', '$1.00', '$1.00'], ['Conversion rate', '4.0%', '4.0%'], ['CPA', '$25.00', '$25.00']])}
<p>Campaign A pays a lot for attention but earns clicks well - it needs a broader or cheaper audience. Campaign B reaches people cheaply but its ad is ignored - it needs a new hook or creative. Same CPA, opposite fixes. Without the full chain you would treat them the same.</p>
<h2>How each lever moves CPA</h2>
<div class="formula">CPA = CPM / (1,000 x CTR x Conversion rate)</div>
<p>Because the formula multiplies, improvements compound. Raising CTR from 1% to 1.5% and conversion rate from 2% to 3% together cuts CPA by more than half (1 / (1.5 x 1.5) = 44% of the original). That is usually far easier than finding a 56% cheaper audience.</p>
<ul><li><b>CPM</b> is mostly set by the auction: audience size, competition and season. You influence it with broader targeting and better ad quality scores, but only so much.</li><li><b>CTR</b> is the creative's job. Test hooks, thumbnails and offers before anything else.</li><li><b>Conversion rate</b> is the landing page and offer. Page speed, price, reviews and a clear next step move it.</li></ul>
<h2>Reading the numbers by funnel stage</h2>
<p>Do not compare metrics across objectives. A brand-awareness campaign optimised for reach will show a low CPM and a weak CTR by design, while a retargeting campaign shows a high CPM but strong conversion rate. Compare like with like: prospecting to prospecting, retargeting to retargeting, and the same objective on the same platform.</p>
<h2>Sample size before you judge</h2>
<p>CPA from five conversions is noise. As a rough rule, wait for at least 50 conversions (or several thousand clicks for CTR) before declaring one campaign better than another. For formal tests, use the <a href="/ab-test-significance-calculator/">A/B test significance calculator</a>.</p>`,
    faq: [
      ['How do I calculate CPM from CPC and CTR?', 'CPM = CPC x CTR x 1,000, with CTR as a decimal. A $0.80 CPC at a 1.5% CTR equals a $12 CPM.'],
      ['Why did my CPM jump in November and December?', 'Q4 brings more advertisers into the same auctions for Black Friday and the holidays, so the price of reaching people rises. Expect higher CPMs from October and plan budgets and target CPAs around it.'],
      ['Should I optimise for CPC or CPA?', 'For sales and leads, optimise for CPA. Cheap clicks are worthless if they do not convert, and some of the lowest-CPC placements bring the weakest traffic.'],
    ],
  },

  'break-even-cpa-calculator': {
    html: `
<h2>Worked example: setting bids for a skincare brand</h2>
<p>A serum sells for $60. Product, packaging, shipping and payment fees cost $21 per order, and customers buy 1.5 times on average within a year. The brand wants to keep 15% of revenue as profit and its site converts at 2%.</p>
<ul><li>Gross profit per order: $60 - $21 = $39</li><li>Break-even CPA (1.5 orders): $39 x 1.5 = <b>$58.50</b></li><li>Profit target: 15% of $90 revenue (1.5 x $60) = $13.50, so target CPA = $58.50 - $13.50 = <b>$45.00</b></li><li>Max CPC at 2% conversion: $45 x 0.02 = <b>$0.90</b></li></ul>
<p>If the brand only counted the first order, break-even CPA would be $39 and target CPA $30 - a 33% lower ceiling. Which number to use depends on how confident you are in repeat purchases and how long you can wait for them.</p>
<h2>What to include in cost per order</h2>
${table(['Include', 'Usually leave out'], [['Product or COGS', 'Rent, salaries, software (fixed overheads)'], ['Packaging and fulfilment', 'Ad spend (that is what you are solving for)'], ['Shipping you pay for', ''], ['Payment processing fees (around 3%)', ''], ['Average refunds and returns cost', ''], ['Marketplace or affiliate commissions', '']])}
<p>Fixed costs belong in the profit target, not in cost per order - they do not grow with each extra sale.</p>
<h2>Using the result in ad platforms</h2>
<ul><li><b>Google Ads target CPA:</b> start the bid strategy at or slightly above your current actual CPA, then move toward the target CPA over a few weeks. Jumping straight to a much lower target usually throttles delivery.</li><li><b>Meta cost cap:</b> set the cap near your target CPA. If spend stalls, the cap is below what the auction will accept for your current creative.</li><li><b>Manual CPC:</b> use the max CPC as a ceiling, and bid lower on keywords with weaker conversion rates.</li></ul>
<p>Related: <a href="/roas-calculator/">ROAS calculator</a> if you think in revenue terms, and <a href="/guides/what-is-a-good-roas/">what is a good ROAS</a>.</p>`,
    faq: [
      ['What happens if my actual CPA is above break-even?', 'Every new customer loses money on the orders you counted. Either improve conversion rate, raise average order value with bundles or upsells, lower cost per order, or reduce bids until CPA falls below the line.'],
      ['How is break-even CPA related to break-even ROAS?', 'They are the same line seen two ways. Break-even ROAS = revenue per customer / break-even CPA. In the example above, $90 / $58.50 = 1.54x.'],
    ],
  },

  'affiliate-commission-calculator': {
    html: `
<h2>Worked example: comparing three offers for the same audience</h2>
<p>A blog about home coffee gets 3,000 clicks a month to affiliate links. Three programs are on the table:</p>
${table(['Offer', 'Payout', 'Est. conversion', 'EPC', 'Monthly (3,000 clicks)'], [['Coffee subscription', '$15 flat per signup', '4%', '$0.60', '$1,800'], ['Espresso machine (Amazon, ~3%)', '$18 on a $600 sale', '1.5%', '$0.27', '$810'], ['Grinder brand direct (12%)', '$24 on a $200 sale', '2.5%', '$0.60', '$1,800']])}
<p>The machine has the highest ticket, but the low commission rate and lower conversion rate make it the weakest offer per click. The subscription and the grinder tie on EPC - so the tie-breakers become cookie length, recurring payouts and how reliably each program pays.</p>
<h2>Things EPC does not show</h2>
<ul><li><b>Recurring commissions.</b> A subscription program that pays every month the customer stays is worth far more than its first-month EPC. Multiply by the average customer lifetime.</li><li><b>Cookie window.</b> A 1-day cookie (Amazon) loses sales from people who come back later. A 30 to 90-day cookie captures them.</li><li><b>Reversals.</b> Some programs reverse 10 to 30% of commissions for returns or cancelled trials. Use approved commissions, not pending ones.</li><li><b>Payout reliability.</b> A high EPC from a program that pays late or changes terms is worth less than it looks.</li></ul>
<h2>How to raise your EPC</h2>
<ul><li>Send clicks from high-intent pages: comparisons, "best X for Y" and reviews convert far better than general articles.</li><li>Link to the specific product, not the homepage.</li><li>Negotiate: once you send consistent volume, ask the affiliate manager for a higher tier, a bonus or an exclusive discount code.</li><li>Test placement: a comparison table near the top of the page usually beats links at the bottom.</li></ul>
<p>More in our guide on <a href="/guides/how-to-calculate-epc/">how to calculate EPC</a>.</p>`,
    faq: [
      ['How do I calculate EPC from my network report?', 'Divide total commissions by total clicks for the same period. $540 in commissions from 1,200 clicks is an EPC of $0.45.'],
      ['Why is my EPC lower than the network says?', 'Network EPC is an average across all affiliates, including coupon and loyalty sites that convert very well. Content and social traffic usually converts lower. Trust your own numbers after a few hundred clicks.'],
    ],
  },

  'affiliate-revenue-leak-calculator': {
    html: `
<h2>Worked example: a mid-size SaaS program</h2>
<p>A SaaS company has 600 approved affiliates. 48 of them made a sale in the last 90 days, and active affiliates average $1,200 in monthly revenue. If a reactivation push wakes up just 5% of the dormant group:</p>
<ul><li>Dormant affiliates: 600 - 48 = 552</li><li>Reactivated at 5%: about 28 partners</li><li>Recovered revenue: 28 x $1,200 = <b>$33,600 a month</b></li></ul>
<p>Even if reactivated partners only perform at a quarter of the average, that is still over $8,000 a month from people who are already approved and already know the product.</p>
<h2>Activation rate benchmarks</h2>
${table(['Share of approved affiliates with a sale in 90 days', 'What it usually means'], [['Under 10%', 'Approval is too loose, or onboarding ends at the welcome email'], ['10% - 20%', 'Typical for programs with no structured activation work'], ['20% - 35%', 'Healthy: active recruiting of fitting partners plus follow-up'], ['Over 35%', 'Small, curated programs with personal management']])}
<p>These are rough ranges based on common industry reporting rather than a formal study - use them to decide whether to look closer, not as a precise target.</p>
<h2>Why reactivation beats recruitment</h2>
<ul><li><b>Lower cost.</b> Dormant affiliates already passed approval and have a tracking link. A sequence of emails costs almost nothing.</li><li><b>Faster.</b> Recruiting new partners takes weeks of outreach. A reactivation campaign can run in days.</li><li><b>Better data.</b> Asking dormant partners why they stopped tells you what is broken in your program - commission, creative, cookie length or tracking trust.</li></ul>
<h2>A simple 30-day reactivation plan</h2>
<ol><li>Export your affiliate list and segment it with the <a href="/dormant-affiliate-finder/">Dormant Affiliate Finder</a>.</li><li>Week 1: email each tier with a stage-specific message and one concrete asset.</li><li>Week 2: offer a time-limited bonus for the first sale in the next 30 days.</li><li>Week 3: personally contact the 20 dormant partners with the biggest audiences.</li><li>Week 4: measure how many made a sale, then re-run this calculator with the real rate.</li></ol>`,
    faq: [
      ['What reactivation rate should I assume?', 'Be conservative: 3% to 10% of dormant affiliates making at least one sale after a focused campaign is a realistic planning range. Measure your own result and update the input.'],
      ['Should I remove dormant affiliates from my program?', 'Usually not right away. They cost nothing to keep. Remove partners that break your terms, and consider archiving those inactive for over a year after a final check-in.'],
    ],
  },

  'dormant-affiliate-finder': {
    html: `
<h2>Preparing your export</h2>
<p>Most affiliate platforms can export a partner list as CSV. The tool needs two columns; extra columns are ignored.</p>
${table(['Column', 'What to put in it', 'Where to find it'], [['name', 'Partner name or company', 'Partner or publisher name field'], ['last_active_date', 'Date of the last click or sale', 'Usually "last click date", "last conversion" or "last activity"'], ['email (optional)', 'Contact email', 'Partner contact field']])}
<p>If your platform only reports total clicks, export clicks for the last 90 days and treat zero-click partners as 60+ days dormant.</p>
<h2>Example: what the tiers look like</h2>
<p>A program with 400 partners might split like this: 60 active in the last 14 days, 70 in the 14+ tier, 90 in the 30+ tier and 180 in the 60+ tier. The 14+ group is the cheapest win - they started recently and stalled. The 60+ group is the largest but needs the most honest message.</p>
<h2>Writing reactivation emails that get replies</h2>
<ul><li><b>Keep it short.</b> Three to five sentences. Long newsletters get archived.</li><li><b>Give one thing they can use today:</b> a new landing page, a converting creative, a coupon code for their audience.</li><li><b>Ask one question.</b> "What would make promoting us easier?" gets far more replies than a list of announcements.</li><li><b>Send from a person,</b> not a no-reply address. Partners reply to people.</li><li><b>Follow up once.</b> A short second email five to seven days later often gets more replies than the first.</li></ul>
<h2>What to do with the replies</h2>
<p>Log every reason a partner gives for going quiet. After 20 to 30 replies, patterns appear - low commission, no creatives, tracking doubts, an offer that does not fit their audience. Those patterns are the real fix list for your program, and they are worth more than any single reactivated partner. If you want the numbers behind the opportunity first, run the <a href="/affiliate-revenue-leak-calculator/">affiliate revenue leak calculator</a>.</p>`,
    faq: [
      ['How often should I run this?', 'Monthly is a good rhythm. Partners move between tiers, and catching them at 14 days dormant is much easier than at 90.'],
      ['Can I edit the generated emails?', 'Yes - they are starting templates. Add your program name, a real asset link and your own sign-off before sending.'],
    ],
  },

  'customer-ltv-calculator': {
    html: `
<h2>Worked example: a coffee subscription</h2>
<p>A coffee subscription charges $30 a month, keeps 45% gross margin after beans, roasting and shipping, and loses 8% of subscribers each month. It pays $70 to acquire a customer.</p>
<ul><li>Average lifetime: 1 / 0.08 = 12.5 months (about 1.04 years)</li><li>Gross-profit LTV: $30 x 12 x 1.04 x 45% = <b>about $169</b></li><li>LTV:CAC: $169 / $70 = <b>2.4:1</b></li><li>CAC payback: $70 / ($30 x 45%) = <b>5.2 months</b></li></ul>
<p>Profitable, but in the fragile band. Cutting monthly churn from 8% to 6% raises lifetime to 16.7 months and LTV to about $225 - a 3.2:1 ratio without spending a dollar more on ads. In subscription businesses, retention is usually the biggest LTV lever.</p>
<h2>Which LTV levers move the number most</h2>
${table(['Lever', 'Typical tactic', 'Effect'], [['Average order value', 'Bundles, upsells, free-shipping thresholds', 'Linear: +10% AOV = +10% LTV'], ['Purchase frequency', 'Replenishment emails, subscriptions', 'Linear'], ['Lifespan / churn', 'Onboarding, quality, win-back', 'Often the largest gain'], ['Gross margin', 'Pricing, supplier and shipping costs', 'Linear, and also raises break-even CPA']])}
<h2>Common LTV mistakes</h2>
<ul><li><b>Using revenue instead of gross profit.</b> A $500 revenue LTV at 30% margin is really $150 of value. Paying $200 to acquire that customer loses money.</li><li><b>Averaging everyone together.</b> Customers from different channels often have very different LTVs. Calculate by acquisition channel if you can.</li><li><b>Assuming lifespan from too little history.</b> A one-year-old business cannot know a five-year lifespan. Use what you have observed and be conservative.</li><li><b>Forgetting the time value of cash.</b> Profit that arrives over three years funds today's ad spend only if you have the cash to wait.</li></ul>
<p>Next step: check what you are paying per customer with the <a href="/cac-calculator/">CAC calculator</a>, and read <a href="/guides/ltv-to-cac-ratio/">what LTV:CAC ratio to aim for</a>.</p>`,
    faq: [
      ['How do I calculate LTV with no history?', 'Use industry estimates for repeat rate and churn, then replace them with your own data after three to six months. Start conservative - an overestimated LTV leads to overspending on acquisition.'],
      ['Should LTV include referrals?', 'Not in the base number. Referral value is real but hard to measure. Keep it as upside rather than counting it in the budget for acquisition.'],
    ],
  },

  'profit-margin-calculator': {
    html: `
<h2>Worked example: pricing a new product</h2>
<p>A candle costs $8 to make, $1.50 to package and $0.90 in payment fees on average - $10.40 in total. The shop wants a 65% gross margin to leave room for ads and overheads.</p>
<ul><li>Price for 65% margin: $10.40 / (1 - 0.65) = <b>$29.71</b>, so price at $29.99 or $30</li><li>At $30: margin = ($30 - $10.40) / $30 = 65.3%; markup = 188%</li><li>If the owner had applied a "65% markup" by mistake: $10.40 x 1.65 = $17.16, a margin of only 39%</li></ul>
<h2>Typical gross margins by business type</h2>
${table(['Business type', 'Typical gross margin'], [['Grocery and convenience', '20% - 30%'], ['Consumer electronics retail', '20% - 35%'], ['General e-commerce', '35% - 50%'], ['Apparel (own brand)', '50% - 65%'], ['Cosmetics and supplements', '60% - 80%'], ['Software and digital products', '75% - 90%']])}
<p>These are broad ranges and vary by brand, channel and scale - use them to sanity-check your pricing, not as targets.</p>
<h2>Gross margin vs. net margin</h2>
<p>Gross margin only subtracts the direct cost of the product. Net margin subtracts everything: ads, salaries, rent, software, interest and tax. A product with a 60% gross margin can easily produce a 10% net margin once acquisition and overheads are paid. That is why your gross margin decides how much you can spend on ads - see the <a href="/roas-calculator/">ROAS calculator</a> for the break-even ROAS your margin implies.</p>
<h2>Discounts eat margin faster than you think</h2>
<p>A 20% discount on a product with a 50% margin does not cut profit by 20% - it cuts it by 40%. On a $100 product costing $50, profit falls from $50 to $30. To make the same total profit you need about 67% more sales. Run the numbers before running the sale.</p>`,
    faq: [
      ['How do I convert markup to margin?', 'Margin = Markup / (1 + Markup). A 100% markup is a 50% margin; a 50% markup is a 33.3% margin.'],
      ['Should I price with margin or markup?', 'Most retailers think in markup on cost because it is easy to apply, but plan and report in margin, because ad budgets, break-even ROAS and profit all depend on margin.'],
    ],
  },

  'utm-builder': {
    html: `
<h2>Example naming conventions</h2>
${table(['Channel', 'utm_source', 'utm_medium', 'utm_campaign'], [['Meta paid ads', 'facebook or instagram', 'paid_social', 'spring_sale_2026'], ['Google Ads (if not auto-tagged)', 'google', 'cpc', 'brand_search'], ['Newsletter', 'newsletter', 'email', 'weekly_2026_10_06'], ['Affiliate partner', 'partner_name', 'affiliate', 'q4_promo'], ['Organic social post', 'linkedin', 'social', 'launch_post'], ['QR code on packaging', 'packaging', 'qr', 'insert_card_v1']])}
<p>Whatever you choose, write it down in a shared sheet. The single most common analytics mess is three people tagging the same channel three different ways.</p>
<h2>Google Ads and auto-tagging</h2>
<p>If your Google Ads account is linked to GA4 with auto-tagging on, Google adds a gclid parameter and GA4 fills source, medium and campaign automatically. You usually do not need UTMs on Google Ads, and adding conflicting manual tags can cause confusion. Use UTMs for every other paid and unpaid channel.</p>
<h2>Where to find UTM data in GA4</h2>
<ul><li><b>Reports - Acquisition - Traffic acquisition:</b> sessions by session source / medium and session campaign.</li><li><b>Reports - Acquisition - User acquisition:</b> the first source that brought each new user.</li><li>Add a secondary dimension of "Session manual ad content" to see utm_content variants side by side.</li></ul>
<h2>Mistakes that break attribution</h2>
<ul><li>Spaces in values. Use underscores or hyphens - spaces become %20 and look different from the same name with underscores.</li><li>Tagging links inside your own site, which starts a new session and overwrites the real source.</li><li>Using utm_source for the campaign name. Keep source as the place, campaign as the promotion.</li><li>Shorteners that drop parameters. Test the final URL after shortening.</li></ul>`,
    faq: [
      ['Do UTM parameters work in emails?', 'Yes, and they should be on every link in marketing emails. Many email platforms can add them automatically - check that their naming matches your convention.'],
      ['Are UTM parameters case-sensitive?', 'Yes. GA4 treats "Email" and "email" as different values. Keep everything lowercase.'],
    ],
  },

  'serp-snippet-preview': {
    html: `
<h2>Before and after: rewriting a weak snippet</h2>
${table(['', 'Title', 'Description'], [['Before', 'Home | Acme Plumbing Services Company Inc.', 'Welcome to our website. We are a family business with many years of experience.'], ['After', 'Emergency Plumber in Austin - 24/7, 60-Min Response', 'Burst pipe or no hot water? Licensed Austin plumbers on call 24/7. Upfront pricing, no call-out fee before 8pm. Book online or call now.']])}
<p>The rewrite leads with what the searcher typed (emergency plumber, the city), adds a concrete promise, and uses the description to answer "why click this one?" - price clarity and speed.</p>
<h2>Title formulas that work</h2>
<ul><li><b>Keyword - benefit:</b> "ROAS Calculator - Find Your Break-Even ROAS"</li><li><b>Keyword (year): specifics:</b> "Solar Panel Cost (2026): Prices by State"</li><li><b>Number + keyword + outcome:</b> "7 Free Mailchimp Alternatives That Scale"</li><li><b>Question match:</b> "What Is a Good CTR? Benchmarks by Platform"</li></ul>
<p>Keep the brand name at the end, and drop it entirely if it pushes the useful words past the cut-off.</p>
<h2>Why Google rewrites titles</h2>
<p>Google rewrites titles it finds too long, stuffed with keywords, identical across many pages, or a poor match for the page's main heading. To keep yours, make the title describe the page accurately, match your H1 closely, keep it unique across the site and fit within the pixel limit this tool shows.</p>
<h2>Mobile vs. desktop</h2>
<p>Mobile results wrap titles onto more lines, so slightly longer titles can show in full on phones while being cut on desktop. Design for the desktop limit and you are covered on both.</p>`,
    faq: [
      ['How many characters should a title tag be?', 'Roughly 50 to 60 characters, but the real limit is pixel width (about 580 px on desktop). Titles with many wide letters get cut sooner.'],
      ['Should every page have a unique meta description?', 'Yes. Duplicate descriptions are more likely to be ignored and rewritten by Google, and a page-specific description earns more clicks.'],
    ],
  },

  'ab-test-significance-calculator': {
    html: `
<h2>Worked example: is this winner real?</h2>
<p>A store tests a new product page. Version A: 4,800 visitors, 144 orders (3.0%). Version B: 4,750 visitors, 171 orders (3.6%). That is a 20% relative lift.</p>
<p>Pooled conversion rate p = 315 / 9,550 = 3.3%. The standard error is the square root of 0.033 x 0.967 x (1/4,800 + 1/4,750), about 0.00366. The z-score is (0.036 - 0.030) / 0.00366, about 1.64, which is around 90% confidence (two-tailed). Promising, but below the usual 95% bar - keep the test running rather than shipping B today.</p>
<h2>How many visitors do you need?</h2>
<p>Sample size depends on your baseline conversion rate and the smallest lift you care about detecting. Roughly, at 95% confidence and 80% power:</p>
${table(['Baseline conversion', 'Detect 10% relative lift', 'Detect 20% relative lift', 'Detect 30% relative lift'], [['1%', '~163,000 per variant', '~42,700 per variant', '~19,800 per variant'], ['3%', '~53,200 per variant', '~13,900 per variant', '~6,400 per variant'], ['5%', '~31,200 per variant', '~8,200 per variant', '~3,800 per variant'], ['10%', '~14,800 per variant', '~3,800 per variant', '~1,800 per variant']])}
<p>The lesson for small sites: chasing 10% lifts on a 1% conversion rate needs more traffic than most sites have in a year. Test big changes that could plausibly move results by 20 to 30% or more. Our <a href="/guides/how-long-to-run-an-ab-test/">guide to A/B test duration</a> explains how to plan this.</p>
<h2>Statistical significance is not business significance</h2>
<p>With enough traffic, a 0.5% lift can be statistically significant and still not worth the engineering time to maintain. Before testing, write down the minimum lift that would change a decision. After testing, check the confidence interval, not just whether you crossed 95%.</p>`,
    faq: [
      ['What does 95% confidence actually mean?', 'If the two versions were truly identical, a difference at least this large would show up less than 5% of the time by random chance. It does not mean there is a 95% chance B is better.'],
      ['Can I test more than two variants?', 'Yes, but each extra variant needs its own full sample and raises the chance of a false winner. Compare each variant to the control and use a stricter threshold, such as 99%, when testing many at once.'],
    ],
  },
};
