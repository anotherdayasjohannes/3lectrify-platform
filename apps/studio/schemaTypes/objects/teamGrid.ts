import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamGrid',
  title: 'Team Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Die Köpfe hinter 3lectrify',
    }),
    defineField({
      name: 'introText',
      title: 'Introduction Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rich text introduction for the team section',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'teamMember'}],
        },
      ],
      validation: (Rule) => Rule.min(1).max(12),
      description: 'Select 1-12 team members to display',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'teamMembers',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      const memberCount = subtitle?.length || 0
      return {
        title: title || 'Team Grid',
        subtitle: `${memberCount} team member${memberCount !== 1 ? 's' : ''}`,
      }
    },
  },
})


