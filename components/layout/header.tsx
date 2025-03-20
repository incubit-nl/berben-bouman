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

// Categories for treatment labels
const categories = {
  preventie: { title: 'Preventie' },
  diagnostiek: { title: 'Diagnostiek' },
  restauratief: { title: 'Restauratief' },
  endodontologie: { title: 'Endodontologie' },
  prothetiek: { title: 'Prothetiek' },
  implantologie: { title: 'Implantologie' },
  orthodontie: { title: 'Orthodontie' },
  overig: { title: 'Overig' },
};

type TreatmentCategory = string | { label: string; value: string };

type HeaderProps = {
  contactInfo?: any;
  practicePages?: any[];
  treatmentCategories?: TreatmentCategory[];
};

export function Header({ contactInfo, practicePages, treatmentCategories }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  
  // Create main navigation items with dynamic dropdowns
  const mainNavItems: MenuItem[] = [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/de-praktijk',
      label: 'De Praktijk',
      children: practicePages?.map(page => ({
        href: `/de-praktijk/${page.slug}`,
        label: page.title,
      })) || [],
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
    handleScroll(); // Call on initial render
    
    // Remove the dynamic body padding that's causing double spacing
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
        isScrolled || isMobileMenuOpen
          ? 'bg-white shadow-lg py-2' 
          : 'bg-primary-900 py-3'
      )}>
        {/* Main Header */}
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center" onClick={handleCloseMenu}>
              <div className="relative">
                <Image 
                  src={isScrolled || isMobileMenuOpen ? "/images/logo_large_black.png" : "/images/logo_large.png"} 
                  alt="Tandartsenpraktijk Berben & Bouman" 
                  className="object-contain"
                  width={140}
                  height={70}
                />
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              {mainNavItems.map((item) => (
                <div key={item.href} className="relative group">
                  {item.children && item.children.length > 0 ? (
                    <>
                      <button 
                        className={cn(
                          "flex items-center font-medium transition-colors text-base",
                          isScrolled || isMobileMenuOpen ? "text-primary-900 hover:text-accent-600" : "text-white hover:text-accent-500"
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
                        isScrolled || isMobileMenuOpen ? "text-primary-900 hover:text-accent-600" : "text-white hover:text-accent-500",
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
                className={cn(
                  "group px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px] flex items-center",
                  isScrolled || isMobileMenuOpen
                    ? "bg-primary-900 hover:bg-primary-800 text-primary-900" 
                    : "bg-accent-600 hover:bg-accent-700 text-white"
                )}
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
                <X className="h-6 w-6 text-primary-900 transition-all duration-300" />
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
          style={{ top: '58px' }}
        >
          <div className="container mx-auto px-6 py-8 h-full overflow-y-auto">
            <nav className="flex flex-col space-y-5">
              {mainNavItems.map((item) => (
                <div key={item.href} className="border-b border-neutral-100 pb-5">
                  {item.children && item.children.length > 0 ? (
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
      {/* Spacer element to prevent content from being hidden under fixed header */}
      <div className={cn(
        "w-full transition-all duration-300",
        isScrolled || isMobileMenuOpen ? "h-[74px]" : "h-[74px]"
      )} aria-hidden="true" />
    </>
  );
} 