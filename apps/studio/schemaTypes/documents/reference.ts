import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'referenceProject',
  title: 'Reference Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Name of the reference project (e.g., "Mihla", "Lübben")',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'City or region (e.g., "Thüringen", "Brandenburg")',
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
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
      name: 'units',
      title: 'Number of Units',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
      description: 'Number of residential or commercial units',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'Year of project completion (e.g., "2023")',
    }),
    defineField({
      name: 'type',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          {title: 'Residential', value: 'residential'},
          {title: 'Commercial', value: 'commercial'},
          {title: 'Mixed Use', value: 'mixed'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'residential',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Featured projects appear larger in the grid (e.g., Mihla)',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional detailed description',
    }),
    defineField({
      name: 'link',
      title: 'Project Link',
      type: 'url',
      description: 'Optional link to project detail page',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'image',
      featured: 'featured',
    },
    prepare(selection) {
      const {title, subtitle, media, featured} = selection
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Featured first',
      name: 'featuredFirst',
      by: [{field: 'featured', direction: 'desc'}, {field: 'year', direction: 'desc'}],
    },
    {
      title: 'Year (newest first)',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
})

