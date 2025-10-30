import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'stackedExplainer',
  title: 'Stacked Explainer',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionHeadline',
      title: 'Section Headline',
      type: 'string',
      description: 'Main headline for the stacked explainer section',
    }),
    defineField({
      name: 'sectionIntro',
      title: 'Section Introduction',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Optional introduction text below the headline',
    }),
    defineField({
      name: 'cards',
      title: 'Explainer Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'number',
              title: 'Step Number',
              type: 'string',
              description: 'Display number (e.g., "01", "1", "★")',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Card Title',
              type: 'string',
              description: 'Small text above the heading (e.g., "STEP 1")',
            }),
            defineField({
              name: 'heading',
              title: 'Card Heading',
              type: 'string',
              description: 'Main heading for this card',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Card Description',
              type: 'array',
              of: [{type: 'block'}],
              description: 'Description text with rich formatting support',
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'image',
              description: 'Optional icon for the card',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                },
              ],
            }),
            defineField({
              name: 'backgroundImage',
              title: 'Background Image',
              type: 'image',
              description: 'Optional background image (will be dimmed for readability)',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                },
              ],
            }),
          ],
          preview: {
            select: {
              number: 'number',
              heading: 'heading',
              media: 'icon',
            },
            prepare(selection) {
              const {number, heading, media} = selection
              return {
                title: `${number}. ${heading}`,
                media,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).max(6).required(),
      description: 'Add 2-6 explainer cards (optimal for scroll effect)',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description: 'Optional call-to-action text below the cards (e.g., "Dieser dreistufige Prozess ist der Motor für Ihren wirtschaftlichen Erfolg.")',
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA Button Label',
      type: 'string',
      description: 'Optional button text (e.g., "Entdecken Sie Ihren Vorteil als Investor")',
    }),
    defineField({
      name: 'ctaButtonLink',
      title: 'CTA Button Link',
      type: 'string',
      description: 'Optional link URL for the CTA button (e.g., "/contact" or "#section")',
    }),
  ],
  preview: {
    select: {
      title: 'sectionHeadline',
      cards: 'cards',
    },
    prepare(selection) {
      const {title, cards} = selection
      const cardCount = cards?.length || 0
      return {
        title: title || 'Stacked Explainer',
        subtitle: `${cardCount} card${cardCount !== 1 ? 's' : ''} - Sequential scroll animation`,
      }
    },
  },
})

