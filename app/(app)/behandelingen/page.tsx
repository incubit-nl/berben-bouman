import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
    
    const treatmentCategories = await payload.findGlobal({
      slug: 'treatment-categories',
    });
    
    if (!treatmentCategories || !treatmentCategories.categories || !treatmentCategories.categories.length) {
      // Return the hardcoded categories if global data doesn't exist yet
      return categories;
    }
    
    // Convert global categories to the format needed by the page
    const categoriesFromGlobal = treatmentCategories.categories.reduce((acc: CategoryMap, cat: any) => {
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
  searchParams?: Record<string, string | string[]>;
}

export default async function TreatmentsPage({ 
  searchParams 
}: PageProps) {
  // Get category filter from URL params - using await to resolve searchParams
  const resolvedParams = await Promise.resolve(searchParams || {});
  const categoryFilter = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  
  // Fetch treatments from Payload CMS
  const treatments = await getTreatments();
  
  // Get category details from global
  const categoryDetails = await getCategoryDetails();
  
  // Group treatments by category
  const treatmentsByCategory = treatments.reduce((acc, treatment) => {
    if (!acc[treatment.category]) {
      acc[treatment.category] = [];
    }
    acc[treatment.category].push(treatment);
    return acc;
  }, {} as Record<string, Treatment[]>);

  // Filter categories based on URL parameter
  const filteredCategories = categoryFilter && categoryFilter in categoryDetails
    ? { [categoryFilter]: categoryDetails[categoryFilter] }
    : categoryDetails;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
        </div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-accent-50">
              {categoryFilter 
                ? `${categoryDetails[categoryFilter]?.title}` 
                : 'Behandelingen'}
            </h1>
            <p className="text-lg md:text-xl mb-0 text-white/90">
              {categoryFilter 
                ? categoryDetails[categoryFilter]?.description 
                : 'Hoogwaardige tandheelkundige zorg voor het hele gezin'}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
              {categoryFilter 
                ? `Onze ${categoryDetails[categoryFilter]?.title.toLowerCase()} behandelingen` 
                : 'Onze tandheelkundige behandelingen'}
            </h2>
            <p className="text-lg text-neutral-700 mb-0">
              Bij Tandartsenpraktijk Berben & Bouman bieden wij een breed scala aan tandheelkundige behandelingen. Van preventieve zorg tot complexe restauratieve behandelingen, wij staan klaar om u de best mogelijke zorg te bieden.
              {!categoryFilter && ' Hieronder vindt u een overzicht van onze behandelingen.'}
            </p>
          </div>
          
          {/* Category filter buttons - only show when no category is selected */}
          {!categoryFilter && (
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {Object.entries(categoryDetails).map(([categoryId, category]) => (
                <Link
                  key={categoryId}
                  href={`/behandelingen?category=${categoryId}`}
                  className="inline-flex px-4 py-2 rounded-full bg-primary-50 hover:bg-primary-100 text-primary-800 text-sm font-medium transition"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}
          
          {/* Back to all treatments - only show when category is selected */}
          {categoryFilter && (
            <div className="flex justify-center mt-8">
              <Link
                href="/behandelingen"
                className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-800 text-sm font-medium transition hover:bg-primary-200"
              >
                Bekijk alle behandelingen
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Treatment Categories */}
      {Object.entries(filteredCategories).map(([categoryId, category]) => {
        const categoryTreatments = treatmentsByCategory[categoryId] || [];
        if (categoryTreatments.length === 0) return null;
        
        return (
          <section key={categoryId} className="py-12 border-t border-neutral-200">
            <div className="container mx-auto px-4">
              {!categoryFilter && (
                <div className="max-w-3xl mx-auto mb-12">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-primary-900">
                    {category.title}
                  </h2>
                  <p className="text-lg text-neutral-700">
                    {category.description}
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryTreatments.map((treatment) => (
                  <Link 
                    key={treatment.id}
                    href={`/behandelingen/${treatment.slug}`}
                    className="group bg-white rounded-lg overflow-hidden border border-neutral-200 hover:border-primary-200 hover:shadow-md transition-all"
                  >
                    <div className="relative h-48 overflow-hidden">
                      {treatment.featuredImage ? (
                        <Image 
                          src={treatment.featuredImage.url} 
                          alt={treatment.featuredImage.alt || treatment.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <Image 
                          src="/images/treatments/default-treatment-thumb.jpg" 
                          alt={treatment.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-primary-900 group-hover:text-primary-600 transition-colors">
                        {treatment.title}
                      </h3>
                      <p className="text-neutral-700 mb-4">
                        {treatment.shortDescription}
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
              className="bg-white hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
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