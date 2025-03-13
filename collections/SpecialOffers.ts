import type { CollectionConfig } from 'payload'

export const SpecialOffers: CollectionConfig = {
  slug: 'special-offers',
  admin: {
    useAsTitle: 'title',
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
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
    },
    {
      name: 'backgroundColor',
      type: 'text',
      defaultValue: '#f3f4f6', // Light gray default
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'originalPrice',
      type: 'number',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Enable or disable this special offer',
      },
    },
  ],
} 