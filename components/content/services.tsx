import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { getPayload } from 'payload';
import config from '@payload-config';

// Add a props type for the component
type ServicesProps = {
  isFirstSection?: boolean;
};

// Treatment interface matching the Payload CMS schema
interface Treatment {
  id: string;
  title: string;
  slug: string;
  category: string;
  featuredImage?: {
    id: string;
    url: string;
    alt?: string;
  };
  shortDescription: string;
  displayOrder?: number;
  status: 'draft' | 'published';
}

// Fetch featured treatments from Payload CMS
async function getFeaturedTreatments(): Promise<Treatment[]> {
  try {
    const payload = await getPayload({ config });
    
    const treatments = await payload.find({
      collection: 'treatments',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: 'displayOrder',
      limit: 4, // Get top 4 treatments by display order
    }).then(res => res.docs as Treatment[]);
    
    return treatments;
  } catch (error) {
    console.error('Error fetching featured treatments:', error);
    return [];
  }
}

export default async function Services({ isFirstSection = false }: ServicesProps) {
  // Get treatments from Payload CMS
  const treatments = await getFeaturedTreatments();
  
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-primary-50 rounded-full -translate-x-1/2 opacity-70 blur-3xl"></div>
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-accent-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-60 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="flex-1">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4">
              Onze specialisaties
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary-900 mb-6">
              Hoogwaardige tandheelkundige behandelingen
            </h2>
            <div className="w-16 h-1 bg-accent-500 mb-6"></div>
            <p className="text-lg text-gray-600 mb-8 max-w-xl">
              Wij bieden een breed scala aan tandheelkundige behandelingen voor het hele gezin, met focus op kwaliteit en comfort.
            </p>
            <Link
              href="/behandelingen"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-primary-600 text-primary-900 hover:bg-primary-700 shadow-lg hover:shadow-primary-600/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              Bekijk alle behandelingen
              <ArrowRight className="ml-2 h-5 w-5 transition-transform" />
            </Link>
          </div>
          <div className="flex-1 relative">
            <div className="relative h-80 w-80 md:h-96 md:w-96 rounded-full mx-auto overflow-hidden border-8 border-white shadow-2xl">
              <Image 
                src="/images/behandeling_2_bewerkt.jpg"
                alt="Featured treatment"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((treatment, index) => (
            <Link 
              key={treatment.id} 
              href={`/behandelingen/${treatment.slug}`}
              className="bg-white rounded-xl overflow-hidden group flex flex-col h-full border border-neutral-100 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                {treatment.featuredImage ? (
                  <Image 
                    src={treatment.featuredImage.url}
                    alt={treatment.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                ) : (
                  <Image 
                    src="/images/treatments/default-treatment-thumb.jpg"
                    alt={treatment.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold">{treatment.title}</h3>
                </div>
              </div>
              
              <div className="p-5 flex flex-col flex-grow bg-white">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{treatment.shortDescription}</p>
                <div className="mt-auto flex items-center text-primary-600 group-hover:text-primary-700 font-medium text-sm">
                  Meer informatie
                  <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 flex flex-col items-center">
          <div className="bg-primary-50 p-8 rounded-2xl max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-primary-900 mb-4">Wilt u meer informatie?</h3>
            <p className="text-gray-600 mb-6">
              Neem contact met ons op voor persoonlijk advies over de beste behandeling voor uw situatie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg border border-primary-200 text-primary-700 hover:bg-primary-50 transition-all"
              >
                Contact opnemen
              </Link>
              <Link
                href="/behandelingen"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg border border-primary-200 text-primary-700 hover:bg-primary-50 transition-all"
              >
                Alle behandelingen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 