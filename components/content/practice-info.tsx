import { MapPin, Clock, Phone, Shield, Stethoscope, Smile, AlertTriangle } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';
import Link from 'next/link';

interface PracticeInfoData {
  name: string;
  description: string;
  openingHours: string;
  phoneNumber: string;
  address: string;
}

async function getPracticeInfo(): Promise<PracticeInfoData | null> {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: 'practice-info',
      limit: 1,
    });
    
    return docs[0] as PracticeInfoData;
  } catch (error) {
    console.error('Error fetching practice info:', error);
    return null;
  }
}

export default async function PracticeInfo() {
  const practiceInfo = await getPracticeInfo() || {
    name: "Tandartsenpraktijk Berben & Bouman",
    description: "Tandartsenpraktijk Berben & Bouman is een moderne praktijk die staat voor kwaliteit.",
    openingHours: "Maandag t/m Vrijdag: 08:00 - 17:00 uur",
    phoneNumber: "+31 30 670 12 21",
    address: "Louis Armstronglaan 1, 3543 EB Utrecht (Terwijde)"
  };
  
  const phoneLink = `tel:${practiceInfo.phoneNumber.replace(/\s/g, '')}`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(practiceInfo.address)}`;

  const contactItems = [
    {
      title: 'Openingstijden',
      content: practiceInfo.openingHours,
      icon: <Clock className="h-6 w-6 text-primary-600 flex-shrink-0" />,
      link: null
    },
    {
      title: 'Telefoonnummer',
      content: practiceInfo.phoneNumber,
      icon: <Phone className="h-6 w-6 text-primary-600 flex-shrink-0" />,
      link: phoneLink
    },
    {
      title: 'Spoedgeval',
      content: practiceInfo.phoneNumber,
      icon: <AlertTriangle className="h-6 w-6 text-primary-600 flex-shrink-0" />,
      link: phoneLink
    },
    {
      title: 'Adres',
      content: practiceInfo.address,
      icon: <MapPin className="h-6 w-6 text-primary-600 flex-shrink-0" />,
      link: mapsLink,
      external: true
    }
  ];

  const features = [
    {
      title: 'Moderne apparatuur',
      description: 'Nieuwste technologieën voor optimale zorg.',
      icon: <Stethoscope className="h-8 w-8 text-primary-600" />,
      link: '/faciliteiten',
    },
    {
      title: 'Persoonlijke benadering',
      description: 'Tijd voor een ontspannen ervaring.',
      icon: <Smile className="h-8 w-8 text-primary-600" />,
      link: '/over-ons',
    },
    {
      title: 'Preventieve zorg',
      description: 'Focus op een gezond gebit.',
      icon: <Shield className="h-8 w-8 text-primary-600" />,
      link: '/behandelingen/preventie',
    },
  ];

  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4">
              Welkom bij Berben & Bouman
            </h2>
            <p className="text-lg text-neutral-600 mb-6">
              {practiceInfo.description}
            </p>
            
            <div className="grid gap-3">
              {contactItems.map((item, index) => {
                const ContactWrapper = item.link ? 
                  ({ children }: { children: React.ReactNode }) => (
                    <a 
                      href={item.link!} 
                      className="block bg-white rounded-lg shadow hover:shadow-md transition-all hover:-translate-y-0.5 group" 
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {children}
                    </a>
                  ) : 
                  ({ children }: { children: React.ReactNode }) => (
                    <div className="bg-white rounded-lg shadow hover:shadow-md transition-all">
                      {children}
                    </div>
                  );
                
                return (
                  <ContactWrapper key={index}>
                    <div className="p-3.5 flex items-center">
                      <div className="mr-3">{item.icon}</div>
                      <div>
                        <h3 className="font-semibold text-primary-900 group-hover:text-primary-700 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-neutral-600 group-hover:text-neutral-700 transition-colors">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </ContactWrapper>
                );
              })}
            </div>
          </div>
          
          <div className="space-y-3 mt-20">
            <h3 className="text-2xl font-heading font-bold text-primary-900 mb-2">
              Onze specialiteiten
            </h3>
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.link}
                className="block bg-white rounded-lg shadow hover:shadow-md transition-all hover:-translate-y-0.5 group p-4"
              >
                <div className="flex items-center">
                  <div className="mr-4 flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h4 className="font-bold text-primary-900 group-hover:text-primary-700 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-neutral-600 group-hover:text-neutral-700 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            
            <div className="mt-5 pt-4">
              <Link
                href="/contact"
                className="block bg-primary-600 hover:bg-primary-700 text-primary-900 font-medium py-3 px-4 rounded-lg shadow text-center transition-colors"
              >
                Maak een afspraak
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}