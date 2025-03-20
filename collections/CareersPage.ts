import type { CollectionConfig } from 'payload';

export const CareersPage: CollectionConfig = {
  slug: 'careers-page',
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
      defaultValue: 'Werken bij Berben & Bouman',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Word onderdeel van ons team',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'intro',
      type: 'richText',
      required: true,
      defaultValue: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Bij Berben & Bouman werken we samen aan de beste tandheelkundige zorg in een prettige en professionele omgeving. We zijn altijd op zoek naar getalenteerde en gemotiveerde professionals die ons team willen versterken.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  version: 1,
                },
              ],
            },
          ],
          direction: 'ltr',
        },
      },
    },
    {
      name: 'teamValues',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Heart', value: 'heart' },
            { label: 'Star', value: 'star' },
            { label: 'Trophy', value: 'trophy' },
            { label: 'Users', value: 'users' },
            { label: 'Lightbulb', value: 'lightbulb' },
          ],
          defaultValue: 'star',
        },
      ],
      defaultValue: [
        {
          title: 'Patiëntgerichte zorg',
          description: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Wij stellen de patiënt centraal in alles wat we doen.',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
              ],
              direction: 'ltr',
            },
          },
          icon: 'heart',
        },
        {
          title: 'Professionaliteit',
          description: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'We werken volgens de hoogste standaarden van kwaliteit en expertise.',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
              ],
              direction: 'ltr',
            },
          },
          icon: 'trophy',
        },
        {
          title: 'Teamwork',
          description: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Samen bereiken we meer en creëren we een prettige werksfeer.',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
              ],
              direction: 'ltr',
            },
          },
          icon: 'users',
        },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
      ],
      defaultValue: [
        {
          title: 'Moderne praktijk',
          description: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Werken met de nieuwste apparatuur en technieken in een moderne omgeving.',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
              ],
              direction: 'ltr',
            },
          },
        },
        {
          title: 'Persoonlijke ontwikkeling',
          description: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Mogelijkheden voor bijscholing en specialisatie.',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
              ],
              direction: 'ltr',
            },
          },
        },
        {
          title: 'Flexibele werktijden',
          description: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Een goede balans tussen werk en privé is belangrijk voor ons.',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
              ],
              direction: 'ltr',
            },
          },
        },
      ],
    },
    {
      name: 'vacancies',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
        {
          name: 'isActive',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'hours',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        {
          title: 'Tandarts',
          description: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'We zijn op zoek naar een enthousiaste tandarts om ons team te versterken.',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
              ],
              direction: 'ltr',
            },
          },
          isActive: true,
          hours: '24-36 uur per week',
        },
        {
          title: 'Mondhygiënist',
          description: {
            root: {
              type: 'root',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'paragraph',
                  format: '',
                  version: 1,
                  children: [
                    {
                      type: 'text',
                      text: 'Voor onze groeiende praktijk zoeken we een ervaren mondhygiënist.',
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                },
              ],
              direction: 'ltr',
            },
          },
          isActive: true,
          hours: '16-24 uur per week',
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'vacatures@berbenbouman.nl',
        },
        {
          name: 'phone',
          type: 'text',
          defaultValue: '030 123 4567',
        },
        {
          name: 'contactPerson',
          type: 'text',
          defaultValue: 'Mevr. J. Berben',
        },
      ],
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      defaultValue: 'Werken bij Berben & Bouman tandartspraktijk in Utrecht. Bekijk onze vacatures en solliciteer direct. Word onderdeel van ons professionele team!',
    },
  ],
};