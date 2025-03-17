import Image from 'next/image';
import Link from 'next/link';
import { Phone, Clock, MapPin, Mail, AlertTriangle, ArrowRight, Calendar, Info } from 'lucide-react';
import { getPayload } from 'payload';
import config from '@payload-config';
import { NotificationBar } from '@/components/notification-bar';

export const metadata = {
  title: 'Tandartsenpraktijk Berben & Bouman | Utrecht Terwijde',
  description: 'Tandartsenpraktijk Berben & Bouman staat voor kwaliteit. Wij kiezen ervoor om enkel met de beste materialen te werken in een moderne en goed uitgeruste praktijk.',
};

// Define types for our data
interface Address {
  street?: string;
  postalCode?: string;
  city?: string;
  area?: string;
}

interface ContactDetails {
  phone?: string;
  email?: string;
  kvkNumber?: string;
  agbCode?: string;
}

interface EmergencyInfo {
  phone?: string;
  alternatePhone?: string;
  instructions?: any;
}

interface ClosedDay {
  name: string;
  date: string;
}

interface ContactInfo {
  id?: string;
  title?: string;
  address?: Address;
  contactDetails?: ContactDetails;
  emergencyInfo?: EmergencyInfo;
  openingHours?: any[];
  receptionHours?: any[];
  closedDays?: ClosedDay[];
  mapEmbed?: string;
}

interface ImportantAnnouncement {
  isActive?: boolean;
  title?: string;
  content?: string;
  backgroundColor?: string;
}

interface Settings {
  id?: string;
  name?: string;
  slug?: string;
  importantAnnouncement?: ImportantAnnouncement;
  socialMedia?: any;
  seo?: any;
}

interface HomePageData {
  homePage: any;
  announcements: Settings | null;
  contactInfo: ContactInfo | null;
  closedDays: ClosedDay[];
}

// Fetch home page data from Payload CMS
async function getHomeData(): Promise<HomePageData> {
  try {
    const payload = await getPayload({ config });
    
    // Get home page content
    const homePage = await payload.find({
      collection: 'pages',
      where: {
        pageType: {
          equals: 'home',
        },
      },
      limit: 1,
    }).then(res => res.docs[0]);
    
    // Get announcements
    const announcements = await payload.find({
      collection: 'settings',
      where: {
        slug: {
          equals: 'announcements',
        },
      },
      limit: 1,
    }).then(res => res.docs[0]) as Settings | null;
    
    // Get contact info
    const contactInfo = await payload.find({
      collection: 'contact-info',
      limit: 1,
    }).then(res => res.docs[0]) as ContactInfo | null;
    
    // Get closed days
    const closedDays = contactInfo?.closedDays || [];
    
    return {
      homePage,
      announcements,
      contactInfo,
      closedDays,
    };
  } catch (error) {
    console.error('Error fetching home data:', error);
    return {
      homePage: null,
      announcements: null,
      contactInfo: null,
      closedDays: [],
    };
  }
}

export default async function Home() {
  const { homePage, announcements, contactInfo, closedDays } = await getHomeData();
  
  // Default values in case CMS data is not available
  const emergencyPhone = contactInfo?.emergencyInfo?.phone || '+31 30 670 12 21';
  const regularPhone = contactInfo?.contactDetails?.phone || '+31 30 670 12 21';
  const email = contactInfo?.contactDetails?.email || 'info@berben-bouman.nl';
  const address = {
    street: contactInfo?.address?.street || 'Louis Armstronglaan 1',
    postalCode: contactInfo?.address?.postalCode || '3543 EB',
    city: contactInfo?.address?.city || 'Utrecht',
    area: contactInfo?.address?.area || 'Terwijde',
  };
  
  // Important announcement from CMS or fallback to static content
  const importantAnnouncement = announcements?.importantAnnouncement || {
    isActive: true,
    title: 'BELANGRIJK !!',
    content: 'OP DIT MOMENT ERVAREN WIJ TECHNISCHE PROBLEMEN WAARDOOR WIJ ZEER SLECHT TELEFONISCH BEREIKBAAR ZIJN.\n\nGELIEVE ONS PER E-MAIL TE CONTACTEREN EN DAN WORDT U TERUGGEBELD.\n\nEXCUSSE VOOR HET ONGEMAK.\n\nMet vriendelijke groet,\n\nTeam B&B',
  };

  return (
    <div className="flex flex-col">
      {/* Important Announcement Banner (conditionally rendered) */}
      {importantAnnouncement?.isActive && (
        <NotificationBar
          title={importantAnnouncement.title || ''}
          content={importantAnnouncement.content?.replace(/\n/g, ' · ') || ''}
          variant="warning"
          isDismissible={true}
          speed="medium"
          className="sticky top-0 z-50"
        />
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white overflow-hidden pt-24 lg:pt-32">
        <div className="absolute inset-0 z-0 opacity-10 bg-[url('/images/header-bg.png')] bg-repeat"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 lg:py-36 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Tandartsenpraktijk<br />
              <span className="text-accent-400">Berben & Bouman</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white leading-relaxed">
              Tandartsenpraktijk Berben & Bouman staat voor kwaliteit. Wij kiezen ervoor om enkel met de beste materialen te werken in een moderne en goed uitgeruste praktijk waar u zich snel op uw gemak zult voelen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/inschrijven" 
                className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
              >
                Inschrijven als patiënt
              </Link>
              <Link 
                href="/contact" 
                className="bg-white hover:bg-neutral-100 text-primary-900 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
              >
                Contact opnemen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-12 bg-white border-b border-neutral-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Appointment Card */}
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-primary-900">Afspraak maken</h3>
              </div>
              <p className="text-neutral-700 mb-4">
                Voor het maken van een afspraak kunt u ons telefonisch bereiken op werkdagen tussen 8:00 en 17:00 uur.
              </p>
              <div className="mt-auto">
                <a 
                  href={`tel:${regularPhone.replace(/\s/g, '')}`}
                  className="text-accent-500 hover:text-accent-600 font-medium flex items-center"
                >
                  {regularPhone}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Emergency Card */}
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="bg-accent-100 p-3 rounded-full mr-4">
                  <AlertTriangle className="h-6 w-6 text-accent-700" />
                </div>
                <h3 className="text-xl font-bold text-primary-900">Spoedgevallen</h3>
              </div>
              <p className="text-neutral-700 mb-4">
                Bij spoedgevallen buiten onze openingstijden kunt u contact opnemen met de spoeddienst.
              </p>
              <div className="mt-auto">
                <a 
                  href={`tel:${emergencyPhone.replace(/\s/g, '')}`}
                  className="text-accent-500 hover:text-accent-600 font-medium flex items-center"
                >
                  {emergencyPhone}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Opening Hours Card */}
            <div className="bg-neutral-50 p-6 rounded-lg border border-neutral-200 flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-primary-900">Openingstijden</h3>
              </div>
              <ul className="text-neutral-700 space-y-2 mb-4">
                <li className="flex justify-between">
                  <span>Maandag - Vrijdag:</span>
                  <span className="font-medium">08:00 - 17:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Zaterdag - Zondag:</span>
                  <span className="font-medium">Gesloten</span>
                </li>
              </ul>
              <div className="mt-auto">
                <Link 
                  href="/contact"
                  className="text-accent-500 hover:text-accent-600 font-medium flex items-center"
                >
                  Meer informatie
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary-900 mb-6">Welkom bij Tandartsenpraktijk Berben & Bouman</h2>
              <p className="text-neutral-700 mb-4">
                Tandartsenpraktijk Berben & Bouman is een moderne tandartspraktijk in Utrecht Terwijde. Wij bieden hoogwaardige tandheelkundige zorg in een prettige en ontspannen omgeving.
              </p>
              <p className="text-neutral-700 mb-6">
                Onze praktijk is gericht op preventieve tandheelkunde. We besteden veel aandacht aan het voorkomen van problemen, zodat u zo min mogelijk in de tandartsstoel hoeft te zitten.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/de-praktijk" 
                  className="text-accent-500 hover:text-accent-600 font-medium flex items-center"
                >
                  Meer over onze praktijk
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  href="/team" 
                  className="text-accent-500 hover:text-accent-600 font-medium flex items-center"
                >
                  Ontmoet ons team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/berben&bouman.jpg"
                alt="Tandartsenpraktijk Berben & Bouman"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Waarom kiezen voor Berben & Bouman?</h2>
            <p className="text-neutral-700 max-w-2xl mx-auto">
              Wij bieden hoogwaardige tandheelkundige zorg in een prettige en ontspannen omgeving. Onze patiënten kiezen voor ons om de volgende redenen:
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
              <div className="bg-primary-100 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">Moderne faciliteiten</h3>
              <p className="text-neutral-700">
                Onze praktijk is uitgerust met de nieuwste technologieën en apparatuur om u de beste zorg te bieden.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
              <div className="bg-primary-100 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">Ervaren team</h3>
              <p className="text-neutral-700">
                Ons team van ervaren tandartsen en assistenten staat klaar om u de beste tandheelkundige zorg te bieden.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
              <div className="bg-primary-100 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">Persoonlijke aandacht</h3>
              <p className="text-neutral-700">
                Wij nemen de tijd voor onze patiënten en luisteren naar uw wensen en behoeften.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
              <div className="bg-primary-100 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">Preventieve zorg</h3>
              <p className="text-neutral-700">
                Wij geloven in preventie en helpen u om uw gebit gezond te houden met regelmatige controles en advies.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
              <div className="bg-primary-100 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">Flexibele afspraken</h3>
              <p className="text-neutral-700">
                Wij bieden flexibele afspraakmogelijkheden om aan uw drukke schema tegemoet te komen.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
              <div className="bg-primary-100 p-3 rounded-full w-fit mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-900 mb-2">Goede bereikbaarheid</h3>
              <p className="text-neutral-700">
                Onze praktijk is gemakkelijk bereikbaar met het openbaar vervoer en er is voldoende parkeergelegenheid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl text-white text-center font-bold mb-4">Maak vandaag nog een afspraak</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Bent u op zoek naar een tandarts in Utrecht Terwijde? Wij verwelkomen nieuwe patiënten en staan klaar om u te helpen met al uw tandheelkundige behoeften.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/inschrijven" 
              className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Inschrijven als patiënt
            </Link>
            <a 
              href={`tel:${regularPhone.replace(/\s/g, '')}`}
              className="bg-white hover:bg-neutral-100 text-primary-900 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              Bel ons direct
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}