import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-primary-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-12 sm:pb-16 md:pb-24 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mx-auto max-w-7xl px-6 sm:px-8 md:mt-8 lg:mt-10 lg:px-8 xl:mt-12">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block mb-1">Uw glimlach</span>
                <span className="block text-accent-500">in goede handen</span>
              </h1>
              <p className="mt-5 text-base text-white/90 sm:mt-6 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-6 md:text-xl lg:mx-0">
                Bij Tandartsenpraktijk Berben & Bouman staat uw mondgezondheid centraal. 
                Wij bieden hoogwaardige tandheelkundige zorg in een moderne en comfortabele omgeving.
              </p>
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    href="/contact"
                    className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-accent-600 hover:bg-accent-700 transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl"
                  >
                    Afspraak maken
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4">
                  <Link
                    href="/de-praktijk"
                    className="w-full flex items-center justify-center px-8 py-4 border-2 border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition-all duration-300 transform hover:translate-y-[-2px]"
                  >
                    Meer over ons
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-64 sm:h-72 md:h-96 lg:h-full">
          <Image
            src="/images/berben&bouman.jpg"
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