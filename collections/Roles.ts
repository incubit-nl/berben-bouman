import { CollectionConfig } from 'payload'

export const Roles: CollectionConfig = {
  slug: 'roles',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'displayOrder', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Naam',
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      label: 'Beschrijving',
      admin: {
        description: 'Optionele beschrijving van deze rol',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      label: 'Weergavevolgorde',
      admin: {
        description: 'Volgorde waarin de rol wordt getoond (lager = eerder)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Actief',
      admin: {
        description: 'Is deze rol momenteel beschikbaar voor teamleden?',
      },
    },
  ],
} 