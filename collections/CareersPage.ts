import type { CollectionConfig } from 'payload'

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
      defaultValue: [
        {
          children: [
            {
              text: 'Bij Berben & Bouman werken we samen aan de beste tandheelkundige zorg in een prettige en professionele omgeving. We zijn altijd op zoek naar getalenteerde en gemotiveerde professionals die ons team willen versterken.'
            }
          ]
        }
      ]
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
          description: [
            {
              children: [
                {
                  text: 'Wij stellen de patiënt centraal in alles wat we doen.'
                }
              ]
            }
          ],
          icon: 'heart'
        },
        {
          title: 'Professionaliteit',
          description: [
            {
              children: [
                {
                  text: 'We werken volgens de hoogste standaarden van kwaliteit en expertise.'
                }
              ]
            }
          ],
          icon: 'trophy'
        },
        {
          title: 'Teamwork',
          description: [
            {
              children: [
                {
                  text: 'Samen bereiken we meer en creëren we een prettige werksfeer.'
                }
              ]
            }
          ],
          icon: 'users'
        }
      ]
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
          description: [
            {
              children: [
                {
                  text: 'Werken met de nieuwste apparatuur en technieken in een moderne omgeving.'
                }
              ]
            }
          ]
        },
        {
          title: 'Persoonlijke ontwikkeling',
          description: [
            {
              children: [
                {
                  text: 'Mogelijkheden voor bijscholing en specialisatie.'
                }
              ]
            }
          ]
        },
        {
          title: 'Flexibele werktijden',
          description: [
            {
              children: [
                {
                  text: 'Een goede balans tussen werk en privé is belangrijk voor ons.'
                }
              ]
            }
          ]
        }
      ]
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
          description: [
            {
              children: [
                {
                  text: 'We zijn op zoek naar een enthousiaste tandarts om ons team te versterken.'
                }
              ]
            }
          ],
          isActive: true,
          hours: '24-36 uur per week'
        },
        {
          title: 'Mondhygiënist',
          description: [
            {
              children: [
                {
                  text: 'Voor onze groeiende praktijk zoeken we een ervaren mondhygiënist.'
                }
              ]
            }
          ],
          isActive: true,
          hours: '16-24 uur per week'
        }
      ]
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
      ]
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      defaultValue: 'Werken bij Berben & Bouman tandartspraktijk in Utrecht. Bekijk onze vacatures en solliciteer direct. Word onderdeel van ons professionele team!',
    },
  ],
} 