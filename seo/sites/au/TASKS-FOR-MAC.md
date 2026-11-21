# timberescapes.com.au – WordPress tasks for the Mac session – 2026-11-21

Who: the Mac session with wp-admin access to timberescapes.com.au (the cloud session cannot log in). Work top to bottom; each step lists the exact admin URL. Log each finished step in seo/COORDINATION.md ("Change log").
Site facts found by the cloud crawl: WordPress 6.7.12, WooCommerce 10.3.8, Divi, LiteSpeed Cache, Site Kit, Wordfence, **no SEO plugin** (no Rank Math / Yoast). Titles come from Divi ("Page | timberescapes.com.au"), the sitemap is WordPress core (/wp-sitemap.xml), and product categories are missing from it.
Rules for every edit: company = "supplier and exporter". Never write factory, producer, manufacturer, "own produced", Nordic, Scandinavian, Siberian, "Made in Lithuania", eco, sustainable, green, environmentally conscious, energy-efficient, CE (saunas or windows). No invented prices, delivery times, certificates or Australian rules. Anything marked [CHECK] waits for Justinas.
Before you start: take a full backup (LiteSpeed/hosting panel) and export Divi Theme Builder templates.

---

## Step 0 – Stop the trust-breaking claims (day 1, 30 min)
1. **Footer and contact addresses.** Divi Theme Builder: https://timberescapes.com.au/wp-admin/admin.php?page=et_theme_builder → Global footer; and the contact page https://timberescapes.com.au/wp-admin/post.php?post=6701&action=edit
   The site shows "Office: 22i Darktown Road, Lurg, Victoria 3673" (contact page says "228 Darktown Road") and "Showroom: Russell Falls Cottages, 40 Lake Dobson Road, National Park, Tasmania 7140", and phone "(130) 092-4932". **[CHECK with Justinas today]** If these are not real IdeasWood/Timberescapes premises and numbers, remove them now. A fake local office or showroom misleads customers and can trigger a Google manual action. Replace with: "IdeasWood, Kaštonų g. 8, Didžiosios Riešės k., Vilniaus r. sav., Lithuania · +370 678 22055 · [CHECK: email to show]". The product pages also show "Chat with us +370 610 05085": decide on one main number.
2. **Pergola "Construction Work" option.** Every wooden pergola product offers "Yes – I would like Ideaswood team to build it for me +$15,055". Products > Edit (e.g. https://timberescapes.com.au/wp-admin/edit.php?post_type=product&product_cat=wooden-pergola) → IdeasWood Product Options (plugin iw-product-options). Remove the option for AU unless on-site building in Australia is really offered [CHECK].
3. **Copyright line** on /contact-us-2/: "Copyright © 2026 Divi. All Rights Reserved." → "© 2026 Timberescapes".
4. **Raw shortcode visible on every page**: `[wpforms_selector form_id="5511" ...]` prints as text in the footer/popup. Divi Theme Builder global footer (or Popup Maker: https://timberescapes.com.au/wp-admin/edit.php?post_type=popup) → replace the pasted shortcode with the Divi "Code"/"Contact form" module, or fix the curly quotes (”) to straight quotes ("), which is why it does not render.

## Step 1 – Install the SEO plugin (day 1)
1. https://timberescapes.com.au/wp-admin/plugin-install.php?s=rank+math&tab=search&type=term → install and activate **Rank Math SEO** (same plugin as ideaswood.eu, so both sites are managed the same way). Setup wizard: Website type "Online shop", logo, Organization; skip the Google account step if Site Kit is already connected.
2. Rank Math → Titles & Meta → Global: separator "|"; Homepage title/meta from COPY/00-home.md; Products title `%title% | Timberescapes`; Product categories title `%term% | Timberescapes`; Posts `%title% | Timberescapes`.
3. Rank Math → Sitemap Settings: enable posts, pages, products, product categories; **exclude** cart, checkout, my-account, /smm/, empty categories. Then Settings → General: disable WordPress core sitemap (Rank Math does this automatically). New sitemap: https://timberescapes.com.au/sitemap_index.xml
4. Edit robots.txt (Rank Math → General → Edit robots.txt) so the Sitemap line points to `https://timberescapes.com.au/sitemap_index.xml`. Keep the existing WooCommerce disallows.
5. Rank Math → Titles & Meta → Product categories: noindex empty categories. Also delete (Products → Categories https://timberescapes.com.au/wp-admin/edit-tags.php?taxonomy=product_cat&post_type=product) the empty junk terms: **nauja-kategorija** (ID 249), **default-catagory** (549). Hide from the menu the empty ones: camping-houses (20), custom-size (67), frame-houses (208), kitchens-wardrobes (81), pergola-cabins (205) – or fill them.
6. https://timberescapes.com.au/wp-admin/options-reading.php → confirm "Discourage search engines" is off.

## Step 2 – Replace "Eco-Living" (day 1)
1. https://timberescapes.com.au/wp-admin/options-general.php → Site Title "Timberescapes", **Tagline: delete "Eco-Living"** (leave empty or "Timber kits for Australian backyards"). The REST API and some themes print the tagline.
2. Home page (ID 6517): https://timberescapes.com.au/wp-admin/post.php?post=6517&action=edit → Divi Builder:
   - H1 module "Step into your Eco-Living With Our Cabins" → H1 from COPY/00-home.md: "Timber log cabins, saunas and backyard buildings, supplied as kits across Australia". Make sure the other headings on the page ("Latest Products", "Products By Catagory", "Experience the Hassle-free…", "Why Choose Us?") are H2, not H1 (there are 5 H1s now).
   - "Products By Catagory" → "Shop by category".
   - Replace the "Why Choose Us?" block (sustainable/eco/end-to-end installation) with the "How buying a kit from us works" list.
   - Add intro, approval, freight, trade and FAQ blocks from COPY/00-home.md.
   - Rank Math box: title "Log Cabins, Saunas & Hot Tubs in Timber Kits | Timberescapes"; description from COPY/00. Schema: FAQ block from the FAQ text.
3. Newsletter text "the latest in luxury timber living" (global footer) → "Get new models and offers by email."

## Step 3 – Organization schema (day 2)
Rank Math → Titles & Meta → Local SEO / Knowledge Graph: Organization, name "Timberescapes", logo, phone +370 678 22055. Rank Math cannot hold every field below, so also add this JSON-LD once, site-wide (Divi → Theme Options → Integration → "Add code to the <head>": https://timberescapes.com.au/wp-admin/admin.php?page=et_divi_options), and remove the current minimal block `{"@type":"Organization","name":"timberescapes.com.au","foundingDate":"2007"}` so there is only one Organization node.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://timberescapes.com.au/#organization",
  "name": "Timberescapes",
  "url": "https://timberescapes.com.au/",
  "logo": "https://timberescapes.com.au/[CHECK: logo file URL]",
  "description": "Supplier and exporter of spruce and pine timber building kits for Australia: log cabins, granny flat kits, garden offices, saunas, hot tubs, pergolas and garages. Supplying since 2007.",
  "foundingDate": "2007",
  "telephone": "+370 678 22055",
  "email": "[CHECK: sales@timberescapes.com.au or info@ideaswood.eu]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Kaštonų g. 8",
    "addressLocality": "Didžiosios Riešės k.",
    "addressRegion": "Vilniaus r. sav.",
    "postalCode": "14261",
    "addressCountry": "LT"
  },
  "areaServed": { "@type": "Country", "name": "Australia" },
  "parentOrganization": { "@id": "https://ideaswood.eu/#organization", "name": "IdeasWood", "url": "https://ideaswood.eu/" },
  "sameAs": ["https://ideaswood.eu/", "https://ideaswood.com/"]
}
</script>
```
Postal code 14261 is taken from the ideaswood.eu schema [CHECK]. Do not add an Australian address unless a real one exists (Step 0.1). Do not use @type LocalBusiness/Store for Australia. Validate at https://validator.schema.org/.

## Step 4 – Language and hreflang (day 2)
1. **html lang is "en-US" on every page.** https://timberescapes.com.au/wp-admin/options-general.php → Site Language: **English (Australia)**. This changes `<html lang>` to en-AU and WooCommerce strings to Australian spelling.
2. hreflang is already output (custom code, not a plugin) and the home page set is reciprocal with ideaswood.eu and ideaswood.com: en-GB/en-IE → .eu, en-US → .com, en-AU → timberescapes.com.au, x-default → .eu. Keep it. Fix:
   - Only pair pages that exist on the other domain, return 200 and are the same thing (see AUDIT §5 for broken targets). AU-only pages (/granny-flats/, /log-cabins-australia/, the other new landing pages, /smm/, /contact-us-2/, cart, checkout) get **no hreflang at all**, only a self-canonical.
   - The same set must appear on the .eu and .com equivalents (reciprocal), otherwise Google ignores it. Coordinate with the .eu Mac session (seo/fixes/07-cross-domain-hreflang.md); ideaswood.com.au is NOT part of the set (it does not resolve – see AUDIT §2).
3. Self-referencing canonicals are already correct; keep them.

## Step 5 – Remove or noindex the leftovers (day 2)
1. **/smm/** (page 5607, a second home-page draft with "Global Leader", "we design, manufacture", "sustainability", staff bios naming ideaswood.eu): https://timberescapes.com.au/wp-admin/post.php?post=5607&action=edit → move to Draft (or Rank Math noindex) and remove from sitemap.
2. **/about-us/** (page 1384): https://timberescapes.com.au/wp-admin/post.php?post=1384&action=edit → remove "manufactured in Lithuania", "One of Our Modern and Innovative Factories", "production capacity of up to 100 trucks per month", "3200 m³ of structures production per month", "manufacturing process", "Environment protection", "Leading Supplier", "browse the full European range with current prices at ideaswood.eu", "Stock items ready to ship" (unverified for AU). Replace with the About text in seo/content/22 §2, reworded to supplier/exporter only [CHECK before publishing].
3. **/high-quality-windows-and-doors/** (post 77) and **/highest-quality-windows-and-doors/** (page 1339): duplicate topic, and both make banned claims ("Our own produced", "CE certified", "Siberian or North Europe", "energy savings", "sustainably managed forests, making them an eco-friendly choice", "Ideaswoood"). Keep page 1339, rewrite it without those claims, 301 the post /high-quality-windows-and-doors/ → /highest-quality-windows-and-doors/ (Rank Math → Redirections).
4. **/insulation-kits-on-all-models-available/** (page 1411): remove "Energy Efficiency … helping the environment", "promotes sustainability". Keep the fact: insulation kits are available as an option, priced separately.
5. **/the-ultimate-log-cabin-guide/** (post 5532): remove "sustainable materials", "At IdeasWood" (inconsistent brand), "expert guidance". Add a link to /log-cabins-australia/.
6. Footer phone/email/address consistent with Step 0.

## Step 6 – Create the 8 landing pages (days 3-10)
Pages → Add New: https://timberescapes.com.au/wp-admin/post-new.php?post_type=page. Slug exactly as below. Paste title/meta into Rank Math, H1 as the only H1, body and FAQ (Rank Math FAQ block). Embed the product grid named in each file (Divi "Shop" module filtered by category ID).
| Slug | Copy file | Product grid (product_cat ID) |
|---|---|---|
| /log-cabins-australia/ | COPY/01-log-cabins-australia.md | log-cabins (207) |
| /granny-flats/ | COPY/02-granny-flats.md | new product tag "granny-flat" [CHECK models] |
| /garden-offices/ | COPY/03-garden-offices.md | garden-office-houses (152) |
| /barrel-saunas/ | COPY/04-barrel-saunas.md | barrels-sauna (71) |
| /outdoor-saunas/ | COPY/05-outdoor-saunas.md | outdoor (66) |
| /wood-fired-hot-tubs/ | COPY/06-wood-fired-hot-tubs.md | hot-tub (26) |
| /timber-pergolas/ | COPY/07-timber-pergolas.md | wooden-pergola (74) |
| /timber-garages-carports/ | COPY/08-timber-garages-carports.md | garages-carports (206) |
Then Appearance → Menus https://timberescapes.com.au/wp-admin/nav-menus.php: make each top-level menu item link to its landing page (Log cabins → /log-cabins-australia/, Sauna → /outdoor-saunas/, Hot Tub → /wood-fired-hot-tubs/, Pergola → /timber-pergolas/), keep the categories as sub-items. Add "Granny flats" and "Garden offices" as items.

## Step 7 – Retitle the categories so they do not compete (day 10)
Products → Categories → edit term: https://timberescapes.com.au/wp-admin/term.php?taxonomy=product_cat&tag_ID=<ID>&post_type=product. Rank Math title + meta, and a 2-sentence description with a link up to the landing page.
| ID | Category | Rank Math title | Meta description |
|---|---|---|---|
| 207 | log-cabins | Log Cabin Models and Sizes | Timberescapes | All log cabin kits in our Australian range with sizes, wall thickness and prices in AUD. Plan changes in 3D; freight quoted per order. |
| 152 | garden-office-houses | Garden Office Models | Timberescapes | Garden office and studio kits with sizes and AUD prices. Insulation is an option; freight to your address is quoted per order. |
| 71 | barrels-sauna | Barrel Sauna Models | Timberescapes | Barrel sauna kits, 1.7 m and 5.9 m long, Ø 1.97 m, 44 mm timber. Prices in AUD, glass back optional, freight per order. |
| 70 | sauna-pods | Sauna Pod 2.4 × 1.9 m | Timberescapes | A compact outdoor sauna pod in pine with 44 mm walls and a glazed door. Kit price in AUD, freight quoted to your address. |
| 26 | hot-tub | Hot Tub Models and Options | Timberescapes | Round, double and square timber hot tubs with fibreglass or acrylic liner. Prices in AUD; options and freight on the quote. |
| 74 | wooden-pergola | Wooden Pergola Models | Timberescapes | 3x3, 3x4 and 4x4 m timber pergola kits and wall-mounted versions with prices in AUD. Freight to your address per order. |
| 206 | garages-carports | Garage and Carport Models | Timberescapes | Pine garage kits from 3.2x5.2 m to 7x5.5 m and a garage + carport combo. Prices in AUD, freight quoted per order. |
| 23 | bbq-grill-cabin | Grill Cabins and BBQ Huts | Timberescapes | Timber grill cabins from 4.5 to 16.5 m² built around a central barbecue, plus grill sets. AUD prices, freight per order. |
| 79 | grill-cabins-grill-cabins | Grill Cabin Kits | Timberescapes | Enclosed timber grill cabin kits in several floor areas. Kit prices in AUD; options and freight quoted separately. |
| 204 | summer-house | Summer Houses in Timber | Timberescapes | Timber summer house kits for a sunny sitting room in the backyard. See sizes and AUD prices; freight quoted per order. |
| 57 | houses | Timber Kit Homes Australia | Timberescapes | Timber kit homes and log homes in spruce and pine, cut to order with assembly instructions. 3D layouts; freight per order. |
| 61 | timber-frame-houses | Timber Frame House Kits | Timberescapes | Timber frame house kits with plans you can adjust in 3D. Kit prices in AUD; insulation and freight quoted separately. |
"summer houses" ranks 6.6: change only the title/meta there, do not change its URL or remove existing text.
Grill cabins (pos 15.9): add a 120-150 word intro to term 23 [CHECK sizes against products: 4.5, 6.9, 7, 9.2, 14.9, 16.5 m²].
Also move "Camping Pod 3 x 5.9 m" out of Sauna pods (70) into Camping houses (20) unless it is sold as a sauna [CHECK]; move "Hot tub with outside firewood stove" and "Double hot tub" out of "Electric heater" (75) into the correct heater category.

## Step 8 – Product data fixes (days 10-14)
Products → All products https://timberescapes.com.au/wp-admin/edit.php?post_type=product:
1. "People 4-Feb" on sauna pages (Excel turned "2-4" into a date): Sauna barrel 1.7 m, Sauna Pod, Sauna Nova and any other product with the attribute → correct value [CHECK].
2. Garage spec tables show unit-less imperial figures (e.g. Garage 6x6 m "Internal house area 228", "Wall height 7.3144") → replace with metric or hide [CHECK].
3. Hot tubs: spec says "Red Canadian cedar" and "People 10" but options offer spruce/thermo/WPC and 4-6 / 6-8 people → align. Square hot tub option label "Choose how the sauna is heated" → "Choose how the tub is heated". Fix typos "chimeney", "spa hud", "Standart set", "Ideaswoood", "Catagories".
4. Sauna Nova shows two conflicting size blocks (2.39 x 3.34 m and 5 x 3 m) → keep the correct one [CHECK].
5. Product titles: the template prints the product H1 twice on product pages (two H1s). Divi Theme Builder product template → keep one H1.
6. Product meta descriptions are the first spec line ("Description: Tongue and groove floor…"). After Rank Math, set the product description template to `%title% timber kit: %excerpt% Price in AUD, freight quoted to your address.` and write unique meta for the top 20 products first.

## Step 9 – Search Console and analytics (day 2, then weekly)
1. Search Console (property timberescapes.com.au): submit https://timberescapes.com.au/sitemap_index.xml; remove the old /wp-sitemap.xml.
2. URL Inspection → Request indexing for /, the 8 new pages and the retitled categories as they go live.
3. Settings → International targeting is gone in GSC; rely on en-AU lang, AUD prices, hreflang.
4. Google Business Profile: only if a real Australian address exists [CHECK]. Do not create one for the Lurg/Tasmania addresses unless they are real premises.

## Step 10 – Report back
Append to seo/COORDINATION.md: date, "Mac session timberescapes", each URL changed, before → after. The cloud session will re-crawl and verify.
