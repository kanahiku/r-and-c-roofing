import { defineField, defineType } from 'sanity';

export const statItem = defineType({
  name: 'statItem',
  title: 'Stat Item',
  type: 'object',
  fields: [
    defineField({ name: 'stat', title: 'Stat Value (e.g. 50+)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'label', title: 'Label', type: 'string', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'stat', subtitle: 'label' } },
});

export const infoCardItem = defineType({
  name: 'infoCardItem',
  title: 'Info Card',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Tabler icon name, e.g. tabler:droplet',
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'icon' } },
});

export const serviceItem = defineType({
  name: 'serviceItem',
  title: 'Service',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Service Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({ name: 'linkText', title: 'Link Label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'linkHref', title: 'Link URL', type: 'string', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'title', subtitle: 'linkHref' } },
});

export const timelineStep = defineType({
  name: 'timelineStep',
  title: 'Timeline Step',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Step Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, validation: (r) => r.required() }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Tabler icon name, e.g. tabler:search',
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'icon' } },
});

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({ name: 'question', title: 'Question', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'question' } },
});
