import '@/app/(app)/globals.css';
import type { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Header } from '@/components/layout/header';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-heading',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Tandartsenpraktijk Berben & Bouman',
    default: 'Tandartsenpraktijk Berben & Bouman | Utrecht Terwijde',
  },
  description: 'Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde staat voor kwaliteit. Wij kiezen ervoor om enkel met de beste materialen te werken in een moderne en goed uitgeruste praktijk.',
  keywords: ['tandarts', 'Utrecht', 'Terwijde', 'Berben', 'Bouman', 'tandartspraktijk', 'mondhygiënist', 'implantaten', 'kronen', 'vullingen'],
  authors: [{ name: 'Tandartsenpraktijk Berben & Bouman' }],
  creator: 'Tandartsenpraktijk Berben & Bouman',
  publisher: 'Tandartsenpraktijk Berben & Bouman',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#162a55' },
  ],
};

// Fetch practice pages from Payload CMS
async function getPracticePages() {
  try {
    const payload = await getPayload({ config });
    
    const pages = await payload.find({
      collection: 'pages',
      where: {
        pageType: {
          equals: 'practice',
        },
        status: {
          equals: 'published',
        },
      },
    }).then(res => res.docs);
    
    return pages;
  } catch (error) {
    console.error('Error fetching practice pages:', error);
    return [];
  }
}

// Fetch treatment categories from Payload CMS
async function getTreatmentCategories() {
  try {
    const payload = await getPayload({ config });
    
    const treatments = await payload.find({
      collection: 'treatments',
      where: {
        status: {
          equals: 'published',
        },
      },
    }).then(res => res.docs);
    
    // Extract unique categories
    const categories = Array.from(new Set(treatments.map(treatment => treatment.category)));
    
    return categories;
  } catch (error) {
    console.error('Error fetching treatment categories:', error);
    return [];
  }
}

// Get contact info for the header
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const practicePages = await getPracticePages();
  const treatmentCategories = await getTreatmentCategories();
  const contactInfo = await getContactInfo();
  
  return (
    <html lang="nl" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className={`${montserrat.className} antialiased min-h-screen flex flex-col`}>
        <Header 
          contactInfo={contactInfo}
          practicePages={practicePages}
          treatmentCategories={treatmentCategories}
        />
        {children}
      </body>
    </html>
  );
} 