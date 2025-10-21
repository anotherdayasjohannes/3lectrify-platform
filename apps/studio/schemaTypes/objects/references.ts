import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'references',
  title: 'References Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Section Headline',
      type: 'string',
      description: 'Optional custom headline (default: "Tausendfach bewährt.")',
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 2,
      description: 'Optional custom description',
    }),
    defineField({
      name: 'selectedReferences',
      title: 'Selected References',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'referenceProject'}],
        },
      ],
      validation: (Rule) => Rule.required().min(3),
      description: 'Select 3-8 reference projects to display in the grid',
    }),
    defineField({
      name: 'variant',
      title: 'Display Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Bento Grid (Recommended)', value: 'grid'},
          {title: 'Marquee Carousel', value: 'marquee'},
        ],
        layout: 'radio',
      },
      initialValue: 'grid',
      description: 'Grid for 3-8 projects, Marquee for 10+ projects',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
    defineField({
      name: 'showStats',
      title: 'Show Statistics Footer',
      type: 'boolean',
      description: 'Display stats like "1.400+ Wohneinheiten", "15+ Städte"',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      references: 'selectedReferences',
      variant: 'variant',
    },
    prepare(selection) {
      const {references, variant} = selection
      const count = references?.length || 0
      return {
        title: 'References Grid',
        subtitle: `${count} projects (${variant === 'marquee' ? 'Marquee' : 'Bento Grid'})`,
      }
    },
  },
})

