"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true, // Always true and non-toggleable
    analytics: false,
    marketing: false
  });

  // Check if the user has already made cookie choices
  useEffect(() => {
    const consentGiven = localStorage.getItem('cookie-consent');
    if (!consentGiven) {
      // Only show after a small delay to improve user experience
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const settings = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    saveCookieSettings(settings);
  };

  const handleAcceptNecessary = () => {
    const settings = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    saveCookieSettings(settings);
  };

  const handleSavePreferences = () => {
    saveCookieSettings(cookieSettings);
  };

  const saveCookieSettings = (settings: CookieSettings) => {
    // Save settings to localStorage
    localStorage.setItem('cookie-consent', 'true');
    localStorage.setItem('cookie-settings', JSON.stringify(settings));
    
    // Apply cookie settings
    if (settings.analytics) {
      enableAnalyticsCookies();
    }
    
    if (settings.marketing) {
      enableMarketingCookies();
    }
    
    setIsVisible(false);
  };

  const enableAnalyticsCookies = () => {
    // Here you would initialize analytics services like Google Analytics
    console.log('Analytics cookies enabled');
  };

  const enableMarketingCookies = () => {
    // Here you would initialize marketing cookies/trackers
    console.log('Marketing cookies enabled');
  };

  const handleToggleCookieType = (type: keyof Omit<CookieSettings, 'necessary'>) => {
    setCookieSettings(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-lg border-t-2 border-primary-200">
      <div className="container mx-auto p-4">
        {!showDetails ? (
          // Simple cookie banner
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start">
              <Shield className="h-6 w-6 mr-3 text-primary-600 flex-shrink-0 mt-6" />
              <div>
                <h3 className="text-lg font-medium text-primary-900">Uw privacy</h3>
                <p className="text-sm text-neutral-600 mt-1">
                  Om u de beste ervaring te bieden, gebruiken wij cookies op onze website. 
                  Door verder te gaan, gaat u akkoord met ons <Link href="/privacy-policy" className="text-primary-600 hover:text-primary-800 underline">privacybeleid</Link>.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 ml-0 md:ml-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowDetails(true)}
                className="flex-shrink-0"
              >
                Aanpassen
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAcceptNecessary}
                className="flex-shrink-0 bg-white"
              >
                Alleen noodzakelijke
              </Button>
              <Button 
                size="sm" 
                onClick={handleAcceptAll}
                className="flex-shrink-0 bg-primary-600 hover:bg-primary-700 text-white"
              >
                Alles accepteren
              </Button>
            </div>
          </div>
        ) : (
          // Detailed cookie preferences
          <div className="relative">
            <button 
              className="absolute top-0 right-0 p-2 text-neutral-500 hover:text-neutral-700"
              onClick={() => setShowDetails(false)}
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-primary-900">Cookie instellingen</h3>
              <p className="text-sm text-neutral-600 mt-2">
                U kunt hieronder uw cookievoorkeuren instellen. Noodzakelijke cookies zijn altijd ingeschakeld 
                omdat deze essentieel zijn voor het functioneren van de website.
              </p>
            </div>
            
            <div className="space-y-4 mb-6">
              {/* Necessary cookies - always enabled */}
              <div className="p-3 border rounded-md bg-neutral-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-primary-900">Noodzakelijke cookies</h4>
                    <p className="text-sm text-neutral-600">
                      Deze cookies zijn essentieel voor het functioneren van de website en kunnen niet worden uitgeschakeld.
                    </p>
                  </div>
                  <div className="relative inline-block w-10 h-6 bg-primary-600 rounded-full">
                    <span className="absolute inset-0 flex items-center justify-end pr-1">
                      <span className="w-4 h-4 bg-white rounded-full shadow"></span>
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Analytics cookies */}
              <div className="p-3 border rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-primary-900">Analytische cookies</h4>
                    <p className="text-sm text-neutral-600">
                      Deze cookies helpen ons inzicht te krijgen in hoe bezoekers onze website gebruiken.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleToggleCookieType('analytics')}
                    className={cn(
                      "relative inline-block w-10 h-6 rounded-full transition-colors",
                      cookieSettings.analytics ? "bg-primary-600" : "bg-neutral-300"
                    )}
                  >
                    <span 
                      className={cn(
                        "absolute inset-0 flex items-center transition-all duration-200",
                        cookieSettings.analytics ? "justify-end pr-1" : "justify-start pl-1"
                      )}
                    >
                      <span className="w-4 h-4 bg-white rounded-full shadow"></span>
                    </span>
                  </button>
                </div>
              </div>
              
              {/* Marketing cookies */}
              <div className="p-3 border rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-primary-900">Marketing cookies</h4>
                    <p className="text-sm text-neutral-600">
                      Deze cookies worden gebruikt om gepersonaliseerde advertenties te tonen op basis van uw surfgedrag.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleToggleCookieType('marketing')}
                    className={cn(
                      "relative inline-block w-10 h-6 rounded-full transition-colors",
                      cookieSettings.marketing ? "bg-primary-600" : "bg-neutral-300"
                    )}
                  >
                    <span 
                      className={cn(
                        "absolute inset-0 flex items-center transition-all duration-200",
                        cookieSettings.marketing ? "justify-end pr-1" : "justify-start pl-1"
                      )}
                    >
                      <span className="w-4 h-4 bg-white rounded-full shadow"></span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Link href="/privacy-policy" className="text-sm text-primary-600 hover:text-primary-800 underline">
                Meer informatie in ons privacybeleid
              </Link>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAcceptNecessary}
                >
                  Alleen noodzakelijke
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleSavePreferences}
                  className="bg-primary-600 hover:bg-primary-700 text-white"
                >
                  Voorkeuren opslaan
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 