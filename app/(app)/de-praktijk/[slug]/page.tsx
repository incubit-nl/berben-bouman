import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { getPayload } from 'payload';
import config from '@payload-config';
import { notFound } from 'next/navigation';

// Define types for our data
interface PracticeInfo {
  id: string;
  title: string;
  slug: string;
  infoType: string;
  content: any; // Rich text content
  featuredImage?: {
    id: string;
    url: string;
    alt?: string;
  };
  gallery?: {
    image: {
      id: string;
      url: string;
      alt?: string;
    };
    caption?: string;
  }[];
  attachments?: {
    file: {
      id: string;
      url: string;
      filename: string;
    };
    title: string;
    description?: string;
  }[];
  metaTitle?: string;
  metaDescription?: string;
  displayOrder?: number;
  status: 'draft' | 'published';
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const practiceInfo = await getPracticeInfo(params.slug);
  
  if (!practiceInfo) {
    return {
      title: 'Informatie niet gevonden',
      description: 'De opgevraagde informatie kon niet worden gevonden.',
    };
  }
  
  return {
    title: practiceInfo.metaTitle || `${practiceInfo.title} | Tandartsenpraktijk Berben & Bouman`,
    description: practiceInfo.metaDescription || `Informatie over ${practiceInfo.title} bij Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde.`,
  };
}

// Fetch practice info data from Payload CMS
async function getPracticeInfo(slug: string): Promise<PracticeInfo | null> {
  try {
    const payload = await getPayload({ config });
    
    const practiceInfo = await payload.find({
      collection: 'practice-info',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
      limit: 1,
    }).then(res => res.docs[0] as unknown as PracticeInfo | undefined);
    
    return practiceInfo || null;
  } catch (error) {
    console.error('Error fetching practice info data:', error);
    return null;
  }
}

// Get related practice info pages
async function getRelatedPracticeInfo(currentSlug: string): Promise<PracticeInfo[]> {
  try {
    const payload = await getPayload({ config });
    
    const practiceInfoPages = await payload.find({
      collection: 'practice-info',
      where: {
        slug: {
          not_equals: currentSlug,
        },
        status: {
          equals: 'published',
        },
      },
      limit: 5,
      sort: 'displayOrder',
    }).then(res => res.docs as unknown as PracticeInfo[]);
    
    return practiceInfoPages;
  } catch (error) {
    console.error('Error fetching related practice info:', error);
    return [];
  }
}

// Map infoType values to display names
const infoTypeLabels: Record<string, string> = {
  'tour': 'Praktijkrondleiding',
  'rules': 'Praktijkregels',
  'budget': 'Begroting',
  'pricing': 'Tarieven',
  'invoices': 'Facturen',
  'other': 'Overig',
};

export default async function PracticeInfoPage({ params }: { params: { slug: string } }) {
  const practiceInfo = await getPracticeInfo(params.slug);
  
  // If practice info not found, show 404 page
  if (!practiceInfo) {
    notFound();
  }
  
  const relatedPracticeInfo = await getRelatedPracticeInfo(practiceInfo.slug);
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          {practiceInfo.featuredImage ? (
            <Image 
              src={practiceInfo.featuredImage.url} 
              alt={practiceInfo.featuredImage.alt || practiceInfo.title} 
              fill
              className="object-cover"
              priority
            />
          ) : (
            <Image 
              src="/images/practice-interior.jpg" 
              alt={practiceInfo.title} 
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <Link 
              href="/de-praktijk" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Terug naar De Praktijk</span>
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-accent-50">
              {practiceInfo.title}
            </h1>
            {infoTypeLabels[practiceInfo.infoType] && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white">
                {infoTypeLabels[practiceInfo.infoType]}
              </div>
            )}
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
                {/* Render rich text content from Payload CMS */}
                {/* This is a simplified version - you may need to implement a proper rich text renderer */}
                <div dangerouslySetInnerHTML={{ __html: typeof practiceInfo.content === 'string' 
                  ? practiceInfo.content 
                  : JSON.stringify(practiceInfo.content) }} />
                
                {/* Gallery */}
                {practiceInfo.gallery && practiceInfo.gallery.length > 0 && (
                  <div className="mt-12">
                    <h2>Foto&apos;s</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 not-prose">
                      {practiceInfo.gallery.map((item, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
                            <Image 
                              src={item.image.url} 
                              alt={item.image.alt || item.caption || `Afbeelding ${index + 1}`} 
                              fill
                              className="object-cover"
                            />
                          </div>
                          {item.caption && (
                            <p className="text-sm text-neutral-600 mt-2">{item.caption}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Attachments */}
                {practiceInfo.attachments && practiceInfo.attachments.length > 0 && (
                  <div className="mt-12">
                    <h2>Documenten</h2>
                    <div className="space-y-4 not-prose">
                      {practiceInfo.attachments.map((attachment, index) => (
                        <a 
                          key={index}
                          href={attachment.file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start p-4 rounded-lg border border-neutral-200 hover:border-primary-200 hover:shadow-sm transition-all group"
                        >
                          <FileText className="h-6 w-6 text-primary-600 mr-4 flex-shrink-0" />
                          <div>
                            <h3 className="font-bold text-primary-900 group-hover:text-primary-600 transition-colors">
                              {attachment.title}
                            </h3>
                            {attachment.description && (
                              <p className="text-neutral-700 text-sm mt-1">{attachment.description}</p>
                            )}
                            <p className="text-xs text-neutral-500 mt-2">
                              {attachment.file.filename}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-12">
                  <Link 
                    href="/contact" 
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
                  >
                    Contact opnemen
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Practice Info */}
              {relatedPracticeInfo.length > 0 && (
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-primary-900">Meer informatie</h3>
                  <ul className="space-y-3">
                    {relatedPracticeInfo.map((info) => (
                      <li key={info.id}>
                        <Link 
                          href={`/de-praktijk/${info.slug}`}
                          className="text-primary-600 hover:text-primary-700 transition-colors flex items-center"
                        >
                          <span className="mr-2">•</span>
                          <span>{info.title}</span>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link 
                        href="/de-praktijk"
                        className="text-primary-800 hover:text-primary-900 font-medium transition-colors flex items-center"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        <span>Terug naar De Praktijk</span>
                      </Link>
                    </li>
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
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
            Heeft u vragen?
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
            Neem gerust contact met ons op voor meer informatie over onze praktijk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
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