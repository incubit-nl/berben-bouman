"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SpecialOfferProps {
  offer: {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    backgroundColor: string; // We'll still accept this from Payload but override it
    price?: number;
    originalPrice?: number;
  };
}

export function SpecialOffer({ offer }: SpecialOfferProps) {
  if (!offer) return null;

  // Instead of using the color from Payload, we'll use our design system colors
  // We'll use the backgroundColor value just to determine which variant to use
  const getVariant = (colorName: string): 'primary' | 'secondary' | 'accent' => {
    const lowerColor = colorName.toLowerCase();
    
    if (['peach', 'cream'].includes(lowerColor)) {
      return 'primary';
    } else if (['coral', 'sage'].includes(lowerColor)) {
      return 'secondary';
    } else {
      return 'accent';
    }
  };

  const variant = getVariant(offer.backgroundColor);
  
  // Define styles based on variant
  const styles = {
    primary: {
      background: 'bg-gradient-to-b from-peach-light to-peach-dark',
      title: 'text-primary-600',
      subtitle: 'text-coral',
      description: 'text-olive',
      price: 'text-primary-600',
      originalPrice: 'text-olive/70',
      button: 'bg-coral hover:bg-primary-700 text-white',
      border: 'border-peach',
    },
    secondary: {
      background: 'bg-gradient-to-br from-coral/10 to-coral/20',
      title: 'text-primary-600',
      subtitle: 'text-coral',
      description: 'text-olive',
      price: 'text-coral',
      originalPrice: 'text-primary-600/60',
      button: 'bg-coral hover:bg-primary-700 text-white',
      border: 'border-coral/30',
    },
    accent: {
      background: 'bg-gradient-to-br from-sage/20 to-sage/30',
      title: 'text-primary-600',
      subtitle: 'text-olive',
      description: 'text-olive',
      price: 'text-olive',
      originalPrice: 'text-primary-600/60',
      button: 'bg-olive hover:bg-primary-700 text-white',
      border: 'border-sage/40',
    },
  };

  const currentStyle = styles[variant];

  return (
    <section className="py-16 bg-background">
      <div className="container-custom">
        <div 
          className={cn(
            "max-w-4xl mx-auto rounded-2xl shadow-md overflow-hidden relative",
            "border", currentStyle.border
          )}
        >
          <div 
            className={cn(
              "py-12 px-6 md:px-12 relative overflow-hidden",
              currentStyle.background
            )}
          >
            <div className="text-center relative z-10">
              <h2 className={cn("text-3xl font-heading font-semibold mb-3", currentStyle.title)}>
                {offer.title}
              </h2>
              <h3 className={cn("text-xl font-medium mb-5", currentStyle.subtitle)}>
                {offer.subtitle}
              </h3>
              
              <p className={cn("mb-8 max-w-2xl mx-auto leading-relaxed", currentStyle.description)}>
                {offer.description}
              </p>
              
              {offer.price && (
                <div className="mb-8 flex justify-center items-center gap-4">
                  <span className={cn("text-4xl font-bold", currentStyle.price)}>
                    €{offer.price.toFixed(2)}
                  </span>
                  {offer.originalPrice && (
                    <span className={cn("text-xl line-through", currentStyle.originalPrice)}>
                      €{offer.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              )}
              
              <Button 
                size="lg" 
                className={cn(
                  "px-8 py-6 rounded-md shadow-sm transition-all duration-300",
                  currentStyle.button
                )}
                asChild
              >
                <Link href={offer.buttonLink}>{offer.buttonText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 