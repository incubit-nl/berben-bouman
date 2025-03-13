import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Clock, FileText, CalendarCheck, Phone } from 'lucide-react';

export const metadata = {
  title: 'Intake afspraak | Behandelingen',
  description: 'Informatie over de intake afspraak bij Tandartsenpraktijk Berben & Bouman. Wat kunt u verwachten tijdens uw eerste bezoek aan onze praktijk?',
};

export default function IntakeAppointmentPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/images/treatments/intake.jpg" 
            alt="Intake afspraak" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <Link 
              href="/behandelingen" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Terug naar alle behandelingen</span>
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
              Intake afspraak
            </h1>
            <p className="text-lg md:text-xl mb-0 text-white/90">
              Uw eerste kennismaking met onze praktijk
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="prose prose-lg max-w-none">
              <h2>Wat is een intake afspraak?</h2>
              <p>
                Een intake afspraak is uw eerste bezoek aan onze praktijk. Tijdens deze afspraak maken we kennis met elkaar, 
                bespreken we uw tandheelkundige geschiedenis en wensen, en voeren we een uitgebreid onderzoek uit van uw gebit. 
                Dit stelt ons in staat om een volledig beeld te krijgen van uw mondgezondheid en een persoonlijk behandelplan op te stellen.
              </p>

              <h2>Wat kunt u verwachten?</h2>
              <p>
                Tijdens uw intake afspraak bij Tandartsenpraktijk Berben & Bouman doorlopen we de volgende stappen:
              </p>

              <h3>1. Kennismaking en gesprek</h3>
              <p>
                We beginnen met een persoonlijk gesprek waarin we kennismaken en uw verwachtingen bespreken. 
                We nemen de tijd om uw tandheelkundige geschiedenis door te nemen, eventuele klachten te bespreken 
                en uw wensen ten aanzien van uw gebit te inventariseren.
              </p>

              <h3>2. Uitgebreid mondonderzoek</h3>
              <p>
                Vervolgens voeren we een grondig onderzoek uit van uw mond, tanden en kiezen. 
                We controleren op gaatjes, tandvleesproblemen, slijtage en andere aandoeningen. 
                Ook beoordelen we uw kaakgewricht en de stand van uw tanden.
              </p>

              <h3>3. Röntgenfoto&apos;s</h3>
              <p>
                Indien nodig maken we röntgenfoto&apos;s om een compleet beeld te krijgen van uw gebit, 
                inclusief de delen die niet zichtbaar zijn bij een visuele inspectie. 
                Dit helpt ons bij het opsporen van problemen onder het tandvlees of tussen de tanden.
              </p>

              <h3>4. Bespreking van de bevindingen</h3>
              <p>
                Na het onderzoek bespreken we onze bevindingen met u. We leggen uit wat we hebben geconstateerd 
                en wat dit betekent voor uw mondgezondheid. We nemen de tijd om al uw vragen te beantwoorden.
              </p>

              <h3>5. Behandelplan</h3>
              <p>
                Op basis van het onderzoek stellen we een persoonlijk behandelplan op. 
                We bespreken de verschillende behandelopties, de verwachte resultaten en de kosten. 
                U beslist zelf welke behandelingen u wilt laten uitvoeren.
              </p>

              <h3>6. Vervolgafspraken</h3>
              <p>
                Aan het einde van de intake plannen we, indien nodig, vervolgafspraken voor de behandelingen 
                die in uw behandelplan zijn opgenomen. We stemmen deze afspraken af op uw agenda.
              </p>

              <h2>Voorbereiding</h2>
              <p>
                Om uw intake afspraak zo soepel mogelijk te laten verlopen, vragen wij u het volgende mee te nemen:
              </p>
              <ul>
                <li>Een geldig identiteitsbewijs</li>
                <li>Uw verzekeringspas</li>
                <li>Een lijst van medicijnen die u gebruikt (indien van toepassing)</li>
                <li>Eventuele röntgenfoto&apos;s of dossiers van uw vorige tandarts</li>
              </ul>

              <h2>Na de intake</h2>
              <p>
                Na uw intake afspraak bent u officieel patiënt bij Tandartsenpraktijk Berben & Bouman. 
                We nemen u op in ons systeem en zorgen ervoor dat u regelmatig wordt opgeroepen voor controles. 
                Afhankelijk van uw mondgezondheid adviseren we u hoe vaak u voor controle moet komen, 
                meestal is dit twee keer per jaar.
              </p>
            </section>

            {/* FAQ Section */}
            <section className="mt-12 border-t border-neutral-200 pt-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-primary-900">
                Veelgestelde vragen
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary-800">
                    Hoe lang duurt een intake afspraak?
                  </h3>
                  <p className="text-neutral-700">
                    Een intake afspraak duurt ongeveer 30 tot 45 minuten. We nemen de tijd om u goed te leren kennen 
                    en een volledig beeld te krijgen van uw mondgezondheid.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary-800">
                    Worden de kosten van een intake afspraak vergoed?
                  </h3>
                  <p className="text-neutral-700">
                    De kosten van een intake afspraak vallen onder de basisverzekering voor tandheelkundige zorg. 
                    Afhankelijk van uw verzekering en eigen risico kunnen deze kosten geheel of gedeeltelijk worden vergoed. 
                    We adviseren u om dit vooraf te controleren bij uw zorgverzekeraar.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary-800">
                    Kan ik direct na de intake behandeld worden?
                  </h3>
                  <p className="text-neutral-700">
                    In sommige gevallen kunnen we direct na de intake beginnen met eenvoudige behandelingen, 
                    zoals een gebitsreiniging. Voor complexere behandelingen maken we meestal een vervolgafspraak, 
                    zodat we voldoende tijd kunnen reserveren.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-2 text-primary-800">
                    Moet ik me voorbereiden op de intake afspraak?
                  </h3>
                  <p className="text-neutral-700">
                    Het is handig om vooraf na te denken over uw tandheelkundige geschiedenis en eventuele klachten of wensen. 
                    Verder is het belangrijk om de gevraagde documenten mee te nemen, zoals uw identiteitsbewijs en verzekeringspas.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-primary-50 rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-primary-900">
                Praktische informatie
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">Duur</h4>
                    <p className="text-neutral-700">30-45 minuten</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">Benodigde documenten</h4>
                    <ul className="text-neutral-700 list-disc ml-4">
                      <li>Geldig identiteitsbewijs</li>
                      <li>Verzekeringspas</li>
                      <li>Medicatieoverzicht (indien van toepassing)</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <CalendarCheck className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">Afspraak maken</h4>
                    <p className="text-neutral-700 mb-4">
                      U kunt eenvoudig online een afspraak maken of telefonisch contact met ons opnemen.
                    </p>
                    <Link 
                      href="/afspraak-maken" 
                      className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center justify-center w-full"
                    >
                      Online afspraak maken
                    </Link>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">Telefonisch contact</h4>
                    <p className="text-neutral-700">
                      <a href="tel:+31302940150" className="text-primary-600 hover:text-primary-700 transition-colors">
                        030 - 294 01 50
                      </a>
                    </p>
                    <p className="text-neutral-600 text-sm mt-1">
                      Bereikbaar op werkdagen van 8:00 tot 17:00 uur
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-primary-100">
                <h4 className="font-bold text-primary-800 mb-4">Gerelateerde behandelingen</h4>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/behandelingen/periodieke-controle" 
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      Periodieke controle
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/behandelingen/rontgenfoto" 
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      Röntgenfoto&apos;s
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/behandelingen/gebitsreiniging" 
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      Gebitsreiniging
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary-50 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
            Klaar om een afspraak te maken?
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
            Wij verwelkomen u graag in onze praktijk voor een intake afspraak. Neem contact met ons op om een afspraak te plannen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/afspraak-maken" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Afspraak maken
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