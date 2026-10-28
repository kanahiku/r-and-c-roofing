/**
 * Seed the Service Areas page singleton into Sanity.
 *
 * Usage:
 *   npm run migrate:service-areas
 *
 * Requires SANITY_PROJECT_ID, SANITY_DATASET, SANITY_WRITE_TOKEN in .env
 */

import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET ?? 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error('Missing SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in environment.');
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false, token });

function keyed<T extends object>(type: string, items: T[]) {
  return items.map((item, index) => ({ ...item, _type: type, _key: `${type}-${index}` }));
}

async function run() {
  console.log(`\nMigrating service areas page to ${projectId} / ${dataset}\n`);

  await client.createOrReplace({
    _id: 'singleton-service-areas',
    _type: 'serviceAreasPage',
    meta: {
      title: 'Roofing Contractors in Honolulu, HI | R&C Roofing',
      description:
        'Honolulu roofing contractor serving homes and businesses across Oahu. Contact R&C Roofing for a free roof inspection and estimate.',
    },
    hero: {
      _type: 'pageHero',
      title: 'Roofing Contractors in Honolulu, HI',
      subtitle:
        "R&C Roofing Contractors is based in Honolulu, providing residential and commercial roofing services throughout Oahu.\n\nWhether you're dealing with a roof leak, storm damage, or an aging roof, we evaluate your roof's condition before recommending repairs or replacement.\n\nWe offer free roof inspections and estimates. Written inspection reports are available for a fee, quoted before work begins.",
      ctaText: 'Schedule a Free Roof Inspection',
      ctaHref: '/contact',
      phoneCtaText: 'Call (808) 888-2524',
      phoneCtaHref: 'tel:+18088882524',
      imageUrl:
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Home with a well-maintained roof in Honolulu, Oahu',
      imagePlaceholder: 'Service areas photo placeholder',
    },
    location: {
      heading: 'Our Honolulu Location',
      intro:
        'Our office is located at 3302 Campbell Avenue in Honolulu. From this location, we serve homeowners, businesses, and property managers across Oahu.',
      businessName: 'R&C Roofing Contractors',
      addressLine1: '3302 Campbell Ave',
      addressLine2: 'Honolulu, HI 96815',
      phoneText: '(808) 888-2524',
      phoneHref: 'tel:+18088882524',
      email: 'info@safehomeservice.com',
      hours: ['Monday to Friday: 8:00 a.m. to 4:30 p.m.', 'Saturday and Sunday: Closed'],
      mapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6878.971672991711!2d-157.81332749999999!3d21.277811099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c00727f626aff7d%3A0xa6521a02b20cd44a!2sR%20%26%20C%20Roofing%20Contractors!5e1!3m2!1sen!2sph!4v1793137016380!5m2!1sen!2sph',
      mapsQuery: '3302 Campbell Ave, Honolulu, HI 96815',
      directionsLabel: 'Get Directions to Our Honolulu Location',
    },
    areas: {
      heading: 'Service Areas: Serving Honolulu and Oahu',
      introParagraphs: [
        'Although we operate from one location in Honolulu, our roofing services are available throughout Oahu.',
        'We serve residential and commercial properties in communities including:',
      ],
      regionLabel: 'Region',
      communitiesLabel: 'Communities Served',
      regions: keyed('serviceAreaRegion', [
        { region: 'Honolulu & South Shore', communities: 'Honolulu, Waikiki, Kaimuki' },
        { region: 'Windward Oahu', communities: 'Kailua, Kaneohe' },
        { region: 'Central Oahu', communities: 'Mililani, Pearl City' },
        { region: 'Leeward Oahu', communities: 'Kapolei, Ewa Beach' },
      ]),
      closingParagraphs: [
        'Our service area extends beyond these listed communities to other parts of Oahu.',
        "Roofing conditions can vary across the island. Coastal exposure can contribute to corrosion, while sun exposure and periods of heavy rain can affect roofing materials and vulnerable roof details. We consider the property's roof system and condition when recommending work.",
        'If your property is located anywhere on Oahu, contact us to discuss your roofing needs.',
      ],
    },
    services: {
      heading: 'Roofing Services Available in Honolulu',
      intro:
        'We provide roofing services for homeowners, commercial property owners, and property managers throughout Honolulu and Oahu. Our services include:',
      items: keyed('linkedCard', [
        {
          title: 'Roof Inspections',
          description:
            'Evaluate roof conditions, identify damage, and determine whether repairs or replacement may be necessary.',
          href: '/roof-inspections',
          linkText: 'Learn More',
        },
        {
          title: 'Roof Repair',
          description: 'Address localized leaks, damaged shingles, flashing failures, and other repairable roofing issues.',
          href: '/services/roof-repair',
          linkText: 'Learn More',
        },
        {
          title: 'Roof Replacement & New Installation',
          description: 'Replace roofing systems when widespread deterioration or damage makes repairs impractical.',
          href: '/services/roof-replacement-and-new-installation',
          linkText: 'Learn More',
        },
        {
          title: 'Residential Roofing',
          description: 'Inspection, repair, and installation services for residential properties.',
          href: '/services/residential-roofing',
          linkText: 'Learn More',
        },
        {
          title: 'Commercial Roofing',
          description: 'Roofing inspections, repairs, replacement, and coatings for commercial and multi-unit buildings.',
          href: '/services/commercial-roofing',
          linkText: 'Learn More',
        },
        {
          title: 'Gutter Installation & Repair',
          description: 'Install, repair, or replace gutters to help manage roof drainage.',
          href: '/services/gutter-installation-and-repair',
          linkText: 'Learn More',
        },
      ]),
      footnoteBefore: 'You can explore these offerings on our',
      footnoteLinkText: 'Roofing Services',
      footnoteLinkHref: '/services',
      footnoteAfter: 'page.',
    },
    ctaBanner: {
      _type: 'ctaBanner',
      title: 'Need Roofing Services in Honolulu?',
      subtitle:
        "If you're concerned about a leak, visible damage, or the condition of an aging roof, we'll help you understand your options.<br />Contact R&C Roofing Contractors to arrange a free roof inspection and estimate for your property in Honolulu or elsewhere on Oahu.",
      ctaText: 'Schedule Your Free Roof Inspection',
      ctaHref: '/contact',
      license: 'Hawaii Contractor License CT-33642',
    },
  });

  console.log('  saved /service-areas\n');
}

run().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
