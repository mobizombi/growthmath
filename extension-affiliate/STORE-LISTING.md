# Affiliate Link Checker - Chrome Web Store submission kit

**This is the flagship extension. Publish it first.** The older `extension/` (UTM + SEO + ads math) competes with dozens of mature UTM/SEO extensions. This one fills a real gap: existing extensions only highlight nofollow/sponsored attributes. None of them names the affiliate network, shows tracking IDs, checks the disclosure or exports a list.

Upload file: `brand/extension/affiliate-link-checker-<version>.zip`.
Rebuild it after any change: bump `version` in manifest.json, then run `cd extension-affiliate && zip -qr ../brand/extension/affiliate-link-checker-<ver>.zip . -x '.*' -x 'STORE-LISTING.md'`. Then redeploy the site; the download page reads the version from the manifest.
Test page: `test/affiliate-fixture.html` has 13 affiliate links and 3 decoys. Expect 13 links, 13 networks, 10 missing rel and "disclosure after first link".

## Adam's steps (one-time, ~15 min)
1. Open https://chrome.google.com/webstore/devconsole and sign in. The one-time fee is $5. Publisher name: "GrowthMath".
2. Verify growthmath.io as the publisher website. Search Console already owns it.
3. New item: upload the zip, paste the fields below, then upload the screenshot and the 440x280 tile, then submit.
4. When it's approved, send me the store URL. I'll swap the download button on /affiliate-link-checker-extension/ to "Add to Chrome".

## Listing fields
**Name:** Affiliate Link Checker by GrowthMath
**Category:** Tools
**Short description (132 max):** See every affiliate link on a page: which network, the tracking ID, rel=sponsored status and whether there's a disclosure. Export to CSV.

**Detailed description:**
Click once on any web page to audit its affiliate links.

WHAT IT FINDS
- Every affiliate link, grouped by network: Amazon Associates, Impact, CJ, Awin, Rakuten, ShareASale, ClickBank, eBay Partner Network, Partnerize, Skimlinks, Sovrn, AvantLink, FlexOffers, Digistore24, Booking.com, SaaS referral programs (Rewardful, FirstPromoter, PartnerStack) and more
- Cloaked links such as /go/ and /recommends/
- The tracking ID on each link (Amazon tag, Impact/CJ publisher ID, Awin ID...)

WHAT IT CHECKS
- rel="sponsored" / nofollow on every affiliate link, as Google asks for paid links
- Whether the page has an affiliate disclosure, and whether it appears BEFORE the first affiliate link
- Hidden affiliate links

TOOLS
- Highlight affiliate links on the page: green = marked correctly, red = missing rel
- Click any result to jump to the link
- Export everything to CSV

BUILT FOR
Affiliate bloggers checking their own pages, affiliate managers researching publishers and partners, and SEO agencies running compliance checks.

PRIVATE
Runs only when you click it. No network requests, no storage, no analytics, no account.

More free affiliate and marketing calculators: growthmath.io

## Privacy tab
- **Single purpose:** Show and audit the affiliate links on the page the user is viewing.
- **activeTab:** Read the current page only when the user clicks the extension icon.
- **scripting:** Inject the read-only scan that lists affiliate links, and optionally highlight them on the page.
- **Remote code:** No. **Data collected:** None. Certify all three disclosures.
- **Privacy policy:** https://growthmath.io/privacy/

## Images
- Screenshot (1280x800): `brand/extension/affiliate-checker-screenshot-1280x800.png`
- Small promo tile (440x280): `brand/extension/affiliate-checker-tile-440x280.png`
