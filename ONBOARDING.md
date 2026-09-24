# Agency Onboarding — New Client Website Setup

This is the canonical guide for spinning up a new client website using this codebase as the base. Every website built from this repo shares the same Astro + Tailwind + Sanity + Vercel stack. What changes per client is brand identity, content, and connected services — nothing structural.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Accounts & Access to Provision](#2-accounts--access-to-provision)
3. [Step-by-Step Setup Checklist](#3-step-by-step-setup-checklist)
4. [Brand Customisation — Every File That Changes](#4-brand-customisation--every-file-that-changes)
5. [Content Setup (Sanity)](#5-content-setup-sanity)
6. [JSON-LD / SEO Schema Setup](#6-json-ld--seo-schema-setup)
7. [Environment Variables Reference](#7-environment-variables-reference)
8. [Deployment on Vercel](#8-deployment-on-vercel)
9. [Making Websites Look Different](#9-making-websites-look-different)
10. [Roadmap — Making the Codebase Smarter](#10-roadmap--making-the-codebase-smarter)

---

## 1. Architecture Overview

```
Browser
  │
  └──▶ Vercel (Astro SSR + ISR, 5-min cache)
          │
          ├──▶ Sanity (CMS — nav, pages, blog, reviews)
          │       └──▶ Webhook → POST /api/revalidate (instant publish)
          │
          ├──▶ Google Tag Manager (analytics, pixels, events)
          │
          ├──▶ JSON-LD (structured data, served via Layout.astro)
          │
          ├──▶ Contact Form → Cloudflare Worker → Resend (email)
          │       └── Cloudflare D1 (submissions log)
          │
          └──▶ Reviews Cron (daily) → Google Places + Yelp Fusion
```

**Tech stack**

| Layer | Technology |
|---|---|
| Framework | Astro v7, SSR output, `@astrojs/vercel` |
| Styling | Tailwind CSS v4 (CSS-first config) |
| CMS | Sanity v3 (content + Studio) |
| Hosting | Vercel (ISR, crons, webhooks) |
| Forms | Cloudflare Worker + Resend (agency-shared) |
| Analytics | Google Tag Manager (one container per client) |
| Fonts | Google Fonts via Astro Fonts API (self-hosted) |
| Icons | Tabler (via `astro-icon`) |
| Images | Unpic CDN + Sharp (local) |

**Key files that encode the brand (change these for every client)**

```
src/config.yaml                     ← site name, URL, GTM ID, SEO defaults
src/components/CustomStyles.astro   ← all CSS color/font/radius tokens
src/config/motif.ts                 ← background pattern SVG + settings
astro.config.ts                     ← Google Fonts pairing
src/assets/images/logo.webp         ← client logo
public/favicon*                     ← all favicon variants
src/config/schema/business.ts       ← schema.org business entity
src/config/cta.ts                   ← global CTA label + note
src/navigation.ts / src/data/navigation.ts ← nav links, phone, footer
```

---

## 2. Accounts & Access to Provision

For each new client, create or set up the following. Log all credentials in a shared secrets vault (1Password / Bitwarden), never in git.

| Service | What to create | Notes |
|---|---|---|
| **Vercel** | New project linked to the client repo | Set all env vars (Section 7) |
| **Sanity** | New project + `production` dataset + Studio hostname | `sanity.io/manage` → New Project |
| **Google Tag Manager** | New container → get `GTM-XXXXXXXX` ID | Tag Manager at `tagmanager.google.com` |
| **Google Search Console** | Verify the domain | Gets `googleSiteVerificationId` |
| **Google Places API** | Enable Places API, get key + Place ID | For review fetching |
| **Yelp Fusion** | Get API key + Business ID | For review fetching |
| **Cloudflare Turnstile** | New site key for the client domain | `dash.cloudflare.com` → Turnstile |
| **Cloudflare Worker (forms)** | Add new `site_slug` entry + Resend route | Agency-shared Worker at `massic-forms.kanahiku.workers.dev` |
| **Resend** | Verify sending domain or alias | Add domain in Resend dashboard |
| **GitHub** | New repo (clone/fork this one) | Client gets a new private repo |

---

## 3. Step-by-Step Setup Checklist

### Phase 1 — Repository

```bash
# 1. Clone this repo into a new directory for the client
git clone git@github.com:your-agency/r-and-c-roofing.git client-slug
cd client-slug

# 2. Create a new GitHub repo for the client and push
git remote set-url origin git@github.com:your-agency/client-slug.git
git push -u origin main

# 3. Install dependencies
npm install

# 4. Copy the example env file and fill it in (Section 7)
cp .env.example .env
```

### Phase 2 — Brand Customisation

Work through **Section 4** completely. Every file listed there must be updated before the first deploy. The `npm run build` command after each change catches any issues early.

### Phase 3 — Sanity

```bash
# 1. Create a new Sanity project at sanity.io/manage
# 2. Fill in SANITY_PROJECT_ID + SANITY_DATASET in .env
# 3. Fill in studio/.env (Section 7)
# 4. Run the Studio locally to confirm connection
npm run studio

# 5. Migrate seed content from static data files into Sanity
npm run migrate:to-sanity

# 6. Optionally migrate services + contact/review data
npm run migrate:services
npm run migrate:contact-reviews
```

### Phase 4 — Cloudflare Worker (forms)

The forms Worker is shared across all agency sites, but each client gets an isolated Turnstile widget and secret:

1. Add the client's `site_slug` row and Resend route.
2. From `services/forms/`, run `npm run turnstile:create -- --slug client-slug --name "Client contact" --domain example.com --domain www.example.com`.
3. The command stores the secret as `TURNSTILE_SECRET_CLIENT_SLUG` and prints only the public site key.
4. Put that public key in the client's Vercel `PUBLIC_TURNSTILE_SITE_KEY`.
5. Deploy the Worker and website, then test on every configured hostname.

> The Worker README lives at `services/forms/README.md`.

### Phase 5 — Deploy & Connect

See **Section 8** for full Vercel setup and Sanity webhook connection.

### Phase 6 — Go-live Checklist

- [ ] `npm run build` passes with zero errors
- [ ] `npm run check` passes (Astro check + ESLint + Prettier)
- [ ] All `PUBLIC_*` env vars set in Vercel
- [ ] Sanity webhook connected (`/api/revalidate`)
- [ ] GTM container verified in Tag Manager
- [ ] Google Search Console verified
- [ ] Contact form submits and email arrives in inbox
- [ ] Reviews appear (or gracefully absent if API keys not yet set)
- [ ] JSON-LD validates at `https://validator.schema.org`
- [ ] Open Graph image previews at `https://ogp.me`
- [ ] Mobile + desktop visual check on real device

---

## 4. Brand Customisation — Every File That Changes

### 4.1 `src/config.yaml` — Site identity & SEO defaults

```yaml
site:
  name: Client Business Name                        # ← change
  site: 'https://clientdomain.com'                  # ← change
  googleSiteVerificationId: XXXXXXXXX               # ← from Search Console

metadata:
  title:
    default: Client Business Name                   # ← change
    template: '%s — Client Business Name'           # ← change
  description: 'One-sentence SEO description.'      # ← change
  openGraph:
    site_name: Client Business Name                 # ← change
    images:
      - url: '~/assets/images/logo.webp'            # update if logo path changes

analytics:
  vendors:
    googleTagManager:
      id: GTM-XXXXXXXX                              # ← from GTM dashboard
```

### 4.2 `src/components/CustomStyles.astro` — All color, font, and radius tokens

This single file drives every color across the entire site. Change it here; nothing else needs touching.

**Accent color** — the dominant brand color used in buttons, borders, highlights:

```css
--aw-color-accent: rgb(237 217 116);          /* R&C: gold/yellow */
--aw-color-accent-hover: rgb(212 188 87);     /* slightly darker on hover */
```

**CTA banner** — the background of the yellow card at the bottom of every page:

```css
--aw-color-bg-cta: rgb(245 236 189);          /* R&C: light gold wash */
```

> Rule: `bg-cta` must be a pale tint of the accent color. For a blue brand (#2563EB), use a pale blue wash (~rgb(219 234 254)).

**Motif colors** — controls the decorative SVG pattern per section:

```css
--aw-color-motif-hero: var(--aw-color-accent); /* pattern color on hero */
--aw-color-motif-dark: var(--aw-color-accent); /* pattern color on dark sections */
--aw-color-motif-cta:  rgb(0 0 0);             /* R&C: black pattern on yellow CTA */

--aw-opacity-motif-hero: 0.10;   /* 10% — subtle */
--aw-opacity-motif-dark: 0.12;   /* 12% */
--aw-opacity-motif-cta:  0.02;   /* 2% — very faint on the yellow card */
```

**Corner radius** — changes the entire visual personality:

```css
--aw-radius: 0px;      /* R&C: sharp — industrial / trade */
/* --aw-radius: 8px;    friendly / professional */
/* --aw-radius: 16px;   modern SaaS / consumer */
```

**Fonts** — must match what you configure in `astro.config.ts`:

```css
--aw-font-heading: var(--font-dm-sans);    /* R&C: DM Sans headings */
--aw-font-sans:   var(--font-manrope);     /* R&C: Manrope body */
--aw-font-serif:  var(--font-manrope);     /* (rarely used) */
```

**Nothing else in `CustomStyles.astro` usually needs to change.** All other tokens derive from `--aw-color-accent` or the section background variables.

### 4.3 `astro.config.ts` — Font pairing

Change the `fonts` array to the Google Fonts for this client:

```ts
fonts: [
  {
    provider: 'google',
    name: 'DM Sans',                         // ← heading font
    cssVariable: '--font-dm-sans',
    styles: ['normal'],
    weights: [400, 500, 700],
    subsets: ['latin'],
  },
  {
    provider: 'google',
    name: 'Manrope',                         // ← body font
    cssVariable: '--font-manrope',
    styles: ['normal'],
    weights: [400, 500, 700],
    subsets: ['latin'],
  },
],
```

> If you rename the `cssVariable` (e.g. `--font-playfair`), update the matching `var(--font-*)` references in `CustomStyles.astro`.

**Recommended font pairings for different client personalities:**

| Personality | Heading | Body |
|---|---|---|
| Trade / construction | DM Sans | Manrope (current) |
| Law / finance | Playfair Display | Source Sans 3 |
| Modern SaaS | Inter | Inter |
| Medical / clinical | Lato | Lato |
| Luxury / real estate | Cormorant Garamond | Jost |
| Friendly / consumer | Nunito | Open Sans |

### 4.4 `src/config/motif.ts` — Background pattern

```ts
export const MOTIF = {
  // Swap the SVG file for a different pattern
  pattern: patternSrc as ImageMetadata,   // ← import a different SVG

  // Which sections show the pattern
  sections: {
    hero: true,
    dark: true,
    grey: false,   // ← enable for a busier look
    white: false,
    cta: true,
  },

  fade: 'top-to-bottom' as MotifFade,

  // 'cover' = one large field; '400px 400px' + repeat: 'repeat' = wallpaper tile
  size: 'cover',
  repeat: 'no-repeat',
};
```

**Available pattern shapes** — add SVG files to `src/assets/images/patterns/`:

| File | Shape | Personality |
|---|---|---|
| `simple.svg` | Roof chevrons (current) | Trade / construction |
| `dots.svg` | Dot grid | Clean / tech |
| `hexagons.svg` | Honeycomb | Industrial / precision |
| `waves.svg` | Organic waves | Lifestyle / health |
| `lines.svg` | Diagonal hatching | Financial / data |
| `grid.svg` | Square grid | Architecture / real estate |

> SVG files must be black shapes on a white background — the CSS mask system handles color via `--aw-color-motif-*`.

### 4.5 `src/assets/images/logo.webp` — Client logo

Replace with the client's logo. The file must be `.webp` and the same path `logo.webp`. If you use a different filename, update:
- `src/config.yaml` → `metadata.openGraph.images[0].url`
- Any `<Logo />` component usage that hardcodes the path

Recommended: export the logo at 1024×124px (or similar wide rectangle) for OG use.

### 4.6 `public/favicon*` — Favicon set

Replace all favicon files. Use a tool like [realfavicongenerator.net](https://realfavicongenerator.net) to generate the full set from the client's icon/logo mark.

Files to replace:
```
public/favicon.ico
public/favicon.svg
public/apple-touch-icon.png
public/icon-192.png
public/icon-512.png
```

### 4.7 `src/config/schema/business.ts` — Business entity (JSON-LD)

Replace every field with the client's real data:

```ts
export const business: BusinessSchema = {
  idFragment: 'roofingcontractor',    // ← schema.org type slug (e.g. 'legalservice', 'dentist')
  name: 'Client Business Name',
  businessType: 'RoofingContractor',  // ← schema.org LocalBusiness type
  telephone: '+1-XXX-XXX-XXXX',
  email: 'info@clientdomain.com',
  priceRange: '$$',
  address: {
    streetAddress: '123 Main St',
    addressLocality: 'City',
    addressRegion: 'ST',
    postalCode: '00000',
    addressCountry: 'US',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  description: 'One or two sentences about the business for schema.',
  hasCredential: [],   // licenses, certifications
  memberOf: null,      // trade association membership
  award: [],           // awards / recognition
  sameAs: [],          // social + directory profile URLs
  areaServed: { '@type': 'AdministrativeArea', name: 'City, State' },
};
```

> Reference: [schema.org/LocalBusiness](https://schema.org/LocalBusiness) for valid `businessType` values.

### 4.8 `src/config/cta.ts` — Global CTA text

```ts
export const PRIMARY_CTA_NOTE = 'Free estimate. No obligation.';   // ← under every CTA
export const PRIMARY_CTA_LABEL = 'Get a Free Quote';               // ← button label
```

### 4.9 `src/navigation.ts` / `src/data/navigation.ts` — Nav + footer

Update the header links, phone number, footer columns, and social links to match the client's site structure. The header phone number appears in the top nav and is a direct call link.

---

## 5. Content Setup (Sanity)

### Studio schema overview

The Sanity Studio lives in `studio/`. It manages:

| Schema | Purpose |
|---|---|
| `singletons/settings` | Site name, logo, contact info |
| `singletons/navigation` | Header + footer links |
| `singletons/homePage` | Homepage hero, sections |
| `documents/service` | Individual service pages |
| `documents/post` | Blog posts |
| `documents/review` | Client reviews (auto-populated from Google/Yelp) |
| `objects/*` | Reusable content blocks (CTAs, cards, steps) |

### Running the Studio

```bash
# From the repo root
npm run studio
# Opens at http://localhost:3333
```

### Migrating seed content

When starting a new site, the static page data in `src/data/pages/` acts as the source of truth. Run the migration scripts to push it into Sanity:

```bash
# Migrate all page and service content
npm run migrate:to-sanity

# Migrate service directory entries
npm run migrate:services

# Migrate contact form submissions and review data
npm run migrate:contact-reviews
```

After migration, Sanity becomes the live source. The static files remain as fallback only.

### Content update flow

1. Editor publishes a change in Sanity Studio
2. Sanity fires a webhook → `POST /api/revalidate`
3. Vercel ISR invalidates the affected page
4. Next request serves fresh content (no re-deploy needed)

---

## 6. JSON-LD / SEO Schema Setup

The structured data system lives in `src/config/schema/`. It auto-generates schema.org JSON-LD for every page based on the page's route.

### Files

| File | Role | Change per client? |
|---|---|---|
| `business.ts` | The business entity node | **Yes** — Section 4.7 |
| `pages.ts` | Per-page schema entries | **Yes** — add/remove pages |
| `graph.ts` | Assembly logic | Rarely — logic is generic |
| `types.ts` | TypeScript types | No |
| `urls.ts` | URL helpers | No |

### Adding / editing pages in `pages.ts`

Each entry in the `pages` array maps a URL path to a schema type:

```ts
{
  name: 'Roof Repair',
  path: '/services/roof-repair',
  schemaType: 'Service',              // 'Service' | 'WebPage' | 'AboutPage' | 'ContactPage' | 'FAQOnly'
  serviceType: 'Roof Repair',        // Required for schemaType: 'Service'
  description: 'Short description for schema.',
  faq: [
    { q: 'Question?', a: 'Answer.' },
  ],
  breadcrumb: [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Roof Repair', path: '/services/roof-repair' },
  ],
},
```

**Schema type guide:**

| schemaType | When to use |
|---|---|
| `Service` | Any service-specific page |
| `WebPage` | General informational pages |
| `AboutPage` | About / Our Story page |
| `ContactPage` | Contact page |
| `FAQOnly` | Pages where only a FAQ block is needed (e.g. homepage) |

### Validating

After deployment, validate at:
- [validator.schema.org](https://validator.schema.org) — paste any URL
- [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## 7. Environment Variables Reference

Copy `.env.example` to `.env` locally. Set the same variables in Vercel → Project Settings → Environment Variables for production.

### Astro / Vercel site

| Variable | Required | How to get it |
|---|---|---|
| `SANITY_PROJECT_ID` | **Yes** | Sanity dashboard → Project → Settings → API |
| `SANITY_DATASET` | **Yes** | Usually `production` |
| `SANITY_API_TOKEN` | **Yes** | Sanity → API → Tokens → Add **Viewer** (read-only) token |
| `SANITY_WRITE_TOKEN` | Migration only | Sanity → API → Tokens → Add **Editor** token |
| `SANITY_REVALIDATE_SECRET` | **Yes** | `openssl rand -hex 32` — also paste into Sanity webhook |
| `ISR_BYPASS_TOKEN` | **Yes** | `openssl rand -hex 32` — goes into Vercel config |
| `PUBLIC_FORM_ENDPOINT` | **Yes** | Cloudflare Worker URL (e.g. `https://massic-forms.kanahiku.workers.dev/submit`) |
| `PUBLIC_TURNSTILE_SITE_KEY` | **Yes** | Cloudflare → Turnstile → New site |
| `PUBLIC_SITE_SLUG` | **Yes** | Short identifier matching Worker config (e.g. `rc-roofing`) |
| `SITE_NAME` | Recommended | Client business name (e.g. `R&C Roofing`) |
| `SITE_URL` | **Yes** | Full canonical URL with no trailing slash |
| `GOOGLE_PLACES_API_KEY` | Optional | Google Cloud Console → APIs → Places API |
| `GOOGLE_PLACE_ID` | Optional | Find at `maps.googleapis.com/maps/api/place/findplacefromtext` |
| `GOOGLE_REVIEWS_URL` | Optional | Google Maps URL for the business listing |
| `YELP_API_KEY` | Optional | Yelp Fusion developer dashboard |
| `YELP_BUSINESS_ID` | Optional | From Yelp business profile URL |
| `YELP_REVIEWS_URL` | Optional | Full Yelp profile URL |
| `NOTIFY_EMAIL` | Optional | Internal email for form submission notifications |
| `REVIEW_CACHE_TTL_MS` | Optional | Default `86400000` (24 h). Reduce to `3600000` for faster refresh. |

### Sanity Studio (`studio/.env`)

| Variable | Value |
|---|---|
| `SANITY_STUDIO_PROJECT_ID` | Same as `SANITY_PROJECT_ID` |
| `SANITY_STUDIO_DATASET` | Same as `SANITY_DATASET` |
| `SANITY_STUDIO_HOSTNAME` | Studio subdomain slug (e.g. `rc-roofing` → `rc-roofing.sanity.studio`) |
| `SANITY_AUTH_TOKEN` | Sanity personal auth token (for Studio deploy) |

### Generating secrets

```bash
# Generate SANITY_REVALIDATE_SECRET and ISR_BYPASS_TOKEN
openssl rand -hex 32
# Run twice — use one value for each
```

---

## 8. Deployment on Vercel

### Initial setup

1. Push the repo to GitHub
2. In Vercel: **Add New Project** → Import from GitHub → select repo
3. Framework preset: **Astro** (auto-detected)
4. Add all environment variables from Section 7
5. Deploy

### `vercel.json` (already configured)

The file at the root handles:
- ISR revalidation (5-minute cache)
- `ISR_BYPASS_TOKEN` for on-demand revalidation
- Daily cron at `/api/reviews` (pulls Google + Yelp reviews)
- Legacy URL redirects (update for the new client's URL structure)

### Connecting Sanity → Vercel (instant publish)

In Sanity dashboard → **API** → **Webhooks** → Add webhook:

| Field | Value |
|---|---|
| URL | `https://clientdomain.com/api/revalidate` |
| HTTP method | `POST` |
| Trigger on | Create, Update, Delete |
| Dataset | `production` |
| Authorization | `Bearer <SANITY_REVALIDATE_SECRET>` |

### Google Search Console

1. Add the domain to Search Console
2. Use DNS verification (preferred) or the HTML tag method
3. Copy the `content` value from the meta tag → paste into `src/config.yaml` → `site.googleSiteVerificationId`

### Custom domain

Set the domain in Vercel → Project → Domains. Vercel provisions TLS automatically.

---

## 9. Making Websites Look Different

With one code base, the risk is that all client sites look identical. These are the levers — ranked by visual impact — to ensure each site has its own identity.

### Lever 1 — Accent color (highest impact)

The entire site's interactive color comes from `--aw-color-accent`. Change this one value and buttons, borders, icon highlights, FAQ toggles, hero motifs, and the CTA card all shift.

| Industry | Suggested accent | Feel |
|---|---|---|
| Roofing / construction | `#EDD974` gold | Reliable, premium trade |
| Law / finance | `#1E3A5F` navy | Authority, trust |
| HVAC / plumbing | `#2563EB` blue | Clean, technical |
| Landscaping | `#16A34A` green | Natural, growth |
| Medical / dental | `#0891B2` teal | Clinical, calm |
| Real estate | `#9F1239` crimson | Luxury, prestige |
| Fitness / wellness | `#EA580C` orange | Energy, action |

> Always pair a dark CTA motif color (`--aw-color-motif-cta: rgb(0 0 0)`) with a pale accent CTA background. Light accents (yellow, light green) need this for contrast.

### Lever 2 — Border radius

```css
--aw-radius: 0px;   /* Sharp — industrial, trade, no-nonsense */
--aw-radius: 6px;   /* Slightly rounded — professional services */
--aw-radius: 12px;  /* Rounded — friendly, consumer, lifestyle */
--aw-radius: 20px;  /* Very rounded — modern SaaS, tech startup */
```

### Lever 3 — Font pairing

Changing the heading font alone transforms the personality more than most color changes. A condensed bold heading reads completely differently from a thin serif.

### Lever 4 — Background pattern (motif)

Swap `src/assets/images/patterns/simple.svg` for a different SVG. Use a tighter tile size and `repeat: 'repeat'` for a wallpaper effect instead of the large single-field default.

```ts
// In src/config/motif.ts — wallpaper style:
size: '320px 320px',
repeat: 'repeat',
sections: { hero: true, dark: true, grey: true, white: false, cta: true },
```

### Lever 5 — Hero variant

The `Hero2` component supports two variants:

- `variant="split"` (default) — content left, full-height photo right
- `variant="overlay"` — full-bleed artwork behind text with a scrim (used on R&C homepage)

Different hero variants immediately distinguish two sites even if they share the same accent color.

### Lever 6 — Section order and rhythm

The page pattern system (P-01…P-16 in `PAGE-BUILDER.md`) gives many valid orderings. An HVAC site might open with a process timeline before services. A law firm might lead with testimonials. Varying the *sequence* of patterns changes the feel completely.

### Lever 7 — Card style

The system supports two card styles on the same page:
- **Dark cards on grey** (`bg-[#222]` + accent border) — bold, high-contrast
- **Light cards on white** (`bg-card-light` yellow tint) — warm, approachable

Choosing one or the other per site creates a noticeably different visual weight.

### Lever 8 — Motif opacity

Increase `--aw-opacity-motif-hero` from `0.10` to `0.20`+ for a bold, textured hero. Drop it to `0.05` for a near-invisible whisper. This alone can make a site feel completely different at the same palette.

---

## 10. Roadmap — Making the Codebase Smarter

These are concrete improvements to pursue as the agency scales. Each one reduces setup time, prevents human error, or makes the platform more powerful.

### 10.1 `scripts/new-site.ts` — CLI bootstrapper *(short-term)*

A single script that prompts for new site details and writes all the brand files automatically:

```bash
npx tsx scripts/new-site.ts
# → What is the client name? Acme Roofing
# → What is the domain? acmeroofing.com
# → Accent color (hex)? #2563EB
# → Heading font? Inter
# → Body font? Inter
# → GTM container ID? GTM-XXXXXXXX
# → Business type (schema.org)? RoofingContractor
# ✔ Wrote src/config.yaml
# ✔ Wrote src/components/CustomStyles.astro
# ✔ Wrote src/config/schema/business.ts
# ✔ Wrote src/config/cta.ts
# ✔ Wrote .env from .env.example
```

This eliminates the manual search-and-replace step and the risk of missing a file.

### 10.2 `src/brand.ts` — Single brand source of truth *(short-term)*

A TypeScript file that holds all brand tokens in one place and exports them to both `CustomStyles.astro` and any build-time tooling (contrast checker, OG image gen):

```ts
// src/brand.ts
export const brand = {
  name: 'R&C Roofing',
  accent: '#EDD974',
  accentHover: '#D4BC57',
  ctaBg: '#F5ECBD',
  radius: '0px',
  fontHeading: 'DM Sans',
  fontBody: 'Manrope',
} as const;
```

`CustomStyles.astro` reads from this file at build time. When you change `brand.ts`, every downstream token updates automatically.

### 10.3 Automated WCAG contrast checker *(short-term)*

A Vite plugin or Astro integration that runs during `npm run build`:
1. Reads `--aw-color-accent` and `--aw-color-btn-primary-text`
2. Computes contrast ratio
3. Warns if it fails WCAG AA (4.5:1 for normal text, 3:1 for large text)

Prevents accidentally shipping inaccessible color combinations on new sites.

### 10.4 Pattern library page (`/debug/patterns`) *(short-term)*

An Astro page that renders one instance of every P-01…P-16 pattern with the site's live brand tokens. QA of a new site is a single URL — open it and visually confirm every pattern looks correct.

Disable in production via a config flag or by checking `import.meta.env.DEV`.

### 10.5 OG image generation *(medium-term)*

Use `@vercel/og` (Satori) with the brand tokens to auto-generate per-page Open Graph images:
- Heading + logo + accent color background
- No manual image export needed per page
- A Vercel Edge Function at `/api/og?title=...&path=...`

### 10.6 Shared Sanity schema package *(medium-term)*

Extract `studio/schemas/` into a private npm package `@agency/sanity-schemas`. All client sites install the same package. Schema improvements (new block types, bug fixes) propagate to all sites with a single `npm update`.

```
packages/
  @agency/sanity-schemas/   ← shared schemas
apps/
  rc-roofing/               ← client site
  acme-hvac/                ← next client site
```

### 10.7 Multi-tenant Cloudflare Worker (forms) — already done

The `services/forms` Worker is already multi-tenant. To add a new client:

1. Add a new route in the Worker config keyed by `site_slug`
2. Set the recipient email and Resend from-address for that slug
3. Run the per-site `turnstile:create` command; never reuse another client's key pair
4. Deploy the Worker (`wrangler deploy`)
5. Set `PUBLIC_FORM_ENDPOINT` + `PUBLIC_TURNSTILE_SITE_KEY` + `PUBLIC_SITE_SLUG` in the new site's env

No new Worker is needed per client. The Worker derives the secret binding from the slug (`acme-hvac` → `TURNSTILE_SECRET_ACME_HVAC`) and verifies the token action and hostname before accepting a lead.

### 10.8 Monorepo (Turborepo) *(long-term, 5+ sites)*

When managing five or more client sites, move to a Turborepo:

```
turbo.json
packages/
  ui/                  ← shared Astro components
  sanity-schemas/      ← shared Sanity schemas
  tailwind-config/     ← shared Tailwind base config
  forms-worker/        ← Cloudflare Worker source
apps/
  rc-roofing/          ← existing site
  acme-hvac/           ← new site
  blue-ridge-law/      ← another new site
```

Benefits:
- One PR to update a shared component propagates to all sites
- Turborepo's task graph caches builds — only changed apps rebuild
- Consistent patterns enforced via the shared `ui` package

### 10.9 Review aggregator as a standalone service *(medium-term)*

The Google Places + Yelp review system is already abstracted in `src/lib/reviews/`. Extract it to a standalone Cloudflare Worker or a Vercel serverless function that:
- Accepts `?placeId=...&yelpId=...`
- Returns cached review data (TTL configurable)
- All client sites call the same endpoint

This removes review API credentials from every client's environment.

---

## Quick Reference — Files Changed Per Client

| File | What changes |
|---|---|
| `src/config.yaml` | Site name, URL, GTM ID, SEO metadata |
| `src/components/CustomStyles.astro` | All color tokens, radius, font variables |
| `astro.config.ts` | Font families (Google Fonts) |
| `src/config/motif.ts` | Pattern SVG, section toggles, fade/tile settings |
| `src/assets/images/logo.webp` | Client logo |
| `public/favicon*` | All favicon variants |
| `src/config/schema/business.ts` | Business entity (name, address, phone, credentials) |
| `src/config/schema/pages.ts` | Per-page schema entries (routes, FAQ, breadcrumbs) |
| `src/config/cta.ts` | CTA button label and footnote |
| `src/navigation.ts` / `src/data/navigation.ts` | Nav links, phone number, footer |
| `.env` | All service credentials (Sanity, GTM, Turnstile, Reviews) |
| `studio/.env` | Sanity Studio project ID + hostname |
| `vercel.json` (redirects section) | Legacy URL redirects for this client |

---

## 11. Component Variant System

Every repeating component in this codebase supports named visual variants. Changing a site's look means picking different variants — not rewriting components. The variant system has three layers:

```
src/config/theme.ts          ← site-level defaults (which variant per context)
      ↓
CardVariant prop on InfoCard / ServiceCard / CardWrapper
      ↓
CSS utility classes in tailwind.css (bg-card-*, border-card-*, text-card-*)
      ↓
CSS variable tokens in CustomStyles.astro (--aw-color-bg-card-*)
```

### 11.1 The four card variants

| Variant | Background | Border | Text | Best on |
|---|---|---|---|---|
| `dark` | `bg-[#222]` charcoal | Accent/60 | White | Grey sections — bold contrast |
| `light` | Yellow-tint 50% | None | Dark `#222` | White sections — warm/soft |
| `outlined` | White | Subtle black/12% | Dark `#222` | White/grey — clean, modern |
| `glass` | White/8% + blur | White/15% | White | Dark sections — frosted editorial |

### 11.2 `src/config/theme.ts` — the site-level defaults

Every component reads its default from this one file. Change it once; all pages that reference the theme update automatically.

```ts
import { THEME } from '~/config/theme';

// On a grey section, use the site's default grey-section card style
<InfoCard variant={THEME.card.onGrey} ... />   // 'dark' for R&C

// On a white section
<ServiceCard variant={THEME.card.onWhite} ... /> // 'light' for R&C

// On a dark section
<InfoCard variant={THEME.card.onDark} ... />    // 'dark' for R&C
```

For a clean/modern site: set `card.onGrey = 'outlined'` and `card.onWhite = 'outlined'` — every card grid shifts to white cards without touching a single page file.

### 11.3 Pre-configured widget bundles

`THEME.widgets` contains ready-to-spread prop bundles for the most common section shapes. Use them to avoid repeating the same `isDark` + `cardClass` combination across pages:

```astro
---
import { THEME } from '~/config/theme';
import Testimonials from '~/components/widgets/Testimonials.astro';
---

<!-- Instead of: isDark={true} cardClass="border border-accent/60 bg-[#222]" classes={{...}} -->
<Testimonials
  {...THEME.widgets.testimonialsOnGrey}
  title="What Our Clients Say"
  testimonials={[...]}
>
  <Fragment slot="bg"><SectionBg variant="grey" /></Fragment>
</Testimonials>
```

If you need to override one prop for a specific section, spread the bundle first then override:

```astro
<Features2
  {...THEME.widgets.featuresOnGrey}
  columns={4}         <!-- override just this prop -->
  items={[...]}
/>
```

### 11.4 How to add a new card variant

**Step 1 — Add CSS tokens to `CustomStyles.astro`:**

```css
/* In the :root block */
--aw-color-bg-card-frosted: rgb(200 220 255 / 12%);
--aw-color-card-border-frosted: rgb(100 150 255 / 30%);
--aw-color-card-heading-frosted: rgb(255 255 255);
--aw-color-card-body-frosted: rgb(255 255 255 / 70%);
--aw-color-card-link-frosted: rgb(147 197 253);
```

**Step 2 — Add Tailwind utilities to `tailwind.css`:**

```css
@utility bg-card-frosted {
  background-color: var(--aw-color-bg-card-frosted);
  backdrop-filter: blur(8px);
}
@utility border-card-frosted { border-color: var(--aw-color-card-border-frosted); }
@utility text-card-heading-frosted { color: var(--aw-color-card-heading-frosted); }
@utility text-card-body-frosted { color: var(--aw-color-card-body-frosted); }
@utility text-card-link-frosted { color: var(--aw-color-card-link-frosted); }
```

**Step 3 — Extend the `CardVariant` type in `theme.ts`:**

```ts
export type CardVariant = 'dark' | 'light' | 'outlined' | 'glass' | 'frosted';
```

**Step 4 — Add the variant to `CardWrapper.astro`, `InfoCard.astro`, `ServiceCard.astro`:**

```ts
// In each component's variant maps:
const variantClasses: Record<CardVariant, string> = {
  dark: 'bg-card-dark',
  light: 'bg-card-light',
  outlined: 'bg-card-outlined',
  glass: 'bg-card-glass',
  frosted: 'bg-card-frosted',  // ← add
};
```

**Step 5 — Use it in `theme.ts`:**

```ts
card: {
  onDark: 'frosted' as CardVariant,   // frosted cards on dark sections
}
```

That's it. Every page that reads `THEME.card.onDark` now uses the frosted variant — no page files touched.

### 11.5 Standalone component rules

To keep components interchangeable across sites:

1. **Every component declares its own props interface** — no prop is imported from another component's types
2. **Variants map to CSS utility classes, not hardcoded colors** — colors live in `CustomStyles.astro`, not in the component
3. **Defaults come from `THEME`, not from hardcoded strings** — components import `THEME` for their default prop value, never `'dark'` as a literal
4. **A component must not know its section context** — sections and pages decide which variant to pass; the component only renders it
5. **Every component accepts a `class` prop** for one-off overrides without forking the component

### 11.6 Component inventory and variant support

| Component | Variants | Notes |
|---|---|---|
| `CardWrapper` | dark, light, outlined, glass | Base for all card types |
| `InfoCard` | dark, light, outlined, glass | Heading + description + optional icon |
| `ServiceCard` | dark, light, outlined, glass | Heading + description + bottom link |
| `Button` | primary, secondary, ghost-light, ghost-dark, link | Defined in tailwind.css |
| `Hero2` | split, overlay | `variant` prop on the component |
| `SectionBg` | hero, grey, dark, white | Controls section fill + motif |
| `Features2` | isDark + cardClass override | Use `THEME.widgets.featuresOnGrey` bundle |
| `Testimonials` | isDark + cardClass + classes override | Use `THEME.widgets.testimonialsOnGrey` bundle |
| `FAQs` | isDark | `isDark={true}` for dark section |
| `CTABanner` | (always yellow CTA style) | Colors from `--aw-color-bg-cta` token |
