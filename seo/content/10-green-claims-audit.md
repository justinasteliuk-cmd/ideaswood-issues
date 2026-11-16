# Green claims audit and rewrites (ideaswood.eu and the other IdeasWood sites)

Status 2026-11-16. Legal reading is a risk reading, not legal advice. No primary legal text could be opened from the cloud session; see seo/research/green-claims-eu-uk.md for sources and open points.

## What changed in the law (short)
- EU consumer rules (Directive 2024/825, "EmpCo") apply from 27 September 2026, to sales to consumers. Generic environmental claims such as "eco-friendly", "green", "sustainable", "ecological", "climate friendly" are banned unless the seller shows recognised excellent environmental performance (for example an EU Ecolabel) or specifies the claim clearly on the same page. Claims that a whole product is eco when only a part is, carbon-neutral claims based on offsetting, and self-made "eco" labels are banned too. Lithuania's transposing law: number and date not confirmed.
- UK: not covered by the EU rules. The CMA can fine up to 10% of turnover since April 2025, and the ASA applies its environmental-claims rules.
- The EU Green Claims Directive is not in force. Do not say it is.
- The LinkedIn message about 27 September is broadly right about the rule. The tool it sells (GreenClaimFix) could not be verified. Nobody needs it: the check is a text search, done below and by Astra. Do not give access to the shop to an unknown tool.

## What we found on the live site (from page backups taken 2026-10-26)
| Where | Claim now | Risk |
|---|---|---|
| Home page | "With a focus on craftsmanship, sustainability, and innovation" | Generic |
| Home page | "producing durable, eco-friendly, and stylish wooden structures" | Generic, banned wording |
| Home page | "strongly committed to sustainability and ecological responsibility ... environmental care" | Generic |
| Home page | "an energy-efficient environment that reduces heating costs" | Needs a measured value or removal |
| Home page | "made from sustainably sourced Nordic timber, grown in managed forests for optimal strength and minimal environmental impact ... a renewable, carbon-storing material that supports a greener planet" | Highest risk: "sustainably sourced", "minimal environmental impact", "greener planet" all generic, and implies the cabin stores carbon |
| Koralan post (13160) | "Eco-friendly, non-toxic design", "Eco-friendly formula with low VOC", "Non-toxic after curing", "Food-contact safe", "Complies with EU Biocidal Products Regulation" | Generic word plus safety claims; each needs the manufacturer's safety data sheet |
| Insulation post (6392) | "reduced carbon footprint" | Unspecified |
| Australia landing page | Title/H1 "Eco Scandinavian Wooden Houses in Australia" | "Eco" in a title is a generic claim |
| Product pages | An image named "eco-vs-pre" sits at the top of every product page | If a product option is called "Eco", that name is a generic claim. Check what it says. |
Only 60 pages were not scanned by us; a full scan of all pages, posts and 464 products must be done in the shop (Astra).

## Rewrites (home page; facts only)
1. "With a focus on craftsmanship, sustainability, and innovation, we serve customers across Europe, the UK, the USA and Australia." becomes "With a focus on craftsmanship and innovation, we serve customers across Europe, the UK, the USA and Australia."
2. "...producing durable, eco-friendly, and stylish wooden structures for residential and commercial use" becomes "...producing durable, stylish wooden structures from Nordic spruce and pine for residential and commercial use."
3. "We are strongly committed to sustainability and ecological responsibility. Our focus on speed, environmental care, and exceptional client service ensures..." becomes "Our focus on speed and exceptional client service ensures..." (remove the two clauses).
4. "...you'll enjoy an energy-efficient environment that reduces heating costs and enhances comfort all year long." becomes "...with double-glazed windows and precision-cut timber walls, helping keep the space warm in winter and cool in summer."
5. "Every Ideaswood cabin is made from sustainably sourced Nordic timber, grown in managed forests ... greener planet." becomes "Our cabins are built from Nordic spruce and pine. Wood is a natural, renewable material." Add one more sentence only if the document exists: "Our timber is [FSC / PEFC] certified (licence [number])." or "Our timber comes from [country or region]."

## Rewrites (other pages)
- Koralan post: remove "Eco-friendly" in both places. Keep "Low volatile organic compound (VOC) content" only with the figure from the product's safety data sheet. Keep "non-toxic", "food-contact safe" and "complies with BPR" only if the safety data sheet or the technical data sheet says exactly that; otherwise delete. Ask a lawyer about the biocide advertising statement that the Biocidal Products Regulation requires.
- Insulation post: "lower power bills and a reduced carbon footprint" becomes "so your heater runs less often".
- Australia landing page: title and H1 "Scandinavian Wooden Houses in Australia" (drop "Eco").
- Any product option or line called "Eco": rename it (Standard, Basic or Economy) if it is a price tier.

## Words to avoid and words that are safe
| Avoid (unless a certificate or specific proof sits next to it) | Safe, if true |
|---|---|
| eco, eco-friendly, environmentally friendly, green, ecological, climate friendly, nature friendly, sustainable, sustainably sourced, carbon neutral, carbon storing, minimal environmental impact | Nordic spruce / Scots pine, kiln-dried (if true), CNC-machined, 44 / 58 / 68 mm logs, double glazed, insulated, treated with [named product], FSC or PEFC certified with licence number (only if you hold it), timber from [country] (only if documented) |
| biodegradable, recyclable (for the cabin) | "Wood is a natural, renewable material" |
| "energy efficient" | A measured value, e.g. "U-value 0.xx W/m²K", only with a test report |
Formula: feature + fact + source. For example: "Spruce logs, 44 mm thick, kiln-dried" is a fact. "Eco-friendly spruce logs" is not.
The text suggested in the chat you pasted has some risky words of its own: "responsibly sourced", "biodegradable", "recyclable timber", "chemical-free". Do not use them without proof.

## What Justinas needs to provide (documents, not opinions)
1. Do you hold an FSC or PEFC chain-of-custody certificate? Licence number and scope, or "none".
2. Which country or region does your timber come from, and do you have supplier records?
3. The safety data sheet and technical data sheet for Koralan UK 110 and any other treatment product you describe.
4. Any U-value or other test report for the insulated models.
5. What the "eco-vs-pre" image on product pages shows.
Until these exist, the safe route is to delete the claim, not to replace it with a softer-sounding one.

## For Astra (all five IdeasWood sites)
1. Search all pages, posts, products, categories, menus, widgets, theme builder templates, meta descriptions, image alt text and Rank Math titles for: eco, eco-friendly, ecological, environment, environmentally, green, sustainab, climate, carbon, renewable, biodegrad, recycl, natural, non-toxic, chemical-free, responsibl, FSC, PEFC. Include the 464 products.
2. List every hit with URL and exact sentence in ASTRA-STATUS-ideaswood-green.md, with a proposed fix from the tables above.
3. Apply fixes where the replacement is in the tables above and needs no new fact. For a replacement that needs a document, apply only the deletion of the generic claim.
4. Back up every edited body first (UpdraftPlus DB copy is enough), keep an undo, and do not change prices, products or user accounts.
5. Repeat on ideaswood.com, timberescapes.com.au, logcabinsfactory.com, abitazionidilegno.it and wiseideas.eu, using the same wording rules.
