import { CollectionConfig, Field } from 'payload';

// Define menu item fields as a reusable configuration
const menuItemFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
    label: 'Label',
  },
  {
    name: 'href',
    type: 'text',
    required: true,
    label: 'Link (URL)',
    admin: {
      description: 'Path or URL (e.g., /about, https://example.com)',
    },
  },
  {
    name: 'icon',
    type: 'select',
    label: 'Icon',
    options: [
      { label: 'None', value: '' },
      { label: 'User', value: 'User' },
      { label: 'Calendar', value: 'Calendar' },
      { label: 'Info', value: 'Info' },
      { label: 'Mail', value: 'Mail' },
      { label: 'Book', value: 'Book' },
      { label: 'Heart', value: 'Heart' },
      { label: 'Home', value: 'Home' },
    ],
    defaultValue: '',
    admin: {
      description: 'Optional icon to display with the menu item',
    },
  },
  {
    name: 'isExternal',
    type: 'checkbox',
    label: 'Open in new tab',
    defaultValue: false,
  },
  {
    name: 'order',
    type: 'number',
    label: 'Order',
    admin: {
      description: 'Lower numbers appear first',
    },
  },
];

export const Navigation: CollectionConfig = {
  slug: 'navigation',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'Manage the site navigation menus',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Menu Title',
    },
    {
      name: 'location',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Main Navigation',
          value: 'main',
        },
        {
          label: 'Footer Navigation',
          value: 'footer',
        },
      ],
      defaultValue: 'main',
      admin: {
        description: 'Select where this menu should appear',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Menu Items',
      fields: [
        ...menuItemFields,
        {
          name: 'children',
          type: 'array',
          label: 'Submenu Items',
          admin: {
            description: 'Add child menu items to create a dropdown',
          },
          fields: menuItemFields,
        },
      ],
    },
  ],
};

export default Navigation; 