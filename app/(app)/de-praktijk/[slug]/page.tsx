import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Phone } from 'lucide-react';
import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RichText } from '@/components/ui/rich-text';

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

// Define types for our data
interface PracticePage {
  id: string;
  title: string;
  slug: string;
  pageType: string;
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
}

// Define the params interface
interface Params {
  slug: string;
}

// Define the page props interface with params as a Promise
interface PageProps {
  params: Promise<Params>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params; // Await the params Promise
  const page = await getPracticePage(slug);
  
  if (!page) {
    return {
      title: 'Pagina niet gevonden | Tandartsenpraktijk Berben & Bouman',
    };
  }

  return {
    title: page.seo?.metaTitle || `${page.title} | Tandartsenpraktijk Berben & Bouman`,
    description: page.seo?.metaDescription,
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

export default async function PracticePage({ params }: PageProps) {
  const { slug } = await params; // Await the params Promise
  const page = await getPracticePage(slug);

  if (!page) {
    notFound();
  }

  const relatedPages = await getRelatedPages(page.slug);
  const contactInfo = await getContactInfo();

  // Default contact values if CMS data is not available
  const phone = contactInfo?.contactDetails?.phone || '+31 30 670 12 21';

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          {page.hero?.heroImage && (
            <Image
              src={page.hero.heroImage.url}
              alt={page.hero.heroImage.alt || page.title}
              fill
              className="object-cover"
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
              <span>Terug naar de praktijk</span>
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-accent-50">
              {page.hero?.heroTitle || page.title}
            </h1>
            {page.hero?.heroContent && (
              <div className="text-lg md:text-xl mb-0 text-white/90">
                <RichText content={page.hero.heroContent} />
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
                        <div key={index} className={`flex flex-col ${block.imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 mb-12 items-center not-prose`}>
                          <div className="flex-1">
                            <Image
                              src={block.image.url}
                              alt={block.image.alt || ''}
                              width={600}
                              height={400}
                              className="rounded-lg shadow-lg w-full"
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
                                  className="rounded-lg w-full"
                                />
                              </div>
                            )}
                            <div className="md:w-2/3">
                              <h2 className="text-2xl font-bold mb-2">{block.name}</h2>
                              <h3 className="text-lg text-gray-600 mb-4">{block.role}</h3>
                              <div className="prose">
                                <RichText content={block.bio} />
                              </div>
                              {block.specialties && block.specialties.length > 0 && (
                                <div className="mt-4">
                                  <h4 className="font-semibold mb-2">Specialisaties:</h4>
                                  <ul className="list-disc list-inside">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                alt={relatedPage.title}
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}