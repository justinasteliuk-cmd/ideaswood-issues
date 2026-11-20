# AI search visibility (GEO) for ideaswood.eu, as of 2026-11-20

Extends section 4 of `research/best-practices-2026.md` (Google needs no special files, llms.txt is speculative, Ahrefs top-10 overlap, YouTube correlation, Surfer first-paragraph finding, On-Page.ai DR finding). Those points are not repeated here.

**Method and limits.** WebSearch only, 2026-11-20. WebFetch failed (DNS blocked) for developers.google.com and ppc.land, so no primary page was read in full. Statements from vendor docs (OpenAI, Anthropic, Perplexity, Bing) come from search-result extracts of those docs. Marks: **[DOC]** = vendor's own documentation (seen as extract), **[STUDY]** = published dataset, usually by an SEO vendor, correlation only, **[SECONDARY]** = news or blog, **[UNVERIFIED]** = single or conflicting source, check before relying on it.

**Starting point.** The owner says prospects already found IdeasWood through ChatGPT and Gemini. So the site is crawlable and known to at least the Bing/OpenAI and Google stacks. The work below makes that repeatable for the right questions, and correct (supplier and exporter, not a factory; right address and phone).

---

## 1. How each platform picks sources

| Platform | Where answers come from | What we control | Confidence |
|---|---|---|---|
| ChatGPT search | OAI-SearchBot crawl plus "third-party search providers". OpenAI names Bing (and Shopify for products). Third parties claim OpenAI also runs its own index and has drawn on Google results. | Allow OAI-SearchBot; be indexed in Bing; product feed later. | Bing role [DOC]; own index / Google [UNVERIFIED, conflicting] |
| Google AI Overviews / AI Mode | Normal Google index plus a Gemini model, "query fan-out" (many sub-searches). | Be indexed and rank in Google; cover the sub-questions on our pages. | [DOC] (Google AI features page, via extract) |
| Gemini app | Grounding with Google Search: the model writes one or more searches and cites results. Google-Extended token controls Gemini training and grounding outside Search. | Google index; do not block Google-Extended. | API docs [DOC]; consumer app details [UNVERIFIED] |
| Perplexity | Own crawler PerplexityBot (search, not training) plus live fetch Perplexity-User. Studies report strong weight on fresh pages and authoritative/news domains; Reddit share varies a lot by study. | Allow PerplexityBot; keep key pages updated and dated. | Bots [DOC]; freshness [STUDY, vendor] |
| Microsoft Copilot | Bing index; no separate Copilot crawler, Bingbot does the work. IndexNow is one of Bing's discovery signals. | Bing Webmaster Tools, IndexNow, Bing Places. | [DOC] via extract |
| Claude | Claude-SearchBot (search index), Claude-User (user-triggered fetch), ClaudeBot (training). All three honour robots.txt; each needs its own rule. | Allow Claude-SearchBot and Claude-User. | [DOC] |

### Evidence notes
- **ChatGPT and Bing.** Early SEMrush data (via Seer) found almost all ChatGPT search citations tied to a Bing organic result; later analyses found low overlap with both Bing and Google top 10 (Ahrefs, ~11%), and one analyst saw Bing overlap fall and Google overlap rise during 2025. OpenAI itself only says "third-party search providers such as Bing". **Practical reading:** being well indexed in Bing is still the cheapest lever for ChatGPT and the only lever for Copilot, but it is not a ranking guarantee. https://www.seerinteractive.com/insights/87-percent-of-searchgpt-citations-match-bings-top-results , https://ahrefs.com/blog/ai-search-overlap/ , https://www.seroundtable.com/bing-powers-chatgpt-search-38345.html , https://peec.ai/blog/chatgpt-built-its-own-search-index [UNVERIFIED own-index claim], https://www.practicalecommerce.com/googles-index-now-powers-chatgpt [UNVERIFIED]
- **ChatGPT shopping / product feeds.** A merchant portal (chatgpt.com/merchants) exists; sources conflict on whether EU merchants can submit feeds yet, and one vendor says shopping placements became feed-only on 4 Sep 2026. Watch, do not build now. https://www.lengow.com/integrations/chatgpt , https://commonthreadco.com/blogs/coachs-corner/chatgpt-ads-september-2026-product-feeds-now-required-platform-expands-globally-and-the-new-tools-ecommerce-brands-need-right-now [UNVERIFIED]
- **Bing AI Performance report.** Bing Webmaster Tools shows citations in Copilot and Bing AI answers, with the "grounding queries" (fan-out queries) behind them and cited pages; public preview since Feb 2026; June 2026 added Intents, Topics, Citation Share, Compare. No clicks, no ChatGPT data. This is the only first-party AI citation report available to us. https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview , https://blogs.bing.com/search/June-2026/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare
- **Google opt-out control (UK CMA).** The CMA required Google to offer publishers an opt-out from AI Overviews / AI Mode without a ranking penalty; Google said it is testing a Search Console toggle with some UK sites. **We want the opposite: never switch it on.** https://siliconangle.com/2026/06/03/uk-orders-google-provide-ai-overviews-opt-option-publishers/ , https://thenextweb.com/news/uk-forces-google-to-let-publishers-opt-out-of-ai-search-results-without-losing-their-ranking [SECONDARY; rollout status unknown]
- **Schema.** Ahrefs' May 2026 experiment (1,885 pages adding JSON-LD vs controls) found no meaningful citation uplift on any platform (ChatGPT +1.2%, noise). Caveat: all test pages were already cited; schema may still help a little-known site get parsed and its entity understood. So: Organization schema is worth the 30 minutes for entity consistency, not as a citation lever. https://ahrefs.com/blog/schema-ai-citations/ , https://www.seroundtable.com/study-schema-citations-study-41311.html
- **Brand mentions beat links.** Ahrefs 75K-brand study, updated to cover ChatGPT, AI Mode and AI Overviews: branded web mentions correlate 0.66-0.71 with AI visibility; backlinks ~0.22. Correlation only; being mentioned is not the same as being cited. https://ahrefs.com/blog/ai-brand-visibility-correlations/ [STUDY]
- **Most-cited domains.** Reddit, Wikipedia and YouTube lead most 2026 datasets, but shares range from ~11% to ~40% depending on method; Reddit's share of ChatGPT citations reportedly dropped sharply in Aug 2026. Directional only. https://aisearch.similarweb.com/blog/most-cited-domains-llms/ , https://ahrefs.com/blog/most-cited-domains-ai-overviews/ , https://www.emarketer.com/content/reddit-geo-crackdown-could-raise-stakes-ai-visibility-strategies [STUDY/SECONDARY]
- **Product pages for B2B.** One agency (single client base) found product pages earned ~6x more B2B AI citations than Reddit. Suggests our own product and trade pages matter more than forum work for trade buyers. https://www.searchenginejournal.com/product-pages-get-24-of-ai-citations-reddit-youtube-4/ [STUDY, small]
- **llms.txt.** Ahrefs (137K domains, May 2026): 97% of llms.txt files got zero requests; retrieval bots barely asked for them. Confirms "low value, harmless". https://ahrefs.com/blog/llmstxt-study/

---

## 2. Crawlers: what to allow and what happens if you block

The live robots.txt (`fixes/03b`) has `User-agent: *` with only cart/checkout/account/filter disallows, so **every bot below is already allowed by robots.txt**. The real risk is a firewall, CDN or security plugin blocking them by user agent or rate (QUIC.cloud / LiteSpeed bot protection, Wordfence, Cloudflare if ever added). Cloudflare blocks AI training and agent bots by default for new zones since July 2025. https://www.technologyreview.com/2025/07/01/1119498/cloudflare-will-now-by-default-block-ai-bots-from-crawling-its-clients-websites/

| Token | Owner, purpose | If blocked | Recommendation |
|---|---|---|---|
| Googlebot | Google Search index; feeds AI Overviews, AI Mode and Gemini grounding | Out of Google and all Google AI answers | Allow (essential) |
| Google-Extended | Not a crawler, a control token: Gemini training and grounding outside Search. Does not affect Search or AI Overviews [DOC, via extract] | Gemini app / Vertex grounding may not use our pages | Allow |
| Bingbot | Bing index; feeds Copilot and is a named provider for ChatGPT | Out of Bing, Copilot, likely weaker in ChatGPT | Allow (essential) |
| OAI-SearchBot | OpenAI search index | Pages not shown in ChatGPT search answers [DOC] | Allow (essential) |
| ChatGPT-User | Fetch when a user asks ChatGPT to open a page; OpenAI says robots.txt may not apply and it is not used for search inclusion [DOC] | Little effect via robots.txt; a firewall block breaks live lookups | Allow |
| GPTBot | OpenAI training crawler | Future models know less about IdeasWood (brand facts in model memory); no effect on ChatGPT search [DOC] | Allow (we want the brand known; owner decision) |
| PerplexityBot | Perplexity search index, not training [DOC] | Not cited in Perplexity | Allow |
| Perplexity-User | User-triggered fetch; Perplexity says it generally ignores robots.txt [DOC, extract truncated] | n/a | Allow |
| Claude-SearchBot | Claude search index | Less visible / less accurate in Claude answers [DOC] | Allow |
| Claude-User | Claude user-triggered fetch; honours robots.txt [DOC] | Claude cannot open our pages for users | Allow |
| ClaudeBot | Anthropic training | Future Claude models know less about us | Allow |
| Applebot / Applebot-Extended, CCBot (Common Crawl, used by many model builders), DuckAssistBot, Meta-ExternalAgent | Other assistants and training sets | Smaller effect each | Allow (no action needed under `*`) |

OpenAI says robots.txt changes take ~24 h to apply. https://developers.openai.com/api/docs/bots , https://support.claude.com/en/articles/8896518 , https://docs.perplexity.ai/docs/resources/perplexity-crawlers.md , https://blog.cloudflare.com/perplexity-is-using-stealth-undeclared-crawlers-to-evade-website-no-crawl-directives/ (Cloudflare allegation, not relevant to us since we allow).

Exact lines and verification: `fixes/03c-robots-ai-bots.md`.

---

## 3. Bing Webmaster Tools and IndexNow

- Rank Math has IndexNow built in (Bing announced it in 2022); it creates and hosts the key and pings Bing/Yandex on publish/update. Google does not use IndexNow. https://blogs.bing.com/webmaster/february-2022/Rank-Math-Supports-IndexNow-for-WordPress-Sites
- Microsoft lists IndexNow as one of Bing's discovery signals; there is no direct ChatGPT IndexNow channel. Claims that IndexNow "gets you into ChatGPT" are [UNVERIFIED]. https://eseospace.com/blog/bing-webmaster-tools-indexnow-ai-search/
- Value for us: our new pages (trade partners, delivery, glamping, company facts) reach Bing within hours instead of weeks, which then feeds Copilot and likely ChatGPT. Effort: under an hour. Checklist in `fixes/03c`.
- **Bing Places for Business** with the same NAP: Copilot answers local/company questions from Bing's business data [UNVERIFIED for Copilot specifically, but low effort].

---

## 4. Entity consistency (the thing AI gets wrong most)

AI answers stitch a company description from many sources. If sources disagree, the model guesses. Current risks seen in audit 03 and the ledger:
- Several names and handles: IdeasWood, Ideaswood, "Log Cabins Factory" (Facebook logcabinsfactory), two Instagram handles, ideaswood.com, ideaswood.com.au, factory.ideaswood.eu, and an unrelated Australian "IdeasWood" and "A Wood Idea" in brand results.
- Wording: older pages and schema said manufacturer/factory; the rule since 2026-11-20 is "supplier and exporter".

Do:
1. **One canonical fact set** (content/23) and copy it word for word into: website footer, /company-facts/ page, Organization schema, Google Business Profile, Bing Places, Facebook/Instagram/LinkedIn/YouTube "About", Trustpilot, B2B directories (content/07).
   - Name: IdeasWood
   - Address: Kaštonų g. 8, Didžiosios Riešės k., Vilniaus r. sav., Lithuania [postcode: copy from footer]
   - Phone: +370 678 22055
   - Founded: 2007
   - One-line description: "IdeasWood is a Lithuanian supplier and exporter of log cabins, garden rooms, saunas and camping pods, selling to private buyers and to B2B resellers."
2. **Organization schema** with `@id`, `foundingDate`, `address`, `telephone`, and `sameAs` listing every official profile (Facebook, Instagram, LinkedIn, YouTube, later Trustpilot, GBP/Maps URL). Schema is a consistency signal, not a citation lever (see section 1). Remove any `Manufacturer` type (done) and do not add ratings to Organization.
3. **Disambiguate** from the Australian IdeasWood and A Wood Idea in the facts page ("IdeasWood (ideaswood.eu) is based in Lithuania"). Decide what ideaswood.com and factory.ideaswood.eu are (audit 03); a second site with different facts is the biggest entity-confusion risk.
4. **Check what AI already believes**: run the brand prompts in `research/ai-visibility-test-prompts.csv` (rows "what is IdeasWood", "is IdeasWood legit") and log wrong facts. Wrong facts usually trace to an old page or profile; fix the source, not the AI.

---

## 5. Page structure that gets quoted

Practitioner consensus plus the Surfer/Perplexity finding (section 4 of best-practices): pages that answer in the first paragraph and keep facts in short, self-contained sentences get lifted into answers. Not proven by controlled tests; cheap to do and good for people too.

- **Answer first.** First 1-2 sentences of each money page answer the page's main question with the entity name in it ("IdeasWood supplies insulated garden room kits delivered to Ireland; transport is calculated per order.").
- **One fact per sentence.** Avoid pronouns that only make sense in context ("we", "it") in key facts; repeat "IdeasWood" where a sentence may be lifted alone.
- **Tables** for sizes, wall thickness (44/58/68 mm), what is included vs priced separately. Fan-out queries are often comparison-shaped ("44 vs 68 mm log cabin").
- **FAQ blocks** with real buyer and trade questions (planning permission, delivery to UK/IE, wholesale terms, CE/FSC). FAQPage markup gives no rich result any more; keep the visible FAQ, markup optional.
- **Visible "last updated" date** on guides and the facts page (Perplexity freshness weighting [STUDY, vendor]).
- **Cover the fan-out.** For "best log cabin supplier UK", AI Mode and ChatGPT search sub-queries like delivery to UK, customs/VAT after Brexit, wall thickness, planning rules, reviews. Each needs a findable page; most drafts already exist (content/02, 03, 04, 12, 15).
- **No invented superlatives.** "Leading", "best", "eco" are ignored by models and risk UK/EU green-claims rules (content/10). Specific, checkable facts get quoted.

---

## 6. Third-party mentions: what is realistic for IdeasWood

Brand mentions correlate with AI visibility more than links do (section 1). But for a small export supplier the honest picture is:

| Source | Why AI uses it | Realistic for IdeasWood | Effort | Limits |
|---|---|---|---|---|
| Trustpilot / Google reviews | Review sites are cited for "is X legit", "X reviews" | High. Required anyway (audit 03, content/07) | Medium, ongoing | Only genuine, unfiltered invites; no incentives on Google; UK DMCC fake-review rules |
| Google Business Profile, Bing Places | Entity facts, maps, Copilot/Gemini local answers | High | Low | Must match NAP exactly |
| B2B directories (Europages, Kompass, LinkedIn company page, Lithuanian registries) | Cited for "supplier in Lithuania" / "wholesale Europe" questions | High for trade prompts | Low-medium | Use "supplier and exporter", never manufacturer |
| YouTube (assembly, IdeasPlanner walkthrough, delivery unload) | Strongest correlation with AI Overview visibility (Ahrefs) | Medium; channel exists, no @handle | Medium | Correlation; needs real footage; no factory content per the rule |
| Comparison / "best log cabin suppliers" articles, garden-room and glamping blogs | ChatGPT and AI Mode quote listicles for "best X" | Medium; outreach or supplying review units / facts | Medium-high | Paid placements must be labelled; many listicles are affiliate and want commission |
| Reddit (r/LogCabins, r/GardenRooms, r/HomeImprovement UK, r/glamping, r/sauna) | Heavily cited, especially Perplexity and AI Overviews | Low-medium | High (slow, manual) | Self-promo limits (~9:1 rule), astroturfing crackdowns in 2026, share volatile; only disclosed, first-hand answers by Justinas; no fake accounts |
| Quora | Cited less than Reddit in 2026 datasets | Low | Low | Same disclosure rule |
| Wikipedia | Heavily cited | **Not realistic**: needs significant independent coverage | n/a | Self-written articles get deleted (COI) |
| Wikidata | Feeds Knowledge Graph and some LLMs | Low now. Bar: "serious, publicly available references" (company registry, press) | Low once sources exist | Self-created promotional items get deleted; one source claims 2026 restriction on self-creation [UNVERIFIED]. Do after GBP, registry links and at least one press mention |
| Trade press / local press (garden-room, glamping, Lithuanian export news) | Authoritative mentions; Perplexity favours news domains | Medium | Medium | Needs a real story (e.g. export markets, IdeasPlanner) |

Sources: https://ahrefs.com/blog/ai-brand-visibility-correlations/ , https://nogood.io/blog/reddit-for-aeo/ , https://www.emarketer.com/content/marketers-seeking-ai-citations-ruining-reddit , https://www.wikidata.org/wiki/Wikidata:Items , https://www.v9digital.com/insights/how-to-create-a-wikidata-item-that-holds-up/

---

## 7. llms.txt

Low value, harmless (best-practices section 4 plus Ahrefs 97% zero-request data). If added, keep it a 15-line pointer to: company facts, trade partners, delivery, categories, guides. 10 minutes; do last. Never put facts in llms.txt that are not on the visible pages.

---

## 8. Measurement

- **Manual prompt panel**: `research/ai-visibility-test-prompts.csv`, 40 prompts, run monthly (logged-out / fresh session, note country via VPN UK/IE). Record mentioned, cited URL, competitors named. Expect variance; one run per month per platform is enough to see trends.
- **Bing AI Performance report** (Copilot citations and grounding queries) once BWT is verified.
- **GA4 referrals**: chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai. Add a "How did you find us?" field with "ChatGPT / AI assistant" option on the enquiry form, since many AI visits arrive with no referrer.
- **Server logs** (LiteSpeed access log): count hits by OAI-SearchBot, PerplexityBot, Claude-SearchBot, Bingbot; zero hits for a week = something blocks them.
- GSC has no separate AI Overviews report; AI Overview/AI Mode clicks are inside normal Search totals [as far as known].

---

## 9. Prioritised actions (impact x effort)

| # | Action | Impact | Effort | Owner |
|---|---|---|---|---|
| 1 | Verify AI bots are not blocked at server/CDN/plugin level (curl tests, logs); keep robots.txt open; never enable Google's AI opt-out toggle | Very high (gatekeeper) | 1 h | Astra |
| 2 | Bing Webmaster Tools: import from GSC, submit sitemap, enable Rank Math IndexNow, check AI Performance report | High (Copilot, ChatGPT) | 1 h | Astra |
| 3 | Publish /company-facts/ (content/23) and lock NAP + one-line description everywhere; Organization schema with full sameAs | High (correct, consistent answers) | 3-4 h | Astra + Justinas facts |
| 4 | GBP + Bing Places + Trustpilot with review invites to every customer | High (trust prompts, local, "is it legit") | 2 h setup, then ongoing | Justinas / Astra |
| 5 | Publish the money pages already drafted (trade partners 11, delivery 12, glamping 13, garden room 15, saunas 18) with answer-first intros, tables, FAQs, updated dates | High (pages to cite for fan-out queries) | Per page 1-2 h | Astra |
| 6 | B2B directories with identical NAP and "supplier and exporter" (Europages, Kompass, LinkedIn page) | Medium-high for trade prompts | 3 h | Astra |
| 7 | Run the 40-prompt panel now (baseline) and monthly | Medium (shows what works) | 2 h/month | Cloud session or Justinas |
| 8 | YouTube: claim @handle, 3-4 short videos (kit unpacking, IdeasPlanner layout, assembly steps), embed on product pages | Medium | High | Nova / Justinas |
| 9 | Outreach to 5-10 "best log cabin / garden room / glamping pod suppliers" articles and garden-room blogs | Medium | High | Justinas |
| 10 | Reddit/Quora: only disclosed, first-hand answers by Justinas where a thread asks about Baltic log cabins or wholesale | Low-medium, uncertain | High | Justinas (optional) |
| 11 | Wikidata item after registry + press references exist | Low now | Low later | Later |
| 12 | llms.txt pointer file | Very low | 10 min | Optional |
| – | ChatGPT merchant feed: check chatgpt.com/merchants EU eligibility in Q1 2027 | Unknown | – | Watch |
