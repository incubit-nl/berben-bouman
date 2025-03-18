import { Hero } from '@/components/content/hero';
import { Features } from '@/components/content/features';
import { Services } from '@/components/content/services';
import { Testimonials } from '@/components/content/testimonials';
import { CTA } from '@/components/content/cta';

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Services />
      <Testimonials />
      <CTA />
    </main>
  );
}