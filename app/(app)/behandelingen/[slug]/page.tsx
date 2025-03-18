import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Phone } from 'lucide-react';
import { getPayload } from 'payload';
import config from '@payload-config';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/ui/RichText';

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
  content: any; // Rich text content
  metaTitle?: string;
  metaDescription?: string;
  displayOrder?: number;
  status: 'draft' | 'published';
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = (await params).slug;
  const treatment = await getTreatment(slug);
  
  if (!treatment) {
    return {
      title: 'Behandeling niet gevonden',
      description: 'De opgevraagde behandeling kon niet worden gevonden.',
    };
  }
  
  return {
    title: treatment.metaTitle || `${treatment.title} | Tandartsenpraktijk Berben & Bouman`,
    description: treatment.metaDescription || treatment.shortDescription,
  };
}

// Fetch treatment data from Payload CMS
async function getTreatment(slug: string): Promise<Treatment | null> {
  try {
    const payload = await getPayload({ config });
    
    const treatment = await payload.find({
      collection: 'treatments',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
      limit: 1,
    }).then(res => res.docs[0] as Treatment | undefined);
    
    return treatment || null;
  } catch (error) {
    console.error('Error fetching treatment data:', error);
    return null;
  }
}

// Get related treatments in the same category
async function getRelatedTreatments(category: string, currentSlug: string): Promise<Treatment[]> {
  try {
    const payload = await getPayload({ config });
    
    const treatments = await payload.find({
      collection: 'treatments',
      where: {
        category: {
          equals: category,
        },
        slug: {
          not_equals: currentSlug,
        },
        status: {
          equals: 'published',
        },
      },
      limit: 3,
      sort: 'displayOrder',
    }).then(res => res.docs as Treatment[]);
    
    return treatments;
  } catch (error) {
    console.error('Error fetching related treatments:', error);
    return [];
  }
}

// Get contact info for the sidebar
async function getContactInfo() {
  try {
    const payload = await getPayload({ config });
    
    const contactInfo = await payload.find({
      collection: 'contact-info',
      limit: 1,
    }).then(res => res.docs[0]);
    
    return contactInfo;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
}

// Map category values to display names
const categoryLabels: Record<string, string> = {
  'preventie': 'Preventie',
  'diagnostiek': 'Diagnostiek',
  'restauratief': 'Restauratief',
  'endodontologie': 'Endodontologie',
  'prothetiek': 'Prothetiek',
  'implantologie': 'Implantologie',
  'orthodontie': 'Orthodontie',
  'overig': 'Overig',
};

export default async function TreatmentPage({ params }: { params: { slug: string } }) {
  const slug = (await params).slug;
  const treatment = await getTreatment(slug);
  
  // If treatment not found, show 404 page
  if (!treatment) {
    notFound();
  }
  
  const relatedTreatments = await getRelatedTreatments(treatment.category, treatment.slug);
  const contactInfo = await getContactInfo();
  
  // Default contact values if CMS data is not available
  const phone = contactInfo?.contactDetails?.phone || '+31 30 670 12 21';
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
        </div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <Link 
              href="/behandelingen" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Terug naar alle behandelingen</span>
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-accent-50">
              {treatment.title}
            </h1>
            <p className="text-lg md:text-xl mb-0 text-white/90">
              {treatment.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <div className="mb-6 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {categoryLabels[treatment.category] || treatment.category}
                </div>
                
                {/* Use the RichText component to render the content */}
                <RichText content={treatment.content} />
                
                <div className="mt-12">
                  <Link 
                    href="/contact" 
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
                  >
                    Maak een afspraak
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Quick Contact */}
              <div className="bg-primary-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-primary-900">Afspraak maken?</h3>
                <div className="flex items-start mb-4">
                  <Phone className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                  <div>
                    <p className="text-neutral-700 mb-1">Bel ons direct:</p>
                    <a 
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="text-primary-600 hover:text-primary-700 font-bold transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                  <div>
                    <p className="text-neutral-700 mb-1">Openingstijden:</p>
                    <p className="text-neutral-800">
                      Maandag t/m Vrijdag: 08:00 - 17:00 uur
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Related Treatments */}
              {relatedTreatments.length > 0 && (
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-primary-900">Gerelateerde behandelingen</h3>
                  <ul className="space-y-4">
                    {relatedTreatments.map((relatedTreatment) => (
                      <li key={relatedTreatment.id}>
                        <Link 
                          href={`/behandelingen/${relatedTreatment.slug}`}
                          className="flex items-start group"
                        >
                          <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0 mr-3">
                            {relatedTreatment.featuredImage ? (
                              <Image 
                                src={relatedTreatment.featuredImage.url} 
                                alt={relatedTreatment.title} 
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <Image 
                                src="/images/treatments/default-treatment-thumb.jpg" 
                                alt={relatedTreatment.title} 
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            )}
                          </div>
                          <div>
                            <h4 className="text-primary-900 group-hover:text-primary-600 font-medium transition-colors">
                              {relatedTreatment.title}
                            </h4>
                            <p className="text-sm text-neutral-600 line-clamp-2">
                              {relatedTreatment.shortDescription}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900 text-center">
            Heeft u vragen over deze behandeling?
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
            Neem gerust contact met ons op voor meer informatie of om een afspraak te maken.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-blue hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex"
            >
              Contact opnemen
            </Link>
            <a 
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="bg-blue hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              <Phone className="mr-2 h-5 w-5" />
              <span>Bel direct: {phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 