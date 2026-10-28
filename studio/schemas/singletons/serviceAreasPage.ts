import { defineArrayMember, defineField, defineType } from 'sanity';

export const serviceAreasPage = defineType({
  name: 'serviceAreasPage',
  title: 'Service Areas Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],

  groups: [
    { name: 'meta', title: 'SEO' },
    { name: 'hero', title: 'Hero' },
    { name: 'location', title: 'Location' },
    { name: 'areas', title: 'Service areas' },
    { name: 'services', title: 'Services' },
    { name: 'cta', title: 'CTA banner' },
  ],

  fields: [
    defineField({
      name: 'meta',
      title: 'SEO',
      type: 'object',
      group: 'meta',
      fields: [
        defineField({ name: 'title', title: 'Page title', type: 'string', validation: (r) => r.required() }),
        defineField({
          name: 'description',
          title: 'Meta description',
          type: 'text',
          rows: 3,
          validation: (r) => r.required(),
        }),
      ],
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'pageHero',
      group: 'hero',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      group: 'location',
      description: 'Office address, contact details, hours and the Google Map.',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'intro', title: 'Intro paragraph', type: 'text', rows: 3 }),
        defineField({ name: 'businessName', title: 'Business name', type: 'string' }),
        defineField({ name: 'addressLine1', title: 'Address line 1', type: 'string' }),
        defineField({ name: 'addressLine2', title: 'Address line 2', type: 'string' }),
        defineField({ name: 'phoneText', title: 'Phone (display)', type: 'string' }),
        defineField({ name: 'phoneHref', title: 'Phone link', type: 'string', description: 'e.g. tel:+18088882524' }),
        defineField({ name: 'email', title: 'Email', type: 'string' }),
        defineField({
          name: 'hours',
          title: 'Business hours',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'One line per entry, e.g. "Monday to Friday: 8:00 a.m. to 4:30 p.m."',
        }),
        defineField({
          name: 'mapEmbedUrl',
          title: 'Google Maps embed URL',
          type: 'url',
          description:
            'The src value from Google Maps → Share → Embed a map. Leave empty to fall back to the address.',
          validation: (r) => r.uri({ scheme: ['https'] }),
        }),
        defineField({
          name: 'mapsQuery',
          title: 'Directions address',
          type: 'string',
          description: 'Used for the Get Directions button and as the map fallback.',
        }),
        defineField({ name: 'directionsLabel', title: 'Directions button label', type: 'string' }),
      ],
    }),
    defineField({
      name: 'areas',
      title: 'Service areas',
      type: 'object',
      group: 'areas',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required() }),
        defineField({
          name: 'introParagraphs',
          title: 'Paragraphs above the table',
          type: 'array',
          of: [{ type: 'text' }],
        }),
        defineField({ name: 'regionLabel', title: 'Region column label', type: 'string', initialValue: 'Region' }),
        defineField({
          name: 'communitiesLabel',
          title: 'Communities column label',
          type: 'string',
          initialValue: 'Communities Served',
        }),
        defineField({
          name: 'regions',
          title: 'Regions',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'serviceAreaRegion',
              title: 'Region',
              fields: [
                defineField({ name: 'region', title: 'Region', type: 'string', validation: (r) => r.required() }),
                defineField({
                  name: 'communities',
                  title: 'Communities served',
                  type: 'string',
                  validation: (r) => r.required(),
                }),
              ],
              preview: { select: { title: 'region', subtitle: 'communities' } },
            }),
          ],
          validation: (r) => r.min(1),
        }),
        defineField({
          name: 'closingParagraphs',
          title: 'Paragraphs below the table',
          type: 'array',
          of: [{ type: 'text' }],
        }),
      ],
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'object',
      group: 'services',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', validation: (r) => r.required() }),
        defineField({ name: 'intro', title: 'Intro paragraph', type: 'text', rows: 3 }),
        defineField({
          name: 'items',
          title: 'Services',
          type: 'array',
          of: [defineArrayMember({ type: 'linkedCard' })],
          validation: (r) => r.min(1),
        }),
        defineField({
          name: 'footnoteBefore',
          title: 'Closing sentence: text before link',
          type: 'string',
          description: 'e.g. "You can explore these offerings on our"',
        }),
        defineField({ name: 'footnoteLinkText', title: 'Closing sentence: link text', type: 'string' }),
        defineField({ name: 'footnoteLinkHref', title: 'Closing sentence: link URL', type: 'string' }),
        defineField({
          name: 'footnoteAfter',
          title: 'Closing sentence: text after link',
          type: 'string',
          description: 'e.g. "page."',
        }),
      ],
    }),
    defineField({
      name: 'ctaBanner',
      title: 'CTA banner',
      type: 'ctaBanner',
      group: 'cta',
      validation: (r) => r.required(),
    }),
  ],

  preview: {
    prepare() {
      return { title: 'Service Areas Page' };
    },
  },
});
