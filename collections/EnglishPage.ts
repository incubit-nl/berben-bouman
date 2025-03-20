import type { CollectionConfig } from 'payload';

export const EnglishPage: CollectionConfig = {
  slug: 'english-page',
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
      defaultValue: 'Dental Care for English-speaking Patients',
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'Welcome to Berben & Bouman Dental Clinic',
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
                  text: 'At Berben & Bouman, we provide comprehensive dental care for English-speaking patients in Utrecht. Our multilingual team is here to ensure your comfort and understanding throughout your dental journey with us.',
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
      name: 'servicesIntro',
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
                  text: 'We offer a wide range of dental services to meet all your oral health needs:',
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
      name: 'services',
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
          title: 'General Dentistry',
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
                      text: 'Regular check-ups, cleanings, and preventive care to maintain your oral health.',
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
          title: 'Cosmetic Dentistry',
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
                      text: 'Improve your smile with treatments like whitening, veneers, and aesthetic restorations.',
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
          title: 'Restorative Dentistry',
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
                      text: 'Fillings, crowns, bridges, and implants to restore damaged or missing teeth.',
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
          title: 'Dental Hygiene',
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
                      text: 'Professional cleaning and advice for maintaining excellent oral hygiene.',
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
      name: 'insuranceInfo',
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
                  text: 'We work with most Dutch health insurance providers. If you have recently moved to the Netherlands or are unsure about your dental coverage, our staff will be happy to assist you in understanding your benefits.',
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
      name: 'appointmentInfo',
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
                  text: 'To schedule an appointment, you can call our office or use our online booking system. Please arrive 15 minutes before your first appointment to complete the necessary paperwork, or download the forms from our website and bring them completed.',
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
          question: 'Do you accept new patients?',
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
                      text: 'Yes, we are currently accepting new patients and would be happy to welcome you to our practice.',
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
          question: 'How do I register with your practice?',
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
                      text: 'You can register by calling our office, visiting in person, or using our online registration form.',
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
          question: 'What should I bring to my first appointment?',
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
                      text: 'Please bring your ID, insurance information, and any relevant medical history or previous dental records if available.',
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
      name: 'metaDescription',
      type: 'textarea',
      defaultValue: 'English-speaking dental care at Berben & Bouman in Utrecht. Our multilingual team provides comprehensive dental services for international patients.',
    },
  ],
};