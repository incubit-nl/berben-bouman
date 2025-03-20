import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getPayload } from 'payload';
import config from '@payload-config';
import { Faq } from '@/payload-types'; // Generated type for FAQ collection
import { serialize } from '@/lib/rich-text-to-html';
import { Metadata, Viewport } from 'next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Veelgestelde vragen | Berben & Bouman',
  description: 'Vind antwoorden op de meest voorkomende vragen over onze tandartspraktijk en behandelingen.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

async function getFAQData(): Promise<Faq | null> {
  const payload = await getPayload({ config });
  const { docs: faqs } = await payload.find({
    collection: 'faq',
    limit: 1, // Fetch the single FAQ document
  });
  return faqs[0] || null;
}

export default async function FAQPage() {
  const faqData = await getFAQData();

  // Process FAQs with proper async handling
  const processedFaqsByCategory = faqData && faqData.faqItems
    ? await (async () => {
        const sortedFaqs = [...faqData.faqItems].sort((a, b) => a.order - b.order);
        const faqsByCategory = sortedFaqs.reduce((acc, faq) => {
          const category = faq.category || 'general';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(faq);
          return acc;
        }, {} as Record<string, typeof sortedFaqs>);

        const result: Record<string, { id: string; question: string; answer: string }[]> = {};
        for (const category of Object.keys(faqsByCategory)) {
          result[category] = await Promise.all(
            faqsByCategory[category].map(async (faq) => {
              const answerHtml = await serialize(faq.answer); // Await the async serialization
              const faqId = `${faq.question}-${faq.order}`;
              return {
                id: faqId,
                question: faq.question,
                answer: answerHtml,
              };
            })
          );
        }
        return result;
      })()
    : {};

  // Map category values to display names
  const categoryDisplayNames: Record<string, string> = {
    general: 'Algemene Tandheelkunde',
    treatments: 'Behandelingen',
    insurance: 'Verzekering & Kosten',
    practice: 'Praktijk & Afspraak',
  };

  return (
    <main className="bg-cream min-h-screen">
      {/* Hero Section (Copied from TreatmentPage) */}
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-accent-50">
              {faqData?.title || 'Veelgestelde vragen'}
            </h1>
            <p className="text-lg md:text-xl mb-0 text-white/90">
              Vind antwoorden op de meest voorkomende vragen over onze tandartspraktijk
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:grid lg:grid-cols-3 lg:gap-12">
          {/* FAQ Content */}
          <div className="lg:col-span-2">
            {!faqData || !faqData.faqItems ? (
              <div className="text-center mb-12 bg-white p-8 rounded-lg shadow-sm">
                <p className="text-olive/80 text-lg">Geen FAQs beschikbaar op dit moment.</p>
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(processedFaqsByCategory).map(([category, categoryFaqs]) => (
                  <div key={category} className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="inline-flex px-4 py-1.5 text-lg font-medium text-primary-600 border-2 border-primary-600/20 rounded-full mb-6">
                      {categoryDisplayNames[category] || category}
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                      {categoryFaqs.map((faq) => (
                        <AccordionItem 
                          key={faq.id} 
                          value={faq.id}
                          className="border-b border-primary-600/10"
                        >
                          <AccordionTrigger 
                            className="py-6 text-xl md:text-2xl font-medium text-primary-600 hover:text-primary-600 hover:no-underline group"
                          >
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="pb-8">
                            <div 
                              className="prose max-w-none text-olive/90
                                prose-headings:text-primary-600 prose-headings:font-medium 
                                prose-strong:text-primary-600 prose-strong:font-medium
                                prose-p:leading-relaxed prose-p:text-olive/90
                                prose-ul:pl-5 prose-ol:pl-5 prose-li:marker:text-coral 
                                prose-li:text-olive/90 prose-li:mb-3
                                [&_strong]:text-primary-600 [&_strong]:font-medium
                                [&>p]:text-lg [&>ul>li]:text-lg [&>ol>li]:text-lg"
                              dangerouslySetInnerHTML={{ __html: faq.answer }} 
                            />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 mt-12 lg:mt-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h3 className="text-xl font-medium text-primary-600 mb-4">Snelle links</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/contact" 
                    className="text-olive/90 hover:text-coral flex items-center transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Contact opnemen
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/inschrijven" 
                    className="text-olive/90 hover:text-coral flex items-center transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Inschrijven als patiënt
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/afspraak-maken" 
                    className="text-olive/90 hover:text-coral flex items-center transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Afspraak maken
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/de-praktijk" 
                    className="text-olive/90 hover:text-coral flex items-center transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Over de praktijk
                  </Link>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-primary-600/10">
                <p className="text-olive/80 text-sm mb-4">
                  Telefonisch bereikbaar: <br />
                  <a href="tel:+31302940150" className="text-coral hover:text-coral-dark">030 - 294 01 50</a>
                </p>
                <p className="text-olive/80 text-sm">
                  Ma - Vr: 8:00 - 17:00
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sage/5">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white p-8 rounded-2xl shadow-sm max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-medium text-primary-600 mb-4">
              Nog steeds vragen?
            </h2>
            <p className="text-olive/90 text-lg mb-6">
              Neem gerust contact met ons op. We helpen je graag verder!
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-coral px-8 py-3 text-base font-medium text-coral hover:bg-coral hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}