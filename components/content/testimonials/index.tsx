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
    <section className="bg-gradient-to-b from-white to-primary-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-900 mb-4 animate-fade-in">
            Wat Onze Patiënten Vinden
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-700 leading-relaxed animate-fade-in-delayed">
            Hoor van onze patiënten hoe wij streven naar de beste tandheelkundige zorg.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="bg-white border-none shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rounded-xl h-full"
            >
              <CardContent className="flex flex-col p-6 h-full">
                <div className="mb-4 flex justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-gray-200 text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-base mb-6 flex-grow text-center italic">
                  "{testimonial.content}"
                </p>
                <div className="mt-auto text-center">
                  <p className="font-semibold text-primary-900 text-lg">
                    {testimonial.name}
                  </p>
                  {testimonial.role && (
                    <p className="text-sm text-gray-500 mt-1">{testimonial.role}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
