import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Used for SEO meta description',
      rows: 3,
    }),
      defineField({
        name: 'content',
        title: 'Page Content',
        type: 'array',
        of: [
          {type: 'hero'},
          {type: 'heroGradient'},
          {type: 'featureCards'},
          {type: 'featureShowcase'},
          {type: 'stackedExplainer'},
          {type: 'textImage'},
          {type: 'simpleTextImage'},
          {type: 'stats'},
          {type: 'cta'},
          {type: 'references'},
          {type: 'teamGrid'},
          {type: 'contactSimple'},
          {type: 'lottieAnimation'},
          {type: 'videoAnimation'},
          // Add more content types as you migrate modules
        ],
      }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
