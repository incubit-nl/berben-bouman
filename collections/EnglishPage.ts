import type { CollectionConfig } from 'payload'

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
      defaultValue: [
        {
          children: [
            {
              text: 'At Berben & Bouman, we provide comprehensive dental care for English-speaking patients in Utrecht. Our multilingual team is here to ensure your comfort and understanding throughout your dental journey with us.'
            }
          ]
        }
      ]
    },
    {
      name: 'servicesIntro',
      type: 'richText',
      defaultValue: [
        {
          children: [
            {
              text: 'We offer a wide range of dental services to meet all your oral health needs:'
            }
          ]
        }
      ]
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
          description: [
            {
              children: [
                {
                  text: 'Regular check-ups, cleanings, and preventive care to maintain your oral health.'
                }
              ]
            }
          ]
        },
        {
          title: 'Cosmetic Dentistry',
          description: [
            {
              children: [
                {
                  text: 'Improve your smile with treatments like whitening, veneers, and aesthetic restorations.'
                }
              ]
            }
          ]
        },
        {
          title: 'Restorative Dentistry',
          description: [
            {
              children: [
                {
                  text: 'Fillings, crowns, bridges, and implants to restore damaged or missing teeth.'
                }
              ]
            }
          ]
        },
        {
          title: 'Dental Hygiene',
          description: [
            {
              children: [
                {
                  text: 'Professional cleaning and advice for maintaining excellent oral hygiene.'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'insuranceInfo',
      type: 'richText',
      defaultValue: [
        {
          children: [
            {
              text: 'We work with most Dutch health insurance providers. If you have recently moved to the Netherlands or are unsure about your dental coverage, our staff will be happy to assist you in understanding your benefits.'
            }
          ]
        }
      ]
    },
    {
      name: 'appointmentInfo',
      type: 'richText',
      defaultValue: [
        {
          children: [
            {
              text: 'To schedule an appointment, you can call our office or use our online booking system. Please arrive 15 minutes before your first appointment to complete the necessary paperwork, or download the forms from our website and bring them completed.'
            }
          ]
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
          question: 'Do you accept new patients?',
          answer: [
            {
              children: [
                {
                  text: 'Yes, we are currently accepting new patients and would be happy to welcome you to our practice.'
                }
              ]
            }
          ]
        },
        {
          question: 'How do I register with your practice?',
          answer: [
            {
              children: [
                {
                  text: 'You can register by calling our office, visiting in person, or using our online registration form.'
                }
              ]
            }
          ]
        },
        {
          question: 'What should I bring to my first appointment?',
          answer: [
            {
              children: [
                {
                  text: 'Please bring your ID, insurance information, and any relevant medical history or previous dental records if available.'
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
      defaultValue: 'English-speaking dental care at Berben & Bouman in Utrecht. Our multilingual team provides comprehensive dental services for international patients.',
    },
  ],
} 