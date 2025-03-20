import { Metadata } from "next";
import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";
import { notFound } from "next/navigation";
import { RichText } from "@/components/ui/rich-text";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Heart, LucideIcon, Trophy, Users } from "lucide-react";

export const dynamic = "force-dynamic";

interface Media {
  id: string;
  url: string;
  alt?: string;
}

interface TeamValue {
  title: string;
  description: any;
  icon: string;
}

interface Benefit {
  title: string;
  description: any;
}

interface Vacancy {
  title: string;
  description: any;
  isActive: boolean;
  hours: string;
}

interface ContactInfo {
  email: string;
  phone?: string;
  contactPerson?: string;
}

interface CareersPageData {
  id: string;
  title: string;
  subtitle?: string;
  heroImage: Media;
  intro: any;
  teamValues?: TeamValue[];
  benefits?: Benefit[];
  vacancies?: Vacancy[];
  contactInfo?: ContactInfo;
  metaDescription?: string;
}

async function getCareersPageData(): Promise<CareersPageData | null> {
  const payload = await getPayloadClient();
  
  try {
    const { docs } = await payload.find({
      collection: "careers-page",
      limit: 1,
    });
    
    if (docs && docs.length > 0) {
      return docs[0] as CareersPageData;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching careers page data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getCareersPageData();
  
  if (!pageData) {
    return {
      title: "Werken bij Berben & Bouman | Tandartspraktijk",
      description: "Ontdek carrièremogelijkheden bij Berben & Bouman tandartspraktijk",
    };
  }
  
  return {
    title: `${pageData.title} | Berben & Bouman`,
    description: pageData.metaDescription || "Ontdek carrièremogelijkheden bij Berben & Bouman tandartspraktijk",
  };
}

export default async function CareersPage() {
  const pageData = await getCareersPageData();
  
  if (!pageData) {
    notFound();
  }
  
  const getIconComponent = (iconName: string): LucideIcon => {
    switch (iconName) {
      case "heart":
        return Heart;
      case "trophy":
        return Trophy;
      case "users":
        return Users;
      case "star":
      case "lightbulb":
      default:
        return BadgeCheck;
    }
  };
  
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full">
        {pageData.heroImage && (
          <Image
            src={pageData.heroImage.url}
            alt={pageData.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl">
              <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                {pageData.title}
              </h1>
              <p className="text-lg text-white/90 md:text-xl">
                {pageData.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Introduction */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <RichText content={pageData.intro} />
          </div>
        </div>
      </section>
      
      {/* Team Values */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Onze Waarden
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {pageData.teamValues?.map((value, index) => {
              const IconComponent = getIconComponent(value.icon);
              
              return (
                <Card key={index} className="h-full border-t-4 border-t-primary">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-6 flex items-center">
                      <div className="rounded-full bg-primary/10 p-3">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="ml-3 text-xl font-semibold">{value.title}</h3>
                    </div>
                    <div className="flex-grow">
                      <RichText content={value.description} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Wat wij bieden
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {pageData.benefits?.map((benefit, index) => (
              <Card key={index} className="h-full">
                <CardContent className="flex h-full flex-col p-6">
                  <h3 className="mb-4 text-xl font-semibold">{benefit.title}</h3>
                  <div className="flex-grow">
                    <RichText content={benefit.description} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Vacancies */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Vacatures
          </h2>
          
          <div className="mx-auto max-w-4xl">
            {pageData.vacancies?.filter(v => v.isActive).map((vacancy, index) => (
              <Card key={index} className="mb-6">
                <CardContent className="p-6">
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold">{vacancy.title}</h3>
                      <p className="text-gray-600">{vacancy.hours}</p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      Solliciteer nu
                    </Button>
                  </div>
                  <RichText content={vacancy.description} />
                </CardContent>
              </Card>
            ))}
            
            {pageData.vacancies?.filter(v => v.isActive).length === 0 && (
              <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                <h3 className="mb-2 text-xl font-semibold">Geen actuele vacatures</h3>
                <p className="text-gray-600">
                  Op dit moment hebben wij geen vacatures beschikbaar. Stuur een open sollicitatie
                  naar onderstaand emailadres als je interesse hebt om bij ons te werken.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      {pageData.contactInfo && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl rounded-lg bg-gray-50 p-8 text-center shadow-sm">
              <h2 className="mb-6 text-2xl font-bold">Contact</h2>
              <p className="mb-2 text-gray-600">
                Heb je vragen of wil je solliciteren? Neem contact op met:
              </p>
              {pageData.contactInfo.contactPerson && (
                <p className="mb-4 font-medium">{pageData.contactInfo.contactPerson}</p>
              )}
              <p className="mb-2">
                <a
                  href={`mailto:${pageData.contactInfo.email}`}
                  className="text-primary hover:underline"
                >
                  {pageData.contactInfo.email}
                </a>
              </p>
              {pageData.contactInfo.phone && (
                <p>
                  <a
                    href={`tel:${pageData.contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-primary hover:underline"
                  >
                    {pageData.contactInfo.phone}
                  </a>
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
} 