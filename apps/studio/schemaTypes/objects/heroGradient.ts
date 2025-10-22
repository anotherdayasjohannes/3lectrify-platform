import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroGradient',
  title: 'Hero Gradient',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
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
      name: 'gradientDirection',
      title: 'Gradient Direction',
      type: 'string',
      options: {
        list: [
          {title: 'Left (Image Right)', value: 'left'},
          {title: 'Right (Image Left)', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sectionHeight',
      title: 'Section Height',
      type: 'string',
      options: {
        list: [
          {title: 'Small (300px)', value: 'small'},
          {title: 'Medium (400px)', value: 'medium'},
          {title: 'Large (500px)', value: 'large'},
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
      media: 'backgroundImage',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Hero Gradient',
        subtitle: subtitle || 'Hero section with gradient overlay',
      }
    },
  },
})



