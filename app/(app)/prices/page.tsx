import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPayload } from 'payload';
import config from '@payload-config';
import { Pricing } from '@/payload-types'; // Generated type for Pricing collection
import { SpecialOffer } from '@/components/ui/special-offer';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Pricing | title',
  description: 'View our pricing plans and special offers for yoga classes and workshops.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// Define the SpecialOffer type
interface SpecialOfferType {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
  price?: number;
  originalPrice?: number;
}

async function getPricingPlans(): Promise<Pricing[]> {
  const payload = await getPayload({ config });
  const { docs: plans } = await payload.find({
    collection: 'pricing',
    sort: 'order', // Sort by the 'order' field
  });
  return plans;
}

async function getSpecialOffers(): Promise<SpecialOfferType[]> {
  const payload = await getPayload({ config });
  
  const specialOffers = await (payload as any).find({
    collection: 'special-offers',
    where: {
      isActive: { equals: true },
    },
  }) as { docs: any[] };

  return specialOffers.docs.map(offer => ({
    id: offer.id,
    title: offer.title,
    subtitle: offer.subtitle,
    description: offer.description,
    buttonText: offer.buttonText,
    buttonLink: offer.buttonLink,
    backgroundColor: offer.backgroundColor,
    price: offer.price,
    originalPrice: offer.originalPrice,
  }));
}

// Optional: Keep fetching the Pricing page if you want its content
async function getPricingPage() {
  const payload = await getPayload({ config });
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'pricing',
      },
    },
  }).then(res => res.docs[0]);
  return page;
}

export default async function PrijzenPage() {
  const plans = await getPricingPlans();
  const specialOffers = await getSpecialOffers();
  const page = await getPricingPage();

  return (
    <div className="container-custom py-16">
      <h1 className="text-4xl font-bold mb-8">Prijzen</h1>

      {page && (
        <div className="prose max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: serializeLexicalToHTML(page.layout as any) }} />
        </div>
      )}

      {/* Special Offers Section */}
      {specialOffers.length > 0 && (
        <div id="aanbiedingen" className="mb-16">
          <h2 className="text-3xl font-heading text-brown font-bold mb-8 text-center">
            Speciale Aanbiedingen
          </h2>
          <div className="space-y-8">
            {specialOffers.map(offer => (
              <SpecialOffer key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      )}

      {/* Subscription Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.highlight ? 'border-primary border-2' : ''}>
            <div className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-brown">
                    € {Number.isInteger(plan.price) 
                      ? plan.price.toString()
                      : plan.price.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-muted-foreground">
                    {' '}
                    {plan.period === 'per_month' ? 'per maand' : plan.period === 'per_year' ? 'per jaar' : 'eenmalig'}
                  </span>
                </div>
                {(plan as any).description && (
                  <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
                    <div dangerouslySetInnerHTML={{ __html: serializeLexicalToHTML((plan as any).description) }} />
                  </div>
                )}
                <ul className="space-y-3 mb-6">
                  {(plan.features ?? []).map((featureObj) => (
                    <li key={featureObj.id} className="flex items-center gap-2">
                      <span className="text-brown">✓</span>
                      {featureObj.feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Button 
                    className="w-full rounded-full px-8 text-brown hover:text-brown" 
                    variant={plan.highlight ? 'default' : 'outline'}
                    asChild
                  >
                    <a 
                      href="https://www.eversports.nl/auth/register?origin=eversport&redirectApp=marketplace&redirectPath=%2Fs%2Ftitle-new"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Kies {plan.name}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Veelgestelde Vragen</h3>
          <ul className="space-y-2">
            <li>
              <a href="/faq" className="text-brown hover:underline">
                Hoe kan ik een vriend meenemen?
              </a>
            </li>
            <li>
              <a href="/faq" className="text-brown hover:underline">
                Kan ik mijn abonnement pauzeren?
              </a>
            </li>
            <li>
              <a href="/faq" className="text-brown hover:underline">
                Wat gebeurt er met ongebruikte lessen?
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Kortingen</h3>
          <p className="mb-4">
            We bieden speciale kortingen voor studenten en U-pas houders.
            Neem contact met ons op voor meer informatie.
          </p>
          <Button variant="outline" asChild className="rounded-full px-8 text-brown hover:text-brown">
            <a href="/contact">Contact Opnemen</a>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Custom function to serialize Lexical rich text to HTML (from your FAQ fix)
function serializeLexicalToHTML(data: { root: { children: any[] } }): string {
  if (!data || !data.root || !Array.isArray(data.root.children)) {
    return '';
  }

  let html = '';
  data.root.children.forEach((node) => {
    if (node.type === 'text') {
      html += node.text || '';
    } else if (node.type === 'paragraph') {
      html += `<p>${serializeChildren(node.children || [])}</p>`;
    } else if (node.type === 'heading') {
      html += `<h${node.tag?.slice(1)}>${serializeChildren(node.children || [])}</h${node.tag?.slice(1)}>`;
    } else if (node.type === 'list') {
      const tag = node.listType === 'bullet' ? 'ul' : 'ol';
      html += `<${tag}>${serializeChildren(node.children || [])}</${tag}>`;
    } else if (node.type === 'listitem') {
      html += `<li>${serializeChildren(node.children || [])}</li>`;
    }
  });
  return html;
}

function serializeChildren(children: any[]): string {
  let html = '';
  children.forEach((node) => {
    if (node.type === 'text') {
      html += node.text || '';
    } else if (node.type === 'paragraph') {
      html += `<p>${serializeChildren(node.children || [])}</p>`;
    } else if (node.type === 'heading') {
      html += `<h${node.tag?.slice(1)}>${serializeChildren(node.children || [])}</h${node.tag?.slice(1)}>`;
    } else if (node.type === 'list') {
      const tag = node.listType === 'bullet' ? 'ul' : 'ol';
      html += `<${tag}>${serializeChildren(node.children || [])}</${tag}>`;
    } else if (node.type === 'listitem') {
      html += `<li>${serializeChildren(node.children || [])}</li>`;
    }
  });
  return html;
}