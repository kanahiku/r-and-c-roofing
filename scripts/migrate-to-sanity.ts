/**
 * migrate-to-sanity.ts
 *
 * One-time script: reads local data files and pushes content into Sanity.
 * Run ONCE per client, after pages are approved, to seed the Sanity dataset.
 *
 * Usage:
 *   npx tsx scripts/migrate-to-sanity.ts
 *
 * Requirements:
 *   SANITY_PROJECT_ID=xxxxxxxx
 *   SANITY_DATASET=production
 *   SANITY_WRITE_TOKEN=sk...    ← needs "Editor" role (write access)
 */

import { createClient } from '@sanity/client';

// Load env vars from .env (if using dotenv)
// import 'dotenv/config';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('❌  Missing SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in environment.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

// ── Local data ────────────────────────────────────────────────────────────────
// Adjust these imports if you move or rename your data files.
// Using dynamic import so the script can run as plain Node ESM.

async function run() {
  console.log(`\n🚀  Migrating to Sanity project: ${projectId} / dataset: ${dataset}\n`);

  // ── Homepage ─────────────────────────────────────────────────────────────
  const { homePageData } = await import('../src/data/pages/home.js');
  const home = homePageData;

  await client.createOrReplace({
    _id: 'singleton-home',
    _type: 'homePage',

    meta: home.meta,

    hero: {
      titleLine1: home.hero.titleLine1,
      titleLine2: home.hero.titleLine2,
      subtitleParagraph1: home.hero.subtitleParagraph1,
      ctaText: home.hero.ctaText,
      ctaHref: home.hero.ctaHref,
      phoneCtaText: home.hero.phoneCtaText,
      phoneCtaHref: home.hero.phoneCtaHref,
      heroImageUrl: home.hero.heroImage.src,
    },

    statsBar: home.statsBar,

    whyInspect: {
      heading: home.whyInspect.heading,
      paragraph1: home.whyInspect.paragraph1,
      paragraph2: home.whyInspect.paragraph2,
      ctaText: home.whyInspect.ctaText,
      ctaHref: home.whyInspect.ctaHref,
      imageUrl: home.whyInspect.image.src,
      imageAlt: home.whyInspect.image.alt,
    },

    servicesSection: {
      title: home.servicesSection.title,
      subtitle: home.servicesSection.subtitle,
      services: home.servicesSection.services,
    },

    oahuConditions: {
      title: home.oahuConditions.title,
      paragraph1: home.oahuConditions.paragraph1,
      cards: home.oahuConditions.cards,
      ctaText: home.oahuConditions.ctaText,
      ctaHref: home.oahuConditions.ctaHref,
    },

    roofDamageProcess: {
      heading: home.roofDamageProcess.heading,
      disclaimer: home.roofDamageProcess.disclaimer,
      steps: home.roofDamageProcess.steps,
    },

    faqs: {
      title: home.faqs.title,
      items: home.faqs.items,
    },

    ctaBanner: home.ctaBanner,
  });

  console.log('✅  Home page migrated.');

  // ── Navigation ────────────────────────────────────────────────────────────
  const { navigationData } = await import('../src/data/navigation.js');
  const nav = navigationData;

  await client.createOrReplace({
    _id: 'singleton-navigation',
    _type: 'siteNavigation',
    links: nav.header.links.map((link) => ({
      _type: 'navLink',
      _key: link.text.toLowerCase().replace(/\s+/g, '-'),
      text: link.text,
      href: link.href ?? '',
      subLinks: (link.links ?? []).map((sub) => ({
        _type: 'navSubLink',
        _key: sub.text.toLowerCase().replace(/\s+/g, '-'),
        text: sub.text,
        href: sub.href,
      })),
      columns: (link.columns ?? []).map((col) => ({
        _type: 'navColumn',
        _key: col.title.toLowerCase().replace(/\s+/g, '-'),
        title: col.title,
        links: col.links.map((sub) => ({
          _type: 'navSubLink',
          _key: sub.text.toLowerCase().replace(/\s+/g, '-'),
          text: sub.text,
          href: sub.href,
        })),
      })),
    })),
    actions: nav.header.actions,
    phone: nav.header.phone,
  });

  console.log('✅  Navigation migrated.');

  // ── Footer ────────────────────────────────────────────────────────────────
  await client.createOrReplace({
    _id: 'singleton-footer',
    _type: 'siteFooter',
    columns: nav.footer.links.map((col) => ({
      _type: 'footerColumn',
      _key: col.title.toLowerCase().replace(/\s+/g, '-'),
      title: col.title,
      links: col.links.map((l) => ({
        _type: 'footerLink',
        _key: l.text.toLowerCase().replace(/\s+/g, '-'),
        text: l.text,
        href: l.href,
      })),
    })),
    secondaryLinks: nav.footer.secondaryLinks.map((l) => ({
      _type: 'footerLink',
      _key: l.text.toLowerCase().replace(/\s+/g, '-'),
      text: l.text,
      href: l.href,
    })),
    socialLinks: nav.footer.socialLinks.map((s) => ({
      _type: 'socialLink',
      _key: s.ariaLabel.toLowerCase(),
      ariaLabel: s.ariaLabel,
      icon: s.icon,
      href: s.href,
    })),
    footNote: nav.footer.footNote,
  });

  console.log('✅  Footer migrated.');
  console.log('\n🎉  All content migrated to Sanity.\n');
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
