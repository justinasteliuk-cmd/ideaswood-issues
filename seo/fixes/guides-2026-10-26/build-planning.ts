// Builds the England planning page HTML. Rules are worded from the official texts saved in ../off/
import { readFileSync, writeFileSync } from "node:fs";
const dir = import.meta.dir;
const fit = JSON.parse(readFileSync(`${dir}/../fit.json`, "utf8")) as any[];
const fmtH = (h: number) => h.toFixed(2).replace(/0$/, "") + " m";
const area = (a: string) => a ? a.replace(",", ".").replace(/\s*m²$/, "") + " m²" : "–";
const rows = (line: string) => fit.filter(r => r.line === line)
  .map(r => `<tr><td><a href="${r.link}">${r.name}</a></td><td>${fmtH(r.h)}</td><td>${area(r.area)}</td><td>${r.wall}</td></tr>`).join("\n");
const table = (line: string) => `<table>
<thead><tr><th>Model</th><th>Building height</th><th>Internal area</th><th>Walls</th></tr></thead>
<tbody>
${rows(line)}
</tbody>
</table>`;
const html = `<p>Most garden log cabins in England do not need planning permission. They count as permitted development, as long as they meet the rules below. If your cabin breaks one rule, you need to apply. This guide covers England only. Rules in Scotland, Wales, Northern Ireland and Ireland differ; see the links at the end.</p>
<p><em>Last checked: 26 October 2026, against the Planning Portal outbuildings guidance, the government's permitted development technical guidance for householders and Schedule 2 of the Building Regulations 2010. This is general guidance, not legal advice.</em></p>

<h2>The short answer</h2>
<table>
<thead><tr><th>Your plan</th><th>Usually need planning permission?</th></tr></thead>
<tbody>
<tr><td>Garden room for your household (storage, hobbies, home working) that meets the size and position rules</td><td>Usually no</td></tr>
<tr><td>Cabin on land in front of the main wall of your house (the principal elevation)</td><td>Yes</td></tr>
<tr><td>Cabin used as a separate home, or as a bedroom, bathroom or kitchen</td><td>Yes</td></tr>
<tr><td>Cabin on designated land (National Park, the Broads, Area of Outstanding Natural Beauty, conservation area or World Heritage Site)</td><td>Possibly. Stricter limits apply. Check first.</td></tr>
<tr><td>Your home is a flat, maisonette or listed building, or your permitted development rights were removed</td><td>Yes, or check with the council</td></tr>
</tbody>
</table>

<h2>Permitted development rules for outbuildings in England</h2>
<p>Check each one for your garden:</p>
<ol>
<li><strong>Position.</strong> No outbuilding on land forward of the wall forming the principal elevation of the house.</li>
<li><strong>Height.</strong> Single storey. Eaves no higher than 2.5 m. Total height no more than 4 m with a dual-pitched roof, or 3 m with any other roof.</li>
<li><strong>Near a boundary.</strong> If the cabin is within 2 m of a boundary of your garden, its total height must be no more than 2.5 m.</li>
<li><strong>Size of the garden used.</strong> Additions and other buildings must not cover more than half the land around the "original house", meaning the house as first built, or as it stood on 1 July 1948 if it is older.</li>
<li><strong>Platforms.</strong> No verandas, balconies or raised platforms. A platform must not be higher than 0.3 m.</li>
<li><strong>Use.</strong> The cabin must be for a purpose incidental to enjoying the house, such as storage, a hobby room or other use by your household. Separate self-contained accommodation, or a bedroom, bathroom or kitchen used as main living space, is not covered.</li>
<li><strong>Designated land.</strong> In National Parks, the Broads, Areas of Outstanding Natural Beauty and World Heritage Sites, buildings more than 20 m from the house may cover no more than 10 m² in total. On all designated land, which also includes conservation areas, a building at the side of the house needs planning permission.</li>
<li><strong>Listed buildings.</strong> Any outbuilding within the grounds of a listed building needs planning permission.</li>
</ol>
<p>Heights are measured from ground level next to the building. On sloping ground, that is the highest point of the ground beside it. A base or decking under the cabin does not count as ground, so it adds to the height.</p>
<p>These rights apply to houses. They do not apply to flats or maisonettes, to some homes created through change of use, or where a planning condition, an Article 4 Direction or another restriction has removed them. When a rule does not fit, apply to your local planning authority, or ask them for a Lawful Development Certificate to confirm that your plan is allowed.</p>

<h2>Building regulations (different from planning)</h2>
<p>Building regulations cover how the cabin is built, not whether you may put it up. A small detached building is exempt in these cases:</p>
<table>
<thead><tr><th>Floor area of the cabin</th><th>No sleeping accommodation</th><th>With sleeping accommodation</th></tr></thead>
<tbody>
<tr><td>Up to 15 m²</td><td>Exempt</td><td>Not exempt</td></tr>
<tr><td>Over 15 m² and up to 30 m², single storey</td><td>Exempt if every part is at least 1 m from the boundary, or the cabin is built substantially of non-combustible material</td><td>Not exempt</td></tr>
<tr><td>Over 30 m²</td><td>Not exempt. Contact building control.</td><td>Not exempt</td></tr>
</tbody>
</table>
<p>A timber cabin is not built of non-combustible material, so between 15 and 30 m² keep it at least 1 m from every boundary to stay exempt.</p>
<p>Electrical work in a garden, shed or other outbuilding must meet the building regulations. A complete new circuit is notifiable work. An electrician registered with a competent person scheme can self-certify it. Otherwise a building control body, or in England a registered third-party certifier, must be notified before work starts and must inspect it.</p>

<h2>Which of our buildings fit under 2.5 m?</h2>
<p>These garden cabins have a total building height of 2.5 m or less, as listed on each product page. On height, they can stand within 2 m of a boundary. Models with more than 15 m² of floor area must still be at least 1 m from every boundary to stay exempt from building regulations. Remember to add the height of the base or foundation, because height is measured from the ground.</p>
<h3>Smart Line cabins</h3>
${table("Smart Line")}
<h3>Other garden cabins and studios</h3>
${table("other")}

<h2>Checking your own garden</h2>
<ol>
<li>Measure the distance from the cabin to each boundary, and add the base to the height of the highest point.</li>
<li>Check on your council's website whether your land is designated, or whether permitted development rights were removed.</li>
<li>Read the Planning Portal guidance on outbuildings, or ask your council for a Lawful Development Certificate.</li>
</ol>

<h2>Official guidance</h2>
<ul>
<li>Planning Portal: <a href="https://www.planningportal.co.uk/permission/common-projects/outbuildings/planning-permission" rel="noopener" target="_blank">permitted development rights for outbuildings</a></li>
<li>Planning Portal: <a href="https://www.planningportal.co.uk/permission/common-projects/outbuildings/is-building-regulations-approval-needed-for-an-outbuilding" rel="noopener" target="_blank">building regulations approval for an outbuilding</a></li>
<li>GOV.UK: <a href="https://www.gov.uk/government/publications/permitted-development-rights-for-householders-technical-guidance" rel="noopener" target="_blank">permitted development rights for householders, technical guidance</a></li>
<li>legislation.gov.uk: <a href="https://www.legislation.gov.uk/uksi/2010/2214/schedule/2" rel="noopener" target="_blank">Building Regulations 2010, Schedule 2 (exempt buildings)</a></li>
<li>Planning Portal: <a href="https://www.planningportal.co.uk/find-your-local-planning-authority" rel="noopener" target="_blank">find your local planning authority</a></li>
<li>Scotland: <a href="https://www.gov.scot/policies/planning-architecture/" rel="noopener" target="_blank">gov.scot</a> and your local council</li>
<li>Wales: <a href="https://www.gov.wales/planning-permission" rel="noopener" target="_blank">gov.wales</a></li>
<li>Northern Ireland: <a href="https://www.nidirect.gov.uk/" rel="noopener" target="_blank">nidirect.gov.uk</a> and your local council</li>
<li>Republic of Ireland: <a href="https://www.citizensinformation.ie/" rel="noopener" target="_blank">citizensinformation.ie</a> and your local authority</li>
</ul>

<h2>Planning permission questions</h2>
<p><strong>Can I put a log cabin at the bottom of my garden without permission?</strong> Often yes in England, if it meets the height, position and use rules above. Within 2 m of a boundary, keep the total height at or below 2.5 m, measured from the ground.</p>
<p><strong>Can I use a garden cabin as an office?</strong> Usually yes, if it is for your own household's use alongside the house. A business with staff or visiting clients may need planning permission, so ask your council.</p>
<p><strong>Can I sleep in my log cabin?</strong> Permitted development does not cover a cabin used as a bedroom or as separate living accommodation, and a building with sleeping accommodation is not exempt from building regulations. Ask your council before you plan any sleeping use.</p>
<p><strong>Do I need permission for a sauna or a garage?</strong> The Planning Portal lists sauna cabins and garages among outbuildings, so the same rules apply. Check the height limit for your roof type and the position rule.</p>
<p><strong>Does the cabin need a foundation?</strong> Yes, every cabin needs a firm, level base. The base is arranged locally and is not part of the kit. Count its height when you check the 2.5 m limit.</p>

<p><strong>Not sure your plan fits?</strong> Send us the size and your garden measurements through our <a href="https://ideaswood.eu/contact-us/">contact page</a> and we'll tell you which of our models stay inside the limits.</p>`;
writeFileSync(`${dir}/planning.html`, html);
console.log("rows", fit.length, "bytes", html.length);
