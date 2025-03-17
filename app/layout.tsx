import '../app/(app)/globals.css';
import type { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className={`${montserrat.className} antialiased min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
} 