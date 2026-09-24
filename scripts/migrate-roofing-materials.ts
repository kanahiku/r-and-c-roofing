/**
 * Create the ordered roofing-material catalog and switch material-page listings
 * to the automatic catalog-backed section.
 *
 * Usage: npm run migrate:roofing-materials
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

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

const materials = [
  {
    _key: 'asphalt-shingle',
    pageId: 'service-page-asphalt-shingle',
    navTitle: 'Asphalt Shingle Roofing',
    title: 'Asphalt Shingle Roofing',
    description:
      'A traditional, cost-effective choice offering a broad variety of styles, colors, and budget options for sloped residential roofs.',
    linkText: 'Explore Asphalt Shingle Roofing',
    comparisonLabel: 'Asphalt Shingles',
    comparisonCell1: 'Homes looking for a familiar, cost-effective residential roofing solution.',
    comparisonCell2: 'Traditional shingle profile with wide style choices.',
    comparisonCell3: 'Product selection, roof slope, local wind exposure, and budget.',
  },
  {
    _key: 'silicone-roof-coating',
    pageId: 'service-page-silicone-roof-coating',
    navTitle: 'Silicone Roof Coating',
    title: 'Silicone Roof Coating',
    description:
      'High-solids, seamless elastomeric membranes engineered to waterproof, reflect UV rays, and extend the lifespan of commercial flat and low-slope roofs.',
    linkText: 'Explore Silicone Roof Coating',
    comparisonLabel: 'Silicone Coating',
    comparisonCell1:
      'Commercial and multi-unit properties wanting a seamless, reflective waterproof restoration barrier over flat or low-slope decks.',
    comparisonCell2: 'Monolithic, smooth UV-reflective surface finish.',
    comparisonCell3: 'Existing membrane adhesion, substrate moisture levels, and flashing compatibility.',
  },
  {
    _key: 'modified-bitumen',
    pageId: 'service-page-modified-bitumen-roofing',
    navTitle: 'Modified Bitumen Roofing',
    title: 'Modified Bitumen Roofing',
    description:
      'Durable, multi-ply asphalt and rubberized membrane systems engineered for heavy foot traffic and traditional commercial low-slope applications.',
    linkText: 'Explore Modified Bitumen Roofing',
    comparisonLabel: 'Modified Bitumen',
    comparisonCell1:
      'Commercial buildings and multi-unit properties requiring a heavy-duty, multi-ply low-slope membrane.',
    comparisonCell2: 'Multi-ply asphalt cap sheet or granular surfaced membrane.',
    comparisonCell3: 'Deck preparation, ply bonding, drainage slope, and system specifications.',
  },
  {
    _key: 'metal',
    pageId: 'service-page-metal-roofing',
    navTitle: 'Metal Roofing',
    title: 'Metal Roofing',
    description:
      'Clean architectural lines and long-term durability designed for modern properties, with careful engineering for coastal salt exposure.',
    linkText: 'Explore Metal Roofing',
    comparisonLabel: 'Metal Roofing',
    comparisonCell1: 'Properties wanting a durable, modern metal system for replacement or new construction.',
    comparisonCell2: 'Available in different profiles and modern finishes.',
    comparisonCell3: 'Roof design, finish quality, coastal salt-air exposure, and system specs.',
  },
  {
    _key: 'tile',
    pageId: 'service-page-tile-roofing',
    navTitle: 'Tile Roofing (Clay & Concrete)',
    title: 'Tile Roofing',
    description:
      "Distinctive island styling that creates a classic architectural look, requiring careful review of your home's structural load capacity.",
    linkText: 'Explore Tile Roofing',
    comparisonLabel: 'Clay & Concrete Tile',
    comparisonCell1: 'Homes and buildings structurally suited for a heavy-weight tile system.',
    comparisonCell2: 'Distinctive, traditional tile architectural profile.',
    comparisonCell3: 'Structural weight capacity, roof pitch, and specialized installation requirements.',
  },
  {
    _key: 'stone-coated-steel',
    pageId: 'service-page-stone-coated-steel',
    navTitle: 'Stone-Coated Steel Roofing',
    title: 'Stone-Coated Steel Roofing',
    description:
      'Combines heavy-duty steel strength with the textured, traditional appearance of shake or tile profiles.',
    linkText: 'Explore Stone-Coated Steel Roofing',
    comparisonLabel: 'Stone-Coated Steel',
    comparisonCell1: 'Property owners wanting steel strength with a textured residential look.',
    comparisonCell2: 'Profiles resembling tile, shake, or traditional shingles.',
    comparisonCell3: 'System selection, roof design, structural load, and project requirements.',
  },
  {
    _key: 'slate',
    pageId: 'service-page-slate-roofing',
    navTitle: 'Slate & Rubber Slate Roofing',
    title: 'Slate & Rubber Slate Roofing',
    description: 'Premium natural stone or lightweight synthetic slate delivering luxury architectural aesthetics.',
    linkText: 'Explore Slate Roofing',
    comparisonLabel: 'Slate & Rubber Slate',
    comparisonCell1: 'Properties seeking high-end luxury natural stone or synthetic slate roofing aesthetics.',
    comparisonCell2: 'Distinctive, elegant natural slate or molded synthetic slate profile.',
    comparisonCell3: 'Structural load capacity for natural slate, slope requirements, and specialized fastening.',
  },
];

type SanitySection = {
  _key?: string;
  _type?: string;
  heading?: string;
  intro?: string;
  display?: string;
  [key: string]: unknown;
};

type MaterialPage = {
  _id: string;
  sections?: SanitySection[];
};

function isMaterialListing(section: SanitySection) {
  const heading = section.heading?.trim().toLowerCase();
  return (
    section._type === 'roofingMaterialsSection' ||
    (section._type === 'linkedCardsSection' &&
      (heading === 'choose your roofing material' || heading === 'explore other roofing materials'))
  );
}

const pages = await client.fetch<MaterialPage[]>(
  `*[_type == "servicePage" && slug.current match "services/roofing-materials*"]{_id, sections}`
);

let transaction = client.transaction().createOrReplace({
  _id: 'singleton-roofing-materials',
  _type: 'roofingMaterials',
  items: materials.map(({ pageId, ...material }) => ({
    ...material,
    _type: 'roofingMaterial',
    page: { _type: 'reference', _ref: pageId },
  })),
});

for (const page of pages) {
  const sections = (page.sections ?? []).map((section) =>
    isMaterialListing(section)
      ? {
          _key: section._key,
          _type: 'roofingMaterialsSection',
          heading: section.heading,
          intro: section.intro,
          display: section.display ?? 'cards',
        }
      : section
  );
  transaction = transaction.patch(page._id, { set: { sections } });
}

const hubFaqs = await client.fetch<{ _key: string; _type?: string; question?: string; answer?: string }[] | null>(
  `*[_id == "service-page-materials-hub"][0].faqs.items[]{_key, _type, question, answer}`
);

transaction = transaction.patch('service-page-materials-hub', {
  set: {
    'meta.description':
      'Compare roofing materials for Oahu properties: asphalt shingles, silicone coating, modified bitumen, metal, tile and more. Explore your options with R&C Roofing.',
    'faqs.items': (hubFaqs ?? []).map((item) =>
      item.question === 'What roofing materials does R&C install on Oahu?'
        ? {
            ...item,
            _type: 'faqItem',
            answer:
              'We work with a variety of proven residential and commercial systems, including asphalt shingles, silicone roof coatings, modified bitumen, metal roofing, clay and concrete tile, stone-coated steel, and slate.',
          }
        : item
    ),
  },
});

const result = await transaction.commit();
console.log(`Published roofing material catalog and updated ${pages.length} material pages (${result.transactionId}).`);
