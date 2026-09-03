/**
 * Seed Contact and Reviews page singletons into Sanity.
 *
 * Usage:
 *   npm run migrate:contact-reviews
 *
 * Requires SANITY_PROJECT_ID, SANITY_DATASET, SANITY_WRITE_TOKEN in .env
 */

import { createClient } from '@sanity/client';
import { contactHelpOptions } from '../src/data/pages/contact.ts';

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
    const label = record.title ?? record.label ?? record.text ?? record.name ?? index;
    return {
      ...item,
      _type: type,
      _key: slugKey(type, String(label), index),
    };
  });
}

async function run() {
  console.log(`\nMigrating contact + reviews pages to ${projectId} / ${dataset}\n`);

  await client.createOrReplace({
    _id: 'singleton-contact',
    _type: 'contactPage',
    meta: {
      title: 'Contact R&C Roofing Contractors | Honolulu, HI',
      description:
        'Contact R&C Roofing Contractors in Honolulu for roof inspections, repairs, replacements, storm damage, commercial roofing, gutters, and other roofing needs.',
    },
    hero: {
      _type: 'pageHero',
      title: 'Contact R&C Roofing Contractors',
      visualSubheading: 'Tell Us What Is Happening With Your Roof',
      subtitle:
        'Have a roof leak, storm damage, an aging roof, or another roofing question?\n\nTell us what you are seeing and how we can reach you. You do not need to know which roofing service you need before contacting R&C. We can start with the condition of the roof and determine what should be considered next.',
      ctaText: 'Call (808) 888-2524',
      ctaHref: 'tel:+18088882524',
      imagePlaceholder: 'Contact page photo placeholder',
    },
    form: {
      heading: 'Send Us a Message',
      intro:
        'Tell us a little about your property and what is happening with the roof. A member of the R&C team can follow up using the contact information you provide.',
      topicLabel: 'What Can We Help You With? *',
      topicPlaceholder: 'Select a topic',
      helpOptions: withKeys('formHelpOption', contactHelpOptions),
      messageLabel: 'Tell Us What Is Happening',
      submitLabel: 'Send Message',
      mapHeading: 'Find R&C Roofing Contractors',
      addressLine1: '3302 Campbell Ave',
      addressLine2: 'Honolulu, HI 96815',
      mapsQuery: '3302 Campbell Ave, Honolulu, HI 96815',
      directionsLabel: 'Get Directions',
    },
    touchpoints: {
      heading: 'Get in Touch',
      items: withKeys('infoCardItem', [
        {
          title: 'Call Us',
          description: '(808) 888-2524. Alternate phone: (808) 216-3256.',
          icon: 'tabler:phone',
        },
        {
          title: 'Email Us',
          description: 'info@safehomeservice.com',
          icon: 'tabler:mail',
        },
        {
          title: 'Visit Us',
          description: 'R&C Roofing Contractors, 3302 Campbell Ave, Honolulu, HI 96815.',
          icon: 'tabler:map-pin',
        },
        {
          title: 'Business Hours',
          description: 'Monday to Friday: 8:00 a.m. to 4:30 p.m. Saturday: Closed. Sunday: Closed.',
          icon: 'tabler:clock',
        },
      ]),
      links: withKeys('contactLink', [
        { text: '(808) 888-2524', href: 'tel:+18088882524' },
        { text: '(808) 216-3256', href: 'tel:+18082163256' },
        { text: 'info@safehomeservice.com', href: 'mailto:info@safehomeservice.com' },
      ]),
    },
    unsureSection: {
      _type: 'splitContentSection',
      heading: 'Not Sure Which Roofing Service You Need?',
      paragraphs: [
        'That is okay.',
        'A roof problem does not automatically tell you what the solution should be. A leak may call for a localized repair, while broader deterioration may require a different approach. In some cases, the roof may need to be monitored rather than immediately repaired or replaced.',
        'Start by telling R&C what you are seeing.',
      ],
      ctaText: 'Schedule a Roof Inspection',
      ctaHref: '#message',
      linkText: 'Explore Roof Inspections',
      linkHref: '/roof-inspections',
      imagePlaceholder: 'Roof inspection photo placeholder',
    },
    reasons: {
      _type: 'linkedCardsSection',
      heading: 'Common Reasons People Contact R&C',
      display: 'cards',
      items: withKeys('linkedCard', [
        {
          title: 'My Roof Is Leaking',
          description: 'Water coming through the ceiling or showing up after rain? Start by finding the source of the leak.',
          href: '/roof-problems/my-roof-is-leaking',
          linkText: 'My Roof Is Leaking',
        },
        {
          title: 'My Roof Was Damaged by a Storm',
          description:
            'If the problem appeared after strong wind or severe weather, the roof may need to be evaluated for storm-related damage.',
          href: '/roof-problems/storm-damage-on-my-roof',
          linkText: 'Storm Damage on My Roof',
        },
        {
          title: 'I Am Trying to Decide Whether to Repair or Replace',
          description:
            'The decision should be based on the condition and extent of the roofing problem rather than age alone.',
          href: '/roof-problems/my-roof-is-at-end-of-life',
          linkText: 'My Roof Is at End of Life',
        },
        {
          title: 'I Need a Roof Inspection',
          description:
            "R&C provides roof inspections for roofing concerns, property transactions, storm damage, and other situations where you need a clearer understanding of the roof's condition.",
          href: '/roof-inspections',
          linkText: 'Roof Inspections',
        },
      ]),
    },
    ctaBanner: {
      _type: 'ctaBanner',
      title: 'Contact R&C Roofing Contractors',
      subtitle: 'R&C Roofing Contractors can evaluate the roof and help determine what roofing work should be considered next.',
      ctaText: 'Call R&C Roofing',
      ctaHref: 'tel:+18088882524',
      extraLines: [
        'Alternate Phone: (808) 216-3256',
        'Email: info@safehomeservice.com',
        'Monday to Friday: 8:00 a.m. to 4:30 p.m.',
        'Saturday to Sunday: Closed',
      ],
      license: 'Hawaii Contractor License C-33642',
    },
  });

  console.log('  saved /contact');

  await client.createOrReplace({
    _id: 'singleton-reviews',
    _type: 'reviewsPage',
    meta: {
      title: 'R&C Roofing Contractors Reviews | Honolulu, HI',
      description:
        'Read customer reviews of R&C Roofing Contractors from Google, Yelp, and BBB and see what Oahu property owners say about their roofing experience.',
    },
    hero: {
      _type: 'pageHero',
      title: 'R&C Roofing Contractors Reviews',
      visualSubheading: 'What Customers Say About Working With R&C',
      subtitle:
        'Choosing a roofing contractor usually means trusting someone with a part of your property you cannot easily evaluate on your own.\n\nThat is why customer experience matters.\n\nRead feedback from people who have worked with R&C Roofing Contractors on roof repairs, replacements, storm-related roofing concerns, and other roofing projects on Oahu.',
      imagePlaceholder: 'Customer and project photo placeholder',
    },
    liveReviews: {
      heading: 'Featured Customer Reviews',
      intro: 'Recent Google and Yelp reviews from customers who have worked with R&C Roofing Contractors.',
    },
    platforms: {
      heading: 'Reviews From Across the Web',
      intro: 'Customer feedback about R&C Roofing Contractors can be found on multiple independent review platforms.',
      items: withKeys('reviewPlatformItem', [
        {
          title: 'Google',
          ratingNote: 'Current Google rating and review count are shown on the live profile.',
          href: 'https://www.google.com/search?q=R%26C+Roofing+Contractors+Honolulu',
          linkText: 'Read Reviews on Google',
          icon: 'tabler:brand-google',
        },
        {
          title: 'Yelp',
          ratingNote: 'Current Yelp rating and review count are shown on the live profile.',
          href: 'https://www.yelp.com/biz/r-and-c-roofing-contractors-honolulu',
          linkText: 'Read Reviews on Yelp',
          icon: 'tabler:star',
        },
        {
          title: 'BBB',
          ratingNote: 'Current BBB profile and rating information are shown on the live listing.',
          href: 'https://www.bbb.org/us/hi/honolulu/profile/roofing-contractors/rc-enterprises-llc-1296-53047152',
          linkText: 'View R&C on BBB',
          icon: 'tabler:shield-check',
        },
      ]),
    },
    gallerySection: {
      _type: 'splitContentSection',
      heading: 'See the Roofing Work Behind the Reviews',
      paragraphs: [
        'Customer feedback tells one part of the story. The finished work tells another.',
        'Explore completed R&C roofing projects across Oahu, including before-and-after photos, project locations, roofing materials, and the work completed.',
      ],
      ctaText: 'View Project Gallery',
      ctaHref: '/about/gallery',
      imagePlaceholder: 'Gallery preview',
    },
    ctaBanner: {
      _type: 'ctaBanner',
      title: 'Have a Roofing Question of Your Own?',
      subtitle:
        'If something is happening with your roof, you do not need to know the solution before you call.<br /><br />R&C can evaluate the roof and help determine what roofing work should be considered next.',
      ctaText: 'Schedule a Roof Inspection',
      ctaHref: '/contact',
      license: 'Hawaii Contractor License C-33642',
    },
  });

  console.log('  saved /reviews');
  console.log('\nContact and reviews pages migrated.\n');
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
