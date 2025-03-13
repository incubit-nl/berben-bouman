import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { serialize } from '@/lib/rich-text-to-html';
import Link from 'next/link';

// Define a simple interface for the page data we need
interface PageData {
  title: string;
  content: string; // HTML content after serialization
  updatedAt: string;
}

// Define the structure of the terms and conditions document
interface TermsAndConditionsDoc {
  id: string;
  title: string;
  content: any;
  lastUpdated?: string;
  updatedAt: string;
  [key: string]: unknown;
}

async function getTermsAndConditions(): Promise<PageData | null> {
  const payload = await getPayload({ config });
  
  try {
    // Query the terms-and-conditions collection
    const result = await payload.find({
      collection: 'terms-and-conditions' as any, // Type assertion to bypass TypeScript check
      limit: 1,
    });
    
    if (result.docs.length === 0) {
      console.log('No terms and conditions found');
      return null;
    }
    
    const termsDoc = result.docs[0] as TermsAndConditionsDoc;
    console.log('Found terms and conditions:', termsDoc.title);
    
    // Serialize the Lexical content to HTML
    const htmlContent = await serialize(termsDoc.content);
    
    return {
      title: termsDoc.title,
      content: htmlContent,
      updatedAt: termsDoc.lastUpdated || termsDoc.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching terms and conditions:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getTermsAndConditions();
  
  if (!page) {
    return {
      title: 'Algemene Voorwaarden | title',
      description: 'De algemene voorwaarden van title Yogaschool in Utrecht.',
    };
  }
  
  return {
    title: `${page.title} | title`,
    description: 'De algemene voorwaarden van title Yogaschool in Utrecht.',
  };
}

export default async function TermsAndConditionsPage() {
  const page = await getTermsAndConditions();
  
  if (!page) {
    notFound();
  }
  
  const formattedDate = page.updatedAt 
    ? format(new Date(page.updatedAt), 'd MMMM yyyy', { locale: nl }) 
    : null;
  
  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-bold mb-2">{page.title}</h1>
      
      {formattedDate && (
        <p className="text-muted-foreground mb-8">
          Laatst bijgewerkt op {formattedDate}
        </p>
      )}
      
      <Card className="border-none shadow-sm mb-8">
        <CardContent className="pt-6">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Heb je vragen over onze algemene voorwaarden? Neem dan{' '}
          <Link href="/contact" className="text-coral hover:text-coral/80 underline">
            contact
          </Link>{' '}
          met ons op.
        </p>
      </div>
    </div>
  );
} 