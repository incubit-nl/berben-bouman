import type { CollectionConfig } from 'payload';

export const PracticePages: CollectionConfig = {
  slug: 'practice-pages',
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
      defaultValue: 'Over Onze Praktijk',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unieke URL-slug voor deze pagina (bijv. "over-ons")',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Gepubliceerd', value: 'published' },
        { label: 'Concept', value: 'draft' },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'heroTitle',
          type: 'text',
          admin: {
            description: 'Optionele aangepaste titel voor de hero-sectie',
          },
        },
        {
          name: 'heroContent',
          type: 'richText',
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
                      text: 'Welkom bij Tandartsenpraktijk Berben & Bouman. Wij bieden hoogwaardige tandheelkundige zorg in een moderne en vriendelijke omgeving.',
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
      name: 'content',
      type: 'blocks',
      blocks: [
        {
          slug: 'textContent',
          labels: {
            singular: 'Tekstblok',
            plural: 'Tekstblokken',
          },
          fields: [
            {
              name: 'content',
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
                          text: 'Dit is een standaard tekstblok om meer informatie over onze praktijk te delen.',
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
          slug: 'imageWithText',
          labels: {
            singular: 'Afbeelding met Tekst',
            plural: 'Afbeeldingen met Tekst',
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'text',
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
                          text: 'Een beschrijving naast een afbeelding om onze diensten of faciliteiten te highlighten.',
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
              name: 'imagePosition',
              type: 'select',
              options: [
                { label: 'Links', value: 'left' },
                { label: 'Rechts', value: 'right' },
              ],
              defaultValue: 'left',
              required: true,
            },
          ],
        },
        {
          slug: 'teamMember',
          labels: {
            singular: 'Team Lid',
            plural: 'Team Leden',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              defaultValue: 'Jan Berben',
            },
            {
              name: 'role',
              type: 'text',
              required: true,
              defaultValue: 'Tandarts',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'bio',
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
                          text: 'Jan heeft meer dan 15 jaar ervaring in de tandheelkunde en is gespecialiseerd in esthetische behandelingen.',
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
              name: 'specialties',
              type: 'array',
              fields: [
                {
                  name: 'specialty',
                  type: 'text',
                  required: true,
                  defaultValue: 'Esthetische Tandheelkunde',
                },
              ],
              defaultValue: [
                {
                  specialty: 'Esthetische Tandheelkunde',
                },
              ],
            },
          ],
        },
        {
          slug: 'facilityHighlight',
          labels: {
            singular: 'Faciliteit Hoogtepunt',
            plural: 'Faciliteit Hoogtepunten',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Moderne Behandelkamers',
            },
            {
              name: 'description',
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
                          text: 'Onze praktijk beschikt over state-of-the-art behandelkamers voor uw comfort en zorg.',
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
              name: 'images',
              type: 'array',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          defaultValue: 'Over Onze Praktijk | Berben & Bouman',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          defaultValue: 'Ontdek meer over Tandartsenpraktijk Berben & Bouman, onze diensten en ons team in Utrecht.',
        },
      ],
    },
    {
      name: 'showInNavigation',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Schakel in om deze pagina in de zijbalknavigatie te tonen',
      },
    },
    {
      name: 'navigationOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Volgorde in de navigatie (lager = hoger in de lijst)',
      },
    },
  ],
};