import { CollectionConfig, CollectionSlug } from 'payload'
import { Roles } from './Roles'

// Default roles
const defaultRoles = [
  { label: 'Tandarts', value: 'Tandarts' },
  { label: 'Mondhygiënist', value: 'Mondhygiënist' },
  { label: 'Assistent', value: 'Assistent' },
  { label: 'Receptionist', value: 'Receptionist' },
]

const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
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
      label: 'Naam',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-vriendelijke identifier voor het teamlid (bijv. "wouter-bouman")',
      },
    },
    {
      name: 'role',
      type: 'relationship',
      required: true,
      label: 'Functie',
      relationTo: 'roles' as CollectionSlug,
      hasMany: false,
      admin: {
        description: 'Kies een rol uit de beschikbare opties.',
      },
    },
    {
      name: 'bigNummer',
      type: 'text',
      required: false,
      label: 'BIG-nummer',
      admin: {
        description: 'BIG-registratienummer (optioneel, alleen voor tandartsen en mondhygiënisten)',
      },
    },
    {
      name: 'specialties',
      type: 'array',
      label: 'Specialisaties',
      required: false,
      fields: [
        {
          name: 'specialty',
          type: 'text',
          label: 'Specialisatie',
          required: true,
        },
      ],
      admin: {
        description: 'Voeg een of meerdere specialisaties toe (bijv. orthodontie, implantologie)',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      required: true,
      label: 'Biografie',
      admin: {
        description: 'Vertel iets over dit teamlid: achtergrond, passies, ervaring, etc.',
      },
    },
    {
      name: 'education',
      type: 'text',
      required: false,
      label: 'Opleiding',
      admin: {
        description: 'Bijv. "Tandartsopleiding, Radboud Universiteit Nijmegen (2006)"',
      },
    },
    {
      name: 'workdays',
      type: 'array',
      required: false,
      label: 'Werkdagen',
      fields: [
        {
          name: 'day',
          type: 'select',
          label: 'Dag',
          required: true,
          options: [
            { label: 'Maandag', value: 'Maandag' },
            { label: 'Dinsdag', value: 'Dinsdag' },
            { label: 'Woensdag', value: 'Woensdag' },
            { label: 'Donderdag', value: 'Donderdag' },
            { label: 'Vrijdag', value: 'Vrijdag' },
            { label: 'Zaterdag', value: 'Zaterdag' },
            { label: 'Zondag', value: 'Zondag' },
          ],
        },
        {
          name: 'hours',
          type: 'text',
          label: 'Werktijden',
          required: false,
          defaultValue: '08:00 - 17:00',
          admin: {
            description: 'Bijv. "08:00 - 17:00" of "ochtend"',
          },
        },
      ],
      admin: {
        description: 'Voeg de werkdagen en tijden van dit teamlid toe.',
      },
    },
    {
      name: 'externalLink',
      type: 'group',
      label: 'Externe link',
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          defaultValue: 'Meer informatie',
          admin: {
            description: 'De tekst die wordt getoond (bijv. "Bezoek African Dental Aid")',
          },
        },
      ],
      admin: {
        description: 'Optionele link naar een externe site (bijv. stichting of portfolio)',
      },
    },
    {
      name: 'languages',
      type: 'array',
      required: false,
      label: 'Talen',
      fields: [
        {
          name: 'language',
          type: 'text',
          required: true,
          label: 'Taal',
        },
      ],
      admin: {
        description: 'Talen die het teamlid spreekt (bijv. Nederlands, Engels)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Foto',
    },
    {
      name: 'email',
      type: 'email',
      required: false,
      label: 'E-mailadres',
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      label: 'Weergavevolgorde',
      admin: {
        description: 'Volgorde waarin het teamlid wordt getoond (lager = eerder)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Concept', value: 'draft' },
        { label: 'Gepubliceerd', value: 'published' },
      ],
      label: 'Status',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Actief',
      admin: {
        description: 'Is dit teamlid momenteel actief in de praktijk?',
      },
    },
  ],
}

export default TeamMembers