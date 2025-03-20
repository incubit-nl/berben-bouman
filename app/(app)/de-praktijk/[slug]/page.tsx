import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Phone } from 'lucide-react';
import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/ui/rich-text';
import { Button } from '@/components/ui/button';

// Define Media type
type Media = {
  url: string;
  filename: string;
  alt?: string;
};

// Define types for content blocks
type TextContentBlock = {
  blockType: 'textContent';
  content: any;
};

type ImageWithTextBlock = {
  blockType: 'imageWithText';
  image: Media;
  text: any;
  imagePosition: 'left' | 'right';
};

type TeamMemberBlock = {
  blockType: 'teamMember';
  name: string;
  role: string;
  image?: Media;
  bio: any;
  specialties?: Array<{ specialty: string }>;
};

type FacilityHighlightBlock = {
  blockType: 'facilityHighlight';
  title: string;
  description: any;
  images?: Array<{ image: Media }>;
};

type ContentBlock = TextContentBlock | ImageWithTextBlock | TeamMemberBlock | FacilityHighlightBlock;

interface PracticePage {
  id: string;
  title: string;
  slug: string;
  status: 'published' | 'draft';
  hero: {
    heroImage?: Media;
    heroTitle?: string;
    heroContent?: any;
  };
  content?: ContentBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  showInNavigation?: boolean;
  navigationOrder?: number;
}

type ContactInfo = {
  contactDetails?: {
    phone?: string;
    email?: string;
    openingHours?: {
      day: string;
      hours: string;
    }[];
  };
};

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPracticePage(params.slug);
  
  if (!page) {
    return {
      title: 'Pagina niet gevonden | Tandartsenpraktijk Berben & Bouman',
    };
  }

  return {
    title: page.seo?.metaTitle || `${page.title} | Tandartsenpraktijk Berben & Bouman`,
    description: page.seo?.metaDescription || `Meer informatie over ${page.title} bij Tandartsenpraktijk Berben & Bouman.`,
  };
}

// Fetch practice page from Payload CMS
async function getPracticePage(slug: string): Promise<PracticePage | null> {
  try {
    const payload = await getPayload({ config });
    const page = await payload.find({
      collection: 'practice-pages',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      limit: 1,
    }).then(res => res.docs[0] as PracticePage | null);
    return page;
  } catch (error) {
    console.error('Error fetching practice page:', error);
    return null;
  }
}

// Get related practice pages
async function getRelatedPages(currentSlug: string): Promise<PracticePage[]> {
  try {
    const payload = await getPayload({ config });
    const pages = await payload.find({
      collection: 'practice-pages',
      where: {
        slug: { not_equals: currentSlug },
        status: { equals: 'published' },
        showInNavigation: { equals: true },
      },
      limit: 3,
      sort: 'navigationOrder',
    }).then(res => res.docs as PracticePage[]);
    return pages;
  } catch (error) {
    console.error('Error fetching related pages:', error);
    return [];
  }
}

// Get contact info for the sidebar
async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const payload = await getPayload({ config });
    const contactInfo = await payload.find({
      collection: 'contact-info',
      limit: 1,
    }).then(res => res.docs[0] as ContactInfo);
    return contactInfo;
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }
}

export default async function PracticePage({ params }: PageProps) {
  const page = await getPracticePage(params.slug);

  if (!page) {
    notFound();
  }

  const [relatedPages, contactInfo] = await Promise.all([
    getRelatedPages(page.slug),
    getContactInfo(),
  ]);

  // Default contact values if CMS data is not available
  const phone = contactInfo?.contactDetails?.phone || '+31 30 670 12 21';
  const openingHours = contactInfo?.contactDetails?.openingHours || [
    { day: 'Maandag t/m Vrijdag', hours: '08:00 - 17:00' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        {page.hero?.heroImage && (
          <div className="absolute inset-0 z-0 opacity-20">
            <Image
              src={page.hero.heroImage.url}
              alt={page.hero.heroImage.alt || page.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <Link
              href="/de-praktijk"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Terug naar de praktijk</span>
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-accent-50">
              {page.hero?.heroTitle || page.title}
            </h1>
            {page.hero?.heroContent && (
              <div className="text-lg md:text-xl text-white/90">
                <RichText content={page.hero.heroContent} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-white flex-grow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                {page.content?.map((block, index) => {
                  switch (block.blockType) {
                    case 'textContent':
                      return (
                        <div key={index} className="mb-12">
                          <RichText content={block.content} />
                        </div>
                      );
                    case 'imageWithText':
                      return (
                        <div
                          key={index}
                          className={`flex flex-col ${block.imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 mb-12 items-center not-prose`}
                        >
                          <div className="flex-1">
                            <Image
                              src={block.image.url}
                              alt={block.image.alt || block.image.filename}
                              width={600}
                              height={400}
                              className="rounded-lg shadow-lg w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 prose">
                            <RichText content={block.text} />
                          </div>
                        </div>
                      );
                    case 'teamMember':
                      return (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-12 not-prose">
                          <div className="flex flex-col md:flex-row gap-8">
                            {block.image && (
                              <div className="md:w-1/3">
                                <Image
                                  src={block.image.url}
                                  alt={block.image.alt || block.name}
                                  width={300}
                                  height={400}
                                  className="rounded-lg w-full object-cover"
                                />
                              </div>
                            )}
                            <div className="md:flex-1">
                              <h2 className="text-2xl font-bold mb-2">{block.name}</h2>
                              <h3 className="text-lg text-gray-600 mb-4">{block.role}</h3>
                              <div className="prose">
                                <RichText content={block.bio} />
                              </div>
                              {block.specialties && block.specialties.length > 0 && (
                                <div className="mt-4">
                                  <h4 className="font-semibold mb-2">Specialisaties:</h4>
                                  <ul className="list-disc list-inside text-gray-700">
                                    {block.specialties.map((specialty, i) => (
                                      <li key={i}>{specialty.specialty}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    case 'facilityHighlight':
                      return (
                        <div key={index} className="mb-12 not-prose">
                          <h2 className="text-2xl font-bold mb-4">{block.title}</h2>
                          <div className="prose mb-6">
                            <RichText content={block.description} />
                          </div>
                          {block.images && block.images.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {block.images.map((img, i) => (
                                <Image
                                  key={i}
                                  src={img.image.url}
                                  alt={img.image.alt || `${block.title} - Afbeelding ${i + 1}`}
                                  width={400}
                                  height={300}
                                  className="rounded-lg shadow-md w-full h-64 object-cover"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
              <div className="mt-12">
                <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 font-medium">
                  <Link href="/contact">Maak een afspraak</Link>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Quick Contact */}
              <div className="bg-primary-50 rounded-lg p-6 mb-6 sticky top-6">
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
                    <ul className="text-neutral-800">
                      {openingHours.map((entry, i) => (
                        <li key={i}>{`${entry.day}: ${entry.hours}`}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Related Pages */}
              {relatedPages.length > 0 && (
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-primary-900">Meer over de praktijk</h3>
                  <ul className="space-y-4">
                    {relatedPages.map((relatedPage) => (
                      <li key={relatedPage.id}>
                        <Link
                          href={`/de-praktijk/${relatedPage.slug}`}
                          className="flex items-start group"
                        >
                          <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0 mr-3">
                            {relatedPage.hero?.heroImage ? (
                              <Image
                                src={relatedPage.hero.heroImage.url}
                                alt={relatedPage.hero.heroImage.alt || relatedPage.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-primary-100" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-primary-900 group-hover:text-primary-600 transition-colors">
                              {relatedPage.title}
                            </h4>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}