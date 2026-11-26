# Edits for /log-cabin-planning-permission-uk/ (page ID 18376)

The live page was read on 2026-11-24 with `curl -A ''`. It is a plain WordPress page: the content area (`<div class="entry-content">`) has no Divi Builder modules (`et_pb_*` appears only in the Theme Builder header and footer). The body has no `et_pb_pagebuilder_layout` class. The content is plain HTML: `h2`, `h3`, `p`, `ol`, `ul` and 4 `<table>` elements. The theme prints the H1 from the page title. Rank Math outputs WebPage and Article schema (dateModified 2026-10-26). There is no FAQ schema yet.

Live order of sections:

1. Intro paragraph + "Last checked" line
2. The short answer (table)
3. Permitted development rules for outbuildings in England (ol, 8 rules)
4. Building regulations (different from planning) (table + 2 paragraphs)
5. Which of our buildings fit under 2.5 m? (h3 Smart Line cabins + h3 Other garden cabins and studios, two long product tables)
6. Checking your own garden
7. Official guidance
8. Planning permission questions (6 paragraphs, `<p><strong>Q</strong> A</p>`)

Make the edits in the Text/Code editor (see README.md). Find each "old" text with Ctrl+F. In the editor, curly quotes may show as `&#8217;` or as the plain character.

---

## Edit 1: page title (H1), SEO title, meta description

See new-title-meta.txt. Change the page title field (this changes the H1). Change the Rank Math title and description. Do not change the slug.

## Edit 2: intro paragraph (first `<p>`)

Old:
```
This guide covers England only. Rules in Scotland, Wales, Northern Ireland and Ireland differ; see the links at the end.
```
New:
```
This guide covers England in detail, with short sections on holiday lets, Scotland, Wales and Northern Ireland. Rules in Ireland differ; see the links at the end.
```

## Edit 3: "Last checked" line (second `<p>`, directly under the intro)

Replace the whole paragraph:
```
<p><em>Last checked: 26 October 2026, against the Planning Portal outbuildings guidance, the government&#8217;s permitted development technical guidance for householders and Schedule 2 of the Building Regulations 2010. This is general guidance, not legal advice.</em></p>
```
with:
```
<p><em>Last checked: 24 November 2026, against the Planning Portal outbuildings guidance, Class E of the General Permitted Development (England) Order 2015, Schedule 2 of the Building Regulations 2010, the National Planning Policy Framework (August 2026), Scottish Government guidance on householder permitted development and short-term lets, the Scottish building standards technical handbook (April 2026), and legislation.gov.uk for Wales and Northern Ireland. This is general guidance, not legal advice. Rules change; check with your local planning authority before you buy or build.</em></p>
```
If you publish on a later date, change "24 November 2026" to the publishing date.

## Edit 4: insert the 8 new sections (sections.html, BLOCK A)

Position: after the last paragraph of "Building regulations (different from planning)", which begins
`<p>Electrical work in a garden, shed or other outbuilding must meet the building regulations.`
and directly **before**
`<h2>Which of our buildings fit under 2.5 m?</h2>`

Paste everything in sections.html from the `BLOCK A` comment down to (not including) the `BLOCK B` comment.

This also covers fix 8 in 04b: the long product tables now come after the holiday-let, Scotland and building-regulations answers. If you prefer, cut the whole "Which of our buildings fit under 2.5 m?" section (its h2, intro paragraph, both h3 headings and both tables) and paste it just before `<h2>Checking your own garden</h2>`. The result is the same order.

## Edit 5: short-answer table and designated-land wording

5a. In "The short answer" table, change the designated-land row text:

Old:
```
<td>Cabin on designated land (National Park, the Broads, Area of Outstanding Natural Beauty, conservation area or World Heritage Site)</td>
```
New:
```
<td>Cabin on designated land (National Park, the Broads, Area of Outstanding Natural Beauty (National Landscape), conservation area or World Heritage Site)</td>
```

5b. Add two rows directly after the row `Cabin used as a separate home, or as a bedroom, bathroom or kitchen` / `Yes`. That is after its closing `</tr>`:
```
<tr>
<td>Cabin let to holiday guests (see <a href="#holiday-let">holiday lets</a>)</td>
<td>Yes</td>
</tr>
<tr>
<td>Cabin on farmland for guests or to live in (see <a href="#agricultural-land">agricultural land</a>)</td>
<td>Yes</td>
</tr>
```
(Sources: holiday let [2] [3]; farmland [21].)

5c. In "Permitted development rules for outbuildings in England", rule 7 (Designated land):

Old:
```
In National Parks, the Broads, Areas of Outstanding Natural Beauty and World Heritage Sites,
```
New:
```
In National Parks, the Broads, Areas of Outstanding Natural Beauty (National Landscapes) and World Heritage Sites,
```

## Edit 6: replace the FAQ (faq.html)

Delete from `<h2>Planning permission questions</h2>` down to and including the paragraph that starts `<p><strong>Not sure your plan fits?</strong>`. That is the last paragraph before the closing `</div>` of entry-content. Paste all of faq.html in its place, including the `<script type="application/ld+json">` block at the bottom.

What changes: 5 new questions at the top. The live "Can I put a log cabin at the bottom of my garden without permission?" is merged into "Do I need planning permission for a log cabin in my garden?", which keeps its 2.5 m sentence. Office, sleep, sauna/garage and foundation are kept word for word. The contact-page CTA gains "check with your local planning authority". The questions are now `<h3>` + `<p>`. The JSON-LD has only these 9 visible questions.

If Rank Math's own FAQ block or schema is added later, remove the JSON-LD here so the page does not carry two FAQPage blocks.

## Edit 7: sources list (sections.html, BLOCK B)

Paste BLOCK B (`<h2 id="sources">Sources for this guide</h2>` to the end of sections.html) at the very end of the content, after the FAQ block from edit 6. The `[n]` links in the new sections and FAQ jump to it.

## Edit 8: Official guidance list

Add these `<li>` items to the existing `<ul>` under `<h2>Official guidance</h2>`, after the "find your local planning authority" item and before the "Scotland:" item:
```
<li>GOV.UK: <a href="https://www.gov.uk/guidance/letting-out-a-self-catering-holiday-home-in-england-rules-and-regulations" rel="noopener" target="_blank">letting out a self-catering holiday home in England</a></li>
<li>GOV.UK: <a href="https://www.gov.uk/guidance/national-planning-policy-framework" rel="noopener" target="_blank">National Planning Policy Framework (August 2026)</a></li>
<li>gov.scot: <a href="https://www.gov.scot/publications/circular-1-2024-householder-permitted-development-rights/pages/4/" rel="noopener" target="_blank">Circular 1/2024, householder permitted development rights</a></li>
<li>gov.scot: <a href="https://www.gov.scot/publications/short-term-lets/pages/licensing-scheme/" rel="noopener" target="_blank">short-term lets licensing scheme</a></li>
```
Leave the existing gov.wales and nidirect links as they are.

## Edit 9: schema date

After saving, check that Rank Math's Article/WebPage `dateModified` shows the publishing date (WordPress updates it on save). Then purge the LiteSpeed cache for this page and re-fetch it with `curl -A '' https://ideaswood.eu/log-cabin-planning-permission-uk/` to confirm:
- one `<h1>` with the new title
- 8 new `<h2>` sections before "Which of our buildings fit under 2.5 m?"
- "Last checked: 24 November 2026"
- a FAQPage `application/ld+json` block with 9 questions
- no visible "[CHECK]" or "[UNVERIFIED]" text: the markers are HTML comments only, so `curl` shows them in the source but browsers do not display them.

Optional: in Search Console, use URL Inspection on the page and request indexing.
