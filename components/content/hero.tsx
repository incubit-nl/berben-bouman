import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Phone } from 'lucide-react';
import { getPayload } from 'payload';
import config from '@payload-config';

// Define Media type
type Media = {
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
};

// Add types for the data
type HeroData = {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonUrl?: string;
  secondaryButtonText?: string;
  secondaryButtonUrl?: string;
  backgroundImage?: string;
};

async function getHeroData() {
  const payload = await getPayload({ config });
  const homePage = await payload.find({
    collection: 'home-page',
    limit: 1,
  }).then(res => res.docs[0]);
  
  // Extract plain text from rich text if needed
  const extractPlainText = (richText: any) => {
    if (!richText) return '';
    // Simple extraction of text content
    try {
      if (typeof richText === 'string') return richText;
      return richText.root?.children
        ?.map((node: any) => node.children?.map((child: any) => child.text || '').join('') || '')
        .join(' ') || '';
    } catch (e) {
      return '';
    }
  };
  
  // Get the hero image URL
  const heroImageUrl = typeof homePage?.hero?.heroImage === 'string' 
    ? homePage.hero.heroImage 
    : (homePage?.hero?.heroImage as Media | undefined)?.url;
  
  // Return data from CMS or fallback to defaults
  return {
    title: homePage?.hero?.heroTitle?.split(' ')[0] || 'Uw glimlach',
    subtitle: homePage?.hero?.heroTitle?.split(' ').slice(1).join(' ') || 'in goede handen',
    description: extractPlainText(homePage?.hero?.heroSubtitle) || 'Bij Tandartsenpraktijk Berben & Bouman staat uw mondgezondheid centraal. Wij bieden hoogwaardige tandheelkundige zorg in een moderne en comfortabele omgeving.',
    primaryButtonText: homePage?.hero?.ctaText || 'Afspraak maken',
    primaryButtonUrl: homePage?.hero?.ctaLink || '/contact',
    secondaryButtonText: 'Meer over ons',
    secondaryButtonUrl: '/de-praktijk',
    backgroundImage: heroImageUrl || '/images/berben&bouman.jpg'
  };
}

export async function Hero() {
  const heroData = await getHeroData();
  
  return (
    <div className="relative bg-gradient-to-r from-primary-900 to-primary-800 overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] opacity-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-16 sm:pb-20 md:pb-28 lg:max-w-2xl lg:w-full lg:pb-32 xl:pb-36">
          <main className="mx-auto max-w-7xl px-6 sm:px-8 md:mt-10 lg:mt-12 lg:px-8 xl:mt-16">
            <div className="sm:text-center lg:text-left">
              
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block mb-1">{heroData.title}</span>
                <span className="block text-accent-500">{heroData.subtitle}</span>
              </h1>
              
              <div className="w-20 h-1 bg-accent-500 mt-6 mb-6 lg:mx-0 mx-auto lg:ml-0"></div>
              
              <p className="text-base text-white/90 sm:text-lg sm:max-w-xl sm:mx-auto md:text-xl lg:mx-0">
                {heroData.description}
              </p>
              
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                <Link
                  href={heroData.primaryButtonUrl}
                  className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-accent-600 hover:bg-accent-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  {heroData.primaryButtonText}
                </Link>
                
                <Link
                  href={heroData.secondaryButtonUrl}
                  className="w-full mt-4 sm:mt-0 flex items-center justify-center px-8 py-4 border-2 border-white/20 text-base font-medium rounded-lg text-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
                >
                  {heroData.secondaryButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              
              {/* Quick contact info */}
              <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 sm:gap-8 text-white text-sm sm:justify-center lg:justify-start">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-accent-400" />
                  <a href="tel:+31306701221" className="text-accent-500 hover:text-white">+31 30 670 12 21</a>
                </div>
                <div className="hidden sm:block">
                  Ma-Vr: 08:00 - 17:00
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-64 sm:h-72 md:h-96 lg:h-full">
          <Image
            src={heroData.backgroundImage}
            alt="Tandartsenpraktijk Berben & Bouman"
            fill
            className="object-cover object-center lg:rounded-bl-3xl shadow-2xl"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/80 to-transparent lg:from-primary-900 lg:via-primary-900/70 lg:to-transparent" />
        
        </div>
      </div>
      
      {/* Decorative wave element */}
      <div className="absolute bottom-0 left-0 right-0 h-8 md:h-12 overflow-hidden">
        <svg className="absolute bottom-0 w-full text-white" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path 
            fill="currentColor" 
            d="M0,32L80,26.7C160,21,320,11,480,16C640,21,800,43,960,42.7C1120,43,1280,21,1360,10.7L1440,0L1440,48L1360,48C1280,48,1120,48,960,48C800,48,640,48,480,48C320,48,160,48,80,48L0,48Z">
          </path>
        </svg>
      </div>
    </div>
  );
} 