import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Phone, ChevronRight } from 'lucide-react';
import { getPayload } from 'payload';
import config from '@payload-config';

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
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      }
    },
  }).then(res => res.docs[0]);
  
  const extractPlainText = (richText: any) => {
    if (!richText) return '';
    try {
      if (typeof richText === 'string') return richText;
      return richText.root?.children
        ?.map((node: any) => node.children?.map((child: any) => child.text || '').join('') || '')
        .join(' ') || '';
    } catch (e) {
      return '';
    }
  };
  
  return {
    title: page?.hero?.heroTitle?.split(' ')[0] || 'Uw glimlach',
    subtitle: page?.hero?.heroTitle?.split(' ').slice(1).join(' ') || 'in goede handen',
    description: extractPlainText(page?.hero?.heroContent) || 'Bij Tandartsenpraktijk Berben & Bouman staat uw mondgezondheid centraal. Wij bieden hoogwaardige tandheelkundige zorg in een moderne en comfortabele omgeving.',
    primaryButtonText: 'Afspraak maken',
    primaryButtonUrl: '/contact',
    secondaryButtonText: 'Meer over ons',
    secondaryButtonUrl: '/de-praktijk',
    backgroundImage: '/images/berben&bouman.jpg'
  };
}

export default async function Hero() {
  const heroData = await getHeroData();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-900 via-primary-800 to-primary-700">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-800/80 to-transparent"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-400/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-600/10 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
      
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:32px_32px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8 z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-accent-400 text-sm font-medium mb-2 backdrop-blur-sm">
              Welkom bij Tandartsenpraktijk Berben & Bouman
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight">
              <span className="block mb-3">{heroData.title}</span>
              <span className="bg-gradient-to-r from-accent-400 to-accent-500 bg-clip-text text-transparent">
                {heroData.subtitle}
              </span>
            </h1>
            
            <div className="w-24 h-1.5 bg-accent-500 mx-auto lg:mx-0 rounded-full"></div>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {heroData.description}
            </p>
            
            {/* Quick Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="bg-accent-500/20 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-accent-400" />
                </div>
                <div className="text-white text-left">
                  <div className="text-xs text-white">Telefonisch bereikbaar</div>
                  <a href="tel:+31306701221" className="text-accent-400 font-medium hover:text-accent-400 transition-colors">
                    +31 30 670 12 21
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <div className="bg-accent-500/20 p-2 rounded-lg">
                  <Calendar className="h-5 w-5 text-accent-400" />
                </div>
                <div className="text-white text-left">
                  <div className="text-xs text-white/70">Openingstijden</div>
                  <div className="text-sm font-medium">Ma-Vr: 08:00-17:00</div>
                </div>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mt-10">
              <Link
                href={heroData.primaryButtonUrl}
                className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-medium rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                {heroData.primaryButtonText}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              
              <Link
                href={heroData.secondaryButtonUrl}
                className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white font-medium rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                {heroData.secondaryButtonText}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative h-96 md:h-[550px] w-full overflow-hidden rounded-2xl lg:rounded-[2rem] shadow-2xl">
            <Image
              src={heroData.backgroundImage}
              alt="Tandartsenpraktijk Berben & Bouman"
              fill
              className="object-cover transition-transform hover:scale-105 duration-700"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/70 via-primary-800/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}