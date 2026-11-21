# timberescapes.com.au – SEO audit (Australia) – 2026-11-21

Method: curl with a browser user agent from the cloud session. Sitemap /wp-sitemap.xml (6 sub-sitemaps, 172 URLs) crawled at concurrency 3 with retries (concurrency 6 made the server return 503/time out: uncached pages take ~20 s; all four IdeasWood domains share one LiteSpeed server, 85.206.243.14). 171 of 172 URLs parsed after retries (checkout redirects, 302). The 35 product-category URLs from the main menu were crawled separately, because they are not in the sitemap. Raw data stays in the session scratchpad; the numbers below are from it.
Google data: Search Console, 28 days to 2026-11-20: 1,463 impressions, 6 clicks, average position 44.5 (queries in KEYWORD-MAP.md).

## 1. Verdict in one paragraph
The site is a WooCommerce copy of the EU catalogue with AUD prices and almost no Australian text. It ranks on page 3-7 for log cabins, saunas and hot tubs only because the catalogue is large. The fixes with the biggest effect are not technical: (1) remove unverified local details (a Victorian "office", a Tasmanian "showroom" at a holiday-cottage address, a (130) phone number, and a $15,055 "our team will build it" option on pergolas); (2) replace "Eco-Living" and the other banned claims; (3) give each money query a real landing page with Australian copy (COPY/). Technically: no SEO plugin, product categories missing from the sitemap, `lang="en-US"`, two H1s on every product page, and a raw form shortcode printed on 159 of 171 pages.

## 2. Domains
| Host | Result (2026-11-21) | Meaning |
|---|---|---|
| https://timberescapes.com.au/ | 200, LiteSpeed, WordPress 6.7.12 + WooCommerce 10.3.8 + Divi | The live AU site |
| http://timberescapes.com.au/ | 301 → https://timberescapes.com.au/ | OK, one hop |
| https://www.timberescapes.com.au/ | not testable from the cloud proxy (host not on the allow-list) | Mac session: check it 301s to the bare domain |
| ideaswood.com.au (http and https) | no DNS answer from the cloud resolver; proxy "connect_unreachable" (502) | The domain does not serve a site now. It is neither a redirect nor a copy. |
| ideaswood.eu / ideaswood.com home | hreflang en-AU → https://timberescapes.com.au/ | The group already treats timberescapes.com.au as the AU site; ideaswood.com.au is not in the hreflang set |

**ideaswood.com.au in brand results (#2-#7 earlier):** seo/fixes/07 records that IdeasWood owns ideaswood.com.au (decision 2026-09-29), but the name does not resolve today, and research/ai-search-geo-2026-11-20.md notes an unrelated Australian "IdeasWood" and "A Wood Idea" in brand results. So the #2-#7 results are either stale pages from when the domain still served a site, or another business. Action [CHECK, Justinas]: (a) confirm who holds the .com.au registration and when it lapsed; (b) if ours, point DNS to the same server and 301 every path to the same path on https://timberescapes.com.au/ (do not serve a copy); (c) if not ours, add a line to the About page and schema `sameAs` only for our real domains, so Google can tell the brands apart. Do not add ideaswood.com.au to hreflang.

## 3. robots.txt and sitemaps
- robots.txt is fine (WooCommerce disallows, /wp-admin/ blocked, admin-ajax allowed) and points to https://timberescapes.com.au/wp-sitemap.xml.
- /sitemap_index.xml → 404; /sitemap.xml → 301 → /wp-sitemap.xml (WordPress core sitemap; no SEO plugin installed).
- Sub-sitemaps: posts 4, pages 11, products 154, post categories 2, **product categories 0** (the product_cat sitemap is empty although 44 terms exist, 37 with products), product tag 1.
- The sitemap includes cart, checkout (302), my-account, /smm/ (a test copy of the home page) and /category/uncategorized/.
- Fix: Rank Math sitemap with product categories, without cart/checkout/my-account//smm/ (TASKS Step 1).

## 4. Page-level results (171 URLs parsed)
| Check | Result |
|---|---|
| Title pattern | "Page name \| timberescapes.com.au" everywhere; home "timberescapes.com.au \| Eco-Living". No keyword in any page title except the product name. |
| Duplicate titles | 6 groups: Gustav A 6×6 m (/gustav-a-6x6-m/ and -2), Gustav B 6×8 m (×2), Louise 6×6 m (×2), Torino 4.5×6 m (×2), "Dinning Set" (×3, also misspelt), "Blog" (/blog/ and /category/blog/). The -2 products are duplicates or variants with the same name: rename (e.g. "Gustav A 6×6 m – 44 mm") or merge with a 301. |
| Meta description | Missing on 17 URLs (all 13 pages incl. home-adjacent about, contact, guide, /smm/, plus archives). Products use the first spec line ("Description: Tongue and groove floor…", "Our standard set includes: Floor panels…"); 13 products share a duplicate meta. |
| H1 | 158 of 171 pages have more than one H1 (product template prints the product name twice; home has 5 H1s: "Eco-Living With Our Cabins", "Latest Products", "Products By Catagory", "Experience the Hassle-free…", "Why Choose Us?"). |
| Word count (main content, nav and footer removed) | Median 194 words; 104 pages under 250 words, 62 under 150. Home: 449 words / ~2,960 characters of body text (~4,800 characters with menus and footer), mostly menu labels and product cards. |
| Canonical | Self-referencing on all pages that loaded. Archives (/category/…, /product-tag/featured/) have none. |
| `<html lang>` | **en-US on every page** (WordPress Site Language = English (United States)). Should be en-AU. |
| Meta robots | None anywhere (everything indexable, including /smm/, cart, my-account). |
| Schema | Product + Offer (AUD) + BreadcrumbList + Organization on products (WooCommerce default). Home: Organization {name "timberescapes.com.au", foundingDate 2007} + WebSite only: no address, phone, logo or sameAs. 27 pages have no schema. No FAQ schema. |
| Prices | AUD (priceCurrency "AUD"). |
| Raw shortcode | `[wpforms_selector form_id="5511" … _builder_version="4.27.4" …]` printed as visible text on 159 pages (curly quotes break the shortcode). |
| Typos visible sitewide | "Catagory/Catagories", "Standart set", "chimeney", "spa hud", "Incudes", "Dinning", "Ideaswoood", "Choose how the sauna is heated" on a hot tub. |
| Footer copyright on /contact-us-2/ | "Copyright © 2026 Divi. All Rights Reserved." |

## 5. hreflang
- Output on 152 of 171 pages (custom code, not a plugin): en-GB + en-IE → ideaswood.eu, en-US → ideaswood.com, en-AU → self, x-default → ideaswood.eu. The home page and /about-us/ sets are reciprocal on .eu and .com (checked).
- 19 pages have none (cart, contact, /smm/, archives, privacy), 2 pages have only 3 entries.
- Target check of the 168 external hreflang URLs: see §5a (filled from the status check). Any hreflang pointing to a 404, a redirect or a non-equivalent page is ignored by Google and should be dropped from the set.
- /about-us/ is paired with the EU/US About pages although the AU text is different and wrong for AU (it sends visitors to "the full European range with current prices at ideaswood.eu"). After the AU About rewrite, keep the pairing only if all three are about the same company story; otherwise remove hreflang from About.
- New AU-only landing pages (/granny-flats/ etc.) must have no hreflang.

### 5a. hreflang target status
- 168 distinct external targets (ideaswood.eu / ideaswood.com) found on the first 167 AU pages and all checked: 163 returned 200, 1 redirected (AU /blog/ points en-GB to https://ideaswood.eu/blog/, which 301s to /category/blog/: point it to the final URL) and 4 returned 503 under load (ideaswood.eu product pages sauna-barrel-17-m-o-197m, sauna-pod-2-4-x-1-9-m, trento-6x5-m, gustav-a-6x6-m-2; recheck, probably temporary). No 404 found.
- Return tags confirmed on ideaswood.eu and ideaswood.com for the home page, /about-us/, /product/square-hot-tub/ and /product-category/bbq-grill-cabin/: the set is reciprocal and technically valid.
- Weak point: the 35 categories mostly have no hreflang, while the same categories exist on .eu; and hreflang on products ties the AU page to EU/US pages whose prices, units and text differ. That is allowed (same product, different market), so keep it, but localise the AU text so the pages are not near-duplicates.

## 6. Generic "Eco-Living" and banned claims (all must go)
| Where | Text found |
|---|---|
| Site tagline (Settings → General, also in REST API) | "Eco-Living" |
| Home title / H1 / meta | "timberescapes.com.au \| Eco-Living", "Step into your Eco-Living With Our Cabins", "Eco-living timber cabins…" |
| Home "Why Choose Us?" | "Sustainable and Natural Materials — We prioritize eco-friendly practices and use responsibly sourced wood to create environmentally conscious living spaces"; "End-to-End Service — From design consultation to final installation"; "expertly engineered" |
| Home blog teaser, /blog/, /category/blog/, /high-quality-windows-and-doors/ | "Our own produced windows and doors", "16 mm double glassed CE certified package", "good quality Siberian or North Europe slow grown… pine or spruce… glued in the manufacturing process" |
| /highest-quality-windows-and-doors/ | "Energy Efficiency… significant energy savings", "Environmental Sustainability… sourced from sustainably managed forests, making them an eco-friendly choice", "At Ideaswoood" |
| /insulation-kits-on-all-models-available/ | "Energy Efficiency — Insulation reduces energy consumption, helping the environment", "promotes sustainability" |
| /the-ultimate-log-cabin-guide/ | "premium craftsmanship, sustainable materials" |
| /about-us/ | "Our wooden buildings are manufactured in Lithuania by IdeasWood", "One of Our Modern and Innovative Factories", "production capacity of up to 100 trucks per month", "3200 m³ of structures production per month", "manufacturing process", "Environment protection", "Partner with a Leading Supplier" |
| /smm/ | "Global Leader in Wooden Living", "we design, manufacture, and deliver", "strongly committed to sustainability and ecological responsibility", "environmental care" |
| Product "Nordic L" (/product/nordic-l/, shown in related products on others) | Model name contains "Nordic" [CHECK: rename for AU, e.g. "Model L"] |
| Shingle option text on many products | "Unrivalled in quality… meet the high standards… superior performance" (unprovable superlatives) |
Scan result: 0 hits for "Made in Lithuania", "Scandinavian", "carbon", "green" claims; "CE" only in the windows text above (no sauna CE claim found).

## 7. Mentions of other markets
- /about-us/: "serving more than 15 countries", "browse the full European range with current prices at ideaswood.eu", "manufactured in Lithuania".
- /product/camping-pod-3-x-5-9-m/: "It is very popular all over Europe."
- /privacy-policy-and-cookies/: Lithuanian company details and EU wording (legal page: fine, keep, but it should name the trading entity and how AU customers contact it).
- /smm/: staff bios "IdeasWood.eu's service".
- Footer: email info@ideaswood.eu and chat number +370 610 05085; contact page uses sales@timberescapes.com.au and (130) 092-4932.
- No mentions of the UK, Ireland, the USA or Italy were found on the AU pages.

## 8. Trust problems (fix before any SEO work is promoted)
1. **Unverified Australian addresses and phone.** Footer: "Office: 22i Darktown Road, Lurg, Victoria 3673" (contact page: "228 Darktown Road"); "Showroom: Russell Falls Cottages, 40 Lake Dobson Road, National Park, Tasmania 7140" (a holiday-cottage address); phone "(130) 092-4932" (US-style formatting; if it is a real 1300 number it should read "1300 924 932", otherwise remove it). [CHECK] If not real premises, remove today. Under the company rules, our address is Kaštonų g. 8, Didžiosios Riešės k., Vilniaus r. sav., Lithuania; +370 678 22055.
2. **Installation offer.** Wooden pergola products offer "Yes – I would like Ideaswood team to build it for me + $15,055". [CHECK] Remove unless real in Australia.
3. **Broken product data:** "People 4-Feb" on saunas (Excel date), garage spec tables in unit-less imperial figures (e.g. "Internal house area 228", "Wall height 7.3144"), hot tubs listing "Red Canadian cedar" and "People 10" while options say spruce/thermo/WPC and 4-6 or 6-8 people, Sauna Nova with two conflicting size blocks, "Hot tub with outside firewood stove" and "Double hot tub" filed under "Electric heater", "Camping Pod 3 x 5.9 m" filed under "Sauna pods".
4. 60-month warranty is stated on pergola, garage and sauna product pages. [CHECK] Keep only if it is the real AU warranty.

## 9. Product categories (35 menu URLs crawled; none is in the sitemap)
- All 35 return 200. Titles are the bare term name ("Log cabins | timberescapes.com.au", "Barrels sauna | …", "Outdoor | …", "Standard | …", "Indoor | …").
- **No meta description, no canonical tag and no category text** on any of them: the body is only the product grid ("Showing 1–30 of 114 results …"). /hot-tub/ and /sauna/ have 3 H1s; /furniture/ has none.
- hreflang on 14 of 35 (bbq, furniture, hot tub, pergola, sauna top level) and none on the log cabin, garden office, saunas-outdoor or garage categories.
- Empty categories linked from the main menu: Camping houses (0 products), Frame houses (0), Pergola cabins (0), Custom size saunas (0), Kitchens/wardrobes (0). Junk terms not in the menu: "nauja-kategorija" (Lithuanian for "new category", 0), "default-catagory" (0). Hidden categories with products but no menu link: country-houses-villas (17), garden-house (24), all-season-houses (6), garden-cabins (1).
- The /log-cabins/ category holds 114 of the 117 house products, so it is the de facto catalogue; its sub-categories hold 2-31 each.
- Fix: TASKS Step 7 (titles, meta, 2-sentence intro + link to the landing page) and Step 1 (sitemap, noindex/delete empties).

## 10. What we sell vs what Australians search (for KEYWORD-MAP)
- Acrylic hot tub (GSC 31 impressions, pos 13.5): we do not sell acrylic spas; we sell timber hot tubs with an **acrylic liner** (option on round/double tubs, standard on the square tub). Covered honestly in one H2 + FAQ on /wood-fired-hot-tubs/; not a title target.
- Cedar hot tub: not an option on the product pages → do not target.
- Granny flats: no AU category; needs a model list and product tag [CHECK].
- Sauna range is small (2 barrels, 1 pod, 1 sauna cabin, indoor standard): one barrel page + one outdoor-sauna hub, not a page per model.
- Summer houses already at position 6.6: change title/meta only.

## 11. Compared with seo/content/22-timberescapes-au-copy.md
Content/22 (2026-11-20) is a sound base and is not discarded. This pack changes it as follows:
- Pages follow the real Search Console queries (log cabins, garden offices, barrel saunas, hot tubs, pergolas, garages) instead of "wooden house kits", which had no AU impressions.
- Adds 8 landing pages with full body and FAQ; content/22 had 6 shorter pages with many [CHECK] gaps.
- Uses facts from the live AU product pages (sizes in model names, 44 mm walls on saunas, hot tub options, pergola sizes) and lists the product-data bugs that block quoting other specs.
- Drops "from northern Europe" (origin wording not on the allowed fact list) and all "contracted factories" wording.
- Adds the trust findings (§8) that content/22 could not see without a crawl.
- Content/22 §2 (About) and §7 (Contact) remain the drafts for those two pages, after the [CHECK] items and the "northern Europe" line are cleared.
- 8-gram check: the COPY/ files share no 8-word sequence with 167 crawled pages of ideaswood.eu, ideaswood.com and abitazionidilegno.it (pages, posts, product categories and home pages; product pages of those sites were not included).
