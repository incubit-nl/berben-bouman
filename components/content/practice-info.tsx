import { MapPin, Clock, Phone, Shield, Stethoscope, Smile, AlertTriangle } from 'lucide-react';
import { getPayloadClient } from '@/lib/payload';
import Link from 'next/link';
import Image from 'next/image';

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
      icon: <Clock className="h-6 w-6 text-primary-600" />,
      link: null
    },
    {
      title: 'Telefoonnummer',
      content: practiceInfo.phoneNumber,
      icon: <Phone className="h-6 w-6 text-primary-600" />,
      link: phoneLink
    },
    {
      title: 'Spoedgeval',
      content: practiceInfo.phoneNumber,
      icon: <AlertTriangle className="h-6 w-6 text-primary-600" />,
      link: phoneLink
    },
    {
      title: 'Adres',
      content: practiceInfo.address,
      icon: <MapPin className="h-6 w-6 text-primary-600" />,
      link: mapsLink,
      external: true
    }
  ];

  const features = [
    {
      title: 'Moderne apparatuur',
      description: 'Nieuwste technologieën voor optimale zorg.',
      icon: <Stethoscope className="h-10 w-10 text-white" />,
      link: '/faciliteiten',
    },
    {
      title: 'Persoonlijke benadering',
      description: 'Tijd voor een ontspannen ervaring.',
      icon: <Smile className="h-10 w-10 text-white" />,
      link: '/over-ons',
    },
    {
      title: 'Preventieve zorg',
      description: 'Focus op een gezond gebit.',
      icon: <Shield className="h-10 w-10 text-white" />,
      link: '/behandelingen/preventie',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full -translate-y-1/2 translate-x-1/3 opacity-70 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full translate-y-1/3 -translate-x-1/3 opacity-60 blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4">
            Ontdek onze praktijk
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4 text-center">
            Welkom bij {practiceInfo.name}
          </h2>
          <div className="w-16 h-1 bg-accent-500 mx-auto my-6"></div>
          <p className="text-lg text-gray-600">
            {practiceInfo.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Information Cards */}
          <div className="lg:col-span-2 shadow-xl rounded-2xl overflow-hidden bg-white border border-neutral-100">
            <div className="h-64 relative bg-primary-50">
              <Image 
                src="/images/Voorgevel_bewerkt-1.jpg"
                alt="Praktijk interieur"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 text-white">Contact & Locatie</h3>
                  <p className="text-white">Wij staan voor u klaar</p>
                </div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 p-1">
              {contactItems.map((item, index) => {
                const ContactWrapper = item.link ? 
                  ({ children }: { children: React.ReactNode }) => (
                    <a 
                      href={item.link!} 
                      className="m-2 p-4 bg-white rounded-xl hover:bg-primary-50 transition-all group border border-neutral-100 hover:border-primary-200 relative"
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {children}
                    </a>
                  ) : 
                  ({ children }: { children: React.ReactNode }) => (
                    <div className="m-2 p-4 bg-white rounded-xl border border-neutral-100 relative">
                      {children}
                    </div>
                  );
                
                return (
                  <ContactWrapper key={index}>
                    <div className="flex items-start">
                      <div className="mr-4 p-2.5 bg-primary-50 rounded-lg mt-6">
                        {item.icon}
                      </div>
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

          {/* Features Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold text-primary-900 mb-4">
              Onze specialiteiten
            </h3>
            
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.link}
                className="block rounded-xl overflow-hidden group"
              >
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 p-5 transition-all">
                  <div className="flex items-center">
                    <div className="mr-4 bg-white/10 p-3 rounded-lg">
                      {feature.icon}
                    </div>
                    <div className="text-white">
                      <h4 className="font-bold text-lg mb-1 text-white">
                        {feature.title}
                      </h4>
                      <p className="text-white/80">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            
            <div className="mt-8">
              <Link
                href="/contact"
                className="block w-full bg-accent-500 hover:bg-accent-600 text-primary-900 font-medium py-4 px-6 rounded-xl shadow-lg hover:shadow-accent-500/20 text-center transition-all transform hover:-translate-y-1"
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