import type { CollectionConfig } from 'payload'

export const Privacy: CollectionConfig = {
  slug: 'privacy',
  admin: {
    useAsTitle: 'title',
    description: 'Privacybeleid van title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Privacybeleid',
    },
    {
      name: 'lastUpdated',
      type: 'date',
      required: true,
      admin: {
        description: 'Datum van laatste update',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMMM yyyy',
        },
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'De inhoud van het privacybeleid',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: 'SEO titel (optioneel)',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: 'SEO beschrijving (optioneel)',
      },
    },
  ],
  versions: {
    drafts: true,
  },
} 