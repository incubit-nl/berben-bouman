import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Behandelingen',
  description: 'Overzicht van alle tandheelkundige behandelingen bij Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde.',
};

// Mock data for treatments
const treatments = [
  {
    id: 'intake-afspraak',
    title: 'Intake afspraak',
    description: 'Een eerste kennismaking met onze praktijk en een uitgebreid onderzoek van uw gebit.',
    category: 'diagnostiek',
    image: '/images/treatments/intake.jpg',
  },
  {
    id: 'periodieke-controle',
    title: 'Periodieke controle',
    description: 'Regelmatige controle van uw gebit om problemen vroegtijdig op te sporen en te behandelen.',
    category: 'preventie',
    image: '/images/treatments/checkup.jpg',
  },
  {
    id: 'rontgenfoto',
    title: 'Röntgenfoto\'s',
    description: 'Röntgenfoto\'s geven ons inzicht in de delen van uw gebit die niet met het blote oog zichtbaar zijn.',
    category: 'diagnostiek',
    image: '/images/treatments/xray.jpg',
  },
  {
    id: 'vullingen',
    title: 'Vullingen',
    description: 'Het herstellen van aangetaste delen van uw gebit met hoogwaardige vulmaterialen.',
    category: 'restauratief',
    image: '/images/treatments/fillings.jpg',
  },
  {
    id: 'kronen-en-bruggen',
    title: 'Kronen en Bruggen',
    description: 'Herstel van zwaar beschadigde tanden of het vervangen van ontbrekende tanden.',
    category: 'restauratief',
    image: '/images/treatments/crowns.jpg',
  },
  {
    id: 'wortelkanaalbehandeling',
    title: 'Wortelkanaalbehandeling',
    description: 'Behandeling van ontstoken tandzenuw of wortelpunt om de tand te behouden.',
    category: 'endodontologie',
    image: '/images/treatments/root-canal.jpg',
  },
  {
    id: 'volledige-prothese',
    title: 'Volledige prothese',
    description: 'Een uitneembare vervanging voor een volledig ontbrekend gebit.',
    category: 'prothetiek',
    image: '/images/treatments/dentures.jpg',
  },
  {
    id: 'gedeeltelijke-prothese',
    title: 'Gedeeltelijke prothese',
    description: 'Een uitneembare vervanging voor enkele ontbrekende tanden.',
    category: 'prothetiek',
    image: '/images/treatments/partial-dentures.jpg',
  },
  {
    id: 'implantaten',
    title: 'Implantaten',
    description: 'Een permanente oplossing voor het vervangen van ontbrekende tanden.',
    category: 'implantologie',
    image: '/images/treatments/implants.jpg',
  },
  {
    id: 'orthodontie',
    title: 'Orthodontie',
    description: 'Behandelingen voor het corrigeren van de stand van tanden en kiezen.',
    category: 'orthodontie',
    image: '/images/treatments/orthodontics.jpg',
  },
  {
    id: 'gebitsreiniging',
    title: 'Gebitsreiniging',
    description: 'Professionele reiniging van uw gebit om tandplak en tandsteen te verwijderen.',
    category: 'preventie',
    image: '/images/treatments/cleaning.jpg',
  },
];

// Group treatments by category
const categories = {
  preventie: {
    title: 'Preventie',
    description: 'Voorkomen is beter dan genezen. Onze preventieve behandelingen helpen problemen te voorkomen voordat ze ontstaan.',
  },
  diagnostiek: {
    title: 'Diagnostiek',
    description: 'Nauwkeurige diagnose is essentieel voor een effectieve behandeling. Onze diagnostische diensten helpen problemen vroegtijdig op te sporen.',
  },
  restauratief: {
    title: 'Restauratief',
    description: 'Onze restauratieve behandelingen herstellen de functie en esthetiek van beschadigde tanden.',
  },
  endodontologie: {
    title: 'Endodontologie',
    description: 'Behandelingen gericht op het behoud van tanden met beschadigde of ontstoken pulpa (tandzenuw).',
  },
  prothetiek: {
    title: 'Prothetiek',
    description: 'Vervanging van ontbrekende tanden met uitneembare of vaste prothesen.',
  },
  implantologie: {
    title: 'Implantologie',
    description: 'Permanente vervanging van ontbrekende tanden met tandimplantaten.',
  },
  orthodontie: {
    title: 'Orthodontie',
    description: 'Correctie van de stand van tanden en kiezen voor een mooier en gezonder gebit.',
  },
};

export default function TreatmentsPage() {
  // Group treatments by category
  const treatmentsByCategory = treatments.reduce((acc, treatment) => {
    if (!acc[treatment.category]) {
      acc[treatment.category] = [];
    }
    acc[treatment.category].push(treatment);
    return acc;
  }, {} as Record<string, typeof treatments>);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/images/treatments-hero.jpg" 
            alt="Tandheelkundige behandelingen" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-accent-50">
              Behandelingen
            </h1>
            <p className="text-lg md:text-xl mb-0 text-white/90">
              Hoogwaardige tandheelkundige zorg voor het hele gezin
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
              Onze tandheelkundige behandelingen
            </h2>
            <p className="text-lg text-neutral-700 mb-0">
              Bij Tandartsenpraktijk Berben & Bouman bieden wij een breed scala aan tandheelkundige behandelingen. Van preventieve zorg tot complexe restauratieve behandelingen, wij staan klaar om u de best mogelijke zorg te bieden. Hieronder vindt u een overzicht van onze behandelingen.
            </p>
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      {Object.entries(categories).map(([categoryId, category]) => {
        const categoryTreatments = treatmentsByCategory[categoryId] || [];
        if (categoryTreatments.length === 0) return null;
        
        return (
          <section key={categoryId} className="py-12 border-t border-neutral-200">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-primary-900">
                  {category.title}
                </h2>
                <p className="text-lg text-neutral-700">
                  {category.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryTreatments.map((treatment) => (
                  <Link 
                    key={treatment.id}
                    href={`/behandelingen/${treatment.id}`}
                    className="group bg-white rounded-lg overflow-hidden border border-neutral-200 hover:border-primary-200 hover:shadow-md transition-all"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={treatment.image} 
                        alt={treatment.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-primary-900 group-hover:text-primary-600 transition-colors">
                        {treatment.title}
                      </h3>
                      <p className="text-neutral-700 mb-4">
                        {treatment.description}
                      </p>
                      <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                        <span>Meer informatie</span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
            Heeft u vragen over onze behandelingen?
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
            Neem gerust contact met ons op voor meer informatie of om een afspraak te maken.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Contact opnemen
            </Link>
            <Link 
              href="/inschrijven" 
              className="bg-white hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Inschrijven als patiënt
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 