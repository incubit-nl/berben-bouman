import type { CollectionConfig } from 'payload'

export const Pricing: CollectionConfig = {
  slug: 'pricing',
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
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'A detailed description of what this pricing plan includes',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'period',
      type: 'select',
      options: [
        { label: 'Per Month', value: 'per_month' },
        { label: 'Per Year', value: 'per_year' },
        { label: 'One Time', value: 'one_time' },
      ],
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'highlight',
      type: 'checkbox',
      defaultValue: false,
      label: 'Highlight this plan',
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Used to control the order of pricing plans',
      },
    },
  ],
}