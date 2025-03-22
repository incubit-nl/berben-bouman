import Image from 'next/image';
import Link from 'next/link';
import { getPayloadClient } from '@/lib/payload';
import { ArrowRight, User } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  slug: string;
  role: string;
  photo?: {
    url: string;
    alt?: string;
  };
  specializations?: Array<{ specialization: string }>;
}

async function getTeamMembers() {
  const payload = await getPayloadClient();
  const { docs: teamMembers } = await payload.find({
    collection: 'team-members',
    sort: 'displayOrder',
    where: {
      isActive: {
        equals: true,
      },
    },
    limit: 4,
  });
  return teamMembers as TeamMember[];
}

export default async function TeamSection() {
  const teamMembers = await getTeamMembers();
  
  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-4 animate-fade-in flex items-center justify-center">
          Ons team staat voor u klaar
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Bij Tandartsenpraktijk Berben & Bouman werkt een team van ervaren professionals die zich inzetten voor uw mondgezondheid.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="bg-white rounded-lg overflow-hidden border border-neutral-200 hover:border-primary-200 hover:shadow-md transition-all"
            >
              <div className="relative h-64 overflow-hidden">
                {member.photo ? (
                  <Image 
                    src={member.photo.url} 
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100">
                    <User className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-primary-900">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-neutral-700 mb-4">
                  {member.specializations?.map(spec => spec.specialization).join(', ')}
                </p>
                <Link 
                  href={`/team/${member.slug}`}
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
                >
                  <span>Meer informatie</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/team" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-primary-100 text-primary-800 font-medium hover:bg-primary-200 transition-colors"
          >
            Bekijk ons volledige team
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
} 