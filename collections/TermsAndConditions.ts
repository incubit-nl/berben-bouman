import type { CollectionConfig } from 'payload'

export const TermsAndConditions: CollectionConfig = {
  slug: 'terms-and-conditions',
  admin: {
    useAsTitle: 'title',
    description: 'Algemene voorwaarden van title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Algemene Voorwaarden',
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
        description: 'De inhoud van de algemene voorwaarden',
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