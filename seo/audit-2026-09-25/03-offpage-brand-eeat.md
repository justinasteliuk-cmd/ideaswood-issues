# 03 — Off-page, Brand SERP, Local & E-E-A-T Audit — IdeasWood

**Date:** 2026-09-25
**Target:** https://ideaswood.eu (IdeasWood, Vilnius, Lithuania)
**Goal:** Page 1 in Google (English markets: UK first, then IE / EU / US / AU)

## Method and limitations

- ideaswood.eu itself could not be fetched (egress blocked). Most third-party sites also returned `EGRESS_BLOCKED` to WebFetch (Facebook, YouTube, Trustpilot, 1551.lt, scoris.lt, medis.lt). ideaswood.com.au did not resolve in DNS from the audit environment.
- Evidence therefore comes mainly from **WebSearch (US index)**: result titles, URLs and indexed snippets. Anything marked **[verify]** must be checked by hand in a browser (ideally from a UK IP / incognito, `google.co.uk`, `gl=gb`).
- A **Knowledge Panel and Google review counts cannot be seen through this tooling.** They are listed as manual checks.

---

## 0. Executive summary: the five biggest off-page problems

1. **The brand's identity is split across several names, domains and legal details.** Google sees "IdeasWood", "Ideas Wood", "Log Cabins Factory-ideaswood.eu", "logcabinsfactory.com – Wood Passion" (factory.ideaswood.eu), "ideaswood.com | Wood Passion", "IDEASWOOD-AU" (ideaswood.com.au) and "Ideaswood" (facebook.com/IdeasWood22). It also finds **two phone numbers, at least two addresses and three founding claims.** This is the main thing preventing a clean Knowledge Panel and entity.
2. **The trust claims contradict each other and the public records.** The site says "since 2007". Indexed copy on ideaswood.eu and ideaswood.com says "26,000 happy customers in Europe **since 1993**". The legal entity that lists info@ideaswood.eu (IDEAS for PEOPLE, UAB) was **registered 2010-10-19** and has **about 2 employees** according to public registries. Meanwhile the site claims "production capacity of up to 100 trucks per month" and "3,200 m³ per month". Google's quality raters are told to check exactly this kind of thing (reputation research, "who is responsible for the website"). UK buyers of a cabin costing £5k–£40k do it too.
3. **We found no review footprint.** No Trustpilot, Reviews.io or Houzz profile for IdeasWood appeared in results. A search for "ideaswood reviews" returns **A Wood Idea** (awoodidea.co.uk: 308 reviews on Reviews.io plus Trustpilot) and the Australian IdeasWood. It does not return IdeasWood EU.
4. **Almost no third-party backlinks or mentions.** Apart from its own social profiles and Lithuanian company registries, ideaswood.eu has **no visible listings** on Europages, Kompass, Fordaq, the Lithuanian log-house association, UK garden-building directories or in the press. Competitors such as Eurowood, Wood Factory, Satus Baltic, Timber Cabins and Log Villa show up for Lithuanian log-cabin queries, and ideaswood.eu does not.
5. **The same content is published on several ideaswood domains.** ideaswood.com has the same "About us" and product category URLs (for example `/product-category/houses/log-cabins/`) as ideaswood.eu, and factory.ideaswood.eu is a third copy. This splits links and brand signals, and it may cause duplicate-content or canonical problems (see the technical audit).

---

## 1. Brand SERP

### 1.1 What ranks for the brand terms (US index, 2026-09-25)

| Query | What ranks | Notes |
|---|---|---|
| `ideaswood` | instagram.com/ideaswoodeu · linkedin.com/posts/ideas-wood_… · instagram.com/**ideaswood_** · youtube.com/channel/UCzVg3JR4HeeMNWj9j5egKJg ("IDEASWOOD") · tiktok.com/@ideaswood · facebook.com/logcabinsfactory · **ideaswood.eu** (7th) · ideaswood.eu/about-us · etsy "Mailbox Ideas Wood" (noise) · **ideaswood.com** | The owned site ranks **below 6 social URLs**. There are two Instagram handles. A second domain (ideaswood.com) competes with it. |
| `"ideaswood" log cabins Lithuania` | facebook.com/logcabinsfactory · ideaswood.eu · eurowood.lt · woodfactory.lt · europages (log houses LT, **IdeasWood not listed**) · logvilla.lt | Competitors take up the rest of the SERP. |
| `"ideas wood" log cabins Vilnius` | facebook.com/logcabinsfactory · eurowood.lt · satusbaltic.com · maestrocabins.co.uk · timbercabins.lt | **ideaswood.eu does not rank.** The two-word spelling does not resolve to the site. |
| `"ideaswood" reviews` | reviews.co.uk + trustpilot for **awoodidea.co.uk** · facebook.com/**IdeasWood22** · **ideaswood.com.au** · ideaswood.com · tinyhousewise.com.au (AU listing, site closed 2021) | **No review source for IdeasWood EU.** Other brands own the SERP. |
| `IdeasWood trustpilot` | Only A Wood Idea (Trustpilot) and owned or duplicate properties | No Trustpilot profile for ideaswood.eu appears. [verify on trustpilot.com/review/ideaswood.eu] |
| `"IdeasWood" Google Maps Vilnius reviews` | No Maps or GBP result surfaced | [verify] whether a Google Business Profile exists. If it does, it is weak or not tied to the site. |

Sources:
- https://www.instagram.com/ideaswoodeu/
- https://www.instagram.com/ideaswood_/
- https://www.youtube.com/channel/UCzVg3JR4HeeMNWj9j5egKJg
- https://www.tiktok.com/@ideaswood
- https://www.linkedin.com/company/ideas-wood
- https://www.linkedin.com/pulse/us-ideaswood-europe-ideas-wood-fjiof
- https://www.facebook.com/logcabinsfactory/
- https://www.facebook.com/IdeasWood22/
- https://ideaswood.com/ and https://ideaswood.com/about-us/
- https://factory.ideaswood.eu/ (title "logcabinsfactory.com – Wood Passion")
- https://ideaswood.com.au/ and https://ideaswood.com.au/about/
- https://tinyhousewise.com.au/directory/ideaswood-simple-living-made-easy

### 1.2 Knowledge Panel

- **No Knowledge Panel signals were found.** There is no Wikidata or Wikipedia entity, no Crunchbase listing, no press coverage and no consistent GBP. **[verify]** by searching `ideaswood` on google.co.uk in incognito and checking the right-hand panel.
- With the entity split across ideaswood.eu, ideaswood.com and ideaswood.com.au, several Facebook pages and two Instagram handles, Google has no single entity to settle on.

### 1.3 NAP consistency

| Field | Source | Value |
|---|---|---|
| Name | Website title | "Ideaswood" / "IdeasWood" |
| Name | Facebook | "Log Cabins Factory-ideaswood.eu" |
| Name | factory.ideaswood.eu | "logcabinsfactory.com – Wood Passion" |
| Name | ideaswood.com | "ideaswood.com \| Wood Passion" |
| Name | ideaswood.com.au | "IDEASWOOD-AU" (Australian kit-home business; "licensed builder with 30 years' experience") |
| Name | LinkedIn | "Ideas Wood" |
| Name | TikTok | "Ideas Wood (@ideaswood)" |
| Legal entity | Lithuanian registries (1551.lt, scoris.lt, rekv.lt, info.lt, medis.lt, ikontaktai.lt, spec.lt, firsty.lt) | **IDEAS for PEOPLE, UAB**, code 302555740, VAT LT100009176917 |
| Phone | Brief / site contact (indexed) | **+370 610 05085** |
| Phone | Registries + indexed ideaswood.eu snippet | **+370 678 22055** |
| Address | Registries (1551.lt) + indexed site snippet | **Vilkpėdės g. 22, LT-03151 Vilnius** |
| Address | Registries (scoris / rekvizitai) | **L. Giros g. 106-40, LT-06300 Vilnius** (registered office) |
| Founded | ideaswood.eu "About us" | **2007** |
| Founded | ideaswood.eu home / ideaswood.com | "26,000 customers in Europe **since 1993**" |
| Founded | Legal entity | **2010-10-19** |
| Scale | Site | "up to 100 trucks per month"; ideaswood.com: "3,200 m³ per month", "15+ years", "15+ countries" |
| Scale | Registries | about 2 employees (older record: "up to 10"); revenue about €629k (2023), about €744k (2024) |
| Activity | Registries | "Marketing and PR" / wholesale of wood and building materials. **Not manufacturing.** |

Registry sources:
- https://www.1551.lt/ideas-for-people-uab-204081/
- https://scoris.lt/imone/302555740
- https://rekv.lt/UAB_IDEAS_for_PEOPLE
- https://www.info.lt/imones/Ideas-for-people-UAB/2261593
- https://www.medis.lt/imone/ideas-for-people-uab-10633
- https://ikontaktai.lt/ideas-for-people-uab/
- https://www.spec.lt/imone/ideas-for-people-uab
- https://www.firsty.lt/imone/7653/ideas-for-people-uab

**Why this matters.** The site calls itself a "manufacturer" with a factory, but the trading entity is a micro company registered as marketing and wholesale. The actual production is probably done by a partner or group factory. That is a common and legitimate model. Hiding it is a problem, though: anyone who checks the registry sees a mismatch, and "since 1993" alongside "since 2007" looks invented. **Fix the story before building links, because every citation will repeat it.**

**Recommended canonical NAP.** Decide on it once, then use it everywhere.

```
IdeasWood (IDEAS for PEOPLE, UAB)
Vilkpėdės g. 22, LT-03151 Vilnius, Lithuania      <- or the real showroom/factory address
+370 610 05085                                     <- ONE sales number
info@ideaswood.eu · https://ideaswood.eu
```

Then:
- Update the registries' phone and website fields (1551.lt, rekvizitai.vz.lt and the others are free to claim).
- Rename the Facebook page to **"IdeasWood – Log Cabins & Wooden Houses"**. Keep the @logcabinsfactory handle for the URL.
- Merge or deprecate facebook.com/IdeasWood22 and instagram.com/ideaswood_ if the company owns them. If it doesn't, disambiguate from them.
- Put `legalName`, `vatID`, `taxID` and `foundingDate` in the Organization schema (`seo/fixes/01-schema-organization.json` still has `STREET ADDRESS` / `POSTCODE` placeholders and no `legalName`).
- **Decide what ideaswood.com and factory.ideaswood.eu are for.** Either 301 them to ideaswood.eu or make them clearly distinct (for example a B2B/dealer site) with no duplicated copy. If ideaswood.com.au belongs to the same group, cross-link it with `hreflang="en-AU"` and add it to `sameAs`. If it is a separate company, stop using the "Australia" page wording that invites confusion.

---

## 2. Backlink and mention footprint

### 2.1 What we found (third-party, excluding the company's own properties)

| # | Site | Type | Links to ideaswood.eu? | Note |
|---|---|---|---|---|
| 1 | 1551.lt | LT company directory | Lists website | Registry-derived. Wrong or dual phone. |
| 2 | scoris.lt | LT company data | Probably lists website [verify] | |
| 3 | rekv.lt | LT registry | [verify] | |
| 4 | info.lt | LT directory | [verify] | |
| 5 | medis.lt | LT wood-industry portal | [verify] | **Relevant niche.** Claim and enrich. |
| 6 | ikontaktai.lt / spec.lt / firsty.lt | LT registries | [verify] | Low value, but they set the NAP. |
| 7 | tinyhousewise.com.au | AU directory (closed 2021) | Links to **ideaswood.com.au** | Not ideaswood.eu. Site is dead. |
| 8 | ideasplanner.com | Sister SaaS (3D planner for timber buildings) | [verify] | **Easy win:** "Powered by / Made by IdeasWood" link and case study. |
| 9 | LinkedIn Pulse article "About Us – Ideaswood Europe" | Owned | Yes | Owned, not earned. |

**Where it is missing (checked by search).**
- **Europages:** its "log houses Lithuania" and "prefabricated wooden houses Lithuania" lists appear in the SERP, and IdeasWood is not in them.
- **Kompass, Fordaq, GlobalWood, TradeKey:** no listing.
- **Alibaba:** no store.
- **Enterprise Lithuania, Made in Lithuania, Lithuanian Association of Log House Producers (timberhouses.lt), PrefabLT cluster:** not listed.
- **Trade fairs:** no exhibitor-list mentions found.
- **News:** no coverage found.
- **Dealers or resellers linking to IdeasWood:** none found.
- **EU project:** only the site's own `/eu-project/` page (NextGenerationEU / "Next Generation Lithuania" recovery plan). No mention on esinvesticijos.lt was found [verify at https://www.esinvesticijos.lt, search "IDEAS for PEOPLE"].

**Bottom line.** The earned-link profile is effectively zero. That puts the site in a better position than one with toxic links: every good citation will count for a lot.

### 2.2 Competitor reference points (they rank where IdeasWood doesn't)

- eurowood.lt
- woodfactory.lt
- satusbaltic.com
- timbercabins.lt
- logvilla.lt
- imedeksa.lt
- UK resellers: dunsterhouse.co.uk, simplylogcabins.co.uk, 1clicklogcabins.co.uk, awoodidea.co.uk, cabinsuk.co.uk

Run Ahrefs or Semrush "link intersect" on these five Lithuanian domains to find directories that link to at least two of them. That is the fastest way to add to the list in section 6.

---

## 3. Reviews

| Platform | Status | Evidence |
|---|---|---|
| Google (GBP) | **Not found in results.** [verify] | No Maps pack or GBP for "IdeasWood Vilnius" surfaced. |
| Trustpilot | **Not found** | The "ideaswood trustpilot" search returns only awoodidea.co.uk. Check https://www.trustpilot.com/review/ideaswood.eu (may exist unclaimed with 0 reviews). |
| Reviews.io / Feefo | Not found | The competitor A Wood Idea has 308 reviews, averaging 4.72 (reviews.co.uk). |
| Facebook recommendations | Unknown (FB blocked) | [verify] the Reviews tab on /logcabinsfactory. |
| Houzz | Not found | |
| On-site testimonials | Unknown (site blocked) | [verify] whether real names, photos and locations are shown. |

**Risk.** UK log-cabin buyers expect Trustpilot or Reviews.io stars on product pages and in ads (seller ratings need 100+ reviews in 12 months). Competitors 1clicklogcabins, cabinsuk and A Wood Idea all show review pages or testimonial pages.

---

## 4. Social and YouTube

| Channel | URL | Status / issue |
|---|---|---|
| Instagram (main) | instagram.com/ideaswoodeu | Active. Ranks #1 for the brand. |
| Instagram (second) | instagram.com/ideaswood_ | **Duplicate handle.** Confirm ownership. Merge or link. |
| Facebook (main) | facebook.com/logcabinsfactory | Name "Log Cabins Factory-ideaswood.eu", which does not match the brand. |
| Facebook (second) | facebook.com/IdeasWood22 | "Ideaswood". **Duplicate or unknown owner.** |
| YouTube | youtube.com/channel/UCzVg3JR4HeeMNWj9j5egKJg ("IDEASWOOD") | Exists. Has no @handle in the URL. Claim **@ideaswood**. Subscriber and video counts not verifiable. |
| TikTok | tiktok.com/@ideaswood ("Ideas Wood") | Exists. The display name uses the two-word spelling. |
| LinkedIn | linkedin.com/company/ideas-wood | Exists and posts. Name "Ideas Wood". Rename to "IdeasWood". |
| Pinterest | not found | **Missing.** High value for garden rooms and cabins. Pins link to product pages. |
| X / Threads | not found | Low priority. |

**Actions.**
- Use one display name ("IdeasWood"), one logo, one bio line ("Log cabins & wooden houses from Lithuania · since 20XX · UK/EU delivery") and one link (ideaswood.eu) on every profile.
- List all the profiles in `sameAs`.
- YouTube: film factory and assembly timelapses, a "how to assemble a 44 mm log cabin" series and customer walk-throughs, and embed them on product pages with VideoObject schema. For this category, YouTube is the best E-E-A-T asset you can have.

---

## 5. E-E-A-T gaps

| Area | Current (from indexed snippets) | Gap / fix |
|---|---|---|
| **About page** | Generic: "highly skilled team…", "modern production facility…", "100 trucks per month" | Add founder names and photos, the real founding year and one timeline. Name the production site (own factory or partner, with the city). Add the company code and VAT. Remove "since 1993" unless you can prove it (for example group history). |
| **Factory proof** | Claims CNC machinery with no evidence | Add a factory photo and video gallery, a Google Maps pin for the factory, and a "Visit our factory / showroom" booking page. Use a 360° tour or a YouTube factory walk-through. |
| **Certifications** | **No FSC / PEFC / CE evidence found** | Publish the certificate numbers with a link to the FSC database (info.fsc.org) or PEFC search. Add a CE / EN 14080 / EN 338 timber grade statement if applicable, UKCA wording for the UK, and a timber-origin statement (EUDR compliance, which is now relevant for EU timber). If only the partner factory holds FSC, say so. |
| **Team** | No named people | Build a Team page: sales contacts with photos, languages and direct lines. Add an engineer or technical author bio for guides. |
| **Authorship** | Blog / guides ("The Ultimate Log Cabin Guide") show no author | Add an author box with credentials and a `Person` schema linked to LinkedIn. |
| **Case studies** | None found | Publish 10 case studies (UK garden office, IE summerhouse, glamping site, sauna): location, model, wall thickness, photos, timeline, customer quote. |
| **Guarantees / policies** | Unknown | Add a warranty page (years, what's covered), delivery to UK/IE (lead time, customs after Brexit, who pays duty or VAT) and returns. Link them from the footer. |
| **Contact** | Two phones | One phone, one address, a map, opening hours, and a company-details block in the footer. |
| **EU project page** | Exists | Good trust signal. Link it from About and ask the funding body for a reciprocal listing. |
| **IdeasPlanner** | Separate site | Make it a "Built by IdeasWood" proof of expertise, with two-way links. |

---

## 6. 90-day link-building and digital PR plan

### 6.0 Prerequisites (week 1–2). Do these before any outreach.

1. Lock the canonical NAP (section 1.3). Fix it on the site, in schema, on Facebook, on LinkedIn and in the LT registries.
2. Consolidate the duplicate domains (ideaswood.com, factory.ideaswood.eu) with 301s, or differentiate them.
3. Correct the founding and scale claims. Write a 150-word "company fact sheet" and reuse it word for word in every listing.
4. Create a press / media kit page (`/press/`): logo, factory photos, founder bio, fact sheet, certificates.
5. Set up Trustpilot (free) or Reviews.io, and a Google Business Profile (section 6.2).

### 6.1 Thirty target sites and directories

Priority: **A** = do in month 1, **B** = month 2, **C** = month 3.

**B2B / wood industry / Lithuania**

| # | Target | URL | Type | Angle | Pri |
|---|---|---|---|---|---|
| 1 | Europages | https://www.europages.co.uk/ | B2B directory (free listing) | List under "log houses", "log cabins", "prefabricated wooden houses", "saunas". The category pages already rank. | A |
| 2 | Kompass | https://www.kompass.com/ | B2B directory | Free company listing with NACE codes and export markets. | A |
| 3 | Fordaq | https://www.fordaq.com/dir/companies-from-lithuania?cs=137 | Timber-trade marketplace | Seller profile in the log houses / garden buildings category. Attracts dealer leads. | A |
| 4 | Wer liefert was (wlw) | https://www.wlw.de/ | DACH B2B (Visable, the Europages group) | For German/Austrian dealers. English profile allowed. | B |
| 5 | GlobalWood | https://globalwood.org/ | Wood-products directory | Free supplier listing. The Association of Log House Producers is already there. | B |
| 6 | Lithuanian Association of Timber/Log House Producers | https://www.timberhouses.lt/members_lithuanian_association_timber_houses_producers | Industry association (membership page links out) | Join, or ask about associate membership. High-authority, topical link. | A |
| 7 | PrefabLT cluster (KlasterLT) | https://klaster.lt/en/klateris/prefablt/ | Export cluster | Membership plus a member-profile link. Joint trade-fair stands. | B |
| 8 | Association "Lietuvos mediena" | https://www.lietuvosmediena.lt/about-us/ | Wood-industry association | Member listing. | B |
| 9 | Enterprise Lithuania (Versli Lietuva) | https://www.verslilietuva.lt/en/ | Government export agency | Register in its exporters database and apply for trade missions (UK, Nordics). Pitch an "exporter story" for its news section. | A |
| 10 | Medis.lt | https://www.medis.lt/imone/ideas-for-people-uab-10633 | LT wood portal (existing profile) | Claim it, fix NAP, add brand name, description and website link. | A |
| 11 | Rekvizitai.lt (VŽ) | https://rekvizitai.vz.lt/ | LT business registry directory | Claim it, fix NAP and add products. VŽ also runs "Stipriausi Lietuvoje" badges. | A |
| 12 | Spassio: "Complete Guide to Lithuanian Prefab House Manufacturers" | https://spassio.com/the-complete-guide-to-lithuanian-prefab-house-manufacturers/ | Editorial list post | Ask to be added (log cabins and garden buildings segment). Supply the fact sheet and photos. | A |
| 13 | TradeKey Lithuania | https://lithuania.tradekey.com/wooden-house.htm | B2B marketplace | Low authority, but it ranks for "Lithuania wooden house". Optional. | C |
| 14 | ESI investicijos (EU funds) | https://www.esinvesticijos.lt/ | EU-funding project database | Make sure the NextGenerationEU project is listed with a website link. Cross-link from /eu-project/. | B |

**UK garden buildings / homes / glamping**

| # | Target | URL | Type | Angle | Pri |
|---|---|---|---|---|---|
| 15 | Construction UK Directory: Log Cabins | https://www.construction.co.uk/d_c/453/log-cabins | UK trade directory | Listing as an EU supplier delivering to the UK. | A |
| 16 | Gardenforum: Suppliers / Buildings | https://www.gardenforum.co.uk/useful-links/suppliers/buildings/ | Curated links page | Email the editor: "Lithuanian log-cabin manufacturer delivering to the UK, 28–92 mm walls". | A |
| 17 | Houzz UK | https://www.houzz.co.uk/ | Pro directory with reviews | Pro profile, project galleries and reviews. The link is nofollow, but it builds brand and review signals. | A |
| 18 | International Glamping Business: Suppliers Directory | https://www.glampingbusiness.com/glamping-pods/ | Trade magazine directory (free basic listing) | Camping pods and glamping cabins. Also pitch a guest article: "What to check when importing glamping pods from the Baltics". | A |
| 19 | Glampitect: "Recommended glamping pod manufacturers in the UK" | https://www.glampitect.com/start-a-glamping-business/recommended-glamping-pod-manufacturers-in-the-uk | Editorial list | Pitch inclusion with trade pricing and a sample case study. | B |
| 20 | Woodland Champions: Suppliers | https://woodlandchampions.co.uk/suppliers/ | Glamping / woodland supplier list | Supplier listing for pods and saunas. | B |
| 21 | Nomade House: "Best commercial glamping pods in the UK" | https://www.nomadehouse.com/post/best-commercial-glamping-pods-in-the-uk-sustainable-glamping-pod-suppliers | List post | Pitch as the "sustainable Nordic-timber option". | C |
| 22 | Horticultural Trades Association (HTA) | https://hta.org.uk/ | UK garden-industry association | Supplier or associate membership (member directory link). Access to garden-centre buyers. | B |
| 23 | Glee (garden trade show, Birmingham NEC) | https://www.gleebirmingham.com/ | Trade show | Exhibit, or at least register as a supplier. Exhibitor-list link plus dealer leads. | C |
| 24 | Homebuilding & Renovating Show / homebuilding.co.uk | https://www.homebuildingshow.co.uk/ · https://www.homebuilding.co.uk/ | Self-build show and magazine (Future plc) | Exhibitor listing, plus expert comment for garden-room and log-cabin articles (price, planning rules, wall thickness). | B |
| 25 | Gardeningetc / Ideal Home (Future plc) | https://www.gardeningetc.com/ · https://www.idealhome.co.uk/ | Consumer home and garden media | Digital PR: data story (see 6.3), expert quotes, product placement in "best log cabins / garden offices" round-ups. | B |
| 26 | MoneySavingExpert forum (log cabin threads) | https://forums.moneysavingexpert.com/ | UK consumer forum | **Not for links.** A staff member answers questions openly, with disclosure. Builds brand searches and reputation. | C |
| 27 | Screwfix Community (log cabin advice) | https://community.screwfix.com/threads/log-cabin-advice.226256/ | DIY forum | Same approach as #26. Share assembly guides. | C |

**International / niche content**

| # | Target | URL | Type | Angle | Pri |
|---|---|---|---|---|---|
| 28 | Tiny House Blog | https://tinyhouseblog.com/ | Niche blog (US/global) | Feature a small residential cabin (for example 4×5 m at 68 mm). Includes a guest post option. | B |
| 29 | Log Home Living / loghome.com | https://www.loghome.com/ | US log-home media and directory | Supplier directory plus a "Baltic kit cabins for US buyers" story. Supports the US market claim. | C |
| 30 | Pinterest business account | https://business.pinterest.com/ | Visual search | 200+ pins from product and case-study images with rich pins. Pinterest ranks well for "garden room ideas" and "log cabin ideas". | A |

Extra entity citations (quick, free, keep NAP identical):
- Bing Places: https://www.bingplaces.com
- Apple Business Connect: https://businessconnect.apple.com
- Crunchbase company page
- Wikidata item (only once there is independent coverage to cite)
- Trustpilot business profile
- Cylex, Hotfrog (UK) and Yably: low value, NAP only

### 6.2 Outreach angles (digital PR)

1. **"Lithuania is the world's #2 exporter of prefab wooden buildings".** Lithuania has about 9.3% of global trade (source: gtaic.ai market report). A Vilnius maker explains why Baltic timber is cheaper and better. Pitch to UK trade press, Enterprise Lithuania and LRT English.
2. **The "UK garden office cost index 2026" data study.** Price per m² by wall thickness, insulation and delivery zone, drawn from IdeasPlanner quotes (anonymised). Linkable data for Ideal Home, Gardeningetc, Homebuilding and local UK papers.
3. **Planning-permission explainer for garden buildings.** Cover UK permitted development limits (2.5 m height near boundaries, 50% curtilage) and Ireland's 25 m² exemption. Provide expert quotes to journalists via Qwoted, Featured.com or #journorequest on X.
4. **Factory-to-garden timelapse video.** One cabin followed from the Vilnius factory to a UK garden. Pitch to YouTube creators and garden-room vloggers.
5. **Glamping ROI calculator** built on IdeasPlanner. Pitch to glamping trade media (#18–21).
6. **Sustainability.** Publish FSC/PEFC certification and a timber-origin statement, then pitch "carbon stored in a garden cabin" content.
7. **IdeasPlanner as a SaaS story.** "A Lithuanian cabin maker built its own 3D configurator". Pitch to Lithuanian tech and business media (vz.lt, verslo žinios) and startup or proptech newsletters.
8. **Dealer programme.** Offer UK and IE garden centres and landscapers a trade price list plus a "stockist" page. Each stockist links back with "Official IdeasWood dealer". These are relevant, lasting links.

### 6.3 90-day timeline

| Weeks | Deliverables | KPI |
|---|---|---|
| 1–2 | NAP lock, schema fix, profile renames, domain consolidation plan, fact sheet, press page, GBP created or claimed, Trustpilot set up | One NAP everywhere. GBP verified. |
| 3–4 | Targets #1, 2, 3, 6, 9, 10, 11, 12, 15, 16, 17, 18, 30, plus Bing/Apple/Crunchbase | 15 live citations |
| 5–8 | Associations (#5, 7, 8, 14, 22). Publish case studies and the certification page. Launch the review programme. Prepare the data study. | 25 citations. 30+ new reviews. 5 case studies. |
| 9–12 | Launch the data study PR (#24, 25). Glamping pitches (#19–21). Dealer programme with the first 3 stockists. Guest articles (#18, 28). YouTube series (4 videos). | 5–10 editorial links. 60+ total reviews. Brand SERP: ideaswood.eu #1 with sitelinks. |

**Tracking:** GSC branded vs non-branded clicks, Ahrefs/Semrush referring domains, GBP insights, Trustpilot TrustScore, and weekly brand-SERP screenshots (UK IP).

### 6.4 Google Business Profile optimisation checklist

- [ ] Search Maps for existing or duplicate listings ("IdeasWood", "Log Cabins Factory", "Ideas for People"). Claim one and merge or remove the rest.
- [ ] **Name:** "IdeasWood". Do not stuff keywords (not "IdeasWood Log Cabins UK Factory"); that breaks the guidelines and risks suspension.
- [ ] **Address:** the real, staffed factory or showroom where customers can visit. If customers can't visit, use a service-area business with the address hidden and service areas set to Vilnius plus the countries you serve.
- [ ] **Primary category:** "Log cabin builder" or "Prefabricated house companies" (check which is available). **Secondary:** "Log home builder", "Sauna store", "Shed builder", "Garden building supplier", "Manufacturer", "Wood and timber supplier" (choose from the live category list).
- [ ] **Phone:** +370 610 05085 (the single canonical number). Website: `https://ideaswood.eu/?utm_source=gbp&utm_medium=organic`.
- [ ] Hours, languages and "Online appointments" / "Online estimates" attributes.
- [ ] Products: 10–20 top models with prices "from €/£", photos and links.
- [ ] Services: log cabins, garden offices, saunas, glamping pods, residential wooden houses, delivery and assembly.
- [ ] Photos: at least 30 at launch (exterior, factory interior, machinery, team, finished customer projects), then 4–8 new ones every week. Geotag isn't needed; real photos are what count.
- [ ] Videos: factory walk-through (30 s) and assembly timelapse.
- [ ] Business description (750 characters) that repeats the fact sheet, including the founding year and certifications.
- [ ] Posts weekly: new model, case study, offer, trade-show appearance.
- [ ] Q&A: seed 10 real FAQs (UK delivery, customs, lead time, wall thickness, planning).
- [ ] Reply to 100% of reviews within 48 hours, naming the product and country.
- [ ] Add a GBP link and map embed on /contact, plus `hasMap` in the schema.

### 6.5 Review-generation process

1. **Platforms.** Use **Google (GBP)** as the priority for local and entity signals, and **Trustpilot** for UK trust and seller ratings (free plan with Automatic Feedback Service, or Reviews.io if you want product reviews on product pages). Keep Facebook recommendations switched on.
2. **When to ask.** Ask about 14 days after delivery or assembly, once the customer is using the building. Send an optional second ask after the first winter ("How did your cabin handle winter?"), which yields strong content.
3. **How to ask.**
   - Automated email from the order system (WooCommerce), with the Trustpilot invitation link and a direct GBP review link (`https://search.google.com/local/writereview?placeid=<PLACE_ID>`).
   - A QR code card in the assembly-instruction pack.
   - WhatsApp or SMS follow-up from the salesperson who handled the order.
4. **What to ask for.** Ask for a photo of the finished building and a mention of the model and country. Photo reviews become case-study leads, and you should ask permission to use them.
5. **Backlog.** Email every customer from 2023 onward (the "26,000" figure, if true, means a large dormant base). Aim for 50–100 reviews in 90 days.
6. **Rules.** Ask **every** customer; no filtering or "review gating". No incentives on Google, which bans them. Trustpilot allows neutral asks only. Never post staff or fake reviews: UK DMCC Act 2024 rules on fake reviews apply to traders selling to UK consumers.
7. **Respond and reuse.** Reply to all reviews. Embed the Trustpilot TrustBox on product and checkout pages. Add `AggregateRating` schema **only** for reviews collected on-site (Google doesn't show stars for self-serving LocalBusiness or Organization review markup, so apply it to Product pages).
8. **Negative feedback.** Route 1–3 star feedback to the owner within 24 hours, reply publicly with a fix, and update the reply when the issue is resolved.

---

## 7. Manual verification checklist (could not be checked from this environment)

- [ ] google.co.uk incognito: `ideaswood`, `ideas wood`, `ideaswood reviews`, `ideaswood log cabins`. Is there a Knowledge Panel? Sitelinks?
- [ ] Google Maps: does a GBP exist? Name, reviews, duplicates?
- [ ] trustpilot.com/review/ideaswood.eu: does it exist, is it claimed, how many reviews?
- [ ] Facebook /logcabinsfactory and /IdeasWood22: owner, reviews tab, followers.
- [ ] YouTube channel: subscribers, video count, handle.
- [ ] Ownership and relationship of ideaswood.com, ideaswood.com.au, factory.ideaswood.eu and instagram.com/ideaswood_.
- [ ] Which phone number is on the live ideaswood.eu contact page and footer.
- [ ] Whether FSC/PEFC certificates exist (own or the partner factory's).
- [ ] Backlink export from Ahrefs, Semrush or GSC ("Links → Top linking sites") to confirm the near-zero profile.
