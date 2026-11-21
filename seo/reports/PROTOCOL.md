# Two-session protocol: cloud SEO session (C) and Mac executor session (M), 2026-11-21
Roles
- C (cloud, "Ideaswood SEO"): research, content drafts, Search Console data, live-site checks (curl), goal score, the report page. Runs automatically every day 08:17 Vilnius. Cannot edit WordPress.
- M (Mac, Justinas' browser and logins): the only one that edits ideaswood.eu and sister sites, requests indexing in Search Console, runs AI-search prompts in ChatGPT/Gemini/Perplexity. Does not write the report page.
Single sources of truth
- Work state: GitHub branch claude/ideaswood-seo-audit-8r34oj, file seo/COORDINATION.md (one line per change: date, who, URL, before, after). Both read it before starting and write after finishing. Never edit the same URL twice without reading it.
- Questions and answers: Drive file ASTRA-QA-ideaswood-SEO.md. C asks, M answers under "A:"; M can add "ASTRA ASKS", C answers by the next morning.
- Reports: only C publishes the artifact (https://claude.ai/artifact/D86SrWiqhrs5L2xjKdoy3F). M reports in Drive ASTRA-STATUS-ideaswood-SEO.md using lines: "DONE <date> <URL> <what>" or "BLOCKED <what is needed>". C turns DONE lines into progress-log rows and Goal %.
Order of work (M): 1 sauna categories (seo/fixes/sauna-categories-2026-11-21), 2 missing titles/meta, 3 Nordic/factory wording, 4 new pages (content 11, 13, 15, 23), 5 content 16-22, 6 schema/robots/Bing.
Rules for both: no factories/producers in public text, company = supplier and exporter, "manufacturer" only as the visitor's phrase on /trade-partners/, no Nordic/Made in Lithuania, no eco/green, no CE for saunas, address Kaštonų g. 8 etc., no invented facts, no price/product/user changes, backup before editing.
Handoff checks: C verifies each DONE line on the live URL by curl the next morning and marks it verified or reopens it.
