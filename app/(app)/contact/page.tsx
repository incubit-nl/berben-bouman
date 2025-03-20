import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getPayload } from 'payload';
import config from '@payload-config';
import { ContactForm } from '@/components/ui/contact-form';
import { MapPin, Mail, Building, CreditCard, ExternalLink, ChevronRight, Phone, Clock, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Tandartsenpraktijk Berben & Bouman',
  description: 'Neem contact op met Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde. Vind onze contactgegevens, openingstijden en locatie.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

async function getContactPage() {
  const payload = await getPayload({ config });
  const page = await payload.find({
    collection: 'practice-pages',
    where: {
      slug: {
        equals: 'contact',
      }
    },
  }).then(res => res.docs[0]);
  return page;
}

export default async function ContactPage() {
  const page = await getContactPage();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/images/contact-hero.jpg" 
            alt="Contact" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-accent-50">
              Contact
            </h1>
            <p className="text-lg md:text-xl mb-0 text-white/90">
              Neem contact met ons op voor vragen of het maken van een afspraak
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg border border-neutral-200">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900 text-center">
                Stuur ons een bericht
              </h2>
              <p className="text-neutral-700 mb-8 text-center">
                Heeft u een vraag of wilt u meer informatie? Vul het onderstaande formulier in en wij nemen zo snel mogelijk contact met u op.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                      Voornaam *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                      Achternaam *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                    Telefoonnummer
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-1">
                    Onderwerp *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Selecteer een onderwerp</option>
                    <option value="appointment">Afspraak maken</option>
                    <option value="question">Vraag over behandeling</option>
                    <option value="registration">Inschrijving als patiënt</option>
                    <option value="emergency">Spoedgeval</option>
                    <option value="other">Overig</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                    Bericht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    required
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-neutral-700">
                    Ik ga akkoord met de <Link href="/privacy" className="text-primary-600 hover:text-primary-700 transition-colors">privacyverklaring</Link> en geef toestemming voor het verwerken van mijn gegevens.
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
                  >
                    Versturen
                  </button>
                </div>
              </form>
            </div>

            {/* Map Section */}
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900 text-center">
                Onze locatie
              </h2>
              <div className="aspect-video relative rounded-lg overflow-hidden border border-neutral-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2450.643924410514!2d5.041193312804578!3d52.104411671838314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c66fe78f2fa5cb%3A0x1244314e5623322a!2sMusicallaan%20413%2C%203543%20EE%20Utrecht!5e0!3m2!1snl!2snl!4v1742291492607!5m2!1snl!2snl" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-primary-50 rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-primary-900 text-center">
                Contactgegevens
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">Adres</h4>
                    <p className="text-neutral-700">
                      Musicallaan 413<br />
                      3543 EE Utrecht<br />
                      Wijk Terwijde
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">Telefoon</h4>
                    <a 
                      href="tel:+31302940150"
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      030 - 294 01 50
                    </a>
                    <p className="text-neutral-600 text-sm mt-1">
                      Bereikbaar op werkdagen van 8:00 tot 17:00 uur
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">E-mail</h4>
                    <a 
                      href="mailto:info@berben-bouman.nl"
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      info@berben-bouman.nl
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">Openingstijden</h4>
                    <ul className="text-neutral-700">
                      <li className="flex justify-between">
                        <span>Maandag</span>
                        <span>8:00 - 17:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Dinsdag</span>
                        <span>8:00 - 17:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Woensdag</span>
                        <span>8:00 - 17:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Donderdag</span>
                        <span>8:00 - 17:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Vrijdag</span>
                        <span>8:00 - 17:00</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Zaterdag</span>
                        <span>Gesloten</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Zondag</span>
                        <span>Gesloten</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-primary-100">
                <h4 className="font-bold text-primary-800 mb-4 text-center">Spoedgevallen</h4>
                <p className="text-neutral-700 mb-4 text-center">
                  Heeft u buiten openingstijden dringend een tandarts nodig? Bel dan de spoedlijn.
                </p>
                <a 
                  href="tel:+31302940151" 
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center justify-center w-full"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  <span>030 - 294 01 51</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary-50 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900 text-center">
            Liever direct een afspraak maken?
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto text-center">
            U kunt eenvoudig online een afspraak maken of telefonisch contact met ons opnemen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/afspraak-maken" 
              className="bg-white hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              <Calendar className="h-5 w-5 mr-2" />
              <span>Online afspraak maken</span>
            </Link>
            <a 
              href="tel:+31302940150" 
              className="bg-white hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              <span>030 - 294 01 50</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}