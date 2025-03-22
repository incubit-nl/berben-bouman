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
      {/* Subtle pattern overlay */}      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center py-12 md:py-16 lg:py-20">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight animate-fade-in-down">
              <span className="block">{heroData.title}</span>
              <span className="block text-accent-500 animate-[fadeInDown_0.6s_ease-out_0.2s_forwards]">
                {heroData.subtitle}
              </span>
            </h1>
            
            <div className="w-16 h-1 bg-accent-500 mx-auto lg:mx-0 rounded-full animate-[fadeInDown_0.6s_ease-out_0.4s_forwards]"></div>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-[fadeInDown_0.6s_ease-out_0.6s_forwards]">
              {heroData.description}
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8 animate-[fadeInDown_0.6s_ease-out_0.8s_forwards]">
              <Link
                href={heroData.primaryButtonUrl}
                className="group inline-flex items-center justify-center px-6 py-3 bg-accent-600 text-white font-medium rounded-full hover:bg-accent-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
              >
                <Calendar className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {heroData.primaryButtonText}
              </Link>
              
              <Link
                href={heroData.secondaryButtonUrl}
                className="group inline-flex items-center justify-center px-6 py-3 border-2 border-white/20 text-white font-medium rounded-full hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                {heroData.secondaryButtonText}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Contact Info */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-white text-sm animate-[fadeInDown_0.6s_ease-out_1s_forwards]">
              <a href="tel:+31306701221" className="flex items-center hover:text-accent-500 transition-colors">
                <Phone className="h-4 w-4 mr-2 text-accent-400" />
                <span className="text-accent-500">+31 30 670 12 21</span>
              </a>
              <span className="hidden sm:block">Ma-Vr: 08:00 - 17:00</span>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[600px] w-full lg:w-auto">
            <Image
              src={heroData.backgroundImage}
              alt="Tandartsenpraktijk Berben & Bouman"
              fill
              className="object-cover rounded-lg shadow-2xl lg:rounded-tr-none lg:rounded-bl-3xl"
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