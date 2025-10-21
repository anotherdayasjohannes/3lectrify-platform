import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactSimple',
  title: 'Contact Simple (Two-Column)',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      title: 'Überschrift (optional)',
      type: 'string',
    }),
    defineField({
      name: 'subheadline',
      title: 'Unterüberschrift (optional)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'formHeadline',
      title: 'Formular Überschrift',
      type: 'string',
      initialValue: 'Kontaktformular',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'labels',
      title: 'Formular Labels',
      type: 'object',
      fields: [
        {
          name: 'firstname',
          title: 'Label: Vorname',
          type: 'string',
          initialValue: 'Vorname',
        },
        {
          name: 'lastname',
          title: 'Label: Nachname',
          type: 'string',
          initialValue: 'Nachname',
        },
        {
          name: 'company',
          title: 'Label: Unternehmen',
          type: 'string',
          initialValue: 'Unternehmen (optional)',
        },
        {
          name: 'email',
          title: 'Label: E-Mail',
          type: 'string',
          initialValue: 'E-Mail',
        },
        {
          name: 'phone',
          title: 'Label: Telefon',
          type: 'string',
          initialValue: 'Telefon (optional)',
        },
        {
          name: 'message',
          title: 'Label: Nachricht',
          type: 'string',
          initialValue: 'Nachricht',
        },
        {
          name: 'button',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Anfrage senden',
        },
        {
          name: 'privacy',
          title: 'Datenschutz Text',
          type: 'string',
          initialValue: 'Ich habe die Datenschutzerklärung gelesen und akzeptiere diese.',
        },
        {
          name: 'privacyLink',
          title: 'Datenschutz Link',
          type: 'string',
          initialValue: '/datenschutz',
        },
      ],
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Adresse Überschrift',
          type: 'string',
          initialValue: 'Adresse',
        },
        {
          name: 'companyName',
          title: 'Firmenname',
          type: 'string',
          initialValue: '3lectrify',
        },
        {
          name: 'addressLine2',
          title: 'Adresszusatz (optional)',
          type: 'string',
        },
        {
          name: 'street',
          title: 'Straße',
          type: 'string',
          initialValue: 'Kramergasse 32',
        },
        {
          name: 'postalCode',
          title: 'PLZ',
          type: 'string',
          initialValue: '82054',
        },
        {
          name: 'city',
          title: 'Ort',
          type: 'string',
          initialValue: 'Sauerlach',
        },
        {
          name: 'email',
          title: 'E-Mail',
          type: 'string',
          initialValue: 'kontakt@3lectrify.com',
        },
        {
          name: 'phone',
          title: 'Telefon',
          type: 'string',
          initialValue: '+49 8104 64709-299',
        },
        {
          name: 'mapsLinkText',
          title: 'Google Maps Link Text',
          type: 'string',
          initialValue: 'In Google Maps öffnen',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'successMessage',
      title: 'Erfolgs-Nachricht',
      type: 'text',
      rows: 2,
      initialValue:
        'Vielen Dank! Wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'formHeadline',
      subtitle: 'headline',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Contact Simple',
        subtitle: subtitle || 'Two-column contact form with address',
      }
    },
  },
})


