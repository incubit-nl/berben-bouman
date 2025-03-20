import { getPayloadClient } from './lib/payload';

const defaultCategories = [
  {
    value: 'preventie',
    label: 'Preventie',
    description: 'Voorkomen is beter dan genezen. Onze preventieve behandelingen helpen problemen te voorkomen voordat ze ontstaan.',
    displayOrder: 0,
  },
  {
    value: 'diagnostiek',
    label: 'Diagnostiek',
    description: 'Nauwkeurige diagnose is essentieel voor een effectieve behandeling. Onze diagnostische diensten helpen problemen vroegtijdig op te sporen.',
    displayOrder: 1,
  },
  {
    value: 'restauratief',
    label: 'Restauratief',
    description: 'Onze restauratieve behandelingen herstellen de functie en esthetiek van beschadigde tanden.',
    displayOrder: 2,
  },
  {
    value: 'endodontologie',
    label: 'Endodontologie',
    description: 'Behandelingen gericht op het behoud van tanden met beschadigde of ontstoken pulpa (tandzenuw).',
    displayOrder: 3,
  },
  {
    value: 'prothetiek',
    label: 'Prothetiek',
    description: 'Vervanging van ontbrekende tanden met uitneembare of vaste prothesen.',
    displayOrder: 4,
  },
  {
    value: 'implantologie',
    label: 'Implantologie',
    description: 'Permanente vervanging van ontbrekende tanden met tandimplantaten.',
    displayOrder: 5,
  },
  {
    value: 'orthodontie',
    label: 'Orthodontie',
    description: 'Correctie van de stand van tanden en kiezen voor een mooier en gezonder gebit.',
    displayOrder: 6,
  },
  {
    value: 'overig',
    label: 'Overig',
    description: 'Diverse andere tandheelkundige behandelingen die we aanbieden.',
    displayOrder: 7,
  },
];

async function seedTreatmentCategories() {
  const payload = await getPayloadClient();

  // Check if categories already exist
  const existingCategories = await payload.find({
    collection: 'treatment-categories',
    pagination: false,
  });

  if (existingCategories.totalDocs === 0) {
    console.log('Seeding default treatment categories...');
    for (const category of defaultCategories) {
      await payload.create({
        collection: 'treatment-categories',
        data: category,
      });
    }
    console.log('Seeding completed!');
  } else {
    console.log('Treatment categories already exist, skipping seeding.');
  }
}

seedTreatmentCategories().catch(console.error);