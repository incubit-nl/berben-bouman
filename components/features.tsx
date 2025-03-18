import { Clock, Heart, Shield, Users, CheckCircle2, Sparkles } from 'lucide-react';

// Add a props type for the component
type FeaturesProps = {
  isFirstSection?: boolean;
};

const features = [
  {
    name: 'Moderne apparatuur',
    description: 'Wij werken met de nieuwste technologieën en materialen voor de beste resultaten.',
    icon: Sparkles,
  },
  {
    name: 'Persoonlijke aandacht',
    description: 'U krijgt bij ons de tijd en aandacht die u verdient, in een rustige en comfortabele omgeving.',
    icon: Heart,
  },
  {
    name: 'Flexibele tijden',
    description: 'Ruime openingstijden en spoedafspraken mogelijk voor optimale service.',
    icon: Clock,
  },
  {
    name: 'Ervaren team',
    description: 'Ons team van specialisten staat klaar om u de beste zorg te bieden.',
    icon: Users,
  },
];

export function Features({ isFirstSection = false }: FeaturesProps) {
  return (
    <div className="bg-white py-24 relative overflow-hidden">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-8 md:h-12 overflow-hidden rotate-180">
        <svg className="absolute top-0 w-full text-primary-900" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path 
            fill="currentColor" 
            d="M0,32L80,26.7C160,21,320,11,480,16C640,21,800,43,960,42.7C1120,43,1280,21,1360,10.7L1440,0L1440,48L1360,48C1280,48,1120,48,960,48C800,48,640,48,480,48C320,48,160,48,80,48L0,48Z">
          </path>
        </svg>
      </div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-primary-900 sm:text-4xl">
            Waarom kiezen voor ons?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Bij Tandartsenpraktijk Berben & Bouman staat kwaliteit en patiënttevredenheid voorop.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.name} className="group relative bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-500/10 group-hover:bg-accent-500/20 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-accent-600" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-primary-900">{feature.name}</h3>
                <p className="mt-3 text-base text-gray-600">{feature.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-primary-50 rounded-xl p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold text-primary-900 mb-4">Hoogwaardige tandheelkundige zorg</h3>
              <p className="text-gray-600 mb-6">
                Wij streven ernaar de best mogelijke zorg te bieden in een ontspannen en comfortabele omgeving. Onze praktijk is uitgerust met de nieuwste technologie om de meest effectieve behandelingen te kunnen bieden.
              </p>
              <ul className="space-y-3">
                {[
                  'Preventieve tandheelkunde',
                  'Esthetische behandelingen',
                  'Uitgebreide mondzorg',
                  'Kindvriendelijke aanpak'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-primary-900/30 mix-blend-multiply z-10 rounded-lg"></div>
              <img 
                src="/images/modern-dentistry.jpg" 
                alt="Moderne tandheelkunde" 
                className="object-cover h-full w-full rounded-lg transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 