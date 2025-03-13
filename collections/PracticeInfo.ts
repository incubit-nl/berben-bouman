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
      name: 'content',
      type: 'richText',
      required: true,
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
} 