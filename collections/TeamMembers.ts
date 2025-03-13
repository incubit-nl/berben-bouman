import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'updatedAt'],
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
      admin: {
        description: 'This is the URL-friendly identifier for the team member',
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      admin: {
        description: 'Job title or role (e.g., "Tandarts", "Mondhygiënist")',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'bio',
      type: 'richText',
      required: true,
    },
    {
      name: 'specializations',
      type: 'array',
      fields: [
        {
          name: 'specialization',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        description: 'Areas of specialization or expertise',
      },
    },
    {
      name: 'education',
      type: 'array',
      fields: [
        {
          name: 'degree',
          type: 'text',
          required: true,
        },
        {
          name: 'institution',
          type: 'text',
          required: true,
        },
        {
          name: 'year',
          type: 'text',
        },
      ],
    },
    {
      name: 'workDays',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Maandag', value: 'monday' },
        { label: 'Dinsdag', value: 'tuesday' },
        { label: 'Woensdag', value: 'wednesday' },
        { label: 'Donderdag', value: 'thursday' },
        { label: 'Vrijdag', value: 'friday' },
      ],
      admin: {
        description: 'Days when this team member is available at the practice',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      admin: {
        description: 'Order in which to display this team member (lower numbers appear first)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Is this team member currently active?',
      },
    },
  ],
} 