# ideaswood.com: WordPress admin tasks for the Mac session (in this order)

Admin: https://ideaswood.com/wp-admin/ . IDs below were read from the public WP and WooCommerce APIs on 2026-11-21.
Before you start: COORDINATION.md says ".com: no session assigned, do not edit until a session is assigned". Justinas must assign the Mac session to ideaswood.com first. Then append one line per change to COORDINATION.md (date, URL or setting, before, after). Never change prices, products' stock or user accounts. Take a full backup (host panel or UpdraftPlus) before step 1.

## Step 0. Find the exact soft 404 URLs (10 min)
Search Console > ideaswood.com > Indexing > Pages > "Soft 404" > export the example URLs. Send the list to the SEO session. Most should fall into the URL types in AUDIT.md section 3; if the home page itself is listed, request indexing again after steps 2-7.

## Step 1. Install an SEO plugin (Rank Math free, same as ideaswood.eu)
1. Plugins > Add New > "Rank Math SEO" > Install > Activate. Skip the wizard's "import" step; choose "Advanced" mode.
2. The custom plugin "IdeasWood SEO basics" steps aside by itself when Rank Math is active. Leave "IdeasWood hreflang" active.
3. Rank Math > General Settings > Links: "Strip category base" OFF (keeps /product-category/ URLs and the hreflang pairs).
4. Rank Math > Titles & Meta > Global: separator "|", and in the title templates replace "%sitename%" output by setting Settings > General > Site Title to **IdeasWood** (today it is "ideaswood.com"). Tagline: leave empty (removes "Wood Passion" from the home title; the new home title is set in step 7).
5. Rank Math > Sitemap Settings: enable. Include Products, Pages, Posts, Product categories. Exclude: Product tags, "has-terrace", "internal-area-range", Categories (blog), and these post IDs: 121, 122, 123, 5607, 8756.
6. robots.txt (Rank Math > General Settings > Edit robots.txt):
```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /wp-content/uploads/wc-logs/
Disallow: /wp-content/uploads/woocommerce_transient_files/
Disallow: /wp-content/uploads/woocommerce_uploads/
Disallow: /?s=
Disallow: /search/
Disallow: /*?*add-to-cart=
Disallow: /*?*orderby=
Disallow: /*?*filter_
Disallow: /*?*iw_wall=
Disallow: /cart/
Disallow: /checkout/
Disallow: /my-account/

Sitemap: https://ideaswood.com/sitemap_index.xml
```
Check https://ideaswood.com/sitemap_index.xml loads, and that /wp-sitemap.xml redirects or 404s.

## Step 2. Remove the sitewide link to an empty category
Appearance > Menus (or Divi > Theme Builder > Global Header > menu module): the item "Grill Cabins" points to /product-category/bbq-grill-cabin/grill-cabins/ (term 79, 0 products). Delete the menu item. Also check the mega-menu "Products By Category" list for "Grill Cabins" and "Furniture" and remove them if .com has no such products.

## Step 3. Empty product categories (status 200, "No products were found")
Products > Categories. For each term with 0 products: if .com will sell that range within 30 days, assign products; otherwise delete the term and add the 301 in Rank Math > Redirections.
| Term ID | URL | Action |
|---|---|---|
| 72 | /product-category/pergola/ | delete, 301 to /product-category/pergolas/ |
| 74 | /product-category/pergola/wooden-pergola/ | delete, 301 to /product-category/pergolas/ |
| 73 | /product-category/pergola/aluminum-pergola/ | delete, 301 to /product-category/pergolas/ |
| 23 | /product-category/bbq-grill-cabin/ | delete; no 301 (404 is correct, no grill products on .com) [CHECK] |
| 78 | /product-category/bbq-grill-cabin/grill-sets/ | delete; no 301 |
| 79 | /product-category/bbq-grill-cabin/grill-cabins/ | delete; no 301 (after step 2) |
| 71 | /product-category/saunas/outdoor/barrels-sauna/ | assign barrel sauna products if .com sells them [CHECK], else delete and 301 to /product-category/saunas/ |
| 69 | /product-category/saunas/outdoor/sauna-cabins/ | assign Sauna Zen/Amber/Nova/Pulse here, or delete and 301 to /product-category/saunas/ |
| 67 | /product-category/saunas/indoor/custom-size/ | delete, 301 to /product-category/saunas/ |
| 202 | /product-category/log-cabins/classic-log-cabins/ | delete, 301 to /product-category/log-cabins/ |
| 1717 | /product-category/smart-line-series/ | delete with children 1718, 1719, 1720, 1721, 1722 unless the Smart Line range is about to launch on .com [CHECK]; 301 to /shop/ is NOT advised (that is another soft 404 signal); let them 404 |
Do not delete term 57 "Default Category": it is WooCommerce's default category. Instead go to step 4.

## Step 4. Noindex thin and utility URLs
In Rank Math > Titles & Meta:
- Misc Pages: Search Results = noindex; Date Archives = disabled (redirect to home is fine for an empty /2024/), Author Archives = disabled.
- Product Tags: noindex. Attribute taxonomies "Has terrace" and "Internal area range": noindex.
- Categories (blog): noindex /category/uncategorized/ (term 1) and /category/blog/ (term 4) until there are 5+ posts.
- Edit term 57 (Default Category) and term 564 (Featured) and tag 563 (featured): Rank Math box > Advanced > Robots Meta = noindex, follow.
- Pages: /cart/ (121), /checkout/ (122), /my-account/ (123): noindex.
- /maintenance/ (page 8756, a Divi placeholder "We will Be back Soon"): Status = Draft. Also check Divi > Theme Options > Maintenance (or any "coming soon" plugin) is OFF.
- /smm/ (page 5607, test landing page with "Global Leader", "manufacture", "sustainability"): Status = Draft.

## Step 5. Return 404 for impossible pagination
/shop/page/99/ returns page 1 products with status 200; /page/2/ and /page/50/ return a copy of the home page with canonical https://ideaswood.com/2/. Add this as a Code Snippets snippet ("Run everywhere"), test on the five URLs, then purge LiteSpeed cache:
```php
// IdeasWood .com: 404 for pagination past the last page and for /page/N/ on the static front page. 2026-11-21.
add_action( 'template_redirect', function () {
	global $wp_query;
	$paged = max( (int) get_query_var( 'paged' ), (int) get_query_var( 'page' ) );
	if ( $paged < 2 ) {
		return;
	}
	$past_end = $paged > max( 1, (int) $wp_query->max_num_pages );
	if ( is_front_page() || ( ( is_home() || is_archive() || ( function_exists( 'is_shop' ) && is_shop() ) ) && $past_end ) ) {
		$wp_query->set_404();
		status_header( 404 );
		nocache_headers();
	}
}, 1 );
```
Test: /shop/page/2/ must stay 200; /shop/page/99/, /page/2/, /blog/page/5/ must return 404.

## Step 6. Category template: give every category an H1 and visible text
Today all 27 categories have no H1 and do not show the description. Divi > Theme Builder > the template used for "All Product Category Pages" (or "Products archive"):
1. Add a **Post Title** module at the top, Dynamic Content = "Archive Title", Heading Level = **H1**. Turn off meta.
2. Under it add a **Text** module with Dynamic Content = "Category Description".
3. Optional: install `seo/fixes/categories-2026-10-18/iw-category-seo.php` (used on .eu) to split the description at `<!--iw-below-->`: text before the mark shows above the grid, the rest below. If the Divi template does not call `woocommerce_archive_description`, put a second Text module below the Shop module instead and paste the "Body" part there [CHECK on staging].
4. Check that each category now has exactly one H1 (view source, search `<h1`).

## Step 7. Paste the new en-US copy
Files in `seo/sites/com/COPY/`. Title and meta go into the Rank Math box at the bottom of the edit screen; H1 = category Name unless the copy says otherwise; Intro + Body (+ FAQ) go into Description, with `<!--iw-below-->` between Intro and Body. Leave out every line marked [CHECK] until Justinas confirms it.
| Copy file | Edit screen |
|---|---|
| 00-home.md | Pages > Home (ID 6779) > Divi builder; Rank Math title/meta on the same page. Make only the new heading H1 and change the other four H1s to H2 |
| 01-log-cabins.md | Products > Categories > Log cabins (ID 207). First remove these products from term 207 (keep their own categories): the garages, "Garage+carport 22.30 x 183.72 ft", Pergola Modu, Sauna S, Sauna M, Sauna L, Wall Mounted, Wall Mounted Closed (aluminum pergolas? CHECK) |
| 02-garden-cabins.md | Garden Cabins (ID 276) |
| 03-home-offices.md | Home offices/studios (ID 152); Name: "Backyard Offices and Studios" |
| 04-saunas.md | Saunas (ID 27); move "Camping Pod 9.84 x 19.35 ft" out of Saunas [CHECK which category] |
| 05-a-frames.md | A-Frames (ID 1616); Name: "A-Frame Cabin Kits" |
| 06-insulated-homes.md | Insulated wooden houses (ID 1615); Name: "Insulated Cabin and Guest House Kits" |
| 07-log-home-kits.md | Villas/country houses (ID 517); Name: "Log Home Kits"; keep the slug |
| 08-garages-carports.md | Garages/Carports (ID 206); Name: "Wood Garage and Carport Kits" |
Then Sheds (203), Pergolas (205), Hot tubs (1687), Summer houses (204): title and meta only, from KEYWORD-MAP.md.

## Step 8. Organization schema (home page)
Rank Math > Titles & Meta > Local SEO: Person or Company = Company, Name "IdeasWood", Logo = the site logo, URL https://ideaswood.com/. If the free version does not output address and phone, add this JSON-LD with a Code Snippets "head" snippet on the front page only, and turn off the old Organization output of "IdeasWood SEO basics" (it is already off once Rank Math is active):
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://ideaswood.com/#organization",
  "name": "IdeasWood",
  "url": "https://ideaswood.com/",
  "logo": "https://ideaswood.com/wp-content/uploads/LOGO-FILE.png",
  "foundingDate": "2007",
  "description": "Supplier and exporter of wooden log cabin kits, backyard offices, saunas, garages and house kits in spruce and pine, cut to order with assembly instructions.",
  "email": "hello@ideaswood.com",
  "telephone": "+37067822055",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kaštonų g. 8",
    "addressLocality": "Didžiosios Riešės k.",
    "addressRegion": "Vilniaus r. sav.",
    "postalCode": "14261",
    "addressCountry": "LT"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+37067822055",
    "email": "hello@ideaswood.com",
    "contactType": "sales",
    "areaServed": "US",
    "availableLanguage": ["English"]
  },
  "sameAs": [
    "https://ideaswood.eu/",
    "https://timberescapes.com.au/"
  ]
}
```
[CHECK] logo file URL; postal code 14261 (taken from the .com privacy page "Vilniaus raj 14261"); email hello@ideaswood.com vs info@ideaswood.eu; social profiles (the Facebook URL contains "logcabinsfactory": add it to sameAs only if Justinas accepts that). Validate at https://validator.schema.org/ after publishing.

## Step 9. Merge the two hot tub categories
/product-category/hot-tub/ (ID 26, 4 products, in the menu, with subcategories 75, 76, 77, 180, 181) and /product-category/hot-tubs/ (ID 1687, 2 products, in the hreflang map with .eu) are the same thing. Keep 1687 (/hot-tubs/, matches ideaswood.eu). Add all hot tub products to 1687, point the menu at /hot-tubs/, delete 26 and its 5 subcategories, and add a Rank Math regex redirect `^/product-category/hot-tub/(.*)` > `/product-category/hot-tubs/`. Ask the SEO session to remove the five `/product-category/hot-tub/...` lines from IW_HREFLANG_MAP in `seo/fixes/sites-2026-10-19/iw-hreflang.php` on all three sites.

## Step 10. Product titles that look like duplicates
Open `seo/sites/com/duplicate-product-candidates-2026-11-21.csv` (79 URLs in 37 groups). Most pairs are the same model and size with a different wall thickness and price, e.g. "Sevilla 25.59 x 45.07 ft" (2.68 in) and "Sevilla 25.59×45.08 ft" (2.28 in). For each: put the wall thickness in the title the same way everywhere ("Sevilla 25.59×45.08 ft, 2.28 in walls"), keep the URL. Where two products really are identical (check Torino 14.76 x 19.68 ft-2 and Torino 14.76×19.69 ft, both 2.28 in; Sauna Zen and Sauna-Zen), set one to Draft and 301 it to the other. Justinas decides; do not change prices.

## Step 11. Product data fixes
| Product URL | Fix |
|---|---|
| /product/aurora-19-69x34-45-ft-iki-rakto/ | Name "Aurora 19.69×34.45 ft" (remove the Lithuanian "iki rakto"); keep slug or 301 |
| /product/lukne-3x3-m/, /product/linus-6x6-m-wc/, /product/orlando-8x9-m/, /product/nagano-10-14x8-04-m/ | Names in feet like the rest [CHECK exact slugs in admin] |
| /product/garagecarport-22-30-x-183-72-ft/ | Size typo 183.72 ft: correct name and slug, 301 old slug |
| Five "-UK" products (carportstorage-18-70x17-39-ft-uk, carportstorage-18-70x25-92-ft-uk, garage-19-69x19-69-ft-uk-no-gate, garage-22-97x18-04-ft-uk-no-gate, garagecarport-22-31x18-37-ft-uk-no-gate) | Remove "-UK" from the name, or hide on .com if UK-only [CHECK] |
| A-frame 32, A-frame 39, Pergola Oli/Rose/Uma/Missy, Carport Niki/Pablo, Carport+storage (15 products) | Attribute "Internal area (ft²)" = 0.00: enter the real value or remove the attribute |
| /product/standard-indoor-sauna/ | No H1 on the page (template issue) and out of stock: keep it published with "out of stock" visible; fix the H1 |
| Option labels on 57 products | "Factory paint on the inner cladding boards..." and "Factory paint finish for exterior doors and windows..." > "Pre-painted inner cladding boards in the RAL color you choose" / "Pre-painted exterior doors and windows in the color you choose". Owner: product options (add-ons plugin lane) |

## Step 12. Remove banned wording from pages
| Page (ID) | Remove or replace |
|---|---|
| About us (1384) | "manufactured in Lithuania", "One of Our Modern and Innovative Factories", "Modern production facility", "production capacity of up to 100 trucks per month", "3200 m³ of structures production per month", "manufacturing process", "design and manufacturing", "Environment protection", "slow grown northern Europe wood". Replace with: "IdeasWood is a supplier and exporter of wooden buildings, in business since 2007." (full US rewrite in month 2) |
| Contact us (3481) | "creator and developer of eco sustainable solutions, manufacturer and one stop supplier": replace with "Supplier and exporter of wooden garden buildings and house kits since 2007."; rename heading "Production area"; add the time zone to the call-back hours [CHECK] |
| Highest quality windows and doors (1339) | the "Environmental Sustainability" and "Energy Efficiency" paragraphs and "sustainably managed forests ... eco-friendly choice" |
| High quality windows and doors (post 77) | "CE certified package" [CHECK: keep only with a certificate], "Siberian or North Europe slow grown" |
| Insulation kits (1411) | "promotes sustainability", the "Energy Efficiency ... helping the environment" paragraph |
| Home (6779) | handled by step 7 (see the "Remove" list in COPY/00-home.md) |
After this, search the site (Ctrl+F on each page) for: factory, manufactur, producer, Nordic, eco, sustainab, energy, green, CE, UK, Australia, 1993.

## Step 13. Speed
1. Home hero/slider backgrounds: 44mm-A-frame-Moose-4.webp 632 KB, 68mm-Iberica-T2-N-3.webp 621 KB, 68-Swedem-7.5x13.5-9.webp 543 KB, 68mm-Jennifer-N-13.webp 517 KB, A-frame-32-4.webp 441 KB: re-export at 1920 px wide, quality 70, target under 200 KB each. Inline image 44mm-suzy-6-1.webp 499 KB: same.
2. Menu thumbnails loaded on every page as 300x300 PNG (Sauna-Scandi-S-1_pp..., sauna-L..., sauna-m-1..., 125-161 KB each): convert to WebP (LiteSpeed > Image Optimization) or replace with 150 px WebP.
3. LiteSpeed Cache > Page Optimization: JS defer ON, CSS combine ON (89 script files on the home page). Test checkout after the change.
4. LiteSpeed Cache > Crawler: ON, so uncached product pages (10-34 s, 503 under load) are warmed before Googlebot asks. Ask the host about PHP worker limits [CHECK].

## Step 14. Search Console
1. Sitemaps: remove wp-sitemap.xml, submit https://ideaswood.com/sitemap_index.xml.
2. Indexing > Pages > Soft 404 > "Validate fix" after steps 2-6.
3. URL Inspection > Request indexing for the home page and the 8 categories in step 7.
4. Note the date in COORDINATION.md.
