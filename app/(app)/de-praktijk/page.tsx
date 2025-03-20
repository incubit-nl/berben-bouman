import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'De Praktijk | Tandartsenpraktijk Berben & Bouman',
  description: 'Ontdek onze moderne tandartspraktijk in Utrecht Terwijde. Maak kennis met ons team, onze faciliteiten en onze visie op tandheelkundige zorg.',
};

export default async function PracticePage() {
  const pages = await getPracticePages();

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      {/* Hero Section - Enhanced with pattern background */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-primary-900/80"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-white">
              De Praktijk
            </h1>
            <div className="w-20 h-1 bg-accent-500 mb-6"></div>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Welkom bij Tandartsenpraktijk Berben & Bouman. Ontdek onze moderne praktijk, maak kennis met ons team en leer meer over onze visie op tandheelkundige zorg.
            </p>
          </div>
        </div>
        {/* Decorative wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" fill="white" preserveAspectRatio="none">
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48 Z"></path>
          </svg>
        </div>
      </section>

      {/* Practice Pages Grid */}
      <section className="py-8 md:py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pages.map((page) => (
              <Link 
                key={page.id}
                href={`/de-praktijk/${page.slug}`}
                className="group bg-white rounded-xl overflow-hidden border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  {page.hero?.heroImage ? (
                    <Image 
                      src={page.hero.heroImage.url} 
                      alt={page.hero.heroImage.alt || page.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary-100" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 text-primary-900 group-hover:text-primary-700 transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-neutral-600 mb-4 flex-grow">
                    {page.shortDescription || 'Lees meer over dit onderdeel van onze praktijk.'}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors mt-auto">
                    <span>Meer informatie</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with background and visuals */}
      <section className="py-16 bg-gradient-to-br from-primary-100 to-primary-50 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-accent-500/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary-300/10 rounded-full translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
              Wilt u zich inschrijven als patiënt?
            </h2>
            <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
              Wij verwelkomen graag nieuwe patiënten in onze praktijk. 
              Schrijf u online in of neem contact met ons op voor meer informatie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/inschrijven" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center shadow-md hover:shadow-lg"
              >
                Direct inschrijven
              </Link>
              <Link 
                href="/contact" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center shadow-md hover:shadow-lg"
              >
                Contact opnemen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Define types for our data
interface PracticePage {
  id: string;
  title: string;
  slug: string;
  hero?: {
    heroImage?: {
      url: string;
      alt?: string;
    };
    heroTitle?: string;
    heroContent?: any;
  };
  shortDescription?: string;
  displayOrder?: number;
  status: 'draft' | 'published';
  showInNavigation?: boolean;
}

// Define categories for practice pages
const categories = {
  team: {
    title: 'Ons Team',
    description: 'Maak kennis met onze ervaren tandartsen en medewerkers die klaarstaan om u de beste zorg te bieden.',
  },
  faciliteiten: {
    title: 'Faciliteiten',
    description: 'Onze praktijk is uitgerust met moderne apparatuur en technologie voor optimale tandheelkundige zorg.',
  },
  rondleiding: {
    title: 'Praktijkrondleiding',
    description: 'Neem een kijkje in onze praktijk en maak kennis met onze moderne faciliteiten en prettige omgeving.',
  },
  werkwijze: {
    title: 'Onze Werkwijze',
    description: 'Leer meer over onze aanpak en hoe wij u de beste tandheelkundige zorg bieden.',
  },
};

// Fetch all published practice pages from Payload CMS
async function getPracticePages(): Promise<PracticePage[]> {
  try {
    const payload = await getPayload({ config });
    
    const pages = await payload.find({
      collection: 'practice-pages',
      where: {
        status: {
          equals: 'published',
        },
        showInNavigation: {
          equals: true,
        },
      },
      sort: 'displayOrder',
    }).then(res => res.docs as PracticePage[]);
    
    return pages;
  } catch (error) {
    console.error('Error fetching practice pages:', error);
    return [];
  }
} 