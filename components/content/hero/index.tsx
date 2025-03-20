import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getPayloadClient } from "@/lib/payload";
import Link from "next/link";

async function getHeroData() {
  const payload = await getPayloadClient();
  const settings = await payload.findGlobal({
    slug: "settings",
  });
  return settings;
}

export async function Hero() {
  const settings = await getHeroData();
  
  return (
    <div className="relative h-[80vh] min-h-[600px] w-full">
      {settings.hero?.image && (
        <Image
          src={settings.hero.image.url}
          alt="Hero image"
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              {settings.hero?.title || "Welkom bij Berben & Bouman"}
            </h1>
            <p className="mb-8 text-lg text-white/90 md:text-xl">
              {settings.hero?.subtitle || "Uw tandartspraktijk voor complete mondzorg"}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/contact">Maak een afspraak</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20">
                <Link href="/behandelingen">Bekijk behandelingen</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 