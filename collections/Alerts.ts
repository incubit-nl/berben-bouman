import type { CollectionConfig } from 'payload'

export const Alerts: CollectionConfig = {
  slug: 'alerts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isActive', 'alertType', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal name for this alert (not displayed to users)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Toggle to show or hide this alert',
        position: 'sidebar',
      },
    },
    {
      name: 'alertType',
      type: 'select',
      required: true,
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Success', value: 'success' },
      ],
      defaultValue: 'warning',
      admin: {
        description: 'Type of alert which determines the color scheme',
        position: 'sidebar',
      }
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Alert message content',
      },
    },
    {
      name: 'position',
      type: 'select',
      options: [
        { label: 'Top of Page (Global)', value: 'global' },
        { label: 'Home Page Only', value: 'home' },
      ],
      defaultValue: 'global',
      admin: {
        description: 'Where this alert should appear',
        position: 'sidebar',
      },
    },
    {
      name: 'dismissible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Allow users to dismiss this alert',
        position: 'sidebar',
      },
    },
    {
      name: 'expiresAt',
      type: 'date',
      admin: {
        description: 'Optional: Date when this alert should automatically deactivate',
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
} 