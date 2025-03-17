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

export const metadata: Metadata = {
  title: 'Veelgestelde vragen | title',
  description: 'Vind antwoorden op de meest voorkomende vragen over onze yoga studio en lessen.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

async function getFAQs(): Promise<Faq[]> {
  const payload = await getPayload({ config });
  const { docs: faqs } = await payload.find({
    collection: 'faq',
    // Use a compatible sort format for Payload
    sort: 'order',
    // Fetch all FAQs - we'll organize them in the component
  });
  return faqs;
}

export default async function FAQPage() {
  const faqs = await getFAQs();

  // Sort FAQs to prioritize non-homepage FAQs within each category
  const sortedFaqs = [...faqs].sort((a, b) => {
    // First sort by homepage (non-homepage first)
    if ((a as any).homepage !== (b as any).homepage) {
      return (a as any).homepage ? 1 : -1;
    }
    // Then sort by order
    return (a.order || 0) - (b.order || 0);
  });

  // Group FAQs by category
  const faqsByCategory = sortedFaqs.reduce((acc, faq) => {
    const category = faq.category || 'Algemeen';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, Faq[]>);

  // Pre-process all FAQs to generate HTML
  const processedFaqsByCategory: Record<string, { id: string; question: string; answer: string }[]> = {};
  
  for (const category of Object.keys(faqsByCategory)) {
    processedFaqsByCategory[category] = await Promise.all(
      faqsByCategory[category].map(async (faq) => {
        const answerHtml = await serialize(faq.answer);
        return {
          id: faq.id,
          question: faq.question,
          answer: answerHtml
        };
      })
    );
  }

  return (
    <main className="bg-cream">
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-medium mb-3 text-primary-600">Veelgestelde vragen</h1>
            <p className="text-olive/80 text-lg">Vind antwoorden op de meest voorkomende vragen over onze studio en yoga</p>
          </div>

          <div className="space-y-16">
            {Object.entries(processedFaqsByCategory).map(([category, categoryFaqs]) => (
              <div key={category} className="space-y-6">
                <h2 className="inline-flex px-4 py-1.5 text-lg font-medium text-primary-600 border-2 border-primary-600/20 rounded-full">
                  {category}
                </h2>
                
                <Accordion type="single" collapsible className="w-full">
                  {categoryFaqs.map((faq) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={faq.id}
                      className="border-b border-primary-600/10"
                    >
                      <AccordionTrigger 
                        className="py-6 text-2xl font-medium text-primary-600 hover:text-primary-600 hover:no-underline group"
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

          <div className="mt-16 bg-sage/5 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-medium text-primary-600 mb-4">
              Nog steeds vragen?
            </h2>
            <p className="text-olive/90 text-lg mb-6">
              Neem gerust contact met ons op. We helpen je graag verder!
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-coral px-8 py-3 text-base font-medium text-coral hover:bg-coral hover:text-white transition-colors duration-200"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}