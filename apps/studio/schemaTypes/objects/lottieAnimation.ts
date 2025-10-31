import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'lottieAnimation',
  title: 'Lottie Animation',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Optional headline above the animation',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional description text below the headline',
    }),
    defineField({
      name: 'animationFile',
      title: 'Lottie Animation File',
      type: 'file',
      description: 'Upload your Lottie JSON file (.json)',
      options: {
        accept: '.json,application/json',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'loop',
      title: 'Loop Animation',
      type: 'boolean',
      description: 'Should the animation loop continuously?',
      initialValue: true,
    }),
    defineField({
      name: 'speed',
      title: 'Animation Speed',
      type: 'number',
      description: 'Playback speed multiplier (1 = normal, 0.5 = half speed, 2 = double speed)',
      initialValue: 1,
      validation: (Rule) => Rule.min(0.1).max(3).precision(1),
    }),
    defineField({
      name: 'maxWidth',
      title: 'Maximum Width',
      type: 'string',
      description: 'Maximum width of the animation (e.g., "800px", "100%")',
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
      fileName: 'animationFile.asset.originalFilename',
      loop: 'loop',
    },
    prepare({title, fileName, loop}) {
      return {
        title: title || 'Lottie Animation',
        subtitle: `${fileName || 'No file'} ${loop ? '(Loop)' : '(Play once)'}`,
      }
    },
  },
})


