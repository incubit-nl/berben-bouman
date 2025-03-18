import { Clock, Heart, Shield, Users, CheckCircle2, Sparkles } from 'lucide-react';
import { getPayload } from 'payload';
import config from '@payload-config';
import Image from 'next/image';
// Add a props type for the component
type FeaturesProps = {
  isFirstSection?: boolean;
};

// Define types for features data
type Feature = {
  name: string;
  description: string;
  icon: React.ElementType;
};

type FeaturesData = {
  title: string;
  subtitle: string;
  features: Feature[];
  infoTitle: string;
  infoDescription: string;
  infoPoints: string[];
  infoImage: string;
};

// Define CMS types
type PracticeInfoFeature = {
  title?: string;
  description?: string;
  icon?: string;
};

type PracticeInfo = {
  features?: PracticeInfoFeature[];
  whyUsTitle?: string;
  whyUsDescription?: string;
  qualityTitle?: string;
  qualityDescription?: string;
};

type Treatment = {
  category: string;
};

// Map icon names to components
const iconMap: Record<string, React.ElementType> = {
  'clock': Clock,
  'heart': Heart,
  'shield': Shield,
  'users': Users,
  'sparkles': Sparkles,
  'check-circle': CheckCircle2,
};

async function getFeaturesData(): Promise<FeaturesData> {
  const payload = await getPayload({ config });
  
  // Get practice info for feature points
  const practiceInfo = await payload.find({
    collection: 'practice-info',
    limit: 1
  }).then(res => res.docs[0]) as PracticeInfo;
  
  // Get treatments for the info points
  const treatments = await payload.find({
    collection: 'treatments',
    limit: 4
  }).then(res => res.docs) as Treatment[];
  
  // Extract service categories from treatments
  const getServiceCategories = () => {
    if (!treatments?.length) return [
      'Preventieve tandheelkunde',
      'Esthetische behandelingen',
      'Uitgebreide mondzorg',
      'Kindvriendelijke aanpak'
    ];
    
    return treatments
      .map(treatment => treatment.category)
      .filter((cat, index, self) => self.indexOf(cat) === index)
      .slice(0, 4);
  };
  
  // Map feature from CMS data if available
  const getFeatures = (): Feature[] => {
    const defaultFeatures = [
      {
        name: 'Moderne apparatuur',
        description: 'Wij werken met de nieuwste technologieën en materialen voor de beste resultaten.',
        icon: Sparkles,
      },
      {
        name: 'Persoonlijke aandacht',
        description: 'U krijgt bij ons de tijd en aandacht die u verdient, in een rustige en comfortabele omgeving.',
        icon: Heart,
      },
      {
        name: 'Flexibele tijden',
        description: 'Ruime openingstijden en spoedafspraken mogelijk voor optimale service.',
        icon: Clock,
      },
      {
        name: 'Ervaren team',
        description: 'Ons team van specialisten staat klaar om u de beste zorg te bieden.',
        icon: Users,
      },
    ];
    
    if (!practiceInfo?.features) return defaultFeatures;
    
    return practiceInfo.features.map((feature: PracticeInfoFeature) => ({
      name: feature.title || '',
      description: feature.description || '',
      icon: iconMap[feature.icon || 'sparkles'] || Sparkles
    })).slice(0, 4);
  };
  
  return {
    title: practiceInfo?.whyUsTitle || 'Waarom kiezen voor ons?',
    subtitle: practiceInfo?.whyUsDescription || 'Bij Tandartsenpraktijk Berben & Bouman staat kwaliteit en patiënttevredenheid voorop.',
    features: getFeatures(),
    infoTitle: practiceInfo?.qualityTitle || 'Hoogwaardige tandheelkundige zorg',
    infoDescription: practiceInfo?.qualityDescription || 'Wij streven ernaar de best mogelijke zorg te bieden in een ontspannen en comfortabele omgeving. Onze praktijk is uitgerust met de nieuwste technologie om de meest effectieve behandelingen te kunnen bieden.',
    infoPoints: getServiceCategories(),
    infoImage: '/images/modern-dentistry.jpg'
  };
}

export async function Features({ isFirstSection = false }: FeaturesProps) {
  const data = await getFeaturesData();
  
  return (
    <div className="bg-white py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-8 md:h-12 overflow-hidden rotate-180">
        <svg className="absolute top-0 w-full text-primary-900" viewBox="0 0 1440 48" preserveAspectRatio="none">
          <path 
            fill="currentColor" 
            d="M0,32L80,26.7C160,21,320,11,480,16C640,21,800,43,960,42.7C1120,43,1280,21,1360,10.7L1440,0L1440,48L1360,48C1280,48,1120,48,960,48C800,48,640,48,480,48C320,48,160,48,80,48L0,48Z">
          </path>
        </svg>
      </div>
      
      {/* Decorative circles */}
      <div className="absolute right-0 top-20 w-64 h-64 bg-accent-500/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute left-0 bottom-20 w-96 h-96 bg-primary-500/5 rounded-full translate-y-1/3 -translate-x-1/3"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-medium mb-4">
            Onderscheidend
          </span>
          <h2 className="text-3xl font-extrabold text-primary-900 sm:text-4xl text-center">
            {data.title}
          </h2>
          <div className="w-16 h-1 bg-accent-500 mx-auto my-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {data.features.map((feature, index) => (
            <div 
              key={feature.name} 
              className="group relative bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-primary-200"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-accent-500/20 to-primary-500/10 group-hover:from-accent-500/30 group-hover:to-primary-500/20 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-accent-600" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-primary-900">{feature.name}</h3>
                <p className="mt-3 text-base text-gray-600">{feature.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent-500 to-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-xl"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-24 bg-gradient-to-br from-primary-50 to-primary-100/50 rounded-2xl overflow-hidden shadow-sm relative">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] opacity-5"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
            <div className="p-8 lg:p-12">
              <span className="inline-block px-3 py-1 rounded-full bg-accent-500/10 text-accent-600 text-sm font-medium mb-4">
                Uitstekende zorg
              </span>
              <h3 className="text-2xl font-bold text-primary-900 mb-4">{data.infoTitle}</h3>
              <div className="w-12 h-1 bg-accent-500 mb-6"></div>
              <p className="text-gray-600 mb-8">
                {data.infoDescription}
              </p>
              <ul className="space-y-4">
                {data.infoPoints.map((item, index) => (
                  <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-accent-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-full min-h-[24rem] md:min-h-full">
              <Image 
                src={data.infoImage} 
                alt="Moderne tandheelkunde" 
                className="object-cover h-full w-full transition-transform duration-700 hover:scale-105"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-transparent mix-blend-multiply z-10"></div>
              <div className="absolute bottom-8 left-8 bg-white p-4 rounded-lg shadow-lg z-20 max-w-xs">
                <p className="text-sm font-semibold text-primary-900">Hoogwaardige tandheelkundige zorg in Utrecht Terwijde</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 