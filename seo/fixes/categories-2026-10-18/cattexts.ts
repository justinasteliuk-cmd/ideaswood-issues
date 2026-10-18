// Category texts for ideaswood.eu, 2026-10-18. Every number comes from the live Store API catalogue (see cat/*.json).
// above = shown above the product grid, below = shown under it (split by the mu-plugin on <!--iw-below-->).
export type T = { id: number; slug: string; kw: string; above: string; below: string };
const L = (p: string, t: string) => `<a href="https://ideaswood.eu/${p}">${t}</a>`;
export const TEXTS: T[] = [
{ id: 657, slug: "garden-cabins", kw: "garden cabins",
above: `<h1>Garden cabins</h1>
<p>53 garden log cabins from €2,626, with 6 to 35 m² of floor space inside. Use one as a garden office, studio, gym or guest room. Walls are solid logs, 44 mm on most models and 58 or 68 mm on the largest, and every cabin ships as a pre-cut kit to the UK, Ireland and the rest of Europe.</p>`,
below: `<h2>How to choose a garden cabin</h2>
<p>Start with how you will use it. A cabin for summer afternoons needs less than a room you will work in through the winter.</p>
<table>
<thead><tr><th>Wall</th><th>Models</th><th>Price</th><th>Good for</th></tr></thead>
<tbody>
<tr><td>44 mm</td><td>50</td><td>€2,626 – €12,517</td><td>Home office, studio, hobby room. Add floor and roof insulation and a heater for the cold months.</td></tr>
<tr><td>58–68 mm</td><td>3</td><td>€10,535 – €15,296</td><td>Larger guest cabins. Thicker logs hold heat for longer.</td></tr>
</tbody></table>
<p><strong>Size.</strong> Around 10–14 m² inside takes a desk, shelving and a small sofa. For a bed or a meeting table, look at 20 m² and up. Most models have one room; some have two to four, and 15 come with a covered terrace.</p>
<p><strong>Economic or Premium.</strong> 21 models are sold as an Economic or a Premium set. Both are listed on the product page, so you can compare before you order.</p>
<p><strong>Base and assembly.</strong> A cabin needs a firm, level base such as a concrete slab, paving slabs or ground screws. See ${L("easy-installation/", "how assembly works")}.</p>
<p><strong>Warranty.</strong> 51 of the 53 models list a 60-month warranty on the product page.</p>
<p>Compare with ${L("product-category/summer-houses-chalets/", "summer houses and chalets")} and ${L("product-category/sheds-storage-cabins/", "sheds and storage cabins")}, or see ${L("how-much-does-a-garden-cabin-cost/", "what a garden cabin costs")}.</p>
<h2>Garden cabin questions</h2>
<p><strong>What wall thickness suits a garden office?</strong> 44 mm, with floor and roof insulation and a heater. The logs alone do not keep a room warm in winter.</p>
<p><strong>Can you build a cabin to my own size?</strong> ${L("price-my-cabin/", "Send us a sketch or a photo")} and we will draw and price it.</p>` },

{ id: 665, slug: "summer-houses-chalets", kw: "wooden summer house",
above: `<h1>Wooden summer houses and chalets</h1>
<p>31 wooden summer houses and chalets from €4,979, with 15 to 74 m² inside. These are bigger than a garden cabin: many have two to five rooms and a terrace, and 15 models come with shutters. Solid log walls from 28 to 68 mm, delivered as a kit to the UK, Ireland and Europe.</p>`,
below: `<h2>Choosing a summer house</h2>
<p>A summer house is a place to stay, not only to sit. Pick it by how many people sleep there and how long into the year you want to use it.</p>
<table>
<thead><tr><th>Wall</th><th>Models</th><th>Price</th></tr></thead>
<tbody>
<tr><td>28 mm</td><td>1</td><td>€4,979</td></tr>
<tr><td>44 mm</td><td>11</td><td>€7,114 – €21,400</td></tr>
<tr><td>58 mm</td><td>8</td><td>€16,788 – €30,721</td></tr>
<tr><td>68 mm</td><td>11</td><td>€16,694 – €27,902</td></tr>
</tbody></table>
<p><strong>Walls.</strong> 44 mm suits spring to autumn. 58 and 68 mm logs are the choice if you want to stay longer in the year and add insulation and heating.</p>
<p><strong>Terrace and shutters.</strong> 21 models have a terrace, up to 20 m² on the largest. Shutters are listed on 15 models.</p>
<p><strong>Rooms.</strong> Where the room count is listed, layouts go from two to five rooms. The floor plan is on each product page.</p>
<p>Need something to live in all year? See ${L("product-category/insulated-wooden-houses/", "insulated wooden houses")} and ${L("product-category/villas-country-houses/", "villas and country houses")}.</p>
<h2>Summer house questions</h2>
<p><strong>Is a summer house the same as a garden room?</strong> Not quite. A garden room is usually one insulated room for daily use. A summer house has several rooms and is built for stays in the warmer months.</p>
<p><strong>How do I protect the wood?</strong> Treat it soon after assembly. Our ${L("wood-impregnation-treatment-for-log-cabins-complete-guide-to-koralan-uk-110/", "wood treatment guide")} explains how.</p>` },

{ id: 663, slug: "sheds-storage-cabins", kw: "wooden garden sheds",
above: `<h1>Wooden sheds and storage cabins</h1>
<p>49 wooden sheds and storage cabins from €1,349 to €5,689, with 2 to 18 m² inside. For tools, bikes, a mower or firewood. 47 models have 28 mm solid walls and two have 44 mm. Each comes as a flat-pack kit with a timber floor, delivered to the UK, Ireland and Europe.</p>`,
below: `<h2>What to look for in a garden shed</h2>
<table>
<thead><tr><th>You want to store</th><th>Look for</th></tr></thead>
<tbody>
<tr><td>Hand tools, small items</td><td>2–5 m² inside, a single door</td></tr>
<tr><td>Bikes and a mower</td><td>7–10 m² and a double door</td></tr>
<tr><td>A workbench or a hobby corner</td><td>10 m² and up, a window, or a 44 mm model</td></tr>
</tbody></table>
<p><strong>Door.</strong> Measure your widest item first. Door width and type are listed on each product page; many larger sheds have a double door.</p>
<p><strong>Windows.</strong> Most sheds have single glazing, which is enough for storage. A few have double glazing.</p>
<p><strong>Terrace.</strong> Seven models add a small covered terrace, useful for firewood or a bench.</p>
<p><strong>Base.</strong> A shed needs a flat, firm base: paving slabs, a gravel bed with a timber frame, or ground screws. Treat the timber after assembly.</p>
<p>Need more room? See ${L("product-category/garden-cabins/", "garden cabins")} or ${L("product-category/garages-carports/", "garages and carports")}.</p>
<h2>Shed questions</h2>
<p><strong>Can I build a shed myself?</strong> Yes. Two people with basic tools can put up a small shed. See ${L("easy-installation/", "how assembly works")}.</p>
<p><strong>Is 28 mm enough?</strong> For storage, yes. For a workshop you will heat, choose a thicker wall.</p>` },

{ id: 667, slug: "camping-pods", kw: "camping pods",
above: `<h1>Camping pods</h1>
<p>Two timber camping pods for campsites, farms and holiday parks: an insulated 2.4 x 3.0 m pod for two people at €5,336, and a 3 x 5.9 m pod with 28 mm walls at €4,866. Spruce and pine, supplied as a kit for the UK, Ireland and Europe.</p>`,
below: `<h2>Insulated or not</h2>
<table>
<thead><tr><th></th><th>Camping Pod 2.4 x 3.0 m Insulated</th><th>Camping Pod 3 x 5.9 m</th></tr></thead>
<tbody>
<tr><td>Walls</td><td>126 mm sides, 118 mm front and back</td><td>28 mm</td></tr>
<tr><td>Insulation</td><td>100 mm stone wool in floor and walls</td><td>None</td></tr>
<tr><td>Inside</td><td>4.3 m², sleeps 2</td><td>15 m², 2 rooms</td></tr>
<tr><td>Door</td><td>1010 x 1820 mm</td><td>1200 x 1850 mm and 700 x 1850 mm</td></tr>
<tr><td>Price</td><td>€5,336</td><td>€4,866</td></tr>
</tbody></table>
<p>The insulated pod lets you open earlier in spring and stay open later in autumn. The larger pod gives more space for summer stays.</p>
<p><strong>Fit-out.</strong> Electrics, furniture and bedding are planned by the site owner.</p>
<p><strong>Planning.</strong> Pods on a commercial site usually need planning permission or a site licence. Ask your local planning authority before you order.</p>
<p>Several pods for one site? ${L("contact-us/", "Contact us")} for a quote. For a bigger unit, see ${L("product-category/garden-cabins/", "garden cabins")}.</p>` },

{ id: 23, slug: "bbq-grill-cabin", kw: "bbq grill cabin",
above: `<h1>BBQ grill cabins</h1>
<p>Grill cabins from 4.5 to 16.5 m², seating from 3–5 up to 15–21 people around a central grill, priced €4,312 to €8,723. Grill sets for 6- and 8-corner cabins start at €1,392. 45 mm pine walls, bitumen-shingle roof, supplied as a kit to the UK, Ireland and Europe.</p>`,
below: `<h2>Choosing a grill cabin</h2>
<p>A grill cabin is a covered dining room built around a fire. Guests sit on benches round the grill, so the cook stays part of the evening, in any weather.</p>
<table>
<thead><tr><th>Cabin</th><th>Seats</th><th>Price</th></tr></thead>
<tbody>
<tr><td>Grill Cabin 4.5 m²</td><td>3–5</td><td>€4,312</td></tr>
<tr><td>Grill Cabin 6.9 m²</td><td>10–15</td><td>€6,155</td></tr>
<tr><td>Exclusive grill cabin 7.0 m²</td><td>10–15</td><td>€7,449</td></tr>
<tr><td>Grill Cabin 9.2 m²</td><td>12–15</td><td>€6,429</td></tr>
<tr><td>Grill Cabin 14.9 m²</td><td>14–20</td><td>€8,076</td></tr>
<tr><td>Grill Cabin 16.5 m²</td><td>15–21</td><td>€8,723</td></tr>
</tbody></table>
<p><strong>The grill.</strong> The Standard 6- and 8-corner grill sets and the Luxury set fit the cabins; the product pages list firebox, hood and chimney sizes. Flame BBQ fire bowls (Ø 1.06 and 1.4 m) are for open terraces.</p>
<p><strong>Safety.</strong> Follow the clearances in the manual and local fire rules for the flue.</p>
<p>Pair it with a ${L("product-category/hot-tubs/", "wood-fired hot tub")} or ${L("product-category/furniture/garden-furniture/", "garden furniture")}.</p>` },

{ id: 655, slug: "a-frames", kw: "a-frame cabin",
above: `<h1>A-frame cabins</h1>
<p>Three A-frame houses, from €18,091 to €31,825, with 36 to 52 m² inside. The steep roof forms the walls and gives a high, bright room under the ridge. Timber frame construction in pine, delivered as a kit to the UK, Ireland and Europe.</p>`,
below: `<h2>Why an A-frame</h2>
<p>The shape sheds rain and snow, and the tall gable gives a high, open room. It works well as a holiday let, a guest house or a cabin by the water.</p>
<p><strong>Models.</strong> A-frame 32, A-frame 39 and A-frame Moose. Two have 2 rooms and 36 m² inside; the largest has 5 rooms and 52 m².</p>
<p><strong>Planning.</strong> A cabin used for overnight stays usually needs planning permission. Ask your local planning authority first.</p>
<p>Prefer a log building? See ${L("product-category/summer-houses-chalets/", "summer houses and chalets")}. For a quote on your plot, ${L("contact-us/", "contact us")}.</p>` },

{ id: 659, slug: "insulated-wooden-houses", kw: "wooden house kits",
above: `<h1>Insulated wooden houses</h1>
<p>Seven insulated wooden house kits for living, from €15,812 to €62,101, with 35 to 62 m² inside. Models include Verno, Kaia, Luni, Solari and Nordic L. Most have three or four rooms and are sold as an Economic or a Premium set, delivered to the UK, Ireland and Europe.</p>`,
below: `<h2>Before you choose a house kit</h2>
<p><strong>Size.</strong> Verno has 35 m² inside, Luni 47 m², Kaia and Solari about 50 m². The floor plan and room list are on each product page.</p>
<p><strong>Economic or Premium.</strong> Five models come in both sets. Compare them on the product page.</p>
<p><strong>Permission.</strong> A house you live in needs planning permission and building approval in your country. Check this before you order.</p>
<p><strong>Foundation.</strong> A strip, pad or slab foundation, prepared by a local builder.</p>
<p>Read ${L("everything-you-need-to-know-about-insulation-kits-for-sheds-cabins-modular-homes/", "how insulation kits work")} and ${L("pvc-windows-for-log-cabins/", "which windows we recommend")}. For larger homes, see ${L("product-category/villas-country-houses/", "villas and country houses")}.</p>
<h2>House kit questions</h2>
<p><strong>Can I live in it all year?</strong> Yes, with the right insulation, heating and approvals for your site.</p>
<p><strong>Can you change the layout?</strong> ${L("price-my-cabin/", "Send us your plan")} and we will price it.</p>` },

{ id: 666, slug: "villas-country-houses", kw: "log house kits",
above: `<h1>Villas and country houses</h1>
<p>38 log houses from €14,871 to €61,900, from 22 m² up to 132 m² inside, with three to eleven rooms. Most have 68 or 58 mm solid log walls, and many have a large terrace or balcony. Delivered as a kit to the UK, Ireland and Europe.</p>`,
below: `<h2>Choosing a log house</h2>
<table>
<thead><tr><th>Wall</th><th>Models</th><th>Price</th></tr></thead>
<tbody>
<tr><td>44 mm</td><td>3</td><td>€19,617 – €25,544</td></tr>
<tr><td>58 mm</td><td>12</td><td>€25,118 – €58,426</td></tr>
<tr><td>68 mm</td><td>22</td><td>€14,871 – €61,900</td></tr>
</tbody></table>
<p><strong>Rooms and space.</strong> Smaller houses have three or four rooms; the largest have up to eleven and more than 100 m² inside. 30 models have a terrace, some over 50 m².</p>
<p><strong>Glazing.</strong> Windows and doors are double glazed on the models that list glazing.</p>
<p><strong>Permission and foundation.</strong> A house you live in needs planning permission and building approval. Your builder prepares the foundation.</p>
<p>See ${L("product-category/insulated-wooden-houses/", "insulated wooden houses")} for compact homes, and ${L("how-much-does-a-garden-cabin-cost/", "our price guide")} for typical budgets.</p>
<h2>Log house questions</h2>
<p><strong>58 or 68 mm?</strong> Both are solid logs. 68 mm walls hold heat a little better and are used on most of the larger houses.</p>
<p><strong>Do you deliver to the UK and Ireland?</strong> Yes, as well as across Europe.</p>` },

{ id: 656, slug: "garages-carports", kw: "wooden garage kit",
above: `<h1>Wooden garages and carports</h1>
<p>16 wooden garages, carports and garage-carport combinations from €2,871 to €11,767, with 13 to 50 m² under cover. All have 44 mm solid log walls and a pine structure. Delivered as a kit to the UK, Ireland and Europe.</p>`,
below: `<h2>Garage or carport</h2>
<p><strong>Garage.</strong> Closed and lockable, with room for a car and storage.</p>
<p><strong>Carport.</strong> Open sides, cheaper and quicker to build, and it keeps rain and sun off the car.</p>
<p><strong>Combination.</strong> Several models join a closed garage with a carport or a covered terrace under one roof.</p>
<p><strong>Size.</strong> Footprints run from 3 x 5 m to 8.8 x 5.8 m. Check the internal size on the product page against your car, and leave room to open the doors.</p>
<p><strong>Economic or Premium.</strong> Six models come in both sets.</p>
<p><strong>Base.</strong> A concrete slab is best under a garage. Check height and boundary limits with your local planning authority before you build.</p>
<p>Need storage only? See ${L("product-category/sheds-storage-cabins/", "sheds and storage cabins")}.</p>` },

{ id: 27, slug: "sauna", kw: "outdoor sauna",
above: `<h1>Saunas</h1>
<p>12 saunas from €1,000 for an indoor sauna to €15,892 for the Sauna XL: barrel saunas, a sauna pod and cabin saunas for the garden, plus an indoor model in 14 sizes. Pine and spruce, 44–45 mm walls on the outdoor models, delivered to the UK, Ireland and Europe.</p>`,
below: `<h2>Choosing an outdoor sauna</h2>
<table>
<thead><tr><th>Type</th><th>Models</th><th>Price</th><th>Notes</th></tr></thead>
<tbody>
<tr><td>Barrel sauna</td><td>1.7 m and 5.9 m long, Ø 1.97 m</td><td>€2,707 – €7,655</td><td>The 5.9 m barrel has a changing room and seats 4–8.</td></tr>
<tr><td>Sauna pod</td><td>2.4 x 1.9 m</td><td>€3,896</td><td>Compact, for 2–4 people.</td></tr>
<tr><td>Cabin sauna</td><td>Pulse, Zen, Amber, Nova, S, M, L, XL</td><td>€6,391 – €15,892</td><td>Pulse, Zen, Amber and Nova seat 2–4; L and XL seat 4–8.</td></tr>
</tbody></table>
<p><strong>Timber.</strong> The 1.7 m barrel is also offered in thermowood. Read about ${L("thermowood-cladding-for-timber-buildings/", "thermowood")}.</p>
<p><strong>Base and safety.</strong> Place the sauna on a level, dry base, keep vents clear, and follow the heater manual for distances and the flue.</p>
<p>See ${L("how-much-does-a-garden-sauna-cost/", "what a garden sauna costs")}. Retailers and hotels: ${L("wellness-saunas/", "saunas for trade")}.</p>
<h2>Sauna questions</h2>
<p><strong>Do I need an electrician?</strong> For an electric heater, yes. A qualified electrician should connect it.</p>` },

{ id: 26, slug: "hot-tubs", kw: "wood fired hot tub",
above: `<h1>Hot tubs</h1>
<p>Four wooden hot tubs from €2,548 to €7,811: round tubs with an external or an integrated firewood stove, an oval double tub for two, and a square tub for seven. Water capacity from 650 to 1,500 litres. Delivered to the UK, Ireland and Europe.</p>`,
below: `<h2>Choosing a hot tub</h2>
<table>
<thead><tr><th>Tub</th><th>People</th><th>Size</th><th>Water</th><th>Price</th></tr></thead>
<tbody>
<tr><td>Double hot tub (oval)</td><td>2</td><td>120 x 190 cm</td><td>650–750 l</td><td>€2,548</td></tr>
<tr><td>Outside firewood stove (round)</td><td>6–10</td><td>Ø 2 or 2.25 m</td><td>900 or 1,300 l</td><td>€2,761</td></tr>
<tr><td>Integral firewood stove (round)</td><td>4–8</td><td>Ø 2 m</td><td></td><td>€3,185</td></tr>
<tr><td>Square hot tub</td><td>7</td><td>2.2 x 2.2 m</td><td>1,500 l</td><td>€7,811</td></tr>
</tbody></table>
<p><strong>Heating.</strong> An external stove sits outside the tub and keeps the bathing space free. An integral stove sits inside the water. The round integral tub is also offered with an electric heater.</p>
<p><strong>Timber.</strong> The integral tub is listed in larch, red cedar, thermowood or wood composite.</p>
<p><strong>Placement.</strong> A firm, level base, water nearby and space around the stove.</p>
<p>Make it a wellness corner with an ${L("product-category/sauna/", "outdoor sauna")}.</p>` },

{ id: 82, slug: "garden-furniture", kw: "wooden garden furniture",
above: `<h1>Wooden garden furniture</h1>
<p>Four solid timber garden sets from €910 to €1,232: two dining sets, a lounge set and a set with four dining chairs. North spruce and pine, built for outdoor use, delivered on their own or with a cabin to the UK, Ireland and Europe.</p>`,
below: `<h2>Sets and sizes</h2>
<table>
<thead><tr><th>Set</th><th>Table (L x W x H)</th><th>Price</th></tr></thead>
<tbody>
<tr><td>Wooden Dining Set</td><td>150 x 88 x 74 cm</td><td>€995</td></tr>
<tr><td>Dining Set</td><td>140 x 80 x 68 cm</td><td>€995</td></tr>
<tr><td>Dining chairs set of 4</td><td>135 x 77 x 72 cm</td><td>€1,232</td></tr>
<tr><td>Lounge Set</td><td>120 x 60 x 44 cm</td><td>€910</td></tr>
</tbody></table>
<p><strong>Space.</strong> Measure your terrace and leave about 70 cm behind each chair to pull it out.</p>
<p><strong>Care.</strong> Clean with a soft brush and mild soap, oil or stain once a year, and cover or store the set dry in winter.</p>
<p>Under a roof: see ${L("product-category/pergola/wooden-pergola/", "wooden pergolas")} and ${L("product-category/bbq-grill-cabin/", "BBQ grill cabins")}.</p>` },

{ id: 72, slug: "pergola", kw: "wooden pergola",
above: `<h1>Pergolas</h1>
<p>12 pergolas from €1,710 to €11,231: freestanding wooden pergolas from 3 x 3 m to 4 x 4 m, wall-mounted 4 x 6 m pergolas and pergola cabins with a small closed room. Delivered as a kit to the UK, Ireland and Europe.</p>`,
below: `<h2>Choosing a pergola</h2>
<p><strong>Freestanding.</strong> Zulu, Rose, Missy and Oli (3 x 3 m) and Uma and Modu (4 x 4 m), all with a gable roof and 19 mm roof boards.</p>
<p><strong>Wall-mounted.</strong> A 4 x 6 m pergola against the house, open (€5,946) or closed (€11,231).</p>
<p><strong>Pergola cabins.</strong> Linsi, Luna, Haga and Kipa join a small 68 mm log room to a covered terrace.</p>
<p><strong>Base.</strong> Fix the posts to a firm base as the manual shows. Next to a house, check local height limits before you build.</p>
<p>Furnish it: ${L("product-category/furniture/garden-furniture/", "wooden garden furniture")}.</p>` },
];
