import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';

export const metadata: Metadata = {
  title: 'Ons Team | Tandartsenpraktijk Berben & Bouman',
  description: 'Maak kennis met ons ervaren team van tandartsen, mondhygiënisten en assistenten bij Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde.',
};

// Define types for our data (updated to match your latest TeamMembers config)
interface TeamMember {
  id: string;
  name: string;
  role: string;
  bigNummer?: string;
  specialties?: Array<{ specialty: string }>;
  bio: any;
  education?: string;
  workdays?: Array<{ day: string; hours?: string }>;
  externalLink?: { url: string; label: string };
  languages?: Array<{ language: string }>;
  image?: { url: string; alt?: string };
  email?: string;
  displayOrder: number;
  status: 'draft' | 'published';
}

// Fetch all published team members from Payload CMS
async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const payload = await getPayload({ config });
    const teamMembers = await payload.find({
      collection: 'team-members',
      where: { status: { equals: 'published' } },
      sort: 'displayOrder',
    }).then(res => res.docs as TeamMember[]);
    return teamMembers;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

// Group team members by role
function groupTeamMembersByRole(members: TeamMember[]) {
  return members.reduce((acc, member) => {
    const role = member.role;
    if (!acc[role]) acc[role] = [];
    acc[role].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);
}

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();
  const roles = groupTeamMembersByRole(teamMembers);

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50">
      {/* Hero Section - Enhanced with gradient and pattern */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern-bg.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/20 to-primary-900/80"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 text-white">
              Ons Team
            </h1>
            <div className="w-20 h-1 bg-accent-500 mb-6"></div>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Maak kennis met de professionals die met passie en expertise zorgen voor uw glimlach in onze praktijk in Utrecht Terwijde.
            </p>
          </div>
        </div>
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 48" fill="white" preserveAspectRatio="none">
            <path d="M0,0 C480,48 960,48 1440,0 L1440,48 L0,48 Z"></path>
          </svg>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
              Een team van specialisten
            </h2>
            <p className="text-lg text-neutral-700 mb-0">
              Bij Tandartsenpraktijk Berben & Bouman combineren we ervaring, vakmanschap en persoonlijke zorg. 
              Ons team van tandartsen, mondhygiënisten en assistenten staat klaar om u de beste tandheelkundige behandeling te bieden in een prettige omgeving.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members by Role */}
      {Object.entries(roles).map(([role, members]) => (
        <section key={role} className="py-12 md:py-16 bg-neutral-50 border-t border-neutral-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-12 text-primary-900">
              {role === 'Tandarts' ? 'Onze Tandartsen' : 
               role === 'Mondhygiënist' ? 'Onze Mondhygiënisten' : 
               role === 'Tandartsassistent' ? 'Onze Tandartsassistenten' : 
               'Ons Praktijkmanagement'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="group bg-white rounded-xl overflow-hidden border border-neutral-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-64 overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image.url}
                        alt={member.image.alt || member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary-100" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-primary-900 group-hover:text-primary-700 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                    {member.specialties && member.specialties.length > 0 && (
                      <p className="text-sm text-neutral-600 mb-3">
                        Specialisaties: {member.specialties.map(s => s.specialty).join(', ')}
                      </p>
                    )}
                    {member.bigNummer && (
                      <p className="text-sm text-neutral-600 mb-3">BIG-nummer: {member.bigNummer}</p>
                    )}
                    {member.workdays && member.workdays.length > 0 && (
                      <p className="text-sm text-neutral-600 mb-3">
                        Werkdagen: {member.workdays.map(w => `${w.day} ${w.hours || ''}`).join(', ')}
                      </p>
                    )}
                    <div className="flex flex-col space-y-2 mb-4">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="inline-flex items-center text-neutral-700 hover:text-primary-600 transition-colors"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          <span>{member.email}</span>
                        </a>
                      )}
                      <a
                        href="tel:+31302940150"
                        className="inline-flex items-center text-neutral-700 hover:text-primary-600 transition-colors"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        <span>030 - 294 01 50</span>
                      </a>
                    </div>
                    <Link
                      href={`/team/${member.id}`} // Assuming you have individual team member pages
                      className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
                    >
                      <span>Meer over {member.name.split(' ')[0]}</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Values Section */}
      <section className="py-12 md:py-16 bg-primary-50 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-accent-500/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
              Onze Kernwaarden
            </h2>
            <p className="text-lg text-neutral-700 mb-0">
              Deze waarden vormen de basis van onze zorg en aanpak.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: 'Persoonlijke aandacht', desc: 'We nemen de tijd om naar u te luisteren en uw wensen te begrijpen.' },
              { title: 'Kwaliteit', desc: 'We gebruiken moderne technieken en materialen voor de beste zorg.' },
              { title: 'Transparantie', desc: 'Duidelijke communicatie over behandelingen en kosten staat voorop.' },
              { title: 'Preventie', desc: 'We helpen u problemen te voorkomen met een focus op preventieve zorg.' },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="text-xl font-bold mb-4 text-primary-900">{value.title}</h3>
                <p className="text-neutral-700">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-100 to-primary-50 relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary-300/10 rounded-full translate-y-1/2 -translate-x-1/3"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
              Ontmoet ons team persoonlijk
            </h2>
            <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
              Maak een afspraak voor een kennismaking of behandeling en ervaar onze zorg zelf.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/afspraak-maken"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center shadow-md hover:shadow-lg"
              >
                Afspraak maken
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-neutral-100 text-primary-800 border border-primary-300 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center shadow-sm hover:shadow-md"
              >
                Contact opnemen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}