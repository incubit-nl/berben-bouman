import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';

type FooterProps = {
  contactInfo?: any;
};

export function Footer({ contactInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and about */}
          <div>
            <div className="flex items-center mb-6">
              <div className="mr-3">
                <Image 
                  src="/logo-white.svg" 
                  alt="Tandartsenpraktijk Berben & Bouman" 
                  width={40} 
                  height={40}
                  className="h-10 w-auto"
                />
              </div>
              <div>
                <h2 className="text-lg font-heading font-bold text-white">Berben & Bouman</h2>
                <p className="text-xs text-white/80">Tandartsenpraktijk</p>
              </div>
            </div>
            <p className="text-white/80 mb-6">
              Tandartsenpraktijk Berben & Bouman staat voor kwaliteit. Wij kiezen ervoor om enkel met de beste materialen te werken in een moderne en goed uitgeruste praktijk.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/80 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/80 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-accent-300">Contact</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-accent-400 mr-3 flex-shrink-0" />
                <span>
                  Louis Armstronglaan 1<br />
                  3543 EB Utrecht<br />
                  (Terwijde)
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-accent-400 mr-3 flex-shrink-0" />
                <a href="tel:+31306701221" className="hover:text-accent-300 transition-colors">
                  +31 30 670 12 21
                </a>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-accent-400 mr-3 flex-shrink-0" />
                <a href="mailto:info@berben-bouman.nl" className="hover:text-accent-300 transition-colors">
                  info@berben-bouman.nl
                </a>
              </li>
              <li className="flex">
                <Clock className="h-5 w-5 text-accent-400 mr-3 flex-shrink-0" />
                <span>
                  Maandag t/m Vrijdag:<br />
                  08:00 - 17:00 uur
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-accent-300">De Praktijk</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/de-praktijk/ons-team" className="text-white/80 hover:text-white transition-colors">
                  Ons team
                </Link>
              </li>
              <li>
                <Link href="/de-praktijk/praktijkrondleiding" className="text-white/80 hover:text-white transition-colors">
                  Praktijkrondleiding
                </Link>
              </li>
              <li>
                <Link href="/de-praktijk/praktijkregels" className="text-white/80 hover:text-white transition-colors">
                  Praktijkregels
                </Link>
              </li>
              <li>
                <Link href="/de-praktijk/begroting" className="text-white/80 hover:text-white transition-colors">
                  Begroting
                </Link>
              </li>
              <li>
                <Link href="/de-praktijk/tarieven" className="text-white/80 hover:text-white transition-colors">
                  Tarieven
                </Link>
              </li>
              <li>
                <Link href="/de-praktijk/facturen" className="text-white/80 hover:text-white transition-colors">
                  Facturen
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Behandelingen */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-accent-300">Behandelingen</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/behandelingen/intake-afspraak" className="text-white/80 hover:text-white transition-colors">
                  Intake afspraak
                </Link>
              </li>
              <li>
                <Link href="/behandelingen/periodieke-controle" className="text-white/80 hover:text-white transition-colors">
                  Periodieke controle
                </Link>
              </li>
              <li>
                <Link href="/behandelingen/vullingen" className="text-white/80 hover:text-white transition-colors">
                  Vullingen
                </Link>
              </li>
              <li>
                <Link href="/behandelingen/kronen-en-bruggen" className="text-white/80 hover:text-white transition-colors">
                  Kronen en Bruggen
                </Link>
              </li>
              <li>
                <Link href="/behandelingen/implantaten" className="text-white/80 hover:text-white transition-colors">
                  Implantaten
                </Link>
              </li>
              <li>
                <Link href="/behandelingen" className="text-accent-400 hover:text-accent-300 font-medium transition-colors">
                  Alle behandelingen
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar with copyright */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © {currentYear} Tandartsenpraktijk Berben & Bouman. Alle rechten voorbehouden.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
              Privacybeleid
            </Link>
            <Link href="/cookies" className="text-white/60 hover:text-white text-sm transition-colors">
              Cookiebeleid
            </Link>
            <Link href="/sitemap" className="text-white/60 hover:text-white text-sm transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}