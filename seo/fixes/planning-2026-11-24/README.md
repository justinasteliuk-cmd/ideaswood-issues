# Planning guide extension, paste pack (2026-11-24)

Target: https://ideaswood.eu/log-cabin-planning-permission-uk/ (WordPress page ID 18376, edit at `https://ideaswood.eu/wp-admin/post.php?post=18376&action=edit`).

Content source: seo/content/04b-planning-guide-extension.md. Every statement was verified against official pages on 2026-11-21 (seo/research/planning-verification-2026-11-21.md). The wording here is the verified wording. Do not edit facts while pasting.

## Files

| File | What it is |
|---|---|
| new-title-meta.txt | SEO title (60 chars), meta description (148 chars), new H1 |
| sections.html | BLOCK A: the 8 new H2 sections. BLOCK B: numbered sources list `[1]`..`[27]` (original 04b numbers; gaps are dropped sources) |
| faq.html | 9 visible FAQ questions + FAQPage JSON-LD with exactly those 9 |
| edits.md | Where each block goes, the old lines to replace, the new "Last checked: 24 November 2026" line |

## Live page structure (read 2026-11-24)

- The page is **not built with Divi Builder**. `entry-content` is plain HTML (h2, h3, p, ol, ul, 4 tables). Divi modules on the page come only from the Theme Builder header and footer.
- The H1 comes from the page title field.
- SEO plugin: Rank Math. Schema: WebPage + Article only. There is no FAQPage schema yet.
- "Last checked: 26 October 2026" line sits directly under the intro paragraph.

## Paste method

Do not paste through the REST API. For users without `unfiltered_html`, WordPress kses strips `<script>` (the FAQ JSON-LD) and some attributes. Paste in wp-admin as an Administrator.

**Classic editor (most likely for this page):**
1. Open the page in wp-admin and switch to the **Text** tab. Do not use Visual.
2. Make the edits in edits.md in order: intro, Last checked, insert BLOCK A, table rows, replace FAQ, append BLOCK B, Official guidance links.
3. Update the page title (H1) and the Rank Math title/description.
4. Click **Update** without switching back to the Visual tab. The Visual tab can rewrite or drop the `<script>` block and the HTML comments.

**If the page opens in the block editor (Gutenberg):** the content will be in one Classic block. Either use the block's "Edit as HTML", or switch the whole editor to **Code editor** (top-right menu, or Ctrl+Shift+Alt+M) and make the same edits. The FAQ JSON-LD can go in a separate **Custom HTML** block at the end.

**If someone has switched the page to Divi Builder:** add a **Text** module for each block and paste into its **Text** tab, not Visual. Put the FAQ JSON-LD in a **Code** module, because the Text module may strip `<script>`. Keep the order in edits.md.

After saving: purge the LiteSpeed cache for the page. Then check with `curl -A '' <url>`, as edits.md edit 9 describes. A Mozilla user agent gets a bot challenge.

Note: Google shows FAQ rich results only for well-known government and health sites since 2023. The FAQPage markup is still valid, and it describes the Q&A for other search and AI systems. Do not expect FAQ snippets in Google results.

## Brand and wording rules applied

- IdeasWood is described only as a supplier and exporter ("IdeasWood supplies and exports garden buildings"). The pack has no factory, producer or manufacturer wording and no Nordic or eco claims.
- Every new section ends by sending the reader to the local planning authority, council, National Park authority, building control or building standards. The closing source note and the FAQ CTA say "check with your local planning authority".
- The internal links (glamping pods, trade partners) use neutral anchors and make no "planning-free" promise.
- No legal advice: the "Last checked" line and the closing source note say so.

## [CHECK] / [UNVERIFIED] markers

These markers are HTML comments (`<!-- ... -->`) in sections.html, so the page does not show them. Anyone who views the page source can see them. Delete the comments after you resolve them, or before publishing if you would rather not have them in the source.

| Marker | Where | What to do |
|---|---|---|
| [CHECK] Scotland control areas | sections.html, "two log cabins as holiday lets in Scotland", Control areas bullet | gov.scot lists Edinburgh and Badenoch and Strathspey (read 2026-11-21). The list may be incomplete. The text already tells readers to ask the council. |
| [CHECK] Scotland building warrant for a holiday-let cabin with sleeping accommodation, 8 to 30 m² | same section, Building warrant bullet | Not researched. The text makes no claim. Readers are sent to building standards. |
| [CHECK] AONB section is England only | top of "Holiday log cabins in an AONB or National Park" | Scotland's National Scenic Areas were not researched. Do not extend this section to Scotland without a source. |
| [CHECK] Wales and NI sourced to legislation.gov.uk only | top of "Wales and Northern Ireland in brief" | gov.wales and nidirect could not be opened on 2026-11-21. Optional re-check. |
| [UNVERIFIED] Gwynedd / Eryri Article 4 direction and the November 2025 court decision | same place | Removed from the text. Add it only after reading the council or gov.wales page. |

## Spot check on 2026-11-24

Re-fetched today with `curl -A ''`:
- GOV.UK holiday-let page still says "not yet in force" and "expected to begin in March 2027".
- The C5 consultation still says "We are analysing your feedback".
- The NPPF still shows "Published: 17 August 2026, Last updated: 29 September 2026", and policy N4 wording is unchanged.
- The Planning Portal outbuildings page still has the "separate self-contained living accommodation" and 20 m / 10 m² wording.

The gov.scot page returned an empty HTTP 202 (bot challenge), so the Scotland figures rest on the 2026-11-21 check.

## Not in this pack

- Internal link targets checked live: https://ideaswood.eu/glamping-pods/ (200) and https://ideaswood.eu/trade-partners/ (200).
- Nothing was published or committed. The live page is unchanged.
