import { getPayloadClient } from "@/lib/payload";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

async function getPracticeInfo() {
  try {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "practice-info",
      limit: 1,
    });
    return docs[0] || null;
  } catch (error) {
    console.error("Error fetching practice info:", error);
    return null;
  }
}

export async function PracticeInfo() {
  const info = await getPracticeInfo();

  const fallbackInfo = {
    openingHours: "Ma-Vr: 08:00 - 17:00",
    phoneNumber: "030 123 4567",
    address: "Tandartslaan 1, Utrecht",
    description:
      "Bij Berben & Bouman staat uw mondgezondheid centraal. In onze moderne praktijk combineren we geavanceerde technologie met een warme, persoonlijke aanpak om u de beste zorg te bieden.",
  };

  const features = [
    {
      icon: Clock,
      title: "Openingstijden",
      content: info?.openingHours || fallbackInfo.openingHours,
    },
    {
      icon: Phone,
      title: "Telefoon",
      content: (
        <a
          href={`tel:${(info?.phoneNumber || fallbackInfo.phoneNumber).replace(/\s/g, '')}`}
          className="text-primary-600 hover:text-primary-700 transition-colors"
        >
          {info?.phoneNumber || fallbackInfo.phoneNumber}
        </a>
      ),
    },
    {
      icon: MapPin,
      title: "Locatie",
      content: info?.address || fallbackInfo.address,
    },
    {
      icon: Phone,
      title: "Spoedgeval",
      content: (
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-1">Buiten openingstijden</span>
          <a
            href="tel:+31306701221"
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            030 670 12 21
          </a>
        </div>
      ),
    },
  ];

  return (
    <section className="bg-gradient-to-b from-primary-50 to-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-900 mb-4">
            Onze Praktijk
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-700 leading-relaxed">
            {info?.description || fallbackInfo.description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={feature.title || `feature-${index}`}
              className="bg-white border-none shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary-100 p-3">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-3">
                  {feature.title}
                </h3>
                <div className="text-gray-600 text-base">
                  {feature.content}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/de-praktijk"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-primary-900 font-medium rounded-full hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Meer over onze praktijk
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}