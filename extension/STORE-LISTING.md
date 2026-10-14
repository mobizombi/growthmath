# GrowthMath Chrome extension - Web Store submission kit

Upload file: `brand/extension/growthmath-extension-1.0.0.zip` (rebuild: `cd extension && zip -qr ../brand/extension/growthmath-extension-<ver>.zip . -x '.*' -x 'STORE-LISTING.md'`).

## What Adam has to do (one-time)
1. Chrome Web Store developer account at https://chrome.google.com/webstore/devconsole - one-time $5 fee, sign in with the GrowthMath Google account (adamscheuer@gmail.com, same as GSC). Publisher display name: "GrowthMath" (not the personal name).
2. Verify growthmath.io as the publisher site (Search Console already owns it, so this is one click).
3. New item -> upload the zip -> paste the fields below -> add 1-5 screenshots (1280x800) -> submit. Review usually takes a few days.

## Listing fields
**Name:** GrowthMath - UTM Builder, SEO Check & Marketing Calculators
**Category:** Tools (or Productivity > Tools)
**Language:** English

**Short description (132 max):**
Tag the current page with UTMs in one click, check its SEO title and description, and run ROAS, CPA and margin maths.

**Detailed description:**
GrowthMath puts the three things marketers do all day into your toolbar.

UTM BUILDER FOR THE PAGE YOU ARE ON
- Opens with the current tab's URL already filled in
- One-click presets for Facebook, Google Ads, TikTok, LinkedIn, newsletter, affiliate and more
- Lowercases and cleans values so GA4 reports stay tidy
- Strips old utm_ tags before adding new ones
- Remembers your last campaign and your 8 most recent links

ON-PAGE SEO CHECK
- Google-style snippet preview of the page's title and meta description
- Title and description length, H1 count, canonical, robots noindex, og:image and language - each marked OK or Check

ADS MATH
- ROAS, break-even ROAS and profit after ads from your margin
- CPM, CPC, CTR, conversion rate and CPA from four dashboard numbers

PRIVATE BY DESIGN
No account, no tracking, no analytics, no network requests. The extension only reads a page when you click its icon, and everything you type stays on your device.

Need more? growthmath.io has 21 free calculators - LTV, CAC, churn, A/B test sample size and significance, break-even point, Shopify profit and more.

## Privacy tab answers
- **Single purpose:** Helps marketers tag the current page's URL with UTM parameters, check its SEO meta tags, and calculate ad metrics.
- **activeTab:** Read the URL of the current tab when the user opens the popup, to pre-fill the UTM builder.
- **scripting:** When the user opens the SEO tab, read the current page's title, meta description, canonical, robots, H1 and og:image tags to display them. Runs only on user action, on the active tab.
- **storage:** Save the user's last UTM values, recent links and calculator inputs locally on their device.
- **Remote code:** No.
- **Data usage:** Collects no user data. (Tick nothing; certify the three disclosures.)
- **Privacy policy URL:** https://growthmath.io/privacy/

## Screenshots to take (1280x800)
1. UTM tab on a real product page with the Facebook preset filled
2. SEO tab on a page with a mix of OK / Check
3. Ads math tab
Load unpacked from `extension/` at chrome://extensions (Developer mode) to take them.
