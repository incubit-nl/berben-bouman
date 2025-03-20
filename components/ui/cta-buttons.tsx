'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';

interface CTAButtonsProps {
  phone: string;
}

export function CTAButtons({ phone }: CTAButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link 
        href="/contact" 
        className="bg-white hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
      >
        Contact opnemen
      </Link>
      <a 
        href={`tel:${phone.replace(/\s/g, '')}`}
        className="bg-white hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
      >
        <Phone className="mr-2 h-5 w-5" />
        <span>Bel direct: {phone}</span>
      </a>
    </div>
  );
} 