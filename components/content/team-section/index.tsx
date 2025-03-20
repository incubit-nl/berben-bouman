import Image from "next/image";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface Media {
  url: string;
  alt: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  slug: string;
  photo?: Media;
}

async function getTeamMembers() {
  try {
    const payload = await getPayloadClient();
    const { docs: teamMembers } = await payload.find({
      collection: "team-members",
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: "displayOrder",
      limit: 4,
    });
    return teamMembers as TeamMember[];
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export async function TeamSection() {
  const teamMembers = await getTeamMembers();

  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Ons Team</h2>
          <p className="mx-auto max-w-2xl text-gray-600">
            Maak kennis met ons ervaren team van tandartsen en specialisten
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden">
              <div className="aspect-[3/4] relative">
                {member.photo ? (
                  <Image
                    src={member.photo.url}
                    alt={member.photo.alt || member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                    <User className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                <p className="mb-4 text-gray-600">{member.role}</p>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/team/${member.slug}`}>Lees meer</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/team">Bekijk het hele team</Link>
          </Button>
        </div>
      </div>
    </section>
  );
} 