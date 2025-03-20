import type { CollectionConfig } from 'payload';

export const FAQ: CollectionConfig = {
  slug: 'faq',
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
      defaultValue: 'Veelgestelde Vragen over Tandheelkunde',
    },
    {
      name: 'faqItems',
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
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Algemene Tandheelkunde', value: 'general' },
            { label: 'Behandelingen', value: 'treatments' },
            { label: 'Verzekering & Kosten', value: 'insurance' },
            { label: 'Praktijk & Afspraak', value: 'practice' },
          ],
          required: true,
        },
        {
          name: 'homepage',
          type: 'checkbox',
          label: 'Toon op Homepage',
          defaultValue: false,
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
        },
      ],
      defaultValue: [
        {
          question: 'Hoe vaak moet ik naar de tandarts?',
          answer: {
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
                      text: 'Wij adviseren om twee keer per jaar een controleafspraak te maken, zodat we uw gebit goed in de gaten kunnen houden en eventuele problemen vroegtijdig kunnen aanpakken.',
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
          category: 'general',
          homepage: true,
          order: 1,
        },
        {
          question: 'Wat moet ik doen bij tandpijn?',
          answer: {
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
                      text: 'Bij acute tandpijn kunt u het beste zo snel mogelijk contact met ons opnemen. Bel onze praktijk op 030 123 4567 voor een spoedafspraak. Tot die tijd kunt u proberen de pijn te verlichten met een pijnstiller zoals paracetamol.',
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
          category: 'treatments',
          homepage: false,
          order: 2,
        },
        {
          question: 'Wordt mijn behandeling vergoed door de verzekering?',
          answer: {
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
                      text: 'Dit hangt af van uw verzekeringspolis. Basisbehandelingen zoals controles en eenvoudige vullingen worden vaak (deels) vergoed, maar voor uitgebreidere behandelingen zoals kronen of orthodontie heeft u mogelijk een aanvullende verzekering nodig. Neem contact met ons op, dan helpen wij u dit uit te zoeken!',
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
          category: 'insurance',
          homepage: true,
          order: 3,
        },
        {
          question: 'Hoe maak ik een afspraak?',
          answer: {
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
                      text: 'U kunt een afspraak maken door te bellen naar 030 123 4567 of via onze online afsprakenmodule op de website. Voor uw eerste bezoek vragen we u 15 minuten eerder te komen om de registratie te voltooien.',
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
          category: 'practice',
          homepage: true,
          order: 4,
        },
        {
          question: 'Wat kost een tandartscontrole?',
          answer: {
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
                      text: 'De kosten voor een standaardcontrole liggen rond de €23-€25, afhankelijk van de tarieven die jaarlijks door de Nederlandse Zorgautoriteit (NZa) worden vastgesteld. Voor een exacte prijs en eventuele aanvullende behandelingen kunt u contact met ons opnemen.',
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
          category: 'insurance',
          homepage: false,
          order: 5,
        },
        {
          question: 'Kan ik mijn tanden laten bleken bij jullie?',
          answer: {
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
                      text: 'Ja, wij bieden professionele tandenbleekbehandelingen aan. Tijdens een consult bespreken we uw wensen en controleren we of uw gebit geschikt is voor bleken. Maak een afspraak voor meer informatie!',
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
          category: 'treatments',
          homepage: false,
          order: 6,
        },
        {
          question: 'Wat moet ik meenemen naar mijn eerste afspraak?',
          answer: {
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
                      text: 'Breng uw identiteitsbewijs, verzekeringspas en eventuele eerdere tandartsgegevens mee. Als u medicijnen gebruikt, laat ons dat ook weten.',
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
          category: 'practice',
          homepage: false,
          order: 7,
        },
        {
          question: 'Behandelen jullie ook kinderen?',
          answer: {
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
                      text: 'Ja, wij zijn gespecialiseerd in kindertandheelkunde. Onze tandartsen maken het bezoek leuk en stressvrij voor kinderen. We raden aan om kinderen vanaf 2 jaar mee te nemen voor hun eerste controle.',
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
          category: 'general',
          homepage: true,
          order: 8,
        },
      ],
    },
  ],
};