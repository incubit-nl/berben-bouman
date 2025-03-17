import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata = {
  title: 'De Praktijk',
  description: 'Informatie over Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde. Leer meer over onze moderne praktijk, ons team en onze diensten.',
};

export default function PracticeOverviewPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/images/practice-exterior.jpg" 
            alt="Tandartsenpraktijk exterieur" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-accent-50">
              De Praktijk
            </h1>
            <p className="text-lg md:text-xl mb-0 text-white/90">
              Moderne tandheelkundige zorg in een comfortabele omgeving
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <p className="lead text-xl text-neutral-700 mb-6">
                  Vanaf 4 januari 2016 is Tandartsenpraktijk Berben & Bouman een feit.
                </p>
                
                <p>
                  Het praktijkpand heeft een mooie centrale ligging in Terwijde en is goed bereikbaar vanuit Utrecht stad en Leidsche Rijn. U kunt bij ons voor een breed scala aan tandheelkundige behandelingen terecht. Wij staan voor kwaliteit en kiezen er voor om enkel met de beste materialen en apparatuur te werken. Door de rustige sfeer in de praktijk en ons vriendelijke team zult u zich snel op uw gemak zult voelen.
                </p>
                
                <p>
                  Voorkomen is beter dan genezen. Daarom staat &apos;preventie&apos; bij ons in de praktijk op nummer één. Wij zullen u hier vanaf het begin in adviseren en begeleiden. Wij nemen graag de zorg voor uw gebit in handen!
                </p>

                <div className="my-8">
                  <Image 
                    src="/images/practice-interior-2.jpg" 
                    alt="Interieur van de praktijk" 
                    width={800}
                    height={500}
                    className="rounded-lg w-full h-auto"
                  />
                </div>

                <h2>Onze missie</h2>
                <p>
                  Bij Tandartsenpraktijk Berben & Bouman streven wij ernaar om hoogwaardige tandheelkundige zorg te bieden in een ontspannen en comfortabele omgeving. Wij geloven in een persoonlijke benadering waarbij de wensen en behoeften van onze patiënten centraal staan.
                </p>

                <h2>Onze visie</h2>
                <p>
                  Wij zien tandheelkunde als een combinatie van wetenschap, techniek en kunst. Door continu op de hoogte te blijven van de nieuwste ontwikkelingen en technieken, kunnen wij onze patiënten de best mogelijke zorg bieden. Wij streven ernaar om een langdurige relatie op te bouwen met onze patiënten, gebaseerd op vertrouwen en wederzijds respect.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link 
                    href="/de-praktijk/ons-team" 
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
                  >
                    Ons team
                  </Link>
                  <Link 
                    href="/de-praktijk/praktijkrondleiding" 
                    className="bg-white hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
                  >
                    Praktijkrondleiding
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-primary-900">Praktijkinformatie</h3>
                <ul className="space-y-4">
                  <li className="flex">
                    <MapPin className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="block text-neutral-900">Adres</strong>
                      <span className="text-neutral-700">
                        Louis Armstronglaan 1<br />
                        3543 EB Utrecht<br />
                        (Terwijde)
                      </span>
                    </div>
                  </li>
                  <li className="flex">
                    <Phone className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="block text-neutral-900">Telefoon</strong>
                      <a href="tel:+31306701221" className="text-primary-600 hover:text-primary-700 transition-colors">
                        +31 30 670 12 21
                      </a>
                    </div>
                  </li>
                  <li className="flex">
                    <Mail className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="block text-neutral-900">E-mail</strong>
                      <a href="mailto:info@berben-bouman.nl" className="text-primary-600 hover:text-primary-700 transition-colors">
                        info@berben-bouman.nl
                      </a>
                    </div>
                  </li>
                  <li className="flex">
                    <Clock className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <strong className="block text-neutral-900">Openingstijden</strong>
                      <span className="text-neutral-700">
                        Maandag t/m Vrijdag:<br />
                        08:00 - 17:00 uur
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-primary-50 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-primary-900">Praktijkonderdelen</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/de-praktijk/ons-team" className="text-primary-600 hover:text-primary-700 transition-colors">
                      Ons team
                    </Link>
                  </li>
                  <li>
                    <Link href="/de-praktijk/praktijkrondleiding" className="text-primary-600 hover:text-primary-700 transition-colors">
                      Praktijkrondleiding
                    </Link>
                  </li>
                  <li>
                    <Link href="/de-praktijk/praktijkregels" className="text-primary-600 hover:text-primary-700 transition-colors">
                      Praktijkregels
                    </Link>
                  </li>
                  <li>
                    <Link href="/de-praktijk/begroting" className="text-primary-600 hover:text-primary-700 transition-colors">
                      Begroting
                    </Link>
                  </li>
                  <li>
                    <Link href="/de-praktijk/tarieven" className="text-primary-600 hover:text-primary-700 transition-colors">
                      Tarieven
                    </Link>
                  </li>
                  <li>
                    <Link href="/de-praktijk/facturen" className="text-primary-600 hover:text-primary-700 transition-colors">
                      Facturen
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
            Wilt u zich inschrijven als patiënt?
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
            Wij nemen graag nieuwe patiënten aan. Schrijf u in of neem contact met ons op voor meer informatie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/inschrijven" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Inschrijven als patiënt
            </Link>
            <Link 
              href="/contact" 
              className="bg-white hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Contact opnemen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 