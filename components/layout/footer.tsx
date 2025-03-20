import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from 'lucide-react';

interface FooterProps {
  contactInfo?: any;
}

export function Footer({ contactInfo }: FooterProps) {
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'De Praktijk', href: '/de-praktijk' },
      { name: 'Behandelingen', href: '/behandelingen' },
      { name: 'Team', href: '/team' },
      { name: 'Werken bij', href: '/werken-bij' },
      { name: 'Contact', href: '/contact' },
    ],
    patients: [
      { name: 'Kinderen', href: '/kinderen' },
      { name: 'Afspraak maken', href: '/contact#afspraak' },
      { name: 'English', href: '/english' },
    ],
    legal: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Algemene voorwaarden', href: '/terms' },
      { name: 'FAQ', href: '/faq' },
    ],
  };

  // Default contact values if CMS data is not available
  const phone = contactInfo?.contactDetails?.phone || '030 - 123 4567';
  const email = contactInfo?.contactDetails?.email || 'info@berbenbouman.nl';
  const address = contactInfo?.contactDetails?.address || 'Terwijde 1, 3543 DM Utrecht';

  return (
    <footer className="bg-primary-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Image
              src="/images/logo_large.png"
              alt="Tandartsenpraktijk Berben & Bouman"
              width={200}
              height={60}
              className="mb-4"
            />
            <p className="text-sm text-white/80 mb-4">
              Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde staat voor kwaliteit. 
              Wij kiezen ervoor om enkel met de beste materialen te werken in een moderne 
              en goed uitgeruste praktijk.
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg text-white/80 font-semibold mb-4">Navigatie</h3>
            <div className="grid grid-cols-1 gap-2">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Patient Links */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg text-white/80 font-semibold mb-4">Voor patiënten</h3>
              <div className="grid grid-cols-1 gap-2">
                {navigation.patients.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg text-white/80 font-semibold mb-4">Overige informatie</h3>
              <div className="grid grid-cols-1 gap-2">
                {navigation.legal.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg text-white/80 font-semibold mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-white/80">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{address}</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-white/80">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>{phone}</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-white/80">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>{email}</span>
                </li>
              </ul>
            </div>

            {/* Opening Hours */}
            <div>
              <h3 className="text-lg text-white/80 font-semibold mb-4">Openingstijden</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span>Ma - Vr: 8:00 - 17:00</span>
                </li>
                <li className="pl-6">Za - Zo: Gesloten</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Tandartsenpraktijk Berben & Bouman. 
              Alle rechten voorbehouden.
            </p>
            {/* African Dental Aid Support in right corner */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60">Wij steunen:</span>
              <a 
                href="https://africandental.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-90 transition-opacity"
              >
                <Image 
                  src="/images/african-dental-aid.jpg" 
                  alt="African Dental Aid" 
                  width={70} 
                  height={40} 
                  className="rounded-sm" 
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}