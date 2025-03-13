import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getPayload } from 'payload';
import config from '@payload-config';
import { formatDate } from '@/lib/utils';
import { CalendarIcon, ClockIcon, MapPinIcon, UserIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WorkshopPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string | string[];
  }>;
}

async function getWorkshop(id: string) {
  const payload = await getPayload({ config });
  
  try {
    const workshop = await payload.findByID({
      collection: 'workshops',
      id,
      depth: 2, // Populate relationships (teacher, image) two levels deep
    });
    
    return workshop;
  } catch (error) {
    return null;
  }
}

async function getRelatedWorkshops(currentWorkshopId: string) {
  const payload = await getPayload({ config });
  
  try {
    const { docs: workshops } = await payload.find({
      collection: 'workshops',
      where: {
        id: {
          not_equals: currentWorkshopId,
        },
      },
      limit: 3,
      depth: 1,
    });
    
    return workshops;
  } catch (error) {
    return [];
  }
}

export default async function WorkshopPage({ params }: WorkshopPageProps) {
  const resolvedParams = await params;
  const workshop = await getWorkshop(resolvedParams.id);
  
  if (!workshop) {
    notFound();
  }

  const relatedWorkshops = await getRelatedWorkshops(resolvedParams.id);

  // Helper function to get image URL
  const getImageUrl = (image: any): string => {
    if (typeof image === 'string') return image;
    return image?.url || '';
  };

  // Format date to "21 februari 2023" format
  const fullDate = new Date(workshop.date).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="container-custom py-16">
      <div className="mb-8">
        <Link 
          href="/workshops" 
          className="text-coral hover:text-coral/80 flex items-center gap-2 mb-4"
        >
          ← Terug naar alle workshops
        </Link>
        <h1 className="text-4xl font-bold text-brown mb-4">{workshop.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
            <Image
              src={getImageUrl(workshop.image)}
              alt={workshop.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-brown">Over deze workshop</h2>
            <div className="prose prose-olive max-w-none">
              <p className="text-olive text-lg leading-relaxed whitespace-pre-line">
                {workshop.description}
              </p>
            </div>
          </div>

          {/* Teacher Section */}
          {workshop.teacher && typeof workshop.teacher !== 'string' && (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-brown">Over de docent</h2>
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {workshop.teacher.image && (
                  <div className="relative h-32 w-32 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={getImageUrl(workshop.teacher.image)}
                      alt={workshop.teacher.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-medium text-brown mb-2">{workshop.teacher.name}</h3>
                  <p className="text-olive">{workshop.teacher.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-8 sticky top-24">
            <h2 className="text-2xl font-semibold mb-6 text-brown">Details</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CalendarIcon className="text-coral h-5 w-5" />
                <span className="text-olive">{fullDate}</span>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="text-coral h-5 w-5" />
                <span className="text-olive">{workshop.time}</span>
              </div>
              {workshop.teacher && typeof workshop.teacher !== 'string' && (
                <div className="flex items-center gap-3">
                  <UserIcon className="text-coral h-5 w-5" />
                  <span className="text-olive">{workshop.teacher.name}</span>
                </div>
              )}
              <div className="flex items-center gap-3">
                <MapPinIcon className="text-coral h-5 w-5" />
                <span className="text-olive">title Studio</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="text-3xl font-bold text-brown mb-2">€{workshop.price}</div>
              <p className="text-sm text-olive">Inclusief BTW</p>
            </div>

            <Button 
              className="w-full bg-coral hover:bg-coral/90 text-white rounded-full py-6"
              size="lg"
              asChild
            >
              <Link href="/lesrooster">Inschrijven</Link>
            </Button>

            <div className="mt-4 text-xs text-center text-olive/80">
              <p>Beperkt aantal plaatsen beschikbaar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Workshops */}
      {relatedWorkshops.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-brown mb-8">Andere workshops die je misschien interesseren</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedWorkshops.map((relatedWorkshop) => (
              <div key={relatedWorkshop.id} className="overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg flex flex-col h-full" style={{ backgroundColor: 'rgba(227, 183, 165, 0.25)' }}>
                <Link 
                  href={`/workshops/${relatedWorkshop.id}`}
                  className="block group hover:no-underline flex-grow flex flex-col"
                >
                  <div className="relative h-[200px] w-full">
                    <div className="absolute top-4 right-4 z-10 bg-white rounded-full px-4 py-1.5 text-sm font-medium text-coral">
                      {formatDate(relatedWorkshop.date)}
                    </div>
                    {relatedWorkshop.image && (
                      <Image
                        src={getImageUrl(relatedWorkshop.image)}
                        alt={relatedWorkshop.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  
                  <div className="p-6 bg-white/70 backdrop-blur-sm flex-grow flex flex-col">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-brown">{relatedWorkshop.title}</h3>
                      <p className="text-olive mb-4">
                        {relatedWorkshop.teacher && typeof relatedWorkshop.teacher !== 'string' && relatedWorkshop.teacher.name ? 
                          `door ${relatedWorkshop.teacher.name}` : ''}
                      </p>
                      <p className="text-olive text-sm leading-relaxed line-clamp-2 mb-4">
                        {relatedWorkshop.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto">
                      <span className="font-semibold text-brown">€{relatedWorkshop.price}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-coral text-coral hover:bg-coral/10 rounded-full"
                      >
                        Meer info
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 