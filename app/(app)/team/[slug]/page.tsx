import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, GraduationCap, Star } from 'lucide-react';
import { getPayload } from 'payload';
import config from '@payload-config';
import { notFound } from 'next/navigation';

// Define types for our data
interface TeamMember {
  id: string;
  name: string;
  slug: string;
  role: string;
  photo: {
    id: string;
    url: string;
    alt?: string;
  };
  bio: any; // Rich text content
  specializations?: { specialization: string }[];
  education?: { degree: string; institution: string; year?: string }[];
  workDays?: string[];
  displayOrder?: number;
  isActive: boolean;
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const teamMember = await getTeamMember(params.slug);
  
  if (!teamMember) {
    return {
      title: 'Teamlid niet gevonden',
      description: 'Het opgevraagde teamlid kon niet worden gevonden.',
    };
  }
  
  return {
    title: `${teamMember.name} | ${teamMember.role} | Tandartsenpraktijk Berben & Bouman`,
    description: `Maak kennis met ${teamMember.name}, ${teamMember.role} bij Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde.`,
  };
}

// Fetch team member data from Payload CMS
async function getTeamMember(slug: string): Promise<TeamMember | null> {
  try {
    const payload = await getPayload({ config });
    
    const teamMember = await payload.find({
      collection: 'team-members',
      where: {
        slug: {
          equals: slug,
        },
        isActive: {
          equals: true,
        },
      },
      limit: 1,
    }).then(res => res.docs[0] as unknown as TeamMember | undefined);
    
    return teamMember || null;
  } catch (error) {
    console.error('Error fetching team member data:', error);
    return null;
  }
}

// Get other team members for the sidebar
async function getOtherTeamMembers(currentSlug: string): Promise<TeamMember[]> {
  try {
    const payload = await getPayload({ config });
    
    const teamMembers = await payload.find({
      collection: 'team-members',
      where: {
        slug: {
          not_equals: currentSlug,
        },
        isActive: {
          equals: true,
        },
      },
      limit: 4,
      sort: 'displayOrder',
    }).then(res => res.docs as unknown as TeamMember[]);
    
    return teamMembers;
  } catch (error) {
    console.error('Error fetching other team members:', error);
    return [];
  }
}

// Map workDays values to display names
const dayLabels: Record<string, string> = {
  'monday': 'Maandag',
  'tuesday': 'Dinsdag',
  'wednesday': 'Woensdag',
  'thursday': 'Donderdag',
  'friday': 'Vrijdag',
};

export default async function TeamMemberPage({ params }: { params: { slug: string } }) {
  const teamMember = await getTeamMember(params.slug);
  
  // If team member not found, show 404 page
  if (!teamMember) {
    notFound();
  }
  
  const otherTeamMembers = await getOtherTeamMembers(teamMember.slug);
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/images/team-hero-bg.jpg" 
            alt="Team background" 
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="max-w-3xl">
            <Link 
              href="/team" 
              className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span>Terug naar het team</span>
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-2">
              {teamMember.name}
            </h1>
            <p className="text-xl text-white/90">
              {teamMember.role}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar with Photo and Info */}
            <div className="lg:col-span-1">
              <div className="rounded-lg overflow-hidden mb-6">
                <Image 
                  src={teamMember.photo.url} 
                  alt={teamMember.name} 
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Work Days */}
              {teamMember.workDays && teamMember.workDays.length > 0 && (
                <div className="bg-primary-50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-primary-900">Werkdagen</h3>
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <ul className="space-y-1">
                        {teamMember.workDays.map((day) => (
                          <li key={day}>{dayLabels[day] || day}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Specializations */}
              {teamMember.specializations && teamMember.specializations.length > 0 && (
                <div className="bg-neutral-50 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-bold mb-4 text-primary-900">Specialisaties</h3>
                  <div className="flex items-start">
                    <Star className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <ul className="space-y-1">
                        {teamMember.specializations.map((spec, index) => (
                          <li key={index}>{spec.specialization}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Education */}
              {teamMember.education && teamMember.education.length > 0 && (
                <div className="bg-neutral-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-primary-900">Opleiding</h3>
                  <div className="flex items-start">
                    <GraduationCap className="h-5 w-5 text-primary-600 mr-3 mt-1" />
                    <div>
                      <ul className="space-y-3">
                        {teamMember.education.map((edu, index) => (
                          <li key={index}>
                            <div className="font-medium">{edu.degree}</div>
                            <div className="text-neutral-700">{edu.institution}</div>
                            {edu.year && <div className="text-neutral-600 text-sm">{edu.year}</div>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2>Over {teamMember.name}</h2>
                
                {/* Render rich text content from Payload CMS */}
                {/* This is a simplified version - you may need to implement a proper rich text renderer */}
                <div dangerouslySetInnerHTML={{ __html: typeof teamMember.bio === 'string' 
                  ? teamMember.bio 
                  : JSON.stringify(teamMember.bio) }} />
                
                <div className="mt-12">
                  <Link 
                    href="/contact" 
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
                  >
                    Maak een afspraak
                  </Link>
                </div>
              </div>
              
              {/* Other Team Members */}
              {otherTeamMembers.length > 0 && (
                <div className="mt-16">
                  <h3 className="text-2xl font-heading font-bold mb-6 text-primary-900">
                    Ontmoet ook onze andere teamleden
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {otherTeamMembers.map((member) => (
                      <Link 
                        key={member.id}
                        href={`/team/${member.slug}`}
                        className="flex items-center p-4 rounded-lg border border-neutral-200 hover:border-primary-200 hover:shadow-sm transition-all group"
                      >
                        <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0 mr-4">
                          <Image 
                            src={member.photo.url} 
                            alt={member.name} 
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-primary-900 group-hover:text-primary-600 transition-colors">
                            {member.name}
                          </h4>
                          <p className="text-neutral-700">{member.role}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
            Wilt u een afspraak maken?
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
            Neem contact met ons op om een afspraak te maken met {teamMember.name} of een van onze andere specialisten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Contact opnemen
            </Link>
            <Link 
              href="/team" 
              className="bg-white hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Bekijk het hele team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 