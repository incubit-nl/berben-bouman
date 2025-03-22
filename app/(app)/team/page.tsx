import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, ArrowRight, User, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import { getPayloadClient } from '@/lib/payload';

export const metadata: Metadata = {
  title: 'Ons Team | Tandartsenpraktijk Berben & Bouman',
  description: 'Maak kennis met ons ervaren team van tandartsen, mondhygiënisten en assistenten bij Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde.',
};

interface Media {
  url: string;
  alt: string;
}

interface TeamMember {
  id: string;
  name: string;
  slug: string;
  role: string;
  photo: Media;
  specializations: Array<{ specialization: string }>;
  bio: any;
  education: Array<{
    degree: string;
    institution: string;
    year?: string;
  }>;
  workDays: string[];
  displayOrder: number;
  isActive: boolean;
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
  });
  return teamMembers as TeamMember[];
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  const roles = teamMembers.reduce((acc, member) => {
    const role = member.role;
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(member);
    return acc;
  }, {} as Record<string, typeof teamMembers>);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/images/team-hero.jpg" 
            alt="Ons team" 
            fill
            className="object-cover"
            priority
          />
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-white">
              Ons Team
            </h1>
            <p className="text-lg md:text-xl mb-0 text-white/90">
              Maak kennis met de professionals die voor u klaarstaan
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900 text-center mx-auto">
              Een team van specialisten
            </h2>
            <p className="text-lg text-neutral-700 mb-0">
              Bij Tandartsenpraktijk Berben & Bouman werkt een team van ervaren professionals die zich inzetten voor uw mondgezondheid. 
              Onze tandartsen, mondhygiënisten en assistenten werken nauw samen om u de best mogelijke zorg te bieden. 
              Wij streven ernaar om een persoonlijke band op te bouwen met onze patiënten en u te helpen uw gebit gezond te houden.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members by Role */}
      {Object.entries(roles).map(([role, members]) => (
        <section key={role} className="py-12 border-t border-neutral-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-12 text-primary-900">
              {role === 'Tandarts' ? 'Tandartsen' : 
               role === 'Mondhygiënist' ? 'Mondhygiënisten' : 
               role === 'Tandartsassistent' ? 'Tandartsassistenten' : 
               'Praktijkmanagement'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {members.map((member) => (
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
                    <div className="flex flex-col space-y-2 mb-4">
                      <a 
                        href="tel:+31302940150" 
                        className="inline-flex items-center text-neutral-700 hover:text-primary-600 transition-colors"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        <span>030 - 294 01 50</span>
                      </a>
                    </div>
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
          </div>
        </section>
      ))}

      {/* Values Section */}
      <section className="py-12 md:py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900 text-center">
              Onze waarden
            </h2>
            <p className="text-lg text-neutral-700 mb-0">
              Bij alles wat we doen, laten we ons leiden door deze kernwaarden
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-primary-900">Persoonlijke aandacht</h3>
              <p className="text-neutral-700">
                Wij nemen de tijd voor elke patiënt en luisteren naar uw wensen en zorgen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-primary-900">Kwaliteit</h3>
              <p className="text-neutral-700">
                We streven naar de hoogste kwaliteit in alle behandelingen en gebruiken moderne technieken en materialen.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-primary-900">Transparantie</h3>
              <p className="text-neutral-700">
                We communiceren duidelijk over behandelopties, kosten en wat u kunt verwachten.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4 text-primary-900">Preventie</h3>
              <p className="text-neutral-700">
                We geloven dat voorkomen beter is dan genezen en leggen de nadruk op preventieve zorg.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50 text-center border-t border-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-900 mb-6 flex items-center justify-center">
            Word patiënt bij ons
          </h2>
          <p className="text-lg text-neutral-700 max-w-2xl mx-auto mb-8">
            Wij verwelkomen nieuwe patiënten en staan klaar om uw gebit gezond te houden. Schrijf u in of neem contact op voor meer informatie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://www.anamneselijst.nl/Berben-Bouman/"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-900 border border-neutral-300 font-medium rounded-md hover:bg-neutral-100 transition-all duration-300 text-lg"
            >
              Inschrijven
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-900 border border-neutral-300 font-medium rounded-md hover:bg-neutral-100 transition-all duration-300 text-lg"
            >
              Contact
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}