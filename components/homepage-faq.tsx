'use client';

import { useMemo } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { RichTextType } from '@/lib/rich-text-to-html';

export interface HomepageFaqItem {
  id: string;
  question: string;
  answer: RichTextType | string;
  category: string;
  order: number;
}

interface HomepageFaqProps {
  faqs: HomepageFaqItem[];
  title?: string;
  subtitle?: string;
  showCategories?: boolean;
}

export function HomepageFaq({ 
  faqs, 
  title = "Veelgestelde vragen", 
  subtitle = "Vind antwoorden op de meest voorkomende vragen over onze studio en yoga",
  showCategories = false
}: HomepageFaqProps) {
  // Safety check
  if (!faqs || faqs.length === 0) {
    return null;
  }
  
  // Sort FAQs by order
  const sortedFaqs = useMemo(() => {
    return [...faqs].sort((a, b) => a.order - b.order);
  }, [faqs]);
  
  return (
    <section className="py-16">
      <div className="container max-w-4xl mx-auto px-4">
        {title && subtitle && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-medium mb-3 text-primary-600">{title}</h2>
            <p className="text-olive/80 text-lg">{subtitle}</p>
          </div>
        )}
        
        <Accordion type="single" collapsible className="w-full">
          {sortedFaqs.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id}
              className="border-b border-brown/10"
            >
              <AccordionTrigger 
                className="py-6 text-2xl font-medium text-primary-600 hover:text-primary-600 hover:no-underline group"
              >
                {faq.question || 'FAQ Question'}
              </AccordionTrigger>
              <AccordionContent className="pb-8">
                {faq.answer ? (
                  <div 
                    className="prose max-w-none text-olive/90
                      prose-headings:text-primary-600 prose-headings:font-medium 
                      prose-strong:text-primary-600 prose-strong:font-medium
                      prose-p:leading-relaxed prose-p:text-olive/90
                      prose-ul:pl-5 prose-ol:pl-5 prose-li:marker:text-coral 
                      prose-li:text-olive/90 prose-li:mb-3
                      [&_strong]:text-primary-600 [&_strong]:font-medium
                      [&>p]:text-lg [&>ul>li]:text-lg [&>ol>li]:text-lg"
                    dangerouslySetInnerHTML={{ __html: typeof faq.answer === 'string' ? faq.answer : JSON.stringify(faq.answer) }} 
                  />
                ) : (
                  <p className="text-olive/90 text-lg leading-relaxed">No answer available.</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        
        <div className="mt-16 text-center">
          <a 
            href="/faq" 
            className="inline-flex items-center justify-center rounded-full border-2 border-coral px-8 py-3 text-base font-medium text-coral hover:bg-coral hover:text-white transition-colors duration-200"
          >
            Bekijk alle FAQs
          </a>
        </div>
      </div>
    </section>
  );
} 