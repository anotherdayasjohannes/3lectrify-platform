import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'featureShowcase',
  title: 'Feature Showcase (3-Column)',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionHeadline',
      title: 'Section Headline',
      type: 'string',
      description: 'Main section headline (optional)',
    }),
    defineField({
      name: 'sectionIntro',
      title: 'Section Introduction',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Introduction text below headline (optional)',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      validation: (Rule) => Rule.min(3).max(3),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'string',
              description: 'Display number (e.g., "01", "02", "03")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Tab Title',
              type: 'string',
              description: 'Short title shown at top',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'heading',
              title: 'Content Heading',
              type: 'string',
              description: 'Main heading in content area',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{ type: 'block' }],
              description: 'Main content description',
            }),
            defineField({
              name: 'icon',
              title: 'Icon/Image',
              type: 'image',
              description: 'Optional icon or small image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative text',
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'number',
              media: 'icon',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'sectionHeadline',
      subtitle: 'features',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Feature Showcase',
        subtitle: subtitle ? `${subtitle.length} features` : 'No features',
      };
    },
  },
});


