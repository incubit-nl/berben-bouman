import { getPayloadClient } from "@/lib/payload";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  rating: number;
  content: string;
  order: number;
}

async function getTestimonials() {
  const payload = await getPayloadClient();
  const { docs: testimonials } = await payload.find({
    collection: "testimonials",
    where: {
      featured: {
        equals: true,
      },
    },
    sort: "order",
    limit: 6,
  });
  return testimonials as Testimonial[];
}

export async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Wat onze patiënten vinden</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Wij streven naar de beste tandheelkundige zorg
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="mb-4 flex-grow text-gray-600">{testimonial.content}</p>
                <div className="mt-auto">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  {testimonial.role && <p className="text-sm text-gray-500">{testimonial.role}</p>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 