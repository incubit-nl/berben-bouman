import { Metadata } from "next";
import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";
import { notFound } from "next/navigation";
import { RichText } from "@/components/ui/rich-text";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BadgeHelp, Calendar, LucideIcon, Utensils, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Media {
  id: string;
  url: string;
  alt?: string;
}

interface AgeGroup {
  title: string;
  ageRange: string;
  description: any;
  image?: Media | string;
}

interface Tip {
  title: string;
  description: any;
  icon: string;
}

interface FaqItem {
  question: string;
  answer: any;
}

interface ChildrenPageData {
  id: string;
  title: string;
  subtitle?: string;
  heroImage: Media;
  intro: any;
  ageGroups?: AgeGroup[];
  tips?: Tip[];
  faq?: FaqItem[];
  metaDescription?: string;
}

async function getChildrenPageData(): Promise<ChildrenPageData | null> {
  const payload = await getPayloadClient();
  
  try {
    const { docs } = await payload.find({
      collection: "children-page",
      limit: 1,
    });
    
    if (docs && docs.length > 0) {
      return docs[0] as ChildrenPageData;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching children page data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getChildrenPageData();
  
  if (!pageData) {
    return {
      title: "Tandheelkunde voor Kinderen | Berben & Bouman",
      description: "Tandheelkundige zorg voor kinderen bij Berben & Bouman",
    };
  }
  
  return {
    title: `${pageData.title} | Berben & Bouman`,
    description: pageData.metaDescription || "Tandheelkundige zorg voor kinderen bij Berben & Bouman",
  };
}

export default async function ChildrenPage() {
  const pageData = await getChildrenPageData();
  
  if (!pageData) {
    notFound();
  }
  
  const getIconComponent = (iconName: string): LucideIcon => {
    switch (iconName) {
      case "tooth":
        return BadgeHelp; // Using BadgeHelp as placeholder for Tooth
      case "food":
        return Utensils;
      case "calendar":
        return Calendar;
      case "brush":
        return Calendar; // Using Calendar as placeholder for Brush
      default:
        return BadgeHelp;
    }
  };

  const getMediaUrl = (media: Media | string | undefined): string => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    return media.url;
  };
  
  return (
    <main>
      {/* Hero Section (Exact Copy from TreatmentPage) */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          {pageData.heroImage && (
            <Image
              src={pageData.heroImage.url}
              alt={pageData.heroImage.alt || pageData.title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Terug naar home</span>
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-accent-50">
              {pageData.title}
            </h1>
            <p className="text-lg md:text-xl mb-0 text-white/90">
              {pageData.subtitle}
            </p>
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
      
      {/* Age Groups */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Zorg op maat voor elke leeftijdsfase
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {pageData.ageGroups?.map((group, index) => (
              <Card key={index} className="overflow-hidden">
                {group.image && (
                  <div className="aspect-video relative">
                    <Image
                      src={getMediaUrl(group.image)}
                      alt={group.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{group.title}</h3>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                      {group.ageRange}
                    </span>
                  </div>
                  <RichText content={group.description} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Tips */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Tips voor een gezond kindergebit
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            {pageData.tips?.map((tip, index) => {
              const IconComponent = getIconComponent(tip.icon);
              
              return (
                <Card key={index} className="h-full">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-6 flex items-center">
                      <div className="rounded-full bg-primary/10 p-3">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="ml-3 text-xl font-semibold">{tip.title}</h3>
                    </div>
                    <div className="flex-grow">
                      <RichText content={tip.description} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Veelgestelde vragen
          </h2>
          
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {pageData.faq?.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <RichText content={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
}