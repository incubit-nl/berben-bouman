import type { CollectionConfig } from 'payload'

export const HomePage: CollectionConfig = {
  slug: 'home-page',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Home Page',
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'heroTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'heroSubtitle',
          type: 'text',
        },
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'ctaText',
          type: 'text',
        },
        {
          name: 'ctaLink',
          type: 'text',
        }
      ]
    },
    {
      name: 'introSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'content',
          type: 'richText',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        }
      ]
    },
    {
      name: 'featuredTreatments',
      type: 'array',
      fields: [
        {
          name: 'treatment',
          type: 'relationship',
          relationTo: 'treatments',
          required: true,
        }
      ]
    },
    {
      name: 'teamSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'richText',
        },
        {
          name: 'teamMembers',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'role',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'bio',
              type: 'textarea',
            }
          ]
        }
      ]
    },
    {
      name: 'testimonialSection',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'testimonials',
          type: 'array',
          fields: [
            {
              name: 'quote',
              type: 'textarea',
              required: true,
            },
            {
              name: 'author',
              type: 'text',
              required: true,
            },
            {
              name: 'rating',
              type: 'number',
              min: 1,
              max: 5,
            }
          ]
        }
      ]
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        }
      ]
    }
  ],
  versions: {
    drafts: true,
  },
} 