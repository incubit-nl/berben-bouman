import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-bold text-coral mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Pagina niet gevonden</h2>
          <p className="text-muted-foreground mb-8">
            De pagina die je zoekt bestaat niet of is verplaatst.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Terug naar home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact">
                Contact opnemen
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 