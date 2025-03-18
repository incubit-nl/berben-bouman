import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

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
      { name: 'Contact', href: '/contact' },
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
            <p className="text-sm text-white/80">
              Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde staat voor kwaliteit. 
              Wij kiezen ervoor om enkel met de beste materialen te werken in een moderne 
              en goed uitgeruste praktijk.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Snelle links</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/80">
                <MapPin className="h-4 w-4" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Phone className="h-4 w-4" />
                <span>{phone}</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Mail className="h-4 w-4" />
                <span>{email}</span>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Openingstijden</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>Maandag - Vrijdag: 8:00 - 17:00</li>
              <li>Zaterdag: Gesloten</li>
              <li>Zondag: Gesloten</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/60">
              © {new Date().getFullYear()} Tandartsenpraktijk Berben & Bouman. 
              Alle rechten voorbehouden.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}