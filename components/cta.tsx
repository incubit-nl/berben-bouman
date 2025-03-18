import Link from 'next/link';
import { Calendar, Phone, Clock, CheckCircle2 } from 'lucide-react';

// Add a props type for the component
type CTAProps = {
  isFirstSection?: boolean;
};

export function CTA({ isFirstSection = false }: CTAProps) {
  return (
    <div className="bg-white py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative rounded-2xl shadow-2xl overflow-hidden">
          {/* Background with overlay gradient */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/dental-office-modern.jpg" 
              alt="Moderne tandartspraktijk" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-primary-900/90"></div>
          </div>
          
          <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-24 lg:flex lg:items-center lg:gap-x-12">
            <div className="lg:w-3/5 xl:w-1/2">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                Maak nu een afspraak voor uw tandheelkundige zorg
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Wij staan klaar om u de best mogelijke tandheelkundige zorg te bieden. 
                Neem vandaag nog contact met ons op voor een afspraak of meer informatie.
              </p>
              
              <div className="mt-8 space-y-3">
                <div className="flex items-start text-white">
                  <CheckCircle2 className="h-5 w-5 text-accent-400 mr-3 mt-1" />
                  <p>Persoonlijke benadering en aandacht voor uw wensen</p>
                </div>
                <div className="flex items-start text-white">
                  <CheckCircle2 className="h-5 w-5 text-accent-400 mr-3 mt-1" />
                  <p>Uitgebreide behandelmogelijkheden voor het hele gezin</p>
                </div>
                <div className="flex items-start text-white">
                  <CheckCircle2 className="h-5 w-5 text-accent-400 mr-3 mt-1" />
                  <p>Transparante communicatie en duidelijke uitleg</p>
                </div>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-5">
                <Link
                  href="/contact"
                  className="flex-1 inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-primary-900 bg-white hover:bg-gray-100 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Calendar className="mr-2 h-5 w-5 text-accent-600" />
                  <span className="font-semibold">Online afspraak maken</span>
                </Link>
                <a
                  href="tel:+31301234567"
                  className="flex-1 inline-flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Phone className="mr-2 h-5 w-5 text-accent-400" />
                  <span className="font-semibold">030 - 123 4567</span>
                </a>
              </div>
            </div>
            
            <div className="hidden lg:block lg:w-2/5 xl:w-1/2 mt-12 lg:mt-0">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
                <h3 className="text-xl font-bold text-white mb-5">Openingstijden</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-accent-500 mr-2" />
                      <span className="text-white">Maandag - Vrijdag</span>
                    </div>
                    <span className="text-white">8:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-accent-500 mr-2" />
                      <span className="text-white">Zaterdag</span>
                    </div>
                    <span className="text-white">Gesloten</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-accent-500 mr-2" />
                      <span className="text-white">Zondag</span>
                    </div>
                    <span className="text-white">Gesloten</span>
                  </div>
                </div>
                <div className="mt-6 text-white/80 text-sm">
                  Spoedgevallen buiten openingstijden: Bel 030 - 123 4567 en volg de instructies.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 