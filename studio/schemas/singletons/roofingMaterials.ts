import { defineField, defineType } from 'sanity';

export const roofingMaterials = defineType({
  name: 'roofingMaterials',
  title: 'Roofing materials',
  type: 'document',
  description:
    'The order here controls the Materials navigation, the materials hub cards, the hub comparison table, and every “Explore Other Roofing Materials” section.',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'items',
      title: 'Materials (drag to reorder)',
      type: 'array',
      validation: (rule) => rule.required().min(1),
      of: [
        {
          name: 'roofingMaterial',
          title: 'Roofing material',
          type: 'object',
          fields: [
            defineField({
              name: 'page',
              title: 'Material page',
              type: 'reference',
              to: [{ type: 'servicePage' }],
              options: {
                filter: 'slug.current match "services/roofing-materials/*"',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'navTitle',
              title: 'Navigation label',
              type: 'string',
              description: 'Short label used in the Materials dropdown.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Card title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Card description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'linkText',
              title: 'Card link label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'comparisonLabel',
              title: 'Comparison table row label',
              type: 'string',
              description: 'First-column label on the materials hub table. Defaults to the card title if empty.',
            }),
            defineField({
              name: 'comparisonCell1',
              title: 'Good starting point for',
              type: 'text',
              rows: 3,
              description: 'Hub table column: Good Starting Point For.',
            }),
            defineField({
              name: 'comparisonCell2',
              title: 'Appearance',
              type: 'text',
              rows: 3,
              description: 'Hub table column: Appearance.',
            }),
            defineField({
              name: 'comparisonCell3',
              title: 'Key considerations',
              type: 'text',
              rows: 3,
              description: 'Hub table column: Key Considerations.',
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'navTitle' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Roofing materials' };
    },
  },
});

export const roofingMaterialsSection = defineType({
  name: 'roofingMaterialsSection',
  title: 'Roofing materials (automatic)',
  type: 'object',
  description:
    'Uses the global Roofing materials list automatically and omits the material page currently being viewed.',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro paragraph',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'display',
      title: 'Display',
      type: 'string',
      options: {
        list: [
          { title: 'Card grid', value: 'cards' },
          { title: 'Directory rows', value: 'directory' },
        ],
        layout: 'radio',
      },
      initialValue: 'cards',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return { title: title || 'Roofing materials', subtitle: 'Automatic global list' };
    },
  },
});
