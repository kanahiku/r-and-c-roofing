import { defineField, defineType } from 'sanity';

export const lead = defineType({
  name: 'lead',
  title: 'Lead',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'zip', title: 'ZIP Code', type: 'string' }),
    defineField({ name: 'topic', title: 'Topic', type: 'string' }),
    defineField({ name: 'topicLabel', title: 'Topic Label', type: 'string' }),
    defineField({ name: 'message', title: 'Message', type: 'text', rows: 5 }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'contact-form',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Closed', value: 'closed' },
        ],
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'topicLabel', email: 'email' },
    prepare({ title, subtitle, email }) {
      return {
        title: title || 'Untitled lead',
        subtitle: [subtitle, email].filter(Boolean).join(' · '),
      };
    },
  },
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
});
