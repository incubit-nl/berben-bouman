import type { CollectionConfig } from 'payload'

export const PracticePages: CollectionConfig = {
  slug: 'practice-pages',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', 'status'],
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
        description: 'This will be the URL path after /de-praktijk/ (e.g., "ons-team" for /de-praktijk/ons-team)',
      },
    },
    {
      name: 'pageType',
      type: 'select',
      options: [
        { label: 'Team', value: 'team' },
        { label: 'Faciliteiten', value: 'facilities' },
        { label: 'Over Ons', value: 'about' },
        { label: 'Werkwijze', value: 'methodology' },
        { label: 'Overig', value: 'other' },
      ],
      required: true,
      defaultValue: 'other',
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
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
      name: 'content',
      type: 'blocks',
      blocks: [
        {
          slug: 'textContent',
          labels: {
            singular: 'Text Content',
            plural: 'Text Content Blocks',
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
          slug: 'imageWithText',
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
                { label: 'Links', value: 'left' },
                { label: 'Rechts', value: 'right' },
              ],
              defaultValue: 'left',
            },
          ],
        },
        {
          slug: 'teamMember',
          labels: {
            singular: 'Team Member',
            plural: 'Team Members',
          },
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
              type: 'richText',
            },
            {
              name: 'specialties',
              type: 'array',
              fields: [
                {
                  name: 'specialty',
                  type: 'text',
                }
              ]
            },
          ],
        },
        {
          slug: 'facilityHighlight',
          labels: {
            singular: 'Facility Highlight',
            plural: 'Facility Highlights',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
            },
            {
              name: 'images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                }
              ]
            },
          ],
        },
      ],
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
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Concept', value: 'draft' },
        { label: 'Gepubliceerd', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'showInNavigation',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Moet deze pagina getoond worden in het praktijk submenu?',
      },
    },
    {
      name: 'navigationOrder',
      type: 'number',
      admin: {
        description: 'Volgorde in het navigatiemenu (lagere nummers komen eerst)',
        condition: (data) => data.showInNavigation,
      },
    },
  ],
  versions: {
    drafts: true,
  },
} 