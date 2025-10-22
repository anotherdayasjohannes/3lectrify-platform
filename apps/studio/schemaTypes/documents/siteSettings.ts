import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: '3lectrify',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
      description: 'Site logo (recommended: 162x40px)',
    }),
    defineField({
      name: 'navigation',
      title: 'Main Navigation',
      type: 'array',
      of: [{type: 'navigationItem'}],
      validation: (Rule) => Rule.max(7).warning('Consider limiting to 7 items for better UX'),
      description: 'Main navigation menu items',
    }),
    defineField({
      name: 'footerHeadline',
      title: 'Footer Headline',
      type: 'string',
      initialValue: 'Ihr strategischer Partner für profitable All-Electric Buildings.',
      description: 'Large headline in footer',
    }),
    defineField({
      name: 'footerNewsletter',
      title: 'Newsletter Section',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Newsletter Signup',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'label',
          title: 'Label',
          type: 'string',
          initialValue: 'Bleiben Sie auf dem Laufenden über Innovationen und Projekte:',
        },
        {
          name: 'placeholder',
          title: 'Input Placeholder',
          type: 'string',
          initialValue: 'Ihre Mailadresse',
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Newsletter abonnieren',
        },
      ],
    }),
    defineField({
      name: 'footerNavigation',
      title: 'Footer Navigation',
      type: 'array',
      of: [{type: 'navigationItem'}],
      description: 'Footer navigation links',
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      of: [{type: 'navigationItem'}],
      description: 'Impressum, Datenschutz, etc.',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '© 2025 3lectrify – Alle Rechte vorbehalten.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: `Site Settings: ${title}`,
      }
    },
  },
})



