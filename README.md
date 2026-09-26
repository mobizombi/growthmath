# GrowthMath - free marketing tools site (AdSense)

**Started:** 2026-09-26 - CEO call from Adam: "turn the tools into free tools on a site with AdSense".
**Status:** LIVE on temp URL https://mobizombi.github.io/growthmath/ (noindex, 2026-09-26). Repo: github.com/mobizombi/growthmath (main = source, gh-pages = build). Waiting on Adam's domain.

## The play
- A standalone free-tools site (not traffic-goat.com - ads on a $1,950 consulting site kill trust).
- Niche = marketing / ads / affiliate calculators. Advertisers in marketing/SaaS pay high CPC, so AdSense RPM is well above generic calculator sites.
- Double duty: affiliate-program tools carry a soft CTA to the Traffic Goat audit (UTM `utm_source=growthmath`).
- Everything client-side: no backend, no hosting cost, GitHub Pages.

## Tools (11)
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

Each page: tool + formula + benchmarks + FAQ (FAQPage/WebApplication/Breadcrumb schema) + related tools. Plus About / Contact / Privacy (AdSense-compliant cookie text) / Terms / 404, sitemap, robots, ads.txt.

## Build + run
```
node build.mjs                                  # -> dist/
SITE_URL=https://<domain> CONTACT_EMAIL=... AD_SLOT=<id> node build.mjs
```
Preview: launch.json `growthmath` (port 4630). Tools data lives in `src/tools.mjs`.

AdSense publisher: `ca-pub-5619164579775107` (same account as SolarCostLab). Auto ads only until `AD_SLOT` is set.

## To go live (Adam-gated)
1. **Buy the domain** (default in build: growthmath.io - check availability; alternatives: growthmath.com, marketermath.com). ~$10-35/yr.
2. DONE: repo + Pages live on temp URL. On domain: `./deploy.sh https://<domain>`, set Pages custom domain, DNS = 4 GitHub A records (185.199.108-111.153) + `www` CNAME mobizombi.github.io.
3. **AdSense -> Sites -> Add site** with the domain, wait for approval (days-weeks).
4. **AdSense -> Privacy & messaging -> enable the GDPR consent message** (required for EEA/UK traffic; privacy page already promises it).
5. Add to GSC, submit sitemap.
6. Set up a mailbox or forward for the contact email.

## Growth after launch
- Tool pages rank on long-tail ("break even roas calculator", "affiliate epc calculator").
- Next tools to add by search demand: CAC calculator, email list growth, churn/MRR, YouTube/TikTok money calculator, Amazon FBA fee calc, Shopify profit calc.
- Distribution: submit to marketing tool directories, answer Reddit/IH threads with the relevant calculator.
