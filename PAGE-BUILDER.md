# R&C Roofing — Page Builder Reference

> **Give this file to any new AI chat when building a page.**  
> It contains everything the AI needs to turn a content doc into a finished Astro page — no guessing, no inconsistency.

---

## Project Context

- **Framework:** Astro v7 + Tailwind CSS v4
- **Template:** AstroWind (customised for R&C Roofing)
- **Path alias:** `~/` maps to `src/`
- **Fonts:** Sora (headings, `font-heading`) · Inter (body)
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
import Hero2 from '~/components/widgets/Hero2.astro';
import Content from '~/components/widgets/Content.astro';
import Features2 from '~/components/widgets/Features2.astro';
import FAQs from '~/components/widgets/FAQs.astro';
import Testimonials from '~/components/widgets/Testimonials.astro';
import Timeline from '~/components/ui/Timeline.astro';
import Image from '~/components/common/Image.astro';
---
```

---

## Global Rules

Every section on every page must follow these rules. Do not deviate.

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
| No icons on cards | Unless the pattern explicitly includes them |
| Headline description alignment | When `<Headline>` is used (always center-aligned), any description immediately below it **must also be center-aligned**. **Never pass body text as the `subtitle` prop on `<Headline>`.** The `subtitle` slot is only for true visual sub-headings (rarely used). All descriptive sentences belong as a separate `<p>` below the `<Headline>` with `text-center max-w-3xl mx-auto mb-8 md:mb-12`, and add `classes={{ container: 'mb-4 md:mb-6' }}` on the `<Headline>` to tighten the gap. For sections with left-aligned body paragraphs, prepend the sentence as the first `<p>` inside the existing body `<div>` — no centering needed. |

Background snippets go inside `<Fragment slot="bg">` inside `WidgetWrapper`.

---

## Typography Classes

Use these exact classes everywhere. Do not invent new sizes.

| Role | Tailwind classes |
|------|-----------------|
| **H1** (hero only) | `text-[42px] md:text-[56px] font-medium leading-[115%] tracking-tighter font-heading` |
| **H2** (section title) | `text-[30px] md:text-[40px] font-normal leading-[120%] tracking-tighter font-heading text-heading` |
| **H3 standard** | `text-[22px] md:text-[26px] font-medium font-heading leading-[130%]` |
| **H3 small** (compact cards) | `text-[18px] md:text-[20px] font-medium font-heading leading-[130%]` |
| **H3 xs** (4-in-row cards) | `text-[16px] md:text-[18px] font-medium font-heading leading-[130%]` |
| **Body large** (main paragraphs) | `text-[16px] md:text-[17px] font-medium leading-[160%] text-muted` |
| **Body small** (card descriptions) | `text-[14px] md:text-[15px] font-medium leading-[160%] text-muted` |
| **Body xs** (disclaimers, labels) | `text-[13px] md:text-[14px] font-medium leading-[160%] text-muted` |
| **Primary button** | `btn-primary` |
| **Ghost / outline button** | `btn btn-secondary` |
| **Text link** | `text-primary font-medium text-[14px] md:text-[15px] hover:underline` |
| **Trust badge / tag** | `tag-pill` |

---

## Pattern Selector

Read each section of the content doc → find its shape below → use that pattern number.

| What the doc section looks like | Pattern |
|---------------------------------|---------|
| Page title (H1) + 1–2 paragraphs + primary CTA + optional image + optional badges | **P-01** |
| H2 + 1–2 intro paragraphs + 2–4 feature/benefit points, no image | **P-02** |
| H2 + paragraphs + image on one side + CTA | **P-03** |
| H2 title that should share a row with a CTA button | **P-04** *(composable — combine with P-02, P-08, etc.)* |
| 4–6 cards each with title, description, and a link to its own page | **P-05** |
| Exactly 5 benefit/feature points, no per-card links | **P-06** |
| 4 compact info items (areas served, credentials, quick specs) | **P-07** |
| H2 + 1–2 paragraphs + 3–6 ordered steps + optional image + optional disclaimer | **P-08** |
| Grid of project/portfolio cards with optional image placeholders | **P-09** |
| List of Q&A pairs | **P-10** |
| Customer quotes with name and role | **P-11** |
| Page-ending call to action with contact info and a button | **P-12** |
| H2 title + multiple body paragraphs, full width, no image, no grid — content-heavy narrative | **P-13** |
| *New layout polished and approved* | **P-14, P-15 …** *(add to this file)* |

---

## Pattern Library

---

### P-01 · Hero

**Content shape:** Page H1, 1–2 description paragraphs, primary CTA, optional image, optional trust badges  
**Components:** `Hero2.astro` (left-right split) · `Hero.astro` (centered, text-only)

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

**Variants:**
- No image → use `Hero.astro` instead (centered layout)
- No badges → omit `<Fragment slot="content">`
- Single heading line → remove `<br />`

---

### P-02 · Intro + N-Column Items

**Content shape:** H2 title, 1–2 intro paragraphs, 2–4 feature/benefit points (no image, no per-item links)  
**Pattern:** Inline `WidgetWrapper`

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">

  <!-- Header: plain H2, or swap in P-04 row if a CTA belongs here -->
  <Headline title="Section Title" />

  <!-- Intro paragraphs — omit div if no paragraphs in doc -->
  <div class="text-[16px] md:text-[17px] font-medium leading-[160%] text-muted mb-8 md:mb-12">
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
        <h3 class="text-[22px] md:text-[26px] font-medium font-heading leading-[130%] mb-3">{title}</h3>
        <p class="text-[14px] md:text-[15px] font-medium leading-[160%] text-muted">{description}</p>
      </div>
    ))}
  </div>

  <!-- Optional CTA below items — omit if not in doc -->
  <div class="mt-8 text-center">
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

**Content shape:** H2 title, 2–3 paragraphs, image on one side, optional CTA  
**Component:** `Content.astro`  
**Note:** Title is left-aligned above the text column, not centered above both columns.

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
- Image left, text right → add `isReversed` prop to `<Content>`
- No CTA → omit `callToAction`
- No image → omit `image` prop (becomes full-width text with centered Headline)
- Ghost CTA → `callToAction={{ variant: 'secondary', ... }}`

---

### P-04 · Heading + CTA Row

**Content shape:** H2 title that shares a horizontal row with a CTA button  
**Pattern:** Flex row — paste inside any `WidgetWrapper` as the first element, replacing `<Headline>`

```astro
<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-12">
  <h2 class="text-[30px] md:text-[40px] font-normal leading-[120%] tracking-tighter font-heading text-heading">
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

**Content shape:** 4–6 cards, each with title, description, and a link to its own page  
**Component:** `Features2.astro`

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
        class: 'text-primary font-medium text-[14px] md:text-[15px] hover:underline',
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

---

### P-06 · Uneven Card Grid (3 + 2)

**Content shape:** Exactly 5 benefit/feature points, no per-card links  
**Pattern:** Two stacked grids — 3-col row then 2-col row

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <Headline title="Section Title" />

  <!-- Row 1: 3 equal cards -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
    {[
      { title: 'Benefit One', description: 'Description from doc.' },
      { title: 'Benefit Two', description: 'Description from doc.' },
      { title: 'Benefit Three', description: 'Description from doc.' },
    ].map(({ title, description }) => (
      <div class="rounded-lg border border-[#ffffff29] bg-white dark:bg-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.08)] p-6 flex flex-col intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade">
        <h3 class="text-[22px] md:text-[26px] font-medium font-heading leading-[130%] mb-3">{title}</h3>
        <p class="text-[14px] md:text-[15px] font-medium leading-[160%] text-muted">{description}</p>
      </div>
    ))}
  </div>

  <!-- Row 2: 2 half-width cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
    {[
      { title: 'Benefit Four', description: 'Description from doc.' },
      { title: 'Benefit Five', description: 'Description from doc.' },
    ].map(({ title, description }) => (
      <div class="rounded-lg border border-[#ffffff29] bg-white dark:bg-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.08)] p-6 flex flex-col intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade">
        <h3 class="text-[22px] md:text-[26px] font-medium font-heading leading-[130%] mb-3">{title}</h3>
        <p class="text-[14px] md:text-[15px] font-medium leading-[160%] text-muted">{description}</p>
      </div>
    ))}
  </div>

  <Fragment slot="bg">
    <div class="absolute inset-0 bg-gray-50 dark:bg-slate-900/30"></div>
  </Fragment>
</WidgetWrapper>
```

**Variants:**
- 4 items → single `sm:grid-cols-4` grid
- 6 items → two `sm:grid-cols-3` grids
- Cards with links → add `<a href="..." class="mt-auto pt-4 text-primary font-medium text-[14px] hover:underline">Text →</a>` inside the card div

---

### P-07 · 4-Cards One Row (Compact)

**Content shape:** 4 compact info items — areas served, credentials, quick specs — plus an optional ghost CTA below

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <Headline title="Section Title" subtitle="Optional subtitle from doc." />

  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
    {[
      { title: 'Item One',   description: 'Short detail from doc.' },
      { title: 'Item Two',   description: 'Short detail from doc.' },
      { title: 'Item Three', description: 'Short detail from doc.' },
      { title: 'Item Four',  description: 'Short detail from doc.' },
    ].map(({ title, description }) => (
      <div class="rounded-lg border border-[#ffffff29] bg-white dark:bg-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.08)] p-4 intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade">
        <h3 class="text-[16px] md:text-[18px] font-medium font-heading leading-[130%] mb-1">{title}</h3>
        <p class="text-[13px] md:text-[14px] font-medium leading-[160%] text-muted">{description}</p>
      </div>
    ))}
  </div>

  <!-- Ghost CTA — omit if not in doc -->
  <div class="mt-8 md:mt-10 text-center">
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
    <h2 class="text-[30px] md:text-[40px] font-normal leading-[120%] tracking-tighter font-heading text-heading">
      Section Title
    </h2>
    <a href="/page" class="btn-primary shrink-0">CTA Text</a>
  </div>

  <div class="flex flex-col md:flex-row gap-10 md:gap-16">

    <!-- Left column: paragraphs + optional image + optional disclaimer -->
    <div class="md:basis-1/2 flex flex-col gap-6">
      <div class="text-[16px] md:text-[17px] font-medium leading-[160%] text-muted dark:text-slate-400">
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
      <p class="text-[13px] md:text-[14px] font-medium leading-[160%] text-muted italic">
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
- No image → omit `<Image />` block
- No CTA in header → replace header row with `<Headline title="..." />`

---

### P-09 · Gallery / Project Cards

**Content shape:** H2 title, subtitle, 3+ cards (photo + title + description), ghost CTA below  
**Note:** Use the SVG placeholder when real images are not yet available — it will be replaced later.

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
        <h3 class="text-[18px] md:text-[20px] font-medium font-heading leading-[130%] mb-1">{title}</h3>
        <p class="text-[13px] md:text-[14px] font-medium leading-[160%] text-muted">{description}</p>
      </div>
    ))}
  </div>

  <div class="mt-8 md:mt-10 text-center">
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
**Pattern:** Shadowed card — heading + subtitle centered at top, contact left + button right below a divider  
**Every page ends with this section.**

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <div class="w-full p-8 md:p-12 rounded-md shadow-xl dark:shadow-none dark:border dark:border-slate-600">

    <!-- Centered heading + subtitle -->
    <div class="text-center mb-8 md:mb-10">
      <h2 class="text-[30px] md:text-[40px] font-normal leading-[120%] tracking-tighter font-heading text-heading mb-4">
        Closing Headline from Doc
      </h2>
      <p class="text-[16px] md:text-[17px] font-medium leading-[160%] text-muted dark:text-slate-400">
        Supporting sentence from doc.<br />Second sentence if present.
      </p>
    </div>

    <!-- Contact info left · Primary CTA right -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t border-gray-200 dark:border-gray-700 pt-8">
      <div class="text-[15px] md:text-[16px] font-medium leading-[180%] text-muted dark:text-slate-400">
        <p class="font-semibold text-heading text-[16px] md:text-[17px]">R&amp;C Roofing Contractors</p>
        <p>3302 Campbell Ave, Honolulu, HI 96815</p>
        <p>(808) 888-2524</p>
        <p class="mt-2 text-[13px] md:text-[14px] italic">After-hours roofing concern? Use the online chat to contact the team.</p>
      </div>
      <a href="/contact" class="btn-primary shrink-0">Schedule a Roof Inspection</a>
    </div>

  </div>
</WidgetWrapper>
```

**Variants:**
- Ghost CTA → `class="btn btn-secondary shrink-0"`
- No contact info → remove the flex split and just center the button

---

### P-13 · Full-Width Editorial

**Content shape:** H2 title + multiple body paragraphs, full width, no image, no columns — used for content-heavy narrative sections where the text carries the page (e.g. company story, policy, process explanation)

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <h2 class="text-[30px] md:text-[40px] font-normal leading-[120%] tracking-tighter font-heading text-heading mb-8 md:mb-10">
    Section Title
  </h2>
  <div class="text-[16px] md:text-[17px] font-medium leading-[160%] text-muted space-y-5">
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

1. Pick the next number: **P-13**, P-14, …
2. Add a row to the **Pattern Selector** table
3. Add the pattern entry below P-12 using the same format:
   - `### P-XX · Pattern Name`
   - **Content shape:** one line describing what the doc section looks like
   - Code snippet (complete, copy-pasteable)
   - **Variants:** common modifications
4. If any global class or component was changed to support it, note it here too
