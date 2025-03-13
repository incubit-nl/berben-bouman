import type { CollectionConfig } from 'payload'

export const ContactInfo: CollectionConfig = {
  slug: 'contact-info',
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
      defaultValue: 'Contact Information',
      admin: {
        description: 'This is just a label for the CMS and won\'t be displayed on the website.',
      },
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
          required: true,
          defaultValue: 'Louis Armstronglaan 1',
        },
        {
          name: 'postalCode',
          type: 'text',
          required: true,
          defaultValue: '3543 EB',
        },
        {
          name: 'city',
          type: 'text',
          required: true,
          defaultValue: 'Utrecht',
        },
        {
          name: 'area',
          type: 'text',
          defaultValue: 'Terwijde',
        },
      ],
    },
    {
      name: 'contactDetails',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          defaultValue: '+31 30 670 12 21',
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'info@berben-bouman.nl',
        },
        {
          name: 'kvkNumber',
          type: 'text',
          defaultValue: '64645975',
        },
        {
          name: 'agbCode',
          type: 'text',
          defaultValue: '12099029',
        },
      ],
    },
    {
      name: 'openingHours',
      type: 'array',
      fields: [
        {
          name: 'day',
          type: 'select',
          options: [
            { label: 'Maandag', value: 'monday' },
            { label: 'Dinsdag', value: 'tuesday' },
            { label: 'Woensdag', value: 'wednesday' },
            { label: 'Donderdag', value: 'thursday' },
            { label: 'Vrijdag', value: 'friday' },
            { label: 'Zaterdag', value: 'saturday' },
            { label: 'Zondag', value: 'sunday' },
          ],
          required: true,
        },
        {
          name: 'openTime',
          type: 'text',
          required: true,
          admin: {
            description: 'Format: HH:MM (e.g., 08:00)',
          },
        },
        {
          name: 'closeTime',
          type: 'text',
          required: true,
          admin: {
            description: 'Format: HH:MM (e.g., 17:00)',
          },
        },
        {
          name: 'isClosed',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'receptionHours',
      type: 'array',
      fields: [
        {
          name: 'day',
          type: 'select',
          options: [
            { label: 'Maandag', value: 'monday' },
            { label: 'Dinsdag', value: 'tuesday' },
            { label: 'Woensdag', value: 'wednesday' },
            { label: 'Donderdag', value: 'thursday' },
            { label: 'Vrijdag', value: 'friday' },
            { label: 'Zaterdag', value: 'saturday' },
            { label: 'Zondag', value: 'sunday' },
          ],
          required: true,
        },
        {
          name: 'morningOpen',
          type: 'text',
          admin: {
            description: 'Format: HH:MM (e.g., 08:30)',
          },
        },
        {
          name: 'morningClose',
          type: 'text',
          admin: {
            description: 'Format: HH:MM (e.g., 12:00)',
          },
        },
        {
          name: 'afternoonOpen',
          type: 'text',
          admin: {
            description: 'Format: HH:MM (e.g., 13:00)',
          },
        },
        {
          name: 'afternoonClose',
          type: 'text',
          admin: {
            description: 'Format: HH:MM (e.g., 16:30)',
          },
        },
        {
          name: 'isClosed',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'emergencyInfo',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+31 30 670 12 21',
        },
        {
          name: 'alternatePhone',
          type: 'text',
          defaultValue: '0900 - 8602',
        },
        {
          name: 'instructions',
          type: 'richText',
        },
      ],
    },
    {
      name: 'closedDays',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Name of the holiday or closed day (e.g., "Goedevrijdag")',
          },
        },
        {
          name: 'date',
          type: 'text',
          required: true,
          admin: {
            description: 'Format: DD-MM-YYYY or description (e.g., "18-04-2025" or "Vrijdag 18 april 2025")',
          },
        },
      ],
    },
    {
      name: 'mapEmbed',
      type: 'textarea',
      admin: {
        description: 'Google Maps or other map embed code',
      },
    },
  ],
  timestamps: true,
} 