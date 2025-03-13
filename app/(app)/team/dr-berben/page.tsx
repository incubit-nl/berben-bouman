import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Mail, Phone, GraduationCap, Languages, Calendar, Clock } from 'lucide-react';

export const metadata = {
  title: 'Dr. Marieke Berben | Tandarts | Tandartsenpraktijk Berben & Bouman',
  description: 'Maak kennis met Dr. Marieke Berben, tandarts en mede-eigenaar van Tandartsenpraktijk Berben & Bouman in Utrecht Terwijde. Gespecialiseerd in esthetische tandheelkunde.',
};

export default function DrBerbenProfilePage() {
  // Team member data
  const teamMember = {
    id: 'dr-berben',
    name: 'Dr. Marieke Berben',
    role: 'Tandarts',
    specialty: 'Algemene tandheelkunde, Esthetische tandheelkunde',
    bio: 'Dr. Marieke Berben is afgestudeerd aan de Radboud Universiteit Nijmegen en heeft meer dan 15 jaar ervaring in de tandheelkunde. Ze is gespecialiseerd in esthetische tandheelkunde en staat bekend om haar nauwkeurige en zorgvuldige aanpak.',
    educationSummary: 'Radboud Universiteit Nijmegen',
    languages: ['Nederlands', 'Engels', 'Duits'],
    image: '/images/team/dr-berben.jpg',
    email: 'berben@berben-bouman.nl',
    workDays: ['Maandag', 'Dinsdag', 'Donderdag', 'Vrijdag'],
    detailedBio: `
      Dr. Marieke Berben is een ervaren tandarts met een passie voor esthetische tandheelkunde. Na haar afstuderen aan de Radboud Universiteit Nijmegen in 2008, heeft ze zich verder gespecialiseerd in cosmetische tandheelkundige procedures.
      
      Met meer dan 15 jaar ervaring in de tandheelkunde, heeft Dr. Berben een brede kennis opgebouwd in verschillende aspecten van de tandheelkunde. Haar specialisatie in esthetische tandheelkunde stelt haar in staat om patiënten te helpen hun glimlach te verbeteren en hun zelfvertrouwen te vergroten.
      
      Dr. Berben staat bekend om haar nauwkeurige en zorgvuldige aanpak. Ze neemt de tijd om naar haar patiënten te luisteren en hun wensen en zorgen te begrijpen. Haar doel is om elke patiënt een persoonlijke en comfortabele ervaring te bieden.
      
      Naast haar werk in de praktijk, volgt Dr. Berben regelmatig bijscholingen en cursussen om op de hoogte te blijven van de nieuwste ontwikkelingen en technieken in de tandheelkunde. Ze is lid van de Nederlandse Vereniging voor Tandartsen en de European Society of Esthetic Dentistry.
      
      In 2015 richtte ze samen met Dr. Thomas Bouman de Tandartsenpraktijk Berben & Bouman op in Utrecht Terwijde, met als doel hoogwaardige tandheelkundige zorg te bieden in een moderne en comfortabele omgeving.
    `,
    specialties: [
      {
        name: 'Esthetische tandheelkunde',
        description: 'Verbetering van de esthetiek van uw glimlach door middel van facings, kronen, bruggen en bleken.'
      },
      {
        name: 'Restauratieve tandheelkunde',
        description: 'Herstel van beschadigde of ontbrekende tanden met behulp van vullingen, kronen en bruggen.'
      },
      {
        name: 'Preventieve tandheelkunde',
        description: 'Voorkomen van tandheelkundige problemen door middel van regelmatige controles, professionele reiniging en advies over mondhygiëne.'
      },
      {
        name: 'Angstbegeleiding',
        description: 'Begeleiding van angstige patiënten om tandheelkundige behandelingen comfortabeler te maken.'
      }
    ],
    education: [
      {
        degree: 'Tandheelkunde',
        institution: 'Radboud Universiteit Nijmegen',
        year: '2008'
      },
      {
        degree: 'Postdoctorale opleiding Esthetische Tandheelkunde',
        institution: 'ACTA Amsterdam',
        year: '2010'
      },
      {
        degree: 'Certificaat Angstbegeleiding',
        institution: 'Nederlandse Vereniging voor Tandartsen',
        year: '2012'
      }
    ],
    publications: [
      {
        title: 'Moderne technieken in de esthetische tandheelkunde',
        journal: 'Nederlands Tijdschrift voor Tandheelkunde',
        year: '2014'
      },
      {
        title: 'Patiëntgerichte benadering bij angstbegeleiding',
        journal: 'Tandartspraktijk',
        year: '2016'
      }
    ]
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-primary-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src={teamMember.image} 
            alt={teamMember.name} 
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
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Terug naar team overzicht</span>
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-2">
              {teamMember.name}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {teamMember.role}
            </p>
            <p className="text-lg md:text-xl mb-0 text-white/90">
              {teamMember.specialty}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="prose prose-lg max-w-none">
              <h2>Over Dr. Marieke Berben</h2>
              {teamMember.detailedBio.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              <h2>Specialisaties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-8">
                {teamMember.specialties.map((specialty, index) => (
                  <div key={index} className="bg-primary-50 p-6 rounded-lg">
                    <h3 className="text-xl font-bold mb-2 text-primary-900">{specialty.name}</h3>
                    <p className="text-neutral-700">{specialty.description}</p>
                  </div>
                ))}
              </div>

              <h2>Opleiding</h2>
              <ul>
                {teamMember.education.map((edu, index) => (
                  <li key={index}>
                    <strong>{edu.degree}</strong> - {edu.institution}, {edu.year}
                  </li>
                ))}
              </ul>

              <h2>Publicaties</h2>
              <ul>
                {teamMember.publications.map((pub, index) => (
                  <li key={index}>
                    <strong>{pub.title}</strong> - {pub.journal}, {pub.year}
                  </li>
                ))}
              </ul>
            </section>

            {/* Testimonials Section */}
            <section className="mt-12 border-t border-neutral-200 pt-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8 text-primary-900">
                Wat patiënten zeggen
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg border border-neutral-200">
                  <p className="text-neutral-700 mb-4 italic">
                    &ldquo;Dr. Berben is een geweldige tandarts. Ze is zeer kundig, geduldig en neemt de tijd om alles goed uit te leggen. Ik ben altijd bang geweest voor de tandarts, maar dankzij haar voel ik me nu veel meer op mijn gemak.&rdquo;
                  </p>
                  <p className="text-primary-900 font-bold">- Anna V.</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-neutral-200">
                  <p className="text-neutral-700 mb-4 italic">
                    &ldquo;Ik ben zeer tevreden over de behandeling die ik heb gekregen van Dr. Berben. Ze heeft mijn glimlach compleet getransformeerd met facings en het resultaat is prachtig. Haar oog voor detail en esthetiek is indrukwekkend.&rdquo;
                  </p>
                  <p className="text-primary-900 font-bold">- Mark J.</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-neutral-200">
                  <p className="text-neutral-700 mb-4 italic">
                    &ldquo;Dr. Berben is niet alleen een uitstekende tandarts, maar ook een zeer vriendelijk persoon. Ze stelt je op je gemak en zorgt ervoor dat je je comfortabel voelt tijdens de behandeling. Ik raad haar zeker aan!&rdquo;
                  </p>
                  <p className="text-primary-900 font-bold">- Sophie K.</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-neutral-200">
                  <p className="text-neutral-700 mb-4 italic">
                    &ldquo;Als iemand met extreme tandartsangst, kan ik niet genoeg benadrukken hoe belangrijk Dr. Berben&apos;s aanpak is geweest voor mij. Ze is geduldig, begripvol en neemt de tijd om me gerust te stellen. Voor het eerst in jaren ga ik zonder angst naar de tandarts.&rdquo;
                  </p>
                  <p className="text-primary-900 font-bold">- Thomas B.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-primary-50 rounded-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-primary-900">
                Contact informatie
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">E-mail</h4>
                    <a 
                      href={`mailto:${teamMember.email}`}
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {teamMember.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">Telefoon</h4>
                    <a 
                      href="tel:+31302940150"
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      030 - 294 01 50
                    </a>
                    <p className="text-neutral-600 text-sm mt-1">
                      Bereikbaar op werkdagen van 8:00 tot 17:00 uur
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GraduationCap className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">Opleiding</h4>
                    <p className="text-neutral-700">{teamMember.educationSummary}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Languages className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">Talen</h4>
                    <ul className="text-neutral-700 list-disc ml-4">
                      {teamMember.languages.map((language, index) => (
                        <li key={index}>{language}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-primary-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-primary-800 mb-1">Werkdagen</h4>
                    <ul className="text-neutral-700 list-disc ml-4">
                      {teamMember.workDays.map((day, index) => (
                        <li key={index}>{day}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-primary-100">
                <h4 className="font-bold text-primary-800 mb-4">Afspraak maken</h4>
                <p className="text-neutral-700 mb-4">
                  Wilt u een afspraak maken bij Dr. Berben? Dat kan eenvoudig online of telefonisch.
                </p>
                <Link 
                  href="/afspraak-maken" 
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center justify-center w-full mb-3"
                >
                  Online afspraak maken
                </Link>
                <a 
                  href="tel:+31302940150" 
                  className="bg-white hover:bg-neutral-100 text-primary-900 border border-primary-200 px-4 py-2 rounded-md font-medium transition-colors inline-flex items-center justify-center w-full"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  <span>030 - 294 01 50</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary-50 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 text-primary-900">
            Maak kennis met Dr. Berben
          </h2>
          <p className="text-lg text-neutral-700 mb-8 max-w-2xl mx-auto">
            Wilt u een afspraak maken bij Dr. Berben? Neem contact met ons op of plan direct online een afspraak.
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