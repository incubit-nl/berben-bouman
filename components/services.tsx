import Link from 'next/link';
import { ArrowRight, Sparkles, Smile, Shield, Stethoscope } from 'lucide-react';

// Add a props type for the component
type ServicesProps = {
  isFirstSection?: boolean;
};

const services = [
  {
    icon: Stethoscope,
    title: 'Algemene tandheelkunde',
    description: 'Reguliere controles, vullingen, wortelkanaalbehandelingen en preventieve zorg voor uw mondgezondheid.',
    link: '/behandelingen/algemene-tandheelkunde',
    image: '/images/general-dentistry.jpg'
  },
  {
    icon: Smile,
    title: 'Esthetische tandheelkunde',
    description: 'Facings, kronen, bruggen en bleken voor een mooiere glimlach en meer zelfvertrouwen.',
    link: '/behandelingen/esthetische-tandheelkunde',
    image: '/images/cosmetic-dentistry.jpg'
  },
  {
    icon: Shield,
    title: 'Implantologie',
    description: 'Tandimplantaten als duurzame oplossing voor het vervangen van ontbrekende tanden en kiezen.',
    link: '/behandelingen/implantologie',
    image: '/images/implantology.jpg'
  },
  {
    icon: Sparkles,
    title: 'Kindertandheelkunde',
    description: 'Specialistische zorg voor kinderen in een kindvriendelijke omgeving met extra aandacht en geduld.',
    link: '/behandelingen/kindertandheelkunde',
    image: '/images/pediatric-dentistry.jpg'
  },
];

export function Services({ isFirstSection = false }: ServicesProps) {
  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-primary-900 sm:text-4xl">
            Onze tandheelkundige diensten
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Wij bieden een breed scala aan tandheelkundige behandelingen voor het hele gezin
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <div 
              key={service.title} 
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="flex items-center mb-2">
                    <service.icon className="h-6 w-6 text-accent-500 mr-3" />
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link 
                  href={service.link}
                  className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium group"
                >
                  Meer informatie
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link
            href="/behandelingen"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-lg bg-accent-600 text-white hover:bg-accent-700 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Bekijk alle behandelingen
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
} 