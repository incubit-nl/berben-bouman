import Image from "next/image";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
    <section className="bg-gradient-to-b from-primary-50 to-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-900 mb-4 animate-fade-in">
            Onze Behandelingen
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-700 leading-relaxed animate-fade-in-delayed">
            Ontdek ons brede scala aan tandheelkundige zorg, afgestemd op uw behoeften.
          </p>
        </div>

        {/* Treatments Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment) => (
            <Card
              key={treatment.id}
              className="bg-white overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
            >
              {treatment.featuredImage && (
                <div className="aspect-[4/3] relative">
                  <Image
                    src={treatment.featuredImage.url}
                    alt={treatment.featuredImage.alt || treatment.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <CardContent className="p-6 flex flex-col">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">
                  {treatment.title}
                </h3>
                <p className="text-gray-600 text-base line-clamp-2 mb-4 flex-grow">
                  {treatment.shortDescription}
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-primary-200 text-primary-600 hover:bg-primary-50 hover:text-primary-700 transition-colors self-start"
                >
                  <Link href={`/behandelingen/${treatment.slug}`} className="flex items-center">
                    Lees meer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link href="/behandelingen" className="flex items-center">
              Bekijk alle behandelingen
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}