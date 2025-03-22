import Link from 'next/link';
import { ArrowRight, Sparkles, Smile, Shield, Stethoscope, ChevronRight } from 'lucide-react';
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
    <div className="bg-neutral-50 py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-80 h-80 bg-primary-500/5 rounded-full -translate-y-1/3 -translate-x-1/3"></div>
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-accent-500/5 rounded-full translate-y-1/3 translate-x-1/3"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4">
            Onze specialisaties
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4 animate-fade-in flex items-center justify-center">
            Onze Behandelingen
          </h2>
          <div className="w-16 h-1 bg-accent-500 mx-auto my-6"></div>
          <p className="text-lg text-gray-600">
            Wij bieden een breed scala aan tandheelkundige behandelingen voor het hele gezin
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {treatments.map((treatment) => (
            <Link 
              key={treatment.id} 
              href={`/behandelingen/${treatment.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group flex flex-col h-full border border-neutral-100 hover:border-primary-200"
            >
              <div className="relative h-64 overflow-hidden">
                {treatment.featuredImage ? (
                  <Image 
                    src={treatment.featuredImage.url}
                    alt={treatment.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <Image 
                    src="/images/treatments/default-treatment-thumb.jpg"
                    alt={treatment.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/50 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl font-bold">{treatment.title}</h3>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-600 mb-6 flex-grow">{treatment.shortDescription}</p>
                <div className="mt-auto flex items-center text-accent-600 hover:text-accent-700 font-medium">
                  Meer informatie
                  <ChevronRight className="ml-1 h-5 w-5 group-hover:ml-2 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link
            href="/behandelingen"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Bekijk alle behandelingen
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
} 