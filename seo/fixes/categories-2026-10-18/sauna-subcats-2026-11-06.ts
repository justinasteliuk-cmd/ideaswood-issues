// Sauna sub-category descriptions for ideaswood.eu, 2026-11-06. Every number comes from the live Store API catalogue
// (Sauna S/M/L/XL, Amber, Nova, Pulse, Zen, two barrels, one pod, one indoor sauna). Prices incl. VAT as shown on the site.
// Written kses-safe (p/strong/a only) so they can go through REST if the wp-admin session is gone; the mu-plugin splits
// the text at <!--iw-below--> (intro above the grid, guide below).
export type T = { id: number; slug: string; kw: string; above: string; below: string };
const L = (p: string, t: string) => `<a href="https://ideaswood.eu/${p}">${t}</a>`;
export const TEXTS: T[] = [
{ id: 66, slug: "outdoor-sauna", kw: "outdoor sauna",
above: `<p>Eleven outdoor saunas for the garden, from €2,707 for a 1.7 m barrel to €15,892 for the three-room Sauna XL. Two barrel saunas, one sauna pod and eight cabin saunas, all in pine or spruce with 44–45 mm walls, delivered to the UK, Ireland and Europe.</p>`,
below: `<p><strong>Which type?</strong> A ${L("product-category/sauna/outdoor-sauna/barrels-sauna/", "barrel sauna")} is the quickest to place and heats evenly; the 5.9 m version adds a changing room. The ${L("product-category/sauna/outdoor-sauna/sauna-pods/", "sauna pod")} (2.4 × 1.9 m) fits a small garden or a glamping pitch. ${L("product-category/sauna/outdoor-sauna/sauna-cabins/", "Cabin saunas")} give more room, larger glazing and, on Sauna L and XL, a separate rest or changing room.</p>
<p><strong>How many people?</strong> The barrel 1.7 m, the pod and the cabins Pulse, Zen, Nova, S and M are listed for 2–4 people; the 5.9 m barrel, Sauna L and Sauna XL for 4–8.</p>
<p><strong>Construction.</strong> Barrel, pod, Pulse, Zen, Nova and Amber have 44 mm solid pine walls and a bitumen-shingle roof. Sauna S, M, L and XL are built from 45 × 185 mm profiled spruce beams with a low-pitch modern roof and tempered glazing.</p>
<p><strong>On site.</strong> A level, dry base, clear ventilation and the distances in the heater manual. An electric heater needs a qualified electrician.</p>
<p>See ${L("how-much-does-a-garden-sauna-cost/", "what a garden sauna costs")}. Pair it with a ${L("product-category/hot-tubs/", "wood-fired hot tub")}. Retailers and hotels: ${L("wellness-saunas/", "saunas for trade")}.</p>` },

{ id: 69, slug: "sauna-cabins", kw: "sauna cabin",
above: `<p>Eight cabin saunas from €6,391 (Sauna S) to €15,892 (Sauna XL): Pulse, Zen, Nova and Amber with 44 mm pine log walls, and the S, M, L and XL series in 45 × 185 mm profiled spruce beams with a modern low-pitch roof. For 2–4 people, or 4–8 on Sauna L and XL. Delivered to the UK, Ireland and Europe.</p>`,
below: `<p><strong>Compact cabins.</strong> Sauna S and M (sauna room 2.09 × 2.09 m) and Pulse (2.39 × 3.34 m) suit a small garden. Nova (3.34 × 2.39 m) adds a 150 × 198 cm glazed panel; Zen has a double glazed door and three windows.</p>
<p><strong>Room to rest.</strong> Sauna L (4.13 × 2.09 m sauna room, 2 rooms) and Sauna XL (3.58 × 4.63 m, 3 rooms, building 4.28 × 7.63 m) have a separate room for changing or cooling down. Amber has 16.3 m² inside under a 25.6 m² roof.</p>
<p><strong>Glazing and doors.</strong> The S–XL series uses tempered glass packages and 8 mm glass sauna doors; Pulse, Nova and the pod use tempered double-glazed windows.</p>
<p><strong>Heater.</strong> Wood-fired heaters give the traditional heat and work without electricity; electric heaters are simpler to run and need a qualified electrician.</p>
<p>Smaller or quicker: ${L("product-category/sauna/outdoor-sauna/barrels-sauna/", "barrel saunas")} and the ${L("product-category/sauna/outdoor-sauna/sauna-pods/", "sauna pod")}. Prices explained: ${L("how-much-does-a-garden-sauna-cost/", "garden sauna costs")}.</p>` },

{ id: 71, slug: "barrels-sauna", kw: "barrel sauna",
above: `<p>Two barrel saunas, both 1.97 m in diameter with 44 mm pine walls and a bitumen-shingle roof: the 1.7 m barrel for 2–4 people at €2,707, and the 5.9 m barrel for 4–8 people with a changing room at €7,655. Delivered to the UK, Ireland and Europe.</p>`,
below: `<p><strong>Why a barrel.</strong> The round shape leaves little dead air, so it heats quickly and evenly, and the kit stands on two cradles with no deep foundation.</p>
<p><strong>1.7 m barrel.</strong> One room, 700 × 1600 mm door, a 295 × 580 mm window, 2.08 m high. Offered in pine or thermowood.</p>
<p><strong>5.9 m barrel.</strong> The same diameter with a 1.5 m changing room in front of the sauna room, a glued pine outside door and room for 4–8.</p>
<p><strong>On site.</strong> A level base, clear vents and the heater manual's clearances. Treat the outside of the barrel as you would any exterior timber; see the ${L("thermowood-cladding-for-timber-buildings/", "thermowood guide")} for the thermowood option.</p>
<p>More room: ${L("product-category/sauna/outdoor-sauna/sauna-cabins/", "cabin saunas")}. Prices: ${L("how-much-does-a-garden-sauna-cost/", "what a garden sauna costs")}.</p>` },

{ id: 70, slug: "sauna-pods", kw: "sauna pod",
above: `<p>The Sauna Pod 2.4 × 1.9 m is the smallest outdoor sauna in the range: one room for 2–4 people, 44 mm pine walls, 2.6 m high, bitumen-shingle roof, two tempered double-glazed windows and an 850 × 1920 mm door. €3,896, delivered to the UK, Ireland and Europe.</p>`,
below: `<p><strong>Where it fits.</strong> A corner of a small garden, a terrace, a glamping pitch or a holiday let. The footprint is under 5 m².</p>
<p><strong>On site.</strong> A level, dry base (paving slabs or a small slab), clear vents and the distances in the heater manual. An electric heater needs a qualified electrician.</p>
<p>Need a changing room or space for more people? See ${L("product-category/sauna/outdoor-sauna/barrels-sauna/", "barrel saunas")} and ${L("product-category/sauna/outdoor-sauna/sauna-cabins/", "cabin saunas")}. Prices explained: ${L("how-much-does-a-garden-sauna-cost/", "garden sauna costs")}.</p>` },

{ id: 65, slug: "indoor-sauna", kw: "indoor sauna",
above: `<p>The Standard Indoor Sauna is a pine sauna room for inside the house, a gym or a hotel, from €1,000. Fourteen sizes from 1.2 × 1.4 m to 2.2 × 2.2 m, including corner and glass-front (G) layouts, with an 850 × 1920 mm door and room for 2–4 people.</p>`,
below: `<p><strong>Choosing a size.</strong> 1.2 × 1.4 m and 1.6 × 1.96 m suit one or two people; 1.96 × 1.96 m and larger seat a family. Corner versions use a diagonal front for tight rooms; the G versions have a glass front.</p>
<p><strong>Installation.</strong> The room needs a water-resistant floor, a ventilation inlet and outlet, and an electrical supply sized for the heater; a qualified electrician connects it.</p>
<p>Outdoor options: ${L("product-category/sauna/outdoor-sauna/", "outdoor saunas")}.</p>` },
];
