import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'textImage',
  title: 'Text + Image Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main headline for the section',
    }),
    defineField({
      name: 'body',
      title: 'Body Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Main content text',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'object',
      description: 'Optional quote block',
      fields: [
        {
          name: 'text',
          title: 'Quote Text',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'author',
          title: 'Author / Source',
          type: 'string',
          description: 'e.g., "DER SPIEGEL, 34/2024"',
        },
        {
          name: 'icon',
          title: 'Quote Icon',
          type: 'image',
          description: 'Optional quote icon (e.g., quotation marks)',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Stats / Metrics',
      type: 'array',
      description: 'Optional statistics cards',
      of: [
        {
          type: 'object',
          name: 'statCard',
          title: 'Stat Card',
          fields: [
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The main metric (e.g., "14,50 €/m²", "81 %")',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Explanation of the metric',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'accentColor',
              title: 'Accent Color',
              type: 'string',
              options: {
                list: [
                  {title: 'Green', value: 'green'},
                  {title: 'Orange', value: 'orange'},
                  {title: 'Blue', value: 'blue'},
                  {title: 'Curry', value: 'curry'},
                ],
                layout: 'radio',
              },
              initialValue: 'green',
            },
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'description',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'image',
      title: 'Image',
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
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
      description: 'Background color theme',
    }),
    defineField({
      name: 'fullWidth',
      title: 'Full Width',
      type: 'boolean',
      initialValue: false,
      description: 'Extend content to full width instead of using content wrapper',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      media: 'image',
      imagePosition: 'imagePosition',
    },
    prepare({title, media, imagePosition}) {
      return {
        title: title || 'Text + Image Section',
        subtitle: imagePosition ? `Image: ${imagePosition}` : 'No image',
        media,
      }
    },
  },
})

