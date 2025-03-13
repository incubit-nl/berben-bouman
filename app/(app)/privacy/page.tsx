import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { nl } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { serialize } from '@/lib/rich-text-to-html';

// Define a simple interface for the page data we need
interface PageData {
  title: string;
  content: string; // HTML content after serialization
  updatedAt: string;
}

// Define the structure of the privacy document
interface PrivacyDoc {
  id: string;
  title: string;
  content: any;
  lastUpdated?: string;
  updatedAt: string;
  [key: string]: unknown;
}

async function getPrivacyPolicy(): Promise<PageData | null> {
  const payload = await getPayload({ config });
  
  try {
    // Query the dedicated privacy collection
    const result = await payload.find({
      collection: 'privacy' as any, // Type assertion to bypass TypeScript check
      limit: 1,
    });
    
    if (result.docs.length === 0) {
      console.log('No privacy policy found');
      return null;
    }
    
    const privacyDoc = result.docs[0] as PrivacyDoc;
    console.log('Found privacy policy:', privacyDoc.title);
    
    // Serialize the Lexical content to HTML
    const htmlContent = await serialize(privacyDoc.content);
    
    return {
      title: privacyDoc.title,
      content: htmlContent,
      updatedAt: privacyDoc.lastUpdated || privacyDoc.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching privacy policy:', error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPrivacyPolicy();
  
  if (!page) {
    return {
      title: 'Privacybeleid | title',
      description: 'Het privacybeleid van title Yogaschool in Utrecht.',
    };
  }
  
  return {
    title: `${page.title} | title`,
    description: 'Het privacybeleid van title Yogaschool in Utrecht.',
  };
}

export default async function PrivacyPage() {
  const page = await getPrivacyPolicy();
  
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
          <div className="prose prose-sm prose-ol:list-decimal prose-ol:pl-5 prose-li:pl-0 max-w-none privacy-content">
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          Heb je vragen over ons privacybeleid? Neem dan{' '}
          <a href="/contact" className="text-coral hover:text-coral/80 underline">
            contact
          </a>{' '}
          met ons op.
        </p>
      </div>
    </div>
  );
} 