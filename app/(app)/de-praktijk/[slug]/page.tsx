import Link from 'next/link';
import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';

// Define types for our data
interface Treatment {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  status: 'draft' | 'published';
}

// Define the page props with searchParams as a Promise
interface TreatmentsPageProps {
  searchParams: Promise<Record<string, string | string[]>>;
}

// Generate metadata
export async function generateMetadata({ searchParams }: TreatmentsPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams; // Await the searchParams Promise
  const category = resolvedSearchParams.category || 'all';

  return {
    title: `Behandelingen${category !== 'all' ? ` - ${category}` : ''} | Tandartsenpraktijk Berben & Bouman`,
    description: 'Ontdek onze tandheelkundige behandelingen.',
  };
}

// Fetch all treatments from Payload CMS
async function getTreatments(category?: string): Promise<Treatment[]> {
  try {
    const payload = await getPayload({ config });

    const treatments = await payload.find({
      collection: 'treatments',
      where: {
        ...(category && category !== 'all' ? { category: { equals: category } } : {}),
        status: { equals: 'published' },
      },
      sort: 'displayOrder',
    }).then(res => res.docs as Treatment[]);

    return treatments;
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return [];
  }
}

export default async function TreatmentsPage({ searchParams }: TreatmentsPageProps) {
  // Await the searchParams Promise to resolve query string values
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category || 'all';

  const treatments = await getTreatments(Array.isArray(category) ? category[0] : category);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Onze Behandelingen</h1>
      {treatments.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treatment) => (
            <li key={treatment.id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{treatment.title}</h2>
              <p className="text-gray-600">{treatment.shortDescription}</p>
              <Link
                href={`/behandelingen/${treatment.slug}`}
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Lees meer
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Geen behandelingen gevonden.</p>
      )}
    </div>
  );
}