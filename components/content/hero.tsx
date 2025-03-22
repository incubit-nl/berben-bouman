import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Phone } from 'lucide-react';
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
    <div className="relative bg-gradient-to-r from-primary-900 to-primary-800 overflow-hidden">
      {/* Background pattern for depth */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center py-16 md:py-20 lg:py-24">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8 z-10">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight animate-fade-in-down">
              <span className="block mb-2">{heroData.title}</span>
              <span className="block text-accent-500 animate-[fadeInDown_0.6s_ease-out_0.2s_forwards]">
                {heroData.subtitle}
              </span>
            </h1>
            
            <div className="w-20 h-1.5 bg-accent-500 mx-auto lg:mx-0 rounded-full animate-[fadeInDown_0.6s_ease-out_0.4s_forwards]"></div>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-[fadeInDown_0.6s_ease-out_0.6s_forwards]">
              {heroData.description}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mt-10 animate-[fadeInDown_0.6s_ease-out_0.8s_forwards]">
              <Link
                href={heroData.primaryButtonUrl}
                className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {heroData.primaryButtonText}
              </Link>
              
              <Link
                href={heroData.secondaryButtonUrl}
                className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                {heroData.secondaryButtonText}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative h-80 sm:h-96 md:h-[500px] lg:h-[650px] w-full lg:w-auto overflow-hidden">
            <Image
              src={heroData.backgroundImage}
              alt="Tandartsenpraktijk Berben & Bouman"
              fill
              className="object-cover rounded-2xl shadow-2xl lg:rounded-tr-none lg:rounded-bl-[4rem] transition-transform hover:scale-105 duration-700"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent lg:bg-gradient-to-l lg:from-primary-900/50 lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}