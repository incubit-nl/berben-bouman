import type { CollectionConfig } from 'payload'

export const ChildrenPage: CollectionConfig = {
  slug: 'children-page',
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
      defaultValue: 'Tandheelkunde voor Kinderen',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Vertrouwd en met plezier naar de tandarts',
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
              text: 'Bij Berben & Bouman maken we van tandartsbezoeken een leuke ervaring voor kinderen. Onze specialisten zijn getraind om kinderen op hun gemak te stellen en hen te leren goed voor hun gebit te zorgen.'
            }
          ]
        }
      ]
    },
    {
      name: 'ageGroups',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'ageRange',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
      defaultValue: [
        {
          title: 'Baby tandjes',
          ageRange: '0-2 jaar',
          description: [
            {
              children: [
                {
                  text: 'Tips voor de verzorging van het gebit vanaf de eerste tandjes.'
                }
              ]
            }
          ]
        },
        {
          title: 'Melkgebit',
          ageRange: '2-6 jaar',
          description: [
            {
              children: [
                {
                  text: 'Preventieve zorg en de eerste bezoeken aan de tandarts.'
                }
              ]
            }
          ]
        },
        {
          title: 'Wisselen',
          ageRange: '6-12 jaar',
          description: [
            {
              children: [
                {
                  text: 'Begeleiding tijdens de wisselperiode van melkgebit naar blijvend gebit.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'tips',
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
            { label: 'Tooth', value: 'tooth' },
            { label: 'Brush', value: 'brush' },
            { label: 'Food', value: 'food' },
            { label: 'Calendar', value: 'calendar' },
            { label: 'Star', value: 'star' },
          ],
          defaultValue: 'tooth',
        },
      ],
      defaultValue: [
        {
          title: 'Poetsen met plezier',
          description: [
            {
              children: [
                {
                  text: 'Tips om tandenpoetsen leuk te maken voor kinderen.'
                }
              ]
            }
          ],
          icon: 'brush'
        },
        {
          title: 'Gezonde voeding',
          description: [
            {
              children: [
                {
                  text: 'Adviezen over gezonde voeding voor een sterk gebit.'
                }
              ]
            }
          ],
          icon: 'food'
        },
        {
          title: 'Regelmatige controles',
          description: [
            {
              children: [
                {
                  text: 'Waarom controles belangrijk zijn voor de ontwikkeling van het gebit.'
                }
              ]
            }
          ],
          icon: 'calendar'
        }
      ]
    },
    {
      name: 'faq',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
        },
      ],
      defaultValue: [
        {
          question: 'Vanaf welke leeftijd moet mijn kind naar de tandarts?',
          answer: [
            {
              children: [
                {
                  text: 'We adviseren om kinderen vanaf 2 jaar mee te nemen naar de tandarts voor gewenning en een eerste controle.'
                }
              ]
            }
          ]
        },
        {
          question: 'Hoe maak ik tandenpoetsen leuk voor mijn kind?',
          answer: [
            {
              children: [
                {
                  text: 'Maak er een spelletje van, gebruik een timer, poets samen of gebruik een leuke app of lied tijdens het poetsen.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      defaultValue: 'Tandheelkundige zorg voor kinderen bij Berben & Bouman. Ontdek hoe wij kinderen op een prettige manier laten kennismaken met de tandarts.',
    },
  ],
} 