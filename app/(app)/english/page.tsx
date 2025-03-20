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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

interface Media {
  id: string;
  url: string;
  alt?: string;
}

interface Service {
  title: string;
  description: any;
}

interface FaqItem {
  question: string;
  answer: any;
}

interface EnglishPageData {
  id: string;
  title: string;
  subtitle?: string;
  heroImage: Media;
  intro: any;
  servicesIntro?: any;
  services?: Service[];
  insuranceInfo?: any;
  appointmentInfo?: any;
  faq?: FaqItem[];
  metaDescription?: string;
}

async function getEnglishPageData(): Promise<EnglishPageData | null> {
  const payload = await getPayloadClient();
  
  try {
    const { docs } = await payload.find({
      collection: "english-page",
      limit: 1,
    });
    
    if (docs && docs.length > 0) {
      return docs[0] as EnglishPageData;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching English page data:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getEnglishPageData();
  
  if (!pageData) {
    return {
      title: "English-speaking Dental Care | Berben & Bouman",
      description: "Dental care for English-speaking patients in Utrecht",
    };
  }
  
  return {
    title: `${pageData.title} | Berben & Bouman`,
    description: pageData.metaDescription || "Dental care for English-speaking patients in Utrecht",
  };
}

export default async function EnglishPage() {
  const pageData = await getEnglishPageData();
  
  if (!pageData) {
    notFound();
  }
  
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
              <span>Back to home</span>
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
      
      {/* Services */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
            Our Services
          </h2>
          
          {pageData.servicesIntro && (
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <RichText content={pageData.servicesIntro} />
            </div>
          )}
          
          <div className="grid gap-8 md:grid-cols-2">
            {pageData.services?.map((service, index) => (
              <Card key={index} className="h-full">
                <CardContent className="flex h-full flex-col p-6">
                  <h3 className="mb-4 text-xl font-semibold">{service.title}</h3>
                  <div className="flex-grow">
                    <RichText content={service.description} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Insurance Information */}
      {pageData.insuranceInfo && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
                Insurance Information
              </h2>
              <div className="rounded-lg bg-gray-50 p-8 shadow-sm">
                <RichText content={pageData.insuranceInfo} />
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Appointment Information */}
      {pageData.appointmentInfo && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
                Making an Appointment
              </h2>
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <RichText content={pageData.appointmentInfo} />
                <div className="mt-8 flex justify-center">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/contact">Schedule an Appointment</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* FAQ */}
      {pageData.faq && pageData.faq.length > 0 && (
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {pageData.faq.map((item, index) => (
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
      )}
      
      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900 flex justify-center">
            Contact Us
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
            Feel free to contact us if you have any questions or would like to schedule an appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Schedule an Appointment
            </Link>
            <Link 
              href="/contact" 
              className="bg-white hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}