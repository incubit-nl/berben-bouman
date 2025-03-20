import type { CollectionConfig } from 'payload'

export const Settings: CollectionConfig = {
  slug: 'settings',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Welkom bij Berben & Bouman',
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          defaultValue: 'Uw tandartspraktijk voor complete mondzorg',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'importantAnnouncement',
      type: 'group',
      admin: {
        description: 'Important announcement to display at the top of the homepage',
      },
      fields: [
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Enable or disable the announcement',
          },
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Title of the announcement (e.g., "BELANGRIJK !!")',
          },
        },
        {
          name: 'content',
          type: 'textarea',
          admin: {
            description: 'Content of the announcement',
          },
        },
        {
          name: 'backgroundColor',
          type: 'select',
          options: [
            { label: 'Accent (Orange)', value: 'accent' },
            { label: 'Primary (Blue)', value: 'primary' },
            { label: 'Secondary (Teal)', value: 'secondary' },
            { label: 'Warning (Red)', value: 'warning' },
          ],
          defaultValue: 'accent',
          admin: {
            description: 'Background color of the announcement banner',
          },
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      admin: {
        description: 'Social media links for the website',
      },
      fields: [
        {
          name: 'facebook',
          type: 'text',
          admin: {
            description: 'Facebook URL',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          admin: {
            description: 'Instagram URL',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            description: 'LinkedIn URL',
          },
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      admin: {
        description: 'Default SEO settings',
      },
      fields: [
        {
          name: 'defaultTitle',
          type: 'text',
          defaultValue: 'Tandartsenpraktijk Berben & Bouman | Utrecht Terwijde',
        },
        {
          name: 'defaultDescription',
          type: 'textarea',
          defaultValue: 'Tandartsenpraktijk Berben & Bouman staat voor kwaliteit. Wij kiezen ervoor om enkel met de beste materialen te werken in een moderne en goed uitgeruste praktijk.',
        },
        {
          name: 'defaultKeywords',
          type: 'text',
          defaultValue: 'tandarts, Utrecht, Terwijde, Berben, Bouman, tandartspraktijk',
        },
      ],
    },
  ],
}