import type { CollectionConfig, FieldHookArgs, PayloadRequest } from 'payload'

// Default categories
const defaultCategories = [
  { label: 'Preventie', value: 'preventie' },
  { label: 'Diagnostiek', value: 'diagnostiek' },
  { label: 'Restauratief', value: 'restauratief' },
  { label: 'Endodontologie', value: 'endodontologie' },
  { label: 'Prothetiek', value: 'prothetiek' },
  { label: 'Implantologie', value: 'implantologie' },
  { label: 'Orthodontie', value: 'orthodontie' },
  { label: 'Overig', value: 'overig' },
]

export const Treatments: CollectionConfig = {
  slug: 'treatments',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
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
        description: 'This is the URL-friendly identifier for the treatment (e.g., "vullingen" for a page at /behandelingen/vullingen)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: defaultCategories,
      admin: {
        description: 'Choose a category for this treatment. Options are loaded from the global treatment categories. If not seeing updated options, try refreshing the page.',
        isClearable: false,
      },
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            // Just pass through the data, validation handled by the static options
            return data;
          }
        ],
      }
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
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
        description: 'Description for SEO purposes. If left blank, the short description will be used.',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        description: 'Order in which to display this treatment in listings (lower numbers appear first).',
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