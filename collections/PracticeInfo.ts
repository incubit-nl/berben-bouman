import type { CollectionConfig } from 'payload'

export const PracticeInfo: CollectionConfig = {
  slug: 'practice-info',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'infoType', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Practice Information',
      admin: {
        description: 'This is just a label for the CMS and won\'t be displayed on the website.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'This is the URL-friendly identifier for the page (e.g., "praktijkregels")',
      },
    },
    {
      name: 'infoType',
      type: 'select',
      options: [
        { label: 'Praktijkrondleiding', value: 'tour' },
        { label: 'Praktijkregels', value: 'rules' },
        { label: 'Begroting', value: 'budget' },
        { label: 'Tarieven', value: 'pricing' },
        { label: 'Facturen', value: 'invoices' },
        { label: 'Overig', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'General description of the practice',
      },
    },
    {
      name: 'whyUsSection',
      type: 'group',
      fields: [
        {
          name: 'whyUsTitle',
          type: 'text',
          defaultValue: 'Waarom kiezen voor ons?',
        },
        {
          name: 'whyUsDescription',
          type: 'textarea',
          defaultValue: 'Bij Tandartsenpraktijk Berben & Bouman staat kwaliteit en patiënttevredenheid voorop.',
        },
      ],
    },
    {
      name: 'qualitySection',
      type: 'group',
      fields: [
        {
          name: 'qualityTitle',
          type: 'text',
          defaultValue: 'Hoogwaardige tandheelkundige zorg',
        },
        {
          name: 'qualityDescription',
          type: 'textarea',
          defaultValue: 'Wij streven ernaar de best mogelijke zorg te bieden in een ontspannen en comfortabele omgeving. Onze praktijk is uitgerust met de nieuwste technologie om de meest effectieve behandelingen te kunnen bieden.',
        },
        {
          name: 'qualityImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      admin: {
        description: 'Features or benefits of the practice',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Sparkles', value: 'sparkles' },
            { label: 'Heart', value: 'heart' },
            { label: 'Clock', value: 'clock' },
            { label: 'Users', value: 'users' },
            { label: 'Shield', value: 'shield' },
            { label: 'Check Circle', value: 'check-circle' },
          ],
          defaultValue: 'sparkles',
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      admin: {
        description: 'Benefits or key points about the practice to highlight',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'mission',
      type: 'group',
      fields: [
        {
          name: 'missionStatement',
          type: 'textarea',
        },
        {
          name: 'visionStatement',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'history',
      type: 'richText',
      admin: {
        description: 'History of the practice',
      },
    },
    {
      name: 'values',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
      admin: {
        description: 'Image gallery (especially useful for Praktijkrondleiding)',
      },
    },
    {
      name: 'attachments',
      type: 'array',
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
      admin: {
        description: 'Attachments like price lists, forms, etc.',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        description: 'Title for SEO purposes. If left blank, the regular title will be used.',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        description: 'Description for SEO purposes.',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        description: 'Order in which to display this info page in listings (lower numbers appear first).',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
    },
  ],
  timestamps: true,
} 