import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Ons Team | Tandartsenpraktijk Berben & Bouman',
  description: 'Maak kennis met ons ervaren team van tandartsen, mondhygiënisten en assistenten bij Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde.',
};

// Mock data for team members
const teamMembers = [
  {
    id: 'dr-berben',
    name: 'Dr. Marieke Berben',
    role: 'Tandarts',
    specialty: 'Algemene tandheelkunde, Esthetische tandheelkunde',
    bio: 'Dr. Marieke Berben is afgestudeerd aan de Radboud Universiteit Nijmegen en heeft meer dan 15 jaar ervaring in de tandheelkunde. Ze is gespecialiseerd in esthetische tandheelkunde en staat bekend om haar nauwkeurige en zorgvuldige aanpak.',
    education: 'Radboud Universiteit Nijmegen',
    languages: ['Nederlands', 'Engels', 'Duits'],
    image: '/images/team/dr-berben.jpg',
    email: 'berben@berben-bouman.nl',
  },
  {
    id: 'dr-bouman',
    name: 'Dr. Thomas Bouman',
    role: 'Tandarts',
    specialty: 'Algemene tandheelkunde, Endodontologie',
    bio: 'Dr. Thomas Bouman heeft zijn opleiding genoten aan de Universiteit van Amsterdam en is gespecialiseerd in endodontologie (wortelkanaalbehandelingen). Met zijn rustige en geduldige benadering stelt hij zelfs de meest angstige patiënten op hun gemak.',
    education: 'Universiteit van Amsterdam',
    languages: ['Nederlands', 'Engels', 'Frans'],
    image: '/images/team/dr-bouman.jpg',
    email: 'bouman@berben-bouman.nl',
  },
  {
    id: 'lisa-jansen',
    name: 'Lisa Jansen',
    role: 'Mondhygiënist',
    specialty: 'Preventieve tandheelkunde, Parodontologie',
    bio: 'Lisa Jansen is een ervaren mondhygiënist met een passie voor preventieve tandheelkunde. Ze helpt patiënten bij het verbeteren van hun mondgezondheid door grondige reinigingen en persoonlijk advies over mondhygiëne.',
    education: 'Hogeschool Utrecht',
    languages: ['Nederlands', 'Engels'],
    image: '/images/team/lisa-jansen.jpg',
    email: 'jansen@berben-bouman.nl',
  },
  {
    id: 'kim-de-vries',
    name: 'Kim de Vries',
    role: 'Tandartsassistent',
    specialty: 'Patiëntenzorg, Administratie',
    bio: 'Kim de Vries is een vriendelijke en behulpzame tandartsassistent die zorgt voor een soepel verloop van alle behandelingen. Ze staat bekend om haar warme persoonlijkheid en vermogen om patiënten op hun gemak te stellen.',
    education: 'ROC Midden Nederland',
    languages: ['Nederlands', 'Engels'],
    image: '/images/team/kim-de-vries.jpg',
    email: 'devries@berben-bouman.nl',
  },
  {
    id: 'mark-bakker',
    role: 'Tandartsassistent',
    name: 'Mark Bakker',
    specialty: 'Röntgenfotografie, Sterilisatie',
    bio: 'Mark Bakker is gespecialiseerd in röntgenfotografie en zorgt ervoor dat alle instrumenten perfect gesteriliseerd zijn. Zijn nauwkeurigheid en oog voor detail maken hem een waardevolle aanvulling op ons team.',
    education: 'ROC Amsterdam',
    languages: ['Nederlands', 'Engels'],
    image: '/images/team/mark-bakker.jpg',
    email: 'bakker@berben-bouman.nl',
  },
  {
    id: 'sophie-vermeer',
    name: 'Sophie Vermeer',
    role: 'Praktijkmanager',
    specialty: 'Praktijkorganisatie, Patiëntcommunicatie',
    bio: 'Sophie Vermeer zorgt als praktijkmanager voor de dagelijkse gang van zaken in onze praktijk. Ze coördineert afspraken, beantwoordt vragen van patiënten en zorgt ervoor dat alles soepel verloopt.',
    education: 'Hogeschool van Amsterdam',
    languages: ['Nederlands', 'Engels', 'Spaans'],
    image: '/images/team/sophie-vermeer.jpg',
    email: 'vermeer@berben-bouman.nl',
  },
];

// Group team members by role
const roles = {
  'Tandarts': teamMembers.filter(member => member.role === 'Tandarts'),
  'Mondhygiënist': teamMembers.filter(member => member.role === 'Mondhygiënist'),
  'Tandartsassistent': teamMembers.filter(member => member.role === 'Tandartsassistent'),
  'Praktijkmanager': teamMembers.filter(member => member.role === 'Praktijkmanager'),
};

export default function TeamPage() {
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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6 text-accent-50">
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
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
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
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 text-primary-900">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-4">
                      {member.role}
                    </p>
                    <p className="text-neutral-700 mb-4">
                      {member.specialty}
                    </p>
                    <div className="flex flex-col space-y-2 mb-4">
                      <a 
                        href={`mailto:${member.email}`} 
                        className="inline-flex items-center text-neutral-700 hover:text-primary-600 transition-colors"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        <span>{member.email}</span>
                      </a>
                      <a 
                        href="tel:+31302940150" 
                        className="inline-flex items-center text-neutral-700 hover:text-primary-600 transition-colors"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        <span>030 - 294 01 50</span>
                      </a>
                    </div>
                    <Link 
                      href={`/team/${member.id}`}
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
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
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
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
            Maak kennis met ons team
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
            Wij verwelkomen u graag in onze praktijk. Maak een afspraak voor een kennismaking of intake.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/afspraak-maken" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Afspraak maken
            </Link>
            <Link 
              href="/contact" 
              className="bg-white hover:bg-neutral-100 text-primary-900 border border-primary-200 px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center justify-center"
            >
              Contact opnemen
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 