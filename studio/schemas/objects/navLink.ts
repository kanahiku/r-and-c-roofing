import { defineField, defineType } from 'sanity';

export const navSubLink = defineType({
  name: 'navSubLink',
  title: 'Sub-link',
  type: 'object',
  fields: [
    defineField({ name: 'text', title: 'Label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'href', title: 'URL', type: 'string', validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'text', subtitle: 'href' } },
});

export const navLink = defineType({
  name: 'navLink',
  title: 'Nav Link',
  type: 'object',
  fields: [
    defineField({ name: 'text', title: 'Label', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'href', title: 'URL (optional if has sub-links)', type: 'string' }),
    defineField({
      name: 'subLinks',
      title: 'Sub-links',
      type: 'array',
      of: [{ type: 'navSubLink' }],
    }),
    defineField({
      name: 'columns',
      title: 'Mega-menu columns',
      description: 'Optional mega-menu columns (used by Services). Takes precedence over Sub-links.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navColumn',
          fields: [
            defineField({ name: 'title', title: 'Column title', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [{ type: 'navSubLink' }],
            }),
          ],
          preview: { select: { title: 'title' } },
        },
      ],
    }),
  ],
  preview: { select: { title: 'text', subtitle: 'href' } },
});
