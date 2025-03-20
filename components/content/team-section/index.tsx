import Image from "next/image";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ArrowRight } from "lucide-react";
import { RichText } from "@/components/ui/rich-text"; // Assuming you have a RichText component

interface Media {
  url: string;
  alt: string;
}

interface Specialization {
  specialization: string;
}

interface Education {
  degree: string;
  institution: string;
  year?: string;
}

interface TeamMember {
  id: string;
  name: string;
  slug: string;
  role: string;
  photo?: Media;
  bio: any; // RichText content
  specializations?: Specialization[];
  education?: Education[];
  workDays?: string[];
  displayOrder?: number;
  isActive: boolean;
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

  const workDayLabels: Record<string, string> = {
    monday: "Ma",
    tuesday: "Di",
    wednesday: "Wo",
    thursday: "Do",
    friday: "Vr",
  };

  return (
    <section className="bg-gradient-to-b from-white to-primary-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-900 mb-4 animate-fade-in">
            Ons Team
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-700 leading-relaxed animate-fade-in-delayed">
            Maak kennis met ons toegewijde team van tandartsen en specialisten die voor u klaarstaan.
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="bg-white overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
            >
              <div className="aspect-[3/4] relative">
                {member.photo ? (
                  <Image
                    src={member.photo.url}
                    alt={member.photo.alt || member.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                    <User className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-primary-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-base mb-2">{member.role}</p>
                {member.specializations && member.specializations.length > 0 && (
                  <p className="text-sm text-gray-500 mb-3 line-clamp-1">
                    {member.specializations.map((s) => s.specialization).join(", ")}
                  </p>
                )}
                {member.workDays && member.workDays.length > 0 && (
                  <p className="text-sm text-gray-500 mb-4">
                    Beschikbaar: {member.workDays.map((day) => workDayLabels[day]).join(", ")}
                  </p>
                )}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-primary-200 text-primary-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                >
                  <Link href={`/team/${member.slug}`} className="flex items-center justify-center">
                    Lees meer
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary-600 hover:bg-primary-700 text-primary-900 font-medium rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Link href="/team" className="flex items-center text-primary-900">
              Bekijk het hele team
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}