# GrowthMath - free marketing tools site (AdSense)

**Started:** 2026-09-26 - CEO call from Adam: "turn the tools into free tools on a site with AdSense".
**Status:** LIVE at https://growthmath.io (2 Oct 2026). Domain + DNS on Cloudflare (bought by Adam), hosting = GitHub Pages (repo mobizombi/growthmath: main = source, gh-pages = build), HTTPS enforced.
- GSC: Domain property `sc-domain:growthmath.io` (adamscheuer@gmail.com), verified by DNS TXT. Sitemap submitted 2 Oct, homepage indexing requested.
- GA4: property "growthmath.io" in the **traffic-goat** GA account, Measurement ID `G-NNNSG3D7ML`, stream "GrowthMath web". Consent Mode v2 default-denied for EEA/UK/CH. Custom event `tool_use` (param `tool`).
- IndexNow: key file live, `node indexnow.mjs` pings Bing/Yandex (202 on 2 Oct).
- Tests: `test/cases.js` - 21 hand-checked cases, all pass on live. Run it in the browser console on the site after any tool change.
- Launch/distribution: see LAUNCH.md.

## The play
- A standalone free-tools site (not traffic-goat.com - ads on a $1,950 consulting site kill trust).
- Niche = marketing / ads / affiliate calculators. Advertisers in marketing/SaaS pay high CPC, so AdSense RPM is well above generic calculator sites.
- Double duty: affiliate-program tools carry a soft CTA to the Traffic Goat audit (UTM `utm_source=growthmath`).
- Everything client-side: no backend, no hosting cost, GitHub Pages.

## Tools (15)
| Slug | Tool | Origin |
|---|---|---|
| roas-calculator | ROAS + break-even ROAS | new |
| cpm-cpc-cpa-calculator | CPM/CPC/CTR/CVR/CPA | new |
| break-even-cpa-calculator | Max CPA + max CPC | new |
| affiliate-commission-calculator | Earnings, EPC, clicks for goal | new |
| affiliate-revenue-leak-calculator | Cost of dormant affiliates | ported from traffic-goat.com |
| dormant-affiliate-finder | CSV -> tiers + reactivation emails | ported (Reactivation Engine), hardened CSV parser + XSS escape |
| customer-ltv-calculator | LTV, LTV:CAC, payback | new |
| profit-margin-calculator | Margin/markup/target price | new |
| utm-builder | GA4 UTM links | new |
| serp-snippet-preview | Title/meta pixel-width check | new |
| ab-test-significance-calculator | Two-proportion z-test | new |
| cac-calculator | Paid + fully loaded CAC, payback, LTV:CAC | 2026-10-06 |
| churn-rate-calculator | Customer + MRR churn, NRR, lifetime | 2026-10-06 |
| shopify-profit-calculator | Profit per order, net margin, break-even ROAS | 2026-10-06 |
| youtube-earnings-calculator | Ad revenue from views x RPM + sponsors | 2026-10-06 |

**2026-10-06 content pass (AdSense "low value content" risk):** every tool page got worked examples, mistakes and extra FAQs via `src/extra.mjs` (merged in build), and a `/guides/` section (`src/guides.mjs`, Article + FAQ schema) with 5 guides linked both ways with the tools. Tests: 28 cases.

Each page: tool + formula + benchmarks + FAQ (FAQPage/WebApplication/Breadcrumb schema) + related tools. Plus About / Contact / Privacy (AdSense-compliant cookie text) / Terms / 404, sitemap, robots, ads.txt.

## Build + run
```
node build.mjs                                  # -> dist/
SITE_URL=https://<domain> CONTACT_EMAIL=... AD_SLOT=<id> node build.mjs
```
Preview: launch.json `growthmath` (port 4630). Tools data lives in `src/tools.mjs`.

AdSense publisher: `ca-pub-5619164579775107` (same account as SolarCostLab). Auto ads only until `AD_SLOT` is set.

## To go live (Adam-gated)
1. DONE - growthmath.io bought on Cloudflare ($32 yr1 / $50 renew).
2. DONE - DNS (4 A records + www CNAME, DNS-only) + Pages custom domain + HTTPS.
3. DONE 2 Oct - AdSense site added, ownership verified, review requested (status: Getting ready). Approval takes days-weeks.
4. DONE 2 Oct - GDPR (European regulations) message for growthmath.io published.
5. DONE - GSC + sitemap + GA4.
6. Set up a mailbox or forward for the contact email.

## Growth after launch
- Tool pages rank on long-tail ("break even roas calculator", "affiliate epc calculator").
- Next tools to add by search demand: CAC calculator, email list growth, churn/MRR, YouTube/TikTok money calculator, Amazon FBA fee calc, Shopify profit calc.
- Distribution: submit to marketing tool directories, answer Reddit/IH threads with the relevant calculator.
