import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Tandartsenpraktijk Berben & Bouman',
    default: 'Tandartsenpraktijk Berben & Bouman | Utrecht Terwijde',
  },
  description: 'Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde staat voor kwaliteit. Wij kiezen ervoor om enkel met de beste materialen te werken in een moderne en goed uitgeruste praktijk.',
  keywords: ['tandarts', 'Utrecht', 'Terwijde', 'Berben', 'Bouman', 'tandartspraktijk', 'mondhygiënist', 'implantaten', 'kronen', 'vullingen'],
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

// Separate viewport export as per Next.js recommendation
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#416276',
};

// Fetch contact info for the header
async function getContactInfo() {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: 'contact-info',
      limit: 1,
    });

    if (docs && docs.length > 0) {
      return docs[0];
    }
    return null;
  } catch (error) {
    console.error('Contact info fetch error:', error);
    return null;
  }
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactInfo = await getContactInfo();
  
  return (
    <div className={`flex flex-col min-h-screen ${openSans.variable}`}>
      <Header contactInfo={contactInfo} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer contactInfo={contactInfo} />
    </div>
  );
}