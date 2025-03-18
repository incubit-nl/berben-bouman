import { GlobalConfig } from 'payload';

// Default categories to use if none exist
const defaultCategories = [
  {
    value: 'preventie',
    label: 'Preventie',
    description: 'Voorkomen is beter dan genezen. Onze preventieve behandelingen helpen problemen te voorkomen voordat ze ontstaan.',
    displayOrder: 0,
  },
  {
    value: 'diagnostiek',
    label: 'Diagnostiek',
    description: 'Nauwkeurige diagnose is essentieel voor een effectieve behandeling. Onze diagnostische diensten helpen problemen vroegtijdig op te sporen.',
    displayOrder: 1,
  },
  {
    value: 'restauratief',
    label: 'Restauratief',
    description: 'Onze restauratieve behandelingen herstellen de functie en esthetiek van beschadigde tanden.',
    displayOrder: 2,
  },
  {
    value: 'endodontologie',
    label: 'Endodontologie',
    description: 'Behandelingen gericht op het behoud van tanden met beschadigde of ontstoken pulpa (tandzenuw).',
    displayOrder: 3,
  },
  {
    value: 'prothetiek',
    label: 'Prothetiek',
    description: 'Vervanging van ontbrekende tanden met uitneembare of vaste prothesen.',
    displayOrder: 4,
  },
  {
    value: 'implantologie',
    label: 'Implantologie',
    description: 'Permanente vervanging van ontbrekende tanden met tandimplantaten.',
    displayOrder: 5,
  },
  {
    value: 'orthodontie',
    label: 'Orthodontie',
    description: 'Correctie van de stand van tanden en kiezen voor een mooier en gezonder gebit.',
    displayOrder: 6,
  },
  {
    value: 'overig',
    label: 'Overig',
    description: 'Diverse andere tandheelkundige behandelingen die we aanbieden.',
    displayOrder: 7,
  },
];

export const TreatmentCategories: GlobalConfig = {
  slug: 'treatment-categories',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
    description: 'Manage categories for dental treatments. Note: After making changes, you need to restart the server for the changes to be reflected in the treatment editor.',
  },
  hooks: {
    beforeChange: [
      async ({ data }) => {
        // If there are no categories yet, populate with defaults
        if (!data.categories || data.categories.length === 0) {
          return {
            ...data,
            categories: defaultCategories,
          };
        }
        return data;
      }
    ],
  },
  fields: [
    {
      name: 'categories',
      type: 'array',
      required: true,
      admin: {
        description: 'Define the categories available for dental treatments',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
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
    },
  ],
}; 