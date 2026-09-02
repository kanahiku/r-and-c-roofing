/**
 * Seed service hub + subpages into Sanity.
 *
 * Usage:
 *   npm run migrate:services
 *   npm run migrate:services -- roof-problems
 *
 * Requires SANITY_PROJECT_ID, SANITY_DATASET, SANITY_WRITE_TOKEN in .env
 */

import { createClient } from '@sanity/client';
import { servicePages, type ServicePageSeed } from '../src/data/pages/servicePages.ts';
import { materialPages } from '../src/data/pages/materialPages.ts';
import { claimPages } from '../src/data/pages/claimPages.ts';
import { aboutPages } from '../src/data/pages/aboutPages.ts';
import { whoWeServePages } from '../src/data/pages/whoWeServePages.ts';
import { inspectionPages } from '../src/data/pages/inspectionPages.ts';
import { roofProblemPages } from '../src/data/pages/roofProblemPages.ts';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Missing SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in environment.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

function slugKey(prefix: string, label: string, index: number) {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
  return `${prefix}-${index}-${slug || 'item'}`;
}

function withKeys<T extends object>(type: string, items: T[]) {
  return items.map((item, index) => {
    const record = item as Record<string, unknown>;
    const label = record.title ?? record.question ?? record.feature ?? record.name ?? index;
    return {
      ...item,
      _type: type,
      _key: slugKey(type, String(label), index),
    };
  });
}

function toSanityDoc(page: ServicePageSeed) {
  return {
    _id: page._id,
    _type: 'servicePage',
    title: page.title,
    slug: { _type: 'slug', current: page.slug },
    meta: page.meta,
    hero: {
      _type: 'pageHero',
      title: page.hero.title,
      subtitle: page.hero.subtitle,
      ctaText: page.hero.ctaText,
      ctaHref: page.hero.ctaHref,
      phoneCtaText: page.hero.phoneCtaText,
      phoneCtaHref: page.hero.phoneCtaHref,
      imagePlaceholder: page.hero.imagePlaceholder,
    },
    sections: page.sections.map((section, index) => {
      const heading = section._type === 'editorialSection' || 'heading' in section ? section.heading : 'section';
      const base = { ...section, _key: slugKey(section._type, heading, index) };

      if (section._type === 'iconPointsSection' || section._type === 'infoCardsSection') {
        return { ...base, items: withKeys('infoCardItem', section.items) };
      }
      if (section._type === 'linkedCardsSection') {
        return { ...base, items: withKeys('linkedCard', section.items) };
      }
      if (section._type === 'timelineSection') {
        return { ...base, steps: withKeys('timelineStep', section.steps) };
      }
      if (section._type === 'comparisonTableSection') {
        return { ...base, rows: withKeys('comparisonRow', section.rows) };
      }
      if (section._type === 'bulletCardsSection') {
        return { ...base, items: withKeys('bulletCardItem', section.items) };
      }
      if (section._type === 'checklistSection') {
        return {
          ...base,
          items: section.items.map((text, itemIndex) => ({
            _type: 'checklistItem',
            _key: slugKey('checklistItem', text, itemIndex),
            text,
          })),
        };
      }
      if (section._type === 'yelpReviewsSection') {
        return { ...base, items: withKeys('yelpReviewItem', section.items ?? []) };
      }
      if (section._type === 'quoteCardsSection') {
        return { ...base, items: withKeys('quoteCardItem', section.items) };
      }
      return base;
    }),
    faqs: page.faqs
      ? {
          _type: 'faqsSection',
          title: page.faqs.title,
          items: withKeys('faqItem', page.faqs.items),
        }
      : undefined,
    ctaBanner: {
      _type: 'ctaBanner',
      ...page.ctaBanner,
    },
  };
}

async function run() {
  const allPages = [
    ...servicePages,
    ...materialPages,
    ...claimPages,
    ...aboutPages,
    ...whoWeServePages,
    ...inspectionPages,
    ...roofProblemPages,
  ];
  const slugPrefix = process.argv[2];
  const pages = slugPrefix ? allPages.filter((page) => page.slug.startsWith(slugPrefix)) : allPages;

  if (!pages.length) {
    console.error(`No CMS pages matched slug prefix "${slugPrefix}".`);
    process.exit(1);
  }

  console.log(`\nMigrating ${pages.length} CMS pages to ${projectId} / ${dataset}\n`);

  for (const page of pages) {
    await client.createOrReplace(toSanityDoc(page));
    console.log(`  saved /${page.slug}`);
  }

  console.log('\nCMS pages migrated.\n');
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
