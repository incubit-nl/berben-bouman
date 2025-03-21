import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'De Praktijk | Tandartsenpraktijk Berben & Bouman',
  description: 'Ontdek Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde. Hoogwaardige tandheelkundige zorg in een moderne, vriendelijke omgeving.',
};

export default function PracticeOverviewPage() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50"> {/* Changed bg-gray-50 to bg-neutral-50 */}
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20"></div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Terug naar home</span>
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-white"> 
              De Praktijk
            </h1>
            <p className="text-lg md:text-xl mb-0 text-white/90">
              Hoogwaardige tandheelkundige zorg in een moderne en vriendelijke omgeving
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-6 text-center"> {/* Changed font-serif to font-heading */}
              Welkom bij Berben & Bouman
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Sinds 4 januari 2016 is Tandartsenpraktijk Berben & Bouman uw vertrouwde tandarts in Utrecht Terwijde. Onze centraal gelegen praktijk is goed bereikbaar vanuit Utrecht stad en Leidsche Rijn. Wij combineren persoonlijke aandacht met de nieuwste technieken om uw gebit gezond te houden.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-md overflow-hidden border border-neutral-200"> {/* Changed rounded-xl shadow-md to rounded-md border-neutral-200 */}
              <Image
                src="/images/Behandeling_bewerkt.jpg"
                alt="Behandelkamer"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <p className="text-center mt-2 text-sm text-neutral-600">Moderne behandelkamer</p>
            </div>
            <div className="relative rounded-md overflow-hidden border border-neutral-200">
              <Image
                src="/images/behandeling_2_bewerkt.jpg"
                alt="Ons team"
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <p className="text-center mt-2 text-sm text-neutral-600">Ons vriendelijke team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-primary-50"> {/* Changed bg-primary-50 styling */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-md border border-neutral-200"> {/* Changed rounded-xl shadow-lg to rounded-md border-neutral-200 */}
              <h3 className="text-2xl font-heading font-bold text-primary-900 mb-4"> {/* Changed font-serif to font-heading */}
                Onze Missie
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                Wij bieden hoogwaardige tandheelkundige zorg in een ontspannen sfeer. Uw wensen en behoeften staan centraal, en wij streven naar een persoonlijke benadering bij elke behandeling.
              </p>
            </div>
            <div className="bg-white p-8 rounded-md border border-neutral-200">
              <h3 className="text-2xl font-heading font-bold text-primary-900 mb-4">
                Onze Visie
              </h3>
              <p className="text-neutral-700 leading-relaxed">
                Tandheelkunde combineren met wetenschap en kunst. Door innovatieve technieken en continue scholing zorgen wij voor de beste zorg en een langdurige vertrouwensband met onze patiënten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Info & Navigation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-heading font-bold text-primary-900 mb-8"> {/* Changed font-serif to font-heading */}
                Wat maakt ons bijzonder?
              </h2>
              <ul className="space-y-6 text-neutral-700">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4"> {/* Changed accent-100 to primary-100 */}
                    <span className="text-primary-600 font-bold">1</span> {/* Changed accent-600 to primary-600 */}
                  </div>
                  <div>
                    <strong className="block text-lg text-primary-900">Preventieve Zorg</strong>
                    <p>Wij focussen op het voorkomen van problemen met advies en begeleiding voor een gezond gebit.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-600 font-bold">2</span>
                  </div>
                  <div>
                    <strong className="block text-lg text-primary-900">Moderne Technologie</strong>
                    <p>Met state-of-the-art apparatuur en de beste materialen leveren wij topkwaliteit.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-primary-600 font-bold">3</span>
                  </div>
                  <div>
                    <strong className="block text-lg text-primary-900">Persoonlijke Aandacht</strong>
                    <p>Een warm, vriendelijk team zorgt ervoor dat u zich thuis voelt bij elke afspraak.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/team"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-900 border border-neutral-300 font-medium rounded-md hover:bg-neutral-100 transition-all duration-300"
                >
                  Ontmoet ons team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  href="/de-praktijk/praktijkrondleiding"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-900 border border-neutral-300 font-medium rounded-md hover:bg-neutral-100 transition-all duration-300"
                >
                  Virtuele rondleiding
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-primary-50 rounded-md p-6 mb-6 top-6 border border-neutral-200"> {/* Changed styling */}
                <h3 className="text-xl font-heading font-bold text-primary-900 mb-4"> {/* Changed font-serif to font-heading */}
                  Praktijkinformatie
                </h3>
                <ul className="space-y-6 text-neutral-700">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary-600 mr-3 mt-1 flex-shrink-0" /> {/* Changed accent-600 to primary-600 */}
                    <div>
                      <strong className="block text-primary-900">Adres</strong>
                      <p>Louis Armstronglaan 1<br />3543 EB Utrecht (Terwijde)</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Phone className="h-5 w-5 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="block text-primary-900">Telefoon</strong>
                      <a href="tel:+31306701221" className="text-primary-600 hover:text-primary-700 transition-colors">
                        030 670 12 21
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail className="h-5 w-5 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="block text-primary-900">E-mail</strong>
                      <a href="mailto:info@berben-bouman.nl" className="text-primary-600 hover:text-primary-700 transition-colors">
                        info@berben-bouman.nl
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-primary-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="block text-primary-900">Openingstijden</strong>
                      <p>Ma - Vr: 08:00 - 17:00 uur</p>
                    </div>
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-primary-900 border border-neutral-300 font-medium rounded-md hover:bg-primary-700 transition-all duration-300"
                >
                  Maak een afspraak
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>

              <div className="bg-white rounded-md p-6 border border-neutral-200"> {/* Changed styling */}
                <h3 className="text-xl font-heading font-bold text-primary-900 mb-4"> {/* Changed font-serif to font-heading */}
                  Ontdek meer
                </h3>
                <ul className="space-y-3 text-neutral-700">
                  <li>
                    <Link href="/team" className="text-primary-600 hover:text-primary-700 transition-colors flex items-center">
                      Ons Team
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/de-praktijk/praktijkrondleiding" className="text-primary-600 hover:text-primary-700 transition-colors flex items-center">
                      Praktijkrondleiding
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/de-praktijk/praktijkregels" className="text-primary-600 hover:text-primary-700 transition-colors flex items-center">
                      Praktijkregels
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/de-praktijk/tarieven" className="text-primary-600 hover:text-primary-700 transition-colors flex items-center">
                      Tarieven
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50 text-center"> {/* Changed gradient to solid bg-primary-50 */}
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-6 flex items-center justify-center"> {/* Changed font-serif to font-heading */}
            Word patiënt bij ons
          </h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto mb-8">
            Wij verwelkomen nieuwe patiënten en staan klaar om uw gebit gezond te houden. Schrijf u in of neem contact op voor meer informatie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://www.anamneselijst.nl/Berben-Bouman/"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-900 border border-neutral-300 font-medium rounded-md hover:bg-neutral-100 transition-all duration-300 text-lg" 
            >
              Inschrijven
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-900 border border-neutral-300 font-medium rounded-md hover:bg-neutral-100 transition-all duration-300 text-lg" 
            >
              Contact
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}