# ASTRA-HANDOFF: market sites IT / AU (2026-11-20)
Justinas: texts on abitazionidilegno.it and timberescapes.com.au / ideaswood.com.au are near-identical and contain logic errors (Italy page says "thousands of people in the UK and Australia trust our heritage"). Cloud session cannot open those domains.
1. Scan all pages on wiseideas.eu, logcabinsfactory.com, timberescapes.com.au (and ideaswood.com.au if separate), abitazionidilegno.it, ideaswood.com: list every sentence naming another country/market, and every paragraph shared with another domain (8-gram test). Save the list in Drive.
2. Replace per seo/content/14-market-home-pages-it-au.md (branch claude/ideaswood-seo-audit-8r34oj). Same rules for the other pages found in step 1: unique text per domain, own market only, no generic eco claims, "supplier and exporter", no CE for saunas.
3. Remove the logcabinsfactory.com Divi placeholder text. Check hreflang still correct after the edit, request indexing, log in COORDINATION.md.
Open handoffs still unanswered: gsc-measure, green(+update), trade-delivery, glamping.

## Added 2026-11-20 (Justinas): AU too, and plugins + speed on ALL sites
4. Australian site(s) (timberescapes.com.au, ideaswood.com.au): same text audit and rewrite as IT, equal priority.
5. On all 5 WP sites (wiseideas.eu, logcabinsfactory.com, timberescapes.com.au, abitazionidilegno.it, ideaswood.com) and ideaswood.eu:
   - Update WordPress core, theme (Divi) and every plugin to current versions (staging/backup first; check front page, shop, cart after).
   - Delete unused/inactive plugins and themes; install only what is missing and needed (caching: LiteSpeed Cache if the host is LiteSpeed; SEO: Rank Math or the existing mu-plugins iw-seo-basics/iw-hreflang; no duplicate SEO or cache plugins).
   - Speed target per site: mobile LCP <= 2.5 s, CLS <= 0.1, INP <= 200 ms. Measure before/after with PageSpeed/CrUX, save numbers in Drive. Lazy-load below-fold images, WebP, preload the hero, remove render-blocking and unused scripts/fonts (Divi: enable static CSS, critical CSS, disable unused modules), fix GTM tags.
   - Report per site: versions before/after, plugins removed/added, speed before/after.
Decisions 2026-11-20: IT site is Italian only (it-IT). 'Granny flat' is the AU name for a category named differently elsewhere: keep on AU, map to the matching category.
Update: IT site keeps Italian as main language (root, x-default) but needs a visible IT/EN language switcher; English under /en/ with hreflang, no auto-redirect, no extra heavy plugin.
