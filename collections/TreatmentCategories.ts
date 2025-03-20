import { CollectionConfig } from 'payload';

export const TreatmentCategories: CollectionConfig = {
  slug: 'treatment-categories',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'value', 'displayOrder'],
    group: 'Settings',
    description: 'Manage categories for dental treatments. These categories can be assigned to treatments.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'value',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique identifier (e.g., "preventie")',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Display name (e.g., "Preventie")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description of this category of treatments',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Order in which to display this category (lower numbers appear first)',
      },
    },
  ],
};