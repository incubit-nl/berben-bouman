import Link from 'next/link';
import { Calendar, Phone, Clock, CheckCircle2 } from 'lucide-react';
import { getPayload } from 'payload';
import config from '@payload-config';

// Add a props type for the component
type CTAProps = {
  isFirstSection?: boolean;
};

// Define type for CTA data
type CTAData = {
  title: string;
  description: string;
  benefits: string[];
  phone: string;
  emergencyText: string;
  openingHours: {
    day: string;
    time: string;
    isClosed: boolean;
  }[];
  ctaButtonText: string;
  ctaButtonUrl: string;
  backgroundImage: string;
};

// Define types for API data
type ContactInfo = {
  contactDetails?: {
    phone?: string;
  };
  openingHours?: Array<{
    day: string;
    openTime?: string;
    closeTime?: string;
    isClosed?: boolean;
  }>;
  emergencyInfo?: {
    instructions?: any;
  };
};

type PracticeInfoBenefit = {
  text: string;
};

type PracticeInfo = {
  benefits?: PracticeInfoBenefit[];
};

async function getCTAData(): Promise<CTAData> {
  const payload = await getPayload({ config });
  
  // Get contact info for phone number
  const contactInfo = await payload.find({
    collection: 'contact-info',
    limit: 1
  }).then(res => res.docs[0]) as ContactInfo;
  
  // Get practice info for benefit points
  const practiceInfo = await payload.find({
    collection: 'practice-info',
    limit: 1
  }).then(res => res.docs[0]) as PracticeInfo;
  
  // Format opening hours
  const formatOpeningHours = () => {
    if (!contactInfo?.openingHours) {
      return [
        { day: 'Maandag - Vrijdag', time: '8:00 - 17:00', isClosed: false },
        { day: 'Zaterdag', time: 'Gesloten', isClosed: true },
        { day: 'Zondag', time: 'Gesloten', isClosed: true },
      ];
    }
    
    // Group weekday hours if they're the same
    const weekdayHours = contactInfo.openingHours
      .filter((hour) => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(hour.day))
      .map((hour) => ({
        day: hour.day,
        time: hour.isClosed ? 'Gesloten' : `${hour.openTime} - ${hour.closeTime}`,
        isClosed: !!hour.isClosed
      }));
    
    // Check if all weekdays have the same hours
    const allWeekdaysSameHours = weekdayHours.every((h) => 
      h.time === weekdayHours[0].time
    );
    
    const result = [];
    
    // If all weekdays have the same hours, group them
    if (allWeekdaysSameHours && weekdayHours.length === 5) {
      result.push({
        day: 'Maandag - Vrijdag',
        time: weekdayHours[0].time,
        isClosed: weekdayHours[0].isClosed
      });
    } else {
      // Otherwise, add each weekday separately
      weekdayHours.forEach((hour) => {
        const dayMap: Record<string, string> = {
          'monday': 'Maandag',
          'tuesday': 'Dinsdag',
          'wednesday': 'Woensdag',
          'thursday': 'Donderdag',
          'friday': 'Vrijdag'
        };
        
        result.push({
          day: dayMap[hour.day] || hour.day,
          time: hour.time,
          isClosed: hour.isClosed
        });
      });
    }
    
    // Add weekend days
    const saturday = contactInfo.openingHours.find((h) => h.day === 'saturday');
    const sunday = contactInfo.openingHours.find((h) => h.day === 'sunday');
    
    result.push({
      day: 'Zaterdag',
      time: saturday?.isClosed ? 'Gesloten' : `${saturday?.openTime} - ${saturday?.closeTime}`,
      isClosed: saturday?.isClosed || true
    });
    
    result.push({
      day: 'Zondag',
      time: sunday?.isClosed ? 'Gesloten' : `${sunday?.openTime} - ${sunday?.closeTime}`,
      isClosed: sunday?.isClosed || true
    });
    
    return result;
  };
  
  // Extract benefit points from practice info
  const getBenefits = () => {
    const defaultBenefits = [
      'Persoonlijke benadering en aandacht voor uw wensen',
      'Uitgebreide behandelmogelijkheden voor het hele gezin',
      'Transparante communicatie en duidelijke uitleg'
    ];
    
    if (!practiceInfo?.benefits) return defaultBenefits;
    
    return practiceInfo.benefits.map((benefit) => benefit.text).slice(0, 3);
  };
  
  // Get emergency instructions
  const getEmergencyText = () => {
    if (!contactInfo?.emergencyInfo?.instructions) {
      return 'Spoedgevallen buiten openingstijden: Bel het praktijknummer en volg de instructies.';
    }
    
    // Handle rich text or string
    if (typeof contactInfo.emergencyInfo.instructions === 'string') {
      return contactInfo.emergencyInfo.instructions;
    }
    
    // Simple text extraction from rich text
    try {
      return contactInfo.emergencyInfo.instructions.root?.children
        ?.map((node: any) => node.children?.map((child: any) => child.text || '').join('') || '')
        .join(' ') || 'Spoedgevallen buiten openingstijden: Bel het praktijknummer en volg de instructies.';
    } catch (e) {
      return 'Spoedgevallen buiten openingstijden: Bel het praktijknummer en volg de instructies.';
    }
  };
  
  return {
    title: 'Maak nu een afspraak voor uw tandheelkundige zorg',
    description: 'Wij staan klaar om u de best mogelijke tandheelkundige zorg te bieden. Neem vandaag nog contact met ons op voor een afspraak of meer informatie.',
    benefits: getBenefits(),
    phone: contactInfo?.contactDetails?.phone || '+31 30 670 12 21',
    emergencyText: getEmergencyText(),
    openingHours: formatOpeningHours(),
    ctaButtonText: 'Online afspraak maken',
    ctaButtonUrl: '/contact',
    backgroundImage: '/images/dental-office-modern.jpg'
  };
}

export async function CTA({ isFirstSection = false }: CTAProps) {
  const ctaData = await getCTAData();
  
  return (
    <div className="bg-white py-24 relative overflow-hidden">
      {/* Background pattern */}      
      <div className="container mx-auto px-6 relative z-10">
        <div className="relative rounded-2xl shadow-2xl overflow-hidden">
          {/* Background with overlay gradient */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-900/95 to-primary-800/90"></div>
          </div>
          
          <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-24 lg:flex lg:items-center lg:gap-x-12">
            <div className="lg:w-3/5 xl:w-1/2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500/20 text-accent-300 text-sm font-medium mb-6">
                Maak een afspraak
              </span>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                {ctaData.title}
              </h2>
              
              <div className="w-20 h-1 bg-accent-500 mt-6 mb-6"></div>
              
              <p className="text-lg text-white/90">
                {ctaData.description}
              </p>
              
              <div className="mt-8 space-y-4">
                {ctaData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start text-white group">
                    <div className="flex-shrink-0 bg-accent-500/20 rounded-full p-1.5 mt-0.5 group-hover:bg-accent-500/30 transition-colors">
                      <CheckCircle2 className="h-4 w-4 text-accent-300" />
                    </div>
                    <p className="text-white ml-3">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-5">
                <Link
                  href={ctaData.ctaButtonUrl}
                  className="flex-1 inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-accent-600 hover:bg-accent-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Calendar className="mr-2 h-5 w-5 text-white" />
                  <span className="font-semibold">{ctaData.ctaButtonText}</span>
                </Link>
                <a
                  href={`tel:${ctaData.phone.replace(/\s/g, '')}`}
                  className="flex-1 inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-base font-medium rounded-lg text-white hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"
                >
                  <Phone className="mr-2 h-5 w-5 text-accent-300" />
                  <span className="font-semibold">{ctaData.phone}</span>
                </a>
              </div>
            </div>
            
            <div className="hidden lg:block lg:w-2/5 xl:w-1/2 mt-12 lg:mt-0">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20 shadow-lg">
                <h3 className="text-xl font-bold text-white mb-5 flex items-center">
                  <Clock className="h-5 w-5 text-accent-400 mr-2" />
                  Openingstijden
                </h3>
                <div className="space-y-4">
                  {ctaData.openingHours.map((hours, index) => (
                    <div key={index} className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-white font-medium">{hours.day}</span>
                      <span className={`text-white px-3 py-1 rounded-full ${hours.isClosed ? 'bg-red-500/20' : 'bg-green-500/20'} text-sm`}>
                        {hours.time}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Emergency information */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="bg-accent-700/30 p-4 rounded-lg">
                    <h4 className="font-bold text-white mb-2">Spoed?</h4>
                    <p className="text-white/90 text-sm">{ctaData.emergencyText}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 