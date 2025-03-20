import Image from "next/image";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Media {
  url: string;
  alt: string;
}

interface Treatment {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  featuredImage: Media;
}

async function getTreatments() {
  const payload = await getPayloadClient();
  const { docs: treatments } = await payload.find({
    collection: "treatments",
    where: {
      status: {
        equals: "published",
      },
    },
    sort: "displayOrder",
    limit: 6,
  });
  return treatments as Treatment[];
}

export async function Services() {
  const treatments = await getTreatments();

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Onze Behandelingen</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Wij bieden een breed scala aan tandheelkundige behandelingen aan
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment) => (
            <Card key={treatment.id} className="overflow-hidden">
              {treatment.featuredImage && (
                <div className="aspect-video relative">
                  <Image
                    src={treatment.featuredImage.url}
                    alt={treatment.featuredImage.alt || treatment.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardContent className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{treatment.title}</h3>
                <p className="mb-4 text-gray-600 line-clamp-2">{treatment.shortDescription}</p>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/behandelingen/${treatment.slug}`}>Lees meer</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/behandelingen">Bekijk alle behandelingen</Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 