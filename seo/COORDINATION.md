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
