import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],

  groups: [
    { name: 'meta', title: 'SEO / Meta' },
    { name: 'hero', title: 'Hero' },
    { name: 'statsBar', title: 'Stats Bar' },
    { name: 'whyInspect', title: 'Why Start With Inspection?' },
    { name: 'servicesSection', title: 'Services Section' },
    { name: 'oahuConditions', title: 'Oahu Conditions' },
    { name: 'whyRC', title: 'Why R&C' },
    { name: 'insuranceClaims', title: 'Insurance Claims' },
    { name: 'recentProjects', title: 'Recent Projects' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'serviceAreas', title: 'Service Areas' },
    { name: 'faqs', title: 'FAQs' },
    { name: 'ctaBanner', title: 'CTA Banner' },
  ],

  fields: [
    // ── Meta ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'meta',
      title: 'SEO',
      type: 'object',
      group: 'meta',
      fields: [
        defineField({ name: 'title', title: 'Page Title', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 3, validation: (r) => r.required() }),
      ],
    }),

    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'titleLine1',
          title: 'Heading Line 1',
          type: 'string',
          description: 'e.g. "Hawaii\'s Roof"',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'titleLine2',
          title: 'Heading Line 2',
          type: 'string',
          description: 'e.g. "Inspection Specialists"',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'subtitleParagraph1',
          title: 'Subtitle — Paragraph 1',
          type: 'text',
          rows: 3,
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'subtitleParagraph2',
          title: 'Subtitle — Paragraph 2',
          type: 'text',
          rows: 3,
        }),
        defineField({ name: 'ctaText', title: 'CTA Button Label', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'ctaHref', title: 'CTA Button URL', type: 'string', validation: (r) => r.required() }),
        defineField({
          name: 'heroImage',
          title: 'Hero Image (upload)',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
        defineField({
          name: 'heroImageUrl',
          title: 'Hero Image URL (paste a URL instead of uploading)',
          type: 'url',
          description: 'Used as fallback if no image is uploaded above.',
        }),
      ],
    }),

    // ── Stats Bar ─────────────────────────────────────────────────────────────
    defineField({
      name: 'statsBar',
      title: 'Stats Bar',
      type: 'array',
      group: 'statsBar',
      of: [{ type: 'statItem' }],
      description: 'The 4 stats shown in the dark bar below the hero.',
    }),

    // ── Why Inspect ───────────────────────────────────────────────────────────
    defineField({
      name: 'whyInspect',
      title: 'Why Start With a Roof Inspection?',
      type: 'object',
      group: 'whyInspect',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'paragraph1', title: 'Paragraph 1', type: 'text', rows: 4, validation: (r) => r.required() }),
        defineField({ name: 'paragraph2', title: 'Paragraph 2', type: 'text', rows: 4 }),
        defineField({ name: 'ctaText', title: 'CTA Label', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'ctaHref', title: 'CTA URL', type: 'string', validation: (r) => r.required() }),
        defineField({
          name: 'infoCards',
          title: 'Info Cards',
          type: 'array',
          of: [{ type: 'infoCardItem' }],
        }),
      ],
    }),

    // ── Services Section ──────────────────────────────────────────────────────
    defineField({
      name: 'servicesSection',
      title: 'Services Section',
      type: 'object',
      group: 'servicesSection',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'subtitle', title: 'Section Subtitle', type: 'string' }),
        defineField({
          name: 'services',
          title: 'Services',
          type: 'array',
          of: [{ type: 'serviceItem' }],
          description: 'Add, remove, or reorder services. Each becomes a card.',
        }),
      ],
    }),

    // ── Oahu Conditions ───────────────────────────────────────────────────────
    defineField({
      name: 'oahuConditions',
      title: 'Oahu Roofing Conditions Section',
      type: 'object',
      group: 'oahuConditions',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'paragraph1', title: 'Paragraph 1', type: 'text', rows: 4, validation: (r) => r.required() }),
        defineField({ name: 'paragraph2', title: 'Paragraph 2', type: 'text', rows: 4 }),
        defineField({ name: 'paragraph3', title: 'Paragraph 3', type: 'text', rows: 4 }),
        defineField({ name: 'ctaText', title: 'CTA Label', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'CTA URL', type: 'string' }),
        defineField({
          name: 'image',
          title: 'Section Image (upload)',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
        defineField({
          name: 'imageUrl',
          title: 'Section Image URL (paste a URL instead of uploading)',
          type: 'url',
          description: 'Used as fallback if no image is uploaded above.',
        }),
      ],
    }),

    // ── Why R&C ───────────────────────────────────────────────────────────────
    defineField({
      name: 'whyRC',
      title: 'Why R&C Section',
      type: 'object',
      group: 'whyRC',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', validation: (r) => r.required() }),
        defineField({
          name: 'benefits',
          title: 'Benefit Items',
          type: 'array',
          of: [{ type: 'benefitItem' }],
          description: 'Add, remove, or reorder benefits. Each renders as a bullet with bold title.',
        }),
      ],
    }),

    // ── Insurance Claims ──────────────────────────────────────────────────────
    defineField({
      name: 'insuranceClaims',
      title: 'Insurance Claims Section',
      type: 'object',
      group: 'insuranceClaims',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'ctaText', title: 'CTA Label', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'CTA URL', type: 'string' }),
        defineField({ name: 'paragraph1', title: 'Paragraph 1', type: 'text', rows: 4 }),
        defineField({ name: 'paragraph2', title: 'Paragraph 2', type: 'text', rows: 4 }),
        defineField({
          name: 'image',
          title: 'Section Image (upload)',
          type: 'image',
          options: { hotspot: true },
          fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
        }),
        defineField({
          name: 'imageUrl',
          title: 'Section Image URL (paste a URL instead of uploading)',
          type: 'url',
          description: 'Used as fallback if no image is uploaded above.',
        }),
        defineField({
          name: 'disclaimer',
          title: 'Disclaimer Text',
          type: 'text',
          rows: 3,
          description: 'Legal disclaimer shown below the image.',
        }),
        defineField({
          name: 'timelineSteps',
          title: 'Process Steps',
          type: 'array',
          of: [{ type: 'timelineStep' }],
          description: 'The numbered steps in the claim process timeline.',
        }),
      ],
    }),

    // ── Recent Projects ───────────────────────────────────────────────────────
    defineField({
      name: 'recentProjects',
      title: 'Recent Projects Section',
      type: 'object',
      group: 'recentProjects',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'subtitle', title: 'Section Subtitle', type: 'text', rows: 2 }),
        defineField({
          name: 'projects',
          title: 'Projects',
          type: 'array',
          of: [{ type: 'projectItem' }],
        }),
        defineField({ name: 'ctaText', title: 'CTA Label', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'CTA URL', type: 'string' }),
      ],
    }),

    // ── Testimonials ──────────────────────────────────────────────────────────
    defineField({
      name: 'testimonials',
      title: 'Testimonials Section',
      type: 'object',
      group: 'testimonials',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'subtitle', title: 'Section Subtitle', type: 'text', rows: 2 }),
        defineField({
          name: 'items',
          title: 'Reviews',
          type: 'array',
          of: [{ type: 'testimonialItem' }],
          description: 'Add, remove, or reorder reviews. Each renders as a card.',
        }),
        defineField({ name: 'ctaText', title: 'CTA Label', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'CTA URL', type: 'string' }),
      ],
    }),

    // ── Service Areas ─────────────────────────────────────────────────────────
    defineField({
      name: 'serviceAreas',
      title: 'Service Areas Section',
      type: 'object',
      group: 'serviceAreas',
      fields: [
        defineField({ name: 'heading', title: 'Section Heading', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'subheading', title: 'Section Subheading', type: 'text', rows: 2 }),
        defineField({
          name: 'areas',
          title: 'Service Areas',
          type: 'array',
          of: [{ type: 'serviceArea' }],
          description: 'Each area becomes a card. Add, remove, or reorder freely.',
        }),
        defineField({ name: 'ctaText', title: 'CTA Label', type: 'string' }),
        defineField({ name: 'ctaHref', title: 'CTA URL', type: 'string' }),
      ],
    }),

    // ── FAQs ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'faqs',
      title: 'FAQs Section',
      type: 'object',
      group: 'faqs',
      fields: [
        defineField({ name: 'title', title: 'Section Title', type: 'string', validation: (r) => r.required() }),
        defineField({
          name: 'items',
          title: 'Questions & Answers',
          type: 'array',
          of: [{ type: 'faqItem' }],
          description: 'Add, remove, or reorder FAQ items.',
        }),
      ],
    }),

    // ── CTA Banner ────────────────────────────────────────────────────────────
    defineField({
      name: 'ctaBanner',
      title: 'CTA Banner (Bottom of Page)',
      type: 'object',
      group: 'ctaBanner',
      fields: [
        defineField({ name: 'title', title: 'Heading', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 3 }),
        defineField({
          name: 'showAfterHoursNote',
          title: 'Show After-Hours Note?',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Home Page' };
    },
  },
});
