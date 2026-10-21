---
format: 1920x1080
duration: 28s
message: "Know if your marketing actually makes money - free calculators that explain the math"
arc: Demo Loop (question → product intro → demo → breadth → embed → CTA)
audience: marketers, media buyers, affiliates and store owners who look at ROAS/CPA dashboards
mode: autonomous
music: none (silent build; HeyGen offline) - the video must read fully with sound off
captions: skipped (wordless video - all copy is on-screen kinetic type, no voiceover)
---

## Video direction

- **Palette (from frame.md, by role):** canvas = bg #F7F6F2 (paper) on every frame; cards/surfaces = paper #FFFFFF with the 1.5px green-tint border and 12-14px radius, no shadows; ink = text #15171A for headlines; text-muted #5D636B for labels and secondary lines; primary green #0B6E4F is the single accent (results, logo underline, highlights, the progress bar); warn #B54708 is used ONCE in the whole video - the "Losing money" verdict in Frame 3. No other hues.
- **Type:** Inter for display/headings/body (h1/h2 ramp from frame.md, tight -0.02em tracking); JetBrains Mono for every number, result, formula and code snippet (tabular numerals). Sentence case. Regular hyphen "-", never an em-dash, in all on-screen copy.
- **Motion grammar:** long-tail power3-style settles, smooth over bouncy (one spring-pop allowed on the logo tile and on the final verdict). The "voiceover" field is the ON-SCREEN TEXT cue list: each piece reveals when its cue comes, spread across the shot - never everything at t=0. Numbers always count up live, never appear static. Holds are still (subtle jitter at most); no floating, no breathing.
- **Rhythm:** F1 fast punchy swaps → F2 calm brand beat → F3 the demo climax (busiest, longest) → F4 a cascade of breadth → F5 a second, quieter demo → F6 a still held end card. F2 and F6 are the deliberate held/breather frames.
- **Negative list:** no stock photos, no gradients/glow blobs/bokeh, no "AI" purple, no browser chrome or real OS cursor (a small custom cursor is OK in F5), no drop shadows, no slideshow front-loading, no screensaver drift. Keep all content in the top ~83% of the frame (bottom band clear).

## Frame 1 — Hook: is it really profitable?
- src: compositions/frames/01-hook.html

- scene: "Your ROAS is 3x." then the word swaps: "Profitable?" with a question mark pulse
- duration: 3.5s
- poster: 2.8s
- transition_in: cut
- type: hook
- blueprint: kinetic-type-beats (Reproduce)
- voiceover: "Your ROAS is 3x. / Profitable? / Are you sure?"
- asset_candidates: none (pure type on paper canvas)
- focal: the headline type
- roles: none
- status: animated

Scene 1 (0.0–1.3s): paper canvas; "Your ROAS is" (ink, h1 scale, Inter) slides up into the centre-left, then "3x." lands in green JetBrains Mono at a larger weight with a quick count 0.0x→3.0x - Centered, ~55% width, type is the hero.
Scene 2 (1.3–2.4s): hard in-place token swap - the whole line cuts to "Profitable?" (ink, same size), the "?" pulses once in green - Centered.
Scene 3 (2.4–3.5s): a smaller muted line "Are you sure?" rises in beneath and holds; everything still for the read.

## Frame 2 — Product intro: GrowthMath
- src: compositions/frames/02-intro.html

- scene: g/m logo tile pops, wordmark "GrowthMath" builds, sub-line "Free calculators that explain the math"
- duration: 3.5s
- poster: 2.8s
- transition_in: crossfade
- type: product_intro
- blueprint: logo-assemble-lockup (Adapt)
- voiceover: "GrowthMath. / Free calculators that explain the math."
- asset_candidates: logo-gm.png
- focal: logo-gm.png
- roles: logo-gm.png = cutout (the real logo tile, never redrawn)
- status: animated

Adapt: keep the "mark comes to exist then resolves into a centered lockup" signature; the mark is the real logo PNG tile, built by a spring-bloom from zero, and the wordmark is live Inter text beside it.
Scene 1 (0.0–1.1s): empty paper; the g/m logo tile spring-blooms from zero at centre, its green underline draws on left→right - Centered, tile ~16% of frame height.
Scene 2 (1.1–2.2s): tile glides left and "GrowthMath" (Inter 800, ink, h1) reveals letter-cascade to its right, forming a horizontal lockup centered as a group.
Scene 3 (2.2–3.5s): "Free calculators that explain the math" (h3, text-muted) slides up under the lockup; hold still.

## Frame 3 — Demo: the ROAS calculator answers
- src: compositions/frames/03-roas-demo.html

- scene: rebuilt ROAS calculator card; inputs fill (Ad spend $1,000 · Revenue $3,000 · Margin 30%), ROAS counts up to 3.0x, Break-even ROAS 3.33x appears, verdict flips to orange "Losing money: you need 3.33x at a 30% margin"
- duration: 6.5s
- poster: 5.5s
- transition_in: crossfade
- type: feature_showcase
- blueprint: panel-edit-live-sync (Adapt)
- voiceover: "Ad spend. Revenue. Margin. / ROAS: 3.0x. / Break-even: 3.33x. / Losing money."
- asset_candidates: screen-roas.jpg (reference for layout only - rebuild the calculator UI in HTML so numbers animate live)
- focal: the rebuilt calculator card (HTML), modelled on screen-roas.jpg
- roles: screen-roas.jpg = reference only (do not place the image; rebuild its layout)
- status: animated

Adapt: keep the bipartite "inputs panel bound to a live result surface that updates in the same beat" signature; there is no cursor - the values type in. Reconstruct growthmath.io's ROAS tool: one white card (14px radius, green-tint border) ~78% of frame width, title "ROAS Calculator" top-left in Inter; LEFT column = three labelled inputs (Ad spend "$", Revenue from ads "$", Gross margin "%"), RIGHT column = pale green (#e3f1ec-like accent-light) result panel with label "YOUR ROAS", a big mono result, and two stat tiles "Break-even ROAS" and "Profit after ads", then a verdict strip.
Scene 1 (0.0–1.0s): the card rises in (Asymmetric 50/50 split inside the card, 3 layers: canvas, card, result panel); inputs empty, result shows "-".
Scene 2 (1.0–2.6s): values type into the inputs one after another - "1,000" then "3,000" then "30" (mono, caret visible while typing); each completed field gives a subtle green border flash.
Scene 3 (2.6–3.6s): live sync - the big ROAS result counts up 0.0x→3.0x in green mono as the last input completes.
Scene 4 (3.6–4.6s): "Break-even ROAS" tile counts up to 3.33x; "Profit after ads" counts to -$100 (computed: 3,000 × 30% - 1,000 = -100).
Scene 5 (4.6–6.5s): the big "3.0x" turns warn-orange and the verdict strip springs in, orange-tinted: "Losing money: you need 3.33x ROAS at a 30% margin." Hold still for the read.

## Frame 4 — Breadth: 21 calculators
- src: compositions/frames/04-tool-grid.html

- scene: tool cards cascade into a grid - ROAS, CPA, Break-even CPA, Affiliate EPC, LTV, CAC, Churn, A/B significance, Sample size, UTM builder, Shopify profit, YouTube earnings... counter lands on "21 free calculators"
- duration: 5s
- poster: 4.2s
- transition_in: crossfade
- type: benefit_highlight
- blueprint: grid-card-assemble (Adapt)
- voiceover: "Ads. Affiliates. E-commerce. Creators. / 21 free calculators."
- asset_candidates: home-tools-grid.png, screen-home.jpg
- focal: rebuilt tool-card grid (HTML)
- roles: home-tools-grid.png = reference for the card look only; screen-home.jpg = unused reference
- status: animated

Adapt: keep the staggered self-assembling grid signature; cards are rebuilt in HTML in the site's card style (white, small green category tag on top, bold tool name, one muted line).
Scene 1 (0.0–2.6s): a 4×3 grid of 12 cards assembles in four staggered waves, one per category cue: "Paid ads" (ROAS Calculator, CPM/CPC/CPA, Break-even CPA), "Affiliate" (Affiliate EPC, Revenue leak, Dormant affiliates), "E-commerce" (Customer LTV, CAC, Churn rate, Shopify profit), "Creators & testing" (YouTube earnings, A/B significance). Grid fills the top ~70%, full-width, 3 depth layers.
Scene 2 (2.6–3.8s): the grid dims slightly and a centered pill counter rises over it: mono number counting 12 → 21 with the label "free calculators".
Scene 3 (3.8–5.0s): beneath the pill, muted line "ROAS · CPA · EPC · LTV · CAC · churn · A/B tests · UTM" reveals; hold.

## Frame 5 — Embed it on your site
- src: compositions/frames/05-embed.html

- scene: a blog-post mock (headline "How to calculate break-even ROAS", grey text lines); an embed snippet types in a code chip, then the live ROAS widget drops into the post with the credit line "ROAS Calculator by GrowthMath"
- duration: 5.5s
- poster: 4.8s
- transition_in: crossfade
- type: feature_showcase
- blueprint: cursor-ui-demo (Adapt)
- voiceover: "Write about marketing? / Embed any calculator - free. / One line of HTML."
- asset_candidates: screen-roas.jpg (widget look reference)
- focal: the blog-post mock with the dropped-in widget (HTML)
- roles: screen-roas.jpg = reference only
- status: animated

Adapt: keep the reconstructed-UI-changes-state signature with a small custom cursor; the "app" is a generic blog editor page (no real brand names).
Scene 1 (0.0–1.4s): left-weighted 60/40 layout; a white page card on the left with a blog title "How to calculate break-even ROAS" (Inter, ink) and 4 grey placeholder text lines; on the right, the caption "Write about marketing?" (h2, ink) reveals.
Scene 2 (1.4–2.8s): right caption swaps to "Embed any calculator - free."; a dark code chip appears on the page card below the text lines and the snippet types in JetBrains Mono: <iframe src="growthmath.io/embed/roas-calculator/"> (green attribute values).
Scene 3 (2.8–4.2s): the custom cursor clicks the code chip; it collapses and a compact ROAS widget (mini version of Frame 3's card: three inputs + green "3.5x" result) expands in its place inside the post, with the small credit line "ROAS Calculator by GrowthMath" under it.
Scene 4 (4.2–5.5s): right caption line "One line of HTML." rises under the first; hold.

## Frame 6 — CTA
- src: compositions/frames/06-cta.html

- scene: "No signup. Runs in your browser." chips, then g/m logo + "growthmath.io" lockup holds
- duration: 4s
- poster: 3.4s
- transition_in: crossfade
- type: cta
- blueprint: titlecard-reveal (Adapt)
- voiceover: "Free. No signup. Runs in your browser. / growthmath.io"
- asset_candidates: logo-gm.png
- focal: logo-gm.png + URL
- roles: logo-gm.png = cutout
- status: animated

Adapt: keep the single restrained reveal + still hold; a short chip row precedes the lockup.
Scene 1 (0.0–1.4s): three pill chips reveal left→right in a centered row: "Free", "No signup", "Runs in your browser" (green-tint pills, Inter 600).
Scene 2 (1.4–2.4s): chips slide up and shrink; the g/m logo tile + "growthmath.io" (JetBrains Mono, ink, h1-ish) slide-up crossfade into a centered lockup; the green underline under the URL draws on.
Scene 3 (2.4–4.0s): hold still - final end card (real exit: soft fade to paper in the last 0.3s).
