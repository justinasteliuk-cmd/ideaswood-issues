# Planning statements verification, 2026-11-21

Scope: every statement and source in content/04b-planning-guide-extension.md, plus the claims list for content/04-uk-planning-permission-guide.md.

Method: each source URL in 04b was requested with curl (Mozilla user agent). Pages on planningportal.co.uk, legislation.gov.uk, gov.uk, assets.publishing.service.gov.uk and gov.scot loaded and were checked against their text. All other hosts were refused by the session proxy (HTTP 403 on CONNECT), and one retry after 30 s also failed: interactive.planningportal.co.uk, blog.planningportal.co.uk, spelthorne.gov.uk, propertymark.co.uk, cne-siar.gov.uk, highland.gov.uk, mygov.scot, pkc.gov.uk, southlanarkshire.gov.uk, middevon.gov.uk, babergh.gov.uk, acp.planninginspectorate.gov.uk, gov.wales, gwynedd.llyw.cymru, planning.eryri.gov.wales, nidirect.gov.uk, milton-keynes.gov.uk. Where a blocked source supported a statement, an official page on an allowed host was found and read instead, or the statement was removed.

Status key: **Verified** = matches the official text. **Corrected** = the draft was wrong or incomplete and was rewritten from the official text. **Re-sourced** = the statement stands, but the original source could not be opened, so it now cites an official page that was read. **Removed** = could not be verified on any reachable official page.

## Source URLs

| # | Original source | Result | URL actually read |
|---|---|---|---|
| 1 | legislation.gov.uk GPDO Class E | Read | https://www.legislation.gov.uk/uksi/2015/596/schedule/2/part/1/crossheading/class-e-buildings-etc-incidental-to-the-enjoyment-of-a-dwellinghouse |
| 2 | Planning Portal outbuildings + interactive mini guide | Main page read; mini guide host blocked, dropped | https://www.planningportal.co.uk/permission/common-projects/outbuildings/planning-permission |
| 3 | Spelthorne BC | Blocked; replaced | https://assets.publishing.service.gov.uk/media/5d77afc8e5274a27cdb2c9e9/190910_Tech_Guide_for_publishing.pdf |
| 4 | gov.uk use-class consultation | Read, plus consultation document and Use Classes Order | https://www.gov.uk/government/consultations/introduction-of-a-use-class-for-short-term-lets-and-associated-permitted-development-rights ; https://www.legislation.gov.uk/uksi/1987/764/schedule |
| 5 | gov.uk self-catering guidance + registration statement + Propertymark | gov.uk pages read; Propertymark blocked, dropped | https://www.gov.uk/guidance/letting-out-a-self-catering-holiday-home-in-england-rules-and-regulations ; https://www.gov.uk/guidance/delivering-a-registration-scheme-for-short-term-lets |
| 6 | Building Regs 2010 Sch 2 | Read (+ Planning Portal building regs page) | https://www.legislation.gov.uk/uksi/2010/2214/schedule/2/part/6 ; https://www.planningportal.co.uk/permission/common-projects/outbuildings/is-building-regulations-approval-needed-for-an-outbuilding |
| 7 | NPPF chapter 15 URL | Old URL redirects to NPPF home; new chapter 19 + glossary read | https://www.gov.uk/guidance/national-planning-policy-framework-chapter-19-conserving-and-enhancing-the-natural-environment-n1-6 ; https://www.gov.uk/guidance/national-planning-policy-framework-annex-b-glossary |
| 8 | NPPF chapter 1 + PP blog | gov.uk read; blog blocked, dropped | https://www.gov.uk/guidance/national-planning-policy-framework ; https://www.gov.uk/guidance/national-planning-policy-framework-chapter-1-introduction |
| 9 | gov.scot STL planning guidance | Read | https://www.gov.scot/publications/short-term-lets-scotland-planning-guidance-hosts-operators-2/pages/2/ |
| 10 | Comhairle nan Eilean Siar | Blocked; replaced | https://www.legislation.gov.uk/ukpga/1997/8/section/26 |
| 11 | Highland Council | Blocked; dropped (statement re-sourced to 16, 18) | none |
| 12 | gov.scot licensing scheme | Read | https://www.gov.scot/publications/short-term-lets/pages/licensing-scheme/ |
| 13 | gov.scot Circular 1/2023 | Read | https://www.gov.scot/publications/short-term-lets-planning/pages/3/ |
| 14 | mygov.scot control areas | Blocked; dropped (list re-sourced to 12) | none |
| 15 | PKC checklist + mygov.scot | Blocked; replaced | https://www.gov.scot/publications/building-standards-technical-handbook-domestic-april-2026-pdf/ (PDF, Table 0.3) |
| 16 | Scottish GPDO, ssi/1992/223 path | That path returns HTTP 400; uksi path read | https://www.legislation.gov.uk/uksi/1992/223/schedule/1 |
| 17 | mygov.scot shed page | Blocked; dropped (figures re-sourced to 16, 18) | none |
| 18 | gov.scot Circular 1/2024 + South Lanarkshire | gov.scot read; council blocked, dropped | https://www.gov.scot/publications/circular-1-2024-householder-permitted-development-rights/pages/4/ |
| 19 | gov.scot technical handbook 2022, 0.3 | Read; April 2026 handbook also read (same type 17) | https://www.gov.scot/publications/building-standards-technical-handbook-2022-domestic/0-general/0-3-exempted-buildings-services-fittings-equipment/ |
| 20 | Mid Devon + Babergh | Blocked; replaced with statute | https://www.legislation.gov.uk/ukpga/Eliz2/8-9/62/section/29 ; https://www.legislation.gov.uk/ukpga/1968/52/section/13 |
| 21 | GPDO Pt 6 Class A | Read | https://www.legislation.gov.uk/uksi/2015/596/schedule/2/part/6/crossheading/class-a-agricultural-development-on-units-of-5-hectares-or-more |
| 22 | Planning Inspectorate appeal | Blocked; statement removed | none |
| 23 | gov.wales outbuildings pages | Blocked; replaced | https://www.legislation.gov.uk/uksi/1995/418/schedule/2/part/1 |
| 24 | NI Building Regs 2012 Sch 2 | Read | https://www.legislation.gov.uk/nisr/2012/192/schedule/2 |
| 25 | gov.wales statement + wsi/2022/994 | Statement blocked; SI read, plus wsi/2022/997 | https://www.legislation.gov.uk/wsi/2022/994/made ; https://www.legislation.gov.uk/wsi/2022/997/made |
| 26 | Gwynedd / Eryri Article 4 | Blocked; statement removed | none |
| 27 | nidirect | Blocked; replaced | https://www.legislation.gov.uk/nisr/2015/70/schedule/part/1 |
| 28 | Milton Keynes CC | Blocked; dropped | none |

## Statements in content/04b

### Holiday let (England)

| Statement | Status | Why |
|---|---|---|
| Outbuilding PD only covers a building for a purpose incidental to the house [1] | Verified | Class E para E(a). |
| Planning Portal: not separate self-contained living accommodation [2] | Verified | Page says the rules do not cover "any other change of use of the land or outbuilding, or use as separate self-contained living accommodation". |
| "Councils say living accommodation separate from the house needs planning permission" [3] | Re-sourced | Spelthorne blocked. Replaced by MHCLG technical guidance: incidental use "would not ... cover normal residential uses, such as separate self-contained accommodation or the use of an outbuilding for primary living accommodation such as a bedroom, bathroom, or kitchen". |
| Local planning authority decides; contact council [5] | Verified (added) | gov.uk self-catering guidance, Planning permission section. |
| England has no short-term let use class; C5 was only consulted on [4] | Verified | Consultation ran 12 April to 7 June 2023; the page still says "We are analysing your feedback". The consultation document names "C5 Short Term Let". The Use Classes Order Schedule on legislation.gov.uk shows C5 and C6 inserted for Wales only (20 October 2022); England's C3 still reads "whether or not as a sole or main residence". |
| National register "due to be operational by March 2027" [5] | Corrected | gov.uk (reviewed 2 October 2026) says the mandatory national registration scheme is "not yet in force" and "expected to begin in March 2027". Wording changed to match; Propertymark citation dropped. |
| Sleeping accommodation not exempt from building regulations [6] | Verified | Sch 2 Class VI paras 1 and 3 require "no sleeping accommodation". |

### AONB / National Park

| Statement | Status | Why |
|---|---|---|
| 20 m / 10 m² limit in National Parks, Broads, AONBs, WHS [1] [2] | Verified | Class E para E.2; Planning Portal bullet. |
| "AONBs (now called National Landscapes)" | Verified | NPPF Annex B: "National Landscapes: Areas legally designated as areas of outstanding natural beauty under the National Parks and Access to the Countryside Act 1949 and Countryside and Rights of Way Act 2000." |
| NPPF "gives special weight" to landscape and scenic beauty [7] | Corrected | August 2026 NPPF policy N4 (chapter 19): development in Protected Landscapes "should be limited in scale and extent and sensitively located and designed"; "Substantial weight should be placed on the importance of conserving and enhancing the natural beauty of these areas"; major development refused "other than in exceptional circumstances"; setting policy N4.4. Protected Landscapes = National Parks, the Broads and National Landscapes (glossary). The old chapter 15 URL redirects to the NPPF home page. |
| NPPF replaced on 17 August 2026 [8] | Verified | NPPF home page: published 17 August 2026 (updated 29 September 2026); chapter 1 para 1: "replaces the previous National Planning Policy Framework published in December 2024". |
| [CHECK] exact 2026 wording | Resolved | See above. |

### Scotland, two cabins as holiday lets

| Statement | Status | Why |
|---|---|---|
| "Yes, in almost every case" | Corrected (softened) | Changed to "Expect to need it"; no official page states "almost every case". |
| Planning permission required for all "development" [9] | Verified | gov.scot guidance para 2.1. |
| Council guidance treats placing a hut as development [10] | Re-sourced and reworded | Western Isles guidance blocked. Replaced by 1997 Act s26(1): development means building, engineering, mining or other operations, or any material change of use. |
| Garden buildings for short-term let lack householder PD [11] | Re-sourced and reworded | Highland blocked. Replaced by Class 3A: building must be for a purpose incidental to the house and must not consist of a dwelling [16] [18]. |
| Licence needed for every short-term let, incl. holiday cottages and pods [12] | Verified | gov.scot: mandatory for all short-term let accommodation, including holiday cottages, B&Bs, pods and yurts, "regardless of how long you let". |
| "All hosts needed one from 1 January 2025" [12] | Corrected | Date not on the gov.scot page. The page says the law changed on 1 October 2022, new hosts must get a licence before accepting bookings or guests, and existing hosts who applied before 1 October 2023 could keep operating while the council decided. Text now uses the 1 October 2022 wording. |
| In a control area, change of a dwelling to STL is a material change [13] | Verified | Circular 1/2023 para 3.1 (deemed material, with annex A exceptions). |
| Edinburgh and Badenoch and Strathspey are control areas [14] | Re-sourced (verified) | mygov.scot blocked; gov.scot licensing page says Edinburgh was designated 5 September 2022 and Highland designated the Badenoch and Strathspey ward on 4 March 2024. "Current list" cannot be confirmed as complete, so the text tells readers to ask the council. |
| Building warrant is separate [11] [15] | Re-sourced | Now cites the gov.scot technical handbooks [15] [19]. |

### Scotland, garden cabin

| Statement | Status | Why |
|---|---|---|
| Class 3A: 4 m max; 2.5 m within 1 m of boundary [16] | Verified | GPDO (Scotland) Sch 1 Class 3A (d), (e); Circular 1/2024 para 4.60. Source URL corrected (ssi path returns HTTP 400; uksi/1992/223 works). |
| Eaves max 3 m [17] | Re-sourced (verified) | Class 3A(c) and Circular para 4.60; mygov.scot blocked. |
| Conservation area or listed building grounds: footprint 4 m² [17] | **Corrected** | Wrong. Class 3A(g)/(h) and Circular paras 4.61 and 4.66: conservation area 8 m², curtilage of a listed building 4 m². |
| Not forward of principal elevation (was held back as [CHECK]) | Verified (added) | Class 3A(b): not forward of a wall forming the principal or side elevation where it fronts a road. 50% front/rear curtilage limit (3A(f)) also added. |
| Not used as a separate dwelling [18] | Verified | Circular para 4.60; Class 3A(a) "consists of a dwelling". |
| Warrant exemption up to 8 m², exceptions flue, combustion appliance, sanitary facility [19] | Corrected (incomplete) | Type 17 exceptions also include sleeping accommodation and a building within 1 m of the house unless at least 1 m from any boundary. Both added. Same wording in the April 2026 handbook (Table 0.1). |
| PKC checklist: warrant needed over 30 m², within 1 m of boundary, or with appliance/sanitary [15] | Removed and replaced | PKC blocked, and the checklist was about garages. Replaced by the April 2026 handbook Table 0.3 Schedule 3 type 4: detached single-storey building 8 to 30 m² ancillary to a house needs no warrant but must meet the standards, except within 1 m of the house (unless 1 m from any boundary), with a fixed combustion appliance or sanitary facility, or a pool deeper than 1.2 m. Resolves the [CHECK] on 8 to 30 m². |

### Permanent residence

| Statement | Status | Why |
|---|---|---|
| England PD: not separate self-contained living accommodation [2] | Verified | Planning Portal. |
| Separate home needs planning permission [3] | Re-sourced | Technical guidance (primary living accommodation not incidental). |
| Scotland: not a separate dwelling [18] | Verified | Circular 1/2024 and Class 3A [16]. |
| Building regs exemption only without sleeping accommodation [6] | Verified | Class VI. |
| Holiday lodges may be caravans; councils decide case by case [20] | Re-sourced and reworded | Council pages blocked. The legal definition was verified in the 1960 Act s29 and the 1968 Act s13 (twin-unit up to 20 m x 6.8 m, 3.05 m internal height). "Councils decide case by case" removed (not on a reachable page). |

### Agricultural land

| Statement | Status | Why |
|---|---|---|
| Part 6 covers buildings reasonably necessary for agriculture [21] | Verified | Class A; also notes the 5 ha unit size. |
| [CHECK] residential exclusion | Verified | A.1(c): not permitted if it consists of or includes the erection of a dwelling; A.1(d): not a building not designed for agricultural purposes. |
| Councils assess holiday lodges starting with caravan test [20] | Removed | Council source blocked. Replaced by a pointer to the statutory caravan definition. |
| Appeal: caravan on farmland a material change to mixed use [22] | Removed | Planning Inspectorate host blocked; decision not verified. |
| Holiday-only occupancy conditions [20] | Removed | Council source blocked. |
| Scotland: hut on land for any period is development [10] | Corrected | Replaced by 1997 Act s26: agricultural use of land is not development (s26(2)(e)), but building operations and material changes of use are. |

### Building regulations UK

| Statement | Status | Why |
|---|---|---|
| England: up to 30 m², no sleeping accommodation, exempt [6] | Verified and expanded | Class VI: up to 15 m² no sleeping accommodation; up to 30 m² also needs 1 m from boundary or substantially non-combustible. Matches the Planning Portal building regs page. |
| Wales uses the same size bands [23] | Re-sourced | gov.wales blocked; legislation.gov.uk shows Sch 2 Class VI with extent E+W. |
| NI: up to 30 m², non-combustible or 1 m from house, road and boundary [24] | Verified and expanded | Class 7(a). Added Class 7(c): up to 15 m², no sleeping accommodation, at least 1 m from a dwelling. |
| Scotland: building warrant with own exemptions [19] | Verified | See Scotland section. |

### Wales and Northern Ireland

| Statement | Status | Why |
|---|---|---|
| Wales: 4 m limit covers "dual-pitched or hipped" roofs [23] | Corrected | Wales Class E(1)(e)(i) says "a roof with more than one pitch". Also added: eaves 2.5 m; 2.5 m within 2 m of boundary; within 2 m of the house max 1.5 m high (Wales-only rule). |
| Wales C3 / C5 / C6 use classes [25] | Verified | SI 2022/994, in force 20 October 2022. C5 is "dwellinghouses, used otherwise than as sole or main residences" (wording tightened from "second homes"); C6 is commercial short-term lets up to 31 days per stay. |
| Moving between them is PD unless an Article 4 Direction removes it [25] | Verified | SI 2022/997 inserts the C3/C5/C6 change-of-use PD and Schedule 2A procedures for Article 4 directions. |
| Gwynedd and Eryri Article 4 direction; status after November 2025 court decision [26] | Removed [UNVERIFIED] | Council hosts blocked; no reachable official page. |
| NI PD set by GPDO (NI) 2015; rights restricted in designated areas [27] | Re-sourced and expanded | nidirect blocked. legislation.gov.uk Class D read: incidental purpose, 4 m height, eaves 2.5 m within 2 m of boundary, not forward of a wall facing a road, no raised platform, not for use as a dwelling, 10 m² beyond 20 m in WHS/National Park/AONB; side-of-house rule also in conservation areas. |
| "Your council's planning office confirms what applies" [27] | Kept as advice | General advice, no longer cited to nidirect. |

### FAQ, fixes and content/04 list in 04b

| Statement | Status | Why |
|---|---|---|
| AONB FAQ "special weight" | Corrected | Now "limited in scale and extent" and "substantial weight" (NPPF N4). |
| Scotland FAQ | Corrected | Licence wording now "before it takes bookings" ([12]). |
| Garden FAQ | Expanded | Added Scotland conservation-area 8 m² limit. |
| Fix 4 farmland row sourced [20] [21] | Corrected | Now [21] only. |
| Fix 5 / content/04 item 6: legal term for AONB [CHECK] | Verified | GPDO (England) E.2(a), Planning Portal and GPDO (NI) still say "area of outstanding natural beauty"; NPPF glossary defines National Landscapes as areas legally designated as AONBs. |
| content/04 item 2 (conservation area rule) | Verified | E.2 and E.3. |
| content/04 item 3 (office use) | Verified in part | Planning Portal and technical guidance do not name offices; council source [28] blocked, so no longer cited. |
| content/04 item 4 (occasional guest use) | Verified | Technical guidance excludes a bedroom as primary living accommodation. |
| content/04 item 7 (electrics) | Verified | Planning Portal electrics page: registered competent person is best; otherwise building control body or (England) third-party certifier. |
| content/04 item 8 (NPPF replaced) | Verified | See [8]. |
| content/04 item 9 (England figures) | Verified | Class E paras E.1(b) to (h): 50%, forward of principal elevation, single storey, 4 m / 2.5 m within 2 m / 3 m, eaves 2.5 m, listed buildings, no verandah, balcony or raised platform; Planning Portal 0.3 m platform. |

## Changes made to content/04-uk-planning-permission-guide.md

| Statement | Status | Why |
|---|---|---|
| Status note: "No official page could be opened" | Corrected | Replaced with a verified-2026-11-21 note listing the URLs read. |
| "Last checked: [DATE]" | Corrected | Now notes the live page's 26 October 2026 date and says to update on publishing. |
| Rule 7: conservation areas under the 20 m / 10 m² limit | Corrected | Conservation areas removed from that limit; Broads added; side-wall rule for designated land added (E.2, E.3). |
| Electrics: "must meet Part P. Use a registered electrician." | Corrected | Rewritten to the Planning Portal electrics wording. |
| FAQ office: "Yes." | Corrected | Softened to "Often yes... ask your council" (no official source names offices). |
| FAQ sleeping: "Occasional guest use can be fine." | Removed | Unsourced; contradicted by the technical guidance on bedrooms. |
| Rules 1 to 6, 8, building regulations table | Verified | Class E, Planning Portal and Class VI match. No change. |
