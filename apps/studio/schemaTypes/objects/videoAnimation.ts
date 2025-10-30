import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'videoAnimation',
  title: 'Video Animation',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Optional headline above the video',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional description text below the headline',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      description: 'Upload your MP4 video file',
      options: {
        accept: 'video/mp4,video/webm',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      description: 'Thumbnail image shown before video loads (improves Lighthouse score)',
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
      name: 'loop',
      title: 'Loop Video',
      type: 'boolean',
      description: 'Should the video loop continuously?',
      initialValue: true,
    }),
    defineField({
      name: 'muted',
      title: 'Muted',
      type: 'boolean',
      description: 'Mute audio (required for autoplay to work)',
      initialValue: true,
    }),
    defineField({
      name: 'maxWidth',
      title: 'Maximum Width',
      type: 'string',
      description: 'Maximum width of the video container',
      initialValue: '800px',
      options: {
        list: [
          {title: 'Small (600px)', value: '600px'},
          {title: 'Medium (800px)', value: '800px'},
          {title: 'Large (1000px)', value: '1000px'},
          {title: 'Extra Large (1200px)', value: '1200px'},
          {title: 'Full Width (100%)', value: '100%'},
        ],
      },
    }),
    defineField({
      name: 'variant',
      title: 'Background Variant',
      type: 'string',
      description: 'Background color theme',
      options: {
        list: [
          {title: 'Dark', value: 'dark'},
          {title: 'Light', value: 'light'},
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      fileName: 'videoFile.asset.originalFilename',
      media: 'posterImage',
      loop: 'loop',
    },
    prepare({title, fileName, media, loop}) {
      return {
        title: title || 'Video Animation',
        subtitle: `${fileName || 'No file'} ${loop ? '(Loop)' : '(Play once)'}`,
        media,
      }
    },
  },
})

