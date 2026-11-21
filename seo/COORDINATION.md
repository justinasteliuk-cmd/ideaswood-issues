# ideaswood SEO ledger (shared by every session and agent that touches SEO)

Copy lives in Google Drive as ASTRA-HANDOFF-ideaswood-SEO-ledger.md (the file Mac agents can read) and in GitHub as seo/COORDINATION.md (branch claude/ideaswood-seo-audit-8r34oj). Report page: https://claude.ai/artifact/D86SrWiqhrs5L2xjKdoy3F

## Rule for every session
1. Before you change anything that affects search (titles, meta, categories, redirects, robots, sitemap, schema, speed, internal links, page text), read this ledger and ASTRA-STATUS-ideaswood-*.md. If the area is owned by another lane, send your change to that owner instead of doing it twice.
2. After you change something, append one line under "Change log" (date, session, URL or setting, before, after). Astra's status files stay the detailed record.
3. Never change prices, products or user accounts as part of SEO.

## Lanes
| Lane | Who | Does | Does not |
|---|---|---|---|
| Measure and plan | Cloud SEO session ("Ideaswood.eu SEO auditas") | Audits, rank tracking (38 searches), research, content drafts, the report page. Reads Drive status files. | Cannot open ideaswood.eu or message Mac sessions. |
| On-site changes ideaswood.eu | Astra's executor ("ideaswood.eu SEO vykdymas") | LiteSpeed, Rank Math, redirects, titles/meta, category and post text, robots.txt, .htaccess, GA4 checks. | Prices, products, accounts, design templates. |
| Theme and plugin code | Saqib | Divi category template (Blog module), Lepton gallery, add-ons plugin on staging, Tag Manager tags. | – |
| Add-ons plugin | "Priedų įskiepis" session | IdeasWood Product Options (replaces WCPA). Biggest speed win on product pages. | – |
| ideaswood.com / .com.au | No session assigned | hreflang with .eu (seo/fixes/07). | Do not edit until a session is assigned. |
| Social and UTM | Nova | Posts and UTM naming. | – |
| Security | "Gyčio prieigų auditas", "IT saugumas" | Admin users, security headers. | – |

## State on 2026-10-18
Done on ideaswood.eu (2026-10-16 and 10-18): LiteSpeed placeholder and lazy-load fix, Rank Math title templates ("| IdeasWood"), titles and meta for 24 pages/categories and 24 products, 19 redirects (34 old URLs), /x/ 301, /eu-project/ noindex, cost post extended, robots.txt applied, http/www to https in one hop.
In progress: category descriptions (12 categories, Drive ASTRA-HANDOFF-ideaswood-categories.md). The model is the Log cabins category, "Smart Line Series".
Waiting: Google recrawl (new titles not shown yet), Saqib items (Blog module, gallery, add-ons plugin, GTM tags), facts from Justinas (phone number, trade terms, UK delivery cost, glamping specs), a session for ideaswood.com.

## Change log (append below)
- 2026-10-16 Astra executor: see ASTRA-STATUS-ideaswood-SEO.md.
- 2026-10-18 Astra: robots.txt and .htaccess canonical host applied.
- 2026-10-18 Cloud SEO session: category description drafts and 2026 research handed to Astra.
- 2026-11-20 Cloud SEO session: glamping page draft (content/13), manufacturer/CE wording rules handed to Astra.
- 2026-11-20 Cloud SEO session: IT/AU market copy kit (content/14) and scan task handed to Astra.
- 2026-11-20 Cloud SEO session: keyword research v2 and report 'Keywords' section; GSC export requested from Astra.
- 2026-11-20 Cloud SEO session: real GSC facts from mailbox added to report (20 clicks/28d, avg pos 68.3 baseline); no GSC connector in cloud session.
- 2026-11-20 Cloud SEO session: Goal score added to report (100% = page 1 for supplier/product keywords). Parts: technical 20 pts (58%), money pages 25 (46%), trust 10 (17%), authority 15 (5%), Google visibility 30 (2%) = 26%. Recalculate at each check; update report section "Goal".
- 2026-11-20 Cloud SEO session: draft content/15 insulated garden room / garden office page (P1 keywords).
- 2026-11-20 Cloud SEO session: drafts 13,15-22 reviewed (research/review-2026-11-20.md); competitor + link plan research/competitors-and-links-2026-11-20.md; 'Scandinavian-Style' removed from AU title.
- 2026-11-20 RULE (Justinas): never mention factories, producers or manufacturers anywhere (pages, schema, directories, meta). Company wording: "supplier and exporter" only. Do not name Energy Houses, WoodProfessionals or any factory. Address everywhere (same as website footer, headquarters and correspondence): Kaštonų g. 8, Didžiosios Riešės k., Vilniaus r. sav., Lithuania; phone +370 678 22055; founded 2007. Cloud session removed factory wording from content 01, 07, 14, 21, 22 and schema (type Manufacturer removed). Open: brand name "Log Cabins Factory" (alternateName, Facebook page logcabinsfactory) contains the word factory: Justinas to decide.
- 2026-11-20 DECISION (Justinas): capture 'manufacturer' searchers (B2B). Trade page /trade-partners/ title+H1 use the phrase as the visitor's question; no factory described or named; brand name 'Log Cabins Factory' stays.
- 2026-11-20 Cloud SEO session: AI search plan (research/ai-search-geo, ai-visibility-test-prompts.csv, content/23 company-facts, fixes/03c-robots-ai-bots). Decision: brand name Log Cabins Factory stays, may stay in schema.
- 2026-11-20 Cloud SEO session: Windsor.ai (Search Console, all 5 sites) and OpenSEO connected; real 28-day GSC data in research/gsc-real-2026-11-20.md. Saunas are the demand cluster. OpenSEO project IdeasWood created (500 credits).
- 2026-11-20 Cloud SEO session: free own crawl of 473 sitemap URLs (research/site-crawl-2026-11-20.md); UK autosuggest list tracking/autosuggest-uk-2026-11-20.csv (985 phrases). PageSpeed API quota exhausted today.
- 2026-11-20 Cloud SEO session: Nova social plan reviewed (research/social-plan-review-2026-11-20.md): 8 approved posts on hold; mix shift to saunas.
- 2026-11-21 Cloud SEO session daily cycle: GSC 28d 22 clicks/1050 impr/pos 61.8; no Astra/Nova answers; live sites unchanged; Goal 27%.
- 2026-11-21 Cloud SEO session: planning guide extension (content/04b) verified against official sources; corrected conservation-area rule, no C5 in England, Scotland 8 m2; see research/planning-verification-2026-11-21.md. Sauna category paste pack ready.
