import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPayload } from 'payload';
import config from '@payload-config';

async function getWorkshops(){
  const payload = await getPayload({ config });
  const { docs: workshops } = await payload.find({
    collection: 'workshops',
    depth: 1, // Populate relationships (teacher, image) one level deep
  });
  return workshops;
}
export default async function WorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-bold mb-8">Workshops</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {workshops.map((workshop) => (
          <Card key={workshop.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={typeof workshop.image === 'string' ? workshop.image : workshop.image.url || ''}
                alt={workshop.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <div className="text-sm text-muted-foreground mb-2">
                {new Date(workshop.date).toLocaleDateString('nl-NL')} • {workshop.time}
              </div>
              <CardTitle className="text-xl">{workshop.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{workshop.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold">€{workshop.price}</span>
                <Link href={`/workshops/${workshop.id}`}>
                  <Button>Meer info</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mt-16 bg-secondary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Blijf op de Hoogte van Nieuwe Workshops
        </h2>
        <p className="mb-6">
          Schrijf je in voor onze nieuwsbrief en ontvang als eerste informatie over nieuwe workshops
        </p>
        <form className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Je email adres"
            className="flex-1 px-4 py-2 rounded border"
          />
          <Button type="submit">
            Inschrijven
          </Button>
        </form>
      </div>
    </div>
  );
}