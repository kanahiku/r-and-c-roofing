# R&C Roofing — Page Builder Reference

> **Give this file to any new AI chat when building a page.**  
> It contains everything the AI needs to turn a content doc into a finished Astro page — no guessing, no inconsistency.

---

## Project Context

- **Framework:** Astro v7 + Tailwind CSS v4
- **Template:** AstroWind (customised for R&C Roofing)
- **Path alias:** `~/` maps to `src/`
- **Fonts:** Didact Gothic (H1/H2, `font-heading`) · Manrope (body, UI, and item titles)
- **Primary colour:** `#EDD974` (CTA yellow)
- **Dev server:** `npm run dev` → http://localhost:4321

---

## How a Page File Is Structured

```astro
---
// 1. Imports
import Layout from '~/layouts/PageLayout.astro';
// ... other imports (see Standard Import Block below)

// 2. Metadata
const metadata = {
  title: 'Page Title | R&C Roofing Contractors',
  description: 'Meta description (1–2 sentences).',
  ignoreTitleTemplate: true,
};
---

<Layout metadata={metadata}>
  <!-- 3. Sections stacked top to bottom -->
  <!-- First section: always P-01 Hero -->
  <!-- Middle sections: pick from Pattern Library -->
  <!-- Last section: always P-12 Final CTA -->
</Layout>
```

Pages live at `src/pages/[route]/index.astro`.  
Example: `/services/roof-inspection` → `src/pages/services/roof-inspection/index.astro`

---

## Standard Import Block

Copy this at the top of every new page. Remove the imports you don't use.

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import WidgetWrapper from '~/components/ui/WidgetWrapper.astro';
import Headline from '~/components/ui/Headline.astro';
import SectionBg from '~/components/ui/SectionBg.astro';
import CardWrapper from '~/components/ui/CardWrapper.astro';
import InfoCard from '~/components/ui/InfoCard.astro';
import ServiceCard from '~/components/ui/ServiceCard.astro';
import ProjectCard from '~/components/ui/ProjectCard.astro';
import BulletCard from '~/components/ui/BulletCard.astro';
import BenefitItem from '~/components/ui/BenefitItem.astro';
import IconPoint from '~/components/ui/IconPoint.astro';
import IconPointBand from '~/components/ui/IconPointBand.astro';
import FivePointGrid from '~/components/ui/FivePointGrid.astro';
import ServiceDirectory from '~/components/ui/ServiceDirectory.astro';
import HeroImagePlaceholder from '~/components/ui/HeroImagePlaceholder.astro';
import Hero2 from '~/components/widgets/Hero2.astro';
import Content from '~/components/widgets/Content.astro';
import Features2 from '~/components/widgets/Features2.astro';
import FAQs from '~/components/widgets/FAQs.astro';
import Testimonials from '~/components/widgets/Testimonials.astro';
import ProjectsSection from '~/components/widgets/ProjectsSection.astro';
import CTABanner from '~/components/widgets/CTABanner.astro';
import Timeline from '~/components/ui/Timeline.astro';
import Image from '~/components/common/Image.astro';
---
```

---

## Global Rules

Every section on every page must follow these rules. Do not deviate.

> **Visual system rule:** See `.cursor/rules/rc-visual-system.mdc` for the section color flow (White → Grey → Black → Yellow CTA), card styles, black section motif, and CTA banner pattern. Apply these to every page.

| Rule | Value |
|------|-------|
| Max content width | `max-w-[1400px] mx-auto` on every `WidgetWrapper` |
| Section padding | Handled automatically by `WidgetWrapper` — do not add extra vertical padding |
| Background alternation | White → Grey → White → Grey down the page |
| Grey background | `<div class="absolute inset-0 bg-gray-50 dark:bg-slate-900/30"></div>` |
| White background | `<div class="absolute inset-0 bg-white dark:bg-transparent"></div>` |
| No background set | Page default (white/dark) |
| H1 | Hero section only — one per page |
| H2 | Every section title |
| H3 | Card or item titles within a section |
| No eyebrows/taglines | Never add eyebrow text above headings |
| Simple card icons | Heading+description-only cards get a Tabler icon mark (`InfoCard`). P-05 linked service cards stay icon-free |
| One CTA type per section | Use **either** Primary **or** Ghost buttons in a section — never mix both styles in the same section |
| Heading + para + CTA | Always **P-03** with a side image. Alternate image left/right from the previous split on the page (see **Split Image Side Rule**) |
| Headline description alignment | Section headings and descriptions are **always left-aligned**. `<Headline>` is left-aligned. **Never pass body text as the `subtitle` prop on `<Headline>`.** The `subtitle` slot is only for true visual sub-headings (rarely used). A **single intro line** under an H2 uses `9px` gap (`classes={{ container: 'mb-[9px]' }}` on `<Headline>`, then one `<p>`). Do **not** use `9px` when the heading is followed by multiple paragraphs — keep the existing `20px`/`30px` gap. |
| Adjacent section variety | Neighboring sections cannot share a structure. Never stack card grid → card grid, list → list, timeline → timeline, or P-13 → P-13. Break them with a different pattern. |
| Five items | Never a 5-card grid (no 3+2). Use **P-06** `IconPointBand` (horizontal) or a `ServiceDirectory` if each item links. |
| Icon points | H2 + 3 or 5 icon points, no links: `IconPointBand` — one row, icon above title, left-aligned. H2 + 4 icon points as text: `IconPointGrid` — 2 × 2, left-aligned. No boxes, no timeline line. |
| Corner radius | Sharp by default. Change `--aw-radius` and `--aw-radius-full` in `CustomStyles.astro` — do not hardcode pixel radii on pages. |

### CTA Button Consistency Rule

**Each section must use only ONE type of CTA button.** Do not mix Primary and Ghost buttons within the same section.

| Section has... | Use this CTA style |
|----------------|-------------------|
| Main conversion action (Schedule, Contact, Get Started) | **Primary** (`btn-primary`) |
| Secondary/exploratory action (Learn More, View Gallery, Explore) | **Ghost** (`btn btn-secondary`) |
| Header row CTA (P-04 pattern) | Match the section's primary intent |
| Multiple CTAs in one section | ❌ **Not allowed** — pick the most important action |

**Choosing between Primary and Ghost:**
- **Primary:** Use when the section's goal is conversion (contact, schedule, buy)
- **Ghost:** Use when the section's goal is exploration (view more, learn about, browse)
- **Per-card links:** Text links (`text-primary hover:underline`) are allowed alongside a section CTA — they don't count as a second button style

### Split Image Side Rule

A section that is **heading + paragraph(s) + CTA** is always **P-03** (`Content.astro`) and **must include a side image**. Do not flatten it to P-13.

**Pick the side by reading the page, not by guessing:**

1. Walk the page from the top.
2. Find the nearest **previous split** — any section that already has a left/right image (`Hero2`, `Content`, or `Steps` with an image).
3. Place this section's image on the **opposite** side.

| Component | Image on the RIGHT (text left) | Image on the LEFT (text right) |
|-----------|-------------------------------|--------------------------------|
| `Hero2` (P-01) | Default — always | — |
| `Content` (P-03) | Omit `isReversed` | Add `isReversed` |
| `Steps` (P-08) | Omit `isReversed` | Add `isReversed` |

**Typical page:** Hero image is on the right → first P-03 uses `isReversed` (image left) → next split is default (image right) → keep flipping.

Cards, stats, FAQ, testimonials, P-12, and P-13 do **not** count. They do not reset the next image side.

If this is the first split on the page, start with image **right**, then alternate. If the brief has no image URL, still add an image with accurate alt text.

### Grid Card Decision Rule

**Only use card grids when the item count fits cleanly into standard layouts.** Analyze the content before choosing a pattern.

| Item Count | Use Cards? | Pattern | Grid Layout |
|------------|------------|---------|-------------|
| 1 | ❌ No | P-03 or P-13 | Present as text/paragraph, not a card |
| 2 | ✅ Yes | P-02, P-05 | `sm:grid-cols-2` |
| 3 | ✅ Yes | P-02, P-05, P-09 | `sm:grid-cols-3` |
| 4 | ✅ Yes | P-02, P-05, P-07 | `sm:grid-cols-4` or `sm:grid-cols-2` (2×2) |
| 5 | ❌ No cards | **P-06** | `IconPointBand` one row. Linked items: `ServiceDirectory` rows |
| 6 | ✅ Yes | P-05, P-09 | `sm:grid-cols-3` (2 rows) or `sm:grid-cols-2` (3 rows) |
| 7+ | ⚠️ Caution | Split sections | Consider breaking into multiple sections or use a different format |

**When NOT to use cards:**
- Content has 5 items → use **P-06** (`IconPointBand`) or `ServiceDirectory` — never cards
- Content has 7+ items → split into logical groups or use **P-08** (timeline) / **P-13** (editorial)
- Content is primarily narrative/explanatory → use **P-03** (text + image) or **P-13** (full-width editorial)
- Items are not parallel in structure (different lengths, some have links, some don't) → use prose format instead

### Card Clickability Rule

**Cards with links must be fully clickable. Cards without links must NOT be clickable.**

| Card has a link? | Behavior | Implementation |
|------------------|----------|----------------|
| ✅ Yes (href provided) | Entire card is clickable | Wrap card in `<a href="...">` tag |
| ❌ No link | Card is static, not clickable | No `<a>` wrapper, no hover motion |

**Clickable card implementation:**
```astro
<a href="/target-page" class="group block rounded-lg border ...">
  <h3>Card Title</h3>
  <p>Card description</p>
  <span class="card-link">View page</span>
</a>
```

**Static card implementation (no link):**
```astro
<div class="rounded-lg border ...">
  <h3>Card Title</h3>
  <p>Card description</p>
</div>
```

**Examples by card type:**
| Card Type | Has Link? | Clickable? |
|-----------|-----------|------------|
| Service cards (P-05) | ✅ Yes — links to service page | ✅ Fully clickable |
| Project/gallery cards (P-09) | ✅ Yes — links to project detail | ✅ Fully clickable |
| Benefit/feature cards (P-02) | ❌ No link | ❌ Static |
| Testimonial cards (P-11) | ❌ No link | ❌ Static |
| Info cards (P-07) | Depends on content | Match the link presence |

**Do NOT:**
- Add lift, bounce, or shadow hover on cards — hover only underlines the card URL (`card-link` on a `group`)
- Use text links inside a fully clickable card (redundant)
- Mix clickable and non-clickable cards in the same grid

Background snippets go inside `<Fragment slot="bg">` inside `WidgetWrapper`.

---

## Typography Classes

Use these exact classes everywhere. Do not invent new sizes.

**Fonts:** Didact Gothic (`font-heading`) for H1 and H2 · Manrope (`font-sans`) for body, UI, and item titles.

Didact Gothic ships a **single Regular (400) face**. Never put `font-medium`, `font-semibold`, or `font-bold` on an H1/H2 — the browser will fake a bold that looks muddy. H1/H2 hierarchy is **size**, not weight. Item titles (icon, image, or card heading + description) use Manrope Medium. Manrope is variable (200–800).

### Weight rules

| Element | Font | Weight | Class |
|---------|------|--------|-------|
| H1, H2 | Didact Gothic | 400 | `font-heading font-normal` |
| Item titles (icon/image/card + heading + description), FAQ questions | Manrope | 500 | `font-medium` |
| Body paragraphs, card descriptions, FAQ answers, disclaimers | Manrope | 400 | `font-normal` |
| Nav, text links, uppercase labels | Manrope | 500 | `font-medium` |
| Buttons, company name in the CTA banner | Manrope | 600 | `font-semibold` |

### Size scale

| Role | Tailwind classes |
|------|-----------------|
| **H1** (hero only) | `text-[42px] md:text-[56px] font-normal leading-[115%] tracking-tighter font-heading` |
| **Hero visual subheading** | `text-[20px] md:text-[24px] font-normal font-heading leading-[130%] tracking-tight` |
| **H2** (section title) | `text-[26px] md:text-[40px] font-normal leading-[120%] tracking-tighter font-heading text-heading` |
| **H3 standard** | `text-[22px] md:text-[26px] font-medium leading-[130%]` |
| **H3 small** (compact cards) | `text-[18px] md:text-[20px] font-medium leading-[130%]` |
| **H3 xs** (4-in-row cards) | `text-[16px] md:text-[18px] font-medium leading-[130%]` |
| **Body large** (main paragraphs) | `text-[16px] md:text-[17px] font-normal leading-[160%] text-muted` |
| **Body small** (card descriptions) | `text-[14px] md:text-[15px] font-normal leading-[160%] text-muted` |
| **Body xs** (disclaimers) | `text-[13px] md:text-[14px] font-normal leading-[160%] text-muted` |
| **Label xs** (uppercase meta) | `text-[13px] md:text-[14px] font-medium uppercase tracking-wider` |
| **Primary button** | `btn-primary` |
| **Ghost / outline button** | `btn btn-secondary` |
| **Text link** | `text-primary font-medium text-[14px] md:text-[15px] hover:underline` |
| **Text link on yellow / accent card** | `text-heading font-medium text-[14px] md:text-[15px] hover:underline` (or `text-card-link-light`) — never `text-primary` or `text-accent` |
| **Trust badge / tag** | `tag-pill` |

Card titles, icon-point titles, and any heading sitting with a description (cards, galleries, directories, timelines) are `font-medium` (Manrope). Body copy is `font-normal` (Manrope). Links stay `font-medium` (Manrope).

On white / grey / yellow-tint sections, `text-muted` is subtle black `#444444` — not washed-out grey, not pure `#000`. On dark sections use `text-white/70` (or `text-white/60` on dark cards).

---

## Pattern Selector

Read each section of the content doc → find its shape below → use that pattern number.

> **Important:** Before selecting a card-based pattern, count the items. See the **Grid Card Decision Rule** above. Never put two card sections back to back. Five items are never cards.

| What the doc section looks like | Pattern |
|---------------------------------|---------|
| Page title (H1) + 1–2 paragraphs + primary CTA + optional image + optional badges | **P-01** |
| H2 + 1–2 intro paragraphs + 2–4 feature/benefit points, no image | **P-02** |
| H2 + paragraphs + CTA (always add a side image; flip side from the last split) | **P-03** |
| H2 title that should share a row with a CTA button | **P-04** *(composable — combine with P-02, P-08, etc.)* |
| 2, 3, 4, or 6 cards each with title, description, and a link to its own page | **P-05** |
| 3 or 5 icon + title + description points, no cards (one horizontal row) | **P-06** |
| 4 compact info items (areas served, credentials, quick specs) | **P-07** |
| H2 + 1–2 paragraphs + 3–6 ordered steps + optional image + optional disclaimer | **P-08** |
| Grid of project/portfolio cards with optional image placeholders | **P-09** |
| List of Q&A pairs | **P-10** |
| Customer quotes with name and role | **P-11** |
| Page-ending call to action with contact info and a button | **P-12** |
| H2 title + multiple body paragraphs, full width, no image, no grid — content-heavy narrative | **P-13** |
| 4 icon + heading + description points, 2 × 2 text grid, no cards | **P-14** |
| *New layout polished and approved* | **P-15 …** *(add to this file)* |

---

## Pattern Library

---

### P-01 · Hero

**Content shape:** Page H1, 1–2 description paragraphs, primary CTA, optional image, optional trust badges  
**Components:** `Hero2.astro` (left-right split) · `Hero.astro` (left-aligned, text-only)

```astro
<Hero2
  actions={[{ variant: 'primary', text: 'Primary CTA', href: '/page' }]}
  image={{ src: 'IMAGE_URL', alt: 'Alt text' }}
>
  <Fragment slot="title">
    Heading Line One<br />Heading Line Two
  </Fragment>
  <Fragment slot="subtitle">
    First description paragraph from doc.
    <br /><br />
    Second description paragraph from doc.
  </Fragment>
  <Fragment slot="content">
    <!-- Trust badges — omit this block if not needed -->
    <div class="flex flex-wrap gap-3 mt-6">
      <span class="tag-pill">Badge One</span>
      <span class="tag-pill">Badge Two</span>
    </div>
  </Fragment>
</Hero2>
```

Hero image is always **600 × 600** (`max-w-[600px] aspect-square`, `object-cover`). Same size on every page.

**Variants:**
- Default split (`variant="split"` or omit) → left text / right image
- Full-width pattern (`variant="overlay"`) → homepage-only: the `fancy-two.svg` artwork covers the whole hero, text left, no side image. A left-to-right black scrim keeps the copy readable — no motif tile on top
- No final photo yet → keep the split: omit `image={{}}` and use `<HeroImagePlaceholder />` in `slot="image"`
- No image → use `Hero.astro` instead (left-aligned layout), or `variant="overlay"` on the homepage
- No badges → omit `<Fragment slot="content">`
- Single heading line → remove `<br />`

---

### P-02 · Intro + N-Column Items

**Content shape:** H2 title, 1–2 intro paragraphs, 2–4 feature/benefit points (no image, no per-item links)  
**Pattern:** Inline `WidgetWrapper`  
**⚠️ Item count:** Works best with 2, 3, or 4 items. For 5 items, use **P-06** (`IconPoint`) instead — never a 5-card grid.  
**If the points are cards** (boxed), use `InfoCard` with a Tabler `icon` — do not ship heading+description-only boxes.

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">

  <!-- Header: plain H2, or swap in P-04 row if a CTA belongs here -->
  <Headline title="Section Title" />

  <!-- Intro paragraphs — omit div if no paragraphs in doc -->
  <div class="text-[16px] md:text-[17px] font-normal leading-[160%] text-muted mb-8 md:mb-12">
    <p>First paragraph from doc.</p>
    <p class="mt-4">Second paragraph from doc.</p>
  </div>

  <!-- Items grid — change sm:grid-cols-N to match count: 2, 3, or 4 -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
    {[
      { title: 'Point One', description: 'Description from doc.' },
      { title: 'Point Two', description: 'Description from doc.' },
      { title: 'Point Three', description: 'Description from doc.' },
    ].map(({ title, description }) => (
      <div class="intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade">
        <h3 class="text-[22px] md:text-[26px] font-medium leading-[130%] mb-3">{title}</h3>
        <p class="text-[14px] md:text-[15px] font-normal leading-[160%] text-muted">{description}</p>
      </div>
    ))}
  </div>

  <!-- Optional CTA below items — omit if not in doc -->
  <div class="mt-8">
    <a href="/page" class="btn-primary">CTA Text</a>
  </div>

  <Fragment slot="bg">
    <div class="absolute inset-0 bg-gray-50 dark:bg-slate-900/30"></div>
  </Fragment>

</WidgetWrapper>
```

**Variants:**
- 2 columns → `sm:grid-cols-2`
- 4 columns → `sm:grid-cols-4`
- No intro paragraphs → omit that div
- No CTA → omit CTA div
- White bg → change bg snippet to white

---

### P-03 · Two-Column Text + Image

**Content shape:** H2 title, 2–3 paragraphs, CTA, and a required side image  
**Component:** `Content.astro`  
**Note:** Title is left-aligned above the text column, not centered above both columns.  
**Image side:** Follow the **Split Image Side Rule** — opposite of the previous split on the page. After a default `Hero2` (image right), the first P-03 is `isReversed` (image left).

```astro
<Content
  title="Section Title"
  callToAction={{ variant: 'primary', text: 'CTA Text', href: '/page' }}
  image={{ src: 'IMAGE_URL', alt: 'Alt text' }}
>
  <Fragment slot="content">
    <p class="text-muted">First paragraph from doc.</p>
    <p class="mt-4 text-muted">Second paragraph from doc.</p>
    <p class="mt-4 text-muted">Third paragraph — omit if not in doc.</p>
  </Fragment>
  <Fragment slot="bg">
    <div class="absolute inset-0 bg-white dark:bg-transparent"></div>
  </Fragment>
</Content>
```

**Variants:**
- Image left, text right → add `isReversed` (use this when the previous split has its image on the right)
- Image right, text left → omit `isReversed` (use this when the previous split has its image on the left)
- No CTA → omit `callToAction` (if there is still a heading + paragraphs, keep the image)
- Ghost CTA → `callToAction={{ variant: 'secondary', ... }}`
- Never omit the image on a heading + para + CTA section

---

### P-04 · Heading + CTA Row

**Content shape:** H2 title that shares a horizontal row with a CTA button  
**Pattern:** Flex row — paste inside any `WidgetWrapper` as the first element, replacing `<Headline>`

```astro
<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-12">
  <h2 class="text-[26px] md:text-[40px] font-normal leading-[120%] tracking-tighter font-heading text-heading">
    Section Title
  </h2>
  <a href="/page" class="btn-primary shrink-0">CTA Text</a>
</div>
```

**Variants:**
- Ghost CTA → `class="btn btn-secondary shrink-0"`
- No CTA needed → use `<Headline title="Section Title" />` instead

---

### P-05 · Service Cards Grid (Per-Card Links)

**Content shape:** 2, 3, 4, or 6 cards (NOT 5), each with title, description, and a link to its own page  
**Component:** `Features2.astro`  
**⚠️ Item count:** Only use when you have 2, 3, 4, or 6 items. For 5 items, use **P-06** (`IconPoint` or `ServiceDirectory`) — never cards.  
**Card links:** Sit on the bottom of every card. `Features2` already applies `h-full` + `flex-1` + `mt-auto`. Handmade cards must do the same.

```astro
<Features2
  title="Section Title"
  subtitle="Short subtitle sentence."
  items={[
    {
      title: 'Service Name',
      description: 'One-sentence description from doc.',
      callToAction: {
        variant: 'link',
        text: 'Learn More →',
        href: '/services/slug',
        class: 'text-heading font-medium text-[14px] md:text-[15px] hover:underline',
      },
    },
    // repeat for each card — no icon property
  ]}
/>
```

**Variants:**
- No per-card links → omit `callToAction` in each item
- 4 columns → add `columns={4}` prop (default is 3)
- Custom background → add `<Fragment slot="bg">...</Fragment>` inside the component
- Yellow / accent-tint cards → link `text-heading` (shown above). Black cards on grey → `text-accent`

---

### P-06 · Icon-Point Band

**Content shape:** H2 + intro + 3–5 parallel points with icons, no per-item links  
**Pattern:** `IconPointBand` — one horizontal row on `md+`. Icon on top, title, description. Left-aligned. Tight title-to-description gap. **No card boxes. No timeline line or step numbers.**

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <Headline title="Section Title" classes={{ container: 'mb-4 md:mb-6' }} />
  <p class="text-[16px] md:text-[17px] font-normal leading-[160%] text-muted text-left max-w-3xl mb-8 md:mb-12">
    Intro sentence from the brief.
  </p>

  <IconPointBand items={points} />

  <Fragment slot="bg">
    <SectionBg variant="grey" />
  </Fragment>
</WidgetWrapper>
```

**Linked 5 items:** use `<ServiceDirectory items={...} variant="dark" />` instead of a band.

**Variants:**
- Dark section → `variant="dark"`
- 3 or 5 points → same component; columns match the item count
- 4 points as a 2 × 2 text grid → use **P-14** `IconPointGrid` instead
- Center-align each point’s icon, title, and description. Do not add a connecting rail — that is P-08 Timeline

---

### P-07 · 4-Cards One Row (Compact)

**Content shape:** 4 compact info items — areas served, credentials, quick specs — plus an optional ghost CTA below  
**Icons:** These are heading+description cards — each item must have a Tabler icon via `InfoCard`.

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <Headline title="Section Title" subtitle="Optional subtitle from doc." />

  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
    {[
      { title: 'Item One',   description: 'Short detail from doc.', icon: 'tabler:home' },
      { title: 'Item Two',   description: 'Short detail from doc.', icon: 'tabler:shield' },
      { title: 'Item Three', description: 'Short detail from doc.', icon: 'tabler:sun' },
      { title: 'Item Four',  description: 'Short detail from doc.', icon: 'tabler:droplet' },
    ].map(({ title, description, icon }) => (
      <InfoCard title={title} description={description} icon={icon} variant="dark" />
    ))}
  </div>

  <!-- Ghost CTA — omit if not in doc -->
  <div class="mt-8 md:mt-10">
    <a href="/page" class="btn btn-secondary">Ghost CTA Text</a>
  </div>

  <Fragment slot="bg">
    <div class="absolute inset-0 bg-gray-50 dark:bg-slate-900/30"></div>
  </Fragment>
</WidgetWrapper>
```

**Variants:**
- 3 items → `sm:grid-cols-3` / `grid-cols-1`
- No CTA → omit CTA div
- Clickable cards → wrap card div in `<a href="...">` + `hover:shadow-md transition-shadow`

---

### P-08 · Process / Timeline

**Content shape:** H2 title, 1–2 intro paragraphs, 3–6 ordered steps, optional image, optional disclaimer  
**Pattern:** P-04 header row + two-column body (text + image left, timeline right)

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">

  <!-- Header row with CTA — or swap for <Headline> if no CTA needed -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-12">
    <h2 class="text-[26px] md:text-[40px] font-normal leading-[120%] tracking-tighter font-heading text-heading">
      Section Title
    </h2>
    <a href="/page" class="btn-primary shrink-0">CTA Text</a>
  </div>

  <div class="flex flex-col md:flex-row gap-10 md:gap-16">

    <!-- Left column: paragraphs + optional image + optional disclaimer -->
    <div class="md:basis-1/2 flex flex-col gap-6">
      <div class="text-[16px] md:text-[17px] font-normal leading-[160%] text-muted dark:text-slate-400">
        <p>First intro paragraph from doc.</p>
        <p class="mt-4">Second intro paragraph from doc.</p>
      </div>

      <!-- Image — remove this block if no image -->
      <Image
        class="w-full rounded-lg shadow-lg object-cover"
        src="IMAGE_URL"
        alt="Alt text"
        width={600}
        height={400}
        widths={[400, 768]}
        sizes="(max-width: 768px) 100vw, 50vw"
        format="webp"
        layout="constrained"
      />

      <!-- Disclaimer — remove if not in doc -->
      <p class="text-[13px] md:text-[14px] font-normal leading-[160%] text-muted italic">
        Disclaimer or legal note text from doc.
      </p>
    </div>

    <!-- Right column: ordered steps -->
    <div class="md:basis-1/2">
      <Timeline
        items={[
          { title: 'Step 1', description: 'What happens.', icon: 'tabler:search' },
          { title: 'Step 2', description: 'What happens.', icon: 'tabler:camera' },
          { title: 'Step 3', description: 'What happens.', icon: 'tabler:check' },
        ]}
      />
    </div>

  </div>

  <Fragment slot="bg">
    <div class="absolute inset-0 bg-white dark:bg-transparent"></div>
  </Fragment>
</WidgetWrapper>
```

**Variants:**
- Steps only, no left column → remove the flex split and use `<Timeline>` full width
- Horizontal on desktop, vertical on mobile (default) → omit `variant` or `variant="horizontal"` (desktop is an icon rail; each step’s column and copy width grow with step count and that item’s title/description)
- Vertical timeline → `variant="vertical"` only when the brief is a stacked process, not the default
- No image → omit `<Image />` block
- No CTA in header → replace header row with `<Headline title="..." />`

---

### P-09 · Gallery / Project Cards

**Content shape:** H2 title, subtitle, 3+ cards (photo + title + description), ghost CTA below  
**Note:** Use the SVG placeholder when real images are not yet available — it will be replaced later.  
**⚠️ Item count:** Works best with 3, 6, or 9 items (multiples of 3). For 5 items, use **P-06** (`IconPoint` or `ServiceDirectory`).

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <Headline title="Section Title" subtitle="Short subtitle from doc." />

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
    {[
      { title: 'Card Title', description: 'Brief description.', imageSrc: null },
    ].map(({ title, description, imageSrc }) => (
      <div class="rounded-lg border border-[#ffffff29] bg-white dark:bg-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.08)] p-4">
        {imageSrc ? (
          <Image
            class="w-full h-48 object-cover rounded mb-3"
            src={imageSrc} alt={title}
            width={400} height={240} format="webp"
          />
        ) : (
          <div class="w-full h-36 bg-gray-100 dark:bg-slate-800 rounded mb-3 flex items-center justify-center text-gray-300 dark:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <h3 class="text-[18px] md:text-[20px] font-medium leading-[130%] mb-1">{title}</h3>
        <p class="text-[13px] md:text-[14px] font-normal leading-[160%] text-muted">{description}</p>
      </div>
    ))}
  </div>

  <div class="mt-8 md:mt-10">
    <a href="/gallery" class="btn btn-secondary">View Gallery</a>
  </div>

  <Fragment slot="bg">
    <div class="absolute inset-0 bg-gray-50 dark:bg-slate-900/30"></div>
  </Fragment>
</WidgetWrapper>
```

---

### P-10 · FAQ Accordion

**Content shape:** List of Q&A pairs  
**Component:** `FAQs.astro` — single column, only one item open at a time (HTML `name` attribute, no JS)

```astro
<FAQs
  title="Frequently Asked Questions"
  items={[
    { title: 'Question one?', description: 'Answer text from doc.' },
    { title: 'Question two?', description: 'Answer text from doc.' },
  ]}
/>
```

---

### P-11 · Testimonials

**Content shape:** Customer quotes with name and optional role/location  
**Component:** `Testimonials.astro`

```astro
<Testimonials
  title="What Customers Say"
  subtitle="Short framing sentence."
  testimonials={[
    {
      testimonial: 'Quote text from doc.',
      name: 'First Last',
      job: 'Role, Location',
      image: { src: 'avatar-url', alt: 'Name' }, // omit if no photo
    },
  ]}
  callToAction={{ text: 'Read More Reviews', href: '/reviews' }}
/>
```

---

### P-12 · Final CTA (Page Ender)

**Content shape:** H2 closing headline, 1–2 supporting sentences, contact info block, primary CTA  
**Pattern:** Yellow card with pattern motif — heading + subtitle left-aligned at top, contact left + button right below a black divider  
**Every page ends with this section.** Use the reusable `CTABanner` component.

**Import:**
```astro
import CTABanner from '~/components/widgets/CTABanner.astro';
```

**Basic usage:**
```astro
<CTABanner
  title="Find Out What Is Happening With Your Roof"
  subtitle="If you have noticed a leak, storm damage, or another change in your roof, start with an inspection.<br />R&C Roofing Contractors can evaluate the roof and explain what the findings mean for your property."
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | (required) | H2 heading text |
| `subtitle` | `string` | (required) | Supporting text, can include `<br />` for line breaks |
| `ctaText` | `string` | `"Schedule a Roof Inspection"` | Button text |
| `ctaHref` | `string` | `"/contact"` | Button link |
| `showAfterHoursNote` | `boolean` | `false` | Show after-hours contact note (homepage only) |

**Examples:**

```astro
<!-- Default CTA (most pages) -->
<CTABanner
  title="Start With the Condition of Your Roof"
  subtitle="If you are not sure whether you need maintenance, a repair, or a larger roofing project, start with an inspection."
/>

<!-- Custom button text -->
<CTABanner
  title="Get the Roof Problem Checked Before It Gets Worse"
  subtitle="R&amp;C Roofing Contractors can inspect the roofing problem and explain the recommended repair."
  ctaText="Schedule a Roof Repair Inspection"
/>

<!-- Homepage with after-hours note -->
<CTABanner
  title="Find Out What Is Happening With Your Roof"
  subtitle="If you have noticed a leak, storm damage, or another change in your roof, start with an inspection."
  showAfterHoursNote={true}
/>
```

**Note:** The component automatically includes:
- Yellow (`bg-cta` / `#F5ECBD`) background
- Motif from `src/config/motif.ts` (R&C: black pattern at 2% opacity with fade)
- R&C contact info (address, phone)
- Black divider line
- Black CTA button with hover state

---

### P-13 · Full-Width Editorial

**Content shape:** H2 title + multiple body paragraphs, full width, no image, no columns — used for content-heavy narrative sections where the text carries the page (e.g. company story, policy, process explanation)

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <h2 class="text-[26px] md:text-[40px] font-normal leading-[120%] tracking-tighter font-heading text-heading mb-8 md:mb-10">
    Section Title
  </h2>
  <div class="text-[16px] md:text-[17px] font-normal leading-[160%] text-muted space-y-5">
    <p>First paragraph from doc.</p>
    <p>Second paragraph from doc.</p>
    <p>Third paragraph from doc — add as many as needed.</p>
  </div>
  <Fragment slot="bg">
    <div class="absolute inset-0 bg-gray-50 dark:bg-slate-900/30"></div>
  </Fragment>
</WidgetWrapper>
```

**Variants:**
- White bg → change bg snippet to white
- Add a CTA below the body → append `<div class="mt-8 md:mt-10"><a href="/page" class="btn-primary">CTA Text</a></div>` after the `<div class="... space-y-5">` block
- Tighter paragraph spacing → change `space-y-5` to `space-y-4`
- Use when a doc section has 4+ paragraphs and no natural card/image/list shape

---

### P-14 · Icon-Point Text Grid (2 × 2)

**Content shape:** H2 + optional intro + 4 unlinked icon + heading + description points  
**Pattern:** `IconPointGrid` — two columns on `sm+` (2 × 2). Icon on top, then title, then description. **Left-aligned.** No card boxes.

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <Headline title="Section Title" classes={{ container: 'mb-4 md:mb-6 text-left md:mx-0' }} />
  <p class="text-[16px] md:text-[17px] font-normal leading-[160%] text-muted mb-8 md:mb-12">
    Intro sentence from the brief.
  </p>

  <IconPointGrid items={points} />

  <Fragment slot="bg">
    <SectionBg variant="white" />
  </Fragment>
</WidgetWrapper>
```

**Variants:**
- Dark section → `variant="dark"` on `IconPointGrid` (and `isDark` on the wrapper / Headline)
- 2 items → same component, one row of two
- 6 items → same component, 2 × 3
- Prefer this over P-06 when there are exactly 4 points and you do not want a one-row band
- Prefer this over P-07 when the points should stay as open text, not cards

---

## New Page Checklist

1. Create `src/pages/[route]/index.astro`
2. Add metadata (title, description, `ignoreTitleTemplate: true`)
3. Wrap everything in `<Layout metadata={metadata}>`
4. First section → always **P-01 Hero**
5. Scan each doc section → match shape to Pattern Selector → paste snippet → fill copy
6. Alternate backgrounds: white → grey → white → grey
7. Last section → always **P-12 Final CTA**
8. Run `npm run build` — fix any TypeScript or import errors before sharing

---

## Adding New Patterns

When a new layout is polished and approved in the browser:

1. Pick the next number: **P-15**, …
2. Add a row to the **Pattern Selector** table
3. Add the pattern entry below P-12 using the same format:
   - `### P-XX · Pattern Name`
   - **Content shape:** one line describing what the doc section looks like
   - Code snippet (complete, copy-pasteable)
   - **Variants:** common modifications
4. If any global class or component was changed to support it, note it here too

---

## Decorative Components

### HeroAccent

Simple 1–2 chevron arrow shapes for hero section corners. Reinforces roofing brand identity as a subtle filler.

**Import:**
```astro
import HeroAccent from '~/components/ui/HeroAccent.astro';
```

**Props:**

| Prop | Values | Default | Description |
|------|--------|---------|-------------|
| `position` | `bottom-right`, `bottom-left`, `top-right`, `top-left` | `bottom-right` | Corner placement |
| `color` | `accent`, `muted`, `dark`, `white` | `muted` | Design system color |
| `opacity` | `0` – `1` | `0.12` | Visibility |
| `size` | `sm`, `md`, `lg` | `md` | Chevron size |
| `count` | `1`, `2` | `2` | Number of stacked chevrons |

**Usage in Hero2 bg slot:**
```astro
<Hero2 ...>
  <!-- other slots -->
  <Fragment slot="bg">
    <HeroAccent position="bottom-right" color="muted" opacity={0.1} size="lg" count={2} />
  </Fragment>
</Hero2>
```

**Variants:**
- Single chevron: `count={1}` — one shape only
- Gold accent: `color="accent"` — uses primary gold color
- Large: `size="lg"` — bigger for prominent heroes
- White on dark: `color="white"` — for dark hero backgrounds

---

### SectionBg

Reusable background component for section `<Fragment slot="bg">` slots. Solid colors plus the site motif from `src/config/motif.ts`.

**Do not import pattern SVGs on pages.** Pages only pass `variant`. Motif shape, fade, tile size, and which sections show it are site config. Colors/opacity live in `CustomStyles.astro` (`--aw-color-motif-*`, `--aw-opacity-motif-*`).

**Import:**
```astro
import SectionBg from '~/components/ui/SectionBg.astro';
```

**Props:**

| Prop | Values | Default | Description |
|------|--------|---------|-------------|
| `variant` | `hero`, `dark`, `grey`, `white` | (required) | Background preset |
| `motifOpacity` | `0.15` or `"15%"` | Token for that variant | Override this section only |
| `motifColor` | CSS color | Token for that variant | Override this section only |
| `fadeDirection` | `top-to-bottom`, `bottom-to-top`, `none` | `MOTIF.fade` | Override fade |
| `pattern` | `ImageMetadata` | `MOTIF.pattern` | Override SVG |
| `showMotif` | boolean | `MOTIF.sections[variant]` | Force motif on/off |

**R&C variant defaults** (other sites change `src/config/motif.ts`):

| Variant | Background | Motif |
|---------|------------|-------|
| `hero` | transparent (white) | on — accent at 10% |
| `dark` | black | on — accent at 12% |
| `grey` | #FAFAFA | off |
| `white` | white | off |
| CTA banner | yellow card | on — black at 2% (`CTABanner` reads the same config) |

**Usage:**
```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <!-- section content -->
  <Fragment slot="bg">
    <SectionBg variant="dark" />
  </Fragment>
</WidgetWrapper>
```

**One-off override (rare):**
```astro
<Fragment slot="bg">
  <SectionBg variant="hero" motifOpacity="15%" />
</Fragment>
```

---

## Button System

Standardized button components with CSS variable-based colors for easy theming.

### Button Component

**Import:**
```astro
import Button from '~/components/ui/Button.astro';
```

**Props:**

| Prop | Values | Default | Description |
|------|--------|---------|-------------|
| `variant` | `primary`, `secondary`, `ghost-light`, `ghost-dark`, `link` | `secondary` | Button style |
| `text` | string | slot content | Button label |
| `href` | string | — | Link destination |
| `icon` | string | — | Tabler icon name (appears after text) |
| `target` | `_blank`, etc. | — | Link target |
| `type` | `button`, `submit`, `reset` | — | Renders as `<button>` instead of `<a>` |

### Button Variants

| Variant | Use Case | Background |
|---------|----------|------------|
| `primary` | Main CTA actions | Yellow (accent) on any bg |
| `secondary` | Secondary actions | Transparent with black border (light bg) |
| `ghost-light` | Outline button on white/grey sections | Black border, inverts on hover |
| `ghost-dark` | Outline button on black sections | Yellow border, fills yellow on hover |
| `link` | Text-only link style | Yellow text with underline on hover |

### Usage Examples

**Primary button (main CTA):**
```astro
<Button variant="primary" text="Schedule a Roof Inspection" href="/contact" />
```
Or as a plain anchor:
```astro
<a href="/contact" class="btn-primary">Schedule a Roof Inspection</a>
```

**Secondary button (on white/grey background):**
```astro
<a href="/services" class="btn-secondary">View All Services</a>
```

**Ghost button on white/grey section:**
```astro
<a href="/services" class="btn-ghost-light">Explore Services</a>
```

**Ghost button on black section:**
```astro
<a href="/services" class="btn-ghost-dark">Explore Services</a>
```

**Link style:**
```astro
<Button variant="link" text="Learn more →" href="/about" />
```

### Button CSS Classes

Can be used directly on `<a>` or `<button>` elements:

| Class | Description |
|-------|-------------|
| `btn-primary` | Solid yellow button |
| `btn-secondary` | Outline button (black border on light bg) |
| `btn-ghost-light` | For white/grey sections |
| `btn-ghost-dark` | For black sections |
| `btn-link` | Text link style |

### Button Color Variables

All button colors are controlled by CSS variables in `CustomStyles.astro`:

```css
--aw-color-btn-primary-bg
--aw-color-btn-primary-text
--aw-color-btn-primary-border
--aw-color-btn-primary-bg-hover
--aw-color-btn-primary-text-hover
--aw-color-btn-primary-border-hover

--aw-color-btn-secondary-bg
--aw-color-btn-secondary-text
--aw-color-btn-secondary-border
/* ... hover variants */

--aw-color-btn-ghost-light-*
--aw-color-btn-ghost-dark-*
--aw-color-btn-link
--aw-color-btn-link-hover
```

---

## Headline Component

Standardized section heading component with consistent typography and dark mode support.

### Import

```astro
import Headline from '~/components/ui/Headline.astro';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | slot | Main heading text (H2) |
| `subtitle` | string | slot | Supporting text below title |
| `tagline` | string | — | Eyebrow text (rarely used per design rules) |
| `isDark` | boolean | `false` | Set `true` for black sections |
| `classes` | object | — | Override container, title, or subtitle classes |

### Usage

**Standard usage (light sections):**
```astro
<Headline title="Section Title" subtitle="Optional supporting text." />
```

**Dark section:**
```astro
<Headline 
  title="Section Title" 
  subtitle="Supporting text on dark background." 
  isDark={true}
/>
```

**Custom spacing:**
```astro
<Headline title="Section Title" classes={{ container: 'mb-4 md:mb-6' }} />
```

**Using slots:**
```astro
<Headline>
  <Fragment slot="title">Complex <span class="text-accent">Title</span></Fragment>
  <Fragment slot="subtitle">Subtitle with formatting.</Fragment>
</Headline>
```

### Typography

The Headline component uses consistent typography:

- **Title (H2):** 26px mobile / 40px desktop, Didact Gothic Regular, tight tracking
- **Subtitle:** 16px mobile / 17px desktop, Manrope Regular, 160% line height

### Color Variables

```css
--aw-color-headline-light       /* Title on white/grey sections */
--aw-color-headline-dark        /* Title on black sections */
--aw-color-headline-subtitle-light
--aw-color-headline-subtitle-dark
```

---

## Timeline Component

Process/steps visualization with numbered or icon-based steps and connecting lines.

### Import

```astro
import Timeline from '~/components/ui/Timeline.astro';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | Array | `[]` | Array of step objects |
| `variant` | `'vertical'` \| `'horizontal'` | `'vertical'` | Vertical stack, or desktop row that stacks on mobile |
| `defaultIcon` | string | — | Tabler icon name for all steps |
| `isDark` | boolean | `false` | Set `true` for black sections |
| `classes` | object | — | Override container, panel, title, description, icon styles |

### Item Object

Each item in the `items` array can have:

| Property | Type | Description |
|----------|------|-------------|
| `title` | string | Step heading |
| `description` | string | Step description |
| `icon` | string | Tabler icon name (overrides defaultIcon) |
| `classes` | object | Per-item style overrides |

### Usage

**Basic usage (light section, horizontal on desktop):**
```astro
<Timeline
  items={[
    { title: 'Step 1', description: 'First step description.', icon: 'tabler:search' },
    { title: 'Step 2', description: 'Second step description.', icon: 'tabler:file' },
    { title: 'Step 3', description: 'Third step description.', icon: 'tabler:check' },
  ]}
/>
```

**Vertical (opt-in only):**
```astro
<Timeline
  variant="vertical"
  items={[
    { title: 'Step 1', description: 'First step description.', icon: 'tabler:search' },
    { title: 'Step 2', description: 'Second step description.', icon: 'tabler:file' },
    { title: 'Step 3', description: 'Third step description.', icon: 'tabler:check' },
  ]}
/>
```

**Dark section:**
```astro
<Timeline
  isDark={true}
  items={[
    { title: 'Step 1', description: 'Description.', icon: 'tabler:search' },
    { title: 'Step 2', description: 'Description.', icon: 'tabler:check' },
  ]}
/>
```

**With default icon:**
```astro
<Timeline
  defaultIcon="tabler:circle-check"
  items={[
    { title: 'Step 1', description: 'Description.' },
    { title: 'Step 2', description: 'Description.' },
  ]}
/>
```

### Color Variables

```css
/* Light mode */
--aw-color-timeline-icon-light
--aw-color-timeline-icon-border-light
--aw-color-timeline-icon-bg-light
--aw-color-timeline-title-light
--aw-color-timeline-desc-light

/* Dark mode */
--aw-color-timeline-icon-dark
--aw-color-timeline-icon-border-dark
--aw-color-timeline-icon-bg-dark
--aw-color-timeline-title-dark
--aw-color-timeline-desc-dark
```

---

## Testimonials Component

Display customer reviews/testimonials in a responsive grid layout.

### Import

```astro
import Testimonials from '~/components/widgets/Testimonials.astro';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | — | Section heading |
| `subtitle` | string | — | Supporting text below title |
| `testimonials` | Array | `[]` | Array of testimonial objects |
| `isDark` | boolean | `false` | Set `true` for black sections |
| `callToAction` | object | — | Optional CTA button |
| `classes` | object | — | Override container, headline styles |

### Testimonial Object

| Property | Type | Description |
|----------|------|-------------|
| `testimonial` | string | The review/quote text |
| `name` | string | Customer name |
| `job` | string | Job title or company |
| `image` | object | Customer avatar image |

### Usage

**Light section:**
```astro
<Testimonials
  title="What Our Customers Say"
  testimonials={[
    {
      testimonial: 'Great service and professional team.',
      name: 'John Doe',
      job: 'Homeowner, Honolulu',
      image: { src: '/images/avatar.jpg', alt: 'John' },
    },
    // ... more testimonials
  ]}
/>
```

**Dark section:**
```astro
<Testimonials
  title="Customer Reviews"
  isDark={true}
  testimonials={[...]}
>
  <Fragment slot="bg">
    <SectionBg variant="dark" />
  </Fragment>
</Testimonials>
```

### Color Variables

```css
/* Light mode */
--aw-color-testimonial-card-bg-light
--aw-color-testimonial-card-border-light
--aw-color-testimonial-text-light
--aw-color-testimonial-name-light
--aw-color-testimonial-job-light
--aw-color-testimonial-hr-light

/* Dark mode */
--aw-color-testimonial-card-bg-dark
--aw-color-testimonial-card-border-dark
--aw-color-testimonial-text-dark
--aw-color-testimonial-name-dark
--aw-color-testimonial-job-dark
--aw-color-testimonial-hr-dark
```

---

## FAQs Component

Accordion-style frequently asked questions section.

### Import

```astro
import FAQs from '~/components/widgets/FAQs.astro';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | — | Section heading |
| `subtitle` | string | — | Supporting text below title |
| `items` | Array | `[]` | Array of FAQ objects |
| `isDark` | boolean | `false` | Set `true` for black sections |
| `classes` | object | — | Override container, headline, question, answer styles |

### FAQ Item Object

| Property | Type | Description |
|----------|------|-------------|
| `title` | string | The question |
| `description` | string | The answer (supports HTML) |

### Usage

**Light section:**
```astro
<FAQs
  title="Frequently Asked Questions"
  items={[
    {
      title: 'What services do you offer?',
      description: 'We offer roof inspections, repair, replacement, and more.',
    },
    {
      title: 'How long does a roof inspection take?',
      description: 'Most inspections are completed within 1-2 hours.',
    },
  ]}
>
  <Fragment slot="bg">
    <SectionBg variant="grey" />
  </Fragment>
</FAQs>
```

**Dark section:**
```astro
<FAQs
  title="Common Questions"
  isDark={true}
  items={[...]}
>
  <Fragment slot="bg">
    <SectionBg variant="dark" />
  </Fragment>
</FAQs>
```

### Color Variables

```css
/* Light mode */
--aw-color-faq-border-light
--aw-color-faq-question-light
--aw-color-faq-answer-light
--aw-color-faq-toggle-border-light
--aw-color-faq-toggle-text-light
--aw-color-faq-toggle-active-light

/* Dark mode */
--aw-color-faq-border-dark
--aw-color-faq-question-dark
--aw-color-faq-answer-dark
--aw-color-faq-toggle-border-dark
--aw-color-faq-toggle-text-dark
--aw-color-faq-toggle-active-dark
```

---

## ProjectsSection Component

Display a grid of project cards with consistent styling and optional CTA button.

### Import

```astro
import ProjectsSection from '~/components/widgets/ProjectsSection.astro';
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | — | Section heading |
| `subtitle` | string | — | Supporting text below title |
| `projects` | Array | `[]` | Array of project objects |
| `columns` | 2 \| 3 | `3` | Grid columns |
| `isDark` | boolean | `false` | Set `true` for black sections |
| `showCta` | boolean | `true` | Show CTA button |
| `ctaText` | string | "View Our Project Gallery" | CTA button text |
| `ctaHref` | string | "/about/gallery" | CTA button link |

### Project Object

| Property | Type | Description |
|----------|------|-------------|
| `title` | string | Project title |
| `description` | string | Project description |
| `location` | string | Optional location (e.g., "Honolulu, HI") |
| `material` | string | Optional material type |
| `image` | object | Optional `{ src, alt }` for project image |

### Usage

**Light section (3 columns):**
```astro
<ProjectsSection
  title="Recent Roofing Projects"
  subtitle="See examples of roofing work completed by R&C."
  projects={[
    { title: 'Project 1', description: 'Roof replacement in Honolulu.' },
    { title: 'Project 2', description: 'Commercial roof repair.' },
    { title: 'Project 3', description: 'Residential installation.' },
  ]}
>
  <Fragment slot="bg">
    <SectionBg variant="white" />
  </Fragment>
</ProjectsSection>
```

**Dark section (2 columns):**
```astro
<ProjectsSection
  title="Recent Commercial Projects"
  isDark={true}
  columns={2}
  projects={[
    { title: 'Project 1', location: 'Downtown Honolulu', description: 'Details.' },
    { title: 'Project 2', location: 'Waikiki', description: 'Details.' },
  ]}
>
  <Fragment slot="bg">
    <SectionBg variant="dark" />
  </Fragment>
</ProjectsSection>
```

**With images:**
```astro
<ProjectsSection
  title="Featured Projects"
  projects={[
    {
      title: 'Kailua Residence',
      description: 'Complete roof replacement.',
      image: { src: '/images/project1.jpg', alt: 'Kailua roof project' },
    },
  ]}
/>
```

### Color Variables

```css
/* Light mode */
--aw-color-projects-card-bg-light
--aw-color-projects-card-border-light
--aw-color-projects-title-light
--aw-color-projects-desc-light

/* Dark mode */
--aw-color-projects-card-bg-dark
--aw-color-projects-card-border-dark
--aw-color-projects-title-dark
--aw-color-projects-desc-dark
```

---

## Card Components

A family of card components built on a shared `CardWrapper` base for consistent styling.

### CardWrapper (Base)

Low-level wrapper for custom cards. Use the specialized components below for common patterns.

**Props:**

| Prop | Values | Default | Description |
|------|--------|---------|-------------|
| `variant` | `dark`, `light` | `dark` | Color scheme |
| `size` | `sm`, `md`, `lg` | `md` | Padding size |
| `border` | `true`, `false` | `true` | Show accent border |
| `href` | string | — | Makes card clickable link |

---

### InfoCard

Simple title + description card. Use for service areas, feature lists, compact info.

```astro
<InfoCard
  title="Card Title"
  description="Card description text."
  variant="dark"
  size="md"
  border={true}
/>
```

**Props:** `title`, `description`, `variant`, `size`, `border`

---

### ServiceCard

Card with title, description, and link. Entire card is clickable.

```astro
<ServiceCard
  title="Roof Inspections"
  description="Understand the condition of your roof with a HAAG Certified inspection."
  href="/roof-inspections"
  linkText="View Roof Inspections →"
/>
```

**Props:** `title`, `description`, `href`, `linkText`, `variant`, `size`

---

### ProjectCard

Card with image placeholder, title, and optional description. Good for galleries/portfolios.

```astro
<ProjectCard
  title="Project Name"
  description="Project details."
  image={{ src: '/image.jpg', alt: 'Description' }}
  href="/projects/1"
  variant="light"
/>
```

**Props:** `title`, `description`, `image`, `href`, `variant`, `size`

---

### BulletCard

Card with heading and bullet point list. Good for comparison cards, criteria lists.

```astro
<BulletCard
  title="Repair May Make Sense When"
  items={[
    'Damage is limited to a specific area.',
    'Surrounding materials remain serviceable.',
    'A targeted repair addresses the problem.',
  ]}
  variant="dark"
/>
```

**Props:** `title`, `items` (string array), `variant`, `size`

---

### BenefitItem

Left accent bar + title + description. Not a card — used for benefit/feature lists.

```astro
<BenefitItem
  title="HAAG Certified"
  description="Specialized roof damage assessment training."
  variant="light"
/>
```

**Props:** `title`, `description`, `variant` (`light` or `dark`)
