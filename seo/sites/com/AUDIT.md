# ideaswood.com SEO audit (live crawl 2026-11-21)

Scope: https://ideaswood.com/ (US store, English, USD). Method: curl with a browser user agent, every URL in the sitemap (340), concurrency 6 then 2 for retries, plus 40 probe URLs for soft 404 behavior, plus the public WooCommerce Store API and WP REST API for term IDs and stock. Raw crawl data is in the session scratchpad, not in the repo.

## 1. Summary
| Area | State | Severity |
|---|---|---|
| Soft 404 (GSC email 2026-11-16) | 16 empty product categories return 200 "No products were found"; the main menu links one of them (Grill Cabins) from every page. Search, out-of-range pagination and date archives also return 200 with empty or duplicate content. | High |
| Category pages | 27 categories: no H1, no meta description, no canonical, no text (only about 285 words of template). | High |
| SEO plugin | None. Titles are "Page name \| ideaswood.com"; meta comes from the custom "IdeasWood SEO basics" plugin. | High |
| Server | 42 of 340 URLs timed out (35) or returned 503 (7) at concurrency 6. All 42 loaded at concurrency 2. Response time p50 1.0 s, p90 17.8 s (uncached pages). | High |
| Wording | No "since 1993" left (home and about say 2007). But eco, sustainable, energy efficiency, manufacturer, factories, Nordic, UK and Australia wording remains on home, about, contact, windows, insulation and /smm/. | High (brand rules) |
| Near-duplicate products | 37 groups / 79 product URLs share a model name and size. They differ in wall thickness and price (for example Sevilla 25.59 x 45.07 ft = 2.68 in walls, Sevilla 25.59×45.08 ft = 2.28 in walls), but the titles do not say so, so the pages compete with each other and look duplicated. List: duplicate-product-candidates-2026-11-21.csv. | Medium |
| Cross-domain duplication | About us 78%, windows page 70%, easy installation 60%, insulation 50%, log cabin guide 51% of 8-word sequences also appear on ideaswood.eu or timberescapes.com.au. | Medium |
| Page weight | Home 5.6 MB, 135 requests (89 scripts, 15 CSS, 13 background images up to 632 KB). Category 1.7 MB / 138 requests, product 1.4 MB / 134 requests. | Medium |
| Schema | Product + Offer + BreadcrumbList on products (good). Organization on home has name "ideaswood.com", no address, phone or logo. | Medium |
| hreflang | Home and 61 other pages carry hreflang (en-US self, en-GB/en-IE .eu, en-AU timberescapes.com.au, x-default .eu). Reciprocal on .eu. 278 pages have none (correct where there is no equivalent). | OK, small fixes |
| robots.txt / sitemap | WP core sitemap (8 sub-sitemaps, 340 URLs). robots.txt fine. Sitemap includes cart, checkout, my-account, /maintenance/, /smm/, attribute archives and thin categories. | Medium |
| html lang | en-US on all 298 HTML pages that loaded on the first pass (correct). | OK |

## 2. Google data (Search Console, 28 days, given in the brief)
160 impressions, 11 clicks, average position 14.5. Queries: ideaswood 10 impr. pos 3.9; wooden log cabin 7 pos 20.9; cabin wooden 6 pos 69; best log cabin timber 5 pos 59; kaia 5 (product in Insulated wooden houses); wood passion 4 pos 6 (the home title tagline "Wood Passion").
Reading: the site is almost unknown to Google outside the brand. The volume is too small to steer by, so the keyword map is built from US autosuggest and from the sauna demand seen on ideaswood.eu (see KEYWORD-MAP.md).

## 3. Soft 404: what returns a thin or empty page with status 200
The GSC email names the property (https://ideaswood.com/), not necessarily the home page. The home page itself is 200 with 720 words, one canonical and real products, so it is unlikely to be the flagged URL. [CHECK in GSC: Indexing > Pages > "Soft 404" > example URLs, and send them to the SEO session.]

| # | URL type | Example (tested 2026-11-21) | What Google sees | Fix (TASKS step) |
|---|---|---|---|---|
| 1 | Empty product categories (count 0) | /product-category/bbq-grill-cabin/grill-cabins/ (ID 79), /product-category/pergola/ (72), /pergola/wooden-pergola/ (74), /pergola/aluminum-pergola/ (73), /bbq-grill-cabin/ (23), /bbq-grill-cabin/grill-sets/ (78), /saunas/outdoor/barrels-sauna/ (71), /saunas/outdoor/sauna-cabins/ (69), /saunas/indoor/custom-size/ (67), /log-cabins/classic-log-cabins/ (202), /smart-line-series/ (1717) and its 5 children (1718-1722) | 200, title "Pergola \| ideaswood.com", "No products were found matching your selection." | Step 3 |
| 2 | Main menu link to an empty category | "Grill Cabins" menu item points to /product-category/bbq-grill-cabin/grill-cabins/ on all 297 pages | Google crawls it from every page | Step 2 |
| 3 | Internal search | /?s=zzzqqq, /?s=zzzqqq&post_type=product, /search/sauna/ | 200, no noindex, "nothing found" | Step 4 |
| 4 | Pagination past the end | /shop/page/99/ (shows page 1 products, canonical /shop/), /page/2/ and /page/50/ (home duplicate with broken canonical https://ideaswood.com/2/ and /50/), /blog/page/5/ (no posts) | 200 duplicate or empty | Step 5 |
| 5 | Date and blog archives | /2024/, /2025/ ("Archives", no posts), /category/uncategorized/ (1 post), /category/blog/ | 200 near-empty | Step 4 |
| 6 | Categories with 1-2 products and no text | /product-category/default-category/ (57), /featured/ (564), /product-tag/featured/ (563), /hot-tub/electric-heater/ (75), /outside-firewood-heater/ (76), /integral-firewood-heater/ (77), /square-hot-tub/ (180), /double-hot-tub/ (181), /saunas/indoor/ (65), /saunas/indoor/standard/ (68), /saunas/outdoor/ (66), /saunas/outdoor/sauna-pods/ (70), /log-cabins/modern-log-cabins/ (24) | about 290 words of menu and footer, 1-2 products: "thin" | Steps 3, 6 |
| 7 | Utility and leftover pages in the sitemap | /maintenance/ (Divi placeholder "We will Be back Soon", 200), /smm/ (test landing page), /cart/, /checkout/ (canonical to /cart/), /my-account/ | thin or placeholder | Step 4 |
| 8 | Attribute archives | /has-terrace/yes/, /has-terrace/no/, /internal-area-range/* (5) | 200, no H1, no meta, no canonical, duplicates of /shop/ filtered | Step 4 |
| 9 | Out of stock | Only 1 of 286 products: /product/standard-indoor-sauna/ (also has no H1) | low risk | Step 11 |

Not a soft 404: unknown URLs (/zzz/, /product/zzz/, /product-category/zzz/, /product-tag/zzz/, /has-terrace/) correctly return 404. http and index.php 301 to https home.
Possible extra cause [CHECK]: the /maintenance/ page exists. If a maintenance mode ever served "We will be back soon" with status 200 site-wide, Google would report soft 404 on many URLs at once. Ask whoever runs the site whether Divi maintenance mode was switched on in October or November.

## 4. Titles, meta, H1, canonical
- Titles: 340 URLs, no duplicate titles except Cart/Checkout and Blog/Category Blog. All end in "\| ideaswood.com" (domain, not brand). Home title: "ideaswood.com \| Wood Passion". 13 product titles are over 60 characters ("... Premium — 1.73 in walls").
- Meta description missing on 95 URLs: all 27 categories, all 7 attribute archives, all 13 pages except home. 259 of 286 product descriptions are auto-built from attributes ("See full specifications and options"); 15 of them say "internal area 0.00 ft²".
- H1 missing on 80 URLs: all 27 categories, attribute archives, about-us, privacy, cart, my-account, insulation page, product "Standard Indoor Sauna". Home has 5 H1s; the first is misspelled "Effeciently Crafted Wooden Log Cabins".
- Canonical missing on all taxonomy pages (categories, tag, attributes). Products and pages self-canonical.
- Product names with leftovers: "Aurora 19.69×34.45 ft (iki rakto)" (Lithuanian), metric names "Lukne 3×3 m", "Linus 6×6 m wc", "Orlando 8×9 m", "Nagano 10.14×8.04 m", five products labelled "-UK", and "Garage+carport 22.30 x 183.72 ft" (size typo).
- Category assignment is mixed: "Log cabins" holds garages, a pergola and three saunas; "Saunas" holds a Camping Pod; two hot tub categories exist (/hot-tub/ ID 26 in the menu, /hot-tubs/ ID 1687 in the sitemap and hreflang map).

## 5. Wording that breaks the brand rules (live, by page)
| Page | Text to remove or rewrite |
|---|---|
| Home | "log cabins UK collection", "Nordic pine", "eco-friendly living", "energy efficiency", "highly sustainable designs", "Eco-Luxury & Sustainability Appeal", "commitment to the environment", "Responsibly Sourced Timber", "Guaranteed Sustainability", "energy-efficient prefab cabins", "our sustainable designs", "thousands across the UK and Australia trust our heritage", "premier global wooden house suppliers", "luxury cedar log homes" |
| /about-us/ | "manufactured in Lithuania by IdeasWood", "One of Our Modern and Innovative Factories", "Modern production facility", "production capacity of up to 100 trucks per month", "3200 m³ of structures production per month", "manufacturing process", "garden building design and manufacturing", "Environment protection", "slow grown northern Europe wood" |
| /contact-us/ | "creator and developer of eco sustainable solutions, manufacturer and one stop supplier", heading "Production area" |
| /highest-quality-windows-and-doors/ | "sourced from sustainably managed forests, making them an eco-friendly choice", "Environmental Sustainability", "Energy Efficiency" |
| /high-quality-windows-and-doors/ | "CE certified package" [CHECK: keep only with a document], "Siberian or North Europe slow grown" |
| /insulation-kits-on-all-models-available/ | "promotes sustainability", "Energy Efficiency ... helping the environment" |
| /smm/ | "Global Leader in Wooden Living", "we design, manufacture, and deliver", "committed to sustainability and ecological responsibility" (unpublish the page) |
| 57 product pages | Option labels "Factory paint on the inner cladding boards ..." and "Factory paint finish for exterior doors and windows" (rename to "Pre-painted ...") |
| 193 product pages | Attribute "Warranty (months) 60" [CHECK: keep only if Justinas confirms the warranty terms for US buyers] |

"since 1993": not found anywhere on the live site (the only "1993" hits are option prices "$ 1993" and "$ 11993"). Done.

## 6. US market signals
- Prices: USD on all 286 products (Store API currency USD). Units: ft, ft², in. Good.
- Shipping or delivery to the US: not stated anywhere on the site. The new copy marks every shipping line [CHECK].
- Permit and building code guidance: none on the site. The new copy adds neutral "ask your building department" lines without quoting any local rule.
- Phone and hours on the call-back form ("8:30am & 1pm", "by 6pm") have no time zone. [CHECK: state the time zone, e.g. "Lithuanian time (EET)", or US hours if staff cover them]
- Contact email on /contact-us/: hello@ideaswood.com. Privacy page uses info@ideaswood.eu. Pick one for .com.

## 7. Cross-domain role and duplication
| Domain | Role | hreflang | Language and units |
|---|---|---|---|
| ideaswood.com | United States store (USD, ft/in) | en-US | US English: color, customize, backyard, permit, building code |
| ideaswood.eu | UK, Ireland, EU, and x-default | en-GB, en-IE, x-default | British English, EUR/GBP, metric |
| timberescapes.com.au | Australia | en-AU | Australian English, AUD [the brief says ".com.au": the live AU store is timberescapes.com.au; ideaswood.com.au did not answer from this session, CHECK] |
| abitazionidilegno.it | Italy | it-IT | Italian |
Findings: hreflang is reciprocal between .com, .eu and timberescapes.com.au for the mapped paths. But .eu and timberescapes.com.au both declare `<html lang="en-US">` (should be en-GB and en-AU); tell the .eu lane (COORDINATION.md). The shared info pages (about, windows, insulation, easy installation, log cabin guide) are 50-78% identical across domains: hreflang tells Google which one to show, but rewriting the .com versions in US English removes the duplicate problem for good. The new COPY/ texts share no 8-word sequence with any crawled .eu, AU or IT page or with the repo drafts in seo/content/.

## 8. Speed
| Page | Total | Requests | Biggest items |
|---|---|---|---|
| Home | 5.6 MB | 135 (89 JS, 15 CSS, 17 img, 13 background images) | background slides 632 KB (A-frame Moose), 621 KB (Iberica), 543 KB, 517 KB; inline img 499 KB (suzy) |
| /product-category/log-cabins/ | 1.7 MB | 138 (83 JS, 21 CSS, 33 img) | menu thumbnails as 300x300 PNG (161, 134, 125 KB) |
| /product/agoti-16-40-x-9-84-ft/ | 1.4 MB | 134 (85 JS, 22 CSS, 26 img) | gallery images 47-63 KB each (fine) |
HTML alone is 160-290 KB per page. LiteSpeed cache answers cached pages fast (x-litespeed-cache: hit), but uncached pages take 10-34 s and fail under 6 parallel requests. Fixes: crawler-friendly cache warm-up, compress the hero backgrounds to under 200 KB, convert the menu PNG thumbnails to WebP, combine/defer JS (89 files), and check PHP workers on the host [CHECK with host].

## 9. Schema
- Products: Product, Offer, UnitPriceSpecification, BreadcrumbList, Organization (WooCommerce). Seven variable products use AggregateOffer. Keep.
- Home: Organization {name "ideaswood.com", foundingDate 2007} + WebSite. Replace with the full Organization block in TASKS-FOR-MAC.md step 8 (name IdeasWood, address, phone, founded 2007, no factory or manufacturer wording).
- No FAQPage anywhere; add only where the FAQ text is visible.
