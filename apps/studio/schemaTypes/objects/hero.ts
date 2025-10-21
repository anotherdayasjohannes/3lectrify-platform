import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main headline for the hero section (optional)',
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Supporting text below the headline',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showImage',
      title: 'Show Image',
      type: 'boolean',
      initialValue: false,
      description: 'Display the hero image',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
      ],
      hidden: ({parent}) => !parent?.showImage,
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          {title: 'Above text', value: 'above'},
          {title: 'Side by side', value: 'side'},
        ],
        layout: 'radio',
      },
      initialValue: 'above',
      hidden: ({parent}) => !parent?.showImage,
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'imagePosition',
      media: 'heroImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Hero Section',
        subtitle: subtitle ? `Image: ${subtitle}` : 'Text only',
        media,
      }
    },
  },
})
