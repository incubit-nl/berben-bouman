import type { CollectionConfig } from 'payload'

export const PracticeInfo: CollectionConfig = {
  slug: 'practice-info',
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
      defaultValue: 'Practice Information',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Bij Berben & Bouman staat uw mondgezondheid voorop. Onze moderne praktijk is uitgerust met de nieuwste technologieën.',
    },
    {
      name: 'openingHours',
      type: 'text',
      required: true,
      defaultValue: 'Ma-Vr: 08:00-17:00',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
      defaultValue: '030 123 4567',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      defaultValue: 'Tandartslaan 1, Utrecht',
    },
  ],
}; 