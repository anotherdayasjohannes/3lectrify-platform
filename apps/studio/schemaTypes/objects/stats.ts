import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'stats',
  title: 'Stats / Metrics',
  type: 'object',
  fields: [
    defineField({
      name: 'stats',
      title: 'Stat Cards',
      type: 'array',
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
      validation: (Rule) => Rule.min(1).max(6),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          {title: 'Horizontal', value: 'horizontal'},
          {title: 'Grid', value: 'grid'},
        ],
        layout: 'radio',
      },
      initialValue: 'horizontal',
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
    }),
  ],
  preview: {
    select: {
      stats: 'stats',
    },
    prepare({stats}) {
      const statCount = stats?.length || 0
      return {
        title: 'Stats / Metrics',
        subtitle: `${statCount} stat${statCount !== 1 ? 's' : ''}`,
      }
    },
  },
})



