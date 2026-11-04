# Build brief: Future Star Labs website

You are building the new website for **Future Star Laboratories** (legal entity: Future Star Labs LLC). It builds programmable biological testing platforms for Physical AI labs, starting with **BacteSign**. It also publishes an open study notebook on physics, materials and energy.

## Start here

1. Open **`design-reference.html`** in this folder. It is a working, single-file demo of the finished site, and it is the source of truth for:
   - the look: colors, fonts, spacing, layout
   - all page copy (use its text word for word unless I ask for changes)
   - every interaction and its math
2. Rebuild it as a proper Next.js project. It should match the reference closely, but use clean components and real routes instead of one HTML file.
3. Don't copy code or text from futurestarlabs.vercel.app or any other existing site. Everything you need is in this folder.

## Tech

- Next.js (App Router) with TypeScript, deployed to Vercel.
- Tailwind CSS. Load fonts with `next/font/google`: Spectral (display), IBM Plex Sans (body) and IBM Plex Mono (labels, equations, readouts).
- Keep all content in data files (`content/subjects.ts`, `content/company.ts`, etc.) so I can edit text without touching layout code.
- No backend or database.

## Routes

The reference uses `#hash` links to switch views. In the real site, use real routes:

| Reference hash | Real route |
|---|---|
| `#top` and home anchors (`#platform`, `#about`, `#fields`, `#feature`, `#notebook`, `#experiment`, `#method`) | `/` with section anchors |
| `#company` | `/company` |
| `#bactesign` | `/bactesign` (with the simulator at `#simulator`) |
| `#thermoelectrics`, `#physics`, … (8 subjects) | `/subjects/[slug]` |
| `#physics-induction` and similar | `/subjects/physics#induction` |

Keep these slugs: thermoelectrics, physics, thermodynamics, material-structures, thin-films, vacuum-system, colloids-and-interfaces, electrophysiology.

## Pages

**Global header:** wordmark, Home, Company, BacteSign, About, Projects ↗, Events ↗, a Subjects dropdown (8 internal subjects, then external links under "On futurestarlabs.com"), Investments ↗, Products ↗, Percent Difference ↗, and a highlighted Livestreams button. Below 1240px wide it collapses into a Menu button. External links open in a new tab.

**Global footer:** Explore, Subjects, Projects, Elsewhere columns, copyright line and Back to top button, as in the reference.

**Home (`/`), in order:** intro loader (once per session, skippable, at most about 1.2 seconds, skipped for reduced motion) → hero with live probe readout → 01 Platform (company tree: BacteSign and future cell applications) → 02 About, with the **interference canvas** → 03 Fields → 04 Thermoelectrics, with the **step-through couple diagram** → 05 Notebook index → 06 Experiment, with the **Seebeck simulator** → 07 Method → closing call to action.

**Company (`/company`):** intro and key facts, status legend, The problem (4 cards), Our approach (5-step pipeline with status labels), Roadmap (Now / Next / Later), Team (Andre Childs, Karolina Budzen, programs).

**BacteSign (`/bactesign`):** intro, three use cards, How a run works (5 steps), the **readout simulator** with its protocol request panel and disclaimer.

**Subject pages (`/subjects/[slug]`):** breadcrumb, title, summary, table of contents, sections with equation blocks, "Original notes on futurestarlabs.com ↗" link and Next subject link (the last one loops to the first). The copy for all 8 is in the `SUBJECTS` array in the reference.

## Interactive components

Build each one as its own client component, and copy its math from the reference script.

1. **InterferenceCanvas:** two coherent wave sources. Drag the second source with mouse or touch, or move it with the arrow keys. Shows a `d = x.x λ` readout. Pauses when off screen.
2. **CoupleDiagram:** SVG thermoelectric couple. Four steps highlight parts of the diagram, triggered by clicking and by scrolling on desktop.
3. **SeebeckSimulator:** cold and hot sliders, 0–500 °C, defaults 20 and 320. V = α·ΔT with α = 0.041 mV/°C, so the defaults show +300 °C and 12.30 mV.
4. **BacteSignSimulator:** strain profile buttons with MIC values susceptible = 1, intermediate = 8 and resistant = 64 µg/mL. Concentration slider from 0.25 to 128 µg/mL in doubling steps. Growth factor = 1 / (1 + (c / MIC)²). Draws the control and treated curves, a result label (inhibited below 30%, partly inhibited below 70%, otherwise not inhibited) and the live protocol JSON.

All animation must respect `prefers-reduced-motion`.

## Accuracy rules (important)

- Keep the status labels exactly as in the reference: **Demonstrated**, **In development**, **Planned**. Don't upgrade anything to a stronger claim.
- The BacteSign simulator must keep its disclaimer: illustrative curves, not measured BacteSign data, not for clinical use.
- Don't add numbers, customers, partners, prices or claims that aren't in the reference.

## Quality bar

- Responsive down to 360px wide, with no horizontal scrolling.
- Keyboard accessible, visible focus states and a "Skip to content" link.
- Per-page titles, meta descriptions, Open Graph tags, `sitemap.xml`, `robots.txt`, a favicon and theme color `#0c0d10`.
- Lighthouse scores of 90+ for performance and accessibility.

## How to work

1. Scaffold the project. Build the header, footer and one subject page first, then show me.
2. Build the home page section by section, then the Company and BacteSign pages.
3. Build the four interactive components last.
4. Run `npm run dev`, compare each page side by side with `design-reference.html`, and fix any differences. Check phone width too.
5. Tell me when it's ready to deploy to Vercel.
