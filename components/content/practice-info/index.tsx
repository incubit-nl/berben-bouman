import { getPayloadClient } from "@/lib/payload";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin, Phone } from "lucide-react";

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
    openingHours: "Ma-Vr: 08:00-17:00",
    phoneNumber: "030 123 4567",
    address: "Tandartslaan 1, Utrecht",
    description: "Bij Berben & Bouman staat uw mondgezondheid voorop. Onze moderne praktijk is uitgerust met de nieuwste technologieën."
  };

  const features = [
    {
      icon: Clock,
      title: "Openingstijden",
      content: info?.openingHours || fallbackInfo.openingHours,
    },
    {
      icon: Phone,
      title: "Contact",
      content: info?.phoneNumber || fallbackInfo.phoneNumber,
    },
    {
      icon: MapPin,
      title: "Locatie",
      content: info?.address || fallbackInfo.address,
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Onze Praktijk</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            {info?.description || fallbackInfo.description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-none shadow-lg">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
} 