import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'cta',
  title: 'Call-to-Action Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main headline for the CTA (H2 style) - Optional',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Description text (supports rich text)',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      description: 'Text displayed on the button',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      description: 'URL the button links to (internal: /page or external: https://...)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in New Tab',
      type: 'boolean',
      description: 'Open the link in a new tab (for external links)',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'buttonText',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'CTA Section',
        subtitle: subtitle ? `Button: ${subtitle}` : 'No button text',
      };
    },
  },
});

