"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Menu, User, Calendar, X, Info, Mail, Book, Heart, Home, ChevronDown, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const EVERS_PORTS_LOGIN_URL = 'https://www.eversports.nl/auth/?redirectApp=marketplace&redirectPath=%2Fs%2Ftitle-new&origin=eversport';

// Define the type for menu items
type MenuItem = {
  href: string;
  label: string;
  delay: string;
  icon?: React.ElementType;
  isExternal?: boolean;
  children?: MenuItem[];
};

// Icon map for dynamic icon rendering
const ICON_MAP: Record<string, React.ElementType> = {
  User,
  Calendar,
  Info,
  Mail,
  Book,
  Heart,
  Home,
};

// Fallback menu items if CMS data is not available
const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { href: 'https://www.eversports.nl/auth/?redirectApp=marketplace&redirectPath=%2Fs%2Ftitle-new&origin=eversport', label: 'Mijn account', delay: '150ms' },
  { href: '/lesrooster', label: 'Lesrooster', delay: '200ms' },
  { href: '/prijzen', label: 'Prijzen', delay: '250ms' },
  { href: '/workshops', label: 'Workshops', delay: '300ms' },
  { 
    href: '/over-ons', 
    label: 'Over Ons', 
    delay: '350ms',
    children: [
      { href: '/over-ons/leraren', label: 'Leraren', delay: '360ms' },
      { href: '/over-ons/studio', label: 'Onze studio', delay: '370ms' },
    ] 
  },
  { 
    href: '/diensten', 
    label: 'Diensten', 
    delay: '400ms',
    children: [
      { href: '/prijzen#aanbiedingen', label: 'Special Offers', delay: '410ms' },
      { href: '/coaching', label: 'Coaching', delay: '420ms' },
    ]
  },
  { href: '/blog', label: 'Blog', delay: '450ms' },
  { href: '/contact', label: 'Contact', delay: '500ms' },
  { href: '/faq', label: 'FAQ', delay: '550ms' },
];

type NavigationProps = {
  navigationData?: any;
};

export function Navigation({ navigationData }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const router = useRouter();

  // Process navigation data from CMS or use default
  const menuItems: MenuItem[] = useMemo(() => {
    // More resilient check for navigation items with fallbacks
    if (navigationData && 'items' in navigationData && Array.isArray(navigationData.items) && navigationData.items.length > 0) {
      // Map the items to our menu format
      return navigationData.items.map((item: any, index: number) => {
        // Calculate base delay for parent item
        const baseDelay = `${(index + 1) * 50 + 100}ms`;
        
        // Process children if they exist
        const children = item.children && Array.isArray(item.children) && item.children.length > 0
          ? item.children.map((child: any, childIndex: number) => ({
              href: typeof child.href === 'string' ? child.href : '/',
              label: typeof child.label === 'string' ? child.label : 'Submenu Item',
              icon: child.icon && typeof child.icon === 'string' && ICON_MAP[child.icon] ? ICON_MAP[child.icon] : undefined,
              isExternal: Boolean(child.isExternal),
              delay: `${(index + 1) * 50 + 110 + (childIndex * 10)}ms`,
            }))
          : undefined;
        
        // Make sure we extract the properties correctly for parent item
        return {
          href: typeof item.href === 'string' ? item.href : '/',
          label: typeof item.label === 'string' ? item.label : 'Menu Item',
          icon: item.icon && typeof item.icon === 'string' && ICON_MAP[item.icon] ? ICON_MAP[item.icon] : undefined,
          isExternal: Boolean(item.isExternal),
          delay: baseDelay,
          children,
        };
      }).sort((a: any, b: any) => {
        const orderA = a.order || 999;
        const orderB = b.order || 999;
        return orderA - orderB;
      });
    }
    
    // Fallback to default menu items
    return DEFAULT_MENU_ITEMS;
  }, [navigationData]);

  // Handle body scroll lock - no longer needed for section menu
  useEffect(() => {
    // We don't need to lock body scroll for a section menu
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Handle menu state
  const handleMenuToggle = () => {
    if (isMobileMenuOpen) {
      handleCloseMenu();
    } else {
      setIsMobileMenuOpen(true);
      setIsClosing(false);
    }
  };

  const handleCloseMenu = () => {
    setIsClosing(true);
    // Wait for the closing animation before actually closing
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
      // Reset all expanded states when closing menu
      setExpandedItems({});
    }, 300); // Match this with your animation duration
  };

  const handleMenuItemClick = (href: string, isExternal?: boolean) => {
    handleCloseMenu();
    
    if (isExternal) {
      window.open(href, '_blank');
      return;
    }
    
    // Wait for the closing animation before navigation
    setTimeout(() => {
      router.push(href);
    }, 300);
  };

  const toggleSubmenu = (itemLabel: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedItems(prev => ({
      ...prev,
      [itemLabel]: !prev[itemLabel]
    }));
  };

  // Render a menu item and its children if any
  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.label] || false;
    
    return (
      <div key={item.href} className="flex flex-col">
        <button 
          onClick={hasChildren ? 
            (e) => toggleSubmenu(item.label, e) : 
            () => handleMenuItemClick(item.href, item.isExternal)
          }
          className="mobile-menu-item nav-link flex items-center justify-between py-1.5"
          data-state={isClosing ? 'closed' : (isMobileMenuOpen ? 'open' : 'closed')}
          style={{ transitionDelay: isClosing ? '0ms' : item.delay }}
        >
          <div className="flex items-center gap-3 text-lg">
            {item.icon && <item.icon className="h-5 w-5" />}
            <span>{item.label}</span>
          </div>
          {hasChildren && (
            isExpanded ? 
              <ChevronDown className="h-4 w-4 text-coral" /> : 
              <ChevronRight className="h-4 w-4" />
          )}
        </button>
        
        {/* Submenu items if expanded */}
        {hasChildren && isExpanded && (
          <div className="pl-8 mt-2 space-y-3 border-l border-peach/30 ml-2">
            {item.children!.map((child) => (
              <button 
                key={child.href}
                onClick={() => handleMenuItemClick(child.href, child.isExternal)}
                className="mobile-menu-item nav-link flex items-center gap-3 text-base py-1"
                data-state={isClosing ? 'closed' : (isMobileMenuOpen ? 'open' : 'closed')}
                style={{ transitionDelay: isClosing ? '0ms' : child.delay }}
              >
                {child.icon && <child.icon className="h-4 w-4" />}
                <span>{child.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="bg-background border-b border-peach/20 sticky top-0 z-50 shadow-sm">
      <nav className="nav-container">
        {/* Left section */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="https://www.eversports.nl/auth/?redirectApp=marketplace&redirectPath=%2Fs%2Ftitle-new&origin=eversport" className="nav-pill">
            <User className="h-4 w-4" />
            <span>Mijn account</span>
          </Link>
        </div>

        {/* Center logo */}
        <Link href="/" className="logo text-brown hover:text-coral transition-colors absolute left-1/2 -translate-x-1/2 text-3xl font-medium">
          title
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-4 justify-end flex-1 md:flex-none">
          <Link href="/lesrooster" className="nav-pill hidden md:flex">
            <Calendar className="h-4 w-4" />
            <span>Lesrooster</span>
          </Link>
          <button
            className="text-brown hover:text-coral transition-colors p-2 rounded-md hover:bg-peach/20"
            onClick={handleMenuToggle}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Menu backdrop */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={handleCloseMenu}
            style={{ 
              opacity: isClosing ? 0 : 1,
              transition: 'opacity 300ms ease-in-out',
              pointerEvents: isClosing ? 'none' : 'auto'
            }}
          />
        )}

        {/* Mobile menu */}
        <div 
          className="mobile-menu-overlay"
          data-state={isClosing ? 'closed' : (isMobileMenuOpen ? 'open' : 'closed')}
          style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
        >
          <div className="flex flex-col h-full">
            {/* Menu header */}
            <div className="p-6 border-b border-peach/20 bg-gradient-to-r from-white to-peach-light/50">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-heading font-medium text-brown">Menu</h3>
                <button
                  className="text-brown hover:text-coral transition-colors"
                  onClick={handleCloseMenu}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            {/* Menu content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-white to-peach-light/30">
              <div className="flex flex-col gap-5">
                {menuItems.map(renderMenuItem)}
              </div>
            </div>
            
            {/* Menu footer */}
            <div className="p-6 border-t border-peach/20 bg-gradient-to-r from-white to-peach-light/50">
              <div 
                className="mobile-menu-item"
                data-state={isClosing ? 'closed' : (isMobileMenuOpen ? 'open' : 'closed')}
                style={{ transitionDelay: isClosing ? '0ms' : '650ms' }}
              >
                <a 
                  href={EVERS_PORTS_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-2 rounded-full border-2 border-brown text-brown hover:bg-brown/5 transition-colors w-full"
                  onClick={handleCloseMenu}
                >
                  <User className="h-4 w-4" />
                  <span>Mijn account</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}