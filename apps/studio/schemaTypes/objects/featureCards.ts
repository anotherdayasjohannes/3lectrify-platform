import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'featureCards',
  title: 'Feature Cards',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionHeadline',
      title: 'Section Headline',
      type: 'string',
      description: 'Optional headline for the feature cards section',
    }),
    defineField({
      name: 'sectionDescription',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      description: 'Optional description below the section headline',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'card',
          title: 'Card',
          fields: [
            {
              name: 'icon',
              title: 'Icon/Image',
              type: 'image',
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
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'icon',
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(4).warning('Recommended maximum of 4 cards for optimal layout'),
    }),
  ],
  preview: {
    select: {
      title: 'sectionHeadline',
      cards: 'cards',
    },
    prepare({title, cards}) {
      const cardCount = cards?.length || 0
      return {
        title: title || 'Feature Cards',
        subtitle: `${cardCount} card${cardCount !== 1 ? 's' : ''}`,
      }
    },
  },
})
