import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Filter, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Behandelingen',
  description: 'Overzicht van alle tandheelkundige behandelingen bij Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde.',
};

// Define types for our data
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

interface CategoryDetail {
  title: string;
  description: string;
}

interface CategoryMap {
  [key: string]: CategoryDetail;
}

// Group treatments by category
const categories: CategoryMap = {
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
  overig: {
    title: 'Overig',
    description: 'Diverse andere tandheelkundige behandelingen die we aanbieden.',
  },
};

// Fetch all published treatments from Payload CMS
async function getTreatments(): Promise<Treatment[]> {
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
    }).then(res => res.docs as Treatment[]);
    
    return treatments;
  } catch (error) {
    console.error('Error fetching treatments data:', error);
    return [];
  }
}

// Get category descriptions and labels from global
async function getCategoryDetails(): Promise<CategoryMap> {
  try {
    const payload = await getPayload({ config });
    
    const treatmentCategories = await payload.find({
      collection: 'treatment-categories',
    });
    
    if (!treatmentCategories || !treatmentCategories.docs || !treatmentCategories.docs.length) {
      return categories;
    }
    
    const categoriesFromGlobal = treatmentCategories.docs.reduce((acc: CategoryMap, cat: any) => {
      acc[cat.value] = {
        title: cat.label,
        description: cat.description || `${cat.label} behandelingen bij Tandartsenpraktijk Berben & Bouman.`,
      };
      return acc;
    }, {});
    
    return categoriesFromGlobal;
  } catch (error) {
    console.error('Error fetching category details:', error);
    return categories; // Fall back to hardcoded categories
  }
}

interface PageProps {
  searchParams?: Promise<Record<string, string | string[]>>;
}

export default async function TreatmentsPage({ 
  searchParams 
}: PageProps) {
  const resolvedParams = await (searchParams || Promise.resolve<Record<string, string | string[]>>({}));
  const categoryFilter = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  
  const treatments = await getTreatments();
  const categoryDetails = await getCategoryDetails();
  
  const treatmentsByCategory = treatments.reduce((acc, treatment) => {
    if (!acc[treatment.category]) {
      acc[treatment.category] = [];
    }
    acc[treatment.category].push(treatment);
    return acc;
  }, {} as Record<string, Treatment[]>);

  const filteredCategories = categoryFilter && categoryFilter in categoryDetails
    ? { [categoryFilter]: categoryDetails[categoryFilter] }
    : categoryDetails;

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20"></div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Terug naar home</span>
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-white">
              {categoryFilter ? `${categoryDetails[categoryFilter]?.title}` : 'Behandelingen'}
            </h1>
            <p className="text-lg md:text-xl mb-0 text-white/90">
              {categoryFilter 
                ? categoryDetails[categoryFilter]?.description 
                : 'Hoogwaardige tandheelkundige zorg voor het hele gezin. Bij Tandartsenpraktijk Berben & Bouman staat uw mondgezondheid centraal.'}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="py-6 bg-white border-b border-neutral-200 sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <div className="flex gap-2 md:gap-3 min-w-max justify-center">
                {!categoryFilter ? (
                  <div className="flex items-center gap-3 flex-wrap justify-center">
                    <span className="text-neutral-500 flex items-center text-sm">
                      <Filter className="h-4 w-4 mr-1" />
                      Filter:
                    </span>
                    {Object.entries(categoryDetails).map(([categoryId, category]) => (
                      <Link
                        key={categoryId}
                        href={`/behandelingen?category=${categoryId}`}
                        className="inline-flex px-4 py-2 rounded-full bg-primary-50 hover:bg-primary-100 text-primary-700 text-sm font-bold transition-all hover:shadow-sm"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href="/behandelingen"
                    className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-bold transition-all hover:bg-primary-200"
                  >
                    <ArrowRight className="mr-1 h-4 w-4 rotate-180" />
                    Toon alle behandelingen
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Categories */}
      <section className="py-8 md:py-12 bg-neutral-50">
        <div className="container mx-auto px-4">
          {Object.entries(filteredCategories).map(([categoryId, category], index) => {
            const categoryTreatments = treatmentsByCategory[categoryId] || [];
            if (categoryTreatments.length === 0) return null;
            
            return (
              <div key={categoryId} className={`mb-16 ${index !== 0 && !categoryFilter ? 'pt-12 border-t border-neutral-200' : ''}`}>
                {!categoryFilter && (
                  <div className="max-w-3xl mx-auto mb-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4 animate-fade-in flex items-center justify-center">
                    {category.title}
                    </h2>
                    <div className="w-16 h-1 bg-accent-500 mx-auto mb-6"></div>
                    <p className="text-lg text-neutral-700">
                      {category.description}
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {categoryTreatments.map((treatment) => (
                    <Link 
                      key={treatment.id}
                      href={`/behandelingen/${treatment.slug}`}
                      className="group bg-white rounded-xl overflow-hidden border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
                    >
                      <div className="relative h-52 overflow-hidden">
                        {treatment.featuredImage ? (
                          <Image 
                            src={treatment.featuredImage.url} 
                            alt={treatment.featuredImage.alt || treatment.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <Image 
                            src="/images/treatments/default-treatment-thumb.jpg" 
                            alt={treatment.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="text-sm font-medium text-accent-600 mb-2">{categoryDetails[treatment.category]?.title}</div>
                        <h3 className="text-xl font-bold mb-3 text-primary-900 group-hover:text-primary-700 transition-colors">
                          {treatment.title}
                        </h3>
                        <p className="text-neutral-600 mb-4 flex-grow">
                          {treatment.shortDescription}
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
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-100 to-primary-50 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-accent-500/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary-300/10 rounded-full translate-y-1/2 -translate-x-1/3"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
              Heeft u vragen over onze behandelingen?
            </h2>
            <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
              Neem gerust contact met ons op voor meer informatie of om een afspraak te maken.
              Wij helpen u graag verder met persoonlijk advies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white hover:bg-neutral-100 text-primary-800 border border-primary-300 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center shadow-sm hover:shadow-md"
              >
                Contact opnemen
              </Link>
              <Link 
                href="https://www.anamneselijst.nl/Berben-Bouman/" 
                className="bg-white hover:bg-neutral-100 text-primary-800 border border-primary-300 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center shadow-sm hover:shadow-md"
              >
                Inschrijven als patiënt
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}