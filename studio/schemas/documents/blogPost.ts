import { defineField, defineType } from 'sanity';
import { ComposeIcon } from '@sanity/icons';
import { relatedPageOptions } from '../objects/relatedPageOptions';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog',
  type: 'document',
  icon: ComposeIcon,
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'related', title: 'Related pages' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'Used in the URL: /blog/your-slug. Publish to make the article live — no code deploy needed.',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Short summary shown on listing cards and related-blog sections.',
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish date',
      type: 'datetime',
      group: 'content',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'content',
      initialValue: 'R&C Roofing Contractors',
    }),
    defineField({
      name: 'image',
      title: 'Cover image (upload)',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({
      name: 'imageUrl',
      title: 'Cover image URL',
      type: 'url',
      group: 'content',
      description: 'Used if no image is uploaded. Leave empty to show the placeholder.',
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image alt text (when using a URL)',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Article body',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'relatedPages',
      title: 'Related pages',
      type: 'array',
      group: 'related',
      description: 'Pages and services where this article should appear in Related blogs. Pick as many as you need.',
      of: [
        {
          type: 'string',
          options: {
            list: relatedPageOptions,
            layout: 'dropdown',
          },
        },
      ],
      validation: (r) => r.unique(),
    }),
  ],
  orderings: [
    {
      title: 'Publish date, newest',
      name: 'publishDateDesc',
      by: [{ field: 'publishDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current', media: 'image', date: 'publishDate' },
    prepare({ title, subtitle, media, date }) {
      const when = date ? new Date(date).toLocaleDateString('en-US', { dateStyle: 'medium' }) : 'No date';
      return {
        title: title || 'Untitled post',
        subtitle: [subtitle ? `/blog/${subtitle}` : 'No slug', when].join(' · '),
        media,
      };
    },
  },
});
