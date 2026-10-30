# ideaswood.eu SEO implementation – 2026-10-16

Source: Drive file ASTRA-STATUS-ideaswood-SEO.md (written by Astra's Mac SEO executor session). Mirrored here by the cloud SEO session on 2026-10-17 because `gh` was not logged in on the Mac, so the executor could not push. Local commit on the Mac: 736e34b.

Executed from the Mac against the live site, logged in to WordPress. Every finding from the cloud audit was re-checked on the live site first. Several had changed: the 2026-09-09 category restructure deleted the whole `log-cabins` tree, and a Dispatch run on 2026-09-26/29 had already done part of Phase 1.

Backups before any change: UpdraftPlus DB backup 2026-10-16 10:01 (server time) plus the full backup from 2026-10-15 (DB, plugins, themes, others, uploads). Settings snapshots are in `~/Desktop/ideaswood-seo/backup/` on the Mac. Screenshots before/after: `~/Desktop/ideaswood-seo/screenshots/`.

## PageSpeed (mobile)

The PSI API daily quota for the shared key was exhausted, so the same engine (Lighthouse 12, mobile, simulated slow 4G) ran locally. There are no CrUX field data for the site, so INP is not available. TBT is the lab proxy.

| Page | Run | Score | LCP | CLS | TBT | FCP | Speed Index |
|---|---|---|---|---|---|---|---|
| Home / | before | 37 | 17.5 s | 0.102 | 1,200 ms | 3.2 s | 6.4 s |
| Home / | after, run 1 | 39 | 23.3 s | 0 | 670 ms | 7.0 s | 10.0 s |
| Home / | after, run 2 | 57 | 13.9 s | 0.027 | 470 ms | 2.0 s | 5.7 s |
| /product/alma-7x8-m/ | before | 8 | 25.7 s | 1.743 | 1,850 ms | 2.9 s | 21.4 s |
| /product/alma-7x8-m/ | after (final, run 7) | 23 | 11.9 s | 1.13 | 520 ms | 2.7 s | 37.7 s |
| /product/alma-7x8-m/ | after (final, run 8) | 27 | 12.2 s | 1.13 | 390 ms | 2.6 s | 40.6 s |

Lab LCP and FCP swing a lot between runs on this server. Stable gains: home CLS 0.10 to about 0, TBT roughly halved on both pages, product LCP 25.7 s to about 12 s. The remaining product CLS (0.93–1.13) comes entirely from the Lepton Bridge gallery, which hides the WooCommerce gallery and injects its own by JS. A CSS-only space reservation was tried twice and did not change the measured shift, so it was removed. The proper fix is in the plugin: render the gallery server-side, or give the injected images width/height. Product Speed Index rises because of the ~104 MB of add-on images (point 4).

Root causes found (verified live):

1. CSP is not the cause. The site sends no Content-Security-Policy header (only HSTS, nosniff, X-Frame-Options, Referrer-Policy).
2. The "blocks before images" are LiteSpeed lazy-load placeholders: a 1x1 grey GIF (#c3c3c3) with no aspect ratio. Even the header logo was lazy-loaded, because its exclusion had been typed into the page-URI exclude field instead of the image exclude field.
3. Product CLS 1.74: the "Lepton Bridge" plugin hides the WooCommerce gallery and injects its own gallery by JS after load, so everything below jumps down. A second jump came from a lazy image below it with no reserved space.
4. Product pages download ~104 MB. The WCPA add-on form loads roofing/gutter option images at original size (bitumen-shingles-*.jpg 4.7–8.2 MB each, roof-seam-panel/raingutters ~2.2 MB). This is the main cause of slow product pages. A replacement plugin "IdeasWood Product Options" is built but NOT live yet (waits for Saqib's staging and Justinas's permission).

## Change log (all 2026-10-16)

| URL / setting | Before | After |
|---|---|---|
| LiteSpeed > Media > Add Missing Sizes | off | on |
| LiteSpeed > Media > Responsive Placeholder | off (grey GIF) | on (correctly sized, near-transparent SVG) |
| LiteSpeed > Media > Viewport Images + cron | off | on |
| LiteSpeed > Lazy Load Image Excludes | empty | `ideas-wood-logo`, `eco-vs-pre` |
| Customizer CSS, Divi > Integration > head | – | gallery space reservation added, no effect, removed again |
| /eu-project/ (post 11764) | index | noindex, follow (kept live) |
| Rank Math > Redirections (CSV import) | 0 redirects; old category URLs 404 | 34 sources to 19 redirects, all 301 single hop |
| /x/ (post 13186, duplicate titled "x") | 200 | 301 to the Koralan article (post kept) |
| Rank Math title separator | `-` | `\|` |
| Rank Math templates (pages, posts, products, product categories, categories) | "... - ideaswood.eu" | "... \| IdeasWood" |
| SEO title + meta: 12 pages/posts, 12 live categories | e.g. "Buy Welness Sauna in UK - ideaswood.eu" | from fixes/04, mapped to live slugs, unverifiable claims removed |
| SEO title + meta: 24 products (16 from 04b + 8 with old "Buy ... in UK") + 3 reset to template | see product-titles log | facts from live product attributes; prices removed from meta |
| /how-much-does-a-garden-cabin-cost/ | 440 words | + "Price by wall thickness" table (170 models, 28/44/58/68 mm, Oct 2026 catalogue prices) |
| WP draft 18344 (not published) | – | rewrite of /wellness-saunas/; trade facts left as [CONFIRM] |
| LiteSpeed cache | – | Purge All after each batch |

Redirects verified live: /product-category/log-cabins/ to /garden-cabins/, wooden-houses/garden-house to /garden-cabins/, summer-house to /summer-houses-chalets/, storage-sheds to /sheds-storage-cabins/, /frame-houses/a-frames/ to /a-frames/, /grill-cabins/ to /bbq-grill-cabin/, camping-houses to /camping-pods/, /x/, /home/, /kontaktai to /contact-us/, /lt/* to /, /category/blog/ to /blog/. Every GSC page with impressions in the last 3 months now ends on a 200 page.

## Already done before this run (not repeated)

Rank Math Organization/Local SEO schema, noindex on /product-category/featured/, tag and author archives; date archives and attachment pages redirect; `sitemap_index.xml` submitted in GSC and read without errors (538 URLs). Rank Math (free + PRO) is the only SEO plugin; LiteSpeed Cache, Modern Image Formats (WebP) and Performance Lab are the only optimisers. The 09-29 Dispatch run had switched on CSS/JS/HTML minify, emoji removal, iframe lazy-load; they were found off again on 10-16 and were not re-enabled (the 09-29 measurement showed no gain).

## Search Console (2026-07-16 to 2026-10-15)

22 clicks, 5,784 impressions, CTR 0.38 %, average position 68.3. Indexing report (09-26 export, latest): 62 indexed, 325 not indexed. Exports in `~/Desktop/ideaswood-seo/gsc-*.csv`.

## GA4 (property 399524440)

- One GA4 tag (Site Kit and GTM share the same gtag). No duplicate.
- Last 30 days: page_view 1,177, form_start 4, form_submit 2, add_to_cart 9, purchase 1. **phone_click, email_click and generate_lead: 0.** GTM link-click triggers fire but no GA4 hit follows. The GTM tags need checking (needs Tag Manager access).
- add_to_cart is deliberately not a key event.
- GA4 to Search Console link: check in GA4 > Admin > Product links.
- Social UTM scheme (Nova): `utm_source={platform}&utm_medium=social&utm_campaign=organic-{topic}`; GA4 separates it already.

## "Could not be found" categories: cause

All product-category pages use one Divi Theme Builder body template with a Blog module ("Explore More Inspiration"). On a product category it finds no posts and prints "No Results Found – The page you requested could not be found". Google shows that as the snippet. Fix in Divi: set the Blog module to a fixed blog category (turn off "posts for current page") or remove it. Not changed (theme template).

## Skipped, with reason

| Item | Why |
|---|---|
| robots.txt (fixes/03) | A physical `public_html/robots.txt` exists; cPanel writes are blocked for the agent. Ready-to-paste: Desktop/ideaswood-seo/robots-txt-TO-APPLY-2026-10-16.txt |
| http://www to https in one hop | Takes 2 hops today; needs `.htaccess`. Snippet: Desktop/ideaswood-seo/htaccess-www-https-TO-APPLY-2026-10-16.txt |
| Merge log-cabin trees | /product-category/log-cabins/ no longer exists (deleted 2026-09-09). Old trees 301 to /garden-cabins/. |
| Product renames Dinning to Dining, Talinn to Tallinn (name + slug) | Product content, out of scope. SEO titles already show correct spelling. |
| Organization schema extras (foundingDate, areaServed, knowsAbout) | No fields in Rank Math Local SEO; founding year unverified. |
| Phone number in schema | Schema and tel: links say +370 610 05085; header text and business records say +370 678 22055. Not changed until confirmed. |
| Old wp-sitemap.xml / product-sitemap.xml in GSC | Needs webmasters write scope. Harmless. |
| Rank Math PRO redirect screen | Still broken (PRO 3.0.91 vs free 1.0.280). CSV import works. |
| Content drafts 01–04, 07, glamping (06) | Need facts only Justinas can give. Not published. |
| hreflang (fixes/07) | Waits for the .com side. |

## Questions for Justinas (facts needed for content)

1. Which phone is right for the site and schema: +370 610 05085 or +370 678 22055?
2. Saunas for trade: minimum order, private label (from how many units), heater brands (wood/electric for every model?), lead time, CE certification (documented?).
3. Cost guide: typical delivery price to UK/IE (or per truck); are insulation kits and roofing priced separately?
4. Glamping pods: wall thickness, insulated or not, size with en-suite, assembly days for 2 people, installed via partners or kit only?
5. Wholesale page (01): minimum order, truck mix rules, payment terms that may be published.

## Hand-offs

- Add-ons plugin session: product-page images (point 4).
- Divi template owner / Saqib: Blog module on category pages; Lepton gallery injecting late.
- .com session: fixes/07-cross-domain-hreflang.md.
- Nova: marketing/growth/SEO-URLS-2026-10-16.md (garden-cabins 53 products condition now met).

## 2026-10-18 addendum (Astra): robots.txt and canonical-host redirect applied

| Where | Before | After |
|---|---|---|
| public_html/robots.txt | 11 rules, no /cart/, /checkout/, /my-account/, ?orderby, ?filter_, ?s= | as `fixes/03b-robots-TO-APPLY-2026-10-16.txt` |
| public_html/.htaccess | http://www.ideaswood.eu took 2 hops (https://www, then non-www) | new "IdeasWood canonical host" block after the security headers: one 301 to https://ideaswood.eu, scoped to the ideaswood.eu / www.ideaswood.eu hosts only, /.well-known/ excluded |

Server backups: `.htaccess.bak-20261018-seo`, `robots.txt.bak-20261018-seo`.
Verified with curl: http://www.ideaswood.eu/product/alma-7x8-m/ → one 301 → https://ideaswood.eu/product/alma-7x8-m/ (200). Home, product and sitemap_index.xml return 200, and the security headers are intact. The other domains on the same cPanel account (ideaswood.com, staging.ideaswood.com, logcabinsfactory.com, timberescapes.com.au, abitazionidilegno.it) behave as before.
