import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
        description: 'This is the URL-friendly identifier for the page (e.g., "over-ons" for a page at /over-ons)',
      },
    },
    {
      name: 'pageType',
      type: 'select',
      options: [
        { label: 'Home', value: 'home' },
        { label: 'De Praktijk', value: 'practice' },
        { label: 'Behandelingen', value: 'treatments' },
        { label: 'Contact', value: 'contact' },
        { label: 'Overig', value: 'other' },
      ],
      required: true,
      defaultValue: 'other',
    },
    {
      name: 'parentPage',
      type: 'relationship',
      relationTo: 'pages' as any,
      admin: {
        description: 'If this is a subpage, select the parent page',
        condition: (data) => data.pageType !== 'home',
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
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'heroTitle',
          type: 'text',
        },
        {
          name: 'heroContent',
          type: 'richText',
        },
      ],
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'content',
          labels: {
            singular: 'Content',
            plural: 'Content Blocks',
          },
          fields: [
            {
              name: 'content',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          slug: 'imageText',
          labels: {
            singular: 'Image with Text',
            plural: 'Image with Text Blocks',
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'text',
              type: 'richText',
              required: true,
            },
            {
              name: 'imagePosition',
              type: 'select',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
              defaultValue: 'left',
            },
          ],
        },
        {
          slug: 'callToAction',
          labels: {
            singular: 'Call to Action',
            plural: 'Call to Action Blocks',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'text',
              type: 'richText',
            },
            {
              name: 'buttonText',
              type: 'text',
            },
            {
              name: 'buttonLink',
              type: 'text',
            },
            {
              name: 'backgroundColor',
              type: 'select',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Light', value: 'light' },
              ],
              defaultValue: 'primary',
            },
          ],
        },
      ],
    },
    {
      name: 'showInNavigation',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Should this page be shown in the main navigation?',
      },
    },
    {
      name: 'showInFooter',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Should this page be shown in the footer navigation?',
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