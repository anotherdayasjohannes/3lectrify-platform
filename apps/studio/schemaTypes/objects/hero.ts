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
    defineField({
      name: 'enableParallax',
      title: 'Enable Parallax Effect',
      type: 'boolean',
      initialValue: false,
      description: 'Use multiple images for a parallax/3D effect',
      hidden: ({parent}) => !parent?.showImage,
    }),
    defineField({
      name: 'parallaxImages',
      title: 'Parallax Images (3 Perspectives)',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'perspective',
              type: 'string',
              title: 'Perspective',
              options: {
                list: ['Left', 'Center', 'Right'],
              },
            },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3).min(3),
      description: 'Add exactly 3 images: Left, Center, and Right perspectives',
      hidden: ({parent}) => !parent?.enableParallax,
    }),
    defineField({
      name: 'parallaxEffect',
      title: 'Parallax Effect Type',
      type: 'string',
      options: {
        list: [
          {
            title: 'Mouse Tracking (Interactive)',
            value: 'mouse',
            description: 'Images shift based on mouse position - creates 3D feel',
          },
          {
            title: 'Auto-Rotate (Cinematic)',
            value: 'autoRotate',
            description: 'Images crossfade automatically - passive, elegant',
          },
          {
            title: 'Layered Depth (Scroll)',
            value: 'layered',
            description: 'Images layer with depth - reveals on scroll',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'mouse',
      description: 'Choose how the parallax effect behaves',
      hidden: ({parent}) => !parent?.enableParallax,
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
