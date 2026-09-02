# AstroWind Template Guide — Agency Customization

## How This Template Works

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    astro.config.ts                       │
│  (Build config, fonts, integrations, Tailwind plugin)   │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│                   src/config.yaml                        │
│  (Site name, SEO metadata, blog settings, analytics)    │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│              src/layouts/Layout.astro                    │
│  (HTML shell: <head>, fonts, meta, analytics, body)     │
│                                                         │
│   ┌─────────────────────────────────────────────────┐   │
│   │         src/layouts/PageLayout.astro             │   │
│   │  (Header + Main Content + Footer wrapper)       │   │
│   │                                                 │   │
│   │   ┌─────────────────────────────────────────┐   │   │
│   │   │          src/pages/*.astro              │   │   │
│   │   │  (Actual page content using Widgets)    │   │   │
│   │   └─────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

```
config.yaml → Virtual Module (astrowind:config) → Components use SITE, METADATA, etc.
navigation.ts → Header & Footer components → Links, menus, social icons
src/data/post/*.md → Content Collections → Blog pages (list, single, category, tag)
CustomStyles.astro → CSS Variables → Colors, fonts, dark mode throughout the site
```

---

## File-by-File Breakdown

### 1. Site Configuration — `src/config.yaml`

This is the **global settings** file. Change these first:


| Setting                                | What it controls                              |
| -------------------------------------- | --------------------------------------------- |
| `site.name`                            | Brand name shown in header/footer             |
| `site.site`                            | Production URL (for sitemap, canonical links) |
| `metadata.title.default`               | Default browser tab title                     |
| `metadata.title.template`              | Pattern like `%s — YourBrand`                 |
| `metadata.description`                 | SEO description for homepage                  |
| `metadata.openGraph`                   | Social media share card                       |
| `metadata.twitter`                     | Twitter card settings                         |
| `analytics.vendors.googleAnalytics.id` | GA tracking ID                                |
| `ui.theme`                             | Default theme: `system`, `light`, `dark`      |


### 2. Navigation — `src/navigation.ts`

Controls the **header menu** and **footer links**:

- `headerData.links` — Top navigation with dropdowns
- `headerData.actions` — CTA button in header (e.g., "Get Started")
- `footerData.links` — Footer link columns
- `footerData.secondaryLinks` — Terms, Privacy links
- `footerData.socialLinks` — Social media icons
- `footerData.footNote` — Copyright text

### 3. Colors & Fonts — `src/components/CustomStyles.astro`

All visual theming is done through CSS variables:

```css
:root {
  --aw-font-sans: var(--font-inter);        /* Body font */
  --aw-font-heading: var(--font-inter);      /* Heading font */
  --aw-color-primary: rgb(1 97 239);         /* Primary brand color */
  --aw-color-secondary: rgb(1 84 207);       /* Secondary color */
  --aw-color-accent: rgb(109 40 217);        /* Accent color */
  --aw-color-text-heading: rgb(0 0 0);       /* Heading text */
  --aw-color-text-default: rgb(16 16 16);    /* Body text */
  --aw-color-text-muted: rgb(16 16 16 / 66%);/* Muted text */
  --aw-color-bg-page: rgb(255 255 255);      /* Page background */
}

.dark { /* Dark mode overrides */ }
```

To change the font family, edit `astro.config.ts` → `fonts` array (provider, name, cssVariable).

### 4. Pages — `src/pages/`

File-based routing. Each `.astro` file = a URL route:


| File                     | URL                 | Purpose                          |
| ------------------------ | ------------------- | -------------------------------- |
| `index.astro`            | `/`                 | Homepage                         |
| `about.astro`            | `/about`            | About page                       |
| `services.astro`         | `/services`         | Services page                    |
| `pricing.astro`          | `/pricing`          | Pricing page                     |
| `contact.astro`          | `/contact`          | Contact page                     |
| `404.astro`              | `/404`              | Not found page                   |
| `homes/saas.astro`       | `/homes/saas`       | SaaS landing variant             |
| `homes/startup.astro`    | `/homes/startup`    | Startup landing variant          |
| `homes/mobile-app.astro` | `/homes/mobile-app` | Mobile app landing               |
| `homes/personal.astro`   | `/homes/personal`   | Personal site                    |
| `landing/*.astro`        | `/landing/*`        | Various landing pages            |
| `[...blog]/*.astro`      | `/blog/*`           | Blog (list, post, category, tag) |


### 5. Widgets — `src/components/widgets/`

These are **section-level** components you compose pages with:


| Widget                                 | What it does                                             |
| -------------------------------------- | -------------------------------------------------------- |
| `Hero.astro`**Page Building Playbook** | Full-width hero with title, subtitle, CTA buttons, image |
| `Hero2.astro`                          | Alternative hero layout                                  |
| `HeroText.astro`                       | Text-only hero (no image)                                |
| `Features.astro`                       | Grid of feature cards with icons                         |
| `Features2.astro`                      | Alternative features layout                              |
| `Features3.astro`                      | Third features variant                                   |
| `Content.astro`                        | Side-by-side content + image section                     |
| `Steps.astro`                          | Vertical timeline/steps with image                       |
| `Steps2.astro`                         | Alternative steps layout                                 |
| `Pricing.astro`                        | Pricing table with plans                                 |
| `FAQs.astro`                           | Accordion FAQ section                                    |
| `Stats.astro`                          | Statistics/numbers row                                   |
| `Testimonials.astro`                   | Customer testimonials                                    |
| `Brands.astro`                         | Logo cloud / brand strip                                 |
| `CallToAction.astro`                   | CTA banner section                                       |
| `Contact.astro`                        | Contact form section                                     |
| `BlogLatestPosts.astro`                | Latest blog posts grid                                   |
| `BlogHighlightedPosts.astro`           | Featured blog posts                                      |
| `Note.astro`                           | Small notification/note banner                           |
| `Announcement.astro`                   | Top-of-page announcement bar                             |
| `Header.astro`                         | Site header with navigation                              |
| `Footer.astro`                         | Site footer                                              |


### 6. Blog System — Current (File-based)

Currently uses Astro Content Collections with local Markdown files:

- Posts live in `src/data/post/*.md` or `*.mdx`
- Schema defined in `src/content.config.ts`
- Frontmatter: `title`, `publishDate`, `excerpt`, `image`, `category`, `tags`, `author`
- Utilities in `src/utils/blog.ts` handle fetching, sorting, pagination

---

## How to Build a Page

Every page follows this pattern:

```astro
---
import Layout from '~/layouts/PageLayout.astro';
import Hero from '~/components/widgets/Hero.astro';
import Features from '~/components/widgets/Features.astro';
// ... more widgets

const metadata = {
  title: 'Page Title',
  description: 'SEO description',
};
---

<Layout metadata={metadata}>
  <Hero
    title="Your Headline"
    subtitle="Your subheadline"
    actions={[{ text: 'CTA Button', href: '/contact' }]}
    image={{ src: '~/assets/images/your-image.png', alt: 'Description' }}
  />

  <Features
    title="Section Title"
    items={[
      { title: 'Feature 1', description: '...', icon: 'tabler:icon-name' },
      { title: 'Feature 2', description: '...', icon: 'tabler:icon-name' },
    ]}
  />
</Layout>
```

---

## What to Change for Your Agency

### Priority 1: Brand Identity


| File                                | What to change                                 |
| ----------------------------------- | ---------------------------------------------- |
| `src/config.yaml`                   | Agency name, URL, SEO metadata, social handles |
| `src/components/CustomStyles.astro` | Brand colors (primary, secondary, accent)      |
| `astro.config.ts` → `fonts`         | Your brand typeface                            |
| `src/assets/images/`                | Logo, favicon, hero images                     |
| `src/navigation.ts`                 | Menu structure, footer links, social links     |


### Priority 2: Pages & Content


| File                       | What to change                |
| -------------------------- | ----------------------------- |
| `src/pages/index.astro`    | Homepage — all widget content |
| `src/pages/about.astro`    | About your agency             |
| `src/pages/services.astro` | Your services                 |
| `src/pages/pricing.astro`  | Your pricing plans            |
| `src/pages/contact.astro`  | Contact form/info             |


### Priority 3: Remove Demo Content

- Delete pages you don't need: `src/pages/homes/`, `src/pages/landing/`
- Remove demo blog posts in `src/data/post/`
- Update `src/navigation.ts` to remove links to deleted pages

### Priority 4: Add Agency-Specific Sections

You can mix and match widgets on any page. Common agency patterns:

- Hero → Services overview → Case studies (Content widget) → Testimonials → CTA
- About → Team section → Stats → Timeline (Steps widget)
- Services → Features grid → Pricing → FAQ → CTA

---

## Connecting Sanity CMS (for Blogs & Content)

### Why Sanity?

Instead of editing Markdown files locally, Sanity gives you:

- Visual editor for non-technical team members
- Real-time collaboration
- Image CDN with transformations
- Structured content that can power blog + page sections

### Integration Plan

#### Step 1: Install Sanity packages

```bash
npm install @sanity/client @sanity/image-url
```

#### Step 2: Create Sanity client — `src/lib/sanity.ts`

```typescript
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'YOUR_PROJECT_ID',   // From sanity.io/manage
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,                    // true for static builds
});

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: any) {
  return builder.image(source);
}
```

#### Step 3: Define Sanity schemas (in your Sanity Studio project)

```typescript
// Blog Post schema
export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'publishDate', type: 'datetime' },
    { name: 'excerpt', type: 'text' },
    { name: 'image', type: 'image', options: { hotspot: true } },
    { name: 'category', type: 'reference', to: [{ type: 'category' }] },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'author', type: 'string' },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
  ],
};
```

#### Step 4: Replace Content Collection with Sanity loader

Update `src/content.config.ts` to use a Sanity loader instead of `glob()`:

```typescript
import { defineCollection, z } from 'astro:content';

// Option A: Use @sanity/astro integration (recommended)
// Option B: Create a custom loader that fetches from Sanity API

const postCollection = defineCollection({
  loader: async () => {
    const { sanityClient } = await import('./lib/sanity');
    const posts = await sanityClient.fetch(`
      *[_type == "post"] | order(publishDate desc) {
        "id": _id,
        title,
        "slug": slug.current,
        publishDate,
        excerpt,
        "image": image.asset->url,
        "category": category->title,
        tags,
        author,
        body
      }
    `);
    return posts;
  },
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    publishDate: z.string().optional(),
    excerpt: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    body: z.any().optional(),
  }),
});
```

#### Step 5: Update blog utilities

Modify `src/utils/blog.ts` to work with the new data shape from Sanity (dates, image URLs, body rendering).

#### Step 6: Render Sanity rich text

Install `@portabletext/astro` for rendering Sanity's block content:

```bash
npm install @portabletext/astro
```

Use in blog post templates:

```astro
---
import { PortableText } from '@portabletext/astro';
---
<PortableText value={post.body} />
```

### Content You Can Also Manage from Sanity

Beyond blog posts, you can create Sanity document types for:

- **Homepage sections** (hero text, features, testimonials)
- **Services** (title, description, icon, details)
- **Team members** (name, role, photo, bio)
- **Case studies** (client, challenge, solution, results)
- **FAQs** (question, answer, category)
- **Pricing plans** (name, price, features, CTA)

This way, your agency team can update content without touching code.

---

## Customization Workflow

### Step-by-step process:

```
1. Change brand identity (colors, fonts, logo)
      ↓
2. Update src/config.yaml (name, URLs, SEO)
      ↓
3. Restructure navigation (header/footer links)
      ↓
4. Rewrite homepage (src/pages/index.astro)
   - Replace all widget content with your agency content
      ↓
5. Create/edit inner pages (about, services, pricing, contact)
      ↓
6. Remove unused demo pages (homes/, landing/)
      ↓
7. Set up Sanity Studio + schemas
      ↓
8. Connect Sanity to blog system
      ↓
9. Optionally connect page content to Sanity
      ↓
10. Deploy (Vercel, Netlify, Cloudflare Pages)
```

---

## Key Patterns to Remember

### Adding content to a widget

All widgets accept content via **props** or **named slots**:

```astro
<!-- Props for structured data -->
<Features items={[...]} title="..." subtitle="..." />

<!-- Slots for rich HTML content -->
<Hero>
  <Fragment slot="title">Your <span class="text-accent">Agency</span></Fragment>
  <Fragment slot="subtitle">We build amazing digital products.</Fragment>
</Hero>
```

### Images

- **Local images**: Put in `src/assets/images/`, import with `~/assets/images/file.png`
- **Remote images**: Pass full URL, Unpic handles CDN optimization
- **Sanity images**: Use the `urlFor()` helper from your Sanity client

### Icons

Uses `astro-icon` with Tabler icons. Browse at [https://tabler.io/icons](https://tabler.io/icons)

```astro
icon: 'tabler:rocket'
icon: 'tabler:brand-instagram'
icon: 'tabler:code'
```

### Dark Mode

Automatic via CSS variables in `CustomStyles.astro`. Just set colors in both `:root` and `.dark` blocks.

### Responsive Design

All widgets are responsive by default via Tailwind CSS. Customize breakpoints with standard Tailwind classes (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).

---

## Page Building Playbook

A living reference. When a new content doc arrives, use the **Pattern Selector** to pick the right layout, then copy the snippet. Add new patterns at the bottom as the site grows.

> **How to use:** Read the doc section → identify the content shape → find it in the selector → paste the snippet → fill in copy → done.

---

### Global Rules (Always Apply)

| Rule | Value |
|------|-------|
| Max content width | `max-w-[1400px] mx-auto` on every `WidgetWrapper` |
| Section padding | `py-12 md:py-16 lg:py-20` — handled by `WidgetWrapper` automatically |
| Background alternation | White → Grey → White → Grey down the page |
| Grey bg snippet | `<div class="absolute inset-0 bg-gray-50 dark:bg-slate-900/30"></div>` |
| White bg snippet | `<div class="absolute inset-0 bg-white dark:bg-transparent"></div>` |
| No bg slot | Default page background |
| All sections must use | `<WidgetWrapper>` or a widget that wraps it internally |
| H1 | Hero sections only — one per page |
| H2 | Every section title |
| H3 | Card/item titles within a section |

---

### Typography Classes (Copy-Paste)

DM Sans H1/H2 are Regular (400). Item titles (icon, image, or card heading + description) and FAQ questions use Manrope Medium. Body is Regular; nav/links Medium; buttons Semibold. Canonical table: `PAGE-BUILDER.md` → Typography Classes.

| Role | Classes |
|------|---------|
| **H1** | `text-[42px] md:text-[56px] font-normal leading-[115%] tracking-tighter font-heading` |
| **H2** | `text-[26px] md:text-[40px] font-normal leading-[120%] tracking-tighter font-heading text-heading` |
| **H3 standard** | `text-[22px] md:text-[26px] font-medium leading-[130%]` |
| **H3 small** (compact cards) | `text-[18px] md:text-[20px] font-medium leading-[130%]` |
| **H3 xs** (4-in-row cards) | `text-[16px] md:text-[18px] font-medium leading-[130%]` |
| **Body large** | `text-[16px] md:text-[17px] font-normal leading-[160%] text-muted` |
| **Body small** | `text-[14px] md:text-[15px] font-normal leading-[160%] text-muted` |
| **Body xs** (disclaimers) | `text-[13px] md:text-[14px] font-normal leading-[160%] text-muted` |
| **Primary button** | `btn-primary` |
| **Ghost/outline button** | `btn btn-secondary` |
| **Text link** | `text-primary font-medium text-[14px] md:text-[15px] hover:underline` |
| **Trust badge / tag** | `tag-pill` (Tailwind utility) |

---

### Pattern Selector

Read the doc section → find its **content shape** below → jump to that pattern number.

| Content shape | Pattern |
|---------------|---------|
| Page H1 + 1–2 paragraphs + primary CTA + optional image/badges | **P-01** |
| H2 + 1–2 intro paragraphs + 2–4 feature points (no image) | **P-02** |
| H2 + paragraphs + image side-by-side + CTA | **P-03** |
| H2 title that shares a row with a CTA button | **P-04** *(combine with another pattern)* |
| 4–6 service/topic cards each linking somewhere | **P-05** |
| Exactly 5 benefit/feature points (no per-card links) | **P-06** |
| 4 compact info items (areas, specs, quick facts) | **P-07** |
| H2 + intro paragraphs + numbered ordered steps + optional image | **P-08** |
| Photo/project cards grid + ghost CTA | **P-09** |
| Q&A pairs | **P-10** |
| Customer quotes/reviews | **P-11** |
| Page-ending CTA with contact info + button | **P-12** |
| *New pattern discovered while building* | **P-13, P-14…** *(add below)* |

---

### Pattern Library

---

#### P-01 · Hero
**Content shape:** Page H1, 1–2 description paragraphs, primary CTA, optional image, optional trust badges  
**Component:** `Hero2.astro` (left-right split) or `Hero.astro` (centered)

```astro
<Hero2
  actions={[{ variant: 'primary', text: 'Primary CTA', href: '/page' }]}
  image={{ src: 'IMAGE_URL', alt: 'Alt text' }}
>
  <Fragment slot="title">
    Heading Line One<br />Heading Line Two
  </Fragment>
  <Fragment slot="subtitle">
    First description paragraph.
    <br /><br />
    Second description paragraph.
  </Fragment>
  <Fragment slot="content">
    <!-- Optional trust badges -->
    <div class="flex flex-wrap gap-3 mt-6">
      <span class="tag-pill">Badge One</span>
      <span class="tag-pill">Badge Two</span>
    </div>
  </Fragment>
</Hero2>
```

**Variants:**
- No image → use `Hero.astro` (centered layout)
- No badges → omit `<Fragment slot="content">`
- Single H1 line → remove `<br />`

---

#### P-02 · Intro + N-Column Items
**Content shape:** H2 title, 1–2 intro paragraphs, 2–4 feature/benefit points (no image, no per-item links)  
**Pattern:** Inline `WidgetWrapper`

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <!-- Use P-04 header row if a CTA belongs in the title row, otherwise: -->
  <Headline title="Section Title" />

  <div class="text-[16px] md:text-[17px] font-normal leading-[160%] text-muted mb-8 md:mb-12">
    <p>First paragraph from doc.</p>
    <p class="mt-4">Second paragraph from doc.</p>
  </div>

  <!-- Change sm:grid-cols-N to match item count (2, 3, or 4) -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
    {[
      { title: 'Point One', description: 'Description from doc.' },
      { title: 'Point Two', description: 'Description from doc.' },
      { title: 'Point Three', description: 'Description from doc.' },
    ].map(({ title, description }) => (
      <div class="intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade">
        <h3 class="text-[22px] md:text-[26px] font-medium leading-[130%] mb-3">{title}</h3>
        <p class="text-[14px] md:text-[15px] font-medium leading-[160%] text-muted">{description}</p>
      </div>
    ))}
  </div>

  <!-- Optional CTA below items -->
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
- No intro paragraphs → omit the paragraph div
- No CTA → omit the CTA div

---

#### P-03 · Two-Column Text + Image
**Content shape:** H2 title, 2–3 paragraphs, image on one side, optional CTA  
**Component:** `Content.astro`  
**Note:** Title renders left-aligned above the text column, not centered above both columns.

```astro
<Content
  title="Section Title"
  callToAction={{ variant: 'primary', text: 'CTA Text', href: '/page' }}
  image={{ src: 'IMAGE_URL', alt: 'Alt text' }}
>
  <Fragment slot="content">
    <p class="text-muted">First paragraph from doc.</p>
    <p class="mt-4 text-muted">Second paragraph from doc.</p>
    <p class="mt-4 text-muted">Third paragraph (if exists).</p>
  </Fragment>
  <Fragment slot="bg">
    <div class="absolute inset-0 bg-white dark:bg-transparent"></div>
  </Fragment>
</Content>
```

**Variants:**
- Image on left, text on right → add `isReversed` prop
- No CTA → omit `callToAction`
- No image → omit `image` prop (layout becomes full-width with centered Headline)
- Ghost CTA → `callToAction={{ variant: 'secondary', text: '...', href: '...' }}`

---

#### P-04 · Heading + CTA Row
**Content shape:** H2 title that needs a CTA button in the same horizontal row  
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

#### P-05 · Service Cards Grid (Per-Card Links)
**Content shape:** 4–6 cards, each with title + description + link to its own page  
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
    // repeat for each card — no icons
  ]}
/>
```

**Variants:**
- No per-card links → omit `callToAction` per item
- Different column count → add `columns={4}` prop (default: 3)
- Different section bg → add `<Fragment slot="bg">...</Fragment>`

---

#### P-06 · Uneven Card Grid (3 + 2)
**Content shape:** Exactly 5 benefit/feature points (no per-card links)  
**Pattern:** Two stacked grids — 3-col then 2-col

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <Headline title="Section Title" />

  <!-- Row 1: 3 equal cards -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
    {[
      { title: '...', description: '...' },
      { title: '...', description: '...' },
      { title: '...', description: '...' },
    ].map(({ title, description }) => (
      <div class="rounded-lg border border-[#ffffff29] bg-white dark:bg-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.08)] p-6 flex flex-col intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade">
        <h3 class="text-[22px] md:text-[26px] font-medium leading-[130%] mb-3">{title}</h3>
        <p class="text-[14px] md:text-[15px] font-medium leading-[160%] text-muted">{description}</p>
      </div>
    ))}
  </div>

  <!-- Row 2: 2 half-width cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
    {[
      { title: '...', description: '...' },
      { title: '...', description: '...' },
    ].map(({ title, description }) => (
      <div class="rounded-lg border border-[#ffffff29] bg-white dark:bg-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.08)] p-6 flex flex-col intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade">
        <h3 class="text-[22px] md:text-[26px] font-medium leading-[130%] mb-3">{title}</h3>
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
- Cards with links → add `<a href="..." class="mt-auto pt-4 text-primary ...">Text →</a>` inside card div

---

#### P-07 · 4-Cards One Row (Compact)
**Content shape:** 4 compact info items (areas served, credentials, quick specs) + optional ghost CTA below

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <Headline title="Section Title" subtitle="Optional subtitle." />

  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
    {[
      { title: 'Item One', description: 'Short detail.' },
      { title: 'Item Two', description: 'Short detail.' },
      { title: 'Item Three', description: 'Short detail.' },
      { title: 'Item Four', description: 'Short detail.' },
    ].map(({ title, description }) => (
      <div class="rounded-lg border border-[#ffffff29] bg-white dark:bg-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.08)] p-4 intersect-once intersect-quarter motion-safe:md:opacity-0 motion-safe:md:intersect:animate-fade">
        <h3 class="text-[16px] md:text-[18px] font-medium leading-[130%] mb-1">{title}</h3>
        <p class="text-[13px] md:text-[14px] font-medium leading-[160%] text-muted">{description}</p>
      </div>
    ))}
  </div>

  <div class="mt-8 md:mt-10">
    <a href="/page" class="btn btn-secondary">Ghost CTA Text</a>
  </div>

  <Fragment slot="bg">
    <div class="absolute inset-0 bg-gray-50 dark:bg-slate-900/30"></div>
  </Fragment>
</WidgetWrapper>
```

**Variants:**
- No CTA → omit the CTA div
- 3 items → `sm:grid-cols-3` / `grid-cols-1`
- Clickable cards → wrap each card div in `<a href="...">` and add `hover:shadow-md transition-shadow`

---

#### P-08 · Process / Timeline
**Content shape:** H2 title, 1–2 intro paragraphs, 3–6 ordered steps, optional image, optional disclaimer  
**Pattern:** P-04 header row + two-column layout (text+image left, timeline right)

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <!-- P-04 header row -->
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-12">
    <h2 class="text-[26px] md:text-[40px] font-normal leading-[120%] tracking-tighter font-heading text-heading">
      Section Title
    </h2>
    <a href="/page" class="btn-primary shrink-0">CTA Text</a>
  </div>

  <div class="flex flex-col md:flex-row gap-10 md:gap-16">
    <!-- Left: intro + optional image + optional disclaimer -->
    <div class="md:basis-1/2 flex flex-col gap-6">
      <div class="text-[16px] md:text-[17px] font-normal leading-[160%] text-muted dark:text-slate-400">
        <p>First intro paragraph.</p>
        <p class="mt-4">Second intro paragraph.</p>
      </div>
      <!-- Image — omit block if no image available -->
      <Image
        class="w-full rounded-lg shadow-lg object-cover"
        src="IMAGE_URL" alt="Alt text"
        width={600} height={400}
        widths={[400, 768]} sizes="(max-width: 768px) 100vw, 50vw"
        format="webp" layout="constrained"
      />
      <!-- Disclaimer — omit if not needed -->
      <p class="text-[13px] md:text-[14px] font-normal leading-[160%] text-muted italic">
        Disclaimer or legal note text.
      </p>
    </div>

    <!-- Right: timeline steps -->
    <div class="md:basis-1/2">
      <Timeline
        items={[
          { title: 'Step 1', description: 'What happens in this step.', icon: 'tabler:search' },
          { title: 'Step 2', description: 'What happens in this step.', icon: 'tabler:camera' },
          { title: 'Step 3', description: 'What happens in this step.', icon: 'tabler:check' },
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
- Steps only, no left column → remove flex split, use `<Timeline>` full width
- No image → omit `<Image />` block
- No header CTA → replace P-04 row with `<Headline title="..." />`

---

#### P-09 · Gallery / Project Cards
**Content shape:** H2 title, subtitle, 3+ photo+title+description cards, ghost CTA  
**Pattern:** 3-column grid with image placeholder support

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <Headline title="Section Title" subtitle="Short subtitle." />

  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
    {[
      { title: 'Card Title', description: 'Brief description.', imageSrc: null },
    ].map(({ title, description, imageSrc }) => (
      <div class="rounded-lg border border-[#ffffff29] bg-white dark:bg-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.08)] p-4">
        {imageSrc ? (
          <Image class="w-full h-48 object-cover rounded mb-3" src={imageSrc} alt={title} width={400} height={240} format="webp" />
        ) : (
          <div class="w-full h-36 bg-gray-100 dark:bg-slate-800 rounded mb-3 flex items-center justify-center text-gray-300 dark:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        <h3 class="text-[18px] md:text-[20px] font-medium leading-[130%] mb-1">{title}</h3>
        <p class="text-[13px] md:text-[14px] font-medium leading-[160%] text-muted">{description}</p>
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

#### P-10 · FAQ Accordion
**Content shape:** List of Q&A pairs  
**Component:** `FAQs.astro` — single column, one item open at a time (HTML `name` attribute)

```astro
<FAQs
  title="Frequently Asked Questions"
  items={[
    { title: 'Question one?', description: 'Answer text.' },
    { title: 'Question two?', description: 'Answer text.' },
  ]}
/>
```

---

#### P-11 · Testimonials
**Content shape:** Customer quotes with name and role  
**Component:** `Testimonials.astro`

```astro
<Testimonials
  title="What Customers Say"
  subtitle="Short framing sentence."
  testimonials={[
    {
      testimonial: 'Quote text here.',
      name: 'First Last',
      job: 'Role, Location',
      image: { src: 'avatar-url', alt: 'Name' }, // optional
    },
  ]}
  callToAction={{ text: 'Read More Reviews', href: '/reviews' }}
/>
```

---

#### P-12 · Final CTA (Page Ender)
**Content shape:** H2 closing headline, 1–2 sentences, contact info, primary CTA  
**Pattern:** Shadowed card — left-aligned heading top, contact left + button right bottom

```astro
<WidgetWrapper containerClass="max-w-[1400px] mx-auto">
  <div class="w-full p-8 md:p-12 rounded-md shadow-xl dark:shadow-none dark:border dark:border-slate-600">

    <!-- Left-aligned heading + subtitle -->
    <div class="text-left mb-8 md:mb-10">
      <h2 class="text-[26px] md:text-[40px] font-normal leading-[120%] tracking-tighter font-heading text-heading mb-4">
        Closing Headline
      </h2>
      <p class="text-[16px] md:text-[17px] font-normal leading-[160%] text-muted dark:text-slate-400">
        Supporting sentence.<br />Second sentence.
      </p>
    </div>

    <!-- Contact info left · CTA right -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-t border-gray-200 dark:border-gray-700 pt-8">
      <div class="text-[15px] md:text-[16px] font-medium leading-[180%] text-muted dark:text-slate-400">
        <p class="font-semibold text-heading text-[16px] md:text-[17px]">Company Name</p>
        <p>Street Address, City, State ZIP</p>
        <p>Phone Number</p>
        <p class="mt-2 text-[13px] md:text-[14px] italic">Optional note (after-hours, chat, etc.)</p>
      </div>
      <a href="/contact" class="btn-primary shrink-0">Primary CTA</a>
    </div>

  </div>
</WidgetWrapper>
```

**Variants:**
- Ghost CTA → `class="btn btn-secondary shrink-0"`
- No contact info → remove the flex split, just center the button

---

### New Page Checklist

1. **Create** `src/pages/[route]/index.astro`
2. **Add metadata:**
   ```astro
   const metadata = {
     title: 'Page Title | R&C Roofing Contractors',
     description: 'Meta description from doc.',
     ignoreTitleTemplate: true,
   };
   ```
3. **Wrap** in `<Layout metadata={metadata}>`
4. **First section** → always `P-01 Hero`
5. **Scan each doc section** → match to Pattern Selector → paste snippet → fill copy
6. **Alternate backgrounds** — white → grey → white → grey
7. **Last section** → always `P-12 Final CTA`
8. **Run** `npm run build` — fix any errors before continuing

---

### Standard Import Block

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

### Adding New Patterns

When a new layout is polished and signed off:

1. Pick the next `P-XX` number
2. Add a row to the **Pattern Selector** table
3. Add the full pattern entry below P-12 using the same format:
   - `#### P-XX · Pattern Name`
   - **Content shape:** what the doc section looks like
   - **Component/Pattern:** what implements it
   - Code snippet
   - **Variants:** common modifications
4. Note any new global classes or component changes made

---
