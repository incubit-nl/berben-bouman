import Link from 'next/link';
import { getPayload } from 'payload';
import config from '@payload-config';
import { MapPin, Mail, Phone, Clock, Calendar, ArrowLeft } from 'lucide-react';
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

// Define types for the contact info
interface ContactInfo {
  title?: string;
  address?: {
    street?: string;
    postalCode?: string;
    city?: string;
    area?: string;
  };
  contactDetails?: {
    phone?: string;
    email?: string;
    kvkNumber?: string;
    agbCode?: string;
  };
  openingHours?: Array<{
    day: string;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  }>;
  emergencyInfo?: {
    phone?: string;
    alternatePhone?: string;
    instructions?: any;
  };
  mapEmbed?: string;
}

async function getContactData() {
  try {
    const payload = await getPayload({ config });
    
    // Fetch the contact page
    const contactPage = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'contact',
        }
      },
    }).then(res => res.docs[0] || null);
    
    // Fetch contact info
    const contactInfoData = await payload.find({
      collection: 'contact-info',
      limit: 1,
    }).then(res => (res.docs.length > 0 ? res.docs[0] : null) as any as ContactInfo);
    
    return { contactPage, contactInfo: contactInfoData };
  } catch (error) {
    console.error('Error fetching contact data:', error);
    return { contactPage: null, contactInfo: null };
  }
}

export default async function ContactPage() {
  const { contactPage, contactInfo } = await getContactData();

  // Format opening hours for display
  const formatOpeningHours = () => {
    if (!contactInfo?.openingHours?.length) {
      // Fallback opening hours
      return {
        monday: '8:00 - 17:00',
        tuesday: '8:00 - 17:00',
        wednesday: '8:00 - 17:00',
        thursday: '8:00 - 17:00',
        friday: '8:00 - 17:00',
        saturday: 'Gesloten',
        sunday: 'Gesloten',
      };
    }

    const hoursMap: Record<string, string> = {
      monday: 'Gesloten',
      tuesday: 'Gesloten',
      wednesday: 'Gesloten',
      thursday: 'Gesloten',
      friday: 'Gesloten',
      saturday: 'Gesloten',
      sunday: 'Gesloten',
    };

    contactInfo.openingHours.forEach(item => {
      if (item.isClosed) {
        hoursMap[item.day] = 'Gesloten';
      } else {
        hoursMap[item.day] = `${item.openTime} - ${item.closeTime}`;
      }
    });

    return hoursMap;
  };

  const openingHours = formatOpeningHours();

  // Get address information
  const street = contactInfo?.address?.street || 'Musicallaan 413';
  const postalCode = contactInfo?.address?.postalCode || '3543 EE';
  const city = contactInfo?.address?.city || 'Utrecht';
  const area = contactInfo?.address?.area || 'Wijk Terwijde';
  
  // Get contact details
  const phone = contactInfo?.contactDetails?.phone || '030 - 294 01 50';
  const email = contactInfo?.contactDetails?.email || 'info@berben-bouman.nl';
  
  // Get emergency information
  const emergencyPhone = contactInfo?.emergencyInfo?.phone || '030 - 294 01 51';
  
  // Get map embed code or use fallback
  const mapEmbed = contactInfo?.mapEmbed || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d159.34949378320016!2d5.050466950084864!3d52.09946265638086!2m3!1f0!2f39.44418271812732!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x47c66feb9ec71695%3A0xfd5000d44a744ebe!2sTandartsenpraktijk%20Berben%20%26%20Bouman!5e1!3m2!1sen!2snl!4v1742649241080!5m2!1sen!2snl';

  return (
    <div className="flex flex-col">
      {/* Hero Section (Exact Copy from TreatmentPage) */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
        </div>
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
                  src={mapEmbed} 
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
                  <MapPin className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-4" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">Adres</h4>
                    <p className="text-neutral-700">
                      {street}<br />
                      {postalCode} {city}<br />
                      {area}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-4" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">Telefoon</h4>
                    <a 
                      href={`tel:+31${phone.replace(/[^0-9]/g, '')}`}
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {phone}
                    </a>
                    <p className="text-neutral-600 text-sm mt-1">
                      Bereikbaar op werkdagen van 8:00 tot 17:00 uur
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-4" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">E-mail</h4>
                    <a 
                      href={`mailto:${email}`}
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary-600 mr-3 flex-shrink-0 mt-4" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">Openingstijden</h4>
                    <ul className="text-neutral-700">
                      <li className="flex justify-between">
                        <span className="min-w-[100px]">Maandag</span>
                        <span>{openingHours.monday}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="min-w-[100px]">Dinsdag</span>
                        <span>{openingHours.tuesday}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="min-w-[100px]">Woensdag</span>
                        <span>{openingHours.wednesday}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="min-w-[100px]">Donderdag</span>
                        <span>{openingHours.thursday}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="min-w-[100px]">Vrijdag</span>
                        <span>{openingHours.friday}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="min-w-[100px]">Zaterdag</span>
                        <span>{openingHours.saturday}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="min-w-[100px]">Zondag</span>
                        <span>{openingHours.sunday}</span>
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
                  href={`tel:+31${emergencyPhone.replace(/[^0-9]/g, '')}`}
                  className="bg-primary-600 hover:bg-primary-700 text-primary-900 px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center justify-center w-full"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{emergencyPhone}</span>
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
              href={`tel:+31${phone.replace(/[^0-9]/g, '')}`}
              className="bg-white hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              <span>{phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}