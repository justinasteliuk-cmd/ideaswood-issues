# Outdoor sauna category texts, 2026-11-21 (for Astra)

Four categories under /product-category/sauna/outdoor-sauna/. They get Google impressions at positions 65-85 for
"garden sauna cabin" (79), "wooden sauna outdoor", "outdoor sauna electric", "small garden sauna", "wooden outdoor sauna",
"sauna cabins outdoor", "barrel sauna", "outdoor barrel sauna" and "sauna pod uk" (research/gsc-real-2026-11-20.md).

| Folder | Term ID | Live URL | Focus keyword |
|---|---|---|---|
| outdoor-sauna/ | 66 | /product-category/sauna/outdoor-sauna/ | wooden outdoor sauna |
| sauna-cabins/ | 69 | /product-category/sauna/outdoor-sauna/sauna-cabins/ | garden sauna cabin |
| barrels-sauna/ | 71 | /product-category/sauna/outdoor-sauna/barrels-sauna/ | barrel sauna |
| sauna-pods/ | 70 | /product-category/sauna/outdoor-sauna/sauna-pods/ | sauna pod |

Each folder has `title-meta.txt` (live vs new; titles up to 60 characters, metas up to 155),
`intro-above-grid.html` (about 110 words, one `<p>`, no H1) and `guide-below-grid.html` (380-475 words, H2/H3 + FAQ).
No prices, brands, power ratings, heat-up times, warranty, CE/certification, origin or eco wording. Every number is
from the live listing or product pages fetched on 2026-11-21.

## What the live template does (checked 2026-11-21 by curl)
- All four pages use the same Divi Theme Builder body layout. It already prints an H1 ("Transform Your Garden with a
  Premium Outdoor Sauna") and its own text ABOVE the grid, the same on all four pages. So the intro files have no H1.
- The layout never calls `woocommerce_archive_description`, so anything in the term description BEFORE the
  `<!--iw-below-->` marker is not shown. Only the part AFTER the marker is printed, under the product grid
  (mu-plugin `iw-category-seo.php`, `<div class="term-description iw-cat-below">`).
- So with today's template, both intro and guide render BELOW the grid. The intro still goes first, so it reads as
  the opening paragraph of the block under the products.

## Paste method (wp-admin only; REST/kses strips h1/h2/h3/p/table)
1. Log in to wp-admin. Go to Products > Categories, search the category name, click Edit
   (or open `wp-admin/term.php?taxonomy=product_cat&tag_ID=<Term ID>&post_type=product`).
2. In the Description box switch to the **Text** tab (not Visual, which rewrites the HTML).
3. Select all and delete the old text. Paste exactly this order:
   ```
   <!--iw-below-->
   [contents of intro-above-grid.html]
   [contents of guide-below-grid.html]
   ```
   The marker line must be first. If the edit screen shows a second description textarea, paste the same text there too.
4. In the Rank Math box on the same screen: paste the NEW Title and Description from `title-meta.txt`, and set the
   focus keyword from the table above.
5. Click Update. Open the live URL in a private window, check the text shows under the grid with headings and links,
   and purge the LiteSpeed cache for that URL if the old text still shows.

Do this for the four terms. Leave the HTML comments `<!-- [CHECK] ... -->` in place: they are invisible and mark the
link to swap when /trade-partners/ goes live.

### When the Divi layout gets a category-description module (Saqib, Divi lane)
Then the intro can sit above the grid: paste `[intro-above-grid.html]`, then the line `<!--iw-below-->`, then
`[guide-below-grid.html]`. The template H1 should then become the category name per term, not one fixed H1.

## Internal links used
Sibling categories (barrels, pods, cabins, parent outdoor sauna), `/how-much-does-a-garden-sauna-cost/` (200),
`/thermowood-cladding-for-timber-buildings/` (barrels only), `/wellness-saunas/` (200, trade; stand-in for
`/trade-partners/`, which returns 404), `/contact-us/` (200) plus phone +370 678 22055. Address not used (no contact block).

## [CHECK] before or after publishing
1. **Same 11 products on all four pages.** The Divi Shop module shows every outdoor sauna on /barrels-sauna/,
   /sauna-pods/ and /sauna-cabins/ as well (it is not set to the current category). Duplicate content and a confusing
   grid. Saqib: set the Shop module to the current category. The texts do not say "below you see two barrels", so
   they stay correct either way.
2. **Duplicate H1 and template text** on all four pages (same H1 and FAQ incl. infrared and planning questions). The
   template text also says "efficient" ("Built to Last" slide) and the cabins live meta says "Scandinavian-style":
   both replaced in our metas; the template text needs Saqib.
3. **/trade-partners/ returns 404.** When live, swap the four `/wellness-saunas/` links marked with `[CHECK]` comments.
4. **Heater per model.** Confirmed: the 5.9 m barrel offers wood-fired or electric; Sauna S-XL list fences for
   electric heaters and wood-burning stoves and say "stove and cables/wires are not included". Not confirmed for the
   1.7 m barrel, pod, Pulse, Zen, Nova, Amber (texts say "ask us"). Is a heater ever included in the barrel/pod set?
5. **Sauna Zen data conflict:** spec table says 6.75 x 5.5 m, "Wooden Logs (44 mm)", 15.1 m², 10.3 m² covered terrace;
   its description says 2.39 x 3.34 m, panel-built (copy of Pulse). Texts give no Zen dimensions; cabins guide says
   "Zen uses 44 mm wooden logs" from the spec table: confirm.
6. **Sauna Amber:** no "People" field on the product page, so no capacity used. Add it.
7. **Economic vs Premium sets** (Sauna S-XL): difference not stated on the listing; texts only name the two sets.
8. **Sauna M and L show the same terrace (4.69 x 2.59 m)** in their descriptions; not used.
9. **Pod base "paving slabs or a small concrete slab"** comes from the live 11-06 text, not from the product page.
10. Product pages still carry a 60-month warranty, "energy efficiency" (pod) and "North spruce" wording: outside this
    task, but against the claims rules; review separately.
11. Old wall-thickness note (28/44/68 mm on the pod) is out of date: the live pod shows 44 mm walls, 28 mm floor.
