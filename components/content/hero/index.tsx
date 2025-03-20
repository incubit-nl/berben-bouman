import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getPayloadClient } from "@/lib/payload";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getHeroData() {
  const payload = await getPayloadClient();
  const settings = await payload.find({
    collection: "settings",
    limit: 1,
  });
  return settings;
}

export async function Hero() {
  const settings = await getHeroData();

  return (
    <div className="relative h-[80vh] min-h-[600px] w-full bg-gradient-to-b from-primary-900/10 to-gray-900/10">
      {/* Hero Image */}
      {settings.hero?.image && (
        <Image
          src={settings.hero.image.url}
          alt={settings.hero.image.alt || "Hero image"}
          fill
          className="object-cover opacity-90"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight animate-fade-in">
              {settings.hero?.title || "Welkom bij Berben & Bouman"}
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed animate-fade-in-delayed">
              {settings.hero?.subtitle || "Uw tandartspraktijk voor complete mondzorg"}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-delayed-more">
              <Button
                asChild
                size="lg"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Link href="/contact" className="flex items-center">
                  Maak een afspraak
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/20 text-white font-medium rounded-full hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                <Link href="/behandelingen" className="flex items-center">
                  Bekijk behandelingen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 60"
          fill="white"
          preserveAspectRatio="none"
          className="w-full h-16 opacity-80"
        >
          <path d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </div>
  );
}