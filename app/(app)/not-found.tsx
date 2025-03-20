import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Smile } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container-custom py-24 text-center">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <Smile className="h-24 w-24 text-coral animate-bounce" />
        </div>
        <h1 className="text-6xl font-bold text-coral mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oeps! Deze pagina heeft een gaatje!</h2>
        <p className="text-muted-foreground mb-4">
          Het lijkt erop dat deze pagina een extractie heeft ondergaan...
        </p>
        <p className="text-lg font-medium text-coral mb-8">
          Maar geen zorgen, wij vullen graag dat gaatje in je browsing ervaring!
        </p>
        <div className="bg-muted p-4 rounded-lg mb-8">
          <p className="italic text-sm">
            &ldquo;Waarom ging de tandarts naar de kunstgalerie? 
            Hij was op zoek naar nieuwe vullingen! 🦷&rdquo;
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Terug naar de wachtkamer
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              Maak een afspraak
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 