"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Phone, Mail, MapPin, Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the type for menu items
type MenuItem = {
  href: string;
  label: string;
  children?: MenuItem[];
};

// Main navigation items
const mainNavItems: MenuItem[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/de-praktijk',
    label: 'De Praktijk',
    children: [
      {
        href: '/de-praktijk/ons-team',
        label: 'Ons team',
      },
      {
        href: '/de-praktijk/praktijkrondleiding',
        label: 'Praktijkrondleiding',
      },
      {
        href: '/de-praktijk/praktijkregels',
        label: 'Praktijkregels',
      },
      {
        href: '/de-praktijk/begroting',
        label: 'Begroting',
      },
      {
        href: '/de-praktijk/tarieven',
        label: 'Tarieven',
      },
      {
        href: '/de-praktijk/facturen',
        label: 'Facturen',
      },
    ],
  },
  {
    href: '/behandelingen',
    label: 'Behandelingen',
  },
  {
    href: '/team',
    label: 'Team',
  },
  {
    href: '/contact',
    label: 'Contact',
  },
];

type HeaderProps = {
  contactInfo?: any;
};

export function Header({ contactInfo }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  
  // Handle scroll event to change header appearance
  const handleScroll = useCallback(() => {
    if (window.scrollY > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, []);
  
  // Toggle mobile menu
  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Prevent body scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };
  
  // Close mobile menu
  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  // Toggle submenu
  const toggleSubmenu = (itemLabel: string, e: React.MouseEvent) => {
    e.preventDefault();
    setOpenSubmenu(openSubmenu === itemLabel ? null : itemLabel);
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  // Default contact values if CMS data is not available
  const phone = contactInfo?.contactDetails?.phone || '+31 30 670 12 21';
  const email = contactInfo?.contactDetails?.email || 'info@berben-bouman.nl';
  
  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full',
        isScrolled 
          ? 'bg-white shadow-lg py-3' 
          : 'bg-primary-900 py-4'
      )}>
        {/* Top Bar - Only visible on desktop and when not scrolled */}
        {!isScrolled && (
          <div className="hidden lg:block text-white absolute top-0 left-0 right-0 w-full border-b border-white/10 transition-transform duration-300">
            <div className="container mx-auto px-6 py-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-8 text-sm">
                  <div className="flex items-center group">
                    <Phone className="h-4 w-4 mr-2 group-hover:text-accent-500 transition-colors" />
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-accent-500 transition-colors">
                      {phone}
                    </a>
                  </div>
                  <div className="flex items-center group">
                    <Mail className="h-4 w-4 mr-2 group-hover:text-accent-500 transition-colors" />
                    <a href={`mailto:${email}`} className="hover:text-accent-500 transition-colors">
                      {email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-8 text-sm">
                  <div className="flex items-center group">
                    <Clock className="h-4 w-4 mr-2 group-hover:text-accent-500 transition-colors" />
                    <span>Ma-Vr: 08:00 - 17:00</span>
                  </div>
                  <div className="flex items-center group">
                    <MapPin className="h-4 w-4 mr-2 group-hover:text-accent-500 transition-colors" />
                    <span>Louis Armstronglaan 1, Utrecht</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Header */}
        <div className={cn(
          'container mx-auto px-6',
          isScrolled ? 'pt-0' : 'pt-14 lg:pt-8'
        )}>
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center" onClick={handleCloseMenu}>
              <div className="relative">
                <Image 
                  src={isScrolled || isMobileMenuOpen ? "/images/logo_large_black.png" : "/images/logo_large.png"} 
                  alt="Tandartsenpraktijk Berben & Bouman" 
                  className="object-contain"
                  width={140}
                  height={75}
                />
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              {mainNavItems.map((item) => (
                <div key={item.href} className="relative group">
                  {item.children ? (
                    <>
                      <button 
                        className={cn(
                          "flex items-center font-medium transition-colors text-base",
                          isScrolled ? "text-primary-900 hover:text-accent-600" : "text-white hover:text-accent-500"
                        )}
                        onClick={(e) => e.preventDefault()}
                      >
                        {item.label}
                        <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                      </button>
                      <div className="absolute left-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                        <div className="py-3 bg-white rounded-lg shadow-xl ring-1 ring-black/5">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block px-5 py-3 text-sm text-neutral-700 hover:bg-accent-50 hover:text-accent-600 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        "font-medium transition-colors text-base relative",
                        isScrolled ? "text-primary-900 hover:text-accent-600" : "text-white hover:text-accent-500",
                        "after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:w-0 after:bg-accent-500 after:transition-all hover:after:w-full"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            
            {/* CTA Button */}
            <div className="hidden lg:block">
              <a
                href="/contact"
                className="group bg-accent-600 hover:bg-accent-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px] flex items-center"
              >
                <Calendar className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Afspraak maken
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md focus:outline-none"
              onClick={handleMenuToggle}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={cn("h-6 w-6 transition-all duration-300", isScrolled ? "text-primary-900" : "text-white")} />
              ) : (
                <Menu className={cn("h-6 w-6 transition-all duration-300", isScrolled ? "text-primary-900" : "text-white")} />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-white z-40 transition-transform duration-300 transform lg:hidden",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
          style={{ top: '70px' }}
        >
          <div className="container mx-auto px-6 py-8 h-full overflow-y-auto">
            <nav className="flex flex-col space-y-5">
              {mainNavItems.map((item) => (
                <div key={item.href} className="border-b border-neutral-100 pb-5">
                  {item.children ? (
                    <div>
                      <button
                        className="flex items-center justify-between w-full text-primary-900 font-medium"
                        onClick={(e) => toggleSubmenu(item.label, e)}
                      >
                        {item.label}
                        <ChevronDown className={cn(
                          "h-5 w-5 transition-transform duration-300",
                          openSubmenu === item.label ? "rotate-180" : ""
                        )} />
                      </button>
                      {openSubmenu === item.label && (
                        <div className="mt-3 ml-5 space-y-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block py-2 text-neutral-700 hover:text-accent-600 transition-colors"
                              onClick={handleCloseMenu}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-primary-900 font-medium hover:text-accent-600 transition-colors"
                      onClick={handleCloseMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            
            <div className="mt-10 space-y-6">
              <Link
                href="/contact"
                className="block w-full bg-accent-600 hover:bg-accent-700 text-white px-4 py-4 rounded-lg font-medium transition-all duration-300 text-center shadow-md flex items-center justify-center"
                onClick={handleCloseMenu}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Afspraak maken
              </Link>
              
              <div className="space-y-6 text-neutral-700 mt-8">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-accent-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Telefoon</h3>
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-primary-600 hover:text-accent-600 transition-colors">
                      {phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-accent-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">E-mail</h3>
                    <a href={`mailto:${email}`} className="text-primary-600 hover:text-accent-600 transition-colors">
                      {email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-accent-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Openingstijden</h3>
                    <p>Maandag t/m Vrijdag: 08:00 - 17:00</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-accent-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Adres</h3>
                    <p>Louis Armstronglaan 1<br />3543 EB Utrecht (Terwijde)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Spacer element to push content below the fixed header */}
      <div className={cn(
        "w-full", 
        isScrolled ? "h-16" : "h-24"
      )}></div>
    </>
  );
} 